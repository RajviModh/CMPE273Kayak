var mysql = require('../mysql');

function handle_request(msg, callback) {

    var res = {};

    if (msg.hasOwnProperty('freebies')) {
        console.log("in add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        //`type`,total_rooms,rent
        //,'" + msg.type + "','" + msg.total_rooms + "','" + msg.rent + "'
        var addHotelsQuery = "insert into kayak.hotel (name,street,city,state,stars,freebies) VALUES ('" + msg.name + "','" + msg.street + "','" + msg.city + "','" + msg.state + "','" + msg.stars + "','" + msg.freebies + "')";
        console.log("Query is:" + addHotelsQuery);

        mysql.fetchData(function (err, results) {

                if(results) {
                    console.log("---------------" + results.insertId);

                    var addHotelRoomsQuery = "insert into kayak.hotel_room (`type`,total_rooms,rent,HID) VALUES ('" + msg.type + "','" + msg.total_rooms + "','" + msg.rent + "','" + results.insertId + "')";
                    console.log("Query is:" + addHotelRoomsQuery);

                    mysql.fetchData(function (err, results) {
                        if (!err) {
                            console.log("After sql query, in results : " + results);
                            res.code = "200";
                            res.value = "Added Successfully";
                            res.results = results;

                        }
                    }, addHotelRoomsQuery);


                }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, addHotelsQuery);
    }
    else if (msg.hasOwnProperty('flightId')) {

        var startTime = msg.startTimeHours + ":" + msg.startTimeMinutes;
        console.log("---------------------- in add flights" + startTime);
        var endTime = msg.endTimeHours + ":" + msg.endTimeMinutes;


        console.log("in flight add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var addFlightsQuery = "insert into kayak.flight (f_id,airline_name,capacity_e,capacity_b,capacity_f,fare_e,fare_b,fare_f,fare_child_e,fare_child_b,fare_child_f,day_no,time_s,time_e,`from`,`to`)" +
            " VALUES ('" + msg.flightId + "','" + msg.airlineName + "','" + msg.capacityEconomy + "','" + msg.capacityBuisness + "','" + msg.capacityFirstClass + "','" + msg.economyFare + "','" + msg.buisnessFare + "','" + msg.firstClassFare + "'," +
            "'" + msg.economyChildFare + "','" + msg.buisnessChildFare + "','" + msg.firstClassChildFare + "','" + msg.flightDate + "','" + startTime + "','" + endTime + "','" + msg.flightSource + "','" + msg.flightDestination + "')";
        console.log("Query is:" + addFlightsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Added Successfully";
                res.results = results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, addFlightsQuery);
    }
    else if (msg.hasOwnProperty('cId')) {

        console.log("in car add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var addCarsQuery = "insert into kayak.car (CID,model,make,bags,type,category,capacity,doors,pickup_point) VALUES ('" + msg.cId + "','" + msg.carModel + "','" + msg.carMake + "','" + msg.carBags + "','" + msg.carType + "','" + msg.carCategory + "','" + msg.carCapacity + "','" + msg.carDoors + "','" + msg.pickupPoint + "')";
        console.log("Query is:" + addCarsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Added Successfully";
                res.results = results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, addCarsQuery);
    }
}


exports.handle_request = handle_request;