var mysql = require('../mysql');

function handle_request(msg, callback) {

    var res = {};

    if (msg.hasOwnProperty('hotelName')) {
        console.log("in add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var addHotelsQuery = "insert into kayak.hotels (hotelName,roomType,city,state,hotelPrice,date) VALUES ('" + msg.hotelName + "','" + msg.roomType + "','" + msg.city + "','" + msg.state + "','"+msg.hotelPrice+"','"+msg.date+"')";
        console.log("Query is:" + addHotelsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Added Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, addHotelsQuery);
    }
    else if (msg.hasOwnProperty('flightId')) {

        console.log("in flight add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var addFlightsQuery = "insert into kayak.flights (flightId,flightDate,startTime,endTime,firstClassFare,buisnessFare,economyFare) VALUES ('" + msg.flightId + "','" + msg.flightDate + "','" + msg.startTime + "','" + msg.endTime + "','"+msg.firstClassFare+"','"+msg.buisnessFare+"','"+msg.economyFare+"')";
        console.log("Query is:" + addFlightsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Added Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, addFlightsQuery);
    }
    else if (msg.hasOwnProperty('carId')) {

        console.log("in car add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var addCarsQuery = "insert into kayak.cars (carId,carType,carName,noOfPeople,noOfBags,noOfDoors,carOwner,carLocation) VALUES ('" + msg.carId + "','" + msg.carType + "','" + msg.carName + "','" + msg.noOfPeople + "','"+msg.noOfBags+"','"+msg.noOfDoors+"','"+msg.carOwner+"','"+msg.carLocation+"')";
        console.log("Query is:" + addCarsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Added Successfully";
                res.results=results;

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