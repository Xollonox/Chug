const cvs=document.getElementById('game');
const ctx=cvs.getContext('2d');
let W,H,GND;
function resize(){
  W=window.innerWidth;H=window.innerHeight;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  cvs.width=W*dpr;cvs.height=H*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  GND=H-GROUND_OFFSET;
}
window.addEventListener('resize',resize);resize();

// ── BG PARTICLES ──
(function spawnBgParticles(){
  const container=document.getElementById('bgParticles');
  for(let i=0;i<BACKGROUND_PARTICLE_COUNT;i++){
    const el=document.createElement('div');
    el.className='bp';
    const size=Math.random()*3+1;
    el.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;
      bottom:${Math.random()*40}%;animation-duration:${8+Math.random()*12}s;
      animation-delay:${Math.random()*10}s;opacity:0;`;
    container.appendChild(el);
  }
})();

// ── STATE ──
let gameState='menu';
let coins=0,weapon='none',armor='none',rageMode2=false;
let strengthUpg=0,speedUpg=0,enduranceUpg=0;
let scIdx=0,pWins=0,eWins=0,curRound=1,fType=1,timeLeft=50,lastTick=0;
let currentPart=1;
let envRage=false,hitStop=0,screenShake=0;
let comboCount=0,comboTimer=0,lastComboTime=0;

// ── SETTINGS ──
let settingsMusicVol=0.7,settingsSfxVol=1.0,settingsShake=true,settingsComboDsp=true;
function adjustVol(type,delta){
  if(type==='music'){
    settingsMusicVol=Math.max(0,Math.min(1,settingsMusicVol+delta));
    document.getElementById('music-vol-fill').style.width=(settingsMusicVol*100)+'%';
    if(masterGain)masterGain.gain.setTargetAtTime(settingsMusicVol,AC.currentTime,0.1);
  } else {
    settingsSfxVol=Math.max(0,Math.min(1,settingsSfxVol+delta));
    document.getElementById('sfx-vol-fill').style.width=(settingsSfxVol*100)+'%';
  }
  try{localStorage.setItem(SETTINGS_STORAGE_KEY,JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function toggleShake(){
  settingsShake=!settingsShake;
  document.getElementById('shake-toggle').innerText=settingsShake?'ON':'OFF';
  try{localStorage.setItem(SETTINGS_STORAGE_KEY,JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function toggleComboDsp(){
  settingsComboDsp=!settingsComboDsp;
  document.getElementById('combo-toggle').innerText=settingsComboDsp?'ON':'OFF';
  if(!settingsComboDsp)document.getElementById('combo-display').style.display='none';
  try{localStorage.setItem(SETTINGS_STORAGE_KEY,JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function loadSettings(){
  try{const raw=localStorage.getItem(SETTINGS_STORAGE_KEY);if(raw){const s=JSON.parse(raw);settingsMusicVol=s.mv??0.7;settingsSfxVol=s.sv??1.0;settingsShake=s.sh??true;settingsComboDsp=s.cd??true;}}catch(e){}
  document.getElementById('music-vol-fill').style.width=(settingsMusicVol*100)+'%';
  document.getElementById('sfx-vol-fill').style.width=(settingsSfxVol*100)+'%';
  document.getElementById('shake-toggle').innerText=settingsShake?'ON':'OFF';
  document.getElementById('combo-toggle').innerText=settingsComboDsp?'ON':'OFF';
}
function openSettings(){
  initAudio();
  // Build story recap
  const recaps={
    1:'Part I — The Fall: Chug enters the Shadow System. A Guide appears. First enemies emerge.',
    2:'Part II — The Watcher: A silent figure watches from above. Won\'t engage. Knows Chug\'s name.',
    3:'Part III — Echoes: Chug hears a familiar voice. Fights through fractured memories.',
    4:'Part IV — Left Behind: A flashback. Someone was with Chug. He left them behind.',
    5:'Part V — Controlled: An enemy under someone else\'s control speaks with a human voice.',
    6:'Part VI — Vanished: The body Chug fought is gone. Taken. The Watcher is involved.',
    7:'Part VII — Rewrite: The controlled host is being rewritten. Memory blocks enforced.',
    8:'Part VIII — Fragments: Chug\'s old streaming room flickers in. Two chairs. The friend\'s voice.',
    9:'Part IX — Breakpoint: Sub Boss — The Delay — blocks the path. Watcher is losing control.',
    10:'Part X — Erasure: The Final Host. Control broken. The friend doesn\'t remember Chug at all.',
    11:'Part XI — Afterimage: The Figure is free but has no memory. Future factions — Drakos and Nexters — flash ahead. The fight is just beginning.'
  };
  const unlocked=window.__saveData?.chapterUnlocked||1;
  let recap='';
  for(let p=1;p<=Math.min(unlocked,10);p++){if(recaps[p])recap+=recaps[p]+'\n\n';}
  document.getElementById('story-recap-text').innerText=recap||'No story progress yet.';
  showScreen('settings-screen');
}
function closeSettings(){showScreen('menu-screen');}

// ── PER-PART BACKGROUNDS ──
const PART_BG={
  1:{bg1:'#1a0a00',bg2:'#000',fog:'rgba(80,30,0,0.18)',ground:'#0d0d0d',accent:'rgba(200,147,26,0.4)',moonCol:'radial-gradient(circle,#ffe8c0 0%,#d4a843 50%,#7a5010 100%)',moonShadow:'rgba(200,140,30,0.3)',toriiOp:0.15},
  2:{bg1:'#000a14',bg2:'#000',fog:'rgba(0,40,80,0.12)',ground:'#080c0f',accent:'rgba(0,180,220,0.3)',moonCol:'radial-gradient(circle,#c0d8ff 0%,#4080c0 50%,#102050 100%)',moonShadow:'rgba(0,80,180,0.3)',toriiOp:0.1},
  3:{bg1:'#0a0a18',bg2:'#000',fog:'rgba(40,0,80,0.15)',ground:'#0a080f',accent:'rgba(120,80,220,0.35)',moonCol:'radial-gradient(circle,#e0d0ff 0%,#8060c0 50%,#200840 100%)',moonShadow:'rgba(100,0,200,0.3)',toriiOp:0.08},
  4:{bg1:'#14080a',bg2:'#000',fog:'rgba(100,0,20,0.14)',ground:'#0f0808',accent:'rgba(200,0,40,0.3)',moonCol:'radial-gradient(circle,#ffc0c0 0%,#c04040 50%,#400010 100%)',moonShadow:'rgba(200,0,40,0.3)',toriiOp:0.12},
  5:{bg1:'#0a0010',bg2:'#000',fog:'rgba(80,0,120,0.18)',ground:'#080008',accent:'rgba(180,0,220,0.35)',moonCol:'radial-gradient(circle,#e0a0ff 0%,#9000cc 50%,#2a0040 100%)',moonShadow:'rgba(140,0,200,0.4)',toriiOp:0.06},
  6:{bg1:'#000810',bg2:'#000',fog:'rgba(0,20,60,0.16)',ground:'#050808',accent:'rgba(0,120,180,0.3)',moonCol:'radial-gradient(circle,#a0c0ff 0%,#2060a0 50%,#001030 100%)',moonShadow:'rgba(0,60,160,0.35)',toriiOp:0.05},
  7:{bg1:'#100004',bg2:'#000',fog:'rgba(120,0,20,0.2)',ground:'#0c0003',accent:'rgba(220,0,40,0.4)',moonCol:'radial-gradient(circle,#ff8888 0%,#cc0020 50%,#440000 100%)',moonShadow:'rgba(220,0,30,0.5)',toriiOp:0.04},
  8:{bg1:'#0a0008',bg2:'#000',fog:'rgba(60,0,80,0.2)',ground:'#080006',accent:'rgba(180,0,180,0.35)',moonCol:'radial-gradient(circle,#ff80ff 0%,#aa00aa 50%,#300030 100%)',moonShadow:'rgba(180,0,180,0.4)',toriiOp:0.03},
  9:{bg1:'#100000',bg2:'#000',fog:'rgba(140,0,0,0.22)',ground:'#0c0000',accent:'rgba(220,20,0,0.45)',moonCol:'radial-gradient(circle,#ff4444 0%,#cc0000 50%,#400000 100%)',moonShadow:'rgba(220,0,0,0.5)',toriiOp:0.02},
  10:{bg1:'#0a0000',bg2:'#000',fog:'rgba(180,0,0,0.25)',ground:'#080000',accent:'rgba(255,0,0,0.5)',moonCol:'radial-gradient(circle,#ff2222 0%,#aa0000 50%,#200000 100%)',moonShadow:'rgba(255,0,0,0.6)',toriiOp:0.01},
  11:{bg1:'#000810',bg2:'#000',fog:'rgba(20,40,80,0.2)',ground:'#050810',accent:'rgba(60,120,200,0.35)',moonCol:'radial-gradient(circle,#c0d8ff 0%,#3060a0 50%,#000820 100%)',moonShadow:'rgba(40,80,180,0.4)',toriiOp:0.08},
};
function applyPartBg(part){
  const b=PART_BG[part]||PART_BG[1];
  const root=document.documentElement;
  root.style.setProperty('--part-bg1',b.bg1);
  root.style.setProperty('--part-bg2',b.bg2);
  root.style.setProperty('--part-fog1',b.fog);
  root.style.setProperty('--part-fog2','transparent');
  root.style.setProperty('--part-ground',b.ground);
  root.style.setProperty('--part-accent',b.accent);
  UI.moon.style.background=b.moonCol;
  UI.moon.style.boxShadow=`0 0 40px ${b.moonShadow},0 0 100px ${b.moonShadow.replace('0.3','0.1').replace('0.4','0.15').replace('0.5','0.2')}`;
  const toriiWrap=document.querySelector('.torii-wrap');
  if(toriiWrap)toriiWrap.style.opacity=b.toriiOp;
  // Update part indicator
  const pi=document.getElementById('part-indicator');
  if(pi){pi.innerText=`PART ${part} — ${PART_NAMES[part]||''}`;pi.style.display='block';}
}
let particles=[],floatingTexts=[],landDust=[];
let player=null,enemy=null;
let typingTimer=null,isTyping=false,fullText='';

const SAVE_KEY='chug_shadow_v3_save';

function varRed(){return '#ff003c';}
function varCyan(){return '#00e5ff';}
function varGold(){return '#c8931a';}

// ── SCRIPT ──
function getPartStartIndex(part){const idx=SCRIPT.findIndex(s=>s.part===part);return idx===-1?0:idx;}

