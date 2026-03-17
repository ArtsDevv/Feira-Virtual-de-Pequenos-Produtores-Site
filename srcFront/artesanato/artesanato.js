// Verifica quem está logado para usar a chave correta no carrinho
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

document.addEventListener("DOMContentLoaded", () => {
    const vitrine = document.getElementById("vitrine-produtos");
    const campoBusca = document.getElementById("campo-busca");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenarPreco = document.getElementById("ordenarPreco");

    if (!vitrine) {
        console.error("ERRO: Div 'vitrine-produtos' não encontrada!");
        return;
    }

    // Função que desenha os cards
    function renderizar(lista) {
        if (lista.length === 0) {
            vitrine.innerHTML = "<p style='text-align:center; padding: 20px; width: 100%;'>Nenhum produto encontrado nesta categoria.</p>";
            return;
        }

        vitrine.innerHTML = lista.map(p => `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <p>${p.name}</p>
                <p class="preco">R$ ${p.price.toFixed(2).replace('.',',')}</p>
                <button class="btn-carrinho" onclick="adicionarAoCart('${p.id}')">Adicionar</button>
            </div>
        `).join('');
    }

    // Função que filtra e ordena os dados globais
    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value;
        const ordem = ordenarPreco.value;

        // Aqui voltamos a usar "produtos" para bater com o seu global-Produtos.js
        let resultado = produtos.filter(p => 
            (cat === "Todos" || p.category.toLowerCase() === cat.toLowerCase()) &&
            p.name.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.price - b.price);
        if (ordem === "maior") resultado.sort((a,b) => b.price - a.price);

        renderizar(resultado);
    }

    // Adiciona os "escutadores" de eventos nos filtros
    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // INICIA EXIBINDO APENAS ARTESANATO
    renderizar(produtos.filter(p => p.category.toLowerCase() === "artesanato")); 
    atualizarMiniCart();
});

// Funções do Mini-Carrinho Lateral
window.adicionarAoCart = (id) => {
    // Aqui voltamos a usar "produtos" também
    const prod = produtos.find(p => p.id === id);
    
    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id === id);
    
    if(index > -1) {
        cart[index].qtd += 1;
    } else {
        cart.push({...prod, qtd: 1});
    }
    
    localStorage.setItem(chaveCart, JSON.stringify(cart));
    atualizarMiniCart();
};

window.atualizarMiniCart = () => {
    const lista = document.getElementById("mini-lista-carrinho");
    const totalMsg = document.getElementById("total-mini");
    if(!lista || !totalMsg) return;

    const cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    let total = 0;
    
    lista.innerHTML = cart.map(i => {
        total += i.price * i.qtd;
        return `<div class="mini-item"><span>${i.qtd}x ${i.name}</span><span>R$ ${(i.price * i.qtd).toFixed(2)}</span></div>`;
    }).join('');
    
    totalMsg.innerText = `R$ ${total.toFixed(2).replace('.',',')}`;
};