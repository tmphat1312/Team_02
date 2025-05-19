package com.property.search.repository;

import com.property.search.model.PropertyDocument;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class PropertySearchRepositoryImpl implements PropertySearchRepositoryCustom {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public Page<PropertyDocument> searchProperties(
            String query,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String location,
            String propertyType,
            PageRequest pageRequest) {

        Criteria criteria = new Criteria();

        // Add text search if query is provided
        if (query != null && !query.isEmpty()) {
            criteria.or("title").boost(2.0f).contains(query)
                   .or("description").contains(query);
        }

        // Add price range filter
        if (minPrice != null || maxPrice != null) {
            Criteria priceCriteria = new Criteria("price");
            if (minPrice != null) {
                priceCriteria.greaterThanEqual(minPrice);
            }
            if (maxPrice != null) {
                priceCriteria.lessThanEqual(maxPrice);
            }
            criteria.and(priceCriteria);
        }

        // Add location filter
        if (location != null && !location.isEmpty()) {
            criteria.and("location").is(location);
        }

        // Add property type filter
        if (propertyType != null && !propertyType.isEmpty()) {
            criteria.and("propertyType").is(propertyType);
        }

        // Add active filter
        criteria.and("isActive").is(true);

        Query searchQuery = new CriteriaQuery(criteria, pageRequest);
        
        SearchHits<PropertyDocument> searchHits = elasticsearchOperations.search(searchQuery, PropertyDocument.class);
        
        List<PropertyDocument> properties = searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .collect(Collectors.toList());
        
        return new PageImpl<>(properties, pageRequest, searchHits.getTotalHits());
    }
} 