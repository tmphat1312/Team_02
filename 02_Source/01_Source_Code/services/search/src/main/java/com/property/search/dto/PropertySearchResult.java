package com.property.search.dto;

import com.property.search.model.PropertyDocument;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertySearchResult {
    private PropertyDocument property;
    private double distance; // Distance in kilometers
} 