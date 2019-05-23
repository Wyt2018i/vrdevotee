const sequelize=require('sequelize');
const User=require('../models/User');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
router.post('/register',(req,res)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const Name=req.body.name;
    const Email=req.body.email;
    const Password=hash;
    User.create({
      Name,
      Email,
      Password
    }).then(result=>{
      res.status(200).json({
        message:"User registered",

      });
    }).catch(err=>{
      res.status(405).json({
        message:"error occured",
        error:err
      });
    });
  });
});
router.post('/login',(req,res)=>{
  const Email=req.body.email;
  let fetchedUser;
  User.findOne({where:{Email}}).then(user=>{
    if(!user)
    {
      res.status(401).json({
        message:'User not found'
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password,user.Password);
  }).then(result=>{
    if(!result)
    {
      res.status(405).json({
        message:'Authentication problem'
      });
    }
    const token=jwt.sign(
       {email:fetchedUser.Email},
       "Jackward",
       {expiresIn:'72h'}
    );
    res.status(200).json({
      token:token,
      expiresIn:72000,
      email:fetchedUser.Email,
      name:fetchedUser.Name,
      id:fetchedUser.id
    });
  }).catch(err=>{
      res.status(409).json({
        message:"Error occured",
        error:err
      });
  });
});
module.exports=router;
