'use strict';
const DynamoClient = require('../utils/dynamoClient');
const dynamo = DynamoClient.getInstance();
const marcaMap = require('../utils/marcaConfig');
const Cliente = require('../model/customer');
class CustomerRepository {
    constructor() {
        this.table = process.env.AWS_TABLE_CLIENTE;
    }

    /*async createUpdateCliente(documento, tipoDoc, datosRequest, cliente) {
        const params = {
            TableName: this.tableName,
            Key: {
                documento: cliente.documento,
                tipoDoc: cliente.tipoDoc
            },
            UpdateExpression: 'set #nombre = :nombre, apellidoPater = :apellidoPater, apellidoMat = :apellidoMat',
            ExpressionAttributeNames: {
                '#nombre': 'nombre'
            },
            ExpressionAttributeValues: {
                ':nombre': cliente.nombre,
                ':apellidoPater': cliente.apellidoPater,
                ':apellidoMat': cliente.apellidoMat
            },
            ReturnValues: 'UPDATED_OLD'
        };

        try {
            const result = await dynamoDb.update(params).promise();
            console.log('Update result:', result);
        } catch (error) {
            console.error('Error updating client:', error);
            throw error; // Esto permitirá que el controlador maneje el error
        }
    }*/

    updateInformationData(marca, data, existingCliente, datosParaActualizar, marcaMap) {
        const marcas = marcaMap[marca];
        console.log("Actualiza marca"+ marcas);
        if (!marcas) return; // Si la marca no es válida o no está configurada, no hace nada
        console.log("Pasa"+ JSON.stringify(marcas));
        const { key } = marcas;
        const promoCheck = `checkPromo${key}`;
        const promoDate = `fechaCheckPromo${key}`;
        const promoOrigin = `origenCheckPromo${key}`;
        console.log("Pasa"+ promoCheck);
        if (!existingCliente[promoCheck] || existingCliente[promoCheck] === null || existingCliente[promoCheck] === 0) {
            datosParaActualizar[promoCheck] = data.publicidad;
            datosParaActualizar[promoDate] = new Date().toISOString();
            datosParaActualizar[promoOrigin] = data.canal;
        } 
        console.log("Asigna para actualizar ");
        datosParaActualizar[promoCheck] = existingCliente[promoCheck];
        datosParaActualizar[promoDate] = existingCliente[promoDate];
        datosParaActualizar[promoOrigin] = existingCliente[promoOrigin];
    }

    createInformationData(marca, data, datosParaActualizar, marcaMap) {
        const marcas = marcaMap[marca];
        if (!marcas) return; // Si la marca no es válida o no está configurada, no hace nada
    
        const { key } = marcas;
        const promoCheck = `checkPromo${key}`;
        const promoDate = `fechaCheckPromo${key}`;
        const promoOrigin = `origenCheckPromo${key}`;
            
        datosParaActualizar[promoCheck] = data.publicidad;
        datosParaActualizar[promoDate] = new Date().toISOString();
        datosParaActualizar[promoOrigin] = data.canal;
    }

    async createCliente(data){
        //const startTime = moment();
        const { documento, tipoDoc, marca } = data;
        try {
            let datosParaActualizar = {
                nombre:  data.nombre.toUpperCase(),
                apellidoPater: data.apellidoPater.toUpperCase() ,
                apellidoMat: data.apellidoMat.toUpperCase() ,
                direccion:data.direccion.toUpperCase(),
                fechNac: data.fechNac,
                telefono: data.telefono,
                correo: data.correo.toUpperCase()
            };
    
            // Si el cliente ya tiene registrado checkTratamiento y es 0 o es null, actualizamos con los datos nuevos
            //if (existingCliente.len && (existingCliente.checkTratamiento === null || existingCliente.checkTratamiento === 0)) {
                datosParaActualizar.checkTratamiento = data.checkTratamiento;
                datosParaActualizar.fechaTratamiento = data.fechaTratamiento;
                datosParaActualizar.origenTratamiento = data.origenTratamiento;
           // }

            this.createInformationData(marca, data, datosParaActualizar,marcaMap);
    
            // Actualizar o crear el cliente
            let resultado = await Cliente.update({ documento, tipoDoc }, datosParaActualizar);
            return resultado;
            //res.json({ message: 'Cliente actualizado con éxito', data: resultado });
        } catch (error) {
            console.error('Error creando el cliente:', error);
            res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
        }
    }

    async updateCliente(data, existingCliente){
        const { documento, tipoDoc, marca } = data;
        try {
            let datosParaActualizar = {
                nombre: data.nombre ? data.nombre.toUpperCase() : existingCliente.nombre,
                apellidoPater: data.apellidoPater ? data.apellidoPater.toUpperCase() : existingCliente.apellidoPater,
                apellidoMat: data.apellidoMat ? data.apellidoMat.toUpperCase() : existingCliente.apellidoMat,
                direccion: data.direccion ? data.direccion.toUpperCase() : existingCliente.direccion,
                fechNac: data.fechNac ? data.fechNac.toUpperCase() : existingCliente.fechNac,
                telefono: data.telefono || existingCliente.telefono,
                correo: data.correo ? data.correo.toUpperCase() : existingCliente.correo,
            };
    
            // Si el cliente ya tiene registrado checkTratamiento y es 0 o es null, actualizamos con los datos nuevos
            if (existingCliente && (existingCliente.checkTratamiento === null || existingCliente.checkTratamiento === 0)) {
                datosParaActualizar.checkTratamiento = data.checkTratamiento;
                datosParaActualizar.fechaTratamiento = data.fechaTratamiento;
                datosParaActualizar.origenTratamiento = data.origenTratamiento;
            }

            this.updateInformationData(marca, data, existingCliente, datosParaActualizar,marcaMap);
            console.log("Datos asignados " + JSON.stringify(datosParaActualizar))
            // Actualizar o crear el cliente
            let resultado = await Cliente.update({ documento, tipoDoc }, datosParaActualizar);
            return resultado;
            //res.json({ message: 'Cliente actualizado con éxito', data: resultado });
        } catch (error) {
            console.error('Error actualizando el cliente:', error);
            res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
        }
    }


    async searchCustomerByDoc(documento,tipoDoc){
        console.log("Documento " + documento)
        console.log("tipoDoc " + tipoDoc)
        let params = {
            TableName: this.table,
            KeyConditionExpression:'documento = :v_pk and begins_with(tipoDoc, :v_sk)',
    
            ExpressionAttributeValues: { 
                    ":v_pk": documento, 
                    ":v_sk": tipoDoc
                }
        }
        const data = await dynamo.query(params).promise();
        console.log("Datos filtrados", data.Items);
        return data.Items;
    }
}




module.exports = new CustomerRepository();