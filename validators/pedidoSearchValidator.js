const Joi = require('joi');

const configuracionSchema = Joi.object({
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
    })
});

const pedidoSchema = Joi.object({
    marca: Joi.string().trim().required().messages({
        'string.empty': 'El campo marca no debe estar vacío.',
        'string.trim': 'El campo marca no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo marca es obligatorio.',
        'string.base': 'El campo marca debe ser texto.'
    }),
    canal: Joi.string().trim().required().messages({
        'string.empty': 'El campo canal no debe estar vacío.',
        'string.trim': 'El campo canal no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo canal es obligatorio.',
        'string.base': 'El campo canal debe ser texto.'
    }),
    tienda: Joi.string().trim().required().messages({
        'string.empty': 'El campo tienda no debe estar vacío.',
        'string.trim': 'El campo tienda no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo tienda es obligatorio.',
        'string.base': 'El campo tienda debe ser texto.'
    }),
    configuraciones: Joi.array().items(configuracionSchema).required().messages({
        'array.base': 'El campo configuraciones debe ser una lista de objetos.',
        'any.required': 'El campo configuraciones es obligatorio.'
    })
});

const validarPedido = (pedidoData) => {
    return pedidoSchema.validate(pedidoData);
};

module.exports = validarPedido;