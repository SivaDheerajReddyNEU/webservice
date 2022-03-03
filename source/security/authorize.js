const userService = require('./../User/user.service');
const db = require('./../db/db');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorize;

async function authorize (req,res,next){
  const data = basicAuth(req);
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  console.log(data)
  const user = await db.User.findOne({where:{username:data.name}})
  console.log(user)
  console.log(user.password)
  console.log(data.pass)
  if (!(await bcrypt.compare(data.pass, user.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }
  console.log("authentication user details")
  console.log(user) 
  req.ctx={};
  req.ctx.user = data;
  next()
}