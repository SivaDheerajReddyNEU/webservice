const http = require('http');
const assert = require('assert');
const app = require('../source/server.js');



describe('Web Server test', function() {
  const port = 8080;
  let server
	before(function() {
		server = app.listen(port);
	});

	after(function() {
		server.close();
	});

	describe('/', function() {
		it('should be Status running', function(done) {
			http.get('http://127.0.0.1:'+port+'/v1/healthz', function(response) {
				assert.equal(response.statusCode, 200);
				done();
			});
		});
	});
});
