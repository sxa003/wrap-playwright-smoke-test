
.PHONY: install
install:
	@./scripts/ci_run_docker_build.sh npm install

tests: install
	@./scripts/ci_run_docker_build.sh npm run test:ci