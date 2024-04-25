'use strict';
const DynamoClient = require('../utils/dynamoClient');
const dynamo = DynamoClient.getInstance();
const marcaMap = require('../utils/marcaConfig');
const Cliente = require('../model/customer');
const sqsRepository = require('../sqs/sqsRepository');
const { getFormattedDate } = require('../utils/dateUtils.js');
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
        if (!existingCliente[promoCheck] || existingCliente[promoCheck] === 0) {
            console.log("Actualiza en 0" + Number(data.publicidad));
            datosParaActualizar[promoCheck] = Number(data.publicidad);
            datosParaActualizar[promoDate] = getFormattedDate();
            datosParaActualizar[promoOrigin] = data.canal;
        }else{
            console.log("Actualiza en 1");
            console.log("Check promo "+Number(existingCliente[promoCheck]))
            // Mantener los datos existentes si ya existen y no se requiere actualizar
            datosParaActualizar[promoCheck] = Number(existingCliente[promoCheck]);
            datosParaActualizar[promoDate] = getFormattedDate();
            datosParaActualizar[promoOrigin] = existingCliente[promoOrigin];
        }
        console.log("Asigna para actualizar ");
    }

    createInformationData(marca, data, datosParaActualizar, marcaMap) {
        const marcas = marcaMap[marca];
        if (!marcas) return; // Si la marca no es válida o no está configurada, no hace nada
    
        const { key } = marcas;
        const promoCheck = `checkPromo${key}`;
        const promoDate = `fechaCheckPromo${key}`;
        const promoOrigin = `origenCheckPromo${key}`;
            
        datosParaActualizar[promoCheck] = data.publicidad;
        datosParaActualizar[promoDate] = getFormattedDate();
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
                datosParaActualizar.checkTratamiento = data.gestionDatos;
                datosParaActualizar.fechaTratamiento = getFormattedDate();
                datosParaActualizar.origenCheckTratamiento = data.canal;
                datosParaActualizar.marcaCheckTratamiento = data.marca;
           // }

            this.createInformationData(marca, data, datosParaActualizar,marcaMap);
    
            // Actualizar o crear el cliente
            let resultado = await Cliente.update({ documento, tipoDoc }, datosParaActualizar);
            try {
                datosParaActualizar.documento = documento;
                datosParaActualizar.tipoDoc = tipoDoc;
                await sqsRepository.initialize();
                await sqsRepository.sendClientCsvQueue(datosParaActualizar)
                .then(() => console.log('Mensaje enviado correctamente'))
                .catch(err => console.error('Error al enviar mensaje:', err));
            } catch (error) {
                console.log("Error en la cola "+ error);
            }
            return resultado;
            //res.json({ message: 'Cliente actualizado con éxito', data: resultado });
        } catch (error) {
            console.error('Error creando el cliente:', error);
            return error;
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
            console.log("Gestion de datos:  " + existingCliente.checkTratamiento)
            console.log("Request Gestion de datos:  " + data.gestionDatos)
            // Si el cliente ya tiene registrado checkTratamiento y es 0 o es null, actualizamos con los datos nuevos
            if (existingCliente && (existingCliente.checkTratamiento === null || existingCliente.checkTratamiento === 0)) {
                datosParaActualizar.checkTratamiento = Number(data.gestionDatos);
                datosParaActualizar.fechaTratamiento = getFormattedDate();
                datosParaActualizar.origenCheckTratamiento = data.canal;
                datosParaActualizar.marcaCheckTratamiento = data.marca;
            }

            this.updateInformationData(marca, data, existingCliente, datosParaActualizar,marcaMap);
            console.log("Datos asignados " + JSON.stringify(datosParaActualizar))
            // Actualizar o crear el cliente
            let resultado = await Cliente.update({ documento, tipoDoc }, datosParaActualizar);
            datosParaActualizar.documento = documento;
            datosParaActualizar.tipoDoc = tipoDoc;
            sqsRepository.sendClientCsvQueue(datosParaActualizar)
            .then(() => console.log('Mensaje enviado correctamente'))
            .catch(err => console.error('Error al enviar mensaje:', err));
            return resultado;
            //res.json({ message: 'Cliente actualizado con éxito', data: resultado });
        } catch (error) {
            console.error('Error actualizando el cliente:', error);
            //res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
            return error;
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