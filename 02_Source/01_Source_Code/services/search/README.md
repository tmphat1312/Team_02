# Property Search Service

## Overview
This service provides powerful search functionality for real estate properties in the application. It uses Elasticsearch to enable fast text search, filtering, and geospatial queries.

## Features
- Full-text search across property titles and descriptions
- Filtering by price range (price per night)
- Location-based filtering
- Property type filtering
- Geospatial search with radius filtering

## API Endpoints

### Search Properties
```
GET /api/properties/search
```

**Parameters:**
- `q` (optional): Search query for matching title and description
- `minPrice` (optional): Minimum price per night
- `maxPrice` (optional): Maximum price per night
- `location` (optional): Location to search for
- `propertyType` (optional): Type of property
- `radiusKm` (optional): Search radius in kilometers from the specified location
- `page` (default: 0): Page number for pagination
- `size` (default: 10): Page size for pagination

**Example Requests:**
```
# Basic text search
GET http://localhost:8082/api/properties/search?q=lake&page=0&size=10

# Price range filter
GET http://localhost:8082/api/properties/search?minPrice=100&maxPrice=500&page=0&size=10

# Location search
GET http://localhost:8082/api/properties/search?location=Germany&page=0&size=10

# Location search with radius
GET http://localhost:8082/api/properties/search?location=Germany&radiusKm=50&page=0&size=10

# Combined search
GET http://localhost:8082/api/properties/search?q=lake&minPrice=100&maxPrice=500&location=Germany&radiusKm=500&page=0&size=10
```

## How It Works

### Search Process
1. The service first queries Elasticsearch to find properties matching the basic criteria (text, price, location, property type)
2. If a radius is specified, it uses Google Maps Geocoding API to convert the location string to coordinates
3. It then filters the results using the Haversine formula to include only properties within the specified radius
4. The filtered results are returned with pagination

### Geospatial Search
- The service uses Google Maps Geocoding API to convert location names to coordinates
- Properties are filtered based on their distance from the search location
- Distance calculation uses the Haversine formula which accounts for Earth's curvature

## Technologies Used
- Spring Boot
- Spring Data Elasticsearch
- Google Maps Geocoding API
- Haversine formula for distance calculation

## Configuration
- Elasticsearch connection settings in `application.properties`
- Google Maps API key in `GeocodingService`

## Setup and Deployment
1. Ensure Elasticsearch is running and accessible
2. Configure the application properties for Elasticsearch connection
3. Build the service: `mvn clean package`
4. Run the service: `java -jar target/property-search-service.jar`

## Data Synchronization
The service includes a `DataSyncService` that can synchronize property data from the main database to Elasticsearch. This ensures the search index stays up-to-date with the latest property information. 