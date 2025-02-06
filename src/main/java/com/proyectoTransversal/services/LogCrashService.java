package com.proyectoTransversal.services;

import com.proyectoTransversal.entity.HistoricoEntity;

public interface LogCrashService {
	void registrarTirada(HistoricoEntity historico,double multiplicador);
}
