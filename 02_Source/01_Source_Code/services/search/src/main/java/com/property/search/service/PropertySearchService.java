package com.property.search.service;

import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PropertySearchService {
    
    private final PropertySearchRepository propertySearchRepository;

    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            PageRequest pageRequest) {
        
        return propertySearchRepository.searchProperties(
                query, minPrice, maxPrice, location, propertyType, pageRequest);
    }

    public Optional<PropertyDocument> findById(String id) {
        return propertySearchRepository.findById(id);
    }
}