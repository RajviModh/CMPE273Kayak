var mysql = require('../mysql');
var kafka = require('../kafka/client');

var updateCars = function (req, res) {


    //columnName , newColumnValue and Id

    console.log("in node " + req.body.columnName + req.body.newValue +req.body.CID );
    kafka.make_request('adminUpdate_topic', {
        "columnName": req.body.columnName,
        "newValue": req.body.newValue,
        "CID":req.body.CID
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

exports.updateCars = updateCars;