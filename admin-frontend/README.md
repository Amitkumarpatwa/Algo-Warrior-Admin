# Admin Frontend

The frontend for the Algo Warrior Admin panel. Built with React + Vite, it connects to the backend API to manage coding problems and admin users through a dashboard UI.

**Live:** [https://algo-warrior-admin.vercel.app](https://algo-warrior-admin.vercel.app)

> Try it out — email: `test@test.com` / password: `test123`

## Pages

- **Login** — JWT auth, sessions stored in localStorage
- **Dashboard** — Quick stats and overview
- **Problems List** — View, search, and manage all coding problems
- **Problem Form** — Create/edit problems with markdown support and test case inputs
- **Admin Management** — Add or remove other admins (can't delete yourself or the default admin)

## Built With

- React 19 + React Router v7
- Vite for bundling and dev server
- React Markdown for problem previews
- React Icons
- Plain CSS (dark mode, glassmorphism style)

## Folder Layout

```
src/
├── api/            # API helper functions (fetch wrappers)
├── components/     # Sidebar, Layout, DifficultyBadge, Toasts, etc.
├── context/        # AuthContext for session management
├── pages/          # Login, Dashboard, ProblemsList, ProblemForm, AdminManagement
├── App.jsx         # Router setup
├── index.css       # All styles
└── main.jsx        # React DOM mount
```

## Running Locally

Make sure the backend is running on port 3000 first.

```bash
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api/*` requests to `localhost:3000` so you won't hit CORS issues.

## Environment Variables

Create a `.env` file in this directory:

```env
ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_password
ADMIN_NAME="Your Name"
```

These are used by the frontend to identify and protect the default super-admin in the UI.

## Production Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the build locally
```

On Vercel, this builds automatically when you push to master.
