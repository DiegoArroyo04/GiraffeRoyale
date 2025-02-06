package com.proyectoTransversal.repo;


// import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyectoTransversal.entity.UsuarioEntity;



@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {
	// JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
	
    // @Query("SELECT a FROM UsarioEntity a WHERE a.nombreUsuario = :nombreUsuario")
    // UsuarioEntity buscarPorUsuario(@Param(value = "USERNAME") String nombreUsuario);
}


