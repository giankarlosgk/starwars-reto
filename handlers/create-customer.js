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
          return responseHandler(400,"error", null, error.details );
      }
      
      const cliente = await customerService.findByDocument(documento,tipoDoc);
      let resultado = "";
      console.log("cliente length " + cliente.length);
      if (cliente.length == 0) {
        resultado = await customerService.create(data);
      }else{
        console.log("cliente info " + cliente);
        resultado = await customerService.update(data, cliente);
      }      
      return responseHandler(200, "Cliente registrado", resultado);

    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};