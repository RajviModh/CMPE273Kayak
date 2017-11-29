var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addCars = function (req, res) {

    console.log("in node" + req.body.endTime);
    kafka.make_request('adminAdd_topic', {
        "cId": req.body.cId,
        "carModel": req.body.carModel,
        "carMake": req.body.carMake,
        "carBags": req.body.carBags,
        "carType": req.body.carType,
        "carCategory": req.body.carCategory,
        "carCapacity": req.body.carCapacity,
        "carDoors":req.body.carDoors,
        "pickupPoint":req.body.pickupPoint
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

exports.addCars = addCars;