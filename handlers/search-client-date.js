'use strict';

const databaseManager = require('../databaseManager');
const table = process.env.TABLE_DYNAMO;

function createResponse(statusCode, message) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(message)
    };
}
module.exports.handler = async (event, context, callback) => {
  const startDate = event.queryStringParameters.startDate
  const endDate = event.queryStringParameters.endDate
  

  let params = {
    TableName: table,
    FilterExpression:'#dynobase_timestamp between :startDate and :endDate',

   ExpressionAttributeValues: { 
           ":startDate": startDate, 
           ":endDate": endDate
       },
   ExpressionAttributeNames: { "#dynobase_timestamp": "date" }
  }
  let json_result = await databaseManager.searchClientsByDate(params);
  
  return createResponse(200, json_result);
    //return createResponse(200, {mensaje: 'Get all'});
    
};

