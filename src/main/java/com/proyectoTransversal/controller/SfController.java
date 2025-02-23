package com.proyectoTransversal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.proyectoTransversal.entity.UsuarioEntity;

import jakarta.servlet.http.HttpSession;

@Controller
public class SfController {

	@GetMapping("/juegoSanFermin")
	public String juegoSanFermin(HttpSession session) {

		UsuarioEntity usuario = (UsuarioEntity) session.getAttribute("usuario");

		// COMPROBAMOS SI EL USUARIO ESTA LOGUEADO
		if (usuario == null) {
			return "redirect:/";
		} else {
			// COMPROBACION DE QUE UN USUARIO QUE NO ES VIP NO PUEDA ACCEDER A EL JUEGO VIP
			if (usuario.getUsuarioVip() == false) {
				return "redirect:/lobby";
			}
		}

		return "sf";
	}

}
