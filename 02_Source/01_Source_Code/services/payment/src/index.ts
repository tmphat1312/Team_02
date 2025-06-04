import { createEndpoint, createRouter } from "better-call";
import { toNodeHandler } from "better-call/node";
import {
  depositHistoryTable,
  paymentHistoryTable,
  userWalletsTable,
} from "./db/schema.js";
import { and, desc, eq, or } from "drizzle-orm";
import http from "http";
import { db } from "./lib/db.js";
import { ProductCode } from "vnpay";
import { z } from "zod";

import { env } from "./env.js";
import { vnpay } from "./lib/vnpay.js";
import { VND2USD } from "./utils/vnd-to-usd.js";

const port = env.PORT;
const host = env.HOST;
const ip = "1.1.1.1";

const getOrCreateUserWallet = async (userId: string) => {
  const [wallet] = await db
    .select()
    .from(userWalletsTable)
    .where(eq(userWalletsTable.userId, userId))
    .limit(1);
  if (wallet) {
    return wallet;
  }
  const [newWallet] = await db
    .insert(userWalletsTable)
    .values({
      userId,
    })
    .returning();
  return newWallet!;
};

const getPaymentUrl = createEndpoint(
  "/payment-url",
  {
    method: "GET",
    query: z.object({
      amount: z.coerce.number(),
      userId: z.string(),
    }),
  },
  async (ctx) => {
    const { amount, userId } = ctx.query;
    const ref = Math.floor(Math.random() * 1_000_000_000).toString();

    const urlString = vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: ip,
      vnp_TxnRef: ref,
      vnp_OrderInfo: `${userId}:${ref}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: host.startsWith("https")
        ? `${host}/vnpay-return`
        : `${host}:${port}/vnpay-return`,
    });

    return ctx.redirect(urlString);
  }
);

const getVNPayReturn = createEndpoint(
  "/vnpay-return",
  {
    method: "GET",
    query: z.object({
      vnp_Amount: z.coerce.number(),
      vnp_BankCode: z.string(),
      vnp_OrderInfo: z.string(),
      vnp_TransactionNo: z.string(),
      vnp_TxnRef: z.string(),
    }),
    response: z.object({
      message: z.string(),
      status: z.boolean(),
    }),
  },
  async (ctx) => {
    const query = ctx.query;
    const amountInUSD = VND2USD(query.vnp_Amount / 100);
    const userId = query.vnp_OrderInfo.split(":")[0]!;

    await db.transaction(async (tx) => {
      let [wallet] = await tx
        .select()
        .from(userWalletsTable)
        .where(eq(userWalletsTable.userId, userId))
        .limit(1);
      if (!wallet) {
        const [newWallet] = await tx
          .insert(userWalletsTable)
          .values({
            userId,
          })
          .returning();
        wallet = newWallet;
      }
      await tx
        .update(userWalletsTable)
        .set({
          balance: wallet!.balance + amountInUSD,
        })
        .where(eq(userWalletsTable.userId, userId));
      await tx.insert(depositHistoryTable).values({
        userId,
        amount: amountInUSD,
      });
    });

    return ctx.redirect(
      `${env.WEB_HOST}/payment-success?amount=${query.vnp_Amount / 100}`
    );
  }
);

const getUserWalletByUserId = createEndpoint(
  "/user-wallets/:userId",
  {
    method: "GET",
    params: z.object({
      userId: z.string(),
    }),
    response: z.object({
      userId: z.string(),
      balance: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  },
  async (ctx) => {
    const { userId } = ctx.params;
    const [wallet] = await db
      .select()
      .from(userWalletsTable)
      .where(eq(userWalletsTable.userId, userId))
      .limit(1);
    if (!wallet) {
      const [newWallet] = await db
        .insert(userWalletsTable)
        .values({
          userId,
        })
        .returning();
      return newWallet;
    }
    return wallet;
  }
);

const getUserDepositHistoryByUserId = createEndpoint(
  "/user-deposit-history/:userId",
  {
    method: "GET",
    params: z.object({
      userId: z.string(),
    }),
  },
  async (ctx) => {
    const { userId } = ctx.params;
    const history = await db
      .select()
      .from(depositHistoryTable)
      .where(eq(depositHistoryTable.userId, userId))
      .orderBy(desc(depositHistoryTable.createdAt));
    return history;
  }
);

const getUserPaymentHistoryByUserId = createEndpoint(
  "/user-payment-history/:userId",
  {
    method: "GET",
    params: z.object({
      userId: z.string(),
    }),
  },
  async (ctx) => {
    const { userId } = ctx.params;
    const history = await db
      .select()
      .from(paymentHistoryTable)
      .where(
        or(
          eq(paymentHistoryTable.fromUserId, userId),
          eq(paymentHistoryTable.toUserId, userId)
        )
      )
      .orderBy(desc(paymentHistoryTable.createdAt));
    return history;
  }
);

const makeFullPayment = createEndpoint(
  "/user-payment-history/:reservationId/full-payment",
  {
    method: "POST",
    body: z.object({
      fromUserId: z.string(),
      toUserId: z.string(),
      amount: z.coerce.number(),
    }),
  },
  async (ctx) => {
    const { reservationId } = ctx.params;
    const { fromUserId, toUserId, amount } = ctx.body;

    const [fromWallet, toWallet] = await Promise.all([
      getOrCreateUserWallet(fromUserId),
      getOrCreateUserWallet(toUserId),
    ]);

    if (fromWallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    await db.transaction(async (tx) => {
      await Promise.all([
        tx
          .update(userWalletsTable)
          .set({
            balance: fromWallet.balance - amount,
          })
          .where(eq(userWalletsTable.userId, fromUserId)),
        tx
          .update(userWalletsTable)
          .set({
            balance: toWallet.balance + amount,
          })
          .where(eq(userWalletsTable.userId, toUserId)),
      ]);
      await tx.insert(paymentHistoryTable).values({
        fromUserId,
        toUserId,
        reservationId: Number(reservationId),
        amount,
        status: "FULL-PAID",
      });
    });

    return { message: "Payment successful", status: true };
  }
);

const makeRefund = createEndpoint(
  "/user-payment-history/:reservationId/refund",
  {
    method: "POST",
    body: z.object({
      fromUserId: z.string(),
      toUserId: z.string(),
    }),
  },
  async (ctx) => {
    const { reservationId } = ctx.params;
    const { fromUserId, toUserId } = ctx.body;

    const [fullPaidPaymentHistory] = await db
      .select()
      .from(paymentHistoryTable)
      .where(
        and(
          eq(paymentHistoryTable.reservationId, Number(reservationId)),
          eq(paymentHistoryTable.fromUserId, fromUserId),
          eq(paymentHistoryTable.toUserId, toUserId),
          eq(paymentHistoryTable.status, "FULL-PAID")
        )
      )
      .limit(1);
    if (!fullPaidPaymentHistory) {
      throw new Error("Payment history not found for refund");
    }
    const [depositPaidPaymentHistory] = await db
      .select()
      .from(paymentHistoryTable)
      .where(
        and(
          eq(paymentHistoryTable.reservationId, Number(reservationId)),
          eq(paymentHistoryTable.fromUserId, fromUserId),
          eq(paymentHistoryTable.toUserId, toUserId),
          eq(paymentHistoryTable.status, "DEPOSIT-PAID")
        )
      )
      .limit(1);
    if (!depositPaidPaymentHistory) {
      throw new Error("Deposit payment history not found for refund");
    }
    const amount =
      fullPaidPaymentHistory.amount - (depositPaidPaymentHistory.amount || 0);

    const [fromWallet, toWallet] = await Promise.all([
      getOrCreateUserWallet(fromUserId),
      getOrCreateUserWallet(toUserId),
    ]);
    if (fromWallet.balance < amount) {
      throw new Error("Insufficient balance for refund");
    }

    await db.transaction(async (tx) => {
      await Promise.all([
        tx
          .update(userWalletsTable)
          .set({
            balance: fromWallet.balance - amount,
          })
          .where(eq(userWalletsTable.userId, fromUserId)),
        tx
          .update(userWalletsTable)
          .set({
            balance: toWallet.balance + amount,
          })
          .where(eq(userWalletsTable.userId, toUserId)),
      ]);

      await tx.insert(paymentHistoryTable).values({
        fromUserId,
        toUserId,
        reservationId: Number(reservationId),
        amount,
        status: "REFUNDED",
      });
    });

    return { message: "Refund successful", status: true };
  }
);

const makeDepositPayment = createEndpoint(
  "/user-payment-history/:reservationId/deposit-payment",
  {
    method: "POST",
    body: z.object({
      fromUserId: z.string(),
      toUserId: z.string(),
      amount: z.coerce.number(),
      serviceFee: z.coerce.number().optional().default(0.25),
    }),
  },
  async (ctx) => {
    const { reservationId } = ctx.params;
    const { fromUserId, toUserId, amount, serviceFee } = ctx.body;

    const [fromWallet, toWallet] = await Promise.all([
      getOrCreateUserWallet(fromUserId),
      getOrCreateUserWallet(toUserId),
    ]);
    if (fromWallet.balance < amount) {
      throw new Error("Insufficient balance for deposit payment");
    }

    await db.transaction(async (tx) => {
      await Promise.all([
        tx
          .update(userWalletsTable)
          .set({
            balance: fromWallet.balance - amount,
          })
          .where(eq(userWalletsTable.userId, fromUserId)),
        tx
          .update(userWalletsTable)
          .set({
            balance: toWallet.balance + amount,
          })
          .where(eq(userWalletsTable.userId, toUserId)),
      ]);
      await tx.insert(paymentHistoryTable).values({
        fromUserId,
        toUserId,
        reservationId: Number(reservationId),
        amount,
        status: "DEPOSIT-PAID",
        serviceFee: serviceFee || 0,
      });
    });
    return { message: "Deposit payment successful", status: true };
  }
);

const router = createRouter({
  paymentUrl: getPaymentUrl,
  vnpayReturn: getVNPayReturn,
  userWallet: getUserWalletByUserId,
  userDepositHistory: getUserDepositHistoryByUserId,
  userPaymentHistory: getUserPaymentHistoryByUserId,
  makeFullPayment: makeFullPayment,
  makeRefund: makeRefund,
  makeDepositPayment: makeDepositPayment,
});

const server = http.createServer(toNodeHandler(router.handler));

server.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
