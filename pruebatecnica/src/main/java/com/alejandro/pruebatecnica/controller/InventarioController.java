package com.alejandro.pruebatecnica.controller;

import com.alejandro.pruebatecnica.model.Inventario;
import com.alejandro.pruebatecnica.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventario")
public class InventarioController {

    private final InventarioService inventarioService;
    
    @Autowired
    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    };

    @GetMapping
    public ResponseEntity<List<Inventario>> obtenerInventario() {
        List<Inventario> inventario = inventarioService.getAll();
        return ResponseEntity.ok(inventario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventario> obtenerInventarioPorId(@PathVariable int id) {
        return inventarioService.get(id)
                .map(inventario -> ResponseEntity.ok(inventario))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> guardarProducto(@RequestBody Inventario inventario){
        Inventario guardado = inventarioService.post(inventario);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @PatchMapping("/entrada/{cant}")
    public ResponseEntity<?> entradaProducto(
        @RequestBody Inventario inventario, 
        @PathVariable int cant,
        @RequestParam int idUsuario
    ){
        String response = inventarioService.putEntrada(inventario, cant, idUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } 

    @PatchMapping("/salida/{cant}")
    public ResponseEntity<?> salidaProducto(
        @RequestBody Inventario inventario,
        @PathVariable int cant,
        @RequestParam int idUsuario
    ){
        String response = inventarioService.putSalida(inventario, cant, idUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cambiarEstatus(@PathVariable int id){
        String response = inventarioService.delete(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
