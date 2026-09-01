# Old flat projection used before we switched to real map tiles - has been
# superseded by tile_scheme.py. Nothing imports this anymore; kept only
# for historical reference.
def old_linear_project(lat, lon, width=800, height=800):
    x_norm = (lon + 180) / 360
    y_norm = (90 - lat) / 180
    return x_norm * width, y_norm * height
