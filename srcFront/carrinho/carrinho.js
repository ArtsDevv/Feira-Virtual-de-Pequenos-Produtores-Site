document.addEventListener("DOMContentLoaded", () => {
    // 1. Identifica o usuário e define qual "gaveta" (chave) do banco de dados abrir
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";
    
    let carrinho = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const taxaFrete = 10.00;

    // Renderiza o carrinho na tela assim que carregar
    renderizarCarrinho();

    const btnFinalizar = document.getElementById('btn-finalizar');
    const msgLogin = document.getElementById('msg-login');

    // === LÓGICA DO BOTÃO FINALIZAR PEDIDO ===
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            // Regra 1: Precisa estar logado
            if (!usuarioLogado) {
                msgLogin.innerText = "Você precisa fazer login para finalizar a compra!";
                msgLogin.style.display = "block";
                setTimeout(() => {
                    window.location.href = "../Acesse a sua conta/Acesseasuaconta.html";
                }, 2000);
                return;
            }

            // Regra 2: Carrinho não pode estar vazio
            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de continuar.");
                return;
            }

            // Regra 3: Redireciona para a página de Checkout que criamos!
            // ATENÇÃO: Verifique se o nome da pasta e do arquivo batem com a sua estrutura.
            window.location.href = "../finalizar_pedido/finalizar.html"; 
        });
    }

    // === FUNÇÕES DE RENDERIZAÇÃO E CÁLCULO ===
    function renderizarCarrinho() {
        const listaHtml = document.getElementById('lista-carrinho');
        listaHtml.innerHTML = '';
        let subtotal = 0;

        if (carrinho.length === 0) {
            listaHtml.innerHTML = '<p style="text-align:center; padding: 20px; color:#888;">Seu carrinho está vazio.</p>';
            atualizarTotais(0);
            return;
        }

        carrinho.forEach((item, index) => {
            let qtd = item.qtd ? Number(item.qtd) : 1; // Garante que a qtd é um número
            subtotal += item.price * qtd;
            
            listaHtml.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
                    </div>
                    <div class="item-actions">
                        <div class="qtd-control">
                            <button onclick="alterarQtd(${index}, -1)">-</button>
                            <input type="text" value="${qtd}" readonly>
                            <button onclick="alterarQtd(${index}, 1)">+</button>
                        </div>
                        <div class="item-price">${formatarMoeda(item.price * qtd)}</div>
                    </div>
                </div>`;
        });
        
        atualizarTotais(subtotal);
    }

    // Funções globais para manipular o carrinho (necessárias para os botões do HTML)
    window.alterarQtd = (index, variacao) => {
        carrinho[index].qtd += variacao;
        if (carrinho[index].qtd <= 0) {
            return removerItem(index);
        }
        salvarERenderizar();
    };

    window.removerItem = (index) => {
        carrinho.splice(index, 1);
        salvarERenderizar();
    };

    function atualizarTotais(subtotal) {
        document.getElementById('subtotal').innerText = formatarMoeda(subtotal);
        const total = subtotal > 0 ? subtotal + taxaFrete : 0;
        document.getElementById('total-pedido').innerText = formatarMoeda(total);
    }

    function salvarERenderizar() {
        localStorage.setItem(chaveCart, JSON.stringify(carrinho));
        renderizarCarrinho();
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});