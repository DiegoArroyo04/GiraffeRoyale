package com.proyectoTransversal.services;

import java.math.BigDecimal;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.JuegoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;

public interface HistoricoService {
	 HistoricoEntity crearHistorico(UsuarioEntity usuario,JuegoEntity juego,BigDecimal resultado,int apuesta);
}
