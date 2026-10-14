const { execFileSync } = require('child_process');
const https = require('https');
const out = execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',windowsHide:true});
let token=''; out.split(/\r?\n/).forEach(l=>{const i=l.indexOf('='); if(l.slice(0,i)==='password') token=l.slice(i+1);});
https.get('https://api.github.com/repos/versh72/moyopenflux/actions/runs?per_page=1',
 {headers:{'User-Agent':'c','Accept':'application/vnd.github+json','Authorization':'Bearer '+token}},r=>{
  let d='';r.on('data',c=>d+=c);
  r.on('end',()=>{
    const j=JSON.parse(d).workflow_runs[0];
    console.log('run '+j.id+' | '+j.status+'/'+j.conclusion+' | '+Math.round((Date.now()-new Date(j.created_at))/1000)+' с');
  });
});