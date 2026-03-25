(function(){
  const screen = document.getElementById('shop-screen');
  const wrap = screen && screen.querySelector('.shop-wrap');
  if(!screen || !wrap) return;

  let root = document.getElementById('armoryV59Mount');
  if(!root){
    root = document.createElement('div');
    root.id = 'armoryV59Mount';
    wrap.appendChild(root);
  }

  const ORDER = ['weapon','armor','helmet','range','magic','upgrade'];
  const CAT_META = {
    weapon:{ label:'Weapon', icon:'⚔', unlockAct:1 },
    armor:{ label:'Armor', icon:'🛡', unlockAct:1 },
    helmet:{ label:'Helmet', icon:'⛑', unlockAct:1 },
    range:{ label:'Range', icon:'🏹', unlockAct:3 },
    magic:{ label:'Magic', icon:'✦', unlockAct:4 },
    upgrade:{ label:'Upgrade', icon:'⬆', unlockAct:1 },
  };

  const ARMORY_ITEMS = {
    weapon: [
      { id:'knuckle', name:'Iron Knuckles', icon:'🥊', currency:'coin', price:100, requiredAct:1, desc:'Brass close-range pressure.', line:'+6 ATK · Fast hands', stats:{ atk:6 } },
      { id:'sword', name:'Iron Sword', icon:'⚔️', currency:'coin', price:80, requiredAct:1, desc:'Balanced entry blade.', line:'+8 ATK · Balanced', stats:{ atk:8, spd:0.8 } },
      { id:'dagger', name:'Void Dagger', icon:'🗡️', currency:'coin', price:250, requiredAct:1, desc:'Short blade with fast recovery.', line:'+8 ATK · +SPD', stats:{ atk:8, spd:2 } },
      { id:'nunchaku', name:'Void Nunchaku', icon:'🔗', currency:'coin', price:240, requiredAct:1, desc:'Fast chained tempo weapon.', line:'+7 ATK · Fastest', stats:{ atk:7, spd:2.2 } },
      { id:'knives', name:'Twin Knives', icon:'🔪', currency:'coin', price:200, requiredAct:1, desc:'Dual pressure and triple cuts.', line:'+6 ATK · +SPD', stats:{ atk:6, spd:2 } },
      { id:'katana', name:'Shadow Katana', icon:'⚔️', currency:'coin', price:420, requiredAct:1, desc:'Long arc slash with refined form.', line:'+11 ATK · Reach', stats:{ atk:11, spd:1 } },
      { id:'staff', name:'Monk Staff', icon:'🪄', currency:'coin', price:360, requiredAct:1, desc:'Wide sweep reach and spacing control.', line:'+7 ATK · Reach', stats:{ atk:7, spd:0.5 } },
      { id:'claws', name:'Void Claws', icon:'🔱', currency:'coin', price:380, requiredAct:1, desc:'Short burst flurry weapon.', line:'+7 ATK · +SPD', stats:{ atk:7, spd:2.5 } },
      { id:'spear', name:'Shadow Spear', icon:'📍', currency:'coin', price:380, requiredAct:2, desc:'Long piercing line weapon.', line:'+12 ATK · Long reach', stats:{ atk:12, spd:-0.5 } },
      { id:'hammer', name:'Doom Hammer', icon:'🔨', currency:'coin', price:480, requiredAct:2, desc:'Crushing impact with slow recovery.', line:'+13 ATK · Heavy', stats:{ atk:13, spd:-0.5 } },
      { id:'scythe', name:'Shadow Scythe', icon:'☽', currency:'coin', price:650, requiredAct:2, desc:'Massive death-arc spacing control.', line:'+14 ATK · Massive reach', stats:{ atk:14, spd:-1 } },
      { id:'whip', name:'Void Whip', icon:'〰️', currency:'gem', price:8, requiredAct:3, desc:'Flexible lash with hard-to-read arc.', line:'+9 ATK · Gem gear', stats:{ atk:9, spd:1 } }
    ],
    armor: [
      { id:'lightarmor', name:'Shadow Gi', icon:'🥋', currency:'coin', price:180, requiredAct:1, desc:'Flexible light body gear.', line:'+25 HP · +3 DEF', stats:{ hp:25, def:3 } },
      { id:'heavyarmor', name:'Titan Armor', icon:'🛡️', currency:'coin', price:420, requiredAct:1, desc:'Heavy plating for hard fights.', line:'+50 HP · +6 DEF', stats:{ hp:50, def:6, spd:-0.8 } },
      { id:'voidarmor', name:'Void Shroud', icon:'🌑', currency:'gem', price:5, requiredAct:2, desc:'Dense void weave that resists impact.', line:'+70 HP · +9 DEF', stats:{ hp:70, def:9, spd:-0.5 } }
    ],
    helmet: [
      { id:'headband', name:'War Headband', icon:'🎴', currency:'coin', price:120, requiredAct:1, desc:'Simple fighter focus gear.', line:'+2 ATK · +1 DEF', stats:{ atk:2, def:1, spd:0.3 } },
      { id:'ironguard', name:'Iron Guard', icon:'⛑️', currency:'coin', price:280, requiredAct:1, desc:'Guard helm for steadier defense.', line:'+18 HP · +2 DEF', stats:{ hp:18, def:2, spd:-0.1 } },
      { id:'onihelm', name:'Oni Helm', icon:'👹', currency:'gem', price:4, requiredAct:2, desc:'Horned helm with brutal presence.', line:'+30 HP · +4 DEF', stats:{ hp:30, def:4, atk:3, spd:-0.25 } }
    ],
    range: [
      { id:'throwknife', name:'Throw Knife', icon:'🔪', currency:'coin', price:260, requiredAct:3, desc:'Short-range backup projectile.', line:'Range loadout · Fast', stats:{ atk:1 } },
      { id:'bow', name:'Shadow Bow', icon:'🏹', currency:'coin', price:460, requiredAct:3, desc:'Long draw, strong precision.', line:'Range loadout · Long', stats:{ atk:2 } },
      { id:'counterbow', name:'Counter Bow', icon:'🏹', currency:'gem', price:6, requiredAct:4, desc:'Sharper counter-fire bow.', line:'Range loadout · Counter', stats:{ atk:3 } },
      { id:'crossbow', name:'Void Crossbow', icon:'🎯', currency:'gem', price:9, requiredAct:5, desc:'Compact brutal ranged finisher.', line:'Range loadout · Burst', stats:{ atk:4 } }
    ],
    magic: [
      { id:'embersigil', name:'Ember Sigil', icon:'🔥', currency:'coin', price:520, requiredAct:4, desc:'Heat mark that sharpens impact.', line:'+2 ATK aura', stats:{ atk:2 } },
      { id:'voidsigil', name:'Void Sigil', icon:'🜂', currency:'gem', price:7, requiredAct:4, desc:'Void seal that hardens stance.', line:'+3 DEF aura', stats:{ def:3 } },
      { id:'bloodoath', name:'Blood Oath', icon:'🩸', currency:'gem', price:11, requiredAct:5, desc:'Risk-heavy mark that feeds offense.', line:'+4 ATK · +20 HP', stats:{ atk:4, hp:20 } }
    ],
    upgrade: [
      { id:'rage2', name:'Rage Mode II', icon:'🔥', currency:'coin', price:700, requiredAct:1, desc:'Unlocks Blood Rage tier visuals and power.', line:'Legacy unlock', legacy:'rage2' },
      { id:'strength', name:'Strength I', icon:'💪', currency:'coin', price:400, requiredAct:1, desc:'Legacy base damage upgrade.', line:'+5 ATK', legacy:'strength' },
      { id:'strength2', name:'Strength II', icon:'⚡', currency:'coin', price:800, requiredAct:1, desc:'Second strength step. Requires Strength I.', line:'+15 ATK total', legacy:'strength2' },
      { id:'speed', name:'Speed I', icon:'💨', currency:'coin', price:350, requiredAct:1, desc:'Legacy mobility and attack speed upgrade.', line:'+2 SPD', legacy:'speed' },
      { id:'speed2', name:'Speed II', icon:'🌪️', currency:'coin', price:700, requiredAct:1, desc:'Second speed step. Requires Speed I.', line:'+4 SPD total', legacy:'speed2' },
      { id:'endurance', name:'Endurance I', icon:'❤️', currency:'coin', price:450, requiredAct:1, desc:'Legacy health and regen upgrade.', line:'+30 HP', legacy:'endurance' },
      { id:'endurance2', name:'Endurance II', icon:'💎', currency:'coin', price:900, requiredAct:1, desc:'Second endurance step. Requires Endurance I.', line:'+70 HP total', legacy:'endurance2' }
    ]
  };

  let armorySelectedCategory = 'weapon';
  let armorySelectedItemId = 'knuckle';
  let armoryFlashUntil = 0;

  function now(){ return Date.now(); }
  function currentAct(){
    return Number((window.__saveData && window.__saveData.currentPart) || window.currentPart || 1) || 1;
  }
  function getGemsCount(){
    return typeof _gems !== 'undefined' ? _gems : Number((window.__saveData && window.__saveData._gems) || 0) || 0;
  }
  function coinLabel(v){ return '🪙 ' + v; }
  function gemLabel(v){ return '💎 ' + v; }
  function escapeHtml(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }
  function uniquePush(arr, id){
    if(!id || id === 'none') return;
    if(!arr.includes(id)) arr.push(id);
  }
  function getItem(cat, id){
    return (ARMORY_ITEMS[cat] || []).find(x => x.id === id) || null;
  }
  function categoryLocked(cat){
    if(cat === 'range') return currentAct() < 3;
    if(cat === 'magic') return currentAct() < 4;
    return false;
  }
  function itemLocked(item){
    if(!item) return true;
    return currentAct() < Number(item.requiredAct || 1);
  }
  function legacyUpgradeOwned(id){
    if(id === 'rage2') return (typeof rageMode2 !== 'undefined' ? !!rageMode2 : false);
    if(id === 'strength') return (typeof strengthUpg !== 'undefined' ? strengthUpg : 0) >= 1;
    if(id === 'strength2') return (typeof strengthUpg !== 'undefined' ? strengthUpg : 0) >= 2;
    if(id === 'speed') return (typeof speedUpg !== 'undefined' ? speedUpg : 0) >= 1;
    if(id === 'speed2') return (typeof speedUpg !== 'undefined' ? speedUpg : 0) >= 2;
    if(id === 'endurance') return (typeof enduranceUpg !== 'undefined' ? enduranceUpg : 0) >= 1;
    if(id === 'endurance2') return (typeof enduranceUpg !== 'undefined' ? enduranceUpg : 0) >= 2;
    return false;
  }
  function ensureArmoryState(){
    const save = window.__saveData || (window.__saveData = {});
    const arm = save.armory || {};
    arm.owned = Object.assign({
      weapon:[], armor:[], helmet:[], range:[], magic:[], upgrade:[]
    }, arm.owned || {});
    arm.equipped = Object.assign({
      weapon:(typeof weapon !== 'undefined' ? weapon : (save.weapon || 'none')) || 'none',
      armor:(typeof armor !== 'undefined' ? armor : (save.armor || 'none')) || 'none',
      helmet:save.helmet || ((arm.equipped && arm.equipped.helmet) || 'none'),
      range:(typeof getRangedWeapon === 'function' ? getRangedWeapon() : (save.rangedWeapon || ((arm.equipped && arm.equipped.range) || 'none'))) || 'none',
      magic:save.magicLoadout || ((arm.equipped && arm.equipped.magic) || 'none') || 'none'
    }, arm.equipped || {});
    arm.levels = Object.assign({}, arm.levels || {});

    uniquePush(arm.owned.weapon, arm.equipped.weapon);
    uniquePush(arm.owned.armor, arm.equipped.armor);
    uniquePush(arm.owned.helmet, arm.equipped.helmet);
    uniquePush(arm.owned.range, arm.equipped.range);
    uniquePush(arm.owned.magic, arm.equipped.magic);

    ARMORY_ITEMS.upgrade.forEach(function(upg){
      if(legacyUpgradeOwned(upg.id)) uniquePush(arm.owned.upgrade, upg.id);
    });

    save.armory = arm;
    if(!getItem(armorySelectedCategory, armorySelectedItemId)){
      armorySelectedCategory = ORDER.find(function(cat){ return !categoryLocked(cat); }) || 'weapon';
      armorySelectedItemId = ((ARMORY_ITEMS[armorySelectedCategory] || [])[0] || {}).id || '';
    }
    return arm;
  }
  function commitArmory(arm, extra){
    const merged = Object.assign({
      armory: arm,
      helmet: arm.equipped.helmet || 'none',
      magicLoadout: arm.equipped.magic || 'none'
    }, extra || {});
    if(typeof saveGame === 'function') saveGame(merged);
    else {
      window.__saveData = Object.assign({}, window.__saveData || {}, merged);
      try{ localStorage.setItem('chug_shadow_v3_save', JSON.stringify(window.__saveData)); }catch(_){}
    }
  }
  function eqForCategory(cat){
    const arm = ensureArmoryState();
    if(cat === 'weapon') return (typeof weapon !== 'undefined' ? weapon : arm.equipped.weapon) || 'none';
    if(cat === 'armor') return (typeof armor !== 'undefined' ? armor : arm.equipped.armor) || 'none';
    if(cat === 'range') return (typeof getRangedWeapon === 'function' ? getRangedWeapon() : arm.equipped.range) || 'none';
    return (arm.equipped[cat] || 'none');
  }
  function itemOwned(item){
    if(!item) return false;
    if(item.category === 'upgrade') return legacyUpgradeOwned(item.id);
    const arm = ensureArmoryState();
    const owned = arm.owned[item.category] || [];
    return owned.includes(item.id) || eqForCategory(item.category) === item.id;
  }
  function getGearLevel(id){
    const arm = ensureArmoryState();
    return Number((arm.levels && arm.levels[id]) || 0) || 0;
  }
  function maxUpgradeLevel(item){
    if(!item || item.category === 'upgrade') return 0;
    return 3;
  }
  function upgradeStars(id){
    const level = getGearLevel(id);
    let out = '';
    for(let i=0;i<3;i++) out += i < level ? '★' : '☆';
    return out;
  }
  function priceLabel(item, type){
    const cls = type || item.currency || 'coin';
    return '<span class="armory-price ' + cls + '">' + escapeHtml(cls === 'gem' ? gemLabel(item.price) : coinLabel(item.price)) + '</span>';
  }
  function getPreviewLoadout(item){
    const arm = ensureArmoryState();
    const eq = Object.assign({}, arm.equipped);
    if(item && item.category !== 'upgrade') eq[item.category] = item.id;
    return eq;
  }
  function numeric(val){
    return Number(val || 0) || 0;
  }
  function computeStats(loadout){
    const arm = ensureArmoryState();
    const stats = { atk:10, spd:7.5, hp:150, def:0 };

    const w = getItem('weapon', loadout.weapon);
    const a = getItem('armor', loadout.armor);
    const h = getItem('helmet', loadout.helmet);
    const m = getItem('magic', loadout.magic);

    [w,a,h,m].forEach(function(it){
      if(!it || !it.stats) return;
      stats.atk += numeric(it.stats.atk);
      stats.spd += numeric(it.stats.spd);
      stats.hp  += numeric(it.stats.hp);
      stats.def += numeric(it.stats.def);
    });

    if((typeof strengthUpg !== 'undefined' ? strengthUpg : 0) === 1) stats.atk += 5;
    else if((typeof strengthUpg !== 'undefined' ? strengthUpg : 0) >= 2) stats.atk += 15;
    if((typeof speedUpg !== 'undefined' ? speedUpg : 0) === 1) stats.spd += 2;
    else if((typeof speedUpg !== 'undefined' ? speedUpg : 0) >= 2) stats.spd += 4;
    if((typeof enduranceUpg !== 'undefined' ? enduranceUpg : 0) === 1) stats.hp += 30;
    else if((typeof enduranceUpg !== 'undefined' ? enduranceUpg : 0) >= 2) stats.hp += 70;

    const weaponLevel = getGearLevel(loadout.weapon);
    const armorLevel = getGearLevel(loadout.armor);
    const helmetLevel = getGearLevel(loadout.helmet);
    const rangeLevel = getGearLevel(loadout.range);
    const magicLevel = getGearLevel(loadout.magic);

    stats.atk += weaponLevel * 2 + rangeLevel * 1 + magicLevel * 1;
    stats.def += armorLevel * 1 + helmetLevel * 1 + magicLevel * 1;
    stats.hp += armorLevel * 10 + helmetLevel * 6;
    stats.spd += weaponLevel * 0.15;

    stats.atk = Math.round(stats.atk * 10) / 10;
    stats.spd = Math.round(stats.spd * 10) / 10;
    stats.hp  = Math.round(stats.hp);
    stats.def = Math.round(stats.def * 10) / 10;
    return stats;
  }
  function formatStat(v){
    return Math.abs(v - Math.round(v)) < 0.001 ? String(Math.round(v)) : v.toFixed(1);
  }
  function diffHtml(cur, next){
    const d = Math.round((next - cur) * 10) / 10;
    if(Math.abs(d) < 0.001) return '';
    const cls = d > 0 ? 'pos' : 'neg';
    const sign = d > 0 ? '+' : '';
    return ' <span class="armory-stat-delta ' + cls + '">(' + sign + formatStat(d) + ')</span>';
  }
  function spendCurrency(currency, amount){
    currency = currency || 'coin';
    amount = Number(amount) || 0;
    if(currency === 'gem'){
      if(getGemsCount() < amount){
        if(typeof shopToast === 'function') shopToast('NOT ENOUGH GEMS 💎', '#cc88ff');
        return false;
      }
      if(typeof updateGems === 'function') updateGems(-amount);
      else return false;
      return true;
    }
    if((typeof coins !== 'undefined' ? coins : 0) < amount){
      if(typeof shopToast === 'function') shopToast('NOT ENOUGH COINS', '#ff003c');
      return false;
    }
    if(typeof updateCoins === 'function') updateCoins(-amount);
    else return false;
    return true;
  }
  function upgradeCost(item){
    const lv = getGearLevel(item.id);
    const mult = item.currency === 'gem' ? 0.5 : 0.6;
    const raw = item.price * mult * (lv + 1);
    return Math.max(item.currency === 'gem' ? 1 : 90, Math.round(raw));
  }
  function maybeFlashPreview(){
    armoryFlashUntil = now() + 420;
  }
  function selectCategory(cat){
    armorySelectedCategory = cat;
    const list = ARMORY_ITEMS[cat] || [];
    armorySelectedItemId = (list[0] && list[0].id) || '';
    renderArmoryUI();
  }
  function selectItem(id){
    armorySelectedItemId = id;
    renderArmoryUI();
  }

  function buyOrUnlockSelected(item){
    if(!item || itemLocked(item) || categoryLocked(item.category)) return;
    if(item.category === 'upgrade'){
      if(legacyUpgradeOwned(item.id)){
        if(typeof shopToast === 'function') shopToast('ALREADY OWNED', '#8fd672');
        return;
      }
      if(typeof buyItem === 'function'){
        buyItem('upgrade', item.id, item.price, item.currency || 'coin');
      }
      const arm = ensureArmoryState();
      uniquePush(arm.owned.upgrade, item.id);
      commitArmory(arm);
      renderArmoryUI();
      return;
    }

    const arm = ensureArmoryState();
    if(itemOwned(item)){
      equipSelected(item);
      return;
    }
    if(!spendCurrency(item.currency, item.price)) return;

    uniquePush(arm.owned[item.category], item.id);
    arm.equipped[item.category] = item.id;

    if(item.category === 'weapon'){
      weapon = item.id;
    } else if(item.category === 'armor'){
      armor = item.id;
    } else if(item.category === 'range'){
      if(typeof setRangedWeapon === 'function' && (item.id === 'none' || (window.RANGED_WEAPON_DATA && window.RANGED_WEAPON_DATA[item.id]))){
        setRangedWeapon(item.id);
      }
    }

    commitArmory(arm);
    maybeFlashPreview();
    if(typeof shopToast === 'function'){
      const msg = item.category === 'magic' ? '✓ MAGIC ATTUNED: ' + item.name.toUpperCase()
                : item.category === 'helmet' ? '✓ HELMET EQUIPPED: ' + item.name.toUpperCase()
                : item.category === 'range' ? '✓ RANGE EQUIPPED: ' + item.name.toUpperCase()
                : '✓ EQUIPPED: ' + item.name.toUpperCase();
      shopToast(msg, item.currency === 'gem' ? '#cc88ff' : '#f5c842');
    }
    renderArmoryUI();
  }

  function equipSelected(item){
    if(!item || item.category === 'upgrade' || !itemOwned(item) || itemLocked(item) || categoryLocked(item.category)) return;
    const arm = ensureArmoryState();
    arm.equipped[item.category] = item.id;
    if(item.category === 'weapon'){
      weapon = item.id;
    } else if(item.category === 'armor'){
      armor = item.id;
    } else if(item.category === 'range'){
      if(typeof setRangedWeapon === 'function' && (item.id === 'none' || (window.RANGED_WEAPON_DATA && window.RANGED_WEAPON_DATA[item.id]))){
        setRangedWeapon(item.id);
      }
    }
    commitArmory(arm);
    maybeFlashPreview();
    if(typeof shopToast === 'function') shopToast('✓ EQUIPPED: ' + item.name.toUpperCase(), '#f5c842');
    renderArmoryUI();
  }

  function upgradeSelected(item){
    if(!item || item.category === 'upgrade') return;
    if(itemLocked(item) || categoryLocked(item.category) || !itemOwned(item)) return;
    const max = maxUpgradeLevel(item);
    const arm = ensureArmoryState();
    const lv = getGearLevel(item.id);
    if(lv >= max){
      if(typeof shopToast === 'function') shopToast('MAX UPGRADE', '#8fd672');
      return;
    }
    const cost = upgradeCost(item);
    if(!spendCurrency(item.currency, cost)) return;
    arm.levels[item.id] = lv + 1;
    commitArmory(arm);
    maybeFlashPreview();
    if(typeof shopToast === 'function') shopToast('UPGRADE +' + (lv + 1), item.currency === 'gem' ? '#cc88ff' : '#f5c842');
    renderArmoryUI();
  }

  function buildCategoryRail(){
    return ORDER.map(function(cat){
      const meta = CAT_META[cat];
      const locked = categoryLocked(cat);
      return '<button class="armory-cat-btn ' + (armorySelectedCategory === cat ? 'selected ' : '') + (locked ? 'locked' : '') + '" data-cat="' + cat + '">' +
        '<span class="i">' + meta.icon + '</span>' +
        '<span class="t">' + escapeHtml(meta.label) + '</span>' +
        (locked ? '<span class="armory-cat-lock">🔒</span><span class="armory-cat-unlock">Act ' + meta.unlockAct + '</span>' : '') +
      '</button>';
    }).join('');
  }

  function buildItemList(){
    const items = (ARMORY_ITEMS[armorySelectedCategory] || []).map(function(it){
      return Object.assign({ category: armorySelectedCategory }, it);
    });
    if(!items.length){
      return '<div class="armory-empty-note">No gear in this category.</div>';
    }
    return items.map(function(item){
      const owned = itemOwned(item);
      const locked = itemLocked(item) || categoryLocked(item.category);
      const equipped = item.category !== 'upgrade' && eqForCategory(item.category) === item.id;
      const selected = armorySelectedItemId === item.id;
      const badge = locked
        ? '<span class="armory-state-badge locked">Locked</span>'
        : equipped
          ? '<span class="armory-state-badge eq">Equipped</span>'
          : owned
            ? '<span class="armory-state-badge owned">Owned</span>'
            : '';
      const upgrade = item.category !== 'upgrade'
        ? '<div class="armory-upgrade-stars">' + upgradeStars(item.id) + '</div>'
        : '';
      return '<div class="armory-item-row ' + (selected ? 'selected ' : '') + (owned ? 'owned ' : '') + (equipped ? 'equipped ' : '') + (locked ? 'locked ' : '') + '" data-item="' + item.id + '">' +
        '<div class="armory-item-icon">' + item.icon + '</div>' +
        '<div class="armory-item-main">' +
          '<div class="armory-item-name">' + escapeHtml(item.name) + '</div>' +
          '<div class="armory-item-desc">' + escapeHtml(item.line || item.desc || '') + '</div>' +
          '<div class="armory-item-tags">' +
            '<span class="armory-tag">Act ' + (item.requiredAct || 1) + '</span>' +
            (locked ? '<span class="armory-tag lock">Unlock in Act ' + (item.requiredAct || 1) + '</span>' : '') +
            (item.category !== 'upgrade' ? '<span class="armory-tag">' + upgradeStars(item.id) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="armory-item-side">' +
          priceLabel(item, item.currency) +
          badge +
          upgrade +
        '</div>' +
      '</div>';
    }).join('');
  }


function buildActions(item){
  if(!item){
    return '<div class="armory-locked-note">No item selected.</div>';
  }
  const locked = itemLocked(item) || categoryLocked(item.category);
  if(locked){
    return '<div class="armory-locked-note">Locked until Act ' + (item.requiredAct || CAT_META[item.category].unlockAct || 1) + '</div>';
  }
  if(item.category === 'upgrade'){
    const owned = legacyUpgradeOwned(item.id);
    return '<div class="armory-bottom-actions">' +
      '<button class="armory-action-btn primary" id="armoryPrimaryBtn" ' + (owned ? 'disabled' : '') + '>' + (owned ? 'Owned' : 'Buy') + '</button>' +
    '</div>';
  }
  const owned = itemOwned(item);
  const equipped = eqForCategory(item.category) === item.id;
  const level = getGearLevel(item.id);
  const max = maxUpgradeLevel(item);
  let html = '<div class="armory-bottom-actions">';
  if(!owned){
    html += '<button class="armory-action-btn primary" id="armoryPrimaryBtn">Buy</button>';
  } else if(equipped){
    html += '<button class="armory-action-btn primary" id="armoryPrimaryBtn" disabled>Equipped</button>';
    html += '<button class="armory-action-btn" id="armorySecondaryBtn" ' + (level >= max ? 'disabled' : '') + '>' + (level >= max ? 'Max' : 'Upgrade') + '</button>';
  } else {
    html += '<button class="armory-action-btn primary" id="armoryPrimaryBtn">Equip</button>';
    html += '<button class="armory-action-btn" id="armorySecondaryBtn" ' + (level >= max ? 'disabled' : '') + '>' + (level >= max ? 'Max' : 'Upgrade') + '</button>';
  }
  html += '</div>';
  return html;
}

  function buildBottomNote(item){
    if(!item) return 'Select a gear slot.';
    const locked = itemLocked(item) || categoryLocked(item.category);
    if(locked) return 'Locked gear is visible now and opens automatically when its act is reached.';
    if(item.category === 'upgrade'){
      return legacyUpgradeOwned(item.id) ? 'Legacy upgrade already active in combat.' : 'Buy this upgrade to activate its existing combat effect.';
    }
    if(!itemOwned(item)) return 'Tap BUY to claim this item with its own currency.';
    if(eqForCategory(item.category) === item.id){
      const max = maxUpgradeLevel(item);
      const lv = getGearLevel(item.id);
      return lv >= max ? 'This item is equipped and fully upgraded.' : 'This item is equipped. Upgrade it for higher stats.';
    }
    return 'Owned gear can be equipped instantly. Upgrades remain on the item permanently.';
  }

  function renderArmoryUI(){
    ensureArmoryState();
    const list = ARMORY_ITEMS[armorySelectedCategory] || [];
    if(!getItem(armorySelectedCategory, armorySelectedItemId)){
      armorySelectedItemId = (list[0] && list[0].id) || '';
    }
    const selected = getItem(armorySelectedCategory, armorySelectedItemId);
    if(selected) selected.category = armorySelectedCategory;

    const arm = ensureArmoryState();
    const previewLoadout = getPreviewLoadout(selected);
    const currentStats = computeStats(arm.equipped);
    const previewStats = computeStats(previewLoadout);
    const previewFlash = now() < armoryFlashUntil;
    const rangePreview = getItem('range', previewLoadout.range);
    const magicPreview = getItem('magic', previewLoadout.magic);

    root.innerHTML =
      '<div class="armory-v59">' +
        '<div class="armory-topbar">' +
          '<div class="armory-top-left">' +
            '<button class="armory-top-back" id="armoryBackBtn">◀</button>' +
            '<div><div class="armory-top-title">ARMORY</div><div class="armory-top-sub">Shop · Inventory · Loadout</div></div>' +
          '</div>' +
          '<div class="armory-wallet">' +
            '<div class="armory-pill coins">🪙 <span>' + (typeof coins !== 'undefined' ? coins : 0) + '</span></div>' +
            '<div class="armory-pill gems">💎 <span>' + getGemsCount() + '</span></div>' +
            '<div class="armory-pill act">ACT <span>' + currentAct() + '</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="armory-main">' +
          '<aside class="armory-rail">' + buildCategoryRail() + '</aside>' +

          '<section class="armory-preview">' +
            '<div class="armory-preview-stage">' +
              '<div class="armory-preview-head">' +
                '<div><div class="label">Preview</div><div class="value">' + escapeHtml(CAT_META[armorySelectedCategory].label) + '</div></div>' +
                '<div class="armory-loadout-badges">' +
                  '<div class="armory-badge">RNG · ' + escapeHtml(rangePreview ? rangePreview.name : 'NONE') + '</div>' +
                  '<div class="armory-badge">ARC · ' + escapeHtml(magicPreview ? magicPreview.name : 'NONE') + '</div>' +
                '</div>' +
              '</div>' +
              '<div class="armory-preview-floor"></div>' +
              '<div class="armory-fighter ' + (previewFlash ? 'flash' : '') + '" data-weapon="' + escapeHtml(previewLoadout.weapon || 'none') + '" data-armor="' + escapeHtml(previewLoadout.armor || 'none') + '" data-helmet="' + escapeHtml(previewLoadout.helmet || 'none') + '" data-range="' + escapeHtml(previewLoadout.range || 'none') + '" data-magic="' + escapeHtml(previewLoadout.magic || 'none') + '">' +
                '<div class="magic-visual"></div>' +
                '<div class="range-visual">' + (rangePreview ? rangePreview.icon : '') + '</div>' +
                '<div class="shadow"></div>' +
                '<div class="head"></div><div class="neck"></div><div class="torso"></div><div class="hips"></div>' +
                '<div class="arm left"></div><div class="arm right"></div>' +
                '<div class="leg left"></div><div class="leg right"></div>' +
                '<div class="foot left"></div><div class="foot right"></div>' +
                '<div class="armor-visual"></div><div class="helmet-visual"></div><div class="weapon-visual"></div>' +
              '</div>' +
            '</div>' +
            '<div class="armory-preview-info">' +
              '<div class="armory-selected-name">' + escapeHtml(selected ? selected.name : 'No Selection') + '</div>' +
              '<div class="armory-selected-sub">' + escapeHtml(selected ? (selected.category.toUpperCase() + ' · ' + (selected.line || '')) : '') + '</div>' +
              '<div class="armory-selected-desc">' + escapeHtml(selected ? selected.desc : 'Select a gear row to inspect it.') + '</div>' +
              '<div class="armory-stat-grid">' +
                '<div class="armory-stat-box"><div class="armory-stat-label">Attack</div><div class="armory-stat-value">' + formatStat(previewStats.atk) + diffHtml(currentStats.atk, previewStats.atk) + '</div></div>' +
                '<div class="armory-stat-box"><div class="armory-stat-label">Defense</div><div class="armory-stat-value">' + formatStat(previewStats.def) + diffHtml(currentStats.def, previewStats.def) + '</div></div>' +
                '<div class="armory-stat-box"><div class="armory-stat-label">Health</div><div class="armory-stat-value">' + formatStat(previewStats.hp) + diffHtml(currentStats.hp, previewStats.hp) + '</div></div>' +
                '<div class="armory-stat-box"><div class="armory-stat-label">Speed</div><div class="armory-stat-value">' + formatStat(previewStats.spd) + diffHtml(currentStats.spd, previewStats.spd) + '</div></div>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="armory-list-panel">' +
            '<div class="armory-list-top">' +
              '<div><div class="armory-list-title">' + escapeHtml(CAT_META[armorySelectedCategory].label) + '</div><div class="armory-list-sub">Scroll down to browse gear</div></div>' +
              '<div class="armory-badge">' + list.length + ' items</div>' +
            '</div>' +
            '<div class="armory-item-list">' + buildItemList() + '</div>' +
          '</section>' +
        '</div>' +

        '<div class="armory-bottom">' +
          '<div class="armory-bottom-info">' +
            '<div class="armory-bottom-name">' + escapeHtml(selected ? selected.name : 'No item') + '</div>' +
            '<div class="armory-bottom-note">' + escapeHtml(buildBottomNote(selected)) + '</div>' +
          '</div>' +
          buildActions(selected) +
        '</div>' +
      '</div>';

    const backBtn = document.getElementById('armoryBackBtn');
    if(backBtn) backBtn.addEventListener('click', function(){
      if(typeof closeShop === 'function') closeShop();
    });

    root.querySelectorAll('.armory-cat-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        const cat = btn.getAttribute('data-cat');
        if(cat) selectCategory(cat);
      });
    });
    root.querySelectorAll('.armory-item-row').forEach(function(row){
      row.addEventListener('click', function(){
        const id = row.getAttribute('data-item');
        if(id) selectItem(id);
      });
    });

    const primary = document.getElementById('armoryPrimaryBtn');
    if(primary && selected){
      primary.addEventListener('click', function(){
        if(selected.category === 'upgrade') buyOrUnlockSelected(selected);
        else if(itemOwned(selected)) equipSelected(selected);
        else buyOrUnlockSelected(selected);
      });
    }
    const secondary = document.getElementById('armorySecondaryBtn');
    if(secondary && selected){
      secondary.addEventListener('click', function(){
        upgradeSelected(selected);
      });
      if(selected.category === 'upgrade') secondary.style.display = 'none';
      else if(maxUpgradeLevel(selected) <= getGearLevel(selected.id)) secondary.textContent = 'Max';
      else secondary.textContent = 'Upgrade ' + (selected.currency === 'gem' ? '(' + gemLabel(upgradeCost(selected)) + ')' : '(' + coinLabel(upgradeCost(selected)) + ')');
    }
  }


function applyArmoryBonusesToPlayer(){
  try{
    if(typeof player === 'undefined' || !player || !player.isP) return;
    const arm = ensureArmoryState();
    const eq = arm.equipped || {};
    const helmet = getItem('helmet', eq.helmet);
    const magic = getItem('magic', eq.magic);
    const extraWeapon = getItem('weapon', eq.weapon);

    const weaponLv = getGearLevel(eq.weapon);
    const armorLv = getGearLevel(eq.armor);
    const helmetLv = getGearLevel(eq.helmet);
    const magicLv = getGearLevel(eq.magic);
    const rangeLv = getGearLevel(eq.range);

    let bonusAtk = weaponLv * 2 + rangeLv;
    let bonusDef = armorLv + helmetLv + magicLv;
    let bonusHp = armorLv * 10 + helmetLv * 6;
    let bonusSpd = weaponLv * 0.15;

    if(extraWeapon && ['sword','nunchaku','knives','spear','whip'].includes(eq.weapon) && extraWeapon.stats){
      bonusAtk += numeric(extraWeapon.stats.atk);
      bonusDef += numeric(extraWeapon.stats.def);
      bonusHp  += numeric(extraWeapon.stats.hp);
      bonusSpd += numeric(extraWeapon.stats.spd);
    }
    if(helmet && helmet.stats){
      bonusAtk += numeric(helmet.stats.atk);
      bonusDef += numeric(helmet.stats.def);
      bonusHp  += numeric(helmet.stats.hp);
      bonusSpd += numeric(helmet.stats.spd);
    }
    if(magic && magic.stats){
      bonusAtk += numeric(magic.stats.atk);
      bonusDef += numeric(magic.stats.def);
      bonusHp  += numeric(magic.stats.hp);
      bonusSpd += numeric(magic.stats.spd);
    }

    player.dmg += bonusAtk;
    player.defense += bonusDef;
    player.spd += bonusSpd;
    player.maxHp += bonusHp;
    player.hp += bonusHp;
  }catch(err){
    console.warn('v59 armory bonus patch failed', err);
  }
}

  const _v59BaseStartRound = typeof startRound === 'function' ? startRound : null;
  if(_v59BaseStartRound && !_v59BaseStartRound.__armoryPatched){
    const patchedStartRound = function(n){
      _v59BaseStartRound.call(this, n);
      applyArmoryBonusesToPlayer();
      if(typeof updateHUD === 'function') updateHUD();
    };
    patchedStartRound.__armoryPatched = true;
    startRound = window.startRound = patchedStartRound;
  }

  const _v59PrevDraw = (typeof Fighter !== 'undefined' && Fighter.prototype && Fighter.prototype.draw) ? Fighter.prototype.draw : null;
  if(_v59PrevDraw && !_v59PrevDraw.__v59ArmoryVisuals){
    Fighter.prototype.draw = function(c){
      _v59PrevDraw.call(this, c);
      if(!this.isP || this.hp <= 0) return;
      const arm = ensureArmoryState();
      const helmet = arm.equipped.helmet || 'none';
      const rangeGear = arm.equipped.range || 'none';
      const magic = arm.equipped.magic || 'none';

      c.save();
      c.translate(this.x + this.w / 2, this.y - this.h * 0.9);

      if(helmet && helmet !== 'none'){
        const fill = helmet === 'headband' ? 'rgba(136,30,24,0.96)'
          : helmet === 'ironguard' ? 'rgba(136,136,144,0.96)'
          : 'rgba(88,88,100,0.96)';
        c.fillStyle = fill;
        c.strokeStyle = 'rgba(255,255,255,0.1)';
        c.lineWidth = 1;
        c.beginPath();
        if(typeof c.roundRect === 'function'){
          c.roundRect(-15, -102, 30, 18, 8);
        } else {
          c.rect(-15, -102, 30, 18);
        }
        c.fill();
        c.stroke();
        if(helmet === 'onihelm'){
          c.fillStyle = 'rgba(235,220,180,0.95)';
          c.beginPath(); c.moveTo(-12,-98); c.lineTo(-6,-108); c.lineTo(-2,-98); c.fill();
          c.beginPath(); c.moveTo(12,-98); c.lineTo(6,-108); c.lineTo(2,-98); c.fill();
        }
      }
      if(rangeGear && rangeGear !== 'none'){
        c.strokeStyle = 'rgba(232,214,170,0.48)';
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(-22,-74);
        c.lineTo(-32,-20);
        c.stroke();
      }
      if(magic && magic !== 'none'){
        const fill = magic === 'embersigil' ? 'rgba(255,112,44,0.12)'
          : magic === 'voidsigil' ? 'rgba(140,96,255,0.12)'
          : 'rgba(220,42,42,0.12)';
        c.fillStyle = fill;
        c.beginPath();
        c.arc(0, -34, 28, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
    };
    Fighter.prototype.draw.__v59ArmoryVisuals = true;
  }

  const _v59OpenShopBase = window.openShop;
  openShop = window.openShop = function(){
    if(typeof initAudio === 'function') initAudio();
    if(typeof loadGame === 'function') loadGame();
    ensureArmoryState();
    if(categoryLocked(armorySelectedCategory)){
      armorySelectedCategory = ORDER.find(function(cat){ return !categoryLocked(cat); }) || 'weapon';
      armorySelectedItemId = ((ARMORY_ITEMS[armorySelectedCategory] || [])[0] || {}).id || '';
    }
    renderArmoryUI();
    const gc = document.getElementById('global-coins');
    const gg = document.getElementById('global-gems');
    const gl = document.getElementById('global-level');
    if(gc) gc.style.setProperty('display','none','important');
    if(gg) gg.style.setProperty('display','none','important');
    if(gl) gl.style.setProperty('display','none','important');
    if(typeof showScreen === 'function') showScreen('shop-screen');
  };

  const _v59CloseShopBase = window.closeShop;
  closeShop = window.closeShop = function(){
    const gc = document.getElementById('global-coins');
    const gg = document.getElementById('global-gems');
    const gl = document.getElementById('global-level');
    if(gc) gc.style.removeProperty('display');
    if(gg) gg.style.removeProperty('display');
    if(gl) gl.style.removeProperty('display');
    return _v59CloseShopBase ? _v59CloseShopBase.call(this) : undefined;
  };

  refreshShopUI = window.refreshShopUI = renderArmoryUI;

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      ensureArmoryState();
      renderArmoryUI();
    });
  } else {
    ensureArmoryState();
    renderArmoryUI();
  }
})();
