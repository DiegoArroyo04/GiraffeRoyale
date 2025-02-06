package com.proyectoTransversal.model;

import java.math.BigDecimal;

public class HistoricoDTO {
	private Long idHistorico;
	private String usuarioDni;
	private Long idJuego;
	private int apuesta;
	private BigDecimal resultado;
	private double multiplicador;

	// CONSTRUCTOR PARA RECIBIR TIRADA DESDE JSON
	public HistoricoDTO(String usuarioDni, Long idJuego, int apuesta, BigDecimal resultado, double multiplicador) {
		this.usuarioDni = usuarioDni;
		this.idJuego = idJuego;
		this.apuesta = apuesta;
		this.resultado = resultado;
		this.multiplicador = multiplicador;
	}

	// CONSTRUCTOR PARA ORDENAR POR ULTIMAS TIRADAS
	public HistoricoDTO(Long idHistorico, String usuarioDni, Long idJuego, int apuesta, BigDecimal resultado,
			double multiplicador) {
		
		this.idHistorico = idHistorico;
		this.usuarioDni = usuarioDni;
		this.idJuego = idJuego;
		this.apuesta = apuesta;
		this.resultado = resultado;
		this.multiplicador = multiplicador;
	}

	
	public HistoricoDTO() {
		
	}

	public String getUsuarioDni() {
		return usuarioDni;
	}

	public void setUsuarioDni(String usuarioDni) {
		this.usuarioDni = usuarioDni;
	}

	public Long getIdJuego() {
		return idJuego;
	}

	public void setIdJuego(Long idJuego) {
		this.idJuego = idJuego;
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

	public double getMultiplicador() {
		return multiplicador;
	}

	public void setMultiplicador(double multiplicador) {
		this.multiplicador = multiplicador;
	}

	public Long getIdHistorico() {
		return idHistorico;
	}

	public void setIdHistorico(Long idHistorico) {
		this.idHistorico = idHistorico;
	}

	@Override
	public String toString() {
		return "HistoricoDTO [idHistorico=" + idHistorico + ", usuarioDni=" + usuarioDni + ", idJuego=" + idJuego
				+ ", apuesta=" + apuesta + ", resultado=" + resultado + ", multiplicador=" + multiplicador + "]";
	}

}
