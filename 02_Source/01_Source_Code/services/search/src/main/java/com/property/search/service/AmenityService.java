package com.property.search.service;

import com.property.search.model.Amenity;
import com.property.search.repository.AmenityRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AmenityService {
    private final AmenityRepository amenityRepository;
    public Page<Amenity> getAllAmenities(Pageable pageable) {
        return amenityRepository.findAll(pageable);
    }
}
