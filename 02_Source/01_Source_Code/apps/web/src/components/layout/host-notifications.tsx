import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function HostNotifications() {
  return (
    <Button size="icon" variant="outline" className="rounded-full size-10">
      <Bell />
    </Button>
  );
}
