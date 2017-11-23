var mysql = require('../mysql');

function handle_request(msg, callback) {

    var res = {};

    if (msg.hasOwnProperty('hId')) {
        console.log("in update operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var updateHotelsQuery = "UPDATE kayak.hotels SET " + msg.columnName + " = '"+msg.newValue+"' where hId="+msg.hId+"";
        console.log("Query is:" + updateHotelsQuery);

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

        }, updateHotelsQuery);
    }
   /* else if (msg.hasOwnProperty('flightId')) {

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
    }*/
}


exports.handle_request = handle_request;