const Joi = require('joi');

const createClienteSchema = Joi.object({
    documento: Joi.string().trim().required(),
    tipoDoc: Joi.string().trim().required(),
    nombre: Joi.string().trim().required(),
    apellidoPater: Joi.string().trim().required(),
    apellidoMat: Joi.string().trim().required(),
    fechNac: Joi.date().required(),
    telefono: Joi.string().trim().required(),
    correo: Joi.string().email().required(),
    direccion: Joi.string().trim().required(),
    marca: Joi.string().trim().required(),
    canal: Joi.string().trim().required(),
    gestionDatos: Joi.number().integer().min(0).required(),
    publicidad: Joi.number().integer().min(0).required()
});

const validarCreacionCliente = (clienteData) => {
    return createClienteSchema.validate(clienteData, { abortEarly: false });
};

module.exports = validarCreacionCliente;