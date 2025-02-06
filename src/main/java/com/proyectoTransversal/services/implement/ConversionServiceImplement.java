package com.proyectoTransversal.services.implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoTransversal.entity.ConversionEntity;
import com.proyectoTransversal.repo.ConversionRepository;
import com.proyectoTransversal.services.ConversionService;

@Service
public class ConversionServiceImplement implements ConversionService {
    @Autowired
    private ConversionRepository conversionRepository;

    @Override
    public ConversionEntity encontrarConversionporId(Long id) {
        Optional<ConversionEntity> optionalUsuario = conversionRepository.findById(id);
        return optionalUsuario.orElse(null);
    }
}
