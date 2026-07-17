# WC2026 Dashboard
Live World Cup 2026 dashboard built with React + TypeScript.
The app integrates real football-data.org APIs to display group standings, match
center updates, knockout bracket progression, and top scorers in a polished,
dark-themed interface.

## Live Demo
- Add after deployment: `https://your-vercel-url.vercel.app`

## Features
- Live group standings for all groups
- Match center with filters (All / Live / Results / Upcoming)
- Live status indicators and score updates
- Knockout bracket organized by stage
- Top scorers leaderboard
- Loading skeletons and graceful error states
- API caching and server-state management with TanStack Query

## Tech Stack
- React 18 + TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Vitest + Testing Library
- ESLint
- GitHub Actions CI
- Vercel

## Local Setup
```bash
git clone https://github.com/YOUR_USERNAME/wc2026-dashboard.git
cd wc2026-dashboard
npm install
cp .env.example .env.local
```
Add your football-data API key in `.env.local`:
```bash
VITE_FD_API_KEY=your_key_here
VITE_FD_BASE_URL=/api
```
Run locally:
```bash
npm run dev
```

## Testing and Quality Checks
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## CI
GitHub Actions runs on pushes and PRs to `main`:
- lint
- typecheck
- tests

## Deployment Notes (Vercel)
- Add `VITE_FD_API_KEY` in Vercel Environment Variables
- Ensure SPA routing works through `vercel.json` rewrites
- Redeploy after env updates

## What I Learned
- Modeling external API responses with TypeScript interfaces
- Building a dedicated API service layer for maintainability
- Managing server state and caching with TanStack Query
- Implementing robust loading/error UX patterns
- Using branch-based workflow, CI checks, and production deployment practices