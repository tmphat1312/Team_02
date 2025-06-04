import { http } from "@/lib/http";
import { ReservedDate } from "@/typings/models";

export async function fetchPropertyAvailability(
  propertyId: number
): Promise<ReservedDate[]> {
  const response = await http.get(`/availability/${propertyId}`);
  return response.data.data;
}
