package com.property.search.util;

import org.springframework.data.geo.Point;

public class GeoUtils {
    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Calculate the Haversine distance between two points in kilometers
     * @param point1 First point (longitude, latitude)
     * @param point2 Second point (longitude, latitude)
     * @return Distance in kilometers
     */
    public static double calculateDistance(Point point1, Point point2) {
        if (point1 == null || point2 == null) {
            return Double.MAX_VALUE;
        }

        double lat1 = Math.toRadians(point1.getY());
        double lon1 = Math.toRadians(point1.getX());
        double lat2 = Math.toRadians(point2.getY());
        double lon2 = Math.toRadians(point2.getX());

        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c;
    }
} 