document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica Autenticação
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const container = document.getElementById('lista-pedidos');

    // 2. DADOS SIMULADOS (Mock)
    // No futuro, isso virá do localStorage conectado ao carrinho do cliente
    const pedidosMock = [
        {
            id: "PED-1029",
            data: "17/03/2026",
            cliente: "Maria Oliveira",
            endereco: "Rua das Flores, 123 - Centro (Entrega)",
            itens: "2x Morango Orgânico (Bandeja)<br>1x Mel Silvestre (Litro)",
            total: "R$ 45,90",
            status: "pendente",
            statusTxt: "Aguardando Confirmação"
        },
        {
            id: "PED-1028",
            data: "16/03/2026",
            cliente: "João Pedro Santos",
            endereco: "Retirada na Feira",
            itens: "1x Queijo Minas (kg)<br>3x Alface Crespa (unid)",
            total: "R$ 38,00",
            status: "preparando",
            statusTxt: "Em Separação"
        },
        {
            id: "PED-1025",
            data: "15/03/2026",
            cliente: "Ana Costa",
            endereco: "Av. Paulista, 1500 - Bela Vista (Entrega)",
            itens: "5x Maçã Fuji (kg)",
            total: "R$ 60,00",
            status: "concluido",
            statusTxt: "Entregue"
        }
    ];

    // 3. Renderiza os Pedidos na Tela
    function renderizarPedidos() {
        container.innerHTML = '';

        if (pedidosMock.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #888;">Nenhum pedido recebido ainda.</p>`;
            return;
        }

        pedidosMock.forEach(pedido => {
            const card = document.createElement('div');
            card.className = 'pedido-card';

            // Define a classe da cor baseado no status
            let corBadge = "";
            if(pedido.status === 'pendente') corBadge = "status-pendente";
            if(pedido.status === 'preparando') corBadge = "status-preparando";
            if(pedido.status === 'concluido') corBadge = "status-concluido";

            card.innerHTML = `
                <div class="pedido-header">
                    <div>
                        <span class="pedido-id">${pedido.id}</span>
                        <span class="pedido-data"> • ${pedido.data}</span>
                    </div>
                    <span class="status-badge ${corBadge}">${pedido.statusTxt}</span>
                </div>
                
                <div class="pedido-body">
                    <div class="cliente-info">
                        <h4>Dados do Cliente</h4>
                        <p><strong>Nome:</strong> ${pedido.cliente}</p>
                        <p><strong>Local:</strong> ${pedido.endereco}</p>
                    </div>
                    <div class="itens-info">
                        <h4>Itens do Pedido</h4>
                        <p>${pedido.itens}</p>
                    </div>
                </div>

                <div class="pedido-footer">
                    <span class="total-pedido">Total: ${pedido.total}</span>
                    <button class="btn-acao" onclick="avancarStatus('${pedido.id}')">Atualizar Status</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Função de mentirinha só pra dar interatividade ao botão
    window.avancarStatus = (id) => {
        alert(`O status do pedido ${id} será atualizado para o cliente!`);
    }

    renderizarPedidos();
});