"""Coastline and Ukraine outline for assets/routemap.js, from Natural Earth 1:50m (public domain).
Usage: python3 _build/geo.py ne_50m_land.geojson ne_50m_admin_0_countries.geojson
Source: github.com/nvkelso/natural-earth-vector/tree/master/geojson"""
import json, re, sys
from pathlib import Path

BOX = (5.0, 20.0, 55.0, 60.0)  # lon0, lat0, lon1, lat1


def P(lon, lat):
    return ((lon - 10) * 20, (56 - lat) * 20)


def clip(ring):
    """Sutherland–Hodgman against the lon/lat box."""
    x0, y0, x1, y1 = BOX
    edges = [(lambda p: p[0] >= x0, lambda a, b: inter(a, b, 0, x0)), (lambda p: p[0] <= x1, lambda a, b: inter(a, b, 0, x1)),
             (lambda p: p[1] >= y0, lambda a, b: inter(a, b, 1, y0)), (lambda p: p[1] <= y1, lambda a, b: inter(a, b, 1, y1))]
    out = ring
    for inside, cut in edges:
        src, out = out, []
        for i, cur in enumerate(src):
            prev = src[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(cut(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(cut(prev, cur))
        if not out:
            return []
    return out


def inter(a, b, k, v):
    t = (v - a[k]) / (b[k] - a[k])
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]


def path(polys, tol=1.6):
    out = []
    for ring in polys:
        ring = clip(ring)
        if len(ring) < 3:
            continue
        pts, last = [], None
        for lon, lat in ring:
            x, y = P(lon, lat)
            if last and abs(x - last[0]) + abs(y - last[1]) < tol:
                continue
            pts.append((x, y)); last = (x, y)
        if len(pts) >= 3:
            out.append("M" + "L".join(f"{x:.0f} {y:.0f}" for x, y in pts) + "Z")
    return "".join(out)


def rings(geom):
    cs = geom["coordinates"]
    if geom["type"] == "Polygon":
        cs = [cs]
    return [poly[0] for poly in cs]


land = [r for f in json.load(open(sys.argv[1]))["features"] for r in rings(f["geometry"])]
ua = [f for f in json.load(open(sys.argv[2]))["features"] if f["properties"].get("ADM0_A3") == "UKR"][0]
js = Path(__file__).resolve().parent.parent / "assets" / "routemap.js"
s = js.read_text("utf-8")
s = re.sub(r"/\*LAND\*/.*?/\*END\*/", lambda m: f"/*LAND*/'{path(land)}'/*END*/", s, flags=re.S)
s = re.sub(r"/\*UA\*/.*?/\*END\*/", lambda m: f"/*UA*/'{path(rings(ua['geometry']), 1.2)}'/*END*/", s, flags=re.S)
js.write_text(s, "utf-8")
print(len(s))
