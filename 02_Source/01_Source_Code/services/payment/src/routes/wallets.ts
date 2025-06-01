import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db"
import { walletsTable } from "../db/schema"
import {Code, ErrorResponse} from "../middlewares/error/error-codes";

const route = new Hono();

// CreateUserWalletRequest
const CreateUserWalletRequest = z.object({
    userId: z.string().min(1)
});

// CreateUserWalletResponse
interface CreateUserWalletResponse {
    code: number;
    message: string;
}
route.post("/", async (ctx) => {
    const body = CreateUserWalletRequest.parse(await ctx.req.json());

    const existingWallet = await db
        .select()
        .from(walletsTable)
        .where(eq(walletsTable.userId, body.userId))
        .limit(1);
    if (existingWallet.length > 0) {
        throw new ErrorResponse(Code.AlreadyExists, "User already has a wallet");
    }

    await db.insert(walletsTable).values({
        userId: body.userId,
        balance: 0,
    });

    return ctx.json<CreateUserWalletResponse>({
        code: 0,
        message: "OK",
    });
})

// GetUserWalletRequest
const GetUserWalletRequest = z.object({
    userId: z.string().min(1)
});

// GetUserWalletResponse
interface GetUserWalletResponse {
    code: number;
    message: string;
    data?: {
        balance: number;
    };
}

route.get("/", async (ctx) => {
    const query = ctx.req.query();
    const { userId } = GetUserWalletRequest.parse(query);

    const wallet = await db
        .select()
        .from(walletsTable)
        .where(eq(walletsTable.userId, userId))
        .limit(1);

    if (wallet.length === 0) {
        throw new ErrorResponse(Code.NotFound, "Wallet not found");
    }

    return ctx.json<GetUserWalletResponse>({
        code: 0,
        message: "OK",
        data: {
            balance: wallet[0].balance,
        }
    });
});
export const walletsRoute = route;