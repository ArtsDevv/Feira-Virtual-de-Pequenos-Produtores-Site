// Variáveis de Estado
let subtotal = 0;
let frete = 0;
let desconto = 0;
let totalGeral = 0;
let tipoPagamento = '';

// Elementos da DOM
const radiosTipoEnvio = document.querySelectorAll('input[name="tipo"]');
const radiosPagamento = document.querySelectorAll('input[name="payment"]');
const boxEndereco = document.getElementById('box-endereco');
const inputEndereco = document.getElementById('input-endereco');
const btnFinalizar = document.querySelector(".btnFinalizar");

// Elementos do Resumo
const spanSubtotal = document.getElementById("resumo-subtotal");
const spanFrete = document.getElementById("resumo-frete");
const spanDesconto = document.getElementById("resumo-desconto");
const spanTotal = document.getElementById("total");

// Formatador de Moeda nativo do JS (dispensa o real.format)
const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Carrega os dados do Carrinho
function carregarCarrinho() {
    // Busca a chave correta baseada no login
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";
    
    let carrinho = JSON.parse(localStorage.getItem(chaveCart)) || [];
    
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        window.location.href = "../carrinho/carrinho.html";
        return;
    }

    subtotal = 0;
    carrinho.forEach(item => {
        // Multiplica o preço pela quantidade
        let qtd = item.qtd ? Number(item.qtd) : 1; 
        subtotal += Number(item.price) * qtd;
    });

    atualizarResumo();
}

// Atualiza os valores na tela
function atualizarResumo() {
    // Regra do Frete (R$ 10 para entrega, R$ 0 para retirada)
    const tipoEnvio = document.querySelector('input[name="tipo"]:checked').value;
    frete = (tipoEnvio === 'entrega') ? 10.00 : 0.00;

    // Regra do Desconto PIX (5% sobre o subtotal)
    desconto = (tipoPagamento === 'pix') ? (subtotal * 0.05) : 0.00;

    // Calcula Total Final
    totalGeral = (subtotal + frete) - desconto;

    // Imprime na tela
    spanSubtotal.innerText = formatarMoeda(subtotal);
    spanFrete.innerText = formatarMoeda(frete);
    spanDesconto.innerText = "- " + formatarMoeda(desconto);
    spanTotal.innerText = formatarMoeda(totalGeral);
}

// Listeners para Tipo de Envio (Entrega/Retirada)
radiosTipoEnvio.forEach(radio => {
    radio.addEventListener("change", (e) => {
        if (e.target.value === 'entrega') {
            boxEndereco.classList.remove("escondido");
            inputEndereco.required = true;
        } else {
            boxEndereco.classList.add("escondido");
            inputEndereco.required = false;
        }
        atualizarResumo();
    });
});

// Listeners para Tipo de Pagamento
radiosPagamento.forEach(radio => {
    radio.addEventListener("change", (e) => {
        tipoPagamento = e.target.value;
        btnFinalizar.disabled = false; // Habilita o botão
        atualizarResumo();
    });
});

// Função de Finalizar a Compra
function finalizar() {
    const tipoEnvio = document.querySelector('input[name="tipo"]:checked').value;
    
    if (tipoEnvio === 'entrega' && inputEndereco.value.trim() === '') {
        alert("Por favor, preencha o endereço para entrega.");
        inputEndereco.focus();
        return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const chaveCart = usuarioLogado ? `carrinho_${usuarioLogado.email}` : "carrinho_visitante";

    // Simula o sucesso
    alert(`Pedido finalizado com sucesso usando ${tipoPagamento.toUpperCase()}!\nValor Total: ${formatarMoeda(totalGeral)}`);
    
    // Limpa o carrinho
    localStorage.removeItem(chaveCart);
    
    // Redireciona para a Home ou para a tela de Perfil
    window.location.href = "../index.html"; 
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", carregarCarrinho);