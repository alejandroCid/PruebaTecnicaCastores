package com.alejandro.pruebatecnica.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventarios")
public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Integer idProducto;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "estatus")
    private Integer estatus;

    public Inventario(){

    }

    public Inventario(Integer idProducto, String nombre, Integer cantidad, Integer estatus){
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.estatus = estatus;
    }

    public Integer getIdProducto() {
        return idProducto;
    } 

    public void setIdProducto(Integer idProducto){
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    } 

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public Integer getCantidad() {
        return cantidad;
    } 

    public void setCantidad(Integer cantidad){
        this.cantidad = cantidad;
    }

    public Integer getEstatus() {
        return estatus;
    } 

    public void setEstatus(Integer estatus){
        this.estatus = estatus;
    }
}