install:
	npm install

start:
	node ./bin/www

test:
	node-debug ./bin/www

clean:
	rm -r ./node_modules && rm -r ./public/bower_components