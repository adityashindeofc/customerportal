# Design Spec — v18

## Colours
| Value | Use |
|---|---|
| `--accent` `#df7856` | Active nav, selected states, focus ring, current page, required `*`, Open count |
| `#2a2926` / `--ink` `#292a2c` | Main text, headings, dark primary buttons |
| `#5f5a52` – `#77746e` | Secondary text, labels, captions |
| `--paper` `#f6f4ef` | Sidebar background |
| `#f4f1eb` | Banner background (cream) |
| `#ebe6dd` / `--line` `#e8e3da` | Card and table borders |
| `#f3efe8`, `#f8f5f0` | Excel-grid header and first column |
| `#fbe9e1` | Selected grid row (+ 3px accent bar) |
| `#f4efe7` / `#b9876b` | Icon tile background / icon |
| Focus ring | `0 0 0 3px #df785614` |

**Pills:** `.p1` `#fbe8e2`/`#b8492d` Critical · `.p2` `#fbeee3`/`#b8662d` · `.p3` `#f8efdc`/`#a3712a` High · `.p4` `#eef0e3`/`#7a7a3c` · `.p5` `#e8f1e7`/`#4f7a49` Low

## Typography
| Element | Font | Size / weight |
|---|---|---|
| Body | System sans | 15px |
| Banner greeting | Georgia | 46px / 400 (40px tablet, 34px mobile) |
| Banner subtitle | System sans | 14.5px |
| Page title | Georgia | 42px / 400 (34px mobile) |
| Dashboard ticket label / number / hint | System sans | 14px / 50px / 13px |
| KPI card number / label | System sans | 21px / 12.5px |
| Table cell / header | System sans | 13.5px / 11px (Tickets grid header 12.5px, 600) |
| Buttons, inputs, menus | System sans | 13–13.5px |

## Layout
- Sidebar 222px fixed (185px under 1100px, top bar under 760px). Logo 58px centred (48px mobile).
- Dashboard banner: original boxed height (~280px). Photo panel = right 70%, `background-size: cover`, eased `mask-image` fade over its left third. Mobile: photo fills banner, cream fade from the top.
- Radius: cards 10–14px, inputs/buttons 9px, grid 10px, grid pills 4px.
- Breakpoints: 1100px, 760px.

## Components
- **Compact KPI card:** 30px icon tile + number + label in one row. Selected = accent border/tile/number. Permits 4 per row (8 cards), Broadcast 3 per row (6 cards).
- **Waste cards:** same style, 2 per row, muted note right-aligned, not clickable. 1 per row on mobile.
- **Toolbar:** Add (dark) left; search + Filter / Sort / Columns icon buttons right. Dot = active.
- **Excel grid (Tickets):** sticky header + first column, cell borders, zebra rows, hover tint, row select, max-height 64vh.
- **Standard table:** uppercase header, row dividers.
- **Pager:** "Showing x–y of n", numbered pages, rows per page 10 / 25 / 50.
- **Form:** card sections, 3-column grid (1 on mobile), inline errors, counter turns accent at limit.
- **Motion:** view change 0.4s fade/slide; popovers 0.2s.
