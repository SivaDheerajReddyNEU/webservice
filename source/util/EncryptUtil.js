const CONFIG = require('./../config');
const BCRYPT = require('bcrypt');

function hash(text,callback){
  BCRYPT.hash(text, CONFIG.SALT_ROUND, function(err, hash) {
      return callback(err,hash);
  });
}

function compare(currentText, hash, callback){
  BCRYPT.compare(currentText, hash, function(err, result) {
    return callback(err,result);
});
}

module.exports={
  hash,
  compare
}