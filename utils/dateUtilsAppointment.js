const moment = require('moment');
// Función para convertir la fecha a timestamp
function convertirFechaATimestamp(fechaSolicitud){
    return moment(fechaSolicitud, 'YYYY-MM-DD HH:mm:ss').unix();
};

function calculateTTL(appointmentDate) {
    const ttlDate = new Date(appointmentDate);
    ttlDate.setDate(ttlDate.getDate() + 1);  // Expira al día siguiente de la cita
    return Math.floor(ttlDate.getTime() / 1000);
};

function getFormattedDateFolder() {
    // Crear un momento actual y restarle 5 horas
    const adjustedDate = moment().subtract(5, 'hours');

    // Formatear la fecha en el formato 'YYYYMMDD'
    return adjustedDate.format('YYYYMMDD');
}

  module.exports = {
    convertirFechaATimestamp,
    calculateTTL,
    getFormattedDateFolder
};