
 const emailValidator = require('email-validator');

 function validateCreateUser(req, res, next) {
  if(!emailValidator.validate(req.body['username']) ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid password provided'});
    res.send()
    return;
  }
  if(!req.body['last_name'] || req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid last_name provided'});
    res.send()
    return;
  }
  if(!req.body['first_name'] || req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid first_name provided'});
    res.send()
    return;
  }
  return next();
}

 function validateUpdateUser(req, res, next) {

  console.log('inside validate')
  if(req.body['username'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'username can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['updated_time'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'updated time  can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['created_time'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'created time can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid password provided'});
    res.send()
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid last_name provided'});
    res.send()
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid first_name provided'});
    res.send()
    return;
  }
  return next();
}

module.exports={
  validateCreateUser,
  validateUpdateUser
}