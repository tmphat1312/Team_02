import axios from "axios";
import { env } from "@/env"

export const searchClient = axios.create({
  baseURL: env.NEXT_PUBLIC_SEARCH_SERVICE_API,
});
