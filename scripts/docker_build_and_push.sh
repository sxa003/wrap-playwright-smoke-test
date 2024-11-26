#!/bin/bash

if [ ! -d dist ]
then
	echo "## Couldn't find dist directory!!"
	echo "## You should run an \`npm run dist\` beforehand"
	echo "## continuing..."
fi

set -e -x

IMAGE_NAME=playwright-sample
IMAGE_PREFIX=docker-registry.hq.local/asis/

APP_VERSION=$(jq .version package.json -r)
MAJOR_VERSION=$(echo ${APP_VERSION} | cut -d "." -f1)
MINOR_VERSION=$(echo ${APP_VERSION} | cut -d "." -f2)

echo "Got versions from package.json:"
echo "App version: $APP_VERSION"
echo "Major: $MAJOR_VERSION"
echo "Minor: $MINOR_VERSION"

docker build -t $IMAGE_NAME .

set +e +x

VERSION="$1"
if [ x$VERSION != "x" ]
then
set -e -x
	echo "Doing docker tag & push for VERSION $VERSION"
	docker tag $IMAGE_NAME ${IMAGE_PREFIX}${IMAGE_NAME}:${MAJOR_VERSION}.${MINOR_VERSION}.${VERSION}
	docker push ${IMAGE_PREFIX}${IMAGE_NAME}:${MAJOR_VERSION}.${MINOR_VERSION}.${VERSION}
	
	docker tag $IMAGE_NAME ${IMAGE_PREFIX}${IMAGE_NAME}:latest
	docker push ${IMAGE_PREFIX}${IMAGE_NAME}:latest
else
	echo "No version provided, not doing docker tag & push"
	echo ""
	echo "## Run locally Docker with: (asssuming you ran this script in project root)"
	echo "   docker run -it -p 80:8443 \\"
	echo "   -v $(pwd)/src/dist/configuration.js:/local/conf/scripts/configuration.js \\"
	echo "   -v $(pwd)/config/dev/nginx/default.conf:/etc/nginx/conf.d/default.conf \\"
	echo "   $IMAGE_NAME"
	echo "## Browse to http://localhost/"
fi