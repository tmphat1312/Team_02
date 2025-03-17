FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY 02_Source/01_Source_Code/services/iam/package*json \
     02_Source/01_Source_Code/services/iam/tsconfig.json \
     02_Source/01_Source_Code/services/iam/env.ts \
     02_Source/01_Source_Code/services/iam/src \
     ./

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 iam

COPY --from=builder --chown=iam:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=iam:nodejs /app/dist /app/dist
COPY --from=builder --chown=iam:nodejs /app/package.json /app/package.json

USER iam
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]