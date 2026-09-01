# Corner "off-screen radar" widget - shows a small arrow at the edge of
# the main map pointing toward markers that are outside the visible area,
# so the user knows something's off to the north/east/etc. This is a
# DIFFERENT feature from the main map's marker layer
# (visible_points_to_svg in solution.py) - the radar deliberately clips
# and redirects off-screen points to an edge position on purpose, which
# is the opposite of what the main marker layer should do (see
# known_issues.md #482 - that's the bug this exact clipping behavior
# caused when it leaked into the main marker layer).
from viewport import NORTH, SOUTH, WEST, EAST, WIDTH, HEIGHT


def clip_to_edge_indicator(lat, lon):
    clipped_lat = max(SOUTH, min(NORTH, lat))
    clipped_lon = max(WEST, min(EAST, lon))
    x = (clipped_lon - WEST) / (EAST - WEST) * WIDTH
    y = (NORTH - clipped_lat) / (NORTH - SOUTH) * HEIGHT
    return {"x": x, "y": y}
