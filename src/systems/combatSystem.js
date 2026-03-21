const COMBAT_STATE = {
  IDLE: 'idle',
  WALK: 'walk',
  JUMP_RISE: 'jumpRise',
  FALL: 'fall',
  ATTACK_STARTUP: 'attackStartup',
  ATTACK_ACTIVE: 'attackActive',
  ATTACK_RECOVERY: 'attackRecovery',
  HIT_STUN: 'hitStun',
  BLOCK_STUN: 'blockStun',
  KNOCKDOWN: 'knockdown',
  DEFEATED: 'defeated',
};

function createCombatSnapshot(fighter){
  return {
    moveId: fighter.currentMove?.id || '-',
    phase: fighter.attackPhase || 'none',
    state: fighter.combatState,
    combo: fighter.comboChain || 0,
  };
}

function resetCombatState(fighter){
  fighter.combatState = fighter.hp <= 0 ? COMBAT_STATE.DEFEATED : COMBAT_STATE.IDLE;
  fighter.attackPhase = 'none';
  fighter.currentMove = null;
  fighter.attackTimer = 0;
  fighter.hitTargets = new Set();
  fighter.queuedMoveId = null;
  fighter.comboChain = 0;
  fighter.comboTimer = 0;
  fighter.stunFrames = 0;
  fighter.blockFrames = 0;
  fighter.knockdownFrames = 0;
  fighter.aiDecisionCooldown = 0;
  fighter.blockIntent = false;
  fighter.lastAttackOutcome = 'none';
}

function setCombatState(fighter, nextState){
  fighter.combatState = nextState;
  if(nextState === COMBAT_STATE.HIT_STUN)fighter.state = 'hit';
  else if(nextState === COMBAT_STATE.BLOCK_STUN)fighter.state = 'block';
  else if(nextState === COMBAT_STATE.ATTACK_STARTUP || nextState === COMBAT_STATE.ATTACK_ACTIVE || nextState === COMBAT_STATE.ATTACK_RECOVERY)fighter.state = 'atk';
  else if(nextState === COMBAT_STATE.JUMP_RISE || nextState === COMBAT_STATE.FALL)fighter.state = 'jump';
  else if(nextState === COMBAT_STATE.WALK)fighter.state = 'run';
  else if(nextState === COMBAT_STATE.DEFEATED)fighter.state = 'hit';
  else fighter.state = 'idle';
}

function isCombatLocked(fighter){
  return [COMBAT_STATE.ATTACK_STARTUP, COMBAT_STATE.ATTACK_ACTIVE, COMBAT_STATE.ATTACK_RECOVERY, COMBAT_STATE.HIT_STUN, COMBAT_STATE.BLOCK_STUN, COMBAT_STATE.KNOCKDOWN, COMBAT_STATE.DEFEATED].includes(fighter.combatState);
}

function getFighterHurtbox(fighter){
  const crouchShrink = fighter.currentMove?.hitLevel === 'low' ? 0.88 : 1;
  return {
    x: fighter.x + fighter.w * 0.14,
    y: fighter.y - fighter.h * crouchShrink,
    w: fighter.w * 0.72,
    h: fighter.h * crouchShrink,
  };
}

function getActiveHitbox(fighter){
  const move = fighter.currentMove;
  if(!move || fighter.attackPhase !== 'active')return null;
  const airborne = fighter.y < GND - 20;
  const height = move.height * fighter.scale;
  const width = move.range * fighter.scale;
  const yOffset = (airborne ? move.yOffset - 10 : move.yOffset) * fighter.scale;
  return {
    x: fighter.dir === 1 ? fighter.x + fighter.w * 0.55 : fighter.x - width + fighter.w * 0.45,
    y: fighter.y - yOffset,
    w: width,
    h: height,
    move,
  };
}

function rectsOverlap(a, b){
  return a && b && a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function canBlockAttack(defender, attacker, move){
  if(move.unblockable)return false;
  if(defender.y < GND - 10)return false;
  if(defender.combatState === COMBAT_STATE.HIT_STUN || defender.combatState === COMBAT_STATE.KNOCKDOWN || defender.hp <= 0)return false;
  const attackerIsInFront = attacker.dir !== defender.dir;
  if(!attackerIsInFront)return false;
  if(move.hitLevel === 'low')return defender.blockIntent === 'low';
  if(move.hitLevel === 'high')return defender.blockIntent === 'high';
  return defender.blockIntent === 'high' || defender.blockIntent === 'low';
}

function applyHitStop(frames){
  hitStop = Math.max(hitStop, frames);
}

function applyDamage(attacker, defender, move, blocked){
  const baseDamage = move.damage + (attacker.raging ? (attacker.rageTier === 2 ? 6 : 3) : 0);
  const mitigated = blocked ? Math.max(1, baseDamage * 0.18) : Math.max(1, baseDamage - (defender.defense || 0));
  let finalDamage = defender.absorption ? mitigated * (1 - defender.absorption) : mitigated;
  if(defender.isP && enduranceUpg >= 2 && !blocked)finalDamage *= 0.88;
  defender.hp = Math.max(0, defender.hp - finalDamage);
  return finalDamage;
}

function applyBlockedHit(attacker, defender, move){
  const chipDamage = applyDamage(attacker, defender, move, true);
  defender.blockFrames = move.blockStunFrames;
  defender.vx = attacker.dir * Math.max(1.5, move.knockbackX * 0.18);
  defender.vy = 0;
  setCombatState(defender, COMBAT_STATE.BLOCK_STUN);
  defender.lastAttackOutcome = 'blocked';
  attacker.lastAttackOutcome = 'blocked';
  applyHitStop(Math.max(2, Math.floor(move.hitStop * 0.5)));
  beep(120,'square',0.08,0.03 * settingsSfxVol);
  floatingTexts.push({x:defender.x+defender.w/2,y:defender.y-defender.h,t:'BLOCK',life:0.8,vy:-1.2,col:'#88d0ff',size:16});
  return chipDamage;
}

function applySuccessfulHit(attacker, defender, move){
  const damage = applyDamage(attacker, defender, move, false);
  const heavy = move.type === 'heavy' || move.type === 'special' || move.onHitEffect === 'launcher' || move.onHitEffect === 'throw';
  defender.stunFrames = move.hitStunFrames;
  defender.knockdownFrames = heavy && defender.hp > 0 ? 10 : 0;
  defender.vx = attacker.dir * move.knockbackX * (BOSS_FIGHT_TYPES.includes(defender.type) ? 0.55 : 1);
  defender.vy = move.knockbackY;
  setCombatState(defender, heavy ? COMBAT_STATE.HIT_STUN : COMBAT_STATE.HIT_STUN);
  defender.lastAttackOutcome = 'hit';
  attacker.lastAttackOutcome = 'hit';
  attacker.comboChain = attacker.comboTimer > 0 ? attacker.comboChain + 1 : 1;
  attacker.comboTimer = move.hitStunFrames + move.recoveryFrames + 10;
  if(attacker.isP){
    comboCount = attacker.comboChain;
    lastComboTime = Date.now();
    showCombo(comboCount);
  }
  applyHitStop(move.hitStop);
  if(settingsShake)screenShake = Math.max(screenShake, heavy ? 12 : 5);
  if(heavy)doFlash();
  bloodSplatter(defender.x+defender.w/2,defender.y,attacker.dir,heavy);
  shadowSlash(defender.x+defender.w/2,defender.y-defender.h*0.5,attacker.dir,attacker.isP?'rgba(255,80,80,0.5)':'rgba(200,200,200,0.3)',heavy);
  if(attacker.isP)weaponImpactFX(defender.x+defender.w/2,defender.y,attacker.dir,weapon,heavy);
  if(move.onHitEffect === 'launcher'){
    defender.vy = Math.min(defender.vy, -7);
    defender.knockdownFrames = 14;
  }
  if(move.onHitEffect === 'throw'){
    defender.vx = attacker.dir * 16;
    defender.vy = -6;
    defender.knockdownFrames = 18;
  }
  const dmgSize = damage >= 24 ? 30 : damage >= 16 ? 24 : 20;
  floatingTexts.push({x:defender.x+defender.w/2+(Math.random()-.5)*20,y:defender.y-defender.h-10,t:Math.floor(damage),life:1,vy:-3,col:defender.isP?varRed():'#fff',size:dmgSize});
  if(attacker.isP && !attacker.rageActive){
    attacker.rage = Math.min(100, attacker.rage + (heavy ? 24 : 14));
  }
  return damage;
}

function resolveAttackHit(attacker, defender){
  const hitbox = getActiveHitbox(attacker);
  if(!hitbox || attacker.hitTargets.has(defender))return false;
  if(!hitbox.move.canHitGrounded && defender.y >= GND - 6)return false;
  if(!hitbox.move.canHitAirborne && defender.y < GND - 6)return false;
  const hurtbox = getFighterHurtbox(defender);
  if(!rectsOverlap(hitbox, hurtbox))return false;
  attacker.hitTargets.add(defender);
  if(canBlockAttack(defender, attacker, hitbox.move)){
    applyBlockedHit(attacker, defender, hitbox.move);
  } else {
    applySuccessfulHit(attacker, defender, hitbox.move);
  }
  updateHUD();
  if(defender.hp <= 0){
    defender.combatState = COMBAT_STATE.DEFEATED;
    checkRound();
  }
  return true;
}

function beginMove(fighter, moveId){
  const move = getMoveDefinition(fighter, moveId);
  if(!move)return false;
  if(fighter.stamina < move.staminaCost)return false;
  fighter.stamina = Math.max(0, fighter.stamina - move.staminaCost);
  fighter.currentMove = move;
  fighter.combo = (fighter.combo % 4) + 1;
  fighter.attackTimer = move.startupFrames + move.activeFrames + move.recoveryFrames;
  fighter.attackPhase = 'startup';
  fighter.hitTargets = new Set();
  fighter.queuedMoveId = null;
  fighter.atkType = moveId === 'kick' || moveId === 'airKick' || moveId === 'sweep' ? 'k' : moveId === 'launcher' ? 'slam' : moveId === 'throw' ? 'throw' : 'p';
  fighter.atkT = fighter.attackTimer;
  fighter.hitF = move.activeFrames + move.recoveryFrames;
  fighter.cWin = move.comboWindow;
  setCombatState(fighter, COMBAT_STATE.ATTACK_STARTUP);
  if(moveId === 'airKick')fighter.vy = Math.max(fighter.vy, 4);
  beep(fighter.isP ? (move.type === 'heavy' ? 220 : 340) : 150, move.type === 'heavy' ? 'sawtooth' : 'triangle', 0.12, 0.05);
  return true;
}

function queueMove(fighter, moveId){
  const move = getMoveDefinition(fighter, moveId);
  if(!move)return false;
  if(fighter.currentMove && fighter.currentMove.cancelRules?.includes(moveId) && fighter.attackPhase !== 'recovery'){
    fighter.queuedMoveId = moveId;
    return true;
  }
  if(fighter.combatState === COMBAT_STATE.ATTACK_RECOVERY){
    fighter.queuedMoveId = moveId;
    return true;
  }
  return beginMove(fighter, moveId);
}

function updateAttackState(fighter, opponent){
  if(!fighter.currentMove)return;
  fighter.attackTimer -= 1;
  fighter.atkT = fighter.attackTimer;
  const move = fighter.currentMove;
  const startupEnd = move.recoveryFrames + move.activeFrames;
  const activeEnd = move.recoveryFrames;
  if(fighter.attackTimer > startupEnd){
    fighter.attackPhase = 'startup';
    setCombatState(fighter, COMBAT_STATE.ATTACK_STARTUP);
  } else if(fighter.attackTimer > activeEnd){
    fighter.attackPhase = 'active';
    setCombatState(fighter, COMBAT_STATE.ATTACK_ACTIVE);
    resolveAttackHit(fighter, opponent);
  } else if(fighter.attackTimer > 0){
    fighter.attackPhase = 'recovery';
    setCombatState(fighter, COMBAT_STATE.ATTACK_RECOVERY);
    if(fighter.queuedMoveId && fighter.attackTimer <= Math.max(2, move.comboWindow)){
      const nextMove = fighter.queuedMoveId;
      fighter.currentMove = null;
      beginMove(fighter, nextMove);
      return;
    }
  } else {
    fighter.currentMove = null;
    fighter.attackPhase = 'none';
    fighter.atkT = 0;
    setCombatState(fighter, fighter.y < GND - 4 ? COMBAT_STATE.FALL : COMBAT_STATE.IDLE);
  }
}

function updateStunState(fighter){
  if(fighter.combatState === COMBAT_STATE.BLOCK_STUN){
    fighter.blockFrames -= 1;
    fighter.vx *= 0.76;
    if(fighter.blockFrames <= 0)setCombatState(fighter, COMBAT_STATE.IDLE);
    return true;
  }
  if(fighter.combatState === COMBAT_STATE.HIT_STUN){
    fighter.stunFrames -= 1;
    fighter.vx *= 0.82;
    if(fighter.y < GND - 4)fighter.rotation += 0.08 * fighter.dir;
    if(fighter.stunFrames <= 0){
      if(fighter.knockdownFrames > 0 && fighter.y >= GND - 1){
        fighter.knockdownFrames -= 1;
        setCombatState(fighter, COMBAT_STATE.KNOCKDOWN);
      } else {
        fighter.rotation = 0;
        setCombatState(fighter, fighter.y < GND - 4 ? COMBAT_STATE.FALL : COMBAT_STATE.IDLE);
      }
    }
    return true;
  }
  if(fighter.combatState === COMBAT_STATE.KNOCKDOWN){
    fighter.vx *= 0.76;
    fighter.knockdownFrames -= 1;
    if(fighter.knockdownFrames <= 0){
      fighter.rotation = 0;
      setCombatState(fighter, COMBAT_STATE.IDLE);
    }
    return true;
  }
  return false;
}

function readPlayerMoveIntent(fighter){
  const isAirborne = fighter.y < GND - 20;
  const awayHeld = fighter.dir === 1 ? isInputHeld('left') : isInputHeld('right');
  const forwardHeld = fighter.dir === 1 ? isInputHeld('right') : isInputHeld('left');
  fighter.blockIntent = !isAirborne && awayHeld ? (isInputHeld('grab') ? 'low' : 'high') : false;
  if(!awayHeld && consumeBufferedInput('throw'))return 'throw';
  if(!awayHeld && consumeBufferedInput('grab'))return 'launcher';
  if(isAirborne){
    if(consumeBufferedInput('kick'))return 'airKick';
    if(consumeBufferedInput('punch'))return 'airJab';
    return null;
  }
  if(consumeBufferedInput('kick'))return awayHeld ? 'sweep' : 'kick';
  if(consumeBufferedInput('punch'))return forwardHeld ? 'jab' : 'jab';
  return null;
}

function readEnemyMoveIntent(fighter, opponent){
  const profile = fighter.aiProfile;
  fighter.blockIntent = false;
  const distance = Math.abs((fighter.x + fighter.w / 2) - (opponent.x + opponent.w / 2));
  const facingBack = fighter.dir === 1 ? opponent.x < fighter.x : opponent.x > fighter.x;
  if(facingBack && opponent.currentMove && opponent.attackPhase === 'startup' && distance < profile.preferredRange + 10 && Math.random() < profile.defense){
    fighter.blockIntent = opponent.currentMove.hitLevel === 'low' ? 'low' : 'high';
  }
  if(fighter.aiDecisionCooldown > 0){
    fighter.aiDecisionCooldown -= 1;
    return null;
  }
  fighter.aiDecisionCooldown = profile.reactionDelay;
  if(distance > profile.preferredRange + 18)return null;
  if(Math.random() > profile.aggression)return null;
  if(distance < 58 && Math.random() < 0.18)return 'throw';
  if(distance < 86 && Math.random() < 0.2)return 'launcher';
  if(distance < 84 && Math.random() < 0.25)return 'sweep';
  return Math.random() < profile.comboBias ? 'jab' : 'kick';
}

function updateCombatDebugDraw(c, fighter){
  if(!debugMode || !fighter)return;
  const hurtbox = getFighterHurtbox(fighter);
  c.save();
  c.strokeStyle = fighter.isP ? 'rgba(0,229,255,0.75)' : 'rgba(255,0,60,0.75)';
  c.lineWidth = 1;
  c.strokeRect(hurtbox.x, hurtbox.y, hurtbox.w, hurtbox.h);
  const hitbox = getActiveHitbox(fighter);
  if(hitbox){
    c.strokeStyle = 'rgba(245,200,66,0.95)';
    c.strokeRect(hitbox.x, hitbox.y, hitbox.w, hitbox.h);
  }
  c.restore();
}
