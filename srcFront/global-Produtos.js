// =========================================================
// INTEGRAÇÃO COM A API PYTHON
// =========================================================
const API_URL = 'http://localhost:3000/api/produtos';

async function buscarProdutosdaAPI() {
    try {
        const resposta = await fetch(API_URL);
        
        if (!resposta.ok) throw new Error('Erro ao buscar dados da API');

        const produtosDoBanco = await resposta.json();
        renderizarProdutosNaTela(produtosDoBanco);

    } catch (erro) {
        console.error("Servidor Offline! Verifique se o Uvicorn está rodando.", erro);
        const container = document.getElementById('container-produtos');
        if (container) container.innerHTML = "<p>Erro ao carregar os produtos da feira. Tente novamente mais tarde.</p>";
    }
}

function renderizarProdutosNaTela(listaDeProdutos) {
    const container = document.getElementById('container-produtos');
    if (!container) return;

    container.innerHTML = ""; 

    // Desenha os cards e já passa os dados completos pro botão de adicionar ao carrinho
    container.innerHTML = listaDeProdutos.map(produto => `
        <div class="produto-card">
            <img src="${produto.imagem_url}" alt="${produto.nome}" onerror="this.src='../assets/image_logo.jpeg'">
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p class="categoria" style="text-transform: capitalize;">${produto.categoria}</p>
                <p class="preco">R$ ${Number(produto.preco).toFixed(2).replace('.', ',')} / ${produto.unidade_medida}</p>
                
                <button class="btn-add-carrinho" onclick="adicionarAoCarrinho('${produto.id}', '${produto.nome}', ${produto.preco}, '${produto.imagem_url}')">
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

// =========================================================
// FUNÇÃO DE EXCLUSÃO (Para o Painel Admin/Produtor)
// =========================================================
window.excluirProdutoDoBanco = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja apagar este produto definitivamente?");
    
    if (confirmacao) {
        try {
            const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

            if (resposta.ok) {
                alert("🗑️ Produto excluído com sucesso!");
                location.reload(); 
            } else {
                alert("❌ Erro ao excluir o produto no servidor.");
            }
        } catch (erro) {
            console.error("Erro na comunicação com o servidor:", erro);
        }
    }
};

// Inicia a busca automaticamente quando o script carrega
document.addEventListener('DOMContentLoaded', buscarProdutosdaAPI);