package com.property.search.controller;

import com.property.search.model.PropertyDocument;
import com.property.search.service.PropertySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/properties/search")
@RequiredArgsConstructor
public class PropertySearchController {

    private final PropertySearchService propertySearchService;

    @GetMapping
    public ResponseEntity<Page<PropertyDocument>> searchProperties(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String propertyType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        // Tạo Pageable object với phân trang và sắp xếp
        PageRequest pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.fromString(direction), sortBy)
        );

        // Gọi service để tìm kiếm
        Page<PropertyDocument> results = propertySearchService.searchProperties(
                q, minPrice, maxPrice, location, propertyType, pageable);

        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDocument> getPropertyById(@PathVariable String id) {
        return propertySearchService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 