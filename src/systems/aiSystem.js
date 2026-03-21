function createAIBrain(fighter){
  const loadout=getEnemyLoadout(fighter.type);
  const archetype=getAIArchetype(loadout.archetypeId);
  const difficulty=getAIDifficulty(loadout.difficulty);
  const weaponProfile=getWeaponProfile(loadout.weaponId);
  return {
    loadout,
    archetype,
    difficulty,
    weaponProfile,
    intent:'hold',
    lastAction:'none',
    lastMoveId:null,
    decisionCooldown:difficulty.decisionRate,
    reactionTimer:difficulty.reactionDelay,
    commitment:0,
    confidence:difficulty.confidence,
    lastDebug:'boot',
    punishWindow:false,
    logs:[],
  };
}

function ensureAIBrain(fighter){
  if(!fighter.aiBrain && !fighter.isP)fighter.aiBrain=createAIBrain(fighter);
  return fighter.aiBrain;
}

function pushAILog(brain, text){
  brain.lastDebug=text;
  brain.logs.push(text);
  if(brain.logs.length>6)brain.logs.shift();
}

function perceiveCombat(self, target){
  const brain=ensureAIBrain(self);
  const weaponProfile=brain.weaponProfile;
  const actualRange=Math.abs((target.x+target.w/2)-(self.x+self.w/2));
  const targetAttack=target.currentMove;
  const selfCornered=self.x<70||self.x>W-self.w-70;
  const targetRecovering=target.combatState===COMBAT_STATE.ATTACK_RECOVERY;
  const targetThreatening=targetAttack&&target.attackPhase==='active';
  const targetUnsafe=targetRecovering||target.combatState===COMBAT_STATE.BLOCK_STUN;
  const punishLikely=targetUnsafe&&actualRange<weaponProfile.preferredRange+20;
  const selfLow=self.hp/self.maxHp<0.28;
  const targetLow=target.hp/target.maxHp<0.25;
  const moveOptions=['jab','kick','sweep','launcher','throw'].filter(moveId=>{
    const move=getMoveDefinition(self,moveId);
    if(!move)return false;
    if(actualRange>move.range*self.scale+18)return false;
    if(self.y<GND-4&&!move.airborneAllowed)return false;
    return self.stamina>=move.staminaCost;
  });
  return {
    actualRange,
    preferredRange:weaponProfile.preferredRange,
    targetThreatening,
    targetUnsafe,
    punishLikely,
    targetRecovering,
    selfCornered,
    selfLow,
    targetLow,
    inRange:actualRange<=weaponProfile.preferredRange+12,
    tooClose:actualRange<Math.max(54,weaponProfile.preferredRange-26),
    tooFar:actualRange>weaponProfile.preferredRange+24,
    moveOptions,
    targetAirborne:target.y<GND-10,
    targetBlocking:!!target.blockIntent,
    targetState:target.combatState,
  };
}

function scoreIntent(self, perception){
  const brain=ensureAIBrain(self);
  const a=brain.archetype;
  const d=brain.difficulty;
  const weapon=brain.weaponProfile;
  const noise=(Math.random()-0.5)*a.unpredictability;
  const scores={
    approach:(perception.tooFar?0.7:0.1)+a.aggression*0.4+d.spacingQuality*0.2-noise,
    hold:0.18+a.baitChance*0.6+(perception.inRange?0.12:0),
    attack:(perception.inRange?0.45:0)+a.aggression*0.5+(perception.targetBlocking?-0.08:0)+noise,
    block:(perception.targetThreatening?0.55:0)+a.blockChance*0.5+d.defenseQuality*0.4,
    retreat:(perception.tooClose?0.42:0)+a.retreatChance*0.5+(perception.selfCornered?-0.18:0)+(perception.selfLow?0.16:0),
    punish:(perception.punishLikely?0.62:0)+a.punishChance*0.5+d.punishAccuracy*0.35,
    bait:(perception.inRange?0.2:0)+a.baitChance*0.7+(perception.targetThreatening?0.12:0),
  };
  if(perception.selfLow&&a.braveryAtLowHealth<0.6)scores.retreat+=0.18;
  if(perception.targetLow&&a.braveryAtLowHealth>0.65)scores.attack+=0.16;
  if(weapon.pressureBias==='keepout')scores.retreat+=0.08;
  if(weapon.pressureBias==='rush')scores.approach+=0.12;
  if(weapon.pressureBias==='whiffPunish')scores.punish+=0.1;
  return scores;
}

