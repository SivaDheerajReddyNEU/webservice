const server = require("./server.js");
// const db = require('./util/mysql.js');
const CONFIG = require('./config.js');

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  res.status(500).send({'error':'Unexpected error'});
})
server.listen(CONFIG.SERVER_PORT,()=>{
  console.log("server started at port: ",CONFIG.SERVER_PORT);
});

process.on('uncaughtException', function(ex) {
  console.log("server crash triggered");
  console.log(ex);
});
