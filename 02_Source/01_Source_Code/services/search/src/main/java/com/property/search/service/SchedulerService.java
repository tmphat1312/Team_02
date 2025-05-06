package com.property.search.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class SchedulerService {
    
    private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);

    @Autowired
    private DataSyncService dataSyncService;

    @Async
    @Scheduled(fixedRate = 300000) // 5 minutes in milliseconds
    public void scheduledSync() {
        try {
            logger.info("Starting scheduled property synchronization...");
            dataSyncService.syncProperties();
            logger.info("Scheduled property synchronization completed successfully");
        } catch (Exception e) {
            logger.error("Error during scheduled property synchronization: {}", e.getMessage(), e);
        }
    }
}