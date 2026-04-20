FROM oven/bun:1.1.13 as base
WORKDIR /app

# --- Build Stage ---
FROM base as build
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
RUN bun run build

# --- Run Stage (for development) ---
FROM base as run
ENV NODE_ENV=development
COPY --from=build /app /app
EXPOSE 3000
CMD ["bun", "run", "dev"]

# --- Deploy Stage (for production) ---
FROM base as deploy
ENV NODE_ENV=production
COPY --from=build /app /app
RUN bun install --production --frozen-lockfile && bun cache clean
EXPOSE 3000
CMD ["bun", "run", "start"]
