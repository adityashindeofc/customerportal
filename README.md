# Panchshil Customer Portal — Front-end UI (v10)

Approved UI for the Tech Park One customer portal: **Dashboard, Tickets, New Ticket, My Permits, Broadcast, Waste Management**.
Plain HTML + CSS + vanilla JavaScript. No framework, no build step, no external libraries or web fonts.

> **Status: design prototype.** All numbers and rows are sample data. Nothing is connected to a backend; nothing is saved or sent.
> The vendor's job is to apply this UI to the live portal and wire it to the real APIs (see `docs/API_HOOKS.md`).

## Run locally
```bash
# any static server works
npx serve .
# or
python -m http.server 8080
```
Then open `http://localhost:8080`. Opening `index.html` directly also works.

## Project structure
```
index.html                      All screens + inline SVG icon sprite + CSS/JS links
css/
  tokens.css                    Colour variables (:root)
  base-dashboard.css            Sidebar, topbar, content, modal, toast, Dashboard
  components.css                Page header, KPI cards, toolbar, popovers, table, pills, pager, forms, upload
  tickets-grid.css              Excel-style grid on Tickets (.xl)
  responsive.css                Breakpoints 1100px / 760px for list pages
  refinements.css               Final approved tweaks: hero blend, compact cards, waste cards — load LAST
js/
  dashboard.js                  Dashboard logic (self-contained)
  core/utils.js                 $, $$, esc(), ic(), pop(), pcls(), eye(), det()
  core/router.js                go(view): page switching, popover closing, Esc
  components/kpi-cards.js       kpis(selector, [[label, value, iconId], ...])
  components/data-table.js      T(key, config): reusable table engine
  data/sample-data.js           SAMPLE DATA ONLY — replace with API
  pages/*.js                    One file per page
assets/images/hero-eon-free-zone.webp   Dashboard banner photo
reference/single-file-approved-v10.html  The approved single-file design (source of truth for visuals)
docs/                           Design spec, API hooks, QA checklist
```

## How it works
- **Single page, 6 views.** Each screen is `<div class="view" id="v-NAME">`. `go('Tickets')` shows one and hides the rest.
  Sidebar buttons use `data-nav`, in-page links use `data-go`.
  View IDs: `Dashboard`, `Tickets`, `NewTicket`, `My Permits`, `Broadcast`, `Waste Management`.
- **Load order matters.** Scripts are classic `<script>` tags sharing one global scope; keep the order in `index.html`.
  When porting to a framework/bundler, convert them to ES modules with explicit imports.
- **CSS order matters.** `refinements.css` overrides earlier files and must load last.
- **Icons.** Inline SVG sprite at the top of `<body>`, used as `<svg class="ic"><use href="#i-NAME"/></svg>`.
- **Modal.** One shared `<dialog id="modal">`, opened with `pop(title, html)`.

## Reusable table — `T(key, config)`
Needs elements: `[data-q=key]` search, `#key-h` thead, `#key-b` tbody, `#key-p` pager, `#key-chips`.
Optional popovers `#key-f` (filter), `#key-s` (sort), `#key-c` (columns), opened by `[data-pop=...]` buttons.

| config | meaning |
|---|---|
| `data` | array of row objects |
| `id` | field used by the eye/view button |
| `searchKeys` | fields searched (contains, case-insensitive) |
| `cols` | `{k, t, num?, cls?, w?, r?(row), menu?:false, lock?}` — `r` = custom renderer, `lock` = can't hide |
| `filters` | `[{k, t}]` — options built from distinct values |
| `view(row)` | eye-button handler |
| `empty`, `emptyIcon` | empty-state text and icon |

Returns `{render}`. Call `render()` after changing `data`.

## Before production
1. Replace sample data with API calls — `docs/API_HOOKS.md`.
2. Move sorting/filtering/paging server-side for large datasets (engine is in-memory).
3. Wire the real permit flow ("Add" on My Permits and dashboard quick actions open a demo form).
4. New tickets currently get a demo ID and `P5 - Low`; the server must assign these.
5. Keep using `esc()` for any user/API text inserted via `innerHTML`.
6. Confirm usage rights for the banner photo before going live.
7. Fonts: system sans (Segoe UI / San Francisco) for body, Georgia for headings — unchanged by design.
