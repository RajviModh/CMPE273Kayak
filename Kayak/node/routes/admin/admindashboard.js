var mysql = require('../mysql');
var kafka = require('../kafka/client');

var adminViewFlightsChart = function (req, res) {

    console.log("in node " + req.body.year);
    kafka.make_request('adminView_topic', {
        "year" : req.body.year,
        "month" : req.body.month
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

/*var adminViewHotelsChart = function(req,res){
    console.log("in node ");
    kafka.make_request('adminView_topic', {
        "hotelsChart" : 'hotelsChart'
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
}*/

/*var adminViewCarsChart = function(req,res){
    console.log("in node ");
    kafka.make_request('adminView_topic', {
        "carsChart" : 'carsChart'
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
}
*/


exports.adminViewFlightsChart = adminViewFlightsChart;
//exports.adminViewCarsChart = adminViewCarsChart;
//exports.adminViewHotelsChart = adminViewHotelsChart;