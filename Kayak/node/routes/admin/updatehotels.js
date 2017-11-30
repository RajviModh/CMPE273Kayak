var mysql = require('../mysql');
var kafka = require('../kafka/client');

var updateHotels = function (req, res) {


    console.log("in node " + req.body.columnName + req.body.newValue +req.body.hId );
    kafka.make_request('adminUpdate_topic', {
        "columnName": req.body.columnName,
        "newValue": req.body.newValue,
        "hId":req.body.hId
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

exports.updateHotels = updateHotels;