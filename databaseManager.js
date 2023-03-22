'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'clients';

module.exports.initializateDynamoClient = newDynamo => {
    dynamo = newDynamo;
};

function removeEmptyStringElements(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] === 'object') {// dive deeper in
            removeEmptyStringElements(obj[prop]);
        } else if (obj[prop] === '') {// delete elements that are empty strings
            delete obj[prop];
        }
    }
    return obj;
}


module.exports.createClients = _params => {
    //let item_data = removeEmptyStringElements(item);
    
    /*return dynamo.put(_params).promise().then(() => {
        return item;
    });*/

    return dynamo.put(_params).promise();
};


module.exports.searchClientsByDate = _params => {
    //let item_data = removeEmptyStringElements(item);
    
    /*return dynamo.put(_params).promise().then(() => {
        return item;
    });*/

    console.log("Envio de parametros", _params);

    const data = dynamo.scan(_params)
    .promise()
    .then(response => response.Items);

    console.log("Datos filtrados", data);
    return data;
};