# API Hooks
Sample data lives in `js/data/sample-data.js` and a few page files. Endpoint names are **suggestions** — use your real routes.

| Screen | Where | Now | Connect to (suggested) |
|---|---|---|---|
| Dashboard metrics | `js/dashboard.js` (`tickets`, `permits`) | Hard-coded | `GET /dashboard/summary?from&to` |
| Dashboard date range | `js/dashboard.js` (`#apply`) | Label only | Re-fetch summary |
| Dashboard export | `js/dashboard.js` (`#export`) | Sample CSV | Server export |
| Tickets list | `TK` → `pages/tickets.js` | 4 rows | `GET /tickets` |
| Ticket detail | `view:` in `pages/tickets.js` | From row | `GET /tickets/{id}` |
| Categories | `subs` in sample-data | Placeholder | `GET /tickets/categories` |
| Create ticket | `#nt` submit in `pages/new-ticket.js` | Local only | `POST /tickets` (multipart) |
| Permits + 8 KPIs | `pages/permits.js` | Empty / 0 | `GET /permits`, `/permits/summary` |
| Permit application | `data-form="permit"` → `js/dashboard.js` | Demo form | Real permit flow |
| Broadcast + 6 KPIs | `pages/broadcast.js` | Empty / 0 | `GET /broadcasts`, `/broadcasts/summary` |
| Waste list | `WS` → `pages/waste.js` | 12 rows | `GET /waste/generations` |
| Waste cards | Static HTML in `index.html` (`.kpis.wk`) | 2,29,273 / 36.99% | `GET /waste/summary` — update the two `.kn` values |
| Property switcher | Topbar `<select>` | 1 option | `GET /me/properties` |
| Account | `#account` in `js/dashboard.js` | Demo | Profile / sign-out |

## Row shapes
```js
// Ticket — pr must contain P1..P5 for pill colour
{ sr: 1, id: '2722-10192', pr: 'P3 - High', desc: '...', cat: '...' }
// Permit
{ id, ref, type, for, by, st, loc, on }
// Broadcast
{ sr, title, on, st, exp, att }
// Waste — cat must be one of `cats` for pill colour
{ id: 32280, dt: '11/02/2025 17:38', u: 'Bhushan Shinde', em: '...', cat: 'Paper Waste', bags: 0, qty: 121 }
```
Permit and Broadcast have no eye/view handler yet — add `r: x => eye(x.id)` and a `view:` once real data exists.

## Swap data at runtime
```js
const rows = await (await fetch('/api/tickets')).json();
TK.length = 0; TK.push(...rows); tk.render();
```
