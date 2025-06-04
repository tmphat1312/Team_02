package com.property.search.service;

import com.property.search.dto.PropertySearchResult;
import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import com.property.search.util.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertySearchService {
    
    private final PropertySearchRepository propertySearchRepository;
    private final GeocodingService geocodingService;

    @Autowired
    public PropertySearchService(PropertySearchRepository propertySearchRepository, GeocodingService geocodingService) {
        this.propertySearchRepository = propertySearchRepository;
        this.geocodingService = geocodingService;
    }

    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Double longitude,
            Double latitude,
            String propertyType,
            List<String> amenityNames,
            Double radiusKm,
            PageRequest pageRequest) {
        
        Page<PropertyDocument> properties = propertySearchRepository.searchProperties(
                query, minPrice, maxPrice, longitude, latitude, propertyType, amenityNames, pageRequest);
        
        if (radiusKm == null || longitude == null || latitude == null) {
            return properties;
        }
        
        // Create GeoPoint for calculations
        GeoPoint searchLocation = new GeoPoint(latitude, longitude);
        
        // Filter results by distance
        List<PropertyDocument> filteredProperties = properties.getContent().stream()
            .filter(property -> {
                // Skip properties without location data
                if (property.getLocationPoint() == null) {
                    return false;
                }
                
                GeoPoint propertyLocation = property.getLocationPoint();
                Point propertyPoint = new Point(propertyLocation.getLon(), propertyLocation.getLat());
                Point searchPoint = new Point(longitude, latitude);
                
                // Calculate distance using Haversine formula
                double distance = GeoUtils.calculateDistance(searchPoint, propertyPoint);
                System.out.println("Property: " + property.getTitle() + ", Distance: " + distance + "km");
                
                // Include if within radius
                return distance <= radiusKm;
            })
            .collect(Collectors.toList());
        
        // Create new page with filtered results
        return new PageImpl<>(filteredProperties, pageRequest, filteredProperties.size());
    }

    public Optional<PropertyDocument> findById(String id) {
        return propertySearchRepository.findById(id);
    }
}