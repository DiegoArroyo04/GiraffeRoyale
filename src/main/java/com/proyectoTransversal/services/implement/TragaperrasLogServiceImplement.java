package com.proyectoTransversal.services.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.HistoricoEntity;

import com.proyectoTransversal.entity.LogTragaperrasEntity;

import com.proyectoTransversal.repo.LogTragaperrasRepository;
import com.proyectoTransversal.services.TragaperrasLogService;

@Service
public class TragaperrasLogServiceImplement implements TragaperrasLogService {

    @Autowired
    LogTragaperrasRepository logTragaperrasRepository;

    @Override
    public void registrarTirada(HistoricoEntity historico, String combinacion) {

        LogTragaperrasEntity logTragaperras = new LogTragaperrasEntity(historico, combinacion);
        logTragaperrasRepository.save(logTragaperras);

    }

}
