package com.property.service;

import com.property.model.PropertyDocument;
import com.property.repository.PropertySearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertySearchService {

    private final PropertySearchRepository propertySearchRepository;
    private final PropertyService propertyService; // Service JPA để lấy dữ liệu từ MySQL

    /**
     * Đồng bộ dữ liệu từ MySQL sang Elasticsearch định kỳ
     */
    @Scheduled(cron = "${sync.elasticsearch.cron}")
    @Transactional
    public void syncDataToElasticsearch() {
        try {
            log.info("Bắt đầu đồng bộ dữ liệu từ MySQL sang Elasticsearch");
            
            // Lấy danh sách property từ MySQL
            List<Property> properties = propertyService.findAll();
            
            // Chuyển đổi sang PropertyDocument và lưu vào Elasticsearch
            properties.forEach(property -> {
                PropertyDocument document = convertToDocument(property);
                propertySearchRepository.save(document);
            });
            
            log.info("Đồng bộ dữ liệu thành công. Số lượng bản ghi: {}", properties.size());
        } catch (Exception e) {
            log.error("Lỗi khi đồng bộ dữ liệu: {}", e.getMessage(), e);
        }
    }

    /**
     * Tìm kiếm property với nhiều điều kiện
     */
    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            Pageable pageable) {
        
        if (query != null && !query.isEmpty()) {
            return propertySearchRepository.searchByTitleAndPriceRangeAndLocation(
                    query, minPrice, maxPrice, location, pageable);
        }
        
        return propertySearchRepository.findByLocationAndPropertyTypeAndPriceBetween(
                location, propertyType, minPrice, maxPrice, pageable);
    }

    /**
     * Chuyển đổi từ Property (MySQL) sang PropertyDocument (Elasticsearch)
     */
    private PropertyDocument convertToDocument(Property property) {
        return PropertyDocument.builder()
                .id(property.getId().toString())
                .title(property.getTitle())
                .description(property.getDescription())
                .price(property.getPrice())
                .location(property.getLocation())
                .propertyType(property.getPropertyType())
                .area(property.getArea())
                .bedrooms(property.getBedrooms())
                .bathrooms(property.getBathrooms())
                .createdAt(property.getCreatedAt())
                .updatedAt(property.getUpdatedAt())
                .isActive(property.getIsActive())
                .build();
    }
} 