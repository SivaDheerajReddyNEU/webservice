const db = require('./util/mysql.js');
const CONSTANT = require('./util/constants');


async function addUser(user, callback){
  getUserDetails(user.userName,(err,data)=>{
      if(err === CONSTANT.ERROR_IN_QUERY){
        return callback(CONSTANT.ERROR_IN_QUERY,undefined);
      }
      else if(data){

        console.log("User already exists");
        return callback(CONSTANT.USER_ALREADY_EXISTS,undefined);
      }
      else if(err === CONSTANT.NO_USER_FOUND){
        console.log('inserting user details');
        let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        console.log(date_ob)
        db.query('insert into user (id,username,password,first_name,last_name,created_time,updated_time) values(uuid(),'+db.escape(user.userName)+','+db.escape(user.password)+','+db.escape(user.firstName)+','+db.escape(user.lastName)+','+db.escape(date_ob)+','+db.escape(date_ob)+')',(err,data)=>{
          if(err){
            console.log('error while inserting user details');
            console.log(err);
            return callback(CONSTANT.ERROR_DURING_INSERT,undefined);
          }
          console.log('user added');
          console.log(data);
          return callback(undefined,CONSTANT.USER_ADDED);
        });
      }
  });
}



async function getUserDetails(userName,callback){
  db.query('select * from user where username='+db.escape(userName),(err,data)=>{
    if(err){
      console.log('error in getting user details');
      console.log(err);
      return callback(CONSTANT.ERROR_IN_QUERY,undefined);
    }
    console.log(data)
    console.log("LENGTH: ",data.length === 0)
    if(data.length === 0){
      return callback(CONSTANT.NO_USER_FOUND,undefined);
    }
    return callback(undefined,data[0]);
  });
}


async function updateUserDetails(userName,updateDetails,callback){
  getUserDetails(userName,(err,data)=>{
    if(err){
      return err;
    }
    if(userName !== updateDetails.username){
      getUserDetails(updateDetails.username,(err,data)=>{
        if(err === CONSTANT.ERROR_IN_QUERY){
          return console.log(err);
        }
        if(err===CONSTANT.USER_ALREADY_EXISTS || data){
          console.log('user already exists and user name can\'t be updated');
          return callback(err,undefined);
        }
      })
    }
    let updateString='';
    console.log(updateDetails)
    for( i in updateDetails){
      updateString= updateString + i+" = "+db.escape(updateDetails[i])+",";
    }
    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    updateString+=" updated_time="+db.escape(date_ob);
    console.log('update user set '+updateString+ " where username="+db.escape(userName));
    db.query('update user set '+updateString+ " where username="+db.escape(userName),(err,data)=>{
      if(err){
        console.log("error while updating details");
        console.log(err);
        return callback(CONSTANT.ERROR_UPDATING_DETAILS,undefined);
      }
      console.log("updated details")
      console.log(data)
      return callback(undefined,CONSTANT.UPDATED_DETAILS);
    })
  })
}
exports.addUser = addUser;
exports.getUser = getUserDetails;
exports.updateUser = updateUserDetails;