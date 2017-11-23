var kafka = require('../kafka/client');

var deleteHotels = function (req, res) {


    console.log("in node " +req.body.hId );
    kafka.make_request('adminDelete_topic', {
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

exports.deleteHotels = deleteHotels;