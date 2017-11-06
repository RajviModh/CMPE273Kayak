
var bcrypt = require("bcrypt");
var mysql = require('./mysql');
var bcrypt = require('bcrypt');

function handle_request(msg, callback){

    var res = {};

    console.log("in login of kafka back-end");

        console.log("In handle request:" + JSON.stringify(msg));
    var getUser = "select * from dropbox.users where email='" + msg.username+ "'";
    console.log("Query is:" + getUser);

    mysql.fetchData(function (err, results) {
        //var session = req.session;
        //console.log(session);
        if (err) {
            throw err;
        }
        else {
            console.log("After sql query, in results : " +results);
            if (results.length > 0 && bcrypt.compareSync(msg.password, results[0].password)) {

                console.log(results);
                //  session.uid = results[0].userid;
                console.log("I got userid ", results[0].userid);
                //console.log("I am in session", session.uid);
                // render on success
                if (!err) {
                    res.code = "200";
                    res.value = "Success Login";
                    res.email=results[0].email;
                    res.userid = results[0].userid;
                }

            }
            else {
                res.code = "401";
                res.value = "Failed Login";
            }
            callback(null, res);


        }

    },getUser);

}


exports.handle_request = handle_request;