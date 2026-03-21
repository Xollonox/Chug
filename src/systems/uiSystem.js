const UI = {
  menu: document.getElementById('menu-screen'),
  shop: document.getElementById('shop-screen'),
  story: document.getElementById('story-screen'),
  hud: document.getElementById('hud-screen'),
  ctrls: document.getElementById('controls'),
  kbhint: document.getElementById('kbhint'),
  gCoins: document.getElementById('global-coins'),
  btnMenu: document.getElementById('btn-ingame-menu'),
  profileLevel: document.getElementById('profile-level'),
  profileXpFill: document.getElementById('profile-xp-fill'),
  profileXpText: document.getElementById('profile-xp-text'),
  profileSummary: document.getElementById('profile-summary'),
  cVal: document.getElementById('coin-val'),
  dbox: document.getElementById('dbox'),
  dtxt: document.getElementById('dtxt'),
  dname: document.getElementById('dname'),
  dava: document.getElementById('dava'),
  php: document.getElementById('p-hp'),
  ehp: document.getElementById('e-hp'),
  phpGhost: document.getElementById('p-hp-ghost'),
  ehpGhost: document.getElementById('e-hp-ghost'),
  prage: document.getElementById('p-rage'),
  pstam: document.getElementById('p-stam'),
  ename: document.getElementById('e-name'),
  timer: document.getElementById('timer'),
  roundLbl: document.getElementById('round-label'),
  rlbl: document.getElementById('rage-text'),
  slbl: document.getElementById('stam-text'),
  btnRage: document.getElementById('btn-rage'),
  bg: document.getElementById('bg-layer'),
  moon: document.getElementById('moon'),
  ro: document.getElementById('rage-overlay'),
  banner: document.getElementById('banner'),
  flash: document.getElementById('flash')
};

const K = { l:0,r:0,j:0,a:0,k:0,g:0,t:0,rage:0 };
window.addEventListener('keydown',e=>{
  if(e.code==='Space'&&gameState==='story'){e.preventDefault();advance();return;}
  if(e.key==='a'||e.key==='ArrowLeft'){K.l=1;setBufferedInput('l',true);}
  if(e.key==='d'||e.key==='ArrowRight'){K.r=1;setBufferedInput('r',true);}
  if(e.key==='w'||e.key==='ArrowUp'){K.j=1;setBufferedInput('j',true);}
  if(e.key==='f'){K.a=1;setBufferedInput('a',true);}
  if(e.key==='k'){K.k=1;setBufferedInput('k',true);}
  if(e.key==='g'||e.key==='G'){K.g=1;setBufferedInput('g',true);}
  if(e.key==='t'||e.key==='T'){K.t=1;setBufferedInput('t',true);}
  if(e.key==='r'||e.key==='R'){K.rage=1;setBufferedInput('rage',true);}
});
window.addEventListener('keyup',e=>{
  if(e.key==='a'||e.key==='ArrowLeft'){K.l=0;setBufferedInput('l',false);}
  if(e.key==='d'||e.key==='ArrowRight'){K.r=0;setBufferedInput('r',false);}
  if(e.key==='w'||e.key==='ArrowUp'){K.j=0;setBufferedInput('j',false);}
  if(e.key==='f'){K.a=0;setBufferedInput('a',false);}
  if(e.key==='k'){K.k=0;setBufferedInput('k',false);}
  if(e.key==='g'||e.key==='G'){K.g=0;setBufferedInput('g',false);}
  if(e.key==='t'||e.key==='T'){K.t=0;setBufferedInput('t',false);}
  if(e.key==='r'||e.key==='R'){K.rage=0;setBufferedInput('rage',false);}
});
function bindBtn(id,key){
  const el=document.getElementById(id);
  if(!el)return;
  const dn=e=>{e.preventDefault();K[key]=1;setBufferedInput(key,true);el.classList.add('pressed');};
  const up=e=>{e.preventDefault();K[key]=0;setBufferedInput(key,false);el.classList.remove('pressed');};
  ['touchstart','pointerdown','mousedown'].forEach(ev=>el.addEventListener(ev,dn,{passive:false}));
  ['touchend','touchcancel','pointerup','pointerleave','mouseup','mouseleave'].forEach(ev=>el.addEventListener(ev,up,{passive:false}));
}
['l','r','j','p','k','g','t'].forEach(()=>{});
bindBtn('btn-l','l');bindBtn('btn-r','r');bindBtn('btn-j','j');bindBtn('btn-p','a');bindBtn('btn-k','k');bindBtn('btn-g','g');bindBtn('btn-t','t');bindBtn('btn-rage','rage');
UI.dbox.addEventListener('pointerdown',()=>advance());


function renderProfileSummary(){
  const summary = getProfileSummary?.();
  if(!summary || !UI.profileSummary) return;
  UI.profileSummary.style.display = ['menu','story','hud','settings'].some((name)=>uiStateStore?.getState()?.activeScreen === `${name}-screen`) || gameState !== 'menu' ? 'block' : 'block';
  UI.profileLevel.innerText = summary.level;
  UI.profileXpFill.style.width = `${Math.max(4, (summary.xpCurrent / Math.max(1, summary.xpNeeded)) * 100)}%`;
  UI.profileXpText.innerText = `${summary.xpCurrent} / ${summary.xpNeeded} XP`;
}

