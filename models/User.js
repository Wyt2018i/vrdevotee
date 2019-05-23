const sequelize=require('sequelize');
const db=require('../configuration/Database');
const User=db.define('users',{
  Name:{
    type:sequelize.STRING
  },
  Email:{
    type:sequelize.STRING
  },
  Password:{
    type:sequelize.STRING
  }
});

module.exports=User;
