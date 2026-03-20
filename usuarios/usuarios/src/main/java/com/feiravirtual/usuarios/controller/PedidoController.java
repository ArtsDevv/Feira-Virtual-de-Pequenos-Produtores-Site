package com.feiravirtual.usuarios.controller;

import com.feiravirtual.usuarios.model.Pedido;
import com.feiravirtual.usuarios.model.Usuario;
import com.feiravirtual.usuarios.repository.PedidoRepository;
import com.feiravirtual.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*") // Libera a porta para o Front-end
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Classe "pacote" para receber os dados limpos do Front-end
    public static class PedidoRequest {
        public Long usuarioId;
        public String itensCarrinho;
        public Double valorTotal;
    }

    // ROTA PRINCIPAL: Finalizar a compra
    @PostMapping("/finalizar")
    public ResponseEntity<?> finalizarPedido(@RequestBody PedidoRequest request) {
        
        // 1. Verifica se o usuário que está comprando realmente existe no banco
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(request.usuarioId);
        
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado. Faça login novamente.");
        }

        // 2. Monta o Pedido Oficial conectando o Usuário à Compra
        Pedido novoPedido = new Pedido();
        novoPedido.setUsuario(usuarioOpt.get());
        novoPedido.setItensCarrinho(request.itensCarrinho);
        novoPedido.setValorTotal(request.valorTotal);

        // 3. Salva a venda no MySQL!
        pedidoRepository.save(novoPedido);
        
        System.out.println("🛒 BINGO! Novo pedido salvo com sucesso! Valor: R$ " + request.valorTotal);

        return ResponseEntity.ok("Pedido finalizado com sucesso!");
    }
    
    // ROTA BÔNUS: Histórico de pedidos do usuário
    @GetMapping("/historico/{usuarioId}")
    public ResponseEntity<List<Pedido>> historicoPedidos(@PathVariable Long usuarioId) {
        List<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(pedidos);
    }
}