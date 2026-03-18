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

// Verifica quem está logado para o carrinho funcionar
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

// Variável global para guardar os produtos da vitrine
let produtosDestaque = [];

document.addEventListener("DOMContentLoaded", async () => {
    const vitrine = document.getElementById("vitrine-destaques");
    if (!vitrine) return;

    try {
        // 1. Busca TODOS os produtos do MySQL
        const resposta = await fetch('http://127.0.0.1:8000/produtos');
        const todosProdutos = await resposta.json();

        // 2. Pega apenas os últimos 4 produtos (os mais novos)
        // Usamos reverse() para inverter a lista e slice(0, 4) para pegar os 4 primeiros
        produtosDestaque = todosProdutos.reverse().slice(0, 4);

        // 3. Desenha os cards na Home
        vitrine.innerHTML = produtosDestaque.map(p => `
            <div class="card">
                <img src="${p.imagem_url}" alt="${p.nome}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                <p style="font-weight: bold; margin-top: 10px;">${p.nome}</p>
                <span style="font-size: 0.8rem; background: #eee; padding: 3px 8px; border-radius: 10px;">${p.categoria}</span>
                <p class="preco" style="color: #2e7d32; font-weight: bold; margin: 10px 0;">R$ ${p.preco.toFixed(2).replace('.',',')}</p>
                <button class="btn-carrinho" onclick="adicionarAoCartHome(${p.id})" style="width: 100%; padding: 10px; background: #f39c12; border: none; border-radius: 5px; cursor: pointer; color: white;">Adicionar</button>
            </div>
        `).join('');

    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);
        vitrine.innerHTML = "<p>Servidor offline. Não foi possível carregar as novidades.</p>";
    }
});

// 4. Função do Carrinho (específica para a Home por enquanto)
window.adicionarAoCartHome = (id) => {
    const prod = produtosDestaque.find(p => p.id == id);
    if (!prod) return;

    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id == id);
    
    if(index > -1) {
        cart[index].qtd += 1;
    } else {
        cart.push({
            id: prod.id,
            name: prod.nome,
            price: prod.preco,
            img: prod.imagem_url,
            qtd: 1
        });
    }
    
    localStorage.setItem(chaveCart, JSON.stringify(cart));
    alert(`${prod.nome} foi adicionado à sua cesta!`);
};