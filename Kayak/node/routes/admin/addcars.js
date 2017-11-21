var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addCars = function (req, res) {

    console.log("in node" + req.body.endTime);
    kafka.make_request('adminAdd_topic', {
        "carId": req.body.car_id,
        "carType": req.body.car_type,
        "carName": req.body.car_name,
        "noOfPeople": req.body.no_of_people,
        "noOfBags": req.body.no_of_bags,
        "noOfDoors": req.body.no_of_doors,
        "carOwner": req.body.car_owner,
        "carLocation":req.body.car_location
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