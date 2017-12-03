var mysql = require('../mysql');
var kafka = require('../kafka/client');

var searchBills = function (req, res) {

    console.log("in node " );
    kafka.make_request('adminView_topic', {
        "bills": bills,
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

exports.searchBills = searchBills;