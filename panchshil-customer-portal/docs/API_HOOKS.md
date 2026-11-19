# API Hooks — where real data goes

Endpoint names are **suggestions**. Use the backend's actual routes.

| Screen | File / location | Today | Connect to (suggested) |
|---|---|---|---|
| Dashboard ticket counts | `js/dashboard.js` → `tickets` array | Hard-coded | `GET /dashboard/summary?from&to` |
| Dashboard date range | `js/dashboard.js` → `#apply` | Updates label only | Re-fetch summary |
| Dashboard export | `js/dashboard.js` → `#export` | Sample CSV | Server CSV export |
| Tickets list | `TK` in `js/data/sample-data.js` | 4 rows | `GET /tickets` |
| Ticket detail (eye) | `view:` in `js/pages/tickets.js` | From row | `GET /tickets/{id}` |
| Categories / sub-categories | `subs` in `sample-data.js` | Placeholder list | `GET /tickets/categories` |
| Create ticket | `#nt` submit in `js/pages/new-ticket.js` | Local only | `POST /tickets` (multipart for attachments) |
| Permits list + 8 cards | `js/pages/permits.js` | Empty / 0 | `GET /permits`, `GET /permits/summary` |
| Permit application | `data-form="permit"` → `form()` in `js/dashboard.js` | Demo modal | Real permit form |
| Broadcast list + 6 cards | `js/pages/broadcast.js` | Empty / 0 | `GET /broadcasts`, `GET /broadcasts/summary` |
| Waste list | `WS` in `sample-data.js` | 12 rows | `GET /waste/generations` |
| Waste cards | Static HTML in `index.html` (`.kpis.wk .kn`) | 2,29,273 / 36.99% | `GET /waste/summary` |
| Property switcher | Topbar `<select>` in `index.html` | 1 option | `GET /me/properties`, reload on change |
| Account avatar | `#account` in `js/dashboard.js` | Demo modal | Profile / sign-out |

## Row shapes the UI expects

```js
// Ticket — pr must contain P1..P5 for the pill colour
{ sr: 1, id: '2722-10192', pr: 'P3 - High', desc: 'Landline not working', cat: 'EPABX SYSTEM' }

// Permit
{ id, ref, type, for, by, st, loc, on }

// Broadcast
{ sr, title, on, st, exp, att }

// Waste generation — cat must be one of `cats` for the pill colour
{ id: 32280, dt: '11/02/2025 17:38', u: 'Name', em: 'email', cat: 'Paper Waste', bags: 0, qty: 121 }
```

Permit and Broadcast tables have no view handler yet. When real data exists, add `r: x => eye(x.id)` to the Actions/View column and a `view:` function.

**Privacy:** the Waste table shows the FM staff user name and email (`u`, `em`). Hide these columns for customers unless the business confirms they should be visible.
