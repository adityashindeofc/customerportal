# Panchshil Customer Portal — UI Handover (v3)

Front-end design prototype for the Tech Park One customer portal. Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no external fonts or libraries.

> **Status:** design prototype. Every number and record comes from **sample data** (`js/data/sample-data.js`) and the code inside `js/dashboard.js`. Nothing is connected to a backend, and nothing is saved or sent.

## 1. Run it
Open `index.html` in Chrome or Edge. Double-clicking it works, or serve the folder:
```
npx serve .        # or: python -m http.server 8080
```

## 2. Folder structure
```
index.html                    Markup for all screens + inline SVG icon sprite + script tags
css/
  tokens.css                  Colour variables (:root). Change brand colours here.
  dashboard.css               Base layout (sidebar, topbar, content area) + Dashboard page
  components.css              Page header, KPI cards, toolbar, popovers, table, pills, pager, forms, upload
  tickets-grid.css            Excel-style grid for the Tickets page (wrapper class .xl)
  responsive.css              List-page breakpoints (1100px, 760px)
js/
  dashboard.js                Dashboard: metrics, date range, CSV export, modal, toast, dashboard forms
  core/utils.js               $, $$, esc(), ic(), pop() modal, pcls(), eye(), det()
  core/router.js              go(view) page switching, popover closing, Esc key
  components/kpi-cards.js     kpis(selector, [[label, value, iconId], ...])
  components/data-table.js    T(key, config): reusable table engine
  data/sample-data.js         SAMPLE DATA ONLY: TK, WS, cats, wcol, subs
  pages/tickets.js            Tickets grid config + row selection
  pages/permits.js            My Permits table + 8 KPI cards
  pages/broadcast.js          Broadcast table + 6 KPI cards
  pages/waste.js              Waste table + 2 KPI cards
  pages/new-ticket.js         New Ticket form logic
assets/images/hero.png        Dashboard hero image (AI-generated, not a photo of Tech Park One)
reference/                    Original single-file v3, the approved design. Use it to compare.
docs/
  DESIGN_SPEC.md              Colours, type, spacing, component specs
  API_HOOKS.md                Where to plug in real APIs + expected data shapes
  SCREEN_CHECKLIST.md         QA checklist for every screen and control
```

## 3. How it works
- **Single page, 6 views.** Each screen is a `<div class="view" id="v-NAME">`. `go('Tickets')` shows one view and hides the others. Sidebar buttons use `data-nav="..."`; in-page links use `data-go="..."`.
  View IDs: `Dashboard`, `Tickets`, `NewTicket`, `My Permits`, `Broadcast`, `Waste Management`.
- **Script order matters.** The files are classic `<script>` tags that share one global scope. Load order: dashboard → utils → router → kpi-cards → data-table → sample-data → pages. If you move to a bundler or framework, convert these into ES modules with explicit imports.
- **`js/dashboard.js` is self-contained.** It runs first. `router.js` then replaces the sidebar click handlers so the sidebar switches views; the dashboard's own nav pop-ups are kept only as a fallback.
- **Icons.** Inline SVG sprite at the top of `<body>`, used as `<svg class="ic"><use href="#i-NAME"/></svg>`. Keep it inline: external sprite files don't load from `file://`.
- **Modal.** One shared `<dialog id="modal">` is used by every page through `pop(title, html)`.

## 4. Reusable table — `T(key, config)`
The table needs these elements with matching IDs: `[data-q=key]` search box, `#key-h` thead, `#key-b` tbody, `#key-p` pager, `#key-chips`. Optional popovers: `#key-f` filter, `#key-s` sort, `#key-c` columns, each opened by a `[data-pop=...]` button.

| config | meaning |
|---|---|
| `data` | array of row objects |
| `id` | field used by the eye/view button |
| `searchKeys` | fields the search box matches (contains, case-insensitive) |
| `cols` | `{k, t, num?, cls?, w?, r?(row), menu?:false, lock?}`. `r` is a custom renderer; `lock` means the column can't be hidden |
| `filters` | `[{k, t}]`. Dropdown options are built from the distinct values in `data` |
| `view(row)` | called when the eye button is clicked |
| `empty`, `emptyIcon` | text and icon for the empty state |

Features: search, filter, sort (toolbar or column header ⌄), hide/show columns, removable chips, pagination (10/25/50). Returns `{render}`; call `render()` after changing `data`.

## 5. Before production
1. Replace sample data with API calls (see `docs/API_HOOKS.md`).
2. Do sorting, filtering and paging on the server for large datasets. The engine currently works on in-memory arrays.
3. Hook up the real permit application flow. "Add" on My Permits, and the dashboard quick actions, open a demo form.
4. Compress `assets/images/hero.png` (about 3 MB). Convert to WebP or JPG at about 1600px wide.
5. The New Ticket form gives every new ticket priority `P5 - Low` and a demo ID. The server should assign both.
6. Fonts are system fonts (Segoe UI / San Francisco) for body text and Georgia for headings, as in v3.
7. Data is put on the page with `innerHTML`; text fields are escaped with `esc()`. Keep using `esc()` for any user or API text.
