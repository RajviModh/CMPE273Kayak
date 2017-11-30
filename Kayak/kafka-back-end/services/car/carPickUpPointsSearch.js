const mysql = require('../mysql');


function handleRequest(data, callback) {

    let response = {};
    /*data = {};*/

    let carPickUpPointsSearchSQL = "SELECT DISTINCT c.pick_up_point FROM car c;";

    mysql.fetchData((error, rows) => {
        if (error) {
            response.code = 500;
            response.message = "Server Error";
            callback(error, response);
        } else {
            let pickUpPoints = [];

            rows.forEach((row) => {
                pickUpPoints.push(row.pick_up_point);
            });
            response.code = 200;
            response.message = "Search Successful";
            response.payload = pickUpPoints;
            callback(null, response);
        }


    }, carPickUpPointsSearchSQL);

}


exports.handleRequest = handleRequest;