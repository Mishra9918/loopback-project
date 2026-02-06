Request
  ↓
Route        → validates URL + method
  ↓
Controller   → handles req / res
  ↓
Service      → business logic
  ↓
DB / Prisma  → database
File Responsbility

✅ Step 2: Decide responsibility (MOST IMPORTANT)

For every file, ask:

Controllers

👉 Only handle req and res
❌ No DB logic

Services

👉 Business logic
👉 DB calls
👉 Calculations

Routes

👉 Only routing + middleware chaining
❌ No logic

Middleware

👉 Validation, auth, permission checks
❌ No business logic

---

Backend CRUD (Postgres + Express)

1) Create a Postgres database
   - Example DB name: backend_demo
2) Update `.env` with your connection details
   - Use `DATABASE_URL` or the `PG*` fields
3) Create the table
   - Run the SQL in `sql/schema.sql`
4) Start the API
   - `npm install`
   - `npm run dev`

Base URL: http://localhost:3000

Endpoints
- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

Example JSON body
```
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

Run tests
- Ensure the database in `.env` exists and is reachable
- `npm test`
