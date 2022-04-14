let AWS = require('aws-sdk');
const {S3_BUCKET_REGION} = require('../util/constants');

let docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId:"AKIARPHHN4JZ3AKIYB6I",
  secretAccessKey:"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",
  region:S3_BUCKET_REGION
});

const table = "userVerificationTesting";

const SECONDS_IN_MINUTE = 60 ;

export const addEntry = async function(email,token){
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
  return await docClient.put(params); 
}

export const getEntry = async function(email,token){
  var params = {
    TableName: table,
    Item: {
      "email" : email,
      "token" : token
    }
  };

  return await docClient.get(params); 
}
