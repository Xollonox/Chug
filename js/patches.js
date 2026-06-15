// ── RUNTIME OVERRIDES & SAFETY PATCHES ──

export function applyRuntimePatches() {
  console.log('[CHUG] Applying runtime safety patches and observers...');

  // 1. Core safety bridges for legacy compatibility
  if (typeof window.rangedWeapon === 'undefined') window.rangedWeapon = 'none';
  window.getRangedWeapon = window.getRangedWeapon || function() {
    try {
      var save = window.__saveData || {};
      var arm = save.armory || {};
      return save.rangedWeapon || (arm.equipped && arm.equipped.range) || window.rangedWeapon || 'none';
    } catch(e) { return window.rangedWeapon || 'none'; }
  };
  window.setRangedWeapon = window.setRangedWeapon || function(id) {
    window.rangedWeapon = id || 'none';
    try {
      if (!window.__saveData) window.__saveData = {};
      window.__saveData.rangedWeapon = window.rangedWeapon;
      if (!window.__saveData.armory) window.__saveData.armory = {};
      if (!window.__saveData.armory.equipped) window.__saveData.armory.equipped = {};
      window.__saveData.armory.equipped.range = window.rangedWeapon;
      if (typeof window.saveGame === 'function') window.saveGame();
    } catch(e) {}
    return window.rangedWeapon;
  };
  window.fireRangedWeapon = window.fireRangedWeapon || function() { return false; };
  window.tickRangedCooldown = window.tickRangedCooldown || function() {};
  window.updateRangeShots = window.updateRangeShots || function() {};
  window.drawRangeShots = window.drawRangeShots || function() {};
  window.updateDomainAttacks = window.updateDomainAttacks || function() {};
  window.drawDomainAttacks = window.drawDomainAttacks || function() {};

  // 2. Intro screen fallback handlers
  if (typeof window.currentPart === 'undefined') window.currentPart = 1;
  window.__safeListen = window.__safeListen || function(el, type, handler, opts) {
    if (el && typeof el.addEventListener === 'function') el.addEventListener(type, handler, opts);
    return el;
  };
  window.introSelect = window.introSelect || function(action) {
    window.__pendingIntroAction = action || window.__pendingIntroAction || 'new';
    if (typeof window.__realIntroSelect === 'function') return window.__realIntroSelect(window.__pendingIntroAction);
    return false;
  };
  window.introHandleClick = window.introHandleClick || function(e) {
    if (e && e.target && e.target.classList && e.target.classList.contains('intro-menu-btn')) return;
    var has = false;
    try { has = !!localStorage.getItem('chug_shadow_v3_save'); } catch(_) {}
    return window.introSelect(has ? 'continue' : 'new');
  };

  // 3. Menu Panel light toggle observer
  (function() {
    const menuScreen = document.getElementById('menu-screen');
    if (!menuScreen) return;

    function syncMenuPanelLight() {
      const isMenuActive = menuScreen.classList.contains('active-screen');
      const isOpen = isMenuActive && !menuScreen.classList.contains('menu-ribbon-collapsed');
      document.body.classList.toggle('menu-panel-open', isOpen);
    }

    if (typeof window.showScreen === 'function' && !window.__v17MenuLightShowPatch) {
      const oldShowScreen = window.showScreen;
      window.__v17MenuLightShowPatch = true;
      window.showScreen = function() {
        const out = oldShowScreen.apply(this, arguments);
        requestAnimationFrame(syncMenuPanelLight);
        return out;
      };
    }

    if (typeof window.showMenuScroll === 'function' && !window.__v17MenuLightScrollPatch) {
      const oldShowMenuScroll = window.showMenuScroll;
      window.__v17MenuLightScrollPatch = true;
      window.showMenuScroll = function() {
        const out = oldShowMenuScroll.apply(this, arguments);
        requestAnimationFrame(syncMenuPanelLight);
        return out;
      };
    }

    const observer = new MutationObserver(syncMenuPanelLight);
    observer.observe(menuScreen, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('load', () => setTimeout(syncMenuPanelLight, 60), { once: true });
    setTimeout(syncMenuPanelLight, 3600);
    syncMenuPanelLight();
  })();

  // 4. installRagePatch to enhance fighter update/attack loops
  (function installRagePatch(attempt) {
    const FighterRef = window.Fighter;
    if (!FighterRef || !FighterRef.prototype) {
      if ((attempt || 0) < 120) {
        return setTimeout(function() { installRagePatch((attempt || 0) + 1); }, 50);
      }
      return;
    }
    if (FighterRef.prototype.__v50RagePatchInstalled) return;

    const ORIG_UPDATE = FighterRef.prototype.update;
    const ORIG_ATTACK = FighterRef.prototype.attack;
    const ORIG_DRAW = FighterRef.prototype.draw;
    const ORIG_SET_ENV_RAGE = window.setEnvRage;
    const ORIG_FIRE_AT = window.fireAt;
    if (!ORIG_UPDATE || !ORIG_ATTACK || !ORIG_DRAW) { return; }
    FighterRef.prototype.__v50RagePatchInstalled = true;

    window.fireAt = function(x, y, vx) {
      if (!window.envRage && typeof ORIG_FIRE_AT === 'function') return ORIG_FIRE_AT(x, y, vx);
      if (typeof window.particles === 'undefined') return;
      if ((window.__rageFxTick = (window.__rageFxTick || 0) + 1) % 3 !== 0) return;
      const cols = ['#67ecff', '#84a8ff', '#9b6bff', '#d9fbff'];
      window.particles.push({
        x: x + Math.random() * 28,
        y: y - Math.random() * 78,
        vx: vx * 0.12 + (Math.random() - .5) * 0.9,
        vy: -(Math.random() * 2.8 + 1.0),
        life: 0.34 + Math.random() * 0.12,
        col: cols[Math.floor(Math.random() * cols.length)],
        w: Math.random() * 5 + 2,
        tp: 'f'
      });
      if (window.particles.length > 180) window.particles.splice(0, window.particles.length - 180);
    };

    window.setEnvRage = function(on) {
      if (typeof ORIG_SET_ENV_RAGE === 'function') ORIG_SET_ENV_RAGE(on);
      try {
        document.body.classList.toggle('rage-special', !!on);
        const overlay = document.getElementById('rage-overlay');
        if (overlay) {
          overlay.style.background = on
            ? 'radial-gradient(circle at 50% 52%, rgba(120,240,255,0.12) 0%, transparent 30%), radial-gradient(ellipse at 50% 100%, rgba(92,38,190,0.18) 0%, transparent 68%), linear-gradient(180deg, rgba(8,18,56,0.12) 0%, rgba(2,0,12,0.03) 100%)'
            : '';
        }
      } catch (e) {}
    };

    FighterRef.prototype.attack = function(type) {
      const out = ORIG_ATTACK.call(this, type);
      if (this.isP && this.raging && this.atkT > 0) {
        if (type === 'p') this.atkT = Math.max(5, Math.floor(this.atkT * 0.76));
        else if (type === 'k') this.atkT = Math.max(7, Math.floor(this.atkT * 0.79));
        else if (type === 'slam') this.atkT = Math.max(15, Math.floor(this.atkT * 0.88));
        else if (type === 'throw') this.atkT = Math.max(13, Math.floor(this.atkT * 0.90));
        this.hitF = Math.max(1, Math.floor(this.atkT * (type === 'k' ? 0.56 : 0.5)));
      }
      return out;
    };

    FighterRef.prototype.update = function(en) {
      this.__shadowTick = (this.__shadowTick || 0) + 1;

      if (!this.isP && en && en.raging && window.gameState === 'fight' && this.hp > 0) {
        const _rm = typeof window.getRageModifiers === 'function' ? window.getRageModifiers(en.rageTier) : null;
        const oldSpd = this.spd;
        this.spd = oldSpd * (_rm ? _rm.enemySlow : (en.rageTier === 2 ? 0.42 : 0.56));
        const out = ORIG_UPDATE.call(this, en);
        this.spd = oldSpd;

        if (this.state === 'atk' && this.atkT > 0 && (this.__shadowTick % (en.rageTier === 2 ? 2 : 3)) !== 0) {
          this.atkT += (_rm ? _rm.enemyAtkAdj : (en.rageTier === 2 ? 0.45 : 0.22));
        }
        if (this.hitT > 0) this.hitT += (_rm ? _rm.enemyHitAdj : (en.rageTier === 2 ? 0.28 : 0.14));
        this.vx *= (_rm ? _rm.enemyVxMul : (en.rageTier === 2 ? 0.74 : 0.82));

        if (typeof window.particles !== 'undefined' && (this.__shadowTick % 12) === 0 && this.hp > 0) {
          window.particles.push({
            x: this.x + this.w/2 + (Math.random() - 0.5) * 10,
            y: this.y - this.h * 0.55 + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -0.35 - Math.random() * 0.2,
            life: 0.18 + Math.random() * 0.08,
            col: Math.random() < 0.5 ? 'rgba(120,235,255,0.20)' : 'rgba(170,120,255,0.16)',
            w: Math.random() * 5 + 3,
            tp: 's'
          });
        }
        if (typeof window.particles !== 'undefined' && window.particles.length > 180) window.particles.splice(0, window.particles.length - 180);
        return out;
      }

      if (this.isP && this.raging) {
        const oldSpd = this.spd;
        const _rm = typeof window.getRageModifiers === 'function' ? window.getRageModifiers(this.rageTier) : null;
        this.spd = oldSpd * (_rm ? _rm.spdMul : (this.rageTier === 2 ? 1.34 : 1.24));
        const out = ORIG_UPDATE.call(this, en);
        this.spd = oldSpd;
        this.rage = Math.min(100, this.rage + 0.03);
        if (typeof window.particles !== 'undefined' && (this.__shadowTick % 8) === 0 && this.hp > 0 && (this.state === 'run' || this.state === 'atk')) {
          window.particles.push({
            x: this.x + this.w/2 + (Math.random() - 0.5) * 12,
            y: this.y - this.h * (0.28 + Math.random() * 0.18),
            vx: (Math.random() - 0.5) * 0.45,
            vy: -0.55 - Math.random() * 0.25,
            life: 0.22 + Math.random() * 0.08,
            col: Math.random() < 0.55 ? 'rgba(104,235,255,0.24)' : 'rgba(170,110,255,0.18)',
            w: Math.random() * 6 + 3,
            tp: 's'
          });
        }
        if (typeof window.particles !== 'undefined' && window.particles.length > 180) window.particles.splice(0, window.particles.length - 180);
        return out;
      }

      return ORIG_UPDATE.call(this, en);
    };

    FighterRef.prototype.draw = function(c, ghost) {
      if (this.isP && this.raging && !ghost) {
        c.save();
        c.globalAlpha = 0.09;
        c.shadowColor = this.rageTier === 2 ? 'rgba(124,240,255,0.55)' : 'rgba(160,110,255,0.45)';
        c.shadowBlur = 12;
        c.fillStyle = this.rageTier === 2 ? 'rgba(110,235,255,0.10)' : 'rgba(150,110,255,0.08)';
        c.fillRect(this.x - 3, this.y - this.h - 4, this.w + 6, this.h + 8);
        c.restore();
      }
      return ORIG_DRAW.call(this, c, ghost);
    };
  })();

  // 5. Chapter Wallpaper system setup
  (function() {
    function svgUrl(svg) {
      return 'url("data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) + '")';
    }

    function layerSky(topA, topB, glow, bottomA, bottomB) {
      return `linear-gradient(180deg, ${topA} 0%, ${topB} 24%, ${glow} 45%, ${bottomA} 72%, ${bottomB} 100%)`;
    }

    function mountainSvg(fill1, fill2, motif, motif2) {
      return svgUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${fill1}" />
              <stop offset="100%" stop-color="${fill2}" />
            </linearGradient>
          </defs>
          <path d="M0 590 C120 520 170 520 270 560 C360 595 420 610 520 560 C620 510 710 470 820 520 C920 565 1030 570 1140 520 C1260 465 1375 455 1600 560 L1600 900 L0 900 Z" fill="url(#m1)" opacity="0.94"/>
          <path d="M0 665 C135 610 210 610 320 652 C420 690 480 710 590 680 C725 642 800 632 920 676 C1050 724 1125 722 1258 668 C1370 622 1460 615 1600 664 L1600 900 L0 900 Z" fill="${motif}" opacity="0.96"/>
          <path d="M0 745 C180 700 260 720 390 760 C510 798 590 800 735 760 C880 720 980 720 1120 768 C1260 816 1370 806 1600 742 L1600 900 L0 900 Z" fill="${motif2}" opacity="0.94"/>
        </svg>
      `);
    }

    function motifSvg(kind, c1, c2) {
      let body = '';
      if (kind === 'dojo') {
        body = `
          <circle cx="1280" cy="210" r="58" fill="${c1}" opacity="0.22"/>
          <rect x="1110" y="448" width="270" height="165" rx="8" fill="${c2}" opacity="0.92"/>
          <rect x="1150" y="395" width="190" height="64" rx="6" fill="${c2}" opacity="0.88"/>
          <rect x="1176" y="342" width="138" height="56" rx="6" fill="${c2}" opacity="0.85"/>
          <rect x="1220" y="292" width="52" height="54" fill="${c2}" opacity="0.82"/>
        `;
      } else if (kind === 'bamboo') {
        body = `
          <g opacity="0.82" fill="${c2}">
            <rect x="1115" y="250" width="24" height="520" rx="8"/>
            <rect x="1170" y="215" width="22" height="555" rx="8"/>
            <rect x="1232" y="185" width="20" height="585" rx="8"/>
            <rect x="1295" y="235" width="24" height="540" rx="8"/>
            <rect x="1358" y="205" width="22" height="570" rx="8"/>
          </g>
          <g stroke="${c1}" stroke-width="7" stroke-linecap="round" opacity="0.62">
            <path d="M1128 390 C1080 360 1066 335 1045 300"/>
            <path d="M1182 360 C1140 332 1114 310 1094 285"/>
            <path d="M1240 338 C1204 315 1170 288 1148 255"/>
            <path d="M1304 368 C1342 338 1368 306 1392 274"/>
            <path d="M1368 338 C1410 310 1440 282 1470 248"/>
          </g>
        `;
      } else if (kind === 'shrine') {
        body = `
          <circle cx="1260" cy="210" r="76" fill="${c1}" opacity="0.22"/>
          <rect x="1176" y="390" width="20" height="260" fill="${c2}" opacity="0.9"/>
          <rect x="1310" y="390" width="20" height="260" fill="${c2}" opacity="0.9"/>
          <rect x="1135" y="355" width="240" height="34" rx="6" fill="${c2}" opacity="0.9"/>
          <rect x="1100" y="322" width="310" height="28" rx="8" fill="${c2}" opacity="0.86"/>
          <path d="M1220 424 L1285 424 L1298 650 L1208 650 Z" fill="${c2}" opacity="0.84"/>
        `;
      } else if (kind === 'canyon') {
        body = `
          <path d="M1070 250 C1110 210 1168 198 1202 238 C1246 290 1280 340 1304 402 C1336 482 1398 532 1478 584" fill="none" stroke="${c1}" stroke-width="38" stroke-linecap="round" opacity="0.28"/>
          <path d="M980 560 C1090 500 1180 468 1276 468 C1360 468 1450 512 1540 610" fill="none" stroke="${c2}" stroke-width="88" stroke-linecap="round" opacity="0.30"/>
        `;
      } else if (kind === 'alien') {
        body = `
          <circle cx="1265" cy="198" r="92" fill="${c1}" opacity="0.24"/>
          <ellipse cx="1224" cy="505" rx="64" ry="162" fill="${c2}" opacity="0.72"/>
          <ellipse cx="1340" cy="540" rx="56" ry="190" fill="${c2}" opacity="0.66"/>
          <path d="M1185 485 L1260 290 L1294 485 Z" fill="${c2}" opacity="0.9"/>
          <path d="M1300 520 L1375 295 L1418 520 Z" fill="${c2}" opacity="0.88"/>
        `;
      } else if (kind === 'camp') {
        body = `
          <circle cx="1295" cy="235" r="62" fill="${c1}" opacity="0.20"/>
          <path d="M1125 610 L1196 482 L1268 610 Z" fill="${c2}" opacity="0.9"/>
          <path d="M1240 610 L1318 468 L1390 610 Z" fill="${c2}" opacity="0.9"/>
          <rect x="1206" y="565" width="56" height="54" fill="${c1}" opacity="0.34"/>
          <rect x="1328" y="565" width="48" height="52" fill="${c1}" opacity="0.30"/>
        `;
      } else if (kind === 'snow') {
        body = `
          <circle cx="1280" cy="190" r="78" fill="${c1}" opacity="0.18"/>
          <path d="M1090 640 L1180 350 L1280 640 Z" fill="${c2}" opacity="0.88"/>
          <path d="M1200 650 L1320 315 L1430 650 Z" fill="${c2}" opacity="0.86"/>
          <path d="M1152 458 L1180 350 L1205 458 Z" fill="#ffffff" opacity="0.58"/>
          <path d="M1274 450 L1320 315 L1360 450 Z" fill="#ffffff" opacity="0.62"/>
        `;
      } else if (kind === 'bloodmoon') {
        body = `
          <circle cx="1280" cy="188" r="95" fill="${c1}" opacity="0.24"/>
          <path d="M1060 640 C1125 600 1162 560 1205 500 C1245 444 1282 420 1334 396 C1376 376 1425 334 1498 252" fill="none" stroke="${c2}" stroke-width="18" stroke-linecap="round" opacity="0.44"/>
          <path d="M1115 635 L1168 560 L1220 635 Z" fill="${c2}" opacity="0.88"/>
        `;
      } else if (kind === 'chapel') {
        body = `
          <circle cx="1280" cy="200" r="82" fill="${c1}" opacity="0.18"/>
          <rect x="1188" y="348" width="180" height="270" rx="8" fill="${c2}" opacity="0.9"/>
          <rect x="1247" y="292" width="60" height="94" fill="${c2}" opacity="0.86"/>
          <rect x="1268" y="240" width="18" height="54" fill="${c2}" opacity="0.82"/>
          <rect x="1234" y="440" width="88" height="20" fill="${c1}" opacity="0.28"/>
          <rect x="1268" y="408" width="20" height="84" fill="${c1}" opacity="0.28"/>
        `;
      } else if (kind === 'gate') {
        body = `
          <circle cx="1280" cy="208" r="88" fill="${c1}" opacity="0.21"/>
          <rect x="1162" y="368" width="26" height="294" fill="${c2}" opacity="0.88"/>
          <rect x="1372" y="368" width="26" height="294" fill="${c2}" opacity="0.88"/>
          <rect x="1114" y="330" width="336" height="32" rx="8" fill="${c2}" opacity="0.86"/>
          <rect x="1088" y="296" width="390" height="28" rx="10" fill="${c2}" opacity="0.78"/>
          <path d="M1218 390 L1342 390 L1306 650 L1254 650 Z" fill="${c2}" opacity="0.58"/>
        `;
      }
      return svgUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
          ${body}
        </svg>
      `);
    }

    const THEMES = {
      1: { name: 'Dojo Dusk',
        bg: [
          layerSky('#2d1c12', '#4e3322', '#865b35', '#22150e', '#000000'),
          motifSvg('dojo', '#ffc87c', '#1e1108'),
          'linear-gradient(180deg, transparent 50%, #20120b 78%, #080301 100%)'
        ],
        filter: ''
      },
      2: { name: 'Moon Bamboo',
        bg: [
          layerSky('#121e1a', '#243a2f', '#426853', '#16241f', '#000000'),
          motifSvg('bamboo', '#70ccaa', '#0a1611'),
          'linear-gradient(180deg, transparent 50%, #0c1813 78%, #030805 100%)'
        ],
        filter: ''
      },
      3: { name: 'Ruined Shrine',
        bg: [
          layerSky('#2a1a2b', '#482f4c', '#724b7a', '#1e1120', '#000000'),
          motifSvg('shrine', '#dca6e4', '#140816'),
          'linear-gradient(180deg, transparent 50%, #160a18 78%, #050109 100%)'
        ],
        filter: ''
      },
      4: { name: 'Dust Canyon',
        bg: [
          layerSky('#2b1c12', '#4f311c', '#835332', '#21130a', '#000000'),
          motifSvg('canyon', '#ffa164', '#1a0d04'),
          'linear-gradient(180deg, transparent 50%, #1c0e05 78%, #080300 100%)'
        ],
        filter: ''
      },
      5: { name: 'Alien Ruins',
        bg: [
          layerSky('#161026', '#2b1e4c', '#4b3582', '#140c26', '#000000'),
          motifSvg('alien', '#ac8bf8', '#0c071a'),
          'linear-gradient(180deg, transparent 50%, #100822 78%, #03010b 100%)'
        ],
        filter: ''
      },
      6: { name: 'Ash Camp Stormland',
        bg: [
          layerSky('#1f1f26', '#353540', '#565668', '#171720', '#000000'),
          motifSvg('camp', '#aab0cc', '#0e0e16'),
          'linear-gradient(180deg, transparent 50%, #101018 78%, #030307 100%)'
        ],
        filter: ''
      },
      7: { name: 'Frost Ridge',
        bg: [
          layerSky('#101824', '#1c2e44', '#2d4b6c', '#0c1624', '#000000'),
          motifSvg('snow', '#8ec4ff', '#060f1c'),
          'linear-gradient(180deg, transparent 50%, #081220 78%, #010408 100%)'
        ],
        filter: ''
      },
      8: { name: 'Blood Moon',
        bg: [
          layerSky('#260d0d', '#4c1a1a', '#7f2a2a', '#200707', '#000000'),
          motifSvg('bloodmoon', '#ff7878', '#1c0303'),
          'linear-gradient(180deg, transparent 50%, #180303 78%, #060000 100%)'
        ],
        filter: ''
      },
      9: { name: 'Null Chapel',
        bg: [
          layerSky('#1a1a1f', '#2f2f38', '#4c4c5a', '#14141a', '#000000'),
          motifSvg('chapel', '#abb0cc', '#0c0c12'),
          'linear-gradient(180deg, transparent 50%, #0e0e14 78%, #030305 100%)'
        ],
        filter: ''
      },
      10: { name: 'War Gate',
        bg: [
          layerSky('#24101e', '#401c35', '#6c2f5a', '#1c0c18', '#000000'),
          motifSvg('gate', '#e28adc', '#180614'),
          'linear-gradient(180deg, transparent 50%, #160512 78%, #040003 100%)'
        ],
        filter: ''
      }
    };

    function getWallpaperChapter() {
      if (typeof window.currentPart !== 'undefined' && typeof window.getChapterFromPart === 'function') {
        return Math.max(1, Math.min(10, window.getChapterFromPart(window.currentPart) || 1));
      }
      if (typeof window.activeChapter !== 'undefined') {
        return Math.max(1, Math.min(10, window.activeChapter || 1));
      }
      return 1;
    }

    function ensureWallpaperEl() {
      let el = document.getElementById('chapter-wallpaper');
      if (!el) {
        const bg = document.getElementById('bg-layer');
        if (bg) {
          el = document.createElement('div');
          el.id = 'chapter-wallpaper';
          bg.insertBefore(el, bg.firstChild);
        }
      }
      return el;
    }

    function applyChapterWallpaper(chapter) {
      const ch = Math.max(1, Math.min(10, parseInt(chapter || 1, 10) || 1));
      const theme = THEMES[ch] || THEMES[1];
      const el = ensureWallpaperEl();
      if (!el) return;

      const fallbackLayers = theme.bg.join(',');
      el.style.backgroundImage = fallbackLayers;
      if (theme.filter) el.style.filter = theme.filter;
      else el.style.filter = '';
      el.dataset.chapter = String(ch);
      document.documentElement.style.setProperty('--chapter-theme-name', `"${theme.name}"`);

      const lbl = document.getElementById('ct-chapter-lbl');
      if (lbl && !lbl.dataset.v42Patched) {
        lbl.dataset.v42Patched = '1';
        lbl.title = 'Active wallpaper theme: ' + theme.name;
      }

      if (typeof window.chugFirstAvailableAsset === 'function' && window.CHUG_ASSETS && typeof window.CHUG_ASSETS.wallpaperCandidates === 'function') {
        const reqId = `${ch}:${Date.now()}:${Math.random()}`;
        el.dataset.wallpaperReq = reqId;
        window.chugFirstAvailableAsset(window.CHUG_ASSETS.wallpaperCandidates(ch), 'image').then(url => {
          if (!url || !el || el.dataset.wallpaperReq !== reqId) return;
          el.style.backgroundImage = [
            'linear-gradient(180deg,rgba(8,10,16,0.16) 0%,rgba(8,10,16,0.34) 58%,rgba(6,7,12,0.56) 100%)',
            `url("${url}")`
          ].join(',');
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center center';
          el.style.backgroundRepeat = 'no-repeat';
          document.documentElement.style.setProperty('--chapter-theme-name', `"${theme.name} • external"`);
          if (lbl) lbl.title = 'Active wallpaper theme: ' + theme.name + ' (external image)';
        }).catch(() => {});
      }
    }

    function syncChapterWallpaper() {
      applyChapterWallpaper(getWallpaperChapter());
    }

    // Wrap state changers
    const _origApplyPartBg = window.applyPartBg;
    if (typeof _origApplyPartBg === 'function' && !window.__v42ChapterBgWrapped) {
      window.__v42ChapterBgWrapped = true;
      window.applyPartBg = function(part) {
        const out = _origApplyPartBg.apply(this, arguments);
        try {
          const ch = (typeof window.getChapterFromPart === 'function') ? window.getChapterFromPart(part) : Math.ceil((part || 1) / 5);
          applyChapterWallpaper(ch);
        } catch (_e) {
          syncChapterWallpaper();
        }
        return out;
      };
    }

    const _origShowScreen = window.showScreen;
    if (typeof _origShowScreen === 'function' && !window.__v42ShowScreenWrapped) {
      window.__v42ShowScreenWrapped = true;
      window.showScreen = function(id) {
        const out = _origShowScreen.apply(this, arguments);
        try {
          if (id === 'worlddetail-screen' || id === 'story-screen' || id === 'hud-screen' ||
             id === 'worldmap-screen' || id === 'chapter-screen' || id === 'act1-screen' || id === 'act2-screen' ||
             id === 'menu-screen') {
            syncChapterWallpaper();
          }
        } catch (_e) {}
        return out;
      };
    }

    const _origOpenAct = window.openAct;
    if (typeof _origOpenAct === 'function' && !window.__v42OpenActWrapped) {
      window.__v42OpenActWrapped = true;
      window.openAct = function(act) {
        const out = _origOpenAct.apply(this, arguments);
        try {
          const ch = act === 1 ? 1 : (act === 2 ? 3 : getWallpaperChapter());
          applyChapterWallpaper(ch);
        } catch (_e) {}
        return out;
      };
    }

    const _origStartChapter = window.startChapter;
    if (typeof _origStartChapter === 'function' && !window.__v42StartChapterWrapped) {
      window.__v42StartChapterWrapped = true;
      window.startChapter = function(ch) {
        try { applyChapterWallpaper(ch); } catch (_e) {}
        return _origStartChapter.apply(this, arguments);
      };
    }

    window.applyChapterWallpaper = applyChapterWallpaper;
    window.syncChapterWallpaper = syncChapterWallpaper;
    window.CHAPTER_WALLPAPER_THEMES = THEMES;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncChapterWallpaper, { once: true });
    } else {
      syncChapterWallpaper();
    }
    setTimeout(syncChapterWallpaper, 120);
  })();
}
