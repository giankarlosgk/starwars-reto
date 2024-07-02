const responseSearchHandler = (statusCode, mensaje, configuracion=null, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
    }

    if (configuracion) {
        responseBody.configuracion = configuracion;
    }else{
        responseBody.configuracion = null;
    }
    return {
        statusCode,
        headers: { "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET" },
        body: JSON.stringify(responseBody)
    };
};

module.exports = responseSearchHandler;