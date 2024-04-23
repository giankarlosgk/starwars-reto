const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' }); // Asegúrate de configurar la región correctamente

class SqsRepository {
    constructor() {
        this.sqs = new AWS.SQS();
        this.queueUrl = process.env.QUEUE_NAME_CLIENTE_CSV;
    }

    static async getInstance() {
        if (!SqsRepository.instance) {
            SqsRepository.instance = new SqsRepository();
            await SqsRepository.instance.initialize();
            console.log("SqsRepository instance created");
        }
        return SqsRepository.instance;
    }
  
    async initialize() {
        try {
            const response = await this.sqs.getQueueUrl({
                QueueName: process.env.QUEUE_NAME_CLIENTE_CSV
            }).promise();
            this.queueUrl = response.QueueUrl;
            console.log("Queue URL set to:", this.queueUrl);
        } catch (error) {
            console.error("Error fetching Queue URL:", error);
        }
    }
  
    async sendClientCsvQueue(cliente) {
        const messageBody = JSON.stringify(cliente);
        const params = {
            MessageBody: messageBody,
            QueueUrl: this.queueUrl
        };

        console.log('Preparando para enviar a la cola', messageBody);
        console.log('URL de la cola:', this.queueUrl);  // Verifica que la URL es correcta

        try {
            const data = await this.sqs.sendMessage(params).promise();
            console.log('Mensaje enviado a SQS con MessageId:', data.MessageId);
        } catch (error) {
            console.error('Error al enviar mensaje a SQS:', error);
        }
    }
}

module.exports = new SqsRepository();  // Obtiene o crea la instancia