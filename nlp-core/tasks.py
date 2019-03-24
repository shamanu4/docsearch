import asyncio
import nltk

import config
from config import logging
import numpy as np


async def document_parser(app, queue):
    log = logging.getLogger('Document parser')
    model = app['data'].get('model')
    index = app['data'].get('index')
    pool = app['db_pool']
    if not model or not index:
        log.error("Word2vec model or document index is not loaded. Aborting...")
    else:
        while True:
            # wait for an item from the producer
            item = await queue.get()

            # process the item
            log.info('Indexing sentence_id: {} ...'.format(item))

            async with pool.acquire() as connection:
                async with connection.transaction():
                    sql = "SELECT text from sentence WHERE id = $1;"
                    text = await connection.fetchval(sql, item)

                word_embeddings = []
                words = filter(lambda x: x not in config.IGNORED_WORDS, nltk.word_tokenize(text))
                for w in words:
                    if w in model:
                        word_embeddings.append(model[w])

                if word_embeddings:
                    sentence_embedding = np.mean(word_embeddings, axis=0)
                    index.add_items(sentence_embedding, item)
                    async with connection.transaction():
                        sql = "UPDATE sentence SET indexed = true WHERE id = $1;"
                        await connection.execute(sql, item)

            queue.task_done()
