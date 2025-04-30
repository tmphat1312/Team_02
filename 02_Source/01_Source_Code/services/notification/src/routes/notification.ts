import { Hono } from 'hono';
import { db } from '../db';
import { notificationTable } from '../db/schema';
import { eq, desc, or } from 'drizzle-orm';
import { created, badRequest, ok, noContent } from '../utils/json-helpers';
import { ErrorCode } from '../constants/error-codes';

export const notificationRoute = new Hono()

notificationRoute.get('/',
  async (c) => {
    const notifications = await db
      .select()
      .from(notificationTable)
      .orderBy(desc(notificationTable.sendAt));

    return ok(c, notifications);
  }
);