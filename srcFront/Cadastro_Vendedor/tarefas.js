document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastro-form");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // Impede o recarregamento

            // Captura os dados do HTML
            const name = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const localizacao = document.getElementById("localizacao").value.trim();
            const descricao = document.getElementById("descricao").value.trim();
            
            // Pega os checkboxes marcados e transforma numa string (ex: "hortifruti, laticinios")
            const tiposProducao = Array.from(
                document.querySelectorAll('input[name="tipo_producao"]:checked')
            ).map(item => item.value).join(', ');

            // Monta o objeto EXATAMENTE como o Java vai esperar agora
            const novoProdutor = {
                nome: name,
                email: email,
                senha: senha, 
                telefone: telefone,
                localizacao: localizacao,
                descricao: descricao,
                tiposProducao: tiposProducao,
                tipo: 'produtor' // <-- A TAG MÁGICA QUE SEPARA O PRODUTOR DO COMPRADOR
            };

            const btnSubmit = cadastroForm.querySelector('.btn-submit');
            btnSubmit.innerText = "Criando Conta...";
            btnSubmit.disabled = true;

            try {
                // Manda os dados para o Spring Boot (Java)
                const resposta = await fetch('http://localhost:8082/api/usuarios/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novoProdutor)
                });

                if (resposta.ok) {
                    const produtorSalvo = await resposta.json();

                    // Faz o Login Automático com a resposta oficial do Banco
                    localStorage.setItem("usuarioLogado", JSON.stringify(produtorSalvo));

                    alert("Conta criada com sucesso! Bem-vindo à rede de produtores da Feira Virtual.");
                    window.location.href = "../Configuracoes_produtor/Configuracoes_Produtor.html";
                } else {
                    alert("Erro ao cadastrar. Este e-mail pode já estar em uso.");
                    btnSubmit.innerText = "Criar Conta de Produtor";
                    btnSubmit.disabled = false;
                }

            } catch (erro) {
                console.error("Erro na comunicação com o Java:", erro);
                alert("Erro de conexão com o servidor. Verifique se o banco de dados está online.");
                btnSubmit.innerText = "Criar Conta de Produtor";
                btnSubmit.disabled = false;
            }
        });
    }
});