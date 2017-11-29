var mysql = require('../mysql');
var kafka = require('../kafka/client');

var searchFlights = function (req, res) {

    console.log("in node " + req.body.f_id + req.body.airline_name);
    kafka.make_request('adminSearch_topic', {
        "f_id": req.body.f_id,
        "airline_name": req.body.airline_name
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


exports.searchFlights = searchFlights;