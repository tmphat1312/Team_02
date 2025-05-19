package com.property.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(indexName = "properties")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "vietnamese")
    private String title;

    @Field(type = FieldType.Text, analyzer = "vietnamese")
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal price;

    @Field(type = FieldType.Text)
    private String location;

    @Field(type = FieldType.Text)
    private String propertyType; // apartment, house, land, etc.

    @Field(type = FieldType.Double)
    private Double area;

    @Field(type = FieldType.Integer)
    private Integer bedrooms;

    @Field(type = FieldType.Integer)
    private Integer bathrooms;

    @Field(type = FieldType.Date)
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date)
    private LocalDateTime updatedAt;

    @Field(type = FieldType.Boolean)
    private Boolean isActive;
} 