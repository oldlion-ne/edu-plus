---
title: Skills
description: Give your AI assistant deep knowledge of shadcn/ui components.
---

# Skills

Skills give AI assistants like Claude Code project-aware context about shadcn/ui. When installed, your AI assistant knows how to find, install, compose, and customize components using the correct APIs and patterns for your project.

The skill reads your project's `components.json` and provides the assistant with your framework, aliases, installed components, icon library, and base library so it can generate correct code on the first try.

---

## Install

```bash
npx skills add shadcn/ui
```

This installs the shadcn skill into your project. Once installed, your AI assistant automatically loads it when working with shadcn/ui components.

---

## What's Included

The skill provides your AI assistant with the following knowledge:

### 1. Project Context
On every interaction, the skill runs `shadcn info --json` to get your project's configuration: framework, Tailwind version, aliases, base library (`radix` or `base`), icon library, installed components, and resolved file paths.

### 2. CLI Commands
Full reference for all CLI commands: `init`, `add`, `search`, `view`, `docs`, `diff`, `info`, and `build`. Includes flags, dry-run mode, and smart merge workflows.

### 3. Theming and Customization
How CSS variables, OKLCH colors, dark mode, custom colors, border radius, and component variants work.

### 4. Registry Authoring
How to build and publish custom component registries: `registry.json` format, item types, file objects, dependencies, CSS variables, building, hosting, and user configuration.
