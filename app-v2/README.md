# Edu+

[![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/oldlion-ne/edu-plus?utm_source=oss&utm_medium=github&utm_campaign=oldlion-ne%2Fedu-plus&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://coderabbit.ai)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=171717)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&labelColor=171717)](https://www.typescriptlang.org)
[![Powered by Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&labelColor=171717)](https://vite.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white&labelColor=171717)](https://supabase.com)

> A modern educational platform built for the Edu+ ecosystem — featuring a role-based admin dashboard, AI chat advisor, knowledge hub, and dynamic telemetry analytics.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Build | Vite 7 |
| Backend | Supabase (Auth + Postgres) |
| Charts | Recharts |
| AI Advisor | OpenRouter API |
| Routing | React Router v7 |

---

## Features

- 🔐 **Role-based authentication** — Admin, Educator, and Resource Person roles via Supabase
- 📊 **Live telemetry dashboard** — Interactive area charts with filterable time ranges
- 📚 **Knowledge Hub** — Upload and manage tutorials, podcasts, webinars, and study materials
- 🤖 **AI Chat Advisor** — Powered by OpenRouter with custom knowledge injection
- 📩 **Contact inquiry terminal** — Real-time inbound message monitoring
- 🎨 **HUD-style UI** — Dark glassmorphism design with monospace typography

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Production build
pnpm run build

# Run UI compliance checks
pnpm run ui-check
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── lib/              # Supabase client, AuthContext, utilities
├── pages/            # Route-level page components
├── sections/         # Layout sections (Navigation, Footer, Hero)
└── index.css         # Global design tokens and styles
```

---

## License

Private — © Edu+ / oldlion-ne. All rights reserved.
