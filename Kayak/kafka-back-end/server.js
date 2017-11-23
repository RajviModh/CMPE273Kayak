var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var addOperations = require('./services/admin/addOperations');
var searchOperations = require('./services/admin/searchOperations');
var updateOperations = require('./services/admin/updateOperations');
var deleteOperations = require('./services/admin/deleteOperations');

var topic_name = 'login_topic';
var adminAdd_topic = 'adminAdd_topic';
var adminSearch_topic = 'adminSearch_topic';
var adminUpdate_topic = 'adminUpdate_topic';
var adminDelete_topic = 'adminDelete_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();


consumer.addTopics([adminAdd_topic], function (err,added) {
});
consumer.addTopics([adminSearch_topic], function (err,added) {
});
consumer.addTopics([adminUpdate_topic], function (err,added) {
});
consumer.addTopics([adminDelete_topic], function (err,added) {
});
console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    console.log("data on server.js " + JSON.stringify(data));


    if(message.topic == adminAdd_topic){
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
    else if(message.topic == adminSearch_topic){
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
    }
    else if(message.topic == adminUpdate_topic){
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

