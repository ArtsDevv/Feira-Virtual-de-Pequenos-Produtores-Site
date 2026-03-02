const produtos = [
    { id: '1', name: 'Pêssego', category: 'hortifruti', price: 4.00, img: '../assets/Pessego.jpg' },
    { id: '2', name: 'Pêra', category: 'hortifruti', price: 2.00, img: '../assets/pera.jpg' },
    { id: '3', name: 'Uva', category: 'hortifruti', price: 3.00, img: '../assets/uva.jpg' },
    { id: '4', name: 'Pera', category: 'hortifruti', price: 3.00, img: '../assets/pera.jpg' },
    { id: '5', name: 'Caju', category: 'hortifruti', price: 3.00, img: '../assets/caju.jpg' },
    { id: '6', name: 'Limão', category: 'hortifruti', price: 0.10, img: '../assets/limao.jpeg' },
    { id: '7', name: 'Milho Verde', category: 'hortifruti', price: 0.80, img: '../assets/corn.png' },
    { id: '8', name: 'Goiaba', category: 'hortifruti', price: 3.00, img: '../assets/goiaba.png' },
    { id: '9', name: 'Banana Prata', category: 'hortifruti', price: 3.00, img: '../assets/banana_prata.jpg' },
    { id: '10', name: 'Acerola', category: 'hortifruti', price: 3.80, img: '../assets/acerola.png' },
    { id: '11', name: 'Laranja', category: 'hortifruti', price: 3.00, img: '../assets/laranja.jpeg' },
    { id: '12', name: 'Mamão', category: 'hortifruti', price: 6.00, img: '../assets/mamao.jpg' },
    { id: '13', name: 'Doce de Leite Caseiro', category: 'mercearia', price: 15.00, img: '../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite1.jpg' },
    { id: '14', name: 'Doce de Leite Cremoso', category: 'mercearia', price: 11.00, img: '../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite2.jpg' },
    { id: '15', name: 'Doce de Leite no Pote', category: 'mercearia', price: 13.50, img: '../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite.jpg' },
    { id: '16', name: 'Doce de Leite dos deuses', category: 'mercearia', price: 11.00, img: '../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite3.jpg' },
    { id: '17', name: 'Manteiga Fresca', category: 'mercearia', price: 11.50, img: '../assets/pagina-padrao/Pagina-Mercearia/manteiga.jpg' },
    { id: '18', name: 'Manteiga Cremosa', category: 'mercearia', price: 9.50, img: '../assets/pagina-padrao/Pagina-Mercearia/manteiga-cremosa.jpg' },
    { id: '19', name: 'Manteiga em Cubo', category: 'mercearia', price: 14.00, img: '../assets/pagina-padrao/Pagina-Mercearia/manteiga-em-cubo.jpg' },
    { id: '20', name: 'Manteiga Caseira', category: 'mercearia', price: 8.50, img: '../assets/pagina-padrao/Pagina-Mercearia/manteiga1.jpg' },
    { id: '21', name: 'Pão Caseiro', category: 'mercearia', price: 10.00, img: '../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro.jpg' },
    { id: '22', name: 'Pão Salgado', category: 'mercearia', price: 15.50, img: '../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro1.jpg' }, 
    { id: '23', name: 'Pão Doce', category: 'mercearia', price: 8.50, img: '../assets/pagina-padrao/Pagina-Mercearia/pao-doce.jpg' },
    { id: '24', name: 'Pão Doce Cremoso', category: 'mercearia', price: 15.00, img: '../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro2.jpg' },
    { id: '25', name: 'Boneca de Pano', category: 'artesanato', price: 28.00, img: '../assets/boneca-de-pano.webp' },
    { id: '26', name: 'Cesta de Palha', category: 'artesanato', price: 22.00, img: '../assets/cesta-de-palha.jpg' },
    { id: '27', name: 'Vaso de Cerâmica', category: 'artesanato', price: 18.50, img: '../assets/vaso.jpg' },
    { id: '28', name: 'Porta Treco', category: 'artesanato', price: 9.00, img: '../assets/porta-treco.webp' },
    { id: '29', name: 'Jogo de Tecido', category: 'artesanato', price: 15.00, img: '../assets/jogo-americano-em-tecido.webp' },
    { id: '30', name: 'Caixote para Jardim', category: 'artesanato', price: 25.00, img: '../assets/caixote-para-jardim-vertical.webp' },
    { id: '31', name: 'Pulseira de Croche', category: 'artesanato', price: 5.00, img: '../assets/pulseira-de-croche.jpg' },
    { id: '32', name: 'Filtro de Barro', category: 'artesanato', price: 32.00, img: '../assets/filtrodebarro.jpeg' },
    { id: '33', name: 'Pano de Prato', category: 'artesanato', price: 6.00, img: '../assets/panodeprato.jpg' },
    { id: '34', name: 'Prateleiro', category: 'artesanato', price: 18.00, img: '../assets/prateleiro.webp' },
    { id: '35', name: 'Passarinho', category: 'artesanato', price: 5.00, img: '../assets/passarinho.webp' }, 
    { id: '36', name: 'Mini Tábua de Corte', category: 'artesanato', price: 16.00, img: '../assets/minitabuadecorte.webp' }
];

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

        let resultado = produtos.filter(p => 
            (cat === "Todos" || p.category === cat) &&
            p.name.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.price - b.price);
        if (ordem === "maior") resultado.sort((a,b) => b.price - a.price);

        renderizar(resultado);
    }

    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    renderizar(produtos.filter(p => p.category === "hortifruti")); // Inicia com hortifruti
    atualizarMiniCart();
});

window.adicionarAoCart = (id) => {
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