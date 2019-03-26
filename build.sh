#!/bin/sh
cd "$(dirname "$0")"

# Build frontend and extract bundles from the image.
# We will not run SSR but still build in docker to avoid installing node on the host 
rm -rf ./volumes/assets
docker build frontend/ -t docsearch-frontend:latest
docker run --name tmp-docsearch-frontend docsearch-frontend:latest /bin/true
docker cp tmp-docsearch-frontend:/srv/app/dist/client/ ./volumes/assets
docker rm tmp-docsearch-frontend

# Build backend
docker build nlp-core/ -t docsearch-backend:latest

# Download word2vec model
if [ ! -f nlp-core/data/GoogleNews-vectors-negative300.bin.gz ]; then
    echo "Downloading GoogleNews-vectors-negative300.bin.gz..."
    wget -c "https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz" -P nlp-core/data/
else
    echo "GoogleNews-vectors-negative300.bin.gz file found."
fi
