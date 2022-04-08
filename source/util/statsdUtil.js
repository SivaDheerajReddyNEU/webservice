const StatsD = require('hot-shots'),
client = new StatsD({
    port: 8125
});
module.exports = client;
