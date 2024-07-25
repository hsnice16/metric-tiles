# Metric Tiles - KPI

## Details:

- Each KPI card has two modes:
  - View Mode: Show the data for the selected metric & segment
  - Edit Mode: Shows the metric and segment selectors.
- When in View Mode, clicking anywhere should switch to Edit Mode.
- When In Edit Mode, clicking on the create/save button should switch to View Mode.
- Add new card:
  - Show a plus (”+”) icon on both sides of a card on hover.
  - Clicking on these icons should add a new card in the specific position (left/right).
  - Newly card should start in Edit Mode.
- Responsiveness:
  - The maximum number of cards in a row should be 3 irrespective of the screen width.
  - Cards should have responsive width, however, all cards should have a fixed min-width. This should be considered when positioning cards in a single row or wrapping to multiple rows.
  - If the number of cards is less than 3 for a row, the cards should increase their width based on the additional available width.
  - The container that holds all the cards should be aligned horizontally to the centre of the page. This container should have a max-width assigned as well.
