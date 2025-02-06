package com.proyectoTransversal.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class CrashController {
	
	@GetMapping("/juegoCrash")
	public String juegoCrash() {
		return "crashGame";
	}	
	
	
}
