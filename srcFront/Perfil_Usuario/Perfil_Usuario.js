document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica quem está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // 2. Barreira de Segurança: Se não tem ninguém logado, expulsa para o login
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "../Acesse a sua conta/Acesseasuaconta.html";
        return; // Para a execução do script aqui
    }

    // 3. Preenche os dados dinâmicos na tela
    // Pegar o primeiro nome e a inicial
    const primeiroNome = usuarioLogado.nome.split(" ")[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    // Injetar no HTML
    document.getElementById("inicial-usuario").innerText = inicial;
    document.getElementById("sidebar-nome").innerText = primeiroNome;
    document.getElementById("painel-nome").innerText = primeiroNome;
    
    document.getElementById("info-nome").innerText = usuarioLogado.nome;
    document.getElementById("info-email").innerText = usuarioLogado.email;

    // 4. Verifica o status do Carrinho desse usuário específico
    const chaveCart = `carrinho_${usuarioLogado.email}`;
    const carrinhoUsuario = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const infoCesta = document.getElementById("info-cesta");

    if (carrinhoUsuario.length === 0) {
        infoCesta.innerHTML = "Sua cesta está <strong>vazia</strong> no momento.";
    } else {
        // Conta a quantidade total de itens (somando a qtd de cada produto)
        let totalItens = 0;
        carrinhoUsuario.forEach(item => totalItens += item.qtd);
        
        infoCesta.innerHTML = `Você tem <strong>${totalItens} item(ns)</strong> aguardando na sua cesta.`;
    }

    // 5. Botão de Sair exclusivo da página de perfil
    const btnSair = document.getElementById("btn-sair-perfil");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "../index.html"; // Manda pra home após sair
        });
    }

    // ==========================================
    // 6. BUSCAR HISTÓRICO DE PEDIDOS (API JAVA)
    // ==========================================
    async function carregarHistoricoPedidos() {
        const containerPedidos = document.getElementById("lista-pedidos");
        
        try {
            // Pede pro Java todos os pedidos deste ID
            const resposta = await fetch(`http://localhost:8082/api/pedidos/historico/${usuarioLogado.id}`);
            
            if (!resposta.ok) {
                throw new Error("Falha na comunicação com o servidor de pedidos.");
            }

            const pedidos = await resposta.json();

            // Se o cliente é novo e não comprou nada ainda
            if (pedidos.length === 0) {
                containerPedidos.innerHTML = "<p style='color: #666;'>Você ainda não realizou nenhuma compra. Visite a feira e apoie nossos produtores!</p>";
                return;
            }

            // Inverte a lista para o pedido mais recente aparecer primeiro no topo
            const pedidosRecentesPrimeiro = pedidos.reverse();

            // Desenha os pedidos na tela
            containerPedidos.innerHTML = pedidosRecentesPrimeiro.map(pedido => {
                
                // Transforma a data do banco (ex: 2023-10-25T14:30) num formato legível pro Brasil
                const dataFormatada = new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
                });

                // Lembra que salvamos os itens do carrinho como um textão (JSON)?
                // Agora o JS lê esse textão e transforma de volta em uma lista para imprimir item por item!
                let itensHtml = "";
                try {
                    const itens = JSON.parse(pedido.itensCarrinho);
                    itensHtml = itens.map(item => {
                        let nomeItem = item.nome || item.name;
                        let qtdItem = item.quantidade !== undefined ? item.quantidade : (item.qtd ? item.qtd : 1);
                        return `<li>🛒 ${qtdItem}x ${nomeItem}</li>`;
                    }).join('');
                } catch (e) {
                    itensHtml = "<li>Erro ao listar produtos.</li>";
                }

                return `
                    <div class="pedido-card">
                        <div class="pedido-header">
                            <div>
                                <span class="pedido-id">Pedido #${pedido.id}</span>
                                <span class="pedido-data">${dataFormatada}</span>
                            </div>
                            <div class="pedido-total">
                                ${pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                        </div>
                        <ul class="pedido-itens">
                            ${itensHtml}
                        </ul>
                    </div>
                `;
            }).join('');

        } catch (erro) {
            console.error("Erro ao buscar histórico:", erro);
            containerPedidos.innerHTML = "<p style='color: red;'>Não foi possível carregar seu histórico no momento. O servidor pode estar offline.</p>";
        }
    }

    carregarHistoricoPedidos();
});