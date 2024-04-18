'use strict';

const customerService = require('../service/customerService');
const responseHandler = require('../response/customerResponse');
const validarCliente = require('../validators/customerSearchValidator');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const documento = data.documento
    const tipoDoc = data.tipoDoc
    
    try {
      // Validación
      const { error } = validarCliente(data);
      if (error) {
          return responseHandler(400,"error", null, error.details );
      }

      const cliente = await customerService.findByDocument(documento,tipoDoc);
      console.log("cliente info " + cliente);
      if (cliente.length === 0) {
        return responseHandler(404,"error",null, "Cliente no encontrado");
      }      
      return responseHandler(200, "Ok", cliente);

    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};