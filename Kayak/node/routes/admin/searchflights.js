var mysql = require('../mysql');
var kafka = require('../kafka/client');

var searchFlights = function (req, res) {

    console.log("in node " + req.body + req.body);
    kafka.make_request('adminSearch_topic', {
        "": req.body,
        "": req.body
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