var connection = new require('./kafka/Connection');
var login = require('./services/login');
var addOperations = require('./services/admin/addOperations');
var searchOperations = require('./services/admin/searchOperations');
const hotelSearch = require('./services/hotel/hotelSearch');
const hotelCitiesSearch = require('./services/hotel/hotelCitiesSearch');
const hotelBook = require('./services/hotel/hotelBook');
const carSearch = require('./services/car/carSearch');
const carPickUpPointsSearch = require('./services/car/carPickUpPointsSearch');
const carBook = require('./services/car/carBook');
var sign_up = require('./services/signup');
var updateOperations = require('./services/admin/updateOperations');
var deleteOperations = require('./services/admin/deleteOperations');
var viewOperations = require('./services/admin/viewOperations');

var topic_name = 'login_topic';
var adminAdd_topic = 'adminAdd_topic';
var adminSearch_topic = 'adminSearch_topic';
var adminUpdate_topic = 'adminUpdate_topic';
var adminDelete_topic = 'adminDelete_topic';
var adminView_topic = 'adminView_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();
const hotelSearchTopic = 'hotelSearch';
const hotelCitiesSearchTopic = 'hotelCitiesSearch';
const hotelBookTopic = 'hotelBook';
const carSearchTopic = 'carSearch';
const carPickUpPointsSearchTopic = 'carPickUpPointsSearch';
const carBookTopic = 'carBook';

/*const redis = require('redis');
let redisClient = redis.createClient();
redisClient.on('connect', function(){
    console.log('Connected to Redis...');
});*/

var topic_signup = 'signup_topic';
consumer.addTopics([adminAdd_topic], function (err, added) {
});
consumer.addTopics([adminSearch_topic], function (err, added) {
});
consumer.addTopics([adminUpdate_topic], function (err,added) {
});
consumer.addTopics([adminDelete_topic], function (err,added) {
});
consumer.addTopics([adminView_topic], function (err,added) {
});
consumer.addTopics([hotelSearchTopic], function (err, added) {
});
consumer.addTopics([hotelCitiesSearchTopic], function (err, added) {
});
consumer.addTopics([hotelBookTopic], function (err, added) {
});
consumer.addTopics([carSearchTopic], function (err, added) {
});
consumer.addTopics([carPickUpPointsSearchTopic], function (err, added) {
});
consumer.addTopics([carBookTopic], function (err, added) {
});

var consumer_signup = connection.getConsumer(topic_signup);
console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    console.log("data on server.js " + JSON.stringify(data));


    if (message.topic == adminAdd_topic) {
        addOperations.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }
    else if (message.topic == adminSearch_topic) {
        searchOperations.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    } else if(message.topic == adminUpdate_topic){
        updateOperations.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }
    else if(message.topic == adminDelete_topic){
        deleteOperations.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }
    else if(message.topic == adminView_topic){
        viewOperations.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }


    else if (message.topic === hotelSearchTopic) {
        const actualPayload = data;
        hotelSearch.handleRequest(actualPayload.data, function (error, response) {
            /*  Here, actualPayload.data points to the content in the message received on the API on kafka-front-end side i.e.:
            {
            "city": request.body.city,
                "fromDate": request.body.fromDate,
                "toDate": request.body.toDate,
                "requiredNoOfRooms": request.body.requiredNoOfRooms
        }*/
            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    } else if (message.topic === hotelCitiesSearchTopic) {
        const actualPayload = data;
        hotelCitiesSearch.handleRequest(actualPayload.data, function (error, response) {

            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    } else if (message.topic === hotelBookTopic) {
        const actualPayload = data;
        console.log("in hotelBookTopic");
        hotelBook.handleRequest(actualPayload.data, function (error, response) {
            /*  Here, actualPayload.data points to the content in the message received on the API on kafka-front-end side i.e.:
            {
        RID: request.body.RID,
        fromDate: request.body.fromDate,
        toDate: request.body.toDate,
        noOfRooms: request.body.noOfRooms,
        UID: request.body.UID
    }*/
            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    } else if (message.topic === carSearchTopic) {
        const actualPayload = data;
        carSearch.handleRequest(actualPayload.data, function (error, response) {

            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    } else if (message.topic === carPickUpPointsSearchTopic) {
        const actualPayload = data;
        carPickUpPointsSearch.handleRequest(actualPayload.data, function (error, response) {

            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    } else if (message.topic === carBookTopic) {
        const actualPayload = data;
        console.log("in carBookTopic");
        carBook.handleRequest(actualPayload.data, function (error, response) {

            console.log('after handle' + JSON.stringify(response));
            let payloads = [
                {
                    topic: actualPayload.replyTo,
                    messages: JSON.stringify({
                        correlationId: actualPayload.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (error, response) {
                console.log(response);
            });
        });
    }
    else {

        login.handle_request(data.data, function (err, res) {
            console.log('after handle' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

});


consumer_signup.on('message', function (message) {
    console.log('message received in sign up');
    console.log('received message in sign up', JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    sign_up.handle_signup(data.data, function (err, res) {
        console.log('after handle sign up', res);
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            console.log("Sending response from consumer_signup", data);
        });
    });
});