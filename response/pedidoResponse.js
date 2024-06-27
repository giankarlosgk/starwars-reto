const responseSearchHandler = (statusCode, mensaje, detalle = "") => {
    let responseBody = { status: mensaje, detalle };

    if (detalle) {
        responseBody.detalle = detalle;
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