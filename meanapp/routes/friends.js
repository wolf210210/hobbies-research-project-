
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const friend = require('../models/friend');

// Resister 
router.post('/add',(req,res,next) => {
    // res.send('add');
    // console.log(req.body);
    let newfriend = new friend({
        username : req.body.username, 
        friend : req.body.friend    
       });
    
       friend.addHobbie(newfriend,(err,friend)=>{
        if(err){
            res.json({success:false, msg:'failed to add  friend'});
        }
        else{
            res.json({success: true , msg:' add  friend' , friend: friend});
        }
    
       });
 
 
 });


 
 router.delete('/deleteFriend/:id',(req,res,next) => {

 
    friend.findByIdAndRemove(req.params.id,
  
             function(err,deletedProject){
               if(err){
                 res.send("error Delete");
               }else{
                console.log('Deleting a friend');
                 res.json({  
                  success:true, 
                  deletedProject
                 });
                 
    
    
               }
             }
     
       ) 
  
  
});


router.post('/getFriendByUsername',(req,res,next) => {

    
    const username = req.body.username;

    friend.getBidByUsername(username,(err,hobbie)=> {
      if(err) throw err;

      if(!hobbie){

      res.json({success:false , msg : 'friend not found'});
     }
      
      if(hobbie){

         return res.json(hobbie);
        
      }

    })
    
});
 module.exports = router;