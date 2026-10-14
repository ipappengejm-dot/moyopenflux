const fs=require('fs');
const t=fs.readFileSync('.github/workflows/openflux-mailru.yml','utf8');
console.log('--debug остался: '+t.includes('--debug'));
console.log('Debug: disabled: '+t.includes('Debug: disabled'));
console.log(t.split('\n').slice(-8).join('\n'));