const multer  = require('multer');
const express = require('express');
const statsdClient = require('./../util/statsdUtil.js');
const router = express.Router();
let upload  = multer({ storage: multer.memoryStorage() });
const logger = require('./../log/logger');
global.logger=logger;
// const validateRequest = require('./../security/validate-request');
const authorize = require('../security/authorize.js');
const userService = require('./user.service');
const userInfoService = require('./userInfo/userInfo.service');
const {validateCreateUser,validateUpdateUser} = require('./../security/validation');
router.post('/self/pic',upload.single('profilePic'),authorize,addProfilePic);
router.get('/self/pic',authorize,getProfilePicDetails);
router.delete('/self/pic',authorize,deleteProfilePic);
router.get('/self',authorize,getUserDetails)
router.put('/self',authorize,validateUpdateUser,updateUserDetails);
router.post('/',validateCreateUser,createUser);
module.exports = router;

function getUserDetails(req,res,next){
  console.log(statsdClient);
  statsdClient.increment('get_/self');
  userService.getUserDetails({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function updateUserDetails(req,res,next){
  statsdClient.increment('put_/self');
  userService.updateUser(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function createUser(req,res,next){
  statsdClient.increment('post_/self');
  userService.createUser(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}

function addProfilePic(req,res,next){
  statsdClient.increment('post_/self/pic');
  logger.info("username:");
  logger.info(req.ctx.user.name)
  logger.info('body:');
  console.log(req.file);
  let temp = req.file.originalname.split('.')
  let extention = temp[temp.length-1];
  const params = {
    username:req.ctx.user.name,
    file:req.file.buffer,
    fileName:"profilePic."+extention
  }
  
  userInfoService.addProfilePic(params)
  .then(data => {res.status(201);res.send()})
  .catch(data => {logger.fatal(data);res.sendStatus(500);next()});
}

function getProfilePicDetails(req,res,next){
  try{
    statsdClient.increment('get_/self/pic');
  userInfoService.getProfilePicDetails({username:req.ctx.user.name})
  .then(data => {
    logger.info('got the profile data');
    res.status(200);
    res.json(data);
    res.send()
  })
  .catch(data => {
    logger.fatal(data);
    res.status(404);
    res.send()
    next();
  });
}catch(e){
  console.log(e)
}
}

function deleteProfilePic(req, res, next){
  statsdClient.increment('delete_/self/pic');
logger.info('inside delete profile pic');
  userInfoService.deleteProfilePic({username:req.ctx.user.name})
  .then(data => {res.status(204);res.send()})
  .catch(data => {logger.fatal(data);res.sendStatus(404);next()});
}