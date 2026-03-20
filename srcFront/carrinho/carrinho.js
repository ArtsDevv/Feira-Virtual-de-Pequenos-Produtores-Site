document.addEventListener("DOMContentLoaded", () => {
    // 1. Identifica o usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";
    
    let carrinho = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const taxaFrete = 10.00;

    renderizarCarrinho();

    const btnFinalizar = document.getElementById('btn-finalizar');
    const msgLogin = document.getElementById('msg-login');

    // === LÓGICA DO BOTÃO FINALIZAR PEDIDO ===
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async () => { 
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

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de continuar.");
                return;
            }

            try {
                let subtotal = 0;
                carrinho.forEach(item => {
                    // Pulo do Gato para a quantidade
                    let qtd = item.quantidade !== undefined ? Number(item.quantidade) : (item.qtd ? Number(item.qtd) : 1);
                    // Pulo do Gato para o preco
                    let precoItem = item.preco !== undefined ? Number(item.preco) : Number(item.price);
                    
                    subtotal += precoItem * qtd;
                });
                const valorTotalPedido = subtotal + taxaFrete;

                const pacotePedido = {
                    usuarioId: usuarioLogado.id,
                    itensCarrinho: JSON.stringify(carrinho),
                    valorTotal: valorTotalPedido
                };

                btnFinalizar.innerText = "Processando Pedido...";
                btnFinalizar.disabled = true;

                const resposta = await fetch('http://localhost:8082/api/pedidos/finalizar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pacotePedido)
                });

                if (resposta.ok) {
                    alert("🎉 Pedido realizado com sucesso! Os produtores já estão separando seus alimentos.");
                    localStorage.removeItem(chaveCart);
                    window.location.href = "../index.html";
                } else {
                    const erroJava = await resposta.text();
                    alert("Ops! Ocorreu um problema: " + erroJava);
                    btnFinalizar.innerText = "Finalizar Pedido";
                    btnFinalizar.disabled = false;
                }

            } catch (erro) {
                console.error("Erro de conexão:", erro);
                alert("Erro ao conectar com o servidor Java. Verifique se a porta 8082 está ativa.");
                btnFinalizar.innerText = "Finalizar Pedido";
                btnFinalizar.disabled = false;
            }
        });
    }

    // === FUNÇÕES DE RENDERIZAÇÃO E CÁLCULO ===
    function renderizarCarrinho() {
        const listaHtml = document.getElementById('lista-carrinho');
        if (!listaHtml) return; 
        
        listaHtml.innerHTML = '';
        let subtotal = 0;

        if (carrinho.length === 0) {
            listaHtml.innerHTML = '<p style="text-align:center; padding: 20px; color:#888;">Seu carrinho está vazio.</p>';
            atualizarTotais(0);
            return;
        }

        carrinho.forEach((item, index) => {
            // O "Pulo do Gato": Lemos o valor não importa como a página salvou (Inglês ou Português)
            let nomeItem = item.nome || item.name;
            let precoItem = item.preco !== undefined ? Number(item.preco) : Number(item.price);
            let imgItem = item.imagem || item.img || item.imagem_url || '../assets/image_logo.jpeg';
            let qtdItem = item.quantidade !== undefined ? Number(item.quantidade) : (item.qtd ? Number(item.qtd) : 1);

            subtotal += precoItem * qtdItem;
            
            listaHtml.innerHTML += `
                <div class="cart-item">
                    <img src="${imgItem}" alt="${nomeItem}" onerror="this.src='../assets/image_logo.jpeg'">
                    <div class="item-details">
                        <h4>${nomeItem}</h4>
                        <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
                    </div>
                    <div class="item-actions">
                        <div class="qtd-control">
                            <button onclick="alterarQtd(${index}, -1)">-</button>
                            <input type="text" value="${qtdItem}" readonly>
                            <button onclick="alterarQtd(${index}, 1)">+</button>
                        </div>
                        <div class="item-price">${formatarMoeda(precoItem * qtdItem)}</div>
                    </div>
                </div>`;
        });
        
        atualizarTotais(subtotal);
    }

    window.alterarQtd = (index, variacao) => {
        // Atualiza a quantidade não importa qual chave o item está usando
        if (carrinho[index].quantidade !== undefined) {
            carrinho[index].quantidade += variacao;
            if (carrinho[index].quantidade <= 0) return removerItem(index);
        } else {
            carrinho[index].qtd += variacao;
            if (carrinho[index].qtd <= 0) return removerItem(index);
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
        // Retorna R$ 0,00 caso o valor venha quebrado
        if (isNaN(valor)) return "R$ 0,00"; 
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});