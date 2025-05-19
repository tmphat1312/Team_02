"use client";

import { useEffect, useRef, useState } from "react";

import { env } from "@/env";
import { getGeocoding } from "@/features/map/data/get-geocoding";
import { mapboxgl } from "@/lib/mapbox";

import {
  ActionType,
  useCreateListingContext,
} from "../../../contexts/create-listing-context";
import {
  StepDescription,
  StepHeader,
  StepHeading,
  StepSection,
} from "../../step";
import { GeoSearchbox } from "../geo-searchbox";

export function CoordinatesForm() {
  const { state, dispatch } = useCreateListingContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);

  const [lng] = useState(state.coordinates?.[0] ?? 106.8102784);
  const [lat] = useState(state.coordinates?.[1] ?? 10.6102784);
  const [zoom] = useState(10);

  const changeMarkerPosition = (
    coordinates: [number, number],
    address: string
  ) => {
    if (!markerRef.current) return;
    markerRef.current.setLngLat(coordinates);
    markerRef.current.setPopup(new mapboxgl.Popup().setHTML(address));
    markerRef.current.togglePopup();
    dispatch({
      type: ActionType.SET_COORDINATES,
      payload: coordinates,
    });
    dispatch({
      type: ActionType.SET_ADDRESS,
      payload: address,
    });
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

    if (state.address) {
      markerRef.current.setPopup(new mapboxgl.Popup().setHTML(state.address));
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
        />
        <GeoSearchbox onAddressChange={handleAddressChange} />
      </div>
    </StepSection>
  );
}
