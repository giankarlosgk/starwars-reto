'use strict';
const DynamoClient = require('../utils/dynamoClient');
const pedidoService = require('../service/pedidoService');
const dynamo = DynamoClient.getInstance();
const validarCreacionOsd = require('../validators/configOsdValidator');
const responseHandler = require('../response/pedidoResponse');

module.exports.handler = async (event, context, callback) => {   
    console.log("datos AQUI ", event.body);
    const data = JSON.parse(event.body);
    //const pk = data.marca+"#"+data.canal+"#"+data.tienda;
    //const sk = data.ship_via+"#"+data.sales_type+"#"+data.action+"#"+data.nro_correlativo;
    try {
      // Validación      
      const { error } = validarCreacionOsd(data);
      if (error) {
        
        console.log("Error " + error.details);
        const errorMessages = error.details.map(err => err.message);
        if(!errorMessages){          
          errorMessages='Error de servicio';
        }
        return responseHandler(400,"error", errorMessages );
      }
      let resultado = "";
      
        try {
          resultado = await pedidoService.createConfig(data);
          return responseHandler(200, "ok", "Configuracion registrada");
        } catch (error) {
          console.log("error ", error); 
          return responseHandler(500, "error", "Error al crear la configuracions");
        }      
      

    } catch (error) {
      console.error("Error en la creacion de la configuracion:", error);
      return responseHandler(500, "error", "Error interno del servidor");
    }

};