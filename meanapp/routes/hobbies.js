//import { isMaster } from 'cluster';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const Hobbies = require('../models/hobbie');

// Resister 
router.post('/add',(req,res,next) => {
    // res.send('add');
    // console.log(req.body);
    let newhobbie = new Hobbies({
        username : req.body.username, 
        hobbie : req.body.hobbie
       });
    
       Hobbies.addHobbie(newhobbie,(err,hobbie)=>{
        if(err){
            res.json({success:false, msg:'failed to register hobbie'});
        }
        else{
            res.json({success: true , msg:'hobbie registered' , hobbie: hobbie});
        }
    
       });
 
 
 });



router.post('/getHobbiesByUsername',(req,res,next) => {

    
    const username = req.body.username;

    Hobbies.getHobbiesByUsername(username,(err,hobbie)=> {
      if(err) throw err;

      if(!hobbie){

      res.json({success:false , msg : 'hobbie not found'});
     }
      
      if(hobbie){

         return res.json(hobbie);
        
      }

    })
    
});


router.delete('/deleteHobbies/:id',(req,res,next) => {

 
    Hobbies.findByIdAndRemove(req.params.id,
  
             function(err,deletedProject){
               if(err){
                 res.send("error update");
               }else{
                console.log('Deleting a Project');
                 res.json({  
                  success:true, 
                  deletedProject
                 });
                 
    
    
               }
             }
     
       ) 
  
  
});
  

module.exports = router;