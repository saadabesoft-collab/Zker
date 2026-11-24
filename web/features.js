/* ================= FEATURES (grid, more, pages) ================= */
const G=(p,extra='')=>'<svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+extra+'>'+p+'</svg>';
const FEAT={
 mushaf:['المصحف','#5f9e4f',G('<path d="M16 9c-3-2-7-2.5-11-2v16c4-.5 8 0 11 2 3-2 7-2.5 11-2V7c-4-.5-8 0-11 2z" fill="#fff" fill-opacity=".25"/><path d="M16 9v16"/><path d="M16 4l1.5 2.5L16 9l-1.5-2.5z" fill="#ffd54f" stroke="#ffd54f"/>')],
 azkar:['الأذكار','#1f4e9c',G('<circle cx="16" cy="6" r="2"/><circle cx="22" cy="10" r="2"/><circle cx="22" cy="17" r="2"/><circle cx="16" cy="21" r="2"/><circle cx="10" cy="17" r="2"/><circle cx="10" cy="10" r="2"/><path d="M16 23v5" stroke="#e53935"/>')],
 tasbih:['السبحة','#23284d',G('<circle cx="16" cy="14" r="8" stroke="#ffd54f" stroke-dasharray="2.5 2.6" stroke-width="3.2"/><path d="M16 22v6" stroke="#ffd54f"/>')],
 qibla:['القبلة','#c9d4f7',G('<path d="M8 12l8-4 8 4v10l-8 4-8-4z" fill="#222" stroke="#222"/><path d="M8 15l8 4 8-4" stroke="#f2b233" stroke-width="2.4"/><path d="M16 3l2 3h-4z" fill="#ff7043" stroke="#ff7043"/>')],
 dua:['الدعاء','#1aa0c8',G('<path d="M11 26v-8l-3-6a1.6 1.6 0 0 1 2.8-1.5L13 14V6a1.5 1.5 0 0 1 3 0v20M21 26v-8l3-6a1.6 1.6 0 0 0-2.8-1.5L19 14V6a1.5 1.5 0 0 0-3 0" fill="#fff" fill-opacity=".2"/>')],
 khatma:['الختمة','#f39c32',G('<path d="M6 10l10-5 10 5-10 5z" fill="#1f2a5a" stroke="#1f2a5a"/><path d="M6 10v10l10 5 10-5V10" stroke="#fff"/><ellipse cx="16" cy="10" rx="3.5" ry="2" fill="#fff" stroke="#f39c32"/>')],
 taat:['طاعاتك','#5a1f5c',G('<circle cx="16" cy="13" r="6" fill="#ffca28" stroke="#ffca28"/><path d="M10 18l-3 8 5-2 2 4 2-6M22 18l3 8-5-2-2 4-2-6" fill="#90caf9" stroke="#90caf9"/>')],
 sbank:['بنك الصدقات','#29a9d8',G('<rect x="7" y="13" width="18" height="13" rx="2" fill="#fff" fill-opacity=".25"/><path d="M5 13h22"/><circle cx="16" cy="7" r="3.5" fill="#ffd54f" stroke="#ffd54f"/><path d="M16 23s-4-2.4-4-5a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 2.6-4 5-4 5z" fill="#e53935" stroke="#e53935"/>')],
 zakat:['حاسبة الزكاة','#f2c94c',G('<rect x="6" y="6" width="9" height="9" rx="2" fill="#43a047" stroke="#43a047"/><rect x="17" y="6" width="9" height="9" rx="2" fill="#fb8c00" stroke="#fb8c00"/><rect x="6" y="17" width="9" height="9" rx="2" fill="#1e88e5" stroke="#1e88e5"/><rect x="17" y="17" width="9" height="9" rx="2" fill="#37474f" stroke="#37474f"/><path d="M8.5 10.5h4M10.5 8.5v4M19.5 10.5h4M8.6 19.6l3.8 3.8M12.4 19.6l-3.8 3.8M21.5 19.5l2.5 4"/>')],
 travel:['المسافر','#d9eff6',G('<rect x="9" y="9" width="14" height="17" rx="3" fill="#fb8c00" stroke="#fb8c00"/><path d="M13 9V6h6v3M13 13v9M19 13v9" stroke="#fff"/><circle cx="12" cy="28" r="1" fill="#555" stroke="#555"/><circle cx="20" cy="28" r="1" fill="#555" stroke="#555"/>')],
 share:['الأجر بالنشر','#23284d',G('<path d="M16 18v-6M16 12c-3 0-5-2-5-5 3 0 5 2 5 5zM16 13c0-3 2-5 5-5 0 3-2 5-5 5z" fill="#66bb6a" stroke="#66bb6a"/><path d="M5 21c4-2 8-2 11 0l7-2c1.5-.4 2.5 1.2 1.4 2.2L18 26H8" stroke="#ffcc80"/>')],
 more:['المزيد','#f6c915',G('<rect x="7" y="7" width="8" height="8" rx="2" fill="#1f2a5a" stroke="#1f2a5a"/><rect x="17" y="7" width="8" height="8" rx="2" fill="#1f2a5a" stroke="#1f2a5a"/><rect x="7" y="17" width="8" height="8" rx="2" fill="#1f2a5a" stroke="#1f2a5a"/><rect x="17" y="17" width="8" height="8" rx="2" fill="#1f6fd0" stroke="#1f6fd0"/>')],
 cal:['التقويم','#5b1236',G('<rect x="6" y="8" width="20" height="18" rx="3" fill="#fff" stroke="#fff"/><path d="M6 13h20" stroke="#e53935" stroke-width="4"/><path d="M11 6v4M21 6v4" stroke="#fff"/><path d="M10 18h3M15 18h3M20 18h2M10 22h3M15 22h3" stroke="#5b1236"/>')],
 world:['الصلاة حول العالم','#2f6fd0',G('<circle cx="16" cy="16" r="10" fill="#4fc3f7" fill-opacity=".35"/><path d="M6 16h20M16 6c3 3 4 6.5 4 10s-1 7-4 10c-3-3-4-6.5-4-10s1-7 4-10z"/>')],
 fajr:['منبّه الفجر','#1d2b4f',G('<circle cx="16" cy="17" r="8" fill="#ffb74d" fill-opacity=".25" stroke="#ffb74d"/><path d="M16 12v5l3 2M7 8l3-3M25 8l-3-3" stroke="#fff"/>')],
 ramadan:['رمضان','#f39c32',G('<path d="M16 4v3"/><path d="M12 9h8l2 4-2 11h-8l-2-11z" fill="#1f2a5a" stroke="#1f2a5a"/><path d="M14 13h4l-1 8h-2z" fill="#ffe082" stroke="#ffe082"/>')],
 settings:['الإعدادات','#f08a24',G('<circle cx="16" cy="16" r="4" fill="#1f2a5a" stroke="#1f2a5a"/><path d="M16 5v4M16 23v4M5 16h4M23 16h4M8.2 8.2l2.8 2.8M21 21l2.8 2.8M8.2 23.8L11 21M21 11l2.8-2.8" stroke="#1f2a5a" stroke-width="3"/>')],
 fasting:['الصيام','#1d6f8f',G('<path d="M19 6a10 10 0 1 0 7 16 8 8 0 0 1-7-16z" fill="#ffe082" stroke="#ffe082"/>')]};
