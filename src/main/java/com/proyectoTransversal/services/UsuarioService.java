package com.proyectoTransversal.services;

import java.math.BigDecimal;
import java.util.List;

import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;

public interface UsuarioService {
	UsuarioEntity encontrarPorId(String dni);
	void actualizarSaldo(String dni,BigDecimal nuevoPresupuesto);
	List<HistoricoDTO> obtenerHistoricosPorDni(UsuarioEntity usuario);
	
}
