package com.proyectoTransversal.controller;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;

// import com.proyectoTransversal.entity.UsuarioEntity;
// import com.proyectoTransversal.services.IndexService;


@Controller
public class IndexController {
	
	// @Autowired
	// private IndexService indexService;

	@GetMapping("/")
	public String indexController() {
		return "index";
	}

	// @GetMapping("/comprobarDatos")
	// public String iniciarSesion(@RequestParam("nombreUsuario") String nombreUsuario, @RequestParam("pass") String pass, Model model){
	// 	UsuarioEntity usuario = indexService.buscarPorUsuario(nombreUsuario);

	// 	if(usuario != null){
	// 		if(usuario.getPass().equals(pass)){
	// 			if(usuario.getUsuarioVip() == true){
	// 				return "lobbyVip";
	// 			} else {
	// 				return "lobby";
	// 			}
	// 		} else{
	// 			model.addAttribute("mensajeErro", "Contraseña incorrecta");
	// 		}
	// 	}
	// 	return "index";
	// }
}
