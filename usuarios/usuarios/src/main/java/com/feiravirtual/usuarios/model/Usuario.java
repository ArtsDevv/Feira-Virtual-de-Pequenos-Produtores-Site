package com.feiravirtual.usuarios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
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

    // ==========================================
    // NOVOS CAMPOS PARA O PRODUTOR 🧑‍🌾
    // ==========================================
    
    // Define se é "comprador" ou "produtor" (por padrão, todo mundo é comprador)
    @Column(nullable = false)
    private String tipo = "comprador"; 

    @Column
    private String telefone;

    @Column
    private String localizacao;

    @Column(length = 1000) // Descrição pode ser um texto maior
    private String descricao;

    @Column
    private String tiposProducao; // Vamos salvar a lista de categorias aqui

    // Construtor vazio (Obrigatório para o Spring Boot)
    public Usuario() {}

    // ==========================================
    // GETTERS E SETTERS
    // ==========================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTiposProducao() { return tiposProducao; }
    public void setTiposProducao(String tiposProducao) { this.tiposProducao = tiposProducao; }
}