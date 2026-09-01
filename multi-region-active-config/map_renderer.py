from settings import ACTIVE_REGION
from regions import REGIONS, WIDTH, HEIGHT
from solution import project_points


def render_active_region_svg(points):
    coords = project_points(points)
    circles = "\n".join(f'  <circle cx="{c["x"]}" cy="{c["y"]}" r="4" />' for c in coords)
    return f'<svg viewBox="0 0 {WIDTH} {HEIGHT}" data-region="{ACTIVE_REGION}">\n{circles}\n</svg>'
