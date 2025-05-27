"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Accommodation from "@/types/Accommodation";
import Coordinates from "@/types/Coordinates";
import { env } from "@/env";

interface MapboxMapProps {
  accommodations: Accommodation[];
  centerPoint: Coordinates;
  onChange: (lat: number, lng: number, radius: number) => void;
  setSelectedAcc: (acc: Accommodation | null) => void;
  setCenterPoint: ({ lat, lng }: Coordinates) => void;
}

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = ({
  accommodations,
  centerPoint,
  onChange,
  setSelectedAcc,
  setCenterPoint,
}: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isProgrammaticUpdate = useRef(false); // Flag to track programmatic updates

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Mapbox map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [centerPoint.lng, centerPoint.lat],
      zoom: 15,
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Handle map move events
    mapRef.current.on("moveend", () => {
      if (!mapRef.current || isProgrammaticUpdate.current) {
        isProgrammaticUpdate.current = false; // Reset the flag
        return;
      }
      const newCenter = mapRef.current.getCenter();
      const newZoom = mapRef.current.getZoom();
      setCenterPoint({ lat: newCenter.lat, lng: newCenter.lng });

      // Calculate radius based on zoom level
      const radius = calculateRadius(newZoom);
      onChange(newCenter.lat, newCenter.lng, radius);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Set the flag to indicate a programmatic update
      isProgrammaticUpdate.current = true;
      mapRef.current.flyTo({
        center: [centerPoint.lng, centerPoint.lat],
        zoom: mapRef.current.getZoom(),
      });
    }
  }, [centerPoint]);

  const markersRef = useRef<mapboxgl.Marker[]>([]);
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers from the map
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for accommodations
    accommodations.forEach((acc) => {
      const markerElement = document.createElement("div");
      markerElement.className = "mapbox-marker hover:z-9999";
      markerElement.style.backgroundColor = "#fff";
      markerElement.style.color = "#000000";
      markerElement.style.width = "60px";
      markerElement.style.height = "28px";
      markerElement.style.borderRadius = "16px";
      markerElement.style.cursor = "pointer";
      markerElement.style.zIndex = "1000";
      markerElement.style.display = "flex";
      markerElement.style.alignItems = "center";
      markerElement.style.justifyContent = "center";
      markerElement.style.fontWeight = "bold";
      markerElement.style.fontSize = "14px";
      markerElement.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";

      // Display price (adjust property name as needed)
      markerElement.textContent = acc.pricePerNight
        ? `$${acc.pricePerNight}`
        : "N/A";

      markerElement.addEventListener("click", () => setSelectedAcc(acc));

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([acc.locationPoint.lon, acc.locationPoint.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [accommodations]);

  const calculateRadius = (zoomLevel: number) => {
    const earthCircumference = 40075000; // in meters
    const mapWidth = mapContainerRef.current?.clientWidth || 0;
    return (earthCircumference * mapWidth) / Math.pow(2, zoomLevel + 9);
  };

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapboxMap;
