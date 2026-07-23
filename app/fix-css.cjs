const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/--([a-z0-9-]+):\s*([0-9.]+%?\s+[0-9.]+\s+[0-9.]+deg);/g, '--$1: oklch($2);');
fs.writeFileSync('src/index.css', css);
