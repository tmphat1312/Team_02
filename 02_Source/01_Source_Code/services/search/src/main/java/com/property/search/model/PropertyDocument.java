package com.property.search.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.geo.Point;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(indexName = "properties")
@Setting(
    settingPath = "elasticsearch-config.json",
    shards = 1,
    replicas = 0
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String title;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal price;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String location;

    @Field(type = FieldType.Text)
    private String propertyType;

    @Field(type = FieldType.Double)
    private Double area;

    @Field(type = FieldType.Integer)
    private Integer bedrooms;

    @Field(type = FieldType.Integer)
    private Integer bathrooms;

    @GeoPointField
    private Point locationPoint;

    @Field(type = FieldType.Date)
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date)
    private LocalDateTime updatedAt;

    @Field(type = FieldType.Boolean)
    private Boolean isActive;

    @Field(type = FieldType.Keyword)
    private List<String> amenityIds;
}