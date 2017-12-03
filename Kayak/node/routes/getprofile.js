var express = require('express');
var router = express.Router();
var mysql=require("./mysql");
var fs = require('fs');

router.post('/getUserProfile', function (req, res, next) {
    console.log("In fetch profile")

    var get_profile = "select * from user where user_id="+req.session.user;

    try {
        mysql.fetchData(function (err, results){
            if (err) {
                console.log(err);
            }
            else {
                console.log("User Profile ",results[0])
                if(results[0].profile_pic===null || results[0].profile_pic==="")
                {
                    var data={
                        fname:results[0].user_fname,
                        lname:results[0].user_lname,
                        email:results[0].email_id,
                        contact_no:results[0].contact_no,
                        about_me:results[0].email_id,
                        add1:results[0].address1,
                        add2:results[0].address2,
                        city:results[0].city,
                        state:results[0].state,
                        zip:results[0].zip,
                        profile_pic:""

                    }
                }
                else{
                var bitmap = fs.readFileSync(results[0].profile_pic);
                //convert binary data to base64 encoded string
                //console.log(new Buffer(bitmap).toString('base64'))
                var data={
                    fname:results[0].user_fname,
                    lname:results[0].user_lname,
                    email:results[0].email_id,
                    contact_no:results[0].contact_no,
                    about_me:results[0].email_id,
                    add1:results[0].address1,
                    add2:results[0].address2,
                    city:results[0].city,
                    state:results[0].state,
                    zip:results[0].zip,
                    profile_pic:(new Buffer(bitmap).toString('base64'))

                }}
                res.status(201).json({status:'201',data:data});

            }
        }, get_profile)
    }

    catch(err){
        console.log(err);
    }

});



module.exports = router;