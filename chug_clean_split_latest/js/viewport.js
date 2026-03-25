(function(){
  if(window.__v60Mounted) return;
  window.__v60Mounted = true;

  const root = document.documentElement;
  const body = document.body;

  function setViewportVars(){
    let vw = window.innerWidth || 0;
    let vh = window.innerHeight || 0;
    if(window.visualViewport){
      vw = Math.round(window.visualViewport.width || vw);
      vh = Math.round(window.visualViewport.height || vh);
    }
    if(!vw || !vh) return;
    root.style.setProperty('--app-vw', vw + 'px');
    root.style.setProperty('--app-vh', vh + 'px');
    if(body){
      body.classList.toggle('compact-height', vh < 760);
      body.classList.toggle('ultra-compact-height', vh < 690);
    }
  }

  function nudgeBrowserChrome(){
    try{
      if(window.scrollY === 0) window.scrollTo(0, 1);
    }catch(_){}
  }

  function syncViewportSoon(){
    setViewportVars();
    setTimeout(setViewportVars, 80);
    setTimeout(setViewportVars, 260);
  }

  function safeCall(fn){
    try{ return typeof fn === 'function' ? fn() : undefined; }catch(_){}
  }

  function goToDojoLobby(){
    safeCall(window.loadGame);
    const save = window.__saveData || (typeof window.defaultSave === 'function' ? window.defaultSave() : {});
    if(typeof window.currentPart === 'number') window.currentPart = save.currentPart || window.currentPart || 1;
    else window.currentPart = save.currentPart || 1;

    try{ currentPart = window.currentPart; }catch(_){}
    safeCall(window.syncCurrentPartGlobal);
    try{
      if(typeof applyPartBg === 'function') applyPartBg(window.currentPart || 1);
    }catch(_){}
    safeCall(window.refreshMenuLocks);

    try{
      if(window.UI){
        if(UI.ctrls) UI.ctrls.style.display = 'none';
        if(UI.kbhint) UI.kbhint.style.display = 'none';
        if(UI.gCoins) UI.gCoins.style.display = 'flex';
        if(UI.btnMenu) UI.btnMenu.style.display = 'none';
      }
    }catch(_){}

    try{ if(typeof stopVO === 'function') stopVO(); }catch(_){}
    try{ if(typeof setEnvRage === 'function') setEnvRage(false); }catch(_){}
    try{ hitStop = 0; }catch(_){}
    try{ screenShake = 0; }catch(_){}
    try{ gameState = 'menu'; }catch(_){}
    try{ if(typeof showScreen === 'function') showScreen('menu-screen'); }catch(_){}
    try{ if(typeof startMusicTheme === 'function') startMusicTheme('menu'); }catch(_){}
    syncViewportSoon();
    setTimeout(nudgeBrowserChrome, 60);
  }

  window.continueGame = function(){
    try{ if(typeof initAudio === 'function') initAudio(); }catch(_){}
    goToDojoLobby();

    const gg = document.getElementById('global-gems');
    const gl = document.getElementById('global-level');
    if(gg) gg.style.display = 'flex';
    if(gl) gl.style.display = 'flex';
    if(typeof updateV9Display === 'function'){
      try{ updateV9Display(); }catch(_){}
    }
  };

  window.newGame = function(){
    if(!confirm('Start a NEW GAME?\n\nAll progress, coins, gems and level will be reset.')) return;

    try{ if(typeof initAudio === 'function') initAudio(); }catch(_){}
    try{ localStorage.removeItem('chug_shadow_v3_save'); }catch(_){}
    try{ localStorage.removeItem('chug_v9_save'); }catch(_){}

    try{ window.__saveData = (typeof defaultSave === 'function') ? defaultSave() : {}; }catch(_){}
    try{
      coins = 0;
      weapon = 'none';
      armor = 'none';
      rageMode2 = false;
      strengthUpg = 0;
      speedUpg = 0;
      enduranceUpg = 0;
      currentPart = 1;
      window.currentPart = 1;
      if(typeof syncCurrentPartGlobal === 'function') syncCurrentPartGlobal();
      if(typeof UI !== 'undefined' && UI.cVal) UI.cVal.innerText = 0;
    }catch(_){}

    try{
      _lvl = 1;
      _xp = 0;
      _statPoints = 0;
      _stats = { hp:0, atk:0, def:0, spd:0, crit:0 };
      _gems = 0;
      if(typeof updateV9Display === 'function') updateV9Display();
    }catch(_){}

    try{ if(typeof doFlash === 'function') doFlash(); }catch(_){}
    try{
      if(typeof saveGame === 'function'){
        saveGame({
          currentPart: 1,
          pendingFightType: null,
          pendingFightPart: null,
          pendingFightIndex: null
        });
      }
    }catch(_){}
    try{ if(typeof v9SaveGame === 'function') v9SaveGame(); }catch(_){}

    goToDojoLobby();

    const gg = document.getElementById('global-gems');
    const gl = document.getElementById('global-level');
    if(gg) gg.style.display = 'flex';
    if(gl) gl.style.display = 'flex';
  };

  document.addEventListener('pointerdown', function(ev){
    const t = ev && ev.target;
    const introBtn = t && t.closest ? t.closest('.intro-menu-btn') : null;
    if(introBtn){
      const el = document.documentElement;
      const enterFs = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if(enterFs){
        try{ enterFs.call(el); }catch(_){}
      }
      setTimeout(nudgeBrowserChrome, 60);
    }
  }, true);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncViewportSoon, { once:true });
  } else {
    syncViewportSoon();
  }
  window.addEventListener('load', function(){
    syncViewportSoon();
    nudgeBrowserChrome();
    setTimeout(nudgeBrowserChrome, 120);
  }, { passive:true });
  window.addEventListener('resize', syncViewportSoon, { passive:true });
  window.addEventListener('orientationchange', function(){
    syncViewportSoon();
    setTimeout(nudgeBrowserChrome, 120);
    setTimeout(nudgeBrowserChrome, 420);
  }, { passive:true });

  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', syncViewportSoon, { passive:true });
    window.visualViewport.addEventListener('scroll', syncViewportSoon, { passive:true });
  }

  document.addEventListener('visibilitychange', function(){
    if(!document.hidden) syncViewportSoon();
  }, { passive:true });

  document.addEventListener('touchstart', function(){
    nudgeBrowserChrome();
    syncViewportSoon();
  }, { passive:true, once:true });
})();




(function(){
  if(window.__v61ArmoryChromeFix) return;
  window.__v61ArmoryChromeFix = true;

  function syncArmoryViewport(){
    var root = document.documentElement;
    var vv = window.visualViewport;
    var vh = Math.round((vv && vv.height) || window.innerHeight || 0);
    if(vh > 0){
      root.style.setProperty('--app-vh', vh + 'px');
    }
  }

  function refreshArmorySoon(){
    syncArmoryViewport();
    setTimeout(syncArmoryViewport, 50);
    setTimeout(syncArmoryViewport, 180);
  }

  var _openShopV61Base = window.openShop;
  window.openShop = function(){
    var out = _openShopV61Base ? _openShopV61Base.apply(this, arguments) : undefined;
    refreshArmorySoon();
    return out;
  };

  window.addEventListener('resize', refreshArmorySoon, { passive:true });
  window.addEventListener('orientationchange', function(){
    refreshArmorySoon();
    setTimeout(refreshArmorySoon, 250);
  }, { passive:true });
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', refreshArmorySoon, { passive:true });
    window.visualViewport.addEventListener('scroll', refreshArmorySoon, { passive:true });
  }
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) refreshArmorySoon(); }, { passive:true });
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refreshArmorySoon, { once:true });
  else refreshArmorySoon();
})();

(function(){
  function saveSettingsStateSafe(){
    try{
      var payload = {
        mv: (typeof settingsMusicVol !== 'undefined' ? settingsMusicVol : 0.7),
        sv: (typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : 1.0),
        sh: (typeof settingsShake !== 'undefined' ? settingsShake : true),
        cd: (typeof settingsComboDsp !== 'undefined' ? settingsComboDsp : true),
        ch: (typeof settingsCtrlHidden !== 'undefined' ? settingsCtrlHidden : false)
      };
      localStorage.setItem('chug_settings', JSON.stringify(payload));
    }catch(_e){}
  }

  function setToggleVisual(id, state, text){
    var el = document.getElementById(id);
    if(!el) return;
    el.dataset.state = state;
    el.textContent = text;
  }

  function refreshSettingsPolishUI(){
    var musicFill = document.getElementById('music-vol-fill');
    var sfxFill = document.getElementById('sfx-vol-fill');
    var musicVal = document.getElementById('music-vol-value');
    var sfxVal = document.getElementById('sfx-vol-value');

    var mv = (typeof settingsMusicVol !== 'undefined' ? settingsMusicVol : 0.7);
    var sv = (typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : 1.0);

    if(musicFill) musicFill.style.width = (mv * 100) + '%';
    if(sfxFill) sfxFill.style.width = (sv * 100) + '%';
    if(musicVal) musicVal.textContent = Math.round(mv * 100) + '%';
    if(sfxVal) sfxVal.textContent = Math.round(sv * 100) + '%';

    var shakeState = (typeof settingsShake !== 'undefined' ? settingsShake : true);
    var comboState = (typeof settingsComboDsp !== 'undefined' ? settingsComboDsp : true);
    var ctrlState = (typeof settingsCtrlHidden !== 'undefined' ? settingsCtrlHidden : false);
    setToggleVisual('shake-toggle', (shakeState ? 'on' : 'off'), (shakeState ? 'ON' : 'OFF'));
    setToggleVisual('combo-toggle', (comboState ? 'on' : 'off'), (comboState ? 'ON' : 'OFF'));
    setToggleVisual('ctrl-visibility-toggle', (ctrlState ? 'hidden' : 'show'), (ctrlState ? 'HIDDEN' : 'SHOW'));
  }

  function setSettingsVolumeExact(type, value){
    value = Math.max(0, Math.min(1, value));
    if(type === 'music'){
      window.settingsMusicVol = settingsMusicVol = value;
      var mf = document.getElementById('music-vol-fill');
      if(mf) mf.style.width = (value * 100) + '%';
      try{ if(masterGain) masterGain.gain.setTargetAtTime(value, AC.currentTime, 0.1); }catch(_e){}
    } else {
      window.settingsSfxVol = settingsSfxVol = value;
      var sf = document.getElementById('sfx-vol-fill');
      if(sf) sf.style.width = (value * 100) + '%';
    }
    saveSettingsStateSafe();
    refreshSettingsPolishUI();
  }

  function bindPremiumVolumeTracks(){
    document.querySelectorAll('.settings-vol-track[data-type]').forEach(function(track){
      if(track.dataset.boundV62 === '1') return;
      track.dataset.boundV62 = '1';
      function handleSet(ev){
        var rect = track.getBoundingClientRect();
        if(!rect.width) return;
        var pct = (ev.clientX - rect.left) / rect.width;
        setSettingsVolumeExact(track.dataset.type, pct);
      }
      track.addEventListener('click', handleSet);
    });
  }

  if(typeof window.adjustVol === 'function'){
    var __v62AdjustVol = window.adjustVol;
    window.adjustVol = function(type, delta){
      var out = __v62AdjustVol.apply(this, arguments);
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(typeof window.toggleShake === 'function'){
    var __v62ToggleShake = window.toggleShake;
    window.toggleShake = function(){
      var out = __v62ToggleShake.apply(this, arguments);
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(typeof window.toggleComboDsp === 'function'){
    var __v62ToggleCombo = window.toggleComboDsp;
    window.toggleComboDsp = function(){
      var out = __v62ToggleCombo.apply(this, arguments);
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(typeof window.toggleCtrlVisibility === 'function'){
    var __v62ToggleCtrl = window.toggleCtrlVisibility;
    window.toggleCtrlVisibility = function(){
      var out = __v62ToggleCtrl.apply(this, arguments);
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(typeof window.loadSettings === 'function'){
    var __v62LoadSettings = window.loadSettings;
    window.loadSettings = function(){
      var out = __v62LoadSettings.apply(this, arguments);
      bindPremiumVolumeTracks();
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(typeof window.openSettings === 'function'){
    var __v62OpenSettings = window.openSettings;
    window.openSettings = function(){
      var out = __v62OpenSettings.apply(this, arguments);
      bindPremiumVolumeTracks();
      refreshSettingsPolishUI();
      return out;
    };
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      bindPremiumVolumeTracks();
      refreshSettingsPolishUI();
    }, { once:true });
  } else {
    bindPremiumVolumeTracks();
    refreshSettingsPolishUI();
  }
})();
