const express = require('express');
// const userActions = require('./UserActions.js');
// const CONSTANT = require('./util/constants.js');
// const hashUtil = require('./util/EncryptUtil.js');

// const securityUtil = require('./security.js');
const app = express();
app.use(express.json());
const router = express.Router();




// router.get('/user/self', securityUtil.authenticate, (req, res) => {
//   userActions.getUser(req.ctx.user.name, (err, data) => {
//     if (err === CONSTANT.NO_USER_FOUND) {
//       res.status(400)
//       res.setHeader('Content-Type', 'application/json');
//       res.send({"error":'no user found'})
//     }
//     else {
//       delete data["password"];
//       res.setHeader('Content-Type', 'application/json');
//       res.send({"data":data});
//     }
//   })
// })




// router.post('/user',securityUtil.validateCreateUser, (req, res) => {
//   console.log(req.body);
//   const { last_name, first_name, username, password } = req.body;
//   // securityUtil.validateCreateUser(req.body, CONSTANT.ADD_USER_PARAM_MAP, (err, data) => {
//   //   if (err) {
//   //     res.status(400);
//   //     res.send(err);
//   //     return;
//   //   }
//   // });

//   hashUtil.hash(password, (err, hash) => {
//     if (err) {
//       console.log('error while hashing the password');
//       res.status(500);
//       res.setHeader('Content-Type', 'application/json');
//       res.send({"error":"unexpected error"});
//       return;
//     }
//     const user = {
//       userName: username,
//       password: hash,
//       firstName: first_name,
//       lastName: last_name
//     }
//     console.log(user);
//     userActions.addUser(user, (err, data) => {
//       if (err) {
//         if (err === CONSTANT.USER_ALREADY_EXISTS) {
//           res.status(400);
//           res.setHeader('Content-Type', 'application/json');
//           res.send("Bad Request");
//           return;
//         }
//         res.status(500);
//         res.setHeader('Content-Type', 'application/json');
//         res.send({"error":"unexpected error"});
//         return;
//       }
//       console.log(data);
//       userActions.getUser(username,(err,data)=>{
//         if(err){
//           console.log("error while geting user details");
//           res.status(500);
//           res.setHeader('Content-Type', 'application/json');
//           res.send({"error":"unexpected error"});
//         }
//         res.status(201);
//         res.setHeader('Content-Type', 'application/json');
//         delete data["password"]
//         res.send(data);
//         return;
//       });
//       return
//     })
//   });


// })

// router.put('/user/self', securityUtil.authenticate,securityUtil.validateUpdateUser, (req, res) => {
//   const { last_name, first_name, username, password } = req.body;
  // requiredParamCheck(req.body, CONSTANT.UPDATE_USER_PARAM_MAP, (err, data) => {
  //   if (err) {
  //     res.status(400);
  //     res.send(err);
  //     return
  //   }
  //   if ((!last_name && !first_name && !username && !password)) {
  //     res.status(400);
  //     res.send("No Update Data")
  //   }
  //   console.log(data);
  // });
//   userActions.getUser(req.ctx.user.name, (err, data) => {
//     if (err === CONSTANT.NO_USER_FOUND) {
//       res.status(400)
//       res.setHeader('Content-Type', 'application/json');
//       // res.send({"error":'no user found'})
//       res.send()
//       return;
//     }
//     else {
//       userActions.updateUser(req.ctx.user.name, req.body, (err, data) => {
//         if (err) {
//           console.log('error while updating details');
//           console.log(err)
//           res.status(500);
//           res.setHeader('Content-Type', 'application/json');
//           // res.send({"error":"unexpected error"})
//           res.send()
//         }
//         console.log({"data":'updated detail successfully'})
//         console.log(data)
//         res.status(204);
//         res.setHeader('Content-Type', 'application/json');
//         // res.send({"data":'updated detail successfully'});
//         res.send()
//         return;
//       })
//     }
//   })
// })





app.use('/v1/user', require('./User/user.controller'));

router.get('/healthz', (req, res) => {
  console.log('inside get request');
  res.send();
});
app.use('/v1', router);
router.get('*', (req, res) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
  // res.send({"error":'url not defined'});
  res.send()
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Unexpected error');
// })
module.exports = app;
