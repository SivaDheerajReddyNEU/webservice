const server = require("./server.js");
const db = require('./util/mysql.js');
const port = 8080;

// db.query('select * from user',(err,data)=>{
//   if(err){
//     return console.log(err);
//   }
//   console.log('data from db')
//   console.log(data);
// });
server.listen(port,()=>{
  console.log("server started at port: ",port);
});
