const customerRepository = require('../repository/customerRepository');
const customerService = require('../service/customerService');
class CustomerService {

    

    async findByDocument(documento,tipoDoc){
        return await customerRepository.searchCustomerByDoc(documento,tipoDoc);
    }
    
    async create(data){
        return await customerRepository.createCliente(data);
    }

    async update(data, cliente){
        console.log("Service Datos del cliente existente:", JSON.stringify(cliente));
        console.log("Service Datos de la solicitud:", JSON.stringify(data));
        return await customerRepository.updateCliente(data, cliente);
    }
}

module.exports =  new CustomerService();