package com.alejandro.pruebatecnica.model;

import com.alejandro.pruebatecnica.model.Usuario;
import com.alejandro.pruebatecnica.model.Inventario;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_movimientos")
public class Historial {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMovimiento")
    private Integer idMovimiento;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto", nullable = false)
    private Inventario producto;

    @Column(name = "tipo_movimiento")
    private char tipoMovimiento;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora = LocalDateTime.now();

    public Historial() {
        
    }

    public Historial(Integer idMovimiento, Usuario usuario, Inventario producto, char tipoMovimiento, Integer cantidad, LocalDateTime fechaHora){
        this.idMovimiento = idMovimiento;
        this.usuario = usuario;
        this.producto = producto;
        this.tipoMovimiento = tipoMovimiento;
        this.cantidad = cantidad;
        this.fechaHora = fechaHora;
    }

    public Historial( Usuario usuario, Inventario producto, char tipoMovimiento, Integer cantidad){
        this.usuario = usuario;
        this.producto = producto;
        this.tipoMovimiento = tipoMovimiento;
        this.cantidad = cantidad;
    }

    public Integer getMovimiento() {
        return idMovimiento;
    } 

    public void setIdMovimiento(Integer idMovimiento){
        this.idMovimiento = idMovimiento;
    }

    public Usuario getUsuario() {
        return usuario;
    } 

    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }

     public Inventario getProducto() {
        return producto;
    } 

    public void setProducto(Inventario producto){
        this.producto = producto;
    }

    public char getTipoMovimiento() {
        return tipoMovimiento;
    } 

    public void setTipoMovimiento(char tipoMovimiento){
        this.tipoMovimiento = tipoMovimiento;
    }

    public Integer getCantidad() {
        return cantidad;
    } 

    public void setCantidad(Integer cantidad){
        this.cantidad = cantidad;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    } 

    public void setFechaHora(LocalDateTime fechaHora){
        this.fechaHora = fechaHora;
    }

}
