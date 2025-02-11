package com.proyectoTransversal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoTransversal.entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {
    // JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
    @Query("SELECT usu FROM UsuarioEntity usu WHERE usu.nombreUsuario = :nombreUsuario")
    UsuarioEntity buscarPorUsuario(@Param("nombreUsuario") String nombreUsuario);

}
