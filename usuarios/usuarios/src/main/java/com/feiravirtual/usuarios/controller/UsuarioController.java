package com.feiravirtual.usuarios.controller;

import com.feiravirtual.usuarios.model.Usuario;
import com.feiravirtual.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Libera a porta para o Front-end e o Node conversarem com o Java
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    // ROTA 1: Cadastrar um novo usuário
    @PostMapping("/cadastrar")
    public Usuario cadastrarUsuario(@RequestBody Usuario novoUsuario) {
        System.out.println("📥 Recebendo novo cadastro: " + novoUsuario.getNome());
        return repository.save(novoUsuario); // Salva no banco e devolve o usuário criado
    }

    // ROTA 2: Listar todos os usuários (Para a gente testar depois)
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }
}