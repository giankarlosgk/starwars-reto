const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const ClientSchema = new Schema({

    documento:          String,
    tipoDoc :           String,
    nombre  :           String,
    apellidoPater:      String,
    apellidoMat:        String,
    direccion:          String,
    fechNac:            String,
    telefono:           String,
    correo:             String,

    checkPromoBB:       Integer,// 0:False, 1:True
    fechaCheckPromoBB:  String,// fechaRegistro
    origenCheckPromoBB:  String,//Canal

    checkPromoDB:       Integer,// 0:False, 1:True
    fechaCheckPromoDB:  String,// fechaRegistro
    origenCheckPromoDB: String,//Canal

    checkPromoPP:       Integer,// 0:False, 1:True
    fechaCheckPromoPP:  String,// fechaRegistro
    origenCheckPromoPP: String,//Canal

    checkPromoCW:       Integer,// 0:False, 1:True
    fechaCheckPromoCW:  String,// fechaRegistro
    origenCheckPromoCW: String,//Canal

    checkPromoPJ:       Integer,// 0:False, 1:True
    fechaCheckPromoPJ:  String,// fechaRegistro
    origenCheckPromoPJ: String,//Canal

    checkPromoDD:       Integer,// 0:False, 1:True
    fechaCheckPromoDD:  String,// fechaRegistro
    origenCheckPromoDD: String,//Canal

    checkTratamiento: Integer,// 0:False, 1:True
    fechaTratamiento: String,// fechaRegistro
    origenCheckTratamiento: String,//Canal
    marcaCheckTratamiento: String,//Canal

    // Si el caso es de registrarse por el POS
    fecPedidoPOS: String,
    marcaPOS: String


    })

    const Client = mongoose.model('Client', ClientSchema)

    module.exports = Client