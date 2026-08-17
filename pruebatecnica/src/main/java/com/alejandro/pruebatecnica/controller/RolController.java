package com.alejandro.pruebatecnica.controller;

import com.alejandro.pruebatecnica.model.Rol;
import com.alejandro.pruebatecnica.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RolController {

    private final RolService rolService;

    @Autowired
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping
    public ResponseEntity<List<Rol>> obtenerRoles() {
        List<Rol> roles = rolService.getAll();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> obtenerRolPorId(@PathVariable int id) {
        return rolService.get(id)
                .map(rol -> ResponseEntity.ok(rol))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}