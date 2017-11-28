const mysql = require('../mysql');

function handleRequest(data, callback) {

    let response = {};
    /*data = {
        "city": request.body.city,
        "fromDate": request.body.fromDate,
        "toDate": request.body.toDate,
        "requiredNoOfRooms": request.body.requiredNoOfRooms
    };*/

    let hotelAvailabilityProcedureCallSQL = "CALL kayak.hotel_availability('" + data.city + "', '" + data.fromDate + "', '" + data.toDate + "', " + data.requiredNoOfRooms + ");";

    mysql.fetchData((error, rows) => {
        if (error) {
            response.code = 500;
            response.message = "Server Error";
            callback(error, response);
        } else {
            let availableHotels = JSON.parse(rows[0][0].availableHotels);

            console.log(availableHotels);

            response.code = 200;
            response.message = "Search Successful";
            response.payload = availableHotels;
            callback(null, response);
        }


    }, hotelAvailabilityProcedureCallSQL);

}


exports.handleRequest = handleRequest;