const HOMEF=['mushaf','azkar','tasbih','qibla','dua','khatma','taat','sbank','zakat','travel','share','more'];
const MOREF=['settings','mushaf','azkar','tasbih','qibla','dua','khatma','fasting','taat','sbank','zakat','travel','cal','world','fajr','ramadan','share'];
const fbtn=id=>{const f=FEAT[id];return'<button data-f="'+id+'"><span class="fi" style="background:'+f[1]+'">'+f[2]+'</span>'+f[0]+'</button>'};
function renderMore(){$('#mgrid').innerHTML=MOREF.map(fbtn).join('')}
let pageId='',pageArg=null,backTo='home';
function openF(id){if(id==='azkar'){azTab='m';return go('azkar')}if(id==='tasbih'){azTab='t';return go('azkar')}if(id==='khatma')return go('quran');if(id==='fasting')return go('fast');if(id==='settings')return go('set');if(id==='more')return go('more');
 openPage(id)}
function openPage(id,arg){backTo=cur==='page'?backTo:cur;pageId=id;pageArg=arg;go('page')}
function renderPage(){stopCompass();const r=(PAGES[pageId]||PAGES.share)();$('#pTitle').textContent=r.t;$('#pSub').textContent=r.sub||'';$('#pBody').innerHTML=r.html;r.after&&r.after()}
$('#pBack').addEventListener('click',()=>{stopCompass();go(backTo||'home')});
function loadQ(cb){if(window.QDATA)return cb();const sc=document.createElement('script');sc.src='quran.js';sc.onload=cb;sc.onerror=()=>toast('مقدرتش أحمّل نص المصحف');document.head.appendChild(sc)}
const ayahText=(s,a)=>QDATA.t[QDATA.ss[s-1]+a-2];
const surahOf=id=>{let lo=0,hi=113;while(lo<hi){const m=(lo+hi+1)>>1;if(QDATA.ss[m]<=id)lo=m;else hi=m-1}return lo};
const BASM='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ';
const fmtTz=(t,tz)=>new Intl.DateTimeFormat('ar-EG',{timeZone:tz,hour:'numeric',minute:'2-digit'}).format(new Date(t));
const DUAS=[[2,201,3],[2,286,12],[3,8,0],[3,147,6],[3,193,0],[3,194,0],[7,23,1],[14,40,0],[14,41,0],[17,24,7],[20,25,1,28],[20,114,14],[21,87,14],[21,89,4],[23,118,1],[25,74,2],[27,19,5],[28,24,7],[46,15,21],[59,10,5],[66,8,34],[2,127,7],[2,250,5],[3,173,13],[60,4,45]];
const KAABA=[21.4225,39.8262];
function qiblaBearing(lat,lng){const r=Math.PI/180,f1=lat*r,f2=KAABA[0]*r,dl=(KAABA[1]-lng)*r;const y=Math.sin(dl)*Math.cos(f2),x=Math.cos(f1)*Math.sin(f2)-Math.sin(f1)*Math.cos(f2)*Math.cos(dl);return(Math.atan2(y,x)/r+360)%360}
let compassOn=null;function stopCompass(){if(compassOn){window.removeEventListener('deviceorientationabsolute',compassOn);window.removeEventListener('deviceorientation',compassOn);compassOn=null}}
function startCompass(){stopCompass();const br=qiblaBearing(S.loc.lat,S.loc.lng);let buzzed=false;
 compassOn=e=>{let h=null;if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;else if(e.absolute&&typeof e.alpha==='number')h=360-e.alpha;else if(e.type==='deviceorientation'&&typeof e.alpha==='number'&&!('ondeviceorientationabsolute' in window))h=360-e.alpha;if(h==null)return;
  const dial=$('#dial');if(!dial)return stopCompass();dial.setAttribute('transform','rotate('+(-h)+' 150 150)');const diff=Math.abs(((br-h+540)%360)-180);
  const ok=diff<6;$('#qStat').textContent=ok?'انت متجه للقبلة الآن':'لف الموبايل لحد ما السهم يبقى لفوق';$('#qStat').style.color=ok?'var(--ok)':'';if(ok&&!buzzed){buzzed=true;try{navigator.vibrate&&navigator.vibrate(80)}catch(x){}}if(!ok)buzzed=false};
 if(typeof DeviceOrientationEvent!=='undefined'&&DeviceOrientationEvent.requestPermission){DeviceOrientationEvent.requestPermission().then(r=>{if(r==='granted')window.addEventListener('deviceorientation',compassOn)}).catch(()=>{})}
 else{window.addEventListener('deviceorientationabsolute',compassOn);window.addEventListener('deviceorientation',compassOn)}}
