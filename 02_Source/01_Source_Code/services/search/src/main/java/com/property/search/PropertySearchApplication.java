package com.property.search;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.Executor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
@EnableScheduling
public class PropertySearchApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertySearchApplication.class, args);
    }

    @Bean
    public boolean configureElasticsearch(ElasticsearchOperations elasticsearchOperations) throws IOException {
        IndexOperations indexOperations = elasticsearchOperations.indexOps(IndexCoordinates.of("properties"));
        
        if (!indexOperations.exists()) {
            ClassPathResource resource = new ClassPathResource("elasticsearch-config.json");
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> settings = mapper.readValue(resource.getInputStream(), Map.class);
            indexOperations.create(settings);
        }
        
        return true;
    }

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}