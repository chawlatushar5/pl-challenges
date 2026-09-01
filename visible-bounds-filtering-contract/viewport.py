# Fixed visible-map bounds for the 800x800 canvas.
NORTH = 41.0
SOUTH = 40.0
WEST = -74.5
EAST = -73.5
WIDTH = 800
HEIGHT = 800

# The renderer this feeds (map_renderer.py) draws every returned point
# directly onto the canvas with no bounds-checking of its own - see
# known_issues.md #482 for what happens when an out-of-bounds point's
# coordinates reach it unchanged.
