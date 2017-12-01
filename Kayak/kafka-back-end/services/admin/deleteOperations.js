var mysql = require('../mysql');

function handle_request(msg, callback) {

    var res = {};

    if (msg.hasOwnProperty('HID')) {
        console.log("in delete operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        var deleteHotelsQuery = "DELETE from kayak.hotel WHERE HID='"+msg.HID+"'";
        console.log("Query is:" + deleteHotelsQuery);

        mysql.fetchData(function (err, results) {
            if (!err) {
                console.log("After sql query, in results : " + results);

                res.code = "200";
                res.value = "Deleted Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, deleteHotelsQuery);
    }
     else if (msg.hasOwnProperty('f_id')) {

         console.log("in flight delete operations of kafka back-end");
         console.log("In handle request:" + JSON.stringify(msg));
        var deleteHotelsQuery = "DELETE from kayak.flight WHERE f_id='"+msg.f_id+"'";
         console.log("Query is:" + deleteHotelsQuery);

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

         }, deleteHotelsQuery);
     }
     else if (msg.hasOwnProperty('CID')) {

         console.log("in car delete operations of kafka back-end");
         console.log("In handle request:" + JSON.stringify(msg));
        var deleteCarsQuery = "DELETE from kayak.car WHERE CID='"+msg.CID+"'";
        console.log("Query is:" + deleteCarsQuery);

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

        }, deleteCarsQuery);
     }
}


exports.handle_request = handle_request;