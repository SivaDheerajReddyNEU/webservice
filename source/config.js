module.exports = Object.freeze({
  MYSQL_USERNAME: process.env.MysqlUserName,
  MYSQL_PASSWORD: process.env.MysqlPassword,
  SERVER_PORT:8080,
  SALT_ROUND:10,
  HOST:process.env.dbHost,
  DATABASE:'webserver'
});