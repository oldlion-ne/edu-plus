---
title: Theming
description: Using CSS variables and theme tokens.
---

# Theming

We use and recommend CSS variables for theming. This gives you semantic theme tokens like `background`, `foreground`, and `primary` that components use by default. Override those tokens in your CSS to change the look of your app without rewriting component classes.

```tsx
<div className="bg-background text-foreground" />
```

To use CSS variables for theming, set `tailwind.cssVariables` to `true` in your `components.json` file. This is the default.

---

## Token Convention

We use semantic background and foreground pairs. The base token controls the surface color and the `-foreground` token controls the text and icon color that sits on that surface.
For example, `primary` pairs with `primary-foreground`.

Given the following CSS variables:
```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

The background color of the following component will be `var(--primary)` and the foreground color will be `var(--primary-foreground)`.
```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

---

## Theme Tokens

| Token | What it controls | Used by |
|---|---|---|
| `background` / `foreground` | The default app background and text color. | The page shell, page sections, and default text. |
| `card` / `card-foreground` | Elevated surfaces and the content inside them. | `Card`, dashboard panels, settings panels. |
| `popover` / `popover-foreground` | Floating surfaces and the content inside them. | `Popover`, `DropdownMenu`, `ContextMenu`. |
| `primary` / `primary-foreground` | High-emphasis actions and brand surfaces. | Default `Button`, selected states, badges. |
| `muted` / `muted-foreground` | Subtle surfaces and lower-emphasis content. | Descriptions, empty states, subdued surfaces. |
| `accent` / `accent-foreground` | Interactive hover, focus, and active surfaces. | Ghost buttons, menu highlights, selected items. |
| `border` | Default borders and separators. | Cards, menus, tables, layout dividers. |
| `input` | Form control borders and input surface. | `Input`, `Textarea`, `Select` controls. |
| `ring` | Focus rings and outlines. | Buttons, inputs, focused controls. |
| `radius` | The base corner radius scale. | Cards, inputs, buttons, popovers. |

---

## Radius Scale

`--radius` is the base radius token for your theme. We derive a small radius scale from it so components can use consistent corner sizes while still sharing a single source of truth.

```css
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}
```

In our cyber-brutalist preset, `--radius` is strictly configured to `0px` to enforce straight-line edges across all components.
