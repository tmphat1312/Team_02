"use client";

import Link from "next/link";

import { FilterButtons } from "./filter-buttons";
import { useActiveTab } from "../_hooks/use-active-tab";
import { CheckingOutList } from "./checking-out-list";
import { ArrivingSoonList } from "./arriving-soon-list";
import { UpcomingList } from "./upcoming-list";
import { PendingReviewList } from "./pending-review-list";
import { Reservation } from "@/app/typings/models";

export function ReservationList() {
  const [activeTab] = useActiveTab();
  // for today
  const allReservations = [];
  const checkingOutList: Reservation[] = [];
  const upcomingList: Reservation[] = [];
  const arrivingSoonList: Reservation[] = [];
  const pendingReviewList: Reservation[] = [];

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-medium">Your reservations</h2>
        <Link
          href="/host/reservations"
          className="text-sm hover:underline underline-offset-2"
        >
          All reservations ({allReservations.length})
        </Link>
      </div>

      <FilterButtons
        checkingOutCount={checkingOutList.length}
        arrivingSoonCount={arrivingSoonList.length}
        upcomingCount={upcomingList.length}
        pendingReviewCount={pendingReviewList.length}
        className="mb-8"
      />

      <div className="bg-accent/20 w-full p-8 rounded-xl shadow">
        {activeTab === "checking-out" && (
          <CheckingOutList items={checkingOutList} />
        )}
        {activeTab === "arriving-soon" && (
          <ArrivingSoonList items={arrivingSoonList} />
        )}
        {activeTab === "upcoming" && <UpcomingList items={upcomingList} />}
        {activeTab === "pending-review" && (
          <PendingReviewList items={pendingReviewList} />
        )}
      </div>
    </section>
  );
}
