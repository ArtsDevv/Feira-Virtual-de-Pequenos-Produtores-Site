document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica Autenticação
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const container = document.getElementById('lista-pedidos');

    // 2. Busca os pedidos reais do banco de dados (localStorage por enquanto)
    // No futuro, isso será substituído por um 'fetch()' para a API do seu Back-end em Python/Node.
    const chavePedidos = `pedidos_produtor_${usuarioLogado.email}`;
    let meusPedidos = JSON.parse(localStorage.getItem(chavePedidos)) || [];

    // 3. Renderiza os Pedidos na Tela
    function renderizarPedidos() {
        container.innerHTML = '';

        // Se a lista estiver vazia (sem pedidos recebidos ainda)
        if (meusPedidos.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 2px dashed #ccc; color: #7f8c8d; margin-top: 20px;">
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="#ccc" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;">
                        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <h2>Nenhum pedido ainda</h2>
                    <p style="margin-top: 10px;">Quando os clientes comprarem seus produtos na loja, os pedidos aparecerão aqui.</p>
                </div>
            `;
            return;
        }

        // Desenha os cartões reais
        meusPedidos.forEach(pedido => {
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
                    <span class="total-pedido">Total: R$ ${Number(pedido.total).toFixed(2).replace('.', ',')}</span>
                    <button class="btn-acao" onclick="avancarStatus('${pedido.id}')">Atualizar Status</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Função pronta para ser conectada à lógica de mudança de status no futuro
    window.avancarStatus = (id) => {
        alert(`A função de atualizar o status do pedido ${id} será conectada em breve!`);
    }

    renderizarPedidos();
});