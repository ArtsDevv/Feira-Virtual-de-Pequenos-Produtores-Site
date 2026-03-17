console.log("O arquivo JS está conectado!");
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o reload da página

            const emailDigitado = document.getElementById("email-login").value.trim();
            const senhaDigitada = document.getElementById("senha-login").value;
            const erro = document.getElementById("erro-login");

            // Limpa as mensagens de erro anteriores
            erro.style.display = "none";
            erro.innerText = "";

            // 1. Puxa os usuários do localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // 2. Procura o e-mail na lista
            const usuarioEncontrado = usuarios.find(user => user.email === emailDigitado);

            if (!usuarioEncontrado) {
                erro.innerText = "E-mail não encontrado. Verifique ou cadastre-se.";
                erro.style.display = "block";
                return;
            }

            // 3. Checa a senha
            if (usuarioEncontrado.senha !== senhaDigitada) {
                erro.innerText = "Senha incorreta. Tente novamente.";
                erro.style.display = "block";
                return;
            }

            // 4. Login feito com sucesso! Salva o "estado" de logado
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

            alert(`Bem-vindo(a) de volta, ${usuarioEncontrado.nome}!`);
            
            // Redireciona para a página principal
            window.location.href = "../index.html"; 
        });
    }
});