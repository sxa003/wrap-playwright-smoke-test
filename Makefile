
.PHONY 
install-dependencies:
	@./scripts/ci_run_docker_build.sh npm install

tests:install-dependencies
	@./scripts/ci_run_docker_build.sh npm run test:ci