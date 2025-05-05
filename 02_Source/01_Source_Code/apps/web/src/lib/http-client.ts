import axios from "axios";

import { env } from "@/env";

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_GATEWAY_URL,
  withCredentials: true,
});

export const mockHttpClient = axios.create({
  baseURL: "http://localhost:3100",
});
