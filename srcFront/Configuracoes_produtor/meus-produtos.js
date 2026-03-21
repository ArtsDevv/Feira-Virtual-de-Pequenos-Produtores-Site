document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se é Produtor
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const container = document.getElementById('lista-meus-produtos');
    let meusProdutos = []; // A lista agora começa vazia e será preenchida pelo Banco

    // 2. NOVA FUNÇÃO: Buscar os produtos do MySQL
    async function carregarProdutosDoBanco() {
        try {
            const resposta = await fetch('http://127.0.0.1:8001/produtos');
            if (resposta.ok) {
                meusProdutos = await resposta.json();
                renderizarProdutos(); // Chama a função de desenhar os cards
            }
        } catch (erro) {
            console.error("Erro ao buscar produtos:", erro);
            container.innerHTML = "<p>Erro ao conectar com o servidor Python.</p>";
        }
    }

    // 3. Função para desenhar a lista na tela (Ajustada para os nomes do MySQL)
    function renderizarProdutos() {
        container.innerHTML = '';

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

        meusProdutos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            
            // Trocamos price por preco
            const precoFormatado = Number(produto.preco).toFixed(2).replace('.', ',');

            // Trocamos img por imagem_url, name por nome, category por categoria e unidade por unidade_medida
            card.innerHTML = `
                <img src="${produto.imagem_url}" alt="${produto.nome}" onerror="this.src='../assets/image_logo.jpeg'">
                <h3>${produto.nome}</h3>
                <span class="categoria">${produto.categoria}</span>
                <div class="preco">R$ ${precoFormatado} <span class="unidade">/ ${produto.unidade_medida}</span></div>
                
                <button class="btn-remover" onclick="removerProduto(${produto.id})">Excluir Produto</button>
            `;
            container.appendChild(card);
        });
    }

    // 4. NOVA FUNÇÃO GLOBAL PARA REMOVER (Conectada ao Python)
    window.removerProduto = async (idParaRemover) => {
        if (confirm("Tem certeza que deseja excluir este produto da feira? Ele sumirá do site para todos os clientes!")) {
            try {
                // Envia a ordem de DELETE para o Python apagar no MySQL
                const resposta = await fetch(`http://127.0.0.1:8001/produtos/${idParaRemover}`, {
                    method: 'DELETE'
                });

                if (resposta.ok) {
                    alert("✅ Produto excluído com sucesso!");
                    // Recarrega a lista do banco para atualizar a tela na hora
                    carregarProdutosDoBanco(); 
                } else {
                    alert("❌ Erro ao tentar excluir o produto no servidor.");
                }
            } catch (erro) {
                console.error("Erro na comunicação com o servidor:", erro);
                alert("Erro de conexão. Verifique se o terminal do Uvicorn está rodando.");
            }
        }
    }

    // 5. Inicializa a página buscando os dados do servidor
    carregarProdutosDoBanco();
});