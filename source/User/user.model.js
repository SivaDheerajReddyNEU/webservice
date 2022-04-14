const { DataTypes } = require('sequelize');




function model(sequelize){
  const options = {
    defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
  };
  const  attributes={
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name:{
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
    },
    // verified:{
    //   type:DataTypes.BOOLEAN,
    //   allowNull: false,
    //   default:false
    // }
  }
  return sequelize.define('User',attributes,options);
}

module.exports = model;