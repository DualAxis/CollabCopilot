# CollabPilot

**Your co-pilot through every research-to-market deal.**

> Built for IDEASHACK 2026 · Jingjing Yao & Anna Szpak · May 2026

---

## What It Does

CollabPilot is an AI-guided deal navigation platform for academic researchers entering commercial partnerships. It starts where matchmaking platforms like IN-PART stop — serving the post-match journey from first handshake to signed agreement.

**The problem it solves:** University–industry deals take 3–6 months on average, often longer. Researchers are left without structured guidance on legal obligations, institutional rules, or next steps. The Lambert Toolkit exists but sees very low adoption. No interactive, researcher-facing tool has filled this gap.

**Core user flow:**
1. Researcher completes a 6-step assessment (profile + business partner → deal stage → deal type → IP status → publication status → TTO involvement)
2. Claude analyses the situation and returns a Zod-validated structured response — compliance alerts, safe actions, current stage, and a tailored 6-stage roadmap
3. Results surface institution-aware risks with visible reasoning ("Why did CollabPilot flag this?")
4. Smart Process Navigator workspace — Deal Brief, Roadmap, Checklists, Documents, and Knowledge Library — guides each stage and is fully personalised to the researcher, partner, institution, and current deal stage

---

## Demo

🎬 **Video demo:** [_insert YouTube link_]
🖥 **Live app:** https://collab-copilot-7fxd.vercel.app/

---

## What's Built

| Screen / Feature | Status |
|---|---|
| Landing page (scrollable, 3 sections) | ✅ Built |
| 6-step assessment (profile/partner → stage → deal type → IP → publication → TTO) | ✅ Built |
| Validation UX — required fields incl. research area, radio shake + helper hint | ✅ Built |
| AI engine — situation → deal type mapping | ✅ Built |
| AI engine — risk flagging (disclosure, publication timing, TTO coordination) | ✅ Built |
| AI engine — dynamic 6-stage roadmap from assessment answers | ✅ Built |
| AI engine — current stage derived from questionnaire logic (q0 default + q3 cap) | ✅ Built |
| Deterministic client-side fallback so the demo never breaks if the API rate-limits | ✅ Built |
| Animated processing screen (heartbeat icon + sequential reasoning reveals) | ✅ Built |
| Results — compliance alerts + safe actions (collapsible), persona-aware Gantt roadmap | ✅ Built |
| Persona-aware data flow (researcher, partner, institution, deal type, stage propagate everywhere) | ✅ Built |
| Account creation flow (Login → "Account created" → workspace, all persona-aware) | ✅ Built |
| Dashboard — My Deals overview with live persona-driven deal card | ✅ Built |
| Deal workspace — Deal Brief, Roadmap (with Done / In-Progress / Upcoming badges), Checklists, Documents | ✅ Built |
| Cascading checklist UX — step 3 unlocks when step 2 is ticked; live "X done · Y active · Z upcoming" counter | ✅ Built |
| Email draft modals (Forwarding-to-TTO, Holding reply) — editable & send-able | ✅ Built |
| Manual "Start New Deal" flow (name, type, context, invite parties, confirmation) | ✅ Built |
| Knowledge Library (global + deal-scoped) | ✅ Built |
| User profile page (account, role-aware plan, settings) | ✅ Built |
| Login screen (Google OAuth UI) | ✅ Built |
| Supabase persistence for assessment + analysis runs | ✅ Built |
| Mobile-responsive layout | ⚙️ In progress |

---

## AI Implementation

The AI layer translates a researcher's 6 answers into actionable deal guidance.

**What the AI does:**
1. **Situation → deal type** — maps assessment answers to the correct collaboration or licensing pathway
2. **Risk flagging by name** — flags disclosure, publication timing, and TTO coordination issues specific to the researcher's situation
3. **Dynamic roadmap** — generates a 6-stage timeline tailored to the assessment; not a static template
4. **Stage from real answers** — current deal stage is determined by deterministic questionnaire logic, not guesswork

**How it works technically:**
- Assessment state is POSTed to a Next.js Route Handler (`/api/analyse`)
- The handler calls Anthropic Claude via the **Vercel AI SDK** (`@ai-sdk/anthropic` + `generateObject`) with a system prompt and a `buildUserPrompt(state)` that injects all six answers
- Output is shaped against a strict **Zod schema** (`AssessmentResultsSchema`) before reaching the UI — invalid responses are rejected, not rendered
- A deterministic client-side `deriveCurrentStageFromState()` mirrors the prompt's stage rules so the Gantt chart and headline copy are correct even if Claude is conservative or the API fails
- On rate-limit / failure the UI gracefully falls back to `MOCK_RESULTS` so the live demo never breaks
- Each successful run is persisted to Supabase (`saveAssessment`); persistence failures are non-blocking

**Stage assignment rules:**
- `q0 = "First contact received"` → Stage 1 (Compliance & Disclosure)
- `q0 = "In discussion"` → Stage 2 (NDA & CDA)
- `q0 = "Drafting terms"` → Stage 3 (Term Sheet)
- `q0 = "Already signed"` → Stage 6 (Execution)
- Hard cap: if `q3 = "Under journal review"`, the stage is capped at 2 regardless of `q0`

**Human-in-the-Loop:** every AI output (alerts, drafted emails, suggested next actions) shows its reasoning inline and is editable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Styling | Custom design system **Compass** (CSS variables) + Tailwind 4 utility layer |
| Deployment | Vercel |
| AI / LLM | Anthropic Claude via **Vercel AI SDK** (`@ai-sdk/anthropic`, `ai` → `generateObject`) |
| Output validation | **Zod 4** — structured JSON schema enforced before the UI sees it |
| Data layer | **Supabase** — persistence of assessment runs and analysis results |
| Dev tooling | **Cursor** — AI IDE; the entire app was built spec-driven with AI pair-programming inside Cursor |

**Design prototype:** `DESIGN/collabpilot_demo5.html` — high-fidelity single-file V8 prototype used for design reference and video demo narration.

---

## Roadmap

| Phase | Scope |
|---|---|
| **MVP (submitted)** | Researcher flow — assessment, AI analysis with structured output, dynamic roadmap, persona-aware workspace, manual deal creation |
| **V1** | TTO + partner view; shared deal workspace across all three parties; real-time invite/accept flow on Supabase |
| **Scale** | Multi-institution · EU compliance layer · institution-specific rule packs · richer document automation |

---

## How to Run

**Live — no setup required:**
https://collab-copilot-7fxd.vercel.app/

**Local:**

```bash
git clone https://github.com/DualAxis/CollabCopilot.git
cd CollabCopilot
npm install
cp .env.example .env.local
# Fill in:
#   ANTHROPIC_API_KEY=                   # required
#   NEXT_PUBLIC_SUPABASE_URL=            # optional — persistence is best-effort
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=       # optional
#   SUPABASE_SERVICE_ROLE_KEY=           # optional (server-side write)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Design prototype (no setup, no API key):**
```
Open DESIGN/collabpilot_demo5.html in any modern browser.
```

---

## External Libraries Used

All open-source libraries comply with their respective licenses. Key dependencies:

- `@ai-sdk/anthropic`, `ai` — Vercel AI SDK + Claude provider
- `@supabase/supabase-js` — persistence layer
- `zod` — structured output validation
- Next.js 16, React 19, TypeScript — MIT licensed
- Tailwind CSS 4 — MIT licensed
- Google Fonts (DM Serif Display, DM Mono) — CDN, SIL Open Font License
- Google Material Symbols — CDN, Apache 2.0

---

## Team

| Name | Role |
|---|---|
| Jingjing Yao | Product, Strategy, Design, Storytelling |
| Anna Szpak | Technical Implementation, AI Integration, Product, QA |

**Event:** IDEASHACK 2026 · Submitted May 8, 2026
**Contact:** dualaxisteam@gmail.com

---

## Design System

CollabPilot is built on **Compass** — a custom design system developed for this project. Tokens cover colour, typography, and spacing. The UI uses a dark navy/teal/amber palette with DM Mono for data labels and DM Serif Display for headings.

---

*CollabPilot — starts where matchmaking platforms stop.*
