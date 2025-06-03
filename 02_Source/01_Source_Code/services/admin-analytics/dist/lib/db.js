import { Pool } from "pg";
export const propertyClient = new Pool({
    connectionString: process.env.PROPERTY_DB_URL,
});
export const reservationClient = new Pool({
    connectionString: process.env.RESERVATION_DB_URL,
});
export const userClient = new Pool({
    connectionString: process.env.USER_DB_URL,
});
