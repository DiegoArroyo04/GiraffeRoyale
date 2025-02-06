package com.proyectoTransversal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoTransversal.entity.JuegoEntity;

@Repository
public interface JuegoRepository extends JpaRepository<JuegoEntity, Long>{
	 // JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
}
