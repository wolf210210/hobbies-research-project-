const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const HobbiesSchema =  mongoose.Schema({

    username:{
        type :String,
        required:true

    },
    hobbie:{
        type :String,
        required:true

    }
});

const Hobbie = module.exports = mongoose.model('Hobbies',HobbiesSchema );

module.exports.addHobbie = function(newhobbie , callback){
              newhobbie.save(callback);

}
module.exports.getHobbiesByUsername = function (username,callback){
    const query = {username:username}
    Hobbie.find(query,callback);
}