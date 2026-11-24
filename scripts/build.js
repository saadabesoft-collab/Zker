const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),web=path.join(root,'web'),dist=path.join(root,'dist');
const a=fs.readFileSync(require.resolve('adhan/lib/bundles/adhan.umd.min.js'),'utf8').replace(/\/\/# sourceMappingURL.*$/m,'');
const html=fs.readFileSync(path.join(web,'src.html'),'utf8').replace('/*ADHAN*/',()=>a);
fs.mkdirSync(dist,{recursive:true});fs.writeFileSync(path.join(dist,'index.html'),html);
for(const f of ['sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'])fs.copyFileSync(path.join(web,f),path.join(dist,f));
console.log('built dist/index.html',html.length);
