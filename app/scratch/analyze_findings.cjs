const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../dist/assets/index-DtaYnTe5.js');
if (!fs.existsSync(file)) {
  console.log('Build file not found at:', file);
  process.exit(0);
}

const content = fs.readFileSync(file, 'utf-8');
const lines = content.split('\n');

console.log("Total lines in build file:", lines.length);

const findings = [
  { line: 1, colStart: 54, colEnd: 58, desc: "CWE-94 Bracket object notation" },
  { line: 1, colStart: 3631, colEnd: 3632, desc: "CWE-79 User controlled data in $(...)" },
  { line: 8, colStart: 4844, colEnd: 4849, desc: "CWE-94 Bracket object notation" },
  { line: 8, colStart: 39519, colEnd: 39520, desc: "CWE-79 User controlled data in $(...)" },
  { line: 9, colStart: 43471, colEnd: 43497, desc: "CWE-185 RegExp with non-literal" },
  { line: 11, colStart: 868, colEnd: 1073, desc: "CWE-116 Template literal looks like HTML" },
  { line: 14, colStart: 3770, colEnd: 3790, desc: "Copy-paste error i === 'json'" },
  { line: 14, colStart: 9820, colEnd: 9841, desc: "CWE-94 Bracket object notation" },
  { line: 18, colStart: 4755, colEnd: 4759, desc: "CWE-94 Bracket object notation" },
  { line: 18, colStart: 14740, colEnd: 14772, desc: "CWE-185 RegExp with non-literal" },
  { line: 37, colStart: 5474, colEnd: 5481, desc: "CWE-94 Bracket object notation" },
  { line: 53, colStart: 5274, colEnd: 5278, desc: "CWE-94 Bracket object notation" },
  { line: 91, colStart: 874, colEnd: 878, desc: "CWE-94 Bracket object notation" },
  { line: 98, colStart: 5863, colEnd: 5907, desc: "CWE-94 Bracket object notation" },
  { line: 98, colStart: 41526, colEnd: 41740, desc: "CWE-79 dangerouslySetInnerHTML" },
  { line: 117, colStart: 7210, colEnd: 7231, desc: "CWE-94 Bracket object notation" },
  { line: 120, colStart: 68636, colEnd: 68697, desc: "CWE-116 Template literal HTML" },
  { line: 125, colStart: 151, colEnd: 157, desc: "CWE-94 Bracket object notation" },
  { line: 143, colStart: 69387, colEnd: 69391, desc: "CWE-94 Bracket object notation" },
  { line: 143, colStart: 152453, colEnd: 152481, desc: "CWE-185 RegExp with non-literal" },
  { line: 143, colStart: 195192, colEnd: 195202, desc: "Copy-paste returns 0" },
  { line: 156, colStart: 2112, colEnd: 2124, desc: "CWE-94 Bracket object notation" },
  { line: 173, colStart: 1989, colEnd: 1993, desc: "CWE-94 Bracket object notation" },
  { line: 173, colStart: 39508, colEnd: 39533, desc: "CWE-185 RegExp with non-literal" },
  { line: 175, colStart: 53212, colEnd: 53255, desc: "CWE-79 dangerouslySetInnerHTML" },
  { line: 175, colStart: 65090, colEnd: 65100, desc: "Copy-paste returns 0" },
  { line: 177, colStart: 27, colEnd: 39, desc: "CWE-94 Bracket object notation" },
  { line: 181, colStart: 357, colEnd: 361, desc: "CWE-94 Bracket object notation" }
];

findings.forEach((f, idx) => {
  const lineContent = lines[f.line - 1];
  if (!lineContent) {
    console.log(`[Finding ${idx+1}] Line ${f.line} NOT FOUND`);
    return;
  }
  const start = Math.max(0, f.colStart - 45);
  const end = Math.min(lineContent.length, f.colEnd + 45);
  const snippet = lineContent.slice(start, end).replace(/\r/g, '');
  const exact = lineContent.slice(f.colStart, f.colEnd);
  console.log(`\n======================================================`);
  console.log(`Finding #${idx+1}: ${f.desc}`);
  console.log(`Location: Line ${f.line}, Cols ${f.colStart}-${f.colEnd}`);
  console.log(`Snippet: ...${snippet.trim()}...`);
  console.log(`Exact Match: [${exact}]`);
});
