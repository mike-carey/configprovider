###
# Defines entry points for the project
##

NPM = yarn
NODE = nodejs
ENTRY = index.js

VAR = app

help:
	@echo "Usage \`make [command]\` where command is one of the following:"
	@echo "  help           Prints this help message"
	@echo "  init           Installs dependencies"
	@echo "  build          Builds the package"
	@echo "  lint           Runs the linter"
	@echo "  shell          Starts a shell for entering the application"
	@echo "  run            Starts the application"
	@echo "  test           Runs the testing suite"
	@echo "  publish        Publishes the node package"
	@echo ""
# help


init:
	@$(NPM) install
# init


build:
	@$(NPM) run build
# build


lint:
	@$(NPM) run lint
# lint


shell:
	$(NODE) -i -e "let $(VAR) = require('./$(ENTRY)')"
# shell


run:
	@$(NPM) start
# start


test:
	$(NPM) test
# test


publish:
	$(NPM) login
	$(NPM) publish
# publish


# end Makefile
