package com.property.search.service;

import com.property.search.model.PropertyDocument;
import com.property.search.repository.PropertySearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.retry.annotation.Recover;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Timer;
import org.springframework.data.geo.Point;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.math.BigDecimal;
import java.util.Arrays;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Service
@EnableAsync
public class AsyncDataSyncService {
    private static final Logger logger = LoggerFactory.getLogger(AsyncDataSyncService.class);
    private static final int BATCH_SIZE = 100;
    private static final int MAX_RETRIES = 3;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PropertySearchRepository propertySearchRepository;

    @Autowired
    private MeterRegistry meterRegistry;

    private final Counter syncSuccessCounter;
    private final Counter syncFailureCounter;
    private final Timer syncTimer;
    private final AtomicInteger activeSyncCount;
    private final AtomicLong lastSyncTimestamp;

    public AsyncDataSyncService(MeterRegistry meterRegistry) {
        this.syncSuccessCounter = Counter.builder("es.sync.success")
            .description("Number of successful syncs")
            .register(meterRegistry);
        this.syncFailureCounter = Counter.builder("es.sync.failure")
            .description("Number of failed syncs")
            .register(meterRegistry);
        this.syncTimer = Timer.builder("es.sync.duration")
            .description("Time taken for sync operations")
            .register(meterRegistry);
        this.activeSyncCount = new AtomicInteger(0);
        this.lastSyncTimestamp = new AtomicLong(0);
    }

