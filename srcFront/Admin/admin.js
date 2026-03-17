document.getElementById('form-produto').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // 1. Coleta os dados do formulário
    const novoProduto = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        unidade_medida: document.getElementById('unidade').value,
        descricao: document.getElementById('descricao').value,
        imagem_url: document.getElementById('imagem_url').value || null
    };

    try {
        // 2. Envia para o Backend via POST
        const resposta = await fetch('http://127.0.0.1:8000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novo_produto) // Transforma o objeto JS em texto JSON
        });

        if (resposta.ok) {
            document.getElementById('mensagem').innerText = "✅ Produto cadastrado com sucesso!";
            document.getElementById('mensagem').style.color = "green";
            document.getElementById('form-produto').reset(); // Limpa o formulário
        } else {
            throw new Error('Falha ao cadastrar');
        }
    } catch (erro) {
        document.getElementById('mensagem').innerText = "❌ Erro ao conectar com o servidor.";
        document.getElementById('mensagem').style.color = "red";
    }
});