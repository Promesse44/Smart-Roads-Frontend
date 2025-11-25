# Smart-Roads Frontend (Vite + React)

This project is the frontend for the Smart-Roads application, built with Vite + React.

## Quick start (local)

```powershell
cd smart_roads_frontend
npm install
npm run dev
```

To build for production:

```powershell
npm run build
npm run preview
```

## Environment variables

The frontend uses Vite environment variables at build time. The important variable is:

- `VITE_API_BASE_URL` — the base URL of the backend API (example: `https://smart-roads-ozka.onrender.com`).

Place this in a `.env` file or in your Netlify / hosting environment variables. Vite only exposes env vars prefixed with `VITE_` to the client.

## Deployment (Netlify)

Recommended settings when you connect your Git repo to Netlify:

- **Base directory**: leave empty (`.`) if this repo contains only the frontend project. If the frontend is inside a subfolder in a monorepo, set this to the relative path (`smart_roads_frontend`).
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variable** on Netlify: `VITE_API_BASE_URL` with your Render backend URL.

I've included a `netlify.toml` file to set the build and single-page-app redirect.

## Notes

- The frontend was updated to read `import.meta.env.VITE_API_BASE_URL` with a sensible fallback. If you change the backend URL, update the Netlify env var and redeploy.
- Avoid committing secret keys to the repo. Only the public API base URL is required for the frontend.

## Features

- View all road requests and details
- Submit a new request with a photo
- React Router — single page app with navigation

## System Requirements

- Node.js 18+
- npm 8+ or yarn
- Browser supporting modern JS (Edge/Chrome/Firefox/Safari)

## Tech used

- React (Vite), React Router Dom
- Iconify, FontAwesome

## Step-by-step setup

1. Clone the repo
2. For backend (server):

```powershell
cd Smart-Roads
npm install
npm run db:migrate
npm run dev
```

3. For frontend:

```powershell
cd Smart-Roads-Frontend/smart_roads_frontend
npm install
npm run dev
```

4. Set `.env` using `.env.example` (create from `.env.example` and set your values).

Default dev ports:

- Backend: 10000
- Frontend (Vite): 5173

## Screenshots

Add screenshot files to `docs/screenshots/` and reference them here. Example:

```md
![App dashboard screenshot](docs/screenshots/dashboard.png)
```

## Deployed app

- Backend (example): `https://smart-roads-ozka.onrender.com`
- Frontend (example): `https://<your-site>.netlify.app` (replace with your Netlify URL)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
