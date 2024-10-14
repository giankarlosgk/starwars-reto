const dynamoose = require('dynamoose');

// Definir el esquema
const appointmentSchema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,  // Código del País (e.g., "51" para Perú)
  },
  sk: {
    type: String,
    rangeKey: true,  // Fecha y hora de la cita concatenada con CODSEDE (e.g., "202410131657#CODSEDE")
  },
  codPaciente: String,  // Código del paciente
  estado: String,  // Estado de la cita: 'Registrado', 'Pendiente/En proceso', 'Asignado'
  dataExpire:  Number  // TTL para eliminación automática de la cita después de la fecha
}, {
  saveUnknown: false,
  timestamps: false
});

// Crear el modelo
const tableName = process.env.AWS_TABLE_AGENDA;
console.log("Nombre de la tabla " + tableName);
const Appointment = dynamoose.model(tableName, appointmentSchema, { 
    create: false    
});

module.exports = Appointment;