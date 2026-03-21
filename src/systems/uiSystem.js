// ── UI REFS ──
const UI={
  menu:document.getElementById('menu-screen'),
  shop:document.getElementById('shop-screen'),
  story:document.getElementById('story-screen'),
  hud:document.getElementById('hud-screen'),
  ctrls:document.getElementById('controls'),
  kbhint:document.getElementById('kbhint'),
  gCoins:document.getElementById('global-coins'),
  btnMenu:document.getElementById('btn-ingame-menu'),
  cVal:document.getElementById('coin-val'),
  dbox:document.getElementById('dbox'),
  dtxt:document.getElementById('dtxt'),
  dname:document.getElementById('dname'),
  dava:document.getElementById('dava'),
  php:document.getElementById('p-hp'),
  ehp:document.getElementById('e-hp'),
  prage:document.getElementById('p-rage'),
  pstam:document.getElementById('p-stam'),
  ename:document.getElementById('e-name'),
  timer:document.getElementById('timer'),
  roundLbl:document.getElementById('round-label'),
  rlbl:document.getElementById('rage-text'),
  slbl:document.getElementById('stam-text'),
  btnRage:document.getElementById('btn-rage'),
  bg:document.getElementById('bg-layer'),
  moon:document.getElementById('moon'),
  ro:document.getElementById('rage-overlay'),
  banner:document.getElementById('banner'),
  flash:document.getElementById('flash')
};

// ── INPUT ──
const K={l:0,r:0,j:0,a:0,k:0,g:0,t:0,rage:0};
window.addEventListener('keydown',e=>{
  if(e.code==='Space'&&gameState==='story'){e.preventDefault();advance();return;}
  if(e.key==='a'||e.key==='ArrowLeft')K.l=1;
  if(e.key==='d'||e.key==='ArrowRight')K.r=1;
  if(e.key==='w'||e.key==='ArrowUp')K.j=1;
  if(e.key==='f')K.a=1;
  if(e.key==='k')K.k=1;
  if(e.key==='g'||e.key==='G')K.g=1;
  if(e.key==='t'||e.key==='T')K.t=1;
  if(e.key==='r'||e.key==='R')K.rage=1;
});
window.addEventListener('keyup',e=>{
  if(e.key==='a'||e.key==='ArrowLeft')K.l=0;
  if(e.key==='d'||e.key==='ArrowRight')K.r=0;
  if(e.key==='w'||e.key==='ArrowUp')K.j=0;
  if(e.key==='f')K.a=0;
  if(e.key==='k')K.k=0;
  if(e.key==='g'||e.key==='G')K.g=0;
  if(e.key==='t'||e.key==='T')K.t=0;
  if(e.key==='r'||e.key==='R')K.rage=0;
});
function bindBtn(id,key){
  const el=document.getElementById(id);
  if(!el)return;
  const dn=e=>{e.preventDefault();K[key]=1;el.classList.add('pressed');};
  const up=e=>{e.preventDefault();K[key]=0;el.classList.remove('pressed');};
  ['touchstart','pointerdown','mousedown'].forEach(ev=>el.addEventListener(ev,dn,{passive:false}));
  ['touchend','touchcancel','pointerup','pointerleave','mouseup','mouseleave'].forEach(ev=>el.addEventListener(ev,up,{passive:false}));
}
bindBtn('btn-l','l');bindBtn('btn-r','r');bindBtn('btn-j','j');bindBtn('btn-p','a');bindBtn('btn-k','k');bindBtn('btn-g','g');bindBtn('btn-t','t');bindBtn('btn-rage','rage');
UI.dbox.addEventListener('pointerdown',()=>advance());

// ── VISUAL FX ──
function doFlash(){UI.flash.style.opacity='0.7';setTimeout(()=>UI.flash.style.opacity='0',70);}

function showCombo(count){
  if(!settingsComboDsp)return;
  const el=document.getElementById('combo-display');
  const countEl=document.getElementById('combo-count');
  const labelEl=document.getElementById('combo-label');
  if(!el||!countEl)return;
  if(gameState!=='fight')return;
  clearTimeout(window._comboTimeout);
  el.style.display='block';
  // Color based on combo size
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
  UI.banner.innerText=txt;
  UI.banner.style.color=txt.includes('DEFEAT')||txt.includes('LOSE')?varRed():'#fff';
  UI.banner.style.opacity=1;UI.banner.style.transform='scale(1)';
  setTimeout(()=>{
    UI.banner.style.opacity=0;UI.banner.style.transform='scale(0.75)';
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

function fireAt(x,y,vx){
  const cols=['#ff0000','#ff2200','#ff5500','#ff8800','#ffaa00'];
  particles.push({x:x+Math.random()*50,y:y-Math.random()*110,
    vx:vx*0.3+(Math.random()-.5)*2,vy:-(Math.random()*5+1.5),
    life:.9+Math.random()*.3,col:cols[Math.floor(Math.random()*cols.length)],w:Math.random()*12+3,tp:'f'});
}
function bloodSplatter(x,y,fd,heavy){
  let count=heavy?40:16;
  for(let i=0;i<count;i++){
    particles.push({x:x+(Math.random()-.5)*20,y:y-50+(Math.random()-.5)*30,
      vx:fd*(Math.random()*6+2)+(Math.random()-.5)*3,vy:-Math.random()*7-2,
      life:1.4+Math.random(),col:'#880000',w:Math.random()*5+2,tp:'b'});
  }
}
function shadowSlash(x,y,dir,col='#ffffff',heavy=false){
  for(let i=0;i<14;i++){
    const ang=(Math.random()-.5)*1.0;
    particles.push({x,y:y-60,vx:Math.cos(ang)*dir*(10+Math.random()*8),vy:Math.sin(ang)*(5+Math.random()*4)-4,
      life:0.7+Math.random()*0.4,col,w:Math.random()*24+10,tp:'s'});
  }
  for(let i=0;i<6;i++){
    const ang2=-Math.PI*0.5+Math.random()*Math.PI*0.6*dir;
    particles.push({x:x+Math.cos(ang2)*24,y:y-60+Math.sin(ang2)*24,
      vx:Math.cos(ang2)*dir*(4+Math.random()*3),vy:Math.sin(ang2)*2-5,
      life:0.4+Math.random()*0.3,col,w:Math.random()*14+6,tp:'s'});
  }
}

function weaponImpactFX(x,y,dir,weapType,heavy){
  const T=Date.now();
  if(weapType==='katana'||weapType==='dagger'){
    // Blade slash streaks
    for(let i=0;i<10;i++){
      const ang=(Math.random()-.5)*0.6;
      particles.push({x,y:y-50,vx:Math.cos(ang)*dir*(12+Math.random()*10),vy:Math.sin(ang)*(3+Math.random()*3)-5,
        life:0.5+Math.random()*0.3,col:'rgba(255,255,220,0.9)',w:Math.random()*18+8,tp:'s'});
    }
  } else if(weapType==='scythe'){
    for(let i=0;i<16;i++){
      const ang=(-Math.PI*0.5+Math.random()*Math.PI*0.8)*dir;
      particles.push({x:x+Math.cos(ang)*30,y:y-60+Math.sin(ang)*30,
        vx:Math.cos(ang)*dir*(6+Math.random()*4),vy:Math.sin(ang)*3-6,
        life:0.6+Math.random()*0.4,col:'rgba(170,120,255,0.9)',w:Math.random()*22+12,tp:'s'});
    }
  } else if(weapType==='chain'){
    for(let i=0;i<8;i++){
      particles.push({x,y:y-40,vx:dir*(8+Math.random()*8)+(Math.random()-.5)*5,vy:-Math.random()*6-2,
        life:0.4+Math.random()*0.3,col:'rgba(200,200,255,0.8)',w:Math.random()*12+6,tp:'s'});
    }
  } else if(weapType==='hammer'){
    // Rock shards and shockwave dust
    for(let i=0;i<20;i++){
      particles.push({x:x+(Math.random()-.5)*30,y:y-10,
        vx:(Math.random()-.5)*16,vy:-Math.random()*12-3,
        life:1.2+Math.random()*0.5,col:'rgba(140,120,90,0.9)',w:Math.random()*8+4,tp:'b'});
    }
    for(let i=0;i<12;i++){
      particles.push({x,y:y-40,vx:dir*(10+Math.random()*12),vy:-Math.random()*4,
        life:0.3+Math.random()*0.2,col:'rgba(255,160,0,0.8)',w:Math.random()*10+5,tp:'s'});
    }
  } else if(weapType==='claws'){
    // Dual claw scratch marks
    for(let ci=-1;ci<=1;ci++){
      for(let i=0;i<4;i++){
        particles.push({x:x+ci*12,y:y-60+Math.random()*20,vx:dir*(6+Math.random()*4),vy:-Math.random()*5-2,
          life:0.35+Math.random()*0.25,col:'rgba(200,200,255,0.8)',w:4+Math.random()*6,tp:'s'});
      }
    }
  } else if(weapType==='staff'||weapType==='knuckle'){
    // Concussion burst
    for(let i=0;i<12;i++){
      const ang2=Math.random()*Math.PI*2;
      particles.push({x,y:y-50,vx:Math.cos(ang2)*dir*(8+Math.random()*6),vy:Math.sin(ang2)*4-5,
        life:0.4+Math.random()*0.3,col:weapType==='staff'?'rgba(200,147,26,0.9)':'rgba(255,180,50,0.8)',w:Math.random()*16+8,tp:'s'});
    }
  }
}

