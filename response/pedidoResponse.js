const responseSearchHandler = (statusCode, mensaje, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
    }


    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
    };
};

module.exports = responseSearchHandler;