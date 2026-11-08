(function(){
// ---------- SETTINGS ----------
// Leave SERVER empty to run completely in your browser (accounts and groceries are saved on this device).
// To use real server accounts instead, put the address of your Hatchable project here, for example:
// var SERVER="https://pantry-pal-07y9.hatchable.site";
var SERVER="";

// ---------- Built-in "local server" (used when SERVER is empty) ----------
var LK="pp.local.v1",L;try{L=JSON.parse(localStorage.getItem(LK))}catch(e){}
if(!L||!L.accts)L={accts:{},sess:{}};
function lsave(){try{localStorage.setItem(LK,JSON.stringify(L))}catch(e){}}
function rnd(){var a=new Uint8Array(16);crypto.getRandomValues(a);return Array.from(a).map(function(x){return x.toString(16).padStart(2,"0")}).join("")}
function hash(s){if(window.crypto&&crypto.subtle)return crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")});var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return Promise.resolve(String(h))}
function fail(status,msg){var e=new Error(msg);e.status=status;return Promise.reject(e)}
function localApi(path,d){
  if(path.endsWith("/register")){var name=String(d.name||"").trim(),em=String(d.email||"").trim().toLowerCase(),pw=String(d.password||"");
    if(!name||!/^\S+@\S+\.\S+$/.test(em))return fail(400,"Enter your name and a valid email address.");
    if(pw.length<8)return fail(400,"Password must be at least 8 characters.");
    if(L.accts[em])return fail(409,"An account with this email already exists. Try logging in.");
    var salt=rnd();return hash(salt+pw).then(function(h){var st={user:{name:name,premium:false,remind:3,chan:"app"},items:[],nid:1};L.accts[em]={salt:salt,hash:h,state:st};var t=rnd();L.sess[t]=em;lsave();return{token:t,email:em,state:st}})}
  if(path.endsWith("/login")){var e2=String(d.email||"").trim().toLowerCase(),a=L.accts[e2];if(!a)return fail(401,"Email or password is incorrect.");
    return hash(a.salt+String(d.password||"")).then(function(h){if(h!==a.hash)throw Object.assign(new Error("Email or password is incorrect."),{status:401});var t=rnd();L.sess[t]=e2;lsave();return{token:t,email:e2,state:a.state}})}
  if(path.endsWith("/logout")){delete L.sess[d.token];lsave();return Promise.resolve({ok:true})}
  var em3=L.sess[d.token];if(!em3||!L.accts[em3])return fail(401,"Please log in again.");
  if(path.endsWith("/state")){if(d.action==="put"){L.accts[em3].state={user:d.user,items:d.items,nid:d.nid};lsave();return Promise.resolve({ok:true})}return Promise.resolve({email:em3,state:L.accts[em3].state})}
  if(path.endsWith("/scan"))return fail(503,"Receipt reading needs the Hatchable server with an AI key. You can still try the screen with sample items.");
  return fail(404,"Not found.")}

var TK="pp.token",TOKEN="",SEEN=false,DAY=864e5,D={users:[],items:[],ses:null,nid:1},saveT;
try{TOKEN=localStorage.getItem(TK)||"";SEEN=!!localStorage.getItem("pp.seen")}catch(e){}
function setTok(t){TOKEN=t;try{if(t){localStorage.setItem(TK,t);localStorage.setItem("pp.seen","1")}else localStorage.removeItem(TK)}catch(e){}}
function api(path,method,body){var data=Object.assign({token:TOKEN},body||{});
  if(!SERVER)return localApi(path,data);
  return fetch(SERVER+path,{method:"POST",body:JSON.stringify(data)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok){var e=new Error(j.error||"Something went wrong. Please try again.");e.status=r.status;throw e}return j})})}
function load(st,email){var u=Object.assign({id:1,email:email},st.user);D={users:[u],items:st.items||[],ses:1,nid:st.nid||1}}
function save(){clearTimeout(saveT);saveT=setTimeout(function(){var u=D.users[0];if(!u)return;var user=Object.assign({},u);delete user.id;delete user.email;
  api("/api/account/state","POST",{action:"put",user:user,items:D.items,nid:D.nid}).catch(function(e){if(e.status===401){setTok("");D={users:[],items:[],ses:null,nid:1};render()}else toast("Couldn’t save your changes. Check your connection.")})},SERVER?150:0)}
var $=function(s){return document.querySelector(s)};
function T(){var d=new Date();d.setHours(0,0,0,0);return d.getTime()}
function iso(t){var d=new Date(t);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function ts(s){return new Date(s+"T00:00:00").getTime()}
function left(e){return Math.round((ts(e)-T())/DAY)}
function fd(s){return new Date(s+"T00:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var P={basket:'<path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>',check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',box:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',down:'<path d="m6 9 6 6 6-6"/>',l:'<path d="m15 18-6-6 6-6"/>',r:'<path d="m9 18 6-6-6-6"/>',cam:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',tick:'<path d="M20 6 9 17l-5-5"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',crown:'<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',history:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>'};
function ic(n){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>'}
var LOGO='<span class="mark" aria-hidden="true"><b>P</b><i>p</i></span>',WORD='Pantry<span>Pal</span>';
var LIFE={"Dairy":7,"Meat":3,"Vegetables":7,"Fruit":6,"Seafood":2,"Bakery":4,"Frozen":90,"Drinks":30,"Dry goods":180,"Other":14},CATS=Object.keys(LIFE);
var KW=[["Frozen",/frozen|ice cream/i],["Seafood",/fish|salmon|shrimp|tuna|crab/i],["Meat",/chicken|beef|pork|meat|sausage|ham|bacon|turkey/i],["Dairy",/milk|cheese|yogurt|yoghurt|butter|cream|egg/i],["Bakery",/bread|bun|bagel|cake|croissant|loaf/i],["Fruit",/apple|banana|orange|berry|mango|grape|lemon|fruit|pear/i],["Vegetables",/spinach|lettuce|tomato|carrot|onion|potato|cucumber|garlic|broccoli|veg/i],["Drinks",/juice|soda|water|coffee|tea|beer|cola/i],["Dry goods",/rice|pasta|flour|sugar|noodle|cereal|bean|oat|salt|can\b/i]];
function detect(n){for(var i=0;i<KW.length;i++)if(KW[i][1].test(n))return KW[i][0];return"Other"}
var REM=[1,2,3,5,7,14,30],RL={1:"1 day",2:"2 days",3:"3 days (default)",5:"5 days",7:"7 days",14:"14 days",30:"1 month"};
var now=new Date(),S={tab:"pan",f:"all",sort:"exp",q:"",auth:SEEN?"in":"reg",y:now.getFullYear(),m:now.getMonth(),sel:null,pick:false,py:0,modal:null,up:"d",scan:null,boot:true},ct=false,xt=false,tt;
function me(){return D.users.filter(function(u){return u.id===D.ses})[0]}
function find(id){return D.items.filter(function(i){return i.id===id})[0]}
function mine(){return D.items.filter(function(i){return i.uid===D.ses})}
function active(){return mine().filter(function(i){return i.status!=="used"})}
function eff(u,i){return u.premium?(i.remind||3):3}
function st(i){if(i.status==="used")return"used";var n=left(i.exp);return n<0?"exp":n<=3?"soon":"ok"}
var SL={ok:"Fine to Keep",soon:"Expiring Soon",exp:"Expired",used:"Used"};
function dt(i){if(i.status==="used")return"Used";var n=left(i.exp);return n<0?"Expired "+(-n)+(n===-1?" day ago":" days ago"):n===0?"Expires today":n+(n===1?" day left":" days left")}
function opts(a,sel,lab){return a.map(function(c){return '<option value="'+c+'"'+(String(c)===String(sel)?" selected":"")+'>'+(lab?lab[c]:c)+'</option>'}).join("")}
function monthKey(){var d=new Date();return d.getFullYear()+"-"+d.getMonth()}
function autoReset(u){if(u.rk!==monthKey()){u.rk=monthKey();var d=new Date();u.resetAt=new Date(d.getFullYear(),d.getMonth(),1).getTime();save()}}
function usage(u,p){var d=new Date(),start=p==="d"?T():p==="w"?T()-6*DAY:new Date(d.getFullYear(),d.getMonth(),1).getTime(),end=T()+DAY,fl=Math.max(start,u.resetAt||0),r={exp:0,bef:0,aft:0};
  mine().forEach(function(i){if(i.status==="used"){var x=i.usedAt;if(x>=fl&&x<end){if(iso(x)<=i.exp)r.bef++;else r.aft++}}else if(left(i.exp)<0){var et=ts(i.exp)+DAY;if(et>=fl&&et<=end)r.exp++}});return r}
function toast(msg,undo){var el=$("#toast");clearTimeout(tt);el.innerHTML='<span>'+esc(msg)+'</span>'+(undo?'<button id="undo">Undo</button>':"");el.style.display="flex";
  if(undo)$("#undo").onclick=function(){undo();toast("Item restored.");render()};tt=setTimeout(function(){el.style.display="none"},5000)}

function card(i,u,min){var s=st(i);return '<article class="card '+s+'"><div class="ch"><h3>'+esc(i.name)+'</h3><span class="pill '+s+'">'+SL[s]+'</span></div><p class="cat">'+ic("basket")+' '+esc(i.cat)+' · Qty: '+esc(i.qty)+'</p><p class="dl">Purchased: '+fd(i.buy)+'</p><p class="dl">Expires: '+fd(i.exp)+(i.est?' <span class="est">Estimated</span>':"")+'</p><p class="big '+s+'">'+dt(i)+'</p>'+(i.status==="used"?'<p class="dl">Marked used '+new Date(i.usedAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})+'</p>':'<p class="dl">Reminder: '+eff(u,i)+' days before</p>')+
 '<div class="acts"><button data-a="edit" data-id="'+i.id+'">Edit</button>'+(min?"":'<button class="dng" data-a="del" data-id="'+i.id+'">Delete</button>')+(i.status!=="used"&&!min?'<button class="pri" data-a="used" data-id="'+i.id+'">Mark as Used</button>':"")+'</div></article>'}

function pantry(u){
  var all=mine(),act=active(),c={all:act.length,ok:0,soon:0,exp:0,used:all.length-act.length};act.forEach(function(i){c[st(i)]++});
  var h=new Date().getHours(),g=h<12?"morning":h<18?"afternoon":"evening";
  var list=(S.f==="used"?all.filter(function(i){return i.status==="used"}):S.f==="all"?act:act.filter(function(i){return st(i)===S.f})).filter(function(i){return i.name.toLowerCase().indexOf(S.q.toLowerCase())>-1});
  list.sort(function(a,b){return S.sort==="name"?a.name.localeCompare(b.name):S.sort==="new"?b.id-a.id:(a.exp<b.exp?-1:1)});
  var T2=[["all","All","basket"],["ok","Fine to Keep","check"],["soon","Expiring Soon","bell"],["exp","Expired","alert"],["used","Used","box"]];
  return '<div class="row" style="margin-top:18px"><div style="flex:3"><h1>Good '+g+', '+esc(u.name)+'!</h1><p class="dl">Let’s keep your groceries fresh.</p></div><button class="pri mob" style="flex:none" data-a="add">'+ic("plus")+' Add Item</button></div>'+
  '<div class="banner"><div><b>Scan a grocery receipt</b><p class="dl">Add many items at once and let Pantry Pal fill in the details.</p></div><button class="red" data-a="scan">'+(u.premium?ic("cam"):ic("lock"))+' Scan Receipt</button></div>'+
  '<div class="row"><input id="q" placeholder="Search groceries" aria-label="Search groceries" value="'+esc(S.q)+'" style="flex:2"><select id="sort" aria-label="Sort by"><option value="exp"'+(S.sort==="exp"?" selected":"")+'>Sort: Expiration date</option><option value="new"'+(S.sort==="new"?" selected":"")+'>Sort: Recently added</option><option value="name"'+(S.sort==="name"?" selected":"")+'>Sort: Name</option></select></div>'+
  '<div class="tabs" role="tablist">'+T2.map(function(t){return '<button role="tab" data-a="filt" data-id="'+t[0]+'" class="'+(S.f===t[0]?"on":"")+'">'+ic(t[2])+t[1]+' <span class="badge">'+c[t[0]]+'</span></button>'}).join("")+'</div>'+
  (list.length?'<div class="grid">'+list.map(function(i){return card(i,u)}).join("")+'</div>':'<div class="empty"><b>'+(all.length?"No groceries match.":"No groceries yet.")+'</b><p>'+(all.length?"Try a different filter or search.":"Add your first grocery to start keeping track of your food.")+'</p></div>');
}
function calendar(u){
  var y=S.y,m=S.m,first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate(),act=active(),td=iso(T()),mn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var h='<div class="calh"><button data-a="cm" data-id="-1" aria-label="Previous month">'+ic("l")+'</button><button data-a="mp" aria-haspopup="dialog" aria-expanded="'+S.pick+'"><h2 style="margin:0">'+new Date(y,m,1).toLocaleDateString("en-US",{month:"long",year:"numeric"})+'</h2>'+ic("down")+'</button><button data-a="cm" data-id="1" aria-label="Next month">'+ic("r")+'</button>';
  if(S.pick)h+='<div class="mp" role="dialog" aria-label="Choose month"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><button data-a="py" data-id="-1" aria-label="Previous year" style="flex:none">'+ic("l")+'</button><b style="text-align:center">'+S.py+'</b><button data-a="py" data-id="1" aria-label="Next year" style="flex:none">'+ic("r")+'</button></div><div class="mg">'+mn.map(function(n,k){var cur=S.py===now.getFullYear()&&k===now.getMonth(),sel=S.py===y&&k===m;return '<button data-a="pm" data-id="'+k+'" class="'+(cur?"cur ":"")+(sel?"on":"")+'">'+n+'</button>'}).join("")+'</div></div>';
  h+='</div><div class="cal">'+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(function(d){return '<div class="dh">'+d+'</div>'}).join("");
  for(var b=0;b<first;b++)h+='<div class="cell blank"></div>';
  for(var d=1;d<=dim;d++){var ds=iso(new Date(y,m,d).getTime()),its=act.filter(function(i){return i.exp===ds});
    h+='<button class="cell'+(ds===td?" td":"")+(ds===S.sel?" sel":"")+'" data-a="day" data-id="'+ds+'" aria-label="'+fd(ds)+', '+its.length+' items expiring"><b>'+d+'</b>'+its.slice(0,2).map(function(i){return '<span class="chip '+st(i)+'">'+esc(i.name)+'</span>'}).join("")+(its.length>2?'<span class="dl">+'+(its.length-2)+' more</span>':"")+'</button>'}
  h+='</div>';
  if(S.sel){var li=act.filter(function(i){return i.exp===S.sel});h+='<h2 id="dh">'+fd(S.sel)+'</h2>'+(li.length?'<div class="dayl">'+li.map(function(i){return card(i,u,true)}).join("")+'</div>':'<div class="empty">Nothing expires on this day.</div>')}
  else h+='<p class="dl" style="margin-top:12px">Tap a date to see what expires that day.</p>';
  return h}
function notifs(u){
  var act=active(),tod=[],soon=[],exp=[];
  act.forEach(function(i){var n=left(i.exp),r=eff(u,i);if(n<0)exp.push(i);else if(n===0||n===r)tod.push(i);else if(n<=r)soon.push(i)});
  function msg(i){var n=left(i.exp);return n<0?"expired "+(n===-1?"yesterday":(-n)+" days ago"):n===0?"expires today":n===1?"expires tomorrow":"expires in "+n+" days"}
  function sec(t,l,ico){return '<h2>'+t+' ('+l.length+')</h2>'+(l.length?'<div class="grid">'+l.map(function(i){return '<div class="card '+st(i)+'"><b>'+ico+' '+esc(i.name)+' '+msg(i)+'.</b><p class="dl">Qty: '+esc(i.qty)+' · Expires '+fd(i.exp)+' · Reminder: '+eff(u,i)+' days before</p><div class="acts"><button data-a="edit" data-id="'+i.id+'">View</button><button class="pri" data-a="used" data-id="'+i.id+'">Mark as Used</button></div></div>'}).join("")+'</div>':'<div class="empty">Nothing here. You’re all caught up.</div>')}
  return '<p class="dl" style="margin-top:16px">Alerts via '+(u.chan==="push"?"push notification":"in-app messages")+'.</p>'+sec("Today",tod,ic("bell"))+sec("Expiring Soon",soon,ic("bell"))+sec("Expired",exp,ic("alert"))}
function remBox(u){var n=u.remind||3,m=REM.indexOf(n)>-1;
  if(!u.premium)return '<div class="box"><b>Reminder days</b> <small>Customize</small><span class="prem">Premium</span><p class="dl">Free accounts get a fixed reminder.</p><select disabled aria-label="Reminder days (locked)"><option>3 days before (default)</option></select><button class="pri" data-a="prem" style="margin-top:10px">Upgrade to Premium</button></div>';
  return '<div class="box"><b>Reminder days</b><label for="rn">Type days (1–30)</label><input id="rn" type="number" min="1" max="30" value="'+n+'"><label for="rd">Or choose</label><select id="rd">'+opts(REM,m?n:"",RL)+'<option value="c"'+(m?"":" selected")+'>Custom</option></select><p class="err" id="rerr" role="alert"></p></div>'}
function profile(u){return '<h2>Profile</h2><div class="box"><p><b>'+esc(u.name)+'</b></p><p class="dl">'+esc(u.email)+'</p><p>Account type: <span class="pill '+(u.premium?"ok":"used")+'">'+(u.premium?"Premium":"Free")+'</span></p><div class="acts"><button data-a="eprof">Edit Profile</button>'+(u.premium?'<button data-a="down">Switch to Free (demo)</button>':'<button class="pri" data-a="prem">Upgrade to Premium</button>')+'<button data-a="usage">Usage summary'+(u.premium?"":'<span class="prem">Premium</span>')+'</button></div></div>'+
  '<h2>Notification settings</h2><div class="box"><b>Notification channel</b><div class="sw" role="group"><button data-a="chan" data-id="push" class="'+(u.chan==="push"?"on":"")+'">Push</button><button data-a="chan" data-id="app" class="'+(u.chan!=="push"?"on":"")+'">In-app</button></div></div>'+remBox(u)+'<p><button class="dng" data-a="out">Log Out</button></p>'}
function premium(u){var F=[["cam","Receipt Scanning","Add a whole grocery trip in seconds by scanning your receipt."],["tag","Automatic Category Detection","Items are sorted into the right category for you, automatically."],["bell","Custom Reminder Settings","Choose how many days before an item expires you get reminded."],["history","Extended Grocery History","Look back at everything you have used or let expire, with no limit."],["chart","Usage Summary","See what you used, wasted and saved by day, week and month."]],t=function(x){return '<li>'+ic("tick")+' '+x+'</li>'};
  return '<section class="phero"><span class="pp">'+ic("crown")+' Pantry Pal Premium</span><h1>Upgrade to Pantry Pal Premium</h1><p>Save time and reduce food waste with smarter grocery tracking. Everything you already love, plus tools that do the busywork for you.</p></section><div class="pgrid"><div class="fgrid">'+F.map(function(f){return '<div class="fc"><div class="fi">'+ic(f[0])+'</div><h3>'+ic("tick")+'<span>'+f[1]+'</span></h3><p class="dl">'+f[2]+'</p></div>'}).join("")+'</div><aside class="fc"><p class="dl">Premium plan</p><p class="price"><b>$1.99</b> / month</p><p class="dl">Prototype: the upgrade is simulated instantly.</p><ul class="pl">'+t("All premium features")+t("Cancel anytime")+t("Supports your pantry")+'</ul>'+(u.premium?'<p><span class="pill ok">You are on Premium</span></p><div class="acts"><button data-a="usage">Open Usage summary</button><button data-a="down">Switch to Free (demo)</button></div>':'<button class="pri wide" data-a="up">'+ic("crown")+' Upgrade to Premium</button>')+'</aside></div>'}
function usagev(u){
  if(!u.premium)return '<h2>Usage summary</h2><div class="box"><h3>'+ic("lock")+' Premium feature</h3><p>See how many groceries you used before they expired, used late, or lost, by day, week and month.</p><button class="pri" data-a="prem" style="margin-top:10px">Upgrade to Premium</button></div>';
  var r=usage(u,S.up),tot=r.exp+r.bef+r.aft,mx=Math.max(r.exp,r.bef,r.aft,1),pl={d:"today",w:"this week",m:"this month"}[S.up],nx=new Date(now.getFullYear(),now.getMonth()+1,1).toLocaleDateString("en-US",{month:"short",day:"numeric"});
  function b(n,c){return '<div class="cb" style="height:'+(n/mx*140+4)+'px;background:'+c+'">'+n+'</div>'}
  return '<h2>Usage summary</h2><div class="sw" role="tablist">'+[["d","Daily"],["w","Weekly"],["m","Monthly"]].map(function(t){return '<button role="tab" data-a="up2" data-id="'+t[0]+'" class="'+(S.up===t[0]?"on":"")+'">'+t[1]+'</button>'}).join("")+'</div>'+
  (tot?'<p><b>'+(S.up==="d"?"Today":"This "+(S.up==="w"?"week":"month"))+' you used '+r.bef+(r.bef===1?" item":" items")+' before they expired.</b></p><div class="stat"><div style="background:var(--badbg);color:var(--bad)"><b>'+r.exp+'</b>Expired</div><div style="background:var(--okbg);color:var(--ok)"><b>'+r.bef+'</b>Used before expiring</div><div style="background:var(--warnbg);color:var(--warn)"><b>'+r.aft+'</b>Used after expiring</div></div><div class="chart" role="img" aria-label="Bar chart: '+r.exp+' expired, '+r.bef+' used before expiring, '+r.aft+' used after expiring">'+b(r.exp,"var(--red)")+b(r.bef,"#4C8A4A")+b(r.aft,"#C98A1A")+'</div><div class="lg"><div>Expired</div><div>Before</div><div>After</div></div>':'<div class="empty">No activity '+pl+'. Mark groceries as used to see your summary.</div>')+
  '<p class="dl" style="margin-top:14px">Counts reset on '+nx+'.</p><button data-a="sim">Simulate end of month</button><p><button data-a="tab" data-id="pro">Back to Profile</button></p>'}

function modal(u){var M=S.modal;if(!M)return"";var body="";
  if(M.t==="item"){var it=M.id?find(M.id):null,e=it||{name:"",qty:"",cat:"Dairy",buy:iso(T()),exp:iso(T()+LIFE.Dairy*DAY),remind:u.remind||3,est:true};
    body='<h2 style="margin-top:0">'+(it?"Edit Item":"Add Grocery Item")+'</h2><form id="itf"><label for="fn">Item Name</label><input id="fn" value="'+esc(e.name)+'" maxlength="60"><div class="row"><div><label for="fq">Quantity</label><input id="fq" value="'+esc(e.qty)+'" placeholder="e.g. 1 bottle"></div><div><label for="fc">Category</label><select id="fc">'+opts(CATS,e.cat)+'</select></div></div><div class="row"><div><label for="fb">Purchase Date</label><input id="fb" type="date" value="'+e.buy+'"></div><div><label for="fx">Expiration Date <span class="est" id="est"'+(e.est?"":" hidden")+'>Estimated</span></label><input id="fx" type="date" value="'+e.exp+'"></div></div><label for="fr">Reminder'+(u.premium?"":'<span class="prem">Premium</span>')+'</label>'+(u.premium?'<select id="fr">'+opts(REM,REM.indexOf(e.remind)>-1?e.remind:3,RL)+'</select>':'<select id="fr" disabled><option>3 days before (default)</option></select>')+'<p class="err" id="merr" role="alert"></p><div class="acts"><button class="pri" type="submit">Save Item</button><button type="button" data-a="close">Cancel</button></div></form>'}
  else if(M.t==="lock")body='<h2 style="margin-top:0">'+ic("lock")+' Premium Feature</h2><p>Save time by scanning your grocery receipt and automatically adding multiple items to your Pantry.</p><div class="acts"><button class="pri" data-a="prem">Upgrade to Premium</button><button data-a="close">Not now</button></div>';
  else if(M.t==="use"){var it3=find(M.id);if(!it3)return"";var uq=qnum(it3.qty);
    var d0=uq.n>1?1:uq.n;
    body='<h2 style="margin-top:0">'+(uq.n===null?"Mark as used?":"How much did you use?")+'</h2><p class="dl">'+esc(it3.name)+' · you have '+esc(it3.qty)+'</p>'+(uq.n===null?'<div class="acts"><button class="pri" data-a="usall">Used all</button><button data-a="close">Cancel</button></div>':'<form id="usf"><label for="ua">Amount used'+(uq.u?" ("+esc(uq.u)+")":"")+'</label><input id="ua" type="number" inputmode="decimal" min="0" step="any" value="'+fnum(d0)+'"><p class="dl" id="urem">'+lefttxt(uq.n,d0,uq.u)+'</p><p class="err" id="merr" role="alert"></p><div class="acts"><button class="pri" type="submit">Save</button>'+(uq.n>1?'<button type="button" data-a="usall">Used all ('+fnum(uq.n)+')</button>':"")+'<button type="button" data-a="close">Cancel</button></div></form>')}
  else if(M.t==="prof")body='<h2 style="margin-top:0">Edit Profile</h2><form id="pf"><label for="pn">Name</label><input id="pn" value="'+esc(u.name)+'"><p class="err" id="merr" role="alert"></p><div class="acts"><button class="pri" type="submit">Save</button><button type="button" data-a="close">Cancel</button></div></form>';
  else if(M.t==="scan"){var s=S.scan||{step:"pick"};
    body='<h2 style="margin-top:0">Scan your grocery receipt</h2>'+(s.step==="cam"?'<p class="dl">Hold the receipt flat and fill the frame, then tap Capture.</p><video id="cv" class="cam" autoplay playsinline muted></video><div class="acts"><button class="pri" data-a="snap">'+ic("cam")+' Capture</button><button data-a="close">Cancel</button></div>':s.step==="pick"?'<input id="rf" type="file" accept="image/*" hidden>'+(s.img?'<img src="'+s.img+'" alt="Receipt preview" style="max-width:100%;max-height:260px;border-radius:12px">':'<p class="dl">Use your camera to scan your receipt.</p>')+(s.err?'<p class="err" role="alert">'+esc(s.err)+'</p>':"")+'<div class="acts">'+(s.img?'<button class="pri" data-a="detect">Scan Receipt</button><button data-a="cam">Retake</button>':'<button class="pri" data-a="cam">'+ic("cam")+' Open Camera</button>')+'<button data-a="upl">Upload a photo instead</button>'+(s.demo?'<button data-a="demo">Use sample items</button>':"")+'<button data-a="close">Cancel</button></div>':s.step==="busy"?'<p><b>Scanning receipt…</b></p><p class="dl">Detecting items.</p>':
      '<p class="dl">Review and edit before adding. Tap a date to change it. Expiration dates are estimated.</p>'+s.rows.map(function(r,k){return '<div class="rc"><div class="srow"><input data-r="n'+k+'" value="'+esc(r.name)+'" aria-label="Item name" placeholder="Item"><input data-r="q'+k+'" value="'+esc(r.qty)+'" aria-label="Quantity" placeholder="Qty"><select data-r="c'+k+'" aria-label="Category">'+opts(CATS,r.cat)+'</select></div><div class="drow"><div><label for="rb'+k+'">Purchase date</label><input id="rb'+k+'" data-r="b'+k+'" type="date" value="'+(r.buy||iso(T()))+'"></div><div><label for="rx'+k+'">Expires <span class="est" data-e="'+k+'">Estimated</span></label><input id="rx'+k+'" data-r="x'+k+'" type="date" value="'+(r.exp||iso(T()+LIFE[r.cat]*DAY))+'"></div></div></div>'}).join("")+'<p class="err" id="merr" role="alert"></p><div class="acts"><button class="pri" data-a="addall">Add All to Pantry</button><button data-a="close">Cancel</button></div>')}
  return '<div class="modal" data-a="bg"><div class="sheet" role="dialog" aria-modal="true">'+body+'</div></div>'}

function landing(){return '<div class="wrap"><div class="hero"><div class="logo">'+LOGO+WORD+'</div><h1>Keep your groceries fresh. Waste less.</h1><p>Track what’s in your kitchen, see what expires soon, and get reminders before food goes to waste.</p><div class="row" style="justify-content:center"><button class="pri" data-a="auth" data-id="reg" style="flex:none">Get Started</button><button data-a="auth" data-id="in" style="flex:none">Log In</button></div></div></div>'}
function authv(){var r=S.auth==="reg";
  function f(id,l,t,ph,ac,pw){return '<label for="'+id+'">'+l+' <span class="req">*</span></label><div class="fw"><input id="'+id+'" type="'+t+'" placeholder="'+ph+'" autocomplete="'+ac+'">'+(pw?'<button type="button" class="eye" data-a="eye" data-id="'+id+'" aria-label="Show password">'+ic("eye")+'</button>':"")+'</div>'}
  return '<div class="split"><aside class="side"><div class="logo">'+LOGO+WORD+'</div><h2>Keep your groceries fresh. Waste less.</h2><ul><li>'+ic("basket")+'Track every item and its expiry date</li><li>'+ic("bell")+'Get reminders before food goes to waste</li><li>'+ic("cal")+'See everything on a calendar</li></ul></aside><section class="formp"><div class="fin"><div class="logo mlogo">'+LOGO+WORD+'</div><h1>'+(r?"Create your account":"Welcome back")+'</h1><p class="sub">'+(r?"Start tracking your groceries and waste less food.":"Log in to keep your pantry fresh and organized.")+'</p><form id="'+(r?"reg":"login")+'" novalidate>'+(r?f("nm","Name","text","Your name","name"):"")+f("em","Email","email","you@example.com","email")+f("pw","Password","password",r?"At least 8 characters":"Enter your password",r?"new-password":"current-password",1)+(r?f("pc","Confirm Password","password","Re-enter your password","new-password",1):"")+'<p class="err" id="aerr" role="alert"></p><button class="pri xl" type="submit">'+(r?"Create Account":"Log In")+'</button></form><p class="swap">'+(r?"Already have an account? ":"New to Pantry Pal? ")+'<button class="lnk" data-a="auth" data-id="'+(r?"in":"reg")+'">'+(r?"Log in":"Create an account")+'</button></p></div></section></div>'}
function render(){var u=me(),a=$("#app");
  if(S.boot){a.innerHTML='<div class="boot">Loading Pantry Pal…</div>';return}
  if(!u){a.innerHTML=authv();return}
  autoReset(u);var tabs=[["pan","Pantry"],["cal","Calendar"],["not","Notifications"],["pro","Profile"]],cur=S.tab==="usage"||S.tab==="prem"?"pro":S.tab;
  var nv=tabs.map(function(t){return '<button data-a="tab" data-id="'+t[0]+'" class="'+(cur===t[0]?"on":"")+'">'+t[1]+'</button>'}).join("");
  var body={pan:pantry,cal:calendar,not:notifs,pro:profile,usage:usagev,prem:premium}[S.tab](u);
  var q=document.activeElement&&document.activeElement.id==="q";
  var ini=u.name.trim().split(/\s+/).map(function(w){return w[0]}).join("").slice(0,2).toUpperCase();
  a.innerHTML='<header class="hdr"><div class="in"><div class="logo">'+LOGO+WORD+'</div><nav class="tn" aria-label="Main">'+nv+'</nav><div class="hact"><button data-a="scan">'+ic("cam")+' Scan Receipt'+(u.premium?"":" "+ic("lock"))+'</button><button class="pri" data-a="add">'+ic("plus")+' Add Item</button></div><button class="av" data-a="tab" data-id="pro" aria-label="Profile">'+esc(ini)+'</button></div></header><main class="wrap">'+body+'</main><nav class="bn" aria-label="Main">'+nv+'</nav>'+modal(u);
  if(q){var el=$("#q");el.focus();el.setSelectionRange(el.value.length,el.value.length)}
  if(S.scan&&S.scan.step==="cam"&&STREAM){var vv=$("#cv");if(vv){vv.srcObject=STREAM;var pp=vv.play&&vv.play();if(pp&&pp.catch)pp.catch(function(){})}}}
function ping(){var u=me();if(!u||u.chan!=="push"||!window.Notification||Notification.permission!=="granted")return;var d=active().filter(function(i){var n=left(i.exp);return n>=0&&n<=eff(u,i)});if(d.length)try{new Notification("Pantry Pal: "+d.length+" item"+(d.length>1?"s":"")+" expiring",{body:d.slice(0,3).map(function(i){return i.name+" – "+i.exp}).join("\n")})}catch(e){}}
function go(t){stopCam();S.tab=t;S.modal=null;render();window.scrollTo(0,0)}
var STREAM=null;
function stopCam(){if(STREAM){STREAM.getTracks().forEach(function(t){t.stop()});STREAM=null}}
function openCam(){var sc=S.scan||(S.scan={step:"pick"});
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){sc.err="The camera isn’t available here. Upload a photo instead.";render();return}
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false}).then(function(st){if(!S.scan){st.getTracks().forEach(function(t){t.stop()});return}STREAM=st;S.scan={step:"cam"};render()}).catch(function(){if(S.scan){S.scan.err="Couldn’t open the camera. Allow camera access in your browser, or upload a photo instead.";render()}})}
function qnum(q){var m=String(q||"").trim().match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);return m?{n:parseFloat(m[1].replace(",",".")),u:m[2]}:{n:null,u:String(q||"")}}
function fnum(n){return String(Math.round(n*100)/100)}
function lefttxt(n,v,u){return v>=n-1e-9?"Nothing left. This moves to Used.":"Left after: "+qtxt(n-v,u)}
function qtxt(n,u){if(u&&n===1&&/[^s]s$/i.test(u))u=u.slice(0,-1);return fnum(n)+(u?" "+u:"")}
function markUsed(it,amt){var q=qnum(it.qty),old=JSON.parse(JSON.stringify(it));
  if(q.n===null||amt>=q.n-1e-9){it.status="used";it.usedAt=Date.now();save();render();toast("Marked as used.",function(){Object.assign(it,old);save()});return}
  var made=Object.assign({},old,{id:D.nid++,qty:qtxt(amt,q.u),status:"used",usedAt:Date.now()});D.items.push(made);it.qty=qtxt(q.n-amt,q.u);save();render();
  toast("Used "+fnum(amt)+" of "+fnum(q.n)+".",function(){Object.assign(it,old);D.items=D.items.filter(function(i){return i.id!==made.id});save()})}
