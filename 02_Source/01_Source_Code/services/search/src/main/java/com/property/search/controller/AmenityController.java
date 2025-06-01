package com.property.search.controller;

import com.property.search.model.Amenity;
import com.property.search.service.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
public class AmenityController {
    private final AmenityService amenityService;
    @GetMapping
    public Page<Amenity> getAllAmenities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,asc") String[] sort) {
        // Build Pageable object manually
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort[0]).ascending());
        if (sort[1].equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sort[0]).descending());
        }

        return amenityService.getAllAmenities(pageable);
    }
}
