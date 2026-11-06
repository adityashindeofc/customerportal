# Design Spec — Panchshil Customer Portal v3

## Colours
| Token / value | Use |
|---|---|
| `--accent` #df7856 | Primary accent: active nav, selected states, focus ring, current page, required * |
| `--ink` #292a2c / #2f2e2b | Main text; dark primary button ("Add", "Create ticket") |
| `--muted` #77746e / #8a847a | Secondary text, table headers, captions |
| `--paper` #f6f4ef | Sidebar background |
| page bg #f8f7f4 | Content background |
| `--line` #e8e3da / #ebe6dd | Card and table borders |
| #f3efe8 / #f8f5f0 | Excel-grid header and first-column fill |
| #fbe9e1 | Selected grid row (plus 3px accent bar on the left) |
| #f4efe7 / #b9876b | Icon tile background / icon colour |
| Focus ring | `0 0 0 3px #df785614` |

**Priority / category pills**
| Class | Background / text | Use |
|---|---|---|
| `.p1` | #fbe8e2 / #b8492d | P1 Critical |
| `.p2` | #fbeee3 / #b8662d | P2; Plastic Waste |
| `.p3` | #f8efdc / #a3712a | P3 High; Multi Layered Plastic |
| `.p4` | #eef0e3 / #7a7a3c | P4 |
| `.p5` | #e8f1e7 / #4f7a49 | P5 Low; Paper Waste |

## Typography
| Element | Font | Size / weight |
|---|---|---|
| Body, tables, forms | System sans: Segoe UI (Windows), SF (Apple) | 14px base; tables 12.5px |
| Page title (h1) | Georgia | 40px / 400, letter-spacing -1.4px (32px on mobile) |
| Card titles, empty-state title | Georgia | 20–21px / 400 |
| Eyebrow labels | Sans, uppercase | ~10–11px, wide letter-spacing |
| KPI numbers | Sans, tabular numbers | 34px / 300 (46px on Waste) |
| Grid header (Tickets) | Sans | 11.5px / 600, not uppercase |

## Layout
- Sidebar 222px fixed (185px under 1100px; becomes a top bar under 760px). Topbar 76px.
- Page header: eyebrow, h1, subtitle, then a 1px divider.
- Corner radius: cards 14px, inputs and buttons 9px, Excel grid 10px, grid pills 4px.
- Breakpoints: **1100px** (KPI cards 4 per row) and **760px** (2 per row, single-column forms, search goes full width).

## Components
- **KPI card:** icon tile, number, label. Hover lifts it 2px. Selected = accent border, accent icon tile, accent number. Click again to deselect.
- **Toolbar:** Add (dark) on the left; search (340px), Filter, Sort, Columns icon buttons on the right. A dot on an icon button means that feature is on.
- **Popover:** white, 12px radius, soft shadow, uppercase micro-heading, footer with Reset/Clear and Apply.
- **Excel grid (Tickets only):** sticky header, sticky first column, cell borders, zebra rows, hover tint, click to select a row, max height 64vh with internal scroll.
- **Standard table (Permits, Broadcast, Waste):** uppercase header, row dividers only.
- **Pager:** "Showing x–y of n", numbered pages with the current page in accent, rows per page.
- **Empty state:** icon tile, Georgia title, one line of help text.
- **Form:** white card, icon and title header, 3-column grid (1 column on mobile). Error = red border plus message under the field. Textarea counter turns accent at 60/60.
- **Upload drop zone:** dashed border; turns accent on hover or drag-over. Files over 10 MB are rejected with a message. Each file row shows name and size with a remove ✕.
- **Motion:** views fade/slide in over 0.4s; popovers over 0.2s. `prefers-reduced-motion` turns transitions off.
