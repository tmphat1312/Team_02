import { db } from "./db.js";

export const getListings = async () => {
  const stmt = db.prepare(`SELECT * FROM listings`);
  const rows = stmt.all();
  return Promise.resolve(rows);
};