function travelInfo(){if(!S.home)return null;const km=distKm(S.loc.lat,S.loc.lng,S.home.lat,S.home.lng);return km>=83?{km}:null}
const SHARE_URL='https://github.com/saadabesoft-collab/Zker/releases/latest/download/zikr.apk';
function shareText(t){const Sh=CAP&&CAP.Plugins&&CAP.Plugins.Share;
 if(NATIVE&&Sh)return Sh.share({title:'ذِكْر',text:t}).catch(()=>{});
 if(navigator.share)return navigator.share({title:'ذِكْر',text:t}).catch(()=>{});
 try{navigator.clipboard.writeText(t).then(()=>toast('اتنسخ — ابعته لأي حد'),()=>toast('مقدرتش أنسخ'))}catch(e){toast('مقدرتش أنسخ')}}
function hijriMonthStart(off){let k=addD(T,-(hij(T).d-1));for(let i=0;i<Math.abs(off);i++){if(off>0){k=addD(k,32);k=addD(k,-(hij(k).d-1))}else{k=addD(k,-2);k=addD(k,-(hij(k).d-1))}}return k}
let calOff=0,worldCity=0;
const WORLD=CITIES.concat([['القدس',31.7683,35.2137,'Asia/Jerusalem','MuslimWorldLeague'],['باريس',48.8566,2.3522,'Europe/Paris','MuslimWorldLeague'],['نيويورك',40.7128,-74.006,'America/New_York','NorthAmerica'],['تورنتو',43.6532,-79.3832,'America/Toronto','NorthAmerica'],['كوالالمبور',3.139,101.6869,'Asia/Kuala_Lumpur','Singapore'],['جاكرتا',-6.2088,106.8456,'Asia/Jakarta','Singapore'],['كراتشي',24.8607,67.0011,'Asia/Karachi','Karachi'],['عمّان',31.9454,35.9284,'Asia/Amman','MuslimWorldLeague'],['الخرطوم',15.5007,32.5599,'Africa/Khartoum','Egyptian'],['الدار البيضاء',33.5731,-7.5898,'Africa/Casablanca','MuslimWorldLeague'],['سيدني',-33.8688,151.2093,'Australia/Sydney','MuslimWorldLeague']]);
const cur$=()=>S.cur||'ج.م';
const num=v=>Math.max(0,+String(v||'').replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d))||0);
const money=v=>Math.round(v).toLocaleString('ar-EG')+' '+cur$();

