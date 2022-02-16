const basicAuth = require('basic-auth');
const emailValidator = require('email-validator');
const userActions = require('./UserActions.js');
const CONSTANT = require('./util/constants.js');
const hashUtil = require('./util/EncryptUtil.js');


function authenticate(req, res, next) {
  var user = basicAuth(req);
  req.ctx = {};
  req.ctx.user = user;
  console.log(user)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  userActions.getUser(user.name, (err, data) => {
    if (err) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    hashUtil.compare(user.pass, data['password'], (err, result) => {
      if (err || !result) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(401);
        return
      }
      next();
    })
  })
}

function validateParams(paramObj, config, callback) {
  if (config.PARAM_KEYS) {
    for (key in paramObj) {
      validator.check
      if (config.PARAM_KEYS.indexOf(key) < 0) {
        return callback(CONSTANT.PARAM_NOT_DEFINED, undefined);
      }
      if (config.REQUIRED_PARAMS.indexOf(key) > -1) {
        if (paramObj[key] === undefined || paramObj[key] === null || paramObj[key] === "") {
          return callback(CONSTANT.IMPROPER_PARAM_SENT, undefined);
        }
      }
    }
  }
  return callback(undefined, CONSTANT.VALIDATED_PARAMS);
}


function validateCreateUser(req, res, next) {
  if(!emailValidator.validate(req.body['username']) ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid email provided'});
    return;
  }
  if(req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid password provided'});
    return;
  }
  if(req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}

function validateUpdateUser(req, res, next) {
  if(req.body['username'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'username can\'t be updated'});
    return;
  }
  if(req.body['updated_time'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time  can\'t be updated'});
    return;
  }
  if(req.body['created_time'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time can\'t be updated'});
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid password provided'});
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}

module.exports = {
  authenticate,
  validateParams,
  validateCreateUser,
  validateUpdateUser
}