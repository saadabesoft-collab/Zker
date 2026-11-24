/* ================= RENDER: HOME (hero scene, date bar, times, grid) ================= */
let viewOff=0;
function nextPrayer(now){for(const k of[T,addD(T,1)]){const p=pt(k);for(const n of['fajr','sunrise','dhuhr','asr','maghrib','isha'])if(p[n]>now)return{n,t:p[n],k}}}
function nightTimes(k){const p=pt(k),nf=pt(addD(k,1)).fajr;const len=nf-p.maghrib;return{mid:p.maghrib+len/2,third:nf-len/3}}
const PICON={
 fajr:'<svg viewBox="0 0 32 32"><path d="M19 7a8 8 0 1 0 6 12 7 7 0 0 1-6-12z" fill="#29b6f6"/><path d="M8 24a4 4 0 0 1 4-4 5 5 0 0 1 9.6 1.4A3 3 0 0 1 21 27H10a3 3 0 0 1-2-3z" fill="#b3e5fc"/></svg>',
 sunrise:'<svg viewBox="0 0 32 32"><path d="M8 21a8 8 0 0 1 16 0z" fill="#ffb74d"/><path d="M16 6v4M7 10l3 3M25 10l-3 3M4 21h24M10 25h12" stroke="#fb8c00" stroke-width="2.2" stroke-linecap="round"/></svg>',
 dhuhr:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="6.5" fill="#fdd835"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8" stroke="#fbc02d" stroke-width="2.2" stroke-linecap="round"/></svg>',
 asr:'<svg viewBox="0 0 32 32"><circle cx="13" cy="12" r="6" fill="#fdd835"/><path d="M9 26a4.5 4.5 0 0 1 1.5-8.7 6 6 0 0 1 11.5 1.2A4 4 0 0 1 22 26z" fill="#b39ddb"/></svg>',
 maghrib:'<svg viewBox="0 0 32 32"><path d="M8 19a8 8 0 0 1 16 0z" fill="#ff8a65"/><path d="M4 19h24M16 22v6m-3-3l3 3 3-3M16 5v4M7 9l2.5 2.5M25 9l-2.5 2.5" stroke="#f4511e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
 isha:'<svg viewBox="0 0 32 32"><path d="M19 4a12 12 0 1 0 9 19 10 10 0 0 1-9-19z" fill="#283593"/><circle cx="24" cy="8" r="1.4" fill="#ffd54f"/></svg>'};
