const Joi = require('joi');

const clienteSchema = Joi.object({
    documento: Joi.string().required(),
    tipoDoc: Joi.string().required()
});

const validarCliente = (clienteData) => {
    return clienteSchema.validate(clienteData);
};

module.exports = validarCliente;
