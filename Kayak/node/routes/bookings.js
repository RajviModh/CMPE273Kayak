var mysql = require('./mysql')
var express = require('express')
var router = express();

router.get('/my_bookings', function (req, res, next) {
    var flight_booking=[];

    var fetchDataSQL = "select f.f_id,f.airline_name,f.time_s,f.time_e,f.from,f.to,fb.booking_date,fb.flight_date_s,duration,booked_seats_e,booked_seats_b,booked_seats_f,fare,p.b_id as bid,p_name,p_age from flight f,flight_booking fb,passenger p where f.f_id=fb.f_id and p.b_id=fb.booking_id and fb.user_id="+req.session.user+" group by p.b_id,p_id order by booking_date desc";

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        } else {
            console.log(results);
            for(var i=0;i<results.length;i++){
                flight_booking.push(results[i]);
            }
            console.log(flight_booking);
            res.status(201).json({message: "Data",data:flight_booking});
        }
    }, fetchDataSQL);
});

module.exports = router;