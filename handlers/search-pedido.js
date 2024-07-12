'use strict';

const pedidoService = require('../service/pedidoService');
const responseHandler = require('../response/pedidoSearchResponse');
const validarPedido = require('../validators/pedidoSearchValidator');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const pk = data.marca+"#"+data.canal+"#"+data.tienda;
    /*let sk = data.ship_via + "#" + data.sales_type;
    if (data.action && data.action.trim() !== "") {
      sk += "#" + data.action;
    }*/
    
    try {
      // Validación
      const { error } = validarPedido(data);
      if (error) {
          return responseHandler(400,"error", null, error.details );
      }

      const pedido = await pedidoService.findByMultipleCombinations(data.marca, data.canal, data.tienda, data.configuraciones);
      console.log("pedido info " + pedido);
      if (pedido.length === 0) {
        return responseHandler(200,"Ok",null, "pedido no encontrado");
      }     
      return responseHandler(200, "Ok", pedido);

    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};