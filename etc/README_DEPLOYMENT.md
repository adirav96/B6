# Deployment Guide for CodeInterview

This project is configured for deployment with Render.
It contains both a backend and a frontend service.

## Files included

- `render.yaml` — Render deployment configuration
- `server/Procfile` — backend start command support
- `client/vercel.json` — optional Next.js config for Vercel if used later
- `DEPLOYMENT-BACKUP.txt` — backup deployment checklist

## Deployment plan

### 1. Push your repository to GitHub

Render needs a public or private GitHub repository to deploy from.
Make sure your `CodeInterview/CodeInterview` repository is pushed to GitHub.

### 2. Render setup

1. Open https://dashboard.render.com
2. Sign in with GitHub
3. Click **New** → **Web Service**
4. Choose the repository containing this project
5. Select the `main` branch (or your branch)
6. Render should detect `render.yaml` and create two services:
   - `codeinterview-backend`
   - `codeinterview-frontend`

If Render does not detect `render.yaml`, create services manually:

#### Backend service
- Root Directory: `server`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Port: `5000` (default from `server.js`)

#### Frontend service
- Root Directory: `client`
- Environment: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

### 3. Set environment variables

#### Backend environment variables
- `JWT_SECRET`
- `ANTHROPIC_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

> `FIREBASE_PRIVATE_KEY` must preserve newline escapes as `\n`.
> Example:
> `-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n`

Optional alternative credential variables:
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `FIREBASE_SERVICE_ACCOUNT_PATH`

#### Frontend environment variables
- `API_URL` = backend URL from Render, for example `https://codeinterview-backend.onrender.com`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### 4. Verify the deployment

1. Deploy the backend service first and wait for it to become healthy.
2. Copy the backend URL and set `API_URL` for the frontend service.
3. Deploy the frontend service.
4. Open the frontend public URL.

### 5. What to test

- Landing page loads
- Login/register works
- `Interview Session` loads problems
- Chat with AI works
- Code run/submit works

## Local validation commands

From the backend folder:
```bash
cd server
npm install
npm start
```

From the frontend folder:
```bash
cd client
npm install
npm run dev
```

Verify:
- `http://localhost:3000`
- `http://localhost:5000/api/health`

## Notes

- `client/next.config.mjs` rewrites `/api/*` to `process.env.API_URL`.
- When `API_URL` is set, the frontend will call the backend correctly.
- If you want, I can also help you prepare the exact Render dashboard steps after you connect the repo.
