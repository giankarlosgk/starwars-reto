const AWS = require('aws-sdk');

class DynamoClient {
    static instance;

    static getInstance() {
        if (!this.instance) {            
            this.instance = new AWS.DynamoDB.DocumentClient();
        }
        return this.instance;
    }
}

module.exports = DynamoClient;
