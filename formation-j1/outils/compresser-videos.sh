#!/usr/bin/env bash
# Compresse les vidéos du samoyède déposées dans src/images (MP4 venus de ChatGPT) en WebM léger,
# pour que le deck reste un seul fichier qui tourne sans connexion.
# Usage : bash outils/compresser-videos.sh
set -euo pipefail
cd "$(dirname "$0")/../src/images"
for f in *.mp4; do
  [ -e "$f" ] || continue
  out="${f%.mp4}.webm"
  ffmpeg -loglevel error -y -i "$f" -an -vf "scale=1280:-2,fps=24" -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 "$out"
  echo "$out : $(du -k "$out" | cut -f1) Ko"
done
