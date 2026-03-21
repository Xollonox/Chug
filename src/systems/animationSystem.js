function createAnimationController(){
  return {
    currentKey: 'idle',
    previousKey: null,
    requestedBy: 'boot',
    elapsedFrames: 0,
    frameIndex: 0,
    progress: 0,
    activeEvents: [],
    lastEvent: null,
    transitionLog: [],
    lastSnapshot: null,
    interruptible: true,
  };
}

function ensureAnimationController(fighter){
  if(!fighter.animation)fighter.animation=createAnimationController();
  return fighter.animation;
}

function getAttackAnimationKeys(fighter){
  const heavy = fighter.currentMove && (fighter.currentMove.type === 'heavy' || fighter.currentMove.type === 'special' || fighter.currentMove.type === 'commandGrab' || fighter.currentMove.type === 'airHeavy');
  return heavy ? {
    startup: 'attackStartupHeavy',
    active: 'attackActiveHeavy',
    recovery: 'attackRecoveryHeavy',
  } : {
    startup: 'attackStartupLight',
    active: 'attackActiveLight',
    recovery: 'attackRecoveryLight',
  };
}

function requestAnimationState(fighter){
  if(fighter.combatState===COMBAT_STATE.DEFEATED)return { key:'defeated', requestedBy:'combat' };
  if(fighter.combatState===COMBAT_STATE.KNOCKDOWN)return { key:'knockdown', requestedBy:'combat' };
  if(fighter.combatState===COMBAT_STATE.BLOCK_STUN)return { key:'blockImpact', requestedBy:'combat' };
  if(fighter.blockIntent && fighter.combatState!==COMBAT_STATE.ATTACK_STARTUP && fighter.combatState!==COMBAT_STATE.ATTACK_ACTIVE && fighter.combatState!==COMBAT_STATE.ATTACK_RECOVERY && fighter.y>=GND-2)return { key:'blockHold', requestedBy:'defense' };
  if(fighter.combatState===COMBAT_STATE.HIT_STUN)return { key:(fighter.reactionType==='heavy'||fighter.knockdownFrames>0)?'hitHeavy':'hitLight', requestedBy:'combat' };
  if(fighter.currentMove){
    const keys=getAttackAnimationKeys(fighter);
    if(fighter.attackPhase==='startup')return { key:keys.startup, requestedBy:'combat' };
    if(fighter.attackPhase==='active')return { key:keys.active, requestedBy:'combat' };
    return { key:keys.recovery, requestedBy:'combat' };
  }
  if(fighter.landAnim>0)return { key:'land', requestedBy:'movement' };
  if(fighter.isAirborne){
    if(fighter.vy<-1)return { key:'jumpRise', requestedBy:'movement' };
    if(Math.abs(fighter.vy)<=1)return { key:'airIdle', requestedBy:'movement' };
    return { key:'fall', requestedBy:'movement' };
  }
  if(Math.abs(fighter.vx)>0.25){
    const movingForward = (fighter.vx>0 && fighter.dir===1) || (fighter.vx<0 && fighter.dir===-1);
    return { key:movingForward?'walkForward':'walkBackward', requestedBy:'movement' };
  }
  return { key:'idle', requestedBy:'movement' };
}

function setAnimationClip(fighter, nextKey, requestedBy){
  const controller=ensureAnimationController(fighter);
  if(controller.currentKey===nextKey)return false;
  controller.previousKey=controller.currentKey;
  controller.currentKey=nextKey;
  controller.requestedBy=requestedBy;
  controller.elapsedFrames=0;
  controller.frameIndex=0;
  controller.progress=0;
  controller.activeEvents=[];
  controller.lastEvent=null;
  controller.transitionLog.push(`${controller.previousKey||'none'} -> ${nextKey}`);
  if(controller.transitionLog.length>8)controller.transitionLog.shift();
  return true;
}

function triggerAnimationEvent(fighter, eventName){
  const controller=ensureAnimationController(fighter);
  controller.lastEvent=eventName;
  controller.activeEvents.push(eventName);
  if(controller.activeEvents.length>6)controller.activeEvents.shift();
  if(eventName==='footstep' && gameState==='fight'){beep(120,'sine',0.03,0.012);}
  if(eventName==='landImpact' && gameState==='fight' && settingsShake){screenShake=Math.max(screenShake,4);}
}

function advanceAnimation(fighter){
  const controller=ensureAnimationController(fighter);
  const request=requestAnimationState(fighter);
  const clip=getAnimationDefinition(fighter, request.key);
  if(!clip)return controller;
  const changed=setAnimationClip(fighter, request.key, request.requestedBy);
  const effectiveDuration=Math.max(1, clip.frameDuration / (clip.playbackRate||1));
  controller.elapsedFrames += changed ? 0 : 1;
  const totalFrames=Math.max(1, clip.frameCount);
  const rawFrame=Math.floor(controller.elapsedFrames / effectiveDuration);
  if(clip.loop){
    controller.frameIndex=rawFrame%totalFrames;
  } else {
    controller.frameIndex=Math.min(totalFrames-1, rawFrame);
  }
  controller.progress=totalFrames<=1?1:controller.frameIndex/(totalFrames-1);
  controller.interruptible=clip.interruptible;
  if(clip.eventMarkers){
    clip.eventMarkers.forEach(marker=>{
      const eventKey=`${clip.key}:${marker.frame}`;
      if(controller.frameIndex===marker.frame && controller.lastSnapshot!==eventKey){
        controller.lastSnapshot=eventKey;
        triggerAnimationEvent(fighter, marker.name);
      }
    });
  }
  return controller;
}

function getAnimationSnapshot(fighter){
  const controller=ensureAnimationController(fighter);
  const key=controller.currentKey;
  const tags={
    attack:key.startsWith('attack'),
    walk:key==='walkForward'||key==='walkBackward',
    jump:key==='jumpStart'||key==='jumpRise'||key==='airIdle'||key==='fall',
    hit:key==='hitLight'||key==='hitHeavy'||key==='knockdown'||key==='defeated',
    block:key==='blockHold'||key==='blockImpact',
  };
  return {
    key,
    frameIndex:controller.frameIndex,
    progress:controller.progress,
    requestedBy:controller.requestedBy,
    interruptible:controller.interruptible,
    lastEvent:controller.lastEvent,
    tags,
  };
}

function getAttackAnimationWindow(fighter){
  const snap=getAnimationSnapshot(fighter);
  if(!snap.tags.attack)return { startup:false, active:false, recovery:false, progress:0, strike:0 };
  return {
    startup: fighter.attackPhase==='startup',
    active: fighter.attackPhase==='active',
    recovery: fighter.attackPhase==='recovery',
    progress: snap.progress,
    strike: fighter.attackPhase==='active' ? 1 : 0,
  };
}
