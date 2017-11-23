var kafka = require('../kafka/client');

var deleteFlights = function (req, res) {

    //Give FlightId

    console.log("in node " +req.body );
    kafka.make_request('adminDelete_topic', {
        "":req.body
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

exports.deleteFlights = deleteFlights;