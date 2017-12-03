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
    let price = data.price, noOfDays = Math.round((new Date(data.toDate) - new Date(data.fromDate)) / 86400000), noOfRooms = data.noOfRooms;
    console.log(price);
    console.log(noOfDays);
    console.log(noOfRooms);
    let totalAmount = price * noOfDays * noOfRooms;
    console.log(data);
    const hotelBookDML = "INSERT INTO `kayak`.`hotel_booking` (`RID`, `from_date`, `to_date`, `no_rooms`, `booked_by`, `booking_date`, `total_amount`, `guest_first_name`, `guest_last_name`, `guest_contact_no`, `guest_email`) VALUES (" + data.RID + ", '" + data.fromDate + "', '" + data.toDate + "'," + data.noOfRooms + " ," + data.UID + ", NOW(), " + totalAmount + ", '" + data.firstName +"', '" + data.lastName + "', " + data.contact + ", '" + data.email + "');";
    console.log(hotelBookDML);
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