FROM oven/bun:1 as base

LABEL description="Offical docker image for Pylon services (Bun)"
LABEL org.opencontainers.image.source="https://github.com/getcronit/pylon"
LABEL maintainer="office@cronit.io"

WORKDIR /usr/src/pylon

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN mkdir -p .pylon
RUN bun run pylon build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/pylon/.pylon .pylon
COPY --from=prerelease /usr/src/pylon/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "/usr/src/pylon/.pylon/index.js" ]