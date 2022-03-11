const uuid = require('uuid');
const fs = require('fs');
const path = require("path");
const s3Util = require('./../../s3/s3Util');
const db = require('../../db/db');
let rawdata = fs.readFileSync(path.resolve(__dirname, "../../../mysql.config"));
let userConfig = JSON.parse(rawdata);
const {  S3_USERS_PATH } = require('../../util/constants');
const S3_BUCKET_NAME = userConfig.bucketName;
async function addProfilePic({username,file,fileName='profilePic.jpg'})
{
  console.log(file);
  const data = await db.UserInfo.findAll({
    include:[{
      model:db.User,as:'Users',
      where:{username:username},
      required:true
    }]
  })
  if(data.length>0){
    logger.info('db entry is present');
    await db.UserInfo.update({
      key:fileName,
      updated_time:new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },{where:{id:data[0].dataValues.id}})
    console.log("updated in db");

  
    await s3Util.uploadFile(username,file,fileName);
  }
  else{
    logger.info('db entry is not present');
    const user = await db.User.findOne({where:{username}})
    const userInfo ={}
    userInfo.id=uuid.v4(),
    userInfo.key=fileName,
    userInfo.created_time=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    userInfo.updated_time=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    userInfo.user_id=user.dataValues.id;
    logger.info('creating db entry');
    db.UserInfo.create(userInfo);
    logger.info("created entry in db");
    logger.info("creating Folder");
    // await s3Util.createFolder(username);
    logger.info(" Folder created");
    logger.info(" uploading file");
    await s3Util.uploadFile(username,file,fileName);
    logger.info("file uploaded");
  }
}

async function getProfilePicDetails({username}){
  logger.info("inside get profile pic");
  const data = await db.UserInfo.findOne({
    include:[{
      model:db.User,as:'Users',
      where:{username:username},
      required:true
    }]
  });
  if(!data){
    console.log('user not found')
    throw "user not found";
  }
  console.log('user found')
  logger.log(data)
  const result = {
    "id":data.id,
    "filename":data.key,
    "url":`${S3_BUCKET_NAME}/${S3_USERS_PATH}/${username}/${data.key}`,
    "upload_date":data.updated_time,
    "user_id":data.user_id,
  }
  logger.info("gotProfilePic");
  logger.info(JSON.stringify(result));
  logger.info(result);
  return result;
}

async function deleteProfilePic({username}){
  const data = await db.UserInfo.findOne({
    include:[{
      model:db.User,as:'Users',
      where:{username:username},
      required:true
    }]
  });
  if(!data){
    throw "user doesn't have profile pic";
  }
  console.log(JSON.stringify(data))
  await db.UserInfo.destroy({where:{id:data.id}})
  logger.info("deleted entry in db");
  await s3Util.deleteFile({path:username,fileName:data.key})
  logger.info("deleting folder");
  await s3Util.deleteFolder({folderName:username});
  logger.info("deleted folder successfully");
  return "deleted pic successfully";
}
module.exports={
  addProfilePic,
  getProfilePicDetails,
  deleteProfilePic
}