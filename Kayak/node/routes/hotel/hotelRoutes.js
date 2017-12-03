const mySQL = require('../mysql');
const path = require('path');
const router = require('express').Router();
var kafka = require('../kafka/client');

router.post('/hotel/search', (request, response, next) => {

    kafka.make_request('hotelSearch', {
        "city": request.body.city,
        "fromDate": request.body.fromDate,
        "toDate": request.body.toDate,
        "requiredNoOfRooms": request.body.requiredNoOfRooms
    }, (error, kafkaResponse) => {
        console.log('in result');
        console.log(kafkaResponse);
        if (error) {
            response.status(kafkaResponse.code).end(kafkaResponse.message);
            console.log(error);
        }
        else {
            response.status(kafkaResponse.code).json({
                availableHotels: kafkaResponse.payload
            });

        }
    });
});

router.post('/hotel/search/cities', (request, response, next) => {

    kafka.make_request('hotelCitiesSearch', {}, (error, kafkaResponse) => {
        console.log('in result');
        console.log(kafkaResponse);
        if (error) {
            response.status(kafkaResponse.code).end(kafkaResponse.message);
            console.log(error);
        }
        else {
            response.status(kafkaResponse.code).json({
                cities: kafkaResponse.payload
            });

        }
    });
});

router.post('/hotel/book', (request, response, next) => {
    //chech for session
    console.log("reached node" + request.body.RID + request.body.fromDate);
    console.log("user session" + request.session);
    console.log("user from session: " + request.session.user);
    let messagePayload = {
      RID: request.body.RID,
      fromDate: request.body.fromDate,
      toDate: request.body.toDate,
      noOfRooms: request.body.noOfRooms,
      UID: request.session.user
    };
    console.log(messagePayload);
    kafka.make_request('hotelBook', {
        RID: request.body.RID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        noOfRooms: request.body.noOfRooms,
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