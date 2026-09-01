import math

# This viewer uses the standard Web Mercator projection (EPSG:3857) - the
# same one every standard web map tile provider (OSM, Google Maps, Mapbox)
# uses. Unlike a simple lat/lon->pixel linear scale, Mercator's y axis is
# NOT linear in latitude - the map compresses less near the equator and
# stretches more near the poles. The standard formula for normalized
# Mercator y (before scaling to pixels) is:
#
#   y_norm = 0.5 - ln(tan(pi/4 + lat_radians/2)) / (2 * pi)
#
# x is still linear in longitude:
#
#   x_norm = (lon + 180) / 360
#
# Both x_norm and y_norm are in [0, 1] before multiplying by world size.
#
# The projection is mathematically undefined at exactly +/-90 degrees
# latitude (the formula above diverges to infinity), and every standard
# web map library clamps input latitude to +/-85.0511287798 degrees before
# projecting - the latitude at which the Mercator projection maps to a
# perfect square. This is the same MAX_LATITUDE constant Leaflet, Mapbox
# GL, and OpenLayers all use.
MAX_LATITUDE = 85.0511287798
