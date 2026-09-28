const fs = require('fs');

let file = fs.readFileSync('src/components/FeaturedCierreSensei.jsx', 'utf8');

const svgStart = `<svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{
                  width: 24, height: 24, marginLeft: "auto", color: "#71717a",`;
                  
const newShareLinkAndSvg = `<ShareLink id="cierre-sensei" compact style={{ marginLeft: "auto" }} />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{
                  width: 24, height: 24, color: "#71717a", marginLeft: 8,`;
                  
file = file.replace(svgStart, newShareLinkAndSvg);

fs.writeFileSync('src/components/FeaturedCierreSensei.jsx', file);
