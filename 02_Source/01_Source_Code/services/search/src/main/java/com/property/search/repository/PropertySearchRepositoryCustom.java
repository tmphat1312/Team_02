package com.property.search.repository;

import com.property.search.model.PropertyDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;

public interface PropertySearchRepositoryCustom {
    Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            List<String> amenityNames,
            PageRequest pageRequest);
} 