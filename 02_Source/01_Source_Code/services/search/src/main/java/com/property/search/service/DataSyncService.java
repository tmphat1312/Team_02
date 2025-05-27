package com.property.search.service;

import com.property.search.model.AmenityInfo;
import com.property.search.model.PropertyDocument;
import com.property.search.model.PropertyImage;
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
        String sql = "WITH property_images_agg AS (" +
                    "  SELECT \"propertyId\", " +
                    "         STRING_AGG(\"imageUrl\", '||') as image_urls " +
                    "  FROM property_images " +
                    "  GROUP BY \"propertyId\"" +
                    ") " +
                    "SELECT p.*, " +
                    "       STRING_AGG(DISTINCT CONCAT(pa.\"amenityId\"::text, ':', a.name, ':', a.description, ':', a.\"imageUrl\"), '||') as amenity_data, " +
                    "       pia.image_urls " +
                    "FROM properties p " +
                    "LEFT JOIN \"property_amenities\" pa ON p.id = pa.\"propertyId\" " +
                    "LEFT JOIN amenities a ON pa.\"amenityId\" = a.id " +
                    "LEFT JOIN property_images_agg pia ON p.id = pia.\"propertyId\" " +
                    "GROUP BY p.id, pia.image_urls";

        List<Map<String, Object>> properties = jdbcTemplate.queryForList(sql);
        logger.info("Found {} properties to sync", properties.size());

        for (Map<String, Object> property : properties) {
            logger.info("Raw property data from PG: {}", property);
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
                
                if (priceObj != null) {
                    try {
                        if (priceObj instanceof Number) {
                            price = new BigDecimal(priceObj.toString());
                        } else if (priceObj instanceof String) {
                            price = new BigDecimal((String) priceObj);
                        }
                    } catch (NumberFormatException e) {
                        logger.warn("Invalid pricePerNight value for property {}: {}", id, priceObj);
                    }
                }

                // Handle amenities
                List<AmenityInfo> amenities = new ArrayList<>();
                String amenityDataStr = (String) property.get("amenity_data");
                
                if (amenityDataStr != null && !amenityDataStr.isEmpty()) {
                    String[] amenityDataArray = amenityDataStr.split("\\|\\|");
                    for (String amenityData : amenityDataArray) {
                        String[] parts = amenityData.split(":", 4);
                        if (parts.length == 4) {
                            AmenityInfo amenity = new AmenityInfo();
                            amenity.id = parts[0];
                            amenity.name = parts[1];
                            amenity.description = parts[2];
                            amenity.imageUrl = parts[3];
                            amenities.add(amenity);
                        }
                    }
                }

                // Handle property images
                List<PropertyImage> propertyImages = new ArrayList<>();
                String imageUrlsStr = (String) property.get("image_urls");
                logger.info("Raw image URLs for property {}: {}", id, imageUrlsStr);
                
                if (imageUrlsStr != null && !imageUrlsStr.isEmpty()) {
                    String[] imageUrls = imageUrlsStr.split("\\|\\|");
                    for (String imageUrl : imageUrls) {
                        PropertyImage propertyImage = new PropertyImage();
                        propertyImage.setImageUrl(imageUrl);
                        propertyImages.add(propertyImage);
                        logger.info("Added property image URL: {}", imageUrl);
                    }
                } else {
                    logger.warn("No image URLs found for property {}", id);
                }

                // Handle location point
                GeoPoint locationPoint = null;
                Object latObj = property.get("latitude");
                Object lonObj = property.get("longitude");
                if (latObj != null && lonObj != null) {
                    try {
                        double lat = ((Number) latObj).doubleValue();
                        double lon = ((Number) lonObj).doubleValue();
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
                document.setPropertyImages(propertyImages);

                // Save to Elasticsearch
                propertySearchRepository.save(document);
                logger.info("Successfully synced property: {} with {} images", id, propertyImages.size());
            } catch (Exception e) {
                logger.error("Error syncing property: {}", e.getMessage(), e);
            }
        }
    }
}