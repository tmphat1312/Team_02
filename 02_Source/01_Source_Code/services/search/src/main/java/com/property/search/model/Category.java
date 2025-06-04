package com.property.search.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@RequiredArgsConstructor
public class Category extends CatalogItem {
}
