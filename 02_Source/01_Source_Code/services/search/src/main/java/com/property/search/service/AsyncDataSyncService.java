package com.property.search.service;

import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncDataSyncService {
    private final PropertySearchRepository propertySearchRepository;

    @Async
    public void syncProperties(List<PropertyDocument> properties) {
        try {
            log.info("Starting sync of {} properties", properties.size());
            
            // Transform and validate properties
            List<PropertyDocument> validProperties = properties.stream()
                .map(this::transformAndValidateProperty)
                .filter(property -> property != null)
                .collect(Collectors.toList());

            if (validProperties.isEmpty()) {
                log.warn("No valid properties to sync");
                return;
            }

            // Save to Elasticsearch

            System.err.println("validProperties result: " + validProperties);
            propertySearchRepository.saveAll(validProperties);
            log.info("Successfully synced {} properties", validProperties.size());
        } catch (Exception e) {
            log.error("Error syncing properties: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to sync properties", e);
        }
    }

    private PropertyDocument transformAndValidateProperty(PropertyDocument property) {
        try {
            // Validate required fields
            if (property.getTitle() == null || property.getTitle().trim().isEmpty()) {
                log.warn("Property {} skipped: missing title", property.getId());
                return null;
            }

            if (property.getDescription() == null || property.getDescription().trim().isEmpty()) {
                log.warn("Property {} skipped: missing description", property.getId());
                return null;
            }

            if (property.getLocation() == null || property.getLocation().trim().isEmpty()) {
                log.warn("Property {} skipped: missing location", property.getId());
                return null;
            }

            // Validate and transform location point
            if (property.getLocationPoint() != null) {
                double lat = property.getLocationPoint().getLat();
                double lon = property.getLocationPoint().getLon();
                if (isValidLatitude(lat) && isValidLongitude(lon)) {
                    property.setLocationPoint(new GeoPoint(lat, lon));
                } else {
                    log.warn("Property {} skipped: invalid coordinates", property.getId());
                    return null;
                }
            }

            // Set default values for numeric fields if null
            if (property.getArea() == null) property.setArea(0.0);
            if (property.getBedrooms() == null) property.setBedrooms(0);
            if (property.getBathrooms() == null) property.setBathrooms(0);
            if (property.getBeds() == null) property.setBeds(0);
            if (property.getGuests() == null) property.setGuests(0);

            // Set default value for isActive if null
            if (property.getIsActive() == null) property.setIsActive(true);

            return property;
        } catch (Exception e) {
            log.error("Error transforming property {}: {}", property.getId(), e.getMessage());
            return null;
        }
    }

    private boolean isValidLatitude(Double latitude) {
        return latitude != null && latitude >= -90 && latitude <= 90;
    }

    private boolean isValidLongitude(Double longitude) {
        return longitude != null && longitude >= -180 && longitude <= 180;
    }
}