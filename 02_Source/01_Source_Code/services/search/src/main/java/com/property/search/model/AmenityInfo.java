package com.property.search.model;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityInfo {
    @Field(type = FieldType.Keyword)
    public String id;

    @Field(type = FieldType.Text)
    public String name;

    @Field(type = FieldType.Text)
    public String description;

    @Field(type = FieldType.Keyword)
    public String imageUrl;
} 