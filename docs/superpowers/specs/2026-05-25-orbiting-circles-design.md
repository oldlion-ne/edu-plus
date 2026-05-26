# Spec: Orbiting Circles Linkages Integration

**Date:** 2026-05-25  
**Topic:** Orbiting Circles  
**Status:** Approved  
**Author:** Antigravity (AI Assistant)

## Goal

Replace the static network diagram in the "Institutional Linkages & Networks" section of the global expert council page (`c:\edu-plus\app\src\pages\Council.tsx`) with a highly interactive, animated concentric orbiting circles component from Magic UI.

## Architecture & Components

### 1. `OrbitingCircles` Component
- **File:** `c:\edu-plus\app\src\components\ui\orbiting-circles.tsx`
- **Purpose:** A reusable component that takes children and positions them at calculated angular offsets along a circle of a specified radius, animating their rotation using CSS variables.
- **Customizations:**
  - Avoid forcing round styles (`rounded-full`) or explicit square dimensions (`size-(--icon-size)`) on the children wrapper. This allows the rectangular badge shapes of the partner nodes to render naturally.
  - Implement a standard React utility structure using the project's styling pattern.
  - Add support for a "pause on hover" state, so users can hover their cursor over an orbiting badge to read details/tooltips without chasing the moving element.

### 2. Global CSS Configurations
- **File:** `c:\edu-plus\app\src\index.css`
- **Purpose:** Declare the `@keyframes orbit` and `.animate-orbit` classes for Tailwind v3 compatibility.
- **Keyframe Logic:**
  - Rotate elements while counter-rotating their contents, keeping the text upright during the orbit sequence.

### 3. Integration & Styling
- **File:** `c:\edu-plus\app\src\pages\Council.tsx`
- **Component to modify:** `PartnerNetworkIllustration`
- **Details:**
  - Center element: The "Edu+" badge with a subtle neon glow.
  - Inner Orbit (Radius: 100px, Duration: 24s, Clockwise):
    - SG MOE (Ministry of Education, Singapore)
    - US ECE (Early Childhood Education Center, Dallas)
    - GOONJ NE (Grassroots Community Development, North East India)
  - Outer Orbit (Radius: 180px, Duration: 36s, Counter-clockwise):
    - KR LAB (Green Hydrogen & Energy Lab, South Korea)
    - MARITIME (Indian Maritime University)
    - POWERICA (Corporate Legal & Renewable Energy Advisory)
  - Add standard interactive tooltip titles on each partner node.

## Verification & Testing
- Compile and run development server locally.
- Validate in browser:
  - Check that all six nodes rotate around "Edu+".
  - Ensure inner and outer rings rotate in opposite directions.
  - Ensure text stays upright and readable throughout rotation.
  - Hover over a node to check if the orbit pauses and details tooltip is displayed correctly.
