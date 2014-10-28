install:
	npm install

start:
	npm install && node ./bin/www

test:
	node-debug ./bin/www

clean:
	sudo rm -rf ./node_modules && rm -r ./public/bower_components