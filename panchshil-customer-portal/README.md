# Panchshil Customer Portal — Front-end UI

Approved UI (v18) for the Tech Park One customer portal.
**Screens:** Dashboard · Tickets · New Ticket · My Permits · Broadcast · Waste Management

Plain **HTML + CSS + vanilla JavaScript**. No framework, no build step, no external libraries or web fonts.

> **Status — design prototype.** Every number and row is sample data. Nothing is connected to a backend; nothing is saved or sent.
> Your job: apply this UI to the live portal and connect it to the real APIs.

---

## 1. Quick start (2 minutes)

```bash
npm start            # serves on http://localhost:8080  (uses npx serve)
# or
python -m http.server 8080
```
Opening `index.html` directly in Chrome/Edge also works.

**Optional:** the JS is compact (one statement per line). Run `npm run format` once to pretty-print everything with Prettier before you start editing.

## 2. Start here

| If you want to… | Open |
|---|---|
| See the approved design exactly as signed off | `reference/approved-v18-single-file.html` |
| Know which colours / sizes to use | `docs/DESIGN_SPEC.md` |
| Connect real data | `docs/API_HOOKS.md` |
| Know how each screen should behave | `docs/QA_CHECKLIST.md` |
| Port to React / Angular / Vue | Section 7 below |

**Rule:** if anything you build looks different from `reference/approved-v18-single-file.html`, the reference wins.

## 3. Project structure

```
index.html                         All 6 screens (markup), icon sprite, CSS + JS links
css/
  tokens.css                       Colour variables (:root)
  base.css                         Global, sidebar, topbar, modal, toast, Dashboard
  components.css                   Page header, KPI cards, toolbar, popovers, table, pills, pager, forms, upload
  tickets-grid.css                 Excel-style grid (Tickets only, class .xl)
  responsive.css                   Breakpoints 1100px / 760px for list pages
  overrides.css                    Final approved refinements — MUST load last
js/
  dashboard.js                     Dashboard logic (self-contained, runs first)
  core/utils.js                    $, $$, esc(), ic(), pop(), pcls(), eye(), det()
  core/router.js                   go(view) page switching, outside-click / Esc closing
  components/kpi-cards.js          kpis(selector, items)
  components/data-table.js         T(key, config) reusable table engine
  data/sample-data.js              SAMPLE DATA ONLY — replace with API
  pages/tickets.js                 Tickets
  pages/permits.js                 My Permits
  pages/broadcast.js               Broadcast
  pages/waste.js                   Waste Management
  pages/new-ticket.js              New Ticket form
assets/images/
  panchshil-logo.png               Official logo (from Corporate ID Guideline)
  hero-eon-free-zone.webp          Dashboard banner photo
reference/
  approved-v18-single-file.html    Signed-off design. Source of truth for visuals.
docs/                              Design spec, API hooks, QA checklist
```

## 4. How the app works

**One page, six views.** Each screen is a `<div class="view" id="v-NAME">`. Only the one with class `on` is visible.

| View id | Opened by |
|---|---|
| `v-Dashboard` | Sidebar |
| `v-Tickets` | Sidebar, "View tickets ↗" |
| `v-NewTicket` | "Add" on Tickets, "+ Raise a ticket", quick action |
| `v-My Permits` | Sidebar |
| `v-Broadcast` | Sidebar, "Property announcements" quick action |
| `v-Waste Management` | Sidebar |

- `go('Tickets')` switches view. Sidebar buttons use `data-nav="…"`; in-page links use `data-go="…"`.
- **Load order matters.** Scripts are classic `<script>` tags sharing one global scope. Keep the order in `index.html`.
- **CSS order matters.** `overrides.css` must be last.
- **Icons:** inline SVG sprite at top of `<body>`. Use `<svg class="ic"><use href="#i-NAME"/></svg>`. Available: search, filter, sort, grid, plus, eye, chev, left, check, msg, doc, clock, pen, box, x, redo, hour, list, star, cal, up, down, calx, bin, pct, clip, upl, hide.
- **Modal:** one shared `<dialog id="modal">`. Open with `pop(title, html)`.
- `js/dashboard.js` also binds the sidebar; `router.js` replaces those handlers. That is intentional.

## 5. Reusable table — `T(key, config)`

Required elements (replace `key`, e.g. `tk`):
`input[data-q=key]` search · `#key-h` thead · `#key-b` tbody · `#key-p` pager · `#key-chips`.
Optional popovers: `#key-f` filter, `#key-s` sort, `#key-c` columns, each opened by a `button[data-pop="key-f"]` etc.

| config | meaning |
|---|---|
| `data` | array of row objects |
| `id` | field used by the eye/view button |
| `searchKeys` | fields the search box matches (contains, case-insensitive) |
| `cols` | `{k, t, num?, cls?, w?, r?(row), menu?:false, lock?}` — `r` custom renderer, `num` numeric sort, `lock` can't hide |
| `filters` | `[{k, t}]` — dropdown options built from distinct values |
| `view(row)` | eye-button handler |
| `empty`, `emptyIcon` | empty-state title/text and icon |

Returns `{ render }`. After changing `data`, call `render()`:
```js
const rows = await (await fetch('/api/tickets')).json();
TK.length = 0; TK.push(...rows); tk.render();
```

## 6. Before production — checklist

1. Replace all sample data with API calls → `docs/API_HOOKS.md`.
2. For large lists, move search / filter / sort / paging to the server (engine is in-memory).
3. Dashboard ticket counts are hard-coded in `js/dashboard.js` (`tickets` array) — wire to API.
4. New tickets get a demo ID and `P5 - Low`. Server must assign both.
5. Permit "Add" opens a demo form (from `dashboard.js`). Build the real permit flow.
6. Always use `esc()` for any user/API text inserted with `innerHTML`.
7. Get the logo usage cleared by Corporate Communications (manageccd@panchshil.com) and confirm rights for the banner photo.
8. Test against `docs/QA_CHECKLIST.md` and compare with the reference file.

## 7. Porting to a framework

| Here | Becomes |
|---|---|
| each `.view` in `index.html` | a route / page component |
| `go(view)` | router navigation (`/dashboard`, `/tickets`, `/tickets/new`, `/permits`, `/broadcast`, `/waste`) |
| `T(key, config)` | a `<DataTable config={…} />` component (same config shape) |
| `kpis()` | a `<KpiCards items={…} />` component |
| `pop()` | a shared Modal component |
| `css/*.css` | keep as global CSS, or move each block into its component; fold `overrides.css` into the components it touches |
| `tokens.css` | theme variables |

## 8. Notes

- Fonts: system sans (Segoe UI on Windows, San Francisco on Apple) for body; Georgia for headings. Intentional — no web fonts.
- Browser support: latest Chrome, Edge, Safari, Firefox. Uses `<dialog>`, CSS `mask-image`, `backdrop-filter`.
- Sidebar becomes a top bar under 760px.
