const Joi = require('joi');

const tipoDeVentaSchema = Joi.object({
    id: Joi.string().trim().required().messages({
        'string.empty': 'El campo id del tipo de venta no debe estar vacío.',
        'string.trim': 'El campo id del tipo de venta no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo id del tipo de venta es obligatorio.',
        'string.base': 'El campo id del tipo de venta debe ser texto.'
    }),
    nombre: Joi.string().trim().required().messages({
        'string.empty': 'El campo nombre del tipo de venta no debe estar vacío.',
        'string.trim': 'El campo nombre del tipo de venta no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo nombre del tipo de venta es obligatorio.',
        'string.base': 'El campo nombre del tipo de venta debe ser texto.'
    })
});

const modalidadSchema = Joi.object({
    id: Joi.string().trim().required().messages({
        'string.empty': 'El campo id de la modalidad no debe estar vacío.',
        'string.trim': 'El campo id de la modalidad no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo id de la modalidad es obligatorio.',
        'string.base': 'El campo id de la modalidad debe ser texto.'
    }),
    nombre: Joi.string().trim().required().messages({
        'string.empty': 'El campo nombre de la modalidad no debe estar vacío.',
        'string.trim': 'El campo nombre de la modalidad no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo nombre de la modalidad es obligatorio.',
        'string.base': 'El campo nombre de la modalidad debe ser texto.'
    }),
    tipos_de_venta: Joi.array().items(tipoDeVentaSchema).required().messages({
        'array.base': 'El campo tipos de venta debe ser una lista de objetos.',
        'any.required': 'El campo tipos de venta es obligatorio.'
    })
});

const configuracionSchema = Joi.object({
    marca: Joi.string().trim().required().messages({
        'string.empty': 'El campo marca no debe estar vacío.',
        'string.trim': 'El campo marca no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo marca es obligatorio.',
        'string.base': 'El campo marca debe ser texto.'
    }),
    modalidades: Joi.array().items(modalidadSchema).required().messages({
        'array.base': 'El campo modalidades debe ser una lista de objetos.',
        'any.required': 'El campo modalidades es obligatorio.'
    })
});

const validarConfiguracion = (configuracionData) => {
    return configuracionSchema.validate(configuracionData);
};

module.exports = validarConfiguracion;
