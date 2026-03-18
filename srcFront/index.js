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
        produtosDestaque = todosProdutos.reverse().slice(0, 4);

        // 3. Desenha os cards na Home com classes CSS limpas
        vitrine.innerHTML = produtosDestaque.map(p => {
            // MÁGICA: Corrige o caminho da imagem de '../assets' para './assets' na Home
            const imagemCorrigida = p.imagem_url ? p.imagem_url.replace('../assets/', './assets/') : './assets/image_logo.jpeg';

            return `
            <div class="card-destaque">
                <img src="${imagemCorrigida}" alt="${p.nome}" onerror="this.src='./assets/image_logo.jpeg'">
                <div class="info-destaque">
                    <h4>${p.nome}</h4>
                    <span class="tag-categoria">${p.categoria}</span>
                    <p class="preco-destaque">R$ ${p.preco.toFixed(2).replace('.',',')} <span class="unidade">/ ${p.unidade_medida}</span></p>
                </div>
                <button class="btn-adicionar" onclick="adicionarAoCartHome(${p.id})">Adicionar</button>
            </div>
            `;
        }).join('');

    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);
        vitrine.innerHTML = "<p style='text-align: center; width: 100%;'>Servidor offline. Não foi possível carregar as novidades.</p>";
    }
});

// 4. Função do Carrinho
window.adicionarAoCartHome = (id) => {
    const prod = produtosDestaque.find(p => p.id == id);
    if (!prod) return;

    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id == id);
    
    if(index > -1) {
        cart[index].qtd += 1;
    } else {
        cart.push({ id: prod.id, name: prod.nome, price: prod.preco, img: prod.imagem_url, qtd: 1 });
    }
    
    localStorage.setItem(chaveCart, JSON.stringify(cart));
    alert(`${prod.nome} foi adicionado à sua cesta!`);
};