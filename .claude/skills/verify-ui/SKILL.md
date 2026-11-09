---
name: verify-ui
description: Verify a UI change on the IEEE-SJCE site - production build, image paths, and a light/dark/mobile check of the affected pages. Use after editing components, pages, or styles, and before committing.
---

Verify the current UI changes end to end. Report each step's result plainly; if something fails, show the error and explain the likely cause in beginner-friendly terms.

1. **Find what changed**: `git diff --name-only` and `git status --short`. Map changed files in `src/components/`, `src/pages/`, `src/styles/` to the routes they affect (routes are in `src/App.jsx`: `/`, `/home`, `/societies`, `/boards`, `/gallery`, `/contact`, `/team`).

2. **Lint + production build**: run `npx eslint <changed .js/.jsx files>` and fix any *new* errors in those files (the repo has some older lint errors elsewhere — leave them unless asked). Then run `npm run build`; it must succeed. Note any new build warnings (e.g. large chunks) but don't treat them as failures.

3. **Image paths**: for every `/photos/...` or other `public/` asset path referenced in the changed files, confirm the file exists with *exactly* that case via `git ls-files public/...` (Vercel is case-sensitive; Windows is not). Untracked new images must also be `git add`-ed or they won't deploy.

4. **Visual check** in both themes and at mobile width:
   - If a browser tool is available (Playwright, Claude in Chrome, or the built-in browser), start `npm run dev` in the background and screenshot each affected route at desktop (1280px) and mobile (390px), in dark mode (default) and light mode (toggle the theme button, or run `localStorage.setItem('ieee-theme','light')` then reload).
   - Otherwise, give me a short checklist of exactly what to look at for each affected route: text contrast in light mode, hardcoded colors that ignore the `.light` class, overflow/horizontal scroll and stacking at `max-width: 767px`, and animations (GSAP/Framer Motion) behaving on mobile.

5. **Summary**: a pass/fail line for build, image paths, and each theme/viewport combination checked.