const PAGES={
 mushaf(){const W=S.wird;let p=Math.max(1,Math.min(TOTAL,pageArg||S.mushaf||Math.min(TOTAL,W.page+1)));S.mushaf=p;
  return{t:'المصحف',sub:'صفحة '+AR(p)+' من '+AR(TOTAL)+' — الجزء '+AR(juzAt(p)),html:'<div class="mush" id="mush"><p class="muted" style="text-align:center">جاري تحميل المصحف…</p></div>'+
   '<div class="mnav"><button class="btn blue" data-x="mnext">الصفحة اللي بعدها</button><button class="btn ghost" data-x="mprev">اللي قبلها</button></div>'+
   '<div class="mnav"><input type="number" id="mGo" min="1" max="604" inputmode="numeric" value="'+p+'" style="width:96px"><button class="btn sm ghost" data-x="mgo">روح للصفحة</button><select id="mSurah"><option value="">السورة</option>'+SURAH.map((s,i)=>'<option value="'+SP[i]+'">'+AR(i+1)+'. '+s+'</option>').join('')+'</select></div>'+
   '<div class="card" style="margin-top:14px"><div class="row"><div class="sp"><b>وردك وصل لصفحة '+AR(W.page)+'</b><div class="muted">لما تقلب لصفحة جديدة بعد آخر صفحة قريتها، بتتحسب في وردك لوحدها</div></div><button class="btn sm" data-x="mmark">علّمت لحد هنا</button></div></div>'+
   '<p class="muted" style="text-align:center;font-size:12px">نص المصحف برواية حفص من مشروع تنزيل tanzil.net، وترقيم الصفحات حسب مصحف المدينة</p>',
   after(){loadQ(()=>{const a=QDATA.pg[p-1],b=QDATA.pg[p]-1;let h='',sIdx=-1;let txt='';
    for(let id=a;id<=b;id++){const s=surahOf(id),n=id-QDATA.ss[s]+1;
     if(n===1){if(txt){h+='<div class="qtext">'+txt+'</div>';txt=''}h+='<div class="shead">سورة '+esc(SURAH[s])+'</div>'+(s!==0&&s!==8?'<div class="basm">'+BASM+'</div>':'')}
     txt+=esc(QDATA.t[id-1])+' <span class="an">۝'+AR(n)+'</span> ';sIdx=s}
    h+='<div class="qtext">'+txt+'</div>';const m=$('#mush');if(m)m.innerHTML=h;$('#pSub').textContent='سورة '+SURAH[surahOf(a)]+' — صفحة '+AR(p)+' — الجزء '+AR(juzAt(p));
    let x0=null;m&&m.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});m&&m.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>70)mushTurn(dx>0?1:-1)})})}}},
 qibla(){const br=qiblaBearing(S.loc.lat,S.loc.lng),km=distKm(S.loc.lat,S.loc.lng,KAABA[0],KAABA[1]);
  let ticks='';for(let i=0;i<72;i++){const a=i*5,l=i%6?6:14;ticks+='<line x1="150" y1="14" x2="150" y2="'+(14+l)+'" stroke="currentColor" stroke-width="'+(i%18?1:2.5)+'" transform="rotate('+a+' 150 150)"/>'}
  return{t:'القبلة',sub:esc(S.loc.name),html:'<div class="card sec" style="text-align:center"><div class="compass"><svg viewBox="0 0 300 300" style="color:var(--muted)"><circle cx="150" cy="150" r="146" fill="var(--soft)"/><g id="dial">'+ticks+
   '<text x="150" y="44" text-anchor="middle" font-size="20" font-weight="700" fill="var(--warn)">ش</text><text x="150" y="272" text-anchor="middle" font-size="16" fill="currentColor">ج</text><text x="262" y="156" text-anchor="middle" font-size="16" fill="currentColor">ق</text><text x="38" y="156" text-anchor="middle" font-size="16" fill="currentColor">غ</text>'+
   '<g transform="rotate('+br+' 150 150)"><path d="M150 40l12 26h-24z" fill="var(--green)"/><line x1="150" y1="64" x2="150" y2="150" stroke="var(--green)" stroke-width="4"/><g transform="translate(138 22)"><rect width="24" height="20" rx="2" fill="#111"/><rect y="6" width="24" height="4" fill="#d4a43a"/></g></g></g><circle cx="150" cy="150" r="8" fill="var(--ink)"/><path d="M150 4l8 14h-16z" fill="var(--acc)"/></svg></div>'+
   '<div class="big">'+AR(Math.round(br))+'°</div><p class="muted" style="margin:4px 0">اتجاه القبلة من الشمال — مكة على بعد '+AR(Math.round(km))+' كم</p><p id="qStat" style="font-weight:600;min-height:26px">حرّك الموبايل على شكل 8 عشان البوصلة تتظبط</p><button class="btn blue" data-x="compass">شغّل البوصلة</button></div>'+
   '<p class="muted">حط الموبايل مفرود، وابعده عن الحديد والمغناطيس. لو البوصلة مش شغالة على جهازك، استخدم الزاوية المكتوبة.</p>',after(){startCompass()}}},
 dua(){return{t:'الدعاء',sub:'أدعية من القرآن الكريم',html:'<div id="duaL" class="sec"><p class="muted">جاري التحميل…</p></div>',after(){loadQ(()=>{const el=$('#duaL');if(!el)return;
   el.innerHTML=DUAS.map(([s,a,w,a2])=>{let t=ayahText(s,a).split(' ').slice(w).join(' ');if(a2)for(let i=a+1;i<=a2;i++)t+=' '+ayahText(s,i);return'<div class="card"><div class="qtext" style="text-align:right;text-align-last:right;font-size:22px">'+esc(t)+'</div><div class="row"><span class="src">سورة '+esc(SURAH[s-1])+' — آية '+AR(a)+(a2?'–'+AR(a2):'')+'</span><span class="sp"></span><button class="btn sm ghost" data-copy="'+esc(t)+'">انسخ</button></div></div>'}).join('')})}}},
 taat(){const days=[];for(let i=6;i>=0;i--)days.push(addD(T,-i));const W=S.wird;
  const rows=[['الصلوات',k=>PRAYERS.filter(n=>(S.prayed[k]||{})[n]).length/5],['أذكار الصباح',k=>azDone(k,'m')?1:0],['أذكار المساء',k=>azDone(k,'e')?1:0],['ورد القرآن',k=>Math.min(1,(W.log[k]||0)/Math.max(1,wird().target))],['الصدقة',k=>S.sadaqa[k]?1:0],['الصيام',k=>S.fasted[k]?1:0],['عمل اليوم',k=>Object.values(S.deeds[k]||{}).filter(Boolean).length/DEEDS.length]];
  let score=0,cnt=0;const grid=rows.map(([n,f])=>'<span>'+n+'</span>'+days.map(k=>{const v=f(k);if(n!=='الصيام'){score+=v;cnt++}return'<i style="background:color-mix(in srgb,var(--green) '+Math.round(v*100)+'%,var(--line))"></i>'}).join('')).join('');
  let pages=0,streak=0;days.forEach(k=>pages+=W.log[k]||0);for(let i=0;i<400;i++){if((W.log[addD(T,-i)]||0)>0)streak++;else if(i>0)break}
  const pr=days.reduce((a,k)=>a+PRAYERS.filter(n=>(S.prayed[k]||{})[n]).length,0);
  return{t:'طاعاتك',sub:'آخر ٧ أيام',html:'<div class="card sec"><div class="stats" style="margin:0"><div><b>'+AR(Math.round(score/cnt*100))+'٪</b><span>التزامك</span></div><div><b>'+AR(pages)+'</b><span>صفحة قرآن</span></div><div><b>'+AR(pr)+'/'+AR(35)+'</b><span>صلاة علّمتها</span></div></div></div>'+
   '<div class="card"><div class="rep"><span></span>'+days.map(k=>'<span style="text-align:center">'+DAYS[dow(k)].slice(0,3)+'</span>').join('')+grid+'</div><p class="muted" style="margin:10px 0 0">كل مربع غامق = عملتها كاملة. علّم صلاتك وأذكارك وورد يومك من الشاشة الرئيسية.</p></div>'+
   '<div class="card"><h3>سلسلة الورد</h3><p class="big" style="margin:6px 0">'+AR(streak)+' يوم ورا بعض</p><p class="muted">«أحب الأعمال إلى الله أدومها وإن قلّ» — متفق عليه</p></div>'}},
 sbank(){const L=S.sbank||[];const ym=T.slice(0,7),y=T.slice(0,4);let m=0,yr=0;L.forEach(x=>{if(x.d.startsWith(ym))m+=x.a;if(x.d.startsWith(y))yr+=x.a});const goal=S.sgoal||0;const hd=pickH('sadaqa',diffD('2026-01-01',T));
  return{t:'بنك الصدقات',sub:'سجّل صدقاتك وتابعها',html:'<div class="card sec"><div class="stats" style="margin:0"><div><b>'+money(m)+'</b><span>الشهر ده</span></div><div><b>'+money(yr)+'</b><span>السنة دي</span></div><div><b>'+AR(L.length)+'</b><span>صدقة</span></div></div>'+
   (goal?'<p class="muted" style="margin:12px 0 4px">هدفك الشهري '+money(goal)+'</p><div class="bar"><i style="width:'+Math.min(100,m/goal*100)+'%"></i></div>':'')+
   '<div class="hb"><small>حديث شريف</small><div class="hadith" style="font-size:17px">«'+esc(hd[0])+'»</div><div class="src">'+esc(hd[1])+'</div></div></div>'+
   '<div class="card"><h3>صدقة جديدة</h3><div class="kv" style="margin-top:10px"><input type="number" id="sbA" inputmode="decimal" placeholder="المبلغ"><input id="sbN" placeholder="لمين؟ (اختياري)" style="background:var(--soft);border:1px solid var(--line);border-radius:10px;padding:8px 10px;min-height:44px"></div><div class="row" style="margin-top:10px"><button class="btn" data-x="sbadd">سجّل الصدقة</button><span class="muted">العملة</span><select id="sbC">'+['ج.م','د.إ','ر.س','€','$'].map(c=>'<option '+(cur$()===c?'selected':'')+'>'+c+'</option>').join('')+'</select></div>'+
   '<div class="set"><label for="sbG">هدف شهري<small>اختياري</small></label><input type="number" id="sbG" inputmode="decimal" value="'+(goal||'')+'" placeholder="0"></div></div>'+
   '<div class="card slist"><h3>آخر الصدقات</h3>'+(L.length?L.slice(-30).reverse().map((x,i)=>'<div class="row"><b>'+money(x.a)+'</b><span class="sp muted">'+esc(x.n||'')+' — '+fmtG(x.d)+'</span><button class="btn sm ghost" data-x="sbdel" data-i="'+(L.length-1-i)+'">مسح</button></div>').join(''):'<p class="muted">لسه مسجلتش صدقات.</p>')+'</div>'}},
 zakat(){const z=S.zk||{};const f=(k,l,h)=>'<label style="display:block"><span class="muted">'+l+'</span><input type="number" inputmode="decimal" data-zk="'+k+'" value="'+(z[k]||'')+'" placeholder="0" style="width:100%">'+(h?'<small class="muted">'+h+'</small>':'')+'</label>';
  return{t:'حاسبة الزكاة',sub:'زكاة المال والذهب والتجارة',html:'<div class="card sec"><div class="kv">'+f('cash','فلوس سايلة وأرصدة بنك')+f('trade','بضاعة تجارة (بسعر البيع)')+f('owed','ديون ليك مضمونة')+f('debts','ديون عليك حالّة')+
   f('g24','ذهب عيار ٢٤ (جرام)')+f('g21','ذهب عيار ٢١ (جرام)')+f('g18','ذهب عيار ١٨ (جرام)')+f('silver','فضة (جرام)')+f('gp','سعر جرام الذهب عيار ٢٤','اكتبه من سعر النهارده')+f('sp','سعر جرام الفضة')+'</div></div><div class="card field" id="zkOut"></div>'+
   '<p class="muted">النصاب = قيمة ٨٥ جرام ذهب عيار ٢٤. الزكاة ٢٫٥٪ من المال اللي عدّى عليه سنة هجرية كاملة وهو فوق النصاب. ذهب الزينة الملبوس فيه خلاف بين العلماء، فاسأل دار الإفتاء في حالتك.</p>',after:zkCalc}},
 travel(){const tr=travelInfo();const h=S.home;
  return{t:'المسافر',sub:tr?'انت دلوقتي مسافر':'رخص السفر',html:'<div class="card sec'+(tr?' field':'')+'"><h3>'+(tr?'انت على بعد '+AR(Math.round(tr.km))+' كم من بلدك':'انت في بلدك')+'</h3><p class="muted" style="margin:6px 0 0">بلدك المسجلة: '+(h?esc(h.name):'مش محددة')+' — مكانك الحالي: '+esc(S.loc.name)+'</p><div class="row" style="margin-top:10px"><button class="btn sm '+(tr?'ghost':'')+'" data-x="sethome">مكاني الحالي هو بلدي</button><select id="homeC"><option value="">أو اختار بلدك</option>'+CITIES.map((c,i)=>'<option value="'+i+'">'+c[0]+'</option>').join('')+'</select></div></div>'+
   '<div class="card"><h3>القصر</h3><p>الظهر والعصر والعشاء ركعتين بدل أربعة. المغرب والفجر زي ما هما.</p><h3>الجمع</h3><p>تجمع الظهر مع العصر، والمغرب مع العشاء، جمع تقديم أو تأخير.</p><p class="muted">البرنامج بيعتبرك مسافر لما تبعد حوالي ٨٣ كم أو أكتر عن بلدك، وده قول جمهور العلماء. لو هتقعد في مكان أكتر من ٤ أيام، فيه خلاف بين العلماء في القصر.</p></div>'+
   '<div class="card"><h3>دعاء السفر</h3><div class="qtext" style="text-align:right;text-align-last:right;font-size:22px" id="safarD"></div><div class="src">سورة الزخرف — آية ١٣–١٤</div></div>',after(){loadQ(()=>{const el=$('#safarD');if(el)el.textContent=ayahText(43,13).split(' ').slice(11).join(' ')+' '+ayahText(43,14)})}}},
 share(){const t='حمّل تطبيق ذِكْر — مواقيت الصلاة والأذان والأذكار وورد القرآن والصيام، وبيفكّرك بصوت. صدقة جارية من BeSoft.\n'+SHARE_URL;
  return{t:'الأجر بالنشر',sub:'الدال على الخير كفاعله',html:'<div class="card sec field" style="text-align:center"><svg viewBox="0 0 512 512" style="width:96px;height:96px;border-radius:24px"><use href="#logo"/></svg><h2 style="margin:10px 0 4px">انشر ذِكْر وخُد الأجر</h2><p class="muted">كل ما حد يستخدمه ويذكر ربنا، ليك مثل أجره إن شاء الله.</p><button class="btn blue" data-x="share" style="margin-top:8px">شارك البرنامج</button></div>'+
   '<div class="card"><p class="muted" style="margin:0 0 6px">ده اللي هيتبعت:</p><p style="white-space:pre-line;margin:0">'+esc(t)+'</p></div>'}},
 cal(){const k0=hijriMonthStart(calOff),h0=hij(k0);let cells='';const lead=(dow(k0)+1)%7;for(let i=0;i<lead;i++)cells+='<div></div>';let k=k0,ev=[];
  for(let i=0;i<31;i++){const h=hij(k);if(i>0&&h.d===1)break;const f=fastInfo(k);const cls=f.forbidden?'x':(f.list.length&&wanted(f)?'f':'');cells+='<div class="d '+cls+(k===T?' t':'')+'"><b>'+AR(h.d)+'</b><span>'+AR(ymd(k)[2])+' '+fmtG(k,{month:'short'})+'</span></div>';if(f.forbidden||(f.list.length&&!f.ramadan&&f.list.some(x=>x.t==='special')))ev.push([k,f.l]);k=addD(k,1)}
  return{t:'التقويم',sub:HM[h0.m-1]+' '+AR(h0.y)+' هـ',html:'<div class="card sec"><div class="row"><button class="btn sm ghost" data-x="calp">الشهر اللي فات</button><span class="sp" style="text-align:center"><b>'+HM[h0.m-1]+' '+AR(h0.y)+'</b></span><button class="btn sm ghost" data-x="caln">الشهر الجاي</button></div>'+
   '<div class="cal" style="margin-top:12px">'+['سبت','حد','اتنين','تلات','أربع','خميس','جمعة'].map(d=>'<div class="hd">'+d+'</div>').join('')+cells+'</div><p class="muted" style="margin:10px 0 0"><span class="pill" style="background:color-mix(in srgb,var(--acc) 16%,transparent)">صيام سنة</span> <span class="pill" style="background:color-mix(in srgb,var(--warn) 16%,transparent)">يحرم صيامه</span></p></div>'+
   (ev.length?'<div class="card"><h3>مناسبات الشهر</h3>'+ev.map(([k,l])=>'<div class="fd"><div class="dt"><b>'+AR(hij(k).d)+'</b><span>'+DAYS[dow(k)]+'</span></div><div class="sp"><b>'+esc(l)+'</b><div class="muted">'+fmtG(k)+'</div></div></div>').join('')+'</div>':'')}},
 world(){const c=WORLD[worldCity]||WORLD[0];const A=adhan;const pr=(A.CalculationMethod[c[4]]||A.CalculationMethod.MuslimWorldLeague)();if(Math.abs(c[1])>48)pr.highLatitudeRule=A.HighLatitudeRule.recommended(new A.Coordinates(c[1],c[2]));
  const now=new Date();const dp=new Intl.DateTimeFormat('en-CA',{timeZone:c[3]}).format(now).split('-').map(Number);const t=new A.PrayerTimes(new A.Coordinates(c[1],c[2]),new Date(dp[0],dp[1]-1,dp[2]),pr);
  return{t:'الصلاة حول العالم',sub:'مواقيت أي مدينة',html:'<div class="card sec"><select id="wCity" style="width:100%">'+WORLD.map((x,i)=>'<option value="'+i+'" '+(i===worldCity?'selected':'')+'>'+x[0]+'</option>').join('')+'</select><p class="muted">الساعة هناك دلوقتي: <b>'+fmtTz(now,c[3])+'</b></p>'+
   ['fajr','sunrise','dhuhr','asr','maghrib','isha'].map(n=>'<div class="set"><label>'+PN[n]+'</label><b>'+fmtTz(t[n],c[3])+'</b></div>').join('')+'</div>'}},
 fajr(){const N=S.n;return{t:'منبّه الفجر',sub:'قم لصلاة الفجر',html:'<div class="card sec"><div class="set"><label>منبّه قبل الفجر<small>بيفضل يرن ويتكرر كل ٥ دقايق لحد ما تدوس إغلاق</small></label>'+sw('fajrAlarm',N.fajrAlarm)+'</div>'+
   '<div class="set"><label>قبل الأذان بـ</label><div class="row"><input type="number" data-n="fajrBefore" min="0" max="120" value="'+N.fajrBefore+'"><span class="muted">دقيقة</span></div></div>'+
   '<div class="set"><label for="fjS">صوت المنبّه</label><select id="fjS"><option value="adhan" '+(N.fajrSound!=='tts'?'selected':'')+'>أذان الفجر</option><option value="tts" '+(N.fajrSound==='tts'?'selected':'')+'>صوت: الصلاة خير من النوم</option></select></div>'+
   '<p class="muted">الفجر بكرة الساعة '+fmtT(pt(addD(T,1)).fajr)+'</p></div><div class="card"><div class="hb" style="margin:0"><small>حديث شريف</small><div class="hadith" style="font-size:17px">«لو يعلمون ما في العتمة والصبح لأتوهما ولو حبوًا»</div><div class="src">متفق عليه — من حديث: لو يعلم الناس ما في النداء والصف الأول</div></div></div>'}},
 ramadan(){const d=daysToRamadan(T),h=hij(T);return{t:'رمضان',sub:h.m===9?'اليوم '+AR(h.d)+' رمضان':'فاضل '+AR(d)+' يوم',html:'<div class="card sec field"><p class="muted" style="margin:0">'+(h.m===9?'رمضان كريم':'فاضل على رمضان')+'</p><div class="big">'+(h.m===9?AR(h.d)+' رمضان':AR(d)+' يوم')+'</div><p class="muted">البرنامج بيتحول لوضع رمضان لوحده: عداد للإفطار والسحور، تذكير بالتراويح وزكاة الفطر، ختمة رمضان، وفي العشر الأواخر قيام الليل والليالي الوترية.</p></div>'+
   '<div class="card"><h3>عاين شكل رمضان دلوقتي</h3><div class="row" style="margin-top:8px">'+[['ramadan','رمضان'],['last10','العشر الأواخر'],['eid','العيد'],['auto','رجّع تلقائي']].map(([k,l])=>'<button class="btn sm '+(S.season===k?'':'ghost')+'" data-se="'+k+'">'+l+'</button>').join('')+'</div></div>'+
   '<div class="card"><h3>قضاء رمضان</h3><p class="muted">عليك '+AR(S.qada)+' يوم — عدّلهم من صفحة الصيام.</p></div>'}}};
