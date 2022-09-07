const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
        if (err) throw err;
        let queueName = "TestQueue";
        let message = "This is First Queue for Testing!";
        channel.assertQueue(queueName, {
            duration: false,
        })
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log("Message:", message);
        setTimeout(() => {
            connection.close();
        }, 1000)
    }) 
})