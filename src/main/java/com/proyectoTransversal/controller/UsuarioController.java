package com.proyectoTransversal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;
import com.proyectoTransversal.model.UsuarioDTO;
import com.proyectoTransversal.services.UsuarioService;

import jakarta.servlet.http.HttpSession;

@RestController
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping("usuarios/registrar")
	public String registroUsuario(@RequestBody UsuarioDTO usuario) {

		return usuarioService.registrarUsuario(usuario);
	}

	@GetMapping("/usuarios/obtenerUsuarioAdmin")
	public UsuarioEntity obtenerUsuarioDePrueba() {
		// USUARIO DE PRUEBA PARA NO TENER QUE LOGUEARNOS CONSTANTEMENTE
		UsuarioEntity usuarioPrueba = usuarioService.encontrarPorId("12345678A");
		return usuarioPrueba;
	}

	@GetMapping("/usuarios/obtenerUsuario")
	public UsuarioEntity obtenerUsuario(HttpSession session) {
		// USUARIO ACTUAL GUARDADO EN LA SESION
		UsuarioEntity usuario = (UsuarioEntity) session.getAttribute("usuario");
		return usuario;
	}

	// RECOGEMOS EN ESTE OBJETO SU DNI Y EL PRESUPUESTO ACTUALIZADO
	@PostMapping("/usuarios/actualizarSaldo")
	public String actualizarSaldo(@RequestBody UsuarioDTO usuario, HttpSession session) {
		usuarioService.actualizarSaldo(usuario.getDni(), usuario.getPresupuesto(), session);
		return "Saldo actualizado correctamente ";
	}

	// UTIL PARA OBTENER HISTORICOS DE UN USUARIO EN LOS CRASH GAME
	@GetMapping("/usuarios/obtenerHistoricosUsuario")
	public List<HistoricoDTO> obtenerHistoricoUsuario(@RequestParam("dni") String dni,
			@RequestParam("idJuego") Long idJuego) {

		UsuarioEntity usuario = usuarioService.encontrarPorId(dni);
		return usuarioService.obtenerHistoricosCrashPorDni(usuario, idJuego);
	}

	// UTIL PARA OBTENER LOS HISTORICOS DE UN USUARIO EN LA TRAGAPERRAS
	@GetMapping("/usuarios/obtenerHistoricosTragaperrasUsuario")
	public List<HistoricoDTO> obtenerHistoricosTragaperrasUsuario(@RequestParam("dni") String dni,
			@RequestParam("idJuego") Long idJuego) {

		UsuarioEntity usuario = usuarioService.encontrarPorId(dni);

		return usuarioService.obtenerHistoricosTragaperrasPorDni(usuario, idJuego);
	}

}
