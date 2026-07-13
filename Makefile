GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)

NVM_SOURCE_PATH ?= $(HOME)/.nvm/nvm.sh

ifneq ("$(wildcard $(NVM_SOURCE_PATH))","")
	NVM_EXEC = source $(NVM_SOURCE_PATH) && nvm exec --
endif
NPM = $(NVM_EXEC) npm


.PHONY: audit
audit: ## Runs audit check
	$(NPM) run audit

.PHONY: build
build: ## Builds into npm package
	$(NPM) run build

.PHONY: debug
debug: ## Runs dev server
	$(NPM) run start

.PHONY: lint
lint: ## Runs lint checks
	$(NPM) run lint

.PHONY: test
test: ## Runs tests
	$(NPM) run test

.PHONY: node-modules
node-modules: ## Builds dependencies
	$(NPM) install --legacy-peer-deps

.PHONY: clean
clean: ## Deletes built assets
	$(NPM) run clean

.PHONY: help
help: ## Show help page for list of make targets
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)
