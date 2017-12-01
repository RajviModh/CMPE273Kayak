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
var flights = require('./routes/flight_search');
var bookings = require('./routes/bookings');
var logout = require('./routes/logout')

var app = express();
const hotelRoutes = require('./routes/hotel/hotelRoutes');
const carRoutes = require('./routes/car/carRoutes');
//Enable CORS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Enable CORS
app.use(cors(corsOptions));

app.use(session({
    cookieName: 'session',
    secret: 'cmpe273_dropbox',
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(hotelRoutes);
app.use(carRoutes);

app.use('/', index);
app.post('/adminAddHotels', adminAddHotels.addHotels);
app.post('/adminAddFlights', adminAddFlights.addFlights);
app.post('/adminAddCars', adminAddCars.addCars);
app.post('/adminSearchHotels', adminSearchHotels.searchHotels)
app.use('/flights', flights);
app.use('/signup',signup);
app.use('/bookings',bookings)
app.use('/logout',logout)

app.post('/login',function(req, res,next) {
    var session = req.session;
    console.log("username in app" + JSON.stringify(req.body));
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send({status:500});
        }
        if(!user) {
            res.status(401).send({status:401});
        }
        if(user) {
            session.user = user.userid;
            console.log("user is ", user)
            console.log("i am in session ", req.session.user);
            console.log("session initialized");
            // console.log("back in app.js root : " +user.root);
            //console.log("back in app.js userid : "+user.userid);
            console.log("back in app.js" + JSON.stringify(user));

            return res.status(201).send({
                userid: user.user_id,
                email: user.email,
                status: '201'
            });
        }
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
