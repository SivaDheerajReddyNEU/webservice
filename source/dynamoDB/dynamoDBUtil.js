let AWS = require('aws-sdk');
const {S3_BUCKET_REGION} = require('../util/constants');

let docClient = new AWS.DynamoDB.DocumentClient({
  region:S3_BUCKET_REGION
});
const fs = require('fs');
const path = require("path");
let rawdata = fs.readFileSync(path.resolve(__dirname, "../../mysql.config"));
let config = JSON.parse(rawdata);

const table = config.dynamoDBTable;

const SECONDS_IN_MINUTE = 60 ;

const addEntry = async function(email,token){
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  const expirationTime = secondsSinceEpoch + 5 * SECONDS_IN_MINUTE;
  console.log(expirationTime);
  var params = {
    TableName: table,
    Item: {
      "email" : email,
      "token" : token,
      "ttl": expirationTime
    }
  };
  return await docClient.put(params).promise(); 
}

const getEntry = async function(email,token){
  var params = {
    TableName: table,
    Item: {
      "email" : email,
      "token" : token
    }
  };

  return await docClient.get(params).promise(); 
}

module.exports = {
  addEntry,
  getEntry
}
