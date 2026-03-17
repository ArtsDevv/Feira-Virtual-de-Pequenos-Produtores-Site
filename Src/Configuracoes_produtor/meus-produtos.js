document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se é Produtor
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    // 2. Chave e Elementos da DOM
    const chaveProdutos = `produtos_produtor_${usuarioLogado.email}`;
    let meusProdutos = JSON.parse(localStorage.getItem(chaveProdutos)) || [];
    const container = document.getElementById('lista-meus-produtos');

    // 3. Função para desenhar a lista na tela
    function renderizarProdutos() {
        container.innerHTML = '';

        // Se não tiver produtos cadastrados, mostra uma mensagem amigável
        if (meusProdutos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="#ccc" stroke-width="1.5" fill="none" style="margin-bottom: 15px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    <h2>Seu catálogo está vazio</h2>
                    <p style="margin: 10px 0 25px;">Você ainda não tem nenhum produto publicado na vitrine da feira.</p>
                    <button onclick="window.location.href='./cadastro-produtos.html'" class="btn-primary" style="margin: 0 auto;">Cadastrar Meu Primeiro Produto</button>
                </div>
            `;
            return;
        }

        // Desenha os cartões
        meusProdutos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            
            // Formatando o preço para ficar bonitinho (ex: 15,90)
            const precoFormatado = Number(produto.price).toFixed(2).replace('.', ',');

            card.innerHTML = `
                <img src="${produto.img}" alt="${produto.name}" onerror="this.src='../assets/image_logo.jpeg'">
                <h3>${produto.name}</h3>
                <span class="categoria">${produto.category}</span>
                <div class="preco">R$ ${precoFormatado} <span class="unidade">/ ${produto.unidade}</span></div>
                
                <button class="btn-remover" onclick="removerProduto('${produto.id}')">Excluir Produto</button>
            `;
            container.appendChild(card);
        });
    }

    // 4. Função Global para remover (precisa ser global para funcionar no onclick do HTML injetado)
    window.removerProduto = (idParaRemover) => {
        if (confirm("Tem certeza que deseja excluir este produto do seu catálogo?")) {
            // Filtra a lista mantendo apenas os produtos com ID diferente do que queremos apagar
            meusProdutos = meusProdutos.filter(produto => produto.id !== idParaRemover);
            
            // Salva a lista atualizada no banco
            localStorage.setItem(chaveProdutos, JSON.stringify(meusProdutos));
            
            // Desenha a tela novamente
            renderizarProdutos();
        }
    }

    // Inicializa a página
    renderizarProdutos();
});