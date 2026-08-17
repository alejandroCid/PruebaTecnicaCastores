package com.alejandro.pruebatecnica.repository;

import com.alejandro.pruebatecnica.model.Historial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorialRepository extends JpaRepository<Historial, Integer>{
    
}