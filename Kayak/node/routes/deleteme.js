var express = require('express')
var router = express();
var mysql = require('./mysql')

router.get('/delete', function (req, res, next) {
    var session=req.session;

    var fetchDataSQL = "update user set is_active=0 where user_id="+session.user;

    mysql.fetchData(function(err,results){
        if(err){
            res.status(401).json({message: "Data",data:"some error occurred"});
        } else {
            console.log(results);
            res.status(201).json({message: "Data",data:"deleted"});
        }
    }, fetchDataSQL);
});

module.exports = router;