function phase(now){const p=pt(T);if(now<p.fajr||now>p.isha+20*6e4)return'night';if(now<p.sunrise+20*6e4)return'dawn';if(now<p.asr)return'day';if(now<p.maghrib-50*6e4)return'asr';if(now<p.isha)return'sunset';return'night'}
function drawScene(name){const ph=phase(Date.now());const rm=name==='ramadan'||name==='last10';
 const SK={night:['#0b1438','#22306a','#3b3f85'],dawn:['#2c3a74','#8a6aa8','#f0a487'],day:['#3aa3e0','#7cc8ef','#c6ebfa'],asr:['#4b97cf','#9fc8e4','#f6d29c'],sunset:['#2b2963','#9b4f8e','#f3a06f']}[rm&&ph!=='day'?'night':ph];
 const dark=ph==='night'||ph==='dawn'||(rm&&ph!=='day');const wall=dark?'#c9cfe6':'#f4f6fc',wall2=dark?'#aab2d6':'#e3e8f6',dome=dark?'#2a6fb0':'#29a3df',tile=dark?'#b97a4a':'#f2a65a',arch=dark?'#2a2d63':'#3e3f8f',win=dark?'#ffd98a':'#5e57a6',hill=dark?'#1a2450':'#5c6fa8',tree=dark?'#1d4a3a':'#3f8f55';
 let s='<defs><linearGradient id="skg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+SK[0]+'"/><stop offset=".6" stop-color="'+SK[1]+'"/><stop offset="1" stop-color="'+SK[2]+'"/></linearGradient>'+
  '<linearGradient id="dmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fd3ff"/><stop offset="1" stop-color="'+dome+'"/></linearGradient>'+
  '<mask id="mm"><rect width="400" height="300" fill="#fff"/><circle cx="83" cy="52" r="15" fill="#000"/></mask>'+
  '<symbol id="mnr" viewBox="0 0 20 170"><path d="M10 0v8" stroke="#e7b24a" stroke-width="1.5"/><path d="M3 22a7 7 0 0 1 14 0z" fill="url(#dmg)"/><rect x="2" y="22" width="16" height="16" fill="'+wall+'"/><rect x="5" y="25" width="3" height="10" rx="1.5" fill="'+win+'"/><rect x="12" y="25" width="3" height="10" rx="1.5" fill="'+win+'"/><rect x="0" y="38" width="20" height="4" fill="'+tile+'"/><rect x="4" y="42" width="12" height="128" fill="'+wall2+'"/><rect x="7" y="60" width="6" height="12" rx="3" fill="'+win+'"/></symbol>'+
  '<symbol id="lan" viewBox="0 0 20 44"><path d="M10 0v8" stroke="#ffd36b" stroke-width="1"/><path d="M6 8h8l2 6-2 20H6L4 14z" fill="#ffd36b"/><path d="M7 14h6l-1 16H8z" fill="#fff6d6" opacity=".9"/><path d="M6 34h8l-2 5H8z" fill="#ffd36b"/></symbol></defs>';
 s+='<rect width="400" height="300" fill="url(#skg)"/>';
 if(dark)for(let i=0;i<40;i++){const x=(i*73)%400,y=8+(i*41)%120;s+='<circle cx="'+x+'" cy="'+y+'" r="'+(i%3?0.8:1.5)+'" fill="#fff" opacity="'+(.35+(i%4)*.15)+'"/>'}
 if(dark)s+='<circle cx="76" cy="58" r="18" fill="#ffe08a" mask="url(#mm)"/>';
 else{const sx=ph==='asr'?96:ph==='day'?80:300,sy=ph==='asr'?150:70;s+='<circle cx="'+sx+'" cy="'+sy+'" r="26" fill="#fff3b0" opacity=".55"/><circle cx="'+sx+'" cy="'+sy+'" r="16" fill="#ffe27a"/>'}
 if(!dark)[[150,120],[165,112],[180,124],[230,100],[244,94]].forEach(([x,y])=>{s+='<path d="M'+x+' '+y+'q4-4 8 0q4-4 8 0" stroke="#2c3e66" stroke-width="1.6" fill="none" opacity=".55"/>'});
 s+='<path d="M0 260C60 228 120 236 170 250S300 226 400 244V300H0z" fill="'+hill+'" opacity=".85"/>';
 s+='<g>';
 s+='<use href="#mnr" x="46" y="96" width="22" height="187"/><use href="#mnr" x="334" y="96" width="22" height="187"/>';
 s+='<rect x="64" y="212" width="272" height="70" fill="'+wall+'"/><rect x="64" y="206" width="272" height="8" fill="'+tile+'"/>';
 for(let i=0;i<7;i++){const x=80+i*36;if(i===3)continue;s+='<path d="M'+x+' 268v-26a8 8 0 0 1 16 0v26z" fill="'+win+'"/>'}
 s+='<path d="M140 206a60 58 0 0 1 120 0z" fill="url(#dmg)"/><rect x="136" y="200" width="128" height="10" fill="'+wall2+'"/><path d="M200 138v-16" stroke="#e7b24a" stroke-width="2"/><circle cx="200" cy="120" r="3" fill="#e7b24a"/>';
 s+='<rect x="166" y="196" width="68" height="86" fill="'+tile+'"/><rect x="172" y="202" width="56" height="80" fill="'+wall+'"/><path d="M180 282v-46a20 22 0 0 1 40 0v46z" fill="'+arch+'"/><path d="M190 282v-34a10 12 0 0 1 20 0v34z" fill="'+(dark?'#ffcf73':'#8d86d6')+'"/>';
 s+='<path d="M64 282v-40a14 14 0 0 1 28 0v40zM308 282v-40a14 14 0 0 1 28 0v40z" fill="'+wall2+'"/>';
 s+='<ellipse cx="30" cy="272" rx="22" ry="26" fill="'+tree+'"/><ellipse cx="374" cy="270" rx="22" ry="28" fill="'+tree+'"/>';
 s+='</g><rect y="282" width="400" height="18" fill="'+(dark?'#1a2450':'#7e8fc4')+'"/>';
 if(rm){s+='<path d="M0 6Q100 40 200 14T400 10" stroke="#ffd36b" stroke-width=".8" fill="none" opacity=".8"/>';[[50,16],[130,26],[210,18],[290,22],[370,12]].forEach(([x,y],i)=>{s+='<use href="#lan" x="'+(x-8)+'" y="'+y+'" width="16" height="'+(34+(i%2)*8)+'"/>'})}
 if(name==='eid')[[40,40],[90,80],[150,30],[250,70],[330,30],[370,90]].forEach(([x,y],i)=>{s+='<rect x="'+x+'" y="'+y+'" width="6" height="6" fill="'+(i%2?'#fff':'#ffd36b')+'" transform="rotate('+(i*30)+' '+x+' '+y+')"/>'});
 s+='<linearGradient id="shd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient><rect width="400" height="150" fill="url(#shd)"/>';
 $('#scene').innerHTML=s}

const DEEDS=[['rawatib','السنن الرواتب','١٢ ركعة في اليوم والليلة'],['witr','الوتر','ولو ركعة واحدة قبل ما تنام'],['duhaD','صلاة الضحى','ركعتين بين الشروق والظهر'],['qiyamD','قيام الليل','ولو ركعتين في الثلث الأخير'],['istighfar','الاستغفار ١٠٠ مرة','أستغفر الله وأتوب إليه'],['salawat','الصلاة على النبي ﷺ','أكثر منها طول اليوم'],['rahim','بر الوالدين أو صلة رحم','مكالمة أو زيارة أو دعوة'],['muhasaba','محاسبة النفس قبل النوم','راجع يومك واستغفر']];
function renderHome(){const sea=seasonOf(T);const VK=addD(T,viewOff);
 document.documentElement.dataset.season=sea.name;
 $('#hDate').textContent=fmtG(VK,{weekday:'long'})+' '+hStr(hij(VK));$('#gDate').textContent=fmtG(VK,{day:'numeric',month:'long',year:'numeric'})+(viewOff?' — '+(viewOff>0?'بعد '+AR(viewOff)+' يوم':'من '+AR(-viewOff)+' يوم'):'');
 $('#cityBtn').innerHTML='<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'+esc(S.loc.name);
 const p=pt(VK);const nx=nextPrayer(Date.now());const pr=S.prayed[VK]||{};
 $('#times').innerHTML=['fajr','sunrise','dhuhr','asr','maghrib','isha'].map(n=>'<button data-p="'+n+'" class="'+(!viewOff&&nx&&nx.k===T&&nx.n===n?'on ':'')+(pr[n]?'prayed':'')+'">'+PN[n]+'<span class="pi">'+PICON[n]+'</span><b>'+fmtT(p[n])+'</b></button>').join('');
 const nt=nightTimes(VK);$('#nightRow').innerHTML='<span>منتصف الليل: <b>'+fmtT(nt.mid)+'</b></span><span>الثلث الأخير: <b>'+fmtT(nt.third)+'</b></span>';
 drawScene(sea.name);
 const P=NATIVE?{permission:'granted'}:window.Notification;
 $('#permCard').innerHTML=(!P||P.permission!=='granted')?'<div class="card" style="border-color:var(--acc);margin-top:12px"><h3>فعّل الإشعارات</h3><p class="muted" style="margin:6px 0 10px">'+(P?'عشان أفكرك بالصلاة والأذكار والصيام حتى لو البرنامج مش قدامك.':'المتصفح ده مش بيدعم الإشعارات — التنبيهات هتظهر جوه البرنامج بس.')+'</p>'+(P&&P.permission!=='denied'?'<button class="btn blue" id="permBtn">فعّل الإشعارات</button>':'')+'</div>':'';
 const tr=travelInfo();$('#travelCard').innerHTML=tr?'<div class="card field" style="margin-top:12px"><div class="row"><b>انت مسافر</b><span class="sp"></span><button class="btn sm ghost" data-f="travel">التفاصيل</button></div><p class="muted" style="margin:6px 0 0">على بعد '+AR(Math.round(tr.km))+' كم من بلدك — يجوز لك قصر الصلاة الرباعية والجمع.</p></div>':'';
 $('#fgrid').innerHTML=HOMEF.map(id=>fbtn(id)).join('');
 const w=wird();const fi=fastInfo(T);const dd=S.deeds[T]||{};
 const tasks=[['m','أذكار الصباح',azDone(T,'m')?'خلصت، تقبّل الله':azCount('m')],['e','أذكار المساء',azDone(T,'e')?'خلصت، تقبّل الله':azCount('e')],
  ['q','ورد القرآن',AR(Math.min(w.done,w.target))+' من '+AR(w.target)+' صفحة — من ص '+AR(w.from)+' لـ ص '+AR(w.to),w.ok],
  ['s','صدقة اليوم',S.sadaqa[T]?'تقبّل الله منك':'ولو بشق تمرة — دوس لما تتصدق',!!S.sadaqa[T]]];
 if(!fi.forbidden&&fi.list.length)tasks.push(['f','صيام: '+fi.l,S.fasted[T]?'صايم — ربنا يتقبل':'لو صايم النهارده دوس هنا',!!S.fasted[T]]);
 const all=tasks.map(([id,t,s,ok])=>[id,t,s,ok??azDone(T,id)]).concat(DEEDS.map(([id,t,s])=>['d:'+id,t,s,!!dd[id]]));
 const prc=PRAYERS.filter(n=>pr[n]).length;const done=all.filter(x=>x[3]).length+prc,tot=all.length+5;
 $('#dPct').textContent='أنجزت '+AR(Math.round(done/tot*100))+'٪ النهارده';$('#dBar').style.width=(done/tot*100)+'%';
 $('#tasks').innerHTML=all.map(([id,t,s,ok])=>'<button class="task'+(ok?' done':'')+'" data-t="'+id+'"><span class="chk"></span><span class="sp"><span class="t">'+t+'</span><br><span class="s">'+s+'</span></span></button>').join('');
 const dn=diffD('2026-01-01',T);const hd=HALL[((dn%HALL.length)+HALL.length)%HALL.length];
 $('#hadithDay').innerHTML='<div class="hadith">«'+esc(hd[0])+'»</div><div class="src" style="margin-top:6px">'+esc(hd[1])+'</div>';
 let nf=[];for(let i=1;i<45&&nf.length<3;i++){const k=addD(T,i),f=fastInfo(k);if(!f.forbidden&&f.list.length&&wanted(f))nf.push([k,f])}
 $('#nextFast').innerHTML=nf.length?nf.map(([k,f])=>'<div class="fd"><div class="dt"><b>'+AR(ymd(k)[2])+'</b><span>'+DAYS[dow(k)]+'</span></div><div class="sp"><b>'+esc(f.l)+'</b><div class="muted">'+hStr(hij(k))+(diffD(T,k)===1?' — بكرة':'')+'</div></div><button class="btn sm tog'+(S.plan[k]?' on':'')+'" data-plan="'+k+'">هصوم</button></div>').join(''):'<p class="muted">مفيش أيام صيام سنة قريبة حسب اختياراتك.</p>';
 const sc=seasonCard(sea);$('#seasonCard').innerHTML=sc?'<div style="margin-top:12px">'+sc+'</div>':'';
 $('#dhikrNow').innerHTML='<div class="tx" style="font-family:Amiri;font-size:23px;line-height:1.9">'+DH[(Math.floor(Date.now()/36e5))%DH.length]+'</div><div class="muted" style="margin-top:6px">ذكر اللحظة — دوس عشان ذكر تاني</div>';
 tickHero()}
