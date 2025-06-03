ARG BUN_VERSION=1.2.5
FROM oven/bun:${BUN_VERSION}-slim AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --link . .

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app .

USER bun
EXPOSE 5002/tcp
ENTRYPOINT [ "bun", "run", "start" ]