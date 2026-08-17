package com.alejandro.pruebatecnica.repository;

import com.alejandro.pruebatecnica.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Integer>{
    
}