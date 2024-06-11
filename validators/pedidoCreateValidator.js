const Joi = require('joi');

const createPedidoSchema = Joi.object({
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
    nro_correlativo: Joi.string().trim().required().messages({
        'string.empty': 'El campo nro_correlativo no debe estar vacío.',
        'string.trim': 'El campo nro_correlativo no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo nro_correlativo es obligatorio.',
        'string.base': 'El campo nro_correlativo debe ser texto.'
    }),
    action: Joi.string().trim().required().messages({
        'string.empty': 'El campo action no debe estar vacío.',
        'string.trim': 'El campo tipo action no debe contener espacios en blanco al inicio o al final.',
        'any.required': 'El campo tipo action es obligatorio.',
        'string.base': 'El campo tipo action debe ser texto.'
    }),
    ship_via_name: Joi.string().trim().allow('').required(),
    sales_type_name: Joi.string().trim().allow('').required(),
    date: Joi.string().trim().allow('').required(),
    client_name: Joi.string().trim().allow('').required(),
    order_id: Joi.string().trim().allow('').required(),
    id_pedido: Joi.string().email().allow('').required()
});

const validarCreacionPedido = (pedidoData) => {
    return createPedidoSchema.validate(pedidoData, { abortEarly: false });
};

module.exports = validarCreacionPedido;