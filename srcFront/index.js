document.addEventListener("DOMContentLoaded", async () => {
    const vitrineDestaques = document.getElementById("vitrine-produtos"); // Verifique se este é o ID da div na sua Home
    if (!vitrineDestaques) return;

    try {
        // 1. Busca os produtos reais do MySQL
        const resposta = await fetch('http://127.0.0.1:8000/produtos');
        const todosProdutos = await resposta.json();

        // 2. Pega apenas os 8 primeiros produtos para a página inicial não ficar gigante
        const produtosDestaque = todosProdutos.slice(0, 8); 

        // 3. Desenha os cards na Home
        vitrineDestaques.innerHTML = produtosDestaque.map(p => `
            <div class="card produto-card">
                <img src="${p.imagem_url}" alt="${p.nome}" onerror="this.src='./assets/image_logo.jpeg'">
                <div class="info-produto">
                    <h3>${p.nome}</h3>
                    <span class="categoria-tag">${p.categoria}</span>
                    <p class="preco">R$ ${Number(p.preco).toFixed(2).replace('.', ',')} <span class="unidade">/ ${p.unidade_medida}</span></p>
                    <button class="btn-carrinho" onclick="adicionarAoCart(${p.id}, '${p.nome}', ${p.preco}, '${p.imagem_url}')">Adicionar</button>
                </div>
            </div>
        `).join('');

    } catch (erro) {
        console.error("Erro ao carregar a vitrine inicial:", erro);
        vitrineDestaques.innerHTML = "<p>O servidor está offline. Não foi possível carregar as novidades.</p>";
    }
});