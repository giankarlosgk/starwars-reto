'use strict';
const appointmentService = require('../service/appointmentService');
const validarCreacionCita = require('../validators/createAppointmentValidator');

// Handler para crear una nueva cita
module.exports.handler = async (event) => {
  try {
    const request = JSON.parse(event.body);

    const { error } = validarCreacionCita(request);
    if (error) {
        
      console.log("Error " + error.details);
      const errorMessages = error.details.map(err => err.message);
      if(!errorMessages){          
          errorMessages='Error de servicio';
      }
      return responseHandler(400,"error", errorMessages );
    }
    // Crear la cita llamando al servicio
    const newAppointment = await appointmentService.createAppointment(request);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cita registrada exitosamente', data: newAppointment }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};