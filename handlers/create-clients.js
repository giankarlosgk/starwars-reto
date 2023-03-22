'use strict';

const databaseManager = require('../databaseManager');
const table = process.env.TABLE_DYNAMO;

const createClients = async(_params)=>{
    
    try {
        await docClient.put(_params).promise();
    } catch (e) {
        return e;
    }
}

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

module.exports.handler = async (event, context, callback)=>{    
    const data = JSON.parse(event.body);
    console.log("datos AQUI ", data);
    try {
        if(isNaN(data.phone) || isNaN(data.dni)){     
                console.log("Validacion telefono, numero", data.phone,data.dni)            
                 return createResponse(400, {message: "Datos no numéricos"});
                   
        }
        if (data.phone.length < 9) {
                return createResponse(400, {message: "Formato de telefono erroneo"});
          }
          
        if(data.dni.length < 8){                    
                      return createResponse(400, {message: "Longitud de DNI erronea"});                   
        }
        
        
         let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!expr.test(data.email)){                   
                      return createResponse(400, {message: "El email ingresado no es válido"});  
                    
                }
                
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();        
        let dateNow = year + "-" + month + "-" + date;        
        let dateTimeNow = [("0" + date_ob.getHours()).slice(-2),("0" + date_ob.getMinutes()).slice(-2),("0" + date_ob.getSeconds()).slice(-2)].join(':');
       
         
        let params ={
        Item: {email: data.email, name: data.name, phone: data.phone, dni: data.dni, date: dateNow, times: dateTimeNow},
        TableName: table
        };
              
               await databaseManager.createClients(params);
               return createResponse(200, {message: "Datos Guardados!"});
               
    } catch (e) {               
                return createResponse(400, {message: e});       
    }
};