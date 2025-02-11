package com.proyectoTransversal.services;

import com.proyectoTransversal.entity.UsuarioEntity;

public interface IndexService {
    UsuarioEntity buscarPorUsuario(String nombreUsuario);
}
