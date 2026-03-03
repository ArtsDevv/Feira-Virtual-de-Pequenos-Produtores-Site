const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

document.addEventListener("DOMContentLoaded", () => {
    const vitrine = document.getElementById("vitrine-produtos");
    const campoBusca = document.getElementById("campo-busca");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenarPreco = document.getElementById("ordenarPreco");

    // Função que desenha os cards na tela
    function renderizar(lista) {
        vitrine.innerHTML = lista.map(p => `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <p>${p.name}</p>
                <p class="preco">R$ ${p.price.toFixed(2).replace('.',',')}</p>
                <button class="btn-carrinho" onclick="adicionarAoCart('${p.id}')">Adicionar</button>
            </div>
        `).join('');
    }

    // Função que filtra os produtos
    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value;
        const ordem = ordenarPreco.value;

        // Filtra por Categoria e Texto
        let resultado = produtos.filter(p => 
            (cat === "Todos" || p.category.toLowerCase() === cat.toLowerCase()) &&
            p.name.toLowerCase().includes(termo)
        );

        // Ordena por Preço
        if (ordem === "menor") resultado.sort((a,b) => a.price - b.price);
        if (ordem === "maior") resultado.sort((a,b) => b.price - a.price);

        renderizar(resultado);
    }

    // Ouve as mudanças nos filtros
    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // IMPORTANTE: Ao abrir a página de Mercearia, exibe apenas produtos de Mercearia
    renderizar(produtos.filter(p => p.category.toLowerCase() === "mercearia"));
    
    atualizarMiniCart();
});

// Adiciona ao carrinho do usuário correto
window.adicionarAoCart = (id) => {
    const prod = produtos.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id === id);
    
    if(index > -1) cart[index].qtd += 1;
    else cart.push({...prod, qtd: 1});
    
    localStorage.setItem(chaveCart, JSON.stringify(cart));
    atualizarMiniCart();
};

// Atualiza a barra lateral direita
function atualizarMiniCart() {
    const lista = document.getElementById("mini-lista-carrinho");
    const totalMsg = document.getElementById("total-mini");
    const cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    let total = 0;
    
    lista.innerHTML = cart.map(i => {
        total += i.price * i.qtd;
        return `<div class="mini-item"><span>${i.qtd}x ${i.name}</span><span>R$ ${(i.price * i.qtd).toFixed(2)}</span></div>`;
    }).join('');
    
    totalMsg.innerText = `R$ ${total.toFixed(2).replace('.',',')}`;
}