console.log("O arquivo JS está conectado!");
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", async function(event) {
            event.preventDefault(); // Evita o reload da página

            const emailDigitado = document.getElementById("email-login").value.trim();
            const senhaDigitada = document.getElementById("senha-login").value;
            const erro = document.getElementById("erro-login");

            // Limpa as mensagens de erro anteriores
            erro.style.display = "none";
            erro.innerText = "";

            try {
                // 1. Empacota os dados para enviar ao Java
                const dadosLogin = {
                    email: emailDigitado,
                    senha: senhaDigitada
                };

                // 2. Bate na porta do nosso Gerente Java (Rota de Login)
                const resposta = await fetch('http://localhost:8082/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosLogin)
                });

                // 3. O Java respondeu! Vamos ver o que ele disse:
                if (resposta.ok) {
                    // 🔓 Acesso Liberado (Status 200)
                    const usuarioDoBanco = await resposta.json(); // Pega os dados validados do MySQL
                    
                    // Salva a "credencial" de logado no navegador para o carrinho e outras páginas saberem quem é
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioDoBanco));

                    alert(`Bem-vindo(a) de volta, ${usuarioDoBanco.nome}!`);
                    
                    // Redireciona para a Home
                    window.location.href = "../index.html"; 
                } else if (resposta.status === 401) {
                    // 🚫 Acesso Negado (Status 401 - E-mail ou senha errados)
                    erro.innerText = "E-mail ou senha incorretos. Tente novamente.";
                    erro.style.display = "block";
                } else {
                    // Outros erros
                    erro.innerText = "Erro ao fazer login. Verifique seus dados.";
                    erro.style.display = "block";
                }

            } catch (error) {
                // Se o Java estiver desligado
                console.error("Erro de conexão com o Java:", error);
                erro.innerText = "O servidor está offline. Tente novamente mais tarde.";
                erro.style.display = "block";
            }
        });
    }
});