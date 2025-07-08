# Design Document

In the fishing event, the player must find 60 relics, labeled A1, A2, ... A10, B1, B2, ... B10 ...
That is, A through F and 1 through 10 (A-F)(1-10)

There are 8 maps.
Each map contains fishing spots.
A relic can only be found in one spot.
Each spot has between 1 and 3 relics.

This single page application helps a player keep track of the relics that they own, the relics that they're missing, and where to find them.

The relics that the user owns are synchronized across different parts of the app:

- in an editable text input
- in another editable text input containing missing relics
- in the hash part of the URL
- in local storage
- as checked/unchecked buttons in a grid

# Screenshot Paste

The user can paste a screenshot of their inventory and every relic found in the screenshot will be checked in.

# Map Area

A vertical module on the left acts like a table of content, showing a thumbnail for each of the maps. Next to it is a vertical scrollable area showing the maps in full resolution, one after the other. Clicking on a map thumbnail scrolls the corresponding map into view. On the maps are overlaid the relics, at their respective spots. Those relics are interactive and synced with the user's data and the relic grid.

# Relic Grid

A-F rows, 1-10 columns
Each cell in this grid/table displays the icon of a relic, and its label (e.g. A3, E7)