function mushTurn(dir){const W=S.wird;const p=S.mushaf||1;const np=Math.max(1,Math.min(TOTAL,p+dir));if(np===p)return;
 if(dir>0&&p===W.page+1){addPages(1);toast('اتحسبت صفحة في وردك')}S.mushaf=np;save();pageArg=np;renderPage();window.scrollTo(0,0)}
function zkCalc(){const z=S.zk||{};const g=num(z.g24)+num(z.g21)*21/24+num(z.g18)*18/24;const gp=num(z.gp);const tot=num(z.cash)+num(z.trade)+num(z.owed)-num(z.debts)+g*gp+num(z.silver)*num(z.sp);const nis=85*gp;const el=$('#zkOut');if(!el)return;
 el.innerHTML=!gp?'<p style="margin:0">اكتب سعر جرام الذهب عيار ٢٤ عشان أحسب النصاب.</p>':'<div class="stats" style="margin:0"><div><b>'+money(tot)+'</b><span>إجمالي أموالك</span></div><div><b>'+money(nis)+'</b><span>النصاب</span></div><div><b>'+(tot>=nis?money(tot*.025):'٠')+'</b><span>الزكاة</span></div></div><p class="muted" style="margin:10px 0 0">'+(tot>=nis?'مالك فوق النصاب — الزكاة ٢٫٥٪ لو عدّى عليه سنة هجرية.':'مالك تحت النصاب، مفيش زكاة عليه دلوقتي.')+'</p>'}
