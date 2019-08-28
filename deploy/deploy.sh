#!/usr/bin/env bash
HARBOR_PREFIX=192.168.204.115:29006/aio-demo
NAME=demo
VERSION=latest

npm run build

docker build . -t ${NAME}:${VERSION}
docker tag ${NAME}:${VERSION} ${HARBOR_PREFIX}/${NAME}:${VERSION}
docker push ${HARBOR_PREFIX}/${NAME}:${VERSION}
