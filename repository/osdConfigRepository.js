'use strict';
const DynamoClient = require('../utils/dynamoClient');
const dynamo = DynamoClient.getInstance();
const marcaMap = require('../utils/marcaConfig');
const Pedido = require('../model/pedidoOsd');
const sqsRepositoryPedido = require('../sqs/sqsRepositoryPedido');
const { getFormattedDate, getEndOfDayUnixTimestamp } = require('../utils/dateUtils.js');
class PedidoRepository {
    constructor() {
        this.table = process.env.AWS_TABLE_CONFIGURACION_OSD;
    }
    
    async createConfig(data){
        const { marca, modalidades } = data;
        let pk = marca;
        let sk = "G";// G: general, si más adelante ocurra una relación de activar por canales, se habilitará los códigos por canal
        const modalidadesString = JSON.stringify(modalidades);
        console.log("Creando PK " + pk + " sk " + sk + "modalidades" + modalidadesString);
        try {
            const params = {
                TableName: this.table,
                Item: {
                    pk,
                    sk,
                    modalidades: modalidadesString
                }
            };            
            await dynamo.put(params).promise();

        } catch (error) {
            console.error('Error creando el pedido:', error);
            throw new Error('Error creando la configuración'); 
        }
    }

    
    async searchConfigByPkAndSk(pk,sk){
        console.log("Pk db " + pk)
        console.log("Sk db " + sk)
        let params = {
            TableName: this.table,
            KeyConditionExpression:'pk = :v_pk and begins_with(sk, :v_sk)',
    
            ExpressionAttributeValues: { 
                    ":v_pk": pk, 
                    ":v_sk": sk
                }
        }
        const data = await dynamo.query(params).promise();
        console.log("Datos filtrados", data);
        return data;
    }
    
}




module.exports = new PedidoRepository();