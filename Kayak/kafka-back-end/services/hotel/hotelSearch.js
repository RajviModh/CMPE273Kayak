const mysql = require('../mysql');
const redis = require('redis');

function handleRequest(data, callback) {

    let response = {};
    /*data = {
        "city": request.body.city,
        "fromDate": request.body.fromDate,
        "toDate": request.body.toDate,
        "requiredNoOfRooms": request.body.requiredNoOfRooms
    };*/

    let hotelAvailabilityProcedureCallSQL = "CALL kayak.hotel_availability('" + data.city + "', '" + data.fromDate + "', '" + data.toDate + "', " + data.requiredNoOfRooms + ");";
    let id = hotelAvailabilityProcedureCallSQL;

    /*mysql.fetchData((error, rows) => {
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


    }, hotelAvailabilityProcedureCallSQL);*/

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
                    console.time("Query_time");
                    let availableHotels = JSON.parse(rows[0][0].availableHotels);
                    console.log(availableHotels);
                    response.code = 200;
                    response.message = "Search Successful";
                    response.payload = availableHotels;
                    client.set(id, JSON.stringify(response.payload), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                    client.expire(id, 30);
                    callback(null, response);
                }

            }, hotelAvailabilityProcedureCallSQL);

        }

        else {
            obj = JSON.parse(obj);
            //console.log(obj);
            console.timeEnd("Query_time");
            console.log("From redis");

            //let availableHotels = JSON.parse(obj.availableHotels);
            console.log(availableHotels);
            response.code = 200;
            response.message = "Search Successful";
            response.payload = obj;
            callback(null, response);
        }
    })
}

exports.handleRequest = handleRequest;