document.addEventListener('DOMContentLoaded', () => {
    const pedidosContainer = document.getElementById('pedidos-container');
    const limparButton = document.getElementById('limpar-pedidos');

    function carregarPedidosConcluidos() {
        const pedidosConcluidos = JSON.parse(localStorage.getItem('pedidosConcluidos')) || [];
        
        // Reverte a ordem dos pedidos para exibir o mais recente primeiro
        const pedidosInvertidos = pedidosConcluidos.reverse();
    
        pedidosInvertidos.forEach(pedidoData => {
            // Criação do card de pedido
            const pedidoCard = document.createElement('div');
            pedidoCard.className = 'pedido-card';
    
            const nomeElement = document.createElement('p');
            nomeElement.textContent = `Cliente: ${pedidoData.nome}`;
            pedidoCard.appendChild(nomeElement);
    
            const mesaElement = document.createElement('p');
            mesaElement.textContent = `Mesa: ${pedidoData.mesa}`;
            pedidoCard.appendChild(mesaElement);
    
            const itensList = document.createElement('ul');
            pedidoData.itens.forEach(item => {
                const itemElement = document.createElement('li');
                itemElement.textContent = item;
                itensList.appendChild(itemElement);
            });
            pedidoCard.appendChild(itensList);
    
            pedidosContainer.appendChild(pedidoCard);
        });
    }    

    function limparPedidos() {
        // Limpar os pedidos do contêiner
        pedidosContainer.querySelectorAll('.pedido-card').forEach(card => card.remove());
        // Remover os dados do localStorage
        localStorage.removeItem('pedidosConcluidos');
    }

    // Carregar os pedidos ao iniciar
    carregarPedidosConcluidos();

    // Adicionar evento ao botão limpar
    limparButton.addEventListener('click', limparPedidos);
});  