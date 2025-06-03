import { createEndpoint, createRouter } from "better-call";
import { toNodeHandler } from "better-call/node";

import http from "http";

import { env } from "./env.js";
import { paymentClient, propertyClient, reservationClient } from "lib/db.js";
import { z } from "zod";

const port = env.PORT;

const getHostNumbersEndpoint = createEndpoint(
  "/reporting/numbers/:hostId",
  {
    method: "GET",
  },
  async (ctx) => {
    const { hostId } = ctx.params;
    const currentYear = new Date().getFullYear();

    const [hostListings, hostReservations, hostPayment] = await Promise.all([
      propertyClient.query(
        `SELECT "id", "createdAt" FROM "properties" WHERE "hostId" = $1`,
        [hostId]
      ),
      reservationClient.query(
        `SELECT "id", "createdAt" FROM "reservations" WHERE "hostId" = $1`,
        [hostId]
      ),
      paymentClient.query(
        `SELECT "id", "toUserId", "createdAt", "status", "amount"
          FROM "paymentHistory"
          WHERE "toUserId" = $1`,
        [hostId]
      ),
    ]);

    const hostTotalRevenue = hostPayment.rows.reduce(
      (acc, payment) => {
        if (
          payment.status === "DEPOSIT-PAID" ||
          payment.status === "FULL-PAID"
        ) {
          acc.totalRevenue += payment.amount;
        } else if (payment.status === "REFUNDED") {
          acc.totalRevenue -= payment.amount;
        }
        return acc;
      },
      { totalRevenue: 0 }
    );

    const listingsByMonth = hostListings.rows.reduce((acc, listing) => {
      const createdDate = new Date(listing.createdAt);
      if (createdDate.getFullYear() !== currentYear) {
        return acc; // skip listings not in the current year
      }
      const month = createdDate.getMonth() + 1; // getMonth() is zero-based
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(listing);
      return acc;
    }, {});
    const numberOfListingsByMonth = Object.keys(listingsByMonth).map(
      (month) => ({
        month: parseInt(month, 10),
        value: listingsByMonth[month].length,
      })
    );

    const reservationsByMonth = hostReservations.rows.reduce(
      (acc, reservation) => {
        const createdDate = new Date(reservation.createdAt);
        if (createdDate.getFullYear() !== currentYear) {
          return acc; // skip reservations not in the current year
        }
        const month = createdDate.getMonth() + 1; // getMonth() is zero-based
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(reservation);
        return acc;
      },
      {}
    );
    const numberOfReservationsByMonth = Object.keys(reservationsByMonth).map(
      (month) => ({
        month: parseInt(month, 10),
        value: reservationsByMonth[month].length,
      })
    );

    // group payment history by month
    const paymentsByMonth = hostPayment.rows.reduce((acc, payment) => {
      const createdDate = new Date(payment.createdAt);
      if (createdDate.getFullYear() !== currentYear) {
        return acc; // skip payments not in the current year
      }
      const month = createdDate.getMonth() + 1; // getMonth() is zero-based
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(payment);
      return acc;
    }, {});
    const revenueByMonth = Object.keys(paymentsByMonth).map((month) => {
      const totalRevenue = paymentsByMonth[month].reduce(
        (sum: number, payment: { status: string; amount: number }) => {
          if (
            payment.status === "DEPOSIT-PAID" ||
            payment.status === "FULL-PAID"
          ) {
            return sum + payment.amount;
          } else if (payment.status === "REFUNDED") {
            return sum - payment.amount;
          }
          return sum;
        },
        0
      );
      return {
        month: parseInt(month, 10),
        value: totalRevenue,
      };
    });

    const numberOfListings = hostListings.rowCount;
    const numberOfReservations = hostReservations.rowCount;
    const totalRevenue = hostTotalRevenue.totalRevenue;

    return {
      hostId,
      numberOfListings,
      numberOfReservations,
      totalRevenue,
      numberOfListingsByMonth,
      numberOfReservationsByMonth,
      revenueByMonth,
    };
  }
);

const getHostListingRevenueEndpoint = createEndpoint(
  "/reporting/listing-revenue/:hostId",
  {
    method: "GET",
    query: z.object({
      timeframe: z
        .enum(["all", "last30days", "last90days"])
        .optional()
        .default("all"),
      month: z.coerce.number().optional(),
      year: z.coerce.number().optional(),
    }),
  },
  async (ctx) => {
    const { hostId } = ctx.params;

    const { rows: listings } = await propertyClient.query(
      `SELECT id, "title" FROM "properties" WHERE "hostId" = $1`,
      [hostId]
    );

    // either timeframe or month and year, not both
    // if both are provided, take precedence of timeframe (ignore month and year)
    const { timeframe, month, year } = ctx.query;

    let dateCondition = "";
    if (timeframe === "last30days") {
      dateCondition = `AND "createdAt" >= NOW() - INTERVAL '30 days'`;
    } else if (timeframe === "last90days") {
      dateCondition = `AND "createdAt" >= NOW() - INTERVAL '90 days'`;
    } else if (timeframe === "all") {
      dateCondition = "";
    } else if (month && year) {
      dateCondition = `AND EXTRACT(MONTH FROM "createdAt") = $1 AND EXTRACT(YEAR FROM "createdAt") = $2`;
    } else {
      dateCondition = "";
    }

    const listingRevenuePromises = listings.map(async (listing) => {
      const reservations = await reservationClient.query(
        `SELECT "id" from "reservations" WHERE "propertyId" = $1 ${dateCondition}`,
        [listing.id]
      );
      const reservationIds = reservations.rows
        .map((reservation) => reservation.id)
        .join(",");
      const totalRevenue =
        reservationIds.length > 0
          ? await paymentClient.query(
              `SELECT
                COALESCE(SUM(CASE WHEN status IN ('DEPOSIT-PAID', 'FULL-PAID') THEN amount ELSE 0 END), 0)
                - COALESCE(SUM(CASE WHEN status = 'REFUNDED' THEN amount ELSE 0 END), 0)
                AS "totalRevenue"
              FROM "paymentHistory"
              WHERE "toUserId" = $1
                AND "reservationId" IN (${reservationIds})
                AND status IN ('DEPOSIT-PAID', 'FULL-PAID', 'REFUNDED')`,
              [hostId]
            )
          : { rows: [{ totalRevenue: 0 }] };

      const numberOfReservations = reservations.rowCount;
      const totalRevenueAmount = totalRevenue.rows[0]?.totalRevenue || 0;

      return {
        id: listing.id,
        listingId: listing.id,
        title: listing.title,
        numberOfReservations,
        totalRevenue: totalRevenueAmount,
      };
    });
    const listingRevenues = await Promise.all(listingRevenuePromises);

    return listingRevenues;
  }
);

const router = createRouter({
  hostNumbers: getHostNumbersEndpoint,
  hostListingRevenue: getHostListingRevenueEndpoint,
});

const server = http.createServer(toNodeHandler(router.handler));

server.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
