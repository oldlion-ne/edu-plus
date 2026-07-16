"use client";

/**
 * Geometric, straight-line background shader featuring Nordic Lagom charcoal and amber intersecting blocks.
 * Originally "DreamyClouds", repurposed to meet strict brand geometry guidelines.
 */

import ShaderCanvas from "./shader-canvas";

const FRAGMENT_SHADER = /* glsl */ `
      void main() {
        vec2 uv = uv01();
        float aspect = resolution.x / resolution.y;
        vec2 p = vec2(uv.x * aspect, uv.y);
        
        // Nordic Lagom Palette
        vec3 bg = vec3(0.04, 0.04, 0.04);       // Deep charcoal background
        vec3 accent = vec3(0.55, 0.42, 0.10);   // Amber/gold accent
        vec3 lightEdge = vec3(0.75, 0.62, 0.20);// Bright amber edge highlight
        
        // Base background
        vec3 col = bg;
        
        // Rotate coordinates for diagonal geometric bands
        float angle = -0.5; // ~ -28 degrees
        float s = sin(angle);
        float c = cos(angle);
        mat2 rot = mat2(c, -s, s, c);
        vec2 rp = rot * p;
        
        // Layer 1: Wide, slow moving background structural bands
        float d1 = fract((rp.x + time * 0.05) * 2.0);
        float band1 = step(0.6, d1);
        col = mix(col, bg * 1.5, band1 * 0.5); 
        
        // Layer 2: Mid-ground intersecting amber tinted geometric blocks
        float d2 = fract((rp.x + rp.y * 0.2 - time * 0.1) * 4.0);
        float band2 = step(0.8, d2);
        col = mix(col, mix(bg, accent, 0.3), band2 * 0.6);
        
        // Layer 3: Foreground sharp amber accent lines
        float d3 = fract((rp.y * 0.5 - rp.x + time * 0.15) * 3.0);
        float band3 = step(0.9, d3);
        float edge3 = step(0.88, d3) - band3; // create a sharp highlight edge adjacent to band3
        
        col = mix(col, accent, band3);
        col = mix(col, lightEdge, edge3);
        
        // Layer 4: Vertical architectural pillars moving across
        float pillar = step(0.85, fract((p.x - time * 0.08) * 1.5));
        col = mix(col, bg * 0.8, pillar * 0.4); 
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

export default function DreamyClouds({
  className,
  dpr = 1,
  controls,
}: {
  className?: string;
  dpr?: number;
  controls?: boolean;
}) {
  return (
    <ShaderCanvas
      fragmentShader={FRAGMENT_SHADER}
      className={className}
      dpr={dpr}
      controls={controls}
    />
  );
}
