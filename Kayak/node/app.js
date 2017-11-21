var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require("express-session");
var passport = require('passport');
require('./routes/login')(passport);
var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var adminAddHotels = require('./routes/admin/addhotels');
var adminAddFlights = require('./routes/admin/addflights');
var adminAddCars = require('./routes/admin/addcars');
var adminSearchHotels = require('./routes/admin/searchhotels');

var app = express();

//Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.post('/doSignUp',signup.doSignUp);
app.post('/adminAddHotels',adminAddHotels.addHotels);
app.post('/adminAddFlights',adminAddFlights.addFlights);
app.post('/adminAddCars',adminAddCars.addCars);
app.post('/adminSearchHotels',adminSearchHotels.searchHotels)

app.post('/login',function(req, res,next) {
    console.log("username in app" + JSON.stringify(req.body));
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        //req.session.user = user.username;
        //console.log(req.session.user);
        console.log("session initialized");
       // console.log("back in app.js root : " +user.root);
        //console.log("back in app.js userid : "+user.userid);
        console.log("back in app.js" + JSON.stringify(user));

        return res.status(201).send({
            //results: user,
            //username: user.username,
            //userid: user.userid,
            //root: user.root,
            userid : user.userid,
            email:user.email,
            status: '201'});
    })(req, res,next);
});

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

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
