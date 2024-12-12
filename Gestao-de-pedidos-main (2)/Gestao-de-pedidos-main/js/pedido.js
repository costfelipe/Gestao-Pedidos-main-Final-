document.addEventListener('DOMContentLoaded', () => {
    const precoTotalElement = document.getElementById('preco-total');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const nomeInput = document.getElementById('nome');
    const mesaSelect = document.getElementById('mesa');

    // Função para calcular e exibir o total em tempo real
    function atualizarPrecoTotal() {
        let total = 0;

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const preco = parseFloat(checkbox.nextElementSibling.textContent);
                total += preco;
            }
        });

        // Atualiza o elemento #preco-total com o valor total formatado
        precoTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Adiciona o evento 'change' a cada checkbox para atualizar o total ao marcar/desmarcar
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', atualizarPrecoTotal);
    });

    // Evento de clique no botão Confirmar para armazenar os dados no localStorage
    btnConfirmar.addEventListener('click', (event) => {
        event.preventDefault();

        // Coleta os dados do formulário
        const nome = nomeInput.value;
        const mesa = mesaSelect.value;
        const total = parseFloat(precoTotalElement.textContent.replace("Total: R$ ", ""));

        // Coleta os itens selecionados
        const pedidoItens = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const itemNome = checkbox.parentElement.textContent.trim();
                pedidoItens.push(itemNome);
            }
        });

        // Cria o objeto de pedido e armazena no localStorage
        const pedido = {
            dataHora: new Date().toLocaleString(),
            nome: nome,
            mesa: mesa,
            itens: pedidoItens,
            total: total
        };
        

        // Obtém pedidos existentes, adiciona o novo e armazena de volta
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        // Exibe uma mensagem de confirmação
        alert('Pedido confirmado com sucesso!');

        // Limpa os dados do formulário
        nomeInput.value = '';
        mesaSelect.selectedIndex = 0; // Reseta o campo de seleção para o primeiro item
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false; // Desmarca todos os checkboxes
        });
        precoTotalElement.textContent = 'Total: R$ 0.00'; // Reseta o total
    });
});