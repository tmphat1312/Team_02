package com.property.search.service;

import com.property.search.model.Property;
import com.property.search.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyRepository propertyRepository;

    @Transactional(readOnly = true)
    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Property> findAll(Pageable pageable) {
        return propertyRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Property> findById(String id) {
        try {
            Long longId = Long.parseLong(id);
            return propertyRepository.findById(longId);
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    @Transactional(readOnly = true)
    public Optional<Property> findById(Long id) {
        return propertyRepository.findById(id);
    }
}