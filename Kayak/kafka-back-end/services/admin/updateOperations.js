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
    else if (msg.hasOwnProperty('f_id')) {

        console.log("in flight update operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var updateFlightsQuery = "UPDATE kayak.flight SET " + msg.columnName + " = '"+msg.newValue+"' where f_id= '"+msg.f_id+"'";
        console.log("Query is:" + updateFlightsQuery);

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

        }, updateFlightsQuery);
    }
    else if (msg.hasOwnProperty('CID')) {

        console.log("in car add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var updateCarsQuery = "UPDATE kayak.car SET " + msg.columnName + " = '"+msg.newValue+"' where CID= '"+msg.CID+"'";
        console.log("Query is:" + updateCarsQuery);

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

        }, updateCarsQuery);
    }

    else if (msg.hasOwnProperty('user_id')) {

        console.log("in car add operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var updateUsersQuery = "UPDATE kayak.user SET " + msg.columnName + " = '"+msg.newValue+"' where user_id= '"+msg.user_id+"'";
        console.log("Query is:" + updateUsersQuery);

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

        }, updateUsersQuery);
    }
}


exports.handle_request = handle_request;