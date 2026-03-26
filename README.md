# 🛒 Virtual Farmers Market for Small Producers

![Project Status](https://img.shields.io/badge/Status-Completed_--_Updates_Pending-brightgreen)

## 📌 About the Project
Family farming, the primary source of food in the Brazilian countryside, faces enormous barriers regarding market and technology access. This project, developed as a Capstone Project (TCC), applies software engineering to generate **real social impact**. The platform integrates an agile web interface with a robust and secure back-end infrastructure. 

Therefore, this project is built upon a **Full-Stack** ecosystem designed to eliminate intermediaries in the food supply chain, connecting consumers to fresh, local food while offering professional management tools for small producers.

---

## ⚙️ Developed Features

### Front-end (Customer & Producer Experience)
* **Responsive Design and UI/UX:** Layouts focused on conversion and fluidity on mobile devices and desktops (HTML5, CSS3, Flexbox, Grid).
* **Dynamic Data Consumption (Vanilla JS):** Native asynchronous requests (`fetch` API) to render storefronts without page reloads.
* **Real-Time Filters:** Instant product search and organization system processed via JavaScript.
* **Producer Dashboard:** Interactive panel for CRUD operations (Viewing, Creating, and Deleting catalog items).
* **Role-Based Access Control (RBAC):** Conditional interface rendering (dynamic UX). The system safely identifies whether the authenticated user is a "Buyer" or a "Producer," adapting menus, buttons, and control panels for each profile.
* **Session Management & Smart Cart:** Shopping carts individually linked to each user in the database, with real-time calculations and a dynamically rendered order history.

### Back-end & Infrastructure (Data Management)
* **Microservices Architecture:** Clear division of backend responsibilities using diverse ecosystems.
* **Java/Spring Boot (Users and Orders):** Manages authentication, profile control (Buyer/Producer), and the entire flow of sales history and orders within the database.
* **RESTful API (Python/FastAPI):** Fast, efficient, and strongly typed communication focused exclusively on product catalog management.
* **API Gateway (Node.js):** Implementation of a Node.js/Express server to act as a single point of contact (BFF - Backend for Frontend), routing requests to the correct services.
* **Object-Relational Mapping (JPA/Hibernate):** Used in Spring Boot for complex modeling and automatic generation of tables and relationships (Foreign Keys) in MySQL.
* **Relational Database:** Centralized modeling in **MySQL**, ensuring information integrity and real data persistence.
* **Data Isolation & CORS:** Security middleware configuration to allow controlled access to API routes.

---

## 🛠️ Technologies & Tools

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
