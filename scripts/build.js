const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),web=path.join(root,'web'),dist=path.join(root,'dist');
const a=fs.readFileSync(require.resolve('adhan/lib/bundles/adhan.umd.min.js'),'utf8').replace(/\/\/# sourceMappingURL.*$/m,'');
const rd=f=>fs.readFileSync(path.join(web,f),'utf8');
const html=(rd('head.html')+rd('data.js')+rd('app.js').replace('/*HOMEJS*/',()=>rd('home.js')).replace('/*FEATURES*/',()=>rd('features.js'))).replace('/*ADHAN*/',()=>a);
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
fs.writeFileSync(path.join(dist,'index.html'),html);
for(const f of ['sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','quran.js'])fs.copyFileSync(path.join(web,f),path.join(dist,f));
for(const d of ['fonts','audio']){fs.mkdirSync(path.join(dist,d));for(const f of fs.readdirSync(path.join(web,d)))fs.copyFileSync(path.join(web,d,f),path.join(dist,d,f))}
console.log('built dist/index.html',html.length);
