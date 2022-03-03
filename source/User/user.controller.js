const express = require('express');
const router = express.Router();
// const validateRequest = require('./../security/validate-request');
const authorize = require('../security/authorize.js')
const userService = require('./user.service');
const {validateCreateUser,validateUpdateUser} = require('./../security/validation');

router.get('/self',authorize,getUserDetails)
router.put('/self',authorize,validateUpdateUser,updateUserDetails);
router.post('/',validateCreateUser,createUser);
module.exports = router;

function getUserDetails(req,res,next){
  userService.getUserDetails({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function updateUserDetails(req,res,next){
  userService.updateUser(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function createUser(req,res,next){
  userService.createUser(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}