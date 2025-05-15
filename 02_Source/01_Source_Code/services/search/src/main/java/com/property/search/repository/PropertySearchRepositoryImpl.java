package com.property.search.repository;

import com.property.search.model.PropertyDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class PropertySearchRepositoryImpl implements PropertySearchRepositoryCustom {

    private final ElasticsearchOperations elasticsearchOperations;

    @Autowired
    public PropertySearchRepositoryImpl(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    @Override
    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            List<String> amenityNames,
            PageRequest pageRequest) {

        Criteria criteria = new Criteria();

        // Add text search if query is provided
        if (query != null && !query.isEmpty()) {
            criteria.or("title").boost(2.0f).contains(query)
                   .or("description").contains(query);
        }

        // Add price range filter using pricePerNight
        if (minPrice != null) {
            criteria.and("pricePerNight").greaterThanEqual(minPrice);
        }
        if (maxPrice != null) {
            criteria.and("pricePerNight").lessThanEqual(maxPrice);
        }

        // Add location filter
        if (location != null && !location.isEmpty()) {
            criteria.and("location").contains(location);
        }

        // Add property type filter
        if (propertyType != null && !propertyType.isEmpty()) {
            criteria.and("propertyType").is(propertyType);
        }

        // Add amenities filter by name
        if (amenityNames != null && !amenityNames.isEmpty()) {
            Criteria amenitiesCriteria = new Criteria("amenities.name");
            for (String amenityName : amenityNames) {
                amenitiesCriteria.or("amenities.name").contains(amenityName.toLowerCase());
            }
            criteria.and(amenitiesCriteria);
        }

        // Add active filter
        criteria.and("isActive").is(true);

        Query searchQuery = new CriteriaQuery(criteria, pageRequest);
        
        System.out.println("Executing Elasticsearch query: " + searchQuery);
        
        SearchHits<PropertyDocument> searchHits = elasticsearchOperations.search(searchQuery, PropertyDocument.class);
        
        System.out.println("Found " + searchHits.getTotalHits() + " results");
        
        List<PropertyDocument> properties = searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .collect(Collectors.toList());
        
        return new PageImpl<>(properties, pageRequest, searchHits.getTotalHits());
    }
} 