const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const FriendSchema =  mongoose.Schema({

    username:{
        type :String,
        required:true

    },
    friend:{
        type :String,
        required:true

    }

});

const Bids = module.exports = mongoose.model('Friends',FriendSchema );

module.exports.addHobbie = function(newBids , callback){
                 newBids.save(callback);

}


module.exports.getBidByUsername = function (username,callback){
    const query = {username:username}
    Bids.find(query,callback);
}