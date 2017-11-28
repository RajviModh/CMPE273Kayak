var connection = new require('./kafka/Connection');
var login = require('./services/login');
var addOperations = require('./services/admin/addOperations');
var searchOperations = require('./services/admin/searchOperations');
const hotelSearch = require('./services/hotel/hotelSearch');
const hotelCitiesSearch = require('./services/hotel/hotelCitiesSearch');
const hotelBook = require('./services/hotel/hotelBook');
var topic_name = 'login_topic';
var adminAdd_topic = 'adminAdd_topic';
var adminSearch_topic = 'adminSearch_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();
const hotelSearchTopic = 'hotelSearch';
const hotelCitiesSearchTopic = 'hotelCitiesSearch';
const hotelBookTopic = 'hotelBook';
consumer.addTopics([adminAdd_topic], function (err, added) {
});
consumer.addTopics([adminSearch_topic], function (err, added) {
});
consumer.addTopics([hotelSearchTopic], function (err, added) {
});
consumer.addTopics([hotelCitiesSearchTopic], function (err, added) {
});
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
    } else if (message.topic === hotelSearchTopic) {
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

