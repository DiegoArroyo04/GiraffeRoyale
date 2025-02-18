package com.proyectoTransversal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.JuegoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;
import com.proyectoTransversal.services.HistoricoService;
import com.proyectoTransversal.services.JuegoService;
import com.proyectoTransversal.services.LogCrashService;
import com.proyectoTransversal.services.TragaperrasLogService;
import com.proyectoTransversal.services.UsuarioService;

@RestController
public class HistoricoController {

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	JuegoService juegoService;

	@Autowired
	HistoricoService historicoService;

	@Autowired
	LogCrashService logCrashService;

	@Autowired
	TragaperrasLogService logTragaperrasService;

	@PostMapping("/crearTiradaCrash")
	public void crearTiradaCrash(@RequestBody HistoricoDTO historico) {

		// CREAR Y GUARDAR LA TIRADA EN BBBDD
		UsuarioEntity usuario = usuarioService.encontrarPorId(historico.getUsuarioDni());
		JuegoEntity juego = juegoService.encontrarJuegoPorId(historico.getIdJuego());

		HistoricoEntity historicoEntity = historicoService.crearHistorico(usuario, juego, historico.getResultado(),
				historico.getApuesta());

		// GUARDAR EN EL LA TABLA DEL LOG DEL JUEGO
		logCrashService.registrarTirada(historicoEntity, historico.getMultiplicador());

	}

	@PostMapping("/crearTiradaTragaperras")
	public void crearTiradaTragaperras(@RequestBody HistoricoDTO historico) {

		// CREAR Y GUARDAR LA TIRADA EN BBBDD
		UsuarioEntity usuario = usuarioService.encontrarPorId(historico.getUsuarioDni());
		JuegoEntity juego = juegoService.encontrarJuegoPorId(historico.getIdJuego());

		HistoricoEntity historicoEntity = historicoService.crearHistorico(usuario, juego, historico.getResultado(),
				historico.getApuesta());

		// GUARDAR EN EL LA TABLA DEL LOG DEL JUEGO
		logTragaperrasService.registrarTirada(historicoEntity, historico.getCombinacion());

	}

}
