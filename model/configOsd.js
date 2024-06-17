const dynamoose = require('dynamoose');
// PK: Marca#Canal#Tienda
// SK: Modalidad#Tipo#Estado
const pedidoSchema = new dynamoose.Schema({
    pk: {
        type: String,
        hashKey: true
    },
    sk: {
        type: String,
        rangeKey: true
    },
    id_pedido: String,
    order_id: String,
    client_name: String,
    date: String,
    sales_type: String,
    sales_type_name: String,
    ship_via: String,
    ship_via_name: String,
    action: String,
    nro_correlativo: String,
    marca: String,
    canal: String,
    tienda: String,
    expire_ttl: Number
}, {
    saveUnknown: false,
    timestamps: false
});

const tableName = process.env.AWS_TABLE_PEDIDO_OSD;
console.log("Nombre de la tabla " + tableName);
const Pedido = dynamoose.model(tableName, pedidoSchema, { 
    create: false    
});
module.exports = Pedido;