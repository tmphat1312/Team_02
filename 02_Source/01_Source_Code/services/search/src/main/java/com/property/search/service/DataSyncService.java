package com.property.search.service;

import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import org.springframework.data.geo.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DataSyncService {

    private static final Logger logger = LoggerFactory.getLogger(DataSyncService.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PropertySearchRepository propertySearchRepository;

    @Transactional
    public void syncProperties() {
        String sql = "SELECT p.*, " +
                    "STRING_AGG(pa.\"amenityId\"::text, ',') as amenity_ids " +
                    "FROM properties p " +
                    "LEFT JOIN \"property_amenities\" pa ON p.id = pa.\"propertyId\" " +
                    "GROUP BY p.id";

        List<Map<String, Object>> properties = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> property : properties) {
            Object idObj = property.get("id");
            if (idObj == null) {
                logger.warn("Skipping property with null id: {}", property);
                continue;
            }
            String id = idObj.toString();
            
            // Handle price more flexibly
            BigDecimal priceVal = null;
            Object priceObj = property.get("price");
            if (priceObj != null) {
                priceVal = new BigDecimal(priceObj.toString());
            }

            String amenityIdsStr = (String) property.get("amenity_ids");
            List<String> amenityIds = amenityIdsStr != null ? 
                Arrays.asList(amenityIdsStr.split(",")) : 
                List.of();

            PropertyDocument document = PropertyDocument.builder()
                .id(id)
                .title((String) property.get("title"))
                .description((String) property.get("description"))
                .price(priceVal)
                .location((String) property.get("location"))
                .propertyType((String) property.get("property_type"))
                .area(property.get("area") != null ? ((Number) property.get("area")).doubleValue() : null)
                .bedrooms(property.get("bedrooms") != null ? ((Number) property.get("bedrooms")).intValue() : null)
                .bathrooms(property.get("bathrooms") != null ? ((Number) property.get("bathrooms")).intValue() : null)
                .locationPoint(property.get("latitude") != null && property.get("longitude") != null ? 
                    new Point(
                        ((Number) property.get("longitude")).doubleValue(),
                        ((Number) property.get("latitude")).doubleValue()
                    ) : null)
                .createdAt(((LocalDateTime) property.get("created_at")))
                .updatedAt(((LocalDateTime) property.get("updated_at")))
                .isActive((Boolean) property.get("is_active"))
                .amenityIds(amenityIds)
                .build();

            propertySearchRepository.save(document);
        }
    }
}