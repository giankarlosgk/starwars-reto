// src/sqsClient.js
const AWS = require('aws-sdk');


const sqs = new AWS.SQS();
const QUEUE_URL = process.env.QUEUE_NAME_CLIENTE_CSV;

function sendClientCsvQueue(cliente) {
    const body = JSON.stringify(cliente);
    const params = {
        MessageBody: body,
        QueueUrl: QUEUE_URL
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error en cola:', err);
        } else {
            console.log('Mensaje enviado a SQS, ID:', data.MessageId);
        }
    });
}

module.exports = { sendClientCsvQueue };
