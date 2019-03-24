#!/bin/sh
if [ -d "/srv/nginx_assets/" ]; then
    rm -rf /srv/nginx_assets/*;
    cp -rva /srv/app/dist/client/. /srv/nginx_assets/;
fi
node dist/server/server.js