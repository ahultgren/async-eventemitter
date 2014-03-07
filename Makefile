test:
	grunt jshint:sloppy
	./node_modules/.bin/mocha test/*.js
	grunt jshint:strict

.PHONY: test
