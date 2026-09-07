#!/bin/bash
mkdir -p public/images/logos
function make_svg() {
  local name=$1
  local text=$2
  local color=$3
  cat << SVG > public/images/logos/${name}.svg
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="8" fill="${color}" />
  <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">${text}</text>
</svg>
SVG
}
make_svg "osha" "OSHA" "#006233"
make_svg "iatse" "IA" "#D12027"
make_svg "barco" "B" "#E31937"
