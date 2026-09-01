from viewport import WIDTH, HEIGHT
from solution import visible_points_to_svg


def render_visible_points_svg(points):
    coords = visible_points_to_svg(points)
    circles = "\n".join(f'  <circle id="{c["id"]}" cx="{c["x"]}" cy="{c["y"]}" r="4" />' for c in coords)
    return f'<svg viewBox="0 0 {WIDTH} {HEIGHT}">\n{circles}\n</svg>'
