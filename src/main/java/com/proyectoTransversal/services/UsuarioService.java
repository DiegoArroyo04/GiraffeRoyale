package com.proyectoTransversal.services;

import java.math.BigDecimal;
import java.util.List;

import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;

import jakarta.servlet.http.HttpSession;

public interface UsuarioService {
	UsuarioEntity encontrarPorId(String dni);

	void actualizarSaldo(String dni, BigDecimal nuevoPresupuesto, HttpSession session);

	List<HistoricoDTO> obtenerHistoricosPorDni(UsuarioEntity usuario);

}
