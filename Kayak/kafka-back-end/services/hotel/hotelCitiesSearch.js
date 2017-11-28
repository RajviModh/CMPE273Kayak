const mysql = require('../mysql');
handleRequest({}, () => {
});

function handleRequest(data, callback) {

    let response = {};
    /*data = {};*/

    let hotelCitiesSearchSQL = "SELECT DISTINCT h.city FROM hotel h;";

    mysql.fetchData((error, rows) => {
        if (error) {
            response.code = 500;
            response.message = "Server Error";
            callback(error, response);
        } else {
            let cities = [];

            rows.forEach((row) => {
                cities.push(row.city);
            });
            response.code = 200;
            response.message = "Search Successful";
            response.payload = cities;
            callback(null, response);
        }


    }, hotelCitiesSearchSQL);

}


exports.handleRequest = handleRequest;