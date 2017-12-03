var mysql = require('./mysql')

function handle_signup(msg, callback) {

    console.log("In handle sign up:" + JSON.stringify(msg));
    var res={}

    var check="select email_id from user where email_id='"+msg.email+"'"
    console.log("check ",check)

    mysql.setData(function(err,results){
        if(!err && results.length > 0){
            res.code = "401";
            res.value = "User already exists";
            callback(null, res)
        }
        else{
            var signup="INSERT into user (email_id,password,is_active) values ('"+msg.email+"','"+msg.passwd+"',1)";

            mysql.setData(function(err,results){
                if(!err && results.affectedRows > 0){

                    res.code = "201";
                    res.value = "User registered";
                    callback(null, res)
                }
                else{
                    res.code = "401";
                    res.value = "Error found";
                    callback(null, res)
                }
            },signup);
        }
    },check);




}

exports.handle_signup = handle_signup;