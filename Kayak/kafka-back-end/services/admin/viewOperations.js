var mysql = require('../mysql');

function handle_request(msg, callback) {
    var res = {};
    if (msg.hasOwnProperty('hotel')) {
        var viewHotelsQuery = "select hotel.HID, `name`, street, city, state, stars, freebies, RID, `type`, total_rooms, rent from kayak.hotel left join kayak.hotel_room on hotel.HID=hotel_room.HID order by hotel.HID";

        console.log("Query is:" + viewHotelsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results) ;

                res.code = "200";
                res.value = "Searched Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, viewHotelsQuery);
    }
    else if (msg.hasOwnProperty('flight')) {
        var viewFlightsQuery = "select * from kayak.flight";

        console.log("Query is:" + viewFlightsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results) ;

                res.code = "200";
                res.value = "Searched Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, viewFlightsQuery);
    }
    else if (msg.hasOwnProperty('car')) {
        var viewCarsQuery = "select * from kayak.car";

        console.log("Query is:" + viewCarsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results) ;

                res.code = "200";
                res.value = "Searched Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, viewCarsQuery);
    }

    else if (msg.hasOwnProperty('user')) {
        var viewCarsQuery = "select * from kayak.user";

        console.log("Query is:" + viewCarsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results) ;

                res.code = "200";
                res.value = "Searched Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, viewCarsQuery);
    }

    else if (msg.hasOwnProperty('cityByRevenue')) {



        var query = "CALL kayak.admin_stuff()";
        console.log("Query is:" + query);


        mysql.fetchData(function (err, results) {
            if (!err) {
                let responseData = [results[0], results[1], results[2], results[3], results[4], results[5], results[6], results[7], results[8]];
                console.log(responseData[0]);
                console.log(responseData[1]);
                console.log(responseData[2]);
                console.log(responseData[3]);
                console.log(responseData[4]);
                console.log(responseData[5]);

                res.code = "200";
                res.value = "Searched Successfully";
                res.results=responseData;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, query);

    }


}
exports.handle_request = handle_request;