from aiohttp import web


@web.middleware
async def error_middleware(request, handler):
    try:
        return await handler(request)
    except web.HTTPException as ex:
        return web.json_response({
            'success': False,
            'error': ex.reason
        }, status=ex.status_code)