function seasonCard(sea){const h=sea.h,p=pt(T),now=Date.now();let o='';
 if(sea.name==='ramadan'||sea.name==='last10'){const fasting=now<p.maghrib&&now>p.fajr;const tgt=fasting?p.maghrib:(now<p.fajr?p.fajr:pt(addD(T,1)).fajr);
  o+='<div class="card field"><div class="row"><span class="pill g">'+AR(h.d)+' رمضان</span>'+(sea.preview?'<span class="pill">معاينة</span>':'')+'</div><p class="muted" style="margin:10px 0 0">'+(fasting?'فاضل على الإفطار':'فاضل على الفجر (آخر وقت للسحور)')+'</p><div class="big" id="ramCd" data-t="'+tgt+'">—</div><div class="muted">الإفطار '+fmtT(p.maghrib)+' • الفجر '+fmtT(pt(addD(T,1)).fajr)+'</div>'+
   '<p class="dua">'+(sea.name==='last10'?QADR:IFTAR)+'</p>'+(sea.name==='last10'?'<p class="muted">الليالي الوترية: '+[21,23,25,27,29].map(n=>'<span class="pill'+(h.d+1===n?' g':'')+'">'+AR(n)+'</span>').join(' ')+(h.d%2===0?' — الليلة دي ليلة '+AR(h.d+1)+' وترية، اجتهد':'')+'</p>':'')+'</div>';
  o+='<div class="card"><h3>ختمة رمضان</h3><p class="muted">ختمة في رمضان = '+AR(20)+' صفحة (جزء) في اليوم.</p><div class="row"><button class="btn sm" data-kh="1">خلّي هدفي ختمة</button><button class="btn sm ghost" data-kh="2">ختمتين</button></div></div>'}
 else if(sea.name==='eid'){o+='<div class="card field"><h2 style="color:var(--hl)">عيد مبارك</h2><p class="dua">'+TAKBIR+'</p><p class="muted">تقبّل الله منّا ومنكم</p></div>'}
 if(sea.prep||(sea.name==='normal'&&daysToRamadan(T)!==null&&daysToRamadan(T)<=60)){const d=sea.preview?10:daysToRamadan(T);
  o+='<div class="card field"><p class="muted" style="margin:0">فاضل على رمضان</p><div class="big">'+AR(d)+' يوم</div><p class="muted">جهّز نفسك: اقضي اللي عليك، وظبّط وردك عشان توصل رمضان وانت متعوّد.</p>'+(S.qada>0?'<p><span class="pill g">عليك '+AR(S.qada)+' يوم قضاء</span></p>':'')+'</div>'}
 const h0=hij(T);if(h0.m===10&&h0.d>=2&&S.shawwal<6)o+='<div class="card"><h3>الست من شوال</h3><p class="muted">صمت '+AR(S.shawwal)+' من ٦</p><div class="bar"><i style="width:'+(S.shawwal/6*100)+'%"></i></div></div>';
 if(h0.m===12&&h0.d<=9)o+='<div class="card field"><h3 style="color:var(--hl)">العشر من ذي الحجة</h3><p class="muted">أعظم أيام الدنيا: أكثر من التكبير والتهليل، وصيام يوم عرفة يكفّر سنتين.</p></div>';
 if(sea.name==='normal'&&h0.d>=13&&h0.d<=15&&!sea.preview)o+='<div class="card"><h3>النهارده من الأيام البيض</h3><p class="muted">'+AR(h0.d)+' '+HM[h0.m-1]+' — صيام ٣ أيام من كل شهر مثل صيام الدهر.</p></div>';
 return o}
function tickHero(){const now=Date.now();const nx=nextPrayer(now);if(!nx)return;
 $('#nextName').textContent=nx.n==='sunrise'?'الشروق الساعة '+fmtT(nx.t):'الأذان الساعة '+fmtT(nx.t);$('#nextLbl').textContent=PN[nx.n]+' بعد';
 $('#nextCd').textContent=cd(nx.t-now);const r=$('#ramCd');if(r)r.textContent=cd(+r.dataset.t-now)}
const cd=ms=>{ms=Math.max(0,ms);const s=Math.floor(ms/1e3),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return AR(h)+':'+String(m).padStart(2,'0').replace(/\d/g,d=>AR(d))+':'+String(x).padStart(2,'0').replace(/\d/g,d=>AR(d))};
