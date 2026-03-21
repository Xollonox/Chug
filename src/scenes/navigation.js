const CHAPTER_PARTS = {1:[1,2,3,4,5], 2:[6,7,8,9,10], 3:[11]};
const CHAPTER_TITLES = {1:'THE FALL', 2:'VANISHED', 3:'AFTERIMAGE'};
const CHAPTER_ACT = {1:1, 2:1, 3:2};
let activeChapter = 1;
let activeAct = 1;

function refreshMenuLocks(){
  chapterSelectController?.render();
  renderProfileSummary?.();
}

function openChapterSelect(){
  initAudio();
  loadGame();
  refreshMenuLocks();
  uiStateStore?.set({ selectedChapter: activeChapter || 1 });
  showScreen('chapter-screen');
}
function closeChapterSelect(){ showScreen('menu-screen'); }

function openSettings(){
  initAudio();
  const recaps = {
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
    11:'Part XI — Afterimage: The Figure is free but has no memory. Future factions flash ahead.'
  };
  const unlocked = window.__saveData?.chapterUnlocked || 1;
  let recap = '';
  for(let p=1;p<=Math.min(unlocked,11);p++){ if(recaps[p]) recap += recaps[p] + '\n\n'; }
  document.getElementById('story-recap-text').innerText = recap || 'No story progress yet.';
  showScreen('settings-screen');
}
function closeSettings(){ showScreen('menu-screen'); }

function startChapter(ch){
  initAudio();
  const chapter = CHAPTER_CONFIG[ch];
  const profile = getPlayerProfile();
  if(!profile.chapterProgress.unlocked.includes(ch) || profile.level < (chapter.requiredLevel || 1)){
    notificationController?.push({ title:'Chapter Locked', copy:`Reach level ${chapter.requiredLevel} and clear previous content to enter ${chapter.title}.`, color:'rgba(255,59,95,0.5)' });
    return;
  }

  activeChapter=ch;
  activeAct=CHAPTER_ACT[ch]||1;
  uiStateStore?.set({ selectedChapter: ch });
  const parts=CHAPTER_PARTS[ch];
  const title=CHAPTER_TITLES[ch];
  const chNums=['','I','II','III','IV','V'];

  uiTransitions.playChapterTransition(`CHAPTER ${chNums[ch]||ch}`, title, ()=>{
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
      gameState='story'; initFight(save.pendingFightType); return;
    }

    for(let i=parts.length-1;i>=0;i--){
      if(unlk>parts[i]){startPart=parts[Math.min(i+1,parts.length-1)];break;}
      if(unlk===parts[i]){startPart=parts[i];break;}
    }
    if(!parts.includes(startPart))startPart=parts[0];

    currentPart=startPart;
    applyPartBg(currentPart);
    const partStart=getPartStartIndex(startPart);
    const savedIdx=save.storyIndexByPart&&save.storyIndexByPart[String(startPart)]!=null ? save.storyIndexByPart[String(startPart)] : partStart;
    scIdx=Math.max(partStart,savedIdx);
    gameState='story'; showScreen('story-screen'); saveGame({currentPart:startPart}); advance(true);
  });
}

function continueGame(){
  initAudio(); loadGame(); UI.gCoins.style.display='block'; UI.btnMenu.style.display='block';
  currentPart=window.__saveData?.currentPart||1; applyPartBg(currentPart);
  for(const [ch,parts] of Object.entries(CHAPTER_PARTS)){ if(parts.includes(currentPart)){activeChapter=parseInt(ch,10); activeAct=CHAPTER_ACT[parseInt(ch,10)]||1; break;} }
  if(window.__saveData?.pendingFightType&&window.__saveData?.pendingFightPart===currentPart){ scIdx=window.__saveData.pendingFightIndex||getPartStartIndex(currentPart); gameState='story'; initFight(window.__saveData.pendingFightType); return; }
  scIdx=(window.__saveData?.storyIndexByPart&&window.__saveData.storyIndexByPart[String(currentPart)]!=null)?window.__saveData.storyIndexByPart[String(currentPart)]:getPartStartIndex(currentPart);
  startMusicTheme('story'); gameState='story'; showScreen('story-screen'); advance(true);
}

function newGame(){
  if(!confirm('Start a NEW GAME?\n\nAll progress, coins and unlocks will be reset.'))return;
  initAudio();
  try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  window.__saveData=defaultSave();
  window.__saveData.profile = createDefaultProfile();
  syncLegacyProgressionGlobals(window.__saveData.profile);
  currentPart=1;
  refreshPersistentUI();
  notificationController?.push({ title:'Progress Reset', copy:'A fresh profile has been initialized.' });
  doFlash();
  UI.gCoins.style.display='block'; UI.btnMenu.style.display='block';
  scIdx=getPartStartIndex(1); activeChapter=1; applyPartBg(1); startMusicTheme('story'); gameState='story'; showScreen('story-screen'); saveGame({currentPart:1}); advance(true);
}

function updateCoins(amt){ if(amt!==0){ addCoins(amt, 'legacy'); UI.gCoins.style.transform='scale(1.08)'; setTimeout(()=>UI.gCoins.style.transform='scale(1)',200); saveGame(); } }

function startPart(num){
  initAudio(); loadGame(); UI.gCoins.style.display='block'; UI.btnMenu.style.display='block';
  const unlocked=window.__saveData?.chapterUnlocked||1; if(unlocked<num)return;
  currentPart=num; applyPartBg(num);
  const save=window.__saveData||defaultSave(); const partStart=getPartStartIndex(num);
  const savedIndex=save.storyIndexByPart&&save.storyIndexByPart[String(num)]!=null?save.storyIndexByPart[String(num)]:partStart;
  scIdx=Math.max(partStart,savedIndex); startMusicTheme('story'); gameState='story'; showScreen('story-screen'); saveGame({currentPart:num}); advance(true);
}

function quitToMenu(){
  stopVO(); stopMusic(0.5);
  if(gameState==='story')checkpointStory(currentPart,scIdx);
  if(gameState==='fight'||gameState==='post'||gameState==='pre')setPendingFight(currentPart,scIdx,fType);
  saveGame({currentPart}); gameState='menu'; showScreen('menu-screen'); loadGame(); refreshMenuLocks();
  UI.ctrls.style.display='none'; UI.kbhint.style.display='none'; UI.gCoins.style.display='none'; UI.btnMenu.style.display='none';
  setEnvRage(false); hitStop=0; screenShake=0; player=null; enemy=null; isTyping=false; clearInterval(typingTimer); switchToNormalBg();
  const pi=document.getElementById('part-indicator'); if(pi)pi.style.display='none'; startMusicTheme('menu');
}

function openShop(){ initAudio(); loadGame(); uiStateStore?.set({ selectedCategory:'weapons', selectedItemId: weapon || 'none' }); UI.gCoins.style.display='block'; showScreen('shop-screen'); armoryController?.render(); }
function closeShop(){
  if(gameState==='story'||gameState==='fight'||gameState==='post'){ showScreen(gameState==='story'?'story-screen':'hud-screen'); }
  else { gameState='menu'; showScreen('menu-screen'); refreshMenuLocks(); UI.gCoins.style.display='none'; }
}
function shopToast(msg,col='#f5c842'){ notificationController?.push({ title:'Armory', copy:msg, color:col }); }
function buyItem(kind,name,price){
  const category = kind === 'weapon' ? 'weapons' : kind === 'armor' ? 'armor' : 'upgrades';
  const item = getEquipmentEntries(category).find((entry)=>entry.id === name) || getWeaponProfile(name);
  if(!item) return;
  if(kind === 'weapon' || kind === 'armor'){
    if(!isItemOwned(name, category)){
      const result = purchaseItem(item);
      if(!result.ok) return shopToast(result.message || 'Purchase failed.', '#ff003c');
      saveGame();
      return shopToast(`Purchased and equipped ${item.name}.`);
    }
    const equipResult = equipItem(category, name);
    if(!equipResult.ok) return shopToast(equipResult.message, '#ff003c');
    saveGame();
    return shopToast(`Equipped ${item.name}.`);
  }
  const result = purchaseItem(item);
  if(!result.ok) return shopToast(result.message || 'Purchase failed.', '#ff003c');
  saveGame();
  armoryController?.render();
  return shopToast(`${item.name} activated.`);
}

const PART_NAMES={1:'THE FALL',2:'THE WATCHER',3:'ECHOES',4:'LEFT BEHIND',5:'CONTROLLED',6:'VANISHED',7:'REWRITE',8:'FRAGMENTS',9:'BREAKPOINT',10:'ERASURE',11:'AFTERIMAGE'};
const PART_COINS={1:150,2:200,3:250,4:300,5:400,6:500,7:600,8:700,9:800,10:1000,11:1200};
let _pendingPartEnd=null;
const SPEAKER_THEME={ CHUG:'CHUG',GUIDE:'GUIDE',SYSTEM:'SYSTEM',WATCHER:'WATCHER', ENEMY:'ENEMY',ENEMIES:'ENEMY',CHAT:'',VOICE:'WATCHER',REFLECTION:'WATCHER', MINI:'ELITE',ELITE:'ELITE',CONTROLLED:'CONTROLLED',FIGURE:'FIGURE', DONATION:'',WATCHER2:'WATCHER' };
function getSpeakerTheme(base){return SPEAKER_THEME[base]||'';}
function applyDialogueTheme(base,isGlitch){ UI.dbox.className='dialogue-box'; if(isGlitch)UI.dbox.classList.add('dbox-GLITCH'); const theme=getSpeakerTheme(base); if(theme)UI.dbox.classList.add(`dbox-${theme}`); }
function triggerDialogueEntrance(){ UI.dtxt.style.animation='none'; requestAnimationFrame(()=>requestAnimationFrame(()=>{UI.dtxt.style.animation='';})); }
function renderDialogue(s){
  let raw=s.t,speaker='',text=raw; let match=raw.match(/^([A-Z0-9\s]+(?:\([^)]+\))?):\s*(.*)/is);
  if(match){speaker=match[1].trim();text=match[2].trim();} else if(raw.startsWith('['))speaker=''; else if(raw.includes('SYSTEM:'))speaker='SYSTEM';
  let baseSpeaker=speaker.split(/[\s(:]/)[0].replace(/[^A-Z0-9]/g,'');
  if(baseSpeaker){ UI.dname.innerText=speaker; UI.dname.style.display='block'; UI.dava.style.display='block'; let avaClass=`ava-${baseSpeaker}`; if(baseSpeaker==='VOICE'||baseSpeaker==='REFLECTION')avaClass='ava-WATCHER'; if(baseSpeaker==='ENEMIES')avaClass='ava-ENEMY'; if(baseSpeaker==='MINI')avaClass='ava-ELITE'; if(baseSpeaker==='CONTROLLED')avaClass='ava-CONTROLLED'; if(baseSpeaker==='FIGURE')avaClass='ava-FIGURE'; if(baseSpeaker==='DONATION')avaClass='ava-CHAT'; const valid=['CHUG','WATCHER','GUIDE','SYSTEM','CHAT','ENEMY','ELITE','VOICE','REFLECTION','CONTROLLED','FIGURE']; if(!valid.includes(avaClass.replace('ava-','')))avaClass='ava-ENEMY'; UI.dava.className=`ava-container ${avaClass}`; }
  else { UI.dname.style.display='none'; UI.dava.style.display='none'; }
  applyDialogueTheme(baseSpeaker,!!s.gl); UI.dtxt.className=s.gl?'dlg-text glitch':'dlg-text'; UI.dtxt.style.color=s.col||'#ddd'; if(s.gl){doFlash();screenShake=4;} triggerDialogueEntrance();
  isTyping=true; fullText=text.replace(/\n/g,'<br>'); UI.dtxt.innerHTML=''; let charIdx=0; clearInterval(typingTimer); const isControlled=(baseSpeaker==='CONTROLLED');
  typingTimer=setInterval(()=>{ if(fullText.substr(charIdx,4)==='<br>'){UI.dtxt.innerHTML+='<br>';charIdx+=4;} else { const ch=fullText.charAt(charIdx); UI.dtxt.innerHTML+=ch; if(ch.trim()){ if(isControlled){beep(Math.random()<0.3?440:880,'square',0.008,0.006);} else {beep(880,'square',0.009,0.007);} } charIdx++; } if(charIdx>=fullText.length){clearInterval(typingTimer);isTyping=false;} },isControlled?Math.floor(16+Math.random()*30):22);
}

function showPartEndCard(part){
  const chapterParts=CHAPTER_PARTS[activeChapter]||[part];
  const nextPartInChapter=chapterParts[chapterParts.indexOf(part)+1]||null;
  const isChapterEnd=!nextPartInChapter;
  const bonus=PART_COINS[part]||150;
  const romans=['','I','II','III','IV','V','VI'];
  const chapterReward = isChapterEnd ? calculateChapterClearRewards(activeChapter) : { xp: Math.round(bonus * 0.35), coins: bonus };
  const xpResult = grantXp(chapterReward.xp, 'part-clear');
  addCoins(chapterReward.coins, 'part-clear');
  markPartCleared(part);
  if(isChapterEnd){ markChapterCompleted(activeChapter); }

  document.getElementById('pecPartLabel').innerText=`PART ${romans[part]||part}`;
  document.getElementById('pecTitle').innerText=PART_NAMES[part]||`PART ${part}`;
  document.getElementById('pecCoins').innerText=`+${chapterReward.coins} 🪙`;
  document.getElementById('pecXp').innerText=`+${chapterReward.xp} XP`;
  const pecBtn=document.getElementById('part-end-continue');
  if(isChapterEnd){ const unlockMsgs={1:'CHAPTER II — VANISHED UNLOCKED',2:'CHAPTER III — AFTERIMAGE UNLOCKED',3:'ACT II — AFTERIMAGE CONTINUES...'}; document.getElementById('pecUnlocked').innerText=`${unlockMsgs[activeChapter]||'JOURNEY CONTINUES...'}${xpResult.levelsGained ? ` · LEVEL ${xpResult.newLevel}` : ''}`; if(pecBtn)pecBtn.innerText='FINISH CHAPTER ▶'; }
  else { const nName=PART_NAMES[nextPartInChapter]||`PART ${nextPartInChapter}`; document.getElementById('pecUnlocked').innerText=`NEXT: PART ${romans[nextPartInChapter]} — ${nName}${xpResult.levelsGained ? ` · LEVEL ${xpResult.newLevel}` : ''}`; if(pecBtn)pecBtn.innerText='CONTINUE ▶'; }
  ['pecS1','pecS2','pecS3'].forEach(id=>{ const el=document.getElementById(id); el.className='pec-star'; if(id==='pecS2')el.classList.add('big'); });
  _pendingPartEnd={part,nextPart:nextPartInChapter,isChapterEnd}; showScreen('part-end-screen'); gameState='part-end'; startMusicTheme('partend'); setTimeout(()=>lightStar('pecS1'),400); setTimeout(()=>lightStar('pecS2'),700); setTimeout(()=>lightStar('pecS3'),950); setTimeout(()=>coinBurstFX(chapterReward.coins),1100); saveGame(); refreshMenuLocks();
}
function lightStar(id){ const el=document.getElementById(id); el.classList.add('lit'); beep(600+Math.random()*200,'sine',0.3,0.06); }
function coinBurstFX(amount){ const card=document.getElementById('partEndCard'); if(!card)return; const rect=card.getBoundingClientRect(); const cx=rect.left+rect.width/2; const cy=rect.top+rect.height*0.55; const count=Math.min(12,Math.floor(amount/20)); for(let i=0;i<count;i++){ const el=document.createElement('div'); el.className='coin-burst'; el.innerText='🪙'; const angle=Math.random()*Math.PI*2; const dist=60+Math.random()*80; el.style.left=cx+'px'; el.style.top=cy+'px'; el.style.setProperty('--tx',(Math.cos(angle)*dist)+'px'); el.style.setProperty('--ty',(Math.sin(angle)*dist-40)+'px'); el.style.animationDelay=(i*0.06)+'s'; document.body.appendChild(el); setTimeout(()=>el.remove(),1200+i*60); } }
function partEndContinue(){ if(!_pendingPartEnd)return; const{nextPart,isChapterEnd}=_pendingPartEnd; _pendingPartEnd=null; if(isChapterEnd){ gameState='menu'; startMusicTheme('menu'); showScreen('menu-screen'); UI.gCoins.style.display='none'; UI.btnMenu.style.display='none'; player=null; loadGame(); refreshMenuLocks(); } else { startMusicTheme('story'); startPart(nextPart); } }

function advance(force=false){
  if(gameState!=='story'&&!force)return;
  if(isTyping&&!force){ clearInterval(typingTimer); UI.dtxt.innerHTML=fullText; isTyping=false; return; }
  if(scIdx>=SCRIPT.length)return;
  const s=SCRIPT[scIdx]; checkpointStory(currentPart,scIdx);
  if(s.end){ UI.dtxt.innerHTML=s.t; UI.dname.style.display='none'; UI.dava.style.display='none'; UI.dbox.className='dialogue-box'; document.querySelector('.dlg-hint').style.display='none'; checkpointStory(currentPart,scIdx+1); clearPendingFight(); const endedPart=currentPart; setTimeout(()=>{ document.querySelector('.dlg-hint').style.display='block'; showPartEndCard(endedPart); },1200); return; }
  if(s.fight){ setPendingFight(currentPart,scIdx,s.fight); initFight(s.fight); return; }
  renderDialogue(s); scIdx++; checkpointStory(currentPart,scIdx);
}

document.addEventListener('visibilitychange',()=>{ if(document.hidden) pauseBgAudio(); else resumeBgAudio(); });
loadGame(); loadSettings(); loadDebugMode(); applyPartBg(1); initUISystems(); refreshMenuLocks(); loop();
