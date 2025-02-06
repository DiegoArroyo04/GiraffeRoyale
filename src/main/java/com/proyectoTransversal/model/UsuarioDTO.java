package com.proyectoTransversal.model;

import java.math.BigDecimal;
import java.util.Date;

public class UsuarioDTO {

    private String dni;
    private String nombre;
    private String apellidos;
    private String nombreUsuario;
    private String email;
    private String telefono;
    private Date fechaNacimiento;
    private BigDecimal presupuesto;
    private Boolean usuarioVip;
    
    //CONSTRUCTOR PARA ACTUALIZAR SALDO
    public UsuarioDTO(String dni, BigDecimal presupuesto) {
		this.dni = dni;
		this.presupuesto = presupuesto;
	}
    
	public UsuarioDTO() {
		
	}

	// Getters y Setters
    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public BigDecimal getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(BigDecimal presupuesto) {
        this.presupuesto = presupuesto;
    }

    public Boolean getUsuarioVip() {
        return usuarioVip;
    }

    public void setUsuarioVip(Boolean usuarioVip) {
        this.usuarioVip = usuarioVip;
    }
}
