import { Hono } from 'hono';
import { db } from '../db';
import { conversationTable, messageTable } from '../db/schema';
import { eq, desc, or } from 'drizzle-orm';
import { created, badRequest, ok, noContent } from '../utils/json-helpers';
import { ErrorCode } from '../constants/error-codes';

export const conversationRoute = new Hono()



conversationRoute.get('/:id', 
  async (c) => {
    const conversationId = Number(c.req.param('id'));
    if (isNaN(conversationId)) {
      return badRequest(
        c,
        'conversationId must be a valid number',
        ErrorCode.INVALID_CONVERSATION_ID
      );
    }
    const [conversationRaw] = await db
      .select()
      .from(conversationTable)
      .where(eq(conversationTable.id, conversationId))
      .limit(1);
    if (!conversationRaw) {
      return badRequest(
        c,
        'Conversation not found',
        ErrorCode.CONVERSATION_NOT_FOUND
      );
    }

  
    const result = await db
    .select({
      content: messageTable.content,
      receiverId: messageTable.receiverId,
      isReadByReceiver: messageTable.isReadByReceiver
    })
    .from(messageTable)
    .where(eq(messageTable.conversationId, conversationRaw.id))
    .orderBy(desc(messageTable.sendAt))
    .limit(1);
    const lastMessage = result[0];
    
    return ok(c, {
      id: conversationRaw.id,
      tenantId: conversationRaw.tenantId,
      hostId: conversationRaw.hostId,
      propertyId: conversationRaw.propertyId,
      createdAt: conversationRaw.createdAt,
      updatedAt: conversationRaw.updatedAt ?? new Date(0),
      lastMessage: String(lastMessage?.content ?? ''),
      isReadByUser: lastMessage ? Boolean(lastMessage.isReadByReceiver) : false
    });
  }
);

conversationRoute.get('/', 
  async (c) => {

    type DataResponse = {
      id: number;
      tenantId: string;
      hostId: string;
      propertyId: number;
      createdAt: Date;
      updatedAt: Date;
      lastMessage: string;
      isReadByUser: boolean;
    }

    const userId = c.req.query('userId')
    if (!userId) {
      return badRequest(
        c, 
        'userId is required',
        ErrorCode.MISSING_USER_ID
      );
    }

    const conversationRaw = await db
      .select()
      .from(conversationTable)
      .where(
        or(
          eq(conversationTable.tenantId, userId),
          eq(conversationTable.hostId, userId)
        )
      )
      .orderBy(desc(conversationTable.updatedAt));
    
      if (conversationRaw.length === 0) {
        return ok(c, []);
      }
    

      const conversations: DataResponse[] = await Promise.all(
        conversationRaw.map(async (conv) => {
          const result = await db
          .select({
            content: messageTable.content,
            receiverId: messageTable.receiverId,
            isReadByReceiver: messageTable.isReadByReceiver
          })
          .from(messageTable)
          .where(eq(messageTable.conversationId, conv.id))
          .orderBy(desc(messageTable.sendAt))
          .limit(1);
          const lastMessage = result[0];
          
          return {
            id: conv.id,
            tenantId: conv.tenantId,
            hostId: conv.hostId,
            propertyId: conv.propertyId,
            createdAt: conv.createdAt,
            updatedAt: conv.updatedAt ?? new Date(0),
            lastMessage: String(lastMessage?.content ?? ''),
            isReadByUser: lastMessage?.receiverId === userId
              ? Boolean(lastMessage.isReadByReceiver)
              : true,
          };
        })
      );

    return ok(c, conversations);
  }
);

conversationRoute.post('/', 
  async (c, next) => { 

    type DataResponse = {
      id: number;
      createdAt: Date;
    }

    const { tenantId, hostId, propertyId: propertyIdStr } = await c.req.parseBody<{
      tenantId: string;
      hostId: string;
      propertyId: string;
    }>();

    if (!tenantId) {
      return badRequest(
        c, 
        'tenantId is required',
        ErrorCode.MISSING_TENANT_ID
      );
    }
    if (!hostId) {
      return badRequest(
        c, 
        'hostId is required',
        ErrorCode.MISSING_HOST_ID
      );
    }

    if (!propertyIdStr) {
      return badRequest(
        c, 
        'propertyId is required',
        ErrorCode.MISSING_PROPERTY_ID
      );
    }

    const propertyId = parseInt(propertyIdStr, 10);
    if (isNaN(propertyId)) {
      return badRequest(
        c, 
        'propertyId must be a valid number',
        ErrorCode.INVALID_PROPERTY_ID
      );
    }

    const [insertConversation] = await db
      .insert(conversationTable)
      .values({
        tenantId,
        hostId,
        propertyId,
      })
      .returning();
    if (!insertConversation) {
      return badRequest(
        c,
        'Insert conversation failed',
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
    const createdResponse: DataResponse = {
      id: insertConversation.id,
      createdAt: insertConversation.createdAt,
    };
    return created(c, createdResponse);
  }
);


conversationRoute.delete('/:id',
  async (c) => {
    const conversationId = Number(c.req.param('id'));
    if (isNaN(conversationId)) {
      return badRequest(
        c,
        'conversationId must be a valid number',
        ErrorCode.INVALID_CONVERSATION_ID
      );
    }
    const [deletedConversation] = await db
      .delete(conversationTable)
      .where(eq(conversationTable.id, conversationId))
      .returning();
    if (!deletedConversation) {
      return badRequest(
        c,
        'Conversation not found',
        ErrorCode.CONVERSATION_NOT_FOUND
      );
    }
    return noContent(c);
  }
);


conversationRoute.get('/:id/messages',
  async (c) => {  
    const conversationId = Number(c.req.param('id'));
    if (isNaN(conversationId)) {
      return badRequest(
        c,
        'conversationId must be a valid number',
        ErrorCode.INVALID_CONVERSATION_ID
      );
    }
    const [conversationRaw] = await db
      .select()
      .from(conversationTable)
      .where(eq(conversationTable.id, conversationId))
      .limit(1);
    if (!conversationRaw) {
      return badRequest(
        c,
        'Conversation not found',
        ErrorCode.CONVERSATION_NOT_FOUND
      );
    }
    const messages = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.conversationId, conversationId))
      .orderBy(desc(messageTable.sendAt));
    return ok(c, messages);
  }
);