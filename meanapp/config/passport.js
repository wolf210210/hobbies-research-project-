//import { model } from 'mongoose';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts ={}; 
    // this point is change 
    //passport-jwt package has been is now in version 3.0.* fromAuthHeader which was used in
    // version 2 has been replaced with fromHeaderWithScheme(auth_scheme). In this case the auth_scheme is "jwt"
 //   opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts ,(jwt_payload, done) =>{
        User.getUserById(jwt_payload._id,(err,user)=> {
            if(err){
                return done(err , false);
            }
            if(user){
                return done(null,user); 
            }
            else{
                return done(null,false);
            }
        });
    })); 

}
