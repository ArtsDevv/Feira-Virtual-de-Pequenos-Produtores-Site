package com.feiravirtual.usuarios.controller;

import com.feiravirtual.usuarios.model.Usuario;
import com.feiravirtual.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    // ROTA 1: Cadastrar
    @PostMapping("/cadastrar")
    public Usuario cadastrarUsuario(@RequestBody Usuario novoUsuario) {
        System.out.println("📥 Recebendo novo cadastro: " + novoUsuario.getNome());
        return repository.save(novoUsuario);
    }

    // ROTA 2: O Porteiro (Login)
    @PostMapping("/login")
    public ResponseEntity<?> fazerLogin(@RequestBody Usuario dadosLogin) {
        System.out.println("🔐 Tentativa de login para o email: " + dadosLogin.getEmail());
        
        // 1. Busca o usuário no banco pelo email
        Usuario usuarioNoBanco = repository.findByEmail(dadosLogin.getEmail());

        // 2. Se achou o usuário E a senha for exatamente igual...
        if (usuarioNoBanco != null && usuarioNoBanco.getSenha().equals(dadosLogin.getSenha())) {
            System.out.println("✅ Login aprovado para: " + usuarioNoBanco.getNome());
            return ResponseEntity.ok(usuarioNoBanco); // Retorna os dados do usuário com Sucesso (Status 200)
        }

        // 3. Se não achou ou a senha estiver errada, barra na porta!
        System.out.println("❌ Login negado.");
        return ResponseEntity.status(401).body("E-mail ou senha incorretos"); // Erro 401: Não autorizado
    }

    // ROTA 3: Listar todos
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }
}