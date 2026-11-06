# API Hooks — where to connect real data

All sample data lives in `js/data/sample-data.js`. Replace each constant with an API call, then call the table's `render()` (or rebuild the KPI cards). Endpoint names below are **suggestions**; use your backend's actual routes.

| Screen | File | Currently | Replace with (suggested) |
|---|---|---|---|
| Dashboard metrics | `js/dashboard.js` (`tickets`, `permits` arrays) | Hard-coded counts | `GET /dashboard/summary?from&to` |
| Dashboard date range | `js/dashboard.js` (`#apply`) | Updates the label only | Re-fetch summary for the selected range |
| Dashboard export | `js/dashboard.js` (`#export`) | Sample CSV | Server export or CSV built from live data |
| Tickets list | `TK` in `sample-data.js` → `pages/tickets.js` | 4 rows | `GET /tickets` |
| Ticket detail (eye) | `view:` in `pages/tickets.js` | Modal from row data | `GET /tickets/{id}` |
| Ticket categories | `subs` in `sample-data.js` | Placeholder list | `GET /tickets/categories` (with sub-categories) |
| Create ticket | `#nt` submit in `pages/new-ticket.js` | Adds to array; demo ID; P5 | `POST /tickets` (multipart for attachments) |
| Permits list + 8 KPIs | `pages/permits.js` | Empty / 0 | `GET /permits`, `GET /permits/summary` |
| Permit application | `data-form="permit"` → `js/dashboard.js` form() | Demo modal | Real permit form/route |
| Broadcast list + 6 KPIs | `pages/broadcast.js` | Empty / 0 | `GET /broadcasts`, `GET /broadcasts/summary` |
| Waste list | `WS` in `sample-data.js` → `pages/waste.js` | 12 rows | `GET /waste/generations` |
| Waste KPIs | `pages/waste.js` | 2,29,273 / 36.99% | `GET /waste/summary` |
| Property switcher | Topbar `<select>` in `index.html` | One option | `GET /me/properties`; reload data on change |
| Account (avatar) | `#account` in `js/dashboard.js` | Demo modal | Profile / sign-out |

## Row shapes the UI expects
```js
// Ticket
{ sr: 1, id: '2722-10192', pr: 'P3 - High', desc: '...', cat: '...' }
// Priority must contain "P<n>" (P1–P5) for pill colours.

// Permit (columns already defined)
{ id, ref, type, for, by, st, loc, on }

// Broadcast
{ sr, title, on, st, exp, att }

// Waste generation
{ id: 32280, dt: '11/02/2025 17:38', u: 'Bhushan Shinde', em: '...', cat: 'Paper Waste', bags: 0, qty: 121 }
// cat must be one of `cats` for the pill colour mapping (wcol).
```
Permit and Broadcast tables have no `eye`/`view` handlers yet. Add `r: x => eye(x.id)` to the Actions/View column and a `view:` function once real data exists.

## Swapping data at runtime
```js
const res = await fetch('/api/tickets'); const rows = await res.json();
TK.length = 0; TK.push(...rows); tk.render();
```
