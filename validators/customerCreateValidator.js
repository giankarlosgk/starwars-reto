const Joi = require('joi');

const createClienteSchema = Joi.object({
    documento: Joi.string().trim().required().messages({
        'string.empty': 'El campo documento no debe estar vacío.',
        'string.trim': 'El campo documento no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo documento es obligatorio.',
        'string.base': 'El campo documento debe ser texto.'
    }),
    tipoDoc: Joi.string().trim().required().messages({
        'string.empty': 'El campo tipodocumento no debe estar vacío.',
        'string.trim': 'El campo tipo documento no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo tipo documento es obligatorio.',
        'string.base': 'El campo tipo documento debe ser texto.'
    }),
    nombre: Joi.string().trim().allow('').required(),
    apellidoPater: Joi.string().trim().allow('').required(),
    apellidoMat: Joi.string().trim().allow('').required(),
    fechNac: Joi.string().trim().allow('').required(),
    telefono: Joi.string().trim().allow('').required(),
    correo: Joi.string().email().allow('').required(),
    direccion: Joi.string().trim().allow('').required(),
    marca: Joi.string().trim().required(),
    canal: Joi.string().trim().required(),
    gestionDatos: Joi.number().integer().min(0).required(),
    publicidad: Joi.number().integer().min(0).required()
});

const validarCreacionCliente = (clienteData) => {
    return createClienteSchema.validate(clienteData, { abortEarly: false });
};

module.exports = validarCreacionCliente;