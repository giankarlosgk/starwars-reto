const Joi = require('joi');

const pedidoSchema = Joi.object({
    marca: Joi.string().trim().required().messages({
        'string.empty': 'El campo marca no debe estar vacío.',
        'string.trim': 'El campo marca no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo marca es obligatorio.',
        'string.base': 'El campo marca debe ser texto.'
    }),
    canal: Joi.string().trim().required().messages({
        'string.empty': 'El campo canal no debe estar vacío.',
        'string.trim': 'El campo canal documento no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo canal documento es obligatorio.',
        'string.base': 'El campo canal documento debe ser texto.'
    }),
    tienda: Joi.string().trim().required().messages({
        'string.empty': 'El campo tienda no debe estar vacío.',
        'string.trim': 'El campo tienda no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo tienda es obligatorio.',
        'string.base': 'El campo tienda debe ser texto.'
    }),
    ship_via: Joi.string().trim().required().messages({
        'string.empty': 'El campo ship_via no debe estar vacío.',
        'string.trim': 'El campo ship_via no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo ship_via es obligatorio.',
        'string.base': 'El campo ship_via debe ser texto.'
    }),
    sales_type: Joi.string().trim().required().messages({
        'string.empty': 'El campo sales_type no debe estar vacío.',
        'string.trim': 'El campo sales_type no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo sales_type es obligatorio.',
        'string.base': 'El campo sales_type debe ser texto.'
    }),
    action: Joi.string().trim().required().messages({
        'string.empty': 'El campo action no debe estar vacío.',
        'string.trim': 'El campo action no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo action es obligatorio.',
        'string.base': 'El campo action debe ser texto.'
    })
});

const validarPedido = (pedidoData) => {
    return pedidoSchema.validate(pedidoData);
};

module.exports = validarPedido;