const responseSearchHandler = (statusCode, mensaje, cliente = null, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
    }

    if (cliente) {
        responseBody.cliente = cliente;
    }else{
        // En caso de error sin un cliente específico, se devuelve un objeto cliente con todos los campos a null
        responseBody.cliente = {
            documento: null,
            tipoDoc: null,
            nombre: null,
            apellidoPater: null,
            apellidoMat: null,
            direccion: null,
            sexo: null,
            telefono: null,
            correo: null,
            checkPromoBB: null,
            fechaCheckPromoBB: null,
            checkPromoDB: null,
            fechaCheckPromoDB: null,
            checkPromoPP: null,
            fechaCheckPromoPP: null,
            checkPromoCW: null,
            fechaCheckPromoCW: null,
            checkPromoPJ: null,
            fechaCheckPromoPJ: null,
            checkPromoDD: null,
            fechaCheckPromoDD: null,
            checkTratamiento: null,
            fechaTratamiento: null,
            fecPedidoPOS: null,
            marcaPOS: null,
            origenCheckPromoBB: null,
            origenCheckPromoDB: null,
            origenCheckPromoPP: null,
            origenCheckPromoCW: null,
            origenCheckPromoPJ: null,
            origenCheckPromoDD: null,
            origenCheckTratamiento: null
            // Asegúrate de que la lista sea completa según tu modelo de cliente
        };
    }

    return {
        statusCode,
        headers: { "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"},
        body: JSON.stringify(responseBody)
    };
};

module.exports = responseSearchHandler;