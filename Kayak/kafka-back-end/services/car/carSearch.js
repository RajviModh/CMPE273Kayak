const mysql = require('../mysql');
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();


function handleRequest(data, callback) {

    let response = {};
    /*data = {
        pickUpPoint: request.body.pickUpPoint,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate
    };*/

    let carAvailabilityProcedureCallSQL = "CALL kayak.car_availability('" + data.pickUpPoint + "', '" + data.fromDate + "', '" + data.toDate + "');";
    let id = carAvailabilityProcedureCallSQL;


    client.get(id, function (err, obj) {

        console.time("Query_time");

        if (err) {
            console.log(err);
        }

        if (!obj) {

            mysql.fetchData((error, rows) => {
                if (error) {
                    response.code = 500;
                    response.message = "Server Error";
                    callback(error, response);
                } else {
                    console.log("From SQL")
                    console.timeEnd("Query_time");
                    let availableCars = JSON.parse(rows[0][0].availableCars);

                    console.log(availableCars);

                    response.code = 200;
                    response.message = "Search Successful";
                    response.payload = availableCars;
                    client.set(id, JSON.stringify(response.payload), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                    client.expire(id, 30);
                    callback(null, response);
                }

            }, carAvailabilityProcedureCallSQL);

        }

        else {
            obj = JSON.parse(obj);
            //console.log(obj);
            console.timeEnd("Query_time");
            console.log("From redis");

            response.code = 200;
            response.message = "Search Successful";
            response.payload = obj;
            callback(null, response);
        }
    })
}


exports.handleRequest = handleRequest;