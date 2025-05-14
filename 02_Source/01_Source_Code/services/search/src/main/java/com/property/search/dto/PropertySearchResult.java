package com.property.search.dto;

import com.property.search.model.PropertyDocument;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertySearchResult {
    private PropertyDocument property;
    private Double distance; // Distance in kilometers
    
    public static PropertySearchResultBuilder builder() {
        return new PropertySearchResultBuilder();
    }
    
    public static class PropertySearchResultBuilder {
        private PropertyDocument property;
        private Double distance;
        
        public PropertySearchResultBuilder property(PropertyDocument property) {
            this.property = property;
            return this;
        }
        
        public PropertySearchResultBuilder distance(Double distance) {
            this.distance = distance;
            return this;
        }
        
        public PropertySearchResult build() {
            return new PropertySearchResult(property, distance);
        }
    }
} 