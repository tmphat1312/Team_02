FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src/ src/

# Build the application
RUN ./mvnw package -DskipTests

# Run the application
ENTRYPOINT ["java", "-jar", "target/search-0.0.1-SNAPSHOT.jar"] 