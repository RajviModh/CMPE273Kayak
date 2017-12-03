var express = require('express');
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function (username, password, done) {
        var reqUsername = username;
        var reqPassword = password;
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results) {
                console.log('in result');
                console.log(results);
                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.code == 200) {
                        done(null, {userid: results.userid,
                            email: results.emailid,
                            isUser:results.isUser
                        });
                    }
                    else {
                        done(null,false);
                    }

                }
        })
}));
};

