"use client";

import { parseAsFloat, parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";

import { env } from "@/env";
import { useRooms } from "@/features/listing/hooks/use-rooms";
import { getGeocoding } from "@/features/map/data/get-geocoding";
import { mapboxgl } from "@/lib/mapbox";
import { cn, formatPrice } from "@/lib/utils";

export function Map() {
  const [lat, setLat] = useQueryState("lat", parseAsFloat);
  const [lng, setLng] = useQueryState("lng", parseAsFloat);
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);

  const [zoom, setZoom] = useState(10);

  const { isEmpty, isLoadingMore, properties } = useRooms();

  const changeMarkerPosition = (
    coordinates: [number, number],
    address: string
  ) => {
    if (!markerRef.current) return;
    markerRef.current.setLngLat(coordinates);
    markerRef.current.setPopup(new mapboxgl.Popup().setHTML(address));
    markerRef.current.togglePopup();
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!lat || !lng) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
      center: [lng, lat],
      zoom: zoom,
    });

    const geolocate = new mapboxgl.GeolocateControl();
    geolocate.on("geolocate", async (e) => {
      if (!mapRef.current) return;

      const coordinates = [e.coords.longitude, e.coords.latitude];
      const geo = await getGeocoding(coordinates[0], coordinates[1]);
      changeMarkerPosition(
        [coordinates[0], coordinates[1]],
        geo.properties.full_address
      );
      mapRef.current.flyTo({
        center: [e.coords.longitude, e.coords.latitude],
        essential: true,
      });
      setLng(e.coords.longitude);
      setLat(e.coords.latitude);
      setSearch(null);
    });

    mapRef.current.addControl(geolocate, "top-right");
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    mapRef.current.on("load", () => {
      mapRef.current?.resize();
    });

    mapRef.current.on("click", async (e) => {
      const coordinates = e.lngLat;
      const geo = await getGeocoding(coordinates.lng, coordinates.lat);
      if (!geo) return;
      changeMarkerPosition(
        [coordinates.lng, coordinates.lat],
        geo.properties.full_address
      );
      setLng(coordinates.lng);
      setLat(coordinates.lat);
      setSearch(null);
    });

    // on zoom change, update the zoom level in the URL
    mapRef.current.on("zoom", () => {
      const currentZoom = mapRef.current?.getZoom();
      setZoom(currentZoom || zoom);
    });

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      markerRef.current?.remove();

      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!mapRef.current || isEmpty || isLoadingMore) return;

    const markers = properties.map((property) => {
      const address = property.address;
      const price = property.pricePerNight;

      const popupContent = `
      <div>
      <div><strong>${address}</strong></div>
      <div>Price: ${formatPrice(price)}</div>
      </div>
      `;

      const popup = new mapboxgl.Popup().setHTML(popupContent);
      const marker = new mapboxgl.Marker()
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(mapRef.current!)
        .togglePopup();

      return marker;
    });
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [properties, isEmpty, isLoadingMore]);

  if (!lat || !lng) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-44 grid self-start",
        isLoadingMore && "pointer-events-none opacity-50"
      )}
    >
      <div
        ref={mapContainerRef}
        className="h-140 rounded-lg shadow overflow-clip bg-muted"
      />
    </div>
  );
}
