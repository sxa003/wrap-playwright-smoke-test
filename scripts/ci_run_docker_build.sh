#!/usr/bin/env bash

set -e

CMD="$*"

#The docker client OS when running docker-machine on OSX (or windows) doesn't have getent. Default the docker GID
if command -v getent > /dev/null; then
  DOCKER_UID=$(id -u)
  DOCKER_GID=$(id -g)
  DOCKER_GROUP_ID=$(getent group docker | cut -d: -f3)
else
  DOCKER_UID=1000
  DOCKER_GID=100
  DOCKER_GROUP_ID=100
fi
DOCKER_USER=$(whoami)

DOCKER_ENV="
  -e USERNAME=${DOCKER_USER}
  -e UID=${DOCKER_UID}
  -e GID=${DOCKER_GID}
  -e DOCKER_GROUP_ID=${DOCKER_GROUP_ID}
  -e BUILD_NAME=${BUILD_NAME}
  -e BUILD_NUMBER=${BUILD_NUMBER}
  -e VCS_REVISION=${VCS_REVISION}
  -e APP_REPO=${bamboo_repository_git_repositoryUrl}
  -e BRANCH_NAME=${bamboo_repository_git_branch}
  -e APP_BUILD=${bamboo_buildResultKey}
  -e TEST_URL=${bamboo_testUrl}
"
echo "DOCKER_ENV=${DOCKER_ENV}"

DOCKER_VOLUMES="
  -v ${HOME}/.npm/_cacache:/home/${DOCKER_USER}/.npm/_cacache
  -v ${PWD}:/data
  -v /var/run/docker.sock:/var/run/docker.sock
"
echo "DOCKER_VOLUMES=${DOCKER_VOLUMES}"

DOCKER_WORK_DIR="/data"
echo "DOCKER_WORK_DIR=${DOCKER_WORK_DIR}"

DOCKER_IMAGE="docker-registry.hq.local/microsoft/playwright:v1.39.0-jammy:latest"

#https://stackoverflow.com/questions/43099116/error-the-input-device-is-not-a-tty/48230089#48230089
test -t 1 && USE_TTY="-t"

set -x
docker pull $DOCKER_IMAGE

# shellcheck disable=SC2086
# docker run doesn't work if variables like USER_GUFF are double quoted (as suggested by SC2086).
docker run \
  -i ${USE_TTY} \
  --rm \
  --net=host \
  -w ${DOCKER_WORK_DIR} \
  ${DOCKER_ENV} \
  ${DOCKER_VOLUMES} \
  ${DOCKER_IMAGE} \
  ${CMD}