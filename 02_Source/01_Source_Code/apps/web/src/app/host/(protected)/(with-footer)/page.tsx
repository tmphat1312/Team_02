import { Greeting } from "../_components/greeting";
import { ReservationList } from "../_components/reservation-list";

export default function HostHomePage() {
  return (
    <div className="py-12">
      <Greeting className="mb-16" />
      <ReservationList />
    </div>
  );
}
