# Code Problem Service (Backend)

The **Code Problem Service** is a robust Node.js and Express backend API designed to power a coding platform. It provides RESTful APIs for creating and managing coding problems, while also handling secure, token-based authentication for administrative personnel.

## 🚀 Features
- **Problem Management API**: Full CRUD capabilities for coding problems (title, description in Markdown, test cases, difficulty, and more).
- **Authentication System**: Secures admin endpoints using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Secure Default Seeding**: Instantly provisions a default, undeletable super-admin account upon system start to prevent lock-outs.
- **Advanced Logging Engine**: Integrates with [Winston](https://github.com/winstonjs/winston) to systematically transport application logs safely into a separate MongoDB logging database.
- **Dual-Database Support**: Integrates intelligently with MongoDB (via Mongoose) and Azure Cosmos SQL.

## 📁 System Architecture & Folder Structure

```text
code-problem-service/
├── src/
│   ├── clientApis/       # External service adapters/clients
│   ├── config/           # Environment & database configurations
│   ├── controller/       # Express route handlers processing incoming HTTP requests
│   ├── errors/           # Custom error classes and global error handling
│   ├── models/           # Mongoose Data Schemas (Admin, Problem, etc.)
│   ├── repositories/     # Data Access Layer separating DB logic from business logic
│   ├── routes/           # API Route Definitions (v1)
│   ├── services/         # Core business logic
│   ├── utils/            # Shared helper functions (Auth tokens, Default Seeds)
│   ├── validators/       # Request payload validation logic
│   └── index.js          # Application entry point
├── package.json
└── README.md
```

## 🛠 Prerequisites & Setup

1. Make sure you have **Node.js** installed (v18+ recommended).
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file at the root of the project:
   ```env
   PORT=3000
   NODE_ENV="development"
   
   # Databases
   ATLAS_DB_URL="mongodb+srv://<user>:<password>@cluster0.oighupd.mongodb.net/?appName=Cluster0"
   LOGGER_DB_URL="mongodb+srv://<user>:<password>@cluster0.wnovlgj.mongodb.net/"
   
   # Cosmos DB Configuration (Optional / If Active)
   KEY="your_azure_cosmos_primary_key"
   ENDPOINT="https://your_cosmos_endpoint.documents.azure.com:443/"
   
   # Default Super Admin Seed
   ADMIN_EMAIL=amitpatwa80040@gmail.com
   ADMIN_PASSWORD=your_secure_password
   ADMIN_NAME="Your Name"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔌 API Endpoints Reference (v1)

All endpoints fall under the `/api/v1` namespace.

**Auth Routes (`/api/v1/auth`)**
* `POST /login` - Authenticates an admin and returns a JWT.
* `GET /admins` - *(Protected)* Fetches all active admins.
* `POST /add` - *(Protected)* Provisions a new admin.
* `DELETE /remove/:email` - *(Protected)* Deletes an admin (Cannot delete self or default admin).

**Problem Routes (`/api/v1/problems`)**
* `POST /` - *(Protected)* Create a new coding problem.
* `GET /` - Fetch listing of all problems.
* `GET /:id` - Fetch a singular problem by its ID.
* `PUT /:id` - *(Protected)* Update properties of a problem.
* `DELETE /:id` - *(Protected)* Delete a coding problem entirely.

## 🤝 Contribution Guidelines
Make sure your branch follows descriptive namings (`feature/problem-xyz`, `bugfix/auth-crash`). Code must follow standard clean architecture parameters (Controller -> Service -> Repository).

## 📄 License
ISC