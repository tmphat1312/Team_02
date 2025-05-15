package com.property.search.service;

import com.property.search.model.AmenityInfo;
import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import java.util.ArrayList;
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
                    "STRING_AGG(DISTINCT CONCAT(pa.\"amenityId\"::text, ':', a.name, ':', a.description, ':', a.\"imageUrl\"), '||') as amenity_data " +
                    "FROM properties p " +
                    "LEFT JOIN \"property_amenities\" pa ON p.id = pa.\"propertyId\" " +
                    "LEFT JOIN amenities a ON pa.\"amenityId\" = a.id " +
                    "GROUP BY p.id";

        List<Map<String, Object>> properties = jdbcTemplate.queryForList(sql);
        logger.info("Found {} properties to sync", properties.size());

        for (Map<String, Object> property : properties) {
            try {
                Object idObj = property.get("id");
                if (idObj == null) {
                    logger.warn("Skipping property with null id: {}", property);
                    continue;
                }
                String id = idObj.toString();
                
                // Handle price
                BigDecimal price = null;
                Object priceObj = property.get("pricePerNight");
                logger.info("Raw pricePerNight object for property {}: {}", id, priceObj);
                
                if (priceObj != null) {
                    try {
                        if (priceObj instanceof Number) {
                            price = new BigDecimal(priceObj.toString());
                        } else if (priceObj instanceof String) {
                            price = new BigDecimal((String) priceObj);
                        }
                        logger.info("Converted pricePerNight for property {}: {}", id, price);
                    } catch (NumberFormatException e) {
                        logger.warn("Invalid pricePerNight value for property {}: {}", id, priceObj);
                    }
                } else {
                    logger.warn("pricePerNight is null for property {}", id);
                }

                // Handle amenities
                List<AmenityInfo> amenities = new ArrayList<>();
                String amenityDataStr = (String) property.get("amenity_data");
                
                if (amenityDataStr != null && !amenityDataStr.isEmpty()) {
                    String[] amenityDataArray = amenityDataStr.split("\\|\\|");
                    for (String amenityData : amenityDataArray) {
                        String[] parts = amenityData.split(":", 4);
                        if (parts.length == 4) {
                            amenities.add(AmenityInfo.builder()
                                .id(parts[0])
                                .name(parts[1])
                                .description(parts[2])
                                .imageUrl(parts[3])
                                .build());
                        }
                    }
                }

                // Handle location point
                GeoPoint locationPoint = null;
                Object latObj = property.get("latitude");
                Object lonObj = property.get("longitude");
                if (latObj != null && lonObj != null) {
                    try {
                        double lat = ((Number) latObj).doubleValue();
                        double lon = ((Number) lonObj).doubleValue();
                        // Only create point if coordinates are valid
                        if (lat != 0 && lon != 0 && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                            locationPoint = new GeoPoint(lat, lon);
                        }
                    } catch (Exception e) {
                        logger.warn("Invalid coordinates for property {}: lat={}, lon={}", id, latObj, lonObj);
                    }
                }

                // Create PropertyDocument
                PropertyDocument document = new PropertyDocument();
                document.setId(id);
                document.setTitle((String) property.get("title"));
                document.setDescription((String) property.get("description"));
                document.setPricePerNight(price);
                document.setLocation((String) property.get("address"));
                if (locationPoint != null) {
                    document.setLocationPoint(locationPoint);
                }
                document.setArea(property.get("area") != null ? ((Number) property.get("area")).doubleValue() : null);
                document.setBedrooms(property.get("numberOfBedrooms") != null ? ((Number) property.get("numberOfBedrooms")).intValue() : null);
                document.setBathrooms(property.get("numberOfBathrooms") != null ? ((Number) property.get("numberOfBathrooms")).intValue() : null);
                document.setBeds(property.get("numberOfBeds") != null ? ((Number) property.get("numberOfBeds")).intValue() : null);
                document.setGuests(property.get("numberOfGuests") != null ? ((Number) property.get("numberOfGuests")).intValue() : null);
                document.setHostId((String) property.get("hostId"));
                // Convert Timestamp to String for dates
                Object createdAtObj = property.get("createdAt");
                if (createdAtObj instanceof java.sql.Timestamp) {
                    document.setCreatedAt(((java.sql.Timestamp) createdAtObj).toLocalDateTime().toString());
                }
                Object updatedAtObj = property.get("updatedAt");
                if (updatedAtObj instanceof java.sql.Timestamp) {
                    document.setUpdatedAt(((java.sql.Timestamp) updatedAtObj).toLocalDateTime().toString());
                }
                document.setIsActive((Boolean) property.get("isAvailable"));
                document.setAmenities(amenities);

                // Save to Elasticsearch
                propertySearchRepository.save(document);
                logger.info("Successfully synced property: {}", id);
            } catch (Exception e) {
                logger.error("Error syncing property: {}", e.getMessage(), e);
            }
        }
    }
}