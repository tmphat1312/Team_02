import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import { env } from "@/env";

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export { mapboxgl };
