document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica quem está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // 2. Barreira de Segurança: Se não tem ninguém logado, expulsa para o login
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "../Acesse a sua conta/Acesseasuaconta.html";
        return; // Para a execução do script aqui
    }

    // 3. Preenche os dados dinâmicos na tela
    // Pegar o primeiro nome e a inicial
    const primeiroNome = usuarioLogado.nome.split(" ")[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    // Injetar no HTML
    document.getElementById("inicial-usuario").innerText = inicial;
    document.getElementById("sidebar-nome").innerText = primeiroNome;
    document.getElementById("painel-nome").innerText = primeiroNome;
    
    document.getElementById("info-nome").innerText = usuarioLogado.nome;
    document.getElementById("info-email").innerText = usuarioLogado.email;

    // 4. Verifica o status do Carrinho desse usuário específico
    const chaveCart = `carrinho_${usuarioLogado.email}`;
    const carrinhoUsuario = JSON.parse(localStorage.getItem(chaveCart)) || [];
    const infoCesta = document.getElementById("info-cesta");

    if (carrinhoUsuario.length === 0) {
        infoCesta.innerHTML = "Sua cesta está <strong>vazia</strong> no momento.";
    } else {
        // Conta a quantidade total de itens (somando a qtd de cada produto)
        let totalItens = 0;
        carrinhoUsuario.forEach(item => totalItens += item.qtd);
        
        infoCesta.innerHTML = `Você tem <strong>${totalItens} item(ns)</strong> aguardando na sua cesta.`;
    }

    // 5. Botão de Sair exclusivo da página de perfil
    const btnSair = document.getElementById("btn-sair-perfil");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "../index.html"; // Manda pra home após sair
        });
    }
});