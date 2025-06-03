import { eq, inArray } from "drizzle-orm";
import { Column, Table } from "drizzle-orm";
import { db } from "./";

export async function isValidId(
  table: Table,
  idColumn: Column,
  id: number
): Promise<boolean> {
  const result = await db.select().from(table).where(eq(idColumn, id));
  return result.length > 0;
}

export async function filterValidIds(
  table: Table,
  idColumn: Column,
  ids: number[]
): Promise<number[]> {
  if (ids.length === 0) {
    return [];
  }

  const result = await db.select().from(table).where(inArray(idColumn, ids));
  return result.map((row) => row.id);
}

export async function getInvalidIds(
  table: Table,
  idColumn: Column,
  ids: number[]
): Promise<number[]> {
  const validIds = await filterValidIds(table, idColumn, ids);
  const invalidIds = ids.filter((id) => !validIds.includes(id));

  return invalidIds;
}
