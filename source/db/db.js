const mysql = require('mysql2/promise');
const fs = require('fs')
const { Sequelize } = require('sequelize');
const config = require('../config');
// const mysqlConfig = require('../../mysql.config');
module.exports = db= {};
let isInitialized= false;
db.initialize = initialize;
initialize();
let rawdata = fs.readFileSync('../../mysql.config');
let mysqlConfig = JSON.parse(rawdata);
console.log(mysqlConfig);
async function initialize() {
  if(isInitialized){
    return;
  }
  console.log("inside initializing")
    // create db if it doesn't already exist
    console.log("DB:CONFIG:")
  console.log(config)
    const { HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = config;

    await mysql.createConnection({  host: mysqlConfig.dbHost,
      user: mysqlConfig.dbUser,
      password: mysqlConfig.dbPass}).then(connection => connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`))
      .then(data => console.log('queried')).catch(data => console.log("failed"));

    // connect to db
    const sequelize = new Sequelize(DATABASE, mysqlConfig.dbUser, mysqlConfig.dbPass, { host:mysqlConfig.dbHost,dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../User/user.model')(sequelize);
    db.UserInfo = require('../User/userInfo/userInfo.model')(sequelize);
    // db.UserInfo.associate=(models)=>{
    //   models.UserInfo.belongsTo(db.User,{
    //     as:'user_id',
    //     foreignKey:'id'
    //   })
    // }
    db.UserInfo.belongsTo(db.User,{as:'Users',foreignKey:'user_id',targetKey:'id'});

    console.log("after assigning")
    // sync all models with database
    await sequelize.sync();
    isInitialized = true;
    // console.log(await db.User.findOne({where:{id:"ASdf"}}))
}
