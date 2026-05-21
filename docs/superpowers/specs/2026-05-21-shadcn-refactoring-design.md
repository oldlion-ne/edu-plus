# Design Specification: Purging Legacy UI for Standardized shadcn/ui Components

## 1. Goal & Architecture
The objective is to completely remove all custom glass/panel components (`liquid-glass`, `liquid-glass-strong`), bespoke form inputs, hard-coded button layouts, custom tab selectors, and inline pseudo-UI elements across the Eduplus application. These will be replaced 100% with standard, accessible shadcn/ui primitives.

All refactored components must strictly adhere to the project's brand design tokens:
- **Dark Theme Palette**: Semantic tailwind variables (`bg-background`, `text-foreground`, `border-border`, `bg-card`, etc.) map to deep navy (`#0B0F14`) backgrounds, off-white (`#E6EDF3`) body text, and neon cyan (`#7DF9FF`) accent highlights.
- **Zero Radius Constraint**: Every single component must use absolute zero border-radius (`--radius: 0` in CSS, translated to `rounded-none` class overrides).
- **Typography**: Header tags (`h1`-`h6`) use `font-serif` (Merriweather), and body/interactive texts use `font-sans` (Outfit/Inter).

## 2. Component Refactoring Mapping Matrix

### Phase 1: Shell & Authentication UI
- **Navigation (`src/sections/Navigation.tsx`)**:
  - Main Bar: Replace `liquid-glass` containers with semantic headers: `bg-background/80 backdrop-blur-md border-b border-border`.
  - Connect Button: Mapped to `<Button variant="outline" className="rounded-none border-[#7DF9FF] text-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14]">`.
  - Mobile Menu Drawer: Replace custom state triggers and backdrop div with a real shadcn `<Sheet>` and `<SheetContent className="rounded-none border-l border-border bg-background">`.
  - Auth Buttons: Replace raw buttons with `<Button variant="ghost" className="rounded-none font-mono text-xs uppercase text-white/50 hover:text-red-400">`.
- **Authentication (`src/pages/Login.tsx`)**:
  - Outer Form Frame: Mapped to `<Card className="rounded-none border-border bg-[#0E131A]/80 shadow-[0_0_40px_rgba(11,15,20,0.85)]">`.
  - Tab Switcher: Replace `activeTab` button state grid with shadcn `<Tabs>`, `<TabsList>`, and `<TabsTrigger className="rounded-none font-mono text-[10px] uppercase">`.
  - Form Fields: Replace raw inputs with shadcn `<Input className="rounded-none border-white/10 focus-visible:ring-[#7DF9FF]">`.
  - Role Selection: Replace raw `<select>` with `<Select>`, `<SelectTrigger className="rounded-none">`, `<SelectContent className="rounded-none bg-[#0E131A] border-[#7DF9FF]/20 text-[#E6EDF3]">`, and `<SelectItem>`.
  - Submit/Clearance buttons: Mapped to `<Button className="rounded-none font-mono text-[10px] font-bold uppercase">` with standard variant classes.
- **Footer (`src/sections/Footer.tsx`)**:
  - Container: Standardized to `bg-background border-t border-border`.
  - Subscription Input: Mapped to `<Input className="rounded-none">`.
  - Subscription Button: Mapped to `<Button variant="outline" className="rounded-none border-border">`.

### Phase 2: Public Marketing & Content Pages
- **Contact (`src/pages/Contact.tsx`)**:
  - Left Office Panel & Right Form Box: Refactored into shadcn `<Card className="rounded-none border-border bg-[#0E131A]/60 backdrop-blur-sm shadow-lg">`.
  - Inputs & Textarea: Mapped to shadcn `<Input>` and `<Textarea>` with zero border-radius.
  - Stakeholder Profile Selection: Replace Select tags with standard shadcn `<Select>` family.
  - Submit Button: Mapped to `<Button className="rounded-none bg-[#7DF9FF] text-[#0B0F14] hover:bg-white w-full">`.
- **Hero / Value Proposition (`src/sections/Hero.tsx`)**:
  - Eyebrow Badge: Styled with shadcn `<Badge variant="outline" className="rounded-none border-[#7DF9FF]/30 bg-[#7DF9FF]/5 text-[#7DF9FF] font-mono">`.
  - CTAs: Replace custom `Link` borders with `<Button asChild className="rounded-none">` wrappers.
  - Stats Strip: Wrap stats list in a styled `<Card className="flex items-center gap-0 border-[#7DF9FF]/15 bg-[#0E131A]/70 rounded-none shadow-sm">`.
- **Pedigree Showcase / Services Grid (`src/sections/PedigreeShowcase.tsx` & `src/sections/ServicesMatrix.tsx`)**:
  - Purge arbitrary glass panels and replace card structures with `<Card className="rounded-none border-border bg-[#0E131A]/40">` with `Spotlight` effects kept inside bounds.
- **Telemetry Bento (`src/sections/TelemetryStats.tsx`)**:
  - Bento Layout: Replace legacy custom grid panel containers with `<Card className="rounded-none border-border bg-[#0E131A]/40 shadow-sm flex flex-col justify-between">`.
- **Pathway Simulator (`src/sections/PathwaySimulator.tsx`)**:
  - Main Panel: Map to `<Card className="rounded-none border-border bg-[#0E131A]/80 shadow-md">`.
  - Option Toggles: Map to `<Tabs>` or standard custom-styled `<Button variant="outline">` with zero border radius.

### Phase 3: Dashboard & Admin Views
- **Dashboard Core (`src/pages/Dashboard.tsx`)**:
  - Sidebar Navigation: Replace custom side-nav drawer/links with standard shadcn `<Sidebar>`, `<SidebarContent>`, `<SidebarGroup>`, `<SidebarMenu>`, `<SidebarMenuItem>`, `<SidebarMenuButton>`, and `<SidebarProvider>` with absolute zero radius.
  - Telemetry Cards & Metric Indicators: Replace custom widgets with `<Card className="rounded-none border-border bg-[#0C1016]">`.
  - Interactive Action Modals: Replace custom popups/dialogs with `<Dialog>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>` components.
  - Form Fields & Submissions: Standardize to shadcn `<Form>`, `<Input>`, `<Select>`, and `<Button>` components.

## 3. Verification Strategy
- **Static Checking**: Run `pnpm tsc -b --noEmit` to verify type safety on all new imports.
- **Test Suite Execution**: Run `pnpm test:run` to confirm that all 16 Vitest tests continue to pass without breaks.
- **Visual & Build Integrity**: Ensure production build compiling successfully via `pnpm build`.
