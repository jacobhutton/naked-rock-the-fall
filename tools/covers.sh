#!/usr/bin/env bash
# Builds the six guide cover images for the "Everything you need" section.
#
#   images/guides/<slug>-260.webp   1x  (the book frame is 130 CSS px wide on desktop, 72 on phones)
#   images/guides/<slug>-520.webp   2x
#   images/guides/<slug>.jpg        fallback at 260 wide; the post-purchase emails use it too
#
# Four covers are page 1 of the guide PDFs. Two (Fast Food, Perfect Week) are HTML pages in
# tools/covers/, because those PDFs have no usable cover page.
#
# Sources live in images/originals/guides/ (gitignored, not deployed): the six PDFs, named as
# listed below, plus the photos the HTML covers reference.
#
# Needs: brew install poppler webp   (sips ships with macOS; Google Chrome renders the HTML covers)
# Usage: tools/covers.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/images/originals/guides"
TPL="$ROOT/tools/covers"
OUT="$ROOT/images/guides"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 612pt / 72 * 144 = 1224px wide for a Letter page; the HTML covers are the same size.
DPI=144
WIDTHS="260 520"   # the JPG is written at the first width
WEBP_Q=80
JPG_Q=82

# slug | source file | kind (pdf = page 1 of images/originals/guides/<file>; html = tools/covers/<file>)
GUIDES='
flexible-dieting|Flexible Dieting Guide.pdf|pdf
fast-food|fast-food.html|html
macro-recipes|Recipe Book A.pdf|pdf
supplement|Supplement Guide .pdf|pdf
perfect-week|perfect-week.html|html
muscle-building|Muscle Building Guide.pdf|pdf
'

for tool in pdftoppm sips cwebp; do
  command -v "$tool" >/dev/null 2>&1 || { echo "Missing $tool. Run: brew install poppler webp" >&2; exit 1; }
done
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME" >&2; exit 1; }
[ -d "$SRC" ] || { echo "Copy the guide PDFs and cover photos into $SRC first (README > Images)" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

while IFS='|' read -r slug file kind; do
  [ -n "$slug" ] || continue
  case "$kind" in
    pdf)
      src="$SRC/$file"
      [ -f "$src" ] || { echo "Missing $src" >&2; exit 1; }
      pdftoppm -f 1 -l 1 -singlefile -r "$DPI" -png "$src" "$TMP/$slug"
      ;;
    html)
      src="$TPL/$file"
      [ -f "$src" ] || { echo "Missing $src" >&2; exit 1; }
      "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
        --window-size=1224,1584 --virtual-time-budget=5000 --screenshot="$TMP/$slug.png" "file://$src" >/dev/null 2>&1
      ;;
    *) echo "Unknown kind '$kind' for $slug" >&2; exit 1 ;;
  esac
  echo "-> $slug  ($file)"

  first=""
  for w in $WIDTHS; do
    sips --resampleWidth "$w" "$TMP/$slug.png" --out "$TMP/$slug-$w.png" >/dev/null
    cwebp -quiet -q "$WEBP_Q" -m 6 "$TMP/$slug-$w.png" -o "$OUT/$slug-$w.webp"
    [ -n "$first" ] || first="$w"
  done
  sips -s format jpeg -s formatOptions "$JPG_Q" "$TMP/$slug-$first.png" --out "$OUT/$slug.jpg" >/dev/null
done <<< "$GUIDES"

echo
for f in "$OUT"/*; do
  printf '%-44s %7s bytes  %s\n' "${f#$ROOT/}" "$(stat -f %z "$f")" "$(sips -g pixelWidth -g pixelHeight "$f" | awk '/pixel/ {printf "%s ", $2}')"
done
