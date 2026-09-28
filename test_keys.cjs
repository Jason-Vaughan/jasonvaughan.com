const fs = require('fs');

let file = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const regex = /queryPass = \([^]*?\)\.trim\(\)\.toLowerCase\(\);/g;

file = file.replace(regex, 'queryPass = (params.get("pass") || params.get("password") || params.get("code") || [...params.keys()].find(k => PASSCODE_CONFIGS[k.toLowerCase()]) || "").trim().toLowerCase();');

fs.writeFileSync('src/pages/Home.jsx', file);
