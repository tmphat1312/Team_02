package com.property.search.service;

import com.property.search.dto.PropertySearchResult;
import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import com.property.search.util.GeoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertySearchService {
    private final PropertySearchRepository propertySearchRepository;
    private final GeocodingService geocodingService;

    public Page<PropertySearchResult> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            Double radiusKm,
            PageRequest pageRequest) {
        
        // Get coordinates from location if provided
        final GeoPoint searchLocation;
        if (location != null && !location.isEmpty()) {
            Point point = geocodingService.getCoordinates(location);
            if (point != null) {
                searchLocation = new GeoPoint(point.getY(), point.getX());
            } else {
                searchLocation = null;
            }
        } else {
            searchLocation = null;
        }

        // First get all properties matching the search criteria
        Page<PropertyDocument> properties = propertySearchRepository.searchProperties(
                query, minPrice, maxPrice, location, propertyType, pageRequest);

        // If no search location or geocoding failed, return results without distance
        if (searchLocation == null || radiusKm == null) {
            List<PropertySearchResult> results = properties.getContent().stream()
                .map(property -> PropertySearchResult.builder()
                    .property(property)
                    .distance(0.0)
                    .build())
                .collect(Collectors.toList());
            return new PageImpl<>(results, pageRequest, properties.getTotalElements());
        }

        // Calculate distances and filter by radius
        final double finalRadiusKm = radiusKm;
        List<PropertySearchResult> results = properties.getContent().stream()
            .filter(property -> property.getLocationPoint() != null)
            .map(property -> {
                Point propertyPoint = new Point(
                    property.getLocationPoint().getLon(),
                    property.getLocationPoint().getLat()
                );
                Point searchPoint = new Point(
                    searchLocation.getLon(),
                    searchLocation.getLat()
                );
                double distance = GeoUtils.calculateDistance(searchPoint, propertyPoint);
                return PropertySearchResult.builder()
                    .property(property)
                    .distance(distance)
                    .build();
            })
            .filter(result -> result.getDistance() <= finalRadiusKm)
            .collect(Collectors.toList());

        return new PageImpl<>(results, pageRequest, results.size());
    }

    public Optional<PropertyDocument> findById(String id) {
        return propertySearchRepository.findById(id);
    }
}