package com.proyectoTransversal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SfController {
    
    @GetMapping("/juegoSanFermin")
	public String juegoSanFermin() {
		return "sf";
	}

}
