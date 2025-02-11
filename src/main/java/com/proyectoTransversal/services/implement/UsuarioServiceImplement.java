package com.proyectoTransversal.services.implement;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;
import com.proyectoTransversal.repo.UsuarioRepository;
import com.proyectoTransversal.services.UsuarioService;

import jakarta.servlet.http.HttpSession;

@Service
public class UsuarioServiceImplement implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UsuarioEntity encontrarPorId(String dni) {
		Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(dni);
		return optionalUsuario.orElse(null);
	}

	@Override
	public void actualizarSaldo(String dni, BigDecimal nuevoPresupuesto, HttpSession session) {
		UsuarioEntity usuario = encontrarPorId(dni);
		usuario.setPresupuesto(nuevoPresupuesto);
		usuarioRepository.save(usuario);
		session.setAttribute("usuario", usuario);
	}

	@Override
	public List<HistoricoDTO> obtenerHistoricosPorDni(UsuarioEntity usuario) {

		List<HistoricoDTO> historicosList = new ArrayList<>();
		for (HistoricoEntity historico : usuario.getHistoricos()) {
			HistoricoDTO historicoDto = new HistoricoDTO(historico.getIdHistorico(), historico.getUsuario().getDni(),
					historico.getJuego().getIdJuego(), historico.getApuesta(), historico.getResultado(),
					historico.getLogCrash().getMultiplicador());
			historicosList.add(historicoDto);
		}

		return historicosList;
	}

}
