document.addEventListener('DOMContentLoaded', () => {
    const pedidosContainer = document.getElementById('pedidos-container');
    const limparButton = document.querySelector('button[type="button"]'); // Seleciona o botão "Limpar"
  
    // Função para obter os parâmetros da URL
    function obterParametrosDaURL() {
        const params = new URLSearchParams(window.location.search);
        const nome = params.get('nome');
        const mesa = params.get('mesa');
        const itens = [];

        let index = 0;
        while (params.has(`item${index}`)) {
            itens.push(params.get(`item${index}`));
            index++;
        }

        if (nome && mesa) {
            return {
                dataHora: new Date().toLocaleString(),
                nome: nome,
                mesa: mesa,
                itens: itens
            };
        } else {
            return null; // Retorna null se não houver nome ou mesa válidos
        }
    }

    // Função para renderizar um card de pedido
    function renderizarPedido(pedido) {
        // Criação do card do pedido
        const pedidoCard = document.createElement('div');
        pedidoCard.className = 'pedido-card';

        // Exibe data e hora do pedido
        const dataHoraElement = document.createElement('p');
        dataHoraElement.textContent = `Data e Hora: ${pedido.dataHora}`;
        pedidoCard.appendChild(dataHoraElement);

        // Exibe nome do cliente
        const nomeElement = document.createElement('p');
        nomeElement.textContent = `Cliente: ${pedido.nome}`;
        pedidoCard.appendChild(nomeElement);

        // Exibe número da mesa
        const mesaElement = document.createElement('p');
        mesaElement.textContent = `Mesa: ${pedido.mesa}`;
        pedidoCard.appendChild(mesaElement);

        // Exibe lista de itens
        const itensList = document.createElement('ul');
        pedido.itens.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = item;
            itensList.appendChild(itemElement);
        });
        pedidoCard.appendChild(itensList);

        // Cria o botão "Concluído"
        const concluidoButton = document.createElement('button');
        concluidoButton.textContent = 'Concluído';
        concluidoButton.className = 'btn-concluido';

        concluidoButton.addEventListener('click', (e) => {
            e.preventDefault();
        
            // Obter lista de pedidos concluídos
            const pedidosConcluidos = JSON.parse(localStorage.getItem('pedidosConcluidos')) || [];
        
            // Adicionar novo pedido concluído à lista
            const pedidoData = {
                nome: pedido.nome,
                mesa: pedido.mesa,
                itens: pedido.itens,
                dataHora: pedido.dataHora // Inclua data e hora para referência
            };
            pedidosConcluidos.push(pedidoData);
        
            // Salvar lista atualizada no localStorage
            localStorage.setItem('pedidosConcluidos', JSON.stringify(pedidosConcluidos));
        
            alert('Pedido concluído!');
            pedidoCard.innerHTML = `<p>Pedido concluído!</p>`;
        });
        

        // Adiciona o botão "Concluído" ao card
        pedidoCard.appendChild(concluidoButton);

        // Adiciona o card ao container de pedidos
        pedidosContainer.appendChild(pedidoCard);
    }

    // Armazenamento dos pedidos em localStorage e renderização
    function salvarPedidoNoLocalStorage(pedido) {
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }

    function carregarPedidos() {
        pedidosContainer.innerHTML = ''; // Limpa o container antes de carregar os pedidos

        // Obtém todos os pedidos (mantendo a ordem original de armazenamento)
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        
        // Renderiza os pedidos na ordem que estão no localStorage (mais antigos no topo)
        pedidos.forEach(pedido => renderizarPedido(pedido));
    }

    // Processamento do pedido atual
    carregarPedidos(); // Carrega os pedidos já existentes

    const pedidoAtual = obterParametrosDaURL();
    if (pedidoAtual) {
        salvarPedidoNoLocalStorage(pedidoAtual); // Salva o novo pedido somente se tiver dados válidos
        renderizarPedido(pedidoAtual); // Renderiza o novo pedido sem recarregar todos os pedidos
    }

    // Função para limpar todos os pedidos
    function limparPedidos() {
        localStorage.removeItem('pedidos'); // Remove todos os pedidos do localStorage
        pedidosContainer.innerHTML = ''; // Limpa a exibição dos pedidos
        alert('Todos os pedidos foram apagados.');
    }

    // Evento de clique no botão "Limpar"
    limparButton.addEventListener('click', limparPedidos);
}); 