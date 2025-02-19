package com.proyectoTransversal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyectoTransversal.entity.HistoricoEntity;
import com.proyectoTransversal.entity.UsuarioEntity;
import com.proyectoTransversal.model.HistoricoDTO;

@Repository
public interface HistoricoRepository extends JpaRepository<HistoricoEntity, Long> {

    // JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID

    @Query("SELECT new com.proyectoTransversal.model.HistoricoDTO(h.apuesta, h.resultado, l.combinacion) " +
            "FROM HistoricoEntity h " +
            "JOIN h.logTragaperras l " +
            "WHERE h.usuario = :usuario AND h.juego.id = :idJuego " +
            "ORDER BY h.idHistorico DESC")
    List<HistoricoDTO> encontrarTiradasTragaperras(@Param("usuario") UsuarioEntity usuario,
            @Param("idJuego") Long idJuego);

    @Query("SELECT new com.proyectoTransversal.model.HistoricoDTO(h.apuesta, h.resultado, l.multiplicador) " +
            "FROM HistoricoEntity h " +
            "JOIN h.logCrash l " +
            "WHERE h.usuario = :usuario AND h.juego.id = :idJuego " +
            "ORDER BY h.idHistorico DESC")
    List<HistoricoDTO> encontrarTiradasCrashGame(@Param("usuario") UsuarioEntity usuario,
            @Param("idJuego") Long idJuego);

}
