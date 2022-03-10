const server = require("./server.js");
// const db = require('./util/mysql.js');
const CONFIG = require('./config.js');

server.use((err, req, res, next) => {
  logger.fatal(err.stack);
  res.setHeader('Content-Type', 'application/json');
  res.status(500).send({'error':'Unexpected error'});
})
console.log("CONFIG:")
console.log(CONFIG)
server.listen(CONFIG.SERVER_PORT,()=>{
  logger.info("server started at port: ",CONFIG.SERVER_PORT);
});

process.on('uncaughtException', function(ex) {
  logger.fatal("server crash triggered");
  logger.fatal(ex);
});
