const StatsD = require('node-statsd');
const client = new StatsD({host:'localhost',port:8125});

module.export= client;