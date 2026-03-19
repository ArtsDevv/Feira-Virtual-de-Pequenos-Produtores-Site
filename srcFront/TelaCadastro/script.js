console.log("O arquivo JS está conectado!");

document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("form-cadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async function(event) {
            // Impede o envio padrão do formulário
            event.preventDefault(); 

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("password").value;
            const confirmar = document.getElementById("confirm-password").value;
            const erro = document.getElementById("erro-senha");

            // Reseta a mensagem de erro
            erro.style.display = "none";
            erro.innerText = "";

            // Validação de segurança da senha
            if (senha.length < 6) {
                erro.innerText = "A senha deve ter no mínimo 6 caracteres.";
                erro.style.display = "block";
                return;
            }

            if (senha !== confirmar) {
                erro.innerText = "As senhas não são iguais.";
                erro.style.display = "block";
                return;
            }

            // ==========================================
            // INTEGRAÇÃO COM O BACK-END (JAVA SPRING BOOT)
            // ==========================================
            try {
                // Prepara o pacote com os dados do usuário
                const dadosUsuario = {
                    nome: nome,
                    email: email,
                    senha: senha
                };

                // Envia para o Gerente na porta 8082
                const resposta = await fetch('http://localhost:8082/api/usuarios/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosUsuario)
                });

                // Se o Java retornar SUCESSO (Status 200)
                if (resposta.ok) {
                    alert("Cadastro realizado com sucesso! Bem-vindo à Feira Virtual.");
                    window.location.href = "../index.html"; // Redireciona para a Home
                } else {
                    // Se o Java recusar (ex: E-mail já existe no banco)
                    erro.innerText = "Erro ao cadastrar. Este e-mail pode já estar em uso.";
                    erro.style.display = "block";
                }

            } catch (error) {
                // Se o servidor Java estiver desligado
                console.error("Erro de conexão:", error);
                erro.innerText = "Erro ao conectar com o servidor. Tente novamente mais tarde.";
                erro.style.display = "block";
            }
        });
    }
});