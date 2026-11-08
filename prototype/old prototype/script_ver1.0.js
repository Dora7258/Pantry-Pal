const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const CATS=['Fruits & Veggies','Dairy & Eggs','Meat & Seafood','Bakery','Grains & Pasta','Snacks','Beverages','Condiments','Frozen','Canned Goods','Other'];
const ICON={'Fruits & Veggies':'🥦','Dairy & Eggs':'🥚','Meat & Seafood':'🥩','Bakery':'🍞','Grains & Pasta':'🍝','Snacks':'🍿','Beverages':'🥤','Condiments':'🧂','Frozen':'🧊','Canned Goods':'🥫','Other':'🛒'};
let users=store.get('pp_users',{}),me=store.get('pp_me',null),items=[],filter='all',cat=CATS[0],remDays=3,editId=null,mode='in',calD=new Date(),stream=null,scanTimer=null;
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const daysLeft=e=>Math.round((new Date(e+'T00:00:00')-today())/864e5);
const fmt=s=>new Date(s+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
function status(i){if(i.used)return'used';const d=daysLeft(i.expiry);return d<0?'expired':d<=i.remind?'soon':'fine'}
const LABEL={fine:'Fine to keep',soon:'Expiring soon',expired:'Expired',used:'Used'};
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',2600)}
const save=()=>store.set('pp_items_'+me,items);

/* ---------- auth ---------- */
$$('#authSeg button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('#authSeg button').forEach(x=>x.classList.toggle('on',x===b));$('#nameRow').classList.toggle('hide',mode==='in');$('#authBtn').textContent=mode==='in'?'Sign in':'Create my pantry';$('#authErr').textContent=''});
$('#authForm').onsubmit=e=>{e.preventDefault();const em=$('#aMail').value.trim().toLowerCase(),pw=$('#aPass').value;
 if(mode==='up'){if(users[em])return $('#authErr').textContent='That email already has an account. Sign in instead.';users[em]={name:$('#aName').value.trim()||'Friend',pw,premium:false};store.set('pp_users',users)}
 else if(!users[em]||users[em].pw!==pw)return $('#authErr').textContent='Email or password is incorrect.';
 me=em;store.set('pp_me',me);boot()};
function boot(){if(!me||!users[me]){$('#auth').classList.remove('hide');$('#app').classList.add('hide');return}
 items=store.get('pp_items_'+me,[]);$('#auth').classList.add('hide');$('#app').classList.remove('hide');render()}
const premium=()=>users[me]?.premium;

/* ---------- views ---------- */
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));['pantry','calendar','reminders'].forEach(v=>$('#v-'+v).classList.toggle('hide',v!==b.dataset.v));render()});
function card(i,actions=true){const s=status(i),d=daysLeft(i.expiry);
 const rl=s==='used'?'Used':d<0?Math.abs(d)+' days ago':d===0?'Today':d+' days left';
 return`<article class="card item"><div class="top"><span class="badge ${s==='fine'?'':s}">${LABEL[s]==='Fine to keep'?'Fine to keep':LABEL[s]}</span>${actions?`<span><button data-edit="${i.id}" aria-label="Edit">✏️</button> <button data-del="${i.id}" aria-label="Delete">🗑</button></span>`:''}</div>
 <div class="meta"><div class="ico">${ICON[i.cat]||'🛒'}</div><div><h3 style="display:inline">${esc(i.name)}</h3><span class="cat">${esc(i.cat)}</span><div class="sub" style="margin:0">${esc([i.qty,i.unit].filter(Boolean).join(' '))}</div></div></div>
 ${i.note?`<div class="note">${esc(i.note)}</div>`:''}
 <dl><div>Purchased<b>${i.buy?fmt(i.buy):'—'}</b></div><div>Expires<b>${fmt(i.expiry)}</b></div><div>Reminder<b>${rl}</b></div></dl>
 ${actions&&s!=='used'?`<button class="btn alt" data-use="${i.id}">✓ Mark as used</button>`:''}</article>`}
