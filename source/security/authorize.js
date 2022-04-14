const userService = require('./../User/user.service');
const db = require('./../db/db');
const basicAuth = require('basic-auth');
const bcrypt = require('bcrypt');
module.exports = authorize;

async function authorize (req,res,next){
  const data = basicAuth(req);
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  const user = await db.User.findOne({where:{username:data.name}})
  
  if (!(await bcrypt.compare(data.pass, user.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }
  console.log("verified status");
  console.log(user);
  if (user.verified === false || user.verified === "false" || user.verified === 0 || user.verified === "0")
  {
    res.sendStatus(401);
    return
  }

  console.log("authentication user details")
  // console.log(user) 
  req.ctx={};
  req.ctx.user = data;
  console.log(" user authenticated ...")
  next()
}

