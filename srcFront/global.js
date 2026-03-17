document.addEventListener('click', function(e) {
    // Verifica se o elemento clicado tem a classe 'btn-add-carrinho'
    if (e.target.classList.contains('btn-add-carrinho')) {
        
        // Pega os atributos data-* do HTML do botão
        const id = e.target.dataset.id; // Adicionado ID para a lógica de quantidade funcionar
        const nome = e.target.dataset.name;
        const preco = e.target.dataset.price;
        const img = e.target.dataset.img;
        
        // Chama a nossa função global
        adicionarCarrinho({ id: id, name: nome, price: preco, img: img });
    }
});

function adicionarCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verificador se o item já está no carrinho pelo ID
    const indexExistente = carrinho.findIndex(item => item.id === produto.id);

    if (indexExistente !== -1) {
        // Se já existe, apenas aumenta a quantidade
        carrinho[indexExistente].quantidade += 1;
    } else {
        // Se não existe, adiciona o produto com quantidade 1
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produto.name} adicionado ao carrinho!`);
}

