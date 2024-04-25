'use strict';
const DynamoClient = require('../utils/dynamoClient');
const customerService = require('../service/customerService');
const dynamo = DynamoClient.getInstance();
const validarCreacionCliente = require('../validators/customerCreateValidator');
const responseHandler = require('../response/customerResponse');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const documento = data.documento
    const tipoDoc = data.tipoDoc
    
    try {
      // Validación
      const { error } = validarCreacionCliente(data);
      if (error) {
        
        console.log("Error " + error.details);
        const errorMessages = error.details.map(err => err.message);
        if(!errorMessages){          
          errorMessages='Error de servicio';
        }
        return responseHandler(400,"error", null, errorMessages );
      }
      
      const cliente = await customerService.findByDocument(documento,tipoDoc);
      let resultado = "";
      console.log("cliente obtenido " + JSON.stringify(cliente));
      console.log("cliente length " + cliente.length);
      if (cliente.length == 0) {
        resultado = await customerService.create(data);
      }else{
        console.log("cliente info actualiza", JSON.stringify(cliente[0])); 
        resultado = await customerService.update(data, cliente[0]);
      }      
      return responseHandler(200, "Cliente registrado", resultado);

    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};