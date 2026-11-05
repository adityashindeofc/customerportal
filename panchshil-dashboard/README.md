# Panchshil Customer Portal — Dashboard UI

Front-end handoff for the redesigned customer dashboard.
Plain HTML / CSS / JavaScript — no framework, no build step, no dependencies.

---

## 1. Quick start

Open `index.html` in a browser. It runs on **mock data** by default
(`js/config.js → useMockData: true`).

To serve locally: `npx serve .` or `python -m http.server`.

---

## 2. Folder structure

```
panchshil-dashboard/
├── index.html                  Page markup — semantic, no inline styles or scripts
├── README.md                   This document
├── assets/images/
│   └── hero-building.jpg       Hero background photo (1536×1024)
├── css/
│   ├── tokens.css              Design tokens: colour, type, spacing, radius, motion
│   ├── base.css                Reset, element defaults, .icon, .eyebrow, a11y helpers
│   ├── layout.css              Sidebar, top bar, content container, breakpoints
│   └── components.css          All UI components (BEM)
└── js/
    ├── config.js               Statuses, labels, form options, mock data
    ├── api.js                  Data layer — the ONLY file that talks to the backend
    ├── render.js               Pure rendering (data → DOM), XSS-safe
    └── main.js                 State, event handling, initialisation
```

**Load order matters.**
CSS: `tokens → base → layout → components`.
JS: `config → api → render → main` (all share the `window.PCP` namespace).

---

## 3. Page layout

```
┌─────────────┬──────────────────────────────────────────────────────────┐
│             │ TOP BAR      Customer portal        [Tech Park One ▾] (TH)│
│  SIDEBAR    ├──────────────────────────────────────────────────────────┤
│             │ ┌ HERO ───────────────────────────────── photo ───────┐ │
│ Panchshil • │ │ TECH PARK ONE                                        │ │
│ CUSTOMER    │ │ Good afternoon.                                      │ │
│ PORTAL      │ │ Your requests, permits…               [Air quality] │ │
│             │ └──────────────────────────────────────────────────────┘ │
│ Dashboard   │ [date] to [date] [Apply]                [+ Raise a ticket]│
│ Tickets     │ OVERVIEW · 29 OCT 2026 – 05 NOV 2026                      │
│ My Permits  │                                                           │
│ Broadcast   │ Tickets                         Export ↓  View tickets ↗  │
│ Waste Mgmt  │ ┌ Closed │ ●Open │ Service Concerns │ Requests │ Sugg. ┐   │
│             │ │   1    │   2   │        3         │    0     │   0   │   │
│             │ └────────────────────────────────────────────────────────┘│
│             │ My permits                               View permits ↗   │
│             │ ( Total 0 │ Approved 0 │ Open 0 │ Rejected 0 │ Closed 0 )  │
│             │                                                           │
│             │ Raise a ticket ↗ │ Apply for a permit ↗ │ Announcements ↗ │
│ CUSTOMER    │ ───────────────────────────────────────────────────────── │
│ EXPERIENCE  │ PANCHSHIL · CUSTOMER PORTAL                 TECH PARK ONE │
└─────────────┴──────────────────────────────────────────────────────────┘
```

### Breakpoints

| Width | Behaviour |
|---|---|
| > 1100px | Layout as above (sidebar 222px) |
| ≤ 1100px | Sidebar narrows to 185px, tighter padding, smaller hero title and numbers |
| ≤ 760px | Sidebar becomes a horizontal scrollable nav (icons hidden) · toolbar stacks · tickets 2 columns (last item full width) · permits and quick links become vertical lists |

---

## 4. Design tokens (`css/tokens.css`)

Change visual values in this file only.

| Token | Value | Used for |
|---|---|---|
| `--color-accent` | `#df7856` | Primary button, “Open” dot, focus ring |
| `--color-accent-text` | `#b96448` | Text links, quick-link hover |
| `--color-accent-strong` | `#bc6347` | Active nav item |
| `--color-accent-number` | `#cf7658` | “Open” ticket count |
| `--color-sand` | `#c7b99b` | Avatar, button hover border |
| `--color-ink` | `#292a2c` | Headings, main text |
| `--color-muted` | `#777168` | Eyebrows, captions |
| `--color-page` | `#f8f7f4` | Page background |
| `--color-paper` | `#f6f4ef` | Sidebar |
| `--color-compact` | `#f1eee7` | Permits strip |
| `--color-line` | `#e8e3da` | Borders |
| `--font-sans` | System UI stack | Body and UI |
| `--font-serif` | Georgia | Brand, hero title, modal title |
| `--sidebar-width` | `222px` | Sidebar (185px on tablet) |
| `--content-max-width` | `1550px` | Main content |

---

## 5. Components (`css/components.css`)

Naming is **BEM**: `.block`, `.block__element`, `.block--modifier`. States use `.is-*`.

| Component | Classes | Notes |
|---|---|---|
| Brand | `.brand`, `__name`, `__sun`, `__tagline` | Can be swapped for the official logo `<img>` |
| Navigation | `.nav__list`, `.nav__item`, `.nav__icon`, `.is-active` | `aria-current="page"` set by JS |
| Property select | `.property-select` | Native `<select>`, options rendered from data |
| Avatar | `.avatar` | Initials from data |
| Hero | `.hero`, `__body`, `__title`, `__lead` | Photo on `::before`, gradient on `::after` |
| AQI badge | `.aqi-badge`, `__label`, `__value` | Shows “Not available” when `aqi` is `null` |
| Toolbar | `.toolbar`, `.date-range`, `__input`, `__sep` | |
| Range label | `.range-label` | Updates on Apply |
| Buttons | `.btn`, `.btn--primary`, `.text-btn` | |
| Section | `.section`, `__head`, `__title`, `__tools` | Tickets, My permits |
| Metric group | `.metric-group`, `.metric-group--compact` | Default = tickets panel · compact = permits strip |
| Metric | `.metric`, `__label`, `__value`, `__hint`, `__arrow`, `.metric--accent` | Arrow appears on hover / focus |
| Quick links | `.quick-links`, `__item`, `__arrow` | |
| Footer | `.site-footer` | |
| Modal | `.modal`, `__head`, `__title`, `__close`, `__body`, `__text`, `__actions` | Native `<dialog>` |
| Detail row | `.detail-row` | Used in status modal |
| Field | `.field`, `.field__control` | Form inputs |
| Toast | `.toast`, `.is-visible` | `aria-live="polite"` |

---

## 6. JavaScript

| File | Responsibility | Edit when… |
|---|---|---|
| `config.js` | Status order, labels, hints, form options, mock data | Renaming a status, adding a form option |
| `api.js` | `getDashboard()`, `createTicket()`, `createPermit()` | Connecting the backend |
| `render.js` | Builds DOM from data | Changing rendered markup |
| `main.js` | State, events, init | Adding interactions or routing |

### HTML hooks

| Attribute | Purpose |
|---|---|
| `data-action="…"` | Click → handler in `main.js → actions` |
| `data-nav="…"` | Navigation (sidebar, “View …” links, quick links) |
| `data-slot="…"` | Container JS renders into |
| `data-bind="…"` | Text filled from data: `greeting`, `property-name`, `user-initials`, `aqi`, `range-label` |
| `data-form="…"` | Form identifier: `date-range`, `request` |

**Available actions:** `new-ticket`, `new-permit`, `view-status`, `export`, `open-account`, `close-modal`.

**Add a new action:** put `data-action="my-action"` on the element, then add
`'my-action'(el) { … }` to the `actions` object in `main.js`.

**Change status order or labels:** edit `ticketStatuses` / `permitStatuses` in `config.js`.
Set `accent: true` on any ticket status to highlight it in terracotta.

---

## 7. Backend integration

1. In `js/config.js` set `useMockData: false` and the correct `apiBaseUrl`.
2. Provide these endpoints (or map existing ones inside `js/api.js`):

| Method | Endpoint | Input | Returns |
|---|---|---|---|
| GET | `/dashboard` | `?from=yyyy-mm-dd&to=yyyy-mm-dd&propertyId=…` | Dashboard payload |
| POST | `/tickets` | `{ type, subject, description }` | `{ id }` |
| POST | `/permits` | `{ type, subject, description }` | `{ id }` |

Dashboard payload:

```json
{
  "user":       { "name": "Tech Park One", "initials": "TH" },
  "property":   { "id": "tp1", "name": "Tech Park One" },
  "properties": [ { "id": "tp1", "name": "Tech Park One" } ],
  "aqi": null,
  "tickets": { "closed": 1, "open": 2, "serviceConcerns": 3, "requests": 0, "suggestions": 0 },
  "permits": { "total": 0, "approved": 0, "open": 0, "rejected": 0, "closed": 0 }
}
```

If field names differ, convert them inside `api.getDashboard()` — never in the UI files.

3. Complete the `TODO (integration)` points in `main.js`:

| Location | Replace with |
|---|---|
| Navigation handler | Real routes for Tickets, My Permits, Broadcast, Waste Management |
| `view-status` | Navigate to the filtered list, e.g. `/tickets?status=open&from=…&to=…` |
| `open-account` | Existing account menu (profile, sign out) |

---

## 8. Moving into React / Angular / Vue

- Import the four CSS files as global styles (or convert to SCSS / CSS modules — class names are framework-neutral).
- Suggested components: `Sidebar`, `Topbar`, `Hero`, `DateToolbar`, `MetricGroup` (with `compact` prop), `Metric`, `QuickLinks`, `Footer`, `Modal`, `Toast`.
- `config.js` → constants file · `api.js` → existing service layer · `render.js` and `main.js` are replaced by component templates and handlers.

---

## 9. Accessibility

- Landmarks: `aside`, `nav`, `header`, `main`, `section` with `aria-labelledby`, `footer`
- All interactive elements are native `<button>`, `<a>`, `<select>` or `<input>`
- Visible `:focus-visible` ring in the accent colour
- Metric tiles have full `aria-label` (e.g. “Open tickets: 2”)
- Native `<dialog>` handles focus and the Esc key
- Toast and range label announced via `aria-live`
- Decorative icons and arrows are `aria-hidden`
- `prefers-reduced-motion` disables transitions

## 10. Browser support

Latest Chrome, Edge, Safari and Firefox. Native `<dialog>` requires 2022+ browsers.

## 11. Image

`assets/images/hero-building.jpg` was generated with Microsoft Copilot and is **not** a photo of a
Panchshil property. Replace it with an approved brand photograph before production. Keep a similar
composition (building on the right, light open space on the left) so the gradient keeps the text
readable. Recommended: at least 1920px wide, JPG or WebP, under 400 KB.
