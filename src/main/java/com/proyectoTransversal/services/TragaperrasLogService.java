package com.proyectoTransversal.services;

import com.proyectoTransversal.entity.HistoricoEntity;

public interface TragaperrasLogService {
    void registrarTirada(HistoricoEntity historico, String combinacion);
}
