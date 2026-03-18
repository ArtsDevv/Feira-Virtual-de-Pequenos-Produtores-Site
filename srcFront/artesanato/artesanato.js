const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

// Variável global para guardar os produtos que virão do banco
let produtosBanco = [];

document.addEventListener("DOMContentLoaded", async () => {
    const vitrine = document.getElementById("vitrine-produtos");
    const campoBusca = document.getElementById("campo-busca");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenarPreco = document.getElementById("ordenarPreco");

    // 1. BUSCAR DADOS DO BACKEND (PYTHON)
    try {
        const resposta = await fetch('http://localhost:3000/api/produtos');
        produtosBanco = await resposta.json();
        console.log("Produtos carregados do banco:", produtosBanco);
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        vitrine.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
        return;
    }

    // 2. FUNÇÃO DE RENDERIZAR (Atualizada com nomes em português)
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

    // 3. FUNÇÃO DE FILTRAR (Ajustada para o banco)
    function filtrar() {
        const termo = campoBusca.value.toLowerCase();
        const cat = filtroCategoria.value; // "artesanato", "hortifruti", etc.
        const ordem = ordenarPreco.value;

        let resultado = produtosBanco.filter(p => 
            (cat === "Todos" || p.categoria.toLowerCase() === cat.toLowerCase()) &&
            p.nome.toLowerCase().includes(termo)
        );

        if (ordem === "menor") resultado.sort((a,b) => a.preco - b.preco);
        if (ordem === "maior") resultado.sort((a,b) => b.preco - a.preco);

        renderizar(resultado);
    }

    // Escutadores de eventos
    campoBusca.addEventListener("input", filtrar);
    filtroCategoria.addEventListener("change", filtrar);
    ordenarPreco.addEventListener("change", filtrar);

    // INICIA EXIBINDO APENAS ARTESANATO
    const apenasArtesanato = produtosBanco.filter(p => p.categoria.toLowerCase() === "artesanato");
    renderizar(apenasArtesanato);
    
    atualizarMiniCart();
});

// 4. FUNÇÃO DO CARRINHO (À Prova de Balas - Português e Inglês)
window.adicionarAoCart = (id) => {
    const prod = produtosBanco.find(p => p.id == id); 
    let cart = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const index = cart.findIndex(i => i.id == id);
    
    if(index > -1) {
        // Se já tem no carrinho, soma 1 na quantidade certa
        if (cart[index].quantidade !== undefined) cart[index].quantidade += 1;
        else cart[index].qtd += 1;
    } else {
        // Salva no padrão em Português para ficar igual à Home e ao Banco
        cart.push({
            id: prod.id,
            nome: prod.nome,
            preco: prod.preco,
            imagem: prod.imagem_url,
            quantidade: 1
        });
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
        // O "Pulo do Gato": Lemos o valor não importa como a Home salvou
        const nomeItem = i.nome || i.name;
        const precoItem = i.preco || i.price;
        const qtdItem = i.quantidade || i.qtd;

        total += precoItem * qtdItem;
        
        return `
            <div class="mini-item">
                <span>${qtdItem}x ${nomeItem}</span>
                <span>R$ ${(precoItem * qtdItem).toFixed(2).replace('.',',')}</span>
            </div>
        `;
    }).join('');
    
    totalMsg.innerText = `R$ ${total.toFixed(2).replace('.',',')}`;
};