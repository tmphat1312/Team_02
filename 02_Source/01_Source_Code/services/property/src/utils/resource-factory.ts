import { desc, eq } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";

import { db } from "../db";

export function resourceFactory<TSelect extends object>(
  table: PgTable & { id: PgColumn }
) {
  type TIndexReturn = {
    data: TSelect[];
    metadata: {
      pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
    };
  };

  type TShowReturn = {
    data: TSelect | null;
  };

  return {
    index: async (pagination: {
      page: number;
      pageSize: number;
    }): Promise<TIndexReturn> => {
      const { page, pageSize } = pagination;
      const offset = (page - 1) * pageSize;

      const [resources, totalItems] = (await Promise.all([
        db
          .select()
          .from(table)
          .limit(pageSize)
          .offset(offset)
          .orderBy(desc(table.id)),
        db.$count(table),
      ])) as [Array<TSelect>, number];

      return {
        data: resources,
        metadata: {
          pagination: {
            page: page,
            pageSize: pageSize,
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
          },
        },
      };
    },

    show: async (id: number): Promise<TShowReturn> => {
      const [resource] = (await db
        .select()
        .from(table)
        .where(eq(table.id, id))
        .limit(1)) as Array<TSelect>;

      return {
        data: resource || null,
      };
    },

    destroy: async (id: number): Promise<void> => {
      await db.delete(table).where(eq(table.id, id));
    },
  };
}
