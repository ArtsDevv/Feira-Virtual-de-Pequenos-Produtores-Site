const API_URL = 'http://127.0.0.1:8000/produtos';

async function carregarProdutosDoBanco() {
    const container = document.getElementById('container-produtos'); // Ajuste para o seu ID real
    
    try {
        const resposta = await fetch(API_URL);
        const produtos = await resposta.json();

        if (produtos.length === 0) {
            container.innerHTML = "<p>Nenhum produto encontrado no banco de dados.</p>";
            return;
        }

        container.innerHTML = ""; // Limpa o container

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            card.innerHTML = `
                <img src="${produto.imagem_url}" alt="${produto.nome}">
                <div class="info">
                    <h3>${produto.nome}</h3>
                    <p class="categoria">${produto.categoria}</p>
                    <p class="descricao">${produto.descricao}</p>
                    <p class="preco">R$ ${produto.preco.toFixed(2)} / ${produto.unidade_medida}</p>
                    <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao conectar com o Backend:", erro);
        container.innerHTML = "<p>O servidor está offline. Tente novamente mais tarde.</p>";
    }
}

// Inicia a busca assim que a página é carregada
document.addEventListener('DOMContentLoaded', carregarProdutosDoBanco);
