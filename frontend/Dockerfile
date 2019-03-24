# Main idea is to build SPA and then reuse files
# Later we can add here serverside rendering in 2 or 3 stage
FROM node:10 as builder

WORKDIR /srv/app
COPY . /srv/app/
RUN yarn install && yarn build:client:prod && yarn build:server:prod
EXPOSE 3000
ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]
