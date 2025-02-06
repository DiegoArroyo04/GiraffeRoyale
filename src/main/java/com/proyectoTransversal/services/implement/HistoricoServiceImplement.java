package com.proyectoTransversal.services.implement;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.JuegoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.repo.HistoricoRepository;
import com.proyectoTransversal.services.HistoricoService;

@Service
public class HistoricoServiceImplement implements HistoricoService{
	@Autowired
	HistoricoRepository historicoRepository;
	
	@Override
	public HistoricoEntity crearHistorico(UsuarioEntity usuario,JuegoEntity juego,BigDecimal resultado,int apuesta) {
		HistoricoEntity nuevoHistorico=new HistoricoEntity(usuario,juego,apuesta,resultado);
		historicoRepository.save(nuevoHistorico);
		return nuevoHistorico;
	}

}
