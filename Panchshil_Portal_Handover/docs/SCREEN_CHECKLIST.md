# QA Checklist — every screen and control

## Global
- [ ] Sidebar switches between all 5 pages; the active item is highlighted.
- [ ] New Ticket keeps "Tickets" highlighted in the sidebar.
- [ ] Clicking outside closes popovers and column menus; so does Esc.
- [ ] The modal closes with ×, by clicking the backdrop, and with Esc.
- [ ] Layout works at 1440px, 1100px (tablet), 760px and 375px (mobile), with no horizontal page scroll.

## Dashboard (unchanged from approved design)
- [ ] Hero image, greeting, air-quality chip.
- [ ] Date range Apply updates the label; an invalid range shows a toast.
- [ ] Ticket and permit metric cards open detail modals.
- [ ] Export ↓ downloads a CSV.
- [ ] View tickets ↗ and View permits ↗ go to their pages.
- [ ] Quick actions: Raise a ticket → New Ticket page; Apply for a permit → demo form; Property announcements → Broadcast.

## Tickets (Excel grid)
- [ ] No KPI cards. Columns: Actions, Sr. No., Ticket ID, Priority, Description, Category.
- [ ] Add → New Ticket page.
- [ ] Search matches ID, description and category.
- [ ] Filter: Priority and Category dropdowns, Reset, Apply; a dot shows on the button; a chip appears.
- [ ] Sort popover: pick a column and an order, Apply or Clear; the arrow shows in the header; a chip appears.
- [ ] Column header ⌄: ascending, descending, clear sort, hide column.
- [ ] Columns popover: checkboxes and Show all; Actions can't be hidden.
- [ ] Each chip ✕ removes its filter, sort or hidden columns.
- [ ] Sticky header and first column while scrolling; zebra rows; hover tint.
- [ ] Clicking a row selects it (tint and accent bar).
- [ ] The eye button opens a details modal.
- [ ] Pager: prev/next disabled at the ends; rows per page 10/25/50.

## New Ticket
- [ ] Back to tickets and Cancel return to Tickets.
- [ ] The ⓘ tooltip shows on hover and on keyboard focus.
- [ ] Sub-category stays disabled until a category is chosen, then fills in.
- [ ] Counter goes 0/60 → 60/60 and turns accent at the limit.
- [ ] Submitting empty shows errors on Type, Category and Description; each clears when that field is fixed.
- [ ] Drop zone: click, Enter/Space, drag-over highlight, drop; files over 10 MB are rejected with a modal; ✕ removes a file.
- [ ] A valid submit adds a row to the top of Tickets, resets the form and shows the "created" modal.

## My Permits
- [ ] 8 KPI cards (Total, Approved, Draft, Open, Closed, Rejected, Extended, Hold); Total selected by default; clicking toggles.
- [ ] Add opens the permit form; search, filter and columns work.
- [ ] 9 columns; "No permits found" empty state.

## Broadcast
- [ ] 6 KPI cards; search, filter and columns work.
- [ ] 7 columns; "No broadcasts found" empty state.

## Waste Management
- [ ] 2 large KPIs: Total Waste 2,29,273 and Recycling Rate 36.99%.
- [ ] Search and columns (no filter).
- [ ] 8 columns; category pills coloured; sorting works on numbers.
- [ ] 12 rows → page 1 shows 10, page 2 shows 2.
- [ ] The eye button opens generation details.
