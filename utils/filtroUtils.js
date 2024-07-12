const filtrarPedidosPorEstado = (pedidos, etapa) => {
    const ultimoEstadoPedidos = {};
    const pedidosExcluidos = new Set();

    // Iterar sobre los pedidos para identificar el último estado de cada pedido
    pedidos.forEach(pedido => {
        const [ship_via, sales_type, action] = pedido.sk.split('#');
        const pedidoId = pedido.nro_correlativo;

        // Convertir action a número para comparación
        const actionNum = parseInt(action, 10);
        //console.log(`Procesando pedido ${pedidoId} con estado ${actionNum}`);

        // Si el pedido ya ha alcanzado el estado "n", marcarlo para exclusión
        if (actionNum === 0 || actionNum >= etapa) {
            //console.log(`Excluyendo pedido ${pedidoId} con estado ${actionNum}`);
            pedidosExcluidos.add(pedidoId);
        }

        // Guardar el último estado del pedido
        if (!pedidosExcluidos.has(pedidoId) && (!ultimoEstadoPedidos[pedidoId] || actionNum > ultimoEstadoPedidos[pedidoId].action)) {
            ultimoEstadoPedidos[pedidoId] = { ...pedido, action: actionNum };
        }
    });

    // Filtrar los pedidos excluyendo aquellos que han alcanzado o superado el estado "n"
    const pedidosFiltrados = Object.values(ultimoEstadoPedidos).filter(pedido => !pedidosExcluidos.has(pedido.nro_correlativo));

    return pedidosFiltrados;
};

module.exports = { filtrarPedidosPorEstado };