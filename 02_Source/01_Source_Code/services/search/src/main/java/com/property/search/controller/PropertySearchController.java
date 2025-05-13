package com.property.search.controller;

import com.property.search.dto.PropertySearchResult;
import com.property.search.service.PropertySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/properties/search")
@RequiredArgsConstructor
public class PropertySearchController {

    private final PropertySearchService propertySearchService;

    @GetMapping
    public ResponseEntity<Page<PropertySearchResult>> searchProperties(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(value = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "propertyType", required = false) String propertyType,
            @RequestParam(value = "radiusKm", required = false) Double radiusKm,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        // Create pageable object
        PageRequest pageable = PageRequest.of(page, size);

        // Call service to search
        Page<PropertySearchResult> results = propertySearchService.searchProperties(
                q, minPrice, maxPrice, location, propertyType, radiusKm, pageable);

        return ResponseEntity.ok(results);
    }
} 