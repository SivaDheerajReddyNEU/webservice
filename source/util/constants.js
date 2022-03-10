module.exports= Object.freeze({
 NO_USER_FOUND : 'NO_USER_FOUND',
 ERROR_IN_QUERY : 'ERROR_IN_QUERY',
 USER_ADDED : 'USER_ADDED',
 ERROR_DURING_INSERT : 'ERROR_DURING_INSERT',
 PARAM_NOT_DEFINED : 'PARAM_NOT_DEFINED',
 USER_ALREADY_EXISTS : 'USER_ALREADY_EXISTS',
 ERROR_UPDATING_DETAILS : 'ERROR_UPDATING_DETAILS',
 UPDATED_DETAILS : 'UPDATED_DETAILS',
 PARAM_NOT_FOUND : 'PARAM_NOT_FOUND',
 VALIDATED_PARAMS : 'VALIDATED_PARAMS',
 ADD_USER_PARAM_MAP:{
  "PARAM_KEYS":['username','password','first_name','last_name'],
  "REQUIRED_PARAMS":['username','password','first_name','last_name']
},

UPDATE_USER_PARAM_MAP:{
  "PARAM_KEYS":['username','password','first_name','last_name'],
  "REQUIRED_PARAMS":[]
},
S3_BUCKET_NAME : "dheeraj.assign4",// need to make it random
S3_BUCKET_REGION : 'us-east-1',
S3_USERS_PATH : "Users"
});


