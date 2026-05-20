---
title: Installation
description: How to install dependencies and structure your app.
---

# Installation

Recommended for new projects: Use `shadcn/create` to build your preset visually and generate the right setup command for your framework.

Choose the setup that matches your starting point.

## Choose Your Path

### 1. Use shadcn/create
Build your preset visually, preview your choices, and generate a framework-specific setup command.
Available for Next.js, Vite, Laravel, React Router, Astro, and TanStack Start.

### 2. Use the CLI
Use the CLI to scaffold a new project directly from the terminal. 
For **pnpm** and Vite, you can run:
```bash
pnpm dlx shadcn@latest init --preset b4YtlA5Ym2 --template vite
```

### 3. Existing Project
Add `shadcn/ui` to an app you already created. Pick your framework guides and follow that path.

---

## Choose Your Framework

- **Next.js**: `npx shadcn@latest init -t next`
- **Vite**: `pnpm dlx shadcn@latest init -t vite`
- **Laravel**: Create the app first with `laravel new`, then run `npx shadcn@latest init`
- **Astro**: `npx shadcn@latest init -t astro`
- **React Router**: `npx shadcn@latest init -t react-router`
- **TanStack Start**: `npx shadcn@latest init -t start`
