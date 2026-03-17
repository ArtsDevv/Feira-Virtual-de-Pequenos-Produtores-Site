const API_URL = 'http://127.0.0.1:8000/produtos';

async function buscarProdutosdaAPI() {
    try {
        const resposta = await fetch(API_URL);
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const produtosDoBanco = await resposta.json();
        console.log("Dados recebidos do MySQL:", produtosDoBanco);
        
        renderizarProdutosNaTela(produtosDoBanco);

    } catch (erro) {
        console.error("Servidor Offline! Verifique se o Uvicorn está rodando.", erro);
    }
}

function renderizarProdutosNaTela(listaDeProdutos) {
    const container = document.getElementById('container-produtos'); // Use o ID real do seu HTML
    if (!container) return;

    container.innerHTML = ""; // Limpa o que tiver lá

    listaDeProdutos.forEach(produto => {
        const card = `
            <div class="produto-card">
                <img src="${produto.imagem_url}" alt="${produto.nome}">
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p class="categoria">${produto.categoria}</p>
                    <p class="preco">R$ ${produto.preco.toFixed(2)} / ${produto.unidade_medida}</p>
                    <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', buscarProdutosdaAPI);