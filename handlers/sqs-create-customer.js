const AWS = require('aws-sdk');
//const csv = require('@json2csv/node');
//const { json2csvAsync } = require('json-2-csv');
const converter = require('json-2-csv');
//const { parseAsync } = require('json2csv');

//require('json2csv');

const s3 = new AWS.S3();
const region = process.env.AWS_REGION;
const bucketName = `${process.env.S3_NAME_CLIENTE_UNICO_CSV}-${region}`;
const { getFormattedDateFolder } = require('../utils/dateUtils.js');
exports.handler = async (event) => {
    try {
        for (let record of event.Records) {
            const body = JSON.parse(record.body);
            console.log("Procesando cliente:", body);

            // Obtiene todas las claves de los objetos, asumiendo que el primer objeto tiene todas las claves necesarias
            const fields = Object.keys(body);
            const opts = { fields };

            // Generar CSV
            //const csvContent = await parseAsync(body, opts);
            const csvContent = await converter.json2csv(body, opts);

            // Configurar metadata y nombre del archivo
            const fileName = `${body.documento || 'unknown'}.csv`;
            const folderName = getFormattedDateFolder() + "/"; // Formato YYYY-MM-DD
            const params = {
                Bucket: bucketName,
                Key: `${folderName}${fileName}`,
                Body: csvContent,
                ContentType: 'text/csv',
                Metadata: {
                    'Content-Type': 'text/csv'
                }
            };

            // Subir el archivo CSV a S3
            await s3.putObject(params).promise();
            console.log(`Archivo CSV ${fileName} subido con éxito a ${folderName} en el bucket ${bucketName}`);
        }

        return true;
    } catch (error) {
        console.error("Error al procesar mensajes SQS:", error);
        return false;
    }
};
