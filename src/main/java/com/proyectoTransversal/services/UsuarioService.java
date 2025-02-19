package com.proyectoTransversal.services;

import java.math.BigDecimal;
import java.util.List;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;
import com.proyectoTransversal.model.UsuarioDTO;

import jakarta.servlet.http.HttpSession;

public interface UsuarioService {
	UsuarioEntity encontrarPorId(String dni);

	void actualizarSaldo(String dni, BigDecimal nuevoPresupuesto, HttpSession session);

	String registrarUsuario(UsuarioDTO usuario);

	List<HistoricoDTO> obtenerHistoricosTragaperrasPorDni(UsuarioEntity usuario, Long idJuego);

	List<HistoricoDTO> obtenerHistoricosCrashPorDni(UsuarioEntity usuario, Long idJuego);
}
