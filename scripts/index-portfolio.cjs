const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const portfolioData = {
  photography: {},
  digitalArt: {},
  presentationGraphics: {}
};

// 1. Index Photography
const photoDir = path.join(publicDir, 'portfolio', 'Photography');
if (fs.existsSync(photoDir)) {
  const categories = fs.readdirSync(photoDir).filter(f => !f.startsWith('.') && fs.statSync(path.join(photoDir, f)).isDirectory());
  
  for (const cat of categories) {
    portfolioData.photography[cat] = [];
    const imagesDir = path.join(photoDir, cat, 'images');
    if (fs.existsSync(imagesDir)) {
      const largeDir = path.join(imagesDir, 'large');
      if (fs.existsSync(largeDir)) {
        const files = fs.readdirSync(largeDir).filter(f => !f.startsWith('.') && f.endsWith('.jpg'));
        
        // Group by base name
        const imageMap = {};
        for (const file of files) {
          let baseName = file;
          let isHover = false;
          
          if (file.endsWith('_1.jpg')) {
            baseName = file.replace('_1.jpg', '.jpg');
            isHover = true;
          }

          if (!imageMap[baseName]) {
            imageMap[baseName] = {
              filename: baseName,
              large: `/portfolio/Photography/${encodeURIComponent(cat)}/images/large/${encodeURIComponent(baseName)}`,
              
              
              
            };
          }

          if (isHover) {
            
            imageMap[baseName].hoverLarge = `/portfolio/Photography/${encodeURIComponent(cat)}/images/large/${encodeURIComponent(file)}`;
          }
        }
        
        portfolioData.photography[cat] = Object.values(imageMap);
      }
    }
  }
}

// 2. Index Digital Art
const artDir = path.join(publicDir, 'Graphic Design', 'Digital Art');
if (fs.existsSync(artDir)) {
  const categories = fs.readdirSync(artDir).filter(f => !f.startsWith('.') && fs.statSync(path.join(artDir, f)).isDirectory());
  
  for (const cat of categories) {
    portfolioData.digitalArt[cat] = [];
    const files = fs.readdirSync(path.join(artDir, cat)).filter(f => !f.startsWith('.') && /\.(jpg|png|webp|jpeg)$/i.test(f));
    for (const file of files) {
      portfolioData.digitalArt[cat].push({
        filename: file,
        original: `/Graphic Design/Digital Art/${encodeURIComponent(cat)}/${encodeURIComponent(file)}`
      });
    }
  }
}

fs.writeFileSync(path.join(__dirname, '../src/data/portfolio-index.json'), JSON.stringify(portfolioData, null, 2));
console.log("Successfully indexed portfolio images from public, grouping _1 hover states!");
