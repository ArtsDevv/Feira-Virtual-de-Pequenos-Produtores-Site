const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

const app = express();
const PORT = 3000;
const PYTHON_API_URL = 'http://127.0.0.1:8001'; // O nosso Garçom na porta nova

// ==========================================
// 1. SUPERPODER: SEGURANÇA (Rate Limiting)
// ==========================================
// Protege a sua API: Limita cada IP a 100 requisições a cada 15 minutos.
// Evita que robôs ou usuários mal-intencionados derrubem o seu servidor.
const limitador = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 acessos por IP
    message: { erro: "Muitas requisições feitas por este IP, tente novamente em 15 minutos." }
});
app.use(limitador);

// ==========================================
// 2. SUPERPODER: VELOCIDADE (Cache em Memória)
// ==========================================
// Guarda os dados por 60 segundos. Se 1000 pessoas acessarem a loja no mesmo minuto,
// o Node só vai pedir pro Python na 1ª vez. Nas outras 999, ele entrega da própria memória!
const cacheProdutos = new NodeCache({ stdTTL: 60 }); 

app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
    res.send('🚀 O Maestro Node.js Turbinado está no ar!');
});

// ==========================================
// ROTA PRINCIPAL: O Interceptador Inteligente
// ==========================================
app.get('/api/produtos', async (req, res) => {
    try {
        // PASSO A: O Node verifica se já tem a lista na memória dele
        const produtosNaMemoria = cacheProdutos.get("lista_produtos");

        if (produtosNaMemoria) {
            console.log("⚡ [Node - CACHE] Entregando produtos direto da memória (Super Rápido)!");
            return res.json(produtosNaMemoria);
        }

        // PASSO B: Se não tem na memória, vai no Python buscar
        console.log("📥 [Node - PYTHON] Memória vazia. Indo buscar no Python...");
        const respostaPython = await axios.get(`${PYTHON_API_URL}/produtos`, { timeout: 5000 });
        
        // PASSO C: Salva na memória por 60 segundos para os próximos clientes
        cacheProdutos.set("lista_produtos", respostaPython.data);
        
        console.log("📤 [Node] Python respondeu! Dados salvos no cache e enviados.");
        res.json(respostaPython.data);
        
    } catch (erro) {
        console.error("❌ Erro na ponte Node -> Python:", erro.message);
        res.status(500).json({ erro: "O servidor de dados (Python) demorou ou está offline." });
    }
});

// LIGANDO O SERVIDOR
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🎩 Maestro Node.js [Turbinado] ligado!`);
    console.log(`🛡️  Proteção Anti-Spam: ATIVADA`);
    console.log(`⚡  Sistema de Cache: ATIVADO`);
    console.log(`=========================================\n`);
});