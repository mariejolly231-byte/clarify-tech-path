"""Convertit une spec en éléments pour l'aperçu Excalidraw (format avec labels)."""
import json, sys
from specs import SCHEMAS
def conv(els):
    out=[{"type":"cameraUpdate","width":800,"height":600,"x":0,"y":20}]
    for e in els:
        if e["kind"]=="box":
            out.append({"type":"rectangle","id":e["id"],"x":e["x"],"y":e["y"],"width":e["w"],"height":e["h"],"roundness":{"type":3},"backgroundColor":e["fill"],"fillStyle":"solid","strokeColor":e["stroke"],"label":{"text":e["text"],"fontSize":e["size"],"strokeColor":e["color"]}})
        elif e["kind"]=="arrow":
            pts=[[0,0]]+([[e["via"][0]-e["x1"],e["via"][1]-e["y1"]]] if e["via"] else [])+[[e["x2"]-e["x1"],e["y2"]-e["y1"]]]
            a={"type":"arrow","id":e["id"],"x":e["x1"],"y":e["y1"],"width":abs(e["x2"]-e["x1"]),"height":abs(e["y2"]-e["y1"]),"points":pts,"strokeColor":e["color"],"endArrowhead":"arrow"}
            if e["dashed"]: a["strokeStyle"]="dashed"
            if e["label"]: a["label"]={"text":e["label"],"fontSize":16}
            out.append(a)
        else:
            out.append({"type":"text","id":e["id"],"x":e["x"],"y":e["y"],"text":e["text"],"fontSize":e["size"],"strokeColor":e["color"]})
    return out
print(json.dumps(conv(SCHEMAS[sys.argv[1]][0]()),ensure_ascii=False))
