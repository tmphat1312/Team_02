package com.property.search.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class GeocodingService {
    private static final String GOOGLE_MAPS_GEOCODING_API = "https://maps.googleapis.com/maps/api/geocode/json";
    private static final String API_KEY = "AIzaSyBKMinEVDHup5ZWXP8QYoM7xXiin8r_4SM";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public Point getCoordinates(String address) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(GOOGLE_MAPS_GEOCODING_API)
                    .queryParam("address", address)
                    .queryParam("key", API_KEY)
                    .build()
                    .toUriString();

            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            System.out.println("root gg api : " + root);

            if (root.path("status").asText().equals("OK")) {
                JsonNode location = root.path("results")
                        .get(0)
                        .path("geometry")
                        .path("location");

                double lat = location.path("lat").asDouble();
                double lng = location.path("lng").asDouble();

                return new Point(lng, lat);
            }
        } catch (Exception e) {
            // Log error and return null if geocoding fails
            return null;
        }
        return null;
    }
} 