const express = require('express');
const basicAuth = require('basic-auth');
const userActions = require('./UserActions.js');
const CONSTANT = require('./util/constants');


const app = express();
app.use(express.json());
const router = express.Router();


var auth = function (req, res, next) {
  var user = basicAuth(req);
  req.ctx={};
  req.ctx.user = user;
  console.log(user)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  userActions.getUser(user.name,(err,data)=>{
    if(err){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    else{
      next()
    }
  })
}

router.post('/user',(req,res)=>{
  console.log(req.body);
  const {last_name,first_name,username,password}=req.body;
  const user = {
    userName:username,
    password,
    firstName:first_name,
    lastName:last_name
  }
  userActions.addUser(user,(err,data)=>{
      if(err){
        if(err === CONSTANT.USER_ALREADY_EXISTS){
          res.status(400);
          res.send("User already exists");
          return;
        }
        res.status(500);
        res.send('unexpected error');
        return;
      }
      console.log(data);
      res.status(201)
      res.send(data);
  })
})

router.put('/user/self',auth,(req,res)=>{
  userActions.getUser(req.ctx.user.name,(err, data)=>{
    if(err === CONSTANT.NO_USER_FOUND){
        res.status(400)
        res.send('no user found')
        return;
    }
    else{
      userActions.updateUser(req.ctx.user.name,req.body,(err,data)=>{
        if(err){
          console.log('error while updating details');
          console.log(err)
          res.status(500);
          res.send('unexpected error')
        }
        console.log('updated detail successfully')
        console.log(data)
        res.status(201)
        res.send('updated details successfully');
        return;
      })
    }
  })
})

router.get('/user/self',auth,(req,res)=>{
  userActions.getUser(req.ctx.user.name,(err, data)=>{
    if(err === CONSTANT.NO_USER_FOUND){
        res.status(400)
        res.send('no user found')
    }
    else{
      res.send(data);
    }
  })
})
router.get('/healthz',(req,res)=>{
  console.log('inside get request');
  let response ={};
  response.status='running';
  res.send(response);
});


router.get('*',(req,res)=>{
  res.status(400);
  res.send('url not defined');
});


app.use('/v1',router);


module.exports=app;
