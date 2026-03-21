document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica quem está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // 2. Barreira de Segurança
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "../Acesse a sua conta/Acesseasuaconta.html";
        return;
    }

    // 3. Preenche os dados dinâmicos na tela
    const primeiroNome = usuarioLogado.nome.split(" ")[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    document.getElementById("inicial-usuario").innerText = inicial;
    document.getElementById("sidebar-nome").innerText = primeiroNome;
    document.getElementById("painel-nome").innerText = primeiroNome;
    
    document.getElementById("info-nome").innerText = usuarioLogado.nome;
    document.getElementById("info-email").innerText = usuarioLogado.email;

    // ==========================================
    // 4. CORREÇÃO DA CESTA (Adeus, NaN!)
    // ==========================================
    const chaveCart = `carrinho_${usuarioLogado.email}`;
    const carrinhoUsuario = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const infoCesta = document.getElementById("info-cesta");

    if (carrinhoUsuario.length === 0) {
        infoCesta.innerHTML = "Sua cesta está <strong>vazia</strong> no momento.";
    } else {
        let totalItens = 0;
        carrinhoUsuario.forEach(item => {
            // O "Pulo do Gato": Lê a quantidade não importa como esteja escrita
            let qtdItem = item.quantidade !== undefined ? Number(item.quantidade) : (item.qtd ? Number(item.qtd) : 1);
            totalItens += qtdItem;
        });
        
        infoCesta.innerHTML = `Você tem <strong>${totalItens} item(ns)</strong> aguardando na sua cesta.`;
    }

    // ==========================================
    // 4.5 MÁGICA DE UX: BOTÃO DO PRODUTOR 🌾
    // ==========================================
    if (usuarioLogado.tipo === 'produtor') {
        const menuPerfil = document.querySelector('.menu-perfil');
        const divConfig = document.querySelector('.config'); // Pega a div do botão de sair
        
        if (menuPerfil && divConfig) {
            // Cria um botão novo dinamicamente
            const btnPainelProdutor = document.createElement('button');
            btnPainelProdutor.className = 'menu-btn';
            btnPainelProdutor.style.backgroundColor = '#27ae60'; // Cor verde para destacar
            btnPainelProdutor.style.color = 'white';
            btnPainelProdutor.innerText = '🌾 Meu Painel de Produtor';
            
            // Lógica do clique para ir pro lugar certo
            btnPainelProdutor.onclick = () => {
                window.location.href = '../Configuracoes_produtor/Configuracoes_Produtor.html';
            };
            
            // Insere o botão verde bem acima do botão de Sair
            menuPerfil.insertBefore(btnPainelProdutor, divConfig);
        }
    }

    // 5. Botão de Sair exclusivo da página de perfil
    const btnSair = document.getElementById("btn-sair-perfil");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "../index.html"; 
        });
    }

    // ==========================================
    // 6. BUSCAR HISTÓRICO DE PEDIDOS (API JAVA)
    // ==========================================
    async function carregarHistoricoPedidos() {
        const containerPedidos = document.getElementById("lista-pedidos");
        if (!containerPedidos) return; // Evita erro se o HTML do histórico ainda não existir
        
        try {
            const resposta = await fetch(`http://localhost:8082/api/pedidos/historico/${usuarioLogado.id}`);
            
            if (!resposta.ok) throw new Error("Falha na comunicação com o servidor.");

            const pedidos = await resposta.json();

            if (pedidos.length === 0) {
                containerPedidos.innerHTML = "<p style='color: #666;'>Você ainda não realizou nenhuma compra. Visite a feira e apoie nossos produtores!</p>";
                return;
            }

            const pedidosRecentesPrimeiro = pedidos.reverse();

            containerPedidos.innerHTML = pedidosRecentesPrimeiro.map(pedido => {
                const dataFormatada = new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
                });

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