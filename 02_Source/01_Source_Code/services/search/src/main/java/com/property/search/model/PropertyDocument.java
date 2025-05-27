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

    @Field(type = FieldType.Keyword)
    private String createdAt;

    @Field(type = FieldType.Keyword)
    private String updatedAt;

    @Field(type = FieldType.Boolean)
    private Boolean isActive;

    @Field(type = FieldType.Nested)
    private List<AmenityInfo> amenities;

    @Field(type = FieldType.Nested)
    private List<PropertyImage> propertyImages;

    @Field(type = FieldType.Keyword)
    private String propertyType;

    // Getters and setters
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setLocationPoint(GeoPoint locationPoint) {
        this.locationPoint = locationPoint;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public void setBeds(Integer beds) {
        this.beds = beds;
    }

    public void setGuests(Integer guests) {
        this.guests = guests;
    }

    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public void setAmenities(List<AmenityInfo> amenities) {
        this.amenities = amenities;
    }

    public void setPropertyImages(List<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public GeoPoint getLocationPoint() {
        return this.locationPoint;
    }

    public String getTitle() {
        return this.title;
    }

    public String getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public String getLocation() {
        return this.location;
    }

    public Integer getGuests() {
        return this.guests;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public List<PropertyImage> getPropertyImages() {
        return this.propertyImages;
    }
}