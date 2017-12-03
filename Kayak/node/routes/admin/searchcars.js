var mysql = require('../mysql');
var kafka = require('../kafka/client');

var searchCars = function (req, res) {

    console.log("in node " + req.body.CID + req.body.make);
    kafka.make_request('adminSearch_topic', {
        "CID": req.body.CID,
        "make": req.body.make
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

exports.searchCars = searchCars;