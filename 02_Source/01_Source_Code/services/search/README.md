# Property Search Service

## Overview
This service provides powerful search functionality for real estate properties in the application. It uses Elasticsearch to enable fast text search, filtering, and geospatial queries.

## Features
- Full-text search across property titles and descriptions
- Filtering by price range (price per night)
- Location-based filtering
- Property type filtering
- Amenities filtering
- Geospatial search with radius filtering

## Initilizing ES server
cd \Team_02> 
docker-compose up -d

## Initilize app 
mvn clean install
mvn spring-boot:run

GET http://localhost:9200/properties/_search?pretty
for check in up data whether it was synced from pg ?

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
- `amenityNames` (optional): Comma-separated list of amenity names to filter by
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

# Property type filter
GET http://localhost:8082/api/properties/search?propertyType=apartment&page=0&size=10

# Amenities filter
GET http://localhost:8082/api/properties/search?amenityNames=Coffee,Dining&page=0&size=10

# Multiple amenities with text search
GET http://localhost:8082/api/properties/search?q=beautiful&amenityNames=Coffee,Dining,Dishes&page=0&size=10

# Price range with amenities
GET http://localhost:8082/api/properties/search?minPrice=50&maxPrice=200&amenityNames=Coffee,Dining&page=0&size=10

# Location with amenities and radius
GET http://localhost:8082/api/properties/search?location=Hanoi&amenityNames=Coffee,Dining&radiusKm=5&page=0&size=10

# Full combined search
GET http://localhost:8082/api/properties/search?q=beautiful&minPrice=50&maxPrice=200&location=Hanoi&propertyType=apartment&amenityNames=Coffee,Dining&radiusKm=5&page=0&size=10

# Get property by ID
GET http://localhost:8082/api/properties/search/1
```

### Notes on Amenities Search:
- Amenity names are case-insensitive
- Partial matches are supported (e.g., "Coffee" will match "Coffee Maker")
- Multiple amenities can be specified using comma separation
- Properties must have ALL specified amenities to be included in results

## How It Works

### Search Process
1. The service first queries Elasticsearch to find properties matching the basic criteria (text, price, location, property type, amenities)
2. If a radius is specified, it uses Google Maps Geocoding API to convert the location string to coordinates
3. It then filters the results using the Haversine formula to include only properties within the specified radius
4. The filtered results are returned with pagination

### Geospatial Search
- The service uses Google Maps Geocoding API to convert location names to coordinates
- Properties are filtered based on their distance from the search location
- Distance calculation uses the Haversine formula which accounts for Earth's curvature

### Amenities Search
- Amenities are stored as nested objects in Elasticsearch
- Each amenity has id, name, description, and imageUrl
- Search is performed on the amenity names using case-insensitive partial matching

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

## Data Synchronization (per 5 min)
The service includes a `DataSyncService` that can synchronize property data from the main database to Elasticsearch. This ensures the search index stays up-to-date with the latest property information. 