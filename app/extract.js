const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\rtf70\\.gemini\\antigravity\\brain\\a93738ee-8763-4869-b7d2-b1c85109860e\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    if (data.type === 'USER_INPUT' && data.content.includes('import { Card }')) {
      console.log('Found it!');
      fs.writeFileSync('c:\\edu-plus\\app-v2\\full_request.txt', data.content, 'utf8');
      break;
    }
  } catch (e) {
    // ignore
  }
}
