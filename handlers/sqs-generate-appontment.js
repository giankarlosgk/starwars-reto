const AWS = require('aws-sdk');
const converter = require('json-2-csv');

const s3 = new AWS.S3();
const region = process.env.AWS_REGION;
const bucketName = `${process.env.S3_NAME_PEDIDO_OSD_CSV}-${region}`;
const { getFormattedDateFolder } = require('../utils/dateUtilsAppointment.js');
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
            const fileName = `${body.pk || 'unknown'}_${body.sk || 'unknown'}.csv`;
            console.log("nombrefile ", fileName);
            const folderName = "CITAS/"+getFormattedDateFolder() + "/"; // Formato YYYYMMDD
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
