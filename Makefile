test:
	grunt jshint:sloppy
	mocha test/*.js
	grunt jshint:strict

.PHONY: test