function render(){
 const c={all:items.length,fine:0,soon:0,expired:0,used:0};items.forEach(i=>c[status(i)]++);
 $('#count').textContent=items.length?`${items.length} item${items.length>1?'s':''} in your pantry right now.`:'Track your groceries & expiration dates.';
 $('#filters').innerHTML=[['all','All'],['fine','Fine'],['soon','Expiring soon'],['expired','Expired'],['used','Used']].map(([k,l])=>`<button data-f="${k}" class="${filter===k?'on':''}">${l}<i>${c[k]}</i></button>`).join('');
 const list=items.filter(i=>filter==='all'||status(i)===filter).sort((a,b)=>a.expiry.localeCompare(b.expiry));
 $('#list').innerHTML=list.length?list.map(i=>card(i)).join(''):`<div class="card empty"><div class="logo">🧺</div><h2>${items.length?'Nothing here':'Your pantry is empty'}</h2><p class="sub">${items.length?'No items match this filter.':'Add your groceries to start tracking expiration dates and reducing food waste.'}</p></div>`;
 // calendar
 const y=calD.getFullYear(),m=calD.getMonth(),first=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate();
 $('#mTitle').textContent=calD.toLocaleDateString('en-US',{month:'long',year:'numeric'});
 let h='SMTWTFS'.split('').map(d=>`<div class="h">${d}</div>`).join('')+'<div style="border:0"></div>'.repeat(first);
 for(let d=1;d<=n;d++){const k=iso(new Date(y,m,d));h+=`<div class="${k===iso(today())?'today':''}"><b>${d}</b>${items.filter(i=>i.expiry===k&&!i.used).map(i=>`<em>${esc(i.name)}</em>`).join('')}</div>`}
 $('#cal').innerHTML=h;
 // reminders + notifications
 const due=items.filter(i=>!i.used&&status(i)!=='fine').sort((a,b)=>a.expiry.localeCompare(b.expiry));
 $('#remList').innerHTML=due.length?due.map(i=>card(i,false)).join(''):'<div class="card empty"><h2>All clear</h2><p class="sub">Nothing is close to expiring.</p></div>';
 $('#bellDot').classList.toggle('hide',!due.length);
 $('#notifPop').innerHTML='<h3>Notifications</h3>'+(due.length?due.map(i=>{const d=daysLeft(i.expiry);return`<p><b>${esc(i.name)}</b><br><span class="sub">${d<0?'Expired '+Math.abs(d)+' days ago':d===0?'Expires today':'Expires in '+d+' days'}</span></p>`}).join(''):'<p class="sub">No new notifications.</p>');
 $('#profPop').innerHTML=`<h3>${esc(users[me].name)}</h3><p class="sub">${esc(me)}</p><p>${premium()?'⭐ Premium active':'Free plan'}</p>${premium()?'':'<button class="btn" id="upg">Upgrade to Premium</button>'}<button class="btn alt" id="out" style="margin-top:8px">Sign out</button>`;
 $('#scanBtn .pro').textContent=premium()?'PRO ✓':'PRO';
}
document.addEventListener('click',e=>{const t=e.target.closest('button');
 if(!e.target.closest('.icons'))$$('.pop').forEach(p=>p.classList.remove('open'));
 if(!t)return;const d=t.dataset;
 if(d.f){filter=d.f;render()}
 if(d.use){items.find(i=>i.id===d.use).used=true;save();render();toast('Marked as used')}
 if(d.del&&confirm('Delete this item?')){items=items.filter(i=>i.id!==d.del);save();render()}
 if(d.edit)openAdd(items.find(i=>i.id===d.edit));
 if(t.id==='upg'){users[me].premium=true;store.set('pp_users',users);render();toast('Premium unlocked (demo)')}
 if(t.id==='out'){me=null;store.set('pp_me',null);boot()}});
$('#bell').onclick=()=>{$('#profPop').classList.remove('open');$('#notifPop').classList.toggle('open')};
$('#prof').onclick=()=>{$('#notifPop').classList.remove('open');$('#profPop').classList.toggle('open')};
$('#pm').onclick=()=>{calD=new Date(calD.getFullYear(),calD.getMonth()-1,1);render()};
$('#nm').onclick=()=>{calD=new Date(calD.getFullYear(),calD.getMonth()+1,1);render()};

/* ---------- add / edit ---------- */
$('#cats').innerHTML=CATS.map(c=>`<button type="button">${c}</button>`).join('');
function setCat(c){cat=c;$$('#cats button').forEach(b=>b.classList.toggle('on',b.textContent===c))}
$('#cats').onclick=e=>{if(e.target.tagName==='BUTTON')setCat(e.target.textContent)};
function setRem(d){remDays=+d;$$('#rem button').forEach(b=>b.classList.toggle('on',b.dataset.d==d))}
$('#rem').onclick=e=>{if(e.target.dataset.d)setRem(e.target.dataset.d)};
function openAdd(it,pre){editId=it?it.id:null;const v=it||pre||{};
 $('#addTitle').textContent=it?'Edit item':'Add to pantry';$('#saveItem').textContent=it?'Save changes':'Add item';
 $('#fName').value=v.name||'';$('#fQty').value=v.qty||'';$('#fUnit').value=v.unit||'';$('#fBuy').value=v.buy||iso(today());$('#fExp').value=v.expiry||'';$('#fNote').value=v.note||'';
 setCat(v.cat||CATS[0]);setRem(v.remind||3);$('#addErr').textContent='';$('#addM').classList.add('open');setTimeout(()=>$('#fName').focus(),50)}
