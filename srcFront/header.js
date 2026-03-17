document.addEventListener("DOMContentLoaded", () => {
    const linkConta = document.getElementById("link-conta");
    
    // Verifica se existe alguém logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        // 1. MANTÉM O ÍCONE, mas muda o destino para a página de Perfil
        linkConta.href = "../Perfil_Usuario/Perfil_Usuario.html"; 
        linkConta.title = "Meu Perfil";

        // 2. Pega apenas o primeiro nome para a saudação
        const primeiroNome = usuarioLogado.nome.split(" ")[0];
        
        // 3. Cria uma nova caixinha (div) para colocar o "Olá" e o "Sair" AO LADO do ícone
        const infoUsuario = document.createElement("div");
        infoUsuario.style.display = "flex";
        infoUsuario.style.alignItems = "center";
        infoUsuario.style.gap = "15px";
        infoUsuario.style.marginLeft = "10px";

        // Injeta o HTML da saudação e do botão de sair
        infoUsuario.innerHTML = `
            <span style="font-size: 0.95rem; font-weight: 600;">Olá, ${primeiroNome}</span>
            <a href="#" id="btn-sair" style="font-size: 0.9rem; color: #fff; text-decoration: underline; cursor: pointer;">Sair</a>
        `;

        // 4. Insere essa nova caixinha logo DEPOIS do ícone (sem apagá-lo)
        linkConta.insertAdjacentElement('afterend', infoUsuario);

        // 5. Ativa a função de Sair da conta
        document.getElementById("btn-sair").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogado");
            window.location.reload(); // Recarrega a página para voltar ao estado "deslogado"
        });

    } else {
        // Se NÃO estiver logado, aponta para a tela de Escolha de Perfil
        linkConta.href = "./selecao-perfil/selecao-perfil.html";
        linkConta.title = "Acessar a Plataforma";
    }
});