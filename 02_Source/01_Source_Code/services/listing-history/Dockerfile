FROM node:22-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 logging

COPY --from=builder --chown=logging:nodejs /app /app

USER logging
EXPOSE 8002/tcp

CMD ["node", "api.js"]
