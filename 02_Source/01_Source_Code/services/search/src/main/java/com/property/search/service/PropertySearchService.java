package com.property.search.service;

import com.property.search.dto.PropertySearchResult;
import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import com.property.search.util.GeoUtils;
import lombok.RequiredArgsConstructor;
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
    
    @Autowired
    private PropertySearchRepository propertySearchRepository;
    
    @Autowired
    private GeocodingService geocodingService;

    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            Double radiusKm,
            PageRequest pageRequest) {
        
        // First get all properties matching the search criteria
        Page<PropertyDocument> properties = propertySearchRepository.searchProperties(
                query, minPrice, maxPrice, location, propertyType, pageRequest);
        
        // If no radius filter, return all results
        if (radiusKm == null || location == null || location.isEmpty()) {
            return properties;
        }
        
        // Get coordinates for the location search
        Point searchPoint = geocodingService.getCoordinates(location);
        if (searchPoint == null) {
            // If geocoding fails, return unfiltered results
            System.out.println("Geocoding failed for location: " + location);
            return properties;
        }
        
        System.out.println("Search coordinates: lat=" + searchPoint.getY() + ", lon=" + searchPoint.getX());
        
        // Create GeoPoint for calculations
        GeoPoint searchLocation = new GeoPoint(searchPoint.getY(), searchPoint.getX());
        
        // Filter results by distance
        List<PropertyDocument> filteredProperties = properties.getContent().stream()
            .filter(property -> {
                // Skip properties without location data
                if (property.getLocationPoint() == null) {
                    return false;
                }
                
                GeoPoint propertyLocation = property.getLocationPoint();
                Point propertyPoint = new Point(propertyLocation.getLon(), propertyLocation.getLat());
                
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