const closeAdd=()=>$('#addM').classList.remove('open');
$('#addBtn').onclick=()=>openAdd();$('#closeAdd').onclick=closeAdd;$('#cancelAdd').onclick=closeAdd;
$('#saveItem').onclick=()=>{const name=$('#fName').value.trim(),expiry=$('#fExp').value;
 if(!name||!expiry)return $('#addErr').textContent='Add an item name and an expiry date.';
 const data={name,cat,qty:$('#fQty').value,unit:$('#fUnit').value,buy:$('#fBuy').value,expiry,remind:remDays,note:$('#fNote').value.trim()};
 if(editId)Object.assign(items.find(i=>i.id===editId),data);else items.push({id:Date.now().toString(36),used:false,...data});
 save();closeAdd();render();toast(editId?'Changes saved':'Item added')};

/* ---------- scan (premium) ---------- */
$('#scanBtn').onclick=()=>{
 if(!premium()){if(confirm('Scanning is a Premium feature. Unlock Premium now? (demo – no payment)')){users[me].premium=true;store.set('pp_users',users);render()}else return}
 openScan()};
async function openScan(){$('#scanM').classList.add('open');$('#manualRow').classList.add('hide');setMsg('Starting camera…');
 const ok='BarcodeDetector' in window;
 try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});$('#vid').srcObject=stream;await $('#vid').play();
  if(!ok)return setMsg('Live barcode detection isn’t supported in this browser. Use a photo or type the barcode.');
  setMsg('Point your camera at a barcode.');const det=new BarcodeDetector();
  scanTimer=setInterval(async()=>{try{const r=await det.detect($('#vid'));if(r.length)found(r[0].rawValue)}catch(e){}},500);
 }catch(e){setMsg('Camera unavailable. Use a photo or type the barcode.')}}
function stopScan(){clearInterval(scanTimer);if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;$('#scanM').classList.remove('open')}
const setMsg=t=>$('#scanMsg').textContent=t;
$('#closeScan').onclick=stopScan;
$('#manualBtn').onclick=()=>$('#manualRow').classList.toggle('hide');
$('#useCode').onclick=()=>{const c=$('#code').value.trim();if(c)found(c)};
$('#photoBtn').onclick=()=>$('#photo').click();
$('#photo').onchange=async e=>{const f=e.target.files[0];if(!f)return;
 if(!('BarcodeDetector' in window))return setMsg('This browser can’t read barcodes from photos. Type the number instead.');
 try{const r=await new BarcodeDetector().detect(await createImageBitmap(f));r.length?found(r[0].rawValue):setMsg('No barcode found. Try a clearer photo.')}catch(err){setMsg('Couldn’t read that photo.')}};
async function found(code){clearInterval(scanTimer);setMsg('Found '+code+'. Looking up product…');
 let name='',c='Other';
 try{ // Open Food Facts lookup – works when hosted on your own domain
  const r=await fetch('https://world.openfoodfacts.org/api/v2/product/'+encodeURIComponent(code)+'.json?fields=product_name,categories_tags');
  const j=await r.json();if(j.status===1){name=j.product?.product_name||'';const t=(j.product?.categories_tags||[]).join(' ');
   c=/dairy|milk|egg|cheese|yogurt/.test(t)?'Dairy & Eggs':/meat|fish|seafood/.test(t)?'Meat & Seafood':/fruit|vegetable/.test(t)?'Fruits & Veggies':/beverage|drink/.test(t)?'Beverages':/snack|biscuit|chocolate/.test(t)?'Snacks':/bread|bakery/.test(t)?'Bakery':/pasta|cereal|rice/.test(t)?'Grains & Pasta':/frozen/.test(t)?'Frozen':/canned/.test(t)?'Canned Goods':'Other'}
 }catch(e){}
 stopScan();openAdd(null,{name,cat:c,note:'Barcode '+code});
 toast(name?'Product found – set the expiry date':'Product not found – enter the name')}

/* ---------- init ---------- */
$('#aMail').value='';boot();
