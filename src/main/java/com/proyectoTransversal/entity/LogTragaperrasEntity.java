package com.proyectoTransversal.entity;

import java.io.Serializable;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "log_tragaperras")
public class LogTragaperrasEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_LOG_TRAGAPERRAS", unique = true, nullable = false)
	private Long idLogTragaperras;

	@OneToOne
	@JoinColumn(name = "ID_HISTORICO", nullable = false)
	private HistoricoEntity historico;

	@Column(name = "COMBINACION", nullable = false)
	private String combinacion;

	public Long getIdLogTragaperras() {
		return idLogTragaperras;
	}

	public void setIdLogTragaperras(Long idLogTragaperras) {
		this.idLogTragaperras = idLogTragaperras;
	}

	public HistoricoEntity getHistorico() {
		return historico;
	}

	public void setHistorico(HistoricoEntity historico) {
		this.historico = historico;
	}

	public String getCombinacion() {
		return combinacion;
	}

	public void setCombinacion(String combinacion) {
		this.combinacion = combinacion;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	// CONSTRUCTOR PARA REGISTRAR TIRADA
	public LogTragaperrasEntity(HistoricoEntity historico, String combinacion) {
		this.historico = historico;
		this.combinacion = combinacion;
	}

	public LogTragaperrasEntity() {

	}

}
