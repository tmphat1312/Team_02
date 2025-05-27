package com.property.search.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyImage {
    private String id;
    private String imageUrl;
    private String createdAt;
    private String updatedAt;
} 