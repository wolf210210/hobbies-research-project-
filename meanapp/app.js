//import { request } from 'https';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


//Connect to the database
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected',() => {

    console.log('Connected to database'+config.database);

});
// on cannection has error
mongoose.connection.on('error',(err) => {

    console.log('Connected has a error'+err);

});


const app = express();

const users = require('./routes/users');
const hobbies = require('./routes/hobbies');
const bids = require('./routes/bids');
const friends = require('./routes/friends');
// Port Number 
const port = 3000;   

// CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser middleware
app.use(bodyParser.json());

// possport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/hobbies',hobbies);
app.use('/bids',bids);
app.use('/friends',friends);
// Index Route
app.get('/',(req,res) =>{

    res.send('Invalid Endpoint');

});

//Start Sever
app.listen(port,() =>{
     
    console.log('Server stared on port ' + port);

});