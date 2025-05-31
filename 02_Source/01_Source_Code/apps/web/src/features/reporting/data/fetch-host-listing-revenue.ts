import { http } from "@/lib/http";
import { HostListingRevenue } from "@/typings/models";

export async function fetchHostListingRevenue(
  hostId: string
): Promise<HostListingRevenue[]> {
  const { data } = await http.get(`/reporting/listing-revenue/${hostId}`);
  return data;
}
