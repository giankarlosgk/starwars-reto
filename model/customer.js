const dynamoose = require('dynamoose');

const clienteSchema = new dynamoose.Schema({
    documento: {
        type: String,
        hashKey: true
    },
    tipoDoc: {
        type: String,
        rangeKey: true
    },
    nombre: String,
    apellidoPater: String,
    apellidoMat: String,
    direccion: String,
    fechNac: String,
    telefono: String,
    correo: String,
    checkTratamiento: Number,
    fechaTratamiento: String,
    origenCheckTratamiento: String,
    marcaCheckTratamiento: String,
    checkPromoBB: Number,
    fechaCheckPromoBB: String,
    origenCheckPromoBB: String,
    checkPromoDB: Number,
    fechaCheckPromoDB: String,
    origenCheckPromoDB: String,
    checkPromoPP: Number,
    fechaCheckPromoPP: String,
    origenCheckPromoPP: String,
    checkPromoCW: Number,
    fechaCheckPromoCW: String,
    origenCheckPromoCW: String,
    checkPromoPJ: Number,
    fechaCheckPromoPJ: String,
    origenCheckPromoPJ: String,
    checkPromoDD: Number,
    fechaCheckPromoDD: String,
    origenCheckPromoDD: String,
}, {
    saveUnknown: false,
    timestamps: false
});

//const Cliente = dynamoose.model('Cliente', clienteSchema, {create: false});
// Asegúrate de que la variable de entorno esté disponible
const tableName = process.env.AWS_TABLE_CLIENTE;
console.log("Nombre de la tabla " + tableName);
const Cliente = dynamoose.model(tableName, clienteSchema, { 
    create: false
    //waitForActive: false // Evita que Dynamoose intente esperar que la tabla esté activa (no utilizar DescribeTable)
});
module.exports = Cliente;