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

    let params ={
        grant_type: "password", username: "44656762", password: "JuanRamos1", application:"10"
    }

    console.log("Parametros ", params)

    return createResponse(200,'success OTRO');
}