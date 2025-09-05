# README.md

# Teacher Calendar (React + TypeScript + RTK + Tailwind v4)

Interactive teacher schedule calendar:
- 30-minute time slots;
- Available (green), Booked (red, 30/60/90 min), and Off-hours (gray);
- Clickable cells (slot/lesson callbacks);
- Views: Day / 3 days / Week with responsive auto-switching and swipe navigation.

## Tech Stack
- **React 18 + TypeScript**
- **Redux Toolkit** (calendar data + view state)
- **React Router DOM**
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **date-fns / date-fns-tz v3** (time zones & day splitting)
- Minimal UI atoms (Button/Input). Can be swapped to **shadcn/ui** later.

---

## Quick Start

```bash
# install deps
npm i

# if anything is missing:
npm i @reduxjs/toolkit react-redux react-router-dom date-fns date-fns-tz

# dev
npm run dev

# production build
npm run build
npm run preview
Tailwind v4: use a single import in src/index.css:
```

css
@import "tailwindcss";
and enable the Vite plugin in vite.config.ts:

ts
import tailwind from "@tailwindcss/vite";
// ...
plugins: [react(), tailwind()];
Scripts
dev — local development server (Vite)

build — production build

preview — preview production build

lint — linting (if ESLint is configured)

typecheck — TypeScript check (if script added)

Project Structure
bash
Copy code
src/
├─ app/
│  ├─ App.tsx
│  └─ routes/
│     └─ CalendarPage.tsx        # demo wiring (seed data)
├─ features/
│  └─ calendar/
│     ├─ components/
│     │  ├─ CalendarView.tsx     # toolbar, responsive, swipe, grid container
│     │  ├─ CalendarGrid.tsx     # CSS Grid: time axis + days
│     │  ├─ TimeAxis.tsx         # sticky time column
│     │  ├─ DayColumn.tsx        # per-day: slots + lessons
│     │  ├─ SlotCell.tsx         # slot cell (available/off)
│     │  └─ LessonBlock.tsx      # lesson block (30/60/90)
│     ├─ hooks/
│     │  ├─ useResponsiveView.ts # auto day/3days/week by breakpoints
│     │  └─ useSwipeNav.ts       # swipe navigation
│     ├─ model/
│     │  ├─ types.ts
│     │  └─ constants.ts
│     ├─ store/
│     │  ├─ calendarSlice.ts     # schedule, lessons, granularity
│     │  ├─ viewSlice.ts         # view + startDate
│     │  └─ selectors.ts
│     └─ utils/
│        ├─ time.ts              # slots, overlap, split across midnight
│        └─ grid.ts              # grid row/col math
├─ store/
│  ├─ index.ts                   # configureStore
│  └─ hooks.ts                   # typed redux hooks
├─ components/ui/                # basic atoms (button, input)
├─ lib/utils.ts                  # cn()
├─ main.tsx
└─ index.css
Path alias: @ → src (Vite + TS paths).

TypeScript tip: with "verbatimModuleSyntax": true in tsconfig, import types using type-only syntax:
```bash

import type { ComponentProps } from "react";
Data Contracts
ts
Copy code
type ScheduleInterval = {
  startTime: string; // ISO UTC
  endTime: string;   // ISO UTC
};

type Lesson = {
  id: number | string;
  duration: 30 | 60 | 90;
  startTime: string; // ISO UTC
  endTime: string;   // ISO UTC
  student: string;
  bookedByOther?: boolean; // when true -> no interaction
};
Schedule intervals may cross midnight — utilities split them into per-day chunks in local TZ.

Slots are marked available/off-hours by intersecting with per-day availability.

Environment Variables
ini
Copy code
# .env.local (do not commit)
VITE_API_BASE_URL=https://api.example.com
VITE_TIMEZONE=Europe/Warsaw   # optional; falls back to browser TZ
Secrets: Telegram Bot tokens and any private keys must live on a backend (server/serverless).
The frontend should call your backend (proxy) via VITE_API_BASE_URL.

Notes & Gotchas
date-fns-tz v3: use toZonedTime / fromZonedTime
(replaces legacy utcToZonedTime / zonedTimeToUtc).

Tailwind v4: no @tailwind base/components/utilities; use a single @import "tailwindcss";.

React <input>: is a void element → no children and no dangerouslySetInnerHTML.

Roadmap
1) Layout Refactor & Design System
Adopt full shadcn/ui primitives (Button, Tooltip, ContextMenu, ToggleGroup).

Centralize tokens/theme via Tailwind v4 @theme (colors for available/booked/off).

Add “current time” indicator and smooth scroll-to-now.

Definition of Done

Consistent spacing/radii/typography.

Context menu on lessons (view/reschedule/cancel).

Tooltips/Badges for student name & duration.

2) Mobile Experience
Scroll-snap by day, sticky time axis and sticky day headers.

Larger touch targets (≥44px), touch-action tuning, reduced hover effects on mobile.

Swipe left/right to navigate date ranges.

Long-press for context actions on lessons.

DoD

Lighthouse Mobile ≥ 90 (incl. Accessibility).

No horizontal jitter while scrolling.

3) Telegram API Integration
Goal: receive lesson events (create/cancel/update) and live-update the calendar.

Architecture

Backend (serverless/Node): /tg/webhook + /api/calendar JSON.

Frontend: GET /api/calendar?from=…&to=…, live updates via SSE/WebSocket.

Steps

Deploy API proxy (e.g., Cloudflare Workers/Vercel).

Set Telegram Bot webhook to backend.

Map updates → Lesson / ScheduleInterval.

RTK thunks for fetch/subscribe; normalized entities.

DoD

New Telegram lesson appears in current view in < 1s.

Time conflicts are detected and highlighted.

4) AI “Calendar Orchestrator”
MVP (heuristics):

Suggest nearest available slots for 30/60/90 with preferences (continuous blocks, minimal gaps, preferred hours).

Auto alternatives on conflicts.

V2 (LLM-assistant via backend):

Weekly load analysis, rebalancing suggestions.

Natural queries: “Book Kim for 60 min on Tue after 14:00”.

Rationale for decisions + undo log.

UI

“Suggest” panel with ranked slots; “Apply” to commit and sync to API.

DoD

≥95% collision-free suggestions on covered scenarios.

Undo support and audit trail.

Contributing
Branches: main (prod), dev (integration), features → feat/*.

Conventional Commits (feat:, fix:, chore:).

PRs: short description + screenshots/video.

License
MIT (change if needed).

yaml
Copy code

---

```gitignore
# .gitignore

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
# lockfiles (uncomment the one you use if you prefer committing it)
package-lock.json
pnpm-lock.yaml
yarn.lock

# Build
dist/
build/
.cache/
.tmp/

# Env (keep examples only)
.env
.env.*
!.env.example

# OS / Editor
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/

# Tests / Coverage
coverage/
*.lcov

# Logs
*.log
logs/

# Vite artifacts
vite.svg
