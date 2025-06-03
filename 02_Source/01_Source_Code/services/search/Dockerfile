# Use the official OpenJDK base image for Java 22
FROM eclipse-temurin:22-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the application's build file and dependencies
# Assumes the project is built into a JAR file (using a build tool like Maven or Gradle)
COPY target/property-search-service-1.0-SNAPSHOT.jar /app/app.jar

# Expose the port the application will run on (default for Jakarta EE: 8080)
EXPOSE 8082
# Run the application
CMD ["java", "-jar", "/app/app.jar"]