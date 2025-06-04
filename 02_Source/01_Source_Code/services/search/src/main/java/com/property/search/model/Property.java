package com.property.search.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "properties")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    private Long id;

    private String title;

    private String description;

   

    private String location;

    @Column(name = "property_type")
    private String propertyType;

    private Double area;

    private Integer bedrooms;

    private Integer bathrooms;

    private Double latitude;

    private Double longitude;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_active")
    private Boolean isActive;

    @ElementCollection
    @CollectionTable(
        name = "property_amenities", 
        joinColumns = @JoinColumn(name = "propertyId")
    )
    @Column(name = "amenityId")
    private List<String> amenityIds;
}