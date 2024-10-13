const pedidoRepository = require('../repository/pedidoRepository');
const configRepository = require('../repository/osdConfigRepository');
const { filtrarPedidosPorEstado } = require('../utils/filtroUtils');
class CustomerService {

    
    
    async findByPkAndSk(pk,sk){
        return await pedidoRepository.searchPedidoByPkAndSk(pk,sk);
    }

    async findByMultipleCombinations(marca, canales, tienda, configuraciones){
        //return await pedidoRepository.searchPedidoByPkAndSk(pk,configuracioness);
        const pedidos = await pedidoRepository.searchPedidosByCombinations(marca, canales, tienda, configuraciones);
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
    async procesarPedidos(pedidos) {
        console.log("Llega a procesar consulta: ", pedidos);
            const resultados = {
                actualizados: [],
                noActualizados: []
            };
    
            for (const data of pedidos) {
                const pk = `${data.marca}#${data.canal}#${data.tienda}`;
                const sk_ = `${data.ship_via}#${data.sales_type}#${data.action}#${data.nro_correlativo}`;
                const skParts = `${data.ship_via}#${data.sales_type}#${data.action}#${data.nro_correlativo}`.split('#');
    
                const modalidad = skParts[0];
                const tipo = skParts[1];
                const estadoActual = skParts[2]; // El estado actual (action) enviado en el request
                const correlativo = skParts[3];
    
                try {
                    
                    // Verificar si el pedido con PK y SK existe
                    const pedidoExistente = await pedidoRepository.searchPedidoByPkAndSk(pk, sk_);

                    if (pedidoExistente.length === 0) {
                        // Si no existe el pedido, devolver mensaje de "Pedido no existente"
                        resultados.noActualizados.push({
                            correlativo: data.nro_correlativo,
                            motivo: "Pedido no existente."
                        });
                        continue; // Pasar al siguiente pedido
                    }
                    // Generar una lista de estados mayores según el action actual
                    const estadosMayores = obtenerEstadosMayores(estadoActual);
                    let existeMayor = false;
    
                    // Iterar sobre los estados mayores y verificar si existe algún registro con ese correlativo
                    for (let estadoMayor of estadosMayores) {
                        const sk = `${modalidad}#${tipo}#${estadoMayor}#${correlativo}`;
                        const pedido = await pedidoRepository.searchPedidoByPkAndSk(pk, sk);
    
                        if (pedido.length > 0) {
                            existeMayor = true;
                            break; // Si existe un estado mayor, detenemos la iteración
                        }
                    }
    
                    if (existeMayor) {
                        // No permitir actualización si existe un estado mayor
                        resultados.noActualizados.push({
                            correlativo: data.nro_correlativo,
                            motivo: "Ya existe un estado mayor en la base de datos para este correlativo. No se puede actualizar."
                        });
                        continue; // Pasar al siguiente pedido
                    }
    
                    // Si no existe un estado mayor, proceder con la creación/actualización usando createPedido
                    if (data.action === '1') {
                        data.action = '101'; // Cambiar el action a 101
                    } else if (data.action === '2') {
                        data.action = '102'; // Cambiar el action a 102
                    }
    
                    try {
                        await pedidoRepository.createPedido(data); // Reutilizar createPedido
                        resultados.actualizados.push({
                            correlativo: data.nro_correlativo,
                            estado: data.action
                        });
                    } catch (error) {
                        resultados.noActualizados.push({
                            correlativo: data.nro_correlativo,
                            motivo: `Error al crear/actualizar pedido con estado ${data.action}`
                        });
                    }
    
                } catch (error) {
                    console.log("Error al procesar: ", error);
                    resultados.noActualizados.push({
                        correlativo: data.nro_correlativo,
                        motivo: "Error interno del servidor."
                    });
                }
            }
    
            return resultados;
    }
    


}

    // Función que genera los posibles estados mayores según el estado actual
    function obtenerEstadosMayores(estadoActual) {
        const estado = parseInt(estadoActual);
        let posiblesEstados = [];
        
        if (estado === 1) {
            posiblesEstados = [2, 3, 101, 102];
        } else if (estado === 2) {
            posiblesEstados = [3, 102];
        }

        return posiblesEstados;
    }

module.exports =  new CustomerService();