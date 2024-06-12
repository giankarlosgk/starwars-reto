'use strict';
const DynamoClient = require('../utils/dynamoClient');
const pedidoService = require('../service/pedidoService');
const dynamo = DynamoClient.getInstance();
const validarCreacionPedido = require('../validators/pedidoCreateValidator');
const responseHandler = require('../response/pedidoResponse');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const pk = data.marca+"#"+data.canal+"#"+data.tienda;
    const sk = data.ship_via+"#"+data.sales_type+"#"+data.action;
    try {
      // Validación      
      const { error } = validarCreacionPedido(data);
      if (error) {
        
        console.log("Error " + error.details);
        const errorMessages = error.details.map(err => err.message);
        if(!errorMessages){          
          errorMessages='Error de servicio';
        }
        return responseHandler(400,"error", errorMessages );
      }
      
      const pedido = await pedidoService.findByPkAndSk(pk,sk);
      let resultado = "";
      console.log("pedido obtenido " + JSON.stringify(pedido));
      console.log("pedido length " + pedido.length);
      if (pedido.length == 0) {
        try {
          resultado = await pedidoService.create(data);
          return responseHandler(200, "ok", "Pedido registrado");
        } catch (error) {
          console.log("error ", error); 
          return responseHandler(500, "error", "Error al crear pedido");
        }
        
      }else{
        console.log("Pedido repetido ", resultado); 
        return responseHandler(500, "error", "Pedido repetido en tienda");
      } 
      

    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      return responseHandler(500, "error", "Error interno del servidor");
    }

};