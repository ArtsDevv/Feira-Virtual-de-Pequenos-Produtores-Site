// Importando as ferramentas
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Inicializando o servidor
const app = express();
const PORT = 3000; // O Node vai rodar na porta 3000 (o Python está na 8000)

// Configurações de Segurança e Dados
app.use(cors()); // Libera o acesso para o seu Front-end
app.use(express.json()); // Ensina o Node a ler arquivos JSON

// O endereço do seu "Garçom" atual
const PYTHON_API_URL = 'http://127.0.0.1:8000';

// ==========================================
// ROTA 1: Teste de Vida
// ==========================================
app.get('/', (req, res) => {
    res.send('🚀 O Maestro (API Gateway Node.js) está no ar!');
});

// ==========================================
// ROTA 2: O Interceptador de Produtos (BFF)
// ==========================================
// Quando o Front-end pedir os produtos para o Node, o Node vai lá no Python buscar.
app.get('/api/produtos', async (req, res) => {
    try {
        console.log("📥 [Node] O Front-end pediu a lista de produtos. Indo buscar no Python...");
        
        // O Node (via Axios) bate na porta do Python
        const respostaPython = await axios.get(`${PYTHON_API_URL}/produtos`);
        
        console.log("📤 [Node] Python respondeu! Devolvendo dados para o Front-end.");
        
        // O Node repassa a bandeja de produtos para o Front-end
        res.json(respostaPython.data);
        
    } catch (erro) {
        console.error("❌ Erro ao tentar falar com o Python:", erro.message);
        res.status(500).json({ erro: "O servidor de dados (Python) parece estar offline." });
    }
});

// ==========================================
// LIGANDO O SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🎩 Maestro Node.js ligado e orquestrando!`);
    console.log(`🌐 Painel rodando em: http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});