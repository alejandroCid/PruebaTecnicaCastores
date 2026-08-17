package com.alejandro.pruebatecnica.service;

import com.alejandro.pruebatecnica.model.Inventario;
import com.alejandro.pruebatecnica.model.Historial;
import com.alejandro.pruebatecnica.repository.HistorialRepository;
import com.alejandro.pruebatecnica.repository.InventarioRepository;
import com.alejandro.pruebatecnica.repository.UsuarioRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    private InventarioRepository inventarioRepository;
    private HistorialRepository historialRepository;
    private UsuarioRepository usuarioRepository;

    @Autowired
    public InventarioService(InventarioRepository inventarioRepository, HistorialRepository historialRepository, UsuarioRepository usuarioRepository) {
        this.inventarioRepository = inventarioRepository;
        this.historialRepository = historialRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Inventario> getAll() {
        return inventarioRepository.findAll();
    }

    public Optional<Inventario> get(int id) {
        return inventarioRepository.findById(id);
    }

    public Inventario post(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    @Transactional
    public String putEntrada(Inventario inventario, int cant, int idUsuario) {
        if (cant <= 0) {
            return "La cantidad a ingresar debe ser mayor a 0.";
        }

        int nuevaCant = inventario.getCantidad() + cant;
        inventario.setCantidad(nuevaCant);
        inventarioRepository.save(inventario);

        Historial historial = new Historial();
        historial.setUsuario(usuarioRepository.getReferenceById(idUsuario));
        historial.setProducto(inventarioRepository.getReferenceById(inventario.getIdProducto()));
        historial.setTipoMovimiento('E');
        historial.setCantidad(cant);
        historial.setFechaHora(LocalDateTime.now());

        historialRepository.save(historial);

        return "Se añadió con exito la " + cant + " cantidad";
    }

    public String putSalida(Inventario inventario, int cant, int idUsuario) {
        if (cant > inventario.getCantidad()) {
            return "No puedes sacar mas producto del que hay registrado en inventario";
        }

        if (cant <= 0) {
            return "La cantidad a ingresar debe ser mayor a 0.";
        }

        int nuevaCant = inventario.getCantidad() - cant;
        inventario.setCantidad(nuevaCant);
        inventarioRepository.save(inventario);

        Historial historial = new Historial();
        historial.setUsuario(usuarioRepository.getReferenceById(idUsuario));
        historial.setProducto(inventarioRepository.getReferenceById(inventario.getIdProducto()));
        historial.setTipoMovimiento('S');
        historial.setCantidad(cant);
        historial.setFechaHora(LocalDateTime.now());

        historialRepository.save(historial);

        return "Se añadió con exito la " + cant + " cantidad";
    }

    public String delete(int id) {
        return inventarioRepository.findById(id).map(inventario -> {
            int nuevoEstatus = (inventario.getEstatus() != null && inventario.getEstatus() == 1) ? 0 : 1;

            inventario.setEstatus(nuevoEstatus);
            inventarioRepository.save(inventario);

            return "Se actualizó con éxito el estatus del producto con ID " + id;
        }).orElse("No se encontró el producto con el ID especificado: " + id);
    }
}
