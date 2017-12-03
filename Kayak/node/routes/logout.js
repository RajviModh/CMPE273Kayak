var express = require('express')
var router = express();

router.get('/logout', function (req, res, next) {
    var session=req.session;
    console.log("In logout ", req.session.user)
    session.user = null;
    session.destroy();
    res.status(201).json({
        data:'I have logged out',
        message : "Logged Out."
    });
});

module.exports = router;