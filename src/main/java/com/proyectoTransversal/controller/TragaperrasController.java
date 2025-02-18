package com.proyectoTransversal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TragaperrasController {

    @GetMapping("/tragaperras")
    public String juegoSanFermin() {
        return "tragaperras";
    }

}
