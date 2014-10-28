install:
	npm install

start:
	npm install && node ./bin/www

debug:
	node-debug ./bin/www

clientTest:
	karma start karma.conf.js

serverTest:
	mocha

clean:
	sudo rm -rf ./node_modules && rm -r ./public/bower_components