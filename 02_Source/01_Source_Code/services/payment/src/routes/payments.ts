import { sql, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { paymentsTable, walletsTable } from "../db/schema";
import { Code, ErrorResponse } from "../middlewares/error/error-codes";

const route = new Hono();

// CreatePaymentRequest schema
const CreatePaymentRequest = z.object({
    userId: z.string().min(1),
    reservationId: z.number().int().gte(0),
    amount: z.number().gte(0),
    serviceFee: z.number().gte(0),
    status: z.enum(["deposit-paid"]),
});

// CreatePaymentResponse interface
interface CreatePaymentResponse {
    code: number;
    message: string;
}
route.post("/", async (ctx) => {
    const body = CreatePaymentRequest.parse(await ctx.req.json());

    const wallet = await db
        .select()
        .from(walletsTable)
        .where(eq(walletsTable.userId, body.userId))
        .limit(1);

    if (wallet.length === 0) {
        throw new ErrorResponse(Code.NotFound, "Wallet not found");
    }

    const userWallet = wallet[0];
    const totalAmount = body.amount + body.serviceFee;

    if (userWallet.balance < totalAmount) {
        throw new ErrorResponse(Code.InvalidArgument, "Insufficient wallet balance");
    }

    await db
        .update(walletsTable)
        .set({
            balance: sql`${walletsTable.balance} - ${totalAmount}`,
            updatedAt: new Date(),
        })
        .where(eq(walletsTable.userId, body.userId));


    await db.insert(paymentsTable).values({
        userId: body.userId,
        reservationId: body.reservationId,
        amount: body.amount,
        serviceFee: body.serviceFee,
        status: body.status,
    });

    return ctx.json<CreatePaymentResponse>({
        code: 0,
        message: "OK",
    });
});

// GetPaymentHistoryByReservationIdRequest
const GetPaymentHistoryByReservationIdRequest = z.object({
    reservationId: z.number().int().gte(0),
});

// GetUserWalletResponse
interface GetPaymentHistoryByReservationIdResponse {
    code: number;
    message: string;
    data?: {
        userIds: string;
        reservationIds: number;
        amount: number;
        serviceFee: number;
        status: string;
    };
}
route.get("/", async (ctx) => {
    const query = ctx.req.query();
    const parsedQuery = {
        reservationId: Number(query.reservationId),
    };
    const { reservationId } = GetPaymentHistoryByReservationIdRequest.parse(parsedQuery);

    const payment = await db
        .select()
        .from(paymentsTable)
        .where(eq(paymentsTable.reservationId, reservationId))
        .limit(1);


    if (payment.length === 0) {
        throw new ErrorResponse(Code.NotFound, "Not found");
    }

    return ctx.json<GetPaymentHistoryByReservationIdResponse>({
        code: 0,
        message: "OK",
        data: {
            userIds: payment[0].userId,
            reservationIds: payment[0].reservationId,
            amount: payment[0].amount,
            serviceFee: payment[0].serviceFee,
            status: payment[0].status,
        },
    });
});
export const paymentsRoute = route;