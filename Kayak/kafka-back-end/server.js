var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var addOperations = require('./services/admin/addOperations');
var searchOperations = require('./services/admin/searchOperations');
var sign_up = require('./services/signup');

var topic_name = 'login_topic';
var adminAdd_topic = 'adminAdd_topic';
var adminSearch_topic = 'adminSearch_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

var topic_signup = 'signup_topic';
consumer.addTopics([adminAdd_topic], function (err,added) {
});
consumer.addTopics([adminSearch_topic], function (err,added) {
});
var consumer_signup = connection.getConsumer(topic_signup);
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
    console.log('received message in sign up',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    sign_up.handle_signup(data.data, function(err,res){
        console.log('after handle sign up',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Sending response from consumer_signup",data);
        });
        return;
    });
});

