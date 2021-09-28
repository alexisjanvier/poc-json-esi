.PHONY: help
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# =====================================================================
# Docker variables and exports ========================================
# =====================================================================

CURRENT_DIR = $(shell pwd)
USER_ID = $(shell id -u)
GROUP_ID = $(shell id -g)

export UID = $(USER_ID)
export GID = $(GROUP_ID)

# =====================
# Install =============
# =====================

install: ## install js dependencies
	docker-compose run --no-deps --rm node bash -ci 'npm install'

# =====================
# Development =========
# =====================

.PHONY: start
start: ## start local dev environment in docker containers
	docker-compose up -d --force-recreate

.PHONY: stop
stop: ## stop dockerised local dev environment
	docker-compose down --rmi all

.PHONY: logs
logs: ## display dockerised local dev environment logs
	docker-compose logs -f

connect-varnish: ## display dockerised local dev environment logs
	docker-compose exec varnish ash

connect-node: ## display dockerised local dev environment logs
	docker-compose exec node bash
