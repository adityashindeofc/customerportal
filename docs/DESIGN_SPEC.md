# Design Spec — v10

## Colours
| Value | Use |
|---|---|
| `--accent` #df7856 | Active nav, selected states, focus ring, current page, required * |
| #2f2e2b / `--ink` #292a2c | Main text, dark primary buttons |
| #8a847a / `--muted` #77746e | Secondary text, headers, captions |
| `--paper` #f6f4ef | Sidebar |
| #f4f1eb | Banner background behind photo |
| #ebe6dd / `--line` #e8e3da | Card and table borders |
| #f3efe8, #f8f5f0 | Excel-grid header and first column |
| #fbe9e1 | Selected grid row (+3px accent bar) |
| #f4efe7 / #b9876b | Icon tile background / icon |
| Focus ring | `0 0 0 3px #df785614` |

**Pills:** `.p1` #fbe8e2/#b8492d · `.p2` #fbeee3/#b8662d · `.p3` #f8efdc/#a3712a · `.p4` #eef0e3/#7a7a3c · `.p5` #e8f1e7/#4f7a49

## Typography
| Element | Font | Size / weight |
|---|---|---|
| Body, tables, forms | System sans | 14px; tables 12.5px |
| Page title | Georgia | 40px / 400, -1.4px (32px mobile) |
| Banner greeting | Georgia | ~42px / 400 |
| KPI number | System sans | 20px / 500 |
| KPI label | System sans | 11.5px |
| Grid header (Tickets) | System sans | 11.5px / 600 |

## Layout
- Sidebar 222px fixed; topbar 76px.
- Dashboard banner: original height (~265–280px). Photo covers the right ~68% and fades into #f4f1eb using a CSS `mask-image` gradient. On mobile the photo covers the full banner with a lighter fade.
- Radii: cards 10–14px, inputs/buttons 9px, grid 10px, grid pills 4px.
- Breakpoints: 1100px, 760px.

## Components
- **KPI card (compact):** 30px icon tile + number + label in one row; 12×14px padding. Selected = accent border/tile/number. Permits: 4 per row (8 cards). Broadcast: 3 per row (6 cards).
- **Waste cards:** same KPI style, 2 per row full width, muted note right-aligned, not clickable. 1 per row on mobile.
- **Toolbar:** Add (dark) left; search 340px + Filter / Sort / Columns icon buttons right. Dot = feature active.
- **Excel grid (Tickets):** sticky header + first column, cell borders, zebra rows, hover tint, click to select, max-height 64vh.
- **Standard table:** uppercase header, row dividers only.
- **Pager:** "Showing x–y of n", numbered pages, rows per page 10/25/50.
- **Empty state:** icon tile, Georgia title, one help line.
- **Form:** card sections, 3-column grid (1 on mobile), inline errors, counter turns accent at limit.
- **Motion:** views fade/slide 0.4s; popovers 0.2s.
