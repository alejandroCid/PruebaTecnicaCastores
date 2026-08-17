package com.alejandro.pruebatecnica.model;

import com.alejandro.pruebatecnica.model.Rol;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Integer idUsuario;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo")
    private String correo;

    @Column(name = "contrasena")
    private String contrasena;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idRol", nullable = false)
    private Rol rol;

    @Column(name = "estatus")
    private Integer estatus;
    
    public Usuario (){

    }

    public Usuario(Integer idUsuario, String nombre, String correo, String contrasena, Rol rol, Integer estatus){
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.rol = rol;
        this.estatus = estatus;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    } 

    public void setIdUsuario(Integer idUsuario){
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    } 

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    } 

    public void setCorreo(String correo){
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    } 

    public void setContrasena(String contrasena){
        this.contrasena = contrasena;
    }

    public Rol getRol() {
        return rol;
    } 

    public void setRol(Rol rol){
        this.rol = rol;
    }

    public Integer getEstatus() {
        return estatus;
    } 

    public void setEstatus(Integer estatus){
        this.estatus = estatus;
    }
}