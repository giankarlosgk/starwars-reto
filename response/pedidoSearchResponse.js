const responseSearchHandler = (statusCode, mensaje, pedido=null, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
    }

    if (pedido) {
        responseBody.pedido = pedido;
    }
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
    };
};

module.exports = responseSearchHandler;