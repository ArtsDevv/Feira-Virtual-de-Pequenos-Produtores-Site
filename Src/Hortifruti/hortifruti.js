// A sua lista de produtos (Simulado aqui, mas pode estar no global-Produtos.js)
const produtos = [
    { id: '1', name: 'Uva', category: 'Hortifruti', price: 7.00, img: '../assets/uva.jpg' },
    { id: '2', name: 'Pêssego', category: 'Hortifruti', price: 4.00, img: '../assets/Pessego.jpg' },
    { id: '13', name: 'Doce de Leite', category: 'Mercearia', price: 15.00, img: '../assets/doce.jpg' },
    // ... adicione os outros 33 itens aqui
];

// Lógica de Usuário e Carrinho
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
                <button class="btn-carrinho" onclick="adicionar('${p.id}')">Adicionar</button>
            </div>
        `).join('');
    }

    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value;
        const ordem = ordenarPreco.value;

        let resultado = produtos.filter(p => 
            (cat === "Todos" || p.category === cat) &&
            p.name.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.price - b.price);
        if (ordem === "maior") resultado.sort((a,b) => b.price - a.price);

        renderizar(resultado);
    }

    // Eventos
    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // Inicialização
    renderizar(produtos.filter(p => p.category === "Hortifruti"));
    atualizarMiniCart();
});

// Funções Globais
window.adicionar = (id) => {
    const prod = produtos.find(p => p.id === id);
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