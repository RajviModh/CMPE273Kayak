const mysql = require('../mysql');

function handleRequest(data, callback) {

    let response = {};
    /*data = {
        pickUpPoint: request.body.pickUpPoint,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate
    };*/

    let carAvailabilityProcedureCallSQL = "CALL kayak.car_availability('" + data.pickUpPoint + "', '" + data.fromDate + "', '" + data.toDate + "');";

    mysql.fetchData((error, rows) => {
        if (error) {
            response.code = 500;
            response.message = "Server Error";
            callback(error, response);
        } else {
            let availableCars = JSON.parse(rows[0][0].availableCars);

            console.log(availableCars);

            response.code = 200;
            response.message = "Search Successful";
            response.payload = availableCars;
            callback(null, response);
        }


    }, carAvailabilityProcedureCallSQL);

}


exports.handleRequest = handleRequest;