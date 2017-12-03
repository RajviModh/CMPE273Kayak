var mysql = require('./mysql');
var express = require('express');
var bcrypt = require('bcrypt');

function handle_request(msg, callback){

    var res = {};

    console.log("in login of kafka back-end");

        console.log("In handle request:" + JSON.stringify(msg));
    var getUser = "select * from kayak.user where is_active=1 and email_id='" + msg.username+ "'";
    console.log("Query is:" + getUser);

    if(msg.username==="admin@admin.com" && msg.password==="admin"){
        res.code = "200";
        res.value = "Success Login";
        res.isUser=false;
        callback(null, res);
    }
    else{

    mysql.fetchData(function (err, results) {
        //var session = req.session;
        //console.log(session);
        if (err) {
            throw err;
        }
        else {
           /* console.log("After sql query, in results : " ,results);
            console.log("database pass ",results[0].password )
            console.log("user password ",mysql.hashing(msg.password))*/
            if (results.length > 0 && bcrypt.compareSync(msg.password, results[0].password)) {
       //     if (results.length > 0 && msg.password==results[0].password) {
                console.log(results);
                /*session.uid = results[0].user_id;
                console.log("I got userid ", results[0].user_id);
                console.log("I am in session", session.user_id);*/
                // render on success
                if (!err) {
                    res.code = "200";
                    res.value = "Success Login";
                    res.email=results[0].email_id;
                    res.userid = results[0].user_id;
                    res.isUser=true;
                    callback(null, res);
                }

            }
            else {
                res.code = "401";
                res.value = "Failed Login";
                callback(null, res);
            }



        }

    },getUser);

}}


exports.handle_request = handle_request;