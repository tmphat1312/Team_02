package com.property.search.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "amenities")
@AllArgsConstructor
@NoArgsConstructor
public class Amenity {
    @Id
    private Long id;
    private String name;
    private String description;
    @Column(name = "imageUrl")
    private String imageUrl;
}
