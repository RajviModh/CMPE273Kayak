const mysql = require('../mysql');

function handleRequest(data, callback) {

    let response = {};
    /*data = {
        CID: request.body.CID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        UID: request.body.UID
    };*/

    const carBookDML = "INSERT INTO `kayak`.`car_booking` (`CID`, `from_datetime`, `to_datetime`, `booked_by`) VALUES (" + data.CID + ", '" + data.fromDate + "', '" + data.toDate + "', " + data.UID + ")";
    console.log("inserting");
    mysql.setData((error, rows) => {
        if (error) {
            response.code = 500;
            response.message = "Server Error";
            callback(error, response);
        } else {


            response.code = 200;
            response.message = "Insert Successful";
            console.log("inserted");
            callback(null, response);
        }


    }, carBookDML);

}


exports.handleRequest = handleRequest;