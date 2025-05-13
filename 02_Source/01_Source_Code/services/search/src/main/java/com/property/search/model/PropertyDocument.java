package com.property.search.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "properties")
public class PropertyDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String title;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal price;

    @Field(type = FieldType.Double)
    private BigDecimal pricePerNight;

    @Field(type = FieldType.Keyword)
    private String location;

    @GeoPointField
    private GeoPoint locationPoint;

    @Field(type = FieldType.Double)
    private Double area;

    @Field(type = FieldType.Integer)
    private Integer bedrooms;

    @Field(type = FieldType.Integer)
    private Integer bathrooms;

    @Field(type = FieldType.Integer)
    private Integer beds;

    @Field(type = FieldType.Integer)
    private Integer guests;

    @Field(type = FieldType.Keyword)
    private String hostId;

    @Field(type = FieldType.Date)
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date)
    private LocalDateTime updatedAt;

    @Field(type = FieldType.Boolean)
    private Boolean isActive;

    @Field(type = FieldType.Keyword)
    private List<String> amenityIds;

    @Field(type = FieldType.Keyword)
    private String propertyType;
}