package com.property.search.repository;

import com.property.search.model.PropertyDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertySearchRepository extends ElasticsearchRepository<PropertyDocument, String>, PropertySearchRepositoryCustom {
    
    Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Double longitude,
            Double latitude,
            String propertyType,
            List<String> amenityNames,
            PageRequest pageRequest);
}