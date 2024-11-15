
.PHONY intall-dependencies:
	@./scripts/ci_run_docker_build.sh npm install

.PHONY tests:intall-dependencies
	@./scripts/ci_run_docker_build.sh npm run test:ci

.PHONY tests:
	@./scripts/ci_run_docker_build.sh npm run test:ci

.PHONY publish:
	@./scripts/ci_run_docker_build.sh ./scripts/docker_build_and_push.sh ${BUILD_NUMBER}