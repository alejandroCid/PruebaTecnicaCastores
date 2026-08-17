package com.alejandro.pruebatecnica.repository;

import com.alejandro.pruebatecnica.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
    
}
