import { http } from "@/lib/http";
import { HostNumbers } from "@/typings/models";

export async function fetchHostNumbers(hostId: string): Promise<HostNumbers> {
  const { data } = await http.get(`/reporting/numbers/${hostId}`);
  return data;
}
