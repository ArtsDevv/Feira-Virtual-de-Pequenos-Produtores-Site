# 🛒 Feira Virtual de Pequenos Produtores


![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)

## 📌 Sobre o Projeto
A agricultura familiar, principal responsável pelos alimentos no campo no Brasil, enfrenta enormes barreiras de acesso ao mercado e tecnologia. Este projeto, desenvolvido como Trabalho de Conclusão de Curso (TCC), aplica a engenharia de software para gerar **impacto social real**. A plataforma integra uma interface web ágil com uma infraestrutura de back-end robusta e segura. 

Logo, este projeto tem como sua estrutura um ecossistema **Full-Stack** projetado para eliminar intermediários na cadeia de alimentos, conectando consumidores a alimentos frescos e locais, além de oferecer gestão profissional para pequenos produtores.

---

## ⚙️ Funcionalidades Desenvolvidas:

### Front-end (Experiência do Cliente & Produtor)
* **Design Responsivo e UI/UX:** Layouts focados na conversão e fluidez em dispositivos móveis e desktops (HTML5, CSS3, Flexbox, Grid).
* **Consumo Dinâmico (Vanilla JS):** Requisições assíncronas nativas (`fetch` API) para renderização de vitrines sem recarregamento de página.
* **Filtros em Tempo Real:** Sistema de pesquisa e organização de produtos processados instantaneamente através do JavaScript.
* **Dashboard do Produtor:** Painel interativo para operações de CRUD (Visualização, Cadastro e Exclusão de itens do catálogo).
* **Controle de Acesso Baseado em Papéis (RBAC):** Renderização condicional da interface (UX dinâmica). O sistema identifica se o usuário autenticado é um "Comprador" ou "Produtor", adaptando os menus, botões e painéis de controle para cada perfil com segurança.
* **Gestão de Sessão e Carrinho Inteligente:** Carrinhos de compra atrelados individualmente a cada usuário no banco, com cálculo em tempo real e histórico de pedidos renderizado dinamicamente.

### Back-end & Infraestrutura (Gestão de Dados)
* **Arquitetura de Microsserviços:** Divisão clara de responsabilidades no back-end utilizando ecossistemas variados.
* **Java/Spring Boot (Usuários e Pedidos):** Gerencia a autenticação, controle de perfis (Comprador/Produtor) e todo o fluxo de histórico de vendas e pedidos no banco.
* **API RESTful (Python/FastAPI):** Comunicação rápida, eficiente e tipada focada exclusivamente no gerenciamento do catálogo de produtos.
* **API Gateway (Node.js):** Implementação de um servidor Node.js/Express para atuar como o ponto único de contato (BFF), roteando as requisições para os serviços corretos.
* **Mapeamento Objeto-Relacional (JPA/Hibernate):** Utilizado no Spring Boot para modelagem complexa e geração automática das tabelas e amarrações (Foreign Keys) no MySQL.
* **Banco de Dados Relacional:** Modelagem centralizada no **MySQL**, garantindo integridade das informações e persistência real dos dados.
* **Isolamento de Dados & CORS:** Configuração de middleware de segurança para permitir acesso controlado às rotas das APIs.

---

## 🚀 Próximos Passos (Roadmap)
* Implementação de Gateway de Pagamento para checkout real.
* Deploy em Nuvem (Cloud Hosting) para os microsserviços e banco de dados.
* Amarração de Foreign Key conectando cada Produto diretamente ao ID de seu Produtor exclusivo.
* Sistema de atualização de status do pedido em tempo real na visão do cliente (Preparando -> Saiu para Entrega).

---

## 🛠️ Tecnologias & Ferramentas

<br>

<div align="center">
  <img src="https://skillicons.dev/icons?i=html" title="HTML5" alt="HTML5" />
  <img src="https://skillicons.dev/icons?i=css" title="CSS3" alt="CSS3" />
  <img src="https://skillicons.dev/icons?i=js" title="JavaScript" alt="JavaScript" />
  <img src="https://skillicons.dev/icons?i=python" title="Python" alt="Python" />
  <img src="https://skillicons.dev/icons?i=fastapi" title="FastAPI" alt="FastAPI" />
  <img src="https://skillicons.dev/icons?i=mysql" title="MySQL" alt="MySQL" />
  <img src="https://skillicons.dev/icons?i=nodejs" title="Node.js" alt="Node.js" />
  <img src="https://skillicons.dev/icons?i=java" title="Java" alt="Java" />
  <img src="https://skillicons.dev/icons?i=spring" title="Spring Boot" alt="Spring" />
  <img src="https://skillicons.dev/icons?i=git" title="Git" alt="Git" />
  <img src="https://skillicons.dev/icons?i=vscode" title="VS Code" alt="VS Code" />
</div>

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0052D4,4364F7&height=120&section=footer" width="100%"/>
