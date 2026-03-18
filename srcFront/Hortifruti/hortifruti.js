const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

let produtosBanco = [];

document.addEventListener("DOMContentLoaded", async () => {
    const vitrine = document.getElementById("vitrine-produtos");
    const campoBusca = document.getElementById("campo-busca");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenarPreco = document.getElementById("ordenarPreco");

    try {
        const resposta = await fetch('http://localhost:3000/api/produtos');
        produtosBanco = await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        vitrine.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
        return;
    }

    function renderizar(lista) {
        if (lista.length === 0) {
            vitrine.innerHTML = "<p style='text-align:center; padding: 20px; width: 100%;'>Nenhum produto encontrado.</p>";
            return;
        }

        vitrine.innerHTML = lista.map(p => `
            <div class="card">
                <img src="${p.imagem_url}" alt="${p.nome}">
                <p>${p.nome}</p>
                <p class="preco">R$ ${p.preco.toFixed(2).replace('.',',')}</p>
                <button class="btn-carrinho" onclick="adicionarAoCart(${p.id})">Adicionar</button>
            </div>
        `).join('');
    }

    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value;
        const ordem = ordenarPreco.value;

        let resultado = produtosBanco.filter(p => 
            (cat === "Todos" || p.categoria.toLowerCase() === cat.toLowerCase()) &&
            p.nome.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.preco - b.preco);
        if (ordem === "maior") resultado.sort((a,b) => b.preco - a.preco);

        renderizar(resultado);
    }

    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // FILTRO ESPECÍFICO DESTA PÁGINA:
    const apenasHortifruti = produtosBanco.filter(p => p.categoria.toLowerCase() === "hortifruti");
    renderizar(apenasHortifruti);
    
    atualizarMiniCart();
});

// Reutilizamos a lógica do carrinho (Traduzindo para o formato que o seu carrinho.html espera)
window.adicionarAoCart = (id) => {
    const prod = produtosBanco.find(p => p.id == id);
    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id == id);
    
    if(index > -1) {
        cart[index].qtd += 1;
    } else {
        cart.push({ id: prod.id, name: prod.nome, price: prod.preco, img: prod.imagem_url, qtd: 1 });
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