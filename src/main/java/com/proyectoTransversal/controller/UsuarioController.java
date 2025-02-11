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

@RestController
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	// IGNORAR POR EL MOMENTO NO SE REGISTRA PERO TENGO EL METODO PREPARADO
	@PostMapping("/registrar")
	public String registroUsuario(@RequestBody UsuarioDTO usuario) {

		return "Registro recibido para el usuario: ";
	}

	@GetMapping("/usuarios/obtenerUsuarioAdmin")
	public UsuarioEntity obtenerUsuarioDePrueba() {
		// USUARIO DE PRUEBA PARA NO TENER QUE LOGUEARNOS CONSTANTEMENTE
		UsuarioEntity usuarioPrueba = usuarioService.encontrarPorId("12345678A");
		return usuarioPrueba;
	}

	// RECOGEMOS EN ESTE OBJETO SU DNI Y EL PRESUPUESTO ACTUALIZADO
	@PostMapping("/usuarios/actualizarSaldo")
	public String actualizarSaldo(@RequestBody UsuarioDTO usuario) {
		usuarioService.actualizarSaldo(usuario.getDni(), usuario.getPresupuesto());
		return "Saldo actualizado correctamente ";
	}

	@GetMapping("/usuarios/obtenerHistoricosUsuario")
	public List<HistoricoDTO> obtenerHistoricoUsuario(@RequestParam("dni") String dni) {
		UsuarioEntity usuario = usuarioService.encontrarPorId(dni);
		return usuarioService.obtenerHistoricosPorDni(usuario);
	}

}
