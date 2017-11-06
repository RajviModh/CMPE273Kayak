var express = require('express');


var doSignUp = function(req,res) {
    console.log("in DO signup of node" + req.body);
};
exports.doSignUp=doSignUp;