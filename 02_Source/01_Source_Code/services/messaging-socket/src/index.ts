import { Server } from "socket.io";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { consola } from "consola";
import { serve } from "@hono/node-server";
import type { Server as HTTPServer } from "node:http";

import { setupSocket } from "./socket/index.js";

const app = new Hono();
app.use(logger(consola.info));
showRoutes(app);

const httpServer = serve({
    fetch: app.fetch,
    port: 3010,
});

// Tạo Socket.IO server
const io = new Server(httpServer as HTTPServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});


setupSocket(io);


