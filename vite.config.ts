// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// When building inside GitHub Actions for GitHub Pages, the site is served from
// https://<user>.github.io/heartfelt-confetti-grams/, so assets need that base path.
const isGitHubPages = process.env["GITHUB_PAGES"] === "true";
const base = isGitHubPages ? "/heartfelt-confetti-grams/" : "/";

export default defineConfig({
  vite: {
    base,
  },
  // GitHub Pages deploys a plain static folder, so pin nitro's output to .output/public.
  nitro: isGitHubPages
    ? {
        output: {
          dir: ".output",
          publicDir: ".output/public",
          serverDir: ".output/server",
        },
      }
    : true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerendering: every route below is rendered to HTML at build time and
    // written into .output/public, which is what GitHub Pages deploys.
    pages: [{ path: "/" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
