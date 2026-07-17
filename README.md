# World Cup 2026 Dashboard

A live dashboard for the 2026 FIFA World Cup built with React + TypeScript, powered by the football-data.org API.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](../../actions)

## Live Demo

- Production URL: `https://your-vercel-url.vercel.app`

## Preview

Add media files under `docs/media/` and update these paths:

![Dashboard Overview](docs/media/dashboard-overview.png)
![Matches Page](docs/media/matches-page.png)
![Bracket Demo](docs/media/bracket-demo.gif)

## Key Features

- Live group standings with qualification highlighting
- Match center filters: `All`, `Live`, `Results`, `Upcoming`
- Knockout bracket by stage with horizontal mobile scroll
- Top scorers leaderboard with team crest support
- Graceful loading skeletons and error states
- Typed API service layer and cache-aware queries with TanStack Query

## Tech Stack

- React + TypeScript + Vite
- React Router
- TanStack Query
- Tailwind CSS
- Vitest + Testing Library
- ESLint + GitHub Actions CI
- Vercel deployment

## Quick Start

```bash
git clone https://github.com/1gabeortiz/world-cup-2026-dashboard.git
cd world-cup-2026-dashboard
npm install
cp .env.example .env.local
```

Update `.env.local`:

```bash
VITE_FD_API_KEY=your_football_data_key
VITE_FD_BASE_URL=/api
```

Run development server:

```bash
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment Notes

- Set `VITE_FD_API_KEY` in Vercel environment variables
- Keep `VITE_FD_BASE_URL=/api`
- `vercel.json` includes SPA rewrites so direct route refreshes work

## Why This Project

This project was built as a portfolio-focused engineering exercise to demonstrate:

- Type-safe integration with a third-party REST API
- Professional front-end architecture patterns (service layer, hooks, route pages)
- Real-time-ish UX handling (polling, cache strategy, status indicators)
- Production workflow habits (feature branches, CI, tests, deployment)