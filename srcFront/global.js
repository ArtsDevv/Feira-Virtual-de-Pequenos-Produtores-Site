// =========================================================
// 1. VARIÁVEIS GLOBAIS E CAMINHOS
// =========================================================
// Verifica quem está logado e define a chave certa do carrinho
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

// MÁGICA DE ROTAS: Descobre automaticamente se estamos na Home ou numa sub-pasta
const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
const basePath = isHome ? './' : '../';

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 2. LÓGICA DO CABEÇALHO (Autenticação e Saudação)
    // =========================================================
    const linkConta = document.getElementById("link-conta");
    
    if (linkConta) {
        if (usuarioLogado) {
            // Arruma o link do perfil dependendo de onde o usuário está
            linkConta.href = `${basePath}Perfil_Usuario/Perfil_Usuario.html`; 
            linkConta.title = "Meu Perfil";

            const primeiroNome = usuarioLogado.nome.split(" ")[0];
            
            // Cria a saudação e o botão de sair
            const infoUsuario = document.createElement("div");
            infoUsuario.style.display = "flex";
            infoUsuario.style.alignItems = "center";
            infoUsuario.style.gap = "15px";
            infoUsuario.style.marginLeft = "10px";

            infoUsuario.innerHTML = `
                <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-color, #333);">Olá, ${primeiroNome}</span>
                <a href="#" id="btn-sair" style="font-size: 0.9rem; color: #e74c3c; font-weight: bold; text-decoration: none; cursor: pointer;">Sair</a>
            `;

            linkConta.insertAdjacentElement('afterend', infoUsuario);

            // Botão de Sair
            document.getElementById("btn-sair").addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("usuarioLogado");
                window.location.href = `${basePath}index.html`; // Volta pra Home deslogado
            });

        } else {
            linkConta.href = `${basePath}selecao-perfil/selecao-perfil.html`;
            linkConta.title = "Acessar a Plataforma";
        }
    }
});

// =========================================================
// 3. CARRINHO UNIVERSAL (Ligado ao Banco de Dados)
// =========================================================
// Transformamos em uma função global que pode ser chamada por qualquer botão
window.adicionarAoCarrinho = (id, nome, preco, imagem_url) => {
    let carrinho = JSON.parse(localStorage.getItem(chaveCart)) || [];
    
    // Converte os IDs para string ou número (garantindo que ache corretamente)
    const indexExistente = carrinho.findIndex(item => String(item.id) === String(id));

    if (indexExistente !== -1) {
        carrinho[indexExistente].quantidade += 1;
    } else {
        carrinho.push({ id, name: nome, price: preco, img: imagem_url, quantidade: 1 });
    }
    
    localStorage.setItem(chaveCart, JSON.stringify(carrinho));
    alert(`✅ ${nome} foi adicionado à sua cesta!`);
};