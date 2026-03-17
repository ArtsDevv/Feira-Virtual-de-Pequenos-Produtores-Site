console.log("O arquivo JS está conectado!");
document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("form-cadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            // Impede o envio padrão do formulário para podermos validar com JS
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

            // Confirmação de senha
            if (senha !== confirmar) {
                erro.innerText = "As senhas não são iguais.";
                erro.style.display = "block";
                return;
            }

            // Cria o objeto do usuário
            const usuario = { nome, email, senha };
            
            // Busca a lista atual no localStorage (ou cria um array vazio)
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            
            // Verifica se o e-mail já existe
            const emailJaCadastrado = usuarios.some(user => user.email === email);
            if (emailJaCadastrado) {
                erro.innerText = "Este e-mail já está cadastrado.";
                erro.style.display = "block";
                return;
            }

            // Adiciona o novo usuário e salva
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Cadastro realizado com sucesso!");

            // Redireciona para a página inicial
            window.location.href = "../index.html";
        });
    }
});