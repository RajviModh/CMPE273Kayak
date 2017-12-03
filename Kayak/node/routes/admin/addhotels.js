var mysql = require('../mysql');
var kafka = require('../kafka/client');

var addHotels = function (req, res) {

    console.log("in node" + req.body.freebies);
    kafka.make_request('adminAdd_topic', {
        "name": req.body.name,
        "street": req.body.street,
        "city": req.body.city,
        "state": req.body.state,
        "stars": req.body.stars,
        "freebies": req.body.freebies,
        "type": req.body.type,
        "total_rooms": req.body.total_rooms,
        "rent": req.body.rent
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

exports.addHotels = addHotels;