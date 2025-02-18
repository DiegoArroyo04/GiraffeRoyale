package com.proyectoTransversal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoTransversal.entity.LogTragaperrasEntity;

@Repository
public interface LogTragaperrasRepository extends JpaRepository<LogTragaperrasEntity, Long> {

}
