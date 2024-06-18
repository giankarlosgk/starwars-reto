'use strict';

const pedidoService = require('../service/pedidoService');
const responseHandler = require('../response/pedidoSearchResponse');
const validarConsulta = require('../validators/configSearchOsdValidator');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    const pk = data.marca
    const sk = "G"
    
    try {
      // Validación
      const { error } = validarConsulta(data);
      if (error) {
          return responseHandler(400,"error", null, error.details );
      }

        const result = await pedidoService.getConfig(pk, sk);
        console.log("configuracion info " + result);
        if (!result.Items || result.Items.length === 0) {
            return responseHandler(404,"error",null, "configuración no encontrada");
        }
      
        const configuracion = result.Items.map(item => ({
            modalidades: JSON.parse(item.modalidades)
        }));
      return responseHandler(200, "Ok", configuracion);

    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return responseHandler(500, "error", null, "Error interno del servidor");
    }

};