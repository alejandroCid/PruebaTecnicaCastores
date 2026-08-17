package com.alejandro.pruebatecnica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.alejandro.pruebatecnica.model.Historial;
import com.alejandro.pruebatecnica.repository.HistorialRepository;

@Service
public class HistorialService {
    
    private HistorialRepository historialRepository;

    @Autowired
    public HistorialService(HistorialRepository historialRepository){
        this.historialRepository = historialRepository;
    }

    public List<Historial> getAll() {
        return historialRepository.findAll();
    }
}
