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

    else if (msg.hasOwnProperty('year')) {

        var query = "CALL kayak.admin_stuff("+msg.year+","+msg.month+")";
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
    else if (msg.hasOwnProperty('bills')) {
        var viewBillsQuery = "select  YEAR(hotel_booking.booking_date) as BookingYear, MONTH(hotel_booking.booking_date) as BookingMonth,hotel_booking.BID, user.user_fname, user.user_lname, user.phone, hotel_booking.from_date, hotel_booking.to_date, hotel_booking.booking_date, hotel.HID, name as hotelName, hotel_room.type, hotel_booking.total_amount from hotel_booking "+
            "inner join user on hotel_booking.booked_by = user.user_id inner join hotel_room on hotel_room.RID=hotel_booking.RID inner join hotel on hotel.HID = hotel_room.HID;";

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

        }, viewBillsQuery);
    }
    else if (msg.hasOwnProperty('carBills')) {
        var viewBillsQuery = "select  YEAR(car_booking.booking_date) as BookingYear, MONTH(car_booking.booking_date) as BookingMonth,car_booking.BID, user.user_fname, user.user_lname, user.phone, car_booking.from_datetime, car_booking.to_datetime, car_booking.booking_date, car.CID, make as carMake, model as carModel, pickup_point, car_booking.total_amount \n" +
            "from car_booking \n" +
            "inner join\n" +
            "user\n" +
            "on car_booking.booked_by = user.user_id \n" +
            "inner join \n" +
            "car\n" +
            "on car_booking.CID = car.CID";
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

        }, viewBillsQuery);
    }
    else if (msg.hasOwnProperty('flightBills')) {
        var viewBillsQuery = "\n" +
            "select  YEAR(flight_booking.booking_date) as BookingYear, MONTH(flight_booking.booking_date) as BookingMonth,flight_booking.booking_id as BID,flight_booking.f_id, user.user_fname, user.user_lname, user.phone, flight_booking.booking_date, airline_name, time_s, time_e, `from`,`to`, booked_seats_e, booked_seats_b, booked_seats_f, flight_booking.fare \n" +
            "from flight_booking \n" +
            "inner join\n" +
            "user\n" +
            "on flight_booking.user_id = user.user_id \n" +
            "inner join \n" +
            "flight\n" +
            "on flight_booking.f_id = flight.f_id"

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

        }, viewBillsQuery);
    }


}
exports.handle_request = handle_request;