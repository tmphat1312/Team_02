import { http } from "@/lib/http";
import { Notification } from "@/typings/models";

export async function fetchHostNotifications(
  hostId: string
): Promise<Notification[]> {
  const { data: httpData } = await http.get(`/notifications?userId=${hostId}`);
  const notifications = httpData.data;
  return notifications;
}
