let AWS = require('aws-sdk');
const fs = require('fs');
const path = require("path");

const {S3_BUCKET_REGION} = require('../util/constants.js');
let rawdata = fs.readFileSync(path.resolve(__dirname, "../../mysql.config"));

let config = JSON.parse(rawdata);
console.log(config);
let domain = config.domain;
let fromEmail=config.fromEmail


// domain='prod.dheerajreddy.me';
// fromEmail='no-reply@prod.dheerajreddy.me';
let sns = new AWS.SNS({
  region:S3_BUCKET_REGION
});

// const topic = "arn:aws:sns:us-east-1:101417083507:emailTopicTesting";//config.topicARN;
const topic =config.topicARN;
const  postMessage = async function(message){
  const params={
    Message:message,
    TopicArn:topic
  }
<<<<<<< HEAD
  console.log("config before calling lambda:");
=======
  config.log("config before calling lambda:")
>>>>>>> f7d469562298e7651ec46cf514c7a2cb689c9e1c
  console.log(domain)
  console.log(fromEmail)
  return await sns.publish(params).promise(); 
}

const sendEmail= async function ({toEmail,verifyLink, userName}){
  await postMessage(`{"fromAddress":"${fromEmail}","toAddress":"${toEmail}","userName":"${userName}","link":"${verifyLink}","domain":"${domain}"}`);
}

module.exports ={
  sendEmail
}



