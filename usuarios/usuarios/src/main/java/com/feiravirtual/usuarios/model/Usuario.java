package com.feiravirtual.usuarios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios") // O Java vai criar uma tabela com esse nome no MySQL!
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    // Construtor vazio (Obrigatório para o Spring)
    public Usuario() {}

    // Construtor com dados
    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    // ==========================================
    // Getters e Setters (As "portas de acesso" dos dados)
    // ==========================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}