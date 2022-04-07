var Client = require('node-statsd-client').Client;

var client = new Client("localhost", 8125);

// Count stat
client.count("num_logged_users", 1);
client.increment("num_logged_users");
client.decrement("num_logged_users");

// Timing stat
client.timing("request_ms", 250);

// Gauge stat
client.gauge("gauge_stats", 4);

// Set stat
client.set("set_stats", 3);

module.exports=client;