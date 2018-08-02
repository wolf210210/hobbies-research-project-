const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const BidsSchema =  mongoose.Schema({

    username:{
        type :String,
        required:true

    },
    condition:{
        type :String,
        required:true

    },
    time:{
        type :String,
        required:true

    },
    price:{
        type :String,
        required:true

    },
    description:{
        type :String,
        required:true

    },
    bidusername:{
        type :String,
        required:true

    }
});

const Bids = module.exports = mongoose.model('Bids',BidsSchema );

module.exports.addHobbie = function(newBids , callback){
                 newBids.save(callback);

}


module.exports.getBidByUsername = function (username,callback){
    const query = {username:username}
    Bids.find(query,callback);
}