function doFlash(){ UI.flash.style.opacity='0.7'; setTimeout(()=>UI.flash.style.opacity='0',70); }
function showCombo(count){
  if(!settingsComboDsp)return;
  const el=document.getElementById('combo-display');
  const countEl=document.getElementById('combo-count');
  const labelEl=document.getElementById('combo-label');
  if(!el||!countEl||gameState!=='fight')return;
  clearTimeout(window._comboTimeout);
  el.style.display='block';
  let col='#fff',glow='rgba(255,255,255,0.6)',label='HIT';
  if(count>=3){col='#f5c842';glow='rgba(245,200,66,0.8)';label='COMBO';}
  if(count>=6){col='#ff8800';glow='rgba(255,136,0,0.9)';label='CHAIN';}
  if(count>=10){col='#ff2244';glow='rgba(255,34,68,1)';label='SAVAGE';}
  if(count>=15){col='#cc44ff';glow='rgba(200,68,255,1)';label='UNSTOPPABLE';}
  countEl.innerText=count>=2?`${count}×`:'';
  countEl.style.color=col;
  countEl.style.textShadow=`0 0 20px ${glow},0 4px 12px #000`;
  countEl.style.transform='scale(1.3)';
  labelEl.innerText=count>=2?label:'';
  labelEl.style.color=col;
  setTimeout(()=>{countEl.style.transform='scale(1)';},100);
  window._comboTimeout=setTimeout(()=>{el.style.display='none';comboCount=0;},2200);
}
function showBanner(txt,cb,dur=1500){
  overlayController?.setBanner(txt, txt.includes('DEFEAT')||txt.includes('LOSE')?'danger':'neutral');
  UI.banner.innerText=txt;
  UI.banner.style.color=txt.includes('DEFEAT')||txt.includes('LOSE')?varRed():'#fff';
  UI.banner.style.opacity=1;UI.banner.style.transform='translate(-50%, 0) scale(1)';
  setTimeout(()=>{
    UI.banner.style.opacity=0;UI.banner.style.transform='translate(-50%, 0) scale(0.75)';
    if(cb)setTimeout(cb,300);
  },dur);
}
function setEnvRage(on){
  envRage=on;
  UI.moon.className='moon'+(on?' rage':'');
  UI.ro.style.opacity=on?'1':'0';
  UI.bg.style.background=on?
    'radial-gradient(ellipse at 50% 110%,#600000 0%,#180000 60%,#000 100%)':
    'radial-gradient(ellipse at 50% 110%,#1a0a00 0%,#000 70%)';
}

function fireAt(x,y,vx){ const cols=['#ff0000','#ff2200','#ff5500','#ff8800','#ffaa00']; particles.push({x:x+Math.random()*50,y:y-Math.random()*110,vx:vx*0.3+(Math.random()-.5)*2,vy:-(Math.random()*5+1.5),life:.9+Math.random()*.3,col:cols[Math.floor(Math.random()*cols.length)],w:Math.random()*12+3,tp:'f'}); }
function bloodSplatter(x,y,fd,heavy){ let count=heavy?40:16; for(let i=0;i<count;i++){ particles.push({x:x+(Math.random()-.5)*20,y:y-50+(Math.random()-.5)*30,vx:fd*(Math.random()*6+2)+(Math.random()-.5)*3,vy:-Math.random()*7-2,life:1.4+Math.random(),col:'#880000',w:Math.random()*5+2,tp:'b'}); } }
function shadowSlash(x,y,dir,col='#ffffff'){ for(let i=0;i<14;i++){ const ang=(Math.random()-.5)*1.0; particles.push({x,y:y-60,vx:Math.cos(ang)*dir*(10+Math.random()*8),vy:Math.sin(ang)*(5+Math.random()*4)-4,life:0.7+Math.random()*0.4,col,w:Math.random()*24+10,tp:'s'}); } }
function weaponImpactFX(x,y,dir,weapType){
  if(weapType==='katana'||weapType==='dagger'){ for(let i=0;i<10;i++){ const ang=(Math.random()-.5)*0.6; particles.push({x,y:y-50,vx:Math.cos(ang)*dir*(12+Math.random()*10),vy:Math.sin(ang)*(3+Math.random()*3)-5,life:0.5+Math.random()*0.3,col:'rgba(255,255,220,0.9)',w:Math.random()*18+8,tp:'s'}); } }
  else if(weapType==='scythe'){ for(let i=0;i<16;i++){ const ang=(-Math.PI*0.5+Math.random()*Math.PI*0.8)*dir; particles.push({x:x+Math.cos(ang)*30,y:y-60+Math.sin(ang)*30,vx:Math.cos(ang)*dir*(6+Math.random()*4),vy:Math.sin(ang)*3-6,life:0.6+Math.random()*0.4,col:'rgba(170,120,255,0.9)',w:Math.random()*22+12,tp:'s'}); } }
}

function initUISystems(){
  menuController?.bind();
  uiStateStore?.subscribe((snapshot)=>{
    uiDebug?.render(snapshot);
    renderProfileSummary();
    if(snapshot.activeScreen === 'chapter-screen') chapterSelectController?.render();
    if(snapshot.activeScreen === 'shop-screen') armoryController?.render();
  });
  document.getElementById('reward-continue-btn')?.addEventListener('click', ()=>continueRewardFlow());
  document.querySelectorAll('[data-setting]').forEach((button)=>button.addEventListener('click', ()=>{
    const action = button.dataset.setting;
    if(action === 'music-down') adjustVol('music',-0.1);
    if(action === 'music-up') adjustVol('music',0.1);
    if(action === 'sfx-down') adjustVol('sfx',-0.1);
    if(action === 'sfx-up') adjustVol('sfx',0.1);
    if(action === 'shake-toggle') toggleShake();
    if(action === 'combo-toggle') toggleComboDsp();
  }));
}
window.initUISystems = initUISystems;

window.renderProfileSummary = renderProfileSummary;
