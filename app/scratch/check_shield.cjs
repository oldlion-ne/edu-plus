const icons = require('@hugeicons/core-free-icons');
const shieldKeys = Object.keys(icons).filter(k => k.toLowerCase().includes('shield'));
console.log("Shield icons:", shieldKeys);
