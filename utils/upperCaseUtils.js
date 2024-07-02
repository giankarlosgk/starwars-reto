// Función para convertir los valores del objeto a mayúsculas
function convertToUpperCase(obj) {
    if (typeof obj === 'string') {
        return obj.toUpperCase();
    }
  
    if (Array.isArray(obj)) {
        return obj.map(convertToUpperCase);
    }
  
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = convertToUpperCase(obj[key]);
            return acc;
        }, {});
    }
  
    return obj;
  }
  module.exports = {
    convertToUpperCase
};
  