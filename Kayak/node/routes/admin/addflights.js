var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addFlights = function (req, res) {

    console.log("in node" + req.body.endTime);
    kafka.make_request('adminAdd_topic', {
        "flightId": req.body.flightId,
        "airlineName":req.body.airlineName,
        "flightSource":req.body.flightSource,
        "flightDestination":req.body.flightDestination,
        "firstClassFare": req.body.firstClassFare,
        "buisnessFare": req.body.buisnessFare,
        "economyFare": req.body.economyFare,
        "firstClassChildFare": req.body.firstClassChildFare,
        "buisnessChildFare":req.body.buisnessChildFare,
        "economyChildFare":req.body.economyChildFare,
        "capacityFirstClass": req.body.capacityFirstClass,
        "capacityBuisness":req.body.capacityBuisness,
        "capacityEconomy":req.body.capacityEconomy,
        "startTimeHours":req.body.startTimeHours,
        "startTimeMinutes":req.body.startTimeMinutes,
        "endTimeHours": req.body.endTimeHours,
        "endTimeMinutes": req.body.endTimeMinutes,
        "flightDate": req.body.flightDate,


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

exports.addFlights = addFlights;