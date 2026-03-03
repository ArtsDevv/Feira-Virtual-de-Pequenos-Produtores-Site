// Lê o utilizador logado para gerir o carrinho correto
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

document.addEventListener("DOMContentLoaded", () => {
    const vitrine = document.getElementById("vitrine-produtos");
    const campoBusca = document.getElementById("campo-busca");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenarPreco = document.getElementById("ordenarPreco");

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

    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value;
        const ordem = ordenarPreco.value;

        let resultado = produtosGlobais.filter(p => 
            (cat === "Todos" || p.category.toLowerCase() === cat.toLowerCase()) &&
            p.name.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.price - b.price);
        if (ordem === "maior") resultado.sort((a,b) => b.price - a.price);

        renderizar(resultado);
    }

    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // INICIA A PÁGINA MOSTRANDO APENAS MERCEARIA
    renderizar(produtosGlobais.filter(p => p.category.toLowerCase() === "mercearia")); 
    atualizarMiniCart();
});

window.adicionarAoCart = (id) => {
    const prod = produtosGlobais.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id === id);
    if(index > -1) cart[index].qtd += 1;
    else cart.push({...prod, qtd: 1});
    localStorage.setItem(chaveCart, JSON.stringify(cart));
    atualizarMiniCart();
};

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