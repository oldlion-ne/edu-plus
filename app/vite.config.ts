import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';

  // Only load the dev-only inspect plugin in development mode
  const devPlugins = isDev
    ? [inspectAttr()]
    : [];

  return {
    base: './',
    plugins: [...devPlugins, react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.VITE_OPENROUTER_API': JSON.stringify(env.OPENROUTER_API || process.env.OPENROUTER_API || ''),
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Supabase SDK — needed for auth, lazy-loaded pages
            if (id.includes('node_modules/@supabase/')) {
              return 'chunk-supabase';
            }
            // Recharts — only needed on Dashboard
            if (id.includes('node_modules/recharts') ||
                id.includes('node_modules/d3-') ||
                id.includes('node_modules/victory-')) {
              return 'chunk-charts';
            }
            // Radix UI + Framer Motion + Sonner — UI primitives
            if (id.includes('node_modules/@radix-ui/') ||
                id.includes('node_modules/framer-motion') ||
                id.includes('node_modules/sonner')) {
              return 'chunk-ui';
            }
            // All other node_modules go into a vendor catch-all
            if (id.includes('node_modules/')) {
              return 'chunk-vendor';
            }
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest}.config.*',
        'e2e/**'
      ],
    },
  };
});
