package com.proyectoTransversal.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "historico")
public class HistoricoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_HISTORICO", unique = true, nullable = false)
	private Long idHistorico;

	// INSERTABLE FALSE PORQUE LA INSERCCION DE LA FECHA SE HACE DESDE BBDD
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA", nullable = false, insertable = false)
	private Timestamp fecha;

	@ManyToOne
	@JoinColumn(name = "USUARIO_DNI", nullable = false)
	private UsuarioEntity usuario;

	@ManyToOne
	@JoinColumn(name = "ID_JUEGO", nullable = false)
	private JuegoEntity juego;

	@Column(name = "APUESTA", nullable = false)
	private int apuesta;

	@Column(name = "RESULTADO", precision = 10, scale = 2, nullable = false)
	private BigDecimal resultado;

	@OneToOne(mappedBy = "historico")
	private LogTragaperrasEntity logTragaperras;

	@OneToOne(mappedBy = "historico")
	private LogCrashEntity logCrash;

	public HistoricoEntity(UsuarioEntity usuario, JuegoEntity juego, int apuesta, BigDecimal resultado) {

		this.usuario = usuario;
		this.juego = juego;
		this.apuesta = apuesta;
		this.resultado = resultado;
	}

	public HistoricoEntity() {

	}

	public Long getIdHistorico() {
		return idHistorico;
	}

	public void setIdHistorico(Long idHistorico) {
		this.idHistorico = idHistorico;
	}

	public Timestamp getFecha() {
		return fecha;
	}

	public void setFecha(Timestamp fecha) {
		this.fecha = fecha;
	}

	public UsuarioEntity getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

	public JuegoEntity getJuego() {
		return juego;
	}

	public void setJuego(JuegoEntity juego) {
		this.juego = juego;
	}

	public int getApuesta() {
		return apuesta;
	}

	public void setApuesta(int apuesta) {
		this.apuesta = apuesta;
	}

	public BigDecimal getResultado() {
		return resultado;
	}

	public void setResultado(BigDecimal resultado) {
		this.resultado = resultado;
	}

	public LogTragaperrasEntity getLogTragaperras() {
		return logTragaperras;
	}

	public void setLogTragaperras(LogTragaperrasEntity logTragaperras) {
		this.logTragaperras = logTragaperras;
	}

	public LogCrashEntity getLogCrash() {
		return logCrash;
	}

	public void setLogCrash(LogCrashEntity logCrash) {
		this.logCrash = logCrash;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "HistoricoEntity [idHistorico=" + idHistorico + ", fecha=" + fecha + ", usuario=" + usuario + ", juego="
				+ juego + ", apuesta=" + apuesta + ", resultado=" + resultado + ", logTragaperras=" + logTragaperras
				+ ", logCrash=" + logCrash + "]";
	}

}
