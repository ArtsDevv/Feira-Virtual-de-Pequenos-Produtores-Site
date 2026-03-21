document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Segurança: Só produtores acessam
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        window.location.href = "../index.html";
        return;
    }

    const form = document.getElementById('form-cadastro-produto');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Captura e formata o preço (trocando vírgula por ponto)
        let precoDigitado = document.getElementById('prod-preco').value;
        let precoFormatado = parseFloat(precoDigitado.replace(',', '.'));

        // 2. Monta o objeto com os nomes EXATOS que o seu Python espera
        const novoProduto = {
            nome: document.getElementById('prod-nome').value,
            categoria: document.getElementById('prod-categoria').value,
            preco: precoFormatado,
            unidade_medida: document.getElementById('prod-unidade').value,
            descricao: document.getElementById('prod-desc').value,
            imagem_url: document.getElementById('prod-img').value || '../assets/default-product.jpg'
        };

        try {
            // 3. Envia para o Backend (Python + MySQL)
            const resposta = await fetch('http://127.0.0.1:8001/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto)
            });

            if (resposta.ok) {
                // 4. Feedback e Redirecionamento após o sucesso
                alert(`Sucesso! O produto "${novoProduto.nome}" está agora no MySQL.`);
                form.reset();
                window.location.href = "../Configuracoes_produtor/Configuracoes_Produtor.html";
            } else {
                const erro = await resposta.json();
                alert("Erro ao cadastrar: " + (erro.detail || "Verifique os dados."));
            }

        } catch (erro) {
            console.error("Falha na conexão com o servidor:", erro);
            alert("O servidor Python está desligado! Ligue o Uvicorn para cadastrar.");
        }
    });
});