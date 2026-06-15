/*
  CHUG runtime loader + safety patch layer
  ------------------------------------------------------------
  The original bundled game script was large and patch-layered. This
  loader keeps the published game behavior from the last stable commit,
  then applies small runtime guards that prevent fragile UI crashes.
*/
(function () {
  'use strict';

  var STABLE_COMMIT = 'e899b7f5221142ba0c161d3b98a2de3be292ffc4';
  var CDN_SRC = 'https://cdn.jsdelivr.net/gh/Xollonox/Chug@' + STABLE_COMMIT + '/game.js';
  var RAW_SRC = 'https://raw.githubusercontent.com/Xollonox/Chug/' + STABLE_COMMIT + '/game.js';

  function log() {
    try { console.log.apply(console, arguments); } catch (_) {}
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      (document.head || document.documentElement).appendChild(s);
    });
  }

  function loadRawFallback() {
    return fetch(RAW_SRC, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('Raw fallback failed: HTTP ' + r.status);
        return r.text();
      })
      .then(function (code) {
        var s = document.createElement('script');
        s.text = code + '\n//# sourceURL=chug-stable-game.js';
        (document.head || document.documentElement).appendChild(s);
      });
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.innerText = value;
    return el;
  }

  function setWidth(id, percent) {
    var el = document.getElementById(id);
    if (el) el.style.width = percent;
    return el;
  }

  function patchShowScreen() {
    var original = window.showScreen;
    window.showScreen = function safeShowScreen(id) {
      var target = document.getElementById(id);
      if (!target) {
        console.error('[CHUG] Missing screen:', id);
        return false;
      }

      document.querySelectorAll('.screen').forEach(function (screen) {
        screen.classList.remove('active-screen');
      });

      var topbar = document.getElementById('global-sf2-topbar');
      if (topbar) {
        if (id === 'menu-screen') {
          topbar.style.setProperty('display', 'flex', 'important');
          try {
            if (typeof window.sf2MirrorEconomy === 'function') window.sf2MirrorEconomy();
          } catch (err) {
            console.warn('[CHUG] sf2MirrorEconomy failed:', err);
          }
        } else {
          topbar.style.setProperty('display', 'none', 'important');
        }
      }

      target.classList.add('active-screen');

      try {
        if (
          id === 'worlddetail-screen' || id === 'story-screen' || id === 'hud-screen' ||
          id === 'worldmap-screen' || id === 'chapter-screen' || id === 'act1-screen' ||
          id === 'act2-screen' || id === 'menu-screen'
        ) {
          if (typeof window.syncChapterWallpaper === 'function') window.syncChapterWallpaper();
        }
      } catch (err) {
        console.warn('[CHUG] syncChapterWallpaper failed:', err);
      }

      return true;
    };
    window.showScreen.__chugPatched = true;
    window.showScreen.__chugOriginal = original || null;
  }

  function patchSettings() {
    var originalLoadSettings = window.loadSettings;
    window.loadSettings = function safeLoadSettings() {
      try {
        if (typeof originalLoadSettings === 'function') originalLoadSettings.apply(this, arguments);
      } catch (err) {
        console.warn('[CHUG] Original loadSettings failed, recovering:', err);
      }

      try {
        setWidth('music-vol-fill', (settingsMusicVol * 100) + '%');
        setWidth('sfx-vol-fill', (settingsSfxVol * 100) + '%');
        setText('shake-toggle', settingsShake ? 'ON' : 'OFF');
        setText('combo-toggle', settingsComboDsp ? 'ON' : 'OFF');
        if (typeof window.applyCtrlSettings === 'function') window.applyCtrlSettings();
      } catch (err) {
        console.warn('[CHUG] Safe settings sync failed:', err);
      }
    };

    window.toggleShake = function safeToggleShake() {
      try {
        settingsShake = !settingsShake;
        setText('shake-toggle', settingsShake ? 'ON' : 'OFF');
        localStorage.setItem('chug_settings', JSON.stringify({
          mv: settingsMusicVol,
          sv: settingsSfxVol,
          sh: settingsShake,
          cd: settingsComboDsp
        }));
      } catch (err) {
        console.warn('[CHUG] toggleShake failed:', err);
      }
    };

    window.toggleComboDsp = function safeToggleComboDsp() {
      try {
        settingsComboDsp = !settingsComboDsp;
        setText('combo-toggle', settingsComboDsp ? 'ON' : 'OFF');
        if (!settingsComboDsp) {
          var combo = document.getElementById('combo-display');
          if (combo) combo.style.display = 'none';
        }
        localStorage.setItem('chug_settings', JSON.stringify({
          mv: settingsMusicVol,
          sv: settingsSfxVol,
          sh: settingsShake,
          cd: settingsComboDsp
        }));
      } catch (err) {
        console.warn('[CHUG] toggleComboDsp failed:', err);
      }
    };
  }

  function patchMusicToggle() {
    window.toggleMusic = function safeToggleMusic() {
      try {
        musicEnabled = !musicEnabled;
        var btn = document.getElementById('music-toggle');

        if (!musicEnabled) {
          if (typeof window.stopMusic === 'function') window.stopMusic(0.4);
          if (typeof window.pauseBgAudio === 'function') window.pauseBgAudio();
          if (btn) {
            btn.innerText = '🎵 OFF';
            btn.style.opacity = '0.4';
          }
          return;
        }

        if (btn) {
          btn.innerText = '🎵 ON';
          btn.style.opacity = '1';
        }

        if (typeof window.playBgAudioForMode === 'function') {
          window.playBgAudioForMode(gameState === 'fight' ? 'boss' : 'menu');
        } else if (typeof window.startMusicTheme === 'function') {
          window.startMusicTheme(gameState === 'fight' ? 'boss' : 'menu');
        }
      } catch (err) {
        console.warn('[CHUG] toggleMusic failed:', err);
      }
    };
  }

  function migrateSaveKeys() {
    try {
      var mainKey = 'chug_shadow_v3_save';
      var oldV9Key = 'chug_v9_save';
      var main = localStorage.getItem(mainKey);
      var v9 = localStorage.getItem(oldV9Key);
      if (!main && v9) localStorage.setItem(mainKey, v9);
      if (v9) localStorage.removeItem(oldV9Key);
      window.CHUG_SAVE_KEY = mainKey;
    } catch (err) {
      console.warn('[CHUG] Save migration skipped:', err);
    }
  }

  function applyPatches() {
    patchShowScreen();
    patchSettings();
    patchMusicToggle();
    migrateSaveKeys();
    log('[CHUG] Runtime safety patches applied.');
  }

  loadScript('game_engine.js')
    .then(function () {
      console.log('[CHUG] Loaded local game_engine.js successfully.');
    })
    .catch(function () {
      console.log('[CHUG] Local game_engine.js not found, falling back to CDN...');
      return loadScript(CDN_SRC)
        .catch(function (err) {
          console.warn('[CHUG] CDN load failed, trying raw fallback:', err);
          return loadRawFallback();
        });
    })
    .then(applyPatches)
    .catch(function (err) {
      console.error('[CHUG] Could not load stable game runtime:', err);
    });
})();
