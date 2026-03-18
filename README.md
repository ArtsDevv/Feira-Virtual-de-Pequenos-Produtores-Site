# 🛒 Feira Virtual de Pequenos Produtores

> Um ecossistema Full-Stack projetado para eliminar intermediários na cadeia de alimentos, conectando consumidores a alimentos frescos e locais, além de oferecer gestão profissional para pequenos produtores.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 📌 Sobre o Projeto
A agricultura familiar, principal responsável pelos alimentos no campo no Brasil, enfrenta enormes barreiras de acesso ao mercado e tecnologia. Este projeto, desenvolvido como Trabalho de Conclusão de Curso (TCC), aplica a engenharia de software para gerar **impacto social real**. A plataforma integra uma interface web ágil com uma infraestrutura de back-end robusta e segura.

---

## 📸 Vitrine (Sneak Peek)
*(Adicione aqui 2 ou 3 screenshots das telas do seu sistema. Ex: Home, Painel do Produtor e Carrinho)*
<p align="center">
  <img src="./caminho-da-sua-imagem1.png" width="400">
  <img src="./caminho-da-sua-imagem2.png" width="400">
</p>

---

## ⚙️ Funcionalidades Desenvolvidas (Fase 1 e 2)

### Front-end (Experiência do Cliente & Produtor)
* **Design Responsivo e UI/UX:** Layouts focados na conversão e fluidez em dispositivos móveis e desktops (HTML5, CSS3, Flexbox, Grid).
* **Consumo Dinâmico (Vanilla JS):** Requisições assíncronas nativas (`fetch` API) para renderização de vitrines sem recarregamento de página.
* **Filtros em Tempo Real:** Sistema de pesquisa e organização de produtos processados instantaneamente através do JavaScript.
* **Dashboard do Produtor:** Painel interativo para operações de CRUD (Visualização, Cadastro e Exclusão de itens do catálogo).

### Back-end & Infraestrutura (Gestão de Dados)
* **Java/Spring Boot:** Criação de microsserviços especializados em Java para lidar com o motor de pagamentos (checkout seguro), regras de negócio avançadas e geração de relatórios.
* **API Gateway (Node.js):** Implementação de um servidor Node.js/Express para atuar como o ponto único de contato (BFF), roteando as requisições para os serviços corretos.
* **API RESTful (Python/FastAPI):** Comunicação eficiente e tipada entre a interface web e o banco de dados.
* **Banco de Dados Relacional:** Modelagem de dados centralizada no **MySQL**, garantindo integridade das informações e persistência real dos dados.
* **Isolamento de Dados & CORS:** Configuração de middleware de segurança para permitir acesso controlado às rotas da API.

---

## 🚀 Roadmap e Evolução Arquitetural (Próximos Passos)
Este sistema está sendo projetado para escalar. As próximas etapas envolvem a transição para uma **Arquitetura de Microsserviços**:

- [ ] **Fase 3: Refatoração (DRY):** Centralização de scripts globais (como lógica de carrinho e sessões).
- [ ] **Fase 4: API Gateway (Node.js):** Implementação de um servidor Node.js/Express para atuar como o ponto único de contato (BFF), roteando as requisições para os serviços corretos.
- [ ] **Fase 5: Processamento Transacional (Java/Spring Boot):** Criação de microsserviços especializados em Java para lidar com o motor de pagamentos (checkout seguro), regras de negócio avançadas e geração de relatórios.

  
