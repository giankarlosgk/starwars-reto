const Joi = require('joi');

// Definir el esquema de validación para la creación de citas
const createAppointmentSchema = Joi.object({
  codigoPais: Joi.string().trim().required().messages({
    'string.empty': 'El campo código de país (pk) no debe estar vacío.',
    'string.trim': 'El campo código de país (pk) no debe contener espacios en blanco al inicio o al final.',
    'any.required': 'El campo código de país (pk) es obligatorio.',
    'string.base': 'El campo código de país (pk) debe ser texto.'
  }),
  fechaSolicitud: Joi.string().trim().required().messages({
    'string.empty': 'El campo fecha no debe estar vacío.',
    'string.trim': 'El campo fecha no debe contener espacios en blanco al inicio o al final.',
    'any.required': 'El campo fecha es obligatorio.',
    'string.base': 'El campo fecha debe ser texto.'
  }),
  codPaciente: Joi.string().trim().required().messages({
    'string.empty': 'El campo código del paciente no debe estar vacío.',
    'string.trim': 'El campo código del paciente no debe contener espacios en blanco al inicio o al final.',
    'any.required': 'El campo código del paciente es obligatorio.',
    'string.base': 'El campo código del paciente debe ser texto.'
  }),
  codSede: Joi.string().trim().required().messages({
    'string.empty': 'El campo sede no debe estar vacío.',
    'string.trim': 'El campo sede no debe contener espacios en blanco al inicio o al final.',
    'any.required': 'El campo sede es obligatorio.',
    'string.base': 'El campo sede debe ser texto.'
  })
});

// Función para validar los datos de la cita
const validarCreacionCita = (appointmentData) => {
  return createAppointmentSchema.validate(appointmentData, { abortEarly: false });
};

module.exports = validarCreacionCita;
