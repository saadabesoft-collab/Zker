const C='zikr-v1';const FILES=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!=='zikr-acks').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.origin===location.origin){e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))}
 else if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{c.put(e.request,res.clone());return res}))))}});
self.addEventListener('notificationclick',e=>{const n=e.notification,id=(n.data||{}).id;n.close();
 e.waitUntil((async()=>{const cl=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  if(e.action==='ack'){if(cl.length)cl.forEach(c=>c.postMessage({type:'ack',id}));else{const c=await caches.open('zikr-acks');await c.put('/__ack/'+encodeURIComponent(id),new Response('1'))}return}
  if(cl.length){await cl[0].focus();cl[0].postMessage({type:'act',id})}else await self.clients.openWindow('./?go=home')})())});
