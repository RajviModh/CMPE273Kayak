var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addHotels = function (req, res) {


    console.log("in node" + req.body.hotelprice);
    kafka.make_request('adminAdd_topic', {
        "hotelName": req.body.hotelname,
        "roomType": req.body.roomtype,
        "city": req.body.city,
        "state": req.body.state,
        "hotelPrice": req.body.hotelprice,
        "date": req.body.date,
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.end('An error occurred');
            console.log(err);
        }
        else {
                res.status(201).json({
                    results: results.results,
                    status: '201'

                });

        }
    })

};

exports.addHotels = addHotels;