function shrink(src,cb){var im=new Image();im.onload=function(){var s=Math.min(1,1200/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.75))};im.src=src}
function saveItem(){var u=me(),n=$("#fn").value.trim(),q=$("#fq").value.trim(),c=$("#fc").value,b=$("#fb").value,x=$("#fx").value,m="";
  if(!n)m="Enter the item name.";else if(!q)m="Enter a quantity.";else if(!b)m="Enter the purchase date.";else if(!x)m="Enter the expiration date.";else if(x<b)m="The expiration date can’t be before the purchase date.";
  if(m){$("#merr").textContent=m;return}
  var r=u.premium?+$("#fr").value:3,est=!xt&&!$("#est").hidden,it=S.modal.id?find(S.modal.id):null;
  if(it){it.name=n;it.qty=q;it.cat=c;it.buy=b;it.exp=x;it.remind=r;it.est=est}else D.items.push({id:D.nid++,uid:u.id,name:n,qty:q,cat:c,buy:b,exp:x,remind:r,est:est,status:"active",usedAt:null});
  save();S.modal=null;render()}

document.addEventListener("click",function(ev){
  var b=ev.target.closest("[data-a]");if(!b){if(S.pick&&!ev.target.closest(".mp")){S.pick=false;render()}return}
  var a=b.dataset.a,id=b.dataset.id,u=me();
  if(a==="bg"){if(ev.target===b){stopCam();S.modal=null;S.scan=null;render()}return}
  if(a==="auth"){S.auth=id;render()}
  else if(a==="eye"){var inp=$("#"+id),on=inp.type==="password";inp.type=on?"text":"password";b.innerHTML=ic(on?"eyeoff":"eye");b.setAttribute("aria-label",on?"Hide password":"Show password")}
  else if(a==="tab"){if(id==="cal"){S.y=now.getFullYear();S.m=now.getMonth();S.sel=null;S.pick=false;S.tab="cal";S.modal=null;render();window.scrollTo({top:0,behavior:"smooth"})}else go(id)}
  else if(a==="add"){S.modal={t:"item"};ct=false;xt=false;render()}
  else if(a==="edit"){S.modal={t:"item",id:+id};ct=true;xt=true;render()}
  else if(a==="close"){stopCam();S.modal=null;S.scan=null;render()}
  else if(a==="filt"){S.f=id;render()}
  else if(a==="del"){var it=find(+id);if(confirm("Delete "+it.name+"?")){var snap=JSON.parse(JSON.stringify(it));D.items=D.items.filter(function(i){return i.id!==it.id});save();render();toast("Item deleted.",function(){D.items.push(snap);save()})}}
  else if(a==="used"){var it2=find(+id);S.modal={t:"use",id:it2.id};render();var uf=$("#ua");if(uf){uf.focus();uf.select()}}
  else if(a==="usall"){var ui=find(S.modal.id);S.modal=null;markUsed(ui,qnum(ui.qty).n)}
  else if(a==="cm"){var d=new Date(S.y,S.m+ +id,1);S.y=d.getFullYear();S.m=d.getMonth();S.sel=null;render()}
  else if(a==="mp"){S.pick=!S.pick;S.py=S.y;render()}
  else if(a==="py"){S.py+= +id;render()}
  else if(a==="pm"){S.y=S.py;S.m=+id;S.pick=false;S.sel=null;render()}
  else if(a==="day"){S.sel=S.sel===id?null:id;render();if(S.sel){var dh=$("#dh");if(dh)dh.scrollIntoView({behavior:"smooth",block:"start"})}}
  else if(a==="scan"){if(u.premium){S.scan={step:"pick"};S.modal={t:"scan"};render();openCam();return}else S.modal={t:"lock"};render()}
  else if(a==="cam"){openCam()}
  else if(a==="upl"){var fi=$("#rf");if(fi)fi.click()}
  else if(a==="snap"){var vv=$("#cv");if(!vv||!vv.videoWidth)return;var sc=Math.min(1,1200/Math.max(vv.videoWidth,vv.videoHeight)),cv=document.createElement("canvas");cv.width=Math.round(vv.videoWidth*sc);cv.height=Math.round(vv.videoHeight*sc);cv.getContext("2d").drawImage(vv,0,0,cv.width,cv.height);var pic=cv.toDataURL("image/jpeg",.75);stopCam();S.scan={step:"pick",img:pic};render()}
  else if(a==="demo"){S.scan={step:"review",rows:[["Milk","1 bottle"],["Eggs","1 dozen"],["Bananas","1 bunch"],["Chicken Thighs","2 packs"],["Spinach","1 bag"],["Frozen Pizza","1 box"]].map(function(r){return{name:r[0],qty:r[1],cat:detect(r[0])}})};render()}
  else if(a==="detect"){var im=S.scan.img;S.scan={step:"busy"};render();
    api("/api/account/scan","POST",{image:im}).then(function(x){if(!S.scan)return;var rows=(x.items||[]).map(function(i){return{name:i.name,qty:i.qty,cat:CATS.indexOf(i.category)>-1?i.category:detect(i.name)}});S.scan=rows.length?{step:"review",rows:rows}:{step:"pick",img:im,err:"No grocery items found. Try a clearer, well-lit photo of the receipt."};render()})
    .catch(function(e){if(!S.scan)return;S.scan={step:"pick",img:im,err:e.status?e.message:"Can’t reach the server. Check your connection and try again.",demo:e.status===503};render()})}
  else if(a==="addall"){var rq=function(k,p){return document.querySelector('[data-r="'+p+k+'"]')},list=[],bad="";
    S.scan.rows.forEach(function(r,k){var n=rq(k,"n").value.trim();if(!n)return;var bb=rq(k,"b").value,xx=rq(k,"x").value;if(!bb||!xx){bad=bad||"Enter both dates for "+n+".";return}if(xx<bb){bad=bad||"The expiration date for "+n+" can’t be before its purchase date.";return}list.push({id:0,uid:u.id,name:n,qty:rq(k,"q").value.trim()||"1",cat:rq(k,"c").value,buy:bb,exp:xx,remind:u.remind||3,est:!rq(k,"x").dataset.t,status:"active",usedAt:null})});
    if(bad){$("#merr").textContent=bad;return}
    list.forEach(function(i){i.id=D.nid++;D.items.push(i)});save();S.scan=null;S.modal=null;S.tab="pan";render();toast("Items added to your Pantry.")}
  else if(a==="up"){if(confirm("Upgrade to Premium? (Demo – no payment is taken)")){u.premium=true;save();S.modal=null;render()}}
  else if(a==="down"){u.premium=false;save();render()}
  else if(a==="prem")go("prem");
  else if(a==="usage")go("usage");
  else if(a==="up2"){S.up=id;render()}
  else if(a==="sim"){u.resetAt=Date.now();save();render();toast("End of month simulated. Counts reset to 0.")}
  else if(a==="eprof"){S.modal={t:"prof"};render()}
  else if(a==="chan"){u.chan=id;save();render();if(id==="push"&&window.Notification)Notification.requestPermission().then(ping)}
  else if(a==="out"){api("/api/account/logout","POST").catch(function(){});setTok("");D={users:[],items:[],ses:null,nid:1};S={tab:"pan",f:"all",sort:"exp",q:"",auth:"in",y:now.getFullYear(),m:now.getMonth(),sel:null,pick:false,py:0,modal:null,up:"d",scan:null,boot:false};render()}
});
document.addEventListener("input",function(ev){var t=ev.target;
  if(t.id==="q"){S.q=t.value;render()}
  else if(t.id==="ua"){var ui3=find(S.modal.id),tq=qnum(ui3.qty),vv=parseFloat(t.value),re=$("#urem");re.textContent=vv>0&&vv<=tq.n+1e-9?(vv>=tq.n-1e-9?"Nothing left. This moves to Used.":"Left after: "+qtxt(tq.n-vv,tq.u)):""}
  else if(t.id==="fx"){xt=true;$("#est").hidden=true}
  else if(t.id==="rn"){var n=Number(t.value),e=$("#rerr");if(t.value===""||!(n>=1&&n<=30)||n%1){e.textContent="Enter a whole number of days from 1 to 30.";return}e.textContent="";me().remind=n;save();$("#rd").value=REM.indexOf(n)>-1?n:"c"}
  else if(t.dataset&&t.dataset.r&&t.dataset.r[0]==="x"){t.dataset.t="1";var eb=document.querySelector('[data-e="'+t.dataset.r.slice(1)+'"]');if(eb)eb.hidden=true}});
document.addEventListener("change",function(ev){var t=ev.target,u=me();
  if(t.id==="sort"){S.sort=t.value;render()}
  else if(t.id==="fn"&&!ct){var c=detect(t.value);$("#fc").value=c;sync()}
  else if(t.id==="fc"){ct=true;sync()}else if(t.id==="fb")sync();
  else if(t.id==="rd"&&t.value!=="c"){u.remind=+t.value;$("#rn").value=t.value;$("#rerr").textContent="";save()}
  else if(t.id==="rf"&&t.files[0]){var r=new FileReader();r.onload=function(){shrink(r.result,function(d){S.scan={step:"pick",img:d};render()})};r.readAsDataURL(t.files[0])}
  else if(t.dataset&&t.dataset.r&&(t.dataset.r[0]==="c"||t.dataset.r[0]==="b")){var k=t.dataset.r.slice(1),xi=document.querySelector('[data-r="x'+k+'"]'),bi=document.querySelector('[data-r="b'+k+'"]'),ci=document.querySelector('[data-r="c'+k+'"]');if(xi&&!xi.dataset.t&&bi.value)xi.value=iso(ts(bi.value)+LIFE[ci.value]*DAY)}});
function sync(){if(xt)return;var b=$("#fb").value;if(b){$("#fx").value=iso(ts(b)+LIFE[$("#fc").value]*DAY);$("#est").hidden=false}}
document.addEventListener("submit",function(ev){ev.preventDefault();var id=ev.target.id,u=me();
  if(id==="itf")saveItem();
  else if(id==="usf"){var ui2=find(S.modal.id),tot=qnum(ui2.qty).n,v=parseFloat($("#ua").value);
    if(!(v>0)){$("#merr").textContent="Enter how much you used.";return}
    if(v>tot+1e-9){$("#merr").textContent="You only have "+ui2.qty+".";return}
    S.modal=null;markUsed(ui2,v)}
  else if(id==="pf"){var n=$("#pn").value.trim();if(!n){$("#merr").textContent="Enter your name.";return}u.name=n;save();S.modal=null;render()}
  else if(id==="reg"||id==="login"){var r=id==="reg",em=$("#em").value.trim().toLowerCase(),pw=$("#pw").value,m="",nm="";
    if(r){nm=$("#nm").value.trim();if(!nm||!/^\S+@\S+\.\S+$/.test(em))m="Enter your name and a valid email address.";else if(pw.length<8)m="Password must be at least 8 characters.";else if(pw!==$("#pc").value)m="Passwords don’t match."}
    else if(!em||!pw)m="Enter your email and password.";
    if(m){$("#aerr").textContent=m;return}
    var bt=ev.target.querySelector("button[type=submit]");bt.disabled=true;$("#aerr").textContent="";
    api(r?"/api/account/register":"/api/account/login","POST",r?{name:nm,email:em,password:pw}:{email:em,password:pw}).then(function(x){setTok(x.token);load(x.state,x.email);S.tab="pan";render();ping()}).catch(function(e){bt.disabled=false;$("#aerr").textContent=e.status?e.message:"Can’t reach the server. Check your connection and try again."})}});
if(TOKEN){api("/api/account/state","POST",{action:"get"}).then(function(x){load(x.state,x.email);S.boot=false;render();ping()}).catch(function(e){if(e.status===401)setTok("");S.boot=false;render()})}else{S.boot=false;render()}
})();
