function defaultSave(){
  return {
    coins:0, weapon:'none', armor:'none', rageMode2:false,
    strengthUpg:0, speedUpg:0, enduranceUpg:0,
    currentPart:1,
    storyIndexByPart:{'1':getPartStartIndex(1),'2':getPartStartIndex(2),'3':getPartStartIndex(3),'4':getPartStartIndex(4),'5':getPartStartIndex(5),'6':getPartStartIndex(6),'7':getPartStartIndex(7),'8':getPartStartIndex(8),'9':getPartStartIndex(9),'10':getPartStartIndex(10),'11':getPartStartIndex(11)},
    chapterUnlocked:1,pendingFightType:null,pendingFightPart:null,pendingFightIndex:null
  };
}
function refreshPersistentUI(){
  if(UI?.cVal) UI.cVal.innerText = coins;
  chapterSelectController?.render();
  armoryController?.render();
}
function saveGame(extra={}){
  try{
    const base=window.__saveData||defaultSave();
    const next={...base,coins,weapon,armor,rageMode2,strengthUpg,speedUpg,enduranceUpg,currentPart,...extra};
    if(!next.storyIndexByPart)next.storyIndexByPart=defaultSave().storyIndexByPart;
    window.__saveData=next;
    localStorage.setItem(SAVE_KEY,JSON.stringify(next));
    refreshPersistentUI();
  }catch(e){}
}
function loadGame(){
  try{const raw=localStorage.getItem(SAVE_KEY);window.__saveData=raw?JSON.parse(raw):defaultSave();}
  catch(e){window.__saveData=defaultSave();}
  const s=window.__saveData;
  coins=s.coins||0; weapon=s.weapon||'none'; armor=s.armor||'none'; rageMode2=!!s.rageMode2;
  strengthUpg=s.strengthUpg||0; speedUpg=s.speedUpg||0; enduranceUpg=s.enduranceUpg||0; currentPart=s.currentPart||1;
  refreshPersistentUI();
}
function updateChapterUnlock(part){ const unlocked=Math.max((window.__saveData?.chapterUnlocked||1),part); saveGame({chapterUnlocked:unlocked}); }
function checkpointStory(part,idx){ const s=window.__saveData||defaultSave(); s.storyIndexByPart=s.storyIndexByPart||defaultSave().storyIndexByPart; s.storyIndexByPart[String(part)]=idx; saveGame({storyIndexByPart:s.storyIndexByPart,currentPart:part}); }
function setPendingFight(part,idx,fightType){saveGame({pendingFightPart:part,pendingFightIndex:idx,pendingFightType:fightType});}
function clearPendingFight(){saveGame({pendingFightPart:null,pendingFightIndex:null,pendingFightType:null});}
