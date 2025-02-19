package com.proyectoTransversal.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "log_crash")
public class LogCrashEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_LOG_CRASH", unique = true, nullable = false)
	private Long idLogCrash;

	@OneToOne
	@JoinColumn(name = "ID_HISTORICO", nullable = false)
	private HistoricoEntity historico;

	@Column(name = "MULTIPLICADOR", nullable = false)
	private double multiplicador;

	public LogCrashEntity(HistoricoEntity historico, double multiplicador) {

		this.historico = historico;
		this.multiplicador = multiplicador;
	}

	public LogCrashEntity() {

	}

	public Long getIdLogCrash() {
		return idLogCrash;
	}

	public void setIdLogCrash(Long idLogCrash) {
		this.idLogCrash = idLogCrash;
	}

	public HistoricoEntity getHistorico() {
		return historico;
	}

	public void setHistorico(HistoricoEntity historico) {
		this.historico = historico;
	}

	public double getMultiplicador() {
		return multiplicador;
	}

	public void setMultiplicador(double multiplicador) {
		this.multiplicador = multiplicador;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
