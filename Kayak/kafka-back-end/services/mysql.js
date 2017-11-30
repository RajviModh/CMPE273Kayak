var mysql = require('mysql');
var bcrypt = require('bcrypt');

var pool = mysql.createPool({
        connectionLimit : 100,
        host     : '127.0.0.1',
        user     : 'root',
        password : 'iamatsjsu1',
        database : 'kayak',
        port	 : 3306,
    debug: false
    });


function fetchData(callback,sqlQuery,data){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err, connection) {
        connection.query(sqlQuery,data, function(err, rows) {

            if (err) {
                console.log("ERROR: " + err.message);
            } else {
                callback(err, rows);
            }
            connection.release();
        });
    });
};

var setData = function(callback,sqlQuery,data) {
    pool.getConnection(function(err, connection) {
        connection.query(sqlQuery,data, function(err, rows) {
            try {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                callback(err, rows);

            } finally {
                connection.release();
            }
        });
    });

};

var hashing = function(passwd) {
    var salt = bcrypt.genSaltSync(10);
    var newPass = bcrypt.hashSync(passwd, salt);
    return newPass;
};

var compareHashed = function(passwd,hash){
    return bcrypt.compareSync(passwd, hash);
};

exports.hashing=hashing;
exports.compareHashed=compareHashed;

exports.fetchData=fetchData;
exports.setData = setData;