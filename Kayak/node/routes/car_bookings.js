var mysql = require('./mysql')
var express = require('express')
var router = express();

router.get('/my_car_bookings', function (req, res, next) {
    var flight_booking=[];

    var fetchDataSQL = "SELECT CONCAT(c.make, ' ', c.model) AS car, CONCAT(c.category, ' ', c.type) AS type, c.pick_up_point AS pickUpPoint, cb.from_datetime AS bookedFrom, cb.to_datetime AS bookedTo, cb.booking_date AS bookedOn, cb.total_amount AS totalAmount FROM car_booking cb INNER JOIN car c ON cb.CID = c.CID WHERE cb.booked_by ="+ req.session.user;

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





