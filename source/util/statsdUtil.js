var Client = require('node-statsd-client').Client;
var client = new Client("localhost", 8125);
module.exports= client;
