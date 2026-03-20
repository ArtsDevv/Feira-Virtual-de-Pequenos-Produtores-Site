package com.feiravirtual.usuarios.repository;

import com.feiravirtual.usuarios.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    // Mágica do Spring: Busca todos os pedidos de um cliente específico!
    List<Pedido> findByUsuarioId(Long usuarioId);
}