var mysql = require('../mysql');
var kafka = require('../kafka/client');

var viewBills = function (req, res) {

    console.log("in node " );
    kafka.make_request('adminView_topic', {
        "bills": "bills",
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

var adminViewCarsBills = function (req, res) {

    console.log("in node " );
    kafka.make_request('adminView_topic', {
        "carBills": "carBills",
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


var adminViewFlightsBills = function (req, res) {

    console.log("in node " );
    kafka.make_request('adminView_topic', {
        "flightBills": "flightBills",
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

exports.viewBills = viewBills;
exports.adminViewFlightsBills=adminViewFlightsBills;
exports.adminViewCarsBills=adminViewCarsBills;