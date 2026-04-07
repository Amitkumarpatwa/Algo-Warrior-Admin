# Algo Warrior Admin

A full-stack admin panel I built to manage coding problems for a competitive programming platform. The backend handles CRUD operations for problems and admin authentication, while the frontend gives a clean dashboard to manage everything.

**Live Demo:** [https://algo-warrior-admin.vercel.app](https://algo-warrior-admin.vercel.app)

> Demo login — email: `test@test.com` / password: `test123`

## What it does

- Create, edit, and delete coding problems with markdown descriptions and test cases
- JWT-based auth system with admin management (add/remove admins)
- Seeds a default admin on first run so you don't get locked out
- Logs errors to MongoDB and Azure Cosmos DB for monitoring

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), Azure Cosmos DB, JWT, bcrypt, Winston  
**Frontend:** React 19, Vite, React Router v7, React Markdown  
**Deployment:** Vercel (serverless functions + static build)

## Project Structure

```
├── src/                    # Backend source code
│   ├── config/             # DB, server, logger configs
│   ├── controller/         # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── repositories/       # Database queries
│   ├── routes/             # API routing (v1)
│   ├── services/           # Business logic
│   ├── utils/              # Helpers (auth, seeding, sanitization)
│   └── index.js            # Entry point
├── admin-frontend/         # React frontend (Vite)
├── api/                    # Vercel serverless entry
└── vercel.json             # Deployment config
```

## Getting Started

**Prerequisites:** Node.js v18+

1. Clone the repo
   ```bash
   git clone https://github.com/Amitkumarpatwa/Algo-Warrior-Admin.git
   cd Algo-Warrior-Admin
   ```

2. Set up environment variables — create a `.env` in the root:
   ```env
   PORT=3000
   NODE_ENV="development"
   ATLAS_DB_URL="your_mongodb_connection_string"
   LOGGER_DB_URL="your_logger_db_connection_string"
   KEY="your_azure_cosmos_key"
   ENDPOINT="your_cosmos_endpoint"
   ADMIN_EMAIL=your_email@example.com
   ADMIN_PASSWORD=your_password
   ADMIN_NAME="Your Name"
   ```

3. Install backend deps and start the server
   ```bash
   npm install
   npm run dev
   ```

4. In a separate terminal, set up the frontend
   ```bash
   cd admin-frontend
   npm install
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) — the frontend proxies API calls to `localhost:3000` automatically.

## API Endpoints

All routes are under `/api/v1`.

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/auth/login` | Login, returns JWT | No |
| GET | `/auth` | List all admins | Yes |
| POST | `/auth` | Add a new admin | Yes |
| DELETE | `/auth/:email` | Remove an admin | Yes |
| GET | `/problems` | Get all problems | No |
| GET | `/problems/:id` | Get single problem | No |
| POST | `/problems` | Create problem | Yes |
| PATCH | `/problems/:id` | Update problem | Yes |
| DELETE | `/problems/:id` | Delete problem | Yes |

## Deployment

The project is deployed on Vercel as a monorepo — backend runs as serverless functions and the frontend is a static Vite build. Push to `master` triggers auto-deploy.

## License

ISC