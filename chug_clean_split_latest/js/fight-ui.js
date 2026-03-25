(function(){
  function mountV52(){
    if(window.__v52Mounted) return; window.__v52Mounted = true;
    const d = document;
    const hud = d.getElementById('hud-screen');
    const controls = d.getElementById('controls');
    if(!hud || !controls) return;

    // Portraits / HUD restructuring
    try {
      const infos = hud.querySelectorAll('.fighter-info');
      infos.forEach((info, idx) => {
        if(info.querySelector('.sf2-portrait')) return;
        const portrait = d.createElement('div');
        portrait.className = 'sf2-portrait ' + (idx === 1 ? 'enemy' : 'player');
        const meta = d.createElement('div');
        meta.className = 'fighter-meta';
        [...info.children].forEach(ch => meta.appendChild(ch));
        info.appendChild(portrait);
        info.appendChild(meta);
        info.classList.add(idx === 1 ? 'enemy-side' : 'player-side');
      });
    } catch(e){}

    // Button icons / editable labels
    const btnP = d.getElementById('btn-p');
    const btnK = d.getElementById('btn-k');
    const btnR = d.getElementById('btn-rage');
    if(btnP){ btnP.setAttribute('data-ctrl-editable','true'); btnP.setAttribute('data-ctrl-label','PUNCH'); btnP.textContent=''; }
    if(btnK){ btnK.setAttribute('data-ctrl-editable','true'); btnK.setAttribute('data-ctrl-label','KICK'); btnK.textContent=''; }
    if(btnR){ btnR.setAttribute('data-ctrl-editable','true'); btnR.setAttribute('data-ctrl-label','RAGE'); btnR.textContent=''; }

    // Pause button
    if(!d.getElementById('fight-pause-btn')){
      const pbtn = d.createElement('button');
      pbtn.id = 'fight-pause-btn';
      pbtn.innerHTML = '<span class="pause-bars"><span></span><span></span></span>';
      pbtn.addEventListener('click', function(ev){ ev.preventDefault(); window.toggleFightPause && window.toggleFightPause(); });
      hud.appendChild(pbtn);
    }
    if(!d.getElementById('fight-pause-overlay')){
      const ov = d.createElement('div');
      ov.id = 'fight-pause-overlay';
      ov.innerHTML = '<div id="fight-pause-panel">'
        + '<button class="fight-pause-icon" id="v52-resume" aria-label="Resume">▶</button>'
        + '<button class="fight-pause-icon" id="v52-audio" aria-label="Audio">🔊</button>'
        + '<button class="fight-pause-icon" id="v52-settings" aria-label="Settings">⚙</button>'
        + '<button class="fight-pause-icon" id="v52-quit" aria-label="Quit">✕</button>'
        + '</div>';
      d.body.appendChild(ov);
      d.getElementById('v52-resume').addEventListener('click', () => window.toggleFightPause && window.toggleFightPause(false));
      d.getElementById('v52-audio').addEventListener('click', () => { if(typeof window.toggleMusic === 'function') window.toggleMusic(); });
      d.getElementById('v52-settings').addEventListener('click', () => {
        if(window.__fightPausePreviousState) window.gameState = window.__fightPausePreviousState;
        ov.classList.remove('active');
        document.body.classList.remove('fight-paused');
        if(typeof window.openSettings === 'function') window.openSettings();
      });
      d.getElementById('v52-quit').addEventListener('click', () => {
        ov.classList.remove('active');
        document.body.classList.remove('fight-paused');
        try{ if(typeof window.clearPendingFight === 'function') window.clearPendingFight(); }catch(e){}
        try{ gameState = 'menu'; }catch(_e){ window.gameState = 'menu'; }
        if(typeof window.showScreen === 'function') window.showScreen('menu-screen');
        document.body.classList.remove('fight-clean-ui');
      });
    }

    // Fight pause API
    window.toggleFightPause = function(forceResume){
      const overlay = d.getElementById('fight-pause-overlay');
      if(!overlay) return;
      const shouldResume = forceResume === false || overlay.classList.contains('active');
      if(shouldResume){
        overlay.classList.remove('active');
        document.body.classList.remove('fight-paused');
        if(window.__fightPausePreviousState){
          window.gameState = window.__fightPausePreviousState;
          try{ if(typeof gameState !== 'undefined' && gameState === 'fight') lastTick = Date.now(); else if(window.gameState === 'fight') window.lastTick = Date.now(); }catch(_e){}
        }
        return;
      }
      if(window.gameState !== 'fight' && window.gameState !== 'pre') return;
      window.__fightPausePreviousState = window.gameState;
      try{ gameState = 'post'; }catch(_e){ window.gameState = 'post'; }
      overlay.classList.add('active');
      document.body.classList.add('fight-paused');
    };
    window.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ if(document.body.classList.contains('fight-clean-ui')) window.toggleFightPause(); } });

    // Fight-mode visibility toggles
    function syncFightUi(){
      const gs = String(window.gameState || '');
      const on = gs === 'fight' || gs === 'pre' || gs === 'post';
      document.body.classList.toggle('fight-clean-ui', on);
    }
    setInterval(syncFightUi, 120);
    syncFightUi();

    // Combo remap: forward + punch => grab; forward + punch + punch => throw
    let prevPunch = 0;
    let punchHeld = false;
    function pulseKey(key, ms){
      if(!window.K) return;
      window.K[key] = 1;
      setTimeout(() => { if(window.K) window.K[key] = 0; }, ms || 90);
    }
    function isForwardHeld(){
      try {
        if(!window.K) return false;
        const dir = window.player && typeof window.player.dir === 'number' ? window.player.dir : 1;
        return dir === 1 ? !!window.K.r : !!window.K.l;
      } catch(e){ return !!(window.K && window.K.r); }
    }
    function comboTick(){
      if(!window.K || (window.gameState !== 'fight' && window.gameState !== 'pre')) { punchHeld = false; return; }
      const punchNow = !!window.K.a;
      if(punchNow && !punchHeld){
        const forward = isForwardHeld();
        const airborne = !!(window.player && window.player.y < window.GND - 16);
        if(forward && !airborne){
          const now = Date.now();
          window.K.a = 0;
          if(now - prevPunch <= 320){
            pulseKey('t', 110);
            prevPunch = 0;
          } else {
            pulseKey('g', 110);
            prevPunch = now;
          }
        }
      }
      punchHeld = punchNow;
      if(prevPunch && Date.now() - prevPunch > 360) prevPunch = 0;
    }
    setInterval(comboTick, 16);

    // Camera shake slight bump on jump strikes / rage hits already uses screenShake; keep a minimum punch feel.
    let lastHitState = 0;
    setInterval(() => {
      try {
        if(window.gameState !== 'fight' || !window.player) return;
        const atk = window.player.atkType;
        if(window.player.state === 'atk' && window.player.hitF === window.player.atkT){
          const desired = (window.player.y < window.GND - 20 || atk === 'slam') ? 12 : 7;
          if((window.screenShake || 0) < desired) window.screenShake = desired;
          lastHitState = Date.now();
        }
      } catch(e){}
    }, 20);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountV52, {once:true});
  else mountV52();
})();



(function(){
  const HIDE_ALWAYS = ['btn-ingame-menu','music-toggle','kbhint'];
  const HIDE_IN_FIGHT = ['global-coins','global-gems','global-level'];
  function setHidden(el, hidden){
    if(!el) return;
    if(hidden){
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('opacity','0','important');
      el.style.setProperty('pointer-events','none','important');
    } else {
      el.style.removeProperty('display');
      el.style.removeProperty('visibility');
      el.style.removeProperty('opacity');
      el.style.removeProperty('pointer-events');
    }
  }
  function inFightHud(){
    const hud = document.getElementById('hud-screen');
    const active = !!(hud && hud.classList.contains('active-screen'));
    const gs = String(window.gameState || '');
    return active || gs === 'fight' || gs === 'pre' || gs === 'post';
  }
  function movePauseButton(){
    const tw = document.querySelector('#hud-screen .timer-wrap');
    const pause = document.getElementById('fight-pause-btn');
    const round = document.getElementById('round-label');
    if(!tw || !pause) return;
    if(pause.parentElement !== tw){
      if(round && round.parentElement === tw) tw.insertBefore(pause, round);
      else tw.appendChild(pause);
    }
  }
  function syncV54(){
    const on = inFightHud();
    document.body.classList.toggle('fight-hud-v54', on);
    HIDE_ALWAYS.forEach(id => setHidden(document.getElementById(id), true));
    HIDE_IN_FIGHT.forEach(id => setHidden(document.getElementById(id), on));
    movePauseButton();
    const pause = document.getElementById('fight-pause-btn');
    if(pause) setHidden(pause, !on);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
      syncV54();
      setInterval(syncV54, 120);
    }, {once:true});
  } else {
    syncV54();
    setInterval(syncV54, 120);
  }
})();



(function(){
  function fixFightUi(){
    var d = document;
    var tw = d.querySelector('#hud-screen .timer-wrap');
    var round = d.getElementById('round-label');
    var pause = d.getElementById('fight-pause-btn');
    if(tw && pause && pause.parentElement !== tw){
      tw.insertBefore(pause, round || null);
    }

    var wrap = d.getElementById('ctrlRightWrap');
    var ids = ['btn-p','btn-k','btn-g','btn-t'];
    if(wrap){
      ids.forEach(function(id){
        var el = d.getElementById(id);
        if(!el) return;
        if(el.parentElement !== wrap) wrap.appendChild(el);
        el.hidden = false;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });
    }

    var g = d.getElementById('btn-g');
    var t = d.getElementById('btn-t');
    if(g){ g.setAttribute('data-ctrl-editable','true'); g.setAttribute('data-ctrl-label','GRAB'); g.textContent=''; }
    if(t){ t.setAttribute('data-ctrl-editable','true'); t.setAttribute('data-ctrl-label','THROW'); t.textContent=''; }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', fixFightUi, {once:true});
  } else {
    fixFightUi();
  }
  setInterval(fixFightUi, 250);
})();



(function(){
  function gs(){ try { return gameState; } catch(_e){ return window.gameState || ''; } }
  function setGs(v){ try { gameState = v; } catch(_e){ window.gameState = v; } }
  function inFight(){
    var hud = document.getElementById('hud-screen');
    var s = String(gs() || '');
    return !!(hud && hud.classList.contains('active-screen')) || s === 'fight' || s === 'pre' || (s === 'post' && !document.body.classList.contains('v58-paused'));
  }
  function ensureUi(){
    var d=document;
    var oldBtn=d.getElementById('v57-pause-btn'); if(oldBtn){ oldBtn.style.display='none'; oldBtn.style.pointerEvents='none'; }
    var oldOv=d.getElementById('v57-pause-overlay'); if(oldOv){ oldOv.classList.remove('active'); oldOv.style.display='none'; oldOv.style.pointerEvents='none'; }
    var oldOv2=d.getElementById('fight-pause-overlay'); if(oldOv2){ oldOv2.classList.remove('active'); oldOv2.style.display='none'; oldOv2.style.pointerEvents='none'; }
    if(!d.getElementById('v58-pause-btn')){
      var btn=d.createElement('button');
      btn.id='v58-pause-btn';
      btn.setAttribute('aria-label','Pause');
      btn.innerHTML='<span class="bars"><span></span><span></span></span>';
      d.body.appendChild(btn);
    }
    if(!d.getElementById('v58-pause-overlay')){
      var ov=d.createElement('div');
      ov.id='v58-pause-overlay';
      ov.innerHTML='<div id="v58-pause-panel">'
        + '<button class="v58-pause-action" id="v58-exit"><span class="emoji">🚪</span><span>EXIT</span></button>'
        + '<button class="v58-pause-action" id="v58-music"><span class="emoji">🎵</span><span>MUSIC</span></button>'
        + '<button class="v58-pause-action" id="v58-sfx"><span class="emoji">🥊</span><span>SFX</span></button>'
        + '<button class="v58-pause-action" id="v58-resume"><span class="emoji">▶</span><span>RESUME</span></button>'
        + '</div>';
      d.body.appendChild(ov);
    }
  }
  function positionBtn(){
    var d=document, btn=d.getElementById('v58-pause-btn'), timer=d.getElementById('timer');
    if(!btn) return;
    if(!inFight()) { btn.style.display='none'; return; }
    btn.style.display='flex';
    if(timer){
      var r=timer.getBoundingClientRect();
      btn.style.top=Math.round(r.bottom + 10)+'px';
      btn.style.left=Math.round(r.left + r.width/2)+'px';
    } else {
      btn.style.top='94px'; btn.style.left='50vw';
    }
  }
  function flushControls(){
    try{ if(window.K){ Object.keys(window.K).forEach(function(k){ window.K[k]=false; }); } }catch(_e){}
    try{ if(window.joy) { window.joy.dx=0; window.joy.dy=0; window.joy.active=false; } }catch(_e){}
    try{ if(typeof punchHeld!=='undefined') punchHeld=false; }catch(_e){}
  }
  function openPause(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    ensureUi();
    var ov=document.getElementById('v58-pause-overlay');
    if(!ov || ov.classList.contains('active')) return false;
    window.__v58PrevGameState = String(gs() || 'fight');
    if(window.__v58PrevGameState !== 'fight') window.__v58PrevGameState = 'fight';
    flushControls();
    setGs('post');
    try{ window.gameState='post'; }catch(_e){}
    document.body.classList.add('v58-paused');
    ov.classList.add('active');
    return false;
  }
  function closePause(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    var ov=document.getElementById('v58-pause-overlay');
    if(ov) ov.classList.remove('active');
    document.body.classList.remove('v58-paused');
    flushControls();
    setGs('fight');
    try{ window.gameState='fight'; }catch(_e){}
    try{ if(typeof showScreen==='function') showScreen('hud-screen'); }catch(_e){}
    try{ lastTick = Date.now(); }catch(_e){ try{ window.lastTick = Date.now(); }catch(_e2){} }
    try{ if(typeof updateHUD==='function') updateHUD(); }catch(_e){}
    return false;
  }
  function toggleSfx(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    try{
      var cur; try{ cur=settingsSfxVol; }catch(_e){ cur=window.settingsSfxVol; }
      if(typeof cur !== 'number') cur = 1;
      if(cur > 0){ window.__v58PrevSfxVol = cur; cur = 0; } else { cur = (typeof window.__v58PrevSfxVol === 'number' ? window.__v58PrevSfxVol : 1); }
      try{ settingsSfxVol = cur; }catch(_e){ window.settingsSfxVol = cur; }
      var fill=document.getElementById('sfx-vol-fill'); if(fill) fill.style.width=(cur*100)+'%';
    }catch(_e){}
    return false;
  }
  function toggleMusicWrap(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    try{ if(typeof window.toggleMusic==='function') window.toggleMusic(); }catch(_e){}
    return false;
  }
  function exitFight(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    var ov=document.getElementById('v58-pause-overlay'); if(ov) ov.classList.remove('active');
    document.body.classList.remove('v58-paused');
    flushControls();
    try{ if(typeof window.clearPendingFight==='function') window.clearPendingFight(); }catch(_e){}
    setGs('menu'); try{ window.gameState='menu'; }catch(_e){}
    try{ if(typeof window.showScreen==='function') window.showScreen('menu-screen'); }catch(_e){}
    return false;
  }
  function bindEl(el, fn){
    if(!el || el.__v58Bound) return;
    el.__v58Bound = true;
    ['click','touchend'].forEach(function(evt){
      el.addEventListener(evt, function(ev){ if(evt==='touchend') ev.preventDefault(); fn(ev); }, {passive:false});
    });
  }
  function bind(){
    ensureUi();
    bindEl(document.getElementById('v58-pause-btn'), openPause);
    bindEl(document.getElementById('v58-resume'), closePause);
    bindEl(document.getElementById('v58-exit'), exitFight);
    bindEl(document.getElementById('v58-sfx'), toggleSfx);
    bindEl(document.getElementById('v58-music'), toggleMusicWrap);
    var ov=document.getElementById('v58-pause-overlay');
    if(ov && !ov.__v58Bound){
      ov.__v58Bound = true;
      ['click','touchend'].forEach(function(evt){
        ov.addEventListener(evt, function(ev){ if(ev.target===ov){ if(evt==='touchend') ev.preventDefault(); closePause(ev); } }, {passive:false});
      });
    }
  }
  function tick(){ ensureUi(); bind(); positionBtn(); var ov=document.getElementById('v58-pause-overlay'); if(ov && !ov.classList.contains('active') && String(gs()||'')==='menu'){ document.body.classList.remove('v58-paused'); } }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', tick, {once:true}); else tick();
  setInterval(tick, 240);
  window.addEventListener('resize', positionBtn);
  window.addEventListener('orientationchange', positionBtn);
})();
