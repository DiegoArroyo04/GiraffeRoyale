package com.proyectoTransversal.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "juego")
public class JuegoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_JUEGO", unique = true, nullable = false)
	private Long idJuego;

	@Column(name = "NOMBRE", nullable = false)
	private String name;

	@Column(name = "CATEGORIA", nullable = false)
	private String categoria;

	@OneToMany(mappedBy = "juego")
	Set<HistoricoEntity> historicos = new HashSet<HistoricoEntity>();

	@OneToMany(mappedBy = "juego")
	Set<ConversionEntity> conversiones = new HashSet<ConversionEntity>();

	public Long getIdJuego() {
		return idJuego;
	}

	public void setIdJuego(Long idJuego) {
		this.idJuego = idJuego;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<HistoricoEntity> getHistoricos() {
		return historicos;
	}

	public void setHistoricos(Set<HistoricoEntity> historicos) {
		this.historicos = historicos;
	}

	public Set<ConversionEntity> getConversiones() {
		return conversiones;
	}

	public void setConversiones(Set<ConversionEntity> conversiones) {
		this.conversiones = conversiones;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
