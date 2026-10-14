const { execFileSync } = require('child_process');
const https = require('https');
const out = execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',windowsHide:true});
let token=''; out.split(/\r?\n/).forEach(l=>{const i=l.indexOf('='); if(l.slice(0,i)==='password') token=l.slice(i+1);});
const body=JSON.stringify({ref:'main'});
const rq=https.request({host:'api.github.com',path:'/repos/versh72/moyopenflux/actions/workflows/openflux-mailru.yml/dispatches',
  method:'POST',headers:{'User-Agent':'c','Accept':'application/vnd.github+json',
  'Authorization':'Bearer '+token,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}},
  res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>console.log('запуск: '+res.statusCode+(res.statusCode===204?' (принято)':' '+d.slice(0,140))));});
rq.write(body); rq.end();