package com.property.search.controller;

import com.property.search.dto.PropertySearchResult;
import com.property.search.model.PropertyDocument;
import com.property.search.service.PropertySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties/search")
public class PropertySearchController {

    @Autowired
    private PropertySearchService propertySearchService;

    @GetMapping
    public ResponseEntity<Page<PropertyDocument>> searchProperties(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(value = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "propertyType", required = false) String propertyType,
            @RequestParam(value = "amenityNames", required = false) List<String> amenityNames,
            @RequestParam(value = "radiusKm", required = false) Double radiusKm,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        // Create pageable object
        PageRequest pageable = PageRequest.of(page, size);

        // Call service to search
        Page<PropertyDocument> results = propertySearchService.searchProperties(
                q, minPrice, maxPrice, location, propertyType, amenityNames, radiusKm, pageable);
        System.out.println("q: " + q);
        System.out.println("minPrice: " + minPrice);
        System.out.println("maxPrice: " + maxPrice);
        System.out.println("location: " + location);
        System.out.println("propertyType: " + propertyType);
        System.out.println("amenityNames: " + amenityNames);
        System.out.println("radiusKm: " + radiusKm);
        System.out.println("Results: " + results.getContent());

        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDocument> getPropertyById(@PathVariable String id) {
        return propertySearchService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 