const responseHandler = (statusCode, mensaje, objeto = null) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify({ mensaje, objeto })
    };
};

module.exports = responseHandler;
