//import { isMaster } from 'cluster';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Resister 
router.post('/register',(req,res,next) => {
   // res.send('REGISTER');
//    console.log(req.body);
   let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username : req.body.username,  
    password : req.body.password,
    from  : req.body.from, 
    bd  : req.body.bd, 
    aboutYou  : req.body.aboutYou
   });

   User.addUser(newUser,(err,user)=>{
    if(err){
        res.json({success:false, msg:'failed to register user'});
    }
    else{
        res.json({success: true , msg:'User registered'});
    }

   });


});

// Authenticate
router.post('/authenticate',(req,res,next) => {
    //res.send('AUTHENDTICATE');
 
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=> {
        if(err) throw err;
        if(!user){
            return res.json({success:false , msg : 'User not found'});
        }
 
        User.comparePassword(password , user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    // i week login time
                    expiresIn : 604800
                });

                res.json({  
                     success:true, 
                    token: 'JWT '+token,
                     user:{ 
                         id:user._id,
                         name: user.name,
                         username:user.username,
                         email:user.email
                     }
                });

            }
            else{
                return res.json({success: false , msg :'Wrong password'})
            }
        });

    });

});



router.put('/Updateprofile',(req,res,next) => {

    //  console.log(req.body);
   
    User.findByIdAndUpdate(req.body._id,
         {
        $set:{  name:req.body.name,
                email: req.body.email,
                from  : req.body.from, 
                bd  : req.body.bd, 
                aboutYou  : req.body.aboutYou
               }
         },
           {
              new :true
           },
           function(err,upUser){
             if(err){
               res.send("error update");
             }else{
               res.json(upUser);
             }
           }
   
     ) 
   
   });

// profile
router.get('/profile',passport.authenticate('jwt',{session:false}) , (req,res,next) => {
  //  res.send('PROFILE');
    res.json({user:req.user});

});



/* get user id by using findByIdAndRemove and then delete the user details. Error message will prompt if the is an error else 
   success message pass via JSON object  */
   router.delete('/deleteProfile/:id',(req,res,next) => {

 
    User.findByIdAndRemove(req.params.id, function(err,deletedProfile){
               if(err){
                 res.send( message = "error deleting ");
               }else{
                //  res.json("successfully deleted");  
              //  console.log('Delete a Profile');
                 res.json({  
                  success:true
                  
                 });
                 
                     
    
               }
             }
     
       ) 
  
  
   });


module.exports = router;