'use strict';

const pedidoService = require('../service/pedidoService');
const responseHandler = require('../response/pedidoSearchResponse');
const validarPedido = require('../validators/pedidoSearchValidator');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const pk = data.marca+"#"+data.canal+"#"+data.tienda;
    const sk = data.ship_via+"#"+data.sales_type+"#"+data.action;
    
    try {
      // Validación
      const { error } = validarPedido(data);
      if (error) {
          return responseHandler(400,"error", null, error.details );
      }

      const pedido = await pedidoService.findByPkAndSk(pk,sk);
      console.log("pedido info " + pedido);
      if (pedido.length === 0) {
        return responseHandler(404,"error",null, "pedido no encontrado");
      }      
      return responseHandler(200, "Ok", pedido);

    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};