
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const Bids = require('../models/bid');


// Resister 
router.post('/add',(req,res,next) => {
    // res.send('add');
    // console.log(req.body);
    let newhobbie = new Bids({
        username : req.body.username, 
        condition : req.body.condition,
        time: req.body.time,
        price: req.body.price,
        description: req.body.description,
        bidusername: req.body.bidusername
       });
    
       Bids.addHobbie(newhobbie,(err,hobbie)=>{
        if(err){
            res.json({success:false, msg:'failed to register hobbie'});
        }
        else{
            res.json({success: true , msg:'hobbie registered' , hobbie: hobbie});
        }
    
       });
 
 
 });

 router.delete('/deleteBid/:id',(req,res,next) => {

 
    Bids.findByIdAndRemove(req.params.id,
  
             function(err,deletedProject){
               if(err){
                 res.send("error update");
               }else{
                console.log('Deleting a Bid');
                 res.json({  
                  success:true, 
                  deletedProject
                 });
                 
    
    
               }
             }
     
       ) 
  
  
});

router.post('/getBidsByUsername',(req,res,next) => {

    
    const username = req.body.username;

    Bids.getBidByUsername(username,(err,hobbie)=> {
      if(err) throw err;

      if(!hobbie){

      res.json({success:false , msg : 'hobbie not found'});
     }
      
      if(hobbie){

         return res.json(hobbie);
        
      }

    })
    
});


module.exports = router;