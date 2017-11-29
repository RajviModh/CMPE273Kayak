const mysql = require('../mysql');

function handleRequest(data, callback) {

    let response = {};
    /*data = {
        RID: request.body.RID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        noOfRooms: request.body.noOfRooms,
        UID: request.body.UID
    };*/

    const hotelBookDML = "INSERT INTO `kayak`.`hotel_booking` (`RID`, `from_date`, `to_date`, `no_rooms`, `booked_by`) VALUES (" + data.RID + ", '" + data.fromDate + "', '" + data.toDate + "'," + data.noOfRooms + " ," + data.UID + ");";
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


    }, hotelBookDML);

}


exports.handleRequest = handleRequest;