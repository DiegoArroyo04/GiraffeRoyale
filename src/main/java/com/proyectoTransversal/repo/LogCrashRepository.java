package com.proyectoTransversal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoTransversal.entity.LogCrashEntity;

@Repository
public interface LogCrashRepository extends JpaRepository <LogCrashEntity,Long> {
	 // JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
}
