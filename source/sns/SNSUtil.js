let AWS = require('aws-sdk');
const fs = require('fs');
const path = require("path");

const {S3_BUCKET_REGION} = require('../util/constants.js');
let rawdata = fs.readFileSync(path.resolve(__dirname, "../../mysql.config"));

let config = JSON.parse(rawdata);
console.log(config);
const domain = config.domain;
const fromEmail=config.fromEmail

let sns = new AWS.SNS({
  region:S3_BUCKET_REGION
});

const topic = "arn:aws:sns:us-east-1:101417083507:emailTopicTesting";//config.topicARN;
const  postMessage = async function(message){
  const params={
    Message:message,
    TopicArn:topic
  }
  return await sns.publish(params).promise(); 
}

const sendEmail= async function ({toEmail,verifyLink, userName}){
  await postMessage(`{"fromAddress":"${fromEmail}","toAddress":"${toEmail}","userName":"${userName}","link":"${verifyLink}","domain":"${domain}"}`);
}

module.exports ={
  sendEmail
}



