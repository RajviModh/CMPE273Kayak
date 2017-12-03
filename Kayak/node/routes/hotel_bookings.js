var mysql = require('./mysql')
var express = require('express')
var router = express();

router.get('/my_hotel_bookings', function (req, res, next) {
    var flight_booking=[];

    var fetchDataSQL = "SELECT h.name AS hotelName, hb.from_date as bookedFrom, hb.to_date AS bookedTo, hb.no_rooms AS roomsBooked, hb.booking_date AS bookedOn, hb.total_amount AS totalAmount, hr.type AS roomType FROM hotel_booking hb INNER JOIN hotel_room hr ON hb.rid = hr.rid INNER JOIN hotel h ON hr.hid = h.hid WHERE hb.booked_by ="+ req.session.user;

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





