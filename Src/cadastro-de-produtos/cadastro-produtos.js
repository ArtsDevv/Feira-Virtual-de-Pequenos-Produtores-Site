document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Segurança: Só produtores acessam
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const form = document.getElementById('form-cadastro-produto');

    // Pega o valor digitado e troca vírgula por ponto para o JS entender a matemática
        let precoDigitado = document.getElementById('prod-preco').value;
        let precoFormatado = precoDigitado.replace(',', '.');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

// 1. Captura os dados
        const novoProduto = {
            id: Date.now().toString(), // Gera um ID único baseado no tempo
            name: document.getElementById('prod-nome').value,
            category: document.getElementById('prod-categoria').value,
            price: parseFloat(precoFormatado), // Usa a variável formatada aqui!
            unidade: document.getElementById('prod-unidade').value,
            desc: document.getElementById('prod-desc').value,
            img: document.getElementById('prod-img').value || '../assets/default-product.jpg',
            emailProdutor: usuarioLogado.email,
            dataCadastro: new Date().toLocaleDateString()
        };

        // 2. Salva no banco de dados específico deste produtor
        const chaveProdutos = `produtos_produtor_${usuarioLogado.email}`;
        let meusProdutos = JSON.parse(localStorage.getItem(chaveProdutos)) || [];
        
        meusProdutos.push(novoProduto);
        localStorage.setItem(chaveProdutos, JSON.stringify(meusProdutos));

        // 3. Feedback e Limpeza
        alert(`Sucesso! O produto "${novoProduto.name}" foi cadastrado.`);
        form.reset();
        
        window.location.href = "../Configuracoes_produtor/Configuracoes_Produtor.html";
    });
});