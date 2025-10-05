# 🏇 Next-to-Go Races

A lightweight Vue 3 + Vite + TypeScript app that lists the next five races from the Neds Racing API
.
It updates live every second, automatically removes finished races after one minute, and lets users filter by race type.

The UI supports brand themes (Blue, Red, Purple) and light/dark mode, remembering your last choice and syncing with your system preference.

# ⚙️ Overview

- Real-time countdowns — updated every second.
- Auto polling — fetches new races every 15 seconds.
- Category filter — Greyhound, Harness, Horse.
- Theme switcher — brand + light/dark, persisted in localStorage.
- Tailwind v4 styling — token-based colors, not using @apply as it causes errors
- Pinia store — handles polling, sorting, and expiry.
- Vitest + Testing Library — component and store coverage.

# 🗂️ Project structure
```
src/
components/        # UI components (RaceCard, RaceList, FooterBar, etc.)
composables/       # useBrandTheme composable
stores/            # Pinia store for races
styles/            # Tailwind and brand/theme variables
types/             # Type definitions and constants
App.vue
main.ts
```

# 🚀 Run locally
```
# Note: I'm using node version 22.20.0 via nvm when creating this project
# Install dependencies
npm install

# dev mode
npm run dev

# generate prod build
npm run build

# runs Vite prod built + netlify functions together
npx netlify dev
```

Then open <http://localhost:5173> in your browser.

The app calls the public API: (No authentication required.)
<https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10>

# ☁️ API Proxy

Because the public Neds Racing API doesn’t send CORS headers, browser requests from Netlify would fail by default.
To fix that, I created a small Netlify serverless function that proxies requests to the Neds endpoint and adds permissive CORS headers.

In development, the app calls the Neds API directly.
In production, it automatically switches to use the Netlify proxy (/api/nextraces), which keeps everything working without browser extensions or manual CORS tweaks.

# 🧪 Tests and coverage
```
# run all tests
npm run test

# run a specific test
npm run test -t "RaceCard"

# run coverage
npm run coverage
```

Coverage excludes config and setup files:
- postcss.config.js
- tailwind.config.js
- src/main.ts
- vite.config.ts

# 🎨 Favicon
Add your favicon to:
/public/favicon.png

Then ensure your index.html includes:
`<link rel="icon" type="image/png" href="/favicon.png" />`
