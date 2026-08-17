package com.alejandro.pruebatecnica.service;

import com.alejandro.pruebatecnica.model.Rol;
import com.alejandro.pruebatecnica.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RolService {
    
    private final RolRepository rolRepository;

    @Autowired
    public RolService (RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    public List<Rol> getAll() {
        return rolRepository.findAll();
    }

    public Optional<Rol> get(int id) {
        return rolRepository.findById(id);
    }
}
