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


  module.exports.handler = async (form, context, callback)=>{
    console.log("Llega el test epaaaaa!!");
   
     
    let params ={
    Item: {email: "g@mailinator.com", name: "Giankarlos", phone: 9823929329, dni: 47487969, date: "2022-07-04", times: "11:14:30"},
    TableName: table
    };
    try {
      console.log("Creando Cliente: ", params);
      await databaseManager.createClients(params);  

      console.log("Cliente creado: ", params);
    } catch (error) {
      console.log("Hubo error ", error);
    }
   
    
    return createResponse(200, {mensaje: "TEST"});
    


  }


