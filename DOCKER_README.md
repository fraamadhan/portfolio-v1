# Docker and Docker Compose

This project supports Docker for local development, production, and build environments.

## Dockerfile

- **build**: Installs dependencies and builds the Next.js app using Bun.
- **run**: For local development (`bun run dev`).
- **deploy**: For production (`bun run start`).

## docker-compose.yml

- `portfolio-dev`: Development environment (hot reload, mounts code, uses Bun).
- `portfolio-prod`: Production environment (optimized, no code mounting, uses Bun).
- `portfolio-build`: Build-only service (optional, for CI/CD or manual builds, uses Bun).

## Usage

### Build and Run Development

```
docker compose up portfolio-dev
```

### Build and Run Production

```
docker compose up portfolio-prod
```

### Build Only (no server)

```
docker compose run --rm portfolio-build
```

## Environment Variables

- Place your environment variables in `.env` or `.env.local` (these are ignored by Docker).

## Notes

- The `node_modules` folder is not copied from your host; dependencies are installed in the container using Bun.
- For production, only production dependencies are installed with Bun.
- The app runs on port 3000 by default.
- Bun is used for all install, build, and run commands.
