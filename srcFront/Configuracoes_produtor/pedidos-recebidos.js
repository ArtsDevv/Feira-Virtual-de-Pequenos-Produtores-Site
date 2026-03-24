document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica Autenticação e Segurança
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const container = document.getElementById('lista-pedidos');

    // ==========================================
    // 2. O ATAQUE: BUSCAR PEDIDOS NO JAVA
    // ==========================================
    async function carregarPedidosDaFeira() {
        try {
            container.innerHTML = "<p style='text-align:center; padding: 20px;'>Buscando novas vendas no servidor...</p>";
            
            // Bate na porta do Java pedindo a lista completa
            const resposta = await fetch('http://localhost:8082/api/pedidos');
            
            if (!resposta.ok) throw new Error("Falha ao buscar pedidos");

            const pedidos = await resposta.json();
            renderizarPedidos(pedidos);

        } catch (erro) {
            console.error("Erro de conexão:", erro);
            container.innerHTML = `
                <div class="empty-state">
                    <h2 style="color: #e74c3c;">Servidor Offline</h2>
                    <p>Não foi possível carregar os pedidos. Verifique se o Java (Porta 8082) está rodando.</p>
                </div>`;
        }
    }

    // ==========================================
    // 3. DESENHAR O LOOT (Os pedidos na tela)
    // ==========================================
    function renderizarPedidos(listaPedidos) {
        container.innerHTML = '';

        if (listaPedidos.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 2px dashed #ccc; color: #7f8c8d;">
                    <h2>Nenhuma venda ainda</h2>
                    <p>Quando os clientes comprarem na loja, os pedidos aparecerão aqui em tempo real.</p>
                </div>
            `;
            return;
        }

        // Inverte para a venda mais recente aparecer no topo
        const pedidosRecentes = listaPedidos.reverse();

        pedidosRecentes.forEach(pedido => {
            const card = document.createElement('div');
            card.className = 'pedido-card';

            // Formata a data (Ex: 21/03/2026 às 14:30)
            const dataFormatada = new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
            });

            // Desempacota o textão JSON das frutas do carrinho
            let itensHtml = "";
            try {
                const itens = JSON.parse(pedido.itensCarrinho);
                itensHtml = itens.map(item => {
                    let nome = item.nome || item.name;
                    let qtd = item.quantidade !== undefined ? item.quantidade : (item.qtd ? item.qtd : 1);
                    return `• ${qtd}x ${nome}<br>`;
                }).join('');
            } catch (e) {
                itensHtml = "Erro ao ler produtos.";
            }

            // O Card HTML
            card.innerHTML = `
                <div class="pedido-header">
                    <div>
                        <span class="pedido-id">Pedido #${pedido.id}</span>
                        <span class="pedido-data"> • ${dataFormatada}</span>
                    </div>
                    <span class="status-badge status-preparando">Em Preparo</span>
                </div>
                
                <div class="pedido-body">
                    <div class="cliente-info">
                        <h4>Dados do Cliente</h4>
                        <p><strong>ID do Comprador:</strong> #${pedido.usuarioId}</p>
                        <p><strong>Status:</strong> Aguardando envio</p>
                    </div>
                    <div class="itens-info">
                        <h4>Itens da Cesta</h4>
                        <p>${itensHtml}</p>
                    </div>
                </div>

                <div class="pedido-footer">
                    <span class="total-pedido">Total: ${pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <button class="btn-acao" onclick="avancarStatus(${pedido.id})">Marcar como Entregue</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Função de UX para simular a mudança de status
    window.avancarStatus = (id) => {
        alert(`✅ O Pedido #${id} foi atualizado para ENTREGUE! (A lógica de envio será implementada na versão 2.0)`);
    }

    // Inicia o ataque assim que a página carrega!
    carregarPedidosDaFeira();
});