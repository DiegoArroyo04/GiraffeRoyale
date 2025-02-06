package com.proyectoTransversal.services.implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.JuegoEntity;
import com.proyectoTransversal.repo.JuegoRepository;
import com.proyectoTransversal.services.JuegoService;

@Service
public class JuegoServiceImplement implements JuegoService{
	
	@Autowired
	JuegoRepository juegoRepository;
	
	@Override
	public JuegoEntity encontrarJuegoPorId(Long id) {
		Optional<JuegoEntity> juegoOptional =juegoRepository.findById(id);
		return juegoOptional.orElse(null);
	}
	
	
}
