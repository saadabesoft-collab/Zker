const C='zikr-v3';
const FILES=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','fonts/ReemKufi.ttf','fonts/Amiri-Regular.ttf','fonts/Amiri-Bold.ttf','fonts/Plex-Regular.ttf','fonts/Plex-SemiBold.ttf','fonts/AmiriQuran.ttf','quran.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!=='zikr-acks').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&/\/audio\//.test(u.pathname)){const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl))}return res})))});
self.addEventListener('notificationclick',e=>{const n=e.notification,id=(n.data||{}).id;n.close();
 e.waitUntil((async()=>{const cl=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  if(e.action==='ack'){if(cl.length)cl.forEach(c=>c.postMessage({type:'ack',id}));else{const c=await caches.open('zikr-acks');await c.put('/__ack/'+encodeURIComponent(id),new Response('1'))}return}
  if(cl.length){await cl[0].focus()}else await self.clients.openWindow('./')})())});
