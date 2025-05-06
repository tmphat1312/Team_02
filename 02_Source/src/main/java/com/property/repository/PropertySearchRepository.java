package com.property.repository;

import com.property.model.PropertyDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertySearchRepository extends ElasticsearchRepository<PropertyDocument, String> {
    
    // Tìm kiếm theo từ khóa trong title và description
    Page<PropertyDocument> findByTitleContainingOrDescriptionContaining(String title, String description, Pageable pageable);
    
    // Tìm kiếm theo khoảng giá
    Page<PropertyDocument> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // Tìm kiếm theo địa điểm
    Page<PropertyDocument> findByLocation(String location, Pageable pageable);
    
    // Tìm kiếm theo loại bất động sản
    Page<PropertyDocument> findByPropertyType(String propertyType, Pageable pageable);
    
    // Tìm kiếm kết hợp nhiều điều kiện
    @Query("{\"bool\": {\"must\": [" +
            "{\"match\": {\"title\": \"?0\"}}," +
            "{\"range\": {\"price\": {\"gte\": ?1, \"lte\": ?2}}}," +
            "{\"match\": {\"location\": \"?3\"}}" +
            "]}}")
    Page<PropertyDocument> searchByTitleAndPriceRangeAndLocation(
            String title,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            Pageable pageable);
} 