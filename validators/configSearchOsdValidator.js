const Joi = require('joi');

const consultaSchema = Joi.object({
    marca: Joi.string().trim().required().messages({
        'string.empty': 'El campo marca no debe estar vacío.',
        'string.trim': 'El campo marca no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo marca es obligatorio.',
        'string.base': 'El campo marca debe ser texto.'
    })
});

const validarConsulta = (consultaData) => {
    return consultaSchema.validate(consultaData);
};

module.exports = validarConsulta;