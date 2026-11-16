# QA Checklist
Compare every screen against `reference/single-file-approved-v10.html`.

## Global
- [ ] Sidebar switches all pages; active item highlighted (New Ticket keeps Tickets active).
- [ ] Popovers/menus close on outside click and Esc. Modal closes via ×, backdrop, Esc.
- [ ] No horizontal page scroll at 1440 / 1100 / 760 / 375px.

## Dashboard
- [ ] Banner: original height, sky + skyline + EON buildings visible, smooth fade, no hard edge.
- [ ] Date range Apply updates label; invalid range shows toast. Export downloads CSV.
- [ ] Metric cards open modals; View tickets/permits navigate; quick actions work.

## Tickets
- [ ] No KPI cards. Columns: Actions, Sr. No., Ticket ID, Priority, Description, Category.
- [ ] Search, Filter (Priority, Category), Sort popover, header ⌄ menu, Columns, chips all work.
- [ ] Sticky header + first column, zebra rows, row select, eye opens details, pager + rows per page.

## New Ticket
- [ ] Tooltip, dependent sub-category, 0/60 counter, required-field errors.
- [ ] Drop zone: click, keyboard, drag/drop, >10 MB rejected, remove file.
- [ ] Submit adds row to Tickets and shows confirmation.

## My Permits / Broadcast
- [ ] Compact cards (8 / 6), search, filter, columns, empty states.

## Waste Management
- [ ] Two full-width compact cards with right-aligned note, no bar, no hover lift; stacked on mobile.
- [ ] Search, columns, 12 rows (10 + 2 pages), numeric sort, eye opens details.
