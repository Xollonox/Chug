function defaultSave(){
  return{coins:0,weapon:'none',armor:'none',rageMode2:false,
    strengthUpg:0,speedUpg:0,enduranceUpg:0,
    currentPart:1,
    storyIndexByPart:{'1':getPartStartIndex(1),'2':getPartStartIndex(2),'3':getPartStartIndex(3),'4':getPartStartIndex(4),'5':getPartStartIndex(5),'6':getPartStartIndex(6),'7':getPartStartIndex(7),'8':getPartStartIndex(8),'9':getPartStartIndex(9),'10':getPartStartIndex(10),'11':getPartStartIndex(11)},
    chapterUnlocked:1,pendingFightType:null,pendingFightPart:null,pendingFightIndex:null};
}
function saveGame(extra={}){
  try{
    const base=window.__saveData||defaultSave();
    const next={...base,coins,weapon,armor,rageMode2,strengthUpg,speedUpg,enduranceUpg,currentPart,...extra};
    if(!next.storyIndexByPart)next.storyIndexByPart={'1':getPartStartIndex(1),'2':getPartStartIndex(2),'3':getPartStartIndex(3),'4':getPartStartIndex(4),'5':getPartStartIndex(5),'6':getPartStartIndex(6),'7':getPartStartIndex(7),'8':getPartStartIndex(8),'9':getPartStartIndex(9),'10':getPartStartIndex(10),'11':getPartStartIndex(11)};
    window.__saveData=next;
    localStorage.setItem(SAVE_KEY,JSON.stringify(next));
  }catch(e){}
}
function loadGame(){
  try{const raw=localStorage.getItem(SAVE_KEY);window.__saveData=raw?JSON.parse(raw):defaultSave();}
  catch(e){window.__saveData=defaultSave();}
  const s=window.__saveData;
  coins=s.coins||0;weapon=s.weapon||'none';armor=s.armor||'none';rageMode2=!!s.rageMode2;
  strengthUpg=s.strengthUpg||0;speedUpg=s.speedUpg||0;enduranceUpg=s.enduranceUpg||0;
  currentPart=s.currentPart||1;
  UI.cVal.innerText=coins;
  const allItems=['knuckle','dagger','katana','staff','scythe','claws','hammer',
    'lightarmor','heavyarmor','voidarmor','rage2','strength','strength2','speed','speed2','endurance','endurance2'];
  allItems.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
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
function updateChapterUnlock(part){
  const unlocked=Math.max((window.__saveData?.chapterUnlocked||1),part);
  saveGame({chapterUnlocked:unlocked});
}
function checkpointStory(part,idx){
  const s=window.__saveData||defaultSave();
  s.storyIndexByPart=s.storyIndexByPart||{'1':getPartStartIndex(1),'2':getPartStartIndex(2),'3':getPartStartIndex(3),'4':getPartStartIndex(4),'5':getPartStartIndex(5),'6':getPartStartIndex(6),'7':getPartStartIndex(7),'8':getPartStartIndex(8),'9':getPartStartIndex(9),'10':getPartStartIndex(10),'11':getPartStartIndex(11)};
  s.storyIndexByPart[String(part)]=idx;
  saveGame({storyIndexByPart:s.storyIndexByPart,currentPart:part});
}
function setPendingFight(part,idx,fightType){saveGame({pendingFightPart:part,pendingFightIndex:idx,pendingFightType:fightType});}
function clearPendingFight(){saveGame({pendingFightPart:null,pendingFightIndex:null,pendingFightType:null});}

