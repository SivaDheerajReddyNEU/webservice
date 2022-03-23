const aws = require('aws-sdk');
// const fs = require('fs');
const fs = require('fs');
const path = require("path");
const {S3_BUCKET_REGION,S3_USERS_PATH} = require('../util/constants');
// require("../../mysql.config")
let rawdata = fs.readFileSync(path.resolve(__dirname, "../../mysql.config"));
let userConfig = JSON.parse(rawdata);
const S3_BUCKET_NAME = userConfig.bucketName;
const s3 = new aws.S3({});



const createBucket = (bucketName, region) => {
  const params = {
    Bucket: S3_USERS_PATH,
    CreateBucketConfiguration: {
      LocationConstraint: S3_BUCKET_REGION
    }
  };
  s3.createBucket(params, function (err, data) {
    if (err) logger.info(err, err.stack);
    else logger.info('Bucket Created Successfully', data.Location);
  });
}

const uploadFile = (path, fileContent, fileName) => {
  const params = {
    Bucket:  S3_BUCKET_NAME,
    Key:  S3_USERS_PATH+"/"+path+"/"+fileName,
    Body: fileContent
  };
  logger.info("upload file  - bucket name: "+params.Bucket+" Key:"+params.Key);
  s3.upload(params, function (err, data) {
    if (err) {
      logger.fatal("upload error");
      logger.fatal(err)
      throw err;
    }
    logger.info(`File uploaded successfully. ${data.Location}`);
  });
};

const deleteFile = ({path,fileName}) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: S3_USERS_PATH+"/"+path+"/"+fileName
  };
  logger.info("deleting file with params");
  logger.info(params.Bucket);
  logger.info(params.Key);
  s3.deleteObject(params, function (err, data) {
    if (err) {
      logger.fatal(err);
      return;
    }
    logger.info(data);
    logger.info('deleted successfully');
  })
}

const deleteFolder = ({folderName})=>{
  const params = {
    Bucket: S3_BUCKET_NAME ,
    Key: S3_USERS_PATH+"/"+folderName,
  };
  logger.info("bucket name: "+params.Bucket+" Key:"+params.Key);
  s3.deleteObject(params, function (err, data) {
    if (err) {
      throw err;
    }
    logger.info(`Folder deleted successfully. ${data.Location}`);
  });
}

module.exports={
  deleteFile,
  uploadFile,
  createBucket,
  // createFolder,
  deleteFolder
}