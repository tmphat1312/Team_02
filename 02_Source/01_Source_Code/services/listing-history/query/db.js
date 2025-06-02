import Database from "better-sqlite3";
import { eventBus, LISTING_EVENTS } from "../eventBus.js";
import { projectConfig } from "../project.config.js";

const db = new Database(projectConfig.materializedDBPath);
db.pragma("journal_mode = WAL");

//#region Database Graceful Shutdown
process.on("exit", () => db.close());
process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});
//#endregion

//#region Database Initialization
db.exec(`CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    pricePerNight REAL NOT NULL
)`);
//#endregion

//#region Events (Hydrators)
eventBus.on(LISTING_EVENTS.LISTING_CREATED, (event) => {
  const { title, pricePerNight } = event.payload;
  const stmt = db.prepare(
    `INSERT INTO listings (title, pricePerNight) VALUES (?, ?)`
  );
  stmt.run(title, pricePerNight);
  console.log("Listing created:", event);
});

eventBus.on(LISTING_EVENTS.LISTING_UPDATED, (event) => {
  const { id, title, pricePerNight } = event.payload;
  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push("title = ?");
    values.push(title);
  }
  if (pricePerNight !== undefined) {
    fields.push("pricePerNight = ?");
    values.push(pricePerNight);
  }

  if (fields.length > 0) {
    const stmt = db.prepare(
      `UPDATE listings SET ${fields.join(", ")} WHERE id = ?`
    );
    stmt.run(...values, id);
  }
  console.log("Listing updated:", event);
});

eventBus.on(LISTING_EVENTS.LISTING_DELETED, (event) => {
  const { id } = event.payload;
  const stmt = db.prepare(`DELETE FROM listings WHERE id = ?`);
  stmt.run(id);
  console.log("Listing deleted:", event);
});
//#endregion

export { db };
