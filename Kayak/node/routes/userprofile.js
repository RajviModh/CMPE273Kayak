var express = require('express');
var router = express.Router();
var multer = require('multer');
var mysql=require("./mysql");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,req.headers.path)
    },
    filename: function (req, file, cb) {
        var fname=file.originalname ;
        console.log(fname)
        cb(null, fname);

    },
});

var upload = multer({storage:storage});

router.post('/saveUserProfile',upload.any(), function (req, res, next) {
    console.log("session here is ",req.session)
    console.log("In upload profile pic");
    console.log("request data is ",req.body);
    console.log("request data is ",req.files);
    var update_profile;

    if(req.files.length>0)
        update_profile = "update user set email_id='"+req.body.email+"',zip='"+req.body.zip+"',state='"+req.body.state+"',city='"+req.body.city+"',address2='"+req.body.add2+"',address1='"+req.body.add1+"',user_fname='"+req.body.fname+"',user_lname='"+req.body.lname+"',phone='"+req.body.contact_no+"',profile_pic='./public/uploads/Profile_pics/"+req.files[0].filename+"' where user_id="+req.session.user;
    else
        update_profile = "update user set email_id='"+req.body.email+"',zip='"+req.body.zip+"',state='"+req.body.state+"',city='"+req.body.city+"',address2='"+req.body.add2+"',address1='"+req.body.add1+"',user_fname='"+req.body.fname+"',user_lname='"+req.body.lname+"',phone='"+req.body.contact_no+"' where user_id="+req.session.user;

        mysql.setData(function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json({message: 'An error occured'});
            }
            else {
                console.log("results in else ",results);
                console.log("sending response");
                res.status(201).json({status:'201',message:'successful'});
                //console.log("response is ",res)
                console.log("response sent")
            }
        }, update_profile)

});

module.exports = router;
