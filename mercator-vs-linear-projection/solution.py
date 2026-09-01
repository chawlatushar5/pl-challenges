def clamp_latitude(lat):
    """Return lat clamped to the valid Mercator range. See tile_scheme.py's MAX_LATITUDE."""
    # TODO: implement
    raise NotImplementedError


def world_size_for_zoom(zoom):
    """Return the total pixel width/height of the world at this zoom level. See zoom_config.py."""
    # TODO: implement
    raise NotImplementedError


def select_zoom_level(points):
    """
    points is a list of dicts each with at least "lat" and "lon" keys.
    Pick the zoom level that fits this set of points. See zoom_config.py.
    """
    # TODO: implement
    raise NotImplementedError


def mercator_project(points):
    """
    points is a list of dicts each with at least "lat" and "lon" keys.
    Return a list of {"x": <float>, "y": <float>} dicts, one per input
    point, same order, using clamp_latitude, select_zoom_level, and
    world_size_for_zoom together with the Mercator formula in
    tile_scheme.py.
    """
    # TODO: implement
    raise NotImplementedError