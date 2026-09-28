const fs = require('fs');

function moveShareLink(file_path, id) {
  let file = fs.readFileSync(file_path, 'utf8');

  // Remove the old ShareLink from the bottom
  const shareLinkStr = `<ShareLink id="${id}" style={{ marginLeft: "auto", alignSelf: "center" }} />`;
  if (!file.includes(shareLinkStr)) {
      console.log('Could not find old ShareLink in ' + file_path);
  }
  file = file.replace(shareLinkStr, '');

  // Add the ShareLink to the header before the SVG
  const svgStart = `<svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{
                  width: 24, height: 24, marginLeft: "auto", color: "#71717a",`;
                  
  const newShareLinkAndSvg = `<ShareLink id="${id}" compact style={{ marginLeft: "auto" }} />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{
                  width: 24, height: 24, color: "#71717a", marginLeft: 8,`;
                  
  file = file.replace(svgStart, newShareLinkAndSvg);

  fs.writeFileSync(file_path, file);
}

moveShareLink('src/components/FeaturedTangleBrain.jsx', 'tanglebrain');
moveShareLink('src/components/FeaturedCierreSensei.jsx', 'cierre-sensei');
moveShareLink('src/components/FeaturedProject.jsx', 'tilt');
moveShareLink('src/components/FeaturedTangleClaw.jsx', 'tangleclaw');
