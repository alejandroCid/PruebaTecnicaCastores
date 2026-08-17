package com.alejandro.pruebatecnica.controller;

import com.alejandro.pruebatecnica.model.Historial;
import com.alejandro.pruebatecnica.service.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "http://localhost:5173")
public class HistorialController {

    public final HistorialService historialService;

    @Autowired
    public HistorialController(HistorialService historialService){
        this.historialService = historialService;
    }

    @GetMapping
    public ResponseEntity<List<Historial>> obtenerHistorial(){
        List<Historial> historial = historialService.getAll();
        return ResponseEntity.ok(historial);
    }
}
