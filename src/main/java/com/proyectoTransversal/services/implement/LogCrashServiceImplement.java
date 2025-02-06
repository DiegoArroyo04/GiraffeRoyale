package com.proyectoTransversal.services.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.LogCrashEntity;
import com.proyectoTransversal.repo.LogCrashRepository;
import com.proyectoTransversal.services.LogCrashService;

@Service
public class LogCrashServiceImplement implements LogCrashService{
	
	@Autowired
	LogCrashRepository logCrashRepository;
	
	@Override
	public void registrarTirada(HistoricoEntity historico, double multiplicador) {
		
		LogCrashEntity logCrash=new LogCrashEntity(historico,multiplicador);
		logCrashRepository.save(logCrash);
		
		
		
	}
	
	
}
