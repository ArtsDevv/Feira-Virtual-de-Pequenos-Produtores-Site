document.addEventListener("DOMContentLoaded", () => {
    // 1. Identifica o usuário e define qual "gaveta" do banco de dados abrir
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";
    
    let carrinho = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const taxaFrete = 10.00;

    // Renderiza o carrinho na tela assim que carregar
    renderizarCarrinho();

    const btnFinalizar = document.getElementById('btn-finalizar');
    const msgLogin = document.getElementById('msg-login');

    // === LÓGICA DO BOTÃO FINALIZAR PEDIDO (INTEGRADA COM O JAVA) ===
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async () => { 
            // Regra 1: Precisa estar logado
            if (!usuarioLogado) {
                if (msgLogin) {
                    msgLogin.innerText = "Você precisa fazer login para finalizar a compra!";
                    msgLogin.style.display = "block";
                } else {
                    alert("Você precisa fazer login para finalizar a compra!");
                }
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

            // Regra 3: Integração com o Banco de Dados (Java)
            try {
                // Calcula o total
                let subtotal = 0;
                carrinho.forEach(item => {
                    let qtd = item.qtd ? Number(item.qtd) : 1;
                    subtotal += item.price * qtd;
                });
                const valorTotalPedido = subtotal + taxaFrete;

                // Monta o pacote EXATAMENTE como o Java espera
                const pacotePedido = {
                    usuarioId: usuarioLogado.id, // ID oficial gerado pelo MySQL
                    itensCarrinho: JSON.stringify(carrinho), // Transforma o array em texto para o banco
                    valorTotal: valorTotalPedido
                };

                // Desabilita o botão para evitar cliques duplos
                btnFinalizar.innerText = "Processando Pedido...";
                btnFinalizar.disabled = true;

                // Envia para o nosso Gerente na porta 8082
                const resposta = await fetch('http://localhost:8082/api/pedidos/finalizar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pacotePedido)
                });

                if (resposta.ok) {
                    // SUCESSO!
                    alert("🎉 Pedido realizado com sucesso! Os produtores já estão separando seus alimentos.");
                    
                    // Limpa o carrinho atual
                    localStorage.removeItem(chaveCart);
                    
                    // Redireciona para a Home
                    window.location.href = "../index.html";
                } else {
                    const erroJava = await resposta.text();
                    alert("Ops! Ocorreu um problema: " + erroJava);
                    btnFinalizar.innerText = "Finalizar Pedido";
                    btnFinalizar.disabled = false;
                }

            } catch (erro) {
                console.error("Erro de conexão:", erro);
                alert("Erro ao conectar com o servidor. Verifique se o sistema está online.");
                btnFinalizar.innerText = "Finalizar Pedido";
                btnFinalizar.disabled = false;
            }
        });
    }

    // === FUNÇÕES DE RENDERIZAÇÃO E CÁLCULO ===
    function renderizarCarrinho() {
        const listaHtml = document.getElementById('lista-carrinho');
        if (!listaHtml) return; // Evita erro se a div não existir
        
        listaHtml.innerHTML = '';
        let subtotal = 0;

        if (carrinho.length === 0) {
            listaHtml.innerHTML = '<p style="text-align:center; padding: 20px; color:#888;">Seu carrinho está vazio.</p>';
            atualizarTotais(0);
            return;
        }

        carrinho.forEach((item, index) => {
            let qtd = item.qtd ? Number(item.qtd) : 1;
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

    // Funções globais (window) para os botões do HTML enxergarem
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
        const elSubtotal = document.getElementById('subtotal');
        const elTotal = document.getElementById('total-pedido');
        
        if (elSubtotal) elSubtotal.innerText = formatarMoeda(subtotal);
        if (elTotal) {
            const total = subtotal > 0 ? subtotal + taxaFrete : 0;
            elTotal.innerText = formatarMoeda(total);
        }
    }

    function salvarERenderizar() {
        localStorage.setItem(chaveCart, JSON.stringify(carrinho));
        renderizarCarrinho();
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});