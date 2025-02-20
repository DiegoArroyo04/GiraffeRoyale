package com.proyectoTransversal.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "usuario")
public class UsuarioEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "DNI", unique = true, nullable = false)
	private String dni;

	@Column(name = "NOMBRE", nullable = false)
	private String nombre;

	@Column(name = "APELLIDOS", nullable = false)
	private String apellidos;

	@Column(name = "USERNAME", nullable = false)
	private String nombreUsuario;

	@Column(name = "PASS", nullable = false)
	private String pass;

	@Column(name = "EMAIL", nullable = false)
	private String email;

	@Column(name = "TELEFONO", nullable = false)
	private String telefono;

	@Temporal(TemporalType.DATE)
	@Column(name = "FECHA_NACIMIENTO", nullable = false)
	private Date fechaNacimiento;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_REGISTRO", nullable = true, insertable = false)
	private Timestamp fechaRegistro;

	@Column(name = "PRESUPUESTO", precision = 10, scale = 2, nullable = false)
	private BigDecimal presupuesto;

	@Column(name = "USUARIO_VIP", nullable = false)
	private Boolean usuarioVip;

	@Column(name = "TARJETA_CREDITO")
	private String tarjetaCredito;

	@Temporal(TemporalType.DATE)
	@Column(name = "FECHA_EXPIRACION_TARJETA")
	private Date fechaExpiracionTarjeta;

	@Column(name = "CVC_TARJETA")
	private Integer cvcTarjeta;

	@Column(name = "CUENTA_BANCARIA")
	private String cuentaBancaria;

	@Column(name = "TITULAR")
	private String titular;

	@OneToMany(mappedBy = "usuario") // Relación uno a muchos con HistoricoEntity
	@JsonIgnore // Ignorar esta propiedad al serializar
	Set<HistoricoEntity> historicos = new HashSet<HistoricoEntity>();

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

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
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

	public Timestamp getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Timestamp fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
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

	public String getTarjetaCredito() {
		return tarjetaCredito;
	}

	public void setTarjetaCredito(String tarjetaCredito) {
		this.tarjetaCredito = tarjetaCredito;
	}

	public Date getFechaExpiracionTarjeta() {
		return fechaExpiracionTarjeta;
	}

	public void setFechaExpiracionTarjeta(Date fechaExpiracionTarjeta) {
		this.fechaExpiracionTarjeta = fechaExpiracionTarjeta;
	}

	public Integer getCvcTarjeta() {
		return cvcTarjeta;
	}

	public void setCvcTarjeta(Integer cvcTarjeta) {
		this.cvcTarjeta = cvcTarjeta;
	}

	public String getCuentaBancaria() {
		return cuentaBancaria;
	}

	public void setCuentaBancaria(String cuentaBancaria) {
		this.cuentaBancaria = cuentaBancaria;
	}

	public String getTitular() {
		return titular;
	}

	public void setTitular(String titular) {
		this.titular = titular;
	}

	public Set<HistoricoEntity> getHistoricos() {
		return historicos;
	}

	public void setHistoricos(Set<HistoricoEntity> historicos) {
		this.historicos = historicos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
