---
title: CLI Reference
description: Use the shadcn CLI to manage components and themes.
---

# CLI Reference

## init
Use the `init` command to initialize configuration and dependencies for an existing project, or create a new project with `--name`.
```bash
pnpm dlx shadcn@latest init
```

### Options
- `-t, --template <template>`: The template to use (e.g. `vite`, `next`).
- `-y, --yes`: Skip confirmation prompt.
- `-c, --cwd <cwd>`: The working directory.
- `--css-variables`: Use CSS variables for theming (default: `true`).

---

## add
Use the `add` command to add components and dependencies to your project.
```bash
pnpm dlx shadcn@latest add [component]
```

### Options
- `-o, --overwrite`: Overwrite existing files.
- `-a, --all`: Add all available components.
- `-p, --path <path>`: The path to add the component to.

---

## apply
Use the `apply` command to apply a preset code to an existing project.
```bash
pnpm dlx shadcn@latest apply [preset]
```

---

## search / list
Use the `search` command to search for items from registries.
```bash
pnpm dlx shadcn@latest search [registry]
```

---

## build
Use the `build` command to generate the registry JSON files from `registry.json`.
```bash
pnpm dlx shadcn@latest build
```
This reads your local `registry.json` and outputs single JSON files into `public/r` by default.
