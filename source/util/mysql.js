const db = require('mysql');

let connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'webserver'
});

connection.connect((err)=>{
  if(err){
    console.log(err)
    return console.log('error getting connection');
  }

  console.log('connection created');
})

module.exports=connection;