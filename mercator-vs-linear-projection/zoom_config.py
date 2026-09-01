# Standard web-map tile size (pixels per tile edge) - used by every major
# tile provider (OSM, Mapbox, Google). The "world" at a given zoom level
# is TILE_SIZE * 2^zoom pixels square.
TILE_SIZE = 256

# Auto-zoom thresholds: (max_span_degrees, zoom_level), checked in order -
# the first threshold the data's span fits under wins. Span is the larger
# of the latitude range and longitude range across the given points.
ZOOM_THRESHOLDS = [
    (0.05, 14),  # a tight cluster - single block/building scale
    (0.5, 10),   # neighborhood/city scale
    (5.0, 6),    # metro/regional scale
]
DEFAULT_ZOOM = 3  # wider than the last threshold - country/continent scale
