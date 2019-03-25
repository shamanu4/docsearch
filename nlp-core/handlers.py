import nltk
from aiohttp import web
from aiohttp.web_exceptions import HTTPNotFound, HTTPBadRequest

import config
import numpy as np


async def status(request):
    res = {
        "model": "OK" if request.app['data'].get('model') else "un-initialized",
        "index": "OK" if request.app['data'].get('index') else "un-initialized",
        "queue": request.app['queue'].qsize(),
    }
    return web.json_response(res)


async def new_document(request):
    post = await request.json()
    text = post.get('text')
    sentences = nltk.sent_tokenize(text)
    if not sentences:
        raise HTTPBadRequest(reason="Empty document")

    pool = request.app['db_pool']
    sentence_ids = []
    queue = request.app['queue']

    async with pool.acquire() as connection:

        async with connection.transaction():
            sql = "INSERT INTO document (id) VALUES (DEFAULT) RETURNING id;"
            document_id = await connection.fetchval(sql)

        for i, s in enumerate(sentences):
            async with connection.transaction():
                sql = """
                  INSERT INTO sentence (id, document_id, ordering, text, indexed) 
                  VALUES (DEFAULT, $1, $2, $3, False) RETURNING id;
                """
                sentence_id = await connection.fetchval(sql, document_id, i, s)
            sentence_ids.append(sentence_id)
            await queue.put(sentence_id)

    return web.json_response({
        "success": True,
        "document_id": document_id,
        "sentence_ids": sentence_ids
    })


async def documents(request):
    try:
        page = int(request.rel_url.query.get('page', 1))
    except ValueError:
        page = 1
    else:
        page = max(1, page)

    try:
        per_page = int(request.rel_url.query.get('per_page', config.DEFAULT_ITEMS_PER_PAGE))
    except ValueError:
        per_page = config.DEFAULT_ITEMS_PER_PAGE
    else:
        per_page = min(per_page, config.MAX_ITEMS_PER_PAGE)

    pool = request.app['db_pool']
    async with pool.acquire() as connection:
        async with connection.transaction():
            sql = "SELECT COUNT(id) FROM document;"
            total = await connection.fetchval(sql)

        last_page = int((total - 1) / per_page) + 1
        page = min(page, last_page)

        async with connection.transaction():
            sql = """
              SELECT 
                d.id, 
                CASE
                  WHEN LENGTH(s.text) > 50 THEN SUBSTRING(s.text, 1, 50) || '...'
                  ELSE s.text
                END AS title 
              FROM document d JOIN sentence s ON s.document_id = d.id
              WHERE s.ordering = 0
              LIMIT $1 OFFSET $2
            """
            res = await connection.fetch(sql, per_page, (page - 1) * per_page)

    return web.json_response({
        "success": True,
        "page": page,
        "last_page": last_page,
        "total": total,
        "documents": [dict(item) for item in res]
    })


async def document(request):
    document_id = int(request.match_info['document_id'])

    pool = request.app['db_pool']
    async with pool.acquire() as connection:
        async with connection.transaction():
            sql = """
              SELECT 
                s.id, s.text, s.indexed
              FROM document d JOIN sentence s ON s.document_id = d.id
              WHERE d.id = $1
              ORDER BY ordering ASC
            """
            res = await connection.fetch(sql, document_id)

    if not res:
        raise HTTPNotFound(reason="Document not found")

    return web.json_response({
        "success": True,
        "document_id": document_id,
        "sentences": [dict(item) for item in res]
    })


async def sentence(request):
    sentence_id = int(request.match_info['sentence_id'])

    pool = request.app['db_pool']
    async with pool.acquire() as connection:
        async with connection.transaction():
            sql = """
              SELECT 
                s.id, s.text, s.indexed
              FROM sentence s
              WHERE s.id = $1
            """
            res = await connection.fetchrow(sql, sentence_id)

        if not res:
            raise HTTPNotFound(reason="Sentence not found")

        if not res['indexed']:
            raise HTTPBadRequest(reason="Sentence is too common or not indexed yet.")

        index = request.app['data'].get('index')
        model = request.app['data'].get('model')

        if not index or not model:
            raise HTTPBadRequest(reason="Word2vec model or index is not loaded yet.")

        word_embeddings = []
        sentence_text = res['text']
        words = filter(lambda x: x not in config.IGNORED_WORDS, nltk.word_tokenize(sentence_text))
        for w in words:
            if w in model:
                word_embeddings.append(model[w])

        if not word_embeddings:
            raise HTTPBadRequest(reason="Sentence embedding is empty.")

        sentence_embedding = np.mean(word_embeddings, axis=0)

        labels, distances = index.knn_query([sentence_embedding], k=config.SEARCH_RESULT_COUNT)
        sentence_ids = labels[0].tolist()
        similarities = list(map(lambda x: 1 - abs(x), distances[0].tolist()))

        async with connection.transaction():
            sql = """
              SELECT 
                r.similarity, s.document_id, s.id, s.text 
              FROM 
                sentence s JOIN (
                  SELECT unnest($1::int[]) as sentence_id, unnest($2::float[]) as similarity
                ) r
              ON s.id = r.sentence_id
              ORDER BY r.similarity DESC;
            """
            res = await connection.fetch(sql, sentence_ids, similarities)

    return web.json_response({
        "success": True,
        "sentence_id": sentence_id,
        "sentence_text": sentence_text,
        "search_results": [dict(item) for item in res]
    })
