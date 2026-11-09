# Task 3: Observability & Modular Express API (TypeScript)

## Structure

```
src/
  server.ts                  # starts the server
  app.ts                     # Express app: middleware + routes + error handling
  routes/                    # URL -> controller mapping
    index.ts
    user.routes.ts
  controllers/               # HTTP layer: validation, status codes
    user.controller.ts
  services/                  # business logic / data access (in-memory)
    user.service.ts
  middleware/
    observability.ts         # logs ISO timestamp, method, path, duration (ms)
    requireAPIKey.ts         # bonus: x-api-key check -> 401 JSON
  types/
    user.ts
```

## Run

```bash
npm install
npm run dev          # development (auto-reload)
npm run build && npm start
```

Default port is 3000. The API key defaults to `secret-key-123` (override with the `API_KEY` env var).

## Endpoints

| Method | Path             | Auth    |
|--------|------------------|---------|
| GET    | /api/health      | none    |
| GET    | /api/users       | x-api-key |
| GET    | /api/users/:id   | x-api-key |
| POST   | /api/users       | x-api-key |
| PUT    | /api/users/:id   | x-api-key |
| DELETE | /api/users/:id   | x-api-key |

## Try it

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/users                                   # 401
curl -H "x-api-key: secret-key-123" http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users \
  -H "x-api-key: secret-key-123" -H "Content-Type: application/json" \
  -d '{"name":"Carol","email":"carol@example.com"}'
```

Example log line:

```
[2026-11-09T21:30:00.123Z] GET /api/users 200 - 1.42ms
```
