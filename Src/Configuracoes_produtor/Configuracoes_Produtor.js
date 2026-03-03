document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Verifica a Autenticação
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        alert("Acesso restrito! Esta área é exclusiva para Produtores Parceiros.");
        window.location.href = "../index.html";
        return;
    }

    // 2. Personaliza a Saudação Baseada no Horário
    const tituloBoasVindas = document.getElementById("boas-vindas");
    if (tituloBoasVindas) {
        const primeiroNome = usuarioLogado.nome.split(" ")[0];
        const horaAtual = new Date().getHours();
        let saudacao = "Olá";

        if (horaAtual >= 5 && horaAtual < 12) saudacao = "Bom dia";
        else if (horaAtual >= 12 && horaAtual < 18) saudacao = "Boa tarde";
        else saudacao = "Boa noite";

        tituloBoasVindas.innerText = `${saudacao}, ${primeiroNome}!`;
    }

    // 3. Botão Sair
    const btnSair = document.getElementById("btn-sair-painel");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            if(confirm("Tem certeza que deseja sair do seu painel?")) {
                localStorage.removeItem("usuarioLogado");
                window.location.href = "../index.html";
            }
        });
    }

    // 4. Botão Cadastrar Novo Produto
    const btnNovoProduto = document.getElementById("btn-novo-produto");
    if (btnNovoProduto) {
        btnNovoProduto.addEventListener("click", () => {
            window.location.href = "./cadastro-produtos.html";
        });
    }
});