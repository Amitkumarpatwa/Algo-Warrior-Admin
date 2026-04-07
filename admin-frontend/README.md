# Code Problem Admin Frontend (CMS)

A modern, highly-responsive Content Management System (CMS) strictly built to curate and administer the **Code Problem Service**. It connects flawlessly with the backend REST APIs to edit Markdown-based problem sets, secure admin sessions, and manage testing validations visually.

## ✨ Core Features
- **Protected Routing & Auth Flow**: Implements a robust `AuthContext` to manage local session states, validating persistent JWT tokens to protect administrative layouts.
- **LeetCode-Style Dashboard**: A sleek problem management list displaying difficulties, titles, and IDs dynamically.
- **Interactive Markdown Editing**: Problem descriptions use integrated markdown components (`react-markdown`) offering live viewing inside the editing form.
- **Role-Based Admin Tracking**: Dynamic User Interface allowing adding or deleting of fellow admins, intelligently preventing the original Super-Admin from being mistakenly wiped out.

## 📚 Technologies Used
- **React 19**: Modern component lifecycle and hooks.
- **React Router v7**: Declarative mapping of internal application views and routes.
- **Vite**: Ultra-fast next generation frontend bundler and tooling.
- **React Icons & React Markdown**: Elegant typography, visualization, and markdown parsing.

## 🏗 Directory Architecture

```text
admin-frontend/
├── src/
│   ├── api/              # Axios/Fetch hooks mapped directly to backend endpoints
│   ├── components/       # Reusable UI widgets (Layouts, Loaders, Sidebars, Toasts)
│   ├── context/          # React Contexts (AuthContext.jsx manages the user session globally)
│   ├── pages/            # Primary Route Views:
│   │   ├── Login.jsx            # Secure entry portal
│   │   ├── Dashboard.jsx        # Landing telemetry and statistics
│   │   ├── ProblemsList.jsx     # Tabular management of problems
│   │   ├── ProblemForm.jsx      # Editor capable of Markdown and Test Cases
│   │   └── AdminManagement.jsx  # Admin access privilege delegation
│   ├── App.jsx           # Main React Router configurations
│   ├── index.css         # Global Vanilla CSS styling foundation
│   └── main.jsx          # DOM Entry File
├── .env                  # Environment Variables
├── vite.config.js        # Vite bundler configurations & Proxy setups
└── package.json
```

## ⚙️ Environment Configuration

You must create a `.env` in the `admin-frontend` root. Notice that normally Vite requires variables to be prefixed with `VITE_`. However, the current `vite.config.js` manually maps these to the `process.env` scope, so they match the backend style:

```env
ADMIN_EMAIL=amitpatwa80040@gmail.com
ADMIN_PASSWORD=your_secure_password
ADMIN_NAME="Your Name"
```

*This securely enables the dashboard to visually mask and protect the Super-Admin without exposing sensitive tokens.*

## 🚀 Running Locally

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the Vite hot-reloading development server:
   ```bash
   npm run dev
   ```

*The frontend intrinsically anticipates the Backend server running on **Port 3000** locally. It proxies `/api/*` requests in `vite.config.js` to automatically hit `http://localhost:3000` avoiding CORS issues completely during development.*

## 📦 Building for Production

Compile a highly optimized production payload:
```bash
npm run build
```
Preview the built artifacts on a local web server:
```bash
npm run preview
```

## 🎨 Design System
Vanilla styling (`index.css`) promotes an expansive glass-morphism dark mode out-of-the-box, leaning heavily away from Tailwind in favor of raw semantic performance and custom flexbox layouts explicitly sculpted for code curation.
