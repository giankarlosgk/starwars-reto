function createResponse(statusCode, message) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(message)
    };
}

module.exports.handler = async (event, context, callback) => {
    
    console.log('Hola Mundo');

    return createResponse(200,'success OTRO');
}