const pedidoRepository = require('../repository/pedidoRepository');
//const customerService = require('../service/customerService');
class CustomerService {

    
    
    async findByPkAndSk(pk,sk){
        return await pedidoRepository.searchPedidoByPkAndSk(pk,sk);
    }
    
    async create(data){
        return await pedidoRepository.createPedido(data);
    }
    /*
    async update(data, cliente){
        console.log("Service Datos del cliente existente:", JSON.stringify(cliente));
        console.log("Service Datos de la solicitud:", JSON.stringify(data));
        return await customerRepository.updateCliente(data, cliente);
    }*/
}

module.exports =  new CustomerService();