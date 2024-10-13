'use strict';
const pedidoService = require('../service/pedidoService');
const validarCreacionPedido = require('../validators/pedidoCreateValidator');
const responseHandler = require('../response/pedidoResponse');

// Convertir los valores del objeto a mayúsculas
function convertToUpperCase(obj) {
    if (typeof obj === 'string') {
        return obj.toUpperCase();
    }
    if (Array.isArray(obj)) {
        return obj.map(convertToUpperCase);
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = convertToUpperCase(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}

module.exports.handler = async (event, context, callback) => {
    console.log("Datos recibidos:", event.body);
    
    let datos;
    try {
        datos = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (error) {
        return responseHandler(400, "error", "Formato JSON inválido.");
    }

    // Asegurarse de que el body contiene el array de pedidos
    if (!datos.pedidos || !Array.isArray(datos.pedidos)) {
        return responseHandler(400, "error", "Se esperaba un arreglo de pedidos en el campo 'pedidos'.");
    }

    const dataArray = datos.pedidos.map(convertToUpperCase);

    const resultados = {
        actualizados: [],
        noActualizados: []
    };

    for (const data of dataArray) {
        console.log("Recorriendo data: ", data);
        const { error } = validarCreacionPedido(data);
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            resultados.noActualizados.push({
                correlativo: data.nro_correlativo,
                motivo: errorMessages.join(', ')
            });
            continue;
        }

        // Pasamos la responsabilidad a la capa de servicio
        const resultado = await pedidoService.procesarPedidos([data]); // Pasa un array con un solo pedido
        resultados.actualizados.push(...resultado.actualizados);
        resultados.noActualizados.push(...resultado.noActualizados);
    }

    return responseHandler(200, "ok", resultados);
};