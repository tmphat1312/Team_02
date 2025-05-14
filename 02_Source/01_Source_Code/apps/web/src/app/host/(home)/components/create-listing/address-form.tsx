"use client";

import { useEffect, useRef, useState } from "react";

import { env } from "@/env";
import { mapboxgl } from "@/lib/mapbox";

import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";
import { getGeocoding } from "@/features/map/data/get-geocoding";
import { GeoSearchbox } from "./geo-searchbox";

type Props = {
  defaultCoordinates?: [number, number];
  defaultAddress?: string;
  onAddressChange: (coordinates: [number, number], address: string) => void;
};

export function AddressForm({
  onAddressChange,
  defaultCoordinates,
  defaultAddress,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);

  const [lng] = useState(defaultCoordinates?.[0] ?? 106.522144);
  const [lat] = useState(defaultCoordinates?.[1] ?? 10.6102784);
  const [zoom] = useState(10);

  const changeMarkerPosition = (
    coordinates: [number, number],
    address: string
  ) => {
    if (!markerRef.current) return;
    markerRef.current.setLngLat(coordinates);
    markerRef.current.setPopup(new mapboxgl.Popup().setHTML(address));
    markerRef.current.togglePopup();
    onAddressChange(coordinates, address);
  };

  const handleAddressChange = (
    coordinates: [number, number],
    address: string
  ) => {
    changeMarkerPosition(coordinates, address);
    mapRef.current?.flyTo({
      center: coordinates,
      essential: true,
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
      center: [lng, lat],
      zoom: zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current.addControl(new mapboxgl.GeolocateControl(), "top-right");
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    mapRef.current.on("load", () => {
      mapRef.current?.resize();
    });
    mapRef.current.on("click", async (e) => {
      const coordinates = e.lngLat;
      const geo = await getGeocoding(coordinates.lng, coordinates.lat);
      changeMarkerPosition(
        [coordinates.lng, coordinates.lat],
        geo.properties.full_address
      );
    });

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    if (defaultAddress) {
      markerRef.current.setPopup(new mapboxgl.Popup().setHTML(defaultAddress));
      markerRef.current.togglePopup();
    }

    return () => {
      mapRef.current?.remove();
      markerRef.current?.remove();

      mapRef.current = null;
      mapContainerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, lat, zoom]);

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Where is your listing located?</StepHeading>
        <StepDescription>
          Make your shepherd’s hut a home by adding your address here.
        </StepDescription>
      </StepHeader>
      <div className="relative">
        <div
          ref={mapContainerRef}
          className="h-96 w-xl rounded-lg shadow overflow-clip"
        ></div>
        <GeoSearchbox onAddressChange={handleAddressChange} />
      </div>
    </StepSection>
  );
}
