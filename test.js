var StatsD = require('hot-shots'),
client = new StatsD({
    port: 8125,
    host:localhost
});

// Increment: Increments a stat by a value (default is 1)
client.increment('my_counter');