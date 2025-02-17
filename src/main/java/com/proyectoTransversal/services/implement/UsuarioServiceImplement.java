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
import com.proyectoTransversal.model.UsuarioDTO;
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

	@Override
	public String registrarUsuario(UsuarioDTO usuario) {

		List<UsuarioEntity> usuarios = usuarioRepository.findAll();

		// COMPROBACIONES DE QUE EL USUARIO NO SE HAYA REGISTRADO ANTES
		for (UsuarioEntity usuarioBucle : usuarios) {
			if (usuario.getDni().equals(usuarioBucle.getDni())) {
				return "Este usuario ya ha sido registrado con este DNI";
			} else if (usuario.getEmail().equals(usuarioBucle.getEmail())) {
				return "Este usuario ya ha sido registrado con este email";
			} else if (usuario.getNombreUsuario().equals(usuarioBucle.getNombreUsuario())) {
				return "Este usuario ya ha sido registrado con este nombre de usuario";
			} else if (usuario.getTelefono().equals(usuarioBucle.getTelefono())) {
				return "Este usuario ya ha sido registrado con este número de télefono";
			}
		}

		// REGISTRAR USUARIO SI NO HA SIDO ENCONTRADO

		UsuarioEntity usuarioEntity = new UsuarioEntity();
		usuarioEntity.setDni(usuario.getDni());
		usuarioEntity.setNombre(usuario.getNombre());
		usuarioEntity.setApellidos(usuario.getApellidos());
		usuarioEntity.setNombreUsuario(usuario.getNombreUsuario());
		usuarioEntity.setPass(usuario.getPass());
		usuarioEntity.setEmail(usuario.getEmail());
		usuarioEntity.setTelefono(usuario.getTelefono());
		usuarioEntity.setFechaNacimiento(usuario.getFechaNacimiento());
		usuarioEntity.setPresupuesto(BigDecimal.ZERO);
		usuarioEntity.setUsuarioVip(usuario.getUsuarioVip());
		usuarioEntity.setTarjetaCredito(usuario.getTarjetaCredito());
		usuarioEntity.setFechaExpiracionTarjeta(usuario.getFechaExpiracionTarjeta());
		usuarioEntity.setCvcTarjeta(usuario.getCvcTarjeta());
		usuarioEntity.setCuentaBancaria(usuario.getCuentaBancaria());
		usuarioEntity.setTitular(usuario.getTitular());
		usuarioRepository.save(usuarioEntity);
		return "Cuenta creada con Éxito.";

	}

}
