CheWeed
=======
To get CheWeed up and running on your computer follow the steps written below.

First make sure you have <a href="http://nodejs.org/">Node.js</a> installed.  Node.js should come installed with npm (node package manager), but if not you can download npm <a href="https://github.com/npm/npm/blob/master/README.md">here</a>.

With these dependencies now installed, navigate to the CheWeed directory with the command prompt.

First run the command <code>make install</code> to install CheWeed's dependencies.  If you are on Windows make sure you are running this command in a Unix-like environment such as <a href="https://cygwin.com/install.html">Cygwin</a>

Then to run CheWeed execute the command <code>make start</code> 

Now navigate to the url <a href="http://127.0.0.1:3000">127.0.0.1:3000</a> in the browser of your choice and then you should see CheWeed in action!

Testing
=======
In order to run the tests you must also install another npm module called karma-cli, but you must do so globally via the command <code>npm install -g karma-cli</code>

After that is installed you can run the client side unit tests via the command <code>karma start karma.conf.js</code>

The server side tests can be ran similarly via the command <code>mocha</code>.  Make sure you also install the mocha npm module globally via the command <code>npm install -g mocha</code>
