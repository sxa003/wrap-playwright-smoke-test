#!/bin/bash

if [ ! -d dist ]
then
	echo "## Couldn't find dist directory!!"
	echo "## You should run an \`npm run dist\` beforehand"
	echo "## continuing..."
fi

set -e

IMAGE_NAME=asis-web-adviser
IMAGE_PREFIX=docker-registry.hq.local/asis/

APP_VERSION=$(jq .version package.json -r)
MAJOR_VERSION=$(echo ${APP_VERSION} | cut -d "." -f1)
MINOR_VERSION=$(echo ${APP_VERSION} | cut -d "." -f2)

echo "Got versions from package.json:"
echo "App version: $APP_VERSION"
echo "Major: $MAJOR_VERSION"
echo "Minor: $MINOR_VERSION"

docker build -t $IMAGE_NAME .

PATCH_VERSION="$1"
if [[ "x${PATCH_VERSION}" == "x" ]]; then
	echo "No version provided, not doing docker tag & push"
	echo ""
	echo "## Run locally built container (asssuming you ran this script in project root):"
	echo "   docker run -it --rm \\"
	echo "   -v $(pwd)/src/dist/configuration.js:/local/conf/scripts/configuration.js \\"
	echo "   -v $(pwd)/config/dev/nginx/default.conf:/etc/nginx/conf.d/default.conf \\"
	echo "   $IMAGE_NAME"
	echo "## Browse to http://localhost:8443/"
  exit 0
fi

if [[ ! "$BRANCH_NAME" =~ ^(main|master)$ ]]; then
  BRANCH_TAG="$(echo -n $BRANCH_NAME | sed -e 's/\//-/g')-"
fi

for version in "latest" "${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}"; do
  for badge in "adviser-portfolioonline-assets"; do
    tag="${IMAGE_PREFIX}${badge}:${BRANCH_TAG}${version}"
    echo "Tagging new container for badge $badge with tag $tag"

    docker tag $IMAGE_NAME $tag
    docker push $tag
  done

  # Legacy Bendigo site (still being deployed)
  for badge in "bendigosuperadviser-portfolioonline-assets"; do
    tag="${IMAGE_PREFIX}${badge}:${BRANCH_TAG}${version}"
    echo "Tagging legacy container for badge $badge with tag $tag"

    # This is the same old container, just with a tag to support deployment of the new version
    docker pull ${IMAGE_PREFIX}${badge}:latest

    docker tag ${IMAGE_PREFIX}${badge} $tag
    docker push $tag
  done
done
