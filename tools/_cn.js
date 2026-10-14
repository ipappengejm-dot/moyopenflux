const { execFileSync } = require('child_process');
const https = require('https');
const out = execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',windowsHide:true});
let token=''; out.split(/\r?\n/).forEach(l=>{const i=l.indexOf('='); if(l.slice(0,i)==='password') token=l.slice(i+1);});
const rq=https.request({host:'api.github.com',path:'/repos/versh72/moyopenflux/actions/runs/38624410388/cancel',
  method:'POST',headers:{'User-Agent':'c','Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'Content-Length':0}},
  res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>console.log('отмена: '+res.statusCode));});
rq.on('error',e=>console.log('ошибка '+e.message));
rq.end();