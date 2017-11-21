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
                res.value = "Added Successfully";
                res.results=results;

            }
            else {
                res.code = "401";
                res.value = "Failed";
            }
            callback(null, res);

        }, searchHotelsQuery);
    }
}


exports.handle_request = handle_request;