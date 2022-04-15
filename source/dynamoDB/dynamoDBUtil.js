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
    Key: {
      "email" : email,
      "token" : token
    }
  };
  console.log(params)
  try
  {
    let data =  await docClient.get(params).promise();
    console.log(data);
    return data;
  }
  catch(e)
  {
    console.log(e);
  }
}

// getEntry('obulam.dheeraj+t4@gmail.com','a6b5914d-e1cc-4198-92cd-60c31bebc33b').then(data => {console.log(data);(data && Object.keys(data).length !== 0)?console.log('found entry'):console.log('entry not found')});

module.exports = {
  addEntry,
  getEntry
}