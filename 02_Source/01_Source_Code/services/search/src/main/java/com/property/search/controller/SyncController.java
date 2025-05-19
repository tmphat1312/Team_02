package com.property.search.controller;

import com.property.search.service.DataSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sync")
public class SyncController {

    @Autowired
    private DataSyncService dataSyncService;

    @PostMapping("/properties")
    public ResponseEntity<String> syncProperties() {
        try {
            dataSyncService.syncProperties();
            return ResponseEntity.ok("Properties synchronized successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error synchronizing properties: " + e.getMessage());
        }
    }
} 