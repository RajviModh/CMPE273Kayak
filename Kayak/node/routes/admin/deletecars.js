var kafka = require('../kafka/client');

var deleteCars = function (req, res) {

    //Give CarId

    console.log("in node " +req.body.CID );
    kafka.make_request('adminDelete_topic', {
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

exports.deleteCars = deleteCars;