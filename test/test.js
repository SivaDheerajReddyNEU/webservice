var http = require('http');
var assert = require('assert');
var server = require('../source/server.js');



describe('Web Server test', function() {
  var port = 8080;
	before(function() {
		server.listen(port);
	});

	after(function() {
		server.close();
	});

	describe('/', function() {
		it('should be Status running', function(done) {
			http.get('http://127.0.0.1:'+port+'/healthz', function(response) {
				assert.equal(response.statusCode, 200);
        var body = '';
				response.on('data', function(d) {body += d;});
				response.on('end', function() {
					assert.equal(body, '');
					done();
				});
			});
		});
	});
});
