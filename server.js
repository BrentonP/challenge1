// call the packages we need
var express = require('express'); // call express
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// set the environment variable by running:
// SET MONGOLAB_URI=<database-location>
// for example:
// SET MONGOLAB_URI=mongodb://localhost/pet_db
var dbURI = process.env.MONGOLAB_URI;

// connect to the mongo db
mongoose.connect(dbURI);

var index = require('./routes/index');

// define our app using express
var app = express();

// set the port
var port = process.env.PORT || 8080;

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// REGISTER OUR ROUTES
app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// START THE SERVER
app.listen(port);
console.log('Server started on port ' + port);