    @Bean(name = "syncThreadPool")
    public ThreadPoolTaskExecutor syncThreadPool() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // For 4 core CPU, optimal thread count would be 4 * 2 = 8 threads
        executor.setCorePoolSize(8);
        executor.setMaxPoolSize(16);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("sync-thread-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Scheduled(fixedRate = 300000) // Run every 5 minutes
    public void scheduleSync() {
        if (activeSyncCount.get() > 0) {
            logger.warn("Previous sync is still running. Skipping this sync cycle.");
            return;
        }
        syncData();
    }

    @Async("syncThreadPool")
    public void syncData() {
        activeSyncCount.incrementAndGet();
        long startTime = System.currentTimeMillis();

        try {
            // First, let's check and create missing columns if needed
            jdbcTemplate.execute("""
                DO $$ 
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                WHERE table_name = 'properties' AND column_name = 'bathrooms') THEN
                        ALTER TABLE properties ADD COLUMN bathrooms INTEGER;
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                WHERE table_name = 'properties' AND column_name = 'bedrooms') THEN
                        ALTER TABLE properties ADD COLUMN bedrooms INTEGER;
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                WHERE table_name = 'properties' AND column_name = 'area') THEN
                        ALTER TABLE properties ADD COLUMN area DOUBLE PRECISION;
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                WHERE table_name = 'properties' AND column_name = 'latitude') THEN
                        ALTER TABLE properties ADD COLUMN latitude DOUBLE PRECISION;
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                WHERE table_name = 'properties' AND column_name = 'longitude') THEN
                        ALTER TABLE properties ADD COLUMN longitude DOUBLE PRECISION;
                    END IF;
                END $$;
            """);

            String sql = """
                SELECT p.id, p.title, p.description, p.price, p.location,
                       p.property_type, p.area, p.bedrooms, p.bathrooms,
                       p.latitude, p.longitude, p.created_at, p.updated_at, p.is_active,
                       array_agg(pa.amenity_id) as amenity_ids
                FROM properties p
                LEFT JOIN property_amenities pa ON p.id = pa.property_id
                GROUP BY p.id, p.title, p.description, p.price, p.location,
                         p.property_type, p.area, p.bedrooms, p.bathrooms,
                         p.latitude, p.longitude, p.created_at, p.updated_at,
                         p.is_active
            """;

            List<Map<String, Object>> properties = jdbcTemplate.queryForList(sql);

            // Process in batches
            for (int i = 0; i < properties.size(); i += BATCH_SIZE) {
                int end = Math.min(i + BATCH_SIZE, properties.size());
                List<Map<String, Object>> batch = properties.subList(i, end);
                
                CompletableFuture.runAsync(() -> processBatch(batch), syncThreadPool())
                    .exceptionally(throwable -> {
                        logger.error("Error processing batch: {}", throwable.getMessage());
                        syncFailureCounter.increment();
                        return null;
                    });
            }

            lastSyncTimestamp.set(System.currentTimeMillis());
            syncSuccessCounter.increment();
            
        } catch (Exception e) {
            logger.error("Error during sync: {}", e.getMessage());
            syncFailureCounter.increment();
        } finally {
            activeSyncCount.decrementAndGet();
            syncTimer.record(System.currentTimeMillis() - startTime, TimeUnit.MILLISECONDS);
        }
    }

    @Retryable(
        value = { Exception.class },
        maxAttempts = MAX_RETRIES,
        backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    private void processBatch(List<Map<String, Object>> batch) {
        for (Map<String, Object> property : batch) {
            try {
                PropertyDocument document = convertToDocument(property);
                if (document != null) {
                    propertySearchRepository.save(document);
                }
            } catch (Exception e) {
                logger.error("Error processing property {}: {}", property.get("id"), e.getMessage());
                throw e;
            }
        }
    }

    @Recover
    private void recover(Exception e, List<Map<String, Object>> batch) {
        logger.error("Failed to process batch after {} retries: {}", MAX_RETRIES, e.getMessage());
        // Here you could implement additional recovery logic like:
        // - Save failed records to a dead letter queue
        // - Notify administrators
        // - Log to a separate error tracking system
    }

    private PropertyDocument convertToDocument(Map<String, Object> property) {
        try {
            Object idObj = property.get("id");
            if (idObj == null) {
                logger.warn("Skipping property with null id");
                return null;
            }

            String id = idObj.toString();
            BigDecimal priceVal = null;
            Object priceObj = property.get("price");
            if (priceObj != null) {
                priceVal = new BigDecimal(priceObj.toString());
            }

            // Handle amenity IDs
            List<String> amenityIds = List.of();
            String amenityIdsStr = (String) property.get("amenity_ids");
            if (amenityIdsStr != null && !amenityIdsStr.isEmpty()) {
                amenityIds = Arrays.stream(amenityIdsStr.split(","))
                    .filter(s -> !s.isEmpty())
                    .toList();
            }

            // Handle location point
            Point locationPoint = null;
            Object latObj = property.get("latitude");
            Object lonObj = property.get("longitude");
            if (latObj != null && lonObj != null) {
                try {
                    double lat = ((Number) latObj).doubleValue();
                    double lon = ((Number) lonObj).doubleValue();
                    // Only create point if coordinates are valid
                    if (lat != 0 && lon != 0 && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                        // Elasticsearch expects [lon, lat] format
                        locationPoint = new Point(lon, lat);
                    }
                } catch (Exception e) {
                    logger.warn("Invalid coordinates for property {}: lat={}, lon={}", id, latObj, lonObj);
                }
            }

            return PropertyDocument.builder()
                .id(id)
                .title((String) property.get("title"))
                .description((String) property.get("description"))
                .price(priceVal)
                .location((String) property.get("location"))
                .propertyType((String) property.get("property_type"))
                .area(property.get("area") != null ? ((Number) property.get("area")).doubleValue() : null)
                .bedrooms(property.get("bedrooms") != null ? ((Number) property.get("bedrooms")).intValue() : null)
                .bathrooms(property.get("bathrooms") != null ? ((Number) property.get("bathrooms")).intValue() : null)
                .locationPoint(locationPoint)
                .createdAt(((LocalDateTime) property.get("created_at")))
                .updatedAt(((LocalDateTime) property.get("updated_at")))
                .isActive((Boolean) property.get("is_active"))
                .amenityIds(amenityIds)
                .build();
        } catch (Exception e) {
            logger.error("Error converting property to document: {}", e.getMessage());
            return null;
        }
    }

    // Methods to check sync status
    public boolean isSyncInProgress() {
        return activeSyncCount.get() > 0;
    }

    public long getLastSyncTimestamp() {
        return lastSyncTimestamp.get();
    }

    public Map<String, Object> getSyncMetrics() {
        return Map.of(
            "activeSyncCount", activeSyncCount.get(),
            "lastSyncTimestamp", lastSyncTimestamp.get(),
            "successCount", syncSuccessCounter.count(),
            "failureCount", syncFailureCounter.count(),
            "averageSyncDuration", syncTimer.mean(TimeUnit.MILLISECONDS)
        );
    }
}