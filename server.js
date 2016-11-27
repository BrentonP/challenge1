// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI;
//var url = 'mongodb://localhost/pet_db';

mongoose.connect(url);

var index = require('./routes/index');

// define our app using express
var app = express();

// set up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // go to the next route and don't stop here
});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', index);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
console.log('Magic happens on port ' + port);