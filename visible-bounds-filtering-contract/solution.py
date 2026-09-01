def is_within_bounds(lat, lon):
    """Return True if (lat, lon) falls within the visible map area. See viewport.py."""
    # TODO: implement
    raise NotImplementedError


def dedupe_points(points):
    """
    points is a list of {"id","lat","lon"} dicts. Remove points that
    represent the same physical marker location, keeping the first
    occurrence. See marker_rules.py.
    """
    # TODO: implement
    raise NotImplementedError


def sort_by_priority(points):
    """
    points is a list of {"id","lat","lon"} dicts. Return them reordered
    so they render correctly on the map. See marker_rules.py.
    """
    # TODO: implement
    raise NotImplementedError


def visible_points_to_svg(points):
    """
    points is a list of {"id","lat","lon"} dicts. Return a list of
    {"id","x","y"} dicts, using dedupe_points, is_within_bounds, and
    sort_by_priority to decide which points appear and in what order,
    projected onto the map's 800x800 canvas.
    """
    # TODO: implement
    raise NotImplementedError