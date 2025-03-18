FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY  package*json \
     tsconfig.json \
     src \
     ./

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api-gateway

COPY --from=builder --chown=api-gateway:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=api-gateway:nodejs /app/dist /app/dist
COPY --from=builder --chown=api-gateway:nodejs /app/package.json /app/package.json

USER api-gateway
EXPOSE 3001

CMD ["node", "/app/dist/index.js"]