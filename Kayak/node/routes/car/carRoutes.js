const mySQL = require('../mysql');
const path = require('path');
const router = require('express').Router();
var kafka = require('../kafka/client');

router.post('/car/search', (request, response, next) => {
    console.log("search data:" + JSON.stringify({
        pickUpPoint: request.body.pickUpPoint,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate
    }));
    kafka.make_request('carSearch', {
        pickUpPoint: request.body.pickUpPoint,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate
    }, (error, kafkaResponse) => {
        console.log('in result');
        console.log(kafkaResponse);
        if (error) {
            response.status(kafkaResponse.code).end(kafkaResponse.message);
            console.log(error);
        }
        else {
            console.log("car search response:" + JSON.stringify(kafkaResponse.payload));
            response.status(kafkaResponse.code).json({
                availableCars: kafkaResponse.payload
            });

        }
    });
});


router.post('/car/search/pickUpPoints', (request, response, next) => {
    kafka.make_request('carPickUpPointsSearch', {}, (error, kafkaResponse) => {
        console.log('in result');
        console.log(kafkaResponse);
        if (error) {
            response.status(kafkaResponse.code).end(kafkaResponse.message);
            console.log(error);
        }
        else {
            response.status(kafkaResponse.code).json({
                pickUpPoints: kafkaResponse.payload
            });

        }
    });
});

router.post('/car/book', (request, response, next) => {
    //chech for session
    console.log("car book data:" + JSON.stringify({
        CID: request.body.CID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        UID: request.session.user
    }));
    kafka.make_request('carBook', {
        CID: request.body.CID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        UID: request.session.user
    }, (error, kafkaResponse) => {
        console.log('in result');
        console.log(kafkaResponse);
        if (error) {
            response.status(kafkaResponse.code).end(kafkaResponse.message);
            console.log(error);
        }
        else {
            response.status(kafkaResponse.code).end();

        }
    });
});

module.exports = router;