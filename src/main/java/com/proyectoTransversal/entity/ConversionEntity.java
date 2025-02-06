package com.proyectoTransversal.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "conversion")
public class ConversionEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_CONVERSION", unique = true, nullable = false)
	private Long idConversion;

	@ManyToOne
	@JoinColumn(name = "ID_JUEGO", nullable = false)
	private JuegoEntity juego;

	@Column(name = "EUROS", precision = 10, scale = 2, nullable = false)
	private BigDecimal euros;
	
	@Column(name = "CREDITOS", nullable = false)
	private int creditos;

	public Long getIdConversion() {
		return idConversion;
	}

	public void setIdConversion(Long idConversion) {
		this.idConversion = idConversion;
	}


	public JuegoEntity getJuego() {
		return juego;
	}

	public void setJuego(JuegoEntity juego) {
		this.juego = juego;
	}

	public BigDecimal getEuros() {
		return euros;
	}

	public void setEuros(BigDecimal euros) {
		this.euros = euros;
	}

	public int getCreditos() {
		return creditos;
	}

	public void setCreditos(int creditos) {
		this.creditos = creditos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}
