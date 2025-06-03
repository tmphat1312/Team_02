import { reservationClient } from "./lib/db";
export const resolvers = {
    Query: {
        numbers: async () => {
            const { rows: [reservation], } = await reservationClient.query(`
        SELECT
          COUNT(*) AS "total",
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 month') AS "newThisMonth",
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 week') AS "newThisWeek",
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 day') AS "newToday"
        FROM "reservations"
        `);
            console.log(reservation);
            return {
                reservation: {
                    total: reservation.total,
                    newThisMonth: reservation.newThisMonth,
                    newThisWeek: reservation.newThisWeek,
                    newToday: reservation.newToday,
                },
                user: { total: 100, newThisMonth: 50, newThisWeek: 20, newToday: 5 },
                property: {
                    total: 100,
                    newThisMonth: 50,
                    newThisWeek: 20,
                    newToday: 5,
                },
            };
        },
        // chart: () => ({
        //   reservation: [],
        //   user: [],
        //   property: [],
        // }),
    },
};