function chooseIntent(scores, brain){
  const entries=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const top=entries[0];
  const second=entries[1];
  const errorRoll=Math.random();
  const errorRate=Math.max(0.02, brain.archetype.errorRate + brain.difficulty.errorRateBonus);
  const chosen=(errorRoll<errorRate && second)?second:top;
  return chosen[0];
}

function chooseMoveForIntent(self, perception, intent){
  const brain=ensureAIBrain(self);
  const options=perception.moveOptions.map(moveId=>({ moveId, move:getMoveDefinition(self,moveId) })).filter(Boolean);
  if(!options.length)return null;
  const scored=options.map(({moveId,move})=>{
    let score=0;
    const rangeDelta=Math.abs(perception.actualRange-(move.range*self.scale*0.8));
    score += Math.max(0, 120-rangeDelta)/120;
    if(intent==='punish')score += moveId===brain.weaponProfile.punishMove ? 0.45 : 0.18;
    if(intent==='attack')score += move.type==='light' ? 0.18 : brain.archetype.heavyPreference;
    if(intent==='retreat')score -= 0.2;
    if(moveId==='throw' && perception.actualRange<60 && !perception.targetThreatening)score += 0.35;
    if(moveId==='sweep' && perception.targetBlocking)score += 0.28;
    if(moveId==='launcher' && perception.targetRecovering)score += 0.32;
    if(brain.weaponProfile.comboMoves.includes(moveId))score += brain.archetype.comboChance*0.25;
    return { moveId, score };
  }).sort((a,b)=>b.score-a.score);
  return scored[0]?.moveId || null;
}

function updateEnemyBrain(self, target){
  const brain=ensureAIBrain(self);
  if(!brain || self.hp<=0)return { moveId:null, blockIntent:false, desiredVx:0, intent:'disabled' };
  const perception=perceiveCombat(self,target);
  brain.punishWindow=perception.punishLikely;
  if(brain.commitment>0){
    brain.commitment--;
  }
  if(self.currentMove || isCombatLocked(self)){
    return { moveId:null, blockIntent:perception.targetThreatening && Math.random()<brain.archetype.blockChance ? 'high' : false, desiredVx:self.vx, intent:brain.intent };
  }
  if(brain.decisionCooldown>0){
    brain.decisionCooldown--;
  } else {
    const scores=scoreIntent(self, perception);
    brain.intent=chooseIntent(scores, brain);
    brain.decisionCooldown=brain.difficulty.decisionRate;
    brain.commitment=Math.max(4, Math.floor(brain.difficulty.decisionRate*0.5));
    pushAILog(brain, `${brain.intent} @ ${Math.round(perception.actualRange)}`);
  }

  let desiredVx=0;
  let moveId=null;
  let blockIntent=false;
  switch(brain.intent){
    case 'approach':
      desiredVx=Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd;
      break;
    case 'retreat':
      desiredVx=-Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd*0.7;
      blockIntent=perception.targetThreatening?'high':false;
      break;
    case 'block':
      blockIntent=perception.targetAttackActive?'high':'high';
      break;
    case 'punish':
    case 'attack':
      moveId=chooseMoveForIntent(self, perception, brain.intent);
      if(!moveId && perception.tooFar)desiredVx=Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd;
      break;
    case 'bait':
      desiredVx=perception.tooClose?-Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd*0.35:0;
      blockIntent=perception.targetThreatening && Math.random()<brain.archetype.blockChance ? 'high' : false;
      break;
    default:
      desiredVx=0;
  }

  if(perception.tooFar && (brain.intent==='attack'||brain.intent==='punish')){
    moveId=null;
    desiredVx=Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd;
  }
  if(perception.tooClose && brain.weaponProfile.weaponClass==='staff')desiredVx=-Math.sign((target.x+target.w/2)-(self.x+self.w/2))*self.spd*0.55;
  if(perception.tooClose && brain.weaponProfile.weaponClass==='heavy' && Math.random()<0.35)moveId='launcher';
  if(moveId)brain.lastAction=moveId;
  return { moveId, blockIntent, desiredVx, intent:brain.intent, perception };
}

function getAIDebugSnapshot(fighter){
  const brain=ensureAIBrain(fighter);
  if(!brain)return null;
  return {
    archetype:brain.archetype.id,
    difficulty:brain.difficulty.id,
    weapon:brain.weaponProfile.id,
    intent:brain.intent,
    lastAction:brain.lastAction,
    preferredRange:brain.weaponProfile.preferredRange,
    reaction:brain.difficulty.reactionDelay,
    punishWindow:brain.punishWindow,
    note:brain.lastDebug,
  };
}
