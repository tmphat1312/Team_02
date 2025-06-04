package com.property.search.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class CatalogItem {
    @Id
    private Long id;
    private String name;
    private String description;
    @Column(name = "imageUrl")
    private String imageUrl;
}
