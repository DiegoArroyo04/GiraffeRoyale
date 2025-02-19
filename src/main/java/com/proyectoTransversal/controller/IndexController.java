package com.proyectoTransversal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.services.IndexService;

import jakarta.servlet.http.HttpSession;

@Controller
public class IndexController {

	@Autowired
	private IndexService indexService;

	@GetMapping("/")
	public String indexController() {
		return "index";
	}

	@GetMapping("/comprobarLogin")
	public String iniciarSesion(@RequestParam("nombreUsuario") String nombreUsuario, @RequestParam("pass") String pass,
			Model model, HttpSession session) {
		UsuarioEntity usuario = indexService.buscarPorUsuario(nombreUsuario);

		// SI EL USUARIO EXISTE COMPROBAMOS LA CONTRASEÑA
		if (usuario != null) {
			if (usuario.getPass().equals(pass)) {

				session.setAttribute("usuario", usuario);
				// COMPROBACION DEL ROL
				if (usuario.getUsuarioVip() == true) {
					return "redirect:/lobbyVip";
				} else {
					return "redirect:/lobby";
				}
			} else {
				model.addAttribute("mensajeError", "Contraseña incorrecta");
				return "index";
			}
		} else {
			model.addAttribute("mensajeError", "Usuario no registrado");
			return "index";
		}

	}

	@GetMapping("/formularioRegistro")
	public String registroUsuario() {
		return "registro";
	}

	@GetMapping("/comprobarLobby")
	public String comprobarLobby(HttpSession session) {
		UsuarioEntity usuario = (UsuarioEntity) session.getAttribute("usuario");

		if (usuario.getUsuarioVip() == true) {
			return "redirect:/lobbyVip";
		} else {
			return "redirect:/lobby";
		}

	}

	@GetMapping("/lobby")
	public String lobby() {

		return "lobby";
	}

	@GetMapping("/lobbyVip")
	public String lobbyVip() {
		return "lobbyVip";
	}

	@GetMapping("/cerrarSesion")
	public String cerrarSesion(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

}
