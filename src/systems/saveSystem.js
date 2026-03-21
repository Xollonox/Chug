function defaultSave(){
  const profile = createDefaultProfile();
  syncLegacyProgressionGlobals(profile);
  return {
    profile,
    coins: profile.currencies.coins,
    weapon: profile.equipped.weapon,
    armor: profile.equipped.armor,
    rageMode2: profile.ownedItems.upgrades.includes('rage2'),
    strengthUpg: profile.ownedItems.upgrades.includes('strength2') ? 2 : profile.ownedItems.upgrades.includes('strength') ? 1 : 0,
    speedUpg: profile.ownedItems.upgrades.includes('speed2') ? 2 : profile.ownedItems.upgrades.includes('speed') ? 1 : 0,
    enduranceUpg: profile.ownedItems.upgrades.includes('endurance2') ? 2 : profile.ownedItems.upgrades.includes('endurance') ? 1 : 0,
    currentPart:1,
    storyIndexByPart:{'1':getPartStartIndex(1),'2':getPartStartIndex(2),'3':getPartStartIndex(3),'4':getPartStartIndex(4),'5':getPartStartIndex(5),'6':getPartStartIndex(6),'7':getPartStartIndex(7),'8':getPartStartIndex(8),'9':getPartStartIndex(9),'10':getPartStartIndex(10),'11':getPartStartIndex(11)},
    chapterUnlocked:1,pendingFightType:null,pendingFightPart:null,pendingFightIndex:null
  };
}
function refreshPersistentUI(){
  if(UI?.cVal) UI.cVal.innerText = coins;
  if(window.renderProfileSummary) renderProfileSummary();
  chapterSelectController?.render();
  armoryController?.render();
}
function buildLegacyFieldsFromProfile(save){
  const profile = getPlayerProfile();
  syncLegacyProgressionGlobals(profile);
  return {
    ...save,
    profile,
    coins: profile.currencies.coins,
    weapon: profile.equipped.weapon,
    armor: profile.equipped.armor,
    rageMode2: profile.ownedItems.upgrades.includes('rage2'),
    strengthUpg: profile.ownedItems.upgrades.includes('strength2') ? 2 : profile.ownedItems.upgrades.includes('strength') ? 1 : 0,
    speedUpg: profile.ownedItems.upgrades.includes('speed2') ? 2 : profile.ownedItems.upgrades.includes('speed') ? 1 : 0,
    enduranceUpg: profile.ownedItems.upgrades.includes('endurance2') ? 2 : profile.ownedItems.upgrades.includes('endurance') ? 1 : 0,
    chapterUnlocked: Math.max(...profile.chapterProgress.unlocked.map((chapterId)=>CHAPTER_CONFIG[chapterId]?.unlockParts?.[0] || 1), 1)
  };
}
function saveGame(extra={}){
  try{
    const base=window.__saveData||defaultSave();
    const next=buildLegacyFieldsFromProfile({ ...base, currentPart, ...extra });
    if(!next.storyIndexByPart)next.storyIndexByPart=defaultSave().storyIndexByPart;
    window.__saveData=next;
    localStorage.setItem(SAVE_KEY,JSON.stringify(next));
    refreshPersistentUI();
  }catch(e){}
}
function loadGame(){
  try{const raw=localStorage.getItem(SAVE_KEY);window.__saveData=raw?JSON.parse(raw):defaultSave();}
  catch(e){window.__saveData=defaultSave();}
  window.__saveData.profile = normalizeProfile(window.__saveData.profile, window.__saveData);
  syncLegacyProgressionGlobals(window.__saveData.profile);
  currentPart=window.__saveData.currentPart||1;
  refreshPersistentUI();
}
function updateChapterUnlock(part){
  const unlocked=Math.max((window.__saveData?.chapterUnlocked||1),part);
  const chapterId = Object.values(CHAPTER_CONFIG).find((chapter)=>chapter.unlockParts.includes(part))?.id;
  if(chapterId) unlockChapterById(chapterId);
  saveGame({chapterUnlocked:unlocked});
}
function checkpointStory(part,idx){ const s=window.__saveData||defaultSave(); s.storyIndexByPart=s.storyIndexByPart||defaultSave().storyIndexByPart; s.storyIndexByPart[String(part)]=idx; saveGame({storyIndexByPart:s.storyIndexByPart,currentPart:part}); }
function setPendingFight(part,idx,fightType){saveGame({pendingFightPart:part,pendingFightIndex:idx,pendingFightType:fightType});}
function clearPendingFight(){saveGame({pendingFightPart:null,pendingFightIndex:null,pendingFightType:null});}