document.body.addEventListener('click',e=>{const b=e.target.closest('[data-x],[data-copy]');if(!b)return;const x=b.dataset.x;
 if(b.dataset.copy){try{navigator.clipboard.writeText(b.dataset.copy).then(()=>toast('اتنسخ'))}catch(er){}return}
 if(x==='mnext')return mushTurn(1);if(x==='mprev')return mushTurn(-1);
 if(x==='mgo'){const v=Math.max(1,Math.min(TOTAL,num($('#mGo').value)||1));S.mushaf=v;pageArg=v;save();return renderPage()}
 if(x==='mmark'){const p=S.mushaf||1;addPages(p-S.wird.page);toast('وردك وصل لصفحة '+AR(p));return renderPage()}
 if(x==='compass'){startCompass();toast('حرّك الموبايل على شكل 8');return}
 if(x==='sbadd'){const a=num($('#sbA').value);if(!a)return toast('اكتب المبلغ');S.sbank=S.sbank||[];S.sbank.push({d:T,a,n:$('#sbN').value.trim().slice(0,60)});S.sadaqa[T]=1;ackKind('sadaqa',T);save();toast('تقبّل الله منك');return renderPage()}
 if(x==='sbdel'){S.sbank.splice(+b.dataset.i,1);save();return renderPage()}
 if(x==='sethome'){S.home={name:S.loc.name,lat:S.loc.lat,lng:S.loc.lng};save();toast('بلدك اتسجلت: '+S.loc.name);return renderPage()}
 if(x==='share')return shareText('حمّل تطبيق ذِكْر — مواقيت الصلاة والأذان والأذكار وورد القرآن والصيام، وبيفكّرك بصوت. صدقة جارية من BeSoft.\n'+SHARE_URL);
 if(x==='calp'){calOff--;return renderPage()}if(x==='caln'){calOff++;return renderPage()}});
document.body.addEventListener('input',e=>{const t=e.target;if(t.dataset.zk){S.zk=S.zk||{};S.zk[t.dataset.zk]=t.value;save();zkCalc()}});
document.body.addEventListener('change',e=>{const t=e.target;
 if(t.id==='mSurah'&&t.value){S.mushaf=+t.value;pageArg=+t.value;save();renderPage()}
 if(t.id==='sbC'){S.cur=t.value;save();renderPage()}if(t.id==='sbG'){S.sgoal=num(t.value);save();renderPage()}
 if(t.id==='homeC'&&t.value!==''){const c=CITIES[+t.value];S.home={name:c[0],lat:c[1],lng:c[2]};save();toast('بلدك اتسجلت: '+c[0]);renderPage()}
 if(t.id==='wCity'){worldCity=+t.value;renderPage()}if(t.id==='fjS'){S.n.fajrSound=t.value;save()}});
