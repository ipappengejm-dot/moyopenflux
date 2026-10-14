const { execFileSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const out = execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',windowsHide:true});
let token=''; out.split(/\r?\n/).forEach(l=>{const i=l.indexOf('='); if(l.slice(0,i)==='password') token=l.slice(i+1);});
function go(url,d,cb){
  https.get(url,{headers:{'User-Agent':'c','Accept':'application/vnd.github+json','Authorization':'Bearer '+token}},res=>{
    if(res.statusCode>=300&&res.statusCode<400&&res.headers.location){res.resume();return go(res.headers.location,d+1,cb);}
    const ch=[];res.on('data',c=>ch.push(c));res.on('end',()=>cb(Buffer.concat(ch)));}).on('error',e=>{console.log('ERR '+e.message);process.exit(1);});
}
go('https://api.github.com/repos/versh72/moyopenflux/actions/runs/38624410388/logs',0,buf=>{
  fs.writeFileSync(process.env.TEMP+'\\of2.zip',buf);
  console.log('архив '+buf.length+' байт');
});