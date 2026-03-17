document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastro-form");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", handleFormSubmission);
    }

    function handleFormSubmission(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os dados
        const name = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const localizacao = document.getElementById("localizacao").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        
        const tiposProducao = Array.from(
            document.querySelectorAll('input[name="tipo_producao"]:checked')
        ).map(item => item.value);

        // Monta o objeto do Usuário com a "TAG" especial
        const novoProdutor = {
            nome: name,
            email: email,
            senha: senha, // Num app real, isso iria para um banco criptografado
            telefone: telefone,
            localizacao: localizacao,
            descricao: descricao,
            tiposProducao: tiposProducao,
            tipo: 'produtor' // <-- ISSO DEFINE O PAPEL DELE NO MARKETPLACE
        };

        // Salva no banco de dados "Geral" de usuários
        localStorage.setItem(`usuario_${email}`, JSON.stringify(novoProdutor));

        // Faz o Login Automático do novo produtor
        localStorage.setItem("usuarioLogado", JSON.stringify({
            nome: novoProdutor.nome,
            email: novoProdutor.email,
            tipo: novoProdutor.tipo
        }));

        // Feedback e Redirecionamento
        alert("Conta criada com sucesso! Bem-vindo à rede de produtores.");
        
        // Redireciona para o Painel Administrativo do Produtor
        window.location.href = "../Configuracoes_produtor/Configuracoes_Produtor.html";
    }
});