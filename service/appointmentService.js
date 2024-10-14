const appointmentRepository = require('../repository/appointmentRepository');
const { convertirFechaATimestamp, calculateTTL } = require('../utils/dateUtilsAppointment.js');

class AppointmentService {
  // Crear una nueva cita después de verificar que no haya conflicto de horarios
  async createAppointment(appointmentRequest){
    const fechaSolicitud = convertirFechaATimestamp(appointmentRequest.fechaSolicitud);
    console.log("Llega al service fechaSolicitud"+ fechaSolicitud);
    // Verificar conflictos de citas
    const existingAppointments = await appointmentRepository.searchAppointmentByPkAndSk(
      appointmentRequest.codigoPais,  // Código del país
      fechaSolicitud+"#"+appointmentRequest.codSede    // Fecha y sede concatenadas
    );

    if (existingAppointments.length > 0) {
      throw new Error('Ya existe una cita programada para ese horario en esta sede.');
    }

    // Calcular el TTL (expiración de la cita después de un día)
    const appointmentData = {
      pk: appointmentRequest.codigoPais,
      sk: fechaSolicitud+"#"+appointmentRequest.codSede ,
      codPaciente: appointmentRequest.codPaciente,
      estado: 'Registrado',  // Estado inicial
      dataExpire: calculateTTL(appointmentRequest.fechaSolicitud),  // Expira al día siguiente
    };

    // Guardar la nueva cita
    return await appointmentRepository.saveAppointment(appointmentData);
  };

  // Consultar citas por paciente
  async getAppointmentsByPatient(codPaciente) {
    return await appointmentRepository.getAppointmentsByPatient(codPaciente);
  };

  async getAppointmentsByDateRange(pk, desde, hasta) {
    // Convertir las fechas a timestamps UNIX
    const startTimestamp = convertirFechaATimestamp(desde);
    const endTimestamp = convertirFechaATimestamp(hasta);
    return await appointmentRepository.getAppointmentsByDateRange(pk, startTimestamp, endTimestamp);
  };  

  // Consultar citas por paciente
  async getAppointmentsByPkAndSk(pk,sk) {
    return await appointmentRepository.searchAppointmentByPkAndSk(pk,sk);
  };
}

module.exports = new AppointmentService();