package com.alejandro.pruebatecnica.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Rol {
    @Id
    @Column(name = "idRol")
    private Integer idRol;

    @Column(name = "rol")
    private String rol;

    public Rol() {
    }

    public Rol (Integer idRol, String rol) {
        this.idRol = idRol;
        this.rol = rol;
    }

    public Integer getIdRol() {
        return idRol;
    } 

    public void setIdRol(Integer idRol){
        this.idRol = idRol;
    }

    public String getRol() {
        return rol;
    } 

    public void setRol(String rol){
        this.rol = rol;
    }
}