document.addEventListener("DOMContentLoaded", async () => {
    const vitrine = document.getElementById("vitrine-destaques");
    if (!vitrine) return;

    try {
        // 1. Busca TODOS os produtos do MySQL
        const resposta = await fetch('http://127.0.0.1:8000/produtos');
        const todosProdutos = await resposta.json();

        // 2. Pega apenas os últimos 4 produtos (os mais novos)
        const produtosDestaque = todosProdutos.reverse().slice(0, 4);

        // 3. Desenha os cards na Home integrando com a função do global.js
        vitrine.innerHTML = produtosDestaque.map(p => {
            // MÁGICA: Corrige o caminho da imagem apenas para visualização na Home
            const imagemCorrigida = p.imagem_url ? p.imagem_url.replace('../assets/', './assets/') : './assets/image_logo.jpeg';

            return `
            <div class="card-destaque">
                <img src="${imagemCorrigida}" alt="${p.nome}" onerror="this.src='./assets/image_logo.jpeg'">
                <div class="info-destaque">
                    <h4>${p.nome}</h4>
                    <span class="tag-categoria" style="text-transform: capitalize;">${p.categoria}</span>
                    <p class="preco-destaque">R$ ${Number(p.preco).toFixed(2).replace('.',',')} <span class="unidade">/ ${p.unidade_medida}</span></p>
                </div>
                
                <button class="btn-adicionar" onclick="adicionarAoCarrinho('${p.id}', '${p.nome}', ${p.preco}, '${p.imagem_url}')">Adicionar</button>
            </div>
            `;
        }).join('');

    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);
        vitrine.innerHTML = "<p style='text-align: center; width: 100%;'>Servidor offline. Não foi possível carregar as novidades.</p>";
    }
});