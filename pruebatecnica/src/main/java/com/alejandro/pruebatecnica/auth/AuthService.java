package com.alejandro.pruebatecnica.auth;

import com.alejandro.pruebatecnica.dto.LoginDto;
import com.alejandro.pruebatecnica.model.Usuario;
import com.alejandro.pruebatecnica.security.JwtUtils;
import com.alejandro.pruebatecnica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private JwtUtils jwtUtils;

    public Map<String, Object> autenticar(LoginDto request) {
        Usuario usuario = usuarioRepository.findByCorreoAndContrasenaAndEstatus(
                request.getCorreo(),
                request.getContrasena(),
                1 
        ).orElseThrow(() -> new RuntimeException("Credenciales incorrectas o usuario inactivo"));

        String tokenJwt = jwtUtils.generarToken(usuario.getCorreo());

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Login exitoso");
        response.put("usuario", Map.of(
                "idUsuario", usuario.getIdUsuario(),
                "nombre", usuario.getNombre(),
                "correo", usuario.getCorreo(),
                "rol", usuario.getRol() != null ? usuario.getRol().getIdRol() : null,
                "estatus", usuario.getEstatus()
        ));
        response.put("token", tokenJwt);

        return response;
    }
}
