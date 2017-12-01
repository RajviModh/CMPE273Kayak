var mysql = require('../mysql');

function handle_request(msg, callback) {
    var res = {};

    if (msg.hasOwnProperty('hotelName')) {
        console.log("in search operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        if(msg.hotelName!=null){
            console.log("in hotelname not null==================");
            var query = "hotelName=('"+msg.hotelName+"')";

            console.log("++++++++query : " +query);
        }
        else if(msg.city!=null)
        {
            console.log("in city not null==================");
            var query = "city=('"+msg.city+"')";

            console.log("++++++++query : " +query);
        }
       /* else
        {
            console.log("in both not null==================");
            //var query = "hotelName = "'"+msg.hotelName+"'" + " and " + " city="+msg.city+"";

            console.log("++++++++query : " +query);

        }*/

        var searchHotelsQuery = "select * from kayak.hotels  where "+ query;

        console.log("Query is:" + searchHotelsQuery);

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

        }, searchHotelsQuery);
    }

    else if (msg.hasOwnProperty('f_id')) {
        console.log("in search operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        if(msg.f_id!=null){
            console.log("in flight id not null==================");
            var query = "f_id=('"+msg.f_id+"')";

            console.log("++++++++query : " +query);
        }
        else if(msg.airline_name!=null)
        {
            console.log("in airline name not null==================");
            var query = "airline_name=('"+msg.airline_name+"')";

            console.log("++++++++query : " +query);
        }
        /* else
         {
             console.log("in both not null==================");
             //var query = "hotelName = "'"+msg.hotelName+"'" + " and " + " city="+msg.city+"";

             console.log("++++++++query : " +query);

         }*/

        var searchFlightsQuery = "select * from kayak.flight  where "+ query;

        console.log("Query is:" + searchFlightsQuery);

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

        }, searchFlightsQuery);
    }


    else if (msg.hasOwnProperty('CID')) {
        console.log("in search operations of kafka back-end");
        console.log("In handle request:" + JSON.stringify(msg));
        if(msg.CID!=null){
            console.log("in car id not null==================");
            var query = "CID=('"+msg.CID+"')";

            console.log("++++++++query : " +query);
        }
        else if(msg.make!=null)
        {
            console.log("in make not null==================");
            var query = "make=('"+msg.make+"')";

            console.log("++++++++query : " +query);
        }
        /* else
         {
             console.log("in both not null==================");
             //var query = "hotelName = "'"+msg.hotelName+"'" + " and " + " city="+msg.city+"";

             console.log("++++++++query : " +query);

         }*/

        var searchCarsQuery = "select * from kayak.car  where "+ query;

        console.log("Query is:" + searchCarsQuery);

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

        }, searchCarsQuery);
    }
}


exports.handle_request = handle_request;