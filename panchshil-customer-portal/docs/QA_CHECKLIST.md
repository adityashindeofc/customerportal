# QA Checklist

Compare every screen with `reference/approved-v18-single-file.html` at 1440px, 1100px, 760px and 375px.

## Global
- [ ] Logo centred at top of sidebar, no text beside it.
- [ ] Sidebar switches all pages; active item highlighted (New Ticket keeps Tickets active).
- [ ] Popovers / menus close on outside click and Esc. Modal closes via ×, backdrop, Esc.
- [ ] No horizontal page scroll at any width.

## Dashboard
- [ ] Banner: greeting on cream left, photo right with full buildings visible, smooth fade (no hard edge).
- [ ] Date range Apply updates label; invalid range shows toast.
- [ ] Tickets section: 5 cards, Open highlighted; Export ↓ downloads CSV; View tickets ↗ opens Tickets.
- [ ] No permits section. Quick actions: Raise a ticket, Property announcements.

## Tickets
- [ ] No KPI cards. Columns: Actions, Sr. No., Ticket ID, Priority, Description, Category.
- [ ] Add → New Ticket. Search matches ID, description, category.
- [ ] Filter (Priority, Category), Sort popover, header ⌄ menu (asc/desc/clear/hide), Columns popover, removable chips.
- [ ] Sticky header + first column, zebra rows, row select, eye opens details.
- [ ] Pager prev/next disabled at ends; rows per page 10 / 25 / 50.

## New Ticket
- [ ] ⓘ tooltip on hover and focus. Sub-category disabled until category chosen.
- [ ] Counter 0/60, accent at limit. Empty submit shows 3 errors that clear when fixed.
- [ ] Drop zone: click, Enter/Space, drag highlight, drop; >10 MB rejected; ✕ removes file.
- [ ] Valid submit adds row to top of Tickets, resets form, shows confirmation.

## My Permits
- [ ] 8 compact cards, Total selected by default, click toggles.
- [ ] Add opens permit form; search, filter, columns work; 9 columns; empty state.

## Broadcast
- [ ] 6 compact cards; search, filter, columns; 7 columns; empty state.

## Waste Management
- [ ] Two full-width cards (Total Waste 2,29,273; Recycling Rate 36.99%) with note, no bar, no hover lift.
- [ ] Search and columns; 8 columns; 12 rows → 10 + 2 across pages; numeric sort; eye opens details.
