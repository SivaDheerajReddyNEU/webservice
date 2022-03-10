const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const config = require('../config');
module.exports = db= {};
let isInitialized= false;
db.initialize = initialize;
initialize();

async function initialize() {
  if(isInitialized){
    return;
  }
  console.log("inside initializing")
    // create db if it doesn't already exist
    console.log("DB:CONFIG:")
  console.log(config)
    const { HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = config;

    await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD}).then(connection => connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`))
      .then(data => console.log('queried')).catch(data => console.log("failed"));

    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { host:HOST,dialect: 'mysql' });

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
