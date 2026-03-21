// ── CHAPTER CONFIG ──
// Chapter 1 = parts 1-5, Chapter 2 = parts 6-7
const CHAPTER_PARTS = {1:[1,2,3,4,5], 2:[6,7,8,9,10], 3:[11]};
const CHAPTER_TITLES = {1:'THE FALL', 2:'VANISHED', 3:'AFTERIMAGE'};
const CHAPTER_ACT = {1:1, 2:1, 3:2}; // which act each chapter belongs to
const ACT_CHAPTERS = {1:[1,2], 2:[3]}; // chapters in each act
let activeChapter = 1;
let activeAct = 1;

// ── GAME SCREENS ──
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active-screen'));
  document.getElementById(id).classList.add('active-screen');
}

function refreshMenuLocks(){
  const unlocked=window.__saveData?.chapterUnlocked||1;

  // ── ACT CARDS (main select screen) ──
  // Act 1 always available
  // Act 2 unlocked when Part 11 reached (unlocked >= 11)
  const act2ok=unlocked>=11;
  const a2card=document.getElementById('act2-card');
  const a2lock=document.getElementById('act2-lock');
  const a2num=document.getElementById('act2-num');
  if(a2card){
    if(act2ok){a2card.classList.remove('locked');if(a2lock)a2lock.innerText='▶';if(a2num)a2num.classList.remove('dim');}
    else{a2card.classList.add('locked');if(a2lock)a2lock.innerText='🔒';if(a2num)a2num.classList.add('dim');}
  }

  // ── ACT 1 OVERVIEW DOTS (cdot1-10 on act select card) ──
  for(let p=1;p<=10;p++){
    const dot=document.getElementById(`cdot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  const dot11=document.getElementById('cdot11');
  if(dot11){dot11.classList.remove('done','active');if(unlocked>11)dot11.classList.add('done');else if(unlocked===11)dot11.classList.add('active');}

  // ── ACT 1 SUB-SCREEN: Chapter I dots (ch1dot1-5) ──
  for(let p=1;p<=5;p++){
    const dot=document.getElementById(`ch1dot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  // Ch1 progress bar
  const c1card=document.getElementById('chap1-card');
  if(c1card){let bar=c1card.querySelector('.chap-progress-bar');if(!bar){bar=document.createElement('div');bar.className='chap-progress-bar';c1card.appendChild(bar);}bar.style.width=Math.min(100,Math.max(0,(unlocked-1)/5*100))+'%';}

  // ── ACT 1 SUB-SCREEN: Chapter II lock + dots (ch2dot6-10) ──
  const ch2ok=unlocked>=6;
  const c2card=document.getElementById('chap2-card');
  const c2lock=document.getElementById('chap2-lock');
  const c2num=document.getElementById('chap2-num');
  if(c2card){
    if(ch2ok){c2card.classList.remove('locked');if(c2lock)c2lock.innerText='▶';if(c2num)c2num.classList.remove('dim');}
    else{c2card.classList.add('locked');if(c2lock)c2lock.innerText='🔒';if(c2num)c2num.classList.add('dim');}
  }
  for(let p=6;p<=10;p++){
    const dot=document.getElementById(`ch2dot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  const c2cardEl=document.getElementById('chap2-card');
  if(c2cardEl){let bar2=c2cardEl.querySelector('.chap-progress-bar');if(!bar2){bar2=document.createElement('div');bar2.className='chap-progress-bar';c2cardEl.appendChild(bar2);}bar2.style.width=Math.min(100,Math.max(0,(unlocked-6)/5*100))+'%';}

  // ── ACT 2 SUB-SCREEN: Chapter III lock + dots ──
  const ch3ok=unlocked>=11;
  const c3card=document.getElementById('chap3-card');
  const c3lock=document.getElementById('chap3-lock');
  const c3num=document.getElementById('chap3-num');
  if(c3card){
    if(ch3ok){c3card.classList.remove('locked');if(c3lock)c3lock.innerText='▶';if(c3num)c3num.classList.remove('dim');}
    else{c3card.classList.add('locked');if(c3lock)c3lock.innerText='🔒';if(c3num)c3num.classList.add('dim');}
  }
  const d11=document.getElementById('ch3dot11');
  if(d11){d11.classList.remove('done','active');if(unlocked>11)d11.classList.add('done');else if(unlocked===11)d11.classList.add('active');}

  // ── ACT 1 OVERVIEW PROGRESS BAR ──
  const a1card=document.getElementById('act1-card');
  if(a1card){let bar=a1card.querySelector('.chap-progress-bar');if(!bar){bar=document.createElement('div');bar.className='chap-progress-bar';a1card.appendChild(bar);}bar.style.width=Math.min(100,Math.max(0,(unlocked-1)/10*100))+'%';}
}

function openAct(act){
  initAudio();refreshMenuLocks();
  activeAct=act;
  showScreen(act===1?'act1-screen':'act2-screen');
}
function closeAct(){
  showScreen('chapter-screen');
}

function openChapterSelect(){
  initAudio();refreshMenuLocks();showScreen('chapter-screen');
}
function closeChapterSelect(){
  showScreen('menu-screen');
}

function startChapter(ch){
  initAudio();
  const unlocked=window.__saveData?.chapterUnlocked||1;
  const minPart={1:1,2:6,3:11}[ch]||1;
  if(unlocked<minPart)return;

  activeChapter=ch;
  activeAct=CHAPTER_ACT[ch]||1;
  const parts=CHAPTER_PARTS[ch];
  const title=CHAPTER_TITLES[ch];
  const chNums=['','I','II','III','IV','V'];

  const overlay=document.getElementById('chap-transition');
  document.getElementById('ct-chapter-lbl').innerText=`CHAPTER ${chNums[ch]||ch}`;
  document.getElementById('ct-title-lbl').innerText=title;
  overlay.classList.add('fade-in');

  setTimeout(()=>{
    overlay.classList.remove('fade-in');
    setTimeout(()=>{
      loadGame();
      UI.gCoins.style.display='block';
      UI.btnMenu.style.display='block';
      const save=window.__saveData||defaultSave();
      const unlk=save.chapterUnlocked||1;
      let startPart=parts[0];

      if(save.pendingFightType&&parts.includes(save.pendingFightPart)){
        currentPart=save.pendingFightPart;
        applyPartBg(currentPart);
        scIdx=save.pendingFightIndex||getPartStartIndex(currentPart);
        gameState='story';initFight(save.pendingFightType);return;
      }

      for(let i=parts.length-1;i>=0;i--){
        if(unlk>parts[i]){startPart=parts[Math.min(i+1,parts.length-1)];break;}
        if(unlk===parts[i]){startPart=parts[i];break;}
      }
      if(!parts.includes(startPart))startPart=parts[0];

      currentPart=startPart;
      applyPartBg(currentPart);
      const partStart=getPartStartIndex(startPart);
      const savedIdx=save.storyIndexByPart&&save.storyIndexByPart[String(startPart)]!=null
        ?save.storyIndexByPart[String(startPart)]:partStart;
      scIdx=Math.max(partStart,savedIdx);
      gameState='story';
      showScreen('story-screen');
      saveGame({currentPart:startPart});
      advance(true);
    },500);
  },2200);
}

function continueGame(){
  initAudio();loadGame();
  UI.gCoins.style.display='block';UI.btnMenu.style.display='block';
  currentPart=window.__saveData?.currentPart||1;
  applyPartBg(currentPart);
  for(const [ch,parts] of Object.entries(CHAPTER_PARTS)){
    if(parts.includes(currentPart)){activeChapter=parseInt(ch);activeAct=CHAPTER_ACT[parseInt(ch)]||1;break;}
  }
  if(window.__saveData?.pendingFightType&&window.__saveData?.pendingFightPart===currentPart){
    scIdx=window.__saveData.pendingFightIndex||getPartStartIndex(currentPart);
    gameState='story';initFight(window.__saveData.pendingFightType);return;
  }
  scIdx=(window.__saveData?.storyIndexByPart&&window.__saveData.storyIndexByPart[String(currentPart)]!=null)
    ?window.__saveData.storyIndexByPart[String(currentPart)]:getPartStartIndex(currentPart);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');advance(true);
}

function newGame(){
  // Confirm before wiping
  if(!confirm('Start a NEW GAME?\n\nAll progress, coins and unlocks will be reset.'))return;
  initAudio();
  // Wipe save
  try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  window.__saveData=defaultSave();
  coins=0;weapon='none';armor='none';rageMode2=false;strengthUpg=0;speedUpg=0;enduranceUpg=0;currentPart=1;
  UI.cVal.innerText=0;
  // Flash + banner then start part 1
  doFlash();
  UI.gCoins.style.display='block';UI.btnMenu.style.display='block';
  scIdx=getPartStartIndex(1);activeChapter=1;
  applyPartBg(1);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');advance(true);
}

function updateCoins(amt){
  if(amt!==0){coins+=amt;UI.cVal.innerText=coins;
    UI.gCoins.style.transform='scale(1.4)';setTimeout(()=>UI.gCoins.style.transform='scale(1)',200);saveGame();}
}

function startPart(num){
  initAudio();loadGame();
  UI.gCoins.style.display='block';UI.btnMenu.style.display='block';
  const unlocked=window.__saveData?.chapterUnlocked||1;
  if(unlocked<num)return;
  currentPart=num;
  applyPartBg(num);
  const save=window.__saveData||defaultSave();
  const partStart=getPartStartIndex(num);
  const savedIndex=save.storyIndexByPart&&save.storyIndexByPart[String(num)]!=null?save.storyIndexByPart[String(num)]:partStart;
  scIdx=Math.max(partStart,savedIndex);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');saveGame({currentPart:num});advance(true);
}

function quitToMenu(){
  stopVO();
  stopMusic(0.5);
  if(gameState==='story')checkpointStory(currentPart,scIdx);
  if(gameState==='fight'||gameState==='post'||gameState==='pre')setPendingFight(currentPart,scIdx,fType);
  saveGame({currentPart});gameState='menu';showScreen('menu-screen');
  loadGame();refreshMenuLocks();
  UI.ctrls.style.display='none';UI.kbhint.style.display='none';
  UI.gCoins.style.display='none';UI.btnMenu.style.display='none';
  setEnvRage(false);hitStop=0;screenShake=0;player=null;enemy=null;
  isTyping=false;clearInterval(typingTimer);
  switchToNormalBg();
  const pi=document.getElementById('part-indicator');if(pi)pi.style.display='none';
  startMusicTheme('menu');
}
function refreshShopUI(){
  const allWeapons=['knuckle','dagger','katana','staff','scythe','claws','hammer'];
  const allArmors=['lightarmor','heavyarmor','voidarmor'];
  allWeapons.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  allArmors.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  ['rage2','strength','strength2','speed','speed2','endurance','endurance2'].forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  if(weapon!=='none'){const el=document.getElementById(`buy-${weapon}`);if(el)el.classList.add('bought');}
  if(armor!=='none'){const el=document.getElementById(`buy-${armor}`);if(el)el.classList.add('bought');}
  if(rageMode2){const el=document.getElementById('buy-rage2');if(el)el.classList.add('bought');}
  if(strengthUpg>=1){const el=document.getElementById('buy-strength');if(el)el.classList.add('bought');}
  if(strengthUpg>=2){const el=document.getElementById('buy-strength2');if(el)el.classList.add('bought');}
  if(speedUpg>=1){const el=document.getElementById('buy-speed');if(el)el.classList.add('bought');}
  if(speedUpg>=2){const el=document.getElementById('buy-speed2');if(el)el.classList.add('bought');}
  if(enduranceUpg>=1){const el=document.getElementById('buy-endurance');if(el)el.classList.add('bought');}
  if(enduranceUpg>=2){const el=document.getElementById('buy-endurance2');if(el)el.classList.add('bought');}
}

function openShop(){initAudio();loadGame();refreshShopUI();UI.gCoins.style.display='block';showScreen('shop-screen');}
function closeShop(){
  if(gameState==='story'||gameState==='fight'||gameState==='post'){
    showScreen(gameState==='story'?'story-screen':'hud-screen');
  } else {
    gameState='menu';showScreen('menu-screen');
    refreshMenuLocks();UI.gCoins.style.display='none';
  }
}

function shopToast(msg,col='#f5c842'){
  let t=document.getElementById('shop-toast');
  if(!t){t=document.createElement('div');t.id='shop-toast';
    t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:999;padding:10px 24px;border-radius:4px;font-family:Cinzel,serif;font-size:12px;font-weight:700;letter-spacing:3px;pointer-events:none;transition:opacity 0.4s;';
    document.body.appendChild(t);}
  t.innerText=msg;t.style.color=col;t.style.background='rgba(0,0,0,0.85)';
  t.style.border=`1px solid ${col}`;t.style.opacity='1';
  clearTimeout(t._hide);t._hide=setTimeout(()=>t.style.opacity='0',1800);
}
function buyItem(kind,name,price){
  if(coins<price){shopToast('NOT ENOUGH COINS','#ff003c');return;}
  updateCoins(-price);
  if(kind==='weapon'){
    weapon=name;
    ['knuckle','dagger','katana','staff','scythe','claws','hammer'].forEach(n=>{
      const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');
    });
    document.getElementById(`buy-${name}`).classList.add('bought');
    saveGame();shopToast('✓ EQUIPPED: '+name.toUpperCase());
  } else if(kind==='armor'){
    armor=name;
    ['lightarmor','heavyarmor','voidarmor'].forEach(n=>{
      const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');
    });
    document.getElementById(`buy-${name}`).classList.add('bought');
    saveGame();shopToast('✓ ARMOR: '+name.toUpperCase());
  } else if(kind==='upgrade'){
    if(name==='rage2'){rageMode2=true;document.getElementById('buy-rage2').classList.add('bought');saveGame();shopToast('✓ RAGE MODE II UNLOCKED','#ff4400');}
    else if(name==='strength'){
      if(strengthUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      strengthUpg=1;document.getElementById('buy-strength').classList.add('bought');saveGame();shopToast('+5 STRENGTH UNLOCKED');
    } else if(name==='strength2'){
      if(strengthUpg<1){shopToast('REQUIRES STRENGTH I','#888');updateCoins(price);return;}
      if(strengthUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      strengthUpg=2;document.getElementById('buy-strength2').classList.add('bought');saveGame();shopToast('+10 STRENGTH UNLOCKED');
    } else if(name==='speed'){
      if(speedUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      speedUpg=1;document.getElementById('buy-speed').classList.add('bought');saveGame();shopToast('+2 SPEED UNLOCKED');
    } else if(name==='speed2'){
      if(speedUpg<1){shopToast('REQUIRES SPEED I','#888');updateCoins(price);return;}
      if(speedUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      speedUpg=2;document.getElementById('buy-speed2').classList.add('bought');saveGame();shopToast('+4 SPEED UNLOCKED');
    } else if(name==='endurance'){
      if(enduranceUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      enduranceUpg=1;document.getElementById('buy-endurance').classList.add('bought');saveGame();shopToast('+30 HP + REGEN UNLOCKED','#00e5ff');
    } else if(name==='endurance2'){
      if(enduranceUpg<1){shopToast('REQUIRES ENDURANCE I','#888');updateCoins(price);return;}
      if(enduranceUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      enduranceUpg=2;document.getElementById('buy-endurance2').classList.add('bought');saveGame();shopToast('+60 HP + REDUCTION UNLOCKED','#00e5ff');
    }
  }
}

// ── PART NAMES ──
const PART_NAMES={1:'THE FALL',2:'THE WATCHER',3:'ECHOES',4:'LEFT BEHIND',5:'CONTROLLED',6:'VANISHED',7:'REWRITE',8:'FRAGMENTS',9:'BREAKPOINT',10:'ERASURE',11:'AFTERIMAGE'};
const PART_COINS={1:150,2:200,3:250,4:300,5:400,6:500,7:600,8:700,9:800,10:1000,11:1200};
let _pendingPartEnd=null; // {part, nextPart}

// ── DIALOGUE EFFECTS ──
const SPEAKER_THEME={
  CHUG:'CHUG',GUIDE:'GUIDE',SYSTEM:'SYSTEM',WATCHER:'WATCHER',
  ENEMY:'ENEMY',ENEMIES:'ENEMY',CHAT:'',VOICE:'WATCHER',REFLECTION:'WATCHER',
  MINI:'ELITE',ELITE:'ELITE',CONTROLLED:'CONTROLLED',FIGURE:'FIGURE',
  DONATION:'',WATCHER2:'WATCHER'
};
function getSpeakerTheme(base){return SPEAKER_THEME[base]||'';}

function applyDialogueTheme(base,isGlitch){
  // Remove all dbox- classes
  UI.dbox.className='dialogue-box';
  if(isGlitch)UI.dbox.classList.add('dbox-GLITCH');
  const theme=getSpeakerTheme(base);
  if(theme)UI.dbox.classList.add(`dbox-${theme}`);
}

function triggerDialogueEntrance(){
  UI.dtxt.style.animation='none';
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{UI.dtxt.style.animation='';});
  });
}

// ── RENDERDILAOGUE ──
function renderDialogue(s){
  let raw=s.t,speaker='',text=raw;
  let match=raw.match(/^([A-Z0-9\s]+(?:\([^)]+\))?):\s*(.*)/is);
  if(match){speaker=match[1].trim();text=match[2].trim();}
  else if(raw.startsWith('['))speaker='';
  else if(raw.includes('SYSTEM:'))speaker='SYSTEM';

  let baseSpeaker=speaker.split(/[\s(:]/)[0].replace(/[^A-Z0-9]/g,'');

  // Avatar + name
  if(baseSpeaker){
    UI.dname.innerText=speaker;UI.dname.style.display='block';UI.dava.style.display='block';
    let avaClass=`ava-${baseSpeaker}`;
    // Fallbacks
    if(baseSpeaker==='VOICE'||baseSpeaker==='REFLECTION')avaClass='ava-WATCHER';
    if(baseSpeaker==='ENEMIES')avaClass='ava-ENEMY';
    if(baseSpeaker==='MINI')avaClass='ava-ELITE';
    if(baseSpeaker==='CONTROLLED')avaClass='ava-CONTROLLED';
    if(baseSpeaker==='FIGURE')avaClass='ava-FIGURE';
    if(baseSpeaker==='DONATION')avaClass='ava-CHAT';
    const valid=['CHUG','WATCHER','GUIDE','SYSTEM','CHAT','ENEMY','ELITE','VOICE','REFLECTION','CONTROLLED','FIGURE'];
    if(!valid.includes(avaClass.replace('ava-','')))avaClass='ava-ENEMY';
    UI.dava.className=`ava-container ${avaClass}`;
  } else {
    UI.dname.style.display='none';UI.dava.style.display='none';
  }

  // Apply speaker-specific box theming
  applyDialogueTheme(baseSpeaker,!!s.gl);

  UI.dtxt.className=s.gl?'dlg-text glitch':'dlg-text';
  UI.dtxt.style.color=s.col||'#ddd';
  if(s.gl){doFlash();screenShake=4;}

  // Fire voiceover on tagged lines

  // Entrance animation reset
  triggerDialogueEntrance();

  isTyping=true;fullText=text.replace(/\n/g,'<br>');UI.dtxt.innerHTML='';let charIdx=0;
  clearInterval(typingTimer);

  // CONTROLLED speaker: glitchy typing speed variation
  const isControlled=(baseSpeaker==='CONTROLLED');
  typingTimer=setInterval(()=>{
    if(fullText.substr(charIdx,4)==='<br>'){UI.dtxt.innerHTML+='<br>';charIdx+=4;}
    else{
      const ch=fullText.charAt(charIdx);
      UI.dtxt.innerHTML+=ch;
      if(ch.trim()){
        if(isControlled){beep(Math.random()<0.3?440:880,'square',0.008,0.006);}
        else{beep(880,'square',0.009,0.007);}
      }
      charIdx++;
    }
    if(charIdx>=fullText.length){clearInterval(typingTimer);isTyping=false;}
  },isControlled?Math.floor(16+Math.random()*30):22);
}

// ── PART END CARD ──
function showPartEndCard(part){
  const chapterParts=CHAPTER_PARTS[activeChapter]||[part];
  const nextPartInChapter=chapterParts[chapterParts.indexOf(part)+1]||null;
  const isChapterEnd=!nextPartInChapter;
  const bonus=PART_COINS[part]||150;
  const romans=['','I','II','III','IV','V','VI'];

  document.getElementById('pecPartLabel').innerText=`PART ${romans[part]||part}`;
  document.getElementById('pecTitle').innerText=PART_NAMES[part]||`PART ${part}`;
  document.getElementById('pecCoins').innerText=`+${bonus} 🪙`;

  const pecBtn=document.querySelector('.pec-btn');
  if(isChapterEnd){
    const unlockMsgs={
      1:'CHAPTER II — VANISHED UNLOCKED',
      2:'CHAPTER III — AFTERIMAGE UNLOCKED',
      3:'ACT II — AFTERIMAGE CONTINUES...'
    };
    document.getElementById('pecUnlocked').innerText=unlockMsgs[activeChapter]||'JOURNEY CONTINUES...';
    if(pecBtn)pecBtn.innerText='FINISH CHAPTER ▶';
  } else {
    const nName=PART_NAMES[nextPartInChapter]||`PART ${nextPartInChapter}`;
    document.getElementById('pecUnlocked').innerText=`NEXT: PART ${romans[nextPartInChapter]} — ${nName}`;
    if(pecBtn)pecBtn.innerText='CONTINUE ▶';
  }

  ['pecS1','pecS2','pecS3'].forEach(id=>{
    const el=document.getElementById(id);
    el.className='pec-star';
    if(id==='pecS2')el.classList.add('big');
  });

  _pendingPartEnd={part,nextPart:nextPartInChapter,bonus,isChapterEnd};
  showScreen('part-end-screen');
  gameState='part-end';
  startMusicTheme('partend');

  setTimeout(()=>lightStar('pecS1'),400);
  setTimeout(()=>lightStar('pecS2'),700);
  setTimeout(()=>lightStar('pecS3'),950);
  setTimeout(()=>coinBurstFX(bonus),1100);

  updateCoins(bonus);
  updateChapterUnlock(part+1);
  saveGame();
  refreshMenuLocks();
}

function lightStar(id){
  const el=document.getElementById(id);
  el.classList.add('lit');
  beep(600+Math.random()*200,'sine',0.3,0.06);
}

function coinBurstFX(amount){
  const card=document.getElementById('partEndCard');
  if(!card)return;
  const rect=card.getBoundingClientRect();
  const cx=rect.left+rect.width/2;
  const cy=rect.top+rect.height*0.55;
  const count=Math.min(12,Math.floor(amount/20));
  for(let i=0;i<count;i++){
    const el=document.createElement('div');
    el.className='coin-burst';el.innerText='🪙';
    const angle=Math.random()*Math.PI*2;
    const dist=60+Math.random()*80;
    el.style.left=cx+'px';el.style.top=cy+'px';
    el.style.setProperty('--tx',(Math.cos(angle)*dist)+'px');
    el.style.setProperty('--ty',(Math.sin(angle)*dist-40)+'px');
    el.style.animationDelay=(i*0.06)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200+i*60);
  }
}

function partEndContinue(){
  if(!_pendingPartEnd)return;
  const{nextPart,isChapterEnd}=_pendingPartEnd;
  _pendingPartEnd=null;
  if(isChapterEnd){
    gameState='menu';
    startMusicTheme('menu');
    showScreen('menu-screen');
    UI.gCoins.style.display='none';
    UI.btnMenu.style.display='none';
    player=null;
    loadGame();
    refreshMenuLocks();
  } else {
    startMusicTheme('story');
    startPart(nextPart);
  }
}


function advance(force=false){
  if(gameState!=='story'&&!force)return;
  if(isTyping&&!force){
    clearInterval(typingTimer);
    // Show full text instantly
    UI.dtxt.innerHTML=fullText;isTyping=false;return;
  }
  if(scIdx>=SCRIPT.length)return;
  const s=SCRIPT[scIdx];
  checkpointStory(currentPart,scIdx);

  if(s.end){
    // Show end text briefly then show part-end card
    UI.dtxt.innerHTML=s.t;UI.dname.style.display='none';UI.dava.style.display='none';
    UI.dbox.className='dialogue-box'; // reset theme
    document.querySelector('.dlg-hint').style.display='none';
    checkpointStory(currentPart,scIdx+1);
    clearPendingFight();
    const endedPart=currentPart;
    setTimeout(()=>{
      document.querySelector('.dlg-hint').style.display='block';
      showPartEndCard(endedPart);
    },1200);
    return;
  }
  if(s.fight){setPendingFight(currentPart,scIdx,s.fight);initFight(s.fight);return;}
  renderDialogue(s);scIdx++;checkpointStory(currentPart,scIdx);
}

// Pause/resume bg audio on tab visibility change
document.addEventListener('visibilitychange',()=>{
  if(document.hidden) pauseBgAudio();
  else resumeBgAudio();
});

loadGame();loadSettings();loadDebugMode();applyPartBg(1);refreshMenuLocks();loop();
