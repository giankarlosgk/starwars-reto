const responseSearchHandler = (statusCode, mensaje, configuracion=null, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
    }

    if (configuracion) {
        responseBody.configuracion = configuracion;
    }
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
    };
};

module.exports = responseSearchHandler;