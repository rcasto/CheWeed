install:
	npm install

start:
	node ./bin/www

debug:
	node-debug ./bin/www

clientTest:
	karma start karma.conf.js

serverTest:
	mocha

clean:
	rm -rf ./node_modules && rm -r ./public/bower_components