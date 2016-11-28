// call the packages we need
var express = require('express'); // call express
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the mongo db
var dbURI = process.env.MONGOLAB_URI;
mongoose.connect(dbURI);

var index = require('./routes/index');

// define our app using express
var app = express();

// set the port
var port = process.env.PORT || 8080;        // set our port

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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