const pedidoRepository = require('../repository/pedidoRepository');
const configRepository = require('../repository/osdConfigRepository');
const { filtrarPedidosPorEstado } = require('../utils/filtroUtils');
class CustomerService {

    
    
    async findByPkAndSk(pk,sk){
        return await pedidoRepository.searchPedidoByPkAndSk(pk,sk);
    }

    async findByMultipleCombinations(pk,configuraciones){
        //return await pedidoRepository.searchPedidoByPkAndSk(pk,configuracioness);
        const pedidos = await pedidoRepository.searchPedidosByCombinations(pk, configuraciones);
        const configEtapaMax = 3;// Verifica que si ya tiene esta estapa, el dato o registro deba ser excluido
        return filtrarPedidosPorEstado(pedidos, configEtapaMax);
    }
    
    async create(data){
        return await pedidoRepository.createPedido(data);
    }

    async createConfig(data){
        return await configRepository.createConfig(data);
    }

    async getConfig(pk,sk){
        return await configRepository.searchConfigByPkAndSk(pk,sk);
    }
    /*
    async update(data, cliente){
        console.log("Service Datos del cliente existente:", JSON.stringify(cliente));
        console.log("Service Datos de la solicitud:", JSON.stringify(data));
        return await customerRepository.updateCliente(data, cliente);
    }*/
}

module.exports =  new CustomerService();