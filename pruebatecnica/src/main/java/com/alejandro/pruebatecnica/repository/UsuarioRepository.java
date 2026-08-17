package com.alejandro.pruebatecnica.repository;

import com.alejandro.pruebatecnica.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    
    Optional<Usuario> findByCorreoAndContrasenaAndEstatus(String correo, String contrasena, Integer estatus);
}
