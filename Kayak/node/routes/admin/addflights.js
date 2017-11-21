var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addFlights = function (req, res) {



    console.log("in node" + req.body.endTime);
    kafka.make_request('adminAdd_topic', {
        "flightId": req.body.flightId,
        "flightDate": req.body.date,
        "startTime": req.body.startTime,
        "endTime": req.body.endTime,
        "firstClassFare": req.body.firstClassFare,
        "buisnessFare": req.body.buisnessFare,
        "economyFare": req.body.economyFare,
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

exports.addFlights = addFlights;