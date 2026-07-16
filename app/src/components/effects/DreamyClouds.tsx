"use client";

/**
 * Soft photographic cumulus clouds drifting across a periwinkle-to-pink dream sky — layered for depth, with lit tops and cool shadowed undersides.
 */

import ShaderCanvas from "./shader-canvas";

const FRAGMENT_SHADER = /* glsl */ `
      // iq-style double domain warp → billowy, self-similar cloud structure
      float cloudShape(vec2 p) {
        vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
        vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)),
                      fbm(p + 4.0 * q + vec2(8.3, 2.8)));
        return fbm(p + 4.0 * r);
      }

      // one drifting cloud layer → vec4(colour, density)
      vec4 cloudLayer(vec2 uv, float aspect, float scale, float spd, float cover) {
        vec2 p = vec2(uv.x * aspect, uv.y) * scale + vec2(time * spd, 0.0);
        float d = cloudShape(p);
        float density = smoothstep(cover, cover + 0.16, d);   // soft rounded masses
        // self-shadow: brighter where the cloud lifts toward the light (up),
        // cool blue-grey where it falls into the underside.
        float below = cloudShape(p + vec2(0.0, -0.14));
        float lift = clamp((d - below) * 3.5 + 0.55, 0.0, 1.0);
        // Nordic Lagom palette: charcoal shadow, soft amber/gold lit tops
        vec3 shadowC = vec3(0.06, 0.06, 0.07);
        vec3 litC = vec3(0.30, 0.25, 0.10);
        return vec4(mix(shadowC, litC, lift), density);
      }

      void main() {
        vec2 uv = uv01();
        float aspect = resolution.x / resolution.y;

        // Nordic Lagom Sky: warm charcoal base
        vec3 col = mix(vec3(0.04, 0.04, 0.04), vec3(0.08, 0.08, 0.08),
                       smoothstep(0.35, 1.0, uv.y));
        col = mix(col, vec3(0.12, 0.10, 0.08), smoothstep(0.4, 0.0, uv.y)); // horizon warmth

        // Soft hazy amber light high in the sky
        float sd = distance(vec2(uv.x * aspect, uv.y), vec2(0.5 * aspect, 0.92));
        col += vec3(0.98, 0.75, 0.14) * smoothstep(0.9, 0.0, sd) * 0.15;

        // two layers → depth: a faint far bank behind brighter near clouds
        vec4 far = cloudLayer(uv, aspect, 1.3, 0.012, 0.55);
        col = mix(col, far.rgb, far.a * 0.55);
        vec4 near = cloudLayer(uv, aspect, 2.1, 0.025, 0.50);
        col = mix(col, near.rgb, near.a);

        // amber glow on cloud tops
        col += near.a * smoothstep(0.8, 1.0, near.r) * 0.20;

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
