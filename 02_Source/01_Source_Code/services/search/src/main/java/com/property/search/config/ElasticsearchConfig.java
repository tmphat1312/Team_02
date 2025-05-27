package com.property.search.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.retry.annotation.Retryable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.property.search.repository")
@EnableRetry
public class ElasticsearchConfig extends ElasticsearchConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(ElasticsearchConfig.class);

    @Value("${spring.elasticsearch.uris}")
    private String elasticsearchUrl;

    @Value("${spring.elasticsearch.username}")
    private String username;

    @Value("${spring.elasticsearch.password}")
    private String password;

    @Override
    @Retryable(maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public ClientConfiguration clientConfiguration() {
        logger.info("Attempting to connect to Elasticsearch at {}", elasticsearchUrl);
        return ClientConfiguration.builder()
                .connectedTo(elasticsearchUrl.replace("https://", ""))
                .usingSsl()
                .withBasicAuth(username, password)
                .withSocketTimeout(5000)
                .withConnectTimeout(5000)
                .build();
    }
}