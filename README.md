<div align="center">

# FormaFlow • Creative Project Management

Design-first project operations platform that helps studios carry momentum from ideation to delivery.  
Built with Next.js 16, TypeScript, Tailwind CSS (v4), shadcn/ui primitives, and custom motion components.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://www.typescriptlang.org/) 
[![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/) 
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

</div>

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Feature Highlights](#feature-highlights)  
3. [Tech Stack](#tech-stack)  
4. [App Structure](#app-structure)  
5. [Design Brief](#design-brief)  
6. [Landing Experience](#landing-experience)  
7. [Workspace Features](#workspace-features)  
8. [Getting Started](#getting-started)  
9. [Scripts](#scripts)  
10. [Environment Variables](#environment-variables)  
11. [Seed & Demo Data](#seed--demo-data)  
12. [Testing & Quality](#testing--quality)  
13. [Deployment](#deployment)  
14. [Troubleshooting](#troubleshooting)  
15. [Roadmap](#roadmap)  
16. [License](#license)

---

## Project Overview

FormaFlow is a design-led project-management SaaS tailored for UI/UX designers, visual creatives, and creative directors. Beyond basic task lists, FormaFlow focuses on creative-specific workflows: asset versioning, annotated feedback loops, and timelines that reflect design rituals (crits, reviews, hand-off). The goal is to make creative operations feel polished, inspiring, and intuitive.

---

## Feature Highlights

- **Polished Landing Page:** Marketing experience with hero showcase, value propositions, workflow walkthrough, social proof, pricing, FAQs, and a signature CTA.  
- **Designer-Focused Messaging:** Copy, visuals, and layout built for creative teams (ZipBoard, Markup.io references).  
- **Responsive & Themed UI:** Tailwind-powered responsive design with light/dark mode toggled via custom ThemeProvider.  
- **Motion & Micro-interactions:** Framer Motion animations wrapped in `fancycomponents` for reveal, glow, and parallax effects.  
- **Workspace App:** Dashboard, Team management, and Project detail views powered by React state via `AppContext`.  
- **Shadcn/UI Primitives:** Consistent design system using cards, buttons, inputs, selects, modals, etc.  
- **SEO Ready:** Custom meta tags, OG image support, social cards.  
- **Deployable:** Optimized for Vercel (Next.js App Router) with a clear deployment playbook.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)  
- **Language:** TypeScript, React 19  
- **Styling:** Tailwind CSS v4, custom gradients, motion utilities  
- **Component Libraries:** shadcn/ui, lucide-react icons  
- **Animations:** Framer Motion wrapped via `components/animations/fancycomponents`  
- **State Management:** React Context (`AppContext`) for workspace data  
- **Notifications:** react-hot-toast  
- **Database Layer:** MongoDB placeholder utilities (`lib/db.ts`) ready for integration  
- **Tooling:** ESLint 9, TypeScript 5, Tailwind CLI  

---

## App Structure

```plaintext
app/
├─ (marketing)/           # Public marketing experience
│  ├─ layout.tsx
│  └─ page.tsx
├─ (app)/                 # Authenticated workspace routes
│  ├─ layout.tsx          # Gradient background, header/footer
│  ├─ dashboard/page.tsx  # Project dashboard
│  ├─ project/[id]/page.tsx
│  └─ team/page.tsx
├─ api/                   # API endpoints (stubbed / seeded)
├─ globals.css            # Tailwind + global theme tokens
├─ layout.tsx             # Root metadata + global providers
└─ providers.tsx          # Theme + App context + toaster

components/
├─ AppHeader.tsx          # Workspace navigation + theme toggle
├─ MarketingNav.tsx       # Landing navigation
├─ animations/fancycomponents.tsx
├─ hero/mock-dashboard.tsx
├─ theme-provider.tsx     # Custom theme context (no external deps)
└─ ui/                    # shadcn/ui primitives + custom pieces

sections/
├─ hero.tsx               # Hero block with dashboard mock & CTA
├─ why-designers-love.tsx
├─ workflow.tsx
├─ social-proof.tsx
├─ pricing.tsx
├─ faq.tsx
├─ cta.tsx
└─ footer.tsx

context/                  # AppContext = in-browser data store
lib/                      # Types, mock data generators, utilities
scripts/seed.ts           # Local demo data seeding script
```

---

## Design Brief

| Element        | Details                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Palette**    | Charcoal `#2B2D42`, Coral accent `#FF5A5F`, Indigo highlight `#6C63FF`, Soft white backgrounds. |
| **Typography** | Geist Sans + Mono via `next/font`. Headlines bold, body text airy for readability.               |
| **Spacing**    | Max width `1200px`, generous vertical rhythm (24–32px), rounded corners (24–32px radius).        |
| **Imagery**    | Mock dashboard with version timelines, annotations, approvals—visual storytelling for creatives. |
| **Motion**     | Subtle hero reveal, parallax cards, glow hover states. Performance conscious (Framer Motion).    |
| **Theme**      | Custom ThemeProvider toggles `light/dark` using `document.classList` + local storage persistence.|

---

## Landing Experience

1. **Navigation:** Logo (links to `/`), anchor links, theme toggle, CTAs for Sign In / Start free.  
2. **Hero:** Headline “Design projects. Delivered beautifully.” with CTA + dashboard mock.  
3. **Why Designers Love It:** Three value pillars with iconography (Asset versioning, Real-time feedback, Visual timelines).  
4. **Workflow:** Four-step journey (Brief → Assets → Review → Deliver) with supporting UI frame.  
5. **Social Proof:** Testimonials + logo grid for agencies (ZipBoard, Markup.io, etc.).  
6. **Pricing:** Freelancer, Studio, Agency tiers with creative language.  
7. **FAQ:** Design-specific questions (Figma integrations, version control, annotations, client access).  
8. **Final CTA:** Gradient callout encouraging teams to “Start free” or explore UI kits.  
9. **Footer:** Product/resources/company links; consistent branding.

---

## Workspace Features

- **Dashboard (`/(app)/dashboard`):**  
  - Create projects, view completion stats, track progress.  
  - Uses `ProjectCard`, range inputs, and AppContext state.

- **Project Detail (`/(app)/project/[id]`):**  
  - Task creation, assignment, completion toggles, metadata at-a-glance.  
  - Badge + progress components styled via shadcn primitives.

- **Team (`/(app)/team`):**  
  - Add/edit/remove team members with capacity, role, and stats view.  
  - Modal for editing; list aggregated from tasks.

The workspace header now includes a theme toggle and gradient background matching the marketing style.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.17  
- npm ≥ 9 (or pnpm / yarn / bun if preferred)  
- (Optional) MongoDB connection if you decide to wire persistence

### Installation

```bash
# install dependencies
npm install

# create environment file (adjust values as needed)
cp env.example .env.local

# seed demo data (optional)
npm run seed

# start dev server
npm run dev
```

Visit `http://localhost:3000` for the marketing site.  
`http://localhost:3000/dashboard` opens the workspace experience.

---

## Scripts

| Script        | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| `npm run dev` | Start Next.js in development with Turbopack                                 |
| `npm run build` | Production build (`.next/` output)                                         |
| `npm run start` | Launch production server (`next start`) after building                     |
| `npm run lint` | Run ESLint with the Next.js shareable config                               |
| `npm run seed` | Execute `scripts/seed.mjs` (requires `.env.local`) to populate mock data    |

---

## Environment Variables

`env.example` documents required values. For local development, copy to `.env.local`. Typical variables:

```
MONGODB_URI=mongodb://localhost:27017/formaflow
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Update credentials when deploying (Vercel Environment Variables).

---

## Seed & Demo Data

The `scripts/seed.mjs` script populates MongoDB with sample studios, projects, tasks, and team members.  
Run via:

```bash
npm run seed
```

Ensure MongoDB is running and `MONGODB_URI` points to the instance.

---

## Testing & Quality

- **Linting:** `npm run lint` (ESLint + Next.js rules).  
- **Type Checking:** TypeScript strict mode catches type issues during build.  
- **Accessibility:** Tailwind focus states, semantic HTML, and high-contrast palette.  
- **Manual QA:** 
  - Marketing site responsive review (mobile → desktop).  
  - Theme toggle checks (marketing + workspace).  
  - Context actions (create projects, assign tasks, manage team).

Automated tests are not yet included; consider adding Playwright or Vitest coverage in future iterations.

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub (or GitLab/Bitbucket).  
2. Import the repository into Vercel.  
3. Configure environment variables under *Settings → Environment Variables*.  
4. Vercel will run `npm install`, `npm run build`, and `npm run start` automatically.  
5. Configure a custom domain and preview branches as needed.

### Self-Hosted / Docker

1. Build locally: `npm run build`.  
2. Run `npm run start` behind your process manager (PM2) or containerize.  
3. Ensure `.next`, `public`, and `node_modules` are included in the runtime environment.  
4. Set `PORT` and `HOSTNAME` environment variables if deviating from defaults.

---

## Troubleshooting

| Issue | Fix |
| ----- | --- |
| `npm install` peer dependency warning | Using React 19; ensure dependencies support it (already handled). |
| Duplicate route error (`You cannot have two parallel pages...`) | Ensure legacy `/app/team` directory is removed (now under `(app)/team`). |
| Theme toggle not working | Confirm `ThemeProvider` wraps both marketing + app routes (`app/providers.tsx`). |
| Unable to find mock animation components | Check `components/animations/fancycomponents.tsx` path & TS path aliases in `tsconfig.json`. |
| OG image missing | Add `public/og-formaflow.png` before deploying. |

---

## Roadmap

- [ ] Persist data via MongoDB (API routes currently stubbed).  
- [ ] Add authentication (NextAuth, Clerk, or custom).  
- [ ] Expand marketing resources section (blog, case studies).  
- [ ] Integrate analytics/events for CTA performance.  
- [ ] Build automated tests and visual regression suite.  
- [ ] Add multi-brand support and workspace settings UI.

---

## License

MIT © 2025 namanxdev • Built for creative teams who believe process should feel as good as the work they deliver.
