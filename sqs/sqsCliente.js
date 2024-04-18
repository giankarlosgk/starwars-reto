// src/sqsClient.js
const AWS = require('aws-sdk');

// Configura tus credenciales y la región de AWS si no están configuradas globalmente
AWS.config.update({
  region: 'tu-región', // Ejemplo: 'us-west-2'
  // credentials: new AWS.Credentials('tu-access-key-id', 'tu-secret-access-key')
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const QUEUE_URL = 'tu-url-de-cola-SQS'; // Asegúrate de proporcionar la URL correcta de tu cola SQS

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
