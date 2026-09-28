const fs = require('fs');

let file = fs.readFileSync('src/components/FeaturedCierreSensei.jsx', 'utf8');

const titleRowEndNew = `
              <ShareLink id="cierre-sensei" compact style={{ marginLeft: "auto" }} />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{
                  width: 24, height: 24, color: "#71717a", marginLeft: 8,
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .25s ease"
                }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>`;
            
const insertText = '<p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>AI-powered closing cost engine</p>';

const [before, after] = file.split(insertText);
if (after !== undefined) {
  let lastDivIndex = before.lastIndexOf('</div>');
  let beforeFixed = before.substring(0, lastDivIndex) + titleRowEndNew + before.substring(lastDivIndex + 6);
  file = beforeFixed + `
            <div style={{
              display: "grid",
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: "grid-template-rows .28s ease",
            }}>
              <div style={{ minHeight: 0, overflow: "hidden", opacity: open ? 1 : 0, transition: "opacity .28s ease" }}>
` + insertText + after;
} else {
  console.log("Could not find insertText for Cierre");
}

const bodyEndStr = `</a>
              )}
              
            </div>
          </div>`;
          
const wrapperEnd = `</a>
              )}
              
            </div>
              </div>
            </div>
          </div>`;
file = file.replace(bodyEndStr, wrapperEnd);

const titleRowOriginal = '<div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>';
const titleRowNew = `<div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>`;
file = file.replace(titleRowOriginal, titleRowNew);

fs.writeFileSync('src/components/FeaturedCierreSensei.jsx', file);
