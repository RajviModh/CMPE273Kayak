var mysql = require('../mysql');

function handle_request(msg, callback) {
    var res = {};
    if (msg.hasOwnProperty('hotel')) {
        var viewHotelsQuery = "select * from kayak.hotel";

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



        var query = " select SUM(flight_booking.fare) as fare, flight.airline_name from kayak.flight_booking inner join kayak.flight where flight.f_id = flight_booking.f_id AND MONTH(flight_booking.flight_date_s)='11' group by flight.airline_name limit 10";
        console.log("Query is:" + query);


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

        }, query);

    }
    else if (msg.hasOwnProperty('carsChart')) {

       var query = "select `to`, fare_e from kayak.flight";
       console.log("Query is:" + query);

        //var secondquery = "select flight_booking.fare, flight.`from` from flight inner join flight_booking";

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

        }, query);

    }
    else if (msg.hasOwnProperty('hotelsChart')) {

        var query = "select `from`, fare_e from kayak.flight";
        console.log("Query is:" + query);
        //var secondquery = "select flight_booking.fare, flight.`from` from flight inner join flight_booking";
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

        }, query);

    }

}
exports.handle_request = handle_request;