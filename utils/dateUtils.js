const moment = require('moment');

function getFormattedDate() {
    //return moment().format('YYYY-MM-DD HH:mm:ss');
    return moment().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

function getEndOfDayUnixTimestamp() {
    /*const now = moment().utc();
    const adjustedNow = now.subtract(5, 'hours');
    const endOfDay = adjustedNow.clone().endOf('day').set({ hour: 16, minute: 59, second: 0 });*/
    const timePlusTwoMinutes = moment().subtract(5, 'hours').add(2, 'day');
    return timePlusTwoMinutes.unix();
}

function getFormattedDateFolder() {
    // Crear un momento actual y restarle 5 horas
    const adjustedDate = moment().subtract(5, 'hours');

    // Formatear la fecha en el formato 'YYYYMMDD'
    return adjustedDate.format('YYYYMMDD');
}
module.exports = {
    getFormattedDate,
    getFormattedDateFolder,
    getEndOfDayUnixTimestamp
};
