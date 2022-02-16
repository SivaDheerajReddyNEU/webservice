const db = require('mysql');
const CONFIG = require('./../config');
let connection = db.createConnection({
  host: CONFIG.HOST,
  user: CONFIG.MYSQL_USERNAME,
  password: CONFIG.MYSQL_PASSWORD,
  database: CONFIG.DATABASE
});

connection.connect((err)=>{
  if(err){
    console.log(err)
    return console.log('error getting connection');
  }

  console.log('connection created');
})

module.exports=connection;