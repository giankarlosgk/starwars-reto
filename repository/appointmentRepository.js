const DynamoClient = require('../utils/dynamoClient');
const dynamo = DynamoClient.getInstance();
const Appointment = require('../model/appointmentModel');
const sqsRepositoryAppointment = require('../sqs/sqsRepositoryAppointment');
class AppointmentRepository {
    constructor() {
        this.table = process.env.AWS_TABLE_AGENDA;
    }
    
    async saveAppointment(appointmentData){
        //const appointment = new AppointmentModel(appointmentData);
        
        try {
            resultado = await Appointment.create(appointmentData);
         } catch (error) {
             console.log("Error al registrar"+ error);
         }
        // Envia a cola las peticiones para que luego sean guardados en un bucket S3, ya que la información en Dynamo es temporal
        try {
            await sqsRepositoryAppointment.initialize();
            await sqsRepositoryAppointment.sendDataCsvQueue(appointmentData)
            .then(() => console.log('Mensaje enviado correctamente'))
            .catch(err => console.error('Error al enviar mensaje:', err));
        } catch (error) {
            console.log("Error en la cola "+ error);
        }
    };


    async getAppointmentsByDateRange(pk, startTimestamp, endTimestamp){        

        console.log("Pk db " + pk)
        console.log("startTimestamp db " + startTimestamp)
        console.log("endTimestamp db " + endTimestamp)
        let params = {
            TableName: this.table,
            KeyConditionExpression:'pk = :v_pk and sk BETWEEN :startTimestamp AND :endTimestamp',
    
            ExpressionAttributeValues: { 
                    ":v_pk": pk,
                    ':startTimestamp': String(startTimestamp),  // Timestamp de inicio (UNIX)
                    ':endTimestamp': String(endTimestamp),  // Timestamp de fin (UNIX)
                }
        }
        const data = await dynamo.query(params).promise();
        console.log("Datos filtrados", data);
        return data.Items;

    }

    async searchAppointmentByPkAndSk(pk,sk){
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
        return data.Items;
    }

    
}
module.exports = new  AppointmentRepository();
