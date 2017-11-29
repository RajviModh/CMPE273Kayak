var mysql = require('../mysql');
var kafka = require('../kafka/client');

var updateUsers = function (req, res) {


    //columnName , newColumnValue and Id

    console.log("in node " + req.body.columnName + req.body.newValue +req.body.user_id );
    kafka.make_request('adminUpdate_topic', {
        "columnName": req.body.columnName,
        "newValue": req.body.newValue,
        "user_id":req.body.user_id
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

exports.updateUsers = updateUsers;