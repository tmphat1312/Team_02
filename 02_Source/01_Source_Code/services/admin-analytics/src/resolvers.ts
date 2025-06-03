import { propertyClient, reservationClient, userClient } from "./lib/db.js";

export const resolvers = {
  Query: {
    numbers: async () => {
      const [reservationResult, userResult, propertyResult] = await Promise.all(
        [
          reservationClient.query(`
          SELECT
        COUNT(*) AS total,
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 month' THEN 1 END) AS "newThisMonth",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 week' THEN 1 END) AS "newThisWeek",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 day' THEN 1 END) AS "newToday"
          FROM "reservations";
        `),
          userClient.query(`
          SELECT
        COUNT(*) AS total,
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 month' THEN 1 END) AS "newThisMonth",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 week' THEN 1 END) AS "newThisWeek",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 day' THEN 1 END) AS "newToday"
          FROM "user";
        `),
          propertyClient.query(`
          SELECT
        COUNT(*) AS total,
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 month' THEN 1 END) AS "newThisMonth",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 week' THEN 1 END) AS "newThisWeek",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '1 day' THEN 1 END) AS "newToday"
          FROM "properties";
        `),
        ]
      );

      const [reservation] = reservationResult.rows;
      const [user] = userResult.rows;
      const [property] = propertyResult.rows;
      return {
        reservation: {
          total: reservation.total,
          newThisMonth: reservation.newThisMonth,
          newThisWeek: reservation.newThisWeek,
          newToday: reservation.newToday,
        },
        user: {
          total: user.total,
          newThisMonth: user.newThisMonth,
          newThisWeek: user.newThisWeek,
          newToday: user.newToday,
        },
        property: {
          total: property.total,
          newThisMonth: property.newThisMonth,
          newThisWeek: 20,
          newToday: 5,
        },
      };
    },
    chart: async () => {
      const [reservationResult, userResult, propertyResult] = await Promise.all(
        [
          reservationClient.query(`
          SELECT
            TO_CHAR("createdAt", 'YYYY-MM') AS month,
            COUNT(*) AS value
          FROM "reservations"
          GROUP BY month
          ORDER BY month;
        `),
          userClient.query(`
          SELECT
            TO_CHAR("createdAt", 'YYYY-MM') AS month,
            COUNT(*) AS value
          FROM "user"
          GROUP BY month
          ORDER BY month;
        `),
          propertyClient.query(`
          SELECT
            TO_CHAR("createdAt", 'YYYY-MM') AS month,
            COUNT(*) AS value
          FROM "properties"
          GROUP BY month
          ORDER BY month;
        `),
        ]
      );
      const reservation = reservationResult.rows.map((row) => ({
        month: row.month,
        value: parseInt(row.value, 10),
      }));
      const user = userResult.rows.map((row) => ({
        month: row.month,
        value: parseInt(row.value, 10),
      }));
      const property = propertyResult.rows.map((row) => ({
        month: row.month,
        value: parseInt(row.value, 10),
      }));

      return {
        reservation,
        user,
        property,
      };
    },
  },
};
