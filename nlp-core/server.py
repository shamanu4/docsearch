import concurrent.futures
import hnswlib
import logging
import os

import asyncio
import asyncpg
from aiohttp import web
from gensim.models import KeyedVectors

import config
import handlers
from middleware import error_middleware
from tasks import document_parser


async def on_startup(app):
    def init_index_callback(fut):
        app['data']['index'] = fut.result()

    def init_model_callback(fut):
        app['data']['model'] = fut.result()
        app['data']['dp'] = asyncio.ensure_future(document_parser(app, app['queue']))

    def init_model():
        log = logging.getLogger('Model Init')
        log.info("start")
        model = KeyedVectors.load_word2vec_format(
            config.MODEL_DATA_PATH,
            binary=True,
            limit=config.WORD2VEC_MODEL_WORDS_LIMIT
        )
        log.info("done")
        return model

    def init_index():
        log = logging.getLogger('Index Init')
        log.info("start")
        index = hnswlib.Index(space='cosine', dim=300)
        if os.path.isfile(config.INDEX_SAVE_PATH):
            index.load_index(config.INDEX_SAVE_PATH, max_elements=config.INDEX_MAX_SIZE)
        else:
            index.init_index(max_elements=config.INDEX_MAX_SIZE, ef_construction=2000, M=128)
        index.set_ef(2000)
        log.info("done")
        return index

    executor = concurrent.futures.ThreadPoolExecutor(2)

    asyncio.ensure_future(
        loop.run_in_executor(executor, init_model)
    ).add_done_callback(init_model_callback)

    asyncio.ensure_future(
        loop.run_in_executor(executor, init_index)
    ).add_done_callback(init_index_callback)


async def on_cleanup(app):
    log = logging.getLogger('Cleanup')
    log.info("Index save start")
    index = app['data'].get('index')
    if index:
        index.save_index(config.INDEX_SAVE_PATH)
    log.info("Index save done")

    dp = app['data'].get('dp')
    if dp:
        log.info("Stopping document parser consumer...")
        dp.cancel()
        log.info("Stopped.")


async def init_app():
    """Initialize the application server."""
    app = web.Application(middlewares=[error_middleware])

    # Create a database connection pool
    app['db_pool'] = await asyncpg.create_pool(database='docsearchdb', user='docsearch', password="haiRei3aiqu")
    app['queue'] = asyncio.Queue()

    # Configure service routes
    app.router.add_route('GET', '/api/status/', handlers.status)
    app.router.add_route('POST', '/api/documents/', handlers.new_document)
    app.router.add_route('GET', '/api/documents/', handlers.documents)
    app.router.add_route('GET', r'/api/document/{document_id:\d+}/', handlers.document)
    app.router.add_route('GET', r'/api/sentence/{sentence_id:\d+}/', handlers.sentence)
    app['data'] = {}
    app.on_cleanup.append(on_cleanup)
    app.on_startup.append(on_startup)
    return app


loop = asyncio.get_event_loop()
api = loop.run_until_complete(init_app())
web.run_app(api)
