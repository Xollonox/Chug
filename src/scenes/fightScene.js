// ── FIGHT LOGIC ──
function roundsToWinForFight(type){return BEST_OF_THREE_FIGHT_TYPES.includes(type)?3:2;}
function totalDotsForFight(type){return roundsToWinForFight(type);}

function updateHUD(){
  if(!player||!enemy)return;
  UI.php.style.width=Math.max(0,(player.hp/player.maxHp)*100)+'%';
  UI.ehp.style.width=Math.max(0,(enemy.hp/enemy.maxHp)*100)+'%';
  UI.prage.style.width=player.rage+'%';
  UI.pstam.style.width=(player.stamina/player.maxStam)*100+'%';
  UI.pstam.style.background=player.stamina<30?'linear-gradient(90deg,#400,#800)':'linear-gradient(90deg,#006080,#00e5ff)';
  const ready=player.rage>=100&&!player.rageActive;
  UI.btnRage.className=player.rageActive?'active':(ready?'ready':'');
  UI.rlbl.innerText=rageMode2?'▶ RAGE II READY':'▶ RAGE READY';
  UI.rlbl.style.display=ready?'block':'none';
  UI.timer.innerText=timeLeft;UI.timer.style.color=timeLeft<=10?varRed():'#fff';
  UI.roundLbl.innerText=`ROUND ${curRound}`;
}

function initFight(type){fType=type;pWins=0;eWins=0;clearPendingFight();resetDots();startRound(1);}

function startRound(n){
  curRound=n;gameState='pre';GND=window.innerHeight-GROUND_OFFSET;
  particles=[];floatingTexts=[];landDust=[];  comboCount=0;lastComboTime=0;
  const pi=document.getElementById('part-indicator');if(pi)pi.style.display='none';
  const cd=document.getElementById('combo-display');if(cd)cd.style.display='none';
  showScreen('hud-screen');
  UI.ctrls.style.display='flex';UI.kbhint.style.display='block';
  player=new Fighter(Math.min(150,W*0.15),true);player.rage=fType>1?50:0;resetCombatState(player);
  setEnvRage(false);
  enemy=new Fighter(Math.max(W-260,W*0.75),false,fType);resetCombatState(enemy);
  resetDots();
  UI.ename.innerText=ENEMY_NAMES[fType]||'SHADOW';
  const isBossFight=BOSS_FIGHT_TYPES.includes(fType);
  startMusicTheme(isBossFight?'boss':'fight');
  if(isBossFight) switchToBossBg(); else switchToNormalBg();
  timeLeft=DEFAULT_ROUND_TIME;lastTick=Date.now();updateHUD();
  showBanner(`ROUND ${n}`,()=>showBanner('FIGHT!',()=>{gameState='fight';},800),1100);
}
function resetDots(){
  ['pr1','pr2','pr3','er1','er2','er3'].forEach(id=>{
    const el=document.getElementById(id);el.className='dot';el.style.opacity='0.25';
  });
  const total=totalDotsForFight(fType);
  for(let i=1;i<=total;i++){
    document.getElementById(`pr${i}`).style.opacity='1';
    document.getElementById(`er${i}`).style.opacity='1';
  }
}
function checkRound(){
  if(gameState!=='fight')return;
  gameState='post';
  const need=roundsToWinForFight(fType);
  const pWon=player.hp>0;
  if(pWon){
    pWins++;
    document.getElementById(`pr${pWins}`).classList.add('won');
    let rew=20;if(fType>3)rew=40;if(BOSS_FIGHT_TYPES.includes(fType))rew=150;updateCoins(rew);
    // Endurance regen on win
    if(player.enduranceRegen&&player.hp>0)player.hp=Math.min(player.maxHp,player.hp+20);
    saveGame();
  } else {
    eWins++;document.getElementById(`er${eWins}`).classList.add('won');
  }
  showBanner(pWon?'YOU WIN':'YOU LOSE',()=>{
    if(pWins===need)endMatch(true);
    else if(eWins===need)endMatch(false);
    else startRound(curRound+1);
  },2000);
}
function endMatch(win){
  setEnvRage(false);UI.ctrls.style.display='none';UI.kbhint.style.display='none';
  startMusicTheme('story');
  switchToNormalBg();
  if(win){
    clearPendingFight();checkpointStory(currentPart,scIdx+1);
    updateChapterUnlock(currentPart+1);scIdx++;
    applyPartBg(currentPart);
    showScreen('story-screen');gameState='story';advance(true);
  } else {
    setPendingFight(currentPart,scIdx,fType);
    showBanner('DEFEATED',()=>{showScreen('story-screen');gameState='story';advance(true);},2000);
  }
}

// ── RENDER LOOP ──

function drawDebugOverlay(){
  if(!debugMode||!player||!enemy)return;
  ctx.save();
  ctx.fillStyle='rgba(0,0,0,0.65)';
  ctx.fillRect(12,H-110,250,92);
  ctx.fillStyle='#00e5ff';
  ctx.font='12px monospace';
  const rows=[
    `state: ${gameState}`,
    `player hp ${Math.round(player.hp)}/${player.maxHp} stam ${Math.round(player.stamina)}`,
    `enemy hp ${Math.round(enemy.hp)}/${enemy.maxHp} ai ${enemy.ai||0}`,
    `round ${curRound} timer ${timeLeft} combo ${comboCount}`
  ];
  rows.forEach((row,index)=>ctx.fillText(row,24,H-88+(index*18)));
  const playerSnap=createCombatSnapshot(player);
  ctx.fillText(`move ${playerSnap.moveId} / ${playerSnap.phase}`,24,H-16);
  ctx.restore();
}

function loop(){
  requestAnimationFrame(loop);
  updateInputBuffers();
  if(gameState==='menu'){
    if(Math.random()>0.7)particles.push({x:Math.random()*W,y:H-110-Math.random()*220,
      vx:(Math.random()-.5)*0.3,vy:-Math.random()*0.5-0.15,life:1,
      col:'rgba(200,147,26,0.1)',w:Math.random()*2.5+0.5,tp:'m'});
  }
  if(hitStop>0){hitStop--;return;}
  ctx.clearRect(0,0,cvs.width,cvs.height);
  ctx.save();
  if(screenShake>0){
    if(settingsShake)ctx.translate((Math.random()-.5)*screenShake,(Math.random()-.5)*screenShake);
    screenShake*=0.78;if(screenShake<0.8)screenShake=0;
  }

  if(gameState==='fight'||gameState==='post'||gameState==='menu'||gameState==='story'||gameState==='shop'){
    if(gameState==='fight'){
      const now=Date.now();
      if(now-lastTick>=1000){
        timeLeft--;lastTick=now;updateHUD();
        if(timeLeft<=0){
          const pp=player.hp/player.maxHp,ep=enemy.hp/enemy.maxHp;
          if(pp<ep)player.hp=0;else enemy.hp=0;checkRound();
        }
      }
      if(player&&enemy){player.update(enemy);enemy.update(player);}
    } else if(gameState==='menu'||gameState==='story'||gameState==='shop'){
      if(!player)player=new Fighter(W*0.15,true);
      player.update({x:-1000,w:0,h:0,y:GND,state:'idle',hitT:0});
    }

    ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.shadowColor='transparent';
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];p.x+=p.vx;p.y+=p.vy;
      if(p.tp!=='m')p.vy+=0.55;
      if(p.tp==='b'){
        p.life-=0.018;
        if(p.y>=GND){p.y=GND;p.vy=0;p.vx*=0.45;}
      } else {
        p.life-=p.tp==='f'?0.052:p.tp==='s'?0.08:0.038;
      }
      if(p.life<=0){particles.splice(i,1);continue;}
      ctx.globalAlpha=Math.max(0,Math.min(1,p.life));
      ctx.fillStyle=p.col;
      if(p.tp==='s'){
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.vy,p.vx));
        ctx.fillRect(-p.w/2,-2,p.w,4);ctx.restore();
      } else if(p.tp==='ring'){
        // removed - no circles
      } else if(p.tp==='b'){
        ctx.fillRect(p.x,p.y,p.w,p.w*(p.vy>2?2:1));
      } else if(p.tp==='f'||p.tp==='m'){
        const sz=p.w*p.life*0.5;
        ctx.fillRect(p.x-sz/2,p.y-sz/2,sz,sz);
      } else {
        ctx.fillRect(p.x,p.y,p.w,p.w);
      }
    }
    for(let i=landDust.length-1;i>=0;i--){
      const d=landDust[i];d.x+=d.vx;d.y+=d.vy;d.life-=0.048;d.vx*=0.94;
      if(d.life<=0){landDust.splice(i,1);continue;}
      ctx.globalAlpha=d.life*0.5;ctx.fillStyle=d.col;
      ctx.beginPath();ctx.ellipse(d.x,d.y,d.w,d.w*0.35,0,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.shadowColor='transparent';
    if(enemy&&(gameState==='fight'||gameState==='post'))enemy.draw(ctx);
    if(player)player.draw(ctx);
    if(debugMode){updateCombatDebugDraw(ctx, player);updateCombatDebugDraw(ctx, enemy);}

    ctx.globalAlpha=1;ctx.shadowBlur=0;
    ctx.textAlign='center';
    for(let i=floatingTexts.length-1;i>=0;i--){
      const ft=floatingTexts[i];ft.y+=ft.vy;ft.life-=0.028;
      if(ft.life<=0){floatingTexts.splice(i,1);continue;}
      const fs=ft.size||22;
      ctx.font=`bold ${fs}px Cinzel, serif`;
      // Color-code damage by amount
      let col=ft.col||'#fff';
      const dmgVal=parseInt(ft.t)||0;
      if(ft.col&&ft.col.includes('ff003c')||ft.col&&ft.col===varRed()){
        // Player taking damage — scale red intensity
        if(dmgVal>=30)col='#ff0000';
        else if(dmgVal>=20)col='#ff2244';
        else if(dmgVal>=10)col='#ff4466';
        else col='#ff8888';
      } else if(ft.col==='#fff'||ft.col==='#ffffff'){
        // Enemy taking damage — gold/white scale
        if(dmgVal>=40)col='#ff8800';
        else if(dmgVal>=25)col='#f5c842';
        else if(dmgVal>=15)col='#e0e060';
        else col='#ffffff';
      }
      ctx.fillStyle=col;
      ctx.globalAlpha=Math.max(0,ft.life);
      // Glow on big hits
      if(dmgVal>=20){ctx.shadowColor=col;ctx.shadowBlur=12;}
      else{ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=6;}
      ctx.fillText(ft.t,ft.x,ft.y);
      ctx.shadowBlur=0;
    }
  }
  drawDebugOverlay();
  ctx.restore();
}

