const { DataTypes } = require('sequelize');




function model(sequelize){
  const  attributes={
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    key:{
      type: DataTypes.STRING,
      allowNull: false
    },
    created_time:{
      type: DataTypes.STRING,
      allowNull: false
    },
    updated_time:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  return sequelize.define('UserInfo',attributes,{});
}

module.exports = model;