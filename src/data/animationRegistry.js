const ANIMATION_REGISTRY = {
  idle: { id:'idle', category:'locomotion', frameCount:8, frameDuration:9, loop:true, interruptible:true, holdLastFrame:false, priority:1, mirrorSupport:true, eventMarkers:[{frame:0,name:'idlePulse'}] },
  walkForward: { id:'walkForward', category:'locomotion', frameCount:8, frameDuration:5, loop:true, interruptible:true, holdLastFrame:false, priority:2, mirrorSupport:true, eventMarkers:[{frame:2,name:'footstep'},{frame:6,name:'footstep'}] },
  walkBackward: { id:'walkBackward', category:'locomotion', frameCount:8, frameDuration:6, loop:true, interruptible:true, holdLastFrame:false, priority:2, mirrorSupport:true, eventMarkers:[{frame:2,name:'footstep'},{frame:6,name:'footstep'}] },
  jumpStart: { id:'jumpStart', category:'air', frameCount:4, frameDuration:4, loop:false, interruptible:false, holdLastFrame:true, priority:4, mirrorSupport:true, eventMarkers:[{frame:1,name:'jumpLift'}] },
  jumpRise: { id:'jumpRise', category:'air', frameCount:5, frameDuration:5, loop:true, interruptible:true, holdLastFrame:false, priority:4, mirrorSupport:true },
  airIdle: { id:'airIdle', category:'air', frameCount:4, frameDuration:6, loop:true, interruptible:true, holdLastFrame:false, priority:4, mirrorSupport:true },
  fall: { id:'fall', category:'air', frameCount:5, frameDuration:5, loop:true, interruptible:true, holdLastFrame:false, priority:4, mirrorSupport:true },
  land: { id:'land', category:'air', frameCount:4, frameDuration:4, loop:false, interruptible:false, holdLastFrame:false, priority:5, mirrorSupport:true, eventMarkers:[{frame:0,name:'landImpact'}] },
  blockHold: { id:'blockHold', category:'defense', frameCount:3, frameDuration:6, loop:true, interruptible:true, holdLastFrame:false, priority:5, mirrorSupport:true },
  blockImpact: { id:'blockImpact', category:'defense', frameCount:4, frameDuration:3, loop:false, interruptible:false, holdLastFrame:true, priority:7, mirrorSupport:true, eventMarkers:[{frame:1,name:'blockImpact'}] },
  hitLight: { id:'hitLight', category:'reaction', frameCount:4, frameDuration:4, loop:false, interruptible:false, holdLastFrame:true, priority:7, mirrorSupport:true, eventMarkers:[{frame:0,name:'hurtImpact'}] },
  hitHeavy: { id:'hitHeavy', category:'reaction', frameCount:5, frameDuration:5, loop:false, interruptible:false, holdLastFrame:true, priority:8, mirrorSupport:true, eventMarkers:[{frame:0,name:'hurtImpact'},{frame:2,name:'cameraShake'}] },
  knockdown: { id:'knockdown', category:'reaction', frameCount:6, frameDuration:5, loop:false, interruptible:false, holdLastFrame:true, priority:8, mirrorSupport:true, eventMarkers:[{frame:1,name:'hurtImpact'}] },
  defeated: { id:'defeated', category:'reaction', frameCount:6, frameDuration:7, loop:false, interruptible:false, holdLastFrame:true, priority:10, mirrorSupport:true },
  attackStartupLight: { id:'attackStartupLight', category:'attack', frameCount:4, frameDuration:3, loop:false, interruptible:false, holdLastFrame:true, priority:6, mirrorSupport:true, combatPhaseMarkers:{startup:[0,3]}, eventMarkers:[{frame:2,name:'weaponTrailStart'}] },
  attackActiveLight: { id:'attackActiveLight', category:'attack', frameCount:2, frameDuration:2, loop:false, interruptible:false, holdLastFrame:true, priority:6, mirrorSupport:true, combatPhaseMarkers:{active:[0,1]}, eventMarkers:[{frame:0,name:'attackHitStart'},{frame:1,name:'attackHitEnd'}] },
  attackRecoveryLight: { id:'attackRecoveryLight', category:'attack', frameCount:4, frameDuration:3, loop:false, interruptible:false, holdLastFrame:false, priority:5, mirrorSupport:true, combatPhaseMarkers:{recovery:[0,3]}, eventMarkers:[{frame:0,name:'weaponTrailEnd'},{frame:2,name:'comboWindowStart'},{frame:3,name:'comboWindowEnd'}] },
  attackStartupHeavy: { id:'attackStartupHeavy', category:'attack', frameCount:5, frameDuration:4, loop:false, interruptible:false, holdLastFrame:true, priority:6, mirrorSupport:true, combatPhaseMarkers:{startup:[0,4]}, eventMarkers:[{frame:3,name:'weaponTrailStart'}] },
  attackActiveHeavy: { id:'attackActiveHeavy', category:'attack', frameCount:3, frameDuration:2, loop:false, interruptible:false, holdLastFrame:true, priority:6, mirrorSupport:true, combatPhaseMarkers:{active:[0,2]}, eventMarkers:[{frame:0,name:'attackHitStart'},{frame:1,name:'cameraShake'},{frame:2,name:'attackHitEnd'}] },
  attackRecoveryHeavy: { id:'attackRecoveryHeavy', category:'attack', frameCount:5, frameDuration:4, loop:false, interruptible:false, holdLastFrame:false, priority:5, mirrorSupport:true, combatPhaseMarkers:{recovery:[0,4]}, eventMarkers:[{frame:0,name:'weaponTrailEnd'},{frame:3,name:'comboWindowStart'},{frame:4,name:'comboWindowEnd'}] },
};

const WEAPON_ANIMATION_OVERRIDES = {
  dagger: { attackStartupLight:{ playbackRate:1.08 }, attackRecoveryLight:{ playbackRate:0.9 } },
  katana: { attackActiveLight:{ playbackRate:0.96 }, attackStartupHeavy:{ playbackRate:1.04 } },
  staff: { attackStartupHeavy:{ playbackRate:0.92 }, attackRecoveryHeavy:{ playbackRate:0.88 } },
  scythe: { attackStartupHeavy:{ playbackRate:0.84 }, attackActiveHeavy:{ playbackRate:0.9 } },
  claws: { attackStartupLight:{ playbackRate:1.15 }, attackActiveLight:{ playbackRate:1.1 } },
  hammer: { attackStartupHeavy:{ playbackRate:0.8 }, attackRecoveryHeavy:{ playbackRate:1.08 } },
};

function getAnimationDefinition(fighter, key){
  const base = ANIMATION_REGISTRY[key];
  if(!base)return null;
  const weaponKey = fighter.isP ? weapon : null;
  const override = weaponKey ? WEAPON_ANIMATION_OVERRIDES[weaponKey]?.[key] : null;
  return { ...base, playbackRate: override?.playbackRate || 1, rootMotionX: 0, rootMotionY: 0, cancelInto: [], key };
}
