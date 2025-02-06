package com.proyectoTransversal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoTransversal.entity.ConversionEntity;
import com.proyectoTransversal.services.ConversionService;

@RestController
public class ConversionController {
	
	@Autowired
	ConversionService conversionService;
	
	//CUANDO ENTREMOS A ESTE GETMAPPING CONSULTAREMOS A TRAVES DEL ID DEL JUEGO CUAL ES SU CAMBIO Y EN LA PARTE DE CLIENTE OPERAREMOS CON EL
	@GetMapping("convertirACreditos")
	public int convertir(@RequestParam("id") Long id) {
		ConversionEntity conversion=conversionService.encontrarConversionporId(id);
		return conversion.getCreditos();
	}
	
	
}
