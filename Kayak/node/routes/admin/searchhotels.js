var mysql = require('../mysql');
var kafka = require('../kafka/client');

var searchHotels = function (req, res) {


    console.log("in node " + req.body.city + req.body.hotelName);
    kafka.make_request('adminSearch_topic', {
        "hotelName": req.body.hotelName,
        "city": req.body.city
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

exports.searchHotels = searchHotels;