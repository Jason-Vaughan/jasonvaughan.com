const fs = require('fs');

let file = fs.readFileSync('src/components/FeaturedCierreSensei.jsx', 'utf8');

// Remove the old ShareLink from the bottom
const shareLinkStr = `<ShareLink id="cierresensei" style={{ marginLeft: "auto", alignSelf: "center" }} />`;
file = file.replace(shareLinkStr, '');

fs.writeFileSync('src/components/FeaturedCierreSensei.jsx', file);
