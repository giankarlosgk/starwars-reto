const moment = require('moment');

function getFormattedDate() {
    //return moment().format('YYYY-MM-DD HH:mm:ss');
    return moment().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

function getFormattedDateFolder() {
    // Crear un momento actual y restarle 5 horas
    const adjustedDate = moment().subtract(5, 'hours');

    // Formatear la fecha en el formato 'YYYYMMDD'
    return adjustedDate.format('YYYYMMDD');
}
module.exports = {
    getFormattedDate,
    getFormattedDateFolder
};
