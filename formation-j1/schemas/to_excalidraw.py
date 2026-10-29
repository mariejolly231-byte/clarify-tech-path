"""Convertit les specs en fichiers .excalidraw éditables (ouvrables sur excalidraw.com)."""
import json, random, pathlib
from specs import SCHEMAS

def base(id, type, x, y, w, h, **kw):
    e = dict(id=id, type=type, x=x, y=y, width=w, height=h, angle=0, strokeColor="#1e1e1e", backgroundColor="transparent",
             fillStyle="solid", strokeWidth=2, strokeStyle="solid", roughness=1, opacity=100, groupIds=[], roundness=None,
             seed=random.Random(id).randint(1, 2**31), version=1, versionNonce=1, isDeleted=False, boundElements=None,
             updated=1, link=None, locked=False)
    e.update(kw); return e

def textel(id, cx, cy, t, size, color, container=None, left=None):
    lines = t.split("\n"); w = max(len(l) for l in lines) * size * 0.56; h = len(lines) * size * 1.25
    x = left if left is not None else cx - w / 2
    return base(id, "text", x, cy - h / 2 if left is None else cy, w, h, strokeColor=color, text=t, originalText=t, fontSize=size,
                fontFamily=1, textAlign="left" if left is not None else "center", verticalAlign="middle" if container else "top",
                baseline=int((len(lines) - 1) * size * 1.25 + size * 0.9), containerId=container, lineHeight=1.25)

def convert(spec):
    out = []
    for e in spec:
        if e["kind"] == "box":
            tid = e["id"] + "_t"
            out.append(base(e["id"], "rectangle", e["x"], e["y"], e["w"], e["h"], strokeColor=e["stroke"], backgroundColor=e["fill"],
                            fillStyle="solid" if e["fill"] == "transparent" else "hachure",
                            roundness={"type": 3}, strokeSharpness="round", boundElements=[{"type": "text", "id": tid}]))
            out.append(textel(tid, e["x"] + e["w"] / 2, e["y"] + e["h"] / 2, e["text"], e["size"], e["color"], container=e["id"]))
        elif e["kind"] == "arrow":
            pts = [[0, 0]] + ([[e["via"][0] - e["x1"], e["via"][1] - e["y1"]]] if e["via"] else []) + [[e["x2"] - e["x1"], e["y2"] - e["y1"]]]
            out.append(base(e["id"], "arrow", e["x1"], e["y1"], abs(e["x2"] - e["x1"]), abs(e["y2"] - e["y1"]), strokeColor=e["color"],
                            strokeStyle="dashed" if e["dashed"] else "solid", points=pts, startArrowhead=None, endArrowhead="arrow",
                            startBinding=None, endBinding=None, lastCommittedPoint=None, roundness={"type": 2}, strokeSharpness="round"))
            if e["label"]:
                horiz = e["y1"] == e["y2"]
                lx = (e["x1"] + e["x2"]) / 2 if horiz else e["x1"] + 12
                ly = e["y1"] - 26 if horiz else (e["y1"] + e["y2"]) / 2 - 10
                out.append(textel(e["id"] + "_l", lx, ly + 10, e["label"], 30, "#0B4F5C") if horiz else textel(e["id"] + "_l", 0, ly, e["label"], 24, "#0B4F5C", left=lx))
        else:
            out.append(textel(e["id"], 0, e["y"], e["text"], e["size"], e["color"], left=e["x"]))
    return out

for name, (fn, title) in SCHEMAS.items():
    doc = dict(type="excalidraw", version=2, source="summit-flow", elements=convert(fn()), appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    pathlib.Path(f"{name}.excalidraw").write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")
    print("ok", name)
