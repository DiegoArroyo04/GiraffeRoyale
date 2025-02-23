package com.proyectoTransversal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.proyectoTransversal.entity.UsuarioEntity;

import jakarta.servlet.http.HttpSession;

@Controller
public class CrashController {

	@GetMapping("/juegoCrash")
	public String juegoCrash(HttpSession session) {
		UsuarioEntity usuario = (UsuarioEntity) session.getAttribute("usuario");

		// COMPROBAMOS SI EL USUARIO ESTA LOGUEADO
		if (usuario == null) {
			return "redirect:/";
		}

		return "crashGame";
	}

}
