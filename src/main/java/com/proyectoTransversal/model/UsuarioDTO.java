package com.proyectoTransversal.model;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

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
    private String pass;
    private String tarjetaCredito;
    private Date fechaExpiracionTarjeta;
    private Integer cvcTarjeta;
    private String cuentaBancaria;
    private String titular;

    // CONSTRUCTOR USUARIO NO VIP
    public UsuarioDTO(String dni, String nombre, String apellidos, String nombreUsuario, String email, String telefono,
            Date fechaNacimiento, Boolean usuarioVip, String pass) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.usuarioVip = usuarioVip;
        this.pass = pass;
    }

    // CONSTRUCTOR PARA USUARIO VIP CON TARJETA BANCARIA
    public UsuarioDTO(String dni, String nombre, String apellidos, String nombreUsuario, String email, String telefono,
            Date fechaNacimiento, Boolean usuarioVip, String pass, String cuentaBancaria, String titular) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.usuarioVip = usuarioVip;
        this.pass = pass;
        this.cuentaBancaria = cuentaBancaria;
        this.titular = titular;
    }

    // CONSTRUCTOR PARA USUARIO VIP CON TARJETA
    public UsuarioDTO(String dni, String nombre, String apellidos, String nombreUsuario, String email, String telefono,
            Date fechaNacimiento, Boolean usuarioVip, String pass, String tarjetaCredito, Date fechaExpiracionTarjeta,
            Integer cvcTarjeta, String titular) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.usuarioVip = usuarioVip;
        this.pass = pass;
        this.tarjetaCredito = tarjetaCredito;
        this.fechaExpiracionTarjeta = fechaExpiracionTarjeta;
        this.cvcTarjeta = cvcTarjeta;
        this.titular = titular;
    }

    // CONSTRUCTOR PARA ACTUALIZAR SALDO
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

    public String getPass() {
        return pass;
    }

    public String getTarjetaCredito() {
        return tarjetaCredito;
    }

    public Date getFechaExpiracionTarjeta() {
        return fechaExpiracionTarjeta;
    }

    public Integer getCvcTarjeta() {
        return cvcTarjeta;
    }

    public String getCuentaBancaria() {
        return cuentaBancaria;
    }

    public String getTitular() {
        return titular;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public void setTarjetaCredito(String tarjetaCredito) {
        this.tarjetaCredito = tarjetaCredito;
    }

    public void setFechaExpiracionTarjeta(Date fechaExpiracionTarjeta) {
        this.fechaExpiracionTarjeta = fechaExpiracionTarjeta;
    }

    public void setCvcTarjeta(Integer cvcTarjeta) {
        this.cvcTarjeta = cvcTarjeta;
    }

    public void setCuentaBancaria(String cuentaBancaria) {
        this.cuentaBancaria = cuentaBancaria;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

}
