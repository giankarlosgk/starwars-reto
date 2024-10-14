const appointmentService = require('../service/appointmentService');
// Handler para consultar citas por paciente
module.exports.handler = async (event) => {
    try {
      /*
      const pk = event.queryStringParameters.codPais;
      const startDate = event.queryStringParameters.startDate;
      const endDate = event.queryStringParameters.endDate;*/

      const request = JSON.parse(event.body);
  
      // Obtener las citas llamando al servicio
      const appointments = await appointmentService.getAppointmentsByDateRange(request.codigoPais, request.desde, request.hasta);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ data: appointments }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  };