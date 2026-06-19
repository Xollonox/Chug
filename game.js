(function(){
  if (window.__sf2NullElement) return;
  var dummy = document.createElement('div');
  dummy.id = '__sf2-null-element';
  dummy.style.display = 'none';
  window.__sf2NullElement = dummy;
  window.__sf2Get = function(id){ return document.getElementById(id) || window.__sf2NullElement; };
})();

// ─────────────────────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════════
//  CAMPAIGN STRUCTURE  (v28 — data-driven, no UI changes)
//
//  Hierarchy:  5 Parts → 1 Chapter │ 2 Chapters → 1 Act │ 2 Acts → 1 World
//
//  Parts 1–5   = Chapter 1,  Act 1, World 1
//  Parts 6–10  = Chapter 2,  Act 1, World 1
//  Parts 11–15 = Chapter 3,  Act 2, World 1
//  Parts 16–20 = Chapter 4,  Act 2, World 1
//  Parts 21–25 = Chapter 5,  Act 3, World 2
//  Parts 26–30 = Chapter 6,  Act 3, World 2
//  Parts 31–35 = Chapter 7,  Act 4, World 2
//  Parts 36–40 = Chapter 8,  Act 4, World 2
//  Parts 41–45 = Chapter 9,  Act 5, World 3
//  Parts 46–50 = Chapter 10, Act 5, World 3
// ════════════════════════════════════════════════════════════════

// ── Structural constants ──
const CAMPAIGN_PARTS_PER_CHAPTER = 5;
const CAMPAIGN_CHAPTERS_PER_ACT  = 2;
const CAMPAIGN_ACTS_PER_WORLD    = 2;

// ── Per-part metadata table ──
// Each entry declares narrative identity + unlock/reward hooks.
// storyScene / dialogue are handled by the live SCRIPT array above;
// these fields exist for future systems (camp, codex, mission screens).
const CAMPAIGN_PART_META = {
  // ── WORLD 1 · ACT 1 · CHAPTER 1 ──────────────────────────────
  1:  { title:'Live or Die',            chapter:1, act:1, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['chug','guide','reflection'],
        rewards:{ coins:0, xp:0 } },
  2:  { title:'The Watcher',            chapter:1, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['void_space'],
        rewards:{ coins:50, xp:20 } },
  3:  { title:'Echoes',                 chapter:1, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['echo_residue'],
        rewards:{ coins:50, xp:20 } },
  4:  { title:'Left Behind',            chapter:1, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['tora_oni','yassine'],
        rewards:{ coins:75, xp:25 } },
  5:  { title:'Controlled',             chapter:1, act:1, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['controlled_fighter'],
        rewards:{ coins:100, xp:40 } },
  // ── WORLD 1 · ACT 1 · CHAPTER 2 ──────────────────────────────
  6:  { title:'Vanished',               chapter:2, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['nexters'],
        rewards:{ coins:75, xp:25 } },
  7:  { title:'Rewrite',                chapter:2, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['drako_faction'],
        rewards:{ coins:75, xp:25 } },
  8:  { title:'Fragments',              chapter:2, act:1, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['memory_hall'],
        rewards:{ coins:100, xp:30 } },
  9:  { title:'Breakpoint',             chapter:2, act:1, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['rage_tier1'],
        rewards:{ coins:150, xp:50 } },
  10: { title:'Erasure',                chapter:2, act:1, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['erasure_event'],
        rewards:{ coins:150, xp:50 } },
  // ── WORLD 1 · ACT 2 · CHAPTER 3 ──────────────────────────────
  11: { title:'Afterimage',             chapter:3, act:2, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['afterimage'],
        rewards:{ coins:100, xp:30 } },
  12: { title:'Arowh',                  chapter:3, act:2, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'raevan',
        codexUnlocks:['arowh_field'],
        rewards:{ coins:150, xp:50 } },
  13: { title:'Fracture',               chapter:3, act:2, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['fracture_event'],
        rewards:{ coins:100, xp:30 } },
  14: { title:'Broken Fang',            chapter:3, act:2, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['broken_fang'],
        rewards:{ coins:150, xp:50 } },
  15: { title:'Ash Camp',               chapter:3, act:2, world:1,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'ash_camp_arrival', teacherUnlock:null,
        codexUnlocks:['harjeev','camp_system'],
        rewards:{ coins:100, xp:30 } },
  // ── WORLD 1 · ACT 2 · CHAPTER 4 ──────────────────────────────
  16: { title:'Master Raevan',          chapter:4, act:2, world:1,
        missionType:'training',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'raevan',
        codexUnlocks:['raevan'],
        rewards:{ coins:100, xp:40 } },
  17: { title:"Kaizen's Furnace",       chapter:4, act:2, world:1,
        missionType:'training',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'kaizen',
        codexUnlocks:['kaizen','rage_discipline'],
        rewards:{ coins:100, xp:40 } },
  18: { title:'Lady Sorya',             chapter:4, act:2, world:1,
        missionType:'training',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'sorya',
        codexUnlocks:['sorya','field_basics'],
        rewards:{ coins:100, xp:40 } },
  19: { title:'The First Arrow',        chapter:4, act:2, world:1,
        missionType:'training',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'raevan',
        codexUnlocks:['countershot'],
        rewards:{ coins:125, xp:40 } },
  20: { title:'Campfire Names',         chapter:4, act:2, world:1,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'campfire_names', teacherUnlock:null,
        codexUnlocks:['camp_roster_system'],
        rewards:{ coins:75, xp:20 } },
  // ── WORLD 2 · ACT 3 · CHAPTER 5 ──────────────────────────────
  21: { title:'Blade Without Face',     chapter:5, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['oo_pending'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['zeph','lynex','knight'],
        rewards:{ coins:150, xp:50 } },
  22: { title:'The Second Chair Burns', chapter:5, act:3, world:2,
        missionType:'recovery',   characterUnlocks:['addy'], rescueFlags:[],
        campEvent:'second_chair', teacherUnlock:null,
        codexUnlocks:['addy','memory_chair'],
        rewards:{ coins:150, xp:60 } },
  23: { title:'Solo in Static',         chapter:5, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['solo_hidden'],
        campEvent:null, teacherUnlock:'kaizen',
        codexUnlocks:['static_wolf','rage_hold'],
        rewards:{ coins:150, xp:50 } },
  24: { title:'Blood Rule',             chapter:5, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['solo_pending'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['solo','lynex_nexter'],
        rewards:{ coins:175, xp:60 } },
  25: { title:'March of Varkul',        chapter:5, act:3, world:2,
        missionType:'boss',       characterUnlocks:['legend'], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['varkul','legend'],
        rewards:{ coins:200, xp:70 } },
  // ── WORLD 2 · ACT 3 · CHAPTER 6 ──────────────────────────────
  26: { title:"Tora Oni's Gate",        chapter:6, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['tora_oni_hidden'],
        campEvent:null, teacherUnlock:'sorya',
        codexUnlocks:['tora_oni','zeigran','field_corridor'],
        rewards:{ coins:175, xp:60 } },
  27: { title:'Teeth of Zeigran',       chapter:6, act:3, world:2,
        missionType:'boss',       characterUnlocks:['tora_oni'], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['zeigran_field'],
        rewards:{ coins:200, xp:70 } },
  28: { title:'Grey Brotherhood',       chapter:6, act:3, world:2,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:'grey_brotherhood', teacherUnlock:null,
        codexUnlocks:['grey_brotherhood'],
        rewards:{ coins:150, xp:50 } },
  29: { title:'Neon in the Dust',       chapter:6, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['neonkd_hidden'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['neonkd','riven'],
        rewards:{ coins:175, xp:60 } },
  30: { title:'The Friend Who Returned',chapter:6, act:3, world:2,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'mr_arrives', teacherUnlock:null,
        codexUnlocks:['mr_clone','sorya_field_2'],
        rewards:{ coins:150, xp:50 } },
  // ── WORLD 2 · ACT 4 · CHAPTER 7 ──────────────────────────────
  31: { title:'Board of Twelve',        chapter:7, act:4, world:2,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['board_of_twelve'],
        rewards:{ coins:200, xp:70 } },
  32: { title:'Fire Rank',              chapter:7, act:4, world:2,
        missionType:'training',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'kaizen',
        codexUnlocks:['fire_rank'],
        rewards:{ coins:175, xp:60 } },
  33: { title:'Broken Broadcast',       chapter:7, act:4, world:2,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['broadcast_system'],
        rewards:{ coins:175, xp:60 } },
  34: { title:'The Masked Laugh',       chapter:7, act:4, world:2,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['masked_laugh','morvain'],
        rewards:{ coins:200, xp:70 } },
  35: { title:'Hunt of Morvain',        chapter:7, act:4, world:2,
        missionType:'rescue',     characterUnlocks:['oo'], rescueFlags:['oo_recovered'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['countershot_mastery'],
        rewards:{ coins:225, xp:80 } },
  // ── WORLD 2 · ACT 4 · CHAPTER 8 ──────────────────────────────
  36: { title:"Addy's Echo Range",      chapter:8, act:4, world:2,
        missionType:'recovery',   characterUnlocks:['ree'], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['addy_style','ree','kade'],
        rewards:{ coins:200, xp:70 } },
  37: { title:'Blood Moon Camp',        chapter:8, act:4, world:2,
        missionType:'defense',    characterUnlocks:[], rescueFlags:['yassine_seed'],
        campEvent:'blood_moon_raid', teacherUnlock:null,
        codexUnlocks:['yassine','harjeev_leader','dread_juno'],
        rewards:{ coins:225, xp:80 } },
  38: { title:'Field of Chains',       chapter:8, act:4, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['friend_pending'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['friend','kaith','chain_field'],
        rewards:{ coins:225, xp:80 } },
  39: { title:"Knight's Doubt",         chapter:8, act:4, world:2,
        missionType:'recovery',   characterUnlocks:['knight','neonkd'], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['rhaziel','knight_theory'],
        rewards:{ coins:225, xp:80 } },
  40: { title:'The Return of Yassine',  chapter:8, act:4, world:2,
        missionType:'recovery',   characterUnlocks:['yassine'], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['yassine_playable','dread_juno_fall'],
        rewards:{ coins:250, xp:90 } },
  // ── WORLD 3 · ACT 5 · CHAPTER 9 ──────────────────────────────
  41: { title:'Null Chapel',            chapter:9, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:'kaizen',
        codexUnlocks:['rhaziel_field','rage_tier2','null_field'],
        rewards:{ coins:275, xp:100 } },
  42: { title:'Camp of Wolves',         chapter:9, act:5, world:3,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'camp_of_wolves', teacherUnlock:null,
        codexUnlocks:['riven_scout','mr_joke_echo'],
        rewards:{ coins:200, xp:60 } },
  43: { title:'Sable Vorn',             chapter:9, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['sable_vorn'],
        rewards:{ coins:275, xp:100 } },
  44: { title:'Before the Knife',       chapter:9, act:5, world:3,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:'before_the_knife', teacherUnlock:null,
        codexUnlocks:['before_knife'],
        rewards:{ coins:250, xp:90 } },
  45: { title:'The Thirty-First Face',  chapter:9, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['thirty_first_face'],
        rewards:{ coins:300, xp:110 } },
  // ── WORLD 3 · ACT 5 · CHAPTER 10 ─────────────────────────────
  46: { title:'Ashes That Walk',        chapter:10, act:5, world:3,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['ashes_that_walk'],
        rewards:{ coins:275, xp:100 } },
  47: { title:"Tyrvak's Court",         chapter:10, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['tyrvak','tyrvak_court'],
        rewards:{ coins:300, xp:110 } },
  48: { title:"Noxrael's Choir",        chapter:10, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['noxrael','choir_field'],
        rewards:{ coins:300, xp:110 } },
  49: { title:'Xollonox',               chapter:10, act:5, world:3,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['xollonox'],
        rewards:{ coins:350, xp:130 } },
  50: { title:'War Gate of Veylos',     chapter:10, act:5, world:3,
        missionType:'final',      characterUnlocks:[], rescueFlags:[],
        campEvent:'war_gate', teacherUnlock:null,
        codexUnlocks:['veylos','real_mr','war_gate'],
        rewards:{ coins:500, xp:200 } },
};

// ── Navigation helpers ──────────────────────────────────────────

/** Returns the world number (1-based) that contains the given part. */
function getWorldFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.world;
  // Fallback: derive from structure constants
  const chapter = getChapterFromPart(part);
  const act = Math.ceil(chapter / CAMPAIGN_CHAPTERS_PER_ACT);
  return Math.ceil(act / CAMPAIGN_ACTS_PER_WORLD);
}

/** Returns the act number (1-based) that contains the given part. */
function getActFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.act;
  const chapter = getChapterFromPart(part);
  return Math.ceil(chapter / CAMPAIGN_CHAPTERS_PER_ACT);
}

/** Returns the chapter number (1-based) that contains the given part. */
function getChapterFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.chapter;
  return Math.ceil(part / CAMPAIGN_PARTS_PER_CHAPTER);
}

/** Returns the full metadata object for a given part number, or null. */
function getPartMeta(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (!meta) return null;
  return { partNumber: part, ...meta };
}

/** Returns an array of part numbers belonging to the given chapter. */
function getPartsForChapter(chapter) {
  return Object.keys(CAMPAIGN_PART_META)
    .map(Number)
    .filter(p => CAMPAIGN_PART_META[p].chapter === chapter)
    .sort((a, b) => a - b);
}

/** Returns an array of chapter numbers belonging to the given act. */
function getChaptersForAct(act) {
  const chapters = new Set();
  Object.values(CAMPAIGN_PART_META).forEach(m => {
    if (m.act === act) chapters.add(m.chapter);
  });
  return Array.from(chapters).sort((a, b) => a - b);
}

/** Returns an array of act numbers belonging to the given world. */
function getActsForWorld(world) {
  const acts = new Set();
  Object.values(CAMPAIGN_PART_META).forEach(m => {
    if (m.world === world) acts.add(m.act);
  });
  return Array.from(acts).sort((a, b) => a - b);
}

// ── Keep save state in sync with campaign structure on every save ──
(function _patchSaveGameForStructure() {
  const _base = window.saveGame;
  if (_base && !_base.__structurePatched) {
    const patched = function(extra = {}) {
      // Automatically record world/act/chapter derived from currentPart
      const part = (typeof currentPart !== 'undefined') ? currentPart : 1;
      const structureExtra = {
        currentWorld:   getWorldFromPart(part),
        currentAct:     getActFromPart(part),
        currentChapter: getChapterFromPart(part),
        ...extra,
      };
      return _base.call(this, structureExtra);
    };
    patched.__structurePatched = true;
    patched.__campaignPatched  = true; // keep existing flag
    window.saveGame = patched;
  }
})();

// ── Expose on window for future systems ──
window.CAMPAIGN_PART_META        = CAMPAIGN_PART_META;
window.getPartMeta               = getPartMeta;
window.getWorldFromPart          = getWorldFromPart;
window.getActFromPart            = getActFromPart;
window.getChapterFromPart        = getChapterFromPart;
window.getPartsForChapter        = getPartsForChapter;
window.getChaptersForAct         = getChaptersForAct;
window.getActsForWorld           = getActsForWorld;





// =========================================================

/* Safety bridge: keeps old buttons/loops from crashing after the cleanup prune. */
var rangedWeapon = (typeof rangedWeapon !== 'undefined') ? rangedWeapon : 'none';
var fType_survival = (typeof fType_survival !== 'undefined') ? fType_survival : null;
var playerLevel = (typeof playerLevel !== 'undefined') ? playerLevel : (window.playerLevel || 1);
var playerXP = (typeof playerXP !== 'undefined') ? playerXP : (window.playerXP || 0);
var xpToNext = (typeof xpToNext !== 'undefined') ? xpToNext : (window.xpToNext || 100);
var punchHeld = (typeof punchHeld !== 'undefined') ? punchHeld : false;

function getRangedWeapon(){
  try {
    var save = window.__saveData || {};
    var arm = save.armory || {};
    return save.rangedWeapon || (arm.equipped && arm.equipped.range) || rangedWeapon || 'none';
  } catch(e) { return rangedWeapon || 'none'; }
}
function setRangedWeapon(id){
  rangedWeapon = id || 'none';
  try {
    if (!window.__saveData) window.__saveData = {};
    window.__saveData.rangedWeapon = rangedWeapon;
    if (!window.__saveData.armory) window.__saveData.armory = {};
    if (!window.__saveData.armory.equipped) window.__saveData.armory.equipped = {};
    window.__saveData.armory.equipped.range = rangedWeapon;
    if (typeof saveGame === 'function') saveGame();
  } catch(e) {}
  return rangedWeapon;
}
function fireRangedWeapon(){ return false; }
function tickRangedCooldown(){}
function updateRangeShots(){}
function drawRangeShots(){}
function updateDomainAttacks(){}
function drawDomainAttacks(){}

window.rangedWeapon = rangedWeapon;
window.getRangedWeapon = window.getRangedWeapon || getRangedWeapon;
window.setRangedWeapon = window.setRangedWeapon || setRangedWeapon;
window.fireRangedWeapon = window.fireRangedWeapon || fireRangedWeapon;
window.tickRangedCooldown = window.tickRangedCooldown || tickRangedCooldown;
window.updateRangeShots = window.updateRangeShots || updateRangeShots;
window.drawRangeShots = window.drawRangeShots || drawRangeShots;
window.updateDomainAttacks = window.updateDomainAttacks || updateDomainAttacks;
window.drawDomainAttacks = window.drawDomainAttacks || drawDomainAttacks;

// =========================================================

if (typeof window.currentPart === 'undefined') window.currentPart = 1;
var currentPart = (typeof window.currentPart === 'number' ? window.currentPart : 1);
window.currentPart = currentPart;
window.__safeListen = function(el, type, handler, opts){
  if (el && typeof el.addEventListener === 'function') el.addEventListener(type, handler, opts);
  return el;
};
window.introSelect = window.introSelect || function(action){
  window.__pendingIntroAction = action || window.__pendingIntroAction || 'new';
  if (typeof window.__realIntroSelect === 'function') return window.__realIntroSelect(window.__pendingIntroAction);
  return false;
};
window.introHandleClick = window.introHandleClick || function(e){
  if (e && e.target && e.target.classList && e.target.classList.contains('intro-menu-btn')) return;
  var has = false;
  try { has = !!localStorage.getItem('chug_shadow_v3_save'); } catch(_) {}
  return window.introSelect(has ? 'continue' : 'new');
};

// =========================================================

(function(){
  const menuScreen = document.getElementById('menu-screen');
  if(!menuScreen) return;

  function syncMenuPanelLight(){
    const isMenuActive = menuScreen.classList.contains('active-screen');
    const isOpen = isMenuActive && !menuScreen.classList.contains('menu-ribbon-collapsed');
    document.body.classList.toggle('menu-panel-open', isOpen);
  }

  if(typeof window.showScreen === 'function' && !window.__v17MenuLightShowPatch){
    const oldShowScreen = window.showScreen;
    window.__v17MenuLightShowPatch = true;
    window.showScreen = function(){
      const out = oldShowScreen.apply(this, arguments);
      requestAnimationFrame(syncMenuPanelLight);
      setTimeout(syncMenuPanelLight, 24);
      return out;
    };
  }

  if(typeof window.showMenuScroll === 'function' && !window.__v17MenuLightScrollPatch){
    const oldShowMenuScroll = window.showMenuScroll;
    window.__v17MenuLightScrollPatch = true;
    window.showMenuScroll = function(){
      const out = oldShowMenuScroll.apply(this, arguments);
      requestAnimationFrame(syncMenuPanelLight);
      setTimeout(syncMenuPanelLight, 24);
      return out;
    };
  }

  const observer = new MutationObserver(syncMenuPanelLight);
  observer.observe(menuScreen, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('load', () => setTimeout(syncMenuPanelLight, 60), { once:true });
  setTimeout(syncMenuPanelLight, 3600);
  syncMenuPanelLight();
})();

// =========================================================

(function installRagePatch(attempt){
  const FighterRef = window.Fighter;
  if(!FighterRef || !FighterRef.prototype){
    if((attempt || 0) < 120){
      return setTimeout(function(){ installRagePatch((attempt || 0) + 1); }, 50);
    }
    return;
  }
  if(FighterRef.prototype.__v50RagePatchInstalled) return;

  const ORIG_UPDATE = FighterRef.prototype.update;
  const ORIG_ATTACK = FighterRef.prototype.attack;
  const ORIG_DRAW = FighterRef.prototype.draw;
  const ORIG_SET_ENV_RAGE = window.setEnvRage;
  const ORIG_FIRE_AT = window.fireAt;
  if(!ORIG_UPDATE || !ORIG_ATTACK || !ORIG_DRAW){ return; }
  FighterRef.prototype.__v50RagePatchInstalled = true;

  window.fireAt = function(x,y,vx){
    if(!window.envRage && typeof ORIG_FIRE_AT === 'function') return ORIG_FIRE_AT(x,y,vx);
    if(typeof particles === 'undefined') return;
    if((window.__rageFxTick = (window.__rageFxTick||0) + 1) % 3 !== 0) return;
    const cols = ['#67ecff','#84a8ff','#9b6bff','#d9fbff'];
    particles.push({
      x:x+Math.random()*28,
      y:y-Math.random()*78,
      vx:vx*0.12+(Math.random()-.5)*0.9,
      vy:-(Math.random()*2.8+1.0),
      life:0.34+Math.random()*0.12,
      col:cols[Math.floor(Math.random()*cols.length)],
      w:Math.random()*5+2,
      tp:'f'
    });
    if(particles.length > 180) particles.splice(0, particles.length - 180);
  };

  window.setEnvRage = function(on){
    if(typeof ORIG_SET_ENV_RAGE === 'function') ORIG_SET_ENV_RAGE(on);
    try{
      document.body.classList.toggle('rage-special', !!on);
      const overlay = document.getElementById('rage-overlay');
      if(overlay){
        overlay.style.background = on
          ? 'radial-gradient(circle at 50% 52%, rgba(120,240,255,0.12) 0%, transparent 30%), radial-gradient(ellipse at 50% 100%, rgba(92,38,190,0.18) 0%, transparent 68%), linear-gradient(180deg, rgba(8,18,56,0.12) 0%, rgba(2,0,12,0.03) 100%)'
          : '';
      }
    }catch(e){}
  };

  FighterRef.prototype.attack = function(type){
    const out = ORIG_ATTACK.call(this, type);
    if(this.isP && this.raging && this.atkT > 0){
      if(type === 'p') this.atkT = Math.max(5, Math.floor(this.atkT * 0.76));
      else if(type === 'k') this.atkT = Math.max(7, Math.floor(this.atkT * 0.79));
      else if(type === 'slam') this.atkT = Math.max(15, Math.floor(this.atkT * 0.88));
      else if(type === 'throw') this.atkT = Math.max(13, Math.floor(this.atkT * 0.90));
      this.hitF = Math.max(1, Math.floor(this.atkT * (type === 'k' ? 0.56 : 0.5)));
    }
    return out;
  };

  FighterRef.prototype.update = function(en){
    this.__shadowTick = (this.__shadowTick || 0) + 1;

    if(!this.isP && en && en.raging && window.gameState === 'fight' && this.hp > 0){
      const _rm = typeof getRageModifiers==='function' ? getRageModifiers(en.rageTier) : null;
      const oldSpd = this.spd;
      this.spd = oldSpd * (_rm ? _rm.enemySlow : (en.rageTier === 2 ? 0.42 : 0.56));
      const out = ORIG_UPDATE.call(this, en);
      this.spd = oldSpd;

      if(this.state === 'atk' && this.atkT > 0 && (this.__shadowTick % (en.rageTier === 2 ? 2 : 3)) !== 0){
        this.atkT += (_rm ? _rm.enemyAtkAdj : (en.rageTier === 2 ? 0.45 : 0.22));
      }
      if(this.hitT > 0) this.hitT += (_rm ? _rm.enemyHitAdj : (en.rageTier === 2 ? 0.28 : 0.14));
      this.vx *= (_rm ? _rm.enemyVxMul : (en.rageTier === 2 ? 0.74 : 0.82));

      if(typeof particles !== 'undefined' && (this.__shadowTick % 12) === 0 && this.hp > 0){
        particles.push({
          x:this.x + this.w/2 + (Math.random() - 0.5) * 10,
          y:this.y - this.h * 0.55 + (Math.random() - 0.5) * 12,
          vx:(Math.random() - 0.5) * 0.25,
          vy:-0.35 - Math.random() * 0.2,
          life:0.18 + Math.random() * 0.08,
          col:Math.random() < 0.5 ? 'rgba(120,235,255,0.20)' : 'rgba(170,120,255,0.16)',
          w:Math.random() * 5 + 3,
          tp:'s'
        });
      }
      if(typeof particles !== 'undefined' && particles.length > 180) particles.splice(0, particles.length - 180);
      return out;
    }

    if(this.isP && this.raging){
      const oldSpd = this.spd;
      const _rm = typeof getRageModifiers==='function' ? getRageModifiers(this.rageTier) : null;
      this.spd = oldSpd * (_rm ? _rm.spdMul : (this.rageTier===2?1.34:1.24));
      const out = ORIG_UPDATE.call(this, en);
      this.spd = oldSpd;
      this.rage = Math.min(100, this.rage + 0.03);
      if(typeof particles !== 'undefined' && (this.__shadowTick % 8) === 0 && this.hp > 0 && (this.state === 'run' || this.state === 'atk')){
        particles.push({
          x:this.x + this.w/2 + (Math.random() - 0.5) * 12,
          y:this.y - this.h * (0.28 + Math.random() * 0.18),
          vx:(Math.random() - 0.5) * 0.45,
          vy:-0.55 - Math.random() * 0.25,
          life:0.22 + Math.random() * 0.08,
          col:Math.random() < 0.55 ? 'rgba(104,235,255,0.24)' : 'rgba(170,110,255,0.18)',
          w:Math.random() * 6 + 3,
          tp:'s'
        });
      }
      if(typeof particles !== 'undefined' && particles.length > 180) particles.splice(0, particles.length - 180);
      return out;
    }

    return ORIG_UPDATE.call(this, en);
  };

  FighterRef.prototype.draw = function(c, ghost){
    if(this.isP && this.raging && !ghost){
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


(function(){
  const cache = new Map();
  const OK = 'ok';
  const MISS = 'miss';
  function dedupe(arr){
    const out=[];
    for(const v of (arr||[])) if(v && !out.includes(v)) out.push(v);
    return out;
  }
  window.CHUG_ASSETS = Object.assign({
    root:'assets',
    audio:{
      bg:['assets/audio/bg.mp3','assets/audio/bg.ogg','assets/audio/bg.wav','bg.mp3','bg.ogg','bg.wav'],
      boss:['assets/audio/bgboss.mp3','assets/audio/bgboss.ogg','assets/audio/bgboss.wav','assets/audio/bossbg.mp3','assets/audio/bossbg.ogg','assets/audio/bossbg.wav','bgboss.mp3','bgboss.ogg','bgboss.wav','bossbg.mp3','bossbg.ogg','bossbg.wav']
    },
    wallpaperCandidates(chapter){
      const n = String(parseInt(chapter || 1, 10) || 1);
      const p = n.padStart(2,'0');
      return dedupe([
        `assets/wallpapers/chapter-${p}.webp`,`assets/wallpapers/chapter-${p}.png`,`assets/wallpapers/chapter-${p}.jpg`,`assets/wallpapers/chapter-${p}.jpeg`,
        `assets/wallpapers/ch${p}.webp`,`assets/wallpapers/ch${p}.png`,`assets/wallpapers/ch${p}.jpg`,`assets/wallpapers/ch${p}.jpeg`,
        `assets/wallpapers/chapter-${n}.webp`,`assets/wallpapers/chapter-${n}.png`,`assets/wallpapers/chapter-${n}.jpg`,`assets/wallpapers/chapter-${n}.jpeg`,
        `assets/wallpapers/ch${n}.webp`,`assets/wallpapers/ch${n}.png`,`assets/wallpapers/ch${n}.jpg`,`assets/wallpapers/ch${n}.jpeg`
      ]);
    },
    ui:{ logo:['assets/ui/logo.png','assets/ui/logo.webp','assets/ui/logo.jpg'], frame:['assets/ui/frame.png','assets/ui/frame.webp'] },
    sprite(name){ name=String(name||'').trim(); return name ? dedupe([`assets/sprites/${name}.png`,`assets/sprites/${name}.webp`,`assets/sprites/${name}.jpg`]) : []; },
    sfx(name){ name=String(name||'').trim(); return name ? dedupe([`assets/sfx/${name}.mp3`,`assets/sfx/${name}.ogg`,`assets/sfx/${name}.wav`]) : []; }
  }, window.CHUG_ASSETS || {});
  function probeImage(url, timeout=1800){
    return new Promise(resolve=>{
      if(cache.get('img:'+url)===OK) return resolve(url);
      if(cache.get('img:'+url)===MISS) return resolve(null);
      const img = new Image();
      let done = false;
      const finish = ok => {
        if(done) return; done = true;
        cache.set('img:'+url, ok ? OK : MISS);
        resolve(ok ? url : null);
      };
      const t = setTimeout(()=>finish(false), timeout);
      img.onload = ()=>{ clearTimeout(t); finish(true); };
      img.onerror = ()=>{ clearTimeout(t); finish(false); };
      img.src = url;
    });
  }
  function probeAudio(url, timeout=2200){
    return new Promise(resolve=>{
      if(cache.get('aud:'+url)===OK) return resolve(url);
      if(cache.get('aud:'+url)===MISS) return resolve(null);
      const audio = new Audio();
      let done = false;
      const finish = ok => {
        if(done) return; done = true;
        cache.set('aud:'+url, ok ? OK : MISS);
        try{ audio.pause(); audio.removeAttribute('src'); audio.load(); }catch(_e){}
        resolve(ok ? url : null);
      };
      const t = setTimeout(()=>finish(false), timeout);
      audio.preload = 'metadata';
      audio.addEventListener('canplaythrough', ()=>{ clearTimeout(t); finish(true); }, { once:true });
      audio.addEventListener('loadeddata', ()=>{ clearTimeout(t); finish(true); }, { once:true });
      audio.addEventListener('error', ()=>{ clearTimeout(t); finish(false); }, { once:true });
      audio.src = url;
      try{ audio.load(); }catch(_e){ clearTimeout(t); finish(false); }
    });
  }
  async function firstAvailable(candidates, type){
    const list = dedupe(candidates);
    for(const url of list){
      const hit = type === 'audio' ? await probeAudio(url) : await probeImage(url);
      if(hit) return hit;
    }
    return null;
  }
  window.chugFirstAvailableAsset = firstAvailable;
})();



/* ===== v42 Chapter wallpaper system ===== */
(function(){
  function svgUrl(svg){
    return 'url("data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) + '")';
  }

  function layerSky(topA, topB, glow, bottomA, bottomB){
    return `linear-gradient(180deg, ${topA} 0%, ${topB} 24%, ${glow} 45%, ${bottomA} 72%, ${bottomB} 100%)`;
  }

  function mountainSvg(fill1, fill2, motif, motif2){
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

  function motifSvg(kind, c1, c2){
    let body = '';
    if(kind === 'dojo'){
      body = `
        <circle cx="1280" cy="210" r="58" fill="${c1}" opacity="0.22"/>
        <rect x="1110" y="448" width="270" height="165" rx="8" fill="${c2}" opacity="0.92"/>
        <rect x="1150" y="395" width="190" height="64" rx="6" fill="${c2}" opacity="0.88"/>
        <rect x="1176" y="342" width="138" height="56" rx="6" fill="${c2}" opacity="0.85"/>
        <rect x="1220" y="292" width="52" height="54" fill="${c2}" opacity="0.82"/>
      `;
    } else if(kind === 'bamboo'){
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
    } else if(kind === 'shrine'){
      body = `
        <circle cx="1260" cy="210" r="76" fill="${c1}" opacity="0.22"/>
        <rect x="1176" y="390" width="20" height="260" fill="${c2}" opacity="0.9"/>
        <rect x="1310" y="390" width="20" height="260" fill="${c2}" opacity="0.9"/>
        <rect x="1135" y="355" width="240" height="34" rx="6" fill="${c2}" opacity="0.9"/>
        <rect x="1100" y="322" width="310" height="28" rx="8" fill="${c2}" opacity="0.86"/>
        <path d="M1220 424 L1285 424 L1298 650 L1208 650 Z" fill="${c2}" opacity="0.84"/>
      `;
    } else if(kind === 'canyon'){
      body = `
        <path d="M1070 250 C1110 210 1168 198 1202 238 C1246 290 1280 340 1304 402 C1336 482 1398 532 1478 584" fill="none" stroke="${c1}" stroke-width="38" stroke-linecap="round" opacity="0.28"/>
        <path d="M980 560 C1090 500 1180 468 1276 468 C1360 468 1450 512 1540 610" fill="none" stroke="${c2}" stroke-width="88" stroke-linecap="round" opacity="0.30"/>
      `;
    } else if(kind === 'alien'){
      body = `
        <circle cx="1265" cy="198" r="92" fill="${c1}" opacity="0.24"/>
        <ellipse cx="1224" cy="505" rx="64" ry="162" fill="${c2}" opacity="0.72"/>
        <ellipse cx="1340" cy="540" rx="56" ry="190" fill="${c2}" opacity="0.66"/>
        <path d="M1185 485 L1260 290 L1294 485 Z" fill="${c2}" opacity="0.9"/>
        <path d="M1300 520 L1375 295 L1418 520 Z" fill="${c2}" opacity="0.88"/>
      `;
    } else if(kind === 'camp'){
      body = `
        <circle cx="1295" cy="235" r="62" fill="${c1}" opacity="0.20"/>
        <path d="M1125 610 L1196 482 L1268 610 Z" fill="${c2}" opacity="0.9"/>
        <path d="M1240 610 L1318 468 L1390 610 Z" fill="${c2}" opacity="0.9"/>
        <rect x="1206" y="565" width="56" height="54" fill="${c1}" opacity="0.34"/>
        <rect x="1328" y="565" width="48" height="52" fill="${c1}" opacity="0.30"/>
      `;
    } else if(kind === 'snow'){
      body = `
        <circle cx="1280" cy="190" r="78" fill="${c1}" opacity="0.18"/>
        <path d="M1090 640 L1180 350 L1280 640 Z" fill="${c2}" opacity="0.88"/>
        <path d="M1200 650 L1320 315 L1430 650 Z" fill="${c2}" opacity="0.86"/>
        <path d="M1152 458 L1180 350 L1205 458 Z" fill="#ffffff" opacity="0.58"/>
        <path d="M1274 450 L1320 315 L1360 450 Z" fill="#ffffff" opacity="0.62"/>
      `;
    } else if(kind === 'bloodmoon'){
      body = `
        <circle cx="1280" cy="188" r="95" fill="${c1}" opacity="0.24"/>
        <path d="M1060 640 C1125 600 1162 560 1205 500 C1245 444 1282 420 1334 396 C1376 376 1425 334 1498 252" fill="none" stroke="${c2}" stroke-width="18" stroke-linecap="round" opacity="0.44"/>
        <path d="M1115 635 L1168 560 L1220 635 Z" fill="${c2}" opacity="0.88"/>
      `;
    } else if(kind === 'chapel'){
      body = `
        <circle cx="1280" cy="200" r="82" fill="${c1}" opacity="0.18"/>
        <rect x="1188" y="348" width="180" height="270" rx="8" fill="${c2}" opacity="0.9"/>
        <rect x="1247" y="292" width="60" height="94" fill="${c2}" opacity="0.86"/>
        <rect x="1268" y="240" width="18" height="54" fill="${c2}" opacity="0.82"/>
        <rect x="1234" y="440" width="88" height="20" fill="${c1}" opacity="0.28"/>
        <rect x="1268" y="408" width="20" height="84" fill="${c1}" opacity="0.28"/>
      `;
    } else if(kind === 'gate'){
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

  // PERF v43: pure CSS gradients only — no SVG decode, same visual vibe
  const THEMES = {
    1: { name:'Dojo Dusk',
      bg: ['linear-gradient(180deg,#6d7fa3 0%,#d5b78d 24%,rgba(255,220,154,0.22) 45%,#7f5f45 72%,#15100d 100%)',
           'radial-gradient(ellipse 35% 60% at 80% 90%,rgba(45,35,27,0.72) 0%,transparent 65%)',
           'linear-gradient(180deg,transparent 50%,#2d241d 78%,#171311 100%)'],
      filter:'' },
    2: { name:'Moon Bamboo',
      bg: ['linear-gradient(180deg,#5f7389 0%,#8ea08e 24%,rgba(198,224,205,0.16) 45%,#41523a 72%,#101712 100%)',
           'radial-gradient(ellipse 28% 55% at 78% 88%,rgba(33,51,34,0.68) 0%,transparent 62%)',
           'linear-gradient(180deg,transparent 50%,#1f2a22 78%,#0e120e 100%)'],
      filter:'' },
    3: { name:'Ruined Shrine',
      bg: ['linear-gradient(180deg,#7a88a8 0%,#d8c4a3 24%,rgba(255,228,183,0.18) 45%,#78624a 72%,#17130f 100%)',
           'radial-gradient(ellipse 32% 52% at 79% 88%,rgba(58,43,33,0.70) 0%,transparent 62%)',
           'linear-gradient(180deg,transparent 50%,#30251d 78%,#18120f 100%)'],
      filter:'' },
    4: { name:'Dust Canyon',
      bg: ['linear-gradient(180deg,#7f6d6c 0%,#d09b7b 24%,rgba(255,194,142,0.16) 45%,#8b5337 72%,#1a120d 100%)',
           'radial-gradient(ellipse 38% 48% at 78% 90%,rgba(83,48,34,0.68) 0%,transparent 60%)',
           'linear-gradient(180deg,transparent 50%,#3a2119 78%,#1d120f 100%)'],
      filter:'' },
    5: { name:'Alien Ruins',
      bg: ['linear-gradient(180deg,#6879a7 0%,#8e78a8 24%,rgba(159,122,255,0.15) 45%,#4b385d 72%,#110d18 100%)',
           'radial-gradient(ellipse 34% 54% at 78% 86%,rgba(42,24,58,0.70) 0%,transparent 62%)',
           'linear-gradient(180deg,transparent 50%,#242033 78%,#12111b 100%)'],
      filter:'' },
    6: { name:'Ash Camp Stormland',
      bg: ['linear-gradient(180deg,#71818d 0%,#beb7a1 24%,rgba(255,223,168,0.10) 45%,#6d6556 72%,#13110f 100%)',
           'radial-gradient(ellipse 36% 50% at 78% 90%,rgba(46,36,31,0.68) 0%,transparent 60%)',
           'linear-gradient(180deg,transparent 50%,#282622 78%,#12110f 100%)'],
      filter:'' },
    7: { name:'Frost Ridge',
      bg: ['linear-gradient(180deg,#7a8daa 0%,#c8d2dc 24%,rgba(255,255,255,0.12) 45%,#7b8998 72%,#10161d 100%)',
           'radial-gradient(ellipse 32% 52% at 78% 88%,rgba(51,71,87,0.65) 0%,transparent 60%)',
           'linear-gradient(180deg,transparent 50%,#35414a 78%,#151b21 100%)'],
      filter:'' },
    8: { name:'Blood Moon',
      bg: ['linear-gradient(180deg,#745d6d 0%,#ad6e62 24%,rgba(255,118,118,0.16) 45%,#6d342f 72%,#160c0c 100%)',
           'radial-gradient(ellipse 36% 52% at 78% 86%,rgba(63,22,22,0.72) 0%,transparent 62%)',
           'linear-gradient(180deg,transparent 50%,#301818 78%,#160c0c 100%)'],
      filter:'' },
    9: { name:'Null Chapel',
      bg: ['linear-gradient(180deg,#6b7383 0%,#9a8e83 24%,rgba(232,220,200,0.10) 45%,#66574c 72%,#13100f 100%)',
           'radial-gradient(ellipse 34% 50% at 78% 88%,rgba(47,40,36,0.68) 0%,transparent 60%)',
           'linear-gradient(180deg,transparent 50%,#2b2725 78%,#141111 100%)'],
      filter:'' },
    10:{ name:'War Gate',
      bg: ['linear-gradient(180deg,#66759d 0%,#b18f74 24%,rgba(255,214,144,0.13) 45%,#5f493d 72%,#120f12 100%)',
           'radial-gradient(ellipse 36% 52% at 78% 88%,rgba(48,35,33,0.70) 0%,transparent 62%)',
           'linear-gradient(180deg,transparent 50%,#2b2328 78%,#121012 100%)'],
      filter:'' }
  };

  function getWallpaperChapter(){
    if(typeof currentPart !== 'undefined' && typeof getChapterFromPart === 'function'){
      return Math.max(1, Math.min(10, getChapterFromPart(currentPart) || 1));
    }
    if(typeof activeChapter !== 'undefined'){
      return Math.max(1, Math.min(10, activeChapter || 1));
    }
    return 1;
  }

  function ensureWallpaperEl(){
    let el = document.getElementById('chapter-wallpaper');
    if(!el){
      const bg = document.getElementById('bg-layer');
      if(bg){
        el = document.createElement('div');
        el.id = 'chapter-wallpaper';
        bg.insertBefore(el, bg.firstChild);
      }
    }
    return el;
  }

  function applyChapterWallpaper(chapter){
    const ch = Math.max(1, Math.min(10, parseInt(chapter || 1, 10) || 1));
    const theme = THEMES[ch] || THEMES[1];
    const el = ensureWallpaperEl();
    if(!el) return;

    const fallbackLayers = theme.bg.join(',');
    el.style.backgroundImage = fallbackLayers;
    if(theme.filter) el.style.filter = theme.filter; /* PERF: filter only when non-empty */
    else el.style.filter = '';
    el.dataset.chapter = String(ch);
    document.documentElement.style.setProperty('--chapter-theme-name', `"${theme.name}"`);

    const lbl = document.getElementById('ct-chapter-lbl');
    if(lbl && !lbl.dataset.v42Patched){
      lbl.dataset.v42Patched = '1';
      lbl.title = 'Active wallpaper theme: ' + theme.name;
    }

    if(typeof window.chugFirstAvailableAsset === 'function' && window.CHUG_ASSETS && typeof window.CHUG_ASSETS.wallpaperCandidates === 'function'){
      const reqId = `${ch}:${Date.now()}:${Math.random()}`;
      el.dataset.wallpaperReq = reqId;
      window.chugFirstAvailableAsset(window.CHUG_ASSETS.wallpaperCandidates(ch), 'image').then(url => {
        if(!url || !el || el.dataset.wallpaperReq !== reqId) return;
        el.style.backgroundImage = [
          'linear-gradient(180deg,rgba(8,10,16,0.16) 0%,rgba(8,10,16,0.34) 58%,rgba(6,7,12,0.56) 100%)',
          `url("${url}")`
        ].join(',');
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center center';
        el.style.backgroundRepeat = 'no-repeat';
        document.documentElement.style.setProperty('--chapter-theme-name', `"${theme.name} • external"`);
        if(lbl) lbl.title = 'Active wallpaper theme: ' + theme.name + ' (external image)';
      }).catch(()=>{});
    }
  }

  function syncChapterWallpaper(){
    applyChapterWallpaper(getWallpaperChapter());
  }

  const _origApplyPartBg = window.applyPartBg;
  if(typeof _origApplyPartBg === 'function' && !window.__v42ChapterBgWrapped){
    window.__v42ChapterBgWrapped = true;
    window.applyPartBg = function(part){
      const out = _origApplyPartBg.apply(this, arguments);
      try{
        const ch = (typeof getChapterFromPart === 'function') ? getChapterFromPart(part) : Math.ceil((part || 1) / 5);
        applyChapterWallpaper(ch);
      }catch(_e){
        syncChapterWallpaper();
      }
      return out;
    };
  }

  const _origShowScreen = window.showScreen;
  if(typeof _origShowScreen === 'function' && !window.__v42ShowScreenWrapped){
    window.__v42ShowScreenWrapped = true;
    window.showScreen = function(id){
      const out = _origShowScreen.apply(this, arguments);
      try{
        if(id === 'worlddetail-screen' || id === 'story-screen' || id === 'hud-screen' ||
           id === 'worldmap-screen' || id === 'chapter-screen' || id === 'act1-screen' || id === 'act2-screen' ||
           id === 'menu-screen'){
          syncChapterWallpaper();
        }
      }catch(_e){}
      return out;
    };
  }

  const _origOpenAct = window.openAct;
  if(typeof _origOpenAct === 'function' && !window.__v42OpenActWrapped){
    window.__v42OpenActWrapped = true;
    window.openAct = function(act){
      const out = _origOpenAct.apply(this, arguments);
      try{
        const ch = act === 1 ? 1 : (act === 2 ? 3 : getWallpaperChapter());
        applyChapterWallpaper(ch);
      }catch(_e){}
      return out;
    };
  }

  const _origStartChapterV9 = window.startChapterV9;
  if(typeof _origStartChapterV9 === 'function' && !window.__v42StartChapterV9Wrapped){
    window.__v42StartChapterV9Wrapped = true;
    window.startChapterV9 = function(ch){
      try{ applyChapterWallpaper(ch); }catch(_e){}
      return _origStartChapterV9.apply(this, arguments);
    };
  }

  const _origStartChapter = window.startChapter;
  if(typeof _origStartChapter === 'function' && !window.__v42StartChapterWrapped){
    window.__v42StartChapterWrapped = true;
    window.startChapter = function(ch){
      try{ applyChapterWallpaper(ch); }catch(_e){}
      return _origStartChapter.apply(this, arguments);
    };
  }

  window.applyChapterWallpaper = applyChapterWallpaper;
  window.syncChapterWallpaper = syncChapterWallpaper;
  window.CHAPTER_WALLPAPER_THEMES = THEMES;

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncChapterWallpaper, {once:true});
  }else{
    syncChapterWallpaper();
  }
  setTimeout(syncChapterWallpaper, 120);
})();




/* ─── js/audio.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   PROCEDURAL MUSIC ENGINE
   Synth music using Web Audio API. Edit THEMES to change music mood.
════════════════════════════════════════════════ */

// ── AUDIO + MUSIC ENGINE ──
let AC = null;
function initAudio(){
  if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();}
  if(AC.state==='suspended')AC.resume();
  startBgAudio();
  startMusicTheme('menu');
}
function beep(f,t='square',dur=0.1,vol=0.05){
  if(!AC)return;
  const o=AC.createOscillator(),g=AC.createGain();
  o.type=t;o.frequency.value=f;
  o.connect(g);g.connect(AC.destination);
  const v=vol*settingsSfxVol;
  g.gain.setValueAtTime(v,AC.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+dur);
  o.start();o.stop(AC.currentTime+dur);
}

// ── PROCEDURAL MUSIC ENGINE ──
// 100% Web Audio API — zero external assets — original composition
let musicEnabled = true;
let musicNodes = [];
let musicScheduler = null;
let currentTheme = null;
let masterGain = null;
let reverbNode = null;

const SCALES = {
  minor:   [0,2,3,5,7,8,10],   // natural minor — dark, foreboding
  phrygian:[0,1,3,5,7,8,10],   // phrygian — very dark, oriental
  dim:     [0,3,6,9],           // diminished — tense
  battle:  [0,2,3,5,7,9,10]    // dorian — intense but melodic
};

const THEMES = {
  menu:   {tempo:72, root:36, scale:'phrygian', bass:true,  arp:true,  pad:true,  perc:false, vol:0.55},
  story:  {tempo:52, root:33, scale:'minor',    bass:true,  arp:false, pad:true,  perc:false, vol:0.45},
  fight:  {tempo:140,root:36, scale:'battle',   bass:true,  arp:true,  pad:false, perc:true,  vol:0.7 },
  boss:   {tempo:160,root:33, scale:'dim',      bass:true,  arp:true,  pad:true,  perc:true,  vol:0.75},
  partend:{tempo:60, root:40, scale:'minor',    bass:false, arp:false, pad:true,  perc:false, vol:0.4 },
};

function midiToHz(note){return 440*Math.pow(2,(note-69)/12);}

function createReverb(ctx){
  const convolver=ctx.createConvolver();
  const len=ctx.sampleRate*2.5;
  const buf=ctx.createBuffer(2,len,ctx.sampleRate);
  for(let c=0;c<2;c++){
    const d=buf.getChannelData(c);
    for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);
  }
  convolver.buffer=buf;
  return convolver;
}

function stopMusic(fadeTime=1.0){
  if(!AC||!masterGain)return;
  masterGain.gain.linearRampToValueAtTime(0,AC.currentTime+fadeTime);
  if(musicScheduler){clearInterval(musicScheduler);musicScheduler=null;}
  setTimeout(()=>{
    musicNodes.forEach(n=>{try{n.stop();}catch(e){}});
    musicNodes=[];
    currentTheme=null;
  },(fadeTime+0.1)*1000);
}

function playNote(freq, type, dur, vol, delay=0, detune=0){
  if(!AC||!masterGain||!musicEnabled)return;
  const t=AC.currentTime+delay;
  const o=AC.createOscillator();
  const g=AC.createGain();
  o.type=type;
  o.frequency.value=freq;
  o.detune.value=detune;
  o.connect(g);
  g.connect(reverbNode||masterGain);
  if(reverbNode)reverbNode.connect(masterGain);
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+0.01);
  g.gain.exponentialRampToValueAtTime(0.001,t+dur);
  o.start(t);
  o.stop(t+dur+0.05);
  musicNodes.push(o);
  // cleanup
  setTimeout(()=>{musicNodes=musicNodes.filter(x=>x!==o);},((delay+dur+0.1)*1000));
}

function playBass(root, scaleArr, beat, tempo){
  if(!AC||!musicEnabled)return;
  const step=60/tempo;
  const pattern=[0,0,4,0, 0,0,3,5]; // bass pattern index into scale
  for(let i=0;i<8;i++){
    const note=root+scaleArr[pattern[i]%scaleArr.length]-12;
    const freq=midiToHz(note);
    playNote(freq,'sawtooth',step*0.7,0.18,i*step*0.5);
    // sub octave
    playNote(freq/2,'sine',step*0.9,0.12,i*step*0.5);
  }
}

function playArp(root, scaleArr, beat, tempo, bright=false){
  if(!AC||!musicEnabled)return;
  const step=60/tempo/4; // sixteenth notes
  const notes=[0,2,4,7, 4,2,7,4, 0,4,7,12, 7,4,2,0];
  for(let i=0;i<16;i++){
    const idx=notes[i]%scaleArr.length;
    const oct=Math.floor(notes[i]/scaleArr.length)*12;
    const freq=midiToHz(root+scaleArr[idx]+oct+(bright?12:0));
    playNote(freq, bright?'triangle':'square', step*0.4, bright?0.06:0.04, i*step, (Math.random()-0.5)*8);
  }
}

function playPad(root, scaleArr, tempo){
  if(!AC||!musicEnabled)return;
  const dur=60/tempo*8;
  const chord=[0,2,4,7]; // minor 7th-ish voicing
  chord.forEach((interval,i)=>{
    const freq=midiToHz(root+scaleArr[interval%scaleArr.length]+12);
    playNote(freq,'sine',dur,0.07,i*0.04,(i%2===0?-6:6));
    // shimmer
    playNote(freq*1.003,'sine',dur,0.04,i*0.04+0.02);
  });
}

function playPerc(tempo){
  if(!AC||!musicEnabled)return;
  const step=60/tempo;
  // kick pattern
  const kicks=[1,0,0,1, 0,0,1,0];
  // snare on 2+4
  const snares=[0,0,1,0, 0,0,1,0];
  // hihat every 8th
  for(let i=0;i<8;i++){
    const t=i*step*0.5;
    if(kicks[i]){
      // kick — sine burst down
      const o=AC.createOscillator(),g=AC.createGain();
      o.type='sine';o.frequency.setValueAtTime(120,AC.currentTime+t);
      o.frequency.exponentialRampToValueAtTime(40,AC.currentTime+t+0.12);
      o.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.6,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.18);
      o.start(AC.currentTime+t);o.stop(AC.currentTime+t+0.2);
      musicNodes.push(o);
    }
    if(snares[i]){
      // snare — noise burst
      const bufSz=AC.sampleRate*0.12;
      const buf=AC.createBuffer(1,bufSz,AC.sampleRate);
      const d=buf.getChannelData(0);
      for(let j=0;j<bufSz;j++) d[j]=(Math.random()*2-1)*Math.pow(1-j/bufSz,1.5);
      const src=AC.createBufferSource(),g=AC.createGain();
      src.buffer=buf;
      const filt=AC.createBiquadFilter();
      filt.type='bandpass';filt.frequency.value=2000;filt.Q.value=0.8;
      src.connect(filt);filt.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.35,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.12);
      src.start(AC.currentTime+t);src.stop(AC.currentTime+t+0.14);
      musicNodes.push(src);
    }
    // hihat
    {
      const bufSz=AC.sampleRate*0.04;
      const buf=AC.createBuffer(1,bufSz,AC.sampleRate);
      const d=buf.getChannelData(0);
      for(let j=0;j<bufSz;j++) d[j]=(Math.random()*2-1)*Math.pow(1-j/bufSz,3);
      const src=AC.createBufferSource(),g=AC.createGain();
      src.buffer=buf;
      const filt=AC.createBiquadFilter();
      filt.type='highpass';filt.frequency.value=8000;
      src.connect(filt);filt.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.15,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.04);
      src.start(AC.currentTime+t);src.stop(AC.currentTime+t+0.05);
    }
  }
}

function startMusicTheme(themeName){
  if(!AC)return;
  if(currentTheme===themeName)return;
  stopMusic(0.6);
  if(!musicEnabled)return;
  setTimeout(()=>{
    if(!AC)return;
    currentTheme=themeName;
    const th=THEMES[themeName]||THEMES.menu;
    masterGain=AC.createGain();
    masterGain.gain.setValueAtTime(0,AC.currentTime);
    masterGain.gain.linearRampToValueAtTime(th.vol*settingsMusicVol,AC.currentTime+1.2);
    masterGain.connect(AC.destination);
    // reverb
    reverbNode=createReverb(AC);
    const reverbGain=AC.createGain();
    reverbGain.gain.value=themeName==='fight'||themeName==='boss'?0.15:0.35;
    reverbNode.connect(reverbGain);
    reverbGain.connect(masterGain);

    const barDur=(60/th.tempo)*8; // 2 bars of 4/4
    let beat=0;
    function scheduleBeat(){
      if(!masterGain||!musicEnabled)return;
      const sc=SCALES[th.scale];
      if(th.bass) playBass(th.root,sc,beat,th.tempo);
      if(th.arp)  playArp(th.root,sc,beat,th.tempo,themeName==='boss');
      if(th.pad)  playPad(th.root,sc,th.tempo);
      if(th.perc) playPerc(th.tempo);
      beat++;
    }
    scheduleBeat();
    musicScheduler=setInterval(scheduleBeat, barDur*1000);
  },650);
}

function toggleMusic(){
  musicEnabled=!musicEnabled;
  const btn=document.getElementById('music-toggle');
  if(!musicEnabled){
    stopMusic(0.4);
    if(btn){btn.innerText='🎵 OFF';btn.style.opacity='0.4';}
  } else {
    if(btn){btn.innerText='🎵 ON';btn.style.opacity='1';}
    // restart appropriate theme
    if(gameState==='fight'||gameState==='post'){
      const isBoss=[3,6,8,10,11,13,14].includes(fType);
      startMusicTheme(isBoss?'boss':'fight');
    } else if(gameState==='story'){
      startMusicTheme('story');
    } else {
      startMusicTheme('menu');
    }
  }
}

// Music toggle button
(function createMusicToggle(){
  const btn=document.createElement('button');
  btn.id='music-toggle';
  btn.innerText='🎵 ON';
  btn.style.cssText=`position:fixed;bottom:16px;right:16px;z-index:200;
    background:rgba(0,0,0,0.75);border:1px solid rgba(200,147,26,0.4);
    color:rgba(200,160,70,0.85);font-family:'Cinzel',serif;font-size:10px;
    letter-spacing:2px;padding:7px 14px;border-radius:3px;cursor:pointer;
    pointer-events:auto;transition:all 0.2s;/* bd-filter removed */`;
  btn.onclick=toggleMusic;
  const __mountMusicBtn = () => {
    const mount = document.body || document.documentElement;
    if (mount && !btn.isConnected) mount.appendChild(btn);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', __mountMusicBtn, { once:true });
  } else {
    __mountMusicBtn();
  }


/* ─── js/audio_bg.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   EXTERNAL AUDIO — bg.mp3 + bgboss.mp3
   Put files in assets/audio/
   Missing files fall back to the built-in music/visual base.
════════════════════════════════════════════════ */

})();


// ── EXTERNAL AUDIO + FALLBACK LAYER ──
let bgAudio = null;
let bossBgAudio = null;
let bgAudioStarted = false;
let activeBgTrack = 'bg';
let externalAudioInitPromise = null;
let externalBgReady = false;
let externalBossReady = false;
window.__chugUseExternalMusic = false;

function __makeLoopingAudio(url){
  const a = new Audio(url);
  a.loop = true;
  a.preload = 'auto';
  a.volume = 0;
  try{ a.load(); }catch(_e){}
  return a;
}

async function ensureExternalBgAudio(){
  if(externalAudioInitPromise) return externalAudioInitPromise;
  externalAudioInitPromise = (async ()=>{
    const assetCfg = (window.CHUG_ASSETS && window.CHUG_ASSETS.audio) || {};
    const bgCandidates = assetCfg.bg || ['assets/audio/bg.mp3','bg.mp3'];
    const bossCandidates = assetCfg.boss || ['assets/audio/bgboss.mp3','assets/audio/bossbg.mp3','bgboss.mp3','bossbg.mp3'];

    const bgUrl = (typeof window.chugFirstAvailableAsset === 'function')
      ? await window.chugFirstAvailableAsset(bgCandidates, 'audio')
      : null;
    if(bgUrl){
      bgAudio = __makeLoopingAudio(bgUrl);
      externalBgReady = true;
      window.__chugUseExternalMusic = true;
    }

    const bossUrl = (typeof window.chugFirstAvailableAsset === 'function')
      ? await window.chugFirstAvailableAsset(bossCandidates, 'audio')
      : null;
    if(bossUrl){
      bossBgAudio = __makeLoopingAudio(bossUrl);
      externalBossReady = true;
      window.__chugUseExternalMusic = true;
    } else if(bgAudio){
      bossBgAudio = bgAudio; // graceful fallback: same bg track in boss fights
    }

    if(window.__chugUseExternalMusic){
      try{ stopMusic(0.15); }catch(_e){}
    }
    return { bg:bgAudio, boss:bossBgAudio };
  })();
  return externalAudioInitPromise;
}

function _fadeAudio(fromAudio, toAudio, duration=800){
  if(!fromAudio || !toAudio || fromAudio === toAudio){
    if(toAudio){
      const targetVol = toAudio === bossBgAudio ? 0.75*settingsMusicVol : 0.6*settingsMusicVol;
      toAudio.volume = targetVol;
      toAudio.play().catch(()=>{});
    }
    if(fromAudio && fromAudio !== toAudio) fromAudio.pause();
    return;
  }
  const steps=20, interval=duration/steps;
  const startVol=fromAudio.volume;
  let step=0;
  const t=setInterval(()=>{
    step++;
    fromAudio.volume=Math.max(0,startVol*(1-step/steps));
    if(step>=steps){
      clearInterval(t);
      fromAudio.pause();
      fromAudio.volume=startVol;
    }
  },interval);
  toAudio.currentTime=0;
  toAudio.volume=0;
  toAudio.play().catch(()=>{});
  let step2=0;
  const targetVol=toAudio===bossBgAudio?0.75*settingsMusicVol:0.6*settingsMusicVol;
  const t2=setInterval(()=>{
    step2++;
    toAudio.volume=Math.min(targetVol,targetVol*(step2/steps));
    if(step2>=steps)clearInterval(t2);
  },interval);
}

function startBgAudio(){
  ensureExternalBgAudio().then(()=>{
    if(!window.__chugUseExternalMusic || !bgAudio || !musicEnabled) return;
    if(bgAudioStarted) return;
    bgAudioStarted=true;
    bgAudio.volume=0.6*settingsMusicVol;
    bgAudio.play().catch(()=>{});
    activeBgTrack='bg';
  }).catch(()=>{});
}

function switchToBossBg(){
  ensureExternalBgAudio().then(()=>{
    if(!window.__chugUseExternalMusic || !musicEnabled || !bgAudio) return;
    if(activeBgTrack==='boss') return;
    activeBgTrack='boss';
    if(externalBossReady && bossBgAudio) _fadeAudio(bgAudio, bossBgAudio);
    else if(bgAudio) {
      bgAudio.volume = 0.72 * settingsMusicVol;
      bgAudio.play().catch(()=>{});
    }
  }).catch(()=>{});
}

function switchToNormalBg(){
  ensureExternalBgAudio().then(()=>{
    if(!window.__chugUseExternalMusic || !musicEnabled || !bgAudio) return;
    if(activeBgTrack==='bg') return;
    activeBgTrack='bg';
    if(externalBossReady && bossBgAudio && bossBgAudio !== bgAudio) _fadeAudio(bossBgAudio, bgAudio);
    else {
      bgAudio.volume = 0.6 * settingsMusicVol;
      bgAudio.play().catch(()=>{});
    }
  }).catch(()=>{});
}

function setBgVolume(v){
  if(bgAudio) bgAudio.volume=Math.max(0,Math.min(1,v*settingsMusicVol));
  if(bossBgAudio && bossBgAudio !== bgAudio) bossBgAudio.volume=Math.max(0,Math.min(1,(v*1.25)*settingsMusicVol));
}
function pauseBgAudio(){ if(bgAudio) bgAudio.pause(); if(bossBgAudio && bossBgAudio !== bgAudio) bossBgAudio.pause(); }
function resumeBgAudio(){
  if(!bgAudioStarted || !window.__chugUseExternalMusic || !musicEnabled) return;
  if(activeBgTrack==='boss' && bossBgAudio) bossBgAudio.play().catch(()=>{});
  else if(bgAudio) bgAudio.play().catch(()=>{});
}

// External music overrides the procedural themes when files exist.
const __origStartMusicTheme = startMusicTheme;
startMusicTheme = function(themeName){
  if(window.__chugUseExternalMusic){
    try{ stopMusic(0.12); }catch(_e){}
    if(themeName === 'boss') switchToBossBg();
    else startBgAudio(), switchToNormalBg();
    return;
  }
  return __origStartMusicTheme.apply(this, arguments);
};

// Music toggle controls both external bg audio and fallback synth music
function toggleMusic(){
  musicEnabled = !musicEnabled;
  const btn = document.getElementById('music-toggle');
  if(!musicEnabled){
    stopMusic(0.4);
    pauseBgAudio();
    if(btn){ btn.innerText='🎵 OFF'; btn.style.opacity='0.4'; }
  } else {
    ensureExternalBgAudio().then(()=>{
      if(window.__chugUseExternalMusic){
        if(activeBgTrack==='boss') switchToBossBg();
        else startBgAudio(), switchToNormalBg();
      } else {
        const isBoss=[3,6,8,10,11,13,14,15,18,19,20,21].includes(fType);
        if(gameState==='fight'||gameState==='post') __origStartMusicTheme(isBoss?'boss':'fight');
        else if(gameState==='story') __origStartMusicTheme('story');
        else __origStartMusicTheme('menu');
      }
      if(btn){ btn.innerText='🎵 ON'; btn.style.opacity='1'; }
    }).catch(()=>{
      if(btn){ btn.innerText='🎵 ON'; btn.style.opacity='1'; }
    });
  }
}


/* ─── js/engine.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   GAME ENGINE CORE
   Canvas setup, game state variables, settings functions.
   DO NOT reorder — other files depend on vars declared here.
════════════════════════════════════════════════ */

// VO stubs (removed)
function stopVO(){}
function speakVO(){}

// ── CANVAS ──
let cvs=document.getElementById('game');
if(!cvs){
  cvs=document.createElement('canvas');
  cvs.id='game';
  (document.body || document.documentElement)?.appendChild(cvs);
}
const ctx=cvs ? cvs.getContext('2d') : null;
let W,H,GND;
function resize(){
  if(!cvs || !ctx) return;
  W=window.innerWidth;H=window.innerHeight;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  cvs.width=W*dpr;cvs.height=H*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  GND=H-80;
}
window.addEventListener('resize',resize); if(ctx) resize();

// ── BG PARTICLES ──
(function spawnBgParticles(){
  let container=document.getElementById('bgParticles');
  if(!container){
    container=document.createElement('div');
    container.id='bgParticles';
    container.className='bg-particles';
    (document.getElementById('bg-layer') || document.body || document.documentElement)?.appendChild(container);
  }
  if(!container) return;
  for(let i=0;i<8;i++){
    const el=document.createElement('div');
    el.className='bp';
    const size=Math.random()*3+1;
    el.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;
      bottom:${Math.random()*40}%;animation-duration:${8+Math.random()*12}s;
      animation-delay:${Math.random()*10}s;opacity:0;`;
    container.appendChild(el);
  }
})();

// ── STATE ──
let gameState='menu';
var coins=0, weapon='none', armor='none', rageMode2=false;
let strengthUpg=0,speedUpg=0,enduranceUpg=0;
let scIdx=0,pWins=0,eWins=0,curRound=1,fType=1,timeLeft=50,lastTick=0;
var currentPart=1;
window.currentPart=currentPart;
let envRage=false,hitStop=0,screenShake=0;
function syncCurrentPartGlobal(){ window.currentPart=currentPart; }
let comboCount=0,comboTimer=0,lastComboTime=0;

// ── SETTINGS ──
let settingsMusicVol=0.7,settingsSfxVol=1.0,settingsShake=true,settingsComboDsp=true;
function adjustVol(type,delta){
  if(type==='music'){
    settingsMusicVol=Math.max(0,Math.min(1,settingsMusicVol+delta));
    (document.getElementById('music-vol-fill')||window.__sf2NullElement).style.width=(settingsMusicVol*100)+'%';
    if(masterGain)masterGain.gain.setTargetAtTime(settingsMusicVol,AC.currentTime,0.1);
  } else {
    settingsSfxVol=Math.max(0,Math.min(1,settingsSfxVol+delta));
    (document.getElementById('sfx-vol-fill')||window.__sf2NullElement).style.width=(settingsSfxVol*100)+'%';
  }
  try{localStorage.setItem('chug_settings',JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function toggleShake(){
  settingsShake=!settingsShake;
  document.getElementById('shake-toggle').innerText=settingsShake?'ON':'OFF';
  try{localStorage.setItem('chug_settings',JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function toggleComboDsp(){
  settingsComboDsp=!settingsComboDsp;
  document.getElementById('combo-toggle').innerText=settingsComboDsp?'ON':'OFF';
  if(!settingsComboDsp)(document.getElementById('combo-display')||window.__sf2NullElement).style.display='none';
  try{localStorage.setItem('chug_settings',JSON.stringify({mv:settingsMusicVol,sv:settingsSfxVol,sh:settingsShake,cd:settingsComboDsp}));}catch(e){}
}
function loadSettings(){
  try{const raw=localStorage.getItem('chug_settings');if(raw){const s=JSON.parse(raw);settingsMusicVol=s.mv??0.7;settingsSfxVol=s.sv??1.0;settingsShake=s.sh??true;settingsComboDsp=s.cd??true;}}catch(e){}
  loadCtrlSettings();
  (document.getElementById('music-vol-fill')||window.__sf2NullElement).style.width=(settingsMusicVol*100)+'%';
  (document.getElementById('sfx-vol-fill')||window.__sf2NullElement).style.width=(settingsSfxVol*100)+'%';
  document.getElementById('shake-toggle').innerText=settingsShake?'ON':'OFF';
  document.getElementById('combo-toggle').innerText=settingsComboDsp?'ON':'OFF';
  applyCtrlSettings();
}
function openSettings(){
  initAudio();
  const st=document.getElementById('shake-toggle');
  const ct=document.getElementById('combo-toggle');
  const cvt=document.getElementById('ctrl-visibility-toggle');
  if(st)st.innerText=settingsShake?'ON':'OFF';
  if(ct)ct.innerText=settingsComboDsp?'ON':'OFF';
  if(cvt)cvt.innerText=settingsCtrlHidden?'HIDDEN':'SHOW';
  const mf=document.getElementById('music-vol-fill');
  const sf=document.getElementById('sfx-vol-fill');
  if(mf)mf.style.width=(settingsMusicVol*100)+'%';
  if(sf)sf.style.width=(settingsSfxVol*100)+'%';
  syncCtrlEditorUI();
  showScreen('settings-screen');
}
function closeSettings(){showScreen('menu-screen');}

// ══════════════════════════════════════════
// CONTROL EDITOR / DRAGGABLE TOUCH HUD
// Future buttons are auto-discovered when they are:
//   1) inside #controls with class .c-btn
//   2) marked with .ctrl-editable
//   3) marked with [data-ctrl-editable="true"]
// Rage + joystick are included automatically.
// Use data-ctrl-label="BLOCK" to override the editor label.
// ══════════════════════════════════════════

let ctrlPositions = {};
let settingsCtrlHidden = false;
let _ctrlEditorActive = false;
const CTRL_INTERNAL_IDS = new Set(['btn-l', 'btn-r', 'btn-j']);
const CTRL_EXTRA_REGISTRY = {};

function registerCtrlEditable(id, label){
  if(!id) return;
  CTRL_EXTRA_REGISTRY[id] = label || CTRL_EXTRA_REGISTRY[id] || '';
}
window.registerCtrlEditable = registerCtrlEditable;

function _defaultCtrlLabel(id, el){
  if(!el && document.getElementById(id)) el = document.getElementById(id);
  return (
    (el && el.dataset && el.dataset.ctrlLabel) ||
    CTRL_EXTRA_REGISTRY[id] ||
    ({
      sf2DpadWrap: 'MOVE',
      'btn-rage': 'RAGE',
      'btn-p': 'PUNCH',
      'btn-k': 'KICK',
      'btn-g': 'GRAB',
      'btn-t': 'THROW',
      'btn-range': 'RANGE',
    })[id] ||
    (el && (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 14)) ||
    id.replace(/^btn-/, '').replace(/-/g, ' ').toUpperCase()
  );
}

function _discoverCtrlElements(){
  const map = new Map();
  const ctrls = document.getElementById('controls');
  const roots = [];
  if(ctrls) roots.push(...ctrls.querySelectorAll('.c-btn, .ctrl-editable, [data-ctrl-editable="true"]'));
  ['sf2DpadWrap', 'btn-rage'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) roots.push(el);
  });
  Object.keys(CTRL_EXTRA_REGISTRY).forEach(id=>{
    const el = document.getElementById(id);
    if(el) roots.push(el);
  });

  roots.forEach(el => {
    if(!el || !el.id || CTRL_INTERNAL_IDS.has(el.id)) return;
    const rect = el.getBoundingClientRect();
    const forced = el.dataset && el.dataset.ctrlEditable === 'true';
    const bigEnough = rect.width > 10 && rect.height > 10;
    if(!forced && !bigEnough && el.id !== 'sf2DpadWrap' && el.id !== 'btn-rage') return;
    map.set(el.id, el);
  });

  return Array.from(map.values());
}

function _storeBaseTransforms(){
  _discoverCtrlElements().forEach(el => {
    if(!el) return;
    if(el.dataset.baseTransform === undefined) el.dataset.baseTransform = el.style.transform || '';
  });
}

function saveCtrlSettings(){
  try{
    const raw = localStorage.getItem('chug_settings');
    const s = raw ? JSON.parse(raw) : {};
    s.ch = settingsCtrlHidden;
    s.cp = ctrlPositions;
    localStorage.setItem('chug_settings', JSON.stringify(s));
  }catch(e){}
}

function loadCtrlSettings(){
  try{
    const raw = localStorage.getItem('chug_settings');
    if(raw){
      const s = JSON.parse(raw);
      settingsCtrlHidden = s.ch ?? false;
      ctrlPositions = s.cp || {};
    }
  }catch(e){}
}

function applyCtrlSettings(){
  const ctrls = document.getElementById('controls');
  if(!ctrls) return;
  ctrls.style.opacity = settingsCtrlHidden ? '0' : '1';
  ctrls.style.pointerEvents = settingsCtrlHidden ? 'none' : '';

  _storeBaseTransforms();
  _discoverCtrlElements().forEach(el => {
    const id   = el.id;
    const pos  = ctrlPositions[id];
    const base = el.dataset.baseTransform || '';
    if(pos && (pos.dx || pos.dy)){
      el.style.transform = `${base} translate(${pos.dx || 0}px, ${pos.dy || 0}px)`;
    } else {
      el.style.transform = base;
    }
  });
}

function toggleCtrlVisibility(){
  settingsCtrlHidden = !settingsCtrlHidden;
  const btn = document.getElementById('ctrl-visibility-toggle');
  if(btn) btn.innerText = settingsCtrlHidden ? 'HIDDEN' : 'SHOW';
  applyCtrlSettings();
  saveCtrlSettings();
}

function resetCtrlPos(){
  ctrlPositions = {};
  _discoverCtrlElements().forEach(el => {
    const base = (el.dataset && el.dataset.baseTransform) || '';
    el.style.transform = base;
  });
  saveCtrlSettings();
}

function _ghostContentForCtrl(id, el, rect){
  const wrap = document.createElement('div');
  wrap.style.cssText = `
    position:relative;width:${Math.max(rect.width, 56)}px;height:${Math.max(rect.height, 56)}px;
    display:flex;align-items:center;justify-content:center;overflow:visible;
  `;

  if(id === 'sf2DpadWrap'){
    const ghost = document.createElement('div');
    ghost.style.cssText = `
      width:100%;height:100%;border-radius:50%;
      background:radial-gradient(circle at 35% 30%, rgba(20,16,6,0.92), rgba(3,2,4,0.92));
      border:2px dashed rgba(240,200,64,0.92);
      box-shadow:0 0 22px rgba(240,200,64,0.45), inset 0 0 22px rgba(0,0,0,0.55);
      position:relative;
    `;
    const knob = document.createElement('div');
    knob.style.cssText = `
      position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      width:${Math.max(32, rect.width * 0.36)}px;height:${Math.max(32, rect.width * 0.36)}px;border-radius:50%;
      background:radial-gradient(circle at 38% 35%, #7a5018, #3a2208);
      border:2px solid rgba(180,120,40,0.7);box-shadow:0 3px 12px rgba(0,0,0,0.6);
    `;
    ghost.appendChild(knob);
    wrap.appendChild(ghost);
  } else {
    const clone = el.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll && clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
    clone.style.pointerEvents = 'none';
    clone.style.margin = '0';
    clone.style.position = 'relative';
    clone.style.left = 'auto';
    clone.style.top = 'auto';
    clone.style.right = 'auto';
    clone.style.bottom = 'auto';
    clone.style.transform = 'none';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.opacity = '1';
    clone.style.boxShadow = '0 0 22px rgba(240,200,64,0.4), 0 0 0 2px rgba(240,200,64,0.34) inset';
    clone.style.borderStyle = 'dashed';
    clone.style.borderColor = 'rgba(240,200,64,0.92)';
    wrap.appendChild(clone);
  }

  const tag = document.createElement('div');
  tag.style.cssText = `
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    min-width:44px;padding:4px 8px;border-radius:999px;
    background:rgba(0,0,0,0.68);border:1px solid rgba(240,200,64,0.48);
    color:#f4d57a;font-family:'Cinzel',serif;font-size:8px;font-weight:700;
    letter-spacing:1.6px;text-align:center;pointer-events:none;
    text-shadow:0 1px 4px rgba(0,0,0,0.8);
  `;
  tag.textContent = _defaultCtrlLabel(id, el);
  wrap.appendChild(tag);
  return wrap;
}

function openCtrlEditor(){
  if(_ctrlEditorActive) return;
  _ctrlEditorActive = true;
  _storeBaseTransforms();

  const ctrls = document.getElementById('controls');
  if(ctrls){
    ctrls.style.display = 'flex';
    ctrls.style.opacity = '1';
    ctrls.style.pointerEvents = 'none';
  }

  const overlay = document.createElement('div');
  overlay.id = 'ctrl-editor-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:rgba(0,0,0,0.55);
    touch-action:none;user-select:none;-webkit-user-select:none;
  `;
  document.body.appendChild(overlay);

  const bar = document.createElement('div');
  bar.style.cssText = `
    position:absolute;top:0;left:0;right:0;height:56px;
    background:rgba(8,4,2,0.98);border-bottom:2px solid #c8931a;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 16px;font-family:'Cinzel',serif;z-index:2;
    pointer-events:auto;touch-action:auto;
  `;
  overlay.appendChild(bar);

  const title = document.createElement('span');
  title.style.cssText = 'color:#c8931a;font-size:11px;letter-spacing:3px;';
  title.textContent = 'EDIT CONTROLS';
  bar.appendChild(title);

  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'display:flex;gap:10px;touch-action:auto;';
  bar.appendChild(btnWrap);

  function makeBarBtn(label, bg, cb){
    const b = document.createElement('button');
    b.style.cssText = `
      background:${bg};border:${bg==='transparent'?'1px solid rgba(212,160,23,0.5)':'none'};
      color:${bg==='transparent'?'#c8931a':'#0a0a0a'};
      font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;
      font-weight:700;padding:8px 16px;cursor:pointer;border-radius:2px;
      touch-action:auto;pointer-events:auto;
    `;
    b.textContent = label;
    b.addEventListener('click', cb);
    b.addEventListener('touchend', e=>{ e.preventDefault(); e.stopPropagation(); cb(); }, {passive:false});
    btnWrap.appendChild(b);
  }

  const _defRects = {};
  const _ghosts = {};
  let _drag = null;

  function restoreGhostDefaults(){
    Object.values(_ghosts).forEach(ghost => {
      const def = _defRects[ghost.dataset.id];
      if(!def) return;
      ghost.style.left = (def.cx - def.w/2) + 'px';
      ghost.style.top  = (def.cy - def.h/2) + 'px';
    });
  }

  makeBarBtn('RESET', 'transparent', ()=>{
    resetCtrlPos();
    restoreGhostDefaults();
  });
  makeBarBtn('DONE', '#c8931a', ()=> closeCtrlEditor());

  const hint = document.createElement('div');
  hint.style.cssText = `
    position:absolute;top:66px;left:50%;transform:translateX(-50%);
    color:rgba(200,160,60,0.65);font-family:Cinzel,serif;
    font-size:9px;letter-spacing:2px;white-space:nowrap;pointer-events:none;
  `;
  hint.textContent = 'DRAG ANY HUD BUTTON · NEW BUTTONS AUTO-APPEAR';
  overlay.appendChild(hint);

  function onDragStart(ghost, id, px, py){
    _drag = {
      ghost,
      id,
      startGX: parseFloat(ghost.style.left),
      startGY: parseFloat(ghost.style.top),
      startPX: px,
      startPY: py,
    };
    ghost.style.cursor = 'grabbing';
    ghost.style.boxShadow = '0 0 32px rgba(240,200,60,0.92)';
    ghost.style.borderColor = '#ffffff';
    ghost.style.zIndex = '10003';
  }

  function onDragMove(px, py){
    if(!_drag) return;
    const {ghost, startGX, startGY, startPX, startPY, id} = _drag;
    const def = _defRects[id];
    const w = def ? def.w : 60;
    const h = def ? def.h : 60;
    const nx = Math.max(0, Math.min(window.innerWidth - w, startGX + (px - startPX)));
    const ny = Math.max(56, Math.min(window.innerHeight - h, startGY + (py - startPY)));
    ghost.style.left = nx + 'px';
    ghost.style.top  = ny + 'px';
  }

  function onDragEnd(){
    if(!_drag) return;
    const {ghost, id} = _drag;
    ghost.style.cursor = 'grab';
    ghost.style.boxShadow = '0 0 18px rgba(240,200,60,0.42)';
    ghost.style.borderColor = 'rgba(240,200,64,0.92)';
    ghost.style.zIndex = '10001';

    const def = _defRects[id];
    if(def){
      const gx = parseFloat(ghost.style.left);
      const gy = parseFloat(ghost.style.top);
      ctrlPositions[id] = {
        dx: (gx + def.w / 2) - def.cx,
        dy: (gy + def.h / 2) - def.cy,
      };
      saveCtrlSettings();
      applyCtrlSettings();
    }
    _drag = null;
  }

  overlay.addEventListener('touchmove', e=>{
    if(!_drag) return;
    e.preventDefault();
    const t = e.touches[0];
    if(t) onDragMove(t.clientX, t.clientY);
  }, {passive:false});
  overlay.addEventListener('touchend', e=>{
    if(!_drag) return;
    e.preventDefault();
    onDragEnd();
  }, {passive:false});
  overlay.addEventListener('touchcancel', ()=>{ onDragEnd(); }, {passive:false});
  overlay.addEventListener('mousemove', e=>{ if(_drag) onDragMove(e.clientX, e.clientY); });
  overlay.addEventListener('mouseup', ()=> onDragEnd());

  requestAnimationFrame(()=> requestAnimationFrame(()=>{
    _discoverCtrlElements().forEach(el => {
      const id = el.id;
      const rect = el.getBoundingClientRect();
      const w = rect.width || 64;
      const h = rect.height || 64;
      const baseCx = rect.width ? rect.left + rect.width / 2 : (id === 'sf2DpadWrap' ? 110 : window.innerWidth - 90);
      const baseCy = rect.height ? rect.top + rect.height / 2 : (id === 'sf2DpadWrap' ? window.innerHeight - 120 : window.innerHeight - 100);
      const saved = ctrlPositions[id] || {dx:0, dy:0};
      const cx = baseCx + (saved.dx || 0);
      const cy = baseCy + (saved.dy || 0);
      _defRects[id] = { cx: baseCx, cy: baseCy, w, h };

      const ghost = document.createElement('div');
      ghost.className = '_ce-ghost';
      ghost.dataset.id = id;
      ghost.style.cssText = `
        position:fixed;
        left:${cx - w/2}px;top:${cy - h/2}px;
        width:${w}px;height:${h}px;
        display:flex;align-items:center;justify-content:center;
        cursor:grab;z-index:10001;touch-action:none;
        border-radius:${id === 'sf2DpadWrap' ? '50%' : '20px'};
        box-shadow:0 0 18px rgba(240,200,60,0.42);
        pointer-events:auto;
      `;
      ghost.appendChild(_ghostContentForCtrl(id, el, {width:w, height:h}));
      overlay.appendChild(ghost);
      _ghosts[id] = ghost;

      ghost.addEventListener('touchstart', e=>{
        e.preventDefault();
        e.stopPropagation();
        const t = e.touches[0];
        if(t) onDragStart(ghost, id, t.clientX, t.clientY);
      }, {passive:false});
      ghost.addEventListener('mousedown', e=>{
        e.preventDefault();
        e.stopPropagation();
        onDragStart(ghost, id, e.clientX, e.clientY);
      });
    });
  }));
}

function closeCtrlEditor(){
  _ctrlEditorActive = false;
  const overlay = document.getElementById('ctrl-editor-overlay');
  if(overlay) overlay.remove();
  applyCtrlSettings();
  const ctrls = document.getElementById('controls');
  if(ctrls && typeof gameState !== 'undefined' && gameState !== 'menu'){
    ctrls.style.display = 'none';
  }
}

function syncCtrlEditorUI(){
  const btn = document.getElementById('ctrl-visibility-toggle');
  if(btn) btn.innerText = settingsCtrlHidden ? 'HIDDEN' : 'SHOW';
}

// Patch loadSettings to load ctrl positions too
function syncCtrlEditorUI(){} // no-op now, editor is fullscreen



// ── PER-PART BACKGROUNDS ──
const PART_BG={
  1:{bg1:'#1a0a00',bg2:'#000',fog:'rgba(80,30,0,0.18)',ground:'#0d0d0d',accent:'rgba(200,147,26,0.4)',moonCol:'radial-gradient(circle,#ffe8c0 0%,#d4a843 50%,#7a5010 100%)',moonShadow:'rgba(200,140,30,0.3)',toriiOp:0.15},
  2:{bg1:'#000a14',bg2:'#000',fog:'rgba(0,40,80,0.12)',ground:'#080c0f',accent:'rgba(0,180,220,0.3)',moonCol:'radial-gradient(circle,#c0d8ff 0%,#4080c0 50%,#102050 100%)',moonShadow:'rgba(0,80,180,0.3)',toriiOp:0.1},
  3:{bg1:'#0a0a18',bg2:'#000',fog:'rgba(40,0,80,0.15)',ground:'#0a080f',accent:'rgba(120,80,220,0.35)',moonCol:'radial-gradient(circle,#e0d0ff 0%,#8060c0 50%,#200840 100%)',moonShadow:'rgba(100,0,200,0.3)',toriiOp:0.08},
  4:{bg1:'#14080a',bg2:'#000',fog:'rgba(100,0,20,0.14)',ground:'#0f0808',accent:'rgba(200,0,40,0.3)',moonCol:'radial-gradient(circle,#ffc0c0 0%,#c04040 50%,#400010 100%)',moonShadow:'rgba(200,0,40,0.3)',toriiOp:0.12},
  5:{bg1:'#0a0010',bg2:'#000',fog:'rgba(80,0,120,0.18)',ground:'#080008',accent:'rgba(180,0,220,0.35)',moonCol:'radial-gradient(circle,#e0a0ff 0%,#9000cc 50%,#2a0040 100%)',moonShadow:'rgba(140,0,200,0.4)',toriiOp:0.06},
  6:{bg1:'#000810',bg2:'#000',fog:'rgba(0,20,60,0.16)',ground:'#050808',accent:'rgba(0,120,180,0.3)',moonCol:'radial-gradient(circle,#a0c0ff 0%,#2060a0 50%,#001030 100%)',moonShadow:'rgba(0,60,160,0.35)',toriiOp:0.05},
  7:{bg1:'#100004',bg2:'#000',fog:'rgba(120,0,20,0.2)',ground:'#0c0003',accent:'rgba(220,0,40,0.4)',moonCol:'radial-gradient(circle,#ff8888 0%,#cc0020 50%,#440000 100%)',moonShadow:'rgba(220,0,30,0.5)',toriiOp:0.04},
  8:{bg1:'#0a0008',bg2:'#000',fog:'rgba(60,0,80,0.2)',ground:'#080006',accent:'rgba(180,0,180,0.35)',moonCol:'radial-gradient(circle,#ff80ff 0%,#aa00aa 50%,#300030 100%)',moonShadow:'rgba(180,0,180,0.4)',toriiOp:0.03},
  9:{bg1:'#100000',bg2:'#000',fog:'rgba(140,0,0,0.22)',ground:'#0c0000',accent:'rgba(220,20,0,0.45)',moonCol:'radial-gradient(circle,#ff4444 0%,#cc0000 50%,#400000 100%)',moonShadow:'rgba(220,0,0,0.5)',toriiOp:0.02},
  10:{bg1:'#0a0000',bg2:'#000',fog:'rgba(180,0,0,0.25)',ground:'#080000',accent:'rgba(255,0,0,0.5)',moonCol:'radial-gradient(circle,#ff2222 0%,#aa0000 50%,#200000 100%)',moonShadow:'rgba(255,0,0,0.6)',toriiOp:0.01},
  11:{bg1:'#000810',bg2:'#000',fog:'rgba(20,40,80,0.2)',ground:'#050810',accent:'rgba(60,120,200,0.35)',moonCol:'radial-gradient(circle,#c0d8ff 0%,#3060a0 50%,#000820 100%)',moonShadow:'rgba(40,80,180,0.4)',toriiOp:0.08},
};
function applyPartBg(part){
  const b=PART_BG[part]||PART_BG[1];
  const root=document.documentElement;
  root.style.setProperty('--part-bg1',b.bg1);
  root.style.setProperty('--part-bg2',b.bg2);
  root.style.setProperty('--part-fog1',b.fog);
  root.style.setProperty('--part-fog2','transparent');
  root.style.setProperty('--part-ground',b.ground);
  root.style.setProperty('--part-accent',b.accent);
  UI.moon.style.background=b.moonCol;
  UI.moon.style.boxShadow=`0 0 40px ${b.moonShadow},0 0 100px ${b.moonShadow.replace('0.3','0.1').replace('0.4','0.15').replace('0.5','0.2')}`;
  const toriiWrap=document.querySelector('.torii-wrap');
  if(toriiWrap)toriiWrap.style.opacity=b.toriiOp;
  // Update part indicator
  const pi=document.getElementById('part-indicator');
  if(pi){pi.innerText=`PART ${part} — ${PART_NAMES[part]||''}`;pi.style.display='block';}
}
let particles=[],floatingTexts=[],landDust=[];
let player=null,enemy=null;
let typingTimer=null,isTyping=false,fullText='';

const SAVE_KEY='chug_shadow_v3_save';

function varRed(){return '#ff003c';}
function varCyan(){return '#00e5ff';}
function varGold(){return '#c8931a';}

// ── SCRIPT ──
function getPartStartIndex(part){const idx=SCRIPT.findIndex(s=>s.part===part);return idx===-1?0:idx;}
function getPartEndIndex(part){
  const parts=getAllStoryParts();
  const i=parts.indexOf(Number(part));
  if(i===-1)return SCRIPT.length-1;
  const nextPart=parts[i+1];
  return nextPart!=null ? getPartStartIndex(nextPart)-1 : SCRIPT.length-1;
}
function clampStoryIndexToPart(idx, part){
  const start=getPartStartIndex(part);
  const end=getPartEndIndex(part);
  const n=Number.isFinite(Number(idx)) ? Number(idx) : start;
  return Math.max(start, Math.min(end, n));
}

const SCRIPT=[

  // PART 1
  {part:1,t:"[LIVE | Stream ON]\nCHAT: W CHUG 🔥 GOAT"},
  {t:'CHUG: "Too easy."'},
  {t:'DONATION: "You play for them… Play for me."',gl:true},
  {t:'[Chat freezes]\nCHUG: "…What?"'},
  {t:'REFLECTION: "You love this."\nCHUG: "Who are you?"'},
  {t:'REFLECTION: "The part that doesn\'t need them."',gl:true},
  {t:'[Chug dragged into the screen]'},
  {t:'CHUG: "…Hello? Bro?"'},
  {t:'GUIDE: "They\'re not here. You broke the boundary."'},
  {t:'CHUG: "My stream?"\nGUIDE: "Gone. Stand without them."'},
  {t:'SYSTEM: BEST OF 3. FIGHT.',fight:1},
  {t:'[Enemy dissolves → red fragment]',col:varRed()},
  {t:'CHUG: "What was that?"\nGUIDE: "A piece of you."'},
  {t:'ENEMIES: "Win… don\'t lose…"\nCHUG: "SHUT UP!"',gl:true,col:varRed()},
  {t:'SYSTEM: RAGE AWAKENED. NO MERCY.',fight:2},
  {t:'CHUG: "…What was that power?"\nGUIDE: "Yours."'},
  {t:'[A massive silhouette appears]'},
  {t:'CHUG: "I\'m not done."\nSYSTEM: FINAL ECHO',fight:3},

  {t:'[EXPANDED ENCOUNTER — OPENING DESCENT]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:2},
  {t:'— END OF PART 1 —',end:true},
  // PART 2
  {part:2,t:'PART 2 — THE WATCHER',col:varCyan()},
  {t:'[Same void | ash falling]\nCHUG walks forward.'},
  {t:'CHUG: "…I heard that."'},
  {t:'[Enemy appears — faster, cleaner]\nENEMY: "You taught me this."'},
  {t:'CHUG: "…What?"\nENEMY: "…That\'s my move."'},
  {t:'SYSTEM: COMBAT EVOLVED',fight:4},
  {t:'[Enemy dissolves]\nSYSTEM: SKILL FRAGMENT ACQUIRED',col:varRed()},
  {t:'CHUG: "These… aren\'t random."\nGUIDE: "No. They\'re familiar."'},
  {t:'[Environment flickers]',gl:true},
  {t:'VOICE (DISTORTED): "Queue again, bro."\nCHUG: "…Bro?"'},
  {t:'[Image glitches before face reveal]',gl:true},
  {t:'CHUG: "You knew this."\nGUIDE: "…I know how this ends."'},
  {t:'CHUG: "Then say it."\nGUIDE: "You won\'t like it."'},
  {t:'[Far distance — silhouette again]'},
  {t:'CHUG: "Stop hiding."\n[Silhouette steps forward]'},
  {t:'WATCHER: "…You\'re slower."\n[Instant silence]'},
  {t:'CHUG: "…"\nWATCHER: "You lost something."'},
  {t:'CHUG: "What?"\nWATCHER: "…Someone."'},
  {t:'WATCHER (quieter):\n"…Left chair in frame the whole time."\n[Pause]\nCHUG: "…How do you know that?"'},
  {t:'WATCHER:\n"…Because I was in it."\n[Instant silence]\n[Watcher disappears]',gl:true},
  {t:'[Floating screen activates]\nChat appears corrupted.',gl:true},
  {t:'CHAT:\n"Where is he?"\n"Solo now?"\n"He got better alone tbh"'},
  {t:'CHAT (GLITCHED):\n"He didn\'t need you."',col:varRed()},
  {t:'[Flash — two players side by side]\nPerfect sync.',gl:true},
  {t:'VOICE: "We\'re unstoppable."\nCHUG: "…We?"'},
  {t:'CHUG: "Who was with me?"\nGUIDE: "…You chose not to remember."'},
  {t:'[Stronger enemy — mirrors Chug]\nMINI BOSS: "I learned from you."'},
  {t:'CHUG: "…Show your face."\nMINI BOSS: "…Not yet."'},
  {t:'SYSTEM: MIRROR MATCH',fight:5},
  {t:'[Defeat]\nSYSTEM: SYNC LEVEL INCREASED',col:varCyan()},
  {t:'CHUG: "To what?"\nGUIDE: "…To him."'},
  {t:'WATCHER: "You\'re starting to remember."\nCHUG: "…I never forgot."'},
  {t:'WATCHER: "…Then why did you leave me behind?"'},
  {t:'CHUG: "…I didn\'t—"\n[Watcher disappears]'},
  {t:'CHUG: "…Who are you?"'},

  {t:'[EXPANDED ENCOUNTER — THE WATCHER]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:4},
  {t:'[EXPANDED ENCOUNTER — THE WATCHER]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:5},
  {t:'— END OF PART 2 —',end:true},


/* ─── js/partbg.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   PER-PART BACKGROUNDS
   Add or edit background themes for each story part.
   Format: N:{bg1,bg2,fog,ground,accent,moonCol,moonShadow,toriiOp}
════════════════════════════════════════════════ */

// PART 3
  {part:3,t:'PART 3 — ECHOES',col:'#aa00ff'},
  {t:'[Deeper void | heavier atmosphere]'},
  {t:'CHUG: "…Feels different."\nGUIDE: "You\'re closer."'},
  {t:'CHUG: "To him?"\nGUIDE: "…To truth."'},
  {t:'[Movement lags]\nCHUG: "…What?"'},
  {t:'[Enemy appears — moves perfectly smooth]\nENEMY: "You\'re behind."'},
  {t:'SYSTEM: LATENCY ENGAGED',fight:6},
  {t:'[Enemy dissolves]\nSYSTEM: LATENCY FRACTURE CLEARED'},
  {t:'GUIDE: "He relies on prediction."'},
  {t:'[Flash: Chug + dual screens]',gl:true},
  {t:'VOICE (CLEARER): "I got your back."'},
  {t:'CHUG freezes.\nCHUG: "…Say it again."'},
  {t:'[Clip glitches out]',gl:true},
  {t:'GUIDE: "It does when winning matters more than people."'},
  {t:'WATCHER: "You still move the same."\nCHUG: "…Show yourself."'},
  {t:'WATCHER: "…Too late."\n[Watcher fades]'},
  {t:'ENEMIES:\n"Force him left."\n"Punish recovery."'},
  {t:'SYSTEM: PREDICTION WINDOW UNLOCKED',fight:7},
  {t:'VOICE 1: "We go big or nothing."\nVOICE 2: "Together."'},
  {t:'CHUG (quiet): "…I said that."'},
  {t:'GUIDE: "…You win."\nCHUG: "…That\'s it?"\nGUIDE: "…And lose everything else."'},
  {t:'[Enemy — perfect mirror]\nELITE: "…Someone you replaced."'},
  {t:'SYSTEM: COMBAT MIRROR',fight:8},
  {t:'[Enemy dissolves slowly]\nSYSTEM: SYNC ++',col:'#aa00ff'},
  {t:'[Flash — two chairs. One empty.]',gl:true},
  {t:'WATCHER: "You didn\'t what?"'},
  {t:'CHUG: "…I didn\'t leave you."'},
  {t:'WATCHER: "…You just kept going."'},
  {t:'CHUG: "…Who did I leave behind?"'},
  {t:'GUIDE: "…You\'ll remember."'},

  {t:'[EXPANDED ENCOUNTER — ECHOES]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:5},
  {t:'— END OF PART 3 —',end:true},
  // PART 4
  {part:4,t:'PART 4 — LEFT BEHIND',col:'#4488aa'},
  {t:'[Deeper layer | ground cracked | heavier gravity]\nSFX: slow heartbeat'},
  {t:'CHUG: "…It\'s getting harder to breathe."\nGUIDE: "Not harder."'},
  {t:'GUIDE: "Heavier."'},
  {t:'CHUG: "…Why does everything feel heavier?"\nGUIDE: "Because you\'re carrying it now."'},
  {t:'CHUG: "…Carrying what?"\nGUIDE: "…What you ignored."'},
  {t:'[Enemy appears — slow, dragging]\nENEMY:\n"You kept going…"\n"…and never looked back…"'},


/* ─── js/script.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   STORY SCRIPT — SAFE TO EDIT
   All dialogue, fight triggers and story beats live here.
   ════════════════════════════════════════
   HOW TO ADD A NEW PART:
   1. Add {part:N, t:"Part Title"} at the start
   2. Add dialogue: {t:"SPEAKER: line"}
   3. Trigger a fight: {t:"SYSTEM: FIGHT", fight:TYPE_NUMBER}
   4. End part: {t:"— END OF PART N —", end:true}
   ════════════════════════════════════════
   FIGHT TYPES: 1=Void Shadow, 2=Rage Clone, 3=Boss Echo...
   FLAGS: gl:true (glitch), col:"#hex" (text color)
════════════════════════════════════════════════ */

{t:'CHUG: "Stop talking."'},
  {t:'SYSTEM: BURDEN ENGAGED',fight:9},
  {t:'SYSTEM: "BURDEN FRAGMENT ACQUIRED"'},
  {t:'CHUG: "…This place is messing with me."\nGUIDE: "No."'},
  {t:'GUIDE: "It\'s showing you."'},
  {t:'[Scene repeats itself]\n[Same path… same enemy spawn]',gl:true},
  {t:'ENEMY (REPEAT):\n"You kept going…"\nCHUG: "…This already happened."'},
  {t:'GUIDE: "Yes."\nCHUG: "…Why?"\nGUIDE: "Because you never stopped."'},
  {t:'[Audio glitch mid-air]',gl:true},
  {t:'VOICE (CLEARER NOW):\n"Bro… wait up."'},
  {t:'VOICE:\n"…You\'re going too fast."\n\nCHUG freezes.'},
  {t:'CHUG:\n"…I know that voice."'},
  {t:'[Watcher appears closer than ever]\nStill no face. Silhouette.'},
  {t:'WATCHER:\n"You heard it."\nCHUG: "…Who are you?"'},
  {t:'WATCHER:\n"…Say it."\nCHUG: "I don\'t know."'},
  {t:'WATCHER:\n"…Exactly."'},
  {t:'[Watcher starts walking away slowly]'},
  {t:'CHUG:\n"WAIT."'},
  {t:'WATCHER:\n"You didn\'t wait for me."'},
  {t:'CHUG:\n"…I didn\'t—"\n[Watcher disappears]',col:varRed()},
  {t:'[Enemies attack in patterns]\nENEMIES:\n"Punish him."\n"Don\'t let him recover."'},
  {t:'SYSTEM: STAMINA SYSTEM ACTIVE'},
  {t:'CHUG:\n"…This isn\'t fair."\nGUIDE:\n"…It never was."'},
  {t:'SYSTEM: ELITE PATTERN',fight:10},
  {t:'[Chug overwhelmed briefly]\n[Falls to knee]'},
  {t:'FLASH:\nTwo players running together\n\nVOICE:\n"Don\'t leave me behind."',gl:true},
  {t:'CHUG:\n"…I didn\'t leave anyone."'},
  {t:'GUIDE:\n"…Then why does he keep saying it?"'},
  {t:'CHUG:\n"…Because you\'re lying."\nGUIDE:\n"…Or because you are."'},
  {t:'[No enemies for a while]\n[Just footsteps + breathing]'},
  {t:'CHAT (FAINT):\n"Solo now?"\n"He upgraded"\n"Other guy was holding him back anyway"',col:varRed()},
  {t:'CHUG clenches fist.'},
  {t:'[Watcher appears — very close]\nWATCHER:\n"You listened to them."'},
  {t:'CHUG:\n"…No."'},
  {t:'WATCHER:\n"You believed them."'},
  {t:'WATCHER:\n"…And I paid for it."'},
  {t:'CHUG:\n"…I don\'t even know who you are."\nWATCHER:\n"…That\'s the worst part."'},
  {t:'[Watcher steps back slowly]'},
  {t:'[Watcher gone]\n\nCHUG stands alone.'},
  {t:'CHUG (low):\n"…Why does this feel real?"'},
  {t:'GUIDE (quiet):\n"…Because it is."'},
  {t:'SYSTEM: "DESCEND FURTHER?"'},

  {t:'[EXPANDED ENCOUNTER — LEFT BEHIND]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:7},
  {t:'[EXPANDED ENCOUNTER — LEFT BEHIND]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:9},
  {t:'— END OF PART 4 —',end:true},
  // PART 5
  {part:5,t:'PART 5 — CONTROLLED',col:'#cc00aa'},
  {t:'[Deeper layer | red cracks across ground | unstable air]\nSFX: distorted breathing'},
  {t:'CHUG: "…Something\'s here."\nGUIDE: "Yes."'},
  {t:'GUIDE: "And it\'s not just watching anymore."'},
  {t:'SYSTEM: "FOREIGN PRESENCE DETECTED"',col:'#cc00aa'},
  {t:'CHUG: "…Foreign?"\nGUIDE: "…Someone who doesn\'t belong here."'},
  {t:'[Far distance — a figure kneeling]\nHead down. Not moving.\n\nCHUG walks slowly.'},
  {t:'CHUG: "…Hey."\n\n[No response]'},
  {t:'[As Chug gets closer, space distorts]\n[Figure twitches unnaturally]',gl:true},
  {t:'VOICE (LOW, BROKEN):\n"…Stay… back…"\n\nCHUG: "…You can talk?"'},
  {t:'[Sudden black pulse from above]',gl:true},
  {t:'CONTROLLED FIGURE:\n"…Target acquired."\n\nCHUG: "…What—?"'},
  {t:'SYSTEM: "ANOMALY — HOST DETECTED"',col:'#cc00aa'},
  {t:'CONTROLLED FIGURE:\n"…Execute."'},
  {t:'SYSTEM: COMBAT PROTOCOL',fight:11},
  {t:'[Boss fights aggressively — erratically]'},
  {t:'CONTROLLED FIGURE:\n"…Stop…"\n"…Don\'t…"\n"…Attack…"',gl:true},
  {t:'CHUG: "…You\'re not doing this on your own."'},
  {t:'[Boss suddenly stops mid-attack]\n\nVOICE (CLEAR, HUMAN):\n"…Chug…?"',gl:true},
  {t:'CHUG freezes.\n\nCHUG: "…You know me?"'},
  {t:'[Instant glitch — control resumes]',gl:true},
  {t:'CONTROLLED FIGURE:\n"…Eliminate."'},
  {t:'GUIDE (low):\n"…This is new."\nCHUG: "What is he?"\nGUIDE: "…A puppet."'},
  {t:'[Chug lands finishing combo]\n[Boss collapses]'},
  {t:'[Dark energy leaks out and vanishes upward]',col:'#cc00aa'},
  {t:'SYSTEM: "CONTROL LINK PARTIALLY SEVERED"',col:'#cc00aa'},
  {t:'[Chug kneels near him]\nFace still partly shadowed.\nBREATHING: weak'},
  {t:'FIGURE:\n"…What… happened…"\n\nCHUG: "…You attacked me."'},
  {t:'FIGURE:\n"…No… I… wouldn\'t…"\n\n[He looks confused]'},
  {t:'[Figure looks up — still not fully clear]\nFIGURE:\n"…Chug…?"',gl:true},
  {t:'CHUG: "…Yeah."\n\n[Pause]\n\nFIGURE:\n"…It\'s me…"'},
  {t:'[Glitch interrupts before name fully stabilizes]',gl:true},
  {t:'FIGURE:\n"…I can\'t… remember…"\n\n[Memory fragments flicker and disappear]'},
  {t:'SYSTEM: "MEMORY CORRUPTION DETECTED"',col:'#cc00aa',gl:true},
  {t:'[Figure collapses unconscious]\n\nCHUG:\n"…Who are you?"'},
  {t:'GUIDE:\n"…Someone important."\n\nCHUG:\n"…Then why don\'t I remember him?"'},
  {t:'GUIDE:\n"…Because someone doesn\'t want you to."'},
  {t:'[Above — faint Watcher silhouette for a split second]\n\nWATCHER (DISTANT):\n"…Not yet."',gl:true},
  {t:'CHUG stands over unconscious body.\n\nCHUG (low):\n"…Why did he call my name?"'},
  {t:'GUIDE:\n"…Because he knows you."'},
  {t:'SYSTEM: "PROCEED?"'},

  {t:'[EXPANDED ENCOUNTER — CONTROLLED]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:9},
  {t:'[EXPANDED ENCOUNTER — CONTROLLED]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:12},
  {t:'[EXPANDED ENCOUNTER — CONTROLLED]\\nPRESSURE TEST. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:'— END OF PART 5 —',end:true},
  // PART 6
  {part:6,t:'PART 6 — VANISHED',col:'#cc4400'},
  {t:'[Same area | ash drifting]\n[Chug looks down]\n\n…Body gone.',col:'#cc4400'},
  {t:'CHUG: "…What?"\n\n[Only cracks remain where he fell]'},
  {t:'CHUG:\n"No… he was right here."'},
  {t:'GUIDE:\n"…He was taken."\n\nCHUG:\n"By who?"\n\n[Silence]'},
  {t:'[Ground flickers — glitch trail forward]',gl:true},
  {t:'SYSTEM: "RESIDUAL SIGNAL DETECTED"',col:'#cc4400'},
  {t:'CHUG: "…He\'s still here."\nGUIDE:\n"…No."\nGUIDE:\n"He\'s being moved."'},
  {t:'[Chug follows the signal]\n\nVOICE (DISTANT):\n"…Chug…"',gl:true},
  {t:'CHUG: "…That\'s him."\nGUIDE:\n"…Or what\'s left of him."'},
  {t:'[Enemies spawn — more precise, less chaotic]\nENEMIES:\n"Adapt."\n"Learn."\n"Improve."'},
  {t:'CHUG: "…They\'re changing."\nGUIDE:\n"They\'re evolving."'},
  {t:'SYSTEM: EVOLVED WAVE',fight:12},
  {t:'[Enemy freezes mid fight]\n[Black pulse hits — instantly upgrades]',gl:true},
  {t:'SYSTEM: "CONTROL OVERRIDE ACTIVE"',col:'#cc4400',gl:true},
  {t:'CHUG: "…That\'s the same thing from before."\nGUIDE:\n"…Yes."'},
  {t:'GUIDE:\n"He\'s controlling them."'},
  {t:'CHUG:\n"…Then that guy…"\nGUIDE:\n"…Wasn\'t the first."'},
  {t:'[Broken screen appears]\n[Clip: unknown person beside Chug]'},
  {t:'VOICE:\n"Don\'t go solo yet."\n\nCHUG: "…I said no…"\n\n[Clip distorts]',gl:true},
  {t:'CHUG:\n"…Did I leave him?"\nGUIDE:\n"…You chose to move forward."'},
  {t:'CHUG:\n"That\'s not the same."\nGUIDE:\n"…To you."'},
  {t:'[Glitch trail intensifies]\n[Red + black pulses overlapping]',gl:true},
  {t:'SYSTEM: "HOST RELOCATED"',col:'#cc4400'},
  {t:'CHUG: "…Host…"\nGUIDE:\n"…The one you fought."\n\nCHUG:\n"…He\'s still alive."'},
  {t:'[Environment freezes briefly]\n\n[Watcher appears — very close, behind Chug]'},
  {t:'WATCHER:\n"You broke it."'},
  {t:'CHUG turns.\n\nCHUG:\n"…You did this."'},
  {t:'WATCHER:\n"I improved it."'},
  {t:'CHUG:\n"He\'s not yours."\nWATCHER:\n"…He chose to stay behind."'},
  {t:'CHUG:\n"…You\'re lying."\nWATCHER:\n"…Then why don\'t you remember him?"'},
  {t:'[Watcher disappears instantly]\n\nCHUG:\n"…No."'},
  {t:'GUIDE (quiet):\n"…You\'re starting to see it."'},
  {t:'[Multiple enemies attack in sync]\nPerfect coordination.\nENEMIES:\n"Force error."\n"Punish hesitation."'},
  {t:'SYSTEM: "SYNC PRESSURE ↑"'},
  {t:'SYSTEM: SYNC WAVE',fight:13},
  {t:'[Enemies dissolve together]\n\nCHUG breathing heavy.'},
  {t:'CHUG:\n"…This isn\'t just fighting."\nGUIDE:\n"…No."'},
  {t:'GUIDE:\n"It\'s training."'},
  {t:'[Signal leads deeper]\n\nVOICE (barely audible):\n"…help…"',gl:true},
  {t:'CHUG:\n"…I\'m coming."'},
  {t:'GUIDE:\n"…Be careful."'},
  {t:'CHUG:\n"No."\n\nCHUG:\n"…This time I won\'t be late."'},
  {t:'[Chug steps into deeper void]\n\nSYSTEM: "ENTER NEXT LAYER?"',col:'#cc4400'},

  {t:'[EXPANDED ENCOUNTER — VANISHED]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:12},
  {t:'[EXPANDED ENCOUNTER — VANISHED]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:'— END OF PART 6 —',end:true},
  // PART 7
  {part:7,t:'PART 7 — REWRITE',col:'#aa0055'},
  {t:'[New layer | darker | ground pulsing faint red]\nSFX: rhythmic glitch pulse',col:'#aa0055'},
  {t:'CHUG: "…He\'s here."\nGUIDE: "…Yes."'},
  {t:'[Glitch trail stabilizes into fixed point ahead]',gl:true},
  {t:'SYSTEM: "HOST SIGNAL LOCKED"',col:'#aa0055'},
  {t:'CHUG: "…I found you."'},
  {t:'[Figure stands center, back turned]\nStill. Too still.\n\nCHUG: "…Hey."'},
  {t:'[Figure slowly turns]\nMovement smoother… but wrong.'},
  {t:'CONTROLLED HOST:\n"…You\'re late."'},
  {t:'CHUG: "…What did you say?"'},
  {t:'SYSTEM: "HOST REINITIALIZED"',col:'#aa0055'},
  {t:'CONTROLLED HOST:\n"…Previous errors removed."'},
  {t:'CHUG: "…You\'re not talking like before."'},
  {t:'CONTROLLED HOST:\n"…Engage target."'},
  {t:'[Brief glitch]\n\nVOICE (WEAK, HUMAN):\n"…Run…"',gl:true},
  {t:'[Instant override]\n\nCONTROLLED HOST:\n"…Eliminate."'},
  {t:'SYSTEM: REWRITE PROTOCOL',fight:14},
  {t:'[Combat — cleaner, faster, perfect counters]\nNo hesitation. Predicts inputs.'},
  {t:'CHUG: "…He\'s stronger."\nGUIDE:\n"…He\'s refined."'},
  {t:'[Chug lands hit — control flickers]',gl:true},
  {t:'VOICE (CLEARER):\n"…Chug… don\'t…"'},
  {t:'CHUG:\n"…You know me."'},
  {t:'[Control snaps back]\n\nCONTROLLED HOST:\n"…Irrelevant."'},
  {t:'[Boss enters overdrive — red + black aura]',gl:true},
  {t:'SYSTEM: "CONTROL PRIORITY ↑"',col:'#aa0055',gl:true},
  {t:'CONTROLLED HOST:\n"…Correct mistakes."'},
  {t:'CHUG:\n"…Stop fighting it!"'},
  {t:'GUIDE (lower):\n"…He can\'t."\nCHUG: "What do you mean?"'},
  {t:'GUIDE:\n"…He\'s being rewritten."'},
  {t:'[Chug forces opening — lands heavy combo]\n[Boss staggers]'},
  {t:'CONTROLLED HOST:\n"…System… unstable…"'},
  {t:'[Control weakens briefly]',gl:true},
  {t:'VOICE (HUMAN):\n"…Why… did you…"'},
  {t:'CHUG:\n"…Say it."'},
  {t:'VOICE:\n"…leave…"'},
  {t:'[Control slams back in]\n\nCONTROLLED HOST:\n"…Finish."'},
  {t:'[Chug wins — boss collapses]\nSFX: heavy glitch crack',gl:true},
  {t:'SYSTEM: "CONTROL LINK DAMAGED"',col:'#aa0055'},
  {t:'[Figure breathing normally]\n\nFIGURE:\n"…I… can\'t… remember…"'},
  {t:'CHUG:\n"…It\'s me."\nFIGURE:\n"…I know…"'},
  {t:'[Pause]\n\nFIGURE:\n"…but I don\'t…"'},
  {t:'FIGURE:\n"…Ch—"\n\n[Audio cuts abruptly]',gl:true},
  {t:'SYSTEM: "MEMORY BLOCK ENFORCED"',col:'#aa0055',gl:true},
  {t:'[Black pulse strikes from above]\n[Figure freezes completely]',gl:true},
  {t:'WATCHER (DISTANT):\n"…Not yet."'},
  {t:'[Figure vanishes instantly]'},
  {t:'CHUG:\n"…NO."'},
  {t:'[Silence]\n\nCHUG:\n"…He was right there."'},
  {t:'GUIDE:\n"…And now he\'s deeper."'},
  {t:'CHUG:\n"…Why can\'t I remember him?"'},
  {t:'GUIDE:\n"…Because remembering breaks the system."'},
  {t:'CHUG:\n"…What system?"\n\n[Pause]'},
  {t:'GUIDE:\n"…The one you\'re inside."'},
  {t:'[Path ahead opens — darker than before]\n\nVOICE:\n"…don\'t forget me…"',gl:true},
  {t:'CHUG (low):\n"…I won\'t."'},
  {t:'SYSTEM: "GO FURTHER?"',col:'#aa0055'},

  {t:'[EXPANDED ENCOUNTER — REWRITE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:'[EXPANDED ENCOUNTER — REWRITE]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:17},
  {t:'[EXPANDED ENCOUNTER — REWRITE]\\nPRESSURE TEST. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:3},
  {t:'— END OF PART 7 —',end:true},
  // PART 8
  {part:8,t:'PART 8 — FRAGMENTS',col:'#660033'},
  // Scene 1
  {t:'[Deeper layer | environment unstable, flickering between void & old room]\nSFX: overlapping audio — stream + silence',col:'#660033'},
  {t:'CHUG:\n"…This place is breaking."'},
  {t:'GUIDE:\n"No."'},
  {t:'GUIDE:\n"You are."'},
  // Scene 2
  {t:'[Chug walks — environment suddenly shifts into his old streaming room]\n\n[RGB lights… desk… mic… two chairs]'},
  {t:'CHUG freezes.',col:'#660033'},
  {t:'CHUG:\n"…This is real."'},
  {t:'[Second chair slightly pulled back]'},
  // Scene 3
  {t:'[Someone sitting in second chair… blurred silhouette]'},
  {t:'VOICE:\n"You ready?"'},
  {t:'CHUG:\n"…Yeah."'},
  {t:'[Pause]\n\nCHUG:\n"…Wait…"'},
  {t:'[Everything glitches violently — scene collapses]',gl:true},
  // Scene 4
  {t:'SYSTEM: "MEMORY ACCESS DETECTED"',col:'#660033'},
  {t:'SYSTEM: "CORRUPTION INITIATED"',col:'#660033',gl:true},
  {t:'[Enemies spawn instantly]',col:'#660033'},
  {t:'ENEMIES:\n"Erase it."\n"Stop recall."'},
  {t:'CHUG:\n"…They don\'t want me to remember."'},
  // Scene 5 — combat
  {t:'[Enemies faster, aggressive, coordinated]\n[Each hit causes visual glitches]'},
  {t:'SYSTEM: "STABILITY ↓"',col:'#660033'},
  {t:'CHUG:\n"…It\'s attacking my memory."'},
  {t:'SYSTEM: MEMORY ERASURE WAVE',fight:15},
  // Scene 6
  {t:'[Enemies destroyed]\n\n[Fragments of room flicker again]'},
  {t:'VOICE (CLEARER):\n"Don\'t rush it."'},
  {t:'CHUG:\n"…That\'s him."'},
  // Scene 7
  {t:'GUIDE:\n"You\'re pushing too fast."'},
  {t:'CHUG:\n"I need to know."'},
  {t:'GUIDE:\n"…If you force it, you\'ll lose everything."'},
  {t:'CHUG:\n"…I already did."'},
  // Scene 8
  {t:'[Environment freezes]\n\n[Watcher appears — closer than ever]'},
  {t:'WATCHER:\n"You\'re breaking the sequence."'},
  {t:'CHUG:\n"You\'re hiding him."'},
  {t:'WATCHER:\n"…I\'m protecting what\'s left."'},
  // Scene 9
  {t:'CHUG:\n"You\'re controlling him."'},
  {t:'WATCHER:\n"…I\'m preserving him."'},
  {t:'CHUG:\n"…From me?"'},
  {t:'[Pause]\n\nWATCHER:\n"…Yes."'},
  // Scene 10
  {t:'CHUG:\n"…Then let him go."'},
  {t:'WATCHER:\n"…You couldn\'t hold him before."'},
  {t:'[Silence hits]'},
  {t:'WATCHER:\n"…Why would I trust you now?"'},
  {t:'[Watcher vanishes]',gl:true},
  // Scene 11
  {t:'[Massive glitch surge]\n[Full scene flashes clearly for a second]',gl:true},
  {t:'[Chug + friend laughing together]'},
  {t:'FRIEND:\n"If you go big… I\'m with you."'},
  {t:'CHUG:\n"…Always?"'},
  {t:'FRIEND:\n"…Always."'},
  {t:'[Scene shatters instantly]',gl:true},
  // Scene 12
  {t:'[Chug drops to knee]'},
  {t:'CHUG:\n"…I remember…"'},
  {t:'[Head hurts — glitch interference]',gl:true},
  {t:'SYSTEM: "RECALL BLOCKED"',col:'#660033',gl:true},
  // Scene 13
  {t:'[Signal spikes violently]',gl:true},
  {t:'SYSTEM: "HOST INSTABILITY ↑"',col:'#660033'},
  {t:'GUIDE:\n"…He\'s breaking."'},
  {t:'CHUG:\n"…Good."'},
  {t:'GUIDE:\n"…No."'},
  {t:'GUIDE:\n"If he breaks… he\'s gone."'},
  // Scene 14
  {t:'CHUG:\n"…Then I\'ll fix it."'},
  {t:'GUIDE:\n"…You couldn\'t before."'},
  {t:'CHUG:\n"…I didn\'t try."'},
  {t:'[Silence]'},
  // Scene 15
  {t:'[Voice echoes clearly now]'},
  {t:'VOICE:\n"…Don\'t forget me…"',gl:true},
  {t:'CHUG:\n"…I won\'t."'},
  // Scene 16
  {t:'[Path splits into two directions]'},
  {t:'SYSTEM:\n"STABILIZE"\n"PURSUE"',col:'#660033'},
  {t:'CHUG looks forward.'},
  {t:'CHUG (low):\n"…I\'m coming."'},

  {t:'[EXPANDED ENCOUNTER — FRAGMENTS]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:17},
  {t:'[EXPANDED ENCOUNTER — FRAGMENTS]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:3},
  {t:'[EXPANDED ENCOUNTER — FRAGMENTS]\\nPRESSURE TEST. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:6},
  {t:'— END OF PART 8 —',end:true},
  // PART 9
  {part:9,t:'PART 9 — BREAKPOINT',col:'#880022'},
  // Scene 1
  {t:'[Two paths: STABILIZE / PURSUE]\nCHUG doesn\'t hesitate — walks forward.',col:'#880022'},
  {t:'SYSTEM: "PURSUIT CONFIRMED"',col:'#880022'},
  {t:'GUIDE:\n"…You\'re risking everything."'},
  {t:'CHUG:\n"…I already lost it."'},
  // Scene 2
  {t:'[Environment unstable — enemies spawn unpredictably]'},
  {t:'SYSTEM: "RANDOM ENCOUNTERS ACTIVE"',col:'#880022'},
  {t:'ENEMIES:\n"Interrupt."\n"Delay."\n"Reset him."'},
  {t:'SYSTEM: INTERFERENCE WAVE',fight:16},
  {t:'CHUG:\n"…Now they\'re stalling me."'},
  {t:'GUIDE:\n"…They\'re buying time."'},
  // Scene 3
  {t:'[Flash: duo stream again — clearer]',gl:true},
  {t:'FRIEND:\n"Don\'t go solo yet."'},
  {t:'CHUG:\n"…I didn\'t listen."'},
  // Scene 4
  {t:'[Enemy waves increase in speed + frequency]'},
  {t:'SYSTEM: "PRESSURE ↑"',col:'#880022'},
  {t:'CHUG:\n"…Enough."'},
  {t:'SYSTEM: "RAGE ACTIVE"',col:'#880022',gl:true},
  {t:'SYSTEM: PRESSURE WAVE',fight:17},
  // Scene 5
  {t:'[Area locks — ground cracks open]',col:'#880022'},
  {t:'SYSTEM: "SUB BOSS DETECTED"',col:'#880022'},
  {t:'[Figure drops from above — masked, faster than previous enemies]'},
  {t:'SUB BOSS:\n"…Delay the subject."'},
  {t:'CHUG:\n"…You\'re not him."'},
  {t:'SUB BOSS:\n"…No. Just necessary."'},
  // Scene 6 — sub boss fight
  {t:'[Combat — high speed, counter-heavy, punishes mistakes]'},
  {t:'SUB BOSS:\n"Predictable."\n"Late."\n"Weak."'},
  {t:'CHUG:\n"…Shut up."'},
  {t:'SYSTEM: SUB BOSS — THE DELAY',fight:18},
  // Scene 7
  {t:'[Sub Boss glitches briefly]',gl:true},
  {t:'VOICE (UNKNOWN):\n"…Why are you stopping him?"',gl:true},
  {t:'[Control snaps back]\n\nSUB BOSS:\n"…Irrelevant."'},
  // Scene 8
  {t:'[Chug lands final combo]\n[Sub Boss shatters into fragments]',gl:true},
  {t:'SYSTEM: "OBSTRUCTION REMOVED"',col:'#880022'},
  // Scene 9
  {t:'[Fragments float — then dissolve]'},
  {t:'GUIDE:\n"…They\'re sending layers now."'},
  {t:'CHUG:\n"…He\'s getting closer."'},
  // Scene 10
  {t:'[Massive pulse — red + black]',gl:true},
  {t:'SYSTEM: "HOST CRITICAL STATE"',col:'#880022',gl:true},
  {t:'CHUG:\n"…He\'s there."'},
  // Scene 11
  {t:'[Environment freezes]\n[Watcher appears — but flickering]',gl:true},
  {t:'WATCHER:\n"…Stop."'},
  {t:'WATCHER:\n"…You\'re not supposed to reach this."'},
  {t:'CHUG:\n"…You\'re losing control."'},
  // Scene 12
  {t:'WATCHER:\n"…You forced this."'},
  {t:'CHUG:\n"…Let him go."'},
  {t:'WATCHER:\n"…You already did that once."'},
  {t:'[Silence]'},
  // Scene 13
  {t:'[Massive flash — clearest yet]',gl:true},
  {t:'[Chug + friend standing together]'},
  {t:'FRIEND:\n"If we blow up… we do it together."'},
  {t:'CHUG:\n"…Yeah."'},
  {t:'FRIEND:\n"…Don\'t leave me behind."'},
  // Scene 14
  {t:'CHUG:\n"…Ya—"'},
  {t:'[Audio distortion cuts it]',gl:true},
  {t:'SYSTEM: "IDENTITY BLOCKED"',col:'#880022',gl:true},
  {t:'CHUG:\n"…NO."'},
  // Scene 15
  {t:'[Random enemies spawn aggressively]'},
  {t:'SYSTEM: "INTERFERENCE MAX"',col:'#880022'},
  {t:'ENEMIES:\n"Erase him."\n"Stop recall."'},
  {t:'CHUG:\n"…I\'m not stopping."'},
  {t:'SYSTEM: FINAL INTERFERENCE',fight:19},
  // Scene 16
  {t:'[Chug clears all enemies]\n[Path opens violently]',gl:true},
  {t:'SFX: loud crack\n\nGUIDE:\n"…You\'re at the edge."'},
  {t:'CHUG:\n"…Good."'},
  // Scene 17
  {t:'[Voice clearer than ever]'},
  {t:'VOICE:\n"…Chug…"',gl:true},
  {t:'[Pause]\n\nVOICE:\n"…help me…"',gl:true},
  // Scene 18
  {t:'CHUG steps forward.'},
  {t:'CHUG (low, shaking):\n"…I\'m coming."'},
  {t:'SYSTEM: "FINAL LAYER AHEAD"',col:'#880022'},
  {t:'— END OF PART 9 —',end:true},
  // PART 10
  {part:10,t:'PART 10 — ERASURE',col:'#cc0033'},
  // Scene 1
  {t:'[Darkest zone yet | ground fractured | sky unstable]\nSFX: constant glitch + heartbeat',col:'#cc0033',gl:true},
  {t:'SYSTEM: "FINAL HOST ZONE"',col:'#cc0033'},
  {t:'CHUG:\n"…This is it."'},
  {t:'GUIDE:\n"…Yes."'},
  // Scene 2
  {t:'[Center — figure standing still]\nNo movement. No distortion. Calm.'},
  {t:'CHUG:\n"…You."'},
  {t:'[Figure slowly lifts head]'},
  // Scene 3
  {t:'[No erratic motion now — perfectly controlled]'},
  {t:'HOST:\n"…You made it."'},
  {t:'CHUG:\n"…Who are you?"'},
  {t:'[Pause]\n\nHOST:\n"…You already know."'},
  // Scene 4
  {t:'[Above — faint shadow pulse]',gl:true},
  {t:'WATCHER (DISTANT):\n"…Finish it."'},
  {t:'[Host\'s eyes glow stronger]',gl:true},
  // Scene 5 — final boss
  {t:'SYSTEM: "HOST — FULL CONTROL"',col:'#cc0033'},
  {t:'HOST:\n"…No more interruptions."'},
  {t:'SYSTEM: FINAL HOST — FULL CONTROL',fight:20},
  // Scene 6
  {t:'[Perfect mirror combat — faster than before]'},
  {t:'CHUG:\n"…He knows everything I\'ll do."'},
  {t:'GUIDE:\n"…Because he learned from you."'},
  // Scene 7
  {t:'[Chug lands strong hit]\n[Control flickers]',gl:true},
  {t:'VOICE (CLEAR):\n"…Chug…"'},
  {t:'CHUG:\n"…Say it."'},
  {t:'VOICE:\n"…Why did you—"\n\n[Override]\n\nHOST:\n"…Continue."',gl:true},
  // Scene 8
  {t:'[Black + red aura explodes]',col:'#cc0033',gl:true},
  {t:'SYSTEM: "OVERWRITE MODE"',col:'#cc0033',gl:true},
  {t:'HOST:\n"…Remove error."'},
  {t:'[Attacks become brutal, nonstop]\n\nCHUG struggling.'},
  // Scene 9
  {t:'CHUG:\n"…I\'m not losing you again."'},
  {t:'GUIDE:\n"…Then stop fighting like before."'},
  {t:'CHUG:\n"…Then how?"\n\nGUIDE:\n"…Remember."'},
  // Scene 10
  {t:'[Massive flash — full clarity for a second]',gl:true},
  {t:'[Chug + friend side by side]'},
  {t:'FRIEND:\n"If we rise… we rise together."'},
  {t:'CHUG:\n"…Always."'},
  {t:'FRIEND smiles.'},
  // Scene 11
  {t:'[Chug changes timing — unpredictable attack]\n[Breaks through guard]'},
  {t:'[Massive hit lands]\n\nSFX: shatter + glitch collapse',gl:true},
  // Scene 12
  {t:'[Dark energy explodes out of host]',gl:true},
  {t:'SYSTEM: "CONTROL LINK DESTROYED"',col:'#cc0033',gl:true},
  {t:'[Host collapses]'},
  // Scene 13
  {t:'[No sound]\n\n[Chug slowly walks toward him]'},
  {t:'CHUG:\n"…It\'s over."'},
  // Scene 13B — YASSINE REVEAL
  {t:'[Chug kneels down]\n[Gets close for the first time]'},
  {t:'[Face visible]\n\n[Chug goes still]'},
  {t:'CHUG (barely a whisper):\n"…Yassine."'},
  {t:'[Silence]\n\n[No response]'},
  {t:'CHUG:\n"…It\'s me."\n\n[Pause]\n\nCHUG:\n"…Open your eyes."'},
  // Scene 14
  {t:'[Host breathing normally now]'},
  {t:'HOST:\n"…What… happened…"'},
  {t:'CHUG:\n"…You were controlled."'},
  {t:'HOST:\n"…Controlled…?"\n\n[Looks confused]'},
  {t:'CHUG:\n"…Yassine. It\'s me."'},
  {t:'HOST:\n"…"\n\n[Eyes unfocused]\n\n[No recognition]'},
  // Scene 15
  {t:'[Glitch flicker]',gl:true},
  {t:'SYSTEM: "MEMORY RESET INITIATED"',col:'#cc0033',gl:true},
  {t:'HOST:\n"…Who… are you…?"'},
  {t:'CHUG freezes.'},
  // Scene 16
  {t:'CHUG:\n"…You don\'t remember me?"'},
  {t:'HOST:\n"…Should I…?"'},
  {t:'[Silence hits HARD]'},
  // Scene 17
  {t:'CHUG:\n"…We fought together."'},
  {t:'HOST:\n"…I don\'t remember that."'},
  // Scene 18
  {t:'[Light pulls host away slowly]',gl:true},
  {t:'CHUG:\n"WAIT—"'},
  {t:'[He vanishes]',gl:true},
  // Scene 19
  {t:'[Empty space]'},
  {t:'CHUG:\n"…No…"'},
  {t:'GUIDE:\n"…You saved him."'},
  {t:'CHUG:\n"…I lost him."'},
  // Scene 20
  {t:'[Very faint voice]',gl:true},
  {t:'VOICE:\n"…sorry…"',gl:true},
  {t:'[Gone]'},
  // Scene 21
  {t:'CHUG stands alone.'},
  {t:'CHUG (low):\n"…Who was he?"'},
  {t:'[Pause]\n\nGUIDE:\n"…That\'s the problem."'},
  {t:'GUIDE:\n"…You still don\'t know."'},
  {t:'SYSTEM: "NEXT PHASE UNLOCKED"',col:'#cc0033'},

  {t:'[EXPANDED ENCOUNTER — ERASURE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:6},
  {t:'[EXPANDED ENCOUNTER — ERASURE]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:8},
  {t:'[EXPANDED ENCOUNTER — ERASURE]\\nPRESSURE TEST. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:10},
  {t:'— END OF PART 10 —',end:true},
  // PART 11
  {part:11,t:'PART 11 — AFTERIMAGE',col:'#334455'},
  // Scene 1
  {t:'[Environment stabilizes slightly | low echo]\nCHUG stands still.',col:'#334455'},
  {t:'CHUG:\n"…It\'s over."'},
  {t:'GUIDE:\n"…For now."'},
  // Scene 2
  {t:'[Light distortion forms nearby]\n[Figure appears — normal, no glow]'},
  {t:'CHUG:\n"…Yassine."'},
  {t:'FIGURE:\n"…Yeah…?"\n\n[Confused, steady breathing]'},
  {t:'CHUG:\n"…Wait."\n\n[Pause]\n\nCHUG:\n"…You responded."'},
  {t:'FIGURE:\n"…Is that my name?"'},
  {t:'[Silence hits hard]'},
  // Scene 3
  {t:'CHUG:\n"…What happened to you?"'},
  {t:'FIGURE:\n"…I don\'t know."'},
  {t:'CHUG:\n"…You were fighting me."'},
  {t:'FIGURE:\n"…No… I just got here."\n\n[No hesitation. Genuine.]'},
  // Scene 4
  {t:'CHUG:\n"…Do you remember anything?"'},
  {t:'FIGURE:\n"…Just… waking up."'},
  {t:'[Pause]\n\nFIGURE:\n"…Do I know you?"'},
  {t:'CHUG:\n"…Yeah."\n\n[Pause]\n\nCHUG:\n"…We did everything together."'},
  {t:'[Silence hits]'},
  // Scene 5
  {t:'FIGURE:\n"…What\'s my name?"\n\n[Beat]\n\nFIGURE:\n"My full name."'},
  {t:'[Chug freezes]\n\nCHUG:\n"…Yassine."\n\n[Pause]\n\nCHUG:\n"…I don\'t know your last name."'},
  {t:'FIGURE:\n"…"\n\n[Neither do I]'},
  // Scene 6
  {t:'CHUG:\n"…We were partners."\n\n[Words stop]'},
  {t:'SYSTEM: "MEMORY BLOCK ACTIVE"',col:'#334455'},
  {t:'CHUG:\n"…I can\'t remember anything else."'},
  {t:'GUIDE:\n"…The block goes both ways."'},
  // Scene 7
  {t:'[Figure looks around, steady now]'},
  {t:'FIGURE:\n"…This place feels wrong."'},
  {t:'CHUG:\n"…Yeah."'},
  {t:'FIGURE:\n"…But I\'m fine."\n\n[No corruption. No control.]'},
  // Scene 8
  {t:'[Space slowly shifts, separating them]'},
  {t:'CHUG:\n"…Stay."'},
  {t:'FIGURE:\n"…For what?"\n\n[Pause]\n\nCHUG has no answer.'},
  // Scene 9
  {t:'FIGURE:\n"…If we knew each other… we\'ll meet again."'},
  {t:'CHUG:\n"…Yeah."'},
  {t:'[Light pulls him away slowly]',gl:true},
  // Scene 10
  {t:'[Chug alone again]'},
  {t:'CHUG:\n"…Why does that feel wrong?"'},
  {t:'GUIDE:\n"…Because something is missing."'},
  // Scene 11
  {t:'[Massive distortion wave]',gl:true},
  {t:'SYSTEM: "FUTURE THREADS DETECTED"',col:'#334455',gl:true},
  {t:'[Multiple silhouettes flash]',gl:true},
  // Scene 12
  {t:'[12 armored silhouettes appear, heavy presence]'},
  {t:'SYSTEM: "UNKNOWN FACTION: DRAKOS (12)"',col:'#334455'},
  {t:'[Disappear instantly]\n\nCHUG:\n"…Twelve?"'},
  // Scene 13
  {t:'[6 fast silhouettes dash across]',gl:true},
  {t:'SYSTEM: "UNKNOWN FACTION: NEXTERS (6)"',col:'#334455'},
  {t:'[Gone]\n\nCHUG:\n"…Fast…"'},
  // Scene 14
  {t:'[More flashes — different fighters]\n\n— Blade user\n— Giant brute\n— Masked assassin\n— Dual wielder\n\nAll vanish.',gl:true},
  // Scene 15
  {t:'GUIDE:\n"…These aren\'t memories."'},
  {t:'CHUG:\n"…Then what?"\n\nGUIDE:\n"…Future."'},
  // Scene 16
  {t:'CHUG:\n"…So this doesn\'t end here."'},
  {t:'GUIDE:\n"…It hasn\'t even started."'},
  // Scene 17
  {t:'[Very faint voice — almost gone]',gl:true},
  {t:'VOICE:\n"…don\'t forget…"',gl:true},
  {t:'CHUG:\n"…I don\'t even know what I lost."'},
  // Scene 18
  {t:'[Massive path opens ahead]',gl:true},
  {t:'SYSTEM:\n"NEW THREATS UNLOCKED"',col:'#334455'},
  {t:'CHUG steps forward.'},
  {t:'CHUG (low):\n"…Then I\'ll find out."'},

  {t:'[EXPANDED ENCOUNTER — AFTERIMAGE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:8},
  {t:'[EXPANDED ENCOUNTER — AFTERIMAGE]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:10},
  {t:'[EXPANDED ENCOUNTER — AFTERIMAGE]\\nPRESSURE TEST. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:11},
  {t:'[EXPANDED ENCOUNTER — AFTERIMAGE]\\nELITE SKIRMISH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:1},
  {t:'— END OF PART 11 —',end:true},
  // ════════════════════════════════════
  // PART 12 — AROWH
  // ════════════════════════════════════
  {part:12,t:'PART 12 — AROWH',col:'#1a1a2e'},
  {t:'[New layer | ground cracked | air heavy]\n\nCHUG: "…This pressure…"',col:'#1a1a2e'},
  {t:'GUIDE: "…Different class."'},
  {t:'[3 shadows emerge from the dark]'},
  {t:'SYSTEM: "RANDOM ENCOUNTER — 3 UNITS"',col:'#334455'},
  {t:'ENEMIES: "Engage."',fight:1},
  {t:'[All 3 down]\n\nCHUG: "…Too easy."'},
  {t:'[Silence]'},
  {t:'[Ground trembles]\n[Massive shadow forms]',gl:true},
  {t:'[Figure lands]\n\nTall. Armored. Unmoving.'},
  {t:'SYSTEM: "DRAKO UNIT DETECTED"',col:'#cc0000'},
  {t:'SYSTEM: "ID: NO.12 — AROWH"',col:'#cc0000'},
  {t:'CHUG: "…You\'re the heavy one."'},
  {t:'[No response]\n\nGUIDE (low): "…Don\'t rush this."'},
  {t:'[Chug attacks first]\n[Hits land… no reaction]'},
  {t:'CHUG: "…What?"'},
  {t:'[AROWH slowly lifts arm]\n\nSingle strike.',fight:21},
  {t:'[Chug sent flying]\n\nAROWH: "…Weak."'},
  {t:'CHUG: "…I barely touched him."\n\nGUIDE: "…You didn\'t."'},
  {t:'SYSTEM: "RAGE ACTIVE"',col:'#cc0000'},
  {t:'[Fast combo barrage]\n[AROWH blocks everything]\n[Grabs Chug mid-attack]',fight:21},
  {t:'AROWH: "…Predictable."\n\n[Releases him]\n[Steps back. Doesn\'t finish.]'},
  {t:'[Chug pinned]\n\nCHUG: "…Fight me properly."'},
  {t:'AROWH: "…You\'re not worth it."'},
  {t:'[Chug charges — tries unpredictability]\n[Lands one clean hit]'},
  {t:'CHUG: "…I got—"\n\n[Instant counter]\n[Massive blow.]',fight:21},
  {t:'[Chug crashes hard. Can\'t stand.]\n\nAROWH stands over him.'},
  {t:'AROWH: "…Still weak."\n\n[Turns away]'},
  {t:'CHUG: "…Why won\'t you finish it…?"\n\n[AROWH stops]'},
  {t:'AROWH: "…You\'re not a threat."\n\n[Continues walking]'},
  {t:'[AROWH fades into distance]',gl:true},
  {t:'SYSTEM: "DRAKO UNIT WITHDRAWN"',col:'#cc0000'},
  {t:'[3 more shadows appear — hesitating]'},
  {t:'ENEMIES: "…Damaged."\n"…Finish him?"',fight:1},
  {t:'[Chug barely moving]\n\nCHUG (low): "…I couldn\'t even…"'},
  {t:'GUIDE: "…Now you understand."'},
  {t:'CHUG: "…That wasn\'t a fight…"\n\nGUIDE: "…No."'},
  {t:'GUIDE: "…That was a warning."'},
  {t:'SYSTEM: "THREAT LEVEL UPDATED"',col:'#cc0000'},
  {t:'— END OF PART 12 —',end:true},
  // ════════════════════════════════════
  // PART 13 — FRACTURE
  // ════════════════════════════════════
  {part:13,t:'PART 13 — FRACTURE',col:'#0d1117'},
  {t:'[Chug alone. Still on the ground.]\n\nCHUG (low):\n"…I couldn\'t dent him."'},
  {t:'GUIDE:\n"…No."'},
  {t:'CHUG:\n"…How do I fight that?"\n\n[Silence]\n\nGUIDE:\n"…You don\'t. Not yet."'},
  {t:'CHUG:\n"…He said No.12."\n\nGUIDE:\n"…Yes."'},
  {t:'CHUG:\n"…There are eleven more like him."\n\n[Long pause]\n\nGUIDE:\n"…At minimum."'},
  {t:'[Brief flicker — memory fragment]',gl:true},
  {t:'[Chug and Yassine. Training. Laughing.]\n\n[Gone instantly]',gl:true},
  {t:'CHUG:\n"…What was that?"\n\nGUIDE:\n"…You\'re starting to remember."'},
  {t:'CHUG:\n"…Why now?"\n\nGUIDE:\n"…Because something broke open."'},
  {t:'CHUG:\n"…Yassine and I… we knew about Drakos."\n\n[Pause]\n\nCHUG:\n"…Didn\'t we."'},
  {t:'GUIDE (quiet):\n"…Keep going."'},
  {t:'[Shadows emerge — fast. Coordinated.]'},
  {t:'SYSTEM: "INTERFERENCE DETECTED — 2 UNITS"',col:'#cc0000'},
  {t:'[They don\'t speak. Just move.]',fight:16},
  {t:'CHUG:\n"…They moved like soldiers."\n\nGUIDE:\n"…They are."'},
  {t:'CHUG:\n"…Drakos trained them."\n\nGUIDE:\n"…Drakos built them."'},
  {t:'[Faint signal. Distorted.]',gl:true},
  {t:'WATCHER (static):\n"…ch—g…"\n\n"…don\'t… trust…"\n\n[Cut]',gl:true},
  {t:'CHUG:\n"…Yassine?"\n\n[Nothing]'},
  {t:'CHUG:\n"…That was him."\n\nGUIDE:\n"…It was a fragment."'},
  {t:'CHUG:\n"…He said don\'t trust."\n\n[Beat]\n\nCHUG:\n"…Was he talking about you?"'},
  {t:'[Long silence]\n\nGUIDE:\n"…I don\'t know."'},
  {t:'[More shadows. Heavier.]'},
  {t:'SYSTEM: "PRESSURE UNIT INCOMING"',col:'#cc0000'},
  {t:'[It doesn\'t wait.]',fight:17},
  {t:'CHUG:\n"…Every fight here drains something."\n\nGUIDE:\n"…Yes."'},
  {t:'CHUG:\n"…What happens if I run out?"\n\nGUIDE:\n"…You become like the others."'},
  {t:'CHUG:\n"…Controlled."\n\nGUIDE:\n"…Erased."'},
  {t:'CHUG:\n"…Why are you helping me?"'},
  {t:'[GUIDE doesn\'t answer immediately]\n\nGUIDE:\n"…Because someone asked me to."'},
  {t:'CHUG:\n"…Who?"\n\nGUIDE:\n"…You already know."'},
  {t:'[One last shadow. Alone. Watching. Calculating.]'},
  {t:'SYSTEM: "EVOLVED UNIT — THREAT ELEVATED"',col:'#cc0000'},
  {t:'[It studied the last three fights before moving.]',fight:12},
  {t:'[Chug stands. Still standing.]\n\nCHUG:\n"…I\'m still here."'},
  {t:'CHUG:\n"…Yassine asked you to protect me."\n\n[Pause]\n\nGUIDE:\n"…He said you\'d figure it out."'},
  {t:'CHUG:\n"…Then I need to get stronger. Fast."\n\nGUIDE:\n"…Win."'},
  {t:'SYSTEM: "MEMORY RECOVERY: 12%"',col:'#334455'},
  {t:'SYSTEM: "DRAKOS UNITS CONFIRMED: 12"',col:'#cc0000'},

  {t:'[EXPANDED ENCOUNTER — FRACTURE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:11},
  {t:'— END OF PART 13 —',end:true},

  // PART 14 — RECOVERY
  {part:14,t:"PART 14 — RECOVERY",col:'#d4a017'},
  {t:"[SCENE 1 — AFTER AROWH]\n\nThe ground is still cracked.\n\nNo enemies. No sound.\n\nOnly the weight of defeat.\n\nChug stands, slowly… barely holding balance.\n\nCHUG:\n“…I couldn’t even touch him.”\n\nSilence answers.\n\nA faint echo returns.\n\nAROWH (ECHO):\n“…You’re not a threat.”\n\nChug tightens his fist.\n\nCHUG:\n“…Next time… I will be.”"},
  {t:"[SCENE 2 — RETURN]\n\nA soft distortion forms behind him.\n\nChug turns.\n\nYassine stands there.\n\nNo aura. No control. Just… normal.\n\nYASSINE:\n“…You look like you got destroyed.”\n\nCHUG:\n“…You’re back.”\n\nYASSINE:\n“…Was I gone?”\n\nThat line lands quietly.\n\nCHUG:\n“…Yeah.”\n\nYASSINE:\n“…I don’t remember.”\n\nPause.\n\nYASSINE (low):\n“…But I feel like I should know you.”"},
  {t:"[SCENE 3 — DISCONNECT]\n\nChug looks at him.\n\nSomething is there… but incomplete.\n\nCHUG:\n“…We fought together.”\n\nYASSINE:\n“…Did we win?”\n\nCHUG:\n“…I don’t know anymore.”\n\nSilence stretches.\n\nYASSINE:\n“…Then let’s win next time.”"},
  {t:"[SCENE 4 — PHYSICAL STATE]\n\nYassine tries to step forward.\n\nHe stumbles slightly.\n\nCHUG:\n“…You’re still weak.”\n\nYASSINE:\n“…So are you.”\n\nThey almost laugh.\n\nBut don’t."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 5 — GUIDE]\n\nGUIDE:\n“…Both of you will die if you fight like this again.”\n\nCHUG:\n“…Then what do we do?”\n\nGUIDE:\n“…Train.”\n\nYASSINE:\n“…With what strength?”\n\nGUIDE:\n“…The kind you don’t have yet.”"},
  {t:"[SCENE 6 — TEACHER ARRIVAL]\n\nA presence forms behind them.\n\nHeavy. Calm. Dangerous.\n\nA man steps forward.\n\nMASTER RAEVAN.\n\nRAEVAN:\n“…So this is the one who challenged a Drako.”\n\nCHUG:\n“…Who are you?”\n\nRAEVAN:\n“…The reason you survive the next one.”"},
  {t:"[SCENE 7 — FIRST LESSON]\n\nRAEVAN:\n“…Attack me.”\n\nChug moves.\n\nFast.\n\nDirect.\n\nRaevan shifts slightly.\n\nBarely.\n\nChug misses.\n\nRaevan taps his chest.\n\nChug stumbles back hard.\n\nCHUG:\n“…That wasn’t even strong.”\n\nRAEVAN:\n“…Exactly.”"},
  {t:"[SCENE 8 — OBSERVATION]\n\nYassine watches silently.\n\nYASSINE:\n“…He didn’t dodge… he moved earlier.”\n\nGUIDE:\n“…Now you’re seeing it.”"},
  {t:"[SCENE 9 — CORE PROBLEM]\n\nRAEVAN:\n“…You react.”\n\nCHUG:\n“…That’s how I fight.”\n\nRAEVAN:\n“…That’s why you lost.”\n\nPause.\n\nRAEVAN:\n“…From now on, you move before you think.”"},
  {t:"[SCENE 10 — TRAINING LOOP]\n\nChug attacks again.\n\nRAEVAN:\n“…Late.”\n\nAgain.\n\nRAEVAN:\n“…Wrong timing.”\n\nAgain.\n\nRAEVAN:\n“…Still weak.”"},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 11 — YASSINE STEPS IN]\n\nYassine stands.\n\nCHUG:\n“…Sit down. You can’t fight.”\n\nYASSINE:\n“…I’m not staying useless.”\n\nHe steps forward."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 12 — YASSINE VS RAEVAN]\n\nYassine attacks.\n\nRough.\n\nUnstable.\n\nBut different.\n\nRaevan pauses.\n\nRAEVAN:\n“…Interesting.”\n\nHe blocks.\n\nPushes Yassine back.\n\nBut not as easily."},
  {t:"[SCENE 13 — DIFFERENCE]\n\nCHUG:\n“…Why was that different?”\n\nRAEVAN:\n“…Because he isn’t thinking.”\n\nYASSINE:\n“…I don’t remember anything.”\n\nRAEVAN:\n“…Good. Then you have no bad habits.”"},
  {t:"[SCENE 14 — TRUTH]\n\nRAEVAN:\n“…Both of you are weak.”\n\nCHUG:\n“…We know.”\n\nRAEVAN:\n“…No. You don’t.”\n\nHe looks directly at Chug.\n\nRAEVAN:\n“…You are weak because you think you’re strong.”"},
  {t:"[SCENE 15 — NEW PATH]\n\nRAEVAN turns away.\n\nRAEVAN:\n“…Training starts now.”\n\nGUIDE:\n“…Listen to him.”\n\nCHUG:\n“…And if I don’t?”\n\nRAEVAN:\n“…Then the next Drako won’t walk away.”"},
  {t:"[SCENE 16 — END]\n\nChug looks at his hands.\n\nShaking.\n\nNot from fear.\n\nFrom realization.\n\nCHUG (low):\n“…I need to change.”\n\nYASSINE:\n“…Then I’ll change too.”\n\nGUIDE:\n“…Good.”\n\nSYSTEM:\n“TRAINING PHASE INITIATED”"},

  {t:'[EXPANDED ENCOUNTER — RECOVERY]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:1},
  {t:"— END OF PART 14 —",end:true},
  // PART 15 — TIMING
  {part:15,t:"PART 15 — TIMING",col:'#d4a017'},
  {t:"[SCENE 1 — DAWN WITHOUT SUN]\nThe void has no sunrise.\nBut the air still changes.\nThe weight is different.\nThe silence is sharper.\n\nChug stands in the training ground.\nHis arms ache.\nHis ribs hurt.\nHis pride hurts more.\n\nRAEVAN:\nAgain.\n\nCHUG:\n...I just got up.\n\nRAEVAN:\nThen get up better.\n\nYASSINE sits on a broken stone wall nearby.\nHe watches.\nHe says nothing.\n\nGUIDE:\nListen to him.\n\nCHUG:\nI am listening.\n\nRAEVAN:\nNo.\nYou're defending yourself.\nThat isn't listening."},
  {t:"[SCENE 2 — FIRST LOOP]\nRaevan takes one step back.\nHe raises one hand.\n\nRAEVAN:\nStrike.\n\nChug lunges.\nFast.\nDirect.\nClean.\n\nRaevan turns his shoulder.\nChug passes empty air.\n\nRAEVAN:\nLate.\n\nCHUG:\nI moved first.\n\nRAEVAN:\nNo.\nYou moved loud.\n\nYASSINE:\n...Loud?\n\nRAEVAN:\nIntent has weight.\nGood fighters hear it.\nGreat fighters feel it.\nMonsters kill it before it forms.\n\nChug tightens his jaw.\n\nCHUG:\nThen teach me that.\n\nRAEVAN:\nI am.\nYou keep resisting it."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 3 — YASSINE SPEAKS]\nYassine drops from the wall.\nHe lands lightly.\nToo lightly.\n\nCHUG:\nYou sure you're okay?\n\nYASSINE:\nNo.\nBut I hate sitting still.\n\nGUIDE:\nHis body remembers motion.\n\nYASSINE:\nMy head doesn't.\n\nPause.\n\nYASSINE:\nThat's annoying.\n\nChug almost smiles.\n\nCHUG:\nYou say that like you know yourself.\n\nYASSINE:\nMaybe I do.\nMaybe I just know what I hate."},
  {t:"[SCENE 4 — BASIC FORM]\nRaevan draws a line on the ground with his heel.\n\nRAEVAN:\nNeither of you crosses this line until I say so.\n\nCHUG:\nThat's it?\n\nRAEVAN:\nThat's enough to expose you.\n\nHe circles them.\nSlowly.\nLike he's measuring their breathing.\n\nRAEVAN:\nOne step.\nOnly one.\nTake it without warning me.\n\nChug shifts.\nRaevan taps his chest with two fingers.\nChug loses balance instantly.\n\nRAEVAN:\nLate.\n\nYassine moves next.\nHis step is smaller.\nMessier.\nBut somehow softer.\n\nRaevan's eyes narrow.\n\nRAEVAN:\nAgain.\n\nYASSINE:\nThat one was better, wasn't it?\n\nRAEVAN:\n...Again."},
  {t:"[SCENE 5 — MEMORY RESIDUE]\nYassine repeats the step.\nHe pivots oddly.\nNot textbook.\nNot clean.\nBut dangerous.\n\nRaevan blocks for real this time.\n\nCHUG:\nYou actually moved.\n\nRAEVAN:\nHe doesn't know what he's doing.\n\nYASSINE:\nThanks.\n\nRAEVAN:\nWhich makes him hard to read.\n\nGUIDE:\nResidue.\n\nCHUG:\nResidue?\n\nGUIDE:\nWhat remains when memory dies but instinct survives.\n\nYASSINE:\nSo my body is smarter than me.\n\nRAEVAN:\nFor now."},
  {t:"[SCENE 6 — FIRST PLAYABLE TEST]\nRaevan tosses a wooden short blade toward Yassine.\n\nRAEVAN:\nCatch.\n\nYassine catches it without looking.\nHe blinks.\n\nYASSINE:\n...How did I do that?\n\nGUIDE:\nYou tell us.\n\nRAEVAN tosses Chug a heavier training blade.\n\nRAEVAN:\nNow both of you.\nSpar.\n\nCHUG:\nHe's recovering.\n\nYASSINE:\nAnd you're scared I'll hit you.\n\nCHUG:\nI'm scared you'll fall apart.\n\nYASSINE:\nThen don't lose fast."},
  {t:"[SCENE 7 — SPAR ONE]\nThey circle.\nCareful.\n\nYASSINE:\nFeels weird.\n\nCHUG:\nWhat does?\n\nYASSINE:\nStanding across from you.\nLike I've done it before.\nA lot.\n\nCHUG:\n...Maybe you have.\n\nYASSINE:\nDid I win?\n\nCHUG:\nNot enough.\n\nYassine grins without knowing why.\n\nThey clash.\nQuick.\nTesting.\n\nChug goes high.\nYassine slips left.\nCounter-cuts low.\n\nRAEVAN:\nThere.\n\nGUIDE:\nHe read the shoulder.\n\nCHUG:\nHe guessed.\n\nYASSINE:\nI guessed right."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 8 — HARDER]\nRaevan suddenly enters the spar.\nHe strikes both of them at once.\n\nCHUG:\nHEY—\n\nRAEVAN:\nReal fights do not wait politely.\n\nYassine ducks.\nChug blocks late.\nBoth get pushed back.\n\nRAEVAN:\nYou are both too honest.\n\nCHUG:\nYou keep calling that a flaw.\n\nRAEVAN:\nAgainst monsters, honesty is suicide."},
  {t:"[SCENE 9 — CAMP WITHOUT A CAMP]\nLater.\nThe training ground quiets.\nFragments of old pillars surround them like ruins of a forgotten dojo.\n\nYassine sits beside Chug.\nThey drink water from metal flasks Raevan left behind.\n\nYASSINE:\nSo.\n\nCHUG:\nSo.\n\nYASSINE:\nWe knew each other?\n\nCHUG:\nYeah.\n\nYASSINE:\nClose?\n\nCHUG:\n...Yeah.\n\nYASSINE:\nAnd now?\n\nCHUG:\nNow I don't know what to call this.\n\nYASSINE:\nYou can call it awkward.\n\nCHUG:\nThat works."},
  {t:"[SCENE 10 — THE ASK]\nYassine stares into the black distance.\n\nYASSINE:\nTell me something true.\n\nCHUG:\nAbout what?\n\nYASSINE:\nAbout me.\n\nLong pause.\n\nCHUG:\nYou stayed.\n\nYASSINE:\nThat all?\n\nCHUG:\nWhen things got bad.\nWhen things got weird.\nWhen I stopped looking around properly.\nYou stayed.\n\nYassine says nothing for a while.\n\nYASSINE:\n...That sounds like someone worth remembering."},
  {t:"[SCENE 11 — RAGE HINT]\nRaevan returns carrying a wrapped spear and a set of iron rings.\n\nRAEVAN:\nEnough talk.\n\nCHUG:\nWe were resting.\n\nRAEVAN:\nYou were leaking focus.\n\nHe places the iron rings in front of Chug.\n\nRAEVAN:\nPut these on your wrists.\n\nChug does.\nThey're heavier than they look.\n\nCHUG:\nWhat is this?\n\nRAEVAN:\nWeight.\nSo when power comes, you don't mistake frenzy for strength.\n\nGUIDE:\nRage control begins before Rage appears.\n\nYASSINE:\nRage?\n\nRAEVAN:\nThe thing that saves him.\nOr kills him."},
  {t:"[SCENE 12 — TARGET PRACTICE]\nRaevan plants six wooden stakes into the ground.\nDifferent distances.\nDifferent heights.\n\nRAEVAN:\nBlades are not enough.\nThe world ahead won't stay close to you.\n\nHe unwraps the spear.\n\nRAEVAN:\nThis is range.\n\nCHUG:\nI don't fight with spears.\n\nRAEVAN:\nYou don't fight with victory either.\nAnd yet you keep reaching for it.\n\nYassine snorts.\n\nYASSINE:\nI like him.\n\nCHUG:\nNo you don't.\n\nYASSINE:\nYeah.\nYou're right."},
  {t:"[SCENE 13 — THROW]\nRaevan demonstrates once.\nHe doesn't even seem to aim.\nThe spear tears through three stakes in a line.\n\nCHUG:\n...Okay.\n\nRAEVAN:\nNot okay.\nNecessary.\n\nHe hands Chug short throwing spikes.\n\nRAEVAN:\nHit the center.\n\nChug throws.\nMisses left.\n\nRAEVAN:\nYou're angry at the target.\nTargets love that.\n\nYassine throws next.\nHis spike hits wood.\nNot center.\nBut solid.\n\nYASSINE:\nI'll take it.\n\nRAEVAN:\nTake improvement instead."},
  {t:"[SCENE 14 — RANDOM CHALLENGER SEED]\nA sound breaks the training flow.\nMetal scraping stone.\n\nEveryone turns.\n\nAt the edge of the ruins stands a figure in a torn hood.\nNo face.\nNo insignia.\nA chain hangs from one hand.\n\nUNKNOWN:\nTraining already?\n\nChug steps forward.\n\nCHUG:\nWho are you?\n\nUNKNOWN:\nSomeone disappointed.\n\nYassine stands too.\nInstinctively.\n\nGUIDE:\nCareful.\n\nRAEVAN:\nBack.\nBoth of you."},
  {t:"[SCENE 15 — SHORT FIGHT]\nThe hooded challenger flicks the chain.\nIt snaps across the ground like a live wire.\n\nRAEVAN catches it with one hand.\n\nRAEVAN:\nWrong place.\n\nUNKNOWN:\nWrong era, old man.\n\nThe challenger lunges.\nFast.\nMessy.\nDesperate.\n\nChug intercepts.\nTwo strikes.\nOne block.\nOne shove.\n\nYassine pivots behind.\nDisarms with a movement he doesn't recognize.\n\nUNKNOWN stumbles back.\n\nUNKNOWN:\n...Tch.\n\nHe retreats into distortion before either can grab him."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 16 — AFTER THE ENCOUNTER]\nSilence returns, but it isn't clean anymore.\n\nCHUG:\nFriend or enemy?\n\nGUIDE:\nBoth is possible.\n\nYASSINE:\nHe looked at us like he knew us.\n\nRAEVAN:\nThen assume he did.\n\nCHUG:\nWill he come back?\n\nRAEVAN:\nYes.\n\nCHUG:\nHow do you know?\n\nRAEVAN:\nBecause the weak always return with better hatred."},
  {t:"[SCENE 17 — NIGHT LESSON]\nLater.\nNo night exists here, but darkness deepens anyway.\n\nRaevan places a candle-sized blue flame between Chug and Yassine.\nIt doesn't burn the ground.\nIt only bends the air.\n\nYASSINE:\n...Magic?\n\nRAEVAN:\nA whisper of it.\nYou are not ready for more.\n\nCHUG:\nSo why show us?\n\nRAEVAN:\nBecause one day, someone will trap you in a space that answers only to their will.\n\nGUIDE:\nField.\n\nYASSINE:\nI hate that word already.\n\nRAEVAN:\nGood.\nFear makes students pay attention."},
  {t:"[SCENE 18 — CLOSING]\nChug lies awake later, staring up at a sky that isn't there.\n\nYassine is asleep two steps away, one hand still near the training blade.\n\nGUIDE:\nYou trust him.\n\nCHUG:\nI do.\n\nGUIDE:\nHe doesn't remember why.\n\nCHUG:\nI'll take what I can get.\n\nGUIDE:\nYou'll need more than trust.\n\nCHUG:\nThen I'll build more.\n\nFar away.\nSomewhere beyond the ruins.\nA heavy footstep echoes once.\n\nThen stops.\n\nSYSTEM:\n\"ALLY YASSINE — PLAYABLE STATUS UNLOCKED\""},

  {t:'[BOSS GATE — Nexter No.9 Zeph]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for TIMING.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.9 ZEPH',fight:18},
  {t:"— END OF PART 15 —",end:true},
  // PART 16 — THE HOODED ONE
  {part:16,t:"PART 16 — THE HOODED ONE",col:'#d4a017'},
  {t:"[SCENE 1 — SECOND DAY]\nTraining hurts more on the second day.\n\nChug's shoulders are tight.\nHis wrists are raw from the iron rings.\nYassine's breathing is better now.\nBut his eyes still search every wall like he expects memory to be hiding there.\n\nRAEVAN:\nMove.\n\nThey move.\n\nRAEVAN:\nStop.\n\nThey stop.\n\nRAEVAN:\nAgain.\n\nYASSINE:\nIs there a point where this becomes less annoying?\n\nRAEVAN:\nYes.\nWhen you stop talking.\n\nCHUG:\nI think that was a joke.\n\nRAEVAN:\nIt wasn't."},
  {t:"[SCENE 2 — RANGE DRILL]\nSix more stakes.\nThis time they swing from chains.\n\nRAEVAN:\nTargets that stand still teach bad habits.\n\nChug throws two spikes.\nMisses one.\nClips one.\n\nRAEVAN:\nHalf a death is still failure.\n\nYASSINE throws next.\nHits the chain.\nThe stake spins wildly.\n\nYASSINE:\n...That counts.\n\nRAEVAN:\nIt counts as chaos.\n\nGUIDE:\nChaos can be useful.\n\nRAEVAN:\nNot when it belongs to the enemy first."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 3 — PRESSURE]\nThe ground trembles softly.\n\nChug feels it before he hears it.\n\nCHUG:\nHe's back.\n\nYASSINE:\nThe hood?\n\nGUIDE:\nNot alone.\n\nRaevan picks up the spear.\n\nRAEVAN:\nBoth of you behind me.\n\nCHUG:\nNo.\n\nRAEVAN:\nThen beside me.\nDie with discipline."},
  {t:"[SCENE 4 — CHALLENGER RETURNS]\nThe hooded one emerges again.\nThis time with three shadow-broken fighters around him.\nNone show their faces.\n\nHOODED CHALLENGER:\nYou train too loudly.\n\nCHUG:\nYou hide too proudly.\n\nHOODED CHALLENGER:\nYou still talk like you matter.\n\nYassine stiffens at the voice.\n\nYASSINE:\n...Why does that sound familiar?\n\nGUIDE:\nDo not chase the feeling."},
  {t:"[SCENE 5 — RANDOM ENCOUNTER BATTLE]\nThe three nameless fighters rush first.\n\nFighter one uses twin hooks.\nFighter two fights bare-handed.\nFighter three throws shards of black glass.\n\nRAEVAN:\nSplit.\n\nChug takes the hooks.\nYassine chases the glass thrower.\nRaevan folds the bare-handed fighter with one precise spear-thrust to the chest.\n\nCHUG:\nLeft side!\n\nYASSINE:\nI saw it!\n\nYassine ducks too late.\nA shard cuts his cheek.\nHe responds with a spinning elbow that looks too polished to be improvised.\n\nYASSINE:\n...I did that again.\n\nGUIDE:\nKeep doing it."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 6 — THE HOOD ENTERS]\nThe hooded challenger finally moves.\nThe chain sings.\n\nHe crashes into Chug's guard with brutal weight.\n\nCHUG:\nYou're stronger today.\n\nHOODED CHALLENGER:\nSo are my reasons.\n\nYassine turns toward them.\nThe challenger snaps the chain backward without looking.\nIt almost catches Yassine's throat.\n\nCHUG:\nYASSINE!\n\nYassine catches the chain with the wooden short blade.\nSplinters fly.\n\nYASSINE:\nYeah.\nI felt that one."},
  {t:"[SCENE 7 — NO NAME]\nChug closes distance.\nPunch.\nKnee.\nLow cut.\n\nThe hooded fighter takes the knee and laughs once.\nNot happy.\nJust bitter.\n\nHOODED CHALLENGER:\nYou still lead with guilt.\n\nCHUG:\nWho are you?\n\nHOODED CHALLENGER:\nYou ask that too late.\n\nYassine freezes again.\n\nYASSINE:\n...Too late.\n\nGUIDE:\nFocus."},
  {t:"[SCENE 8 — BREAK THE CHAIN]\nRaevan speaks once.\n\nRAEVAN:\nLeft wrist.\n\nChug doesn't question it.\nHe feints high.\nDrops low.\nYassine steps in at the same instant.\n\nTogether they pin the chain.\n\nRaevan's spear cuts through the wrapped links.\n\nThe hooded challenger's weapon falls apart.\n\nHOODED CHALLENGER:\n...Tch.\n\nCHUG lunges for the hood.\nThe challenger retreats with violent speed.\n\nHe doesn't run.\nHe tears space with a talisman and falls backward into it.\n\nBefore he vanishes—\n\nHOODED CHALLENGER:\nTell the next teacher to hide better.\n\nHe is gone."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 9 — TEACHER?]\nChug turns sharply.\n\nCHUG:\nNext teacher?\n\nRAEVAN:\n...So he knows.\n\nGUIDE:\nThen they are tracking faster than expected.\n\nYASSINE:\nThey?\n\nNo one answers immediately."},
  {t:"[SCENE 10 — AFTER BATTLE]\nYassine wipes blood from his cheek.\nHe looks annoyed more than hurt.\n\nYASSINE:\nIs all of this normal for you?\n\nCHUG:\nNot anymore.\n\nYASSINE:\nBad answer.\n\nCHUG:\nIt's the one I have.\n\nRAEVAN kneels by the cut chain links.\n\nRAEVAN:\nThis wasn't random.\n\nGUIDE:\nNo.\nIt was a probe.\n\nCHUG:\nBy who?\n\nGUIDE:\nBy someone patient."},
  {t:"[SCENE 11 — THE SECOND TEACHER ARRIVES]\nThe air cools unnaturally.\n\nBlue symbols open in the dark like eyes made of script.\n\nA woman steps through them.\nWhite-gray robes.\nCalm face.\nHorrible presence.\n\nYASSINE:\n...Okay.\nI hate this one already.\n\nLADY SORYA:\nGood.\nHatred sharpens attention.\n\nRAEVAN:\nYou're late.\n\nSORYA:\nI arrived when they stopped being useless.\n\nCHUG:\nWhy does every teacher insult first?\n\nSORYA:\nBecause praise confuses beginners."},
  {t:"[SCENE 12 — FIELD LESSON]\nSorya draws a circle with her finger in empty air.\nIt remains.\nA ring of light hangs there.\n\nSORYA:\nClose combat is honesty.\nRange is reach.\nField is authority.\n\nCHUG:\nAuthority over what?\n\nSORYA:\nThe argument called reality.\n\nYASSINE:\nThat sounds unfair.\n\nSORYA:\nIt is.\nWhich is why you will learn it."},
  {t:"[SCENE 13 — FIRST FIELD TEST]\nSorya expands the ring.\nThe training field shrinks.\nNot actually.\nBut it feels smaller.\nBreathing grows harder.\nSound narrows.\n\nCHUG:\n...What did you do?\n\nSORYA:\nI asked the space to prefer me.\n\nYASSINE:\nCan space say no?\n\nSORYA:\nIf you're weak.\n\nRaevan watches silently.\n\nGUIDE:\nRemember this feeling.\nYour enemies will not ask permission before using it."},
  {t:"[SCENE 14 — CHUG RESISTS]\nChug pushes forward inside the pressure circle.\nEach step feels like moving through deep water.\n\nSORYA:\nDon't overpower it.\nRead its shape.\n\nCHUG:\nHow?\n\nSORYA:\nEverything has edges.\nEven oppression.\n\nHe closes his eyes.\nFeels the pressure.\nFinds a softer seam on the right.\nSteps there.\n\nThe weight drops slightly.\n\nSORYA:\nAgain."},
  {t:"[SCENE 15 — YASSINE RESONANCE]\nYassine enters next.\nHe winces at first.\nThen turns strangely comfortable.\n\nSORYA:\n...Interesting.\n\nYASSINE:\nWhat?\n\nSORYA:\nYou've been caged before.\n\nSilence.\n\nYASSINE:\nI don't remember that.\n\nSORYA:\nYour nerves do.\n\nCHUG looks at him.\n\nYASSINE:\nDon't.\n\nCHUG:\nDon't what?\n\nYASSINE:\nLook at me like I broke twice."},
  {t:"[SCENE 16 — SMALL FIRE]\nLater, a camp is finally made.\nNot a real home.\nBut enough for a circle of heat and sitting stones.\n\nRaevan doesn't sit.\nSorya does.\nGuide remains unseen, as always.\n\nChug and Yassine share stale ration bread.\n\nYASSINE:\nSo this is a camp now?\n\nCHUG:\nIf we survive in the same spot twice, I think it counts.\n\nSORYA:\nThen survive a third time before naming anything.\n\nYASSINE:\nShe's worse than him.\n\nRAEVAN:\nCorrect."},
  {t:"[SCENE 17 — WHISPERS OF SOMEONE ELSE]\nAs the fire lowers, something moves beyond its reach.\nHeavy.\nMeasured.\nNot the hooded challenger.\nDifferent weight.\n\nChug rises instantly.\n\nCHUG:\nWho's there?\n\nNo answer.\n\nOnly a single line spoken from the dark.\n\nUNKNOWN VOICE:\n\"You still gather ruins and call them brothers.\"\n\nYassine's hand trembles around the cup.\n\nYASSINE:\n...That voice.\n\nCHUG steps toward the edge of the firelight.\n\nCHUG:\nShow yourself.\n\nNothing comes forward."},
  {t:"[SCENE 18 — END]\nBy morning, only one mark remains beyond the camp—\na deep footprint burned into stone.\n\nSORYA kneels by it.\n\nSORYA:\nThis was no scout.\n\nRAEVAN:\nNo.\n\nGUIDE:\nThen the next step is coming sooner than expected.\n\nCHUG:\nGood.\n\nRAEVAN:\nNo.\nBad.\nThat means it has a name."},

  {t:'[EXPANDED ENCOUNTER — THE HOODED ONE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:4},
  {t:"— END OF PART 16 —",end:true},
  // PART 17 — THE FOOTPRINT
  {part:17,t:"PART 17 — THE FOOTPRINT",col:'#d4a017'},
  {t:"[SCENE 1 — UNEASY MORNING]\nThe footprint is still warm.\n\nChug crouches beside it.\nIt is larger than his forearm.\nThe stone under it is cracked inward, not outward.\n\nCHUG:\nHe stepped down like the ground offended him.\n\nSORYA:\nThat is one way to describe power.\n\nRAEVAN:\nAnother is: beyond you.\n\nYASSINE:\nYou two really know how to motivate people.\n\nGUIDE:\nThey are trying to keep you alive.\n\nYASSINE:\nCould try sounding nicer about it."},
  {t:"[SCENE 2 — NAMELESS FEAR]\nRaevan stands over the mark.\n\nRAEVAN:\nIf this is who I think it is, neither of you are ready.\n\nCHUG:\nThen make us ready.\n\nRAEVAN:\nReadiness is not a button.\n\nSORYA:\nNo.\nBut panic is.\nYou both press it beautifully.\n\nChug exhales through his teeth.\n\nCHUG:\nThen stop watching and teach."},
  {t:"[SCENE 3 — RAGE DRILL]\nKaizen arrives without footsteps.\nAn old man in layered dark cloth.\nEyes like banked fire.\n\nYASSINE:\nHow many teachers are there?\n\nKAIZEN:\nEnough to disappoint you from every direction.\n\nCHUG:\n...Great.\n\nKAIZEN:\nShow me your anger.\n\nCHUG:\nWhat?\n\nKAIZEN:\nThe thing under your ribs since the defeat.\nShow it to me before it rots."},
  {t:"[SCENE 4 — PROVOCATION]\nKaizen circles Chug once.\n\nKAIZEN:\nYou were crushed.\n\nCHUG says nothing.\n\nKAIZEN:\nYou were measured and discarded.\n\nCHUG's jaw hardens.\n\nKAIZEN:\nYou couldn't protect yourself.\nYou couldn't answer him.\nYou still hear the word threat in your sleep.\n\nRed heat flickers behind Chug's eyes.\n\nGUIDE:\nSteady.\n\nKAIZEN:\nNo.\nLet it rise.\n\nCHUG:\n...I said enough.\n\nKAIZEN:\nYou said nothing."},
  {t:"[SCENE 5 — RAGE 1 SPARK]\nChug moves.\nToo fast.\nToo hard.\nA red after-image trails the first step.\n\nYASSINE:\n...There.\n\nChug swings for Kaizen.\nThe old man catches the strike on his palm.\n\nKAIZEN:\nThere you are.\n\nThe red glow vanishes instantly.\nChug stumbles, breathing hard.\n\nCHUG:\nWhat was that?\n\nKAIZEN:\nThe door.\nNot the room."},
  {t:"[SCENE 6 — COST]\nKaizen taps Chug's sternum.\n\nKAIZEN:\nIf you open Rage without discipline, your body borrows from your future.\n\nCHUG:\nI'll pay it.\n\nKAIZEN:\nYou say that because you haven't paid enough yet.\n\nYassine watches very carefully.\n\nKAIZEN turns to him.\n\nKAIZEN:\nAnd you.\n\nYASSINE:\nI don't even know what I'm angry at.\n\nKAIZEN:\nThen you're lucky."},
  {t:"[SCENE 7 — THE CHALLENGE]\nTraining is cut short by a sound like iron dragged through rain.\n\nThe edge of camp distorts.\n\nThe hooded challenger appears again.\nBut this time he doesn't enter alone.\n\nBehind him, a much larger figure stands in black-red cloth and a broken oni mask.\nOnly one horn remains on the mask.\nNo face visible beneath it.\n\nYassine goes cold.\n\nYASSINE:\n...No.\n\nCHUG:\nYou know him?\n\nYASSINE:\nNo.\n\nGUIDE:\nLie.\n\nYASSINE:\nI don't know how!"},
  {t:"[SCENE 8 — THE MASKED GIANT]\nThe giant steps forward once.\nThe footprint matches.\n\nHOODED CHALLENGER:\nI brought someone who remembers what strength costs.\n\nCHUG:\nWho are you?\n\nMASKED GIANT:\n...Late.\n\nThe single word lands like a hammer.\n\nChug freezes.\n\nCHUG:\nYou too?\n\nMASKED GIANT:\nAlways late."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 9 — FIRST CLASH]\nChug doesn't wait.\nHe attacks first.\n\nPunch.\nKick.\nBlade feint.\n\nThe giant blocks all three with one arm.\n\nCHUG:\n...Move!\n\nThe giant finally swings.\nBackhand only.\n\nChug is launched across the campfire stones.\n\nYASSINE:\nCHUG!\n\nRAEVAN intercepts the next hit with the spear shaft.\nIt cracks.\n\nRAEVAN:\nBack.\nNOW."},
  {t:"[SCENE 10 — TONE OF THE FIGHT]\nThis is not Arowh.\nThis presence burns differently.\nLess cold.\nMore personal.\n\nThe giant points at Chug.\n\nMASKED GIANT:\nYou left before the fight even started.\n\nCHUG:\nI don't even know who you are!\n\nMASKED GIANT:\nThat's the wound."},
  {t:"[SCENE 11 — CAMP DEFENSE]\nYassine moves without being told.\nHe pulls Chug up.\n\nYASSINE:\nCan you stand?\n\nCHUG:\nI can hit.\n\nYASSINE:\nNot the same thing.\n\nSorya expands a shallow pressure circle over the camp.\n\nSORYA:\nIf he enters this field, he slows.\nA little.\n\nKAIZEN:\nThen make that little matter."},
  {t:"[SCENE 12 — DUO RESPONSE]\nChug and Yassine engage together.\nChug high.\nYassine low.\nThen reverse.\n\nThe masked giant actually has to adjust.\n\nCHUG:\nThere.\n\nYASSINE:\nHe hates angle changes.\n\nMASKED GIANT:\nHm.\n\nThat sound—\nalmost approval."},
  {t:"[SCENE 13 — THE BREAK]\nThe hooded challenger tries to flank Sorya.\nRaevan cuts him off.\n\nHOODED CHALLENGER:\nYou old leeches keep interfering.\n\nRAEVAN:\nYou keep breathing.\nI keep finding that offensive.\n\nThey clash aside from the main battle."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 14 — CHUG FALLS AGAIN]\nChug tries to force Rage.\nRed flicker.\nOne second too early.\n\nThe masked giant grabs his wrist.\n\nMASKED GIANT:\nBorrowed fire.\n\nHe slams Chug into the earth.\n\nKAIZEN:\nIdiot boy.\n\nYassine dives in between them before the finishing strike.\n\nYASSINE:\nHEY!\n\nThe giant stops.\nJust for a heartbeat."},
  {t:"[SCENE 15 — STRANGE PAUSE]\nThe giant stares at Yassine.\nThe mask tilts.\n\nMASKED GIANT:\n...Still breathing.\n\nYASSINE:\nDo I know you?\n\nMASKED GIANT:\nYou knew enough.\n\nYASSINE:\nThat means nothing.\n\nMASKED GIANT:\nIt means you're luckier than me."},
  {t:"[SCENE 16 — RETREAT]\nA black pulse ripples from far away.\nThe masked giant looks toward it, disgusted.\n\nMASKED GIANT:\nTch.\n\nThe hooded challenger retreats first.\n\nThe masked giant backs away, never turning around.\n\nBefore vanishing into distortion, he speaks once more.\n\nMASKED GIANT:\nGet stronger before I stop holding back.\n\nThen he is gone."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 17 — AFTERMATH]\nChug coughs blood into his palm.\n\nCHUG:\nHe held back?\n\nRAEVAN:\nYes.\n\nCHUG:\nI hate that answer.\n\nSORYA:\nThen become the answer you want.\n\nYassine is still staring at where the giant stood.\n\nGUIDE:\nWhat did you feel?\n\nYASSINE:\n...Grief."},
  {t:"[SCENE 18 — LAST IMAGE]\nAt the edge of the battlefield lies something the masked giant dropped—\na strip of red cloth wrapped around an old metal tag.\nNo name.\nOnly a symbol like a split horn.\n\nChug picks it up.\n\nCHUG:\nThis means something to him.\n\nGUIDE:\nGood.\nThen pain still reaches him."},

  {t:'[EXPANDED ENCOUNTER — THE FOOTPRINT]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:5},
  {t:"— END OF PART 17 —",end:true},
  // PART 18 — SPLIT HORN
  {part:18,t:"PART 18 — SPLIT HORN",col:'#d4a017'},
  {t:"[SCENE 1 — RED CLOTH]\nThe cloth still smells like smoke and rain.\n\nChug turns the metal tag over and over.\nNo letters.\nOnly the split-horn mark carved deep.\n\nYASSINE:\nI've seen that.\n\nEveryone turns to him.\n\nYASSINE:\n...No.\nI thought I had.\n\nKAIZEN:\nMemories don't return cleanly.\nThey bleed.\n\nCHUG:\nThen let them.\n\nGUIDE:\nCareful what you ask from bleeding things."},
  {t:"[SCENE 2 — CAMP TALK]\nThe camp finally feels real now.\nNot safe.\nJust repeated.\n\nRaevan repairs the spear with wire and black resin.\nSorya writes circles into the dirt and erases them.\nKaizen sharpens nothing at all with a stone, as if practicing patience itself.\n\nYassine sits opposite Chug by the fire.\n\nYASSINE:\nYou ever notice how everyone around us talks like they buried ten cities?\n\nCHUG:\nI noticed.\n\nYASSINE:\nCan we get one normal person?\n\nCHUG:\nNo.\n\nYASSINE:\nYeah.\nThat sounds right."},
  {t:"[SCENE 3 — THE BACKSTORY EDGE]\nGuide speaks from nowhere and everywhere.\n\nGUIDE:\nThe one with the mask was not empty.\n\nCHUG:\nI noticed.\n\nGUIDE:\nHe remembers too much.\n\nYASSINE:\nWho is he?\n\nGUIDE:\nNot your answer yet.\n\nCHUG:\nYou're getting really good at being useless on purpose.\n\nGUIDE:\nAnd you're getting very good at mistaking timing for cruelty."},
  {t:"[SCENE 4 — RANGE UPGRADE]\nRaevan lays out new weapons on a cloth.\nThrowing knives.\nShort javelins.\nWeighted cords.\n\nRAEVAN:\nIf a stronger body stands in front of you, make distance your ally.\n\nCHUG picks the weighted cord.\n\nRAEVAN:\nWrong.\n\nCHUG:\nI didn't even use it yet.\n\nRAEVAN:\nYou chose what looked cool first.\nThat is always wrong.\n\nYassine laughs.\n\nYASSINE:\nHe got you there.\n\nChug takes the short javelins instead."},
  {t:"[SCENE 5 — YASSINE PLAYABLE DRILL]\nRaevan turns to Yassine.\n\nRAEVAN:\nYou will stop imitating him.\n\nYASSINE:\nI wasn't.\n\nRAEVAN:\nYou were about to.\n\nYASSINE:\n...Fair.\n\nRAEVAN hands him twin short blades.\n\nRAEVAN:\nThese fit your tempo.\n\nYASSINE:\nHow do you know my tempo?\n\nRAEVAN:\nI watched you breathe in a fight.\n\nYassine tests the blades.\nThey settle in his hands like old conversation.\n\nYASSINE:\nI hate how right that feels."},
  {t:"[SCENE 6 — MEMORY FRAGMENT]\nSorya creates a thin pressure field around the fire.\n\nSORYA:\nSit in this and remember without forcing it.\n\nCHUG:\nThat sounds dangerous.\n\nSORYA:\nGood.\nDanger keeps memory honest.\n\nYassine sits first.\nThe field hums.\n\nHis pupils shake.\n\nFLASH:\nRain.\nA rooftop.\nSomeone training alone until his knuckles bleed.\nNo audience.\nNo praise.\nOnly refusal.\n\nYASSINE gasps and jerks out of the field.\n\nCHUG:\nWhat did you see?\n\nYASSINE:\nSomeone alone.\nNot me.\nI think.\n\nGUIDE:\nYou think wrong."},
  {t:"[SCENE 7 — TRAGIC PARALLEL]\nLater, Guide speaks softly while the others pretend not to listen.\n\nGUIDE:\nSome are forgotten.\nSome choose isolation and return to find the world moved on.\n\nCHUG:\nYou're talking about him.\n\nGUIDE:\nI'm talking about abandonment in two directions.\n\nYASSINE:\nAnd which one am I?\n\nGUIDE:\nThe kind cut away.\n\nCHUG:\nAnd the mask?\n\nGUIDE:\nThe kind that cut himself away and came back angry.\n\nSilence hangs over that."},
  {t:"[SCENE 8 — CHUG AND YASSINE]\nChug and Yassine walk the edge of camp after the talk.\n\nYASSINE:\nSo if that's true...\n\nCHUG:\nYeah.\n\nYASSINE:\nHe chose distance.\nI got dragged into it.\n\nCHUG:\nLooks like it.\n\nYASSINE:\nAnd somehow we're still both broken.\n\nCHUG:\nYeah.\n\nYASSINE:\nThat sucks.\n\nCHUG:\nYeah.\n\nThey both laugh this time.\nBriefly.\nIt helps."},
  {t:"[SCENE 9 — RANDOM CHALLENGER WAVE]\nThe calm ends with a horn made of bone.\n\nFive random challengers rush the camp from two sides.\nNo names.\nNo words.\nOnly marks burned into their necks.\n\nSORYA:\nInterference wave.\n\nRAEVAN:\nHold formation.\n\nKAIZEN:\nBoy.\nDo not force Rage unless you want to collapse stupidly.\n\nCHUG:\nGreat advice."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 10 — CAMP BATTLE]\nYassine fights first this time.\nPlayable.\nActive.\nSharp.\n\nHe slips between two challengers and cuts the straps on a hammer before it can rise.\n\nYASSINE:\nOkay.\nI like these blades.\n\nCHUG handles the left flank with javelin throws and close-range elbows.\n\nCHUG:\nMove right!\n\nYASSINE:\nAlready there!\n\nRaevan and Sorya defend the center.\nKaizen watches until someone truly needs him."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 11 — MEMORY MOVE]\nOne challenger grabs Yassine from behind.\n\nWithout thinking, Yassine twists, drops weight, and throws him with perfect leverage.\n\nCHUG:\nYou absolutely knew that one.\n\nYASSINE:\nI absolutely did not.\n\nGUIDE:\nLie again.\nMaybe your body will believe you."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 12 — POST FIGHT QUIET]\nWhen the last challenger falls, black mist leaves each body and drifts away eastward.\n\nSORYA:\nThey're being recycled.\n\nCHUG:\nInto what?\n\nSORYA:\nBetter failures.\n\nKAIZEN:\nOr louder ones."},
  {t:"[SCENE 13 — THE MASK APPEARS AGAIN]\nAt the far ridge, the masked giant stands watching.\nNo attack this time.\nOnly presence.\n\nCHUG:\nCome down here!\n\nNo answer.\n\nYASSINE:\nWhy doesn't he just finish it?\n\nGUIDE:\nBecause hatred wants witnesses.\n\nThe masked giant lifts one hand.\nNot a wave.\nNot a threat.\nAlmost a command to keep moving.\n\nThen he disappears."},
  {t:"[SCENE 14 — CLOSING TRUTH]\nThat night, Chug cannot sleep again.\n\nHe sits with the split-horn tag in his hand.\n\nGUIDE:\nYou're trying to force a name onto pain.\n\nCHUG:\nBecause pain without a face is useless.\n\nGUIDE:\nNot useless.\nJust patient.\n\nCHUG:\nThen I get patient too.\n\nFar off, something like a drumbeat echoes once.\n\nHeavy.\nMeasured.\nWaiting."},

  {t:'[BOSS GATE — Nexter No.8 Split Horn]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for SPLIT HORN.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.8 SPLIT HORN',fight:8},
  {t:"— END OF PART 18 —",end:true},
  // PART 19 — THE NAME AT THE EDGE
  {part:19,t:"PART 19 — THE NAME AT THE EDGE",col:'#d4a017'},
  {t:"[SCENE 1 — BEFORE THE STORM]\nThe camp wakes to no wind.\nThat is worse than noise now.\n\nRaevan sharpens the repaired spear.\nSorya draws pressure lines around the perimeter.\nKaizen makes Chug hold Rage at the threshold without opening it.\n\nKAIZEN:\nFeel it.\nDo not wear it yet.\n\nCHUG:\nIt's like holding breath in my bones.\n\nKAIZEN:\nGood.\nKeep holding.\n\nYassine trains alone nearby with the twin blades.\nHe keeps repeating one same opening slash.\nAgain.\nAgain.\nAgain.\n\nCHUG:\nYou've done that one thirty times.\n\nYASSINE:\nBecause it feels like it leads somewhere.\n\nCHUG:\nDoes it?\n\nYASSINE:\n...Not yet."},
  {t:"[SCENE 2 — WARNING]\nGuide's voice cuts through camp.\n\nGUIDE:\nThey're coming.\n\nRAEVAN:\nHow many?\n\nGUIDE:\nEnough to hide one.\n\nEveryone understands what that means.\n\nCHUG:\nThe mask.\n\nSORYA:\nThen do not chase him blindly.\n\nCHUG:\nThat's not going to happen.\n\nYASSINE:\nThat sounds like a lie you tell yourself a lot."},
  {t:"[SCENE 3 — WAVE ONE]\nEight challengers hit the perimeter at once.\nMixed weapons.\nMixed speeds.\nDesigned to scatter attention.\n\nRAEVAN:\nPositions.\n\nChug takes front right.\nYassine takes front left.\nRaevan center.\nSorya rear control.\nKaizen drifts where collapse might happen.\n\nCHUG throws first.\nA javelin drops one.\n\nYASSINE cuts down another before the body lands.\n\nCHUG:\nYou're getting faster.\n\nYASSINE:\nThat feels bad when you say it like that."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 4 — WAVE TWO]\nThe hooded challenger joins mid-fight.\nNew chain.\nNew scars on his arms.\n\nHOODED CHALLENGER:\nStill breathing.\nAnnoying.\n\nRAEVAN:\nStill whining.\nPredictable.\n\nThey peel off into their own duel again.\n\nSORYA traps two challengers in a compressed field.\n\nSORYA:\nNow.\n\nChug and Yassine strike together."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 5 — THE GIANT ARRIVES]\nThen the air changes.\n\nAll sound drops one layer lower.\n\nThe masked giant walks through the broken perimeter line.\nNo rush.\nNo fear.\nOnly certainty.\n\nMASKED GIANT:\nYou made this place warm.\n\nCHUG:\nAnd you'll break it if I let you.\n\nMASKED GIANT:\nYou already did."},
  {t:"[SCENE 6 — ROUND ONE]\nChug engages alone first.\nHe knows that's stupid.\nHe does it anyway.\n\nJavelin feint.\nElbow close.\nLow sweep.\n\nThe giant absorbs the sweep and drives a knee into Chug's ribs.\n\nCHUG folds.\n\nMASKED GIANT:\nStill trying to prove yourself to ghosts.\n\nCHUG:\nStill talking like you know me.\n\nMASKED GIANT:\nI know your timing.\nThat is worse."},
  {t:"[SCENE 7 — YASSINE INTERVENES]\nYassine enters from the blind side.\nFast twin-blade sequence.\n\nThe giant blocks three.\nThe fourth blade scratches cloth at his waist.\n\nHe freezes.\n\nMASKED GIANT:\n...That stance.\n\nYASSINE:\nWhat about it?\n\nMASKED GIANT:\nYou kept it.\n\nYASSINE:\nI don't even know what it is!\n\nMASKED GIANT:\nExactly."},
  {t:"[SCENE 8 — DUO FLOW]\nChug gets up.\nThis time he doesn't force the center.\nHe lets Yassine set rhythm.\n\nYASSINE:\nFollow me.\n\nCHUG:\nI thought you had amnesia.\n\nYASSINE:\nI do.\nMove anyway.\n\nThey sync.\nNot perfect.\nBut dangerous enough.\n\nThe giant actually gives ground.\nOne step.\n\nEveryone notices.\n\nKAIZEN:\nGood.\nNow don't celebrate stupidity."},
  {t:"[SCENE 9 — RAGE 1 HALF-OPEN]\nChug feels the door again.\nRed heat at the edges.\n\nKAIZEN:\nNot all the way.\n\nChug opens it halfway.\nEnough for acceleration.\nNot enough for collapse.\n\nHis next strike lands hard against the giant's guard.\n\nMASKED GIANT:\n...Better.\n\nCHUG:\nI'm getting tired of your approval.\n\nMASKED GIANT:\nThen earn fear instead."},
  {t:"[SCENE 10 — ROUND TWO]\nThe giant finally attacks seriously.\n\nOne fist.\nOne shoulder check.\nOne downward smash.\n\nChug barely slips the first.\nYassine catches the second on crossed blades and gets driven backward ten steps.\n\nYASSINE:\nOkay.\nThat's disgusting.\n\nSORYA:\nInside the field.\nPull him inside the field.\n\nShe expands a narrow field seam under the giant's feet.\nPressure twists.\nMovement drags.\n\nCHUG:\nNow!\n\nThey hit together again."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 11 — THE CRACK]\nChug lands center mass.\nYassine's blade hooks the broken mask edge.\n\nHalf the oni mask snaps away.\n\nEveryone freezes for one fraction of a second.\n\nBeneath it—\na scarred jaw.\nRain-burned skin.\nA familiar line of mouth twisted with exhaustion and fury.\n\nCHUG stares.\n\nYassine goes pale.\n\nMASKED GIANT recoils and covers the break instantly.\n\nMASKED GIANT:\nEnough."},
  {t:"[SCENE 12 — THE WORDS]\nChug hears himself before he means to.\n\nCHUG:\n...Tora?\n\nThe giant stops moving.\n\nComplete silence.\n\nYASSINE whispers at the same time—\n\nYASSINE:\n...Oni.\n\nThe masked giant breathes once.\nHeavy.\nShaking.\n\nMASKED GIANT:\nSo you do remember pieces.\n\nCHUG:\nTora Oni.\n\nMASKED GIANT:\nDo not say that name like you still own it."},
  {t:"[SCENE 13 — REVEAL AT END OF 19]\nHe tears off the rest of the mask himself.\n\nTORA ONI stands fully revealed.\nOlder.\nHarsher.\nBuilt like punishment given form.\n\nTORA ONI:\nYou got your answer.\n\nCHUG:\n...Tora.\n\nTORA ONI:\nToo late.\nAs always.\n\nYASSINE grips his blades harder.\n\nYASSINE:\nI know you.\n\nTORA ONI looks at him.\nPain flashes once.\nThen rage covers it.\n\nTORA ONI:\nYou knew me before they broke you."},
  {t:"[SCENE 14 — WITHDRAWAL]\nThe black pulse returns from far away.\nSharper this time.\nDemanding.\n\nTora clicks his tongue in disgust.\n\nTORA ONI:\nThis isn't finished.\n\nCHUG steps forward.\n\nCHUG:\nNo.\nIt isn't.\n\nTORA ONI backs into distortion without lowering his gaze.\n\nTORA ONI:\nThen stop arriving after the damage.\n\nHe vanishes."},
  {t:"[SCENE 15 — AFTERMATH]\nThe camp is torn.\nThe fire pit is dead.\nThe hooded challenger gone too.\n\nYassine drops to one knee, breathing too hard.\n\nCHUG:\nYassine.\n\nYASSINE:\nI said his name before you did.\n\nGUIDE:\nYes.\n\nYASSINE:\nWhy?\n\nGUIDE:\nBecause not all memory lives in thought.\n\nCHUG looks at the place where Tora disappeared.\n\nCHUG:\nTora Oni.\n\nKAIZEN:\nNow the fight can begin properly."},

  {t:'[EXPANDED ENCOUNTER — THE NAME AT THE EDGE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:9},
  {t:"— END OF PART 19 —",end:true},
  // PART 20 — TOO LATE
  {part:20,t:"PART 20 — TOO LATE",col:'#d4a017'},
  {t:"[SCENE 1 — NAME WEIGHT]\nA name changes the air.\n\nTora Oni.\n\nNow the camp can say it.\nWhich means the wound can deepen properly.\n\nChug stands amid broken stones and repeats it once under his breath.\n\nCHUG:\n...Tora Oni.\n\nYassine sits with his back to a cracked pillar.\nBoth blades across his knees.\n\nYASSINE:\nWhen you said it, something twisted in my chest.\n\nCHUG:\nSame.\n\nYASSINE:\nGood.\nI'd hate to be the only one miserable."},
  {t:"[SCENE 2 — THE STORY STARTS]\nNo training that morning.\nNo jokes from Raevan.\nNo cold correction from Sorya.\nEven Kaizen is quieter.\n\nGuide speaks first.\n\nGUIDE:\nHe was not forgotten in the way Yassine was.\n\nCHUG:\nI know.\n\nGUIDE:\nNo.\nYou know the shape.\nNot the cut.\n\nYASSINE:\nThen say it.\n\nGUIDE:\nHe left to become stronger.\nLong before this place reached you.\nLong before control took root in others.\nHe believed distance would refine him.\n\nRAEVAN:\nIt did.\n\nSORYA:\nDistance always sharpens something.\nUsually loneliness."},
  {t:"[SCENE 3 — TORA'S TRAGEDY]\nGuide continues.\n\nGUIDE:\nTora Oni trained where no one could follow.\nHe gave up noise.\nComfort.\nFriends.\nRecognition.\nHe told himself he would return complete.\n\nCHUG stares at the ground.\n\nGUIDE:\nWhen he came back, the circle had already changed.\nPeople had moved.\nRanks had shifted.\nPriorities had changed.\nHe stood at the door of what he had protected in his mind...\nand found it already living without him.\n\nYASSINE:\n...So he chose isolation.\nAnd came back to replacement.\n\nGUIDE:\nYes.\n\nCHUG:\nI didn't know.\n\nGUIDE:\nNo.\nYou were busy becoming something else."},
  {t:"[SCENE 4 — CHUG TAKES IT BADLY]\nChug turns away.\n\nCHUG:\nSay it straight.\n\nGUIDE:\nYou failed him too.\n\nThat lands.\nHard.\n\nRAEVAN does not interrupt.\nSorya does not soften it.\nKaizen does not rescue him from it.\n\nCHUG:\n...How much of that is true?\n\nGUIDE:\nEnough."},
  {t:"[SCENE 5 — YASSINE'S DIFFERENT PAIN]\nYassine runs a thumb down one blade edge.\n\nYASSINE:\nHe remembers everything.\nI remember nothing.\n\nGUIDE:\nAnd both of you still bleed.\n\nYASSINE:\nThat's a terrible lesson.\n\nGUIDE:\nReality rarely hires better teachers."},
  {t:"[SCENE 6 — PLAYABLE PARTNERSHIP]\nRaevan finally breaks the silence.\n\nRAEVAN:\nTalk later.\nFight now.\n\nCHUG:\nYou always do that.\n\nRAEVAN:\nAnd you're still here to complain.\n\nHe plants six markers in the camp ruins.\n\nRAEVAN:\nFrom this point on, you do not train alone.\n\nYASSINE looks up.\n\nRAEVAN:\nBoth of you are now a pair in combat drills.\n\nYASSINE:\nSo we're official now.\n\nCHUG:\nDon't make it weird.\n\nYASSINE:\nYou make everything weird."},
  {t:"[SCENE 7 — DUO TRAINING]\nNew drill.\nOne attacks.\nOne covers.\nThen switch every breath count.\n\nRAEVAN:\nSynchronization is not friendship.\nIt is survival shaped into rhythm.\n\nCHUG and YASSINE move.\n\nChug opens high.\nYassine rotates underneath.\nYassine traps.\nChug strikes through.\n\nRAEVAN:\nAgain.\n\nAgain.\n\nAgain.\n\nThis time with thrown blades added.\n\nSORYA folds pressure seams across the ground to distort footing.\n\nKAIZEN forces Chug to half-open Rage without losing sight.\n\nThe drill becomes a battle."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 8 — RANDOM CHALLENGER INTERRUPTION]\nBecause the world has started learning their timing, three challengers rush mid-drill.\n\nRAEVAN:\nDo not stop.\n\nCHUG:\nYou've got to be—\n\nYASSINE:\nMove!\n\nThey fight the challengers inside the training pattern.\n\nFirst falls to a Chug feint into Yassine's cross-cut.\nSecond falls to a pressure slip created by Sorya and punished by both.\nThird almost escapes until Chug uses a short javelin to pin his sleeve to stone and Yassine disarms him clean.\n\nYASSINE:\n...That felt good.\n\nRAEVAN:\nGood.\nFeeling good is irrelevant.\nRepeatability matters."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 9 — TORA'S ECHO]\nAfter the challengers are dealt with, Chug notices one carried a split-horn insignia carved under the armor strap.\n\nCHUG:\nHe sent them.\n\nGUIDE:\nMaybe.\n\nCHUG:\nStop saying maybe when you mean yes.\n\nGUIDE:\nThen yes."},
  {t:"[SCENE 10 — TORA AND YASSINE LINK]\nThat evening, Yassine asks the question nobody else wants to.\n\nYASSINE:\nWas I close to him?\n\nChug doesn't answer immediately.\n\nCHUG:\n...Yes.\n\nYASSINE:\nCloser than you?\n\nCHUG:\nNo.\nDifferently.\n\nYASSINE:\nThat sounds like a lie designed to protect me.\n\nCHUG:\nIt sounds like I don't know how to say it right.\n\nYASSINE looks into the fire.\n\nYASSINE:\nThen say it badly.\n\nCHUG:\nYou were someone he still looked at with softness.\nEven angry.\nEven now.\n\nYassine absorbs that quietly."},
  {t:"[SCENE 11 — FIRST CONTROLLED FIELD ENEMY]\nSorya's warning becomes real sooner than expected.\n\nA lone challenger enters the perimeter wrapped in black paper seals.\nHe doesn't speak.\nHe simply opens both palms.\n\nThe ground around him dims.\nSound shortens.\nFire lowers.\n\nSORYA:\nField fragment.\n\nCHUG:\nAlready?\n\nSORYA:\nAlready."},
  {t:"[SCENE 12 — FIELD BATTLE]\nThe fragment isn't full authority.\nBut it is enough to slow movement and bend distance badly.\n\nYASSINE:\nHe's farther away when I step forward.\n\nSORYA:\nBecause the space prefers him.\nBreak preference.\n\nCHUG:\nHow?\n\nSORYA:\nInterrupt the center of his confidence.\n\nThey work together.\nChug forces frontal pressure.\nYassine circles where the fragment is thinnest.\nSorya opens one seam.\n\nYASSINE dives through it and cuts the seals from the challenger's wrists.\n\nThe fragment collapses instantly.\n\nGUIDE:\nGood.\nRemember that."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 13 — MESSAGE FROM TORA]\nUnder the torn seal papers, a scrap of cloth is pinned to the challenger's chest.\n\nChug unfolds it.\n\nIt reads:\n\nIF YOU CAN'T PROTECT A CAMP\nDON'T TALK TO ME ABOUT SAVING PEOPLE\n\nNo signature needed.\n\nCHUG crushes the note in his fist.\n\nYASSINE:\nHe wants you angry.\n\nKAIZEN:\nThen become precise instead."},
  {t:"[SCENE 14 — PARTIAL RESOLUTION]\nBy the end of the cycle, camp stands stronger than before.\nNot safe.\nNot healed.\nBut stronger.\n\nYassine is now fully active in drills, patrols, and live encounters.\nHe is playable in truth, not just potential.\n\nSorya's circles mark the ground.\nRaevan's targets fill the walls.\nKaizen's Rage threshold burns quietly in Chug's chest.\n\nAnd somewhere beyond their reach, Tora Oni waits with all his remembered pain intact."},
  {t:"[SCENE 15 — LAST DIALOGUE]\nLate.\nOnly Chug and Guide remain awake.\n\nCHUG:\nCan I save him?\n\nLong pause.\n\nGUIDE:\nNot as you are.\n\nCHUG:\nThen I'll become something else.\n\nGUIDE:\nCareful.\nThat sentence has ruined better men than you.\n\nCHUG looks toward the dark where Tora vanished the night before.\n\nCHUG:\nToo late once.\nNot twice.\n\nSYSTEM:\n\"ALLY YASSINE — FULL PLAYABLE STATUS CONFIRMED\"\n\nSYSTEM:\n\"THREAT PROFILE UPDATED: TORA ONI — ACTIVE\""},

  {t:'[BOSS GATE — Drako No.11 Varkul]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for TOO LATE.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.11 VARKUL',fight:10},
  {t:"— END OF PART 20 —",end:true},
  // PART 21 — ASH CAMP
  {part:21,t:"PART 21 — ASH CAMP",col:'#d4a017'},
  {t:"[SCENE 1 — WHAT SURVIVED]\nCamp wakes around the table instead of the fire.\nThat is how Chug knows the place changed.\nHarjeev arrives with crates,\nledgers,\nand the kind of patience that only exists in people who have survived fools for years.\nHARJEEV:\n\"Heroism doesn't keep a camp alive. Counting does.\"\nHe inventories bandages,\nwater salts,\nrope,\nwire,\nand every weapon the camp thinks it still owns.\nHe marks zones.\nMED.\nTOOLS.\nWATCH.\nRATIONS.\nSPARE STEEL.\nYassine watches him and says,\n\"I like him.\"\nChug answers,\n\"You say that about every rude person.\"\nHarjeev replies without looking up,\n\"Good. That means your standards are survivable.\""},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 2 — CAMP LEARNS TO BREATHE]\nRaevan restarts training immediately.\nSorya hardens the perimeter.\nKaizen keeps Chug at the edge of Rage.\nYassine begins patrol work even with memory gaps,\nmoving like someone whose body still remembers duty.\nDuring the first true patrol,\nChug and Yassine find a Nexter signature on the ridge:\nthree spikes,\nblack-blue thread,\nand a mocking voice calling the camp cute from up high.\nGuide identifies it as a Nexter scouting lane.\nBack in camp,\nHarjeev says,\n\"The camp has been seen. Good. Then now it learns to survive being watched.\""},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 3 — THE RELAY STONE]\nThat night Harjeev opens an old stone relay ledger.\nInside are names.\nSOLO.\nADDY.\nREE.\nLEGEND O.O.\nNEONKD.\nFRIEND.\nThe room changes around those names.\nNot hope.\nDirection.\nChug says,\n\"They're alive.\"\nHarjeev answers,\n\"Then build a camp worth bringing them back to.\""},
  {t:"SYSTEM: FIGHT",fight:12},

  {t:'[EXPANDED ENCOUNTER — ASH CAMP]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:"— END OF PART 21 —",end:true},
  // PART 22 — ZEPH
  {part:22,t:"PART 22 — ZEPH",col:'#d4a017'},
  {t:"[SCENE 1 — THE THIEF IN THE AIR]\nMorning training is cut short when a javelin disappears off Chug's back and starts spinning in the air over camp.\nA lean figure balances on the north watchpost beam,\ngrinning like gravity was built for him.\nZEPH:\n\"You people leave your tools everywhere.\"\nHe names himself.\nNexter No.6.\nZeph.\nHe steals rations,\nsteals angles,\nand keeps insulting everyone while never letting himself get touched.\nRaevan identifies him as speed doctrine.\nKnight arrives in the middle of the encounter,\nreading Zeph instantly and correcting Chug's pursuit instincts.\nKNIGHT:\n\"You're chasing his body. Wrong target.\"\nWith Knight's help,\nChug,\nYassine,\nand the camp nearly box Zeph in.\nNearly.\nZeph escapes,\nbut leaves coordinates burned into treated cloth.\nGLASS HOLLOW.\nCOME FAST OR LOSE HER AGAIN.\nThe name attached is Addy."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 2 — DECISION]\nKnight spreads the route on the table and calls it a trap.\nChug calls it a lead.\nBoth are true.\nSorya confirms the canyon will favor range users and hostile reflections.\nKnight gives Chug a compact throwing frame for discipline.\nHe gives Yassine a sheath rig to fix his second-cut overcommit.\nGuide's last warning before departure is simple.\n\"Glass breaks both ways.\""},
  {t:"SYSTEM: FIGHT",fight:12},

  {t:'[BOSS GATE — Nexter No.7 Lynex]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for ZEPH.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.7 LYNEX',fight:11},
  {t:'[EXPANDED ENCOUNTER — ZEPH]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:17},
  {t:"— END OF PART 22 —",end:true},
  // PART 23 — GLASS HOLLOW
  {part:23,t:"PART 23 — GLASS HOLLOW",col:'#d4a017'},
  {t:"[SCENE 1 — THE CANYON OF LIES]\nGlass Hollow is a canyon built to lie.\nReflections show false bodies.\nSound doubles in the wrong direction.\nAt the center,\nAddy is suspended in a glass-chain lattice,\nwrapped in control thread,\nbow across her knees,\nvoice overwritten by an adjudicator protocol.\nThe fight is territorial,\nnot emotional.\nKnight calls lanes.\nSorya opens narrow seams.\nChug and Yassine fight for real ground while Addy's arrows reshape the room against them.\nYassine cuts the first control thread and hears Addy's real voice break through for only a second.\nThen the overwrite slams back."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 2 — RESCUE AND AMBUSH]\nSorya tears the field preference open for three seconds.\nChug rushes through the center.\nYassine enters low.\nKnight cuts the rear anchor.\nThe lattice collapses.\nAddy wakes under ice and says,\n\"...Chug?\"\nBefore they can stabilize her,\nZeph appears on the ridge,\nthrowing black-blue spikes into the rescue and turning the whole canyon into an ambush.\nAddy,\nhalf free and barely conscious,\nstill saves Chug from a razor-thread kill line with a broken bow maneuver that proves who she really is.\nThey extract her wounded but alive.\nOn the way out,\nAddy remembers one name from the transfers.\nSolo."},
  {t:"SYSTEM: FIGHT",fight:1},

  {t:'[EXPANDED ENCOUNTER — GLASS HOLLOW]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:3},
  {t:'[EXPANDED ENCOUNTER — GLASS HOLLOW]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:6},
  {t:"— END OF PART 23 —",end:true},
  // PART 24 — KNIGHT'S TABLE
  {part:24,t:"PART 24 — KNIGHT'S TABLE",col:'#d4a017'},
  {t:"[SCENE 1 — WHAT THE CAMP IS NOW]\nBack in camp,\nAddy recovers under Harjeev's eye and Raevan's standards.\nKnight lays out what he knows of the Drakos and the Nexters.\nDrakos hold territory by doctrine.\nNexters prepare it,\ncut roads,\nspread panic,\nand deliver candidates for control.\nAddy explains how the control worked on her:\nfirst they studied skill,\nthen starved everything else,\nthen put another voice over her own until obedience sounded like talent.\nThe room gets colder after hearing that."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 2 — THE NEW TABLE]\nThe camp builds a real table.\nNot symbolic.\nOperational.\nHarjeev,\nKnight,\nRaevan,\nChug,\nAddy,\nand Yassine all put hands on it.\nFor the first time the camp feels less like a group of survivors and more like a structure.\nThat night,\na knife arrives in the new table with a split-horn cloth wrapped around the hilt.\nTora Oni's message is simple.\nBRIDGE OF ASH.\nCOME HONEST OR DON'T COME.\nGuide warns them to take only who matters.\nAddy wants to go.\nRaevan tells her not yet.\nKnight agrees.\nChug understands that the next meeting is not a duel.\nIt's an assessment."},
  {t:"SYSTEM: FIGHT",fight:2},

  {t:'[BOSS GATE — Drako No.10 Zeigran]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for KNIGHT\'S TABLE.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.10 ZEIGRAN',fight:13},
  {t:'[EXPANDED ENCOUNTER — KNIGHT\'S TABLE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:6},
  {t:"— END OF PART 24 —",end:true},
  // PART 25 — BRIDGE OF ASH
  {part:25,t:"PART 25 — BRIDGE OF ASH",col:'#d4a017'},
  {t:"[SCENE 1 — HONESTY]\nChug,\nYassine,\nand Knight meet Tora Oni on the Bridge of Ash.\nThis time Tora comes without a mask.\nWithout theatrics.\nHe asks for honesty and gets it.\nChug admits he failed him,\nfailed to understand what leaving and returning cost,\nand mistook momentum for survival.\nTora doesn't forgive him.\nBut he accepts the truth enough to keep talking.\nHe explains his tragedy clearly:\nhe left to become stronger,\nbelieved strength could repay absence,\nand returned to find the circle already living without him.\nThe world behind the war found that hunger before his friends did."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 2 — THE SYSTEM]\nTora reveals what Drakos actually do.\nThey do not collect armies first.\nThey collect conditions.\nLoneliness.\nFailure.\nNeed.\nGuilt.\nDisplacement.\nAnything that makes a person willing to become function instead of self.\nHe confirms Solo is alive,\nnow moving through Nexter lanes under Riven's handling.\nZeph interrupts the meeting,\ncuts the bridge supports,\nand forces a brief joint survival fight.\nDuring the clash,\nChug and Yassine finally wound Tora for real,\nproving growth.\nTora admits that is why he called them there.\nNot for revenge.\nTo test whether building Chug into something larger than one rescuer was still worth the risk.\nBefore leaving,\nTora gives Chug a ring from his old cord and tells him to leave a place in camp for someone who may come back wrong.\nBack at camp,\nthat becomes a doctrine.\nEvery rescued ally must return to a role,\na place,\na structure.\nNo one gets saved into emptiness anymore."},
  {t:"SYSTEM: FIGHT",fight:3},

  {t:'[EXPANDED ENCOUNTER — BRIDGE OF ASH]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:8},
  {t:'[EXPANDED ENCOUNTER — BRIDGE OF ASH]\\nAMBUSH WAVE. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:10},
  {t:"— END OF PART 25 —",end:true},
  // PART 26 — THE RETURN OF TWELVE
  {part:26,t:"PART 26 — THE RETURN OF TWELVE",col:'#d4a017'},
  {t:"[SCENE 1 — TABLE WITH A MISSING SEAT]\n\nThe camp wakes around the table now.\n\nNot around the fire.\n\nThat is how everyone knows it changed.\n\nThe table has marks.\nPositions.\nRoutes.\nRecovery slots.\nAn empty place where Tora's ring sits.\n\nHarjeev hates dust on it.\nSo he keeps wiping the same corner every morning as if preparing for someone who refuses to arrive.\n\nChug watches that once.\n\nHARJEEV:\nDon't romanticize furniture.\nIt gets weak men killed.\n\nCHUG:\nYou polish it like it matters.\n\nHARJEEV:\nIt does.\nA seat means expectation.\nExpectation means structure.\nStructure means the living stop behaving like weather.\n\nYassine sits on the edge of the table.\nTwin blades across his thighs.\nAddy is near the far wall with a new bowstring between her fingers.\nKnight studies the route board.\nRaevan adjusts target placements.\nKaizen watches Chug breathing more than Chug likes.\nSorya writes new warning circles into the dirt and erases them a moment later.\n\nThe camp feels less like refuge now.\n\nMore like a machine someone is still teaching not to break.\n\nGUIDE:\nGood.\nLet it feel that way.\n\nCHUG:\nYou sound pleased.\n\nGUIDE:\nYou finally stopped mistaking loneliness for leadership.\n\nKnight glances toward the empty air.\nHe says nothing.\nThat means he heard it.\n\nHe hears more than he admits."},
  {t:"[SCENE 2 — ADDY'S REHAB BECOMES RANGE]\n\nAddy draws the new bow.\n\nNot the old one from Glass Hollow.\nThis one is camp-made.\nRaevan's frame.\nHarjeev's string stock.\nAddy's hands.\n\nShe draws once.\nHolds.\nReleases.\n\nThe arrow drives into the center ring with a sound too clean for camp-built gear.\n\nYASSINE:\nThat is disgusting.\n\nADDY:\nThank you.\n\nRAEVAN:\nAgain.\n\nShe fires again.\nThis time while stepping.\nThen while turning.\nThen from one knee.\n\nEvery shot lands somewhere that would have ended a man.\n\nCHUG:\nYou said she wasn't ready.\n\nRAEVAN:\nI said she wasn't ready then.\n\nADDY lowers the bow.\n\nADDY:\nI'm not steady all the time.\n\nSORYA:\nNo one is.\n\nADDY:\nThat's not what I meant.\n\nHer fingers flex.\nJust once.\nAs if remembering chains.\n\nKnight notices before anyone else.\n\nKNIGHT:\nThen we measure what breaks you.\nAnd stop pretending surprise when it arrives.\n\nAddy looks at him.\nFlat.\nAlmost offended.\n\nADDY:\nYou're the kind of person who tells the truth like it's a weapon.\n\nKNIGHT:\nBetter than using lies as blankets.\n\nHarjeev mutters without looking up.\n\nHARJEEV:\nTwo of them now.\nGreat.\n\nCHUG almost smiles.\n\nAlmost."},
  {t:"[SCENE 3 — RAGE ONE, PROPER]\n\nKaizen drags a chalk line through the yard and makes Chug stand inside it.\n\nKAIZEN:\nOpen the door.\n\nChug breathes.\nSlow.\nMeasured.\n\nThe red edge comes easier now.\nNot because he is stronger.\nBecause he is less eager.\n\nKAIZEN:\nThere.\n\nA red after-glow forms along his shoulders.\nNot wild.\nNot devouring.\nControlled enough to hold shape.\n\nYassine watches carefully.\n\nYASSINE:\nThat's different.\n\nKAIZEN:\nYes.\n\nCHUG:\nFeels different.\n\nKAIZEN:\nGood.\nIf Rage feels comfortable, you're already dead.\n\nChug steps.\n\nFaster.\n\nNot a blur yet.\nNot myth.\nBut enough to force the eye to catch up.\n\nRAEVAN throws three wooden discs from different angles.\nChug hits two.\nMisses one.\n\nKAIZEN:\nGreed.\nAgain.\n\nChug repeats the sequence.\nThis time he lets one disc pass and kills the harder angle first.\n\nKAIZEN:\nBetter.\n\nCHUG:\nI could've hit all three.\n\nKAIZEN:\nAnd there is the disease again.\n\nYASSINE:\nHe really hates confidence.\n\nKAIZEN:\nI hate unearned versions of it.\n\nGUIDE:\nSame.\n\nThat makes Chug exhale once through the nose.\n\nHe doesn't argue.\n\nWhich means the lesson stayed."},
  {t:"[SCENE 4 — THE CHALLENGE SENT IN STEEL]\n\nAt midday, a spear lands in camp.\n\nNot thrown like a warning.\n\nPlanted like a fact.\n\nIt drives through the center of the yard and quivers there, humming with impact weight.\n\nEveryone turns at once.\n\nThe shaft is black.\nThe tip heavy and broad.\nThe grip wrapped in red-burnt cloth.\n\nArowh's make.\n\nChug knows it before Raevan says the name.\n\nRAEVAN:\nTwelve.\n\nYassine rises from the table.\nAddy lowers the bow.\nKnight is already walking toward the spear.\n\nA strip of metal is tied beneath the head.\n\nHarjeev cuts it loose and reads.\n\nHARJEEV:\nStonefall Basin.\nSunless hour.\nOne answer owed.\n\nNo signature.\n\nDoesn't need one.\n\nChug takes the strip from his hand.\n\nCHUG:\nArowh.\n\nADDY:\nGood.\nI hated him before I met him.\n\nYASSINE:\nSame.\n\nKnight studies the spear shaft.\nHis thumb runs over shallow grooves in the metal.\n\nKNIGHT:\nHe wants open ground.\nNo walls.\nNo mirrors.\nNo camp advantage.\n\nSORYA:\nHe also wants witnesses.\n\nKAIZEN:\nGood.\nLet him have them.\n\nChug looks up.\n\nCHUG:\nI'm going.\n\nNo one stops him.\n\nThat is new too.\n\nHARJEEV:\nOf course you are.\n\nHe points the pen at Chug.\n\nHARJEEV:\nThis time you do not go to prove something to yourself.\nYou go to remove a threat from the board.\nDifferent reason.\nDifferent result.\n\nCHUG:\nYeah.\n\nHARJEEV:\nSay it like you mean it.\n\nCHUG:\nI'm not going to survive him.\nI'm going to end him.\n\nSilence.\n\nThen Knight nods once.\n\nKNIGHT:\nBetter.\n\nThat one word matters more than praise should."},
  {t:"[SCENE 5 — WHO GOES]\n\nThe table is used immediately.\n\nKnight marks Stonefall Basin with charcoal.\n\nKNIGHT:\nTerrain?\n\nHARJEEV flips a page in the relay journal.\n\nHARJEEV:\nCollapsed quarry.\nTiered stone.\nLow visibility at the basin floor.\nLoose gravel.\nThree high ridges.\nNo reliable cover that stays cover after impact.\n\nRAEVAN:\nGood ground for him.\nBad ground for anyone with fear of being crushed.\n\nYASSINE:\nSo Chug should feel right at home.\n\nCHUG:\nVery funny.\n\nADDY:\nIt was.\n\nSorya draws lines around the route.\n\nSORYA:\nI can create one pressure seam there.\nMaybe two.\nNo more.\nThe ground is too broken.\n\nKnight puts down three markers.\n\nKNIGHT:\nChug.\nYassine.\nMe.\n\nChug looks at Addy.\n\nAddy is already irritated.\n\nADDY:\nDon't.\n\nCHUG:\nYou should stay.\n\nADDY:\nI hate how correct that is.\n\nRAEVAN:\nYou're not stable enough for a high-impact arena.\n\nADDY:\nI can shoot.\n\nKNIGHT:\nYes.\nAnd if the control residue spikes under pressure, you lose one hand at the wrong second and somebody dies for it.\n\nNo softness.\nNo apology.\n\nAddy goes very still.\n\nThen nods.\n\nBarely.\n\nADDY:\nThen bring him back broken.\n\nCHUG:\nI plan to."},
  {t:"[SCENE 6 — BEFORE THE BASIN]\n\nThe march out is quiet.\n\nKnight walks point.\nYassine left flank.\nChug center.\n\nNo speeches.\nNo last-minute philosophy.\n\nThen, halfway through the ruined cut-road, Yassine speaks.\n\nYASSINE:\nYou know what's weird?\n\nKNIGHT:\nMany things.\nSelect one.\n\nYASSINE:\nI remember being scared of Arowh.\nBut not because of me.\n\nChug looks at him.\n\nYASSINE:\nIt's like I remember you getting crushed.\nFrom inside my own ribs.\n\nChug says nothing for a long moment.\n\nCHUG:\nThen remember the next part too.\n\nYASSINE:\nWhich part?\n\nCHUG:\nThe one where I put him down.\n\nThat earns the smallest side-look from Knight.\n\nNot approval.\n\nAssessment.\n\nStill better than indifference.\n\nKNIGHT:\nKeep that sentence.\nLose the performance.\n\nCHUG:\nYou really don't stop, huh?\n\nKNIGHT:\nSomeone has to survive your confidence."},
  {t:"[SCENE 7 — STONEFALL BASIN]\n\nThe basin is worse than Harjeev described.\n\nThree levels of black stone.\nBroken pillars buried halfway in gravel.\nHuge slabs fallen like the ribs of a dead fortress.\nNo sound but loose rock and wind.\n\nAt the center stands Arowh.\n\nDrako No.12.\n\nSame heavy frame.\nSame terrible stillness.\nSame certainty that he belongs anywhere he stands.\n\nThe difference this time is Chug.\n\nArowh looks at him once.\nThen at Yassine.\nThen at Knight.\n\nAROWH:\nYou brought support.\n\nCHUG:\nI brought an ending.\n\nArowh's expression does not change.\n\nAROWH:\nGood.\nThen this may almost become a fight.\n\nThe old humiliation tries to return inside Chug's chest.\n\nHe does not let it.\n\nKAIZEN's voice echoes in memory:\nIf Rage feels like revenge, shut the door.\n\nChug breathes once.\n\nSteady.\n\nNo panic.\n\nNo borrowed myth.\n\nJust purpose."},
  {t:"[SCENE 8 — FIRST EXCHANGE]\n\nArowh moves first.\n\nGood.\n\nChug wanted that.\n\nNo speeches.\nNo warning.\nJust impact.\n\nArowh's first step cracks the basin floor.\nHis first swing would have ended the old version of Chug.\n\nThe new one is gone before it lands.\n\nNot fleeing.\nPositioning.\n\nYassine cuts across the flank lane exactly as trained.\nKnight attacks the shoulder seam before Arowh can reset.\n\nArowh blocks Knight.\nTurns into Yassine.\nBut Chug is already in the blind angle Rage 1 opened for him.\n\nFrame-bolt.\nLower back.\n\nNot deep.\n\nEnough to change the line.\n\nAROWH:\n...Better.\n\nCHUG:\nI got tired of hearing that from you.\n\nAROWH:\nThen earn a harsher word.\n\nThe second swing comes.\nChug doesn't meet it.\nHe lets it destroy the pillar behind him and uses the falling debris as cover to close.\n\nElbow.\nRib.\nHook to the lower plate line.\n\nArowh absorbs all three and still catches Chug by the forearm.\n\nFor one awful second it looks the same as before.\n\nThen Yassine's blades sever the grip line across the gauntlet seam.\n\nKnight strikes the knee.\n\nArowh releases.\n\nThe pattern changed.\n\nThis is not the old fight."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 9 — WEIGHT COMMAND]\n\nArowh steps back.\n\nThe air itself thickens.\n\nThe gravel around his feet lifts half an inch and hangs.\n\nYASSINE:\nWhat is that—\n\nKNIGHT:\nWeight command.\n\nToo late to warn.\n\nArowh slams his heel down.\n\nThe whole basin answers.\n\nStone pressure crashes outward in a ring.\n\nKnight drops low.\nYassine rolls.\nChug opens Rage and outruns half of it, but the edge still clips his shoulder like a wall.\n\nThe shockwave tears a trench through the basin floor.\n\nAROWH:\nThis is why Twelve walks above the nameless.\n\nSorya's lesson flashes in Chug's head.\n\nRead the shape.\nEven oppression has edges.\n\nHe looks again.\n\nThe pressure ring wasn't equal.\n\nIt bent harder to Arowh's right.\n\nCHUG:\nYassine!\nRight seam!\n\nYassine doesn't ask why.\nHe moves.\n\nGood.\n\nThat trust is becoming something usable."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 10 — CUTTING THE WEIGHT]\n\nKnight sees it too.\n\nKNIGHT:\nAgain.\nForce him to stamp.\n\nChug fires two bolts high.\nOne low.\nNot to wound.\nTo annoy.\nTo force movement.\n\nArowh swats the high line aside.\nIgnores the low.\nSteps through.\n\nExactly what they wanted.\n\nHe stamps again.\n\nThe pressure wave blooms.\n\nThis time Yassine is already inside the weak arc.\nKnight is already on the opposite lane.\nChug breaks through Rage 1 fully clean and arrives at center before the wave settles.\n\nThree angles.\nOne beat.\n\nYassine cuts tendon line behind the ankle plate.\nKnight drives a blade into the shoulder hinge.\nChug hammers a reinforced strike into the same rib region he failed to dent months ago.\n\nArowh actually grunts.\n\nActually bleeds.\n\nDark.\n\nHeavy.\n\nReal.\n\nAROWH:\n...There.\n\nChug hears no praise in it now.\n\nOnly recognition.\n\nGood.\n\nHe hates praise.\nHe can work with recognition."},
  {t:"[SCENE 11 — AROWH FIGHTS FOR REAL]\n\nThe basin gets louder.\n\nArowh removes the damaged shoulder plate himself and lets it fall.\n\nThe stone shatters under its weight.\n\nAROWH:\nAgain.\n\nThis time he does not fight like a wall.\n\nHe fights like a man who trained under one.\n\nEvery motion compact.\nEvery strike chosen.\nEvery impact meant to disable, not impress.\n\nKnight gets clipped across the jaw.\nYassine barely slips a crushing elbow.\nChug takes a hit across the ribs and feels old pain trying to make decisions for him.\n\nHe refuses it.\n\nKAIZEN's voice again:\nPain is information. Not command.\n\nChug resets his stance.\n\nAROWH sees that.\n\nAROWH:\nYes.\nThere.\n\nHe is still teaching while trying to kill him.\n\nThat makes Chug angrier than the hits do.\n\nGood.\nAnger, not panic."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 12 — THE FINISHING PATTERN]\n\nKnight's blade snaps.\n\nYassine loses one twin blade to a stone break underfoot.\n\nThe fight narrows.\n\nIt gets honest.\n\nKnight throws the broken hilt to Chug.\n\nKnight:\nLeft side.\nThird beat.\n\nYassine:\nI see it.\n\nArowh comes in with the same crushing shoulder line that broke Chug before.\n\nThis time Chug does not resist it.\n\nHe invites it.\n\nTurns slightly.\nLets the force carry him off-center.\nUses Rage 1 not to overpower but to accelerate the rotation.\n\nYassine drops low at the exact third beat Knight called.\nOne blade across the rear tendon.\nKnight palms Arowh's jaw line up.\nChug drives the broken hilt straight into the already cracked rib seam and follows it with the frame-bolt at point blank range.\n\nThe armor bursts.\n\nThe strike goes in.\n\nArowh staggers.\n\nJust once.\n\nEnough.\n\nCHUG:\nThis is the harsher word.\n\nHe drives his elbow across the wound line and Rage 1 flares red across the basin.\n\nArowh crashes to one knee."},
  {t:"[SCENE 13 — DRAKO NO.12 FALLS]\n\nNo one moves for a second.\n\nEven the wind stops feeling brave.\n\nArowh looks up at Chug from one knee.\nBlood dark along the cracked chest seam.\nOne gauntlet half-dead.\nOne shoulder open.\n\nStill dangerous.\n\nStill huge.\n\nStill no longer above him.\n\nAROWH:\n...Good.\n\nCHUG:\nYou're done.\n\nArowh studies him.\nThen Yassine.\nThen Knight.\n\nAROWH:\nNo.\nI am surpassed.\n\nThat line is heavier.\n\nBecause Arowh means it.\n\nHe plants one fist in the earth and forces himself back to his feet anyway.\n\nChug raises the frame again.\n\nKnight doesn't stop him.\n\nYassine doesn't speak.\n\nArowh makes no attempt to counter.\n\nAROWH:\nFinish it if you need revenge.\nLeave me standing if you want progress.\n\nThe decision sits in the basin like another weapon.\n\nChug breathes.\nLooks at the wound.\nLooks at the man who broke him.\nLooks at the camp now living because that breaking happened before this answer.\n\nThen lowers the frame.\n\nCHUG:\nGo.\nAnd tell the next one this ground doesn't belong to them.\n\nFor the first time, something almost like respect moves across Arowh's face.\n\nAROWH:\nHe will not believe me.\nThat is his mistake.\n\nArowh tears the split insignia from his own belt.\nThrows it at Chug's feet.\n\nAROWH:\nDrako Twelve falls here.\n\nThen he turns and walks out of Stonefall Basin under his own weight, leaving blood and broken armor behind him.\n\nNot spared.\n\nDefeated.\n\nProperly.\n\nChug watches him go and does not shake."},
  {t:"[SCENE 14 — AFTER THE FALL]\n\nYassine sits down hard on a broken slab.\n\nYASSINE:\nOkay.\nNow that was satisfying.\n\nKnight presses a hand to the bleeding line at his jaw.\n\nKNIGHT:\nAcceptable.\n\nCHUG:\nAcceptable?\n\nKNIGHT:\nYou survived, learned, and removed a board piece.\nThat is acceptable.\n\nYASSINE:\nI think that's his version of celebration.\n\nCHUG:\nAwful version.\n\nKNIGHT:\nStill my version.\n\nChug picks up the torn Drako Twelve insignia.\n\nHeavy metal.\nNumber cut clean.\n\nTwelve.\n\nIt fits in his palm.\n\nFor a moment the old humiliation tries one last time to live in him.\n\nIt fails.\n\nGUIDE:\nGood.\n\nCHUG:\nYeah.\n\nGUIDE:\nDo not enjoy victory too long.\n\nCHUG:\nI know.\n\nGUIDE:\nNo.\nYou really don't.\n\nThat darkens the moment.\n\nJust a little.\n\nEnough to matter."},
  {t:"[SCENE 15 — END OF 26]\n\nBack at camp, Harjeev sees the insignia before he sees the blood.\n\nHARJEEV:\nWell.\n\nChug drops the metal on the table.\n\nIt rings once.\n\nADDY stands.\nForgets the arm pain.\nSmiles anyway.\n\nADDY:\nNo way.\n\nYASSINE:\nWay.\n\nRaevan picks up the insignia.\nTests the weight.\nNods once.\n\nRAEVAN:\nGood.\n\nKaizen looks at Chug.\n\nKAIZEN:\nAnd?\n\nCHUG:\nRage held.\n\nKAIZEN:\nBetter.\n\nKnight sits at the table without asking permission.\n\nKNIGHT:\nUpdate the board.\n\nHarjeev opens the ledger to a fresh page and writes with deliberate pressure.\n\nDRAKO NO.12 — AROWH\nDEFEATED\n\nThe camp goes quiet around that line.\n\nNot because they doubt it.\n\nBecause for the first time, the table has proof that training can become execution.\n\nThat changes morale more than fire ever did.\n\nSystem text burns bright once above the board.\n\nSYSTEM:\n\"DRAKO 12 STATUS: DOWN\"\n\"CAMP MORALE SHIFT: CONFIRMED\""},

  {t:'[BOSS GATE — Drako No.9 Morvain]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for THE RETURN OF TWELVE.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.9 MORVAIN',fight:14},
  {t:"— END OF PART 26 —",end:true},
  // PART 27 — WHAT TWELVE TAUGHT
  {part:27,t:"PART 27 — WHAT TWELVE TAUGHT",col:'#d4a017'},
  {t:"[SCENE 1 — VICTORY DOES NOT LOOK LIKE JOY]\n\nNo one celebrates loudly.\n\nThat surprises Chug at first.\n\nHe expected something.\nA release.\nA laugh big enough to shake old fear loose.\n\nInstead, camp becomes quieter.\n\nSharper.\n\nHarjeev reorganizes patrols.\nKnight rewrites the outer watch schedule.\nRaevan doubles movement drills.\nSorya expands warning circles.\nKaizen cuts Chug's sleep by one hour and calls it a reward.\n\nADDY:\nThese people are clinically unable to enjoy anything.\n\nYASSINE:\nYeah.\nBut they're our people, so it counts.\n\nAddy glances at him.\n\nADDY:\nYou sound like you remember them.\n\nYASSINE:\nI don't.\n\nBeat.\n\nYASSINE:\nI just know I don't want to leave.\n\nThat matters.\n\nMore than applause would."},
  {t:"[SCENE 2 — ADDY FULLER IN HAND]\n\nRaevan begins live-fire range drills with Addy at dawn.\n\nNot isolated.\nIntegrated.\n\nChug and Yassine move through shifting lanes while she covers.\n\nThe first three shots are cautious.\nBy the seventh, Addy's old discipline returns enough to stop pretending.\n\nArrow.\nAngle.\nLead step.\nRelease.\n\nEvery time Chug creates distance, Addy makes it useful.\nEvery time Yassine cuts low, she closes the high answer before it exists.\n\nRAEVAN:\nAgain.\n\nADDY:\nYou really only know one word.\n\nRAEVAN:\nAnd yet it keeps improving you.\n\nKnight watches her more than he lets on.\n\nKNIGHT:\nShe doesn't need confidence.\nShe needs trust in sequence.\n\nADDY:\nGreat.\nI'm apparently a machine now.\n\nHARJEEV:\nNo.\nMachines are easier to repair.\n\nThat almost gets a laugh out of Knight.\n\nAlmost."},
  {t:"[SCENE 3 — THE SEAT FOR TWELVE]\n\nHarjeev nails Arowh's insignia beneath the map table, not on top of it.\n\nChug notices.\n\nCHUG:\nWhy under?\n\nHARJEEV:\nBecause victories belong under the work, not instead of it.\n\nCHUG:\nYou have a phrase for everything.\n\nHARJEEV:\nNo.\nI have experience.\nPhrases are just cheaper to carry.\n\nKnight taps the table edge.\n\nKNIGHT:\nHe is right.\n\nYASSINE:\nI hate that you two happen at the same time.\n\nHARJEEV:\nGood.\nMeans the universe still enjoys balance.\n\nAddy runs a finger over the fresh ledger line.\n\nDEFEATED.\n\nShe says it quietly.\n\nADDY:\nIf Twelve fell...\nthen the rest can.\n\nNo one answers immediately.\n\nBecause everyone knows \"can\" and \"will\" are enemies in long wars."},
  {t:"[SCENE 4 — THE PRESSURE AFTER SUCCESS]\n\nGuide returns at the worst possible moment.\nWhich is always.\n\nGUIDE:\nSuccess attracts attention faster than weakness ever did.\n\nCHUG:\nI know.\n\nGUIDE:\nNo.\nYou feel tall for the first time since Arowh.\nThat is exactly when something bigger arrives.\n\nKnight looks toward the empty dark where the voice never fully comes from.\n\nKNIGHT:\nFor once, the ghost and I agree.\n\nCHUG:\nYou two agreeing makes me nervous.\n\nYASSINE:\nThat means it's probably serious.\n\nSORYA:\nIt is.\nThe field changed after Twelve fell.\n\nShe kneels beside a warning circle and touches the stone.\n\nSORYA:\nSomething heavier has begun pushing on the routes.\n\nHARJEEV:\nName?\n\nKnight answers that without hesitation.\n\nKNIGHT:\nEleven.\n\nSilence.\n\nAddy lowers the bow.\n\nYASSINE:\nAlready?\n\nKNIGHT:\nDid you think rank would grieve in order?\n\nCHUG:\nWho is Eleven?\n\nKnight places a black shard marker on the board.\n\nKNIGHT:\nVarkul.\nWeight command and route collapse.\nLess patient than Arowh.\nMeaner with terrain.\nSmarter with fear.\n\nYASSINE:\nThat sounds rude.\n\nKNIGHT:\nIt is."},
  {t:"[SCENE 5 — RANDOM ENCOUNTER, UPGRADED]\n\nThe answer comes before noon.\n\nNot Varkul himself.\n\nHis weather.\n\nThe outer watch rings twice.\nThen snaps.\n\nThree challengers break through the west stones.\nThen four more.\nThen a heavy unit with iron straps across his chest and weighted hooks at both wrists.\n\nHARJEEV:\nWest line!\nMove!\n\nThis time the camp does not scramble.\nIt arranges.\n\nKnight center-left.\nRaevan forward.\nAddy rear height.\nYassine runner lane.\nChug breaker lane.\nSorya pressure support.\nHarjeev logistics and triage.\n\nEven Kaizen moves first instead of watching.\n\nThat is structure becoming combat.\n\nThe heavy unit slams both hooks into the ground and drags them outward.\n\nThe whole western wall begins to fail.\n\nKNIGHT:\nNot random.\nCollapse crew.\n\nCHUG:\nThen break the crew.\n\nHe goes.\n\nAddy covers with two rapid shots.\nOne to the right shoulder.\nOne to the thigh.\nNot killing.\nInterrupting.\n\nYassine slips past the hook chain.\nCuts belt anchors.\nOne.\nTwo.\n\nRaevan takes the front chest lane and drives the spear butt through the heavy unit's throat.\n\nDone.\n\nThe wall still collapses.\n\nSorya flattens one pressure seam under the falling stones and forces them to slide instead of crush.\n\nHarjeev is already moving the med crate before the dust settles.\n\nHARJEEV:\nSee?\nThis is why tables matter.\n\nIt is such a energyger thing to say in a battlefield that Chug almost grins while bleeding."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 6 — WHAT ELEVEN USES]\n\nThe dead heavy unit carries a slate tag on the neck chain.\n\nKnight wipes the dust off.\n\nOne symbol.\nThree stacked lines.\nOne crushed circle.\n\nKNIGHT:\nVarkul's route mark.\n\nADDY:\nSo Eleven sends crews before he arrives.\n\nKNIGHT:\nNo.\nHe sends gravity.\nCrews are just where it lands first.\n\nYASSINE:\nYou're really committed to sounding dramatic.\n\nKNIGHT:\nI'm committed to accuracy.\nThe drama belongs to reality.\n\nGuide speaks low.\n\nGUIDE:\nArowh announced himself.\nVarkul will announce consequences.\n\nThat line settles poorly in everyone's stomach."},
  {t:"[SCENE 7 — CHUG AND KNIGHT]\n\nThat night Chug sharpens the frame bolts alone.\n\nKnight joins him without asking.\n\nFor a while they work in silence.\n\nThen Knight speaks.\n\nKNIGHT:\nYou did well with Twelve.\n\nCHUG looks up slowly.\n\nCHUG:\nThat's the nicest thing you've said.\n\nKNIGHT:\nDon't get greedy.\nYou still overvalue directness.\n\nCHUG:\nThere it is.\n\nKnight keeps working.\n\nKNIGHT:\nArowh taught you how to stop dying at the front.\nVarkul will test whether you learned how to hold ground for people behind you.\n\nChug doesn't like that sentence.\n\nWhich means it matters.\n\nCHUG:\nSo what do I need?\n\nKNIGHT:\nLess appetite for impact.\nMore appetite for formation.\n\nCHUG:\nYou make that sound easy.\n\nKNIGHT:\nNo.\nI make it sound necessary."},
  {t:"[SCENE 8 — ADDY BECOMES ACTIVE]\n\nThe next day Addy joins a live perimeter drill.\n\nNo more partial status.\n\nNo more \"stay behind the line.\"\n\nKnight gives her one order only.\n\nKNIGHT:\nShoot where structure fails, not where anger points.\n\nADDY:\nYou know, for a serious man, you say incredibly annoying things.\n\nKNIGHT:\nAnd yet you remember them.\n\nThe drill begins.\n\nMoving targets.\nBroken wall sectors.\nYassine and Chug rotating through open lanes.\n\nA challenger wave bursts from the north cut and tries to fake center pressure.\n\nAddy reads it first.\n\nADDY:\nLeft brace!\n\nArrow through the hinge line.\n\nThe entire false push collapses because the lead climber falls backward into the rest.\n\nChug looks up.\n\nADDY:\nWhat?\n\nCHUG:\nNothing.\nJust...\ngood to have you.\n\nAddy looks away too quickly.\n\nADDY:\nYeah.\nDon't make it sentimental.\n\nYASSINE:\nToo late.\nHe's built that way."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 9 — AROWH'S ECHO, GONE]\n\nLate evening.\n\nChug goes back to the edge of camp alone and looks at the west horizon.\n\nThe place where Arowh walked away is just distance now.\n\nNo pressure.\nNo echo.\nNo voice calling him weak.\n\nThat absence is strange.\n\nIt feels like a room after someone finally leaves it.\n\nGuide speaks.\n\nGUIDE:\nYou keep checking for him.\n\nCHUG:\nMaybe.\n\nGUIDE:\nWhy?\n\nCHUG:\nBecause part of me still thinks he'll come back if I relax.\n\nGUIDE:\nGood.\n\nCHUG:\nGood?\n\nGUIDE:\nFear turned useful is vigilance.\nFear turned inward is rot.\nYou're finally choosing correctly.\n\nChug lets that sit.\nDoesn't argue.\nDoesn't thank him either.\n\nSome things still don't deserve gratitude."},
  {t:"[SCENE 10 — VARKUL'S FIRST WORD]\n\nNear midnight, the whole camp feels heavier.\n\nNot attacked.\nPressed.\n\nThe bowls on the table vibrate.\nThe lantern chain drifts downward as if remembering earth too strongly.\nEven breath feels half a degree more expensive.\n\nSorya is on her feet instantly.\n\nSORYA:\nDown pressure.\n\nKnight is already at the route board.\n\nKNIGHT:\nHe is close.\n\nThen the voice arrives.\n\nNot from one place.\n\nFrom all the stone at once.\n\nVARKUL:\nTwelve fell.\nSo I came to see what stood where failure used to be.\n\nNo body.\nNo silhouette.\nOnly the voice.\n\nYassine's hand closes around the hilt.\nAddy reaches for the bow.\nHarjeev closes the ledger.\n\nCHUG:\nCome say it in person.\n\nA long pause.\n\nThen:\n\nVARKUL:\nI will.\nAnd when I do, your camp will learn the difference between surviving a fighter...\nand surviving a structure break.\n\nThe weight vanishes.\n\nThe lantern rises back to neutral.\n\nEveryone breathes out together.\n\nNo one smiles.\n\nKNIGHT:\nGood.\nNow we know.\n\nHARJEEV:\nKnow what?\n\nKNIGHT:\nHe wants the camp first.\n\nThat is worse than wanting Chug.\n\nBecause camps cannot dodge.\n\nSystem text flickers once over the outer wall.\n\nSYSTEM:\n\"THREAT ESCALATION: DRAKO 11\"\n\"ALLY ADDY — ACTIVE FIELD STATUS OPEN\""},
  {t:"SYSTEM: FIGHT",fight:6},

  {t:'[EXPANDED ENCOUNTER — WHAT TWELVE TAUGHT]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:11},
  {t:"— END OF PART 27 —",end:true},
  // PART 28 — VARKUL'S WEATHER
  {part:28,t:"PART 28 — VARKUL'S WEATHER",col:'#d4a017'},
  {t:"[SCENE 1 — PRESSURE BEFORE FOOTSTEPS]\n\nVarkul does not attack immediately.\n\nThat is how everyone knows he is worse.\n\nArowh arrived like a challenge.\nVarkul arrives like a season.\n\nThe first sign is not an enemy.\nIt is fatigue.\n\nCamp members wake heavier.\nWater feels denser.\nTraining weights bite deeper than they should.\nLoose stone slides toward the same three corners of camp every morning.\n\nHarjeev starts measuring it.\n\nOf course he does.\n\nHARJEEV:\nNorth wall pulling point increased by four finger-widths since yesterday.\nEither this world hates our architecture...\nor Eleven is leaning on us from somewhere ugly.\n\nKNIGHT:\nBoth.\n\nYASSINE:\nComforting.\n\nADDY strings the bow and checks the limb curve.\n\nADDY:\nSo what?\nHe can make gravity annoying from a distance?\n\nSORYA:\nNot annoying.\nShaping.\n\nKAIZEN:\nIf Twelve was a test of impact...\nEleven is a test of endurance.\n\nCHUG:\nThen we stop waiting.\n\nKNIGHT:\nNo.\nWe stop reacting like impatience is courage.\n\nCHUG:\nYou say that a lot.\n\nKNIGHT:\nBecause you require repetition."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 2 — HOLDING GROUND DRILL]\n\nKnight redesigns camp training in one morning.\n\nNo more free sparring lanes.\nNo more hero charges.\nNo more \"I'll take center.\"\n\nNow there are sectors.\nRoles.\nRotations.\nFallback marks cut into stone.\nArrow windows.\nPressure seams.\nTriage points.\n\nHARJEEV writes every one of them down.\n\nHARJEEV:\nIf you die outside your sector without an order, I am writing \"stupid\" on the board beside your name.\n\nYASSINE:\nThat feels disrespectful.\n\nHARJEEV:\nDying decoratively is disrespectful to logistics.\n\nKnight places Chug in the middle lane.\nNot front.\n\nCHUG:\nI should be outer line.\n\nKNIGHT:\nNo.\nOuter line is where you go to feel important.\nMiddle lane is where you become useful.\n\nAddy tries not to laugh.\nFails.\n\nCHUG:\nI really miss when people here had less insight.\n\nYASSINE:\nNo you don't."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 3 — WEATHER CREW]\n\nThe first Varkul crew hits just after noon.\n\nFive heavies.\nNot elegant.\nNot fast.\nEach carrying anchor chains wrapped around the torso.\n\nThey do not even try to kill first.\n\nThey drive hooked anchors into the camp stones and begin pulling sectors off true.\n\nThe whole north line starts sagging.\n\nKNIGHT:\nCollapse team!\n\nADDY:\nOn them!\n\nHer first arrow severs one pull line.\nYassine cuts another before it tightens.\nChug moves for the central heavy and realizes too late the floor under him now favors the enemy side.\n\nHis footing drags.\n\nOnly by inches.\n\nEnough to matter.\n\nVARKUL's weather.\n\nRAEVAN:\nRead the bias!\n\nChug adjusts.\nUses the pull instead of fighting it.\nLets his slide become momentum.\nDrives the weighted cord around the heavy's throat anchor and jerks sideways.\n\nThe big man falls under his own lean.\n\nGood.\n\nThat feels like a Varkul lesson answered correctly.\n\nYASSINE:\nNice!\n\nCHUG:\nYeah!\n\nThe third heavy slams both anchors down and a wall section tears free.\n\nHarjeev is already shouting across the dust.\n\nHARJEEV:\nField two fall back!\nMed left!\nDo not die on the grain sacks!\n\nIt is so specifically practical that it saves two lives immediately.\n\nThe camp is learning to fight as an organism.\n\nNot a crowd."},
  {t:"[SCENE 4 — ADDY'S BREAKTHROUGH]\n\nOne heavy reaches the watch post before anyone can close.\n\nAddy changes angle without waiting for command.\n\nThree arrows.\n\nOne to the wrist.\nOne to the eye slit.\nOne to the chain lock.\n\nThe man falls off the platform and takes two others with him.\n\nSilence for one second.\n\nThen Harjeev, of all people:\n\nHARJEEV:\nWrite that down too.\n\nAddy lowers the bow.\nBreathing harder than she wants anyone to see.\n\nCHUG:\nYou good?\n\nADDY:\nYeah.\nJust...\nfelt easy.\n\nGUIDE:\nResidue and decision aligned.\nGood.\n\nADDY:\nI still hate the ghost.\n\nGUIDE:\nAccepted.\n\nThat almost counts as warmth.\nAlmost."},
  {t:"[SCENE 5 — VARKUL'S STONE TONGUE]\n\nThat evening the camp floor shifts again.\n\nBut this time not randomly.\n\nWords appear in the dust beneath the table as if something heavy wrote them from underneath.\n\nHOLD.\nIF YOU CAN.\n\nYassine stares at the letters.\n\nYASSINE:\nOkay.\nI officially hate Eleven more than Twelve.\n\nKNIGHT:\nCorrect instinct.\n\nCHUG:\nHe keeps talking to the camp, not me.\n\nKNIGHT:\nYes.\nAnd you still haven't understood what that means.\n\nCHUG:\nSay it then.\n\nKNIGHT:\nHe is not here to beat you.\nHe is here to prove your structure fails without enemy bodies even entering it.\n\nThat lands.\n\nBecause it's true.\n\nBecause Chug feels insulted by it.\n\nBecause feeling insulted by a tactic means the tactic is working."},
  {t:"[SCENE 6 — ADDY AND YASSINE]\n\nLater, on the outer watch, Addy and Yassine share first guard.\n\nNo one planned that.\nKnight just allowed it.\n\nWhich usually means he planned it and wanted them to think otherwise.\n\nAddy sits with the bow across her knees.\nYassine leans against a broken column.\n\nFor a long while there is only wind.\n\nThen:\n\nADDY:\nDo you ever get flashes while moving?\n\nYASSINE:\nYeah.\n\nADDY:\nWhat kind?\n\nYASSINE:\nBad ones.\nThen useful ones.\nThen bad again.\n\nAddy nods slowly.\n\nADDY:\nSometimes I know where someone will stand before they commit to it.\nThen I remember I don't even know my own room from before all this.\n\nYASSINE:\nSame kind of problem.\nDifferent weapon.\n\nADDY:\nThink it gets better?\n\nYASSINE:\nNo idea.\n\nBeat.\n\nYASSINE:\nBut the camp feels less fake than the rest of this world.\nSo maybe that's how it starts.\n\nAddy looks toward the table fire.\n\nADDY:\nYou trust him.\n\nYASSINE:\nChug?\n\nADDY:\nYeah.\n\nYASSINE:\nYeah.\n\nADDY:\nWhy?\n\nYassine looks away.\n\nYASSINE:\nI wish I knew.\nWould make this less terrifying.\n\nThat is honest enough to matter."},
  {t:"[SCENE 7 — THE FIRST CRUSH LINE]\n\nJust before dawn, Varkul finally touches the camp directly.\n\nNot with his body.\n\nWith a crush line.\n\nThe east watch tower buckles inward without impact.\nThe ground under the ration post drops three inches.\nThe table slides across the stone by itself.\n\nEveryone wakes into motion.\n\nHARJEEV:\nEast side!\nMove!\nMove!\n\nNo chaos.\nOnly speed.\n\nAddy to roof angle.\nKnight to center command.\nRaevan and Chug to brace line.\nYassine and Kaizen to moving supports.\nSorya to the pressure seam.\n\nThe crush line pushes like invisible tide.\n\nCHUG:\nWhere is he?!\n\nKNIGHT:\nDoesn't matter!\nBreak the anchor source!\n\nSorya closes her eyes and feels the pressure trail.\n\nSORYA:\nSouth ridge!\nBuried sigil!\n\nYassine runs first.\nToo fast to ask.\nGood.\n\nChug follows.\nBetter.\n\nThey crest the ridge and find it:\na black stone plate driven into the earth with Eleven's mark burning on it.\n\nSix chained weights circle it, sinking deeper every second.\n\nYASSINE:\nKill the plate?\n\nCHUG:\nKill the weights first!\n\nThey move together.\n\nBlade.\nBolt.\nCord.\nStone.\nAgain.\n\nThe pull weakens.\n\nBack in camp the table stops sliding.\n\nHarjeev later calls that the second time the table saved morale by existing.\n\nHe is probably right."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 8 — VARKUL SEEN]\n\nAs the last weight snaps, something huge moves on the far cliff opposite them.\n\nNot close.\n\nNot reachable.\n\nJust visible enough.\n\nA silhouette like a fortress learning to walk.\n\nBroad shoulders.\nHeavy chain mantle.\nHammer head over one shoulder so large it changes the horizon line around it.\n\nVarkul.\n\nNo.11.\n\nHe does not come down.\nHe only watches the two of them break his anchor plate.\n\nThen he nods once.\n\nLike a mason checking foundation work.\n\nVARKUL:\nBetter than debris.\nNot yet structure.\n\nYassine bares a blade toward the cliff.\n\nYASSINE:\nCome down then!\n\nVARKUL:\nNo.\nNot until your walls begin to believe in themselves.\n\nHe turns.\nThe whole ridge seems to lean with him.\n\nThen he is gone."},
  {t:"[SCENE 9 — CHUG HATES THIS FIGHT]\n\nBack at camp, Chug kicks the broken anchor plate across the yard.\n\nCHUG:\nI hate him.\n\nKNIGHT:\nGood.\n\nCHUG:\nDon't say good.\n\nKNIGHT:\nWhy?\nYou should hate him.\nHe is forcing you to win without getting the satisfaction of direct violence.\n\nCHUG:\nExactly.\n\nKNIGHT:\nThen learn from the discomfort.\n\nChug almost throws the frame.\n\nDoesn't.\n\nGrowth again.\nAnnoying growth.\n\nRAEVAN:\nHe wants you emotional because emotion is easier to pull than stone.\n\nKAIZEN:\nAnd easier to stampede.\n\nHARJEEV:\nAlso harder to ration.\n\nYASSINE:\nHe really can make logistics sound spiritual.\n\nHARJEEV:\nYou're welcome."},
  {t:"[SCENE 10 — END OF 28]\n\nThat night Knight redraws the whole camp route grid.\n\nTwice.\n\nThen once more.\n\nAddy shifts to rotating high-angle watch.\nYassine gets two patrol lanes and one interior response lane.\nChug is assigned central breaker and anchor destruction.\nNot front champion.\n\nHe stares at the board.\n\nCHUG:\nI still don't like that.\n\nKNIGHT:\nI know.\nThat's why it's right.\n\nGuide speaks from the rafters somewhere above the fire.\n\nGUIDE:\nEleven is teaching the camp whether it is a shelter or a system.\n\nChug looks at the walls.\nThe table.\nThe marked sectors.\nThe people already moving inside structure instead of against it.\n\nCHUG:\nThen we answer him.\n\nSystem text burns dim and cold in the night.\n\nSYSTEM:\n\"DRAKO 11 PRESSURE ACTIVE\"\n\"CAMP ROLE INTEGRATION: IMPROVED\""},

  {t:'[BOSS GATE — Nexter No.6 Kaith]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for VARKUL\'S WEATHER.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.6 KAITH',fight:15},
  {t:"— END OF PART 28 —",end:true},
  // PART 29 — BREAKING ELEVEN
  {part:29,t:"PART 29 — BREAKING ELEVEN",col:'#d4a017'},
  {t:"[SCENE 1 — THE DAY OF STRUCTURE]\n\nVarkul comes at dawn.\n\nThis time with his body.\n\nNo hidden plate.\nNo weather crew first.\nNo voice in the stone.\n\nHe simply appears at the south ridge and starts walking.\n\nThe camp feels him before the watchers call him.\n\nEvery nail hums.\nEvery bowl trembles.\nEvery weak joint confesses itself.\n\nKnight is standing before the call fully finishes.\n\nKNIGHT:\nPositions!\n\nHarjeev doesn't shout.\nHe assigns.\n\nHARJEEV:\nMed left!\nRation clear!\nRoof line Addy!\nNorth brace Yassine!\nCenter breaker Chug!\nNo one freelances!\n\nNo one does.\n\nThat matters more than heroics would.\n\nVarkul reaches the perimeter line and stops outside it.\n\nHe is bigger than Arowh.\nNot broader in pure muscle.\nHeavier in intent.\n\nHis armor is built of linked dark plates and chain-weight discs that hang like broken moons.\nThe hammer rests against one shoulder, head as tall as Addy's torso.\n\nVARKUL:\nSo this is the camp that made Twelve kneel.\n\nCHUG:\nYou came far to lose.\n\nVARKUL:\nNo.\nI came because I heard your walls speaking before your men did.\n\nThat line goes under Chug's skin instantly.\n\nGood.\nNow he knows what the fight is again."},
  {t:"[SCENE 2 — FIRST IMPACT]\n\nVarkul doesn't rush.\n\nHe plants the hammer once.\n\nThe entire south line sinks.\n\nNot breaks.\nSinks.\n\nOne brace cracks.\nOne post folds.\nA whole warning circle tears out of alignment.\n\nSORYA:\nThere!\n\nAddy fires before the order finishes.\nArrow into the chain-disc cluster on Varkul's left side.\nIt clangs.\nDistracts.\nNot enough.\n\nRaevan drives the spear into the ground where the pressure wave should continue and splits the path.\n\nYASSINE:\nMove!\n\nChug is already moving.\n\nNot at Varkul's chest.\n\nAt the anchor chain hanging behind his right knee.\n\nFrame-bolt.\n\nThe chain snaps free from one ring.\n\nVarkul actually turns his head.\n\nVARKUL:\nGood.\nYou finally learned where weight lives.\n\nCHUG:\nShut up and fall.\n\nVARKUL:\nNot yet."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 3 — CAMP FIGHT, NOT DUEL]\n\nThis fight is ugly.\n\nNot cinematic.\nNot glorious.\n\nVarkul hits sectors, not people.\n\nHe smashes support lines.\nCollapses ladders.\nDrives pressure through the ground toward supply zones.\n\nHe is trying to prove Knight right.\n\nTrying to show that Chug is still only good at direct opposition.\n\nSo Chug stops giving him that.\n\nHe moves between roles instead.\n\nCenter to south brace.\nSouth brace to ration lane.\nRation lane to Addy's fallback.\n\nEvery time Varkul creates a break, Chug fills the gap long enough for someone else to fix it.\n\nKnight notices first.\n\nKNIGHT:\nThere.\nKeep that.\n\nAddy fires over his shoulder.\n\nADDY:\nLeft! Left!\n\nChug ducks.\nArrow passes over him and buries into the hammer grip seam.\n\nVarkul's next swing shifts half an inch off line.\n\nEnough for Yassine to cross under and cut one of the weight discs free.\n\nHARJEEV:\nWrite that one down too!\n\nEven in crisis he is still a energyger.\nMaybe that is why the camp survives."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 4 — THE HAMMER LESSON]\n\nVarkul tires of playing with the perimeter.\n\nHe steps through it.\n\nNow he is inside the camp.\n\nThat changes everything.\n\nThe walls do not matter anymore.\nOnly the structure inside people's heads.\n\nVarkul swings the hammer in a low arc.\nNot for kills.\nFor displacement.\n\nThe table shudders.\nThe med post nearly flips.\nOne whole section of marked floor gets erased.\n\nCHUG sees it and finally understands:\nEleven is trying to delete organization faster than the camp can remember it.\n\nGUIDE:\nNow.\n\nChug hears the answer before he thinks it.\n\nCHUG:\nTable first! Hold the table!\n\nIt sounds ridiculous.\nUntil everyone moves on it instantly.\n\nYassine to left support.\nHarjeev and Addy clearing the med line.\nKnight and Raevan on Varkul's weapon side.\nSorya restoring one pressure mark under the table legs.\nKaizen driving two panicked fighters back into lanes with nothing but voice.\n\nFor one second the whole camp moves as one body.\n\nVarkul sees it.\n\nVARKUL:\n...There.\n\nNot praise.\n\nRecognition again.\n\nHe hates that he keeps getting it from enemies.\n\nMaybe that's why it matters."},
  {t:"[SCENE 5 — ADDY FULLY ARRIVES]\n\nA collapse wave knocks Addy from the roofline.\n\nNot far.\nFar enough.\n\nShe lands badly and rolls, bow nearly lost.\n\nThe old control residue flashes across her face for a split second.\n\nWrong eyes.\nWrong stillness.\n\nChug sees it.\nSo does she.\n\nADDY:\nNo.\n\nShe forces the bow back up with both hands.\nBreathes once.\nTwice.\n\nThen fires four arrows in under three seconds.\n\nOne takes a chain ring.\nOne takes a hammer seam.\nOne takes the edge of Varkul's jaw guard.\nThe fourth pins a falling supply beam before it crushes Harjeev.\n\nHarjeev looks at the beam.\nThen at her.\n\nHARJEEV:\nFine.\nWrite all of those down.\n\nAddy actually laughs.\n\nShort.\nSharp.\nAlive.\n\nThat laugh means she is back enough to matter."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 6 — VARKUL BREAKS THE GROUND]\n\nEnraged or impressed—\nwith Drakos it is hard to tell—\n\nVarkul slams both hands onto the hammer shaft and drives it deep.\n\nThe whole camp floor lurches.\n\nNot metaphor.\nActual lurch.\n\nThe center line splits.\n\nThe table tilts.\n\nOne leg breaks.\n\nYassine grabs the edge first.\nChug catches the other side.\nKnight plants his blade under the slab and holds.\nHarjeev keeps the ledgers from scattering.\nSorya seals the crack with a pressure line so thin it almost breaks her nose in blood.\n\nVARKUL:\nGood.\nNow choose:\ncamp...\nor kill.\n\nThat is the question.\n\nThat is always what Eleven wanted.\n\nChug breathes.\nLooks at the table.\nLooks at the camp.\nLooks at Varkul.\n\nThen answers correctly.\n\nCHUG:\nBoth.\n\nKnight's eyes flick toward him.\nFast.\nApproving.\nGone."},
  {t:"[SCENE 7 — THE PLAN IN MOTION]\n\nKnight starts barking orders with machine precision.\n\nKNIGHT:\nAddy, left eye line!\nYassine, rear chains!\nRaevan, ground denial!\nSorya, narrow seam under hammer base!\nHarjeev, clear the center lane!\nChug—finish the anchor!\n\nThis is leadership multiplied.\nNot one man.\nA chain.\n\nGood.\n\nVarkul swings again.\nToo late.\n\nAddy's arrow drives into the slit below his left eye guard.\nNot deep.\nDistracting.\n\nYassine cuts two rear weight chains.\nRaevan's spear pins one boot line in place.\nSorya's seam thins the ground under the hammer head.\nHarjeev clears the exact space Chug needs to move through.\n\nChug opens Rage 1.\n\nClean.\n\nNo waste.\nNo blind fury.\n\nJust sharpened acceleration.\n\nHe uses the broken table leg as a stepping point,\nvaults higher than Varkul expects,\nlands on the hammer shaft,\nruns its length,\nand drives the frame-bolt straight into the exposed central chain lock at Varkul's chest.\n\nThe lock explodes.\n\nAll the hanging weight discs drop at once.\n\nVarkul staggers under his own redistributed load.\n\nFor the first time,\nthe camp is heavier for him than for them."},
  {t:"[SCENE 8 — DRAKO NO.11 FALLS]\n\nYassine's blades cross the hamstring seam.\nKnight cuts the throat guard tie.\nRaevan slams the spear butt into the wounded knee.\n\nVarkul falls.\n\nNot to one knee like Arowh.\n\nFlat.\n\nOne hand still on the hammer.\nOne shoulder buried in dust.\nArmor discs spread around him like a collapsed orbit.\n\nThe whole camp goes silent.\n\nEven the wounded stop groaning for a second.\n\nChug stands over him.\nBreathing hard.\nRage dropping cleanly.\nNo panic.\nNo shaking.\n\nVarkul looks up through blood and dust.\n\nVARKUL:\n...Structure.\n\nCHUG:\nYeah.\n\nVARKUL:\nSo Twelve was right.\n\nCHUG:\nAbout what?\n\nVARKUL:\nYou stopped trying to become the whole wall.\n\nThat line lands deeper than the victory does.\n\nBecause it is the exact lesson Knight kept beating into him.\nBecause hearing it from a defeated Drako makes it undeniable.\n\nVARKUL plants one hand under himself, trying to rise.\n\nKnight puts a blade to the throat gap.\nNot trembling.\n\nVARKUL looks at him and snorts blood.\n\nVARKUL:\nDo it then.\n\nKnight doesn't.\n\nHe looks at Chug instead.\n\nChoice again.\n\nChug hates how often growth requires choosing mercy under witnesses.\n\nThen again, maybe that is the point.\n\nCHUG:\nWalk.\nAnd tell Ten the camp stays standing.\n\nVarkul studies him for one long second.\n\nThen laughs once.\nLow.\nCracked.\nNot amused.\nJust grimly informed.\n\nVARKUL:\nHe will come for the names, not the walls.\n\nThat sentence freezes everyone harder than the fight did.\n\nThen Varkul tears his own route mark free from the armor chain and drops it at Chug's boots.\n\nVARKUL:\nEleven falls.\nRemember what that cost you.\n\nHe leaves dragging the hammer, too wounded to carry it cleanly.\n\nStill walking.\n\nStill defeated.\n\nStill dangerous enough that no one relaxes until the pressure in the ground fully lifts."},
  {t:"[SCENE 9 — WHAT IT COST]\n\nThe camp survived.\n\nNot untouched.\n\nOne watch line broken.\nOne wall gone.\nThree wounded hard.\nOne table leg shattered.\nHalf the med cloth used.\nOne bowstring snapped.\nTwo route markers lost.\nAddy's hands trembling from the residue spike.\nYassine's shoulder reopened.\nChug's ribs screaming under the bandage.\n\nHarjeev writes every cost down before anyone can romanticize the win.\n\nHARJEEV:\nGood.\nNow the victory is real.\n\nADDY:\nYou really need a different religion.\n\nHARJEEV:\nNo.\nThis one keeps inventory.\n\nKnight lifts the broken table leg Chug used to launch.\n\nKNIGHT:\nKeep this.\n\nChug takes it.\n\nCHUG:\nWhy?\n\nKNIGHT:\nBecause one day you'll forget it wasn't your power that won today.\nIt was everyone else's shape around it.\n\nThat line goes under the skin and stays there.\n\nGood."},
  {t:"[SCENE 10 — END OF 29]\n\nAt night Harjeev opens the ledger again.\n\nDRAKO NO.11 — VARKUL\nDEFEATED\n\nThe room around the fire changes when he writes it.\n\nNot celebration.\nCertainty.\n\nTwo down.\n\nNot myth anymore.\nMethod.\n\nAddy binds a new string with steady hands.\nYassine sleeps sitting up by the table because exhaustion beat pride.\nRaevan repairs sectors.\nSorya redraws lines.\nKaizen finally lets Chug rest.\nKnight marks a new empty route on the board.\n\nHarjeev notices.\n\nHARJEEV:\nTen?\n\nKNIGHT:\nSoon.\n\nChug looks at the two route marks nailed beneath the table now.\n\nTWELVE.\nELEVEN.\n\nHe feels no thrill.\n\nOnly momentum.\n\nGuide speaks once into the dark rafters.\n\nGUIDE:\nNow the war knows your camp by shape, not rumor.\n\nChug closes his eyes once.\n\nCHUG:\nGood.\n\nThen opens them.\n\nCHUG:\nLet it learn the rest.\n\nSystem text burns like iron.\n\nSYSTEM:\n\"DRAKO 11 STATUS: DOWN\"\n\"CAMP STATUS: HELD UNDER COLLAPSE\"\n\"NEXT THREAT VECTOR OPENING\""},

  {t:'[EXPANDED ENCOUNTER — BREAKING ELEVEN]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:2},
  {t:"— END OF PART 29 —",end:true},
  // PART 30 — THE NAME IN THE MED LEDGER
  {part:30,t:"PART 30 — THE NAME IN THE MED LEDGER",col:'#d4a017'},
  {t:"[SCENE 1 — TWO MARKS UNDER THE TABLE]\n\nMorning settles differently after Eleven falls.\n\nThe camp does not look stronger.\n\nIt looks used.\n\nWhich is better.\n\nUnder the map table two route marks hang now:\nTwelve.\nEleven.\n\nThe empty seat beside Tora's ring remains empty.\nNot symbolic anymore.\nPrepared.\n\nHarjeev calls the morning report without ceremony.\n\nHARJEEV:\nCloth low.\nWater fair.\nArrow stock down.\nSouth wall repair needed.\nNorth watch stable.\nThree fighters active.\nTwo limited.\nOne recovering from pretending she's indestructible.\n\nADDY:\nI was indestructible enough.\n\nHARJEEV:\nNo.\nYou were expensive.\n\nYassine snorts into his cup.\n\nKnight points at the board.\n\nKNIGHT:\nWe do not chase Ten blind.\n\nCHUG:\nWho said blind?\n\nKNIGHT:\nYou implied sprinting twice before breakfast.\n\nThat is unfortunately true.\n\nChug lets it go.\n\nGrowth again.\nAnnoying growth again."},
  {t:"[SCENE 2 — THE SECOND RELAY STONE]\n\nHarjeev brings out the last black journal.\n\nThe one he had not opened yet.\n\nThinner.\nCracked.\nBurned at the edge.\n\nHARJEEV:\nFound deeper than the first relay.\nThought it was slag.\nIt wasn't.\n\nHe opens it carefully.\n\nThe stone leaves scrape.\n\nMore names.\nLess clean.\n\nSome are gone entirely.\nSome reduced to initials and route tags.\n\nSOLO — MOVING\nNEONKD — UNKNOWN\nREE — HELD\nFRIEND — ROUTE CUT\nL.O.O. — UNREADABLE\nA.D. — RECOVERED? FALSE?\nM.R. — MED / TRANSFER / UNSTABLE\n\nThe whole table goes still.\n\nChug reads that line again.\n\nM.R.\n\nNo title.\nNo context.\nJust name, med, transfer, unstable.\n\nYassine frowns.\n\nYASSINE:\nDo we know that one?\n\nChug doesn't answer immediately.\n\nBecause the name does something strange.\nNot memory exactly.\nPressure.\nAn old rank.\nA place at the top of a circle.\n\nCHUG:\n...Yeah.\n\nADDY:\nHow yeah?\n\nCHUG:\nHigh.\nClose.\nTop of the old friend ranks.\n\nKnight looks at him carefully.\n\nKNIGHT:\nName.\n\nCHUG:\nM.R.\n\nHARJEEV taps the line.\n\nHARJEEV:\nMedical transfer.\nUnstable.\nMoved, not dead.\n\nSORYA:\nInjury?\n\nHARJEEV:\nNot specified.\nOnly route markings and one broken med code.\n\nAddy leans closer.\n\nADDY:\nWhich code?\n\nHarjeev traces the mark.\n\nHARJEEV:\nMultiple wound stabilization.\nChest or side trauma.\nPossibly internal.\nPossibly mobility-compromised at time of movement.\n\nYassine sits back slowly.\n\nYASSINE:\nSo someone's carrying him.\nOr dragging him.\n\nCHUG's jaw tightens.\n\nCHUG:\nThen we find him too.\n\nKnight does not shut it down.\nThat matters."},
  {t:"[SCENE 3 — M.R., SPOKEN OUT LOUD]\n\nThe camp has new weight now.\n\nNot a visible threat.\nA name.\n\nChug walks to the outer stones after the report and says it once under his breath.\n\nCHUG:\nM.R.\n\nGuide speaks before the echo dies.\n\nGUIDE:\nYou remember the rank before the face.\n\nCHUG:\nYeah.\n\nGUIDE:\nThat should concern you.\n\nCHUG:\nEverything concerns me.\n\nGUIDE:\nNo.\nThis one specifically.\n\nChug turns toward the empty air.\n\nCHUG:\nWhy?\n\nLong pause.\n\nGUIDE:\nBecause some names come back before they should.\n\nThat answer is useless.\nAnd not.\nWhich is Guide's favorite kind.\n\nChug hates it.\n\nGood.\nHatred keeps the line awake."},
  {t:"[SCENE 4 — CAMP REPAIR IS STORY TOO]\n\nFor the next stretch, the camp builds.\n\nNot glamorous.\nImportant.\n\nSouth wall replaced with layered stone and chain support.\nAddy's high post rebuilt with shield slats.\nMed line moved farther from the main crush axis.\nNew table leg carved from basin timber brought back from Varkul's field.\n\nYassine helps Harjeev set brace pins.\n\nBadly at first.\n\nHARJEEV:\nNo.\nIf you hammer like that, the pin remembers insult and leaves later.\n\nYASSINE:\nThat's not how metal works.\n\nHARJEEV:\nIt is in camps.\n\nADDY, from the roof:\nManager magic.\n\nHARJEEV:\nManagement is magic for people who survive paperwork.\n\nKnight and Raevan argue over lane spacing.\nSorya argues with both and wins.\nKaizen pretends not to help and somehow improves everything anyway.\n\nChug spends more time carrying, bracing, and fixing than fighting.\n\nAt first it frustrates him.\n\nThen he realizes:\nthis is also training.\n\nHolding.\nNot just hitting.\n\nCamp work is structure made visible.\n\nThat is why Tora cared.\nThat is why Varkul attacked it.\nThat is why M.R. being in a med ledger feels worse than a name on a kill board.\n\nBecause if he comes back wrong,\nthere needs to be something here able to hold him without breaking."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 5 — ADDY'S FULL STATUS]\n\nNear evening Addy joins the route drill with no restriction marker.\n\nKnight erases her recovery note and replaces it with active rotation.\n\nADDY:\nSo that's it?\nNo ceremony?\n\nHARJEEV:\nYou want a parade?\nWe're short on flags.\n\nYASSINE:\nAnd joy.\n\nADDY:\nFair.\n\nRaevan hands her a heavier bow.\n\nADDY:\nThat's not mine.\n\nRAEVAN:\nIt is now.\nDraw.\n\nShe does.\n\nThe heavier frame shivers once.\nThen obeys.\n\nRAEVAN:\nGood.\nYou're back enough to matter.\n\nAddy lowers the bow and glances away before anyone can make it emotional.\n\nCHUG:\nGood to have you active.\n\nADDY:\nYou say that like I wasn't already useful.\n\nCHUG:\nYou know what I mean.\n\nADDY:\nYeah.\n\nBeat.\n\nADDY:\nI know."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 6 — A NAME THAT CHANGES CHUG]\n\nThat night, Yassine catches Chug staring at the M.R. line in the relay stone again.\n\nYASSINE:\nYou really knew him.\n\nCHUG:\nYeah.\n\nYASSINE:\nHigher than Tora?\n\nChug takes a while.\n\nCHUG:\nDifferent.\nTora was force.\nM.R. was...\ntop rank for a reason.\n\nYASSINE:\nMeaning?\n\nCHUG:\nHe could walk into a room and make people reorganize around him without trying.\nFast.\nSharp.\nReliable.\nToo reliable maybe.\n\nYASSINE:\nYou trust him?\n\nChug doesn't answer immediately.\n\nThat is answer enough.\n\nYASSINE:\nHuh.\n\nCHUG:\nWhat?\n\nYASSINE:\nJust trying to imagine someone you trusted that much.\n\nChug almost says something easy.\n\nDoesn't.\n\nCHUG:\nYeah.\nMe too.\n\nThat honesty costs him something.\nWhich means it was the right version."},
  {t:"[SCENE 7 — THE RUMOR OF TEN]\n\nLate watch.\n\nThe west wind changes.\n\nSorya stands at the perimeter and listens to the air itself.\n\nSORYA:\nTen is moving.\n\nKNIGHT:\nHow do you know?\n\nSORYA:\nMorale pressure.\nNot gravity.\nNot route collapse.\nSomething lower and wider.\nLike dread looking for language.\n\nKnight marks a line on the board.\n\nKNIGHT:\nTen burns confidence.\nIf he comes straight, camp morale breaks before walls do.\n\nHARJEEV:\nThen we fix what can be fixed before he smells weakness.\n\nADDY:\nComforting sentence.\n\nHARJEEV:\nAccurate sentence.\n\nGuide speaks low.\n\nGUIDE:\nTen will not respect stone.\nHe will respect fractures in people.\n\nChug looks around the camp.\nAt Addy's hands.\nAt Yassine's half-memory.\nAt the empty seat.\nAt the new name in the ledger.\n\nM.R.\n\nUnstable.\n\nMoved.\n\nStill somewhere inside this war.\n\nThe pressure of that name does not weaken him.\n\nIt sharpens him.\n\nGood.\nThat is what matters."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 8 — THE FIRST MENTION TO THE WHOLE CAMP]\n\nHarjeev closes the relay journal and says it out loud so everyone hears it equally.\n\nHARJEEV:\nThere is one more name on the board now.\nM.R.\nAlive enough to transfer.\nInjured enough to note.\nUnstable enough to matter.\n\nThe camp absorbs it.\n\nAddy repeats it once.\n\nADDY:\nM.R.\n\nYassine too.\n\nYASSINE:\nM.R.\n\nKnight says nothing.\n\nBut he writes the initials on the board beside SOLO and REE.\n\nThree rescue vectors now.\n\nThree future wounds.\n\nThree reasons the camp cannot afford to stay small.\n\nCHUG looks at the board.\n\nNot at the enemies.\nAt the names.\n\nHe understands something then.\n\nDrakos and Nexters are not the whole war.\n\nThe whole war is what survives after you bring people back.\n\nThat is the bigger thing.\nThe harder thing.\n\nHe almost says it aloud.\n\nDoesn't.\n\nIt is not ready for words yet."},
  {t:"[SCENE 9 — END OF 30]\n\nBefore sleep, Chug places a new mark on the table himself.\n\nNot a trophy.\n\nNot a route tag.\n\nA simple carved line beside the empty seat.\n\nM.R.\n\nNo explanation.\nNo announcement.\n\nJust a place prepared before the person arrives.\n\nGuide's voice comes softer than usual.\n\nGUIDE:\nCareful what seats you prepare.\nSome men return changed enough to deserve none.\n\nChug doesn't look up.\n\nCHUG:\nThen we'll decide that when he gets here.\n\nGUIDE:\nWill you?\n\nChug's hand rests once on the carved initials.\n\nM.R.\n\nInjured somewhere.\nMoved somewhere.\nStill inside the game.\n\nCHUG:\nYeah.\nWe will.\n\nThe fire lowers.\nThe camp breathes.\nThe board holds.\n\nAnd somewhere beyond route lines and broken sectors and Drako marks,\na man named M.R. survives badly enough to still be written down.\n\nSystem text burns low across the table edge.\n\nSYSTEM:\n\"ALLY ADDY — FULL PLAYABLE STATUS CONFIRMED\"\n\"NEW NAME ADDED: M.R.\"\n\"NEXT DRACO VECTOR: TEN\"\n\"CAMP STRUCTURE LEVEL: REINFORCED\""},

  {t:'[BOSS GATE — Drako No.8 Kade]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for THE NAME IN THE MED LEDGER.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.8 KADE',fight:19},
  {t:"— END OF PART 30 —",end:true},
  // PART 31 — THE ROAD THAT CUTS BACK
  {part:31,t:"PART 31 — THE ROAD THAT CUTS BACK",col:'#d4a017'},
  {t:"[SCENE 1 — AFTER ELEVEN]\n\nCamp does not celebrate after Varkul.\n\nIt reorganizes.\n\nThat is worse for enemies and better for everyone else.\n\nHarjeev adds a second ledger page just for repairs.\n\nKnight redraws the patrol arcs.\n\nRaevan doubles the moving-range drills.\n\nSorya marks three more field warning lines near the east stones.\n\nKaizen says less than usual, which means he is thinking something unpleasant.\n\nChug stands at the map table looking at the names.\n\nSOLO.\n\nNEONKD.\n\nREE.\n\nFRIEND.\n\nM.R.\n\nAnd the old carved mark where he wrote M.R. by hand.\n\nThe camp is larger now, but the board is still missing too many people.\n\nYASSINE:\n\nYou're doing that thing again.\n\nCHUG:\n\nWhat thing?\n\nYASSINE:\n\nStaring like the table owes you answers.\n\nCHUG:\n\nMaybe it does.\n\nYASSINE:\n\nTables usually only owe splinters.\n\nHarjeev hears that and still keeps writing.\n\nHARJEEV:\n\nAnd order.\n\nDon't disrespect the order just because it doesn't flatter you.\n\nADDY:\n\nHe says that like he married the furniture.\n\nHARJEEV:\n\nIf I did, at least it would stay where I left it.\n\nKnight finally taps the line beside SOLO.\n\nKNIGHT:\n\nWe do Solo next.\n\nNot because he's closest.\n\nBecause Riven is using him as a moving lesson.\n\nEvery day we wait, that lesson gets harder to reverse.\n\nCHUG:\n\nThen we don't wait.\n\nKNIGHT:\n\nGood.\n\nTry saying it without sounding like a man sprinting into his own funeral.\n\nCHUG:\n\nYou're impossible.\n\nKNIGHT:\n\nI'm useful.\n\nConfusion between the two is common.\n\nThat almost earns a smile from Addy.\n\nAlmost."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 2 — THE ROUTE OF FOUR]\n\nHarjeev produces another relay fragment.\n\nThin slate.\n\nOne edge burned.\n\nTwo marks on it.\n\nA speed lane symbol and a recovery arrow.\n\nHARJEEV:\n\nRiven's route bends through Cinder Span.\n\nNarrow bridge fields.\n\nFast cut-roads.\n\nBad footing.\n\nPerfect for a Nexter who likes turning distance into humiliation.\n\nYASSINE:\n\nSo we're walking into a runner's joke.\n\nKNIGHT:\n\nYes.\n\nDo not become the punchline.\n\nSORYA:\n\nIf Riven built the approach honestly, there will be false paths.\n\nIf he built it well, the false paths will look kinder.\n\nRAEVAN:\n\nAnd if he built it like a Nexter, he will attack boredom before he attacks guard.\n\nCHUG:\n\nMeaning?\n\nKNIGHT:\n\nMeaning the first hit happens when you start believing nothing is happening.\n\nHarjeev places fresh supplies on the table.\n\nBolt racks.\n\nWater salts.\n\nWrapped med packs.\n\nA compact brace rig.\n\nHARJEEV:\n\nTake this for Chug's side.\n\nAnd this for Yassine's shoulder.\n\nAnd if either of you come back pretending those old wounds are small, I will record you as livestock.\n\nYASSINE:\n\nYou know, I thought getting rescued would mean more tenderness.\n\nHARJEEV:\n\nAnd I thought surviving amnesia would make you quieter.\n\nWe're both disappointed."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 3 — THE STRANGER ON THE RIDGE]\n\nThey leave by second shadow.\n\nChug, Yassine, Knight.\n\nAddy wanted to come.\n\nKnight refused.\n\nAddy argued.\n\nRaevan supported Knight.\n\nAddy argued more.\n\nHarjeev ended it by handing her roof-watch command and calling it a promotion she had not earned yet.\n\nThat made her angrier than refusal.\n\nThe road to Cinder Span is all broken rails and black grass.\n\nWind whistles through hollow pipes under the old stone.\n\nBy the third rise, Yassine is muttering to himself just to break the silence.\n\nThen a coin hits Chug in the forehead.\n\nNot hard.\n\nAnnoyingly accurate.\n\nCHUG:\n\nOw— what the hell?\n\nA man sits on the ridge above them.\n\nLong coat dusty at the hem.\n\nHat tipped back.\n\nHair loose.\n\nSmile much too easy for a road like this.\n\nHe flicks a second metal disk between his fingers like the whole world is a stage built for his wrists.\n\nUNKNOWN:\n\nThere.\n\nNow I know which one has the thick skull.\n\nYASSINE:\n\nI like him less than Zeph already.\n\nKnight's blade is out before the stranger lands.\n\nUNKNOWN:\n\nRelax, commander face.\n\nIf I wanted you dead, I'd have picked a better joke.\n\nHe hops down lightly.\n\nToo lightly for a man carrying that many metal discs on his belt.\n\nThere is something theatrical about him, but not fake.\n\nEverything he does is balanced on the edge between mockery and precision.\n\nUNKNOWN:\n\nName's Kais.\n\nCHUG:\n\nWho asked?\n\nKAIS:\n\nNo one.\n\nThat's why I introduced myself like a civilized menace.\n\nYASSINE:\n\nHe's insane.\n\nKAIS:\n\nNot enough to be boring.\n\nWho are you three?\n\nKNIGHT:\n\nNo.\n\nKAIS:\n\nWonderful.\n\nA secretive one.\n\nA serious one.\n\nAnd—\n\nhe points at Yassine—\n\nyou move like half your memory went somewhere useful and forgot to send a letter.\n\nYASSINE:\n\nThat is aggressively specific.\n\nKAIS:\n\nI try.\n\nCHUG:\n\nWe're busy.\n\nKAIS:\n\nSo am I.\n\nThat's why I found you.\n\nThe road ahead is full of speed traps,\n\nfalse dust,\n\nand one extremely irritating Nexter who thinks style counts as strategy.\n\nI wanted to see if the people chasing him were worth walking beside.\n\nKNIGHT:\n\nAnd if we aren't?\n\nKAIS:\n\nThen I leave.\n\nTell a cruel story about you to someone prettier.\n\nAnd keep moving."},
  {t:"[SCENE 4 — KAIS PROVES HE ISN'T TALK]\n\nKnight does not trust him.\n\nGood.\n\nChug doesn't either.\n\nBetter.\n\nBut the road decides before they do.\n\nA line of black wire snaps up from the gravel.\n\nFast enough to catch ankles and cut tendons if you don't see the shine.\n\nKais does.\n\nBefore the wire finishes rising, he snaps two discs from his fingers.\n\nThey spin like flat silver teeth.\n\nOne clips the left anchor.\n\nThe other hums across the right with such clean angle that the whole trap collapses inward instead of up.\n\nThe dust falls.\n\nThe road lives.\n\nYASSINE:\n\n...Okay.\n\nCHUG:\n\nYeah.\n\nKAIS bows slightly.\n\nToo dramatic.\n\nStill deserved.\n\nKAIS:\n\nThank you.\n\nI practice being impressive because the world keeps rewarding competence too slowly.\n\nKNIGHT watches the discs roll back to Kais's boots and stop there like trained animals.\n\nKNIGHT:\n\nWeapon?\n\nKAIS:\n\nTechnique.\n\nWeapons are what frightened people call it first.\n\nHe stoops.\n\nPicks up the discs.\n\nSlides them back into the bandolier.\n\nEvery motion loose.\n\nEvery placement exact.\n\nKNIGHT:\n\nWhy help us?\n\nKAIS:\n\nBecause the road ahead cut two people I dislike and three I never met.\n\nAnd because Riven's men took my hat once.\n\nThat is not the kind of insult I forgive.\n\nYASSINE laughs before he can stop himself.\n\nYASSINE:\n\nYou fought a Nexter over a hat?\n\nKAIS:\n\nNo.\n\nI fought him over disrespect.\n\nThe hat was just evidence.\n\nThat line feels ridiculous.\n\nAnd somehow solid."},
  {t:"[SCENE 5 — THE FIRST LANE FIGHT]\n\nRiven's runners arrive at dusk.\n\nNot Riven.\n\nNever the first cut.\n\nOnly the edges.\n\nThree of them.\n\nFast.\n\nLight.\n\nWrist-blade types.\n\nThey strike without war cries.\n\nWithout threats.\n\nWithout anything except speed.\n\nKnight takes center immediately.\n\nKNIGHT:\n\nNo chase.\n\nForce the lane.\n\nChug actually obeys.\n\nThat matters.\n\nHe pins the first runner's exit with the frame.\n\nYassine rotates wide.\n\nKais throws one spinning disk low across gravel and clips the second runner's heel at exactly the moment he thinks the ground is safe.\n\nThe third tries to retreat uphill.\n\nKnight is already there.\n\nThe fight ends fast.\n\nToo fast to feel good.\n\nKais crouches by one downed runner and checks the neck mark.\n\nKAIS:\n\nRiven's thread.\n\nFourth lane.\n\nTight discipline.\n\nCruel teacher.\n\nPretty footwork.\n\nUgly philosophy.\n\nCHUG:\n\nYou know him personally?\n\nKAIS:\n\nEnough to dislike his handwriting on the road.\n\nYASSINE:\n\nThat's a weird sentence.\n\nKAIS:\n\nI'm a weird man.\n\nKnight studies the fallen lane mark.\n\nKNIGHT:\n\nThen you're coming.\n\nKAIS tips his hat that he definitely still has.\n\nKAIS:\n\nNow that sounds like trust.\n\nSee?\n\nYou are improving."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 6 — THE ROAD LESSON]\n\nThey camp without making camp.\n\nNo fire.\n\nNo table.\n\nJust a broken culvert and the lee side of old stone.\n\nKais talks too much.\n\nYassine answers too quickly.\n\nKnight speaks only when correction is required.\n\nChug spends more time listening than he used to.\n\nKAIS:\n\nLet me guess.\n\nYou are the one who hits problems until they become structure.\n\nCHUG:\n\nThat's not what I do.\n\nYASSINE:\n\nThat is absolutely what you do.\n\nKNIGHT:\n\nAccurate.\n\nKAIS:\n\nAnd commander face—\n\nhe points at Knight—\n\nis the one who measures grief by how efficiently it can be deployed.\n\nKNIGHT:\n\nIncorrect.\n\nI measure it by whether it destabilizes the line.\n\nKais grins.\n\nGenuinely pleased.\n\nKAIS:\n\nEven better.\n\nYou are impossible.\n\nI enjoy impossible people in controlled amounts.\n\nHe looks to Yassine.\n\nKAIS:\n\nAnd you.\n\nYou move like half your memory went somewhere useful and forgot to send a letter.\n\nThe joke lands too close.\n\nYassine goes still.\n\nKais sees it instantly.\n\nThe grin changes.\n\nSofter now.\n\nKAIS:\n\nSorry.\n\nWrong cut.\n\nYASSINE:\n\nNo.\n\nJust...\n\ntrue enough to be annoying.\n\nChug notices that too.\n\nA man who jokes fast and still recognizes where a joke stops being harmless.\n\nThat is rarer than style."},
  {t:"[SCENE 7 — SOLO'S MARK]\n\nNear dawn they find the mark.\n\nNot a body.\n\nNot a voice.\n\nA cut in the bridge support at Cinder Span.\n\nThree parallel lines.\n\nOne deeper than the others.\n\nA blade signature.\n\nA habit.\n\nA call sign made without words.\n\nYassine touches it first.\n\nThen withdraws his hand like the stone is warm.\n\nYASSINE:\n\nThis is his.\n\nCHUG:\n\nYou remember?\n\nYASSINE:\n\nNo.\n\nI know.\n\nKAIS studies the cut.\n\nKAIS:\n\nStrong hand.\n\nDecisive.\n\nImpatient enough to insult the bridge while passing through it.\n\nI would've liked him immediately.\n\nKNIGHT:\n\nThen save the opinion until we retrieve the man.\n\nCHUG:\n\nWe will.\n\nThe bridge answers with a voice from below.\n\nRIVEN:\n\nYou say that like retrieval is a direction and not a price.\n\nThey all look down.\n\nHe is there.\n\nAt the lower span.\n\nLean.\n\nBeautifully balanced.\n\nCruel without effort.\n\nOne hand resting on the shoulder of a man in chains whose head is bowed but whose stance is still somehow proud.\n\nSolo.\n\nAlive.\n\nNot broken.\n\nNot free.\n\nNot yet."},

  {t:'[EXPANDED ENCOUNTER — THE ROAD THAT CUTS BACK]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:5},
  {t:"— END OF PART 31 —",end:true},
  // PART 32 — NO.4 RIVEN / NO.10 ZEIGRAN
  {part:32,t:"PART 32 — NO.4 RIVEN / NO.10 ZEIGRAN",col:'#d4a017'},
  {t:"[SCENE 1 — SOLO IN CHAINS]\n\nRiven waits below the broken span like he owns gravity.\n\nMaybe he does.\n\nNexters all look like that when they believe the lane belongs to them.\n\nSolo kneels at his side with one knee chained to a metal brace sunk into the bridge stone.\n\nNot collapsed.\n\nNot helpless.\n\nJust forced into stillness by good mechanics.\n\nThat angers Chug more than spectacle would have.\n\nRIVEN:\n\nThere.\n\nI told him you'd come loud.\n\nSOLO lifts his head.\n\nHis face is thinner than Chug expected.\n\nHarder too.\n\nA cut along the brow.\n\nA bruise yellowing at the jaw.\n\nEyes clear enough to hurt.\n\nSOLO:\n\nYou brought people.\n\nCHUG:\n\nYeah.\n\nSOLO:\n\nGood.\n\nYou finally learned.\n\nThat hits Chug harder than Riven's voice does.\n\nKAIS leans over the edge and whistles softly.\n\nKAIS:\n\nI also like him.\n\nTerrible news.\n\nNow I have standards here.\n\nKNIGHT:\n\nFocus.\n\nRiven smiles up at them.\n\nRIVEN:\n\nYou can have him.\n\nIf you keep what comes with him.\n\nA low sound answers from inside the lower ravine.\n\nNot speed.\n\nNot chain.\n\nSomething slower.\n\nHotter.\n\nSORYA isn't here.\n\nRaevan isn't here.\n\nBut Chug still hears Sorya's older warning in memory:\n\nSome enemies do not break courage.\n\nThey stain it.\n\nKNIGHT:\n\nTen.\n\nRiven nods.\n\nAlmost politely.\n\nRIVEN:\n\nZeigran hates waiting.\n\nI told him this bridge would feed him well."},
  {t:"[SCENE 2 — DRACO TEN ARRIVES]\n\nThe ravine brightens.\n\nNot with light.\n\nWith the color wrongness of old fire refusing to die.\n\nDrako No.10 climbs out of the lower cut without haste.\n\nArmor burnt matte black.\n\nInner seams glowing like banked coals.\n\nA long blade dragged behind him, not because he needs to, but because the sound eats confidence faster that way.\n\nZEIGRAN:\n\nSo this is the camp's spine.\n\nHe looks at Solo.\n\nThen at Chug.\n\nZEIGRAN:\n\nOne chained.\n\nOne running.\n\nGood start.\n\nHis voice is not loud.\n\nThat is what makes it dangerous.\n\nIt sounds like it already lives in other people's doubts.\n\nChug feels something old move under the ribs.\n\nNot fear exactly.\n\nMore like remembered failure looking for a chair.\n\nKais flips one disk through his fingers and mutters without smiling.\n\nKAIS:\n\nOh.\n\nHe burns morale.\n\nI hate those.\n\nYou can kill steel.\n\nMood takes longer.\n\nKNIGHT:\n\nThen do not let him speak long.\n\nRIVEN:\n\nYou say that like anyone here controls the conversation."},
  {t:"[SCENE 3 — TWO-FRONT WAR]\n\nIt begins all at once.\n\nRiven cuts the upper lines with speed.\n\nZeigran climbs directly for the center with that quiet dragging blade.\n\nSolo strains at the chain hard enough to split skin.\n\nThe bridge trembles under all of it.\n\nKnight chooses first.\n\nKNIGHT:\n\nChug!\n\nSolo!\n\nKais with him!\n\nI hold Riven!\n\nYassine cut the brace!\n\nNo debate.\n\nGood.\n\nChug drops from the upper support to the lower lane.\n\nHe lands badly.\n\nGets up fast.\n\nKais lands beside him as if the fall was a dance step chosen for style.\n\nKAIS:\n\nThis is the worst bridge date I've ever had.\n\nCHUG:\n\nShut up and move.\n\nKais grins.\n\nGood.\n\nIf he can joke here, his nerve is real.\n\nZeigran meets them halfway.\n\nNot rushing.\n\nNot needing to.\n\nThe air around him already feels like disappointment trying to become law.\n\nZEIGRAN:\n\nYou arrived.\n\nAnd still feel late.\n\nCHUG doesn't answer.\n\nGood.\n\nKnight's lesson stayed."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 4 — ZEIGRAN'S FIRE]\n\nZeigran's first cut does not seek flesh.\n\nIt carves the bridge railing.\n\nBlack sparks spray outward and the whole lane fills with heat-haze.\n\nNot enough to burn skin.\n\nEnough to bend certainty.\n\nSuddenly the distance to Solo feels longer.\n\nThe chain seems thicker.\n\nKais's grin looks thinner.\n\nEvery next move feels one shade more pointless than it did a heartbeat ago.\n\nMorale burn.\n\nKAIS:\n\nNo.\n\nNo.\n\nNot buying it.\n\nHe snaps two discs into the stone and spins them there.\n\nThey hum.\n\nSing.\n\nBright metallic sound cutting the oppressive tone like laughter through a funeral line.\n\nThe haze shivers.\n\nCHUG:\n\nWhat was that?\n\nKAIS:\n\nRhythm.\n\nBad moods hate rhythm.\n\nZeigran turns his head slightly.\n\nZEIGRAN:\n\nInteresting.\n\nThat is not praise.\n\nIt is target selection.\n\nKais notices and winks.\n\nKAIS:\n\nTry not to fall in love.\n\nI bruise."},
  {t:"[SCENE 5 — SOLO'S FIRST ANSWER]\n\nChug reaches the brace line.\n\nYassine drops from above and hits the chain lock with both blades.\n\nTwice.\n\nToo fast.\n\nNot enough.\n\nRiven sees the attempt and sends a runner-blade down the support cable.\n\nKnight intercepts the blade midline and nearly loses two fingers for the privilege.\n\nSolo finally speaks louder.\n\nSOLO:\n\nForget the chain.\n\nBreak the base!\n\nChug looks.\n\nThe brace isn't holding Solo.\n\nThe bridge spine is.\n\nA technique prison.\n\nNot a normal one.\n\nOf course.\n\nCHUG:\n\nGot it.\n\nZEIGRAN is already on him.\n\nBig cut.\n\nLeft to right.\n\nThe kind of strike that wants to erase posture and certainty together.\n\nChug opens Rage 1.\n\nClean.\n\nNot to overpower.\n\nTo shift through.\n\nHe slides inside the arc.\n\nFrame-bolt into the lower plate seam.\n\nYassine dives past him and hits the brace anchor.\n\nKais throws a spinning disc that hooks the chain ring and forces tension sideways instead of inward.\n\nThe brace cracks.\n\nSolo's free knee hits stone.\n\nThen rises.\n\nHe rips the chain from his own leg with a sound Chug feels in his teeth.\n\nSOLO:\n\nTook you long enough.\n\nChug almost laughs.\n\nAlmost."},
  {t:"[SCENE 6 — SOLO JOINS]\n\nSolo fights like a rank earned before memory.\n\nDirect.\n\nHeavy.\n\nNo wasted courtesy.\n\nEvery step insultingly certain.\n\nHe picks up the severed chain and uses it as if he trained for exactly this humiliation.\n\nRiven's eyes narrow for the first time.\n\nRIVEN:\n\nThere.\n\nThat's why I kept you moving.\n\nYou stabilize too quickly.\n\nSOLO:\n\nYou talk too much.\n\nHe hurls the chain.\n\nRiven slips it.\n\nKnight catches the opening and cuts a line across Riven's coat from shoulder to waist.\n\nNot flesh.\n\nClose enough to teach respect.\n\nRiven smiles anyway.\n\nBut smaller now.\n\nZeigran, meanwhile, turns the morale burn harder.\n\nThe whole bridge groans under not just weight, but belief failure.\n\nEven Solo's return cannot fully stop it.\n\nZEIGRAN:\n\nYou can free men.\n\nCan you free the room they carry in their chests?\n\nThat line nearly lands.\n\nNearly.\n\nThen Kais claps once.\n\nSharp.\n\nBright.\n\nKAIS:\n\nNo speeches from the arsonist.\n\nHe begins spinning three metal discs on one hand.\n\nA ridiculous trick in a battlefield.\n\nA glorious one too.\n\nThe ringing climbs into a pattern and somehow gives everyone a center to hear.\n\nYASSINE:\n\nYou're insane.\n\nKAIS:\n\nYes.\n\nFocus."},
  {t:"[SCENE 7 — RIVEN'S LANE BREAK]\n\nRiven tires of losing rhythm.\n\nHe vanishes from Knight's line and appears behind Chug in the lower lane.\n\nToo fast.\n\nAlmost.\n\nSolo catches him instead.\n\nBare forearm to wrist.\n\nShoulder to chest.\n\nA stop built from stubbornness and old ranking.\n\nSOLO:\n\nMine.\n\nRIVEN:\n\nStill dramatic.\n\nThe two clash at speed.\n\nNot Nexter speed exactly.\n\nBut enough to make stone choose a side and regret it.\n\nKnight drops into their lane.\n\nThree lines now.\n\nNot a duel.\n\nAn extraction fight becoming execution.\n\nMeanwhile Zeigran raises the long black blade overhead for a bridge-ending cut.\n\nCHUG:\n\nYASSINE!\n\nYASSINE:\n\nI know!\n\nYassine runs the support rope.\n\nKais throws all four discs at different points of the lower span.\n\nEach one catches and hums.\n\nPattern.\n\nRhythm.\n\nCounter to morale.\n\nChug uses Rage 1 and the frame together, fires two bolts into the heated seam Zeigran exposed himself.\n\nThe black blade drops anyway.\n\nBut not clean.\n\nSolo kicks the broken brace section upward.\n\nThe falling steel meets Zeigran's cut and changes the angle just enough.\n\nThe bridge survives.\n\nThe blade doesn't.\n\nIts lower third snaps off and spins into the ravine.\n\nZeigran finally looks surprised.\n\nGood."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 8 — TEN FALLS]\n\nBroken weapons make honest men.\n\nAnd honest monsters too.\n\nZeigran throws the ruined blade aside and comes forward with bare gauntlets glowing along the seams.\n\nHis morale burn intensifies.\n\nNo more words now.\n\nJust pressure.\n\nJust the sensation that nothing done here can last.\n\nChug understands suddenly.\n\nThis is Zeigran's whole doctrine.\n\nNot defeat.\n\nCorrosion.\n\nSo he answers the only way that works.\n\nHe does not lunge.\n\nHe plants.\n\nCalls the line like Knight would.\n\nCHUG:\n\nSolo left!\n\nYassine low!\n\nKais sound!\n\nNow!\n\nThe order shocks him more than the others.\n\nBecause it comes out correct.\n\nBecause they move immediately.\n\nSolo takes the left shoulder line and hammers Zeigran's stance open.\n\nYassine cuts behind the knee.\n\nKais launches the discs past Zeigran's head and snaps them back in a screaming arc that ruins the morale haze for one crucial breath.\n\nChug enters on that breath with Rage 1 fully clean and drives the frame-bolt into Zeigran's chest seam at point blank.\n\nThen again.\n\nThen the weighted cord around the glowing gauntlet.\n\nThen elbow through the opened line.\n\nZeigran drops to one knee amid his own failing heat.\n\nZEIGRAN:\n\n...There.\n\nThe room stopped listening to me.\n\nCHUG:\n\nYeah.\n\nZEIGRAN:\n\nGood camp.\n\nHe laughs once.\n\nDark.\n\nSpent.\n\nNot kind.\n\nZEIGRAN:\n\nBad for Drakos.\n\nChug tears the Ten mark free from Zeigran's chest clasp and hurls it into the bridge stone.\n\nSOLO steps beside him.\n\nSOLO:\n\nFinish him?\n\nThe question is practical.\n\nNot emotional.\n\nChug looks at Zeigran.\n\nAt the broken bridge.\n\nAt Solo free and standing.\n\nAt Yassine breathing hard but steady.\n\nAt Kais grinning with blood on his sleeve and delight still somehow intact.\n\nThen he looks at Riven."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 9 — RIVEN LEAVES WITH A LOSS]\n\nRiven has blood on one wrist now.\n\nKnight put it there.\n\nSolo put two more shallow lines into his shoulder.\n\nFor a Nexter, that counts as humiliation.\n\nRIVEN:\n\nYou are all becoming inconvenient.\n\nKAIS:\n\nYou're welcome.\n\nRiven looks at Solo.\n\nThen at Chug.\n\nRIVEN:\n\nHe'll be slower for a while.\n\nI made sure of it.\n\nSOLO:\n\nAnd you're running now.\n\nI made sure of that.\n\nThat lands.\n\nRiven hates landing lines almost as much as losing.\n\nHe backs toward the upper lane, not breaking eye contact.\n\nRIVEN:\n\nKeep him then.\n\nBut the roads remember ownership.\n\nKNIGHT:\n\nNot anymore.\n\nRiven vanishes into the speed lines he came from.\n\nNo dramatic farewell.\n\nNexters are cowards only when that is efficient.\n\nZeigran, meanwhile, forces himself back to his feet.\n\nBleeding from the opened seam.\n\nZEIGRAN:\n\nTen falls here.\n\nOn a bridge that chose men over momentum.\n\nHe takes one step back.\n\nThen another.\n\nCHUG:\n\nTell Nine we're coming.\n\nZEIGRAN:\n\nNo.\n\nTell Nine yourselves.\n\nHe likes hearing prey sound certain before routes eat them.\n\nThen he is gone too.\n\nNot spared.\n\nBeaten.\n\nAnd moved off the board."},
  {t:"[SCENE 10 — END OF 32]\n\nBack at camp, Solo arrives with a chain scar still fresh around the leg and a face that looks like sleep and violence have been arguing over it for months.\n\nHarjeev checks the wound first.\n\nThen the pupils.\n\nThen the grip.\n\nOnly after all that does he say:\n\nHARJEEV:\n\nGood.\n\nAnother expensive person.\n\nSOLO:\n\nMissed you too.\n\nThat earns the first real crack in Harjeev's mouth that might one day become a smile.\n\nYassine drops onto the bench beside Solo.\n\nYASSINE:\n\nDo I know you?\n\nSOLO studies him.\n\nA whole second too long.\n\nSOLO:\n\nYeah.\n\nYASSINE:\n\nGreat.\n\nThat's becoming everyone's favorite answer.\n\nKaizen looks at Chug.\n\nThen at the Ten mark now hanging below Eleven.\n\nKAIZEN:\n\nYou ordered well.\n\nChug hears that harder than the victory.\n\nSystem text burns low and relentless above the table.\n\nSYSTEM:\n\n\"DRAKO 10 STATUS: DOWN\"\n\n\"ALLY SOLO — RECOVERY ROUTE OPEN\"\n\n\"PLAYABLE ROUTE: KAIS AVAILABLE\"\n\n\"CAMP STRUCTURE LEVEL: EXPANDED\""},

  {t:'[BOSS GATE — Nexter No.5 Riven]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for NO.4 RIVEN / NO.10 ZEIGRAN.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.5 RIVEN',fight:20},
  {t:"— END OF PART 32 —",end:true},
  // PART 33 — THE GIRL CALLED O.O
  {part:33,t:"PART 33 — THE GIRL CALLED O.O",col:'#d4a017'},
  {t:"[SCENE 1 — SOLO IN CAMP]\n\nSolo does not re-enter life gently.\n\nHe re-enters it like a door forced on old hinges.\n\nHe sits at the table on the first morning with the chain scar visible and his patience gone.\n\nHarjeev hands him food.\n\nSolo eats like someone who remembers starvation more clearly than rescue.\n\nKnight gives him no comfort.\n\nRaevan gives him a training blade before a greeting.\n\nKaizen ignores him on purpose.\n\nYassine keeps staring at him like recognition might climb up through the eyes if he waits long enough.\n\nSOLO:\n\nYou going to blink eventually or is this a test?\n\nYASSINE:\n\nMaybe both.\n\nSOLO:\n\nGood.\n\nYou were annoying before too.\n\nYASSINE:\n\nThat actually helps.\n\nChug watches them and feels something ugly loosen a fraction inside his chest.\n\nNot relief.\n\nNot yet.\n\nBut a version of it learning to sit upright.\n\nADDY:\n\nHe's got the same face you used to make at ranked rooms.\n\nSOLO glances at her.\n\nSOLO:\n\nAddy.\n\nADDY:\n\nYeah.\n\nSOLO:\n\nYou still shoot like apology is beneath you?\n\nADDY:\n\nRecovered enough to prove it.\n\nThat passes for affection here.\n\nGood enough."},
  {t:"[SCENE 2 — SOLO'S RESIDUE]\n\nRaevan runs Solo through basic motion tests.\n\nNot because Solo needs basic training.\n\nBecause rescued fighters need proof that their body belongs to them again.\n\nSolo passes every test too aggressively.\n\nFootwork.\n\nReaction.\n\nGrip.\n\nChain transfer.\n\nDirectional break.\n\nHe has not forgotten how to fight.\n\nHe has only forgotten how to stop.\n\nRAEVAN:\n\nEnough.\n\nSOLO:\n\nNo.\n\nRAEVAN:\n\nEnough.\n\nSOLO finally lets go of the practice dummy's arm.\n\nThe wood is cracked in three places.\n\nHARJEEV, writing:\n\nAdd one dummy to the list of Solo's emotional expenses.\n\nSOLO:\n\nManager still alive.\n\nShame.\n\nHARJEEV:\n\nRank still intact.\n\nTragedy.\n\nYassine laughs outright.\n\nThat seems to startle Solo more than any blade test did.\n\nSOLO:\n\nYou really don't remember?\n\nYASSINE:\n\nNo.\n\nSOLO:\n\nHuh.\n\nYASSINE:\n\nWhat?\n\nSOLO:\n\nYou laughed easier before things got bad.\n\nThat lands softly.\n\nStill hard."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 3 — NINE'S COUNTRY]\n\nKnight drops a new route shard on the table.\n\nDifferent from Riven's.\n\nDifferent from Zeigran's.\n\nIt is carved like a forked road that keeps eating itself.\n\nKNIGHT:\n\nNine.\n\nCHUG:\n\nMorvain.\n\nKNIGHT:\n\nRoute eater.\n\nTerritory consumer.\n\nHe does not break camps by impact or morale.\n\nHe turns movement itself against you until every path leads where he wants.\n\nSORYA:\n\nA hungry map.\n\nHARJEEV:\n\nAwful phrase.\n\nAccurate phrase.\n\nSOLO studies the shard.\n\nSOLO:\n\nI've seen this work.\n\nNot him.\n\nHis country.\n\nRoads that loop.\n\nSafe paths that shorten into cages.\n\nRetreats that become deliveries.\n\nKNIGHT:\n\nWhere?\n\nSolo closes one fist slowly.\n\nSOLO:\n\nTransfer south.\n\nBefore Riven.\n\nThey moved a woman through one of Morvain's corridors.\n\nDidn't show her face.\n\nDidn't need to.\n\nEveryone kept using the initials like it was enough.\n\nO.O.\n\nChug looks up.\n\nAddy too.\n\nADDY:\n\nO.O?\n\nSOLO:\n\nYeah.\n\nYASSINE:\n\nThat's a person?\n\nSOLO:\n\nGirl.\n\nMean enough to survive people talking about her like a weapon.\n\nAddy almost smiles.\n\nADDY:\n\nI think I already like her."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 4 — SIGNAL IN THE GLASS]\n\nThat evening a light begins blinking from the far watch stones.\n\nNot camp code.\n\nNot Drako pressure.\n\nNot Nexter thread.\n\nThree long.\n\nTwo short.\n\nThree long.\n\nPause.\n\nRepeat.\n\nAddy sees it first.\n\nADDY:\n\nSignal.\n\nKnight is already on the ridge.\n\nKNIGHT:\n\nSource?\n\nADDY:\n\nEast mirror line.\n\nHigh angle.\n\nNot random.\n\nSolo comes up behind them.\n\nSOLO:\n\nNeon.\n\nCHUG:\n\nNeonKd?\n\nSOLO nods once.\n\nSOLO:\n\nOnly one I know who'd send code into hostile light and trust ego to carry it through.\n\nThe signal shifts.\n\nDifferent pattern now.\n\nDirected.\n\nA message more than a ping.\n\nSorya narrows her eyes at the flashing.\n\nSORYA:\n\nIt is bouncing through dead reflective planes.\n\nWhoever is sending this understands ruined glass.\n\nAddy starts translating by instinct.\n\nNot because anyone taught her at camp.\n\nBecause residue is cruelly helpful.\n\nADDY:\n\n\"Silence Gallery.\n\nNorth vault.\n\nRoad false.\n\nTake the broken left.\"\n\n...\n\nShe stops.\n\nBreath catches.\n\nADDY:\n\nAnd...\n\n\"She's still cutting them.\"\n\nThe whole table understands.\n\nO.O is alive.\n\nSomewhere inside Morvain's route country.\n\nStill making enemies bleed inside a system built to erase direction."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 5 — KAIS BECOMES CAMP]\n\nKais has stayed.\n\nNo one asked him to.\n\nNo one fully told him to leave either.\n\nHe just started helping repair things badly and then well and eventually the camp gave up pretending he was temporary.\n\nHe now sleeps near the south wall with one boot on and one off as if commitment is a negotiable joke.\n\nHarjeev hates his storage habits.\n\nHARJEEV:\n\nWhy are there metal discs in the water basin.\n\nKAIS:\n\nBecause if I put them near my bed,\n\nYassine steals them.\n\nYASSINE:\n\nI was looking.\n\nKAIS:\n\nWith criminal posture.\n\nHarjeev pinches the bridge of his nose.\n\nKais spins a disc over the back of one hand and drops it into the map table cup exactly upright.\n\nKAIS:\n\nThat said,\n\nthe signal route is good.\n\nToo good.\n\nIf Neon sent it,\n\nsomeone wants us to receive it.\n\nKNIGHT:\n\nOf course.\n\nKAIS:\n\nNo.\n\nI mean someone smart enough to leave one truth inside three lies.\n\nThat's not routine work.\n\nThat's personal architecture.\n\nCHUG:\n\nMorvain.\n\nKAIS:\n\nProbably.\n\nOr whoever he uses to decorate the corridors.\n\nEither way,\n\nthis is going to be a rude walk."},
  {t:"[SCENE 6 — PLAYABLE STATUS AND THE SEAT]\n\nHarjeev updates the board after dark.\n\nADDY — ACTIVE\n\nYASSINE — ACTIVE\n\nKAIS — ACTIVE\n\nSOLO — LIMITED / RECOVERY\n\nSolo sees the word LIMITED and gives Harjeev a look sharp enough to cut paper.\n\nSOLO:\n\nChange that.\n\nHARJEEV:\n\nNo.\n\nSOLO:\n\nI can fight.\n\nHARJEEV:\n\nYes.\n\nYou can also overextend,\n\nbleed through the old restraint line,\n\nand become a hero in exactly the useless way Knight keeps beating out of Chug.\n\nKnight does not look up from the map.\n\nKNIGHT:\n\nManager is correct.\n\nSOLO:\n\nI hate all of you.\n\nKAIS:\n\nWonderful.\n\nThat means you're family already.\n\nSolo actually almost laughs.\n\nAlmost.\n\nThat is how everyone knows Kais has some impossible social weapon beyond steel."},
  {t:"[SCENE 7 — THE ROAD TO SILENCE GALLERY]\n\nThey leave at low gray.\n\nChug.\n\nYassine.\n\nAddy.\n\nKais.\n\nKnight.\n\nSolo stays furious at camp, which Harjeev correctly identifies as the safest version of him today.\n\nThe road to Silence Gallery feels wrong before it looks wrong.\n\nFootsteps echo half a second late.\n\nBroken signs point in mutually exclusive directions.\n\nBirds do not cross the same line twice.\n\nKais tosses a disc down one \"safe\" lane.\n\nIt vanishes.\n\nNo sound.\n\nNo bounce.\n\nKAIS:\n\nNot that one.\n\nYASSINE:\n\nHow are you still so calm?\n\nKAIS:\n\nBecause panic ruins style.\n\nKNIGHT:\n\nAnd because he is competent enough to decorate his recklessness.\n\nKAIS tips the hat he is somehow still wearing.\n\nKAIS:\n\nI feel seen.\n\nAddy studies the blink-reflections on the ruined gallery walls.\n\nADDY:\n\nNeon's path starts left.\n\nThen fakes right.\n\nThen cuts under.\n\nHe's leaving us a route inside Morvain's route.\n\nThat's either genius or grief.\n\nCHUG:\n\nMove on genius first.\n\nNo one argues."},
  {t:"[SCENE 8 — SILENCE GALLERY]\n\nThe Gallery is a dead museum for sound.\n\nMarble halls.\n\nCollapsed mirrors.\n\nBlack curtains hanging from nowhere.\n\nEvery step swallowed too fast.\n\nEvery word feeling expensive.\n\nMorvain's territory.\n\nThe first corridor forks three ways.\n\nThen four.\n\nThen one again.\n\nThen the floor changes texture and everyone stops.\n\nKNIGHT:\n\nDon't trust any route that becomes convenient after resistance.\n\nKAIS:\n\nHe says things like that and somehow still isn't fun at parties.\n\nYASSINE:\n\nHave you ever seen him at a party?\n\nKAIS:\n\nNo.\n\nI'm proving my own point.\n\nA cut appears on the wall ahead.\n\nThree circles.\n\nOne slash through two of them.\n\nAddy's face changes.\n\nADDY:\n\nThat's hers.\n\nCHUG:\n\nO.O?\n\nADDY:\n\nYeah.\n\nLegend O.O.\n\nShe marks kills with circles.\n\nNear misses with lines.\n\nThat means two dead.\n\nOne kept moving.\n\nKAIS:\n\nOh I absolutely like her."},
  {t:"[SCENE 9 — THE GIRL THEY CALLED A WEAPON]\n\nThey find her in the north vault.\n\nNot chained.\n\nNot kneeling.\n\nStanding.\n\nOne shoulder against a broken column.\n\nOne eye half-covered by a torn black cloth.\n\nTwin narrow blades in reverse grip.\n\nBoots blood-dark to the ankle.\n\nAround her are five corridor bodies.\n\nEvery one of them cut at the exact joint where movement dies fastest.\n\nShe is breathing hard.\n\nStill ready.\n\nO.O:\n\nYou took too long.\n\nAddy actually laughs this time.\n\nADDY:\n\nYeah.\n\nYou too.\n\nO.O's gaze shifts over the group.\n\nMeasures everyone.\n\nStops on Chug.\n\nThen Yassine.\n\nThen Kais.\n\nO.O:\n\nYou brought a clown.\n\nKAIS:\n\nA stylish professional.\n\nPlease insult accurately.\n\nShe almost smiles.\n\nAlmost.\n\nThen the walls begin to move.\n\nNot physically.\n\nSpatially.\n\nMorvain noticed them.\n\nO.O straightens off the column and blood runs from her sleeve.\n\nO.O:\n\nGood.\n\nNow we find out if you're worth the route you came in on."},

  {t:'[EXPANDED ENCOUNTER — THE GIRL CALLED O.O]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:9},
  {t:"— END OF PART 33 —",end:true},
  // PART 34 — NINE EATS ROADS
  {part:34,t:"PART 34 — NINE EATS ROADS",col:'#d4a017'},
  {t:"[SCENE 1 — MORVAIN CLOSES THE HALL]\n\nSilence Gallery seals behind them without doors moving.\n\nThat is how they know Morvain is near.\n\nThe corridors begin folding preference into space.\n\nDistances shorten only when walked wrong.\n\nTurns appear familiar until someone chooses them.\n\nVoices come from ten feet away and three halls over at the same time.\n\nMorvain does not enter like the other Drakos.\n\nHe enters as absence choosing shape.\n\nMORVAIN:\n\nGood.\n\nThe famous camp finally walked inside my mouth.\n\nNo body yet.\n\nOnly the voice.\n\nSmooth.\n\nPatient.\n\nPredatory in a manner that thinks patience is elegance.\n\nO.O rolls her shoulder once and ignores the blood.\n\nO.O:\n\nYou talk like a hall monitor who learned murder.\n\nKAIS:\n\nOh, she's excellent.\n\nCHUG:\n\nCan you fight?\n\nO.O looks at him like the question offended her lineage.\n\nO.O:\n\nCan you keep up?\n\nThat answers itself."},
  {t:"[SCENE 2 — O.O IN MOTION]\n\nWhen the first route-wraiths come,\n\nO.O moves before anyone else.\n\nNot flashy.\n\nNot loud.\n\nNot emotional.\n\nPrecise.\n\nDeadly.\n\nEconomical.\n\nShe cuts the lead wraith at the hip turn.\n\nUses the falling body as cover.\n\nReverse grips into the next throat seam.\n\nKicks the third off the corridor lip and never watches it fall.\n\nKAIS:\n\nYes.\n\nAbsolutely yes.\n\nADDY:\n\nTold you.\n\nYASSINE:\n\nShe's terrifying.\n\nO.O:\n\nCorrect.\n\nShe says it without arrogance.\n\nWhich is somehow colder.\n\nKnight watches her lines once and nods.\n\nKNIGHT:\n\nAnchor killer.\n\nGood.\n\nO.O:\n\nFinally.\n\nA useful man.\n\nKais clutches his chest theatrically.\n\nKAIS:\n\nAnd here I thought I was winning you over.\n\nO.O:\n\nYou are a noise source.\n\nKAIS:\n\nI've been called worse by prettier women.\n\nO.O's knife almost flicks toward him on reflex.\n\nAddy catches the motion and smirks.\n\nGood.\n\nThat means some tension here may one day become trust."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 3 — MORVAIN'S MAZE]\n\nThe Gallery route folds around them.\n\nThe \"broken left\" path Neon sent remains valid for exactly forty steps,\n\nthen becomes a drop into a glass pit.\n\nKnight halts them one breath before disaster.\n\nKNIGHT:\n\nBack.\n\nKais tosses a disc.\n\nNo return.\n\nKAIS:\n\nRude architecture.\n\nADDY:\n\nNo.\n\nAdjusted architecture.\n\nHe's listening to the route as we move.\n\nCHUG:\n\nCan he do that?\n\nSORYA's teaching answers in memory.\n\nSome fields don't just hold space.\n\nThey rewrite permission.\n\nO.O kneels.\n\nTouches a line of blood she'd left earlier on the floor.\n\nO.O:\n\nThen we use what he didn't author.\n\nCHUG:\n\nMeaning?\n\nO.O:\n\nPain is honest.\n\nHe can eat roads.\n\nNot wounds already spent.\n\nShe drags her own blood mark across the floor in a deliberate line.\n\nThe corridor doesn't change under it.\n\nKnight sees immediately.\n\nKNIGHT:\n\nGood.\n\nTrail your certainties.\n\nNo assumed paths.\n\nKais grins.\n\nKAIS:\n\nI really do love serious people.\n\nThey keep turning suffering into method.\n\nYASSINE:\n\nThat's a terrible sentence.\n\nKAIS:\n\nYet useful."},
  {t:"[SCENE 4 — NEON'S SECOND SIGNAL]\n\nA flash pulses through the mirrors again.\n\nDifferent from the east watch.\n\nCloser.\n\nSharper.\n\nADDY:\n\nNeon.\n\nThe mirrored code bounces through three cracked surfaces and resolves just long enough to read.\n\n\"LOW CHAMBER.\n\nCUT SOUND.\n\nNINE LIKES STILLNESS.\"\n\nO.O curses softly.\n\nO.O:\n\nHe pinned Neon under the listening floor.\n\nCHUG:\n\nThen we move.\n\nKNIGHT:\n\nNo.\n\nWe move correctly.\n\nMorvain's voice folds through the hall again.\n\nMORVAIN:\n\nStill pretending there is a difference.\n\nThat line almost makes the next step feel futile.\n\nAlmost.\n\nKais snaps two discs together.\n\nThe ringing cuts the mood sink in half.\n\nKAIS:\n\nThere.\n\nNow he's only half annoying.\n\nO.O side-eyes him.\n\nO.O:\n\nYou're ridiculous.\n\nKAIS:\n\nAnd alive.\n\nWatch how often those overlap."},
  {t:"[SCENE 5 — LOW CHAMBER]\n\nThe chamber below is built like an inverted bell.\n\nSound falls to its center and dies there.\n\nThe floor is latticed glass over black machinery.\n\nAt the center,\n\nhalf-buried in a signal frame,\n\nis NeonKd.\n\nWires across the spine.\n\nPulse visor over one eye.\n\nHands locked into two broken relay grips.\n\nHe sees them first through the visor reflection.\n\nNEONKD:\n\nYou picked the wrong left.\n\nADDY actually laughs in relief.\n\nADDY:\n\nShut up, Neon.\n\nNEONKD:\n\nAw.\n\nSo it is my people.\n\nHis smile is tired.\n\nStill there.\n\nThen the floor shakes.\n\nMorvain finally steps into sight above them on the highest gallery bridge.\n\nTall.\n\nLean.\n\nArmor carved like route lines crossing over each other.\n\nFace hidden behind a half-mask split vertically like two roads refusing to agree.\n\nMORVAIN:\n\nYou are all very sentimental for people who keep surviving geometry.\n\nCHUG:\n\nGet down here.\n\nMORVAIN:\n\nWhy?\n\nThe whole room already belongs to me."},
  {t:"[SCENE 6 — NINE'S REAL POWER]\n\nMorvain doesn't attack with force.\n\nHe attacks with options.\n\nHe tilts one hand.\n\nHalf the floor becomes farther.\n\nThe other half becomes easier than it looks.\n\nThe support beams trade places in the eye.\n\nO.O's blood trail is the only honest thing left in the room.\n\nNEONKD:\n\nDon't trust the shine!\n\nTrust the heat signatures!\n\nLeft-middle is fake!\n\nRight-low is also fake!\n\nOh that's very rude—\n\nA glass spear nearly takes his throat before Addy shoots it out of the air.\n\nADDY:\n\nStill talking too much.\n\nNEONKD:\n\nMeans I lived.\n\nKnight is already mapping the true load lines.\n\nKNIGHT:\n\nO.O on blood path.\n\nChug with her.\n\nYassine and Kais cut the upper angle.\n\nAddy suppress Morvain's hand line.\n\nI free Neon.\n\nNo one hesitates.\n\nGood.\n\nThat is camp work,\n\nnot hero work."},
  {t:"[SCENE 7 — O.O SHOWS WHY SHE'S LEGEND]\n\nO.O takes point.\n\nNot because Chug yields it.\n\nBecause she is already there.\n\nShe walks the blood path like a woman stepping across names she stopped fearing years ago.\n\nEvery false panel trying to invite her somewhere easier.\n\nEvery invitation ignored.\n\nMorvain finally sounds interested.\n\nMORVAIN:\n\nThere you are.\n\nThe girl who kept cutting exits instead of making them.\n\nO.O:\n\nAnd you're the thing that thinks roads matter more than who survives them.\n\nMORVAIN:\n\nThey do.\n\nO.O:\n\nThen you're a coward with architecture.\n\nShe reaches the first support pillar and hammers both reverse grips into the route seam.\n\nThe room shudders.\n\nFor one breath,\n\none whole section tells the truth again.\n\nChug uses that breath.\n\nRage 1.\n\nFrame-bolt.\n\nUpper bridge support.\n\nKais throws spinning steel along the outer rail and lets the return path ricochet through four false openings just to prove he can.\n\nHe clips Morvain's mask seam.\n\nKAIS:\n\nHello from below.\n\nMorvain doesn't even look at him.\n\nWhich is insulting enough to work.\n\nYASSINE:\n\nHe hates you.\n\nKAIS:\n\nExcellent.\n\nSo does gravity most days."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 8 — FREEING NEON]\n\nKnight reaches Neon through the true lower lane.\n\nNeon is laughing under pain.\n\nWhich feels like exactly the wrong response until Knight gets close enough to hear the strain in it.\n\nNEONKD:\n\nIf I stop joking,\n\nthe room wins.\n\nKNIGHT:\n\nThen keep joking and give me the lock order.\n\nNeon blinks once.\n\nTwice.\n\nNEONKD:\n\nLeft wrist relay.\n\nSpine release.\n\nThen visor.\n\nNot visor first.\n\nNever visor first.\n\nKnight obeys without comment.\n\nGood.\n\nThis is not the hour for ego.\n\nAddy covers from the side.\n\nThree arrows.\n\nThree redirected route shards.\n\nOne almost impossible save.\n\nAddy and Neon were clearly friends before all this.\n\nYou don't cover like that unless someone once made your whole bad day survivable.\n\nThe lock tears free.\n\nNeon gasps.\n\nAlmost folds.\n\nStill energyges:\n\nNEONKD:\n\nTook you all forever.\n\nI would've been out in twenty more minutes.\n\nADDY:\n\nNo you wouldn't.\n\nNEONKD:\n\nYeah.\n\nProbably not."},
  {t:"[SCENE 9 — NINE FALLS]\n\nMorvain sees the room slipping out of his control and stops pretending patience is enough.\n\nHe drops from the upper bridge into the chamber itself.\n\nBad idea.\n\nNecessary one.\n\nChug meets him.\n\nO.O catches the left route.\n\nYassine kills the retreat seam.\n\nKais turns the outer reflections into noise.\n\nAddy keeps the pressure off Neon and Knight while they drag the signal frame clear.\n\nMorvain fights beautifully.\n\nThat makes him infuriating.\n\nNo wasted motion.\n\nNo blind rage.\n\nJust exact cruelty.\n\nHe almost gets Chug with a false near step that turns into a side cut.\n\nO.O intercepts with both blades crossed and takes the hit across one forearm instead of Chug's throat.\n\nCHUG:\n\nYou good?!\n\nO.O:\n\nFight.\n\nGood answer.\n\nChug does.\n\nHe changes rhythm the way Knight forced him to learn.\n\nNot direct.\n\nNot loud.\n\nHe lets Morvain think the next path exists,\n\nthen kills it himself.\n\nYassine sees it.\n\nKais sees it.\n\nThey all hit the same broken possibility.\n\nO.O locks the torso line.\n\nYassine cuts the rear knee.\n\nKais breaks the balance with a ricochet spin to the heel plate.\n\nChug drives the frame-bolt straight through the split route mask.\n\nMorvain falls backward through his own false path.\n\nHis field flickers.\n\nThen dies.\n\nThe whole chamber gasps its geometry back into place.\n\nMORVAIN:\n\n...Ugly.\n\nYou made it ugly.\n\nCHUG:\n\nGood.\n\nMORVAIN:\n\nNine doesn't die in pretty rooms.\n\nHe tears the route insignia from his collar and lets it clatter across the blood-streaked floor.\n\nMORVAIN:\n\nThen let Eight judge your formations.\n\nHe vanishes through a route collapse before anyone can decide mercy or execution.\n\nCowardly.\n\nEfficient.\n\nVery Nine."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 10 — END OF 34]\n\nBack at camp,\n\nthe table receives two new names in living form.\n\nO.O sits with her arm stitched and her patience gone.\n\nO.O:\n\nThis place better have standards.\n\nHARJEEV:\n\nIt has ledgers.\n\nClose enough.\n\nNeon lies half-propped against the med post with one eye still light-sensitive and both hands still twitching like they want signal grips back.\n\nNEONKD:\n\nNice camp.\n\nBad walls.\n\nMid food.\n\nHARJEEV:\n\nRecover first.\n\nThen insult with full data.\n\nSolo looks at O.O.\n\nThen Neon.\n\nThen Chug.\n\nSOLO:\n\nRoster's getting real.\n\nKnight nails the Nine mark beneath Ten.\n\nThen marks two lines on the board.\n\nO.O — ACTIVE ROUTE OPEN.\n\nNEONKD — RECOVERY / SIGNAL.\n\nKais drops into the empty seat opposite Tora's ring and grins when Harjeev glares.\n\nKAIS:\n\nWhat?\n\nI'm temporary.\n\nBut dramatically.\n\nSystem text burns brighter than usual.\n\nSYSTEM:\n\n\"DRAKO 9 STATUS: DOWN\"\n\n\"ALLY O.O — PLAYABLE STATUS OPEN\"\n\n\"ALLY NEONKD — RECOVERY ROUTE OPEN\""},

  {t:'[BOSS GATE — Drako No.7 Dread Juno]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for NINE EATS ROADS.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.7 DREAD JUNO',fight:6},
  {t:"— END OF PART 34 —",end:true},
  // PART 35 — MED TRANSFER
  {part:35,t:"PART 35 — MED TRANSFER",col:'#d4a017'},
  {t:"[SCENE 1 — CAMP TOO FULL TO FAIL]\n\nCamp is louder now.\n\nNot noisy.\n\nAlive.\n\nSolo and Yassine argue through drills.\n\nAddy and O.O compete without admitting they are doing it.\n\nNeon gives route advice from the med shade and insults everybody's timing despite barely standing straight.\n\nKais somehow turns supply sorting into a card trick and nearly gets stabbed by Harjeev for it.\n\nKnight has stopped trying to prevent this and started using it as morale.\n\nThat is more frightening than the tricks.\n\nChug stands at the table and understands what Tora meant.\n\nA camp is not comfort.\n\nIt is capacity.\n\nHARJEEV:\n\nDo not look sentimental at the board.\n\nIt weakens the wood.\n\nCHUG:\n\nYou're impossible.\n\nHARJEEV:\n\nNo.\n\nYou all just think affection should be soft.\n\nIt shouldn't.\n\nIt should stay through repairs.\n\nThat line belongs on the table more than any trophy does."},
  {t:"[SCENE 2 — EIGHT'S PRESSURE]\n\nEight begins without courtesy.\n\nNot a voice in stone.\n\nNot weather.\n\nNot route lies.\n\nFormations break.\n\nRandom challenger groups that should move like mobs start moving like units.\n\nFlank lines tighten without visible commanders.\n\nAmbushes come from mathematically correct angles.\n\nRetreats bait exactly the wrong responder out of sector.\n\nKnight identifies it after the third near breach.\n\nKNIGHT:\n\nEight.\n\nKaith.\n\nFormation breaker.\n\nO.O wipes her blades.\n\nO.O:\n\nSo he doesn't hit hardest.\n\nHe rearranges people until they become weak.\n\nKNIGHT:\n\nYes.\n\nKAIS:\n\nRude profession.\n\nRAEVAN:\n\nEffective profession.\n\nChug studies the board.\n\nEvery rescue so far has widened the camp.\n\nThat also means there is more to disrupt.\n\nGood.\n\nHarder.\n\nReal.\n\nGUIDE:\n\nEight will attack your confidence in each other.\n\nCHUG:\n\nThen he gets nothing.\n\nGUIDE:\n\nNo.\n\nHe gets attempts.\n\nYou remove payoff.\n\nSubtle difference.\n\nUseful one."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 3 — THE CARRIAGE IN THE CUT]\n\nHarjeev's outer watch whistles twice at dusk.\n\nDifferent code.\n\nMedical code.\n\nNo enemy horn follows it.\n\nKnight is moving before the second whistle dies.\n\nChug,\n\nYassine,\n\nSolo,\n\nand O.O follow.\n\nAddy takes roof cover.\n\nNeon stays with the signal stones.\n\nKais comes because Kais comes.\n\nThey reach the north cut and find a broken transfer carriage lodged against black stone.\n\nNo horses.\n\nNo beasts.\n\nJust drag channels.\n\nMeaning it was pulled by men or worse.\n\nThe carriage is burned on one side and sealed on the other with med script nearly scraped away.\n\nHARJEEV arrives seconds later,\n\nbreath already irritated.\n\nHARJEEV:\n\nMove.\n\nIf that's a live transfer,\n\nevery heartbeat we waste is criminal.\n\nThey cut the seals.\n\nInside is one man.\n\nHalf-conscious.\n\nChest bound badly.\n\nSide wound reopened.\n\nForearm wrapped in old pressure cloth.\n\nFace pale from blood loss and stubbornness.\n\nM.R.\n\nChug knows it instantly.\n\nBefore memory explains.\n\nBefore logic catches up.\n\nThe rank lives in the body.\n\nSame as the name did.\n\nCHUG:\n\n...M.R.\n\nThe man's eyes force half-open.\n\nSharp.\n\nEven through the pain.\n\nM.R:\n\nTook...\n\nyou... long enough.\n\nThen he passes out again.\n\nYassine looks between them.\n\nYASSINE:\n\nThat's him?\n\nChug can't answer immediately.\n\nBecause yes.\n\nBecause the answer is bigger than the voice.\n\nBecause the man looks worse than the med note implied and somehow even injured still gives off the feeling of a first-rank presence trying not to inconvenience anyone with pain.\n\nHARJEEV:\n\nStop staring.\n\nLift him.\n\nThe spell breaks.\n\nGood.\n\nCamp before feeling.\n\nAgain."},
  {t:"[SCENE 4 — BACK TO CAMP WITH WEIGHT]\n\nThe return is careful and ugly.\n\nO.O clears the route.\n\nSolo carries the front corner of the improvised stretcher.\n\nChug takes the rear.\n\nYassine shadows the flank.\n\nKnight watches for pursuit.\n\nKais keeps talking just enough to stop everyone sinking too deep into the tension.\n\nKAIS:\n\nYou know,\n\nthis is exactly how all great friendships begin.\n\nInjury.\n\nSilence.\n\nA suspiciously handsome stranger on a stretcher.\n\nO.O:\n\nIf you flirt with the dying,\n\nI'll stab you on principle.\n\nKAIS:\n\nThat's the most promising response yet.\n\nSolo actually snorts.\n\nM.R remains unconscious.\n\nBut somehow the tension lightens half a degree.\n\nUseful idiot.\n\nThat might be Kais's whole category."},
  {t:"[SCENE 5 — M.R UNDER HARJEEV'S HAND]\n\nHarjeev takes command of the med line like a general takes walls.\n\nHARJEEV:\n\nAddy,\n\nboil water.\n\nO.O,\n\nlamp.\n\nKnight,\n\ncut the old wraps.\n\nChug,\n\nif you stand there being emotional,\n\nI'll bill you for lost time.\n\nChug moves instantly.\n\nGood.\n\nThe wound is worse than it looked.\n\nRib-side entry.\n\nBurned edge.\n\nOld internal shock.\n\nThree reopened stitches.\n\nBruising that suggests transport without mercy.\n\nNeon squints from the signal corner.\n\nNEONKD:\n\nHe got transferred through bad roads.\n\nNo clean med route would make that bruising.\n\nHarjeev grunts.\n\nHARJEEV:\n\nCorrect.\n\nWhoever moved him cared more about destination than condition.\n\nYASSINE:\n\nEnemy?\n\nKNIGHT:\n\nNot sure.\n\nO.O:\n\nThen assume yes until proved useful.\n\nHarjeev cuts the old bandage away and freezes just long enough for Chug to notice.\n\nCHUG:\n\nWhat?\n\nHARJEEV:\n\nThis stitch pattern.\n\nEveryone waits.\n\nHARJEEV:\n\nCamp work.\n\nNot enemy work.\n\nSomeone tried to keep him alive properly before the transfer broke.\n\nThat changes the room.\n\nNot enough to become hope.\n\nEnough to become complication."},
  {t:"[SCENE 6 — M.R WAKES]\n\nHe wakes at midnight.\n\nOf course he does.\n\nMen like that never choose a convenient hour.\n\nChug is the only one still awake at the med post.\n\nThat feels like destiny until Harjeev shouts from the next room for more water and ruins the mood.\n\nM.R's eyes open clear despite the pain.\n\nThat is the first frightening thing about him.\n\nThe second is that he assesses the room before he speaks.\n\nM.R:\n\nCamp.\n\nCHUG:\n\nYeah.\n\nM.R looks at him.\n\nReally looks.\n\nAnd the old hierarchy Chug felt in the name becomes real.\n\nNot because M.R is cruel.\n\nBecause presence itself is organized differently around him.\n\nM.R:\n\nYou look worse with responsibility.\n\nChug laughs before he means to.\n\nA real laugh.\n\nToo sudden.\n\nToo honest.\n\nCHUG:\n\nGood to see you too.\n\nM.R:\n\nWould've stood for the greeting.\n\nSide disagreed.\n\nThe pain hits him then.\n\nYou can see it try to take his breath.\n\nHe does not let it own his face.\n\nChug notices.\n\nThat too is familiar.\n\nCHUG:\n\nDon't talk.\n\nM.R:\n\nNo.\n\nYou finally found me.\n\nI'm absolutely going to talk.\n\nYassine,\n\nfrom a nearby blanket:\n\nHe sounds like he belongs here.\n\nAnnoying.\n\nM.R turns his head a little.\n\nStudies Yassine.\n\nSomething unreadable moves behind the eyes.\n\nThen gentleness.\n\nUnexpectedly.\n\nM.R:\n\nYou stayed.\n\nYASSINE:\n\nApparently that's my whole reputation.\n\nM.R almost smiles.\n\nThen the pain kills the attempt.\n\nM.R:\n\nGood reputation."},
  {t:"[SCENE 7 — WHO M.R IS NOW]\n\nBy morning everyone has met him.\n\nHarjeev hates that he sat up before permission.\n\nKnight hates that he clocked the sector layout in one glance.\n\nAddy hates that he immediately recognized her draw shoulder injury from posture alone.\n\nO.O hates that she does not hate him on sight.\n\nKais loves him in under thirty seconds for the same reason everyone else becomes careful:\n\nM.R looks wounded and still somehow radiates command without trying.\n\nKAIS:\n\nOh.\n\nYou're a dangerous one.\n\nM.R,\n\ndry:\n\nSays the man wearing absurd confidence as outerwear.\n\nKAIS clutches his chest in delight.\n\nKAIS:\n\nI adore him.\n\nSolo watches from the wall.\n\nSilent.\n\nHard to read.\n\nM.R sees him too.\n\nM.R:\n\nYou look like you broke a chain with attitude.\n\nSOLO:\n\nYou look like med forgot to finish the job.\n\nM.R:\n\nTrue.\n\nStill prettier though.\n\nThat finally cracks the room.\n\nEven O.O looks away to hide the laugh.\n\nEven Harjeev gives up pretending not to appreciate competent insolence."},
  {t:"[SCENE 8 — EIGHT TESTS THE CAMP]\n\nKaith's first direct strike comes while M.R can barely stand.\n\nNot a big attack.\n\nWorse.\n\nA precise one.\n\nThree challenger units hit three sectors at the exact same time:\n\nsouth brace,\n\nsignal corner,\n\nmed line.\n\nFormation break.\n\nNot casualty hunt.\n\nTrust break.\n\nKnight reacts immediately.\n\nBut the camp is half a breath off.\n\nOne breath is enough for Eight.\n\nO.O moves to signal.\n\nAddy covers south.\n\nSolo and Yassine cross to med.\n\nChug goes center.\n\nKais goes where the noise is worst because of course he does.\n\nM.R rises from the med cot anyway.\n\nHARJEEV:\n\nSit down before I nail you there.\n\nM.R:\n\nNo.\n\nWrong rotation.\n\nThe room pauses.\n\nBecause wounded men do not usually sound correct enough to stop trained fighters.\n\nM.R points.\n\nM.R:\n\nSolo,\n\ndon't cross med.\n\nHold the seam between med and signal.\n\nYassine,\n\nleft ladder to Addy's lane.\n\nKais,\n\nif you're going to be chaotic,\n\ndo it on the south flank where it helps.\n\nChug,\n\ncenter isn't center today.\n\nTake the cut behind the brace and kill the hinge unit.\n\nKnight watches him.\n\nOne second.\n\nThen:\n\nKNIGHT:\n\nDo it.\n\nAnd everyone does.\n\nBecause M.R was right.\n\nThe attack collapses in under forty seconds.\n\nKaith did not break the camp.\n\nHe learned it.\n\nThat may be worse."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 9 — KAITH'S MESSAGE]\n\nOne of the dead challengers carries a pinned plate on the inside of the armor.\n\nNot a full mark.\n\nA lesson tag.\n\nHARJEEV reads it.\n\n\"GOOD CAMP.\n\nBAD HABIT.\n\nYOU STILL TURN TOWARD THE LOUDEST DAMAGE.\"\n\nM.R holds out a hand.\n\nHarjeev gives him the plate without comment.\n\nM.R reads once.\n\nThen looks directly at Chug.\n\nM.R:\n\nHe's right.\n\nNo malice.\n\nNo softness either.\n\nJust the kind of truth only high-ranked friends ever got away with saying before the world ended.\n\nCHUG:\n\nI know.\n\nM.R nods once.\n\nSatisfied.\n\nOr maybe just unsurprised.\n\nYASSINE:\n\nI feel like he got introduced already being everyone's problem.\n\nKAIS:\n\nBest kind of introduction."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 10 — END OF 35]\n\nThat night Harjeev updates the board.\n\nM.R — MED / ACTIVE MIND\n\nNEONKD — SIGNAL LIMITED\n\nO.O — ACTIVE\n\nSOLO — RECOVERY ACTIVE\n\nKAIS — ACTIVE\n\nChug sees it and realizes how strange the camp has become.\n\nNames that were once rumors are now arguing over ration salt and sector assignments.\n\nGuide speaks low over the last lantern.\n\nGUIDE:\n\nCareful.\n\nSome returns arrive exactly when they can do the most damage.\n\nChug looks at M.R asleep upright against the med wall,\n\nas if even unconscious he refuses to fully let go of the room.\n\nCHUG:\n\nYeah.\n\nBut he does not sound convinced.\n\nSystem text flickers like a held breath.\n\nSYSTEM:\n\n\"ALLY M.R. — ARRIVED\"\n\n\"DRAKO 8 PRESSURE ACTIVE\"\n\n\"CAMP STATUS: STRAINED BUT INTACT\""},

  {t:'[EXPANDED ENCOUNTER — MED TRANSFER]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:"— END OF PART 35 —",end:true},
  // PART 36 — EIGHT BREAKS, CAMP HOLDS
  {part:36,t:"PART 36 — EIGHT BREAKS, CAMP HOLDS",col:'#d4a017'},
  {t:"[SCENE 1 — THE WOUNDED MAN WHO GIVES ORDERS]\n\nM.R should be resting.\n\nHarjeev says this four times before breakfast.\n\nM.R still ends up at the table.\n\nNot because he wants to dominate it.\n\nBecause people keep unconsciously leaving him the clearest angle.\n\nThat bothers Chug when he notices.\n\nThen bothers him more when he notices why:\n\nbecause it feels natural.\n\nM.R studies the board once and immediately points at the sectors Kaith touched.\n\nM.R:\n\nHe doesn't want our walls.\n\nHe wants our instincts.\n\nIf we keep answering noise with the same body shifts,\n\nhe'll split us where habits live.\n\nKnight folds his arms.\n\nKNIGHT:\n\nGo on.\n\nM.R:\n\nRotate false command twice a day.\n\nSwap med lane and signal lane guards.\n\nMake Harjeev call one wrong order in drills and punish whoever follows it automatically.\n\nForce people to check,\n\nnot obey.\n\nKaith is reading reflex.\n\nHarjeev is offended on principle.\n\nHARJEEV:\n\nI am not calling wrong orders in my own camp.\n\nM.R:\n\nThen call \"test order\" and punish speed anyway.\n\nSame result.\n\nMore dignity.\n\nHarjeev thinks.\n\nHates that he is thinking.\n\nFinally nods.\n\nHARJEEV:\n\nFine.\n\nBut if you collapse the stitches doing my work,\n\nI'm charging you for the bandages.\n\nKais claps quietly.\n\nKAIS:\n\nOh, this man is criminally useful.\n\nO.O:\n\nHe's exhausting.\n\nYASSINE:\n\nBoth can be true."},
  {t:"[SCENE 2 — KAITH SHOWS HIS FACE]\n\nBy noon Kaith finally appears in person.\n\nNot like Arowh.\n\nNot like Varkul.\n\nNot like Morvain.\n\nHe arrives inside a formation.\n\nSix challengers in exact spacing.\n\nThree support shooters.\n\nTwo chain hookers.\n\nOne shield front.\n\nKaith in the hollow center.\n\nArmor layered in sharp black geometry.\n\nEvery plate built to direct the eye somewhere wrong.\n\nTwin batons at the hips.\n\nFace hidden behind a segmented visor that makes even stillness look like tactic.\n\nKAITH:\n\nBetter.\n\nThe camp has begun to think.\n\nM.R doesn't rise.\n\nHe only watches from the table edge with a hand pressed to the stitched side.\n\nM.R:\n\nAnd he hates that.\n\nKaith hears him.\n\nTilts the visor.\n\nKAITH:\n\nTransferred alive.\n\nPoor energygement on our side.\n\nThe room goes colder.\n\nNot because of Kaith.\n\nBecause of the way M.R does not react outwardly at all.\n\nHe files that line away instead of bleeding on it.\n\nThat is more dangerous than anger.\n\nCHUG:\n\nYou touch him again,\n\nyou don't walk away.\n\nKAITH:\n\nNo.\n\nIf I touch him again,\n\nyour camp turns around itself before I need to finish the job.\n\nThat is Eight's whole doctrine.\n\nMake the group cut itself open."},
  {t:"[SCENE 3 — FALSE ORDER DRILL BECOMES REAL]\n\nHarjeev had just begun the false-order drill when Kaith arrived.\n\nGood.\n\nBad.\n\nUseful.\n\nHARJEEV:\n\nSouth line fall back—\n\nNo.\n\nHold.\n\nTest order.\n\nHold your actual sectors!\n\nThe challengers hit exactly then.\n\nWhich means Kaith had been reading the camp from before he showed himself.\n\nHalf the newer fighters almost move wrong.\n\nAlmost.\n\nM.R's voice cuts the air.\n\nNot loud.\n\nAbsolute.\n\nM.R:\n\nIgnore noise.\n\nWatch Knight's hand.\n\nKnight doesn't even flinch.\n\nHe simply raises two fingers and shifts them left.\n\nEveryone who should understands.\n\nThe line holds.\n\nKaith notices.\n\nAgain.\n\nKAITH:\n\nThere.\n\nThe wound talks.\n\nM.R:\n\nAnd you still don't understand what that means."},
  {t:"[SCENE 4 — CAMP FIGHT / FORMATION WAR]\n\nThis is the cleanest enemy assault yet.\n\nThat makes it horrifying.\n\nNo screaming.\n\nNo berserk rush.\n\nNo dramatic pressure.\n\nJust correct violence applied at correct intervals.\n\nAddy takes the first support shooter through the eye slit.\n\nO.O and Solo break the hookers before the med line gets entangled.\n\nYassine rotates to the left seam and catches the second shooter from below.\n\nKais turns one flank by making his spinning discs ricochet off the watchpost rails in a pattern nobody sane would predict.\n\nThe pattern works anyway.\n\nKAIS:\n\nI call this \"respectfully impossible.\"\n\nO.O:\n\nYou call everything something stupid.\n\nKAIS:\n\nAnd yet you keep using it.\n\nShe does.\n\nThat matters.\n\nChug drives for Kaith.\n\nStops halfway.\n\nBecause M.R had told him earlier:\n\nIf Eight wants center,\n\ndeny him prediction instead of speed.\n\nSo Chug veers.\n\nKills the shield front first.\n\nNot glamorous.\n\nCorrect.\n\nKaith sees it.\n\nAdjusts.\n\nToo late.\n\nKnight enters the opening."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 5 — M.R IN COMMAND]\n\nHarjeev is still running triage and sector allocation,\n\nbut the fight has two command centers now:\n\nthe Manager for logistics,\n\nM.R for battle pattern.\n\nThat should be impossible.\n\nInstead it works.\n\nM.R:\n\nNeon,\n\nping the false east route now.\n\nNeon is still technically limited.\n\nStill half-recovering.\n\nStill immediately obeys.\n\nNEONKD:\n\nOn it.\n\nSignal stones flash east.\n\nKaith's back pair reorients for a flank that doesn't exist.\n\nAddy punishes the turn.\n\nTwo arrows.\n\nTwo dropped supports.\n\nM.R:\n\nSolo,\n\ndon't chase.\n\nCut return.\n\nSOLO:\n\nAlready there.\n\nM.R:\n\nKais,\n\nmake noise south then break north.\n\nKAIS:\n\nThat's rude.\n\nI love it.\n\nHe does exactly that.\n\nKaith's formation bends wrong for one precious second.\n\nM.R:\n\nChug.\n\nNow.\n\nChug moves.\n\nRage 1 clean.\n\nNo waste.\n\nNo blind fury.\n\nJust sharpened acceleration.\n\nHe collides with Kaith at the gap the whole camp just built for him.\n\nThat feels different from the old days.\n\nBetter.\n\nLess lonely.\n\nMore deadly."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 6 — KAITH'S BREAK]\n\nKaith fights like architecture with fists.\n\nEvery strike trying to force Chug back into predictable lanes.\n\nEvery pivot setting the field for the next collapse.\n\nChug doesn't take the bait.\n\nHe lets Solo and O.O own the edges.\n\nLets Addy close sight lines.\n\nLets Yassine cut the retreat seam.\n\nLets Knight take the opposite shoulder.\n\nFor the first time Kaith's formation discipline turns into a cage around himself.\n\nKAITH:\n\n...There.\n\nCHUG:\n\nYeah.\n\nThere.\n\nKaith whips a baton across Chug's jaw and nearly steals the sentence with it.\n\nChug answers with the frame under the baton guard.\n\nPoint blank.\n\nCenter seam.\n\nKaith staggers.\n\nYassine is in immediately.\n\nLow cut.\n\nHigh reverse.\n\nO.O hits the wrist line from the blind side.\n\nKnight drives a short blade into the segmented visor gap.\n\nKaith drops to one knee.\n\nNot dead.\n\nWorse for him.\n\nAware.\n\nKAITH:\n\nYou have a camp now.\n\nM.R answers from the table.\n\nStill wounded.\n\nStill upright.\n\nStill impossible to ignore.\n\nM.R:\n\nYes.\n\nKaith turns his head slowly toward the sound.\n\nKAITH:\n\nThen it will hurt more when Six gets his teeth into it.\n\nM.R's face does not change.\n\nM.R:\n\nHe'll choke.\n\nThat line chills even Kaith.\n\nGood.\n\nChug tears the Eight mark from Kaith's chest harness and lets it fall into the dirt between them.\n\nCHUG:\n\nLeave.\n\nKaith rises with hard precision even while bleeding.\n\nKAITH:\n\nYou think mercy is structure.\n\nInteresting mistake.\n\nKNIGHT:\n\nNo.\n\nWe think message travel is useful.\n\nKaith studies them all once more.\n\nThen withdraws in perfect backward order.\n\nEven defeated,\n\nstill formatted."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 7 — THE THING ABOUT M.R]\n\nAfter the field quiets,\n\neveryone looks toward M.R without meaning to.\n\nThat is the thing about him.\n\nHe doesn't ask for center.\n\nHe becomes one.\n\nHarjeev notices it too.\n\nYou can tell because he hates it more professionally than everyone else.\n\nHARJEEV:\n\nBack on the cot.\n\nNow.\n\nM.R:\n\nNo.\n\nHARJEEV:\n\nThat was not a debate.\n\nM.R finally grimaces as the side wound catches up.\n\nHe sits because the body leaves him no graceful alternative.\n\nKAIS,\n\nsoftly to Yassine:\n\nHe's good enough to be annoying on moral grounds.\n\nYASSINE:\n\nYeah.\n\nI noticed.\n\nO.O watches M.R with the same unreadable severity she gave Knight when he first arrived.\n\nO.O:\n\nYou command like you knew all of us before we got cut apart.\n\nM.R looks at her.\n\nThen at the table.\n\nThen away.\n\nM.R:\n\nMaybe I did.\n\nNo one pushes further.\n\nNot because they are kind.\n\nBecause they all feel the line around that answer."},
  {t:"[SCENE 8 — NEON RETURNS PROPER]\n\nNeon comes down from the signal post under his own power for the first time after the fight.\n\nStill shaky.\n\nStill bright-eyed.\n\nStill too smart for his own safety.\n\nNEONKD:\n\nCan I officially complain now?\n\nBecause I hate being \"limited.\"\n\nHARJEEV:\n\nNo.\n\nNEONKD:\n\nCan I complain anyway?\n\nHARJEEV:\n\nYes.\n\nComplaining is not a combat role.\n\nKnight marks the board.\n\nNEONKD — ACTIVE SIGNAL / FIELD LIMITED removed.\n\nNEONKD — ACTIVE.\n\nNeon sees it and goes very still for one second.\n\nThen:\n\nNEONKD:\n\nNice.\n\nADDY:\n\nYeah.\n\nNEONKD:\n\nOkay.\n\nThat's actually nice.\n\nThat kind of admission costs him.\n\nWhich means camp has him more firmly now."},
  {t:"[SCENE 9 — END OF 36]\n\nAt night Harjeev updates the ledger.\n\nDRAKO NO.8 — KAITH\n\nDEFEATED\n\nNeon active.\n\nSolo route stable.\n\nO.O active.\n\nKais active.\n\nM.R med-active.\n\nAddy active.\n\nYassine active.\n\nChug very active and very annoying.\n\nHarjeev does not say the last one aloud.\n\nBut he writes something that suspiciously looks like it.\n\nGuide speaks over the quiet.\n\nGUIDE:\n\nSix does not attack walls.\n\nSix attacks movement after decision.\n\nKnight answers before Chug can.\n\nKNIGHT:\n\nThen we prepare to be hunted.\n\nM.R opens one eye from the cot.\n\nM.R:\n\nNo.\n\nWe prepare to make the hunt expensive.\n\nThat lands like old rank speaking through new pain.\n\nSystem text burns cold and certain.\n\nSYSTEM:\n\n\"DRAKO 8 STATUS: DOWN\"\n\n\"ALLY NEONKD — FULL ACTIVE STATUS\"\n\n\"CAMP STATUS: MULTI-COMMAND VIABLE\""},

  {t:'[BOSS GATE — Nexter No.4 Rhaziel]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for EIGHT BREAKS, CAMP HOLDS.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.4 RHAZIEL',fight:8},
  {t:"— END OF PART 36 —",end:true},
  // PART 37 — JUNO HUNTS
  {part:37,t:"PART 37 — JUNO HUNTS",col:'#d4a017'},
  {t:"[SCENE 1 — TOO MANY ACTIVE NAMES]\n\nThe board is crowded now.\n\nChug.\n\nYassine.\n\nAddy.\n\nSolo.\n\nO.O.\n\nNeonKd.\n\nKais.\n\nKnight.\n\nHarjeev.\n\nM.R.\n\nTora's ring.\n\nTwo marks still waiting farther down the line.\n\nREE.\n\nFRIEND.\n\nCamp has become the kind of place losses return to.\n\nThat is beautiful.\n\nThat is dangerous.\n\nThat is exactly why Seven comes.\n\nJuno's first sign is not an attack.\n\nIt is a missing patrol.\n\nTwo outer scouts fail to return.\n\nThen a third.\n\nNo bodies.\n\nNo blood.\n\nJust route silence.\n\nKnight goes colder than usual.\n\nThat is saying something.\n\nKNIGHT:\n\nSeven.\n\nCHUG:\n\nDread Juno.\n\nKNIGHT:\n\nPursuit collapse.\n\nHunter doctrine.\n\nHe doesn't crack camps.\n\nHe peels people away until camp cracks itself reaching after them.\n\nM.R,\n\nstill pale but upright:\n\nThen no one leaves alone.\n\nNot even to piss on a wall.\n\nHarjeev points with the pen.\n\nHARJEEV:\n\nFinally.\n\nA sentence I want carved into wood.\n\nYASSINE:\n\nHe's fitting in disturbingly well.\n\nADDY:\n\nI know.\n\nI hate how easy it feels.\n\nO.O:\n\nEasy is not the word.\n\nShe doesn't finish the thought.\n\nDoesn't need to."},
  {t:"[SCENE 2 — KAIS AND M.R]\n\nKais finds M.R near the med shade before noon,\n\nworking a route diagram with one hand because the other side still hurts too much to fake strength convincingly.\n\nKAIS:\n\nYou do realize resting is a sacred art.\n\nM.R:\n\nI rest when structure holds without me.\n\nKAIS:\n\nAh.\n\nOne of those.\n\nM.R glances up.\n\nM.R:\n\nAnd you're one of those.\n\nKAIS:\n\nThe charming kind?\n\nYes.\n\nM.R:\n\nThe kind that smiles when thinking gets dangerous.\n\nKais grins,\n\ncaught exactly enough to enjoy it.\n\nKAIS:\n\nI knew you were my kind of headache.\n\nHe drops into a seat opposite and spins one disc across the table.\n\nM.R stops it without looking,\n\ntwo fingers clean on the edge.\n\nKAIS:\n\nWell now.\n\nThat was rude.\n\nM.R:\n\nNo.\n\nThat was accurate.\n\nThey look at each other for one long second.\n\nDifferent men.\n\nDifferent energies.\n\nBoth impossible in different directions.\n\nKais is delighted.\n\nM.R almost is."},
  {t:"[SCENE 3 — SOLO'S ACTIVE RETURN]\n\nKnight finally removes Solo's LIMITED marker.\n\nNot ceremonially.\n\nJust with the knife tip.\n\nSOLO notices anyway.\n\nSOLO:\n\nAbout time.\n\nKNIGHT:\n\nProve me right.\n\nSOLO:\n\nI plan to.\n\nYASSINE:\n\nWhat does Solo fight like when he's fully awake?\n\nADDY:\n\nLike a door deciding violence was a language.\n\nSOLO:\n\nAccurate.\n\nRAEVAN hands Solo a chain-sickle hybrid built from camp parts and old restraint metal.\n\nRAEVAN:\n\nYou liked the chain when you were angry.\n\nSOLO tests the weight.\n\nIt settles.\n\nGood.\n\nSOLO:\n\nYeah.\n\nThis works.\n\nM.R watches the exchange from across the yard.\n\nM.R:\n\nNo flourish on the second pull.\n\nYou'll open your own shoulder.\n\nSolo turns toward him.\n\nSOLO:\n\nYou remember that?\n\nM.R:\n\nI remember winning arguments with you.\n\nSame muscle group.\n\nThat lands with the old familiarity of people who used to rank each other without needing numbers explained."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 4 — FIRST PURSUIT LOSS]\n\nThe first true Juno strike happens on a supply run that should have been too small to matter.\n\nExactly why it matters.\n\nHarjeev sent two load-bearers and one guard to the east cache.\n\nThey never reach it.\n\nNot dead.\n\nWorse.\n\nFound later hanging from a route tree under black cords with their weapons arranged in a circle around them.\n\nAlive.\n\nShaking.\n\nUnable to explain how far they ran before realizing they were running in someone else's direction.\n\nJuno doesn't kill.\n\nHe teaches panic.\n\nHarjeev stares at the recovered guard for a long time.\n\nHARJEEV:\n\nNo more small runs.\n\nKNIGHT:\n\nAgreed.\n\nCHUG:\n\nThen we bait him.\n\nKNIGHT:\n\nYes.\n\nBut not like a hero.\n\nLike a hunter.\n\nThat difference is everything."},
  {t:"[SCENE 5 — O.O GETS REAL]\n\nO.O volunteers first.\n\nO.O:\n\nUse me.\n\nSilence answers.\n\nNot refusal.\n\nCalculation.\n\nO.O:\n\nHe wants motion with edges.\n\nI am motion with edges.\n\nUse me.\n\nAddy studies her.\n\nThen nods once.\n\nADDY:\n\nI'll cover.\n\nYASSINE:\n\nI'll shadow.\n\nSOLO:\n\nI'll close the back cut.\n\nKNIGHT:\n\nNo.\n\nEveryone looks at him.\n\nKNIGHT:\n\nWe do not feed Seven one sharp fighter and call it strategy.\n\nWe build him a pursuit he can't finish.\n\nM.R,\n\nfrom the med post:\n\nThen pair O.O with Kais.\n\nThat gets immediate reactions.\n\nO.O:\n\nNo.\n\nKAIS:\n\nYes.\n\nM.R ignores both.\n\nM.R:\n\nSeven wants seriousness to isolate itself.\n\nGive him one blade he can read,\n\nand one disaster he can't.\n\nKais puts a hand to his chest,\n\noffended and delighted at once.\n\nKAIS:\n\nI am a crafted man,\n\nnot a disaster.\n\nO.O:\n\nYou're both.\n\nKnight thinks one second.\n\nThen nods.\n\nKNIGHT:\n\nDone.\n\nO.O hates it.\n\nWhich means it is probably correct."},
  {t:"[SCENE 6 — HUNT BAIT]\n\nThe bait route begins at dusk.\n\nO.O and Kais take the visible track.\n\nDeliberately.\n\nAddy high cover.\n\nYassine ghosting the lower path.\n\nSolo cutting rear return.\n\nChug and Knight holding the choke point where pursuit should become overconfidence.\n\nNeon in signal relay.\n\nHarjeev coordinating fallback.\n\nM.R at the table despite everyone pretending they don't notice they keep checking whether he's still upright.\n\nJuno comes invisible at first.\n\nThen the signs.\n\nBroken reeds pointing the wrong way.\n\nOne thrown knife left where only O.O would see it.\n\nA coin Kais dropped returned to his pocket without him noticing.\n\nKAIS:\n\nOh,\n\nnow that's personal.\n\nO.O:\n\nStop smiling.\n\nKAIS:\n\nCan't.\n\nI'm being professionally courted.\n\nThen the first cut lands.\n\nNot on flesh.\n\nOn Kais's coat hem.\n\nA warning.\n\nA measurement.\n\nJUNO:\n\nToo loud.\n\nThe voice is close.\n\nThen far.\n\nThen behind.\n\nThen nowhere.\n\nO.O doesn't answer.\n\nGood.\n\nShe learns fast.\n\nKais answers anyway.\n\nKAIS:\n\nAnd you're too shy.\n\nThat gets him a second cut.\n\nAcross the hat brim this time.\n\nKAIS:\n\nUnforgivable."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 7 — DREAD JUNO APPEARS]\n\nHe finally shows when Kais deliberately trips one false line and pretends worse balance than he has.\n\nJuno drops from an overhead support with no wasted shadow.\n\nLean.\n\nLong-limbed.\n\nDark pursuit harness packed tight to the body.\n\nNo heavy armor.\n\nNo unnecessary plates.\n\nJust movement engineered to become fear.\n\nTwin hooked knives.\n\nMask smooth as old bone.\n\nOne red stitch line running vertically from forehead to chin.\n\nDREAD JUNO:\n\nThe clown was bait.\n\nUnexpectedly decent bait.\n\nKAIS:\n\nThank you.\n\nI'm also available for weddings.\n\nO.O is already moving.\n\nJuno expected that.\n\nHe expected Kais too.\n\nWhat he does not expect is the distance between them not staying honest,\n\nbecause Addy and Neon have already altered the chase arcs with signal pings and arrow impacts.\n\nKnight's trap begins."},
  {t:"[SCENE 8 — JUNO'S HUNT REVERSED]\n\nYassine closes the lower route.\n\nSolo drops the rear chain line.\n\nChug and Knight rise from the choke seam.\n\nFor the first time in a long while,\n\nthe hunter is the one inside the pattern.\n\nJuno doesn't panic.\n\nThat makes him worthy of the rank.\n\nHe smiles under the mask anyway.\n\nYou can hear it.\n\nDREAD JUNO:\n\nBetter.\n\nNow someone here understands movement.\n\nKAIS:\n\nWe have several someones.\n\nVery inconvenient for you.\n\nThe fight is vicious and narrow.\n\nNo room for speeches.\n\nOnly pursuit physics.\n\nChug misses once and Juno is already at his flank.\n\nO.O takes the angle.\n\nKais ruins the next line with a spinning ricochet Juno couldn't predict.\n\nYassine's blade catches cloth.\n\nSolo's chain-sickle catches the hook line.\n\nAddy's arrow forces the leap earlier than Juno wanted.\n\nKnight turns the early leap into a bad landing.\n\nJuno is still terrifying.\n\nStill nearly impossible to hold.\n\nStill finally in danger.\n\nHe takes a cut across the side.\n\nThen another.\n\nThen a frame-bolt through the outer thigh.\n\nHe laughs.\n\nDREAD JUNO:\n\nThere.\n\nYou learned.\n\nCHUG:\n\nYeah.\n\nNow stay down.\n\nJuno doesn't.\n\nOf course he doesn't.\n\nHe rips the bolt free and backs through the pursuit lane in perfect retreat order.\n\nKNIGHT:\n\nNo chase!\n\nEveryone obeys.\n\nGood.\n\nThat is new too.\n\nJuno pauses at the last dark seam.\n\nDREAD JUNO:\n\nSix will starve you better than I can.\n\nI was sent to see if you know how to keep names from running after ghosts.\n\nHe touches the cut in his side.\n\nLooks at the blood.\n\nThen at O.O and Kais.\n\nDREAD JUNO:\n\nInteresting pair.\n\nThen he is gone."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 9 — END OF 37]\n\nBack at camp,\n\nHarjeev writes without looking up.\n\nJUNO — NOT DOWN.\n\nPATTERN LEARNED.\n\nChug reads that and frowns.\n\nCHUG:\n\nNot down?\n\nHARJEEV:\n\nNot down.\n\nYou asked for accuracy.\n\nManagers remember.\n\nM.R,\n\nfrom the cot:\n\nGood.\n\nThen we don't mistake one wounded hunter for a won route.\n\nO.O cleans her blades.\n\nO.O:\n\nI still hate him.\n\nKAIS:\n\nExcellent.\n\nHatred with standards is the beginning of teamwork.\n\nO.O:\n\nIf you say one more thing like that,\n\nI'll remove your smile by hand.\n\nKais grins wider.\n\nSystem text burns low but not victorious.\n\nSYSTEM:\n\n\"DRAKO 7 STATUS: ACTIVE / WOUNDED\"\n\n\"ALLY SOLO — FULL ACTIVE STATUS\""},

  {t:'[EXPANDED ENCOUNTER — JUNO HUNTS]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:3},
  {t:"— END OF PART 37 —",end:true},
  // PART 38 — SEVEN DOWN
  {part:38,t:"PART 38 — SEVEN DOWN",col:'#d4a017'},
  {t:"[SCENE 1 — THE HUNTER COMES BACK]\n\nJuno does not wait long.\n\nWounded hunters rarely do.\n\nPain makes some men cautious.\n\nIt makes others impatient.\n\nDread Juno belongs to the second kind.\n\nThree nights after the first trap,\n\nthe camp lights die in sequence.\n\nNorth.\n\nSouth.\n\nWest.\n\nNot by wind.\n\nBy cut.\n\nThen the signal stones blink emergency red.\n\nNEONKD:\n\nHe's inside the outer rings!\n\nEveryone moves before Knight speaks.\n\nGood.\n\nThen Knight speaks anyway.\n\nKNIGHT:\n\nSector hold!\n\nNo lone pursuit!\n\nJuno wanted panic.\n\nHe gets structure.\n\nBad trade for him."},
  {t:"[SCENE 2 — M.R REFUSES THE COT]\n\nHarjeev physically blocks M.R's way as the wounded man tries to rise.\n\nHARJEEV:\n\nNo.\n\nM.R:\n\nMove.\n\nHARJEEV:\n\nStill no.\n\nM.R puts one hand on the table to steady the side wound and looks at him with the kind of patience that outranks anger.\n\nM.R:\n\nIf Seven is inside the rings,\n\na static brain is more useful than a resting body.\n\nHarjeev hates that sentence because it is true.\n\nHARJEEV:\n\nThen sit.\n\nAnd command from there.\n\nIf you tear those stitches,\n\nI will recover you personally just to shout while sewing.\n\nM.R actually inclines his head.\n\nCompromise accepted.\n\nThat too is a kind of leadership."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 3 — THE CHASE THROUGH CAMP]\n\nJuno moves through camp like an accusation.\n\nFast.\n\nPrecise.\n\nNever where the fear says he should be.\n\nAlways where the line almost thins.\n\nHe cuts one rope support.\n\nThen a water sling.\n\nThen a signal cord.\n\nTiny damages.\n\nCumulative panic.\n\nAddy tracks him from the roof.\n\nMisses once on purpose because the angle isn't clean.\n\nHits the second time when O.O forces the lane.\n\nSolo seals the south gap.\n\nYassine rotates.\n\nKais throws noise into the dark like he is conducting an invisible orchestra.\n\nKAIS:\n\nCome on,\n\ngrave-face!\n\nIf you're going to stalk us,\n\nat least commit artistically!\n\nJuno answers by nearly taking Kais's ear off.\n\nKAIS:\n\nSee?\n\nPersonal growth.\n\nO.O:\n\nYou are exhausting."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 4 — M.R'S CALL]\n\nThe whole camp starts over-rotating toward one cut lane.\n\nExactly what Juno wants.\n\nM.R sees it from the table first.\n\nM.R:\n\nStop turning center!\n\nHe's baiting weight through memory!\n\nHold your first assignments!\n\nThat line snaps the whole pattern back into shape.\n\nChug hears the call and obeys instantly.\n\nSo does Solo.\n\nSo does O.O.\n\nEven Addy shifts target priority without needing it repeated.\n\nJuno notices.\n\nOf course he does.\n\nHe appears atop the med awning for one heartbeat just to look at M.R.\n\nDREAD JUNO:\n\nYou.\n\nM.R's face does not move.\n\nM.R:\n\nMe.\n\nSomething unreadable passes between them.\n\nRecognition?\n\nHistory?\n\nA line from a road Chug never walked?\n\nNot time to ask.\n\nGood.\n\nQuestions are expensive during hunts."},
  {t:"[SCENE 5 — THE LAST CHASE]\n\nKnight changes the camp pattern mid-fight.\n\nNot spoken.\n\nHand signs.\n\nThe camp answers.\n\nYassine and O.O become the forward blades.\n\nSolo and Chug become the walls closing behind pursuit.\n\nAddy takes Juno's exits.\n\nKais ruins whatever elegance remains.\n\nThis time when Juno cuts through the east brace,\n\nhe finds not panic,\n\nbut prepared emptiness.\n\nNo one there.\n\nNo momentum to steal.\n\nHe lands in a kill box.\n\nDREAD JUNO:\n\n...Good.\n\nO.O is first.\n\nKnife to wrist.\n\nNot deep.\n\nExact.\n\nYassine second.\n\nLow cross to ankle.\n\nChug third.\n\nRage 1 burst into center.\n\nSolo fourth.\n\nChain-sickle across retreat lane.\n\nAddy fifth.\n\nArrow through cloak tie,\n\npinning motion to air for half a second.\n\nKais only laughs.\n\nKAIS:\n\nThere.\n\nNow it's a proper party.\n\nThat half second is all Knight needs.\n\nHe steps in and cuts Juno's mask cleanly from brow to mouth.\n\nThe mask splits.\n\nFalls.\n\nJuno's face beneath is younger than Chug expected.\n\nTired.\n\nSharp.\n\nAlmost beautiful in the wrong way.\n\nA hunter made into doctrine before he had time to become a man.\n\nDREAD JUNO:\n\nShould've left when Seven said go.\n\nCHUG:\n\nShould've stayed gone when we said no.\n\nFrame-bolt.\n\nPoint blank.\n\nShoulder seam.\n\nJuno drops."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 6 — SEVEN FALLS]\n\nHe does not try to rise fast this time.\n\nOnly once.\n\nOnce is enough to prove the spine is still made of hunt.\n\nThen Solo's chain locks the wrist.\n\nO.O's blade settles at the throat.\n\nAddy's arrow finds the heartline.\n\nKnight stands over the center.\n\nJuno looks up at all of them.\n\nNot angry.\n\nNot broken.\n\nEvaluating to the end.\n\nDREAD JUNO:\n\nYou built the camp right.\n\nThat's why this hurts.\n\nM.R's voice carries from the table even now.\n\nM.R:\n\nThen remember it while leaving.\n\nJuno laughs once.\n\nSmall.\n\nAlmost respectful.\n\nDREAD JUNO:\n\nSo that's where they put you.\n\nThat line freezes the air harder than blood does.\n\nChug hears it.\n\nFiles it.\n\nDoes not turn.\n\nGood.\n\nA month ago he would've ruined the moment.\n\nNot now.\n\nJuno unclasps the Seven mark himself and lets it fall.\n\nDREAD JUNO:\n\nTell Six starvation is harder when the meal starts hunting back.\n\nHe withdraws under his own feet.\n\nSlowly.\n\nNot because he wants dignity.\n\nBecause the camp took speed from him.\n\nThat matters more."},
  {t:"[SCENE 7 — THE QUESTION NO ONE ASKS PROPERLY]\n\nAfter the lights are restored and Harjeev has finished insulting everyone back into calm,\n\nChug finds M.R still at the table,\n\nbreathing a little too carefully.\n\nCHUG:\n\nHe knew you.\n\nM.R:\n\nYes.\n\nCHUG:\n\nFrom where?\n\nM.R:\n\nRoads.\n\nCHUG:\n\nThat's not an answer.\n\nM.R:\n\nIt's the one you get tonight.\n\nChug hates that.\n\nWhich means he believes it enough not to force the rest.\n\nAnnoying restraint.\n\nUseful restraint.\n\nYASSINE,\n\nsitting nearby with a fresh wrap on one forearm:\n\nYou really do talk like the room belongs to you.\n\nM.R glances at him.\n\nM.R:\n\nNo.\n\nI talk like I prefer rooms not to fall apart.\n\nKAIS,\n\nfrom the other side of the table:\n\nSame thing in better shoes.\n\nThat actually gets a tired look from M.R that might one day become friendship.\n\nMight."},
  {t:"[SCENE 8 — END OF 38]\n\nHarjeev updates the ledger.\n\nDRAKO NO.7 — DREAD JUNO\n\nDEFEATED\n\nThen,\n\nafter a long pause,\n\na second note:\n\nM.R — KNOWN TO ENEMY COMMAND\n\nHe doesn't explain why he wrote it.\n\nDoesn't need to.\n\nEveryone sees it.\n\nNo one comments first.\n\nBecause that line is a future knife.\n\nNot tonight's.\n\nKais leans back in the chair and tips his hat over one eye.\n\nKAIS:\n\nGood camp.\n\nTerrible sleep quality.\n\nO.O:\n\nLeave if you're tired.\n\nKAIS:\n\nNo.\n\nI just got invested.\n\nSystem text burns clear.\n\nSYSTEM:\n\n\"DRAKO 7 STATUS: DOWN\"\n\n\"ALLY O.O — FULL ACTIVE STATUS\"\n\n\"THREAT NOTE: ENEMY RECOGNIZES M.R.\""},

  {t:'[BOSS GATE — Drako No.6 Tyrvak]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for SEVEN DOWN.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.6 TYRVAK',fight:10},
  {t:"— END OF PART 38 —",end:true},
  // PART 39 — SIX STARVES
  {part:39,t:"PART 39 — SIX STARVES",col:'#d4a017'},
  {t:"[SCENE 1 — AFTER THE HUNTER]\n\nCamp should feel safer after Seven falls.\n\nIt doesn't.\n\nThat is how they know Six is worse.\n\nAttrition doesn't announce itself with spectacle.\n\nIt enters through numbers.\n\nSleep debt.\n\nFood count.\n\nArrow stock.\n\nFrayed cord.\n\nOld wounds reopening.\n\nPeople choosing the shorter walk because the longer one costs too much.\n\nHarjeev notices first.\n\nOf course.\n\nHARJEEV:\n\nWater down one crate.\n\nBolt stock low.\n\nBandage cloth insufficient for another big field.\n\nAnd somebody keeps stealing salt.\n\nEveryone looks at Kais.\n\nKAIS:\n\nI cook better with seasoning.\n\nHARJEEV:\n\nYou burn water.\n\nKAIS:\n\nOnly when distracted beautifully.\n\nNo one laughs.\n\nThat is the problem.\n\nThe camp is tired.\n\nSix feeds on tired.\n\nKNIGHT:\n\nRhaziel.\n\nCHUG:\n\nAttrition lord.\n\nKNIGHT:\n\nHe won't rush.\n\nHe'll make every victory cost twice what it paid.\n\nM.R,\n\nsoftly:\n\nThen we stop spending like frightened men.\n\nEveryone looks at him because the sentence is too correct to ignore."},
  {t:"[SCENE 2 — RHaziel's method]\n\nThe first Rhaziel crew doesn't attack walls.\n\nIt attacks supplies in motion.\n\nA med courier half-route gets intercepted.\n\nNot killed.\n\nStripped.\n\nLeft alive with one message pinned to the empty pack frame.\n\n\"STARVE BETTER.\"\n\nHarjeev reads it,\n\nfolds it once,\n\nand says nothing for a dangerous amount of time.\n\nThen:\n\nHARJEEV:\n\nNo more linear supply runs.\n\nEverything rotates.\n\nEverything doubles back.\n\nNo container leaves camp without false cargo.\n\nNo one travels without a second purpose.\n\nKnight nods once.\n\nKNIGHT:\n\nGood.\n\nChug watches Harjeev then.\n\nReally watches.\n\nThe man isn't just keeping lists.\n\nHe's keeping war from becoming panic through accounting.\n\nThat matters.\n\nMaybe more than blades on days like this."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 3 — M.R STEPS INTO THE WORK]\n\nM.R can stand longer now.\n\nNot fully.\n\nEnough.\n\nHe refuses field duty.\n\nCorrectly.\n\nInstead he takes the table apart and rebuilds the whole route board into sections:\n\nfood,\n\nmed,\n\nsignal,\n\nfighter readiness,\n\nfalse routes,\n\ntrue routes,\n\nbait routes.\n\nHARJEEV stares.\n\nHARJEEV:\n\nYou've done this before.\n\nM.R:\n\nYes.\n\nHARJEEV:\n\nAt this scale?\n\nM.R:\n\nWorse.\n\nThat line should mean comfort.\n\nInstead it raises ten more questions.\n\nNeon watches M.R adjust signal priorities.\n\nNEONKD:\n\nYou think like a person who moved groups,\n\nnot just friends.\n\nM.R doesn't look at him.\n\nM.R:\n\nFriends are just groups you bleed for faster.\n\nThat answer is honest enough to make the room quieter."},
  {t:"[SCENE 4 — RHazIEL'S FACE]\n\nSix arrives on the third day of shortage.\n\nNo grand entrance.\n\nNo cliff silhouette.\n\nHe simply walks with the next stripped convoy like he has always been part of the line.\n\nRhaziel is tall in the way famine is.\n\nNot massive.\n\nWasting.\n\nLong dark coat over armor built like overlapping blade-thin ribs.\n\nA hooked polearm in one hand.\n\nThe other holding a water ration skin he tears open and pours into the dirt while watching the camp.\n\nEveryone hates him instantly.\n\nGood.\n\nSome enemies earn it clean.\n\nRHAZIEL:\n\nYou rebuilt faster than your stores did.\n\nPrideful choice.\n\nHARJEEV actually steps forward before Chug does.\n\nHARJEEV:\n\nYou touch another crate,\n\nI skin you down to arithmetic.\n\nRhaziel smiles.\n\nThin.\n\nCruel.\n\nInterested.\n\nRHAZIEL:\n\nAh.\n\nThe man who understands war in honest units.\n\nM.R rises from the table behind Harjeev.\n\nStill pale.\n\nStill not fully healed.\n\nStill enough.\n\nM.R:\n\nAnd the parasite who mistakes thinning a line for superiority.\n\nRhaziel's gaze shifts.\n\nRHAZIEL:\n\nThere you are.\n\nAgain.\n\nEnemy recognition.\n\nAgain.\n\nChug feels the board under his ribs change.\n\nAgain."},
  {t:"[SCENE 5 — SIEGE INSIDE THE PERIMETER]\n\nRhaziel doesn't storm the camp.\n\nHe enters it like scarcity made flesh.\n\nBehind him,\n\nsix lean attrition crews spread to exactly the points where camp repairs are newest.\n\nThey know what to cut because they've been taught what cost the most to replace.\n\nKNIGHT:\n\nAll sectors hold.\n\nNo chase.\n\nNo loose heroics.\n\nWe win by keeping more than we spend.\n\nThat is Six's fight.\n\nResource against resource.\n\nStructure against hunger.\n\nAddy and O.O take alternating high lines.\n\nYassine and Solo work the moving kill seams.\n\nKais and Chug rotate impact response.\n\nKnight runs center.\n\nHarjeev and Neon protect the stores and signal grid.\n\nM.R refuses the cot and takes the board.\n\nHARJEEV:\n\nYou tear the side open and I swear on every ledger I own—\n\nM.R:\n\nThen keep me alive and complain later.\n\nHarjeev hates that he cannot argue."},
  {t:"[SCENE 6 — CAMP BURNS SLOW]\n\nThe fight drags.\n\nThat is what Rhaziel wants.\n\nNot seconds.\n\nMinutes.\n\nEvery minute costs cloth.\n\nWater.\n\nBreath.\n\nFocus.\n\nRhaziel's crews never overcommit.\n\nThey damage and withdraw.\n\nDamage and withdraw.\n\nIf Addy fires,\n\nthey change cover.\n\nIf Yassine kills one,\n\nanother steals the med minute.\n\nIf Chug crushes a flank,\n\nRhaziel takes a ration line.\n\nIt is infuriating.\n\nIt is brilliant.\n\nKAIS,\n\nwhile deflecting a hooked blade with a spinning disc:\n\nI hate competent cruelty.\n\nIt has no sense of theater.\n\nRHAZIEL,\n\nfrom three sectors away:\n\nAnd yet you keep performing.\n\nKAIS:\n\nSomeone has to improve the scenery.\n\nThe joke buys Yassine one second.\n\nEnough to keep a med strap from being cut.\n\nSometimes Kais's ridiculousness is a combat contribution.\n\nAnnoying.\n\nUseful.\n\nCamp logic."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 7 — M.R IN FIELD LIMITS]\n\nThen the worst thing happens.\n\nThe signal grid gets hit.\n\nNeon takes a cut across the hand.\n\nHarjeev loses the med count in a spilled crate.\n\nKnight is tied up center.\n\nChug is too far left.\n\nAnd Rhaziel turns toward the table.\n\nStraight toward M.R.\n\nEveryone sees it.\n\nNo one gets there in time.\n\nRHAZIEL:\n\nYou command from furniture now?\n\nHow diminished.\n\nM.R is already standing.\n\nOne hand to the side wound.\n\nOne knife in the other he somehow had before anyone noticed.\n\nOf course he did.\n\nM.R:\n\nStill enough.\n\nRhaziel attacks.\n\nFast for a man that lean.\n\nThe polearm not swung wide.\n\nNeedled.\n\nPrecise.\n\nBuilt to make movement expensive.\n\nM.R does not win the exchange.\n\nHe survives it.\n\nThat matters.\n\nOne step back.\n\nTable edge to redirect.\n\nKnife to shaft.\n\nChair kick to lower balance.\n\nNo wasted panic.\n\nOnly bought time.\n\nTime is what the camp needs.\n\nChug sees the line and opens Rage 1 so hard Kaizen would hate it if he were closer.\n\nToo late to hate.\n\nGood enough to matter.\n\nHe crosses the whole center lane and hits Rhaziel before the second killing line lands.\n\nThe table splits.\n\nThe strike doesn't."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 8 — STARVING SIX]\n\nNow Rhaziel has Chug in front,\n\nKais at one side,\n\nSolo and Yassine closing,\n\nO.O and Addy controlling his exits,\n\nKnight cutting the only honest retreat,\n\nHarjeev screaming inventory numbers like curses,\n\nNeon rebuilding the signal lane one-handed,\n\nand M.R still upright behind the broken table because some men are too proud to collapse on schedule.\n\nRhaziel hates this.\n\nGood.\n\nRHAZIEL:\n\nYou spent too much to get here.\n\nM.R answers first,\n\nvoice rough from the wound and the refusal to yield:\n\nM.R:\n\nWrong.\n\nWe invested.\n\nThat line lands on everyone.\n\nNot just Rhaziel.\n\nEven Harjeev hears it.\n\nAnd Harjeev loves a sentence that turns survival into math without killing its soul.\n\nKnight takes the cue.\n\nKNIGHT:\n\nCollapse the polearm line!\n\nAddy pins the outer grip.\n\nO.O severs the sling tie.\n\nSolo catches the shaft with chain.\n\nYassine cuts under the elbow seam.\n\nKais ricochets a disc off the shattered table into the knee lock.\n\nChug drives the frame-bolt straight through the exposed rib-plate junction.\n\nRhaziel folds around the hit.\n\nNot dramatically.\n\nHungrily.\n\nLike he's still trying to count whether the camp paid too much even while losing.\n\nChug takes the Six mark from his chest harness himself.\n\nCHUG:\n\nWrong again.\n\nRhaziel spits blood at the dirt.\n\nRHAZIEL:\n\nMaybe.\n\nBut your stores are still lower than your pride.\n\nHARJEEV,\n\nimmediately:\n\nNot after I inventory your convoy.\n\nThat is such a Harjeev line that even Rhaziel goes still for one second.\n\nGood.\n\nThat second is enough.\n\nKnight's blade at throat.\n\nNo chase.\n\nNo overkill.\n\nNo foolishness.\n\nRhaziel withdraws because the board says he lost.\n\nNot because mercy moved him.\n\nThat is fine.\n\nVictory doesn't need his feelings."},
  {t:"[SCENE 9 — WHAT M.R COST]\n\nWhen the field finally quiets,\n\nM.R sits down too fast.\n\nThe side wound opened.\n\nNot badly.\n\nEnough.\n\nHarjeev is on him immediately.\n\nHARJEEV:\n\nYou impossible bastard.\n\nM.R:\n\nUseful bastard.\n\nHARJEEV:\n\nThat is not a defense.\n\nM.R:\n\nIt should be.\n\nHarjeev is too busy saving him to answer.\n\nChug kneels on the other side.\n\nToo angry to speak properly.\n\nM.R notices.\n\nOf course he does.\n\nM.R:\n\nDon't.\n\nCHUG:\n\nDon't what?\n\nM.R:\n\nTurn this into guilt.\n\nI stood because it was correct.\n\nThat answer feels old.\n\nFamiliar.\n\nHigh-rank friend old.\n\nThe kind that used to settle arguments by saying the sharpest truth first.\n\nChug hates how much he missed that voice before he knew he had."},
  {t:"[SCENE 10 — END OF 39]\n\nThe camp survives Six.\n\nNot gracefully.\n\nNot cheaply.\n\nBut properly.\n\nHarjeev inventories the captured convoy by lantern light.\n\nWater.\n\nMed cloth.\n\nSalt.\n\nOil.\n\nNeedle packs.\n\nThree spare bowstrings.\n\nOne signal battery.\n\nTwo ration crates.\n\nAnd a set of black med clamps stamped with transfer code.\n\nM.R sees those clamps and goes very still.\n\nToo still.\n\nOnly Chug notices.\n\nThat matters too.\n\nNo question yet.\n\nNot tonight.\n\nHarjeev writes:\n\nDRAKO NO.6 — RHAZIEL\n\nDEFEATED\n\nBelow it:\n\nCONVOY CAPTURED\n\nLOSS ACCEPTABLE\n\nTABLE DESTROYED / REBUILD REQUIRED\n\nKais rests both boots on the broken remains of the old table and grins into the smoke.\n\nKAIS:\n\nWell.\n\nIf you're going to build a legend,\n\nat least you picked entertaining methods.\n\nSystem text burns like tired iron.\n\nSYSTEM:\n\n\"DRAKO 6 STATUS: DOWN\"\n\n\"RESOURCE SWING: POSITIVE\"\n\n\"M.R. CONDITION: WORSENED / STABLE\""},

  {t:'[EXPANDED ENCOUNTER — SIX STARVES]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:8},
  {t:"— END OF PART 39 —",end:true},
  // PART 40 — THE SECOND TABLE
  {part:40,t:"PART 40 — THE SECOND TABLE",col:'#d4a017'},
  {t:"[SCENE 1 — AFTER SIX]\n\nCamp smells like splintered wood,\n\nhot metal,\n\nmedicine,\n\nand survival expensive enough to be respected.\n\nThe old table is gone.\n\nIn pieces.\n\nUsed as brace,\n\ncover,\n\nweapon,\n\nand sacrifice.\n\nHarjeev mourns it like a competent soldier.\n\nThat is to say:\n\nhe doesn't.\n\nHe rebuilds.\n\nHARJEEV:\n\nNo one talk to me until this leg is level.\n\nKAIS:\n\nIs that a threat or a prayer.\n\nHARJEEV:\n\nBoth.\n\nThe captured convoy changed everything.\n\nFor the first time since early camp,\n\nthe stores are not an emergency.\n\nMed is stocked.\n\nWater stable.\n\nBolts and strings sufficient.\n\nSignal gear doubled.\n\nEven Harjeev's handwriting looks less violent.\n\nThat,\n\nmore than Rhaziel's fall,\n\ntells Chug Six truly lost."},
  {t:"[SCENE 2 — REBUILD AS RITUAL]\n\nEveryone helps rebuild the table.\n\nNot because Harjeev orders it.\n\nBecause everyone now understands what the table means.\n\nKnight sets the frame.\n\nRaevan levels the braces.\n\nO.O carves new sector notches.\n\nAddy sands arrow guides into the edge for quick pickup.\n\nYassine and Solo carry the slab top together while insulting each other the whole time.\n\nNeon wires the signal inlays under the rim.\n\nKais engraves tiny spinning-disc marks into the underside where only he and Harjeev will ever know they exist.\n\nHarjeev pretends not to know and complains anyway.\n\nM.R should not be standing.\n\nHarjeev says so hourly.\n\nM.R still fits the new route markers into the board one-handed because the camp keeps unconsciously checking his face before major decisions and nobody wants to admit what that means yet.\n\nChug notices.\n\nAgain.\n\nDoesn't like how much he doesn't dislike it.\n\nGUIDE:\n\nHe organizes attention.\n\nCHUG:\n\nYeah.\n\nGUIDE:\n\nAnd you let him.\n\nCHUG:\n\nShould I not?\n\nLong pause.\n\nGUIDE:\n\nDecide later.\n\nThat answer is useless.\n\nWhich means it is probably dangerous."},
  {t:"[SCENE 3 — M.R AND THE CLAMPS]\n\nAt dusk,\n\nwhen the others are carrying planks,\n\nChug finds M.R alone with the black med clamps from Rhaziel's convoy.\n\nHe is turning one over carefully.\n\nNot like loot.\n\nLike memory he never wanted back.\n\nCHUG:\n\nYou recognized those.\n\nM.R doesn't deny it.\n\nM.R:\n\nTransfer rig hardware.\n\nCHUG:\n\nFrom what happened to you?\n\nM.R:\n\nFrom where I was before the cut-road broke.\n\nCHUG:\n\nCan you tell me?\n\nM.R looks at the clamp a second longer.\n\nThen sets it down.\n\nM.R:\n\nI can tell you pieces.\n\nA convoy.\n\nBad road.\n\nWrong escort.\n\nSomeone in the line deciding I was worth moving even wounded.\n\nSomeone else deciding the road mattered more than the body.\n\nThen noise.\n\nThen break.\n\nThen less than memory and more than pain.\n\nThen you.\n\nThat answer is not enough.\n\nIt is also more than Chug expected to get.\n\nHe accepts it because camp has taught him some truths need more structure than hunger.\n\nCHUG:\n\nYou remember us?\n\nM.R looks up at him.\n\nThe eyes are tired.\n\nStill sharp.\n\nM.R:\n\nEnough.\n\nCHUG:\n\nEnough for what?\n\nM.R:\n\nEnough to know you got older where it matters.\n\nAnd worse where it shows.\n\nChug laughs despite himself.\n\nCHUG:\n\nYou really are you.\n\nM.R:\n\nBad news for everyone."},
  {t:"[SCENE 4 — SOLO, O.O, ADDY, YASSINE]\n\nThe roster feels real now.\n\nSolo runs live chain drills with Yassine and almost smiles when Yassine finally anticipates the third pull.\n\nO.O and Addy compete at impossible knife-into-arrow sequences across the yard and refuse to call it a competition.\n\nNeon has fully infested the table signal system and now claims the board hum \"sounds more honest.\"\n\nKais keeps appearing in the wrong sectors and somehow improving them by accident.\n\nKnight tolerates him with increasing strategic resignation.\n\nHarjeev hates everyone equally and therefore fairly.\n\nRaevan and Kaizen remain the closest thing the camp has to old mountains.\n\nChug watches all of it and understands the act changed.\n\nThis is no longer rescue after rescue.\n\nThis is camp becoming faction.\n\nGood.\n\nNecessary.\n\nTerrifying."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 5 — WHO IS LEFT]\n\nHarjeev reads the remaining unrecovered names aloud while the second table dries under lantern heat.\n\nREE.\n\nFRIEND.\n\nOnly two left on the unresolved board now.\n\nTwo names for the next act.\n\nTwo absences that change the shape of the room whenever silence lasts too long.\n\nAddy traces one fingertip along Friend's line.\n\nNeon taps Ree's tag twice against the wood like old code.\n\nSolo looks at neither.\n\nYassine looks at both as if staring harder might grow memory.\n\nM.R studies the board.\n\nThen says the sentence no one wanted first.\n\nM.R:\n\nIf we keep expanding without closing the holes,\n\nthe camp becomes too wide to trust.\n\nKnight nods once.\n\nKNIGHT:\n\nCorrect.\n\nO.O folds her arms.\n\nO.O:\n\nThen we close the holes next.\n\nChug looks around the table.\n\nAt the people already back.\n\nAt the empty seats still waiting.\n\nCHUG:\n\nYeah.\n\nWe do."},
  {t:"[SCENE 6 — KAIS BECOMES PLAYABLE PROPER]\n\nKais has been here long enough that temporary stopped fitting three jokes ago.\n\nRaevan tosses him a camp-forged set of six weighted spin coins with sharpened rims and grip grooves.\n\nRAEVAN:\n\nStop using bent scavenged metal.\n\nYou're making the yard look unserious.\n\nKais catches the set and goes very still for exactly one second.\n\nKAIS:\n\nYou made these?\n\nRAEVAN:\n\nI corrected them.\n\nThe camp made them.\n\nKais turns one between his fingers.\n\nTests the balance.\n\nSmiles,\n\nbut not the usual easy one.\n\nSomething smaller.\n\nTruer.\n\nKAIS:\n\nWell.\n\nNow I have to stay.\n\nHARJEEV:\n\nYou were already staying.\n\nWe just hadn't billed you rent yet.\n\nSYSTEM:\n\n\"ALLY KAIS — FULL PLAYABLE STATUS CONFIRMED\"\n\nYASSINE:\n\nCongratulations.\n\nYou're officially a problem on our side.\n\nKAIS:\n\nThe finest kind of citizenship."},
  {t:"[SCENE 7 — M.R'S SEAT]\n\nNight falls.\n\nThe second table is finished.\n\nBigger.\n\nHeavier.\n\nReinforced with convoy steel.\n\nSignal wire under the edges.\n\nNew seat marks.\n\nRecovery hooks at the rear.\n\nA med drawer Harjeev insisted on.\n\nA hidden disc slot Kais definitely added.\n\nNo one proves it.\n\nChug takes Tora's ring from the old place and sets it at the new table edge.\n\nThen the Ten,\n\nNine,\n\nEight,\n\nSeven,\n\nSix marks below.\n\nThen the carved M.R line from the ruined first table.\n\nHe pauses.\n\nEveryone watches.\n\nNot because ceremony matters.\n\nBecause placement does.\n\nHe sets the carved line into a real seat marker.\n\nNot at the head.\n\nNot hidden.\n\nNear the table's strategic side.\n\nClose enough to command.\n\nFar enough not to eclipse the whole room.\n\nM.R sees it.\n\nSays nothing for a while.\n\nThen:\n\nM.R:\n\nYou don't have to do that.\n\nCHUG:\n\nYeah.\n\nI do.\n\nM.R looks at the seat.\n\nThen at the room.\n\nThen away.\n\nM.R:\n\nDangerous decision.\n\nHARJEEV:\n\nMost useful ones are.\n\nKnight does not object.\n\nThat matters more than approval."},
  {t:"[SCENE 8 — GUIDE'S SHADOW]\n\nLater,\n\nwhen the others thin out and the lanterns go lower,\n\nGuide speaks from somewhere above the rebuilt structure.\n\nGUIDE:\n\nSeats change wars.\n\nM.R's eyes lift toward the dark.\n\nOnly a fraction.\n\nAlmost invisible.\n\nEnough for Chug to notice.\n\nM.R:\n\nDepends who sits in them.\n\nGUIDE:\n\nExactly.\n\nThe room stills in a strange way.\n\nNot hostile.\n\nNot peaceful.\n\nRecognizing.\n\nLike two knives hearing each other across cloth.\n\nChug notices.\n\nFiles it.\n\nSays nothing.\n\nNot because he isn't curious.\n\nBecause camp has taught him timing.\n\nStill,\n\nthe feeling stays.\n\nGuide and M.R know edges of the same dark.\n\nMaybe.\n\nEnough to matter later.\n\nNot enough to fracture now."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 9 — THE NEXT HORIZON]\n\nNeon patches one last signal stone into the table and the map lights under their hands.\n\nKnight marks the current field.\n\nDRAKOS DOWN:\n\n12\n\n11\n\n10\n\n9\n\n8\n\n7\n\n6\n\nRoutes remaining for the next act.\n\nFewer numbers.\n\nWorse names.\n\nHigher consequences.\n\nAnd on the ally side:\n\nChug.\n\nYassine.\n\nAddy.\n\nSolo.\n\nO.O.\n\nNeonKd.\n\nKais.\n\nM.R.\n\nThe camp is no longer \"a place.\"\n\nIt is now a roster that can move.\n\nThat means the war changes.\n\nIt also means the losses ahead will hurt in more directions.\n\nSolo breaks the quiet first.\n\nSOLO:\n\nOnly two names left before the next wall.\n\nADDY:\n\nRee.\n\nFriend.\n\nO.O:\n\nThen we take them.\n\nM.R folds his hands once over the table edge.\n\nM.R:\n\nNot with momentum.\n\nWith discipline.\n\nHigher ranks won't give us retrieval windows this generous again.\n\nKAIS:\n\nSo less improvisation?\n\nAwful philosophy.\n\nKNIGHT:\n\nNo.\n\nPrecise improvisation.\n\nTry to keep up.\n\nKais grins.\n\nKAIS:\n\nThat I can do."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 10 — END OF 40]\n\nWhen the camp finally sleeps,\n\nChug stands alone before the second table.\n\nNot with loneliness.\n\nWith responsibility.\n\nDifferent weight.\n\nBetter one.\n\nHe looks at the board.\n\nAt M.R's new seat.\n\nAt Tora's ring.\n\nAt the names still waiting.\n\nAt the Drako marks already taken.\n\nAt the camp that now knows how to breathe as one body.\n\nGuide speaks one last time into the old dark over the new wood.\n\nGUIDE:\n\nYou built farther than grief alone could carry.\n\nChug rests one hand on the table.\n\nCHUG:\n\nYeah.\n\nGUIDE:\n\nGood.\n\nYou'll need more than that where Four and below begin.\n\nChug does not ask what exactly that means.\n\nNot tonight.\n\nHe just looks at the names that remain.\n\nRee.\n\nFriend.\n\nAnd everything beyond them.\n\nThen he says the sentence camp has earned.\n\nCHUG:\n\nWe're ready enough to keep going.\n\nSYSTEM:\n\n\"CAMP STRUCTURE LEVEL: COMMAND HUB\"\n\n\"ALLY KAIS — FULL ACTIVE\"\n\n\"ALLY M.R. — TABLE SEAT ESTABLISHED\"\n\n\"NEXT ACT VECTORS: REE / FRIEND / LOWER RANKS\""},

  {t:'[BOSS GATE — Nexter No.3 Veyr]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for THE SECOND TABLE.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.3 VEYR',fight:11},
  {t:"— END OF PART 40 —",end:true},
  // PART 41 — SILENCE MARKET
  {part:41,t:"PART 41 — SILENCE MARKET",col:'#d4a017'},
  {t:"[SCENE 1 — THE TWO NAMES LEFT]\nOnly two unrecovered names remain on the board.\n\nREE.\nFRIEND.\n\nThe camp feels that.\nNot as sorrow.\nAs unfinished structure.\n\nHarjeev runs a fingertip under both names before the morning report.\n\nHARJEEV:\nTwo names left on recovery.\nWhich means from now on every mistake is either impatience or stupidity.\nTry not to invent new categories.\n\nKais is upside down on a watchbeam for no reason anyone sane can justify.\n\nKAIS:\nI can invent at least three.\n\nO.O:\nNo.\n\nKAIS:\nI wasn't asking permission.\n\nYassine leans on the second table and studies Ree's line.\n\nYASSINE:\nWhat do we know?\n\nNeon answers first because signal work made him closest to fragments.\n\nNEONKD:\nRee kept rhythm teams moving.\nClose support.\nImpact discipline.\nNot a sniper.\nNot a sprinter.\nSomewhere in between.\nThe kind that makes other fighters feel faster than they are.\n\nSolo folds his arms.\n\nSOLO:\nAnd if they took that skill,\nthey didn't use it for pursuit.\nThey'd use it for control cadence.\nSilence rooms.\nStop-start fields.\nBreak timing.\n\nKnight places a black shard on the board.\n\nKNIGHT:\nFive.\nSable Vorn.\n\nThe room stills.\n\nADDY:\nSilence fields.\n\nSORYA:\nNot just silence.\nSelective muting.\nA field that kills command,\nkills rhythm,\nkills rescue timing,\nkills warning before impact.\n\nM.R stands one pace off the table,\nstill bandaged,\nstill thinner than he should be,\nstill somehow shaping the room simply by refusing to lean on pain.\n\nM.R:\nIf Five is holding Ree,\nthen he isn't guarding a prisoner.\nHe's guarding a metronome.\n\nChug hears that and knows it is right before anyone confirms it.\n\nCHUG:\nThen we go before Five teaches the camp how to lose its own timing."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 2 — THE MARKET OF DEAD BELLS]\nThe route goes west into a place Harjeev calls Bell Market\nand Knight calls Silence Market\nbecause the bells hanging there haven't rung in years.\n\nThe difference between those names matters.\n\nBell Market is memory.\n\nSilence Market is doctrine.\n\nThey go light on paper and heavy in truth.\nChug.\nYassine.\nAddy.\nO.O.\nKnight.\nM.R.\nKais.\nNo large camp move.\nNo convoy.\nNo obvious rescue shape.\n\nHarjeev hates letting M.R out of the med line.\n\nHARJEEV:\nIf your side opens on my route,\nI will personally recover you just to complain while sewing.\n\nM.R:\nThat threat is losing freshness.\n\nHARJEEV:\nGood.\nThen survive long enough for me to repeat it.\n\nKais grins at M.R as they walk.\n\nKAIS:\nYou know,\nbeing medically forbidden and strategically necessary is one of the most attractive things a man can be.\n\nM.R doesn't even look at him.\n\nM.R:\nThat says more about your standards than my condition.\n\nKAIS:\nExactly.\nThat is why we would make terrible life decisions together.\n\nO.O:\nIf you keep saying things like that,\nI'm going to start assuming concussion.\n\nThe road to Silence Market is all hanging frames and bell towers with their tongues removed.\nEvery gust tries to ring them.\nNothing answers.\nThe place feels mutilated.\n\nM.R stops at the first gate and looks up at the gutted bronze.\n\nM.R:\nHe likes symbolism.\n\nKNIGHT:\nYou know Sable.\n\nM.R:\nI know the type.\n\nThat is not an answer.\nChug hears the gap.\nStores it.\n\nNot now.\nLater."},
  {t:"[SCENE 3 — THE FIRST FIELD]\nThe first silence field feels wrong before it feels empty.\n\nChug opens his mouth to warn left\nand no sound comes.\n\nNothing.\n\nNot muffled.\nNot swallowed.\nDenied.\n\nAddy's curse makes no sound either.\nKais's grin sharpens,\nbecause even he understands what that means.\nOnly Sorya's earlier lessons make sense of the room.\n\nSelective muting.\n\nKnight's hand signs cut the panic before it grows.\nTwo fingers down.\nLeft palm open.\nRotate.\n\nThey move.\nGood.\n\nThen the first strike lands.\nNot on flesh.\nOn certainty.\n\nA hidden challenger unit comes from the hanging bell frames with padded shoes and blunt sound-killing clubs.\nNo war cry.\nNo warning.\nNo audible footwork.\n\nO.O is first.\nOf course.\n\nShe catches one by the wrist and drives a reverse blade into the collar seam with such clean economy that the silence somehow feels louder around it.\n\nAddy climbs a broken tower without command.\nGood.\nM.R doesn't fight full-speed,\nbut he points once,\nsharp,\nand Chug follows the line to the right bell chain where three more muted fighters are using the hanging metal as cover.\n\nFrame-bolt.\nOne down.\n\nYassine and Kais take the lower seam.\nKais can't joke because the field won't let him.\nHe suffers in visible silence.\nYassine almost laughs mid-kill and then remembers he can't.\n\nThe field dies only when Knight reaches the hidden anchor—an iron tongue nailed into the base of the market well—and tears it free.\n\nSound returns all at once.\n\nKAIS:\nI hated every second of that.\n\nO.O:\nGood.\n\nKAIS:\nNo, I mean spiritually.\nI'm not built for quiet.\nIt's violent.\n\nM.R:\nThat was the point."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 4 — REE'S MARK]\nAt the center well they find a rhythm score carved into the stone lip.\nNot music.\nCombat count.\n\nThree short.\nOne hold.\nTwo break.\nRepeat.\n\nNeon would have read it fastest.\nHe's not here.\nSo Addy does.\n\nADDY:\nRee's work.\nHe always counted impacts like someone teaching his body not to waste anger.\n\nYassine touches the carved count.\nThen pulls his hand back.\n\nYASSINE:\nI know this.\nI don't know from where.\nBut I know it.\n\nM.R's eyes flick toward him.\nThat same unreadable warmth.\nThat same terrible self-control.\n\nM.R:\nGood.\nFollow the count.\nFive will have buried the honest path under silent paths.\nRee would mark the one that still remembers cadence.\n\nKnight watches M.R once.\nReally watches.\nThen nods.\n\nKNIGHT:\nTake the count.\n\nThey do.\n\nThree short corridors.\nOne held turn.\nTwo breaks through dead shutters.\n\nAt the end of that pattern waits Sable Vorn's chamber."},
  {t:"[SCENE 5 — SABLE VORN]\nFive sits beneath the dead bells like a priest of mutilated language.\n\nNot massive.\nNot weak.\nBeautiful in the way knives sometimes are.\n\nLong black coat over layered field plates.\nOne hand holding a tuning rod of dark iron.\nThe other resting on the shoulder of a seated figure whose wrists are bound to two bell posts.\n\nRee.\n\nAlive.\nHead bowed.\nOne ear bled dry at the edge.\nOne glove wrapped around a strike baton still clutched too tightly to be fully unconscious.\n\nSable smiles when they enter.\n\nSABLE VORN:\nGood.\nEnough of you came to make the room meaningful.\n\nChug steps forward.\n\nCHUG:\nLet him go.\n\nSable taps the tuning rod once against the floor.\n\nThe whole chamber falls silent.\n\nNo ambient sound.\nNo cloth rustle.\nNo foot scrape.\nOnly the ugly inner sense of blood moving in ears.\n\nREE lifts his head slowly.\n\nHis lips form a word.\nNo sound.\n\nM.R reads it anyway.\n\nM.R:\nHe says don't rush.\n\nSable turns.\nInterested.\n\nSABLE VORN:\nSo you kept that.\n\nAgain.\nAn enemy saying it knows him.\nAgain.\n\nChug feels that and hates it.\nNot now.\nFocus.\n\nKnight's fingers sign the whole room into war."},
  {t:"[SCENE 6 — END OF 41]\nThe first exchange happens in absolute silence.\n\nAddy versus high bell chains.\nO.O versus field guards.\nYassine and Kais breaking side anchors.\nKnight taking Sable's center line.\nChug driving for Ree's binds.\nM.R standing just outside full fight pace,\nreading the chamber,\npointing the truths.\n\nHe points once at Chug.\n\nLeft bell.\nNot Ree.\n\nChug obeys.\nBreaks the left bell support instead of the prisoner line.\nThe whole field wavers.\n\nGood.\n\nSable notices.\nSmiles with less amusement.\n\nSABLE VORN:\nThere.\nA real room after all.\n\nThe cut to black is not visual.\nIt is auditory.\n\nThe entire chamber becomes a war no one can call by voice."},
  {t:"SYSTEM: FIGHT",fight:8},

  {t:'[EXPANDED ENCOUNTER — SILENCE MARKET]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:11},
  {t:"— END OF PART 41 —",end:true},
  // PART 42 — FIVE FALLS QUIETLY
  {part:42,t:"PART 42 — FIVE FALLS QUIETLY",col:'#d4a017'},
  {t:"[SCENE 1 — FIGHT IN MUTED AIR]\nSable Vorn's chamber kills command.\nSo the camp fights on preparation.\n\nKnight's hand signs.\nAddy's tower lane.\nO.O's kill pace.\nYassine's break rhythm.\nKais's impossible noise made visual through spinning steel and light instead of sound.\nChug's direct acceleration.\nM.R's pointing.\n\nRee sees all of it through half-lidded eyes.\nHis head still bowed.\nBut the old discipline in him watches count and spacing even under restraint.\n\nSable is elegant in the worst way.\nEvery time he moves the tuning rod,\none layer of sound returns somewhere else and dies here.\nHe doesn't just silence.\nHe redistributes what people rely on.\n\nYASSINE almost steps wrong under that.\nKais catches him with a disc snapping across the floor in front of the boot.\n\nToo close.\n\nYassine nods once in thanks.\nKais answers with a theatrical salute no one can hear.\n\nO.O kills the first anchor guard.\nAddy destroys the second bell brace.\nKnight keeps Sable from resetting center.\nChug reaches Ree's post.\n\nThe bindings are not chain.\nThey're vibration locks.\nBrute force will clamp them tighter.\n\nM.R sees it from across the room and shapes the answer with hands only.\nThree.\nHold.\nTwo.\n\nRee's count.\n\nChug breathes to it.\nThree strikes along the post seam.\nOne held pause.\nTwo frame-bolts into the locking tongues.\n\nThe restraint opens.\n\nRee falls forward.\nStill gripping the baton.\n\nAlive."},
  {t:"SYSTEM: FIGHT",fight:7},
  {t:"[SCENE 2 — REE WAKES MOVING]\nRee does not wake like Yassine did.\nOr Addy.\nOr Solo.\n\nHe wakes mid-fight.\n\nThe first thing he does is catch the baton properly.\nThe second is stand on the same count Chug just used to free him.\nThe third is hit a silent guard across the jaw with such disciplined force that the man's feet leave the floor.\n\nGood.\n\nVery good.\n\nSable actually steps back.\n\nSABLE VORN:\nThere.\nThat is why I kept you breathing.\n\nRee's first audible word only arrives because Addy shatters the last high bell and sound returns in fragments.\n\nREE:\n...Camp?\n\nIt comes out raw.\nBroken by field stress.\nStill enough.\n\nCHUG:\nYeah.\n\nREE looks at him.\nThen at M.R.\nThen at the room.\nEverything old and new colliding at once.\n\nREE:\nYou all got uglier.\n\nKAIS, delighted:\nOh.\nHe's perfect."},
  {t:"[SCENE 3 — FIVE'S LAST ROOM]\nNow the chamber truly turns.\n\nSound returns.\nSable hates that.\nGood.\n\nKais becomes unbearable in the best possible way the second his voice comes back.\n\nKAIS:\nDid you miss me, you elegant corpse?\n\nSABLE:\nNo.\n\nKAIS:\nLiar.\nEveryone misses me by the third sentence.\n\nO.O:\nStop helping him hate us in different ways.\n\nSable redraws the field around remaining bells and tries to cut command again.\nToo late.\nCamp rhythm has him now.\n\nRee shakes the numbness from his left hand,\nrolls the baton once,\nand steps into the pattern like he'd only been away a week instead of whatever hell transfer time did to him.\n\nADDY:\nCan you move?\n\nREE:\nCan you shoot?\n\nADDY:\nYes.\n\nREE:\nThen I can move.\n\nThat is enough.\n\nSable doesn't lose to one fighter.\nHe loses to rhythm restored.\n\nAddy takes his sight lines.\nO.O takes his nearest kill angles.\nYassine ruins his field anchors.\nKais puts ringing steel into every dead silence he tries to rebuild.\nKnight denies him center.\nM.R calls the true count.\nChug and Ree hit on it.\n\nOne.\nTwo.\nHold.\nThree.\nBreak.\n\nThe final break is Ree's.\nBaton across the tuning rod wrist.\nCrack.\nChug's frame under the sternum seam.\nKnight's blade at the throat.\nO.O's reverse grip at the kidney line.\nAddy's arrow above the eye.\n\nSable goes still.\nNot because fear taught him.\nBecause the room finally stopped belonging to him.\n\nSABLE VORN:\n...Quiet.\nAt last.\n\nREE:\nNo.\nYou just lost the count.\n\nChug tears the Five insignia free."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 4 — FIVE FALLS]\nSable withdraws badly.\nBleeding at wrist and center seam.\nThe bells around him all split as he moves.\nGood.\nLet him leave with silence broken behind him.\n\nHe does not beg.\nGood.\nDrakos don't.\nHe does not promise revenge either.\nBetter.\nThat means the defeat was cleaner than ego.\n\nSABLE VORN:\nFour will fortify what I could not mute.\n\nKNIGHT:\nThen Four can learn the same lesson.\n\nSable's eyes flick once toward M.R.\n\nSABLE VORN:\nIf he is still with you by then.\n\nThat line lands.\n\nToo hard.\nToo deliberately.\n\nM.R does not react where anyone can see.\nWhich is a reaction all its own.\n\nSable leaves.\nFive down."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 5 — REE IN CAMP]\nBack at camp,\nHarjeev inspects Ree the way he inspects everyone:\nlike sentiment is a waste until pulse proves itself.\n\nHARJEEV:\nPupils acceptable.\nHearing damaged but not lost.\nCoordination irritatingly intact.\nGood.\nSit.\n\nREE:\nYou got more unpleasant.\n\nHARJEEV:\nYou got rescued late.\nBoth things happen.\n\nNeon sees Ree and actually loses words for one whole breath.\n\nNEONKD:\n...\nRee.\n\nREE:\nStill ugly, Neon.\n\nNEONKD:\nYeah.\nGood.\nYou too.\n\nThat is the reunion.\nHarsh.\nPerfect.\nTrue.\n\nYassine watches it and something in his face loosens.\nA little.\nEnough to matter.\n\nM.R remains at the edge of the room.\nRee looks toward him longer than toward most.\nThen says nothing.\nThat matters too."},
  {t:"[SCENE 6 — END OF 42]\nHarjeev updates the ledger.\n\nDRAKO NO.5 —\nSABLE VORN\nDEFEATED\n\nThen:\n\nREE —\nACTIVE / RECOVERY FAST\nSILENCE DAMAGE —\nMANAGEABLE\nFIELD RHYTHM IMPROVED\n\nRee grips the baton across both palms and looks at the table like he already understands camp function without needing orientation.\n\nREE:\nWho's left?\n\nChug answers because he has to hear the truth from his own mouth.\n\nCHUG:\nFriend.\nThen the lower ranks.\n\nKais leans back and whistles.\n\nKAIS:\nWell.\nThat means the fun gets catastrophic.\n\nO.O:\nYour idea of fun concerns me.\n\nKAIS:\nGood.\nKeeps chemistry alive.\n\nSystem text burns steady above the second table.\n\nSYSTEM:\n\"DRAKO 5 STATUS:\nDOWN\"\n\"ALLY REE —\nPLAYABLE STATUS OPEN\""},

  {t:'[BOSS GATE — Drako No.5 Kael]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for FIVE FALLS QUIETLY.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — DRAKO NO.5 KAEL',fight:13},
  {t:"— END OF PART 42 —",end:true},
  // PART 43 — FORTRESS DISCIPLINE
  {part:43,t:"PART 43 — FORTRESS DISCIPLINE",col:'#d4a017'},
  {t:"[SCENE 1 — ONLY ONE NAME LEFT]\nFriend is the last unrecovered name on the board.\n\nThat makes the room strange.\n\nThe others are here now.\nNot whole.\nNot perfect.\nPresent.\n\nFriend remains absence with a title too intimate for war.\n\nHarjeev says it out loud while morning dust still floats over the second table.\n\nHARJEEV:\nOne name left before lower-rank campaign closes.\nThat makes this next move emotionally stupid by default.\nCorrect yourselves before I have to.\n\nSolo rests the chain-sickle against the bench.\n\nSOLO:\nHe wasn't weak.\n\nChug looks at him.\n\nSOLO:\nFriend.\nHe wasn't weak.\nDon't let the name fool you.\n\nO.O folds her arms.\n\nO.O:\nNames never fool me.\nPeople do.\n\nNeon slides a signal shard across the table.\nA fortress icon.\nSquare nested in square.\nNothing graceful in it.\n\nKNIGHT:\nFour.\nTyrvak.\nFortress discipline.\n\nM.R:\nHe won't bait with emotion first.\nHe'll build a structure around Friend and force us to exhaust ourselves against correctness.\n\nREE taps his baton twice on the table edge.\n\nREE:\nThen we don't hit the fortress.\nWe hit what teaches it to close.\n\nKnight's eyes flick toward him.\nThen nod once.\n\nKNIGHT:\nGood.\n\nRee shrugs like approval costs nothing.\nIt does.\nThat is why he makes it look cheap."},
  {t:"[SCENE 2 — WHAT FRIEND MEANS]\nThe road to Tyrvak's ground begins through abandoned checkpoints and wall fragments.\nEvery tenth stone is still standing.\nEvery eleventh is not.\nTyrvak doctrine all over it.\nA man who values sequence enough to punish irregular numbers.\n\nKais walks backward for three straight minutes just to annoy the geometry.\n\nKAIS:\nIf Four likes order,\nhe's going to have a terrible time with me.\n\nO.O:\nYou are not strategy.\nYou are interference.\n\nKAIS:\nThe best kind.\n\nAddy walks beside Chug this time,\nbow slung,\nfully active now,\nfully part of field assignments.\n\nADDY:\nWhat was he like?\n\nCHUG:\nWho?\n\nADDY:\nFriend.\nDon't make me say the obvious things for you.\n\nChug takes a while.\n\nCHUG:\nHe was...\nthe one who held people together before any of us knew that was a job.\nHe remembered birthdays.\nWater counts.\nArguments.\nWho needed pushing.\nWho needed shutting up.\nWho needed to be left alone for one hour instead of one week.\nStuff nobody ranked until it was gone.\n\nYassine hears that and goes quiet.\n\nM.R hears it too.\nLooks away toward the road.\n\nThat matters.\nAgain."},
  {t:"[SCENE 3 — THE FORTRESS THAT WALKS]\nTyrvak's field isn't a castle.\nIt's worse.\n\nA moving fortress.\nModular wall sledges locked into square formations over old rail lines.\nShield crews.\nPike lanes.\nArrow slits.\nRotating bastions.\nEverything capable of advancing while pretending to stand still.\n\nAnd at its center,\nvisible through three layers of defensive geometry\nstands Friend.\n\nUpright.\nBound into the command mast by metal straps and field wires.\nNot caged like a prisoner.\nMounted like a stolen standard.\n\nThat makes every person from camp angry in a slightly different way.\n\nKAIS:\nThat is deeply rude.\n\nO.O:\nI will cut him apart for that alone.\n\nKNIGHT:\nNo.\nYou'll cut the formation apart.\nThe man can wait.\nThe geometry cannot.\n\nFriend lifts his head slowly.\nSees them.\nDoes not smile.\n\nFRIEND:\nTook your time.\n\nChug nearly laughs at the cruelty of how familiar that sounds.\n\nCHUG:\nYeah.\nGetting tired of hearing that.\n\nFRIEND:\nThen move faster.\n\nEven strapped to a mast,\nhe sounds like himself.\n\nGood.\nThat helps.\nAnd hurts."},
  {t:"[SCENE 4 — TYRVAK]\nTyrvak emerges only when the camp comes into full view of the formation line.\n\nHe walks on top of his own moving fortress like command made flesh.\n\nHuge shield.\nNot defensive.\nDirective.\nEverything about the armor says line holder,\ndiscipline anchor,\npunishment for improvisation.\n\nTYRVAK:\nSo the camp came in person.\n\nKnight steps forward once.\n\nKNIGHT:\nRelease the bound man.\n\nTYRVAK:\nNo.\nHe is useful.\nHe understands cohesion.\nI wanted to see how your camp behaves watching its own spine made into architecture.\n\nM.R speaks before Chug does.\n\nM.R:\nYou built a wall around the wrong idea.\n\nTyrvak's gaze shifts.\nLocks.\n\nTYRVAK:\nAnd yet I still prefer your original to your current arrangement.\n\nThat line lands harder than Tyrvak's shield would.\nBecause of who he says it to.\nBecause of what it implies.\nBecause Chug hears it and cannot not hear it.\n\nNot now.\nField first.\nAlways field first."},
  {t:"SYSTEM: FIGHT",fight:8},
  {t:"[SCENE 5 — FORTRESS BATTLE]\nTyrvak's war is the opposite of chaos.\n\nThat makes it infuriating.\n\nEvery enemy unit holds.\nEvery line closes.\nEvery retreat becomes another wall.\nEvery successful strike from camp finds itself paying for three disciplined answers.\n\nKnight splits the camp into stacked cells to answer.\nAddy and Neon on high-signal angle.\nO.O and Ree on mast approach.\nSolo and Yassine on wheel-cut and undercarriage.\nKais creating interference across the rail seams.\nChug center breach.\nM.R and Harjeev running table logic from the field relay stone.\n\nYes.\nThey brought the board concept with them.\nGood.\nCamp is faction now.\n\nTyrvak sees it.\nHates it.\nGood.\n\nCHUG hits the first shield train.\nDoesn't break through.\nOf course.\nTyrvak designed this to consume frontal pride.\n\nREE:\nNot center!\nHit the locks!\n\nChug adjusts instantly.\nBetter than old Chug.\nGood.\n\nO.O reaches the second mast ring and cuts three wire couplings before the fortress rotates a wall panel between her and Friend.\n\nAddy arrows the slit hinges.\nNeon cracks the relay timing with signal flares off polished plates.\nKais runs his discs along the rail teeth and literally derails one support cart because he is that kind of nightmare.\n\nKAIS:\nThere.\nNow it's art.\n\nSOLO:\nYou are genuinely sick.\n\nKAIS:\nYes.\nStill useful."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 6 — FRIEND'S VOICE]\nThe formation grinds forward even while losing pieces.\n\nFriend watches the whole thing with a terrible calm.\n\nFRIEND:\nYou're stronger.\n\nCHUG:\nYeah.\n\nFRIEND:\nStill messy.\n\nCHUG:\nAlso yeah.\n\nFRIEND:\nGood.\nThat means you lived.\n\nThat line hits almost everybody.\n\nFriend isn't just a name.\nHe really was the one who held the soft tissue between them.\n\nTyrvak notices the emotional drag.\nHe presses harder.\nShield slam.\nPike wheel.\nAdvance.\n\nTYRVAK:\nCohesion is property.\nYou lost him.\nI improved him.\n\nThat earns the first truly ugly look Chug has ever seen from Addy.\n\nADDY:\nNo you didn't.\n\nGood.\nAnger is aligned.\nUseful anger."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 7 — END OF 43]\nBy the time dusk bleeds over the rail smoke,\ncamp has damaged the moving fortress but not stopped it.\n\nFriend is still bound.\nTyrvak is still behind walls.\nThe field is not lost.\nNot won either.\n\nKnight pulls the retreat correctly.\nBecause this is Four's lesson:\nif you do not own the structure yet,\ndo not die trying to flatter yourself.\n\nChug hates retreating.\nDoes it anyway.\n\nAt the fallback ridge,\nFriend's voice carries once through the steel and smoke.\n\nFRIEND:\nCome back smarter.\n\nKais adjusts his hat and looks at the broken rail.\n\nKAIS:\nWell.\nI hate respectable enemies.\nMakes killing them feel like paperwork.\n\nSYSTEM:\n\"DRAKO 4 STATUS:\nACTIVE\"\n\"ALLY FRIEND —\nCONFIRMED ALIVE\""},

  {t:'[EXPANDED ENCOUNTER — FORTRESS DISCIPLINE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:2},
  {t:"— END OF PART 43 —",end:true},
  // PART 44 — FOUR BREAKS OPEN
  {part:44,t:"PART 44 — FOUR BREAKS OPEN",col:'#d4a017'},
  {t:"[SCENE 1 — THE NIGHT OF PLANS]\nNo one sleeps properly.\n\nTyrvak did exactly what Four should do.\nHe made the camp retreat without losing identity.\nThat makes him dangerous enough to respect.\nAnd therefore harder to kill.\nRespect always complicates clean violence.\n\nThe second table becomes a war engine through the night.\nKnight draws structure layers.\nNeon maps relay timing.\nAddy rebuilds the angle charts.\nRee sets cadence marks for team rotations.\nO.O marks hidden blade entry points on the fortress sketch.\nSolo calculates chain capture loads.\nKais throws discs at pegs until his pattern shows which rail teeth are decorative and which are load-bearing.\nHarjeev counts what can be spent.\nM.R watches.\nThen begins changing everything.\n\nNot because Knight was wrong.\nBecause M.R sees the part still built like a challenge instead of a collapse.\n\nM.R:\nYou're still trying to defeat Tyrvak.\nDefeat the fortress instead.\nThe man follows.\n\nKnight studies the board.\nLong.\nThen steps back.\n\nKNIGHT:\nShow it.\n\nThat is trust.\nOr necessity.\nOften they look identical.\n\nM.R moves the markers.\nNot fast.\nNot dramatic.\nAccurate.\n\nM.R:\nAddy and Neon don't attack kill lines.\nThey blind command windows.\nO.O doesn't climb the mast.\nShe kills the wheel-men.\nSolo uses chain-sickle to lock shield wagons into each other.\nRee runs cadence shock through the undercarriage posts.\nKais turns the rail release into a false collapse on the east side.\nChug doesn't breach front.\nHe enters through the rescue cavity after the command mast loses balance.\n\nYassine watches the whole thing carefully.\n\nYASSINE:\nYou talk like you've broken one before.\n\nM.R doesn't answer immediately.\n\nThen:\n\nM.R:\nI've watched enough walls die.\n\nAgain.\nAn answer that is one layer too thin.\nAgain.\nNot tonight."},
  {t:"SYSTEM: FIGHT",fight:9},
  {t:"[SCENE 2 — FRIEND'S CAVITY]\nThey return at first iron-light.\n\nThe moving fortress is already rolling.\nOf course it is.\nTyrvak wastes nothing.\nNot even dawn.\n\nThis time the camp attacks as one system.\n\nNeon blinds the command slits with bouncing signal flares.\nAddy threads impossible shots through momentary gaps created by those flashes.\nO.O kills the wheel-men silently one after another.\nSolo's chain-sickle binds two shield sledges together so the formation turns against itself.\nKais breaks the east rail teeth in a pattern that suggests structural failure where there is only tactical collapse.\nRee runs the strike count loud enough for camp to move on it.\nYassine cuts any recovery team that thinks the old angles still exist.\n\nTyrvak sees the pattern too late.\n\nTYRVAK:\n...There.\n\nNot praise.\nRecognition.\n\nGood.\nThey have become enough to force it.\n\nChug doesn't hit the wall.\nHe waits.\nHates waiting.\nDoes it anyway.\nThen the rescue cavity opens exactly where M.R said it would.\n\nCHUG:\nNow!\n\nHe goes through.\n\nNot alone.\nYassine with him.\nBecause camp doesn't rescue through singular pride anymore.\n\nThey hit the inner mast.\nFriend's bind rig is not decorative.\nIt's structural.\nTyrvak really did mount him into cohesion.\n\nChug starts to cut.\nFriend barks once:\n\nFRIEND:\nNot that side!\nLoad line!\n\nYassine changes angle immediately.\nBlade to the load line.\nRee's cadence echoes from outside.\nThree.\nHold.\nTwo.\nBreak.\n\nThe mast lurches.\n\nFriend tears one arm free himself and grabs Chug by the collar hard enough to hurt.\n\nFRIEND:\nYou really did get slower.\n\nCHUG almost laughs.\nAlmost."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 3 — TYRVAK FALLS]\nOnce Friend is no longer part of the wall,\nthe wall becomes killable.\n\nThat is the whole lesson.\nAlways was.\n\nTyrvak realizes it at the same moment camp does.\nHe abandons command height and drops into the center lane with shield first.\nMassive.\nDisciplined.\nFurious in the most controlled way possible.\n\nHe almost reaches Friend.\nThat was his real target all along.\nKeep the spine mounted.\nKeep the camp watching itself displaced.\n\nNo.\n\nO.O intercepts at the knee.\nSolo hooks the shield edge.\nKais turns the stagger into drift by clipping the boot plate with a spinning return.\nAddy and Neon blind the visor slit with two impossible lines at once.\nRee's cadence forces the whole camp into the same strike beat.\nYassine cuts the shield strap.\nChug opens Rage 1 clean and drives the frame straight through the exposed chest seam beneath the lifted shield arm.\n\nTyrvak drops.\n\nFlat.\nLike a fortress section finally realizing gravity is not a negotiation.\n\nTYRVAK:\n...Good.\n\nFriend,\nstill half-strapped and bleeding,\nlooks down at him with no softness at all.\n\nFRIEND:\nNo.\nJust overdue.\n\nThat line belongs on the table.\n\nChug takes the Four mark from Tyrvak's armor.\n\nTYRVAK doesn't ask for mercy.\nDoesn't offer threat.\nHe only says:\n\nTYRVAK:\nThree breaks command itself.\nDon't let your camp admire its own shape too much.\n\nThen he withdraws in disciplined ruin,\ndragging a shattered shield that no longer knows how to be a wall."},
  {t:"[SCENE 4 — FRIEND RETURNS]\nBack at camp,\nFriend refuses the cot.\n\nHarjeev wins that argument in under six seconds.\n\nHARJEEV:\nSit or I write you down as hostile architecture.\n\nFriend sits.\n\nGood.\n\nHe looks older than the others expected.\nNot by years.\nBy held things.\nThe kind of old that comes from carrying the mood of a room too long.\n\nYassine studies him.\n\nYASSINE:\nDo I know you?\n\nFriend looks at him and all the sharpness softens into something ugly with care.\n\nFRIEND:\nYeah.\n\nYASSINE:\nGood.\nAnother one.\n\nFRIEND:\nSorry.\n\nYASSINE:\nNo.\nIt's fine.\nI think.\n\nFriend looks to Chug next.\nThen to M.R.\nThat moment lasts one breath too long.\n\nFRIEND:\nSo.\nWe're all here now.\n\nM.R answers first.\nQuietly.\n\nM.R:\nAlmost.\n\nFriend hears the word under the word.\nAlmost who.\nAlmost what.\nAlmost whole.\n\nHe doesn't push.\nThat matters too."},
  {t:"[SCENE 5 — END OF 44]\nHarjeev updates the board.\n\nDRAKO NO.4 —\nTYRVAK\nDEFEATED\n\nThen:\n\nFRIEND —\nACTIVE / RECOVERY STABLE\n\nThe roster side of the table now looks impossibly full.\nToo full for the early camp.\nExactly full enough for war.\n\nKais leans over the board and whistles.\n\nKAIS:\nLook at that.\nSomeone could fall in love with this.\n\nO.O:\nNo.\n\nKAIS:\nCounterpoint,\nyes.\n\nSystem text burns hard and bright.\n\nSYSTEM:\n\"DRAKO 4 STATUS:\nDOWN\"\n\"ALLY FRIEND —\nPLAYABLE STATUS OPEN\"\n\"ROSTER RECOVERY PHASE:\nNEAR COMPLETE\""},
  {t:"SYSTEM: FIGHT",fight:11},

  {t:'[BOSS GATE — Nexter No.2 Voxa]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for FOUR BREAKS OPEN.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.2 VOXA',fight:14},
  {t:"— END OF PART 44 —",end:true},
  // PART 45 — THE SEAT TURNS
  {part:45,t:"PART 45 — THE SEAT TURNS",col:'#d4a017'},
  {t:"[SCENE 1 — FULL TABLE]\nFor the first time since the world split,\neveryone sits near the second table.\n\nNot all at once.\nNot peacefully.\nBut near enough that absence is no longer the largest thing in the room.\n\nChug.\nYassine.\nAddy.\nSolo.\nO.O.\nNeonKd.\nRee.\nFriend.\nKais.\nKnight.\nHarjeev.\nM.R.\n\nTora's ring still waits.\nGuide still speaks without body.\nThe lower Drakos are down through Four.\n\nIt should feel like victory.\n\nInstead it feels like pressure before weather.\n\nFriend notices first.\n\nFRIEND:\nToo full.\n\nHARJEEV:\nExcuse me?\n\nFRIEND:\nNot the roster.\nThe air.\n\nNeon looks up from the signal stones.\nThe inlays under the table are stuttering.\nNot enemy flare.\nNot route lag.\nPattern clash.\n\nNEONKD:\nSomething's sitting in the relay wrong.\n\nM.R is already looking at the board.\nToo still.\nToo focused.\n\nKNIGHT notices.\nOf course he does.\n\nKNIGHT:\nSay it.\n\nM.R does not answer.\nNot immediately.\n\nWrong.\n\nEveryone feels the wrong of that."},
  {t:"SYSTEM: FIGHT",fight:10},
  {t:"[SCENE 2 — THE OLD PHRASE]\nThe signal stones all flash black.\n\nNot red.\nNot blue.\nBlack.\n\nThat should be impossible.\n\nGuide's voice cuts in.\nSharper than anyone has ever heard it.\n\nGUIDE:\nEveryone away from the table.\nNow.\n\nToo late.\n\nA phrase comes through the signal grid in a voice not fully anyone's and somehow too familiar at once.\n\nPRIORITY LINE:\nReturn the copy.\n\nThe camp doesn't understand.\nNot all of it.\nNot yet.\n\nM.R goes pale in a way blood loss never energyged.\n\nChug sees that before the words make sense.\n\nCHUG:\nM.R—\n\nThe floor under M.R's seat lights with transfer script.\nNot camp script.\nOld transfer rig.\nThe same black med clamps.\nThe same road-coded geometry from the convoy salvage.\n\nM.R stands too fast.\nPain tears through the side.\nHe ignores it.\n\nM.R:\nBack away.\n\nFriend is already moving.\nSolo too.\nKnight too.\n\nO.O has a blade out.\nAddy an arrow half-drawn.\nYassine frozen only because the room is suddenly asking a question nobody trained for.\n\nKAIS:\nCopy?\n\nNo one answers him.\nBecause the answer is starting to answer itself."},
  {t:"[SCENE 3 — WATCHER IN THE SIGNAL]\nThe table darkens.\nThe relay stones under it flood with one old pressure Chug knows too well.\n\nWatcher pressure.\n\nNot the full form.\nNot the void throne.\nBut the same personal temperature.\nThe same cut in the ribs where abandonment used to live.\n\nThe voice comes through every inlay at once.\n\nWATCHER:\nYou kept him longer than expected.\n\nChug's hands are already shaking.\nNot from fear.\nFrom recognition.\n\nM.R doesn't look at anyone.\nOnly at the black-lit table.\n\nM.R:\nI know.\n\nWATCHER:\nThen stop pretending surprise.\n\nYASSINE:\nWhat the hell is this?\n\nM.R closes his eyes once.\nOpens them.\nThe room sees the answer before he says it.\n\nM.R:\nI told you pieces.\n\nCHUG:\nSay the whole thing.\n\nM.R turns toward him.\nThat old rank.\nThat old steadiness.\nThat impossible presence.\nNow wounded by truth instead of metal.\n\nM.R:\nI am not the original line.\n\nSilence.\n\nNot Sable's silence.\nWorse.\nHuman silence.\n\nCHUG:\nWhat does that mean?\n\nM.R:\nIt means I was grown off his route.\nMade from enough of him to think,\nenough of him to command,\nenough of him to pass.\nA transfer double.\nA surviving copy.\nA clone if you need the ugliest word.\n\nKais does not joke.\nThat is how bad it is.\n\nFRIEND:\nWatcher.\n\nM.R:\nYes.\n\nFRIEND:\nYou're saying—\n\nM.R:\nI'm saying the man who sat at this table is not the first M.R.\nAnd the thing on the other end of that voice is."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 4 — CAMP FRACTURES]\nEverything the camp learned about holding breaks in different directions at once.\n\nAddy's bow tightens.\nO.O's blades rise.\nSolo takes one half-step forward like violence can simplify biology.\nRee grips the baton so hard his knuckles whiten.\nFriend just stares like a room he thought he knew changed shape around him.\nNeon looks sick.\nHarjeev looks furious because logistics hate betrayal more than blood.\nKnight looks exactly like a man whose worst suspicion arrived on time.\n\nOnly Yassine doesn't move at first.\nHe just looks at M.R like the answer must fit into friendship somehow if he stares hard enough.\n\nYASSINE:\nYou were with us.\n\nM.R:\nYes.\n\nYASSINE:\nWas that fake?\n\nM.R finally looks at him.\n\nThat hurts more than the reveal.\n\nM.R:\nNo.\n\nO.O:\nConvenient answer.\n\nM.R:\nI know.\n\nCHUG:\nThen why didn't you say it?\n\nM.R:\nBecause every path where I said it sooner ended with the camp cutting itself before Four.\nBecause we needed structure first.\nBecause I wanted more time.\nPick the version that offends you least.\n\nThat honesty only makes it worse."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 5 — GUIDE CUTS IN]\nGuide's voice drops through the room with a force it has never used before.\n\nGUIDE:\nEnough.\n\nThe word hits like command.\n\nEven Knight stills half a breath.\n\nGUIDE:\nHe is compromised by origin.\nNot by function.\nIf you turn on him now,\nyou finish the work Watcher has been unable to do through lower ranks.\n\nFriend looks up into the dark.\n\nFRIEND:\nYou knew.\n\nGUIDE:\nYes.\n\nHARJEEV:\nSince when.\n\nGUIDE:\nSince before he reached your road.\n\nThat nearly breaks Harjeev's pen in half.\n\nHARJEEV:\nYou let a copy of the enemy into my camp?\n\nGUIDE:\nI let a blade with choice enter a camp that needed it.\n\nO.O:\nThat is the kind of sentence villains say while sounding wise.\n\nKAIS, softly:\nAnd heroes.\nWhich is the problem."},
  {t:"[SCENE 6 — THE REAL STRIKE]\nWatcher doesn't wait for their trust to fail naturally.\nHe triggers it.\n\nThe black transfer script under M.R's seat surges.\nNot to move him.\nTo use him.\n\nM.R staggers as if a hook just caught under the ribs.\nBoth hands to the table edge.\nEyes blackening for one terrible second.\n\nWATCHER:\nCome back.\n\nM.R:\nNo.\n\nEvery signal stone in the room cracks at once.\n\nNeon screams a warning.\nToo late.\n\nThe table explodes outward in black-light fragments.\n\nThe camp is thrown.\n\nAddy loses the shot.\nO.O loses footing.\nYassine hits the floor hard.\nHarjeev goes down under ledger wood and splintered signal glass.\nKnight rolls through it.\nChug takes a shard across the cheek and is already moving before blood knows what it is doing.\n\nM.R is at the center of the blast.\nStill standing.\nBarely.\nHalf-lit by transfer script climbing his veins.\n\nCHUG:\nM.R!\n\nM.R looks at him through pain so bad it strips the old rank down to naked choice.\n\nM.R:\nDon't let them follow the pull.\n\nThen he cuts his own palm across the table core and drives blood into the black script.\n\nWrong choice.\nCorrect choice.\nSuicidal choice.\nExactly his style.\n\nThe whole transfer grid folds inward instead of outward.\nThe blast reverses.\nThe room survives.\nThe table doesn't.\n\nAgain.\n\nM.R goes down with it."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 7 — PART 45 BREAK]\nWhen the smoke clears,\nthe second table is broken in half.\n\nAgain.\n\nM.R is alive.\nBadly.\nTransfer-burned across one arm.\nOld side wound reopened.\nConsciousness flickering.\n\nThe camp stands in a ring around him that is not trust and not murder and not mercy either.\n\nJust fracture.\n\nChug drops to one knee beside him anyway.\n\nO.O doesn't stop him.\nThat matters.\n\nSOLO:\nYou touch him,\nyou decide.\n\nCHUG:\nI know.\n\nM.R opens one eye.\n\nM.R:\nGood.\nFinally.\n\nEven now.\nEven here.\nHe still sounds like himself.\n\nThat may be the cruelest part.\n\nFriend kneels on the other side and presses cloth to the reopened wound with hands that do not fully forgive what they are helping.\n\nFRIEND:\nYou should've told us.\n\nM.R:\nYes.\n\nHARJEEV, bleeding from one brow:\nUnderstatement of the year.\n\nWATCHER's voice is gone from the room.\nNot defeated.\nWithdrawn.\nSatisfied enough that the cut has been made.\n\nThe camp hears its own damage breathing."},
  {t:"[SCENE 8 — END OF 45]\nHarjeev cannot write the ledger line immediately.\nNot because he doesn't know what happened.\nBecause what happened refuses to fit inside the old columns.\n\nEventually he carves one sentence onto a loose plank from the destroyed second table.\n\nM.R —\nEXPOSED / NOT RESOLVED\n\nHe slams the plank down where the table used to be.\n\nNo one argues with the wording.\n\nSystem text flickers like a dying relay.\n\nSYSTEM:\n\"TABLE STATUS:\nDESTROYED\"\n\"M.R.\nORIGIN:\nEXPOSED\"\n\"CAMP STATUS:\nFRACTURED\""},
  {t:"— END OF PART 45 —",end:true},
  // PART 46 — THREE WANTS COMMAND
  {part:46,t:"PART 46 — THREE WANTS COMMAND",col:'#d4a017'},
  {t:"[SCENE 1 — AFTER THE BREAK]\nNo one sleeps in the same place after Part 45.\n\nNot because they fear attack.\nBecause they fear each other being forced into answers too fast.\n\nThe room around the broken table becomes sectors without heart.\nEfficient.\nCold.\nTemporary.\n\nHarjeev rebuilds triage under the west wall.\nKnight moves the route board to a standing slate.\nAddy keeps roof watch longer than necessary.\nO.O sharpens blades she does not need sharpened.\nSolo trains until the ground under him gives up.\nRee takes count aloud under his breath just to keep rhythm from rotting.\nNeon refuses the signal line for one whole morning and nobody makes him take it.\nKais jokes less.\n\nThat last part is the worst sign.\n\nM.R survives the blast.\nOf course he does.\nSurvival and bad timing seem married in him.\n\nHarjeev treats him under guard.\nNot because M.R resists.\nBecause the camp doesn't know what the right amount of trust looks like anymore.\n\nM.R accepts the guard without protest.\nThat might hurt worse than defiance would.\n\nCHUG finds him at dawn under bandage and chain-light.\n\nCHUG:\nYou could've told me.\n\nM.R:\nYes.\n\nCHUG:\nYou keep saying yes like it solves anything.\n\nM.R:\nNo.\nI say yes because lying now would be obscene.\n\nThat is unbearable.\nBecause it is fair."},
  {t:"[SCENE 2 — THREENESS]\nThe lower-rank pattern changes immediately.\n\nOf course it does.\n\nNo.3 doesn't attack flesh first.\nHe attacks command.\n\nNoxrael.\n\nKnight says the name at the standing slate and even the air feels like it organizes itself to hear.\n\nKNIGHT:\nCommand warp.\nHe bends hierarchy.\nMimics authority.\nTurns good orders half-wrong and bad timing into trust collapse.\nIf we face him fractured,\nwe hand him the tool.\n\nFriend looks at the broken table planks.\n\nFRIEND:\nThen we either solve this\nor die discussing it.\n\nO.O:\nGood sentence.\n\nKais finally smiles a little.\n\nKAIS:\nSee?\nHe's terrifying in exactly the right way.\n\nHarjeev points with the pen.\n\nHARJEEV:\nM.R doesn't command until further notice.\nNo exceptions.\nNo improvisations.\nNo matter how correct the answer sounds.\n\nM.R nods once from the guarded cot.\n\nM.R:\nFair.\n\nKnight doesn't object.\nThat matters.\nChug hates that it matters.\nStill true."},
  {t:"SYSTEM: FIGHT",fight:11},
  {t:"[SCENE 3 — NOXRAEL'S OPENING]\nThe first Noxrael strike is simple.\n\nThree false commands delivered in their own voices through the signal lines.\n\nOne sounds like Knight.\nOne like Harjeev.\nOne like Chug.\n\nAll wrong by a degree.\n\n\"Shift med to south.\"\n\"Open east relay.\"\n\"Collapse left patrol.\"\n\nThe camp catches two.\nMisses one.\nA supply cart nearly leaves its sector before Solo physically blocks it.\n\nSOLO:\nNo.\n\nThe guard hauling it blinks in confusion.\n\nGUARD:\nCaptain said—\n\nSOLO:\nNo he didn't.\nHe said almost what you heard.\n\nThat's the horror.\nNoxrael doesn't need exact imitation.\nHe just needs trust to be lazy.\n\nKnight sees the shape immediately.\n\nKNIGHT:\nFrom now on,\nno order stands unless confirmed by mark or eyes.\nNo voice alone.\nNo signal alone.\nNo instinct alone.\n\nNEONKD:\nThat slows everything.\n\nM.R answers from the cot before he can stop himself.\n\nM.R:\nGood.\n\nThe room turns toward him.\nNot violent.\nWorse.\nMeasured.\n\nM.R exhales once.\nLooks away.\n\nM.R:\nSorry.\n\nThat lands strangely.\nNo one here is used to hearing him say sorry.\nMaybe that is why it sounds real."},
  {t:"[SCENE 4 — CHUG AND M.R]\nLater,\nChug pulls a chair to the guard line and sits facing him.\n\nNo anger first.\nJust the thing under anger.\n\nCHUG:\nWas any of it fake?\n\nM.R looks at the bandage.\nAt the floor.\nThen straight at him.\n\nM.R:\nNo.\nNot the camp.\nNot the fights.\nNot the seat.\nNot you.\n\nCHUG:\nWatcher.\n\nM.R:\nIs the original route.\nYes.\n\nCHUG:\nDid he plan you?\n\nM.R:\nHe permitted me.\nWhich is different and worse.\n\nChug takes that in.\nHates how much it sounds like a truth with teeth.\n\nCHUG:\nDo you want to go back?\n\nM.R's answer is immediate.\n\nM.R:\nNo.\n\nNo performance.\nNo speech.\nNo half-line.\nJust no.\n\nThat matters.\nMore than Chug wants it to."},
  {t:"[SCENE 5 — NOXRAEL IN PERSON]\nThree comes at dusk in full command bloom.\n\nNoxrael doesn't walk.\nHe arrives surrounded by mirrored officers wearing half-masks shaped like his own.\nEvery one of them issuing corrected versions of each other.\nEvery one of them believable until the last inch.\n\nAnd at the center,\nNoxrael himself.\nTall.\nCold.\nArmor segmented like rank bars made flesh.\nA command baton at the hip.\nNo heavy weapon.\nHe doesn't need one.\nPeople do enough damage when led badly.\n\nNOXRAEL:\nGood.\nYou broke your own table for me.\n\nHarjeev actually snarls.\n\nHARJEEV:\nI am beginning to miss the simple ones.\n\nKNIGHT:\nHold.\nNo one answers his voice.\nNo one obeys outside marks.\n\nNoxrael smiles under the mask slit.\n\nNOXRAEL:\nAnd yet half of you already hear the wrong man when the wounded one speaks.\n\nThe whole camp feels that.\nWhich means Three is already winning something.\n\nNot enough.\nNot if structure survives the feeling."},
  {t:"[SCENE 6 — FIRST COMMAND WAR]\nThis battle is uglier than Seven and less honest than Eight.\n\nEvery lane comes with a counterfeit instruction.\nEvery movement has a better-sounding wrong version whispered into it.\n\nChug hears \"left\" in Knight's voice when Knight signs right.\nAddy hears \"release\" in Harjeev's voice before the arrow should leave.\nNeon hears \"ping east\" when the board says west.\nYassine hears \"trust the old instinct\" in a tone that sounds too much like belonging.\nSolo hears \"finish the run\" in a rhythm that smells like chain corridors.\nO.O hears nothing and therefore survives the first wave better than most.\n\nGood.\nSometimes damaged people ignore the prettiest traps.\n\nM.R does not command.\nHe sits under guard and bleeds intelligence into the room through one allowed function:\nspotting counterfeit patterns.\n\nM.R:\nThat one isn't Knight.\nThe pause is wrong.\nThat one isn't Harjeev.\nToo much ego.\nThat one isn't Chug.\nToo clean.\n\nHarjeev hates how useful that is.\nUses it anyway."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 7 — CAMP HOLDS FRACTURE]\nThey do not beat Noxrael today.\nThey survive him.\n\nThat is not failure.\nKnight says so twice because Chug needed to hear it and refused to ask.\n\nNoxrael takes three sectors and loses two officers.\nHe almost turns Addy on O.O with a false cover order.\nRee saves it by striking the floor hard enough to reset the room's rhythm.\nFriend literally grabs Yassine by the face and points his eyes the right direction when a false Chug voice nearly sends him into an ambush.\nKais ruins a whole command chain by mocking the wrong order out loud until even the confused fighters realize it doesn't fit.\n\nKAIS:\nNo one who knows Chug would say \"withdraw elegantly.\"\nPlease.\nAt least flatter me with believable lies.\n\nThe room almost laughs.\nThat laughter saves a lane.\n\nNoxrael notices.\n\nNOXRAEL:\nInteresting.\nThe clown is a stabilizer.\n\nKAIS:\nFinally.\nA title with dignity.\n\nAt the end,\nThree withdraws because he has learned enough and taken too little.\n\nBad.\nUseful.\nWar."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 8 — END OF 46]\nHarjeev updates the standing slate by lantern.\n\nDRAKO 3 —\nACTIVE\nFIRST COMMAND WAR SURVIVED\n\nBelow it,\nin a line Chug notices but does not comment on:\n\nM.R —\nWITHHELD / STILL USEFUL\n\nM.R sees it too.\nDoes not smile.\nGood.\nThis is not a smiling line.\n\nGuide speaks over the dark rafters.\n\nGUIDE:\nHe wants the camp to choose whether utility is stronger than hurt.\n\nFriend looks up into the dark.\n\nFRIEND:\nAnd what do you want?\n\nLong pause.\n\nGUIDE:\nFor you to survive long enough to make the answer worth the damage.\n\nSystem text burns low.\n\nSYSTEM:\n\"DRAKO 3 STATUS:\nACTIVE\"\n\"CAMP STATUS:\nFRACTURED / HOLDING\""},

  {t:'[BOSS GATE — Nexter No.1 Prism]\nThe route compresses. Everyone feels the rank pressure before the strike.\nThis is the wall for THREE WANTS COMMAND.',gl:true,col:'#d4a017'},
  {t:'SYSTEM: BOSS — NEXTER NO.1 PRISM',fight:15},
  {t:"— END OF PART 46 —",end:true},
  // PART 47 — WE CHOOSE THE LINE
  {part:47,t:"PART 47 — WE CHOOSE THE LINE",col:'#d4a017'},
  {t:"[SCENE 1 — THIRD TABLE? NO. STANDING SLATE.]\nNo one rebuilds the table yet.\n\nThat is a choice.\n\nNot because wood is scarce.\nBecause confidence is.\n\nSo the camp works from the standing slate and moving boards\nforcing everyone to remain on their feet when decisions happen.\n\nFriend says it is ugly.\nHarjeev says ugly survived yesterday.\nKnight says beauty can wait until after Three.\nNo one argues with the summary.\n\nM.R remains under watch,\nbut the watch is thinner now.\nNot trust.\nNot yet.\nFunction.\n\nChug spends more time near him than he admits to anyone.\nLess than he wants to.\n\nYASSINE notices.\nOf course.\n\nYASSINE:\nYou deciding?\n\nCHUG:\nTrying.\n\nYASSINE:\nThat's worse.\n\nCHUG:\nI know.\n\nYASSINE:\nGood.\n\nThey stand in silence a while.\nThen:\n\nYASSINE:\nIf he wanted us dead,\nwe had cleaner chances to die.\n\nThat is not forgiveness.\nThat is evidence.\nRight now evidence matters more."},
  {t:"[SCENE 2 — FRIEND'S FUNCTION]\nFriend takes over a part of camp no one knew was leader-shaped until he arrived.\n\nMood discipline.\n\nNot morale.\nNot speeches.\nNot comfort.\nSimpler.\nHarder.\n\nHe knows when Addy needs a harder assignment,\nwhen O.O needs not to be spoken to for half an hour\nwhen Neon needs someone to listen to the signal logic before it turns into muttering\nwhen Kais is joking because he sees too much,\nwhen Solo is training too hard because stillness reminds him of restraints\nwhen Chug is about to turn pain into an individual project instead of a shared one.\n\nNo one appointed him to it.\nThat is why it works.\n\nM.R sees it.\nAgain.\nSays nothing.\nAgain.\nThat silence says enough."},
  {t:"[SCENE 3 — NOXRAEL'S SECOND WAR]\nThree comes back with mirrored captains,\none for each lane.\n\nThey all wear voice-boxes.\nAll issue correct orders from half-wrong mouths.\nThe camp is better prepared.\nStill the fight is awful.\n\nKnight solves part of it with mark-only commands.\nHarjeev solves part with supply gating.\nNeon solves part with signal verification.\nFriend solves part by literally moving fighters by shoulder and eye line instead of trusting shouted direction.\nRee sets the whole cadence from the center so that everyone has a body-rhythm truer than counterfeit voices.\nKais weaponizes mockery as recognition.\nO.O and Addy kill captains before they can repeat bad lines.\nSolo and Yassine ruin the retreat loops.\nChug finally stops trying to \"lead from visible front\" and instead becomes the breaker where the camp points him.\n\nThat is the last lesson from Twelve through Three.\nHe understands it now.\n\nGood.\nIt only cost half a war."},
  {t:"SYSTEM: FIGHT",fight:12},
  {t:"[SCENE 4 — M.R'S CHOICE]\nThe right-side lane collapses.\nNot from enemy weight.\nFrom a false M.R voice.\n\nThat is the cruelest thing Three has done yet.\n\n\"Open the hold line.\"\nExact cadence.\nExact dryness.\nExact rank.\n\nThree fighters move on it automatically.\n\nM.R hears it from the watch line,\ngoes white,\nand stands before Harjeev can physically stop him.\n\nHARJEEV:\nNo!\n\nM.R:\nHe used my voice.\n\nHe tears the watch chain free and steps into the lane anyway.\n\nEvery blade in camp turns half toward him.\nEvery heartbeat stretches.\n\nM.R doesn't draw center.\nDoesn't explain.\nHe walks straight into the confusion and shouts one sentence so sharp it cuts the counterfeit apart.\n\nM.R:\nIf I tell you to open without looking me in the eyes\nyou kill me first.\n\nThe lane stills.\n\nThe false order dies.\n\nAnd with it,\na whole section of the camp makes its choice.\n\nNot forgiveness.\nRecognition.\n\nNoxrael sees it.\nHis mask tilts.\n\nNOXRAEL:\n...There.\nYou made the wrong wound useful.\n\nM.R answers without looking up.\n\nM.R:\nNo.\nThey did."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 5 — THREE FALLS]\nThat is the turn.\n\nFrom there the command war becomes killable.\n\nThe captains drop.\nThe mirrored voices fail.\nThe camp stops hearing orders as sound and starts hearing them as relationship.\nThat is what Three cannot counterfeit.\nNot fully.\n\nFriend catches the drift and calls it out.\n\nFRIEND:\nEyes first!\nName second!\nMove third!\n\nEveryone follows.\nGood.\nThat sentence deserves wood.\n\nNoxrael realizes the room is leaving him.\nFast.\n\nHe tries one final split-command burst.\nToo late.\n\nAddy and O.O kill the outer mirrors.\nSolo and Yassine cut the center return.\nRee's cadence pounds the fake voices flat.\nNeon crashes the relay.\nKais turns one reflected captain into a spinning mistake with a disc-to-mask shot.\nKnight and M.R—yes\nM.R\nnow back in the lane despite the pain—cross command lines on the same breath.\n\nChug hits the opening they build.\n\nRage 1 clean.\nNo scream.\nNo speech.\nJust the work.\n\nFrame-bolt through the command baton hand.\nElbow to the mask split.\nKnee through the opened seam.\nThree falls.\n\nNOXRAEL:\n...Interesting.\nYou chose the line over the lie.\n\nCHUG:\nYeah.\n\nNOXRAEL:\nThen Two will take the names instead.\n\nHe laughs once.\nNot bitter.\nJust certain.\nThen leaves the Three mark behind and withdraws under his own half-broken discipline."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 6 — END OF 47]\nHarjeev writes it down with the steadier hand he only has when the room has earned it.\n\nDRAKO 3 —\nNOXRAEL\nDEFEATED\n\nThen he adds,\nunder everyone's line:\n\nM.R —\nFIELD TRUST PARTIAL\n\nM.R reads it.\nLooks up at Harjeev.\nReally looks.\n\nHARJEEV:\nDon't thank me.\nYou still owe me a table.\n\nKais laughs first.\nGood.\nThe camp needed that.\n\nSystem text burns clearer than after Forty-Six.\n\nSYSTEM:\n\"DRAKO 3 STATUS:\nDOWN\"\n\"M.R.\nSTATUS:\nPARTIAL FIELD TRUST\"\n\"CAMP STATUS:\nCHAIN RESTORED\""},

  {t:'[EXPANDED ENCOUNTER — WE CHOOSE THE LINE]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:9},
  {t:"— END OF PART 47 —",end:true},
  // PART 48 — XOLLONOX
  {part:48,t:"PART 48 — XOLLONOX",col:'#d4a017'},
  {t:"[SCENE 1 — TWO TAKES NAMES]\nVeylos begins by stealing proper nouns.\n\nNot metaphorically.\nActually.\n\nOn the morning after Three falls,\nNeonKd wakes and cannot say Addy's name.\nHe knows her.\nKnows the draw.\nKnows the shoulder.\nKnows the history-shape.\nBut the name is gone.\nA blank where a word should sit.\n\nBy noon it happens to O.O with Solo's name.\nThen Solo with Ree's.\nThen Yassine with Harjeev's.\nThen Chug with Friend's.\n\nPanic would be easy.\nThe camp does not choose easy anymore.\n\nKNIGHT:\nWrite them.\n\nEvery name in camp goes on the standing slate.\nOn the wall.\nOn the ration bins.\nOn the med wraps.\nOn the underside of cups.\nOn the inside of glove straps.\nOn the new brace posts.\n\nHarjeev hates the ink waste and still orders more.\n\nHARJEEV:\nIf Two wants names,\nwe become a library with knives.\n\nFriend nods once.\nGood sentence.\nUgly war.\nCorrect answer."},
  {t:"[SCENE 2 — GUIDE FAILS TO STAY VOICE-ONLY]\nGuide has been voice this whole time.\n\nAir.\nRafter.\nDark corner.\nEdge of fire.\nAbove water.\nInside signal hum.\n\nNow even the voice strains.\n\nVEyLOS's pressure doesn't just attack memory.\nIt attacks relational anchors.\nThat includes whatever weird line Guide has existed on.\n\nThe voice arrives late twice.\nWrong once.\nThen right again.\n\nM.R hears it before most.\n\nM.R:\nHe can't stay abstract against Two forever.\n\nKNIGHT:\nThen the ghost needs to decide whether he's a voice or a man.\n\nChug looks up into the rafters.\n\nCHUG:\nYou hearing that?\n\nThe answer takes too long.\n\nGUIDE:\nYes.\n\nThat one second of delay is enough to frighten everyone who ever thought the unseen thing would always remain stable."},
  {t:"SYSTEM: FIGHT",fight:1},
  {t:"[SCENE 3 — VEYLOS ARRIVES]\nDrako No.2 does not come with spectacle.\nThat would almost be mercy.\n\nVeylos walks into view wearing names he has taken.\n\nNot literally.\nIn the way he speaks.\nThe way his presence makes each fighter doubt the labels on the board and on themselves.\n\nArmor pale beneath black script.\nMask smooth and almost gentle.\nWeapon thin as a writing instrument and twice as cruel.\n\nVEYLOS:\nGood.\nYou wrote yourselves down.\nThat saves me work.\n\nNo one answers first.\nGood.\nWords are dangerous now.\n\nVeylos points once at the standing slate.\nOne whole corner of names fades to gray.\n\nNot erased.\nThreatened.\n\nAddy swears under her breath.\nThen checks the wall where NEONKD still exists in ink.\nGood.\nThe camp is learning to distrust internal certainty faster than the enemy can strip it.\n\nM.R steps beside Chug.\nNot in front.\nThat matters.\n\nM.R:\nHe isn't taking memory.\nHe's taking automatic recall.\nForce it through structure.\nDon't let the brain freewheel.\n\nKNIGHT:\nRepeat names as pairings.\nNever alone.\n\nFriend hears that and amplifies it instantly.\n\nFRIEND:\nNo one says themselves alone.\nPairs only.\nWe remember each other or not at all.\n\nThat becomes the rule."},
  {t:"[SCENE 4 — THE NAME CHAIN]\nThe camp fights Veylos through a chain of names.\n\nAddy calls Chug.\nChug calls Yassine.\nYassine calls Solo.\nSolo calls O.O.\nO.O calls Ree.\nRee calls Neon.\nNeon calls Kais.\nKais calls Harjeev.\nHarjeev calls Knight.\nKnight calls Friend.\nFriend calls M.R.\nM.R calls Chug.\n\nThe loop holds identity where raw memory starts slipping.\n\nIt is beautiful in a war-made way.\nVeylos hates it immediately.\n\nVEYLOS:\nCrude.\nEmotional.\nStrong.\n\nThat last word is the one that matters."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 5 — GUIDE BREAKS FORM]\nHalfway through the battle,\nVeylos turns the pressure on the unseen line.\nThe voice of Guide stutters.\nCuts.\nReturns from the wrong corner.\nThen vanishes entirely for one terrible second.\n\nThe whole camp feels the absence.\n\nThen light,\nblack at the center and silver at the edge,\ntears open above the standing slate\nand a man steps out of it like pain finally admitted shape.\n\nLong coat scorched at the hems.\nEyes too old to belong to the face.\nScar down the hand that has probably held too many worlds together too long.\nPresence built like strategy refusing to die.\n\nGuide is a man.\nAt last.\n\nOr perhaps again.\n\nYassine says it first because no one else has enough breath.\n\nYASSINE:\n...\nWho are you?\n\nHe looks at the room.\nAt Chug.\nAt the camp he has been living inside without body for so long.\n\nThen:\n\nXOLLONOX:\nXollonox.\n\nThe name lands like the roof of a house finally deciding to exist.\n\nChug just stares.\n\nFriend closes his eyes once.\nM.R doesn't look surprised.\nThat matters.\nLater.\n\nHarjeev swears like a man who has just learned one of his ledgers had a pulse all along."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 6 — END OF 48]\nXollonox does not ask forgiveness.\nGood.\nThere isn't time.\n\nXOLLONOX:\nTwo erases what people keep unstructured.\nSo stop keeping yourselves like wounds.\nHold the chain.\n\nKnight doesn't flinch.\nHe accepts the body of the old voice like another command post entering the room.\n\nGood.\nProfessional.\n\nVeylos finally looks annoyed.\n\nVEYLOS:\nThere you are.\nI wondered how long you'd hide in commentary.\n\nXollonox's face does not move.\n\nXOLLONOX:\nLong enough to build them.\nToo long to build myself back.\n\nThat line answers nothing and too much at once.\n\nThe fight is still active.\nTwo is still standing.\nNames are still under siege.\n\nBut the camp now has a body where only a voice lived before.\n\nAnd that changes the war.\n\nSystem text burns almost like revelation.\n\nSYSTEM:\n\"GUIDE IDENTITY REVEALED:\nXOLLONOX\"\n\"DRAKO 2 STATUS:\nACTIVE\""},

  {t:'[EXPANDED ENCOUNTER — XOLLONOX]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:12},
  {t:"— END OF PART 48 —",end:true},
  // PART 49 — TWO FORGETS US
  {part:49,t:"PART 49 — TWO FORGETS US",col:'#d4a017'},
  {t:"[SCENE 1 — XOLLONOX AT THE LINE]\nXollonox fights like a strategist who spent too long as weather.\n\nNo wasted flourish.\nNo need to impress.\nEvery move an answer to pressure geometry.\nHe doesn't overpower Veylos's name theft.\nHe redirects it into written anchors,\nspoken pair-chains,\nand spatial rules around the camp.\n\nAt once the old voice and the new body make sense.\nUnfairly.\n\nKais sees it and mutters to O.O while killing a false-name shade.\n\nKAIS:\nI hate when mysterious people turn out competent.\nIt ruins half the romance.\n\nO.O:\nYou had romance with a ghost?\n\nKAIS:\nI had possibilities.\n\nThat actually buys Chug a breath.\nUseful idiot.\nAgain."},
  {t:"SYSTEM: FIGHT",fight:2},
  {t:"[SCENE 2 — WHY XOLLONOX HID]\nBetween clashes,\nbetween name loops,\nbetween Veylos forcing gray over the walls,\nChug gets one clean question out.\n\nCHUG:\nWhy hide?\n\nXollonox answers while turning a memory-lance off Addy's throat with nothing but placement.\n\nXOLLONOX:\nBecause if I entered as body too early,\nthe system tagged me.\nIf the system tagged me,\nit found you faster.\nIf it found you faster,\nnone of this camp exists.\n\nVEyLOS smiles faintly under the pale mask.\n\nVEYLOS:\nTrue.\nHe is tedious,\nbut he is not wrong.\n\nM.R hears that and something in his face hardens.\n\nNot at Veylos.\nAt the shape of old truths shared by enemies and allies alike."},
  {t:"[SCENE 3 — VEYLOS AND M.R]\nVeylos turns toward M.R as the camp fights the name chain.\n\nVEYLOS:\nCopy.\nYou know the route.\nSay the original name and break their loop.\n\nThe whole camp feels that temptation enter the room like poison vapor.\n\nM.R doesn't move.\n\nVEYLOS:\nOne word.\nThey fracture.\nYou go home.\n\nM.R:\nNo.\n\nVEYLOS:\nYou don't know what home is.\n\nM.R:\nI know enough to refuse yours.\n\nThat answer matters more than it sounds like it should.\n\nBecause Two is not lying.\nBecause M.R is still refusing.\n\nFriend sees that.\nStores it.\nSo does Chug."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 4 — TWO FALLS]\nVeylos's power weakens the more the camp externalizes identity.\n\nNames on walls.\nNames spoken in chains.\nNames carved into weapon grips.\nNames carried by friends instead of memory alone.\n\nFriend makes everyone repeat pairings like prayer with teeth.\nHarjeev marks failing names back onto skin with charcoal.\nNeon turns signal pings into identity confirmations.\nRee pounds cadence for the name loop.\nKais literally sings names off-key just to keep them from becoming sacred enough to fear losing.\n\nKAIS:\nChug!\nYassine!\nAddy!\nO.O!\nRee!\nNeon!\nFriend!\nSolo!\nHarjeev!\nKnight!\nM.R!\nXollonox!\n\nO.O, mid-kill:\nYou are not a singer.\n\nKAIS:\nI am a necessity.\n\nThe room almost laughs.\nThat kills Veylos more effectively than hate does.\n\nBecause his whole doctrine depends on names becoming fragile and private.\nCamp has made them public and shared.\n\nGood.\nThat's how Two loses.\n\nKnight and Xollonox cut the upper command lane.\nAddy and Neon blind the mask seam.\nO.O and Solo destroy the gray anchors.\nRee and Friend hold the name cadence.\nYassine cuts the final retreat line.\nM.R stands with Chug at the center.\n\nOne copy.\nOne original target.\nOne no.\n\nChug opens Rage 1.\n\nNot alone.\n\nM.R steps in beside him anyway,\nwound and all,\nand says the sentence that decides the room:\n\nM.R:\nMy name stays where I choose.\n\nThen he drives the black med clamp—yes\nthat same transfer clamp—straight into Veylos's name-siphon line.\n\nThe device shorts.\nThe whole theft grid stutters.\nChug puts the frame-bolt through the pale mask center.\nKnight's blade follows.\nYassine's cut seals it.\nVeylos falls.\n\nVEyLOS:\n...Interesting.\nYou made identity communal.\nUgly answer.\nStrong answer.\n\nXOLLONOX:\nGood.\nRemember it while retreating.\n\nVeylos leaves the Two mark in the ash and withdraws with half his mask broken away\nthe first Drako to look genuinely uncertain."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 5 — M.R CHOOSES]\nAfter the field quiets,\nM.R nearly collapses.\nChug catches him before the ground does.\n\nAgain,\nnot alone.\n\nM.R looks up at Chug and for the first time the rank is not what lands first.\nJust the man.\n\nM.R:\nThat probably made things official.\n\nCHUG:\nWhat.\n\nM.R:\nThat I'm not his anymore.\n\nChug doesn't answer with a speech.\nGood.\nThose belong to weaker acts.\n\nHe just holds the weight until Harjeev and Friend take it from there.\n\nThat is enough."},
  {t:"[SCENE 6 — END OF 49]\nHarjeev writes it before anyone can sentimentalize the moment.\n\nDRAKO 2 —\nVEYLOS\nDEFEATED\n\nThen:\n\nXOLLONOX —\nCONFIRMED\nM.R —\nSELF-DECLARED AGAINST ORIGINAL\nNAME CHAIN —\nSUCCESSFUL\n\nThe camp reads the lines like they are doors.\n\nBecause they are.\n\nOnly No.1 remains.\nAnd whatever Watcher truly is now that copy and camp and original have all spoken in one war.\n\nSystem text burns bright and terrible.\n\nSYSTEM:\n\"DRAKO 2 STATUS:\nDOWN\"\n\"GUIDE / XOLLONOX STATUS:\nACTIVE\"\n\"M.R.\nALIGNMENT:\nSELF-CHOSEN\""},

  {t:'[EXPANDED ENCOUNTER — TWO FORGETS US]\\nSIDE ROUTE CLASH. The chapter breathes through another live combat beat instead of cutting early.'},
  {t:'SYSTEM: FIGHT',fight:16},
  {t:"— END OF PART 49 —",end:true},
  // PART 50 — CROWN
  {part:50,t:"PART 50 — CROWN",col:'#d4a017'},
  {t:"[SCENE 1 — THE LAST BOARD]\nOnly one Drako mark remains unnamed beneath the war slate.\n\nNo.1.\nAzrakeel.\nCrown Drako.\n\nNo one speaks his name lightly.\n\nThe camp stands around the standing slate because no one has rebuilt the second table yet.\nNot because there isn't time.\nBecause the last decision should be made standing.\n\nHarjeev counts supplies one final time.\nNot abundance.\nEnough.\nThat is all wars ever truly promise.\n\nKnight marks the assault lanes.\nNot many.\nOnly the ones that matter.\n\nXollonox stands opposite him now,\nno longer voice-only,\nno longer hidden.\nThe room accepts the fact of him because the war demands more than comfort.\n\nM.R stands at Chug's right,\nbandaged,\nthinner,\nalive by refusal.\nNot original.\nStill here.\nStill chosen.\n\nFriend,\nRee,\nSolo,\nYassine,\nAddy,\nO.O,\nNeonKd,\nKais.\n\nThe whole roster.\n\nTora's ring still waits on the board edge.\nAn empty seat shaped like future.\n\nXOLLONOX:\nNo.1 is not a stronger wall.\nHe is a crown.\nEverything lower exists to make his field inevitable.\nBreak the inevitability.\nThe man follows.\n\nM.R:\nAnd Watcher will be there.\n\nNo one flinches now when he says it.\nThat is growth.\nUgly.\nHard-won.\nReal.\n\nCHUG:\nThen we end both."},
  {t:"[SCENE 2 — AZRAKEEL]\nThe Crown field is built over the old throne routes\nwhere void and world both think they own the floor.\n\nAzrakeel stands on a black dais under a broken halo of metal and script.\nTall in a way that feels ordained.\nArmor layered like ceremonial ruin.\nLong cape cut into segmented banners that move like rank sigils in wind that doesn't exist.\nOne great blade at rest.\nNot dragged.\nNot flaunted.\nPromised.\n\nAnd beside the dais,\nhalf in shadow and half in old pressure,\nstands Watcher.\n\nNot as rumor.\nNot as signal.\nNot as voice through wire.\n\nPresent.\n\nFamiliar in the worst way.\nThe shape of Chug's lost line made into command.\n\nThe original M.R.\n\nThe camp feels that and locks tighter.\nNot from terror.\nFrom recognition.\n\nWATCHER:\nYou built farther than I expected.\n\nM.R answers him.\nThe copy.\nThe wound.\nThe man from the wrong route.\n\nM.R:\nSo did I.\n\nAzrakeel's voice rolls over all of it,\ncold enough to make even lower-rank Drakos feel like weather.\n\nAZRAKEEL:\nGood.\nThen the last break will be worth witnessing."},
  {t:"[SCENE 3 — FINAL WAR, NOT DUEL]\nThe fight is too large for one perspective.\n\nThat is right.\nThe story grew out of singularity long ago.\n\nAddy and Neon take the signal towers.\nO.O and Solo break the crown guard flanks.\nRee and Friend hold the central cadence and cohesion line.\nKais turns impossible angles into alive ones.\nKnight and Xollonox attack the inevitability layers themselves\ncutting the field around Azrakeel instead of the man first.\nHarjeev runs the war from the rear with supply reality and med timing.\nYassine and Chug drive the living center.\nM.R moves between them and the Watcher line,\nbecause some fights are blood\nand some are origin.\n\nAzrakeel is overwhelming.\nOf course.\nNo.1 has to feel like the whole ladder was only scaffolding for his existence.\n\nHe cuts sectors out of the field.\nNot just fighters.\nSectors.\nAreas where outcome itself starts leaning against camp.\n\nWatcher tries a different cruelty.\nNot command.\nNot name theft.\nNot route.\nHe attacks belonging.\n\nHe speaks to Yassine in the old tone.\nTo Solo in rank memory.\nTo Friend in responsibility.\nTo Chug in abandonment.\nTo M.R in origin.\nTo Xollonox in failure.\n\nThe camp holds because it learned to do so together.\nBecause every lower Drako taught one defense that now matters all at once.\n\nAddy and Neon deny sight theft.\nO.O and Solo deny clean pursuit.\nRee and Friend deny rhythm break and social fracture.\nKais denies despair with unbearable motion and irreverence.\nKnight denies structural collapse.\nXollonox denies abstraction.\nM.R denies origin's claim.\nYassine denies lost memory its power over present action.\nChug denies the old need to be the whole wall.\n\nThat is why the Crown begins to crack."},
  {t:"SYSTEM: FIGHT",fight:3},
  {t:"[SCENE 4 — WATCHER AND COPY]\nAt the center of the field,\nwhile Azrakeel holds back five fighters with one impossible blade\nM.R reaches Watcher.\n\nNot through power.\nThrough recognition.\n\nWATCHER:\nYou are a route error.\n\nM.R:\nMaybe.\nStill mine.\n\nWATCHER:\nYou were grown to return.\n\nM.R:\nI stayed to choose.\n\nWatcher almost smiles.\nAlmost.\nIt is ugly to watch two selves argue over whether personhood is theft.\n\nChug gets there as they clash.\nNot to rescue.\nTo witness and hold the line around them.\n\nM.R turns just enough to speak without taking his eyes off the original.\n\nM.R:\nWhen I say now,\nyou do not hesitate.\n\nCHUG:\nWhat are you doing.\n\nM.R:\nCorrecting origin.\n\nThat sounds like him.\nThat is why Chug hates understanding it."},
  {t:"SYSTEM: FIGHT",fight:4},
  {t:"[SCENE 5 — AZRAKEEL BREAKS]\nKnight and Xollonox finally cut the inevitability ring.\nAddy blinds the left crown slit.\nNeon collapses the upper relay.\nO.O takes one knee line.\nSolo binds the return arc.\nRee's cadence drives the whole roster into one shared strike window.\nFriend keeps everyone inside each other's function.\nKais turns the impossible last angle into a usable one with a throw that should not work and does.\n\nKAIS:\nPlease admire this after surviving.\n\nYASSINE:\nNo promises.\n\nChug opens Rage 1\nthen 2's edge for exactly one clean heartbeat—\nenough to make the final approach without burning himself stupid.\n\nAzrakeel sees it.\nRespects it.\nToo late.\n\nChug does not hit alone.\n\nHe hits with the roster.\n\nFrame-bolt from center.\nAddy's arrow through the lifted seam.\nO.O and Solo crossing the leg anchors.\nYassine on the blind flank.\nKnight's blade at command line.\nXollonox on the crown script.\nRee's count driving every body.\nFriend's line holding everyone inside the same answer.\nKais's disc shattering the final balance ward.\nNeon dropping the relay.\nHarjeev screaming the med and fallback timing from behind because war is still logistics no matter how pretty climax tries to be.\n\nAzrakeel falls.\n\nNot elegantly.\nLike a regime.\n\nTo one knee.\nThen lower.\nThen enough.\n\nAZRAKEEL:\n...Good.\nAt least the last camp was worth the Crown.\n\nCHUG:\nYou're done.\n\nAZRAKEEL:\nNo.\nI am completed.\n\nHe drops the One mark at the dais base.\nNo retreat.\nNo bargain.\nJust the acceptance that the ladder beneath him has already fallen.\n\nThat is its own kind of death."},
  {t:"SYSTEM: FIGHT",fight:5},
  {t:"[SCENE 6 — NOW]\nWatcher moves.\n\nM.R had promised a now.\n\nThis is it.\n\nHe drives the black transfer clamp and his own blood into the old throne script binding him to the original route.\nNot to kill Watcher.\nTo sever claim.\n\nThe backlash is immediate.\nTerrible.\nOld light.\nTransfer fire.\nAll the ways a copy can be punished for deciding he is not property.\n\nCHUG:\nM.R!\n\nM.R doesn't look back.\n\nM.R:\nNow.\n\nChug obeys.\nFinally.\nFully.\nNo hesitation.\n\nHe takes the opening M.R tears in Watcher's old pressure and strikes through with everything left that is not blind.\nNot just Rage.\nNot just hate.\nNot just history.\nAll of it structured.\n\nYassine joins.\nThen Solo.\nThen Friend.\nThen O.O.\nThen Addy.\nThen all of them in the only way the act could end:\nnot with one man correcting abandonment,\nbut with the camp refusing to surrender any of its returned names.\n\nWatcher breaks under the thing he could never build honestly:\nshared belonging.\n\nThe original M.R,\nthe Watcher,\nlooks at the copy through collapsing route light.\n\nWATCHER:\nYou chose them.\n\nM.R\nburning and smiling and dying and alive all at once:\nYeah.\n\nThen the throne script tears.\nThe old route collapses.\nWatcher is gone into whatever remains when command without love finally loses its host."},
  {t:"SYSTEM: FIGHT",fight:6},
  {t:"[SCENE 7 — AFTER]\nSilence.\nThen breath.\nThen pain.\nThen inventory.\nThen the living.\n\nHarjeev is already moving before anyone tries tragedy.\nGood.\nThat is camp.\n\nAzrakeel down.\nWatcher gone.\nField collapsing.\nRoster wounded.\nNo tables.\nNo throne.\nStill the camp lives.\n\nM.R survives.\n\nBarely.\n\nNot because war was kind.\nBecause the route severed without fully taking him.\n\nHarjeev hates that he is relieved.\nFriend notices.\nSays nothing.\nGood.\n\nXollonox stands in the broken crown light and looks older than the body can carry.\n\nCHUG:\nIs it over?\n\nXOLLONOX:\nThis act is.\n\nThat answer is honest enough to keep."},
  {t:"[SCENE 8 — THE LAST LEDGER / THE NEXT TABLE]\nBack at camp,\nor what will become camp again,\nHarjeev writes the final lines on salvaged slate.\n\nDRAKO 1 —\nAZRAKEEL\nDOWN\n\nWATCHER ROUTE —\nSEVERED\n\nROSTER —\nHELD\n\nThen\nafter a long look at everyone still breathing:\n\nCAMP —\nCONTINUES\n\nNo one jokes over that.\nNot even Kais.\n\nThen Kais clears his throat.\n\nKAIS:\nI would just like it recorded somewhere that I was magnificent.\n\nO.O:\nDenied.\n\nKAIS:\nCruel woman.\n\nADDY:\nCorrect woman.\n\nYassine laughs.\nSolo shakes his head.\nNeon mutters that he has signal proof of at least three ridiculous saves.\nRee taps a soft count on the new slate edge.\nFriend starts assigning sleeping rotations before anyone can turn surviving into a mood.\nKnight already thinks about the next structure.\nXollonox says nothing and is finally allowed to.\nM.R sits at the edge of the ruined camp and breathes like a man who chose wrong for the right reasons and got to keep the result anyway.\n\nChug looks at all of them.\n\nNot a roster on a board.\nA camp.\nA real one.\nScarred.\nEarned.\nHeld.\n\nHe takes Tora's ring from where it has waited through all of this\nand sets it on the center slate beside the final mark.\n\nA place still open.\nNot because the story is unfinished.\nBecause camp is.\n\nSystem text burns one last time.\n\nSYSTEM:\n\"DRAKO 1 STATUS:\nDOWN\"\n\"WATCHER ROUTE:\nENDED\"\n\"ROSTER STATUS:\nHELD\"\n\"CAMP STATUS:\nCONTINUES\""},
  {t:"— END OF PART 50 —",end:true},
];

function expandLateStoryDialogue(){
  const expanded = [];
  let activePart = 1;

  function pushNarr(part, line, src){
    const t = String(line || '').trim();
    if(!t) return;
    expanded.push({ part: part, t: t, gl: !!src.gl, col: src.col });
  }

  SCRIPT.forEach((src)=>{
    if(src.part != null) activePart = Number(src.part);
    const part = activePart;

    if(!src || src.fight || src.end || typeof src.t !== 'string'){
      expanded.push(src);
      return;
    }

    const raw = src.t.replace(/\r/g,'').trim();
    if(!raw){
      expanded.push(src);
      return;
    }

    if(/^PART\s+\d+/i.test(raw)){
      expanded.push(src);
      return;
    }

    if(part < 14){
      expanded.push(src);
      return;
    }

    const lines = raw.split('\n').map(s=>s.trim()).filter(Boolean);
    if(!lines.length){
      expanded.push(src);
      return;
    }

    let speaker = '';
    let buffer = [];

    const flush = ()=>{
      const joined = buffer.join(' ').replace(/\s+/g,' ').trim();
      if(!joined) return;
      if(speaker){
        expanded.push({ part: part, t: speaker + ': ' + joined, gl: !!src.gl, col: src.col });
      }else{
        expanded.push({ part: part, t: joined, gl: !!src.gl, col: src.col });
      }
      buffer = [];
    };

    for(const line of lines){
      if(/^\[SCENE\b/i.test(line)) continue;
      if(/^—\s*END OF PART/i.test(line)){ flush(); expanded.push(src); speaker=''; buffer=[]; continue; }

      const m = line.match(/^([A-Z][A-Z0-9 .'\-()]{1,40}):\s*(.*)$/);
      if(m){
        flush();
        speaker = m[1].trim();
        if(m[2] && m[2].trim()) buffer.push(m[2].trim());
        continue;
      }

      if(/^(SYSTEM|CHAT|DONATION|REFLECTION):/i.test(line) && !speaker){
        flush();
        expanded.push({ part: part, t: line, gl: !!src.gl, col: src.col });
        continue;
      }

      if(/^\[.*\]$/.test(line)){
        flush();
        speaker = '';
        expanded.push({ part: part, t: line, gl: !!src.gl, col: src.col });
        continue;
      }

      const standaloneNarr = /^(Pause\.|Silence\.|Silence stretches\.|Guide continues\.|Good\.|Hard\.|Again\.|Barely\.|Fast\.|Direct\.|No aura\.|No training that morning\.|No jokes from Raevan\.)$/i.test(line);
      if(!speaker && (standaloneNarr || buffer.length === 0)){
        flush();
        expanded.push({ part: part, t: line, gl: !!src.gl, col: src.col });
        continue;
      }

      buffer.push(line);
    }
    flush();
  });

  SCRIPT.splice(0, SCRIPT.length, ...expanded);
}
expandLateStoryDialogue();


function getAllStoryParts(){
  return Array.from(new Set(SCRIPT.filter(s=>s.part!=null).map(s=>Number(s.part)))).sort((a,b)=>a-b);
}
function buildStoryIndexByPart(){
  const idx={};
  getAllStoryParts().forEach(p=>idx[String(p)]=getPartStartIndex(p));
  return idx;
}

// ── SAVE/LOAD ──
function defaultSave(){
  return{coins:5000,weapon:'none',armor:'none',rageMode2:false,
    strengthUpg:0,speedUpg:0,enduranceUpg:0,
    currentPart:1,
    storyIndexByPart:buildStoryIndexByPart(),
    chapterUnlocked:1,pendingFightType:null,pendingFightPart:null,pendingFightIndex:null};
}
function saveGame(extra={}){
  try{
    const base=window.__saveData||defaultSave();
    const next={...base,coins,weapon,armor,rageMode2,strengthUpg,speedUpg,enduranceUpg,currentPart,...extra};
    if(!next.storyIndexByPart)next.storyIndexByPart=buildStoryIndexByPart();
    window.__saveData=next;
    localStorage.setItem(SAVE_KEY,JSON.stringify(next));
  }catch(e){}
}
function loadGame(){
  try{const raw=localStorage.getItem(SAVE_KEY);window.__saveData=raw?JSON.parse(raw):defaultSave();}
  catch(e){window.__saveData=defaultSave();}
  const s=window.__saveData;
  coins=s.coins||0;
  var _savedWeapon = s.weapon||'none';
  if(_savedWeapon === 'boxing_gloves'){
    var _armOwned = (s.armory && s.armory.owned && s.armory.owned.weapon) || [];
    _savedWeapon = _armOwned.includes('boxing_gloves') ? 'boxing_gloves' : 'none';
  }
  weapon=_savedWeapon;armor=s.armor||'none';rageMode2=!!s.rageMode2;
  strengthUpg=s.strengthUpg||0;speedUpg=s.speedUpg||0;enduranceUpg=s.enduranceUpg||0;
  currentPart=s.currentPart||1;
  syncCurrentPartGlobal();
  if(UI.cVal) UI.cVal.innerText=coins; sf2MirrorEconomy();
  const WEAPON_ID = Object.freeze({
  knuckle:'knuckle', dagger:'dagger', katana:'katana', staff:'staff', scythe:'scythe', claws:'claws', hammer:'hammer',
  sword:'sword', nunchaku:'nunchaku', knives:'knives', spear:'spear', whip:'whip', boxing_gloves:'boxing_gloves',
  sai:'sai', woodstick:'woodstick'
});
const staff = WEAPON_ID.staff;

const allItems=['knuckle','dagger','katana','staff','scythe','claws','hammer','knives',
    'lightarmor','heavyarmor','voidarmor','rage2','strength','strength2','speed','speed2','endurance','endurance2'];
  allItems.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  if(weapon!=='none'){const el=document.getElementById(`buy-${weapon}`);if(el)el.classList.add('bought');}
  if(armor!=='none'){const el=document.getElementById(`buy-${armor}`);if(el)el.classList.add('bought');}
  if(rageMode2){const el=document.getElementById('buy-rage2');if(el)el.classList.add('bought');}
  if(strengthUpg>=1){const el=document.getElementById('buy-strength');if(el)el.classList.add('bought');}
  if(strengthUpg>=2){const el=document.getElementById('buy-strength2');if(el)el.classList.add('bought');}
  if(speedUpg>=1){const el=document.getElementById('buy-speed');if(el)el.classList.add('bought');}
  if(speedUpg>=2){const el=document.getElementById('buy-speed2');if(el)el.classList.add('bought');}
  if(enduranceUpg>=1){const el=document.getElementById('buy-endurance');if(el)el.classList.add('bought');}
  if(enduranceUpg>=2){const el=document.getElementById('buy-endurance2');if(el)el.classList.add('bought');}
}
function updateChapterUnlock(part){
  const unlocked=Math.max((window.__saveData?.chapterUnlocked||1),part);
  saveGame({chapterUnlocked:unlocked});
}
function checkpointStory(part,idx){
  const s=window.__saveData||defaultSave();
  s.storyIndexByPart=s.storyIndexByPart||buildStoryIndexByPart();
  s.storyIndexByPart[String(part)]=idx;
  saveGame({storyIndexByPart:s.storyIndexByPart,currentPart:part});
}
function setPendingFight(part,idx,fightType){saveGame({pendingFightPart:part,pendingFightIndex:idx,pendingFightType:fightType});}
function clearPendingFight(){saveGame({pendingFightPart:null,pendingFightIndex:null,pendingFightType:null});}

// ════════════════════════════════════════════════════════════════
//  CAMPAIGN DATA FOUNDATION  (v27 — data layer only, no UI yet)
//  All new fields live inside window.__saveData and are persisted
//  via the existing SAVE_KEY.  Existing save values are never
//  overwritten — missing keys are filled with safe defaults.
// ════════════════════════════════════════════════════════════════

// ── Default shape for every new campaign field ──
function _campaignDefaults() {
  return {
    // ── World / Act / Chapter / Part navigation ──
    currentWorld:   1,   // which overworld the player is in
    currentAct:     1,   // act within that world
    currentChapter: 1,   // chapter within that act
    // currentPart already exists in the legacy save; kept in sync below

    // ── Roster ──
    unlockedCharacters:  ['chug'],   // array of character id strings
    characterStates:     {},         // { charId: { hp, status, … } }
    squadSetup:          [],         // ordered array of charIds for active squad

    // ── Relationship / memory systems ──
    trustLevels:  {},   // { charId: 0–100 }
    memoryLevels: {},   // { charId: 0–100 } — shared lore/history depth

    // ── Roster status ──
    rescuedCharacters:    [],   // charIds successfully rescued
    recoveringCharacters: [],   // charIds in recovery (between chapters)
    betrayedCharacters:   [],   // charIds that turned against the player

    // ── Progression unlocks ──
    unlockedTrainingPaths: [],   // e.g. ['iron_body','shadow_step']
    unlockedRageTiers:     [1],  // which rage tiers are available (1 is always unlocked)
    unlockedWeapons:       [],   // weapon ids available in future weapon-select screens

    // ── Content progress ──
    codexProgress:   {},   // { entryId: true } — discovered codex entries
    campProgress:    {},   // { campEventId: 'seen'|'done'|… }
    missionProgress: {},   // { missionId: { status, completedAt, … } }
  };
}

// ── Merge defaults into an existing save object without clobbering ──
function ensureGameStateShape(saveObj) {
  const defs = _campaignDefaults();
  Object.keys(defs).forEach(k => {
    if (saveObj[k] === undefined || saveObj[k] === null) {
      saveObj[k] = defs[k];
    }
  });
  // Keep currentPart in sync with legacy field
  if (saveObj.currentPart !== undefined) {
    saveObj.currentChapter = saveObj.currentChapter || saveObj.currentPart || 1;
  }
  return saveObj;
}

// ── Called on first load to add missing keys to an old save ──
function resetNewSystemStateIfMissing() {
  if (!window.__saveData) return;
  ensureGameStateShape(window.__saveData);
}

// ── Returns the set of progress-tracking keys for the current position ──
function getCurrentProgressKeys() {
  const s = window.__saveData || {};
  return {
    world:   s.currentWorld   || 1,
    act:     s.currentAct     || 1,
    chapter: s.currentChapter || 1,
    part:    s.currentPart    || 1,
  };
}

// ── Patch saveGame so it always persists new fields ──
(function _patchSaveGameForCampaign() {
  const _origSaveGame = window.saveGame || saveGame;
  // Wrap only once
  if (_origSaveGame && !_origSaveGame.__campaignPatched) {
    const patched = function(extra = {}) {
      // Ensure shape before writing
      if (window.__saveData) ensureGameStateShape(window.__saveData);
      return _origSaveGame.call(this, extra);
    };
    patched.__campaignPatched = true;
    // Replace in scope — assignments below keep both references live
    window.saveGame = patched;
  }
})();

// ── Patch loadGame so it migrates old saves immediately on load ──
(function _patchLoadGameForCampaign() {
  const _origLoadGame = window.loadGame || loadGame;
  if (_origLoadGame && !_origLoadGame.__campaignPatched) {
    const patched = function() {
      _origLoadGame.call(this);
      // After legacy fields are loaded, fill any missing campaign fields
      resetNewSystemStateIfMissing();
    };
    patched.__campaignPatched = true;
    window.loadGame = patched;
  }
})();

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  ROSTER SYSTEM  (v28)
//  Character data records, state helpers, screen render.
//  No combat changes.  All state lives in __saveData.characterStates.
// ════════════════════════════════════════════════════════════════

// ── Master character records ──────────────────────────────────
// status is the INITIAL (story-start) value; live state is in save.
const ROSTER_DATA = [
  // ── PLAYABLE / PROTAGONIST ────────────────────────────────────
  { id:'chug',      name:'CHUG',        icon:'🥊',
    status:'playable',  allegiance:'self',    role:'Protagonist · Striker',
    playable:true,  temporary:false, trust:100, memory:100,
    rageCompatible:true,  weaponType:'Fists / Any', fieldType:'None (yet)',
    assistSkill:'Rage Drive',
    codexText:'Former streamer pulled into the void. Fights to reclaim what was erased.' },

  // ── CORE ALLIES ───────────────────────────────────────────────
  { id:'solo',      name:'SOLO',        icon:'🔥',
    status:'locked',    allegiance:'ally',    role:'Front-line · Brawler',
    playable:true,  temporary:false, trust:0,  memory:20,
    rageCompatible:true,  weaponType:'Bare hands', fieldType:'Static',
    assistSkill:'Blood Step',
    codexText:'Rescued from control in Part 24. Angry first, loyal second.' },

  { id:'tora_oni',  name:'TORA ONI',    icon:'🐯',
    status:'locked',    allegiance:'ally',    role:'Power · Tank',
    playable:true,  temporary:false, trust:0,  memory:10,
    rageCompatible:true,  weaponType:'Heavy arms', fieldType:'Oath-pressure',
    assistSkill:'Iron Vow',
    codexText:'Disciplined enough to survive himself. Freed in Part 27.' },

  { id:'addy',      name:'ADDY',        icon:'💨',
    status:'locked',    allegiance:'ally',    role:'Speed · Evader',
    playable:true,  temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Light blades', fieldType:'Echo-shift',
    assistSkill:'Recovery Dash',
    codexText:'Turns recovery into offense. Style returns after Part 22.' },

  { id:'legend',    name:'LEGEND',      icon:'⚡',
    status:'locked',    allegiance:'ally',    role:'Mid-range · Anchor',
    playable:true,  temporary:false, trust:0,  memory:40,
    rageCompatible:false, weaponType:'Staff / Reach', fieldType:'None',
    assistSkill:'Cover Angle',
    codexText:'Covers the angles he barely understands with instincts he cannot explain. Part 25.' },

  { id:'oo',        name:'O.O',         icon:'👁',
    status:'locked',    allegiance:'ally',    role:'Mischief · Speed',
    playable:true,  temporary:false, trust:0,  memory:30,
    rageCompatible:false, weaponType:'Twin tools', fieldType:'None',
    assistSkill:'Trouble Shot',
    codexText:'Wakes sharp, sarcastic, and immediately useful. Rescued Part 35.' },

  { id:'ree',       name:'REE',         icon:'🎙',
    status:'locked',    allegiance:'ally',    role:'Support · Memory',
    playable:true,  temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Microphone / Crowd', fieldType:'Sound-echo',
    assistSkill:'Crowd Memory',
    codexText:'Memory returns in pieces. Playable after Part 36.' },

  { id:'knight',    name:'KNIGHT',      icon:'♞',
    status:'locked',    allegiance:'ally',    role:'Strategist · Guard',
    playable:true,  temporary:false, trust:0,  memory:60,
    rageCompatible:false, weaponType:'Shield / Counter', fieldType:'Pattern-read',
    assistSkill:'Pattern Map',
    codexText:'Maps patterns instead of just surviving them. Part 39.' },

  { id:'neonkd',    name:'NEONKD',      icon:'🌐',
    status:'locked',    allegiance:'ally',    role:'Tech · Disruptor',
    playable:true,  temporary:false, trust:0,  memory:50,
    rageCompatible:false, weaponType:'Digital arms', fieldType:'Signal-cut',
    assistSkill:'Static Jam',
    codexText:'Wakes sharp and sarcastic. Reliable front-line. Part 39.' },

  { id:'yassine',   name:'YASSINE',     icon:'🌙',
    status:'locked',    allegiance:'ally',    role:'Body-memory · Duelist',
    playable:true,  temporary:false, trust:0,  memory:0,
    rageCompatible:true,  weaponType:'Hands / Muscle-read', fieldType:'Body-memory',
    assistSkill:'Muscle Read',
    codexText:'His hands remember Chug before his mind does. Playable Part 40.' },

  { id:'friend',    name:'FRIEND',      icon:'❓',
    status:'locked',    allegiance:'ally',    role:'Unknown · Recovering',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Unknown', fieldType:'Unknown',
    assistSkill:'???',
    codexText:'All title and no certainty. Rescued in Part 38 — name still missing.' },

  { id:'mr_clone',  name:'M.R CLONE',   icon:'🪞',
    status:'locked',    allegiance:'ally',    role:'Wildcard · Mirror',
    playable:true,  temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Adaptive', fieldType:'Mirror-echo',
    assistSkill:'Perfect Answer',
    codexText:'Generous in ways that would be suspicious if everyone were not too tired to interrogate comfort.' },

  // ── TEACHERS / SUPPORT ────────────────────────────────────────
  { id:'raevan',    name:'RAEVAN',      icon:'🏹',
    status:'support',   allegiance:'teacher', role:'Master · Archer',
    playable:false, temporary:false, trust:80, memory:100,
    rageCompatible:false, weaponType:'Bow / Countershot', fieldType:'Precision-field',
    assistSkill:'Countershot',
    codexText:'"You are finally learning to kill what the enemy thinks is safe."' },

  { id:'kaizen',    name:'KAIZEN',      icon:'🔥',
    status:'support',   allegiance:'teacher', role:'Elder · Rage Master',
    playable:false, temporary:false, trust:90, memory:100,
    rageCompatible:true,  weaponType:'Bare hands', fieldType:'Furnace-field',
    assistSkill:'Rage Discipline',
    codexText:'"Power is not permission to become stupid faster."' },

  { id:'sorya',     name:'LADY SORYA',  icon:'🌀',
    status:'support',   allegiance:'teacher', role:'Sage · Field Guide',
    playable:false, temporary:false, trust:85, memory:100,
    rageCompatible:false, weaponType:'Field control', fieldType:'Corridor-fold',
    assistSkill:'Field Open',
    codexText:'"Everything can be rescued. Not everything survives the rescue."' },

  { id:'harjeev',   name:'HARJEEV',     icon:'📋',
    status:'support',   allegiance:'ally',    role:'Manager · Logistics',
    playable:false, temporary:false, trust:70, memory:100,
    rageCompatible:false, weaponType:'None', fieldType:'None',
    assistSkill:'Camp Order',
    codexText:'Stops being just energyger the moment people start dying.' },

  // ── ENEMIES — DRAKOS ──────────────────────────────────────────
  { id:'varkul',    name:'VARKUL',      icon:'⚔',
    status:'enemy',     allegiance:'drako',   role:'Drako No.11 · March',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Pressure advance', fieldType:'Territory-march',
    assistSkill:'—',
    codexText:'"Retreat is not escape. It is scheduling your death."' },

  { id:'zeigran',   name:'ZEIGRAN',     icon:'🌋',
    status:'enemy',     allegiance:'drako',   role:'Drako No.10 · Heat',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Scorching pressure', fieldType:'Heat-line',
    assistSkill:'—',
    codexText:'Even his greeting burns.' },

  { id:'dread_juno',name:'DREAD JUNO',  icon:'☠',
    status:'enemy',     allegiance:'drako',   role:'Drako No.7 · Raid',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Scythe field', fieldType:'Scythe-arc',
    assistSkill:'—',
    codexText:'His raid almost succeeds because people are in the middle of living.' },

  { id:'kaith',     name:'KAITH',       icon:'⛓',
    status:'enemy',     allegiance:'drako',   role:'Drako No.8 · Chains',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Chain anchors', fieldType:'Chain-field',
    assistSkill:'—',
    codexText:'Turns space into linked anchor points. Part 38.' },

  { id:'rhaziel',   name:'RHAZIEL',     icon:'🔕',
    status:'enemy',     allegiance:'drako',   role:'Drako No.6 · Silence',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Null-bell', fieldType:'Null-field',
    assistSkill:'—',
    codexText:'Turns fields off like lamps. Part 41.' },

  // ── ENEMIES — NEXTERS ─────────────────────────────────────────
  { id:'kade',      name:'KADE',        icon:'📐',
    status:'enemy',     allegiance:'nexter',  role:'Nexter No.2 · Precision',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Calculated strikes', fieldType:'Mark-field',
    assistSkill:'—',
    codexText:'"Attachments continue to outperform my expectations."' },

  { id:'lynex',     name:'LYNEX',       icon:'🐍',
    status:'enemy',     allegiance:'nexter',  role:'Nexter No.5 · Circler',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Whip-range', fieldType:'Encircle',
    assistSkill:'—',
    codexText:'Likes Solo immediately and hates that Chug exists.' },

  { id:'riven',     name:'RIVEN',       icon:'🎯',
    status:'enemy',     allegiance:'unknown', role:'Unknown · Scout',
    playable:false, temporary:false, trust:0,  memory:0,
    rageCompatible:false, weaponType:'Long-range', fieldType:'Unknown',
    assistSkill:'—',
    codexText:'Tests camp reaction time, then leaves before the arrow that nearly kills him.' },
];

// ── Valid status values ──────────────────────────────────────
const ROSTER_STATUSES = ['locked','enemy','controlled','rescued','recovering','playable','temporary','betrayed','support'];

// ── Human-readable badge labels ─────────────────────────────
const STATUS_LABELS = {
  locked:'LOCKED', enemy:'ENEMY', controlled:'CONTROLLED',
  rescued:'RESCUED', recovering:'RECOVERY', playable:'ACTIVE',
  temporary:'TEMP', betrayed:'BETRAYED', support:'SUPPORT',
};

// ── State helpers ────────────────────────────────────────────

function _rosterStates() {
  if (!window.__saveData) return {};
  if (!window.__saveData.characterStates) window.__saveData.characterStates = {};
  return window.__saveData.characterStates;
}

/** Return live status string for a character id. Falls back to ROSTER_DATA default. */
function getCharacterState(id) {
  const states = _rosterStates();
  if (states[id] !== undefined) return states[id].status || _rosterDefault(id);
  return _rosterDefault(id);
}

function _rosterDefault(id) {
  const rec = ROSTER_DATA.find(r => r.id === id);
  return rec ? rec.status : 'locked';
}

/** Set the status of a character and save. */
function setCharacterState(id, status) {
  if (!ROSTER_STATUSES.includes(status)) return;
  const states = _rosterStates();
  states[id] = states[id] || {};
  states[id].status = status;
  if (typeof saveGame === 'function') saveGame({ characterStates: states });
}

/** Mark character as unlocked/playable. */
function unlockCharacter(id) { setCharacterState(id, 'playable'); }

/** Mark character as rescued (intermediate before recovering/playable). */
function rescueCharacter(id) { setCharacterState(id, 'rescued'); }

/** Mark character as in recovery. */
function markCharacterRecovering(id) { setCharacterState(id, 'recovering'); }

/** Mark character as betrayed. */
function markCharacterBetrayed(id) { setCharacterState(id, 'betrayed'); }

/** Get full save-enriched record for a character. */
function getRosterRecord(id) {
  const base = ROSTER_DATA.find(r => r.id === id);
  if (!base) return null;
  const states  = _rosterStates();
  const saved   = states[id] || {};
  return {
    ...base,
    status: saved.status  !== undefined ? saved.status  : base.status,
    trust:  saved.trust   !== undefined ? saved.trust   : base.trust,
    memory: saved.memory  !== undefined ? saved.memory  : base.memory,
  };
}

// ── Roster screen state ─────────────────────────────────────
let _rosterFilter = 'all';

function setRosterFilter(filter) {
  _rosterFilter = filter;
  // Update tab active state
  document.querySelectorAll('.roster-tab').forEach(btn => {
    const f = btn.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    btn.classList.toggle('active', f === filter);
  });
  _renderRoster();
}

// ════════════════════════════════════════════════════════════════
//  STORY-GATED VISIBILITY  (v30-fix)
//  Characters only appear in Roster / Squad after the story part
//  where they are first introduced.  Before that: completely hidden.
// ════════════════════════════════════════════════════════════════

const ROSTER_INTRO_PART = {
  chug:       1,   // protagonist — always visible
  // Teachers visible once their training arc begins
  raevan:    12,
  kaizen:    17,
  sorya:     18,
  harjeev:   15,
  // Core allies — appear when story reaches their introduction
  addy:       4,   // glimpsed missing from part 4
  legend:    25,
  solo:      23,   // first appears controlled part 23
  tora_oni:  26,
  oo:        21,
  ree:       22,
  knight:    21,
  neonkd:    29,
  yassine:    4,   // glimpsed missing from part 4
  friend:    38,
  mr_clone:  30,
  // Enemies — visible once player has encountered them
  varkul:    25,
  zeigran:   26,
  dread_juno:37,
  kaith:     38,
  rhaziel:   39,
  kade:      36,
  lynex:     24,
  riven:     29,
};

/** True once the player's story has reached a character's intro part. */
function isCharacterIntroduced(id) {
  const introPart = ROSTER_INTRO_PART[id];
  if (introPart === undefined) return true;
  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return reached >= introPart;
}

window.ROSTER_INTRO_PART      = ROSTER_INTRO_PART;
window.isCharacterIntroduced  = isCharacterIntroduced;


function _renderRoster() {
  const list = document.getElementById('rosterList');
  if (!list) return;

  let records = ROSTER_DATA
    .filter(r => isCharacterIntroduced(r.id))
    .map(r => getRosterRecord(r.id));

  const overview = document.getElementById('rosterOverview');
  if (overview) {
    const visible = records.length;
    const active = records.filter(r => r.status === 'playable' || r.status === 'support' || r.status === 'temporary').length;
    const hostiles = records.filter(r => r.status === 'enemy' || r.status === 'controlled' || r.status === 'betrayed').length;
    overview.innerHTML = `
      <div class="roster-overview-chip"><span class="roster-overview-k">Visible</span><span class="roster-overview-v">${visible}</span></div>
      <div class="roster-overview-chip"><span class="roster-overview-k">Active</span><span class="roster-overview-v">${active}</span></div>
      <div class="roster-overview-chip"><span class="roster-overview-k">Hostiles</span><span class="roster-overview-v">${hostiles}</span></div>`;
  }

  if (_rosterFilter !== 'all') {
    if (_rosterFilter === 'enemy') {
      records = records.filter(r => r.status === 'enemy' || r.status === 'controlled');
    } else {
      records = records.filter(r => r.status === _rosterFilter);
    }
  }

  if (!records.length) {
    list.innerHTML = `
      <div class="roster-empty">
        <div class="roster-empty-shell">
          <div class="roster-empty-icon">☷</div>
          <div class="roster-empty-title">ARCHIVE SEALED</div>
          <div class="roster-empty-copy">No dossiers are visible in this filter yet.<br>Progress through the story to unlock more fighter records.</div>
        </div>
      </div>`;
    return;
  }

  const ORDER = { playable:0, support:1, temporary:2, recovering:3, rescued:4, controlled:5, enemy:6, betrayed:7, locked:8 };
  records.sort((a,b) => (ORDER[a.status]??9) - (ORDER[b.status]??9));

  list.innerHTML = records.map(r => {
    const isLocked = r.status === 'locked';
    const label = STATUS_LABELS[r.status] || r.status.toUpperCase();
    const trustPct = Math.max(0, Math.min(100, r.trust || 0));
    const memoryPct = Math.max(0, Math.min(100, r.memory || 0));

    const tags = [];
    if (r.allegiance && r.allegiance !== 'self') tags.push(`<span class="rd-tag allegiance">${r.allegiance.toUpperCase()}</span>`);
    if (!isLocked && r.weaponType) tags.push(`<span class="rd-tag weapon">${r.weaponType}</span>`);
    if (!isLocked && r.fieldType && r.fieldType !== 'None' && r.fieldType !== 'None (yet)') tags.push(`<span class="rd-tag field">${r.fieldType}</span>`);
    if (!isLocked && r.rageCompatible) tags.push(`<span class="rd-tag rage">Rage Ready</span>`);

    const noteMap = {
      playable: 'Ready for deployment',
      support: 'Support formation ready',
      temporary: 'Temporary ally',
      recovering: 'Regaining combat condition',
      rescued: 'Recovered asset',
      controlled: 'Observed under hostile influence',
      enemy: 'Threat dossier active',
      betrayed: 'Trust compromised',
      locked: 'Insufficient intel'
    };
    const note = noteMap[r.status] || 'Roster file';

    return `
      <div class="rd-row" data-status="${r.status}">
        <div class="rd-mainblock">
          <div class="rd-portrait-shell">
            <div class="rd-portrait">${r.icon}</div>
            <div class="rd-portrait-seal"></div>
          </div>
          <div class="rd-content">
            <div class="rd-topline">
              <div class="rd-nameblock">
                <div class="rd-name">${isLocked ? '— UNKNOWN —' : r.name}</div>
                <div class="rd-roleline">
                  <span class="rd-role">${isLocked ? 'Redacted identity' : r.role}</span>
                  <span class="rd-dot"></span>
                  <span class="rd-note">${note}</span>
                </div>
              </div>
              <div class="rd-state">${label}</div>
            </div>
            ${tags.length ? `<div class="rd-tags">${tags.join('')}</div>` : ''}
            <div class="rd-bars">
              <div class="rd-barbox">
                <div class="rd-barhdr"><span class="rd-barlbl">Trust</span><span class="rd-barval">${isLocked ? '??' : trustPct + '%'}</span></div>
                <div class="rd-track"><div class="rd-fill trust" style="width:${trustPct}%"></div></div>
              </div>
              <div class="rd-barbox">
                <div class="rd-barhdr"><span class="rd-barlbl">Memory</span><span class="rd-barval">${isLocked ? '??' : memoryPct + '%'}</span></div>
                <div class="rd-track"><div class="rd-fill memory" style="width:${memoryPct}%"></div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="rd-side">
          <div class="rd-sidechip">
            <span class="rd-sidechip-k">Trust</span>
            <span class="rd-sidechip-v">${isLocked ? '—' : trustPct}</span>
          </div>
          <div class="rd-sidechip">
            <span class="rd-sidechip-k">Memory</span>
            <span class="rd-sidechip-v">${isLocked ? '—' : memoryPct}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openRoster() {
  initAudio();
  _rosterFilter = 'all';
  // Reset tab UI
  document.querySelectorAll('.roster-tab').forEach(btn => {
    const f = btn.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    btn.classList.toggle('active', f === 'all');
  });
  _renderRoster();
  showScreen('roster-screen');
}

function closeRoster() {
  showScreen('menu-screen');
}

// ── Expose on window ──────────────────────────────────────────
window.ROSTER_DATA            = ROSTER_DATA;
window.getCharacterState      = getCharacterState;
window.setCharacterState      = setCharacterState;
window.unlockCharacter        = unlockCharacter;
window.rescueCharacter        = rescueCharacter;
window.markCharacterRecovering= markCharacterRecovering;
window.markCharacterBetrayed  = markCharacterBetrayed;
window.getRosterRecord        = getRosterRecord;
window.openRoster             = openRoster;
window.closeRoster            = closeRoster;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  SQUAD SYSTEM  (v29)
//  1 main fighter + up to 2 support members.
//  Support bonuses are passive and applied at fight start.
//  No tag/assist animations yet — structure only.
// ════════════════════════════════════════════════════════════════

// ── Support bonus definitions per character ──────────────────
// Each playable/support character provides a passive bonus when
// assigned to a support slot.  Values are additive.
const SQUAD_SUPPORT_BONUSES = {
  // allies
  solo:      { dmg:4,  def:0, rageGain:0.05, recovery:0,  trustBonus:5  },
  tora_oni:  { dmg:3,  def:3, rageGain:0,    recovery:0,  trustBonus:3  },
  addy:      { dmg:2,  def:0, rageGain:0.08, recovery:5,  trustBonus:4  },
  legend:    { dmg:2,  def:2, rageGain:0,    recovery:0,  trustBonus:3  },
  oo:        { dmg:5,  def:0, rageGain:0.05, recovery:0,  trustBonus:4  },
  ree:       { dmg:0,  def:0, rageGain:0.10, recovery:10, trustBonus:6  },
  knight:    { dmg:0,  def:5, rageGain:0,    recovery:0,  trustBonus:4  },
  neonkd:    { dmg:3,  def:2, rageGain:0.06, recovery:0,  trustBonus:3  },
  yassine:   { dmg:4,  def:0, rageGain:0.08, recovery:8,  trustBonus:5  },
  friend:    { dmg:2,  def:1, rageGain:0.04, recovery:4,  trustBonus:3  },
  mr_clone:  { dmg:3,  def:3, rageGain:0.05, recovery:5,  trustBonus:4  },
  // teachers (support role)
  raevan:    { dmg:6,  def:0, rageGain:0,    recovery:0,  trustBonus:5  },
  kaizen:    { dmg:4,  def:0, rageGain:0.15, recovery:0,  trustBonus:6  },
  sorya:     { dmg:0,  def:4, rageGain:0.10, recovery:12, trustBonus:6  },
  harjeev:   { dmg:0,  def:2, rageGain:0,    recovery:15, trustBonus:5  },
};

// ── Squad save helpers ────────────────────────────────────────

function _squadSave() {
  if (!window.__saveData) return {};
  if (!window.__saveData.squadSetup || !Array.isArray(window.__saveData.squadSetup)) {
    window.__saveData.squadSetup = [];
  }
  return window.__saveData.squadSetup;
}

/** Returns id of main fighter, defaulting to 'chug'. */
function getMainFighter() {
  const s = _squadSave();
  return (s[0] && typeof s[0] === 'object' ? s[0].id : s[0]) || 'chug';
}

/** Returns array of up to 2 support member ids (strings, never null). */
function getSupportMembers() {
  const s = _squadSave();
  const out = [];
  for (let i = 1; i <= 2; i++) {
    const entry = s[i];
    const id = entry && typeof entry === 'object' ? entry.id : entry;
    if (id) out.push(id);
  }
  return out;
}

/** Set the main fighter slot. */
function setMainFighter(id) {
  const s = window.__saveData || {};
  if (!Array.isArray(s.squadSetup)) s.squadSetup = [];
  s.squadSetup[0] = { id };
  if (typeof saveGame === 'function') saveGame({ squadSetup: s.squadSetup });
}

/** Set a support slot (slotIndex: 0 or 1). */
function setSupportMember(slotIndex, id) {
  const s = window.__saveData || {};
  if (!Array.isArray(s.squadSetup)) s.squadSetup = [];
  s.squadSetup[1 + slotIndex] = { id };
  if (typeof saveGame === 'function') saveGame({ squadSetup: s.squadSetup });
}

/** Remove a support slot. */
function removeSupportMember(slotIndex) {
  const s = window.__saveData || {};
  if (!Array.isArray(s.squadSetup)) return;
  s.squadSetup[1 + slotIndex] = null;
  if (typeof saveGame === 'function') saveGame({ squadSetup: s.squadSetup });
}

// ── Bonus aggregation ─────────────────────────────────────────

/**
 * Returns the combined passive bonuses from all support members.
 * Shape: { dmg, def, rageGain, recovery, trustBonus }
 */
function getSquadBonuses() {
  const base = { dmg:0, def:0, rageGain:0, recovery:0, trustBonus:0 };
  getSupportMembers().forEach(id => {
    const b = SQUAD_SUPPORT_BONUSES[id];
    if (!b) return;
    base.dmg        += b.dmg        || 0;
    base.def        += b.def        || 0;
    base.rageGain   += b.rageGain   || 0;
    base.recovery   += b.recovery   || 0;
    base.trustBonus += b.trustBonus || 0;
  });
  return base;
}

// ── Battle integration ────────────────────────────────────────
// Applied at fighter construction time in startRound.
// Uses a lightweight patch on the global: window.__squadBonuses.
// Fighter constructor reads window.__squadBonuses if set.

function applySquadBonusesToFight() {
  window.__squadBonuses = getSquadBonuses();
}

// ── Screen state ──────────────────────────────────────────────
let _pickerMode   = 'main';   // 'main' | 'support'
let _pickerSlot   = 0;        // 0 or 1 for support

function openSquad() {
  initAudio();
  _renderSquadScreen();
  showScreen('squad-screen');
}

function closeSquad() {
  showScreen('menu-screen');
}

function _squadEligible(record, mode) {
  if (!record) return false;
  // Never show characters the story hasn't introduced yet
  if (!isCharacterIntroduced(record.id)) return false;
  const s = record.status;
  if (mode === 'main') return s === 'playable';
  // support slots: playable + support role characters
  return s === 'playable' || s === 'support';
}

function _renderSquadScreen() {
  const mainId   = getMainFighter();
  const supports = getSupportMembers();
  const bonuses  = getSquadBonuses();

  // ── Main slot ──
  const mainRec = getRosterRecord ? getRosterRecord(mainId) : null;
  _applySlotUI('Main', mainRec, bonuses, true);

  // ── Support slots ──
  [0, 1].forEach(i => {
    const id  = supports[i] || null;
    const rec = id && getRosterRecord ? getRosterRecord(id) : null;
    _applySlotUI('Support' + i, rec, null, false);
  });

  // ── Bonus chips ──
  _refreshBonusChips(bonuses);
}

function _applySlotUI(slotKey, rec, bonuses, isMain) {
  // slotKey: 'Main' | 'Support0' | 'Support1'
  const iconEl   = document.getElementById('squad' + slotKey + 'Icon');
  const nameEl   = document.getElementById('squad' + slotKey + 'Name');
  const roleEl   = document.getElementById('squad' + slotKey + 'Role');
  const bonusEl  = document.getElementById('squad' + slotKey + 'Bonus');
  const slotEl   = document.getElementById(isMain ? 'squadMainSlot' : 'squadSupport' + slotKey.replace('Support',''));
  const actionEl = isMain ? null : document.getElementById('squadSupportAction' + slotKey.replace('Support',''));

  if (!iconEl || !nameEl || !roleEl) return;

  if (rec) {
    iconEl.textContent = rec.icon || '?';
    nameEl.textContent = rec.name || rec.id;
    roleEl.textContent = rec.role || '';
    if (bonusEl && isMain && bonuses) {
      const parts = [];
      if (bonuses.dmg      > 0) parts.push(`+${bonuses.dmg} DMG`);
      if (bonuses.def      > 0) parts.push(`+${bonuses.def} DEF`);
      if (bonuses.rageGain > 0) parts.push(`+${Math.round(bonuses.rageGain*100)}% RAGE`);
      if (bonuses.recovery > 0) parts.push(`+${bonuses.recovery} REC`);
      bonusEl.textContent = parts.length ? 'Bonuses: ' + parts.join(' · ') : '';
    } else if (bonusEl && !isMain) {
      const b = SQUAD_SUPPORT_BONUSES[rec.id];
      if (b) {
        const parts = [];
        if (b.dmg      > 0) parts.push(`+${b.dmg} DMG`);
        if (b.def      > 0) parts.push(`+${b.def} DEF`);
        if (b.rageGain > 0) parts.push(`+${Math.round(b.rageGain*100)}% RAGE`);
        if (b.recovery > 0) parts.push(`+${b.recovery} REC`);
        bonusEl.textContent = parts.join(' · ');
      } else {
        bonusEl.textContent = '';
      }
    }
    if (actionEl) actionEl.textContent = 'CHANGE';
    if (slotEl) slotEl.classList.remove('empty-slot');
  } else {
    iconEl.textContent = '＋';
    nameEl.textContent = isMain ? 'CHUG' : 'EMPTY SLOT';
    roleEl.textContent = isMain ? 'Protagonist · Striker' : 'Tap to assign support';
    if (bonusEl) bonusEl.textContent = '';
    if (actionEl) actionEl.textContent = 'ASSIGN';
    if (slotEl && !isMain) slotEl.classList.add('empty-slot');
  }
}

function _refreshBonusChips(bonuses) {
  const set = (id, valId, val, suffix) => {
    const chip = document.getElementById(id);
    const valEl = document.getElementById(valId);
    if (!chip || !valEl) return;
    valEl.textContent = (val > 0 ? '+' : '') + (suffix === '%' ? Math.round(val*100) : val) + suffix;
    chip.classList.toggle('active', val > 0);
  };
  set('sbc-dmg',  'sbc-dmg-val',       bonuses.dmg,      '');
  set('sbc-def',  'sbc-def-val',        bonuses.def,      '');
  set('sbc-rage', 'sbc-rage-val',       bonuses.rageGain, '%');
  set('sbc-rec',  'sbc-rec-val',        bonuses.recovery, '');
}

// ── Picker ────────────────────────────────────────────────────

function openSquadPicker(mode, slotIndex) {
  _pickerMode = mode;
  _pickerSlot = slotIndex || 0;

  const titleEl = document.getElementById('pickerTitle');
  if (titleEl) titleEl.textContent = mode === 'main' ? 'SELECT FIGHTER' : 'SELECT SUPPORT';

  const list = document.getElementById('pickerList');
  if (!list) return;

  const currentMain     = getMainFighter();
  const currentSupports = getSupportMembers();

  // Which records are eligible?
  const eligible = (typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA : [])
    .map(r => getRosterRecord ? getRosterRecord(r.id) : r)
    .filter(r => _squadEligible(r, mode));

  if (!eligible.length) {
    list.innerHTML = '<div style="padding:30px;text-align:center;font-family:var(--font-body);font-size:10px;letter-spacing:3px;color:rgba(200,170,100,0.3)">NO ELIGIBLE CHARACTERS</div>';
  } else {
    list.innerHTML = eligible.map(r => {
      const isCurrent = mode === 'main'
        ? r.id === currentMain
        : currentSupports[_pickerSlot] === r.id;
      // Prevent assigning same char to two slots
      const alreadyUsed = mode === 'support' && (
        r.id === currentMain ||
        currentSupports.some((s, i) => s === r.id && i !== _pickerSlot)
      );
      return `<div class="picker-row${isCurrent?' selected':''}${alreadyUsed?' unavailable':''}"
                   onclick="pickSquadMember('${r.id}')">
        <div class="picker-icon">${r.icon||'?'}</div>
        <div class="picker-info">
          <div class="picker-name">${r.name||r.id}</div>
          <div class="picker-role">${r.role||''}</div>
        </div>
        <div class="picker-check">✓</div>
      </div>`;
    }).join('');
  }

  // If support slot is filled, add a "Remove" entry
  if (mode === 'support' && currentSupports[_pickerSlot]) {
    list.innerHTML += `<div class="picker-row" style="border-left:3px solid var(--red);margin-top:6px;"
        onclick="pickSquadMember(null)">
      <div class="picker-icon" style="font-size:18px;">✕</div>
      <div class="picker-info"><div class="picker-name" style="color:rgba(255,80,80,0.8)">REMOVE</div></div>
    </div>`;
  }

  const picker = document.getElementById('squadPicker');
  if (picker) picker.classList.add('visible');
}

function closeSquadPicker() {
  const picker = document.getElementById('squadPicker');
  if (picker) picker.classList.remove('visible');
}

function pickSquadMember(id) {
  if (_pickerMode === 'main') {
    if (id) setMainFighter(id);
  } else {
    if (id) setSupportMember(_pickerSlot, id);
    else    removeSupportMember(_pickerSlot);
  }
  closeSquadPicker();
  _renderSquadScreen();
}

// ── Expose on window ──────────────────────────────────────────
window.SQUAD_SUPPORT_BONUSES  = SQUAD_SUPPORT_BONUSES;
window.getMainFighter         = getMainFighter;
window.getSupportMembers      = getSupportMembers;
window.setMainFighter         = setMainFighter;
window.setSupportMember       = setSupportMember;
window.removeSupportMember    = removeSupportMember;
window.getSquadBonuses        = getSquadBonuses;
window.applySquadBonusesToFight = applySquadBonusesToFight;
window.openSquad              = openSquad;
window.closeSquad             = closeSquad;
window.openSquadPicker        = openSquadPicker;
window.closeSquadPicker       = closeSquadPicker;
window.pickSquadMember        = pickSquadMember;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  ASH CAMP HUB SYSTEM  (v31)
//  Sections: Mission Board · Roster · Recovery · Training ·
//            Armory · Strategy · Codex (placeholder) · Events
//  All data pulled from existing save + campaign structures.
//  No new economy or combat — structural hub only.
// ════════════════════════════════════════════════════════════════

// ── Camp event catalogue ─────────────────────────────────────
// Events become visible once the player reaches their part.
const CAMP_EVENTS = [
  { id:'ash_camp_arrival', part:15, title:'Ash Camp Arrives',      icon:'🔥', desc:'The camp takes shape for the first time.' },
  { id:'campfire_names',   part:20, title:'Campfire Names',        icon:'🌙', desc:'The group puts names to the silence.' },
  { id:'second_chair',     part:22, title:'The Second Chair Burns',icon:'🪑', desc:'The empty chair keeps burning.' },
  { id:'grey_brotherhood', part:28, title:'Grey Brotherhood',      icon:'🩶', desc:'Strange alliances form in the dust.' },
  { id:'mr_arrives',       part:30, title:'The Friend Who Returned',icon:'🪞', desc:'M.R walks into camp.' },
  { id:'blood_moon_raid',  part:37, title:'Blood Moon Raid',       icon:'🌑', desc:'Dread Juno turns the camp red.' },
  { id:'camp_of_wolves',   part:42, title:'Camp of Wolves',        icon:'🐺', desc:'The roster breathes. Stories are told.' },
  { id:'before_the_knife', part:44, title:'Before the Knife',      icon:'🔪', desc:'A moment of quiet before the next storm.' },
  { id:'war_gate',         part:50, title:'War Gate of Veylos',    icon:'⚔',  desc:'The war begins in full.' },
];

// ── Mission definitions (part-gated) ────────────────────────
const CAMP_MISSIONS = [
  { id:'find_solo',     part:21, endPart:24, title:'Find Solo',           desc:'Solo is out there — controlled. Bring him back.',      type:'rescue'   },
  { id:'free_tora',     part:24, endPart:27, title:'Free Tora Oni',       desc:'The horned giant fights against his own will.',        type:'rescue'   },
  { id:'recover_addy',  part:20, endPart:22, title:'Stabilise Addy',      desc:'Addy needs time and a fight before he is himself again.',type:'recovery'},
  { id:'hunt_morvain',  part:32, endPart:35, title:'Hunt Morvain',        desc:'Morvain\'s field makes him near-invisible. Find the angle.',type:'hunt' },
  { id:'free_oo',       part:21, endPart:35, title:'Recover O.O',         desc:'O.O\'s hands still know Chug. Help him remember.',     type:'recovery' },
  { id:'field_kaith',  part:36, endPart:38, title:'Break Kaith\'s Chains',desc:'The chain field turns teammates into liabilities.',   type:'boss'     },
  { id:'null_chapel',   part:39, endPart:41, title:'Enter the Null Chapel',desc:'Rhaziel\'s silence is a weapon. Enter anyway.',       type:'boss'     },
  { id:'reach_veylos',  part:45, endPart:50, title:'Reach the War Gate',  desc:'Veylos is the final door. Everything leads here.',     type:'final'    },
];

// ── Helpers ──────────────────────────────────────────────────

/** Returns array of {id,name,icon,role,status} for chars currently in recovery. */
function getRecoveringCharacters() {
  if (typeof ROSTER_DATA === 'undefined') return [];
  return ROSTER_DATA
    .filter(r => isCharacterIntroduced(r.id))
    .map(r => getRosterRecord(r.id))
    .filter(r => r.status === 'recovering');
}

/** Returns camp events visible at current story part. */
function getCampAvailableEvents() {
  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return CAMP_EVENTS.filter(e => reached >= e.part);
}

/** Returns missions that are active (reached but not past endPart). */
function _getActiveMissions() {
  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return CAMP_MISSIONS.filter(m => reached >= m.part && reached <= m.endPart);
}

/** Returns missions completed (player is past their endPart). */
function _getDoneMissions() {
  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return CAMP_MISSIONS.filter(m => reached > m.endPart);
}

/** Toggle expand/collapse of a section body. */
function toggleCampSection(bodyId) {
  const el = document.getElementById(bodyId);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'flex' : 'none';
}

// ── Main refresh ──────────────────────────────────────────────
function refreshCampUI() {
  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);

  // Subtitle
  const subtitleEl = document.getElementById('campSubtitle');
  if (subtitleEl) {
    const meta = typeof getPartMeta === 'function' ? getPartMeta(reached) : null;
    subtitleEl.textContent = meta
      ? `PART ${reached} · ${meta.title.toUpperCase()}`
      : `PART ${reached} · ASH CAMP`;
  }

  _refreshCampMissions(reached);
  _refreshCampRoster();
  _refreshCampRecovery();
  _refreshCampStrategy(reached);
  _refreshCampEvents();
}

function _refreshCampMissions(reached) {
  const body    = document.getElementById('campMissionBody');
  const badge   = document.getElementById('campMissionBadge');
  const active  = _getActiveMissions();
  const done    = _getDoneMissions();
  if (!body) return;

  if (badge) {
    if (active.length) {
      badge.textContent = active.length + ' ACTIVE';
      badge.className = 'camp-section-badge alert';
    } else {
      badge.textContent = done.length ? done.length + ' DONE' : '—';
      badge.className = 'camp-section-badge' + (done.length ? '' : ' dim');
    }
  }

  if (!active.length && !done.length) {
    body.innerHTML = '<div class="camp-empty">NO ACTIVE MISSIONS</div>';
    return;
  }

  const rows = [];
  active.forEach((m, i) => {
    rows.push(`<div class="camp-mission-row">
      <div class="camp-mission-num">${String(i+1).padStart(2,'0')}</div>
      <div class="camp-mission-info">
        <div class="camp-mission-title">${m.title}</div>
        <div class="camp-mission-desc">${m.desc}</div>
      </div>
      <div class="camp-mission-tag mtag-active">${m.type.toUpperCase()}</div>
    </div>`);
  });
  done.slice(-2).forEach(m => {   // show last 2 completed
    rows.push(`<div class="camp-mission-row" style="opacity:0.45;">
      <div class="camp-mission-num">✓</div>
      <div class="camp-mission-info">
        <div class="camp-mission-title">${m.title}</div>
      </div>
      <div class="camp-mission-tag mtag-done">DONE</div>
    </div>`);
  });
  body.innerHTML = rows.join('');
}

function _refreshCampRoster() {
  const body  = document.getElementById('campRosterBody');
  const badge = document.getElementById('campRosterBadge');
  if (!body || typeof ROSTER_DATA === 'undefined') return;

  const visible = ROSTER_DATA
    .filter(r => isCharacterIntroduced(r.id))
    .map(r => getRosterRecord(r.id))
    .filter(r => ['playable','support','recovering','rescued','temporary'].includes(r.status));

  if (badge) badge.textContent = visible.length ? visible.length + ' IN CAMP' : '—';

  if (!visible.length) {
    body.innerHTML = '<div class="camp-empty">CAMP IS EMPTY</div>';
    return;
  }

  const pillClass = { playable:'pip-playable-pill', support:'pip-support-pill', recovering:'pip-recovering-pill', rescued:'pip-rescued-pill', temporary:'pip-playable-pill' };
  const pillLabel = { playable:'IN CAMP', support:'SUPPORT', recovering:'HEALING', rescued:'RESCUED', temporary:'ACTIVE' };
  body.innerHTML = visible.map(r => `<div class="camp-char-row">
    <div class="camp-char-icon">${r.icon||'?'}</div>
    <div class="camp-char-info">
      <div class="camp-char-name">${r.name}</div>
      <div class="camp-char-status">${r.role||''}</div>
    </div>
    <div class="camp-char-stat-pill ${pillClass[r.status]||'pip-playable-pill'}">${pillLabel[r.status]||'IN CAMP'}</div>
  </div>`).join('');
}

function _refreshCampRecovery() {
  const body       = document.getElementById('campRecoveryBody');
  const badgeAlert = document.getElementById('campRecoveryBadge');
  const badgeDim   = document.getElementById('campRecoveryBadgeDim');
  if (!body) return;

  const recovering = getRecoveringCharacters();

  if (badgeAlert) badgeAlert.style.display = recovering.length ? 'block' : 'none';
  if (badgeDim)   badgeDim.style.display   = recovering.length ? 'none' : 'block';
  if (badgeAlert && recovering.length) badgeAlert.textContent = recovering.length + ' HEALING';

  if (!recovering.length) {
    body.innerHTML = '<div class="camp-empty">ALL CLEAR</div>';
    return;
  }

  body.innerHTML = recovering.map(r => `<div class="camp-char-row">
    <div class="camp-char-icon">${r.icon||'?'}</div>
    <div class="camp-char-info">
      <div class="camp-char-name">${r.name}</div>
      <div class="camp-char-status">RECOVERING · ${r.role||''}</div>
    </div>
    <div class="camp-char-stat-pill pip-recovering-pill">HEALING</div>
  </div>`).join('');
}

function _refreshCampStrategy(reached) {
  const body  = document.getElementById('campStrategyBody');
  const badge = document.getElementById('campStrategyBadge');
  if (!body) return;

  // Collect known enemies from ROSTER_DATA that the story has introduced
  const knownEnemies = (typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA : [])
    .filter(r => ['enemy','controlled'].includes(r.status) && isCharacterIntroduced(r.id))
    .map(r => getRosterRecord ? getRosterRecord(r.id) : r);

  if (badge) badge.textContent = knownEnemies.length ? knownEnemies.length + ' KNOWN' : 'INTEL';

  if (!knownEnemies.length) {
    body.innerHTML = '<div class="camp-empty">NO INTEL YET</div>';
    return;
  }

  body.innerHTML = knownEnemies.map(r => `<div class="camp-char-row">
    <div class="camp-char-icon">${r.icon||'?'}</div>
    <div class="camp-char-info">
      <div class="camp-char-name">${r.name}</div>
      <div class="camp-char-status">${r.role||''}</div>
    </div>
    <div class="camp-char-stat-pill pip-enemy-pill">THREAT</div>
  </div>`).join('');
}

function _refreshCampEvents() {
  const body  = document.getElementById('campEventsBody');
  const badge = document.getElementById('campEventsBadge');
  if (!body) return;

  const events = getCampAvailableEvents();
  if (badge) badge.textContent = events.length ? events.length + ' EVENTS' : '—';

  if (!events.length) {
    body.innerHTML = '<div class="camp-empty">NO EVENTS YET</div>';
    return;
  }

  // Show most recent 5
  body.innerHTML = events.slice(-5).reverse().map(e => `<div class="camp-event-row">
    <div class="camp-event-icon">${e.icon}</div>
    <div class="camp-event-name">${e.title}</div>
    <div class="camp-event-arrow">▶</div>
  </div>`).join('');
}

// ── Screen open / close ───────────────────────────────────────
function openCamp() {
  initAudio();
  // Ensure all section bodies start expanded
  ['campMissionBody','campRosterBody','campRecoveryBody',
   'campStrategyBody','campEventsBody'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'flex';
  });
  refreshCampUI();
  showScreen('camp-screen');
}

function closeCamp() {
  showScreen('menu-screen');
}

// ── Expose on window ──────────────────────────────────────────
window.openCamp               = openCamp;
window.closeCamp              = closeCamp;
window.refreshCampUI          = refreshCampUI;
window.getRecoveringCharacters= getRecoveringCharacters;
window.getCampAvailableEvents = getCampAvailableEvents;
window.toggleCampSection      = toggleCampSection;
window.CAMP_EVENTS            = CAMP_EVENTS;
window.CAMP_MISSIONS          = CAMP_MISSIONS;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  MISSION SYSTEM  (v31)
//
//  Flow:
//    SCRIPT s.fight  ──► advance() ──► initFight()          [unchanged]
//    SCRIPT s.mission ──► advance() ──► loadMissionForPart() [NEW hook]
//    Direct call     ──► startMission(config)               [NEW]
//
//  completeMission(result) feeds rewards back into save and
//  resumes story via the same endMatch path, keeping the
//  existing battle loop 100% intact.
//
//  Types:  normalBattle · bossBattle · rescueBattle
//          trainingMission · survivalMission · defenseMission
//          escortMission · campEvent · fieldBattle
//          multiWaveBattle
// ════════════════════════════════════════════════════════════════

// ── Mission type → fType mapping ────────────────────────────
// Battle-based types delegate straight to the existing initFight.
// fType 1 = normal, boss fTypes = [3,6,8,10,11,13,14,15,18,19,20,21]
const MISSION_FTYPES = {
  normalBattle:   1,   // default fight
  bossBattle:     3,   // best-of-3, boss music
  rescueBattle:   1,   // same fight, post-result triggers rescue
  survivalMission:12,  // evolved/wave enemy
  defenseMission: 1,   // standard fight, completion marks defense done
  escortMission:  1,   // standard fight, escort framing
  fieldBattle:   10,  // field-strength enemy
  multiWaveBattle:13,  // sync-wave enemy (multi-round feel)
  trainingMission:null,// non-combat — handled inline
  campEvent:      null,// non-combat — handled inline
};

// ── Mission reward multipliers ────────────────────────────────
const MISSION_REWARD_MULT = {
  normalBattle:   1.0,
  bossBattle:     2.5,
  rescueBattle:   1.8,
  survivalMission:1.5,
  defenseMission: 1.4,
  escortMission:  1.4,
  fieldBattle:   2.0,
  multiWaveBattle:1.6,
  trainingMission:0.5,
  campEvent:      0.3,
};

// ── Active mission state ──────────────────────────────────────
// Set before a mission starts; read by completeMission.
window.__activeMission = null;

/**
 * Build a mission config from CAMPAIGN_PART_META for a given part.
 * Returns null if no metadata is found (falls back to raw fight).
 */
function loadMissionForPart(partNumber) {
  const meta = (typeof getPartMeta === 'function') ? getPartMeta(partNumber) : null;
  if (!meta) return null;

  const type = meta.missionType || 'normalBattle';
  const ftype = MISSION_FTYPES[type];

  const config = {
    partNumber,
    missionType:      type,
    fightType:        ftype,               // null = non-combat
    title:            meta.title || `Part ${partNumber}`,
    characterUnlocks: meta.characterUnlocks || [],
    rescueFlags:      meta.rescueFlags      || [],
    campEvent:        meta.campEvent        || null,
    teacherUnlock:    meta.teacherUnlock    || null,
    codexUnlocks:     meta.codexUnlocks     || [],
    rewards:          meta.rewards          || { coins: 100, xp: 30 },
    rewardMult:       MISSION_REWARD_MULT[type] || 1.0,
  };

  return config;
}

/**
 * Start a mission from a config object.
 * For battle types: delegates to initFight (existing system, untouched).
 * For non-combat types: runs lightweight inline handler.
 */
function startMission(config) {
  if (!config) return;
  window.__activeMission = config;

  const type = config.missionType;

  // ── BATTLE-BASED TYPES ────────────────────────────────────
  if (config.fightType !== null && config.fightType !== undefined) {
    // Let the existing system handle the actual fight.
    // completeMission() will be called by the mission-aware endMatch patch below.
    const ft = config.fightType || 1;
    if (typeof initFight === 'function') initFight(ft);
    return;
  }

  // ── NON-COMBAT TYPES ──────────────────────────────────────
  if (type === 'trainingMission') {
    _runTrainingMission(config);
  } else if (type === 'campEvent') {
    _runCampEventMission(config);
  } else {
    // Unknown non-combat — just complete immediately with win
    completeMission({ win: true, config });
  }
}

/**
 * Called when a mission resolves (win or loss).
 * Applies rewards, unlocks characters, updates save, resumes story.
 * For battle missions this is called from the endMatch patch below.
 * For non-combat missions it is called directly.
 */
function completeMission(result) {
  const config = result.config || window.__activeMission;
  window.__activeMission = null;

  if (!config) return;

  if (result.win) {
    // ── Coin reward ──
    const base   = config.rewards ? (config.rewards.coins || 100) : 100;
    const earned = Math.round(base * (config.rewardMult || 1.0));
    if (typeof updateCoins === 'function') updateCoins(earned);

    // ── XP reward ──
    const xp = config.rewards ? (config.rewards.xp || 0) : 0;
    if (xp > 0 && typeof window.addXP === 'function') window.addXP(xp);

    // ── Character unlocks from part meta ──
    (config.characterUnlocks || []).forEach(id => {
      if (typeof unlockCharacter === 'function') unlockCharacter(id);
    });

    // ── Rescue flags → character state ──
    (config.rescueFlags || []).forEach(flag => {
      const id = flag.replace(/_pending|_hidden|_seed|_recovered/g, '');
      if (flag.includes('recovered') || flag.includes('seed')) {
        if (typeof markCharacterRecovering === 'function') markCharacterRecovering(id);
      } else if (flag.includes('hidden') || flag.includes('pending')) {
        if (typeof rescueCharacter === 'function') rescueCharacter(id);
      }
    });

    // ── Codex unlocks (placeholder — mark in campProgress) ──
    if (config.codexUnlocks && config.codexUnlocks.length && window.__saveData) {
      if (!window.__saveData.codexProgress) window.__saveData.codexProgress = {};
      config.codexUnlocks.forEach(k => { window.__saveData.codexProgress[k] = true; });
    }

    // ── Camp event mark ──
    if (config.campEvent && window.__saveData) {
      if (!window.__saveData.campProgress) window.__saveData.campProgress = {};
      window.__saveData.campProgress[config.campEvent] = 'done';
    }

    // ── Mission progress mark ──
    if (window.__saveData) {
      if (!window.__saveData.missionProgress) window.__saveData.missionProgress = {};
      window.__saveData.missionProgress[`part_${config.partNumber}`] = {
        status: 'done', type: config.missionType, completedAt: config.partNumber
      };
    }

    if (typeof saveGame === 'function') saveGame();
  }

  // Non-combat missions resume story directly
  if (config.fightType === null || config.fightType === undefined) {
    if (result.win) {
      if (typeof clearPendingFight === 'function') clearPendingFight();
      if (typeof checkpointStory === 'function') checkpointStory(currentPart, scIdx + 1);
      if (typeof updateChapterUnlock === 'function') updateChapterUnlock(currentPart + 1);
      scIdx++;
      if (typeof showScreen === 'function') showScreen('story-screen');
      gameState = 'story';
      if (typeof advance === 'function') advance(true);
    }
  }
  // Battle missions: endMatch handles the story resume (see patch below).
}

// ── Training mission handler ──────────────────────────────────
function _runTrainingMission(config) {
  // Training uses a low-intensity fight (type 1 = normal).
  // We set fightType so the battle feels lighter, then mark training done on complete.
  config.fightType = 2; // rage clone — moderate difficulty
  window.__activeMission = config;
  if (typeof initFight === 'function') initFight(config.fightType);
}

// ── Camp event handler ───────────────────────────────────────
function _runCampEventMission(config) {
  // Camp events are non-combat — mark done and continue story.
  if (window.__saveData) {
    if (!window.__saveData.campProgress) window.__saveData.campProgress = {};
    if (config.campEvent) window.__saveData.campProgress[config.campEvent] = 'seen';
  }
  if (typeof saveGame === 'function') saveGame();
  completeMission({ win: true, config });
}

// ── Patch endMatch to call completeMission for battle missions ──
// Wraps the existing endMatch — does NOT replace it.
(function _patchEndMatchForMissions() {
  const _origEndMatch = typeof endMatch === 'function' ? endMatch : null;
  if (!_origEndMatch || _origEndMatch.__missionPatched) return;

  window.endMatch = function(win) {
    // Run completeMission rewards BEFORE original endMatch resumes story
    const mission = window.__activeMission;
    if (mission && mission.fightType !== null && mission.fightType !== undefined) {
      completeMission({ win, config: mission });
    }
    // Original endMatch handles story resume + banner
    _origEndMatch.call(this, win);
  };
  window.endMatch.__missionPatched = true;
})();

// ── Hook advance() to support s.mission entries (future SCRIPT use) ──
// When a SCRIPT entry has {mission:'typeName'} instead of {fight:N},
// loadMissionForPart is called.  Fully backward-compatible — s.fight still works.
(function _patchAdvanceForMissions() {
  const _origAdvance = typeof advance === 'function' ? advance : null;
  if (!_origAdvance || _origAdvance.__missionPatched) return;

  window.advance = function(force = false) {
    if (typeof scIdx !== 'undefined' && typeof SCRIPT !== 'undefined') {
      const s = SCRIPT[scIdx];
      if (s && s.mission && !s.fight) {
        // SCRIPT entry specifies a mission type directly
        if (typeof setPendingFight === 'function') setPendingFight(currentPart, scIdx, 1);
        const config = loadMissionForPart(currentPart) || {
          partNumber: currentPart,
          missionType: s.mission,
          fightType: MISSION_FTYPES[s.mission] || 1,
          characterUnlocks: [], rescueFlags: [], campEvent: null,
          codexUnlocks: [], rewards: { coins: 100, xp: 30 }, rewardMult: 1.0,
        };
        config.missionType = s.mission;
        config.fightType   = MISSION_FTYPES[s.mission] !== undefined
          ? MISSION_FTYPES[s.mission] : (config.fightType || 1);
        startMission(config);
        return;
      }
    }
    _origAdvance.call(this, force);
  };
  window.advance.__missionPatched = true;
})();

// ── Expose on window ──────────────────────────────────────────
window.MISSION_FTYPES         = MISSION_FTYPES;
window.MISSION_REWARD_MULT    = MISSION_REWARD_MULT;
window.loadMissionForPart     = loadMissionForPart;
window.startMission           = startMission;
window.completeMission        = completeMission;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  RESCUE BATTLE SYSTEM  (v32)
//
//  A rescue battle runs ON TOP of a normal fight.
//  The existing combat loop is untouched.
//
//  Mechanics:
//  - Enemy takes reduced damage (still looks like a real fight)
//  - Each hit on the enemy builds a "control break" meter (0–100)
//  - At 100: resolveRescueBattle() fires instead of checkRound()
//  - If player is defeated first: failRescueBattleIfNeeded()
//  - Meter is drawn in #rescue-indicator strip (CSS above)
//
//  State shape:
//  window.__rescueState = {
//    characterId,      // roster id of the controlled ally
//    controlBreak,     // 0–100, current liberation progress
//    threshold,        // 100 = fully broken
//    rounds,           // rounds fought so far
//    resolved,         // true once liberation fires
//  }
// ════════════════════════════════════════════════════════════════

// ── How much each hit on the enemy advances the control meter ──
const RESCUE_BREAK_PER_HIT_PCT = 8;   // base; heavy hits give 1.5×
const RESCUE_LIBERATE_THRESHOLD = 100;

// ── Per-character rescue fight type overrides ─────────────────
// Controls which enemy fType is used (enemy skin/stats).
// Defaults to fType 1 if not listed.
const RESCUE_FTYPE = {
  solo:     1,  tora_oni: 4,  addy:    1,  oo:    1,
  ree:      1,  knight:   1,  neonkd:  1,  yassine:4,
  friend:   1,  legend:   1,  mr_clone:1,
};

// ── Start a rescue battle ─────────────────────────────────────
/**
 * Call instead of initFight() to run a rescue battle.
 * @param {string} characterId — roster id of the controlled ally
 */
function startRescueBattle(characterId) {
  if (!characterId) { if (typeof initFight==='function') initFight(1); return; }

  const rec = typeof getRosterRecord==='function' ? getRosterRecord(characterId) : null;
  const ft  = RESCUE_FTYPE[characterId] || 1;

  window.__rescueState = {
    characterId,
    characterName: rec ? rec.name : characterId.toUpperCase(),
    characterIcon: rec ? rec.icon : '?',
    controlBreak: 0,
    threshold: RESCUE_LIBERATE_THRESHOLD,
    rounds: 0,
    resolved: false,
    fightType: ft,
  };

  // Mark character as controlled in roster
  if (typeof setCharacterState==='function') setCharacterState(characterId, 'controlled');

  // Show the rescue indicator
  _rescueUpdateUI();

  if (typeof initFight==='function') initFight(ft);
}

// ── Update meter on each enemy hit ───────────────────────────
/**
 * Call every time the enemy takes a hit during a rescue battle.
 * @param {boolean} heavy — heavy hit gives bonus break
 * @returns {boolean} true if liberation threshold reached
 */
function updateRescueState(heavy = false) {
  const rs = window.__rescueState;
  if (!rs || rs.resolved) return false;

  const gain = heavy
    ? Math.round(RESCUE_BREAK_PER_HIT_PCT * 1.5)
    : RESCUE_BREAK_PER_HIT_PCT;

  rs.controlBreak = Math.min(rs.threshold, rs.controlBreak + gain);
  _rescueUpdateUI();

  if (rs.controlBreak >= rs.threshold) {
    resolveRescueBattle();
    return true;
  }
  return false;
}

// ── Liberation ───────────────────────────────────────────────
/**
 * Fires when control break reaches threshold.
 * Transitions character to rescued → recovering, shows banner,
 * then resumes story.
 */
function resolveRescueBattle() {
  const rs = window.__rescueState;
  if (!rs || rs.resolved) return;
  rs.resolved = true;

  const id   = rs.characterId;
  const name = rs.characterName || id.toUpperCase();

  // Roster state: rescued → recovering
  if (typeof rescueCharacter==='function')          rescueCharacter(id);
  if (typeof markCharacterRecovering==='function')  markCharacterRecovering(id);

  // Save progress
  if (window.__saveData) {
    if (!window.__saveData.missionProgress) window.__saveData.missionProgress = {};
    window.__saveData.missionProgress[`rescue_${id}`] = {
      status: 'rescued', completedAtPart: typeof currentPart!=='undefined' ? currentPart : 0
    };
    if (!window.__saveData.rescuedCharacters) window.__saveData.rescuedCharacters = [];
    if (!window.__saveData.rescuedCharacters.includes(id))
      window.__saveData.rescuedCharacters.push(id);
  }
  if (typeof saveGame==='function') saveGame();

  // Hide rescue indicator
  _rescueHideUI();

  // Stop combat, show liberation banner, resume story
  if (typeof gameState!=='undefined') gameState='post';
  if (typeof setEnvRage==='function') setEnvRage(false);
  if (typeof UI!=='undefined' && UI.ctrls) UI.ctrls.style.display='none';
  if (typeof UI!=='undefined' && UI.kbhint) UI.kbhint.style.display='none';
  if (typeof startMusicTheme==='function') startMusicTheme('story');
  if (typeof switchToNormalBg==='function') switchToNormalBg();

  if (typeof showBanner==='function') {
    showBanner(`${name} FREED`, () => {
      window.__rescueState = null;
      if (typeof clearPendingFight==='function') clearPendingFight();
      if (typeof checkpointStory==='function') checkpointStory(currentPart, scIdx+1);
      if (typeof updateChapterUnlock==='function') updateChapterUnlock(currentPart+1);
      scIdx++;
      if (typeof applyPartBg==='function') applyPartBg(currentPart);
      if (typeof showScreen==='function') showScreen('story-screen');
      if (typeof advance==='function') { gameState='story'; advance(true); }
    }, 2500);
  }
}

// ── Failure path ─────────────────────────────────────────────
/**
 * Called when checkRound detects player defeat during a rescue battle.
 * Hides indicator, lets normal endMatch(false) handle defeat flow.
 */
function failRescueBattleIfNeeded() {
  const rs = window.__rescueState;
  if (!rs || rs.resolved) return;
  // Don't clear __rescueState — allow retry; just hide UI
  _rescueHideUI();
}

// ── UI helpers ───────────────────────────────────────────────
function _rescueUpdateUI() {
  const rs  = window.__rescueState;
  const el  = document.getElementById('rescue-indicator');
  const bar = document.getElementById('rescueMeterFill');
  const lbl = document.getElementById('rescueCharName');
  if (!el) return;

  if (!rs) { el.classList.remove('active','near-free'); return; }

  el.classList.add('active');
  const pct = Math.round((rs.controlBreak / rs.threshold) * 100);
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = rs.characterName || '—';
  el.classList.toggle('near-free', pct >= 80);
}

function _rescueHideUI() {
  const el = document.getElementById('rescue-indicator');
  if (el) el.classList.remove('active','near-free');
}

// ── Patch takeHit to feed control meter ──────────────────────
// Deferred — Fighter is defined later in the script.
function _patchTakeHitForRescue() {
  if (typeof Fighter === 'undefined' || !Fighter.prototype) return;
  const _orig = Fighter.prototype.takeHit;
  if (!_orig || _orig.__rescuePatched) return;

  Fighter.prototype.takeHit = function(dmg, fd, heavy=false) {
    _orig.call(this, dmg, fd, heavy);
    // Only advance meter when the *enemy* is hit during a rescue battle
    if (!this.isP && window.__rescueState && !window.__rescueState.resolved) {
      updateRescueState(!!heavy);
    }
  };
  Fighter.prototype.takeHit.__rescuePatched = true;
}

// ── Patch checkRound to intercept rescue liberation ──────────
// Deferred — checkRound is defined later in the script.
function _patchCheckRoundForRescue() {
  const _origCR = typeof checkRound==='function' ? checkRound : null;
  if (!_origCR || _origCR.__rescuePatched) return;

  window.checkRound = function() {
    const rs = window.__rescueState;
    // Liberation already in progress — skip normal round logic
    if (rs && rs.resolved) return;
    // Player was defeated in a rescue battle
    if (rs && !rs.resolved && typeof player!=='undefined' && player && player.hp<=0) {
      failRescueBattleIfNeeded();
    }
    _origCR.call(this);
  };
  window.checkRound.__rescuePatched = true;
}

// ── Expose on window ──────────────────────────────────────────
window.RESCUE_FTYPE          = RESCUE_FTYPE;
window.startRescueBattle     = startRescueBattle;
window.updateRescueState     = updateRescueState;
window.resolveRescueBattle   = resolveRescueBattle;
window.failRescueBattleIfNeeded = failRescueBattleIfNeeded;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  TRAINING PATH SYSTEM  (v33)
//
//  Three paths unlock via story progression:
//    range  — teacher: Raevan  — prepares ranged weapon unlocks
//    rage   — teacher: Kaizen  — gates Rage 1 / 2 / 3
//    field — teacher: Sorya   — prepares battlefield/field unlocks
//
//  Each path has tiered nodes. A node is:
//    { id, title, effect, reqPart, reqNode|null, passive }
//  passive: lightweight stat/flag applied immediately on unlock.
//
//  Save key: __saveData.unlockedTrainingPaths (already exists as [])
//  Nodes stored per-path: __saveData.trainingNodes = { range:{}, rage:{} }
// ════════════════════════════════════════════════════════════════

// ── Path data ────────────────────────────────────────────────
const TRAINING_PATHS = {

  range: {
    id: 'range',
    name: 'RANGE PATH',
    teacher: 'Raevan',
    icon: '🏹',
    color: '#f0c040',
    unlockPart: 12,   // Raevan first appears part 12
    desc: 'Master countershot, precision, and ranged pressure. Raevan teaches where to aim before the enemy moves.',
    nodes: [
      { id:'range_1', tier:1, title:'Eye on the Horizon',
        effect:'+Accuracy awareness · countershot foundation',
        reqPart:12, reqNode:null,
        passive:{ type:'none', desc:'Unlocks Range path. No stat change yet.' } },
      { id:'range_2', tier:2, title:'Lead the Target',
        effect:'+5% projectile damage (future) · read enemy movement',
        reqPart:16, reqNode:'range_1',
        passive:{ type:'none', desc:'Shoot where they will be, not where they are.' } },
      { id:'range_3', tier:3, title:'Countershot I',
        effect:'Unlock Countershot mechanic hook · enemy projectile window',
        reqPart:19, reqNode:'range_2',
        passive:{ type:'flag', flag:'countershot_1', desc:'First countershot gate opened.' } },
      { id:'range_4', tier:4, title:'Black-Ribbon Trial',
        effect:'+Stamina efficiency on ranged attacks (future)',
        reqPart:22, reqNode:'range_3',
        passive:{ type:'none', desc:'Threading arrows through moving lanterns.' } },
      { id:'range_5', tier:5, title:'Countershot II',
        effect:'Unlock Countershot II · extended window · precision bonus',
        reqPart:35, reqNode:'range_4',
        passive:{ type:'flag', flag:'countershot_2', desc:'Countershot mastery level.' } },
      { id:'range_6', tier:6, title:'Dead Angle',
        effect:'Future: off-axis shot · flanking ranged attack unlock',
        reqPart:45, reqNode:'range_5',
        passive:{ type:'none', desc:'Strike from where they cannot guard.' } },
    ],
  },

  rage: {
    id: 'rage',
    name: 'RAGE PATH',
    teacher: 'Kaizen',
    icon: '🔥',
    color: '#ff1744',
    unlockPart: 17,   // Kaizen first teaches at part 17
    desc: 'Ignite discipline into power. Kaizen teaches Rage as precision, not explosion. Three gates: survival, control, sacrifice.',
    nodes: [
      { id:'rage_1', tier:1, title:'First Gate — Survival',
        effect:'Rage I active (already in game) · duration awareness',
        reqPart:17, reqNode:null,
        passive:{ type:'flag', flag:'rage_gate_1', desc:'Rage 1 recognised as a conscious choice, not a reaction.' } },
      { id:'rage_2', tier:2, title:'Hold the Flame',
        effect:'+Rage builds 8% faster per hit taken',
        reqPart:20, reqNode:'rage_1',
        passive:{ type:'rageGainBonus', value:0.08, desc:'Rage meter fills faster.' } },
      { id:'rage_3', tier:3, title:'Furnace Trial',
        effect:'Rage I speed multiplier +5% (future combat hook)',
        reqPart:23, reqNode:'rage_2',
        passive:{ type:'none', desc:'Keep Rage active while refusing every killing blow.' } },
      { id:'rage_4', tier:4, title:'Second Gate — Control',
        effect:'Rage II unlocked (mirrors in-game buy-rage2 if already purchased)',
        reqPart:41, reqNode:'rage_3',
        passive:{ type:'flag', flag:'rage_gate_2', desc:'Rage 2 gate opened. Discipline replaces humiliation as the trigger.' } },
      { id:'rage_5', tier:5, title:'Red Discipline',
        effect:'+Rage II duration +20% (future hook) · recovery regen during Rage',
        reqPart:42, reqNode:'rage_4',
        passive:{ type:'none', desc:'The red is controlled now. Not calmed — controlled.' } },
      { id:'rage_6', tier:6, title:'Third Gate — Sacrifice',
        effect:'Rage III gate (placeholder) · unlocks when story reaches it',
        reqPart:50, reqNode:'rage_5',
        passive:{ type:'flag', flag:'rage_gate_3', desc:'The third gate demands something back.' } },
    ],
  },
};

// ── Save helpers ──────────────────────────────────────────────

function _trainingNodes() {
  if (!window.__saveData) return {};
  if (!window.__saveData.trainingNodes) window.__saveData.trainingNodes = { range:{}, rage:{} };
  return window.__saveData.trainingNodes;
}

/** True if the whole path is accessible (story part reached). */
function isTrainingPathUnlocked(path) {
  const p = TRAINING_PATHS[path];
  if (!p) return false;
  const reached = window.__saveData && window.__saveData.currentPart
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return reached >= p.unlockPart;
}

/** Returns {total, done, nodes:{nodeId:true/false}} for a path. */
function getTrainingProgress(path) {
  const p = TRAINING_PATHS[path];
  if (!p) return { total:0, done:0, nodes:{} };
  const nodes = _trainingNodes()[path] || {};
  const done  = p.nodes.filter(n => !!nodes[n.id]).length;
  return { total: p.nodes.length, done, nodes };
}

/**
 * Unlock a specific node.  Checks reqPart and reqNode prerequisites.
 * Applies passive effect immediately.
 * Returns true on success.
 */
function unlockTrainingNode(path, nodeId) {
  const p = TRAINING_PATHS[path];
  if (!p) return false;

  const nodeDef = p.nodes.find(n => n.id === nodeId);
  if (!nodeDef) return false;

  const reached = window.__saveData && window.__saveData.currentPart
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);

  if (reached < nodeDef.reqPart) return false;  // story not far enough

  if (nodeDef.reqNode) {                         // prerequisite node
    const prevUnlocked = (_trainingNodes()[path] || {})[nodeDef.reqNode];
    if (!prevUnlocked) return false;
  }

  // Mark unlocked
  if (!window.__saveData.trainingNodes[path]) window.__saveData.trainingNodes[path] = {};
  window.__saveData.trainingNodes[path][nodeId] = true;

  // Register path in unlockedTrainingPaths array
  if (!Array.isArray(window.__saveData.unlockedTrainingPaths))
    window.__saveData.unlockedTrainingPaths = [];
  if (!window.__saveData.unlockedTrainingPaths.includes(path))
    window.__saveData.unlockedTrainingPaths.push(path);

  // Apply passive effect
  _applyTrainingPassive(nodeDef.passive);

  if (typeof saveGame === 'function') saveGame();
  return true;
}

function _applyTrainingPassive(passive) {
  if (!passive || passive.type === 'none') return;
  if (passive.type === 'flag') {
    if (!window.__saveData.codexProgress) window.__saveData.codexProgress = {};
    window.__saveData.codexProgress[passive.flag] = true;
  }
  if (passive.type === 'rageGainBonus') {
    // Store so applySquadBonusesToFight can read it alongside squad bonuses
    if (!window.__saveData.trainingPassives) window.__saveData.trainingPassives = {};
    window.__saveData.trainingPassives.rageGainBonus =
      (window.__saveData.trainingPassives.rageGainBonus || 0) + (passive.value || 0);
  }
}

// ── Screen state ──────────────────────────────────────────────
let _trainingActivePath = 'range';

function openTraining() {
  if (typeof initAudio === 'function') initAudio();
  _trainingActivePath = 'range';
  _renderTrainingScreen();
  if (typeof showScreen === 'function') showScreen('training-screen');
}

function closeTraining() {
  if (typeof showScreen === 'function') showScreen('menu-screen');
}

function setTrainingPath(path) {
  _trainingActivePath = path;
  // Update tab styles
  ['range','rage'].forEach(p => {
    const tab = document.getElementById('tTab-' + p);
    if (tab) tab.classList.toggle('active', p === path);
  });
  _renderTrainingPathBody(path);
}

function _renderTrainingScreen() {
  // Lock tabs for paths not yet available
  ['range','rage'].forEach(p => {
    const tab = document.getElementById('tTab-' + p);
    if (!tab) return;
    const unlocked = isTrainingPathUnlocked(p);
    tab.classList.toggle('locked-tab', !unlocked);
    tab.classList.toggle('active', p === _trainingActivePath);
  });
  _renderTrainingPathBody(_trainingActivePath);
}

function _renderTrainingPathBody(path) {
  const body = document.getElementById('trainingPathBody');
  if (!body) return;

  const pathDef = TRAINING_PATHS[path];
  const pathUnlocked = isTrainingPathUnlocked(path);

  if (!pathDef || !pathUnlocked) {
    const reached = window.__saveData && window.__saveData.currentPart
      ? window.__saveData.currentPart : 1;
    body.innerHTML = `<div style="padding:40px 20px;text-align:center;">
      <div style="font-family:var(--font-display);font-size:14px;color:rgba(212,160,23,0.35);letter-spacing:6px;">PATH LOCKED</div>
      <div style="font-family:var(--font-body);font-size:9px;color:rgba(200,170,100,0.25);letter-spacing:3px;margin-top:10px;">
        ${pathDef ? `REACH PART ${pathDef.unlockPart} · CURRENTLY PART ${reached}` : 'UNKNOWN PATH'}
      </div></div>`;
    return;
  }

  const progress = getTrainingProgress(path);
  const pct      = pathDef.nodes.length ? Math.round((progress.done / pathDef.nodes.length) * 100) : 0;
  const reached  = window.__saveData && window.__saveData.currentPart
    ? window.__saveData.currentPart : 1;

  const rows = [];

  // Banner
  rows.push(`<div class="tp-banner">
    <div class="tp-banner-icon">${pathDef.icon}</div>
    <div class="tp-banner-info">
      <div class="tp-banner-name">${pathDef.name}</div>
      <div class="tp-banner-teacher">TEACHER: ${pathDef.teacher.toUpperCase()}</div>
      <div class="tp-banner-desc">${pathDef.desc}</div>
      <div class="tp-progress-row">
        <span class="tp-progress-label">PROGRESS</span>
        <div class="tp-progress-track"><div class="tp-progress-fill" style="width:${pct}%"></div></div>
        <span class="tp-progress-val">${progress.done}/${progress.done>0?pathDef.nodes.length:pathDef.nodes.length}</span>
      </div>
    </div>
  </div>`);

  // Nodes
  pathDef.nodes.forEach((node, i) => {
    const nodeUnlocked  = !!progress.nodes[node.id];
    const prevUnlocked  = i === 0 || !!progress.nodes[pathDef.nodes[i-1].id];
    const storyReached  = reached >= node.reqPart;
    const isAvailable   = !nodeUnlocked && prevUnlocked && storyReached;
    const isLocked      = !nodeUnlocked && (!prevUnlocked || !storyReached);

    const stateClass  = nodeUnlocked ? 'node-unlocked' : isAvailable ? 'node-available' : 'node-locked';
    const badgeClass  = nodeUnlocked ? 'badge-done' : isAvailable ? 'badge-available' : 'badge-locked';
    const badgeLabel  = nodeUnlocked ? '✓ DONE' : isAvailable ? 'UNLOCK' : isLocked && !storyReached ? `PART ${node.reqPart}` : 'LOCKED';
    const clickAttr   = isAvailable ? `onclick="unlockTrainingNode('${path}','${node.id}');_renderTrainingScreen();"` : '';

    if (i > 0) rows.push('<div class="tp-connector"></div>');

    rows.push(`<div class="tp-node ${stateClass}" ${clickAttr}>
      <div class="tp-node-num">${node.tier}</div>
      <div class="tp-node-info">
        <div class="tp-node-title">${nodeUnlocked || isAvailable ? node.title : '— LOCKED —'}</div>
        <div class="tp-node-effect">${nodeUnlocked || isAvailable ? node.effect : `Reach Part ${node.reqPart} to reveal`}</div>
        ${isAvailable ? `<div class="tp-node-req">TAP TO UNLOCK</div>` : ''}
      </div>
      <div class="tp-node-badge ${badgeClass}">${badgeLabel}</div>
    </div>`);
  });

  body.innerHTML = rows.join('');
}

// ── Expose on window ──────────────────────────────────────────
window.TRAINING_PATHS         = TRAINING_PATHS;
window.isTrainingPathUnlocked = isTrainingPathUnlocked;
window.unlockTrainingNode     = unlockTrainingNode;
window.getTrainingProgress    = getTrainingProgress;
window.openTraining           = openTraining;
window.closeTraining          = closeTraining;
window.setTrainingPath        = setTrainingPath;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  RAGE TIER SYSTEM  (v34)
//
//  Extends existing rageTier 1/2 with Tier 3.
//  All existing rageMode2 / rageTier behavior is preserved.
//  New helpers gate tier 3 behind training progress.
//
//  Tier 1 — Shadow Rage  (always available once rage meter fills)
//  Tier 2 — Blood Rage   (requires rageMode2 purchase, part 41 training)
//  Tier 3 — Void Rage    (requires rage_gate_3, part 50 training — placeholder)
//
//  getRageModifiers(tier) is the single source of truth for
//  all multipliers.  The existing combat code patches below
//  delegate to it, replacing scattered === 2 checks.
// ════════════════════════════════════════════════════════════════

const RAGE_TIER_DATA = {
  1: {
    label:     'RAGE I',
    labelShort:'SHADOW RAGE',
    // ── stat multipliers ──
    spdMul:     1.24,   // player speed bonus while raging
    atkMul:     1.5,    // damage multiplier (applied in attack resolution)
    defMul:     1.0,    // incoming damage multiplier (1.0 = no change)
    rageDrain:  0.15,   // rage points lost per frame while active
    rageGain:   1.0,    // multiplier on all rage gain sources
    // ── attack frame speed-ups ──
    atkFrameMul:{ p:0.76, k:0.80, slam:0.90, throw:0.92 },
    atkFrameMin:{ p:6, k:8, slam:15, throw:13 },
    // ── enemy slowdown while player is raging ──
    enemySlow:  0.78,   // enemy speed multiplier
    enemyAtkAdj:0.22,   // atkT added per tick to slow enemy attacks
    enemyHitAdj:0.14,
    enemyVxMul: 0.93,
    // ── visuals (CSS body classes, canvas) ──
    bodyClass:  'rage-tier-1',
    overlayBg:  'radial-gradient(circle at 50% 54%, rgba(106,238,255,0.08) 0%, transparent 36%), radial-gradient(ellipse at 50% 100%, rgba(86,28,170,0.10) 0%, transparent 74%), linear-gradient(180deg, rgba(10,18,58,0.05) 0%, rgba(2,0,12,0.01) 100%)',
    bgGrad:     'radial-gradient(ellipse at 50% 110%, #1b0f46 0%, #090b25 44%, #020208 100%)',
    strokeCol:  'rgba(100,232,255,0.42)',
    fillCol:    'rgba(120,96,255,0.24)',
    strokeAlpha:0.46, fillAlpha:0.18, strokeW:2.6,
    ellipseW:   0.72, ellipseH:0.58,
    ellipseWO:  0.92, ellipseHO:0.72,
    shadowCol:  'rgba(98,232,255,0.95)',
    // ── unlock ──
    reqFlag:    null,          // always available
    reqPart:    1,
  },
  2: {
    label:     'RAGE II',
    labelShort:'BLOOD RAGE',
    spdMul:     1.34,
    atkMul:     2.0,
    defMul:     0.72,          // takes 72% damage (was hardcoded in takeHit)
    rageDrain:  0.15,
    rageGain:   1.0,
    atkFrameMul:{ p:0.66, k:0.70, slam:0.84, throw:0.86 },
    atkFrameMin:{ p:6, k:8, slam:15, throw:13 },
    enemySlow:  0.62,
    enemyAtkAdj:0.45,
    enemyHitAdj:0.28,
    enemyVxMul: 0.86,
    bodyClass:  'rage-tier-2',
    overlayBg:  'radial-gradient(circle at 50% 54%, rgba(255,90,90,0.10) 0%, transparent 32%), radial-gradient(ellipse at 50% 100%, rgba(130,0,0,0.18) 0%, transparent 74%), linear-gradient(180deg, rgba(58,0,0,0.12) 0%, rgba(12,0,0,0.02) 100%)',
    bgGrad:     'radial-gradient(ellipse at 50% 110%, #340000 0%, #120002 44%, #020208 100%)',
    strokeCol:  'rgba(255,54,54,0.50)',
    fillCol:    'rgba(120,0,0,0.38)',
    strokeAlpha:0.55, fillAlpha:0.22, strokeW:3.2,
    ellipseW:   0.72, ellipseH:0.58,
    ellipseWO:  0.92, ellipseHO:0.72,
    shadowCol:  'rgba(255,72,72,0.95)',
    reqFlag:    'rage_gate_2',
    reqPart:    41,
  },
  3: {
    label:     'RAGE III',
    labelShort:'VOID RAGE',
    spdMul:     1.46,
    atkMul:     2.6,
    defMul:     0.60,          // high risk — takes 60% damage
    rageDrain:  0.22,          // drains faster
    rageGain:   1.2,
    atkFrameMul:{ p:0.58, k:0.62, slam:0.76, throw:0.78 },
    atkFrameMin:{ p:5, k:7, slam:13, throw:11 },
    enemySlow:  0.50,
    enemyAtkAdj:0.65,
    enemyHitAdj:0.40,
    enemyVxMul: 0.78,
    bodyClass:  'rage-tier-3',
    overlayBg:  'radial-gradient(circle at 50% 54%, rgba(200,60,255,0.12) 0%, transparent 30%), radial-gradient(ellipse at 50% 100%, rgba(80,0,120,0.22) 0%, transparent 70%), linear-gradient(180deg, rgba(30,0,50,0.14) 0%, rgba(8,0,14,0.02) 100%)',
    bgGrad:     'radial-gradient(ellipse at 50% 110%, #1a003a 0%, #0a0018 44%, #020208 100%)',
    strokeCol:  'rgba(210,80,255,0.55)',
    fillCol:    'rgba(100,0,160,0.40)',
    strokeAlpha:0.65, fillAlpha:0.28, strokeW:3.8,
    ellipseW:   0.80, ellipseH:0.64,
    ellipseWO:  1.00, ellipseHO:0.78,
    shadowCol:  'rgba(190,60,255,0.95)',
    reqFlag:    'rage_gate_3',
    reqPart:    50,
  },
};

// ── Helpers ───────────────────────────────────────────────────

/** Returns the highest rage tier the player can currently activate. */
function getCurrentRageTier() {
  if (typeof player !== 'undefined' && player && player.isP) return player.rageTier || 1;
  return _computeRageTier();
}

function _computeRageTier() {
  // Tier 3 — requires rage_gate_3 training flag
  if (_rageGateUnlocked('rage_gate_3') && _rageTierPartReached(50)) return 3;
  // Tier 2 — requires rageMode2 (existing) or rage_gate_2 flag
  if ((typeof rageMode2 !== 'undefined' && rageMode2) ||
      _rageGateUnlocked('rage_gate_2')) return 2;
  return 1;
}

function _rageGateUnlocked(flag) {
  const cp = window.__saveData && window.__saveData.codexProgress;
  if (cp && cp[flag]) return true;
  const tp = window.__saveData && window.__saveData.trainingPassives;
  return false; // flags only via codexProgress from training unlocks
}

function _rageTierPartReached(reqPart) {
  const reached = window.__saveData && window.__saveData.currentPart
    ? window.__saveData.currentPart
    : (typeof currentPart !== 'undefined' ? currentPart : 1);
  return reached >= reqPart;
}

/** True if the player is able to activate the given tier right now. */
function canActivateRageTier(tier) {
  const data = RAGE_TIER_DATA[tier];
  if (!data) return false;
  if (data.reqFlag && !_rageGateUnlocked(data.reqFlag)) return false;
  if (data.reqPart && !_rageTierPartReached(data.reqPart)) return false;
  return true;
}

/** Returns the modifier object for a tier (safe fallback to tier 1). */
function getRageModifiers(tier) {
  return RAGE_TIER_DATA[tier] || RAGE_TIER_DATA[1];
}

/** Activate rage at the given tier on the live player. */
function activateRageTier(tier) {
  if (typeof player === 'undefined' || !player || !player.isP) return;
  if (!canActivateRageTier(tier)) tier = 1;
  player.rageTier   = tier;
  player.rageActive = true;
  if (typeof setEnvRage === 'function') setEnvRage(true);
}

/** Deactivate rage on the live player. */
function deactivateRage() {
  if (typeof player !== 'undefined' && player && player.isP) {
    player.rageActive = false;
    player.rage = 0;
  }
  if (typeof setEnvRage === 'function') setEnvRage(false);
}

// ── Patch Fighter constructor to assign rageTier from new system ──
// Deferred — startRound is defined later in the script.
function _patchFighterRageTier() {
  const _origStartRound = typeof startRound === 'function' ? startRound : null;
  if (!_origStartRound || _origStartRound.__rageTierPatched) return;
  window.startRound = function(n) {
    _origStartRound.call(this, n);
    // After player is constructed, upgrade their rageTier if earned
    if (typeof player !== 'undefined' && player && player.isP) {
      const earned = _computeRageTier();
      if (earned > (player.rageTier || 1)) player.rageTier = earned;
    }
  };
  window.startRound.__rageTierPatched = true;
}

// ── CSS for rage tier 3 button + body class ───────────────────
(function _injectRageTier3CSS() {
  if (document.getElementById('rage-tier3-style')) return;
  const st = document.createElement('style');
  st.id = 'rage-tier3-style';
  st.textContent = `
    body.rage-tier-3 #btn-rage.active {
      border-color: #d44cff !important;
      color: #f8eeff !important;
      background: radial-gradient(circle at 40% 35%, rgba(60,0,90,0.98), rgba(18,0,30,0.98)) !important;
      box-shadow: 0 0 28px rgba(200,60,255,0.55), 0 0 80px rgba(100,0,180,0.28), 0 0 16px rgba(240,200,255,0.08) !important;
      animation: voidRagePulse 0.7s ease-in-out infinite alternate;
    }
    @keyframes voidRagePulse {
      from { box-shadow: 0 0 20px rgba(200,60,255,0.40), 0 0 50px rgba(100,0,180,0.18); }
      to   { box-shadow: 0 0 38px rgba(200,60,255,0.75), 0 0 100px rgba(100,0,180,0.38); }
    }
    body.rage-tier-3 #rage-text { color: #d44cff !important; }
  `;
  document.head.appendChild(st);
})();

// ── Patch syncRageUi (in v25 script) to handle tier 3 ─────────
(function _patchSyncRageUiForTier3() {
  // syncRageUi is a closure inside the v25 script block — we reach it
  // by replacing setEnvRage with a version that also sets tier-3 classes.
  const _prev = window.setEnvRage;
  if (!_prev || _prev.__tier3Patched) return;

  window.setEnvRage = function(on) {
    _prev.call(this, on);         // runs existing syncRageUi for tiers 1+2
    try {
      const tier = (typeof player !== 'undefined' && player && player.isP)
        ? (player.rageTier || 1) : 1;
      document.body.classList.toggle('rage-tier-3', !!on && tier === 3);
      // Override body classes if tier 3 (remove 1/2 set by old syncRageUi)
      if (on && tier === 3) {
        document.body.classList.remove('rage-tier-1','rage-tier-2');
      }
      // Update overlay for tier 3
      const data = RAGE_TIER_DATA[tier] || RAGE_TIER_DATA[1];
      const overlay = document.getElementById('rage-overlay');
      if (overlay && on) overlay.style.background = data.overlayBg;
      if (window.UI && UI.bg && on) UI.bg.style.background = data.bgGrad;
      // Update button label
      const btn = document.getElementById('btn-rage');
      if (btn) btn.textContent = on ? data.label : 'RAGE';
    } catch(e) {}
  };
  window.setEnvRage.__tier3Patched = true;
})();

// ── Expose on window ──────────────────────────────────────────
window.RAGE_TIER_DATA       = RAGE_TIER_DATA;
window.getCurrentRageTier   = getCurrentRageTier;
window.canActivateRageTier  = canActivateRageTier;
window.activateRageTier     = activateRageTier;
window.deactivateRage       = deactivateRage;
window.getRageModifiers     = getRageModifiers;

// ─────────────────────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
//  SYSTEM INTEGRATION LAYER  (v36)
//
//  A. RANGED WEAPON FRAMEWORK
// ════════════════════════════════════════════════════════════════
//  C. CODEX — enemy / boss / faction records
// ════════════════════════════════════════════════════════════════
// Status lifecycle: unknown → encountered → defeated (or active for ongoing threats)
// Status persists in __saveData.codexProgress as { entryId: status_string }

const CODEX_RECORDS = [
  // ── ENEMIES — DRAKOS ──
  { id:'varkul',     name:'VARKUL',          icon:'⚔',  cat:'boss',    faction:'Drako', introPartRef:25,
    title:'Drako No.11 — The March',
    desc:'Does not chase. Advances like the map belongs to him. Retreat is not escape; it is scheduling your death.' },
  { id:'zeigran',    name:'ZEIGRAN',          icon:'🌋', cat:'boss',    faction:'Drako', introPartRef:26,
    title:'Drako No.10 — Heat Line',
    desc:'Even his greeting burns. The heat line turns armor into ovens.' },
  { id:'dread_juno', name:'DREAD JUNO',       icon:'☠',  cat:'boss',    faction:'Drako', introPartRef:37,
    title:'Drako No.7 — Midnight Raid',
    desc:'A midnight raid turns the camp into a red-lit slaughterground. His scythe field halves the distance between alive and not.' },
  { id:'kaith',      name:'KAITH',            icon:'⛓',  cat:'boss',    faction:'Drako', introPartRef:38,
    title:'Drako No.8 — Chain Field',
    desc:'Turns space into linked anchor points. Drags the whole team through steel pain.' },
  { id:'rhaziel',    name:'RHAZIEL',          icon:'🔕', cat:'boss',    faction:'Drako', introPartRef:39,
    title:'Drako No.6 — Null Chapel',
    desc:'The null-bell turns fields off like lamps. Forces everyone to fight without tricks, only pain and timing.' },
  { id:'morvain',    name:'MORVAIN',          icon:'🎭', cat:'enemy',   faction:'Drako', introPartRef:34,
    title:'Drako — The Masked Laugh',
    desc:'Field makes him near-invisible. Raevan teaches Chug to shoot where Morvain will lie, not where he stands.' },
  // ── ENEMIES — NEXTERS ──
  { id:'kade',       name:'KADE',             icon:'📐', cat:'boss',    faction:'Nexter', introPartRef:36,
    title:'Nexter No.2 — Precision Mark',
    desc:'Puts a symbol in the dirt and calls Chug unfinished. Hunts the weakest member and calls that strategy.' },
  { id:'lynex',      name:'LYNEX',            icon:'🐍', cat:'enemy',   faction:'Nexter', introPartRef:24,
    title:'Nexter No.5 — Circler',
    desc:'Likes Solo immediately and hates that Chug exists. Encirclement is her preferred sentence.' },
  { id:'zeph',       name:'ZEPH',             icon:'💨', cat:'enemy',   faction:'Nexter', introPartRef:21,
    title:'Nexter No.6 — Crossfire',
    desc:'Tests Chug\'s range discipline alongside Lynex, then vanishes before a kill.' },
  { id:'riven',      name:'RIVEN',            icon:'🎯', cat:'enemy',   faction:'Unknown', introPartRef:29,
    title:'Unknown — Scout',
    desc:'Tests camp reaction time, then leaves before the arrow that nearly kills him.' },
  // ── ENEMIES — WORLD BOSSES / LATE ──
  { id:'sable_vorn', name:'SABLE VORN',       icon:'🩶', cat:'boss',    faction:'Unknown', introPartRef:43,
    title:'Part 43 — Sable Vorn',
    desc:'A grey-iron threat. The camp has not named what faction he serves.' },
  { id:'tyrvak',     name:'TYRVAK',           icon:'👑', cat:'boss',    faction:'Unknown', introPartRef:47,
    title:'Tyrvak\'s Court — Part 47',
    desc:'The court is a trap dressed as an invitation. Every pillar hides a blade.' },
  { id:'noxrael',    name:'NOXRAEL',          icon:'🎵', cat:'boss',    faction:'Unknown', introPartRef:48,
    title:'Noxrael\'s Choir — Part 48',
    desc:'The choir harmonises until the walls bleed. Sound as a weapon.' },
  { id:'xollonox',   name:'XOLLONOX',         icon:'🌑', cat:'boss',    faction:'Unknown', introPartRef:49,
    title:'Part 49 — Xollonox',
    desc:'The last named obstruction before the gate. Its field has no recorded weaknesses yet.' },
  { id:'arowh',      name:'AROWH — No.12',    icon:'🟥', cat:'boss',    faction:'Drako', introPartRef:12,
    title:'Drako No.12 — Unkillable',
    desc:'HP never reaches zero. Absorbs 95% of all damage. The first lesson about limits.' },
  // ── FACTIONS ──
  { id:'faction_drako',  name:'THE DRAKOS',   icon:'🐉', cat:'faction', faction:'Drako',  introPartRef:5,
    title:'Faction — Drakos',
    desc:'Built soldiers, not trained. They advance like the map belongs to them. Twelve known members.' },
  { id:'faction_nexter', name:'THE NEXTERS',  icon:'🔮', cat:'faction', faction:'Nexter', introPartRef:6,
    title:'Faction — Nexters',
    desc:'Precision cruelty. They study the team the way a surgeon studies anatomy before operating.' },
  { id:'faction_unknown',name:'THE UNSEEN',   icon:'❔', cat:'faction', faction:'Unknown',introPartRef:30,
    title:'Faction — The Unseen',
    desc:'Beyond Drakos and Nexters. The camp has no name for them yet. M.R knows more than he says.' },
];

// ── Codex status helpers ──────────────────────────────────────

function _codexStatus(id) {
  const cp = window.__saveData && window.__saveData.codexProgress;
  if (!cp) return 'unknown';
  const v = cp[id];
  if (v === 'defeated' || v === true) return 'defeated'; // true = legacy
  return v || 'unknown';
}

function setCodexStatus(id, status) {
  // status: 'unknown' | 'encountered' | 'defeated' | 'active'
  if (!window.__saveData) return;
  if (!window.__saveData.codexProgress) window.__saveData.codexProgress = {};
  window.__saveData.codexProgress[id] = status;
  if (typeof saveGame === 'function') saveGame();
}

function markCodexEncountered(id) { setCodexStatus(id, 'encountered'); }
function markCodexDefeated(id)    { setCodexStatus(id, 'defeated'); }
function markCodexActive(id)      { setCodexStatus(id, 'active'); }

function getCodexRecord(id) {
  const rec = CODEX_RECORDS.find(r => r.id === id);
  if (!rec) return null;
  return { ...rec, codexStatus: _codexStatus(id) };
}

// ── Auto-encounter: when CAMPAIGN_PART_META says introPartRef ──
// Called from completeMission / part start — marks records encountered.
function autoUpdateCodexForPart(partNum) {
  const reached = partNum || (typeof currentPart !== 'undefined' ? currentPart : 1);
  CODEX_RECORDS.forEach(r => {
    if (r.introPartRef <= reached && _codexStatus(r.id) === 'unknown') {
      setCodexStatus(r.id, 'encountered');
    }
  });
}

// ── Screen ────────────────────────────────────────────────────
let _codexFilter = 'all';

function openCodex() {
  if (typeof initAudio === 'function') initAudio();
  autoUpdateCodexForPart(typeof currentPart !== 'undefined' ? currentPart : 1);
  _codexFilter = 'all';
  document.querySelectorAll('.codex-tab').forEach(t => {
    const f = t.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    t.classList.toggle('active', f === 'all');
  });
  _renderCodex();
  if (typeof showScreen === 'function') showScreen('codex-screen');
}

function closeCodex() {
  if (typeof showScreen === 'function') showScreen('menu-screen');
}

function setCodexFilter(filter) {
  _codexFilter = filter;
  document.querySelectorAll('.codex-tab').forEach(t => {
    const f = t.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    t.classList.toggle('active', f === filter);
  });
  _renderCodex();
}

function _renderCodex() {
  const list = document.getElementById('codexList');
  const summary = document.getElementById('codexSummary');
  if (!list) return;

  const reached = (window.__saveData && window.__saveData.currentPart)
    ? window.__saveData.currentPart : (typeof currentPart !== 'undefined' ? currentPart : 1);

  const FILTER_META = {
    all:      { label:'Archive View', title:'All Records',       note:'Every unlocked trace, faction mark, and hostile dossier stored by camp.' },
    enemy:    { label:'Hostile Index', title:'Enemy Records',    note:'Observed combatants, scouts, and hostile operatives encountered in the field.' },
    boss:     { label:'Threat Ledger', title:'Boss Dossiers',    note:'Named threats, field users, and high-priority enemies worth tracking.' },
    faction:  { label:'Faction Registry', title:'Faction Marks', note:'Known banners, movements, and groups shaping the war around camp.' },
    defeated: { label:'Victory Register', title:'Defeated Targets', note:'Entries marked as overcome. The archive remembers every fall.' }
  };

  // Only show entries whose introPartRef ≤ reached (story gate)
  let records = CODEX_RECORDS
    .filter(r => r.introPartRef <= reached)
    .map(r => ({ ...r, codexStatus: _codexStatus(r.id) }));

  if (_codexFilter !== 'all') {
    if (_codexFilter === 'defeated') {
      records = records.filter(r => r.codexStatus === 'defeated');
    } else {
      records = records.filter(r => r.cat === _codexFilter);
    }
  }

  const meta = FILTER_META[_codexFilter] || FILTER_META.all;
  if (summary) {
    summary.innerHTML = `<div class="codex-summary-copy">
        <div class="codex-summary-label">${meta.label}</div>
        <div class="codex-summary-title">${meta.title}</div>
      </div>
      <div class="codex-summary-count"><strong>${records.length}</strong><span>Entries</span></div>`;
  }

  if (!records.length) {
    list.innerHTML = `<div class="codex-empty">
      <div class="codex-empty-panel">
        <div class="codex-empty-icon">⌘</div>
        <div class="codex-empty-title">ARCHIVE SEALED</div>
        <div class="codex-empty-copy">${meta.note}</div>
        <div class="codex-empty-hint">Defeat enemies, meet factions, and advance through parts to unlock more records.</div>
      </div>
    </div>`;
    return;
  }

  const STATUS_LABELS = { unknown:'SEALED', encountered:'RECORDED', defeated:'DEFEATED', active:'ACTIVE THREAT' };
  const BADGE_CLASS   = { unknown:'cx-badge-unknown', encountered:'cx-badge-encountered', defeated:'cx-badge-defeated', active:'cx-badge-active' };

  list.innerHTML = records.map(r => {
    const isUnknown = r.codexStatus === 'unknown';
    const name = isUnknown ? 'SEALED ENTRY' : r.name;
    const faction = isUnknown ? 'UNKNOWN FACTION' : (r.faction || 'UNKNOWN');
    const typeLabel = r.cat === 'boss' ? 'BOSS DOSSIER' : r.cat === 'enemy' ? 'ENEMY RECORD' : 'FACTION DOSSIER';
    const title = isUnknown ? 'No readable combat notes recovered yet.' : (r.title || 'No dossier heading');
    const desc = isUnknown ? 'Further progress is required before this record can be properly read.' : (r.desc || r.title || '');
    const silhouettes = { boss:'♞', enemy:'⟡', faction:'☗' };
    return `<div class="cx-card" data-codex="${r.codexStatus}">
      <div class="cx-portrait">
        <div class="cx-sigil">${isUnknown ? '◆' : (r.icon || '◆')}</div>
        <div class="cx-silhouette">${silhouettes[r.cat] || '⟡'}</div>
      </div>
      <div class="cx-info">
        <div class="cx-head">
          <div class="cx-namewrap">
            <div class="cx-name">${name}</div>
            <div class="cx-tagline">${title}</div>
          </div>
          <div class="cx-badge ${BADGE_CLASS[r.codexStatus]||'cx-badge-unknown'}">${STATUS_LABELS[r.codexStatus]||'SEALED'}</div>
        </div>
        <div class="cx-metadata">
          <div class="cx-chip">${typeLabel}</div>
          <div class="cx-chip">${faction}</div>
          <div class="cx-chip">PART ${r.introPartRef}</div>
        </div>
        <div class="cx-desc">${desc}</div>
      </div>
    </div>`;
  }).join('');
}

window.CODEX_RECORDS         = CODEX_RECORDS;
window.setCodexStatus        = setCodexStatus;
window.markCodexEncountered  = markCodexEncountered;
window.markCodexDefeated     = markCodexDefeated;
window.markCodexActive       = markCodexActive;
window.getCodexRecord        = getCodexRecord;
window.autoUpdateCodexForPart= autoUpdateCodexForPart;
window.openCodex             = openCodex;
window.closeCodex            = closeCodex;
window.setCodexFilter        = setCodexFilter;

// ════════════════════════════════════════════════════════════════
//  D. TRUST / MEMORY / BETRAYAL SYSTEM
// ════════════════════════════════════════════════════════════════
// Trust:   0–100. Affects support bonus availability and dialogue.
// Memory:  0–100. How much a recovered ally remembers Chug.
// Betrayal: flag.  Set when a character turns against the team.
//
// All values stored in __saveData.trustLevels / memoryLevels.
// Roster status is updated automatically when thresholds are crossed.

const TRUST_THRESHOLDS = {
  support_available: 40,   // must have this trust to appear as support
  full_ally:         70,   // full stat bonuses active
  narrative_unlock:  90,   // story dialogue branches (future use)
};

const MEMORY_THRESHOLDS = {
  recognises:     30,   // ally recognises Chug
  reliable:       60,   // reliable in field
  full_recall:   100,   // complete memory restored
};

// ── Raw save accessors ────────────────────────────────────────

function _trustStore() {
  if (!window.__saveData) return {};
  if (!window.__saveData.trustLevels) window.__saveData.trustLevels = {};
  return window.__saveData.trustLevels;
}

function _memoryStore() {
  if (!window.__saveData) return {};
  if (!window.__saveData.memoryLevels) window.__saveData.memoryLevels = {};
  return window.__saveData.memoryLevels;
}

// ── Getters ───────────────────────────────────────────────────

function getTrust(charId) {
  const stored = _trustStore()[charId];
  if (stored !== undefined) return stored;
  // Fall back to ROSTER_DATA initial value
  const rec = typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA.find(r => r.id === charId) : null;
  return rec ? (rec.trust || 0) : 0;
}

function getMemory(charId) {
  const stored = _memoryStore()[charId];
  if (stored !== undefined) return stored;
  const rec = typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA.find(r => r.id === charId) : null;
  return rec ? (rec.memory || 0) : 0;
}

// ── Setters ───────────────────────────────────────────────────

function setTrust(charId, value) {
  const clamped = Math.max(0, Math.min(100, value));
  _trustStore()[charId] = clamped;
  _applyTrustEffects(charId, clamped);
  if (typeof saveGame === 'function') saveGame();
}

function adjustTrust(charId, delta) {
  setTrust(charId, getTrust(charId) + delta);
}

function setMemory(charId, value) {
  const clamped = Math.max(0, Math.min(100, value));
  _memoryStore()[charId] = clamped;
  _applyMemoryEffects(charId, clamped);
  if (typeof saveGame === 'function') saveGame();
}

function adjustMemory(charId, delta) {
  setMemory(charId, getMemory(charId) + delta);
}

// ── Betrayal ──────────────────────────────────────────────────

function isBetrayed(charId) {
  const s = window.__saveData;
  return !!(s && s.betrayedCharacters && s.betrayedCharacters.includes(charId));
}

function betrayCharacter(charId) {
  if (!window.__saveData) return;
  if (!window.__saveData.betrayedCharacters) window.__saveData.betrayedCharacters = [];
  if (!window.__saveData.betrayedCharacters.includes(charId))
    window.__saveData.betrayedCharacters.push(charId);
  // Force roster state
  if (typeof setCharacterState === 'function') setCharacterState(charId, 'betrayed');
  // Zero trust
  setTrust(charId, 0);
  if (typeof saveGame === 'function') saveGame();
}

function restoreBetrayedCharacter(charId) {
  if (!window.__saveData || !window.__saveData.betrayedCharacters) return;
  window.__saveData.betrayedCharacters = window.__saveData.betrayedCharacters.filter(id => id !== charId);
  if (typeof setCharacterState === 'function') setCharacterState(charId, 'recovering');
  if (typeof saveGame === 'function') saveGame();
}

// ── Trust/memory effects ──────────────────────────────────────
// Automatically update roster availability when values change.

function _applyTrustEffects(charId, trust) {
  if (isBetrayed(charId)) return; // betrayal overrides trust
  const state = typeof getCharacterState === 'function' ? getCharacterState(charId) : null;
  if (!state) return;
  // Below support threshold — mark as support-restricted (no change to roster state itself)
  // Above threshold — no automatic unlock (unlocks happen via story missions)
  // Narrative branches at 90+ are [PLACEHOLDER] for dialogue system
  if (trust >= TRUST_THRESHOLDS.full_ally && state === 'rescued') {
    // Auto-promote rescued → recovering if trust earned quickly
    if (typeof markCharacterRecovering === 'function') markCharacterRecovering(charId);
  }
}

function _applyMemoryEffects(charId, memory) {
  const state = typeof getCharacterState === 'function' ? getCharacterState(charId) : null;
  if (!state) return;
  // Full recall = promote recovering → playable [PLACEHOLDER — story gates this]
  // Just record for future narrative use
}

// ── Batch initialise from ROSTER_DATA defaults ───────────────
// Call once after loadGame() to seed trust/memory from base records.
function initTrustMemoryFromRoster() {
  if (typeof ROSTER_DATA === 'undefined') return;
  ROSTER_DATA.forEach(r => {
    if (_trustStore()[r.id] === undefined)  _trustStore()[r.id]  = r.trust  || 0;
    if (_memoryStore()[r.id] === undefined) _memoryStore()[r.id] = r.memory || 0;
  });
}

// Patch loadGame to seed trust/memory on every load
function _patchLoadGameForTrust() {
  const _orig = typeof loadGame === 'function' ? loadGame : null;
  if (!_orig || _orig.__trustPatched) return;
  window.loadGame = function() {
    _orig.call(this);
    initTrustMemoryFromRoster();
    rangedWeapon = getRangedWeapon(); // sync rangedWeapon var
    // seed codexProgress for already-reached parts
    autoUpdateCodexForPart(typeof currentPart !== 'undefined' ? currentPart : 1);
  };
  window.loadGame.__trustPatched = true;
}

// ── Convenience summary for a character ──────────────────────
function getCharacterRelationship(charId) {
  return {
    charId,
    trust:    getTrust(charId),
    memory:   getMemory(charId),
    betrayed: isBetrayed(charId),
    trustLabel:  getTrust(charId)  >= TRUST_THRESHOLDS.full_ally       ? 'FULL ALLY'   :
                 getTrust(charId)  >= TRUST_THRESHOLDS.support_available? 'TRUSTED'      : 'DISTANT',
    memoryLabel: getMemory(charId) >= MEMORY_THRESHOLDS.full_recall     ? 'FULL RECALL'  :
                 getMemory(charId) >= MEMORY_THRESHOLDS.reliable        ? 'RELIABLE'     :
                 getMemory(charId) >= MEMORY_THRESHOLDS.recognises      ? 'RECOGNISES'   : 'FORGOTTEN',
  };
}

window.TRUST_THRESHOLDS        = TRUST_THRESHOLDS;
window.MEMORY_THRESHOLDS       = MEMORY_THRESHOLDS;
window.getTrust                = getTrust;
window.getMemory               = getMemory;
window.setTrust                = setTrust;
window.adjustTrust             = adjustTrust;
window.setMemory               = setMemory;
window.adjustMemory            = adjustMemory;
window.isBetrayed              = isBetrayed;
window.betrayCharacter         = betrayCharacter;
window.restoreBetrayedCharacter= restoreBetrayedCharacter;
window.getCharacterRelationship= getCharacterRelationship;
window.initTrustMemoryFromRoster = initTrustMemoryFromRoster;

// ─────────────────────────────────────────────────────────────────────────────

// ── UI REFS ──
window.UI=window.UI||{}; const UI=window.UI={
  menu:document.getElementById('menu-screen'),
  shop:document.getElementById('shop-screen'),
  story:document.getElementById('story-screen'),
  hud:document.getElementById('hud-screen'),
  ctrls:document.getElementById('controls'),
  kbhint:document.getElementById('kbhint'),
  gCoins:document.getElementById('global-coins') || document.getElementById('sf2-compat-values') || window.__sf2NullElement,
  btnMenu:document.getElementById('btn-ingame-menu'),
  cVal:document.getElementById('coin-val') || document.getElementById('sf2-coins'),
  dbox:document.getElementById('dbox'),
  dtxt:document.getElementById('dtxt'),
  dname:document.getElementById('dname'),
  dava:document.getElementById('dava'),
  php:document.getElementById('p-hp'),
  ehp:document.getElementById('e-hp'),
  prage:document.getElementById('p-rage'),
  pstam:document.getElementById('p-stam') || window.__sf2NullElement,
  ename:document.getElementById('e-name'),
  timer:document.getElementById('timer'),
  roundLbl:document.getElementById('round-label'),
  rlbl:document.getElementById('rage-text'),
  slbl:document.getElementById('stam-text') || window.__sf2NullElement,
  btnRage:document.getElementById('btn-rage'),
  bg:document.getElementById('bg-layer'),
  moon:document.getElementById('moon'),
  ro:document.getElementById('rage-overlay'),
  banner:document.getElementById('banner'),
  flash:document.getElementById('flash')
};

// ── INPUT ──
window.K={l:0,r:0,j:0,a:0,k:0,g:0,t:0,range:0,rage:0}; const K=window.K;
// Enhance keyboard accessibility for story progression.
// In addition to the Space bar, allow the Enter key to advance story dialogue.
// This makes it more intuitive for users on desktop keyboards.
window.addEventListener('keydown',e=>{
  // Support keyboard accessibility for role="button" elements
  if(e.code==='Space' || e.key==='Enter'){
    const active = document.activeElement;
    if(active && active.getAttribute('role') === 'button'){
      e.preventDefault();
      active.click();
      return;
    }
  }

  // Advance dialogue when the Space bar or Enter key is pressed during story scenes
  if((e.code==='Space' || e.key==='Enter') && gameState==='story'){
    e.preventDefault();
    advance();
    return;
  }
  if(e.key==='a'||e.key==='ArrowLeft')K.l=1;
  if(e.key==='d'||e.key==='ArrowRight')K.r=1;
  if(e.key==='w'||e.key==='ArrowUp')K.j=1;
  if(e.key==='f')K.a=1;
  if(e.key==='k')K.k=1;
  if(e.key==='g'||e.key==='G')K.g=1;
  if(e.key==='t'||e.key==='T')K.t=1;
  if(e.key==='h'||e.key==='H')K.range=1;
  if(e.key==='r'||e.key==='R')K.rage=1;
});
window.addEventListener('keyup',e=>{
  if(e.key==='a'||e.key==='ArrowLeft')K.l=0;
  if(e.key==='d'||e.key==='ArrowRight')K.r=0;


/* ─── js/save.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   SAVE / LOAD SYSTEM
   localStorage key: chug_shadow_v3_save
   Change SAVE_KEY if you need to wipe all player saves.
════════════════════════════════════════════════ */

if(e.key==='w'||e.key==='ArrowUp')K.j=0;
  if(e.key==='f')K.a=0;
  if(e.key==='k')K.k=0;
  if(e.key==='g'||e.key==='G')K.g=0;
  if(e.key==='t'||e.key==='T')K.t=0;
  if(e.key==='h'||e.key==='H')K.range=0;
  if(e.key==='r'||e.key==='R')K.rage=0;
});
function bindBtn(id,key){
  const el=document.getElementById(id);
  if(!el)return;
  const dn=e=>{e.preventDefault();K[key]=1;el.classList.add('pressed');};
  const up=e=>{e.preventDefault();K[key]=0;el.classList.remove('pressed');};
  ['touchstart','pointerdown','mousedown'].forEach(ev=>el.addEventListener(ev,dn,{passive:false}));
  ['touchend','touchcancel','pointerup','pointerleave','mouseup','mouseleave'].forEach(ev=>el.addEventListener(ev,up,{passive:false}));
}
bindBtn('btn-l','l');bindBtn('btn-r','r');bindBtn('btn-j','j');bindBtn('btn-p','a');bindBtn('btn-k','k');bindBtn('btn-g','g');bindBtn('btn-t','t');bindBtn('btn-range','range');bindBtn('btn-rage','rage');bindBtn('btn-u','u');bindBtn('btn-f','f');
if(UI.dbox) UI.dbox.addEventListener('pointerdown',()=>advance());

// ── VISUAL FX ──
function doFlash(){/* white flash effect removed */}

function showCombo(count){
  if(!settingsComboDsp)return;
  const el=document.getElementById('combo-display');
  const countEl=document.getElementById('combo-count');
  const labelEl=document.getElementById('combo-label');
  if(!el||!countEl)return;
  if(gameState!=='fight')return;
  clearTimeout(window._comboTimeout);
  el.style.display='block';
  // Color based on combo size
  let col='#fff',glow='rgba(255,255,255,0.6)',label='HIT';
  if(count>=3){col='#f5c842';glow='rgba(245,200,66,0.8)';label='COMBO';}
  if(count>=6){col='#ff8800';glow='rgba(255,136,0,0.9)';label='CHAIN';}
  if(count>=10){col='#ff2244';glow='rgba(255,34,68,1)';label='SAVAGE';}
  if(count>=15){col='#cc44ff';glow='rgba(200,68,255,1)';label='UNSTOPPABLE';}
  countEl.innerText=count>=2?`${count}×`:'';
  countEl.style.color=col;
  countEl.style.textShadow=`0 0 20px ${glow},0 4px 12px #000`;
  countEl.style.transform='scale(1.3)';
  labelEl.innerText=count>=2?label:'';
  labelEl.style.color=col;
  setTimeout(()=>{countEl.style.transform='scale(1)';},100);
  window._comboTimeout=setTimeout(()=>{el.style.display='none';comboCount=0;},2200);
}
function showBanner(txt,cb,dur=1500){
  UI.banner.innerText=txt;
  UI.banner.style.color=txt.includes('DEFEAT')||txt.includes('LOSE')?varRed():'#fff';
  UI.banner.style.opacity=1;UI.banner.style.transform='scale(1)';
  setTimeout(()=>{


/* ─── js/ui_refs.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   UI REFS — DOM element references
   Add new DOM refs here if adding new screens.
════════════════════════════════════════════════ */

UI.banner.style.opacity=0;UI.banner.style.transform='scale(0.75)';
    if(cb)setTimeout(cb,300);
  },dur);
}
function setEnvRage(on){
  envRage=on;
  document.body.classList.toggle('rage-special', !!on);
  UI.moon.className='moon'+(on?' rage':'');
  UI.ro.style.opacity=on?'1':'0';
  UI.bg.style.background=on
    ? 'radial-gradient(ellipse at 50% 110%, #1b0f46 0%, #090b25 44%, #020208 100%)'
    : 'radial-gradient(ellipse at 50% 110%,#1a0a00 0%,#000 70%)';
}

function fireAt(x,y,vx){
  const cols = envRage
    ? ['#67ecff','#84a8ff','#9b6bff','#ca7bff','#d9fbff']
    : ['#ff0000','#ff2200','#ff5500','#ff8800','#ffaa00'];
  particles.push({x:x+Math.random()*50,y:y-Math.random()*110,
    vx:vx*0.3+(Math.random()-.5)*2,vy:-(Math.random()*5+1.5),
    life:.9+Math.random()*.3,col:cols[Math.floor(Math.random()*cols.length)],w:Math.random()*12+3,tp:'f'});
}
function bloodSplatter(x,y,fd,heavy){
  let count=heavy?40:16;
  for(let i=0;i<count;i++){
    particles.push({x:x+(Math.random()-.5)*20,y:y-50+(Math.random()-.5)*30,
      vx:fd*(Math.random()*6+2)+(Math.random()-.5)*3,vy:-Math.random()*7-2,
      life:1.4+Math.random(),col:'#880000',w:Math.random()*5+2,tp:'b'});
  }
}
function shadowSlash(x,y,dir,col='#ffffff',heavy=false){
  for(let i=0;i<14;i++){
    const ang=(Math.random()-.5)*1.0;
    particles.push({x,y:y-60,vx:Math.cos(ang)*dir*(10+Math.random()*8),vy:Math.sin(ang)*(5+Math.random()*4)-4,
      life:0.7+Math.random()*0.4,col,w:Math.random()*24+10,tp:'s'});
  }
  for(let i=0;i<6;i++){
    const ang2=-Math.PI*0.5+Math.random()*Math.PI*0.6*dir;
    particles.push({x:x+Math.cos(ang2)*24,y:y-60+Math.sin(ang2)*24,
      vx:Math.cos(ang2)*dir*(4+Math.random()*3),vy:Math.sin(ang2)*2-5,
      life:0.4+Math.random()*0.3,col,w:Math.random()*14+6,tp:'s'});
  }
}


/* ─── js/input.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   INPUT BINDINGS — keyboard + button events
   Edit key bindings here. Buttons are bound via bindBtn().
════════════════════════════════════════════════ */

function weaponImpactFX(x,y,dir,weapType,heavy){
  const T=Date.now();
  if(weapType==='katana'||weapType==='dagger'){
    // Blade slash streaks
    for(let i=0;i<10;i++){
      const ang=(Math.random()-.5)*0.6;
      particles.push({x,y:y-50,vx:Math.cos(ang)*dir*(12+Math.random()*10),vy:Math.sin(ang)*(3+Math.random()*3)-5,
        life:0.5+Math.random()*0.3,col:'rgba(255,255,220,0.9)',w:Math.random()*18+8,tp:'s'});
    }
  } else if(weapType==='scythe'){
    for(let i=0;i<16;i++){
      const ang=(-Math.PI*0.5+Math.random()*Math.PI*0.8)*dir;
      particles.push({x:x+Math.cos(ang)*30,y:y-60+Math.sin(ang)*30,
        vx:Math.cos(ang)*dir*(6+Math.random()*4),vy:Math.sin(ang)*3-6,
        life:0.6+Math.random()*0.4,col:'rgba(170,120,255,0.9)',w:Math.random()*22+12,tp:'s'});
    }
  } else if(weapType==='chain'){
    for(let i=0;i<8;i++){
      particles.push({x,y:y-40,vx:dir*(8+Math.random()*8)+(Math.random()-.5)*5,vy:-Math.random()*6-2,
        life:0.4+Math.random()*0.3,col:'rgba(200,200,255,0.8)',w:Math.random()*12+6,tp:'s'});
    }
  } else if(weapType==='hammer'){
    // Rock shards and shockwave dust
    for(let i=0;i<20;i++){
      particles.push({x:x+(Math.random()-.5)*30,y:y-10,
        vx:(Math.random()-.5)*16,vy:-Math.random()*12-3,
        life:1.2+Math.random()*0.5,col:'rgba(140,120,90,0.9)',w:Math.random()*8+4,tp:'b'});
    }
    for(let i=0;i<12;i++){
      particles.push({x,y:y-40,vx:dir*(10+Math.random()*12),vy:-Math.random()*4,
        life:0.3+Math.random()*0.2,col:'rgba(255,160,0,0.8)',w:Math.random()*10+5,tp:'s'});
    }
  } else if(weapType==='lynx_claws'){
    for(let ci=-1;ci<=1;ci++){
      for(let i=0;i<4;i++) particles.push({x:x+ci*12,y:y-60+Math.random()*20,vx:dir*(7+Math.random()*5),vy:-Math.random()*5-2,life:0.35+Math.random()*0.25,col:'rgba(230,230,255,0.85)',w:4+Math.random()*6,tp:'s'});
    }
  } else if(weapType==='blood_reaper'){
    for(let i=0;i<16;i++) particles.push({x:x+Math.cos(i)*4,y:y-55+Math.sin(i)*4,vx:(Math.random()-.5)*6,vy:-Math.random()*5-1,life:0.55+Math.random()*0.3,col:'rgba(209,27,61,0.88)',w:Math.random()*14+8,tp:'s'});
  } else if(weapType==='composite_sword'){
    for(let i=0;i<10;i++) particles.push({x,y:y-46,vx:dir*(9+Math.random()*8),vy:-Math.random()*5-2,life:0.45+Math.random()*0.3,col:'rgba(255,210,120,0.85)',w:Math.random()*14+8,tp:'s'});
    for(let i=0;i<8;i++) particles.push({x:x+(Math.random()-.5)*18,y:y-54,vx:(Math.random()-.5)*5,vy:-Math.random()*5-1,life:0.48+Math.random()*0.25,col:'rgba(209,27,61,0.7)',w:Math.random()*10+5,tp:'b'});
  } else if(weapType==='ak47'){
    for(let i=0;i<8;i++) particles.push({x,y:y-44,vx:dir*(12+Math.random()*10),vy:(Math.random()-.5)*2,life:0.25+Math.random()*0.15,col:'rgba(255,214,90,0.95)',w:Math.random()*8+4,tp:'s'});
  } else if(weapType==='claws'){
    // Dual claw scratch marks
    for(let ci=-1;ci<=1;ci++){
      for(let i=0;i<4;i++){
        particles.push({x:x+ci*12,y:y-60+Math.random()*20,vx:dir*(6+Math.random()*4),vy:-Math.random()*5-2,
          life:0.35+Math.random()*0.25,col:'rgba(200,200,255,0.8)',w:4+Math.random()*6,tp:'s'});
      }


/* ─── js/vfx.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   VISUAL FX
   Particles, blood splatter, slash effects, weapon impacts.
   All purely visual — safe to edit without breaking gameplay.
════════════════════════════════════════════════ */

}
  } else if(weapType==='staff'||weapType==='knuckle'){
    // Concussion burst
    for(let i=0;i<12;i++){
      const ang2=Math.random()*Math.PI*2;
      particles.push({x,y:y-50,vx:Math.cos(ang2)*dir*(8+Math.random()*6),vy:Math.sin(ang2)*4-5,
        life:0.4+Math.random()*0.3,col:weapType==='staff'?'rgba(200,147,26,0.9)':'rgba(255,180,50,0.8)',w:Math.random()*16+8,tp:'s'});
    }
  }
}

function triggerBoomFX(x, y){
  for(let i=0;i<14;i++){
    particles.push({x,y:y-40,vx:(Math.random()-.5)*18,vy:-Math.random()*10-2,life:0.45+Math.random()*0.25,col:'rgba(255,150,40,0.9)',w:Math.random()*18+8,tp:'s'});
  }
}
function applyBloodDrain(playerObj, damage, ratio=0.2){
  if(!playerObj) return;
  const heal = Math.max(1, Math.floor(damage * ratio));
  playerObj.hp = Math.min(playerObj.maxHp || playerObj.hp, playerObj.hp + heal);
}
function triggerBloodDrainFX(x,y){
  floatingTexts.push({x,y:y-90,t:'+HP',life:0.8,vy:-2.2,col:'#d11b3d',size:16});
  for(let i=0;i<8;i++){
    particles.push({x:x+(Math.random()-.5)*16,y:y-60+Math.random()*18,vx:(Math.random()-.5)*4,vy:-Math.random()*5-1,life:0.55+Math.random()*0.2,col:'rgba(209,27,61,0.85)',w:Math.random()*8+4,tp:'b'});
  }
}
window.__akBullets = window.__akBullets || [];
function spawnAkBullet(owner, x, y, dir=1, dmg=14, spread=0, speed=28){
  window.__akBullets.push({
    owner, x, y, dir,
    vx: speed * dir,
    vy: spread,
    speed, life: 24, dmg,
    trail: [],
    hitOnce: false
  });
}
function updateAkBullets(player, enemy){
  const arr = window.__akBullets || [];
  for(let i=arr.length-1;i>=0;i--){
    const b = arr[i];
    b.trail.push({x:b.x,y:b.y});
    if(b.trail.length>5) b.trail.shift();

    b.x += b.vx;
    b.y += b.vy;
    b.life--;

    const target = b.owner==='player' ? enemy : player;
    if(target && !b.hitOnce){
      const tx = target.x + target.w/2;
      const ty = target.y - target.h*0.58;
      const hitX = Math.abs(b.x - tx) < (target.w*0.62);
      const hitY = Math.abs(b.y - ty) < (target.h*0.42);
      if(hitX && hitY){
        b.hitOnce = true;
        const heavy = b.dmg >= 18;
        target.takeHit(b.dmg, b.dir, heavy);
        for(let p=0;p<6;p++){
          particles.push({
            x:b.x, y:b.y,
            vx:b.dir*(Math.random()*4+2)+(Math.random()-.5)*2,
            vy:(Math.random()-.5)*3,
            life:0.18+Math.random()*0.12,
            col:'rgba(255,214,90,0.92)',
            w:Math.random()*8+4, tp:'s'
          });
        }
        floatingTexts.push({
          x:b.x, y:b.y-18, t:'BULLET',
          life:0.35, vy:-1.1, col:'#ffd65a', size:10
        });
        arr.splice(i,1);
        continue;
      }
    }

    if(b.life<=0 || b.x < -120 || b.x > W+120 || b.y < -60 || b.y > H+60){
      arr.splice(i,1);
    }
  }
}
function drawAkBullets(c){
  const arr = window.__akBullets || [];
  c.save();
  for(const b of arr){
    // tracer trail
    for(let i=0;i<b.trail.length;i++){
      const t=b.trail[i];
      const a=(i+1)/b.trail.length;
      c.strokeStyle=`rgba(255,214,90,${0.08 + a*0.18})`;
      c.lineWidth=1.5 + a*1.2;
      c.beginPath();
      c.moveTo(t.x - b.dir*(6+a*8), t.y);
      c.lineTo(t.x, t.y);
      c.stroke();
    }
    // bullet core
    c.fillStyle = '#ffd65a';
    c.beginPath();
    c.arc(b.x, b.y, 3.0, 0, Math.PI*2);
    c.fill();
    c.fillStyle = 'rgba(255,245,200,0.95)';
    c.beginPath();
    c.arc(b.x+1.2*b.dir, b.y, 1.2, 0, Math.PI*2);
    c.fill();
  }
  c.restore();
}
function onWeaponExpansionHit(weaponUsed, playerObj, damage, screenX, screenY, combo){
  if(weaponUsed==='lynx_claws' && combo===4){
    floatingTexts.push({x:screenX,y:screenY-96,t:'TIME BOMB',life:0.7,vy:-1.5,col:'#ffd36a',size:14});
    setTimeout(()=>triggerBoomFX(screenX, screenY), 520);
  }
  if(weaponUsed==='blood_reaper'){
    applyBloodDrain(playerObj, damage, combo===4 ? 0.25 : 0.14);
    triggerBloodDrainFX(screenX, screenY);
  }
  if(weaponUsed==='composite_sword' && combo===4){
    triggerBoomFX(screenX, screenY);
    applyBloodDrain(playerObj, damage, 0.16);
    triggerBloodDrainFX(screenX, screenY);
  }
  if(weaponUsed==='ak47'){
    triggerBoomFX(screenX, screenY);
  }
}

// ── FIGHTER ──
class Fighter{
  constructor(x,isP,type=1){
    this.scale=isP?1.6:1.6;
    if(type===2)this.scale=1.65;
    if(type===3)this.scale=1.9;
    if(type===4)this.scale=1.55;
    if(type===5)this.scale=1.7;
    if(type===6)this.scale=1.75;
    if(type===7)this.scale=1.5;
    if(type===8)this.scale=1.8;
    if(type===9)this.scale=1.6;
    if(type===10)this.scale=1.85; // BURDEN - heavy
    if(type===11)this.scale=1.6; // CONTROLLED - erratic
    if(type===12)this.scale=1.65; // EVOLVED SHADOW
    if(type===13)this.scale=2.0; // SYNC WAVE boss — imposing
    if(type===14)this.scale=1.75; // REWRITE PROTOCOL — refined, overdrive
    if(type===15)this.scale=1.7;  // MEMORY ERASURE — flicker-fast, unstable
    if(type===16)this.scale=1.55; // INTERFERENCE WAVE — swarm, fast small
    if(type===17)this.scale=1.65; // PRESSURE WAVE — relentless elite
    if(type===18)this.scale=1.8;  // THE DELAY — sub boss, mirror of Chug
    if(type===19)this.scale=1.7;  // FINAL INTERFERENCE — max chaos boss
    if(type===20)this.scale=1.85;
    if(type===21)this.scale=2.2;  // AROWH — massive // FINAL HOST — ultimate boss
    this.baseW=40;this.baseH=100;
    this.x=x;this.y=GND;this.w=this.baseW*this.scale;this.h=this.baseH*this.scale;
    this.isP=isP;this.type=type;

    let mhp=100,sp=5.5,dm=8;
    if(type===2){mhp=120;sp=7.5;dm=12;}
    if(type===3){mhp=180;sp=5.5;dm=16;}
    if(type===4){mhp=110;sp=8.5;dm=10;}
    if(type===5){mhp=140;sp=6.5;dm=14;}
    if(type===6){mhp=200;sp=7.5;dm=15;}
    if(type===7){mhp=140;sp=9.5;dm=11;}
    if(type===8){mhp=200;sp=7.5;dm=17;}
    if(type===9){mhp=230;sp=8.5;dm=15;}
    if(type===10){mhp=260;sp=4.5;dm=22;} // Burden — slow+heavy
    if(type===11){mhp=200;sp=11;dm=14;} // Controlled — erratic fast+glitchy
    if(type===12){mhp=175;sp=10;dm=13;} // Evolved Shadow — precise, coordinated
    if(type===13){mhp=290;sp=9;dm=20;} // Sync Wave — elite final wave, Part 6 boss
    if(type===14){mhp=320;sp=12;dm=18;} // Rewrite Protocol — fastest+hardest, Part 7 boss
    if(type===15){mhp=280;sp=13;dm=16;} // Memory Erasure — erratic, glitch-teleport, Part 8
    if(type===16){mhp=160;sp=12;dm=13;} // Interference Wave — fast swarm fighter
    if(type===17){mhp=220;sp=11;dm=17;} // Pressure Wave — relentless elite
    if(type===18){mhp=340;sp=13;dm=19;} // The Delay — sub boss, mirrors Chug
    if(type===19){mhp=300;sp=14;dm=17;} // Final Interference — max chaos, Part 9 final
    if(type===20){mhp=420;sp=15;dm=22;} // Final Host — ultimate boss, Part 10
    if(type===21){mhp=9999;sp=7;dm=35;} // AROWH — unkillable Drako No.12

    // Enemy weapons by type
    const ENEMY_WEAPONS={
      1:'none',2:'knuckle',3:'katana',4:'dagger',5:'knuckle',
      6:'katana',7:'dagger',8:'staff',9:'katana',10:'hammer',
      11:'dagger',12:'katana',13:'staff',14:'katana',15:'scythe',
      16:'dagger',17:'knuckle',18:'katana',19:'scythe',20:'hammer',
      21:'hammer'
    };
    this.eWeapon = isP ? null : (ENEMY_WEAPONS[type]||'none');

    if(isP){
      mhp=150;sp=7.5;dm=10;
      // Weapons
      if(weapon==='knuckle'){dm+=6;}
      if(weapon==='dagger'){dm+=8;sp+=2;}
      if(weapon==='sai'){dm+=9;sp+=2.5;}
      if(weapon==='woodstick'){dm+=12;sp+=1.8;}
      if(weapon==='nunchaku'){dm+=14;sp+=2.3;}
      if(weapon==='katana'){dm+=20;sp+=1.4;}
      if(weapon==='staff'){dm+=18;sp+=1.2;}
      
      if(weapon==='scythe'){dm+=18;sp-=0.8;}
      if(weapon==='knives'){dm+=15;sp+=2.2;}
      if(weapon==='claws'){dm+=8;sp+=3;}
      if(weapon==='hammer'){dm+=28;sp-=0.6;}
      if(weapon==='lynx_claws'){dm+=14;sp+=2.8;}
      if(weapon==='blood_reaper'){dm+=19;sp-=0.4;}
      if(weapon==='composite_sword'){dm+=22;sp+=0.2;}
      if(weapon==='ak47'){dm+=24;sp-=0.2;}
      
      // Armor
      if(armor==='lightarmor'){mhp+=25;}
      if(armor==='heavyarmor'){mhp+=50;sp-=0.8;}
      if(armor==='voidarmor'){mhp+=70;sp-=0.5;}
      // Upgrades
      dm+=strengthUpg===1?5:(strengthUpg>=2?15:0);
      sp+=speedUpg===1?2:(speedUpg>=2?4:0);
      mhp+=enduranceUpg===1?30:(enduranceUpg>=2?70:0);
    }
    this.maxHp=mhp;this.hp=mhp;this.spd=sp;this.dmg=dm;
    this.defense=isP?(armor==='lightarmor'?3:armor==='heavyarmor'?6:armor==='voidarmor'?9:0):0;
    this.absorption=isP&&armor==='voidarmor'?0.1:0;
    this.rageTier=isP&&rageMode2?2:1;
    this.enduranceRegen=isP&&enduranceUpg>=1;
    this.vx=0;this.vy=0;this.dir=isP?1:-1;
    this.state='idle';this.atkT=0;this.hitT=0;
    this.rage=0;this.rageActive=false;
    this.stamina=100;this.maxStam=100;
    this.combo=0;this.cWin=0;this.atkType='p';this.hitF=0;
    this.rotation=0;this.landAnim=0;
    this.grabber=null;
    this.grabHits=0; // tracks how many times grabbed in current grab_exec
    // shadow effect vars
    this.trailX=[];this.trailY=[];
  }
  get raging(){return this.isP&&this.rageActive;}

  update(en){
    const wasAir=this.y<GND-0.5;

    // Trail
    if(this.isP&&((this.raging&&(this.state==='run'||this.state==='atk'))||this.state==='run')){
      if(!this.raging || ((this.__shadowTick||0) % 3) === 0){
        this.trailX.unshift(this.x+this.w/2);
        this.trailY.unshift(this.y-this.h/2);
      }
      if(this.trailX.length>3){this.trailX.pop();this.trailY.pop();}
    } else {this.trailX=[];this.trailY=[];}

    // Weapon swing trail during attack
    if(this.isP&&this.state==='atk'&&weapon!=='none'){
      const wx=this.x+this.w/2+(this.dir===1?this.w*0.5:-this.w*0.3);
      const wy=this.y-this.h*0.55;
      const swingCol={knuckle:'rgba(255,180,50,0.5)',dagger:'rgba(100,200,255,0.4)',
        katana:'rgba(255,255,200,0.6)',staff:'rgba(200,147,26,0.4)',
        scythe:'rgba(150,100,255,0.5)',
        claws:'rgba(180,180,255,0.45)',hammer:'rgba(255,120,0,0.4)'}[weapon]||'rgba(255,255,255,0.3)';
      if(Math.random()>0.4){
        particles.push({x:wx+(Math.random()-.5)*20,y:wy+(Math.random()-.5)*30,
          vx:this.dir*(Math.random()*4+1),vy:-Math.random()*3,


/* ─── js/fighter.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   FIGHTER CLASS — ⚠ CORE GAMEPLAY
   All fighter logic: movement, attacks, AI, draw.
   Stats per enemy type are set in the constructor.
════════════════════════════════════════════════ */

life:0.5+Math.random()*0.3,col:swingCol,w:Math.random()*16+8,tp:'s'});
      }
    }

    if(this.isP){
      if(K.rage&&this.rage>=100&&!this.rageActive){
        this.rageActive=true;setEnvRage(true);beep(90,'sawtooth',0.28,0.08);
        hitStop=0; screenShake=4; this.transformAnim=18;
        const rageCol = this.rageTier===3?'#d44cff':this.rageTier===2?'#ff3a3a':'#66e8ff';
        for(let i=0;i<18;i++){
          particles.push({
            x:this.x+this.w/2+(Math.random()-.5)*30,
            y:this.y-this.h*0.55+(Math.random()-.5)*40,
            vx:(Math.random()-.5)*2.2,vy:-Math.random()*2.8-0.6,
            life:0.45+Math.random()*0.2,col:rageCol,w:Math.random()*10+6,tp:'f'
          });
        }
        const _rmL=typeof getRageModifiers==='function'?getRageModifiers(this.rageTier):null;
        floatingTexts.push({x:this.x+this.w/2,y:this.y-this.h-10,t:_rmL?_rmL.labelShort:(this.rageTier===2?'BLOOD RAGE':'SHADOW RAGE'),life:0.8,vy:-1.4,col:rageCol,size:16});
      }
      if(this.rageActive){
        this.rage-=0.15;
        if(this.rage<=0){this.rage=0;this.rageActive=false;setEnvRage(false);}
      }
      // Stamina regen
      if(this.state!=='atk'&&this.stamina<this.maxStam)this.stamina=Math.min(this.maxStam,this.stamina+0.4);
      updateHUD();
    }

    if(this.hp<=0){
      if(this.state==='grabbed')return;
      // Fall to ground with friction, no flying
      this.vx*=0.85;
      if(this.y<GND){
        this.vy+=1.2;
        this.rotation+=0.06*this.dir;
        // Clamp Y — never disappear off top
        if(this.y<H*0.1){this.y=H*0.1;this.vy=Math.max(0,this.vy);}
      }
      this.x=Math.max(10,Math.min(this.x+this.vx,W-this.w-10));
      this.y=Math.min(this.y+this.vy,GND);
      if(this.y>=GND){this.y=GND;this.vy=0;this.vx=0;this.rotation=Math.PI/2*-this.dir;}
      return;
    }

    // grab_exec
    if(this.state==='grab_exec'){
      this.vx=0;this.vy=0;this.atkT--;
      const t=60-this.atkT;

      // SPIN PHASE (t 0→40)
      if(t<40 && this.grabHits!==2){
        const prog=t/40;
        const angle=(this.dir===1?0:Math.PI)+(this.dir===1?Math.PI:-Math.PI)*prog;
        const radius=108*this.scale;
        en.x=this.x+this.w/2+Math.cos(angle)*radius-en.w/2;
        en.y=this.y-28*this.scale-Math.sin(angle)*radius;
        en.rotation=prog*Math.PI*2*-this.dir;
        en.x=Math.max(10,Math.min(en.x,W-en.w-10));
        // DOUBLE-TAP G mid-spin -> aerial slam
        if(this.isP&&K.g&&prog>=0.4&&prog<=0.85&&this.grabHits===0){
          this.grabHits=2; K.g=0;
          en.vy=-15;en.vx=this.dir*6;en.rotation=0;
          this.atkT=32;
          beep(140,'sawtooth',0.2,0.09);
          for(let i=0;i<12;i++)particles.push({x:en.x+en.w/2,y:en.y-en.h*0.5,
            vx:(Math.random()-.5)*16,vy:-Math.random()*9-3,
            life:0.65,col:'rgba(255,130,0,0.9)',w:Math.random()*20+8,tp:'s'});
        }
        return;
      }
      // AERIAL SLAM PHASE
      if(this.grabHits===2){
        this.atkT--;
        en.vy+=2.4;
        en.x=Math.max(10,Math.min(en.x+en.vx*0.7,W-en.w-10));
        en.y=Math.min(en.y+en.vy,GND);
        en.rotation+=0.2*-this.dir;
        if(en.y>=GND||this.atkT<=0){
          en.y=GND;en.vy=0;en.vx*=0.2;en.rotation=Math.PI/2*-this.dir;
          let d=this.dmg*3.4;
          if(this.raging)d*=(this.rageTier===2?2.0:1.5);
          let fd=Math.max(1,d-(en.defense||0));
          if(en.absorption)fd*=(1-en.absorption);
          en.hp=Math.max(0,en.hp-fd);
          screenShake=30;doFlash();
          bloodSplatter(en.x+en.w/2,GND,-this.dir,true);
          shadowSlash(en.x+en.w/2,GND,this.dir,'rgba(255,90,0,0.95)');
          floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h,
            t:Math.floor(fd),life:1.2,vy:-3.5,col:'#ff6600',size:36});
          floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h-32,
            t:'AERIAL SLAM!',life:1.2,vy:-2,col:'#ffaa00',size:14});
          for(let i=0;i<30;i++)landDust.push({x:en.x+en.w/2,y:GND-3,
            vx:(Math.random()-.5)*20,vy:-Math.random()*8,
            life:1.3,w:Math.random()*20+8,col:'rgba(255,110,30,0.38)'});
          beep(65,'sawtooth',0.55,0.2);beep(160,'sine',0.14,0.09);
          if(this.isP&&!this.rageActive)this.rage=Math.min(100,this.rage+55);
          this.grabHits=0;this.state='idle';
          en.state='hit';en.hitT=32;
          if(en.hp<=0){checkRound();return;}
        }
        return;
      }
      // HOLD PHASE (t 40-60)
      en.x=this.x+this.w/2-this.dir*105*this.scale-en.w/2;
      en.y=GND-4;en.rotation=Math.PI/2*-this.dir;
      en.x=Math.max(10,Math.min(en.x,W-en.w-10));
      // T -> forward throw
      if(this.isP&&K.t&&this.atkT>0){
        en.state='hit';en.hitT=28;en.vx=this.dir*20;en.vy=-6;en.rotation=0;
        let d=this.dmg*2.0;if(this.raging)d*=(this.rageTier===2?2.0:1.5);
        let fd=Math.max(1,d-(en.defense||0));if(en.absorption)fd*=(1-en.absorption);
        en.hp=Math.max(0,en.hp-fd);
        floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h,t:Math.floor(fd),life:1,vy:-2.8,col:'#ff6600',size:30});
        shadowSlash(en.x+en.w/2,en.y-en.h*0.5,this.dir,'rgba(255,130,0,0.9)');
        bloodSplatter(en.x+en.w/2,en.y,this.dir,true);
        for(let i=0;i<16;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*14,vy:-Math.random()*5,life:1,w:Math.random()*14+6,col:'rgba(255,150,50,0.3)'});
        screenShake=16;doFlash();beep(85,'sawtooth',0.35,0.14);
        if(this.isP&&!this.rageActive)this.rage=Math.min(100,this.rage+40);
        this.state='idle';this.atkT=0;this.grabHits=0;K.t=0;
        if(en.hp<=0){checkRound();return;}
        return;
      }
      // Ground slam at t===40
      if(t===40){
        screenShake=24;
        let d=this.dmg*2.6;if(this.raging)d*=(this.rageTier===2?2.0:1.5);
        let fd=Math.max(1,d-(en.defense||0));if(en.absorption)fd*=(1-en.absorption);
        en.hp=Math.max(0,en.hp-fd);
        floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h,t:Math.floor(fd),life:1,vy:-2.5,col:this.isP?'#ff003c':'#fff',size:30});
        bloodSplatter(en.x+en.w/2,GND,-this.dir,true);
        shadowSlash(en.x+en.w/2,GND,this.dir,'rgba(160,0,0,0.7)');
        for(let i=0;i<24;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*15,vy:-Math.random()*6,life:1.1,w:Math.random()*17+8,col:'rgba(180,180,180,0.22)'});
        beep(88,'sawtooth',0.38,0.18);
        if(en.hp<=0){this.grabHits=0;checkRound();return;}
        if(this.isP&&!this.rageActive)this.rage=Math.min(100,this.rage+35);
      }
      if(this.atkT<=0){
        this.grabHits=0;this.state='idle';
        if(en.hp>0){en.state='hit';en.hitT=22;en.vx=-this.dir*10;en.vy=-2;}
        else en.state='idle';
      }
      return;
    }
        if(this.state==='grabbed'){this.vx=0;this.vy=0;return;}

    if(this.y>=GND)this.vy=0;
    const landed=wasAir&&this.y>=GND;
    if(landed){
      this.landAnim=12;
      for(let i=0;i<12;i++)landDust.push({x:this.x+this.w/2,y:this.y-3,vx:(Math.random()-.5)*7,vy:-Math.random()*2.5,life:0.9,w:Math.random()*14+6,col:'rgba(140,140,140,0.3)'});
      beep(120,'sine',0.06,0.04);
    }
    if(this.landAnim>0)this.landAnim--;

    if(this.state!=='grabbed'&&this.hp>0&&this.hitT<=0){this.rotation=0;}
    if(this.hitT>0){this.hitT--;this.vx*=0.83;if(this.y<GND)this.rotation+=0.15*this.dir;}
    else if(this.atkT>0){
      this.atkT--;this.vx*=0.78;
      const isBloodReaperReturnHit = this.isP && weapon==='blood_reaper' && this.atkType==='throw' && this.returnHitF>0 && !this.brReturnDid && this.atkT===this.returnHitF;
      if(this.atkT===this.hitF || isBloodReaperReturnHit){
        const activeGun = (this.isP && weapon==='ak47') || (!this.isP && this.eWeapon==='ak47');
        if(activeGun && this.atkT===this.hitF){
          const muzzleX = this.dir===1 ? (this.x + this.w + 54) : (this.x - 54);
          const muzzleY = this.y - this.h*0.63;
          const shots = this.combo===1 ? 1 : (this.combo===2 ? 2 : (this.combo===3 ? 3 : 4));
          const owner = this.isP ? 'player' : 'enemy';
          const baseDmg = this.isP ? Math.max(8, Math.floor(this.dmg * 0.72)) : Math.max(6, Math.floor(this.dmg * 0.60));
          for(let s=0; s<shots; s++){
            const spread = (Math.random()-0.5) * (this.combo>=3 ? 1.4 : 0.8);
            const speed = 26 + (this.combo>=3 ? 4 : 0) + s;
            spawnAkBullet(owner, muzzleX, muzzleY + spread*2.2, this.dir, baseDmg, spread, speed);
          }
          // muzzle flash / recoil
          for(let m=0;m<10;m++){
            particles.push({
              x:muzzleX, y:muzzleY,
              vx:this.dir*(Math.random()*8+6)+(Math.random()-.5)*2,
              vy:(Math.random()-.5)*4,
              life:0.14+Math.random()*0.10,
              col:'rgba(255,214,90,0.96)',
              w:Math.random()*10+5, tp:'s'
            });
          }
          floatingTexts.push({x:muzzleX,y:muzzleY-18,t:shots>1?'BURST':'SHOT',life:0.35,vy:-1.1,col:'#ffd65a',size:11});
          screenShake = Math.max(screenShake, shots>2 ? 6 : 4);
        }

        let reach=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19)?115*this.scale:78*this.scale;
        if(this.atkType==='k')reach+=32*this.scale;
        if(this.atkType==='slam')reach+=58*this.scale;
        if(this.atkType==='throw')reach+=20*this.scale;
        if(this.atkType==='u')reach+=40*this.scale;
        if(this.atkType==='sw')reach+=50*this.scale;
        if(this.combo>=3)reach+=38*this.scale;
        if(this.raging)reach+=28*this.scale;
        if(this.isP&&weapon==='dagger')reach+=22*this.scale;
    if(this.isP&&weapon==='sai')reach+=26*this.scale;
    if(this.isP&&weapon==='woodstick')reach+=35*this.scale;
        if(this.isP&&weapon==='nunchaku')reach+=42*this.scale;
        if(this.isP&&weapon==='katana')reach+=48*this.scale;
        if(this.isP&&weapon==='spear')reach+=74*this.scale;
        if(this.isP&&weapon==='staff'){reach+=82*this.scale;}
        
        if(this.isP&&weapon==='scythe')reach+=96*this.scale;
        if(this.isP&&weapon==='claws')reach+=24*this.scale;
        if(this.isP&&weapon==='hammer')reach+=58*this.scale;
        if(this.isP&&weapon==='knives')reach+=28*this.scale;
        if(this.isP&&weapon==='lynx_claws')reach+=24*this.scale;
        if(this.isP&&weapon==='blood_reaper')reach+=110*this.scale;
        if(this.isP&&weapon==='composite_sword')reach+=120*this.scale;
        if(this.isP&&weapon==='ak47')reach+=170*this.scale;
        // Enemy weapon reach
        if(!this.isP&&this.eWeapon==='katana')reach+=35*this.scale;
        if(!this.isP&&this.eWeapon==='spear')reach+=58*this.scale;
        if(!this.isP&&this.eWeapon==='staff')reach+=62*this.scale;
        if(!this.isP&&this.eWeapon==='hammer')reach+=54*this.scale;
        if(!this.isP&&this.eWeapon==='scythe')reach+=82*this.scale;
        if(!this.isP&&this.eWeapon==='dagger')reach+=18*this.scale;
        if(!this.isP&&this.eWeapon==='knives')reach+=26*this.scale;
        if(!this.isP&&this.eWeapon==='lynx_claws')reach+=24*this.scale;
        if(!this.isP&&this.eWeapon==='blood_reaper')reach+=104*this.scale;
        if(!this.isP&&this.eWeapon==='composite_sword')reach+=112*this.scale;
        if(!this.isP&&this.eWeapon==='ak47')reach+=150*this.scale;

        // Staff always hits at head height
        const spearHeadY=this.isP&&weapon==='spear'?this.y-this.h*0.63:null;
        const staffHeadY=this.isP&&weapon==='staff'?this.y-this.h*0.85:null;
        const airAttack=this.isP&&this.y<GND-20;
        const hx=this.dir===1?this.x+this.w:this.x-reach;
        const hy=spearHeadY!==null?spearHeadY:(staffHeadY!==null?staffHeadY:
          airAttack?(this.y-this.h*0.3): // aerial - hit center mass
          (this.y-(this.atkType==='k'?(this.combo>=3?80:30):(this.atkType==='slam'?35:(this.atkType==='throw'?40:(this.atkType==='u'?70:30))))*this.scale));
        // Aerial attack: wider vertical hit window
        const enTop=airAttack?(en.y-en.h*1.2):en.y-en.h;
        if(hx<en.x+en.w&&hx+reach>en.x&&hy<en.y&&this.y>enTop){
          let d=this.dmg,heavy=false;
          // Jump attack bonus
          if(this.isP&&this.y<GND-20){
            d*=1.4;heavy=true;screenShake=8;
            const _airCol=this.atkType==='k'?'rgba(0,220,255,0.85)':'rgba(255,220,160,0.75)';
            for(let _ai=0;_ai<10;_ai++)particles.push({
              x:en.x+en.w/2,y:en.y-en.h*0.45,
              vx:this.dir*(Math.random()*10+4)+(Math.random()-.5)*6,
              vy:-Math.random()*8-3,life:0.6,col:_airCol,w:Math.random()*20+10,tp:'s'});
            const _albl=this.atkType==='k'?'JUMP KICK!':'JUMP PUNCH!';
            floatingTexts.push({x:this.x+this.w/2+(this.dir*30),y:this.y-this.h,
              t:_albl,life:1.1,vy:-1.8,
              col:this.atkType==='k'?'#00e5ff':'#ffcc44',size:13});
          }
          if(this.atkType==='k'){d*=1.3;heavy=true;}
          if(this.atkType==='slam'){d*=2.1;heavy=true;screenShake=15;}
          if(this.atkType==='throw'){d*=1.7;heavy=true;en.vy=-6;en.vx=this.dir*14;}
          if(this.atkType==='u'){d*=1.5;heavy=true;en.vy=-12;en.vx=this.dir*5;screenShake=6;}
          if(this.atkType==='sw'){d*=0.9;en.vy=0;en.vx=this.dir*6;en.hitT=Math.max(en.hitT,6);}
          if(this.combo>=3&&this.atkType!=='slam'&&this.atkType!=='throw'){d*=1.85;heavy=true;}
          if(this.raging)d*=(this.rageTier===2?2.0:1.5);
          // Claws do double hit
          if(this.isP&&weapon==='claws'){
            const clawHit=d*0.36;
            en.takeHit(clawHit,this.dir,false);
            setTimeout(()=>{if(en&&en.hp>0)en.takeHit(clawHit,this.dir,false);},45);
            setTimeout(()=>{if(en&&en.hp>0)en.takeHit(clawHit*1.2,this.dir,heavy);},92);
          } else if(this.isP&&weapon==='katana'){
            const kataHeavy=heavy||this.combo>=3;
            en.takeHit(d*(this.combo>=3?1.16:1.08),this.dir,kataHeavy);
            shadowSlash(en.x+en.w/2+(this.dir*10),en.y-en.h*0.58,this.dir,'rgba(255,235,200,0.42)',kataHeavy);
          } else if(this.isP&&weapon==='spear'){
            const spearHeavy=heavy||this.combo>=3;
            const spearMult=(this.combo===4?1.22:(this.combo>=3?1.12:1.06));
            en.takeHit(d*spearMult,this.dir,spearHeavy);
            shadowSlash(en.x+en.w/2+(this.dir*14),en.y-en.h*0.52,this.dir,'rgba(255,218,140,0.30)',spearHeavy);
          } else if(this.isP&&weapon==='lynx_claws'){
            const mult=(this.combo===4?1.18:(this.combo>=3?1.08:1.02));
            en.takeHit(d*mult,this.dir,heavy||this.combo===4);
          } else if(this.isP&&weapon==='blood_reaper'){
            const isThrowReturn = this.atkType==='throw' && isBloodReaperReturnHit;
            const mult = this.atkType==='throw'
              ? (isThrowReturn ? 0.92 : 1.08)
              : (this.combo===4?1.24:(this.combo>=3?1.12:1.05));
            const dealt=d*mult;
            en.takeHit(dealt,this.dir,heavy||this.combo>=3||this.atkType==='throw');
            if(this.atkType==='throw'){
              // chain throw pulls target slightly on the way back
              const pull = (this.x - en.x) * (isThrowReturn ? 0.26 : 0.12);
              en.x += pull;
              en.vx = (en.vx||0) + pull*0.14;
              floatingTexts.push({
                x: en.x+en.w/2, y: en.y-en.h*0.62,
                t: isThrowReturn ? 'RETURN HIT' : 'CHAIN HIT',
                life: 0.6, vy: -1.5, col: '#d9b25e', size: 12
              });
              if(isThrowReturn) this.brReturnDid = true;
            } else if(this.combo>=3 && !en.dead){
              const pull = (this.x - en.x) * (this.combo===4 ? 0.22 : 0.14);
              en.x += pull;
              en.vx = (en.vx||0) + pull*0.12;
            }
            applyBloodDrain(this,dealt,this.atkType==='throw' ? (isThrowReturn ? 0.16 : 0.10) : (this.combo===4?0.25:0.14));
            triggerBloodDrainFX(en.x+en.w/2,en.y-en.h*0.4);
          } else if(this.isP&&weapon==='composite_sword'){
            const centerDist=Math.abs((en.x+en.w/2) - (this.x+this.w/2));
            const closePenalty=centerDist < 85 ? 0.72 : 1.0;
            const mult=(this.combo===4?1.22:(this.combo>=3?1.12:1.04)) * closePenalty;
            const dealt=d*mult;
            en.takeHit(dealt,this.dir,heavy||this.combo>=3);
            if(this.combo>=2){
              const bleed=Math.max(1, Math.floor(dealt*0.08));
              en.hp=Math.max(0,en.hp-bleed);
              floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h*0.54,t:'BLEED',life:0.55,vy:-1.5,col:'#d11b3d',size:12});
              triggerBloodDrainFX(en.x+en.w/2,en.y-en.h*0.4);
            }
          } else if(this.isP&&weapon==='ak47'){
            // AK-47 damage is handled by projectile collision above.
          } else {
            en.takeHit(d,this.dir,heavy);
          }
          // Shadow slash FX on hit
          shadowSlash(en.x+en.w/2,en.y-en.h*0.5,this.dir,this.isP?'rgba(255,80,80,0.5)':'rgba(200,200,200,0.3)',heavy);
          if(this.isP)weaponImpactFX(en.x+en.w/2,en.y,this.dir,weapon,heavy);
          if(this.isP)onWeaponExpansionHit(weapon,this,d,en.x+en.w/2,en.y-en.h*0.45,this.combo);
          if(this.isP){
            // Combo tracking
            const now=Date.now();
            if(now-lastComboTime<2200){comboCount++;}else{comboCount=1;}
            lastComboTime=now;
            showCombo(comboCount);
          }
          if(this.atkType==='slam'){for(let i=0;i<16;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*10,vy:-Math.random()*3.5,life:1,w:Math.random()*15+8,col:'rgba(160,160,160,0.22)'});}
          if(this.isP&&!this.rageActive){this.rage=Math.min(100,this.rage+(this.atkType==='k'?28:this.atkType==='slam'?36:this.atkType==='throw'?30:18));}
        }
      }
    } else {
      this.cWin>0?this.cWin--:this.combo=0;
      if(this.isP){
        if(K.l){this.vx=-this.spd;this.dir=-1;this.state='run';}
        else if(K.r){this.vx=this.spd;this.dir=1;this.state='run';}
        else{this.vx=0;this.state='idle';}
        if(K.j&&this.y>=GND-0.5){this.vy=-18;this.state='jump';beep(280,'sine',0.1);}

        // ── JUMP ATTACK: Punch or Kick while airborne ──
        const isAirborne=this.y<GND-20;
        if(isAirborne&&this.atkT<=0){
          if(K.k&&this.stamina>=12){
            this.stamina=Math.max(0,this.stamina-12);
            this.vy=Math.max(this.vy,6); // push downward
            this.attack('k');
            shadowSlash(this.x+this.w/2,this.y,this.dir,'rgba(0,200,220,0.7)');
          } else if(K.a&&this.stamina>=8){
            this.stamina=Math.max(0,this.stamina-8);
            this.attack('p');
          }
        }

        let tryGrab=K.g;
        let inGrabRange=Math.abs((this.x+this.w/2)-(en.x+en.w/2))<115*Math.max(this.scale,en.scale)
          &&en.y>=GND-1&&en.hitT<=0&&en.state!=='grabbed'&&en.state!=='grab_exec'&&en.state!=='hit';
        // SWEEP: G when out of grab range
        if(K.g && !inGrabRange && this.atkT <= 0 && this.y >= GND-1 && this.stamina >= 14){
          if(window.__chugSweep && window.__chugSweep(this, en, this.dir)){
            K.g = 0;
          }
        }

        // THROW button — quick grab-and-launch without full swing
        if(K.t&&inGrabRange){
          this.state='grab_exec';this.atkT=24;this.grabHits=199; // v11 quick throw shortcut
          en.state='grabbed';en.hitT=45;en.grabber=this;en.vx=0;en.vy=0;
          K.t=0;
          beep(200,'sawtooth',0.15,0.07);
        } else if(tryGrab&&inGrabRange){
          this.state='grab_exec';this.atkT=60;this.grabHits=0;en.state='grabbed';en.hitT=60;en.grabber=this;en.vx=0;en.vy=0;
          if(K.g)K.g=0;
        } else if(K.g||(K.a&&K.k)){
          this.attack('slam');if(K.g)K.g=0;K.a=0;K.k=0;
        } else if(K.a){
          const forwardHeld = this.dir===1 ? !!K.r : !!K.l;
          if(this.stamina>=8){
            this.stamina=Math.max(0,this.stamina-8);
            if(weapon==='blood_reaper' && forwardHeld){
              this.attack('throw');
            } else {
              this.attack('p');
            }
          }
        } else if(K.k){
          if(this.stamina>=12){this.stamina=Math.max(0,this.stamina-12);this.attack('k');}
        } else if(K.u && !K.a && !K.k && this.y >= GND-1 && this.stamina >= 18){
          if(window.__chugUppercut && window.__chugUppercut(this, en, this.dir)){
            K.u = 0;
          }
        } else if(K.f && !K.a && !K.k && this.y >= GND-1 && window.comboCount >= 5 && this.stamina >= 25){
          if(window.__chugFinisher && window.__chugFinisher(this, en, window.comboCount)){
            window.comboCount = 0; K.f = 0;
          }
        } else if(K.range){
          if(fireRangedWeapon(this.x + this.w/2, this.y - this.h*0.4, this.dir)){
            K.range = 0;
          }
        }
      } else {
        const dist=this.x-en.x;this.dir=dist>0?-1:1;
        const abs=Math.abs(dist),rng=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19)?130*this.scale:88*this.scale;
        if(abs>rng){this.vx=this.dir*this.spd;this.state='run';}
        else{
          this.vx=0;this.state='idle';
          let ag=0.04;
          if(this.type===2)ag=0.08;if(this.type===3)ag=0.06;if(this.type===4)ag=0.13;
          if(this.type===5)ag=0.07;if(this.type===6)ag=0.09;if(this.type===7)ag=0.15;
          if(this.type===8)ag=0.10;if(this.type===9)ag=0.14;if(this.type===10)ag=0.055;
          if(this.type===11)ag=0.18; // erratic — very aggressive but sometimes freezes
          if(this.type===12)ag=0.13; // evolved — methodical, punishes mistakes
          if(this.type===13)ag=0.16; // sync wave — relentless boss
          if(this.type===14)ag=0.20; // rewrite — max aggression, perfect timing
          if(this.type===15)ag=0.22; // memory erasure — chaotic bursts
          if(this.type===16)ag=0.18; // interference wave — fast unpredictable
          if(this.type===17)ag=0.20; // pressure wave — relentless
          if(this.type===18)ag=0.24; // the delay — mirrors and counters
          if(this.type===19)ag=0.26; // final interference — max aggression
          if(this.type===20)ag=0.30;
          if(this.type===21)ag=0.12; // AROWH — slow deliberate // final host — perfect timing, reads everything
          if(this.type===8||this.type===9||this.type===11||this.type===12||this.type===16||this.type===19){
            if(en.state==='atk'&&Math.random()<0.22){this.vy=-14;this.state='jump';}
          }
          let inGrabRange=abs<115*Math.max(this.scale,en.scale)&&en.y>=GND-1
            &&en.state!=='grabbed'&&en.state!=='grab_exec'&&en.state!=='hit';
          if(Math.random()<0.022&&inGrabRange){
            this.state='grab_exec';this.atkT=60;en.state='grabbed';en.hitT=60;en.grabber=this;en.vx=0;en.vy=0;
          } else if(Math.random()<0.02&&abs<135){
            this.attack('slam');
          } else if(Math.random()<ag){
            this.attack(Math.random()>.38?'p':'k');
          }
        }
      }
    }
    if(this.y<GND){
      // Stronger gravity when high up — pulls fighters back down faster
      const heightFactor=Math.max(1,(GND-this.y)/200);
      this.vy+=0.9*heightFactor;
      this.state='jump';
      // Hard ceiling — never go above top 10% of screen
      if(this.y<H*0.1){this.y=H*0.1;this.vy=Math.max(0,this.vy);}
    }
    const cs=this.raging?this.vx*1.5:this.vx;
    this.x=Math.max(10,Math.min(this.x+cs,W-this.w-10));
    this.y=Math.min(this.y+this.vy,GND);
    // Hard floor clamp
    if(this.y>=GND){this.y=GND;this.vy=0;}
    if(this.raging&&this.hp>0){for(let i=0;i<3;i++)fireAt(this.x,this.y,cs);}
  }

  attack(type){
    if(this.atkT>6)return;
    this.atkType=type;this.state='atk';
    this.combo++;if(this.combo>4)this.combo=1;
    let spdMod=1;
    if(this.isP&&weapon==='dagger')spdMod=0.72;
    if(this.isP&&weapon==='katana')spdMod=0.86;
    if(this.isP&&weapon==='spear')spdMod=0.90;
    if(this.isP&&weapon==='staff')spdMod=0.82;
    if(this.isP&&weapon==='claws')spdMod=0.60;
    if(this.isP&&weapon==='scythe')spdMod=1.12;
    if(this.isP&&weapon==='hammer')spdMod=1.2;
    if(this.isP&&speedUpg>=2)spdMod*=0.82;
    else if(this.isP&&speedUpg>=1)spdMod*=0.9;
    if(!this.isP&&(this.type===4||this.type===7))spdMod=0.68;
    if(!this.isP&&this.type===9)spdMod=0.72;
    if(!this.isP&&this.type===10)spdMod=1.4; // Burden very slow
    if(!this.isP&&this.type===11)spdMod=Math.random()<0.15?2.0:0.65; // Controlled — erratic burst or freeze
    if(!this.isP&&this.type===12)spdMod=0.78; // Evolved — measured, clean
    if(!this.isP&&this.type===13)spdMod=0.85; // Sync Wave — steady powerful
    if(!this.isP&&this.type===14)spdMod=0.72; // Rewrite — fast clean attacks
    if(!this.isP&&this.type===15)spdMod=Math.random()<0.2?2.2:0.7; // Memory Erasure — random burst
    if(!this.isP&&this.type===16)spdMod=0.65; // Interference Wave — very fast
    if(!this.isP&&this.type===17)spdMod=0.78; // Pressure Wave — steady relentless
    if(!this.isP&&this.type===18)spdMod=0.70; // The Delay — precise counters
    if(!this.isP&&this.type===19)spdMod=Math.random()<0.25?2.0:0.68; // Final Interference — chaos
    if(!this.isP&&this.type===20)spdMod=0.62;
    if(!this.isP&&this.type===21)spdMod=1.8; // Final Host — precise, relentless
    if(type==='slam'){
      this.atkT=Math.floor(26*spdMod);this.hitF=12;this.cWin=36;
      beep(this.isP?170:110,'sawtooth',0.24,0.09);return;
    }
    this.returnHitF = 0;
    this.brReturnDid = false;
    this.__brThrowTotal = 0;
    if(type==='throw'){
      if(this.isP && weapon==='blood_reaper'){
        this.atkT=Math.floor(30*spdMod);
        this.hitF=Math.floor(this.atkT*0.62);     // outgoing hit
        this.returnHitF=Math.max(2, this.hitF-8); // returning ring hit
        this.__brThrowTotal=this.atkT;
        this.cWin=40;
        beep(145,'triangle',0.24,0.09);
        return;
      }
      this.atkT=Math.floor(22*spdMod);this.hitF=10;this.cWin=34;
      beep(this.isP?130:95,'triangle',0.22,0.08);return;
    }
    if(type==='p'){
      this.atkT=Math.floor((this.raging?9:15)*spdMod);if(this.combo===4)this.atkT+=6;
      this.hitF=Math.floor(this.atkT/2);this.cWin=25;
      beep(this.isP?380+this.combo*110:190,'triangle',0.1,0.05);
    } else {
      this.atkT=Math.floor((this.raging?13:19)*spdMod);if(this.combo===4)this.atkT+=8;
      this.hitF=Math.floor(this.atkT/2)+2;this.cWin=25;
      beep(this.isP?280+this.combo*55:140,'sawtooth',0.15,0.06);
    }
  }

  takeHit(dmg,fd,heavy=false){
    if(this.hp<=0)return;
    let finalDmg=Math.max(1,dmg-(this.defense||0));
    if(this.absorption)finalDmg*=(1-this.absorption);
    if(this.raging&&this.rageTier===2)finalDmg*=0.72;
    // Rage tier 3 damage reduction (via getRageModifiers)
    if(this.raging&&this.rageTier===3){const _rm3=typeof getRageModifiers==='function'?getRageModifiers(3):null;if(_rm3)finalDmg*=_rm3.defMul;}
    if(this.isP&&enduranceUpg>=2)finalDmg*=0.85;
    // AROWH — unkillable, absorbs 95% damage, HP never reaches 0
    if(this.type===21){
      this.hp=Math.max(1,this.hp-finalDmg*0.05);
      this.hitT=2;this.vx=fd*0.5;this.vy=0;
      beep(40,'sawtooth',0.3,0.15);
      floatingTexts.push({x:this.x+this.w/2,y:this.y-this.h-10,t:'—',life:0.8,vy:-1.5,col:'#555',size:18});
      updateHUD();return;
    }
    this.hp=Math.max(0,this.hp-finalDmg);
    this.hitT=heavy?18:11;this.state='hit';
    // Boss types have heavy weight — reduced knockback
    const isBossType=[3,6,8,10,13,14,15,18,19,20].includes(this.type);
    const hKnock=isBossType?4:11;
    this.vx=fd*(isBossType?3:hKnock);
    // Bosses NEVER fly up — stay grounded
    this.vy=isBossType?-2:(heavy?-6:-3);
    if(heavy&&!isBossType){this.vx*=1.3;}
    this.combo=0;this.cWin=0;
    const airborne=(this.y<GND-4);
    hitStop=airborne?0:(heavy?10:4);
    if(settingsShake)screenShake=heavy?14:5;
    if(heavy&&!airborne)doFlash();
    beep(heavy?65:90,'sawtooth',heavy?0.25:0.18,0.1*settingsSfxVol);
    if(heavy)beep(180,'sine',0.08,0.06*settingsSfxVol);
    bloodSplatter(this.x+this.w/2,this.y,fd,heavy);
    const dmgSize=finalDmg>=30?34:finalDmg>=20?28:finalDmg>=10?24:20;
    floatingTexts.push({x:this.x+this.w/2+(Math.random()-.5)*20,y:this.y-this.h-10,
      t:Math.floor(finalDmg),life:1,vy:-3,col:this.isP?varRed():'#fff',size:dmgSize});
    updateHUD();if(this.hp<=0)checkRound();
  }

  draw(c,ghost=false){
    c.globalAlpha=1;c.shadowBlur=0;c.shadowColor='transparent';
    if(isNaN(this.x)||isNaN(this.y))return;
    const T=Date.now();

    // Draw trail
    if(this.trailX.length>1&&!ghost){
      for(let i=1;i<this.trailX.length;i++){
        const a=(1-i/this.trailX.length)*(this.raging?0.26:0.18);
        c.globalAlpha=a;
        c.fillStyle=this.raging?(this.rageTier===2?(i % 2 ? 'rgba(255,54,54,0.34)' : 'rgba(120,0,0,0.28)'):(i % 2 ? 'rgba(92,236,255,0.34)' : 'rgba(142,96,255,0.28)')):'#000033';
        c.fillRect(this.trailX[i]-this.w/2,this.trailY[i]-this.h/2,this.w,this.h);
      }
      c.globalAlpha=1;
    }
    // Attack motion blur — ghost image slightly behind
    if(this.isP&&this.state==='atk'&&this.atkT<this.hitF+2&&!ghost){
      c.globalAlpha=0.15;
      c.save();c.translate(this.x+this.w/2-this.dir*8,this.y);
      c.scale(this.dir*this.scale,this.scale);
      c.fillStyle=this.raging?(this.rageTier===2?'rgba(255,72,72,0.30)':'rgba(102,232,255,0.32)'):'rgba(255,255,255,0.15)';
      c.fillRect(-this.baseW/2,-this.baseH,this.baseW,this.baseH);
      c.restore();c.globalAlpha=1;
    }

    let bob=(this.state==='run'||this.state==='idle')?Math.sin(T/100)*2:0;
    if(this.state==='jump')bob=-4;
    if(this.landAnim>0)bob=Math.sin(this.landAnim/12*Math.PI)*-6;

        let bodyCol='#000000';
    let clothCol='#000000';
    let wrapCol='#000000';
    let accentCol='#000000';

    if(this.hitT>0){bodyCol='#ffffff';clothCol='#ffffff';wrapCol='#ffffff';accentCol='#ffffff';}
    else if(this.raging&&!ghost){if(this.rageTier===2){bodyCol='#140404';clothCol='#320808';wrapCol='#ffd0d0';accentCol='#ff4a4a';}else{bodyCol='#060913';clothCol='#0d1730';wrapCol='#bff8ff';accentCol='#62e8ff';}}
    // Player-specific outfit color upgrades
    else if(this.isP&&!ghost){
      if(armor==='heavyarmor'){clothCol='#282020';bodyCol='#0a0808';}
      if(armor==='lightarmor'){clothCol='#101820';bodyCol='#080808';}
      if(armor==='voidarmor'){clothCol='#100c18';bodyCol='#080808';}
    }

    const breathe=Math.sin(T/200)*1.5;
    c.save();
    c.translate(this.x+this.w/2,this.y);
    if(this.rotation)c.rotate(this.rotation);

    let sqX=1,sqY=1;
    if(this.state==='jump'){sqX=0.86;sqY=1.16;}
    if(this.state==='hit'){sqX=1.22;sqY=0.78;}
    if(this.landAnim>0){const p=this.landAnim/12;sqX=1+p*0.28;sqY=1-p*0.22;}

    c.scale(this.dir*sqX*this.scale,sqY*this.scale);

    if(this.raging&&!ghost){if(this.rageTier===2){c.shadowColor='rgba(255,72,72,0.95)';c.shadowBlur=18;}else{c.shadowColor='rgba(98,232,255,0.95)';c.shadowBlur=18;}}
    // Boss glow
    if((this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14)&&!ghost){
      c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=25;
    }
    c.lineCap='round';c.lineJoin='round'; c.lineCap='round';

    let isBoss=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19||this.type===20);
        let tW=isBoss?40:34; // Torso width
    let wW=isBoss?24:18; // Waist width
    let aW=isBoss?15:13; // Arm width
    let lW=isBoss?17:15; // Leg width
    let jR=isBoss?9:8;   // Joint radius
    let hR=isBoss?16:13; // Head radius

    let headY=-this.baseH-5+bob+breathe*0.3;
    let shoulderY=-this.baseH+15+bob;
    let waistY=-this.baseH*0.45+bob;

    let leanX=(this.state==='atk'&&this.atkType==='k')?-8:
      (this.state==='atk'&&this.atkType==='slam')?-14:
      (this.state==='atk'&&this.atkType==='throw')?10:2;
    let leftShoulderX=-tW/2+leanX;
    let rightShoulderX=tW/2+leanX+breathe;
    let wind=-this.vx*3;
    let tailBob=(this.state==='run'||this.state==='jump')?Math.sin(T/50)*14:Math.sin(T/160)*4;

    // Boss aura — subtle color tint only, no circles
    if(isBoss&&!ghost){
      c.shadowBlur=0;
    }

    // Declare all limb vars
    let bHandX,bHandY,bElbowX,bElbowY;
    let fHandX,fHandY,fElbowX,fElbowY;
    let bFootX,bFootY,bKneeX,bKneeY;
    let fFootX,fFootY,fKneeX,fKneeY;

    // Detect if player is airborne during attack
    const _isAirAtk=this.state==='atk'&&this.y<GND-20;
    const _atkProg=this.hitF>0?Math.max(0,Math.min(1,(this.hitF-this.atkT)/this.hitF)):0;

    // Feet
    if(this.state==='grab_exec'){
      const _gt=60-this.atkT,_gp=Math.min(1,_gt/40);
      bFootX=-10+Math.sin(_gp*Math.PI)*5;bFootY=0;bKneeX=-18;bKneeY=-26;
      fFootX=20+Math.sin(_gp*Math.PI)*15;fFootY=0;fKneeX=14;fKneeY=-20;
    } else if(_isAirAtk&&this.atkType==='k'){
      // JUMP KICK LEGS — Smooth windup and strike
      let _wp = 0, _sp = 0;
      if (this.atkT > this.hitF + 4) _wp = Math.max(0, 1.0 - (this.atkT - (this.hitF + 4)) / 6);
      else if (this.atkT > this.hitF - 2) { _wp = 1; _sp = 1.0 - (this.atkT - (this.hitF - 2)) / 6; }
      else { _wp = 1; _sp = 1; }

      if (_sp === 0) {
          fFootX = 10 - _wp * 5; fFootY = -10 - _wp * 10;
          fKneeX = 15 + _wp * 15; fKneeY = -20 - _wp * 25;
          leanX += _wp * -10; // slightly pull back to chamber
      } else {
          fFootX = 5 + _sp * 75; fFootY = -20 - _sp * 15;
          fKneeX = 30 + _sp * 20; fKneeY = -45 + _sp * 10;
          leanX += -10 + _sp * 35; // aggressive lean into kick
      }
      bFootX = -15 - _wp*10; bFootY = -10 - _wp*10; 
      bKneeX = -20 - _wp*10; bKneeY = -20 - _wp*10;
    } else if(_isAirAtk&&this.atkType==='p'){
      // JUMP PUNCH LEGS — Superman dive
      let _wp = 0, _sp = 0;
      if (this.atkT > this.hitF + 4) _wp = Math.max(0, 1.0 - (this.atkT - (this.hitF + 4)) / 6);
      else if (this.atkT > this.hitF - 2) { _wp = 1; _sp = 1.0 - (this.atkT - (this.hitF - 2)) / 6; }
      else { _wp = 1; _sp = 1; }

      bFootX = -10 - _wp*10 - _sp*25; bFootY = -10 - _wp*10 - _sp*30; 
      bKneeX = -15 - _wp*5 - _sp*15;  bKneeY = -20 - _wp*5 - _sp*15;

      fFootX = 10 + _wp*10 + _sp*15;  fFootY = -10 - _wp*5 - _sp*10;
      fKneeX = 15 + _wp*10 + _sp*5;   fKneeY = -20 - _wp*5 - _sp*5;

      leanX += _wp * 10 + _sp * 30; // heavy lean forward
    } else if(this.state==='jump'){
      // AIRBORNE IDLE — legs tuck with velocity
      const _tuck=Math.min(1,Math.abs(this.vy)/16);
      bFootX=-14;bFootY=_tuck*-16;bKneeX=-18;bKneeY=-26-_tuck*8;
      fFootX=16;fFootY=_tuck*-10;fKneeX=12;fKneeY=-22-_tuck*6;
    } else if(this.state==='atk'&&this.atkType==='slam'){
      bFootX=-10;bFootY=0;bKneeX=-18;bKneeY=-26;
      fFootX=32;fFootY=0;fKneeX=18;fKneeY=-18;
    } else if(this.state==='atk'&&this.atkType==='k'){
      const ke=this.atkT<this.hitF+4?(this.combo===3?110:80):40;
      bFootX=-15;bFootY=0;bKneeX=-18;bKneeY=-25;
      let kEndX=ke,kEndY=waistY+25;
      if(this.combo===1){ kEndY=waistY+15; fKneeX=kEndX*0.6; fKneeY=kEndY-15; }
      else if(this.combo===2){ kEndY=-25; fKneeX=kEndX*0.5; fKneeY=-15; bKneeX=-22; bKneeY=-22; }
      else if(this.combo===3){ kEndY=-this.baseH+5; fKneeX=kEndX*0.7; fKneeY=-this.baseH+25; bFootX=-15; bKneeX=-25; bFootY=-5; bKneeY=-35; }
      else { fKneeX=kEndX/2; fKneeY=kEndY+15; }
      fFootX=kEndX;fFootY=kEndY;
    } else {
      let runBob=this.state==='run'?Math.sin(T/80)*24:0;
      bFootX=-12-runBob;bFootY=0;bKneeX=-15-runBob*0.5;bKneeY=-25;
      fFootX=18+runBob;fFootY=0;fKneeX=12+runBob*0.5;fKneeY=-25;
    }

    let tk=(this.state==='atk'&&this.atkType==='k')?-8:0;

    // Hands
    if(this.state==='grab_exec'){
      let t=60-this.atkT;
      let progress=Math.min(1,t/40);
      bHandX=-5-Math.sin(progress*Math.PI)*20;
      fHandX=25-Math.sin(progress*Math.PI)*40;
      bHandY=waistY-50-Math.sin(progress*Math.PI)*60;
      fHandY=waistY-30-Math.sin(progress*Math.PI)*60;
      if(progress>0.8){bHandX=-30;fHandX=-40;bHandY=waistY+30;fHandY=waistY+40;leanX=-20;}
      else leanX=15;
      bElbowX=leftShoulderX-10;bElbowY=shoulderY-30;
      fElbowX=rightShoulderX+10;fElbowY=shoulderY-30;
    } else if(this.state==='atk'&&this.atkType==='slam'){
      bHandX=-6;bHandY=waistY-25;
      fHandX=44;fHandY=waistY+32;
      bElbowX=leftShoulderX-6;bElbowY=shoulderY-6;
      fElbowX=rightShoulderX+12;fElbowY=shoulderY+30;
    } else if(this.state==='atk'&&this.atkType==='throw'){
      bHandX=-8;bHandY=waistY-6;fHandX=40;fHandY=waistY-18;
      bElbowX=leftShoulderX-2;bElbowY=shoulderY+10;
      fElbowX=rightShoulderX+16;fElbowY=shoulderY-12;
    } else if(_isAirAtk&&this.atkType==='p'){
      // JUMP PUNCH HANDS — Dynamic Superman punch
      let _wp = 0, _sp = 0;
      if (this.atkT > this.hitF + 4) _wp = Math.max(0, 1.0 - (this.atkT - (this.hitF + 4)) / 6);
      else if (this.atkT > this.hitF - 2) { _wp = 1; _sp = 1.0 - (this.atkT - (this.hitF - 2)) / 6; }
      else { _wp = 1; _sp = 1; }

      if (_sp === 0) {
          fHandX = 20 - _wp * 30; fHandY = waistY - _wp * 20;
          fElbowX = rightShoulderX + 10 - _wp * 25; fElbowY = shoulderY + 15 + _wp * 10;
      } else {
          fHandX = -10 + _sp * 95; fHandY = (waistY - 20) - _sp * 35;
          fElbowX = (rightShoulderX - 15) + _sp * 50; fElbowY = (shoulderY + 25) - _sp * 35;
      }
      bHandX = -10 - _wp*10 - _sp*30; bHandY = waistY - _wp*10 + _sp*15;
      bElbowX = leftShoulderX - 10 - _wp*10 - _sp*15; bElbowY = shoulderY + 10;
    } else if(_isAirAtk&&this.atkType==='k'){
      // JUMP KICK HANDS — Dynamic balance
      let _wp = 0, _sp = 0;
      if (this.atkT > this.hitF + 4) _wp = Math.max(0, 1.0 - (this.atkT - (this.hitF + 4)) / 6);
      else if (this.atkT > this.hitF - 2) { _wp = 1; _sp = 1.0 - (this.atkT - (this.hitF - 2)) / 6; }
      else { _wp = 1; _sp = 1; }

      fHandX = 10 - _wp*10 - _sp*20; fHandY = waistY + 5 - _sp*15;
      fElbowX = rightShoulderX + 10 - _wp*5 - _sp*15; fElbowY = shoulderY + 15;
      bHandX = -10 - _wp*10 - _sp*35; bHandY = waistY - _wp*10 - _sp*30;
      bElbowX = leftShoulderX - 10 - _wp*5 - _sp*20; bElbowY = shoulderY + 5;
    } else if(this.state==='atk'&&this.atkType==='p'){
      let ext = this.atkT < this.hitF + 6 ? 60 : 30; 
      if(isBoss) ext = Math.floor(ext*1.4);

      const isGlove = (this.isP && weapon==='boxing_gloves') || (!this.isP && this.eWeapon==='boxing_gloves');
      const isDagger = (this.isP && weapon==='dagger') || (!this.isP && this.eWeapon==='dagger');
      const isSai = (this.isP && weapon==='sai') || (!this.isP && this.eWeapon==='sai');
      const isStick = (this.isP && weapon==='woodstick') || (!this.isP && this.eWeapon==='woodstick');
      const isNunchaku = (this.isP && weapon==='nunchaku') || (!this.isP && this.eWeapon==='nunchaku');
      const isKamas = (this.isP && weapon==='knives') || (!this.isP && this.eWeapon==='knives');
      const isKatana = (this.isP && weapon==='katana') || (!this.isP && this.eWeapon==='katana');
      const isStaff = (this.isP && weapon==='staff') || (!this.isP && this.eWeapon==='staff');
      const isSpear = (this.isP && weapon==='spear') || (!this.isP && this.eWeapon==='spear');
      const isHammer = (this.isP && weapon==='hammer') || (!this.isP && this.eWeapon==='hammer');
      const isScythe = (this.isP && weapon==='scythe') || (!this.isP && this.eWeapon==='scythe');
      const isTwinKatana = (this.isP && weapon==='dual') || (!this.isP && this.eWeapon==='dual');
      const isLynxClaws = (this.isP && weapon==='lynx_claws') || (!this.isP && this.eWeapon==='lynx_claws');
      const isBloodReaper = (this.isP && weapon==='blood_reaper') || (!this.isP && this.eWeapon==='blood_reaper');
      const isCompositeSword = (this.isP && weapon==='composite_sword') || (!this.isP && this.eWeapon==='composite_sword');
      const isAk47 = (this.isP && weapon==='ak47') || (!this.isP && this.eWeapon==='ak47');


      if(isLynxClaws){
        const wind = this.atkT > this.hitF + 4;
        const recover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          if(wind){ fHandX = rightShoulderX + 6; fHandY = headY - 2; bHandX = leftShoulderX - 2; bHandY = waistY - 4; leanX -= 4; }
          else if(recover){ fHandX = rightShoulderX + 8; fHandY = shoulderY + 6; bHandX = leftShoulderX + 2; bHandY = shoulderY + 10; }
          else { fHandX = ext + 10; fHandY = shoulderY - 6; bHandX = ext - 10; bHandY = waistY + 2; leanX += 10; }
        } else if(this.combo===2){
          if(wind){ fHandX = rightShoulderX + 2; fHandY = headY - 2; bHandX = leftShoulderX - 8; bHandY = headY + 6; leanX -= 6; }
          else if(recover){ fHandX = rightShoulderX + 6; fHandY = shoulderY + 6; bHandX = leftShoulderX + 2; bHandY = shoulderY + 10; }
          else { fHandX = ext + 8; fHandY = shoulderY + 2; bHandX = ext - 6; bHandY = shoulderY - 8; leanX += 8; }
        } else if(this.combo===3){
          if(wind){ fHandX = rightShoulderX - 2; fHandY = waistY + 12; bHandX = leftShoulderX - 8; bHandY = waistY + 8; }
          else if(recover){ fHandX = rightShoulderX + 6; fHandY = shoulderY - 2; bHandX = leftShoulderX + 2; bHandY = shoulderY + 10; }
          else { fHandX = ext * 0.6; fHandY = headY - 18; bHandX = ext * 0.2; bHandY = shoulderY + 4; leanX += 10; }
        } else {
          if(wind){ fHandX = rightShoulderX; fHandY = headY - 14; bHandX = leftShoulderX - 10; bHandY = headY - 4; leanX -= 8; }
          else if(recover){ fHandX = rightShoulderX + 8; fHandY = shoulderY + 8; bHandX = leftShoulderX + 2; bHandY = shoulderY + 12; }
          else { fHandX = ext + 10; fHandY = waistY; bHandX = ext - 4; bHandY = shoulderY - 2; leanX += 12; }
        }
      } else if(isBloodReaper){
        const wind = this.atkT > this.hitF + 4;
        const recover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          // quick sickle slash
          if(wind){
            fHandX = rightShoulderX + 6;  fHandY = shoulderY - 6;
            bHandX = leftShoulderX - 2;   bHandY = waistY;
            leanX -= 6;
          } else if(recover){
            fHandX = rightShoulderX + 10; fHandY = shoulderY + 4;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 10;
          } else {
            fHandX = ext + 18;            fHandY = shoulderY - 10;
            bHandX = leftShoulderX + 6;   bHandY = waistY + 2;
            leanX += 10;
          }
        } else if(this.combo===2){
          // chain-side return cut
          if(wind){
            fHandX = rightShoulderX + 2;  fHandY = headY - 2;
            bHandX = leftShoulderX - 8;   bHandY = shoulderY + 8;
            leanX -= 8;
          } else if(recover){
            fHandX = rightShoulderX + 8;  fHandY = shoulderY + 6;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 12;
          } else {
            fHandX = ext + 12;            fHandY = shoulderY + 2;
            bHandX = ext - 10;            bHandY = shoulderY + 12;
            leanX += 12;
          }
        } else if(this.combo===3){
          // upper reap
          if(wind){
            fHandX = rightShoulderX - 4;  fHandY = waistY + 14;
            bHandX = leftShoulderX - 10;  bHandY = waistY + 8;
          } else if(recover){
            fHandX = rightShoulderX + 8;  fHandY = shoulderY;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 10;
          } else {
            fHandX = ext * 0.62;          fHandY = headY - 24;
            bHandX = ext * 0.18;          bHandY = shoulderY + 6;
            leanX += 10;
          }
        } else {
          // spinning kusarigama finisher
          if(wind){
            fHandX = rightShoulderX;      fHandY = headY - 12;
            bHandX = leftShoulderX - 12;  bHandY = headY;
            leanX -= 10;
          } else if(recover){
            fHandX = rightShoulderX + 10; fHandY = shoulderY + 8;
            bHandX = leftShoulderX + 4;   bHandY = shoulderY + 12;
          } else {
            fHandX = ext + 14;            fHandY = waistY - 2;
            bHandX = ext - 18;            bHandY = shoulderY + 10;
            leanX += 16;
          }
        }
      } else if(isCompositeSword){
        const wind = this.atkT > this.hitF + 4;
        const recover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          if(wind){ fHandX = rightShoulderX + 8; fHandY = shoulderY - 10; bHandX = leftShoulderX; bHandY = waistY; leanX -= 4; }
          else if(recover){ fHandX = rightShoulderX + 10; fHandY = shoulderY + 6; bHandX = leftShoulderX + 2; bHandY = waistY + 4; }
          else { fHandX = ext + 24; fHandY = shoulderY - 14; bHandX = leftShoulderX + 4; bHandY = waistY + 2; leanX += 6; }
        } else if(this.combo===2){
          if(wind){ fHandX = rightShoulderX + 4; fHandY = headY - 6; bHandX = leftShoulderX; bHandY = shoulderY + 8; leanX -= 6; }
          else if(recover){ fHandX = rightShoulderX + 8; fHandY = shoulderY + 4; bHandX = leftShoulderX + 2; bHandY = waistY + 4; }
          else { fHandX = ext + 22; fHandY = shoulderY; bHandX = leftShoulderX + 4; bHandY = waistY + 6; leanX += 6; }
        } else if(this.combo===3){
          if(wind){ fHandX = rightShoulderX - 2; fHandY = waistY + 10; bHandX = leftShoulderX - 4; bHandY = waistY + 8; }
          else if(recover){ fHandX = rightShoulderX + 8; fHandY = shoulderY - 2; bHandX = leftShoulderX + 2; bHandY = waistY + 4; }
          else { fHandX = ext * 0.72; fHandY = headY - 22; bHandX = leftShoulderX + 4; bHandY = waistY + 2; leanX += 8; }
        } else {
          if(wind){ fHandX = rightShoulderX + 2; fHandY = headY - 18; bHandX = leftShoulderX - 4; bHandY = waistY; }
          else if(recover){ fHandX = rightShoulderX + 8; fHandY = shoulderY + 6; bHandX = leftShoulderX + 2; bHandY = waistY + 4; }
          else { fHandX = ext + 26; fHandY = waistY - 2; bHandX = leftShoulderX + 4; bHandY = waistY + 4; leanX += 8; }
        }
      } else if(isAk47){
        // Rifle stance: back hand at trigger/stock, front hand on handguard
        if(this.combo===1){ fHandX = ext + 28; fHandY = shoulderY - 8; bHandX = ext - 6; bHandY = shoulderY + 2; leanX += 4; }
        else if(this.combo===2){ fHandX = ext + 32; fHandY = shoulderY - 8; bHandX = ext - 4; bHandY = shoulderY + 2; leanX += 6; }
        else if(this.combo===3){ fHandX = ext + 36; fHandY = shoulderY - 10; bHandX = ext - 2; bHandY = shoulderY; leanX += 8; }
        else { fHandX = ext + 34; fHandY = shoulderY - 12; bHandX = ext; bHandY = shoulderY; leanX += 10; }
      } else if(isTwinKatana){
        const tkWind = this.atkT > this.hitF + 4;
        const tkRecover = this.atkT < this.hitF - 3;

        if(this.combo===1){
          // cross draw cut
          if(tkWind){
            fHandX = rightShoulderX + 6;  fHandY = headY - 6;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY;
            bHandX = leftShoulderX - 6;   bHandY = waistY - 4;
            bElbowX = leftShoulderX - 4;  bElbowY = shoulderY + 8;
            leanX -= 6;
          } else if(tkRecover){
            fHandX = rightShoulderX + 10; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY + 8;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 12;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 10;
            leanX += 4;
          } else {
            fHandX = ext + 14;            fHandY = shoulderY - 10;
            fElbowX = rightShoulderX + ext * 0.28; fElbowY = shoulderY - 4;
            bHandX = ext - 2;             bHandY = waistY + 2;
            bElbowX = leftShoulderX + ext * 0.12;  bElbowY = shoulderY + 10;
            leanX += 10;
          }
        } else if(this.combo===2){
          // return diagonal cut
          if(tkWind){
            fHandX = rightShoulderX + 2;  fHandY = headY - 4;
            fElbowX = rightShoulderX + 4; fElbowY = shoulderY;
            bHandX = leftShoulderX - 10;  bHandY = headY + 2;
            bElbowX = leftShoulderX - 6;  bElbowY = shoulderY + 8;
            leanX -= 8;
          } else if(tkRecover){
            fHandX = rightShoulderX + 8;  fHandY = shoulderY + 6;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 8;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 12;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 10;
            leanX += 4;
          } else {
            fHandX = ext + 10;            fHandY = shoulderY + 2;
            fElbowX = rightShoulderX + ext * 0.24; fElbowY = shoulderY;
            bHandX = ext - 10;            bHandY = shoulderY - 8;
            bElbowX = leftShoulderX + ext * 0.08;  bElbowY = shoulderY + 8;
            leanX += 8;
          }
        } else if(this.combo===3){
          // twin rising cut
          if(tkWind){
            fHandX = rightShoulderX - 4;  fHandY = waistY + 12;
            fElbowX = rightShoulderX;     fElbowY = waistY + 2;
            bHandX = leftShoulderX - 10;  bHandY = waistY + 8;
            bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 14;
            leanX -= 8;
          } else if(tkRecover){
            fHandX = rightShoulderX + 6;  fHandY = shoulderY - 2;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 2;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 10;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 10;
            leanX += 2;
          } else {
            fHandX = ext * 0.60;          fHandY = headY - 28;
            fElbowX = rightShoulderX + 10;fElbowY = headY - 2;
            bHandX = ext * 0.20;          bHandY = shoulderY + 4;
            bElbowX = leftShoulderX + ext * 0.08;  bElbowY = shoulderY + 10;
            leanX += 8;
          }
        } else {
          // dual overhead finisher
          if(tkWind){
            fHandX = rightShoulderX;      fHandY = headY - 18;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY - 6;
            bHandX = leftShoulderX - 10;  bHandY = headY - 8;
            bElbowX = leftShoulderX - 6;  bElbowY = shoulderY + 4;
            leanX -= 10;
          } else if(tkRecover){
            fHandX = rightShoulderX + 8;  fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 8;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 12;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 10;
            leanX += 6;
          } else {
            fHandX = ext + 8;             fHandY = waistY;
            fElbowX = rightShoulderX + ext * 0.24; fElbowY = shoulderY + 2;
            bHandX = ext - 6;             bHandY = shoulderY - 6;
            bElbowX = leftShoulderX + ext * 0.06;  bElbowY = shoulderY + 8;
            leanX += 10;
          }
        }
      } else if(isScythe){
        const scytheWind = this.atkT > this.hitF + 4;
        const scytheRecover = this.atkT < this.hitF - 3;

        if(this.combo===1){
          // shoulder reap
          if(scytheWind){
            fHandX = rightShoulderX + 2;  fHandY = headY - 12;
            fElbowX = rightShoulderX + 5; fElbowY = shoulderY - 2;
            bHandX = leftShoulderX - 16;  bHandY = headY + 2;
            bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 10;
            leanX -= 12;
          } else if(scytheRecover){
            fHandX = rightShoulderX + 12; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY + 8;
            bHandX = leftShoulderX + 4;   bHandY = shoulderY + 18;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 12;
            leanX += 8;
          } else {
            fHandX = ext + 20;            fHandY = shoulderY - 10;
            fElbowX = rightShoulderX + ext * 0.34; fElbowY = shoulderY - 4;
            bHandX = ext - 10;            bHandY = shoulderY + 8;
            bElbowX = leftShoulderX + ext * 0.12;  bElbowY = shoulderY + 10;
            leanX += 20;
          }
        } else if(this.combo===2){
          // void sweep
          if(scytheWind){
            fHandX = rightShoulderX + 4;  fHandY = headY - 6;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY;
            bHandX = leftShoulderX - 14;  bHandY = shoulderY + 4;
            bElbowX = leftShoulderX - 6;  bElbowY = shoulderY + 12;
            leanX -= 10;
          } else if(scytheRecover){
            fHandX = rightShoulderX + 10; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY + 10;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 16;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 12;
            leanX += 6;
          } else {
            fHandX = ext + 26;            fHandY = shoulderY + 2;
            fElbowX = rightShoulderX + ext * 0.36; fElbowY = shoulderY;
            bHandX = ext - 12;            bHandY = shoulderY + 18;
            bElbowX = leftShoulderX + ext * 0.10;  bElbowY = shoulderY + 10;
            leanX += 18;
          }
        } else if(this.combo===3){
          // rising hook
          if(scytheWind){
            fHandX = rightShoulderX - 8;  fHandY = waistY + 20;
            fElbowX = rightShoulderX - 2; fElbowY = waistY + 8;
            bHandX = leftShoulderX - 12;  bHandY = waistY + 10;
            bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 16;
            leanX -= 12;
          } else if(scytheRecover){
            fHandX = rightShoulderX + 8;  fHandY = shoulderY - 2;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 2;
            bHandX = leftShoulderX + 2;   bHandY = shoulderY + 10;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 10;
            leanX += 4;
          } else {
            fHandX = ext * 0.64;          fHandY = headY - 40;
            fElbowX = rightShoulderX + 10;fElbowY = headY - 8;
            bHandX = ext * 0.24;          bHandY = shoulderY + 8;
            bElbowX = leftShoulderX + ext * 0.10;  bElbowY = shoulderY + 12;
            leanX += 10;
          }
        } else {
          // execution crescent
          if(scytheWind){
            fHandX = rightShoulderX - 2;  fHandY = headY - 22;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY - 8;
            bHandX = leftShoulderX - 18;  bHandY = headY - 6;
            bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 4;
            leanX -= 14;
          } else if(scytheRecover){
            fHandX = rightShoulderX + 10; fHandY = shoulderY + 10;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY + 10;
            bHandX = leftShoulderX + 4;   bHandY = shoulderY + 18;
            bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 12;
            leanX += 8;
          } else {
            fHandX = ext + 8;             fHandY = waistY + 2;
            fElbowX = rightShoulderX + ext * 0.30; fElbowY = shoulderY + 4;
            bHandX = ext - 18;            bHandY = shoulderY + 12;
            bElbowX = leftShoulderX + ext * 0.08;  bElbowY = shoulderY + 10;
            leanX += 18;
          }
        }
      } else if(isHammer){
        const hammerWind = this.atkT > this.hitF + 4;
        const hammerRecover = this.atkT < this.hitF - 3;

        if(this.combo===1){
          // Shoulder crush — starts on shoulder, then drives forward
          if(hammerWind){
            fHandX = rightShoulderX + 2;  fHandY = headY - 10;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY - 2;
            bHandX = rightShoulderX - 24; bHandY = headY + 6;
            bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 10;
            leanX -= 8;
          } else if(hammerRecover){
            fHandX = rightShoulderX + 14;  fHandY = shoulderY + 10;
            fElbowX = rightShoulderX + 8;  fElbowY = shoulderY + 8;
            bHandX = leftShoulderX + 2;    bHandY = shoulderY + 18;
            bElbowX = leftShoulderX - 4;   bElbowY = shoulderY + 12;
            leanX += 8;
          } else {
            fHandX = ext + 8;              fHandY = shoulderY - 8;
            fElbowX = rightShoulderX + ext * 0.45; fElbowY = shoulderY - 6;
            bHandX = rightShoulderX + 4;   bHandY = shoulderY + 2;
            bElbowX = leftShoulderX + 8;   bElbowY = shoulderY + 8;
            leanX += 10;
          }
        } else if(this.combo===2){
          // Two-hand side smash
          if(hammerWind){
            fHandX = rightShoulderX + 6;   fHandY = headY - 6;
            fElbowX = rightShoulderX + 8;  fElbowY = shoulderY;
            bHandX = rightShoulderX - 20;  bHandY = shoulderY + 4;
            bElbowX = leftShoulderX - 6;   bElbowY = shoulderY + 12;
            leanX -= 10;
          } else if(hammerRecover){
            fHandX = rightShoulderX + 12;  fHandY = shoulderY + 6;
            fElbowX = rightShoulderX + 10; fElbowY = shoulderY + 10;
            bHandX = leftShoulderX + 2;    bHandY = shoulderY + 14;
            bElbowX = leftShoulderX - 2;   bElbowY = shoulderY + 12;
            leanX += 6;
          } else {
            fHandX = ext + 18;             fHandY = shoulderY + 4;
            fElbowX = rightShoulderX + ext * 0.42; fElbowY = shoulderY;
            bHandX = ext - 18;             bHandY = shoulderY + 16;
            bElbowX = leftShoulderX + ext * 0.22;  bElbowY = shoulderY + 10;
            leanX += 18;
          }
        } else if(this.combo===3){
          // Rising maul
          if(hammerWind){
            fHandX = rightShoulderX - 10;  fHandY = waistY + 22;
            fElbowX = rightShoulderX - 2;  fElbowY = waistY + 8;
            bHandX = leftShoulderX - 10;   bHandY = waistY + 12;
            bElbowX = leftShoulderX - 10;  bElbowY = shoulderY + 16;
            leanX -= 12;
          } else if(hammerRecover){
            fHandX = rightShoulderX + 10;  fHandY = shoulderY - 4;
            fElbowX = rightShoulderX + 8;  fElbowY = shoulderY + 2;
            bHandX = leftShoulderX + 2;    bHandY = shoulderY + 10;
            bElbowX = leftShoulderX - 2;   bElbowY = shoulderY + 10;
            leanX += 4;
          } else {
            fHandX = ext * 0.72;           fHandY = headY - 36;
            fElbowX = rightShoulderX + 12; fElbowY = headY - 6;
            bHandX = ext * 0.34;           bHandY = shoulderY + 8;
            bElbowX = leftShoulderX + ext * 0.12;  bElbowY = shoulderY + 12;
            leanX += 12;
          }
        } else {
          // Execution drop — both hands over the shoulder then bring it down
          if(hammerWind){
            fHandX = rightShoulderX - 2;   fHandY = headY - 20;
            fElbowX = rightShoulderX + 2;  fElbowY = shoulderY - 8;
            bHandX = leftShoulderX - 18;   bHandY = headY - 4;
            bElbowX = leftShoulderX - 8;   bElbowY = shoulderY + 4;
            leanX -= 14;
          } else if(hammerRecover){
            fHandX = rightShoulderX + 12;  fHandY = shoulderY + 10;
            fElbowX = rightShoulderX + 8;  fElbowY = shoulderY + 10;
            bHandX = leftShoulderX + 4;    bHandY = shoulderY + 18;
            bElbowX = leftShoulderX - 2;   bElbowY = shoulderY + 12;
            leanX += 10;
          } else {
            fHandX = ext + 4;              fHandY = waistY + 6;
            fElbowX = rightShoulderX + ext * 0.38; fElbowY = shoulderY + 8;
            bHandX = ext - 24;             bHandY = shoulderY + 14;
            bElbowX = leftShoulderX + ext * 0.14;  bElbowY = shoulderY + 12;
            leanX += 18;
          }
        }
      } else if(isKamas){
        const kamaWind = this.atkT > this.hitF + 4;
        const kamaRecover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          if(kamaWind){
            fHandX = rightShoulderX + 4; fHandY = headY - 4;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY - 2;
            bHandX = leftShoulderX + 4; bHandY = shoulderY + 4;
            bElbowX = leftShoulderX - 4; bElbowY = shoulderY + 10;
            leanX -= 4;
          } else if(kamaRecover){
            fHandX = rightShoulderX + 18; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 10; fElbowY = shoulderY + 6;
            bHandX = leftShoulderX + 10; bHandY = shoulderY + 16;
            bElbowX = leftShoulderX + 2; bElbowY = shoulderY + 14;
            leanX += 6;
          } else {
            fHandX = ext + 2; fHandY = shoulderY - 10;
            fElbowX = rightShoulderX + ext*0.42; fElbowY = shoulderY - 2;
            bHandX = ext - 18; bHandY = shoulderY + 10;
            bElbowX = leftShoulderX + ext*0.18; bElbowY = shoulderY + 12;
            leanX += 14;
          }
        } else if(this.combo===2){
          if(kamaWind){
            fHandX = rightShoulderX - 8; fHandY = shoulderY + 14;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY + 14;
            bHandX = leftShoulderX + 8; bHandY = headY - 8;
            bElbowX = leftShoulderX - 6; bElbowY = shoulderY + 2;
            leanX -= 8;
          } else if(kamaRecover){
            fHandX = rightShoulderX + 14; fHandY = headY - 8;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY;
            bHandX = leftShoulderX + 10; bHandY = shoulderY + 8;
            bElbowX = leftShoulderX + 2; bElbowY = shoulderY + 10;
            leanX += 4;
          } else {
            fHandX = ext - 4; fHandY = shoulderY + 4;
            fElbowX = rightShoulderX + ext*0.34; fElbowY = shoulderY + 10;
            bHandX = ext - 26; bHandY = headY - 10;
            bElbowX = leftShoulderX + ext*0.08; bElbowY = shoulderY + 4;
            leanX += 12;
          }
        } else if(this.combo===3){
          if(kamaWind){
            fHandX = rightShoulderX - 2; fHandY = waistY + 18;
            fElbowX = rightShoulderX + 2; fElbowY = waistY + 8;
            bHandX = leftShoulderX - 4; bHandY = waistY + 12;
            bElbowX = leftShoulderX - 8; bElbowY = shoulderY + 16;
            leanX -= 10;
          } else if(kamaRecover){
            fHandX = rightShoulderX + 10; fHandY = headY - 18;
            fElbowX = rightShoulderX + 6; fElbowY = headY - 2;
            bHandX = leftShoulderX + 6; bHandY = headY - 12;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 4;
            leanX += 3;
          } else {
            fHandX = ext - 6; fHandY = headY - 24;
            fElbowX = rightShoulderX + ext*0.18; fElbowY = headY - 4;
            bHandX = ext - 30; bHandY = headY - 14;
            bElbowX = leftShoulderX + ext*0.02; bElbowY = shoulderY + 2;
            leanX += 10;
          }
        } else {
          if(kamaWind){
            fHandX = rightShoulderX + 2; fHandY = headY - 20;
            fElbowX = rightShoulderX; fElbowY = headY - 4;
            bHandX = leftShoulderX + 4; bHandY = headY - 14;
            bElbowX = leftShoulderX - 6; bElbowY = shoulderY + 2;
            leanX -= 2;
          } else if(kamaRecover){
            fHandX = ext + 4; fHandY = shoulderY + 12;
            fElbowX = rightShoulderX + ext*0.34; fElbowY = shoulderY + 10;
            bHandX = ext - 20; bHandY = shoulderY + 16;
            bElbowX = leftShoulderX + ext*0.1; bElbowY = shoulderY + 14;
            leanX += 14;
          } else {
            fHandX = ext + 2; fHandY = headY - 4;
            fElbowX = rightShoulderX + ext*0.28; fElbowY = shoulderY - 4;
            bHandX = ext - 24; bHandY = headY - 12;
            bElbowX = leftShoulderX + ext*0.06; bElbowY = shoulderY + 4;
            leanX += 12;
          }
        }
      } else if(isKatana){
        const kataWind = this.atkT > this.hitF + 4;
        const kataRecover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          // Jodan ready -> descending draw cut
          if(kataWind){
            fHandX = rightShoulderX + 6; fHandY = headY - 18;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY - 6;
            bHandX = fHandX - 20; bHandY = fHandY + 12;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 2;
            leanX -= 2;
          } else if(kataRecover){
            fHandX = rightShoulderX + 26; fHandY = shoulderY + 18;
            fElbowX = rightShoulderX + 15; fElbowY = shoulderY + 8;
            bHandX = fHandX - 18; bHandY = fHandY + 10;
            bElbowX = leftShoulderX + 8; bElbowY = shoulderY + 12;
            leanX += 8;
          } else {
            fHandX = rightShoulderX + 18; fHandY = shoulderY - 2;
            fElbowX = rightShoulderX + 10; fElbowY = shoulderY + 2;
            bHandX = fHandX - 18; bHandY = fHandY + 12;
            bElbowX = leftShoulderX + 4; bElbowY = shoulderY + 8;
            leanX += 10;
          }
        } else if(this.combo===2){
          // Horizontal return cut
          if(kataWind){
            fHandX = rightShoulderX - 4; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 4; fElbowY = shoulderY + 14;
            bHandX = fHandX - 20; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 6; bElbowY = shoulderY + 16;
            leanX -= 8;
          } else if(kataRecover){
            fHandX = rightShoulderX + 10; fHandY = headY - 10;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY - 2;
            bHandX = fHandX - 18; bHandY = fHandY + 10;
            bElbowX = leftShoulderX; bElbowY = shoulderY + 2;
            leanX += 3;
          } else {
            fHandX = ext + 8; fHandY = shoulderY - 6;
            fElbowX = rightShoulderX + ext * 0.42; fElbowY = shoulderY + 2;
            bHandX = fHandX - 20; bHandY = fHandY + 8;
            bElbowX = leftShoulderX + ext * 0.16; bElbowY = shoulderY + 10;
            leanX += 18;
          }
        } else if(this.combo===3){
          // Rising cut from low guard
          if(kataWind){
            fHandX = rightShoulderX - 4; fHandY = waistY + 20;
            fElbowX = rightShoulderX + 2; fElbowY = waistY + 10;
            bHandX = fHandX - 18; bHandY = fHandY - 2;
            bElbowX = leftShoulderX - 8; bElbowY = shoulderY + 18;
            leanX -= 12;
          } else if(kataRecover){
            fHandX = rightShoulderX + 12; fHandY = headY - 18;
            fElbowX = rightShoulderX + 8; fElbowY = headY - 2;
            bHandX = fHandX - 16; bHandY = fHandY + 12;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 4;
            leanX += 4;
          } else {
            fHandX = ext * 0.74; fHandY = headY - 36;
            fElbowX = rightShoulderX + 12; fElbowY = headY - 10;
            bHandX = fHandX - 18; bHandY = fHandY + 14;
            bElbowX = leftShoulderX + 6; bElbowY = shoulderY + 4;
            leanX += 14;
          }
        } else {
          // Overhead finisher
          if(kataWind){
            fHandX = rightShoulderX + 4; fHandY = headY - 28;
            fElbowX = rightShoulderX; fElbowY = headY - 8;
            bHandX = fHandX - 18; bHandY = fHandY + 14;
            bElbowX = leftShoulderX - 6; bElbowY = shoulderY - 2;
            leanX -= 4;
          } else if(kataRecover){
            fHandX = ext + 4; fHandY = shoulderY + 10;
            fElbowX = rightShoulderX + ext * 0.45; fElbowY = shoulderY + 8;
            bHandX = fHandX - 16; bHandY = fHandY + 10;
            bElbowX = leftShoulderX + ext * 0.1; bElbowY = shoulderY + 14;
            leanX += 18;
          } else {
            fHandX = rightShoulderX + 12; fHandY = headY - 34;
            fElbowX = rightShoulderX + 8; fElbowY = headY - 10;
            bHandX = fHandX - 18; bHandY = fHandY + 14;
            bElbowX = leftShoulderX; bElbowY = shoulderY + 2;
            leanX += 6;
          }
        }
      } else if(isSpear){
        const spearWind = this.atkT > this.hitF + 4;
        const spearRecover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          // High line straight thrust
          if(spearWind){
            fHandX = rightShoulderX - 2; fHandY = headY - 18;
            fElbowX = rightShoulderX + 4; fElbowY = shoulderY - 8;
            bHandX = fHandX - 34; bHandY = fHandY + 10;
            bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 6;
            leanX -= 6;
          } else if(spearRecover){
            fHandX = rightShoulderX + 18; fHandY = headY - 8;
            fElbowX = rightShoulderX + 10; fElbowY = shoulderY;
            bHandX = fHandX - 34; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 8;
            leanX += 4;
          } else {
            fHandX = ext + 24; fHandY = headY - 8;
            fElbowX = rightShoulderX + ext*0.42; fElbowY = shoulderY - 2;
            bHandX = fHandX - 38; bHandY = fHandY + 6;
            bElbowX = leftShoulderX + ext*0.06; bElbowY = shoulderY + 6;
            leanX += 18;
          }
        } else if(this.combo===2){
          // Flat horizontal sweep
          if(spearWind){
            fHandX = rightShoulderX - 10; fHandY = headY - 4;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY + 8;
            bHandX = fHandX - 38; bHandY = fHandY + 2;
            bElbowX = leftShoulderX - 14; bElbowY = shoulderY + 12;
            leanX -= 10;
          } else if(spearRecover){
            fHandX = rightShoulderX + 12; fHandY = headY - 8;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY;
            bHandX = fHandX - 36; bHandY = fHandY + 6;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 8;
            leanX += 4;
          } else {
            fHandX = ext + 18; fHandY = headY - 6;
            fElbowX = rightShoulderX + ext*0.38; fElbowY = shoulderY + 2;
            bHandX = fHandX - 42; bHandY = fHandY + 4;
            bElbowX = leftShoulderX + ext*0.04; bElbowY = shoulderY + 8;
            leanX += 16;
          }
        } else if(this.combo===3){
          // Driving body-line thrust
          if(spearWind){
            fHandX = rightShoulderX - 6; fHandY = shoulderY + 10;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY + 18;
            bHandX = fHandX - 34; bHandY = fHandY + 4;
            bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 16;
            leanX -= 8;
          } else if(spearRecover){
            fHandX = rightShoulderX + 10; fHandY = headY - 6;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 2;
            bHandX = fHandX - 34; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 10;
            leanX += 2;
          } else {
            fHandX = ext + 26; fHandY = shoulderY - 2;
            fElbowX = rightShoulderX + ext*0.44; fElbowY = shoulderY + 4;
            bHandX = fHandX - 38; bHandY = fHandY + 6;
            bElbowX = leftShoulderX + ext*0.08; bElbowY = shoulderY + 10;
            leanX += 20;
          }
        } else {
          // High guard overhead finish into straight line
          if(spearWind){
            fHandX = rightShoulderX + 2; fHandY = headY - 30;
            fElbowX = rightShoulderX; fElbowY = headY - 10;
            bHandX = fHandX - 32; bHandY = fHandY + 14;
            bElbowX = leftShoulderX - 8; bElbowY = shoulderY;
            leanX -= 2;
          } else if(spearRecover){
            fHandX = rightShoulderX + 14; fHandY = headY - 10;
            fElbowX = rightShoulderX + 8; fElbowY = shoulderY;
            bHandX = fHandX - 34; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 8;
            leanX += 3;
          } else {
            fHandX = ext + 22; fHandY = headY - 10;
            fElbowX = rightShoulderX + ext*0.4; fElbowY = shoulderY - 4;
            bHandX = fHandX - 36; bHandY = fHandY + 6;
            bElbowX = leftShoulderX + ext*0.05; bElbowY = shoulderY + 6;
            leanX += 18;
          }
        }
      } else if(isStaff){
        const staffWind = this.atkT > this.hitF + 4;
        const staffRecover = this.atkT < this.hitF - 3;
        if(this.combo===1){
          // Forward temple sweep
          if(staffWind){
            fHandX = rightShoulderX + 6; fHandY = headY - 14;
            fElbowX = rightShoulderX + 2; fElbowY = shoulderY - 2;
            bHandX = fHandX - 34; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 8;
            leanX -= 6;
          } else if(staffRecover){
            fHandX = rightShoulderX + 26; fHandY = shoulderY + 8;
            fElbowX = rightShoulderX + 14; fElbowY = shoulderY + 10;
            bHandX = fHandX - 38; bHandY = fHandY + 2;
            bElbowX = leftShoulderX + 2; bElbowY = shoulderY + 12;
            leanX += 12;
          } else {
            fHandX = ext + 18; fHandY = headY - 8;
            fElbowX = rightShoulderX + ext*0.38; fElbowY = shoulderY + 2;
            bHandX = fHandX - 40; bHandY = fHandY + 4;
            bElbowX = leftShoulderX + ext*0.08; bElbowY = shoulderY + 8;
            leanX += 18;
          }
        } else if(this.combo===2){
          // Returning horizontal sweep
          if(staffWind){
            fHandX = rightShoulderX - 8; fHandY = shoulderY + 2;
            fElbowX = rightShoulderX + 4; fElbowY = shoulderY + 14;
            bHandX = fHandX - 36; bHandY = fHandY + 4;
            bElbowX = leftShoulderX - 12; bElbowY = shoulderY + 14;
            leanX -= 12;
          } else if(staffRecover){
            fHandX = rightShoulderX + 10; fHandY = headY - 10;
            fElbowX = rightShoulderX + 6; fElbowY = shoulderY - 2;
            bHandX = fHandX - 34; bHandY = fHandY + 8;
            bElbowX = leftShoulderX - 4; bElbowY = shoulderY + 6;
            leanX += 4;
          } else {
            fHandX = ext + 12; fHandY = shoulderY - 2;
            fElbowX = rightShoulderX + ext*0.4; fElbowY = shoulderY + 6;
            bHandX = fHandX - 42; bHandY = fHandY + 2;
            bElbowX = leftShoulderX + ext*0.05; bElbowY = shoulderY + 10;
            leanX += 22;
          }
        } else if(this.combo===3){
          // Rising pole lift
          if(staffWind){
            fHandX = rightShoulderX - 6; fHandY = waistY + 18;
            fElbowX = rightShoulderX + 2; fElbowY = waistY + 8;
            bHandX = fHandX - 32; bHandY = fHandY + 6;
            bElbowX = leftShoulderX - 8; bElbowY = shoulderY + 20;
            leanX -= 12;
          } else if(staffRecover){
            fHandX = rightShoulderX + 12; fHandY = headY - 18;
            fElbowX = rightShoulderX + 8; fElbowY = headY - 4;
            bHandX = fHandX - 30; bHandY = fHandY + 10;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 4;
            leanX += 6;
          } else {
            fHandX = ext*0.72; fHandY = headY - 34;
            fElbowX = rightShoulderX + 12; fElbowY = headY - 8;
            bHandX = fHandX - 34; bHandY = fHandY + 12;
            bElbowX = leftShoulderX + 4; bElbowY = shoulderY + 4;
            leanX += 16;
          }
        } else {
          // Overhead smash
          if(staffWind){
            fHandX = rightShoulderX + 6; fHandY = headY - 32;
            fElbowX = rightShoulderX + 2; fElbowY = headY - 10;
            bHandX = fHandX - 34; bHandY = fHandY + 12;
            bElbowX = leftShoulderX - 8; bElbowY = shoulderY - 2;
            leanX -= 5;
          } else if(staffRecover){
            fHandX = ext + 8; fHandY = shoulderY + 12;
            fElbowX = rightShoulderX + ext*0.44; fElbowY = shoulderY + 10;
            bHandX = fHandX - 34; bHandY = fHandY + 4;
            bElbowX = leftShoulderX + ext*0.08; bElbowY = shoulderY + 12;
            leanX += 20;
          } else {
            fHandX = rightShoulderX + 14; fHandY = headY - 36;
            fElbowX = rightShoulderX + 10; fElbowY = headY - 10;
            bHandX = fHandX - 34; bHandY = fHandY + 12;
            bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 2;
            leanX += 8;
          }
        }
      } else if(isNunchaku){
        if(this.combo===1){ fHandX=ext+10;fHandY=headY+10;fElbowX=rightShoulderX+ext*0.5;fElbowY=shoulderY+15;bHandX=leftShoulderX;bHandY=shoulderY-10;bElbowX=leftShoulderX-10;bElbowY=shoulderY+5;leanX+=10;
        } else if(this.combo===2){ fHandX=rightShoulderX+25;fHandY=waistY+5;fElbowX=rightShoulderX+15;fElbowY=shoulderY+10;bHandX=ext+15;bHandY=headY+5;bElbowX=leftShoulderX+ext*0.6;bElbowY=shoulderY-5;leanX+=15;
        } else if(this.combo===3){ fHandX=ext-10;fHandY=headY-40;fElbowX=rightShoulderX;fElbowY=headY-10;bHandX=leftShoulderX-15;bHandY=waistY;bElbowX=leftShoulderX-25;bElbowY=shoulderY;leanX+=5;
        } else if(this.combo>=4){ fHandX=ext+25;fHandY=shoulderY;fElbowX=rightShoulderX+ext*0.7;fElbowY=headY;bHandX=ext+10;bHandY=headY-20;bElbowX=leftShoulderX+ext*0.5;bElbowY=shoulderY-10;leanX+=25;
        } else { fHandX=rightShoulderX+10;fHandY=waistY+10;fElbowX=rightShoulderX+5;fElbowY=shoulderY+15;bHandX=leftShoulderX-15;bHandY=waistY+5;bElbowX=leftShoulderX-20;bElbowY=shoulderY+10; }
      } else if(isSai){
        // ── SAI / NEEDLE WEAPON MOVES (Extremely fast, piercing stabs) ──
        if(this.combo===1){
          // QUICK DOUBLE POKE — forward thrust with both prongs
          fHandX = ext + 18; fHandY = headY + 5;
          fElbowX = rightShoulderX + ext * 0.5; fElbowY = shoulderY + 5;
          bHandX = ext - 10; bHandY = shoulderY - 10;
          bElbowX = leftShoulderX + 10; bElbowY = shoulderY + 5;
          leanX += 12;
        } else if(this.combo===2){
          // CROSS STAB — sweeping stab across
          fHandX = rightShoulderX + 15; fHandY = waistY + 10;
          fElbowX = rightShoulderX + 25; fElbowY = shoulderY + 15;
          bHandX = ext + 20; bHandY = shoulderY + 10;
          bElbowX = leftShoulderX + ext * 0.6; bElbowY = shoulderY + 5;
          leanX += 15;
        } else if(this.combo===3){
          // SPINNING PIERCE — back hand stabs deep
          fHandX = -10; fHandY = shoulderY - 5;
          fElbowX = rightShoulderX - 10; fElbowY = shoulderY + 10;
          bHandX = ext + 28; bHandY = shoulderY;
          bElbowX = leftShoulderX + ext * 0.5; bElbowY = shoulderY + 8;
          leanX += 20;
        } else {
          // LUNGING NEEDLE — fully extended leap stab
          fHandX = ext + 35; fHandY = shoulderY - 5;
          fElbowX = rightShoulderX + ext * 0.7; fElbowY = shoulderY;
          bHandX = -20; bHandY = shoulderY + 15;
          bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 20;
          leanX += 30;
        }
      } else if(isStick){
        // ── SF2 BATONS STYLE — fast, head-level lunges and spinning slashes ──
        if(this.combo===1){
          // STRAIGHT LUNGE — fast forward head strike (SF2 batons slash)
          fHandX = ext + 15; fHandY = headY + 5;
          fElbowX = rightShoulderX + ext * 0.6; fElbowY = shoulderY;
          bHandX = leftShoulderX; bHandY = shoulderY - 25; // cocked high
          bElbowX = leftShoulderX - 10; bElbowY = shoulderY - 10;
          leanX += 15;
        } else if(this.combo===2){
          // DOUBLE SLASH — back hand follows up directly to the head
          fHandX = rightShoulderX + 10; fHandY = headY - 10; // pulled back
          fElbowX = rightShoulderX + 20; fElbowY = shoulderY + 15;
          bHandX = ext + 18; bHandY = headY + 8; // back hand strikes head
          bElbowX = leftShoulderX + ext * 0.5; bElbowY = shoulderY;
          leanX += 20;
        } else if(this.combo===3){
          // UPPER SLASH — wide upward arc from low to high
          if(this.atkT > this.hitF + 4) {
            fHandX = rightShoulderX - 15; fHandY = waistY + 30;
            fElbowX = rightShoulderX - 5; fElbowY = waistY + 15;
            leanX -= 10;
          } else {
            fHandX = ext * 0.7; fHandY = headY - 45;
            fElbowX = rightShoulderX + 10; fElbowY = headY - 10;
            leanX += 10;
          }
          bHandX = leftShoulderX - 10; bHandY = waistY - 5;
          bElbowX = leftShoulderX - 15; bElbowY = shoulderY + 10;
        } else {
          // SPINNING SLASH — both sticks spread wide in a rotating horizontal sweep
          fHandX = ext + 20; fHandY = shoulderY - 10;
          fElbowX = rightShoulderX + ext * 0.5; fElbowY = shoulderY;
          bHandX = -30; bHandY = shoulderY - 10; // sweeping backwards
          bElbowX = leftShoulderX - 15; bElbowY = shoulderY;
          leanX += 25;
        }
      } else if(isDagger){
        // ── DAGGER DUAL-WIELD MOVES ──
        if(this.combo===1){
          fHandX = ext + 12; fHandY = shoulderY - 2; fElbowX = rightShoulderX + ext * 0.5; fElbowY = shoulderY + 4;
          bHandX = leftShoulderX + 8; bHandY = shoulderY - 8; bElbowX = leftShoulderX - 4; bElbowY = shoulderY + 8; leanX += 8;
        } else if(this.combo===2){
          fHandX = rightShoulderX + 6; fHandY = headY - 5; fElbowX = rightShoulderX + 14; fElbowY = shoulderY + 8;
          bHandX = ext + 18; bHandY = shoulderY + 12; bElbowX = leftShoulderX + ext * 0.4; bElbowY = shoulderY + 6; leanX += 12;
        } else if(this.combo===3){
          fHandX = ext; fHandY = shoulderY - 28; fElbowX = rightShoulderX + ext * 0.5; fElbowY = shoulderY - 10;
          bHandX = ext; bHandY = shoulderY + 22; bElbowX = leftShoulderX + ext * 0.35; bElbowY = shoulderY + 10; leanX += 18;
        } else {
          fHandX = ext + 22; fHandY = shoulderY - 5; fElbowX = rightShoulderX + ext * 0.55; fElbowY = shoulderY;
          bHandX = ext + 12; bHandY = shoulderY + 6; bElbowX = leftShoulderX + ext * 0.4; bElbowY = shoulderY + 8; leanX += 25;
        }
      } else if(this.combo===1){
          // FAST JAB (Front hand extends straight out)
          fHandX = ext; fHandY = shoulderY - 5; 
          fElbowX = rightShoulderX + (ext/2); fElbowY = shoulderY + 5;
          bHandX = leftShoulderX - 5; bHandY = shoulderY - 15; 
          bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 10;
          if(isGlove) leanX += 10;
      } else if(this.combo===2){
          // CROSS / HOOK (Back hand extends far, front hand guards face)
          fHandX = rightShoulderX + 5; fHandY = headY + 5;
          fElbowX = rightShoulderX + 15; fElbowY = shoulderY + 15;
          bHandX = ext + 10; bHandY = shoulderY - 5;
          bElbowX = leftShoulderX + (ext/2); bElbowY = shoulderY + 10;
          if(isGlove) leanX += 15;
      } else if(this.combo===3){
          // UPPERCUT (Front hand drops low then explodes up)
          if(this.atkT > this.hitF + 4) {
             // Winding up - drop low
             fHandX = rightShoulderX - 10; fHandY = waistY + 20;
             fElbowX = rightShoulderX; fElbowY = waistY + 10;
             leanX -= 15;
          } else {
             // Explode up
             fHandX = ext * 0.8; fHandY = headY - 40; 
             fElbowX = rightShoulderX + 15; fElbowY = shoulderY;
             leanX += 20;
          }
          bHandX = leftShoulderX - 15; bHandY = shoulderY - 5;
          bElbowX = leftShoulderX - 20; bElbowY = shoulderY + 10;
      } else {
          bHandX=-25+tk; bHandY=waistY-5;
          fHandX=ext; fHandY=waistY+5;
          bElbowX=leftShoulderX-15; bElbowY=shoulderY+10;
          fElbowX=rightShoulderX+(fHandX-rightShoulderX)/2; fElbowY=shoulderY+(fHandY-shoulderY)/2-10;
      }
    } else {
      const idleKatana = (this.isP && weapon==='katana') || (!this.isP && this.eWeapon==='katana');
      const idleStaff = (this.isP && weapon==='staff') || (!this.isP && this.eWeapon==='staff');
      const idleSpear = (this.isP && weapon==='spear') || (!this.isP && this.eWeapon==='spear');
      const idleKamas = (this.isP && weapon==='knives') || (!this.isP && this.eWeapon==='knives');
      const idleHammer = (this.isP && weapon==='hammer') || (!this.isP && this.eWeapon==='hammer');
      const idleScythe = (this.isP && weapon==='scythe') || (!this.isP && this.eWeapon==='scythe');
      const idleTwinKatana = (this.isP && weapon==='dual') || (!this.isP && this.eWeapon==='dual');
      const idleLynxClaws = (this.isP && weapon==='lynx_claws') || (!this.isP && this.eWeapon==='lynx_claws');
      const idleBloodReaper = (this.isP && weapon==='blood_reaper') || (!this.isP && this.eWeapon==='blood_reaper');
      const idleCompositeSword = (this.isP && weapon==='composite_sword') || (!this.isP && this.eWeapon==='composite_sword');
      const idleAk47 = (this.isP && weapon==='ak47') || (!this.isP && this.eWeapon==='ak47');
      if(idleSpear){
        fHandX = rightShoulderX + 2; fHandY = headY - 20;
        fElbowX = rightShoulderX + 1; fElbowY = shoulderY - 6;
        bHandX = fHandX - 36; bHandY = fHandY + 12;
        bElbowX = leftShoulderX - 10; bElbowY = shoulderY + 6;
      } else if(idleKatana){
        fHandX = rightShoulderX + 4; fHandY = headY - 10;
        fElbowX = rightShoulderX + 4; fElbowY = shoulderY - 2;
        bHandX = fHandX - 18; bHandY = fHandY + 14;
        bElbowX = leftShoulderX - 2; bElbowY = shoulderY + 8;
      } else if(idleStaff){
        fHandX = rightShoulderX + 6; fHandY = headY - 6;
        fElbowX = rightShoulderX + 3; fElbowY = shoulderY + 2;
        bHandX = fHandX - 34; bHandY = fHandY + 8;
        bElbowX = leftShoulderX - 8; bElbowY = shoulderY + 10;
      } else if(idleKamas){
        /* Dedicated dual-kama idle: closer to the torso, one in each hand. */
        fHandX = rightShoulderX + 2;  fHandY = waistY - 8;
        fElbowX = rightShoulderX + 3; fElbowY = shoulderY + 8;
        bHandX = leftShoulderX + 2;   bHandY = waistY - 8;
        bElbowX = leftShoulderX - 3;  bElbowY = shoulderY + 8;
      } else if(idleHammer){
        /* Doom Hammer idle: both hands on the shaft, resting up on the shoulder. */
        fHandX = rightShoulderX + 2;  fHandY = headY - 14;
        fElbowX = rightShoulderX + 5; fElbowY = shoulderY - 2;
        bHandX = leftShoulderX - 14;  bHandY = headY + 2;
        bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 10;
      } else if(idleScythe){
        /* Shadow Scythe idle: two-hand shoulder carry, blade riding behind the upper back. */
        fHandX = rightShoulderX + 4;  fHandY = headY - 16;
        fElbowX = rightShoulderX + 6; fElbowY = shoulderY - 2;
        bHandX = leftShoulderX - 16;  bHandY = headY + 2;
        bElbowX = leftShoulderX - 8;  bElbowY = shoulderY + 10;
      } else if(idleTwinKatana){
        /* Twin Katana idle: one blade in each hand, raised guard, no pasted-on base pose. */
        fHandX = rightShoulderX + 4;  fHandY = waistY - 12;
        fElbowX = rightShoulderX + 4; fElbowY = shoulderY + 8;
        bHandX = leftShoulderX;       bHandY = waistY - 10;
        bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 8;
      } else if(idleLynxClaws){
        fHandX = rightShoulderX + 8;  fHandY = waistY - 8;
        fElbowX = rightShoulderX + 6; fElbowY = shoulderY + 8;
        bHandX = leftShoulderX - 2;   bHandY = waistY - 6;
        bElbowX = leftShoulderX - 4;  bElbowY = shoulderY + 8;
      } else if(idleBloodReaper){
        // Kusarigama idle: sickle hand high and forward, chain hand low and ready.
        fHandX = rightShoulderX + 12;  fHandY = shoulderY - 6;
        fElbowX = rightShoulderX + 7;  fElbowY = shoulderY + 4;
        bHandX = leftShoulderX;        bHandY = waistY + 2;
        bElbowX = leftShoulderX - 4;   bElbowY = shoulderY + 10;
      } else if(idleCompositeSword){
        // Composite Sword idle: joined blade held upward, off-hand near torso.
        fHandX = rightShoulderX + 8;  fHandY = shoulderY - 10;
        fElbowX = rightShoulderX + 5; fElbowY = shoulderY + 2;
        bHandX = leftShoulderX;       bHandY = waistY;
        bElbowX = leftShoulderX - 2;  bElbowY = shoulderY + 8;
      } else if(idleAk47){
        // AK-47 idle: shouldered rifle with front support hand
        fHandX = rightShoulderX + 18; fHandY = shoulderY - 2;
        fElbowX = rightShoulderX + 10; fElbowY = shoulderY + 4;
        bHandX = leftShoulderX - 8;   bHandY = shoulderY + 4;
        bElbowX = leftShoulderX - 6;  bElbowY = shoulderY + 8;
      } else {
        fHandX=20+tk;fHandY=waistY-10;bHandX=-12+tk;bHandY=waistY+5;
        fElbowX=rightShoulderX+8;fElbowY=shoulderY+15;
        bElbowX=leftShoulderX-8;bElbowY=shoulderY+15;
      }
    }

    let drawWrap=(ex,ey,hx,hy)=>{
      c.lineWidth=aW+1;c.strokeStyle=wrapCol;
      let dx=hx-ex,dy=hy-ey,len=Math.sqrt(dx*dx+dy*dy);
      if(len<5)return;
      let uX=dx/len,uY=dy/len;
      c.beginPath();c.moveTo(hx-uX*3,hy-uY*3);c.lineTo(hx-uX*12,hy-uY*12);c.stroke();
    };
    let drawAnkleWrap=(kx,ky,fx,fy)=>{
      c.lineWidth=lW+1;c.strokeStyle=wrapCol;
      let dx=fx-kx,dy=fy-ky,len=Math.sqrt(dx*dx+dy*dy);
      if(len<5)return;
      let uX=dx/len,uY=dy/len;
      c.beginPath();c.moveTo(fx-uX*2,fy-uY*2);c.lineTo(fx-uX*12,fy-uY*12);c.stroke();
    };
    let drawGlove = (hx, hy, ex, ey) => {
        const isGlove = (this.isP && weapon==='boxing_gloves') || (!this.isP && this.eWeapon==='boxing_gloves');
        if(!isGlove) return;
        c.save();
        c.translate(hx, hy);
        c.rotate(Math.atan2(hy-ey, hx-ex));

        // Glove visual: thick red boxing glove
        c.fillStyle = '#b30000'; // Dark red
        c.strokeStyle = '#590000'; // Even darker red outline
        c.lineWidth = 2;

        c.beginPath();
        c.roundRect(-6, -12, 22, 24, 8);
        c.fill(); c.stroke();

        // Glove cuff
        c.fillStyle = '#1a1a1a'; // Dark cuff
        c.fillRect(-10, -13, 8, 26);

        // Thumb bump
        c.fillStyle = '#b30000';
        c.beginPath();
        c.arc(6, 12, 7, 0, Math.PI*2);
        c.fill(); c.stroke();

        // Highlight/shine
        c.fillStyle = 'rgba(255,100,100,0.3)';
        c.beginPath();
        c.ellipse(4, -6, 8, 4, 0, 0, Math.PI*2);
        c.fill();

        c.restore();
    };


    // Scarf tails (player)
    if(this.isP&&!ghost){
      const scarfCol=this.raging?'#ffcc00':accentCol;
      c.strokeStyle=scarfCol;c.lineWidth=5;c.shadowBlur=this.raging?10:3;c.shadowColor=scarfCol;
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-15+wind,headY+bob,-30+wind+tailBob,headY+10+bob);c.stroke();
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-10+wind,headY+5+bob,-20+wind-tailBob,headY+15+bob);c.stroke();
      c.shadowBlur=0;
    }
    if(this.type===9&&!ghost){
      c.strokeStyle='#9900dd';c.lineWidth=5;c.shadowBlur=8;c.shadowColor='#9900dd';
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-15+wind,headY+bob,-30+wind+tailBob,headY+10+bob);c.stroke();
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-10+wind,headY+5+bob,-20+wind-tailBob,headY+15+bob);c.stroke();
      c.shadowBlur=0;
    }

    // Back arm
    c.lineWidth=aW+4;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(bElbowX,bElbowY);c.stroke();
    c.lineWidth=aW;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(bElbowX,bElbowY);c.lineTo(bHandX,bHandY);c.stroke();
    c.beginPath();c.arc(bHandX,bHandY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawWrap(bElbowX,bElbowY,bHandX,bHandY);
    drawGlove(bHandX, bHandY, bElbowX, bElbowY);

    // Back leg
    c.lineWidth=lW+8;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(-wW/2,waistY);c.lineTo(bKneeX,bKneeY);c.stroke();
    c.lineWidth=lW-2;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(bKneeX,bKneeY);c.lineTo(bFootX,bFootY);c.stroke();
    c.beginPath();c.arc(bFootX,bFootY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawAnkleWrap(bKneeX,bKneeY,bFootX,bFootY);

    // Torso
    c.fillStyle=clothCol;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(rightShoulderX,shoulderY);
    c.lineTo(wW/2,waistY);c.lineTo(-wW/2,waistY);c.fill();
    c.lineWidth=aW;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(rightShoulderX,shoulderY);c.stroke();
    c.beginPath();c.moveTo(-wW/2,waistY);c.lineTo(wW/2,waistY);c.stroke();
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(-wW/2,waistY);c.stroke();
    c.beginPath();c.moveTo(rightShoulderX,shoulderY);c.lineTo(wW/2,waistY);c.stroke();
    c.fillStyle=bodyCol;
    c.beginPath();c.moveTo(-6,shoulderY-2);c.lineTo(6,shoulderY-2);c.lineTo(0,waistY-12);c.fill();

    // Armor plating
    if(this.isP&&armor==='heavyarmor'){
      c.strokeStyle='#555';c.lineWidth=10;
      c.beginPath();c.moveTo(leftShoulderX+4,shoulderY+2);c.lineTo(0,waistY-10);c.lineTo(rightShoulderX-4,shoulderY+2);c.stroke();
      c.lineWidth=5;c.beginPath();c.moveTo(-8,waistY-3);c.lineTo(8,waistY-3);c.stroke();
    }
    if(this.isP&&armor==='lightarmor'){
      c.strokeStyle='rgba(170,170,170,0.7)';c.lineWidth=3;
      c.beginPath();c.moveTo(-8,shoulderY+6);c.lineTo(8,shoulderY+6);c.stroke();
    }
    if(this.isP&&armor==='voidarmor'){
      // Void shroud — dark plates with glow
      c.strokeStyle='rgba(80,80,140,0.8)';c.lineWidth=6;
      c.shadowBlur=8;c.shadowColor='rgba(100,80,255,0.3)';
      c.beginPath();c.moveTo(leftShoulderX+2,shoulderY+2);c.lineTo(-2,waistY-8);c.stroke();
      c.beginPath();c.moveTo(rightShoulderX-2,shoulderY+2);c.lineTo(2,waistY-8);c.stroke();
      c.lineWidth=4;c.beginPath();c.moveTo(-8,shoulderY-2);c.lineTo(8,shoulderY-2);c.stroke();
      c.shadowBlur=0;
    }

    // Belt
    let beltCol=this.raging?'#aa2200':'#111111';
    if(isBoss&&!this.raging)beltCol='#440000';
    if(this.type===9)beltCol='#9900dd';
    if(this.type===10)beltCol='#334455';
    c.fillStyle=beltCol;c.fillRect(-wW/2-4,waistY-4,wW+8,8);
    c.lineWidth=4;c.strokeStyle=beltCol;c.lineCap='round';
    c.beginPath();c.moveTo(-wW/2,waistY);c.quadraticCurveTo(-wW/2-10+wind,waistY+15,-wW/2-5+wind+tailBob,waistY+30);c.stroke();
    c.beginPath();c.moveTo(-wW/2+5,waistY);c.quadraticCurveTo(-wW/2-5+wind,waistY+12,-wW/2+wind-tailBob,waistY+25);c.stroke();

    // Head
    c.fillStyle=bodyCol;c.beginPath();c.arc(2,headY,hR,0,6.28);c.fill();
    if(this.isP&&!ghost){
      // Player headband
      c.strokeStyle=this.raging?'#ff4400':'#111111';c.lineWidth=4;
      c.shadowBlur=this.raging?10:4;c.shadowColor=c.strokeStyle;
      c.beginPath();c.moveTo(-hR+3,headY);c.lineTo(hR+2,headY-1);c.stroke();c.shadowBlur=0;
      // Player face - eyes (red eyes when raging)
      const eyeCol=this.raging?'#ff4400':'#cc2020';
      c.fillStyle=eyeCol;c.shadowBlur=this.raging?8:3;c.shadowColor=eyeCol;
      c.beginPath();c.arc(5,headY-2,this.raging?3.5:2.5,0,Math.PI*2);c.fill();
      c.shadowBlur=0;
      // Eye glint
      c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.arc(6,headY-3,1,0,Math.PI*2);c.fill();
      // Nose hint
      c.strokeStyle='rgba(80,0,0,0.4)';c.lineWidth=1.2;c.beginPath();c.moveTo(3,headY+1);c.lineTo(2,headY+4);c.stroke();
      // Jaw line
      c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=1;c.beginPath();c.arc(2,headY,hR-2,Math.PI*0.1,Math.PI*0.9);c.stroke();
      // Hair spikes on top (player's signature look)
      c.fillStyle=this.raging?'#ff8800':'#0a0a0a';
      c.shadowBlur=this.raging?6:0;c.shadowColor='#ff4400';
      for(let hs=0;hs<3;hs++){
        c.beginPath();
        const hsx=-hR+2+hs*5;
        c.moveTo(hsx,headY-hR+4);c.lineTo(hsx-3,headY-hR-6-hs*2);c.lineTo(hsx+4,headY-hR+2);c.fill();
      }
      c.shadowBlur=0;
    } else if(this.type===9&&!ghost){
      c.strokeStyle='#9900dd';c.lineWidth=4;c.shadowBlur=10;c.shadowColor='#9900dd';
      c.beginPath();c.moveTo(-hR+3,headY);c.lineTo(hR+2,headY-1);c.stroke();c.shadowBlur=0;
      // Elite purple eye
      c.fillStyle='#cc44ff';c.beginPath();c.arc(5,headY-2,3,0,Math.PI*2);c.fill();
    } else if(isBoss&&!ghost){
      c.shadowBlur=14;c.shadowColor='#ff0000';c.fillStyle='#dd0000';
      c.beginPath();c.arc(8,headY-2,3,0,6.28);c.fill();c.shadowBlur=0;
      // Boss second eye
      c.fillStyle='rgba(180,0,0,0.6)';c.beginPath();c.arc(-2,headY+1,2,0,Math.PI*2);c.fill();
    } else {
      // Generic enemy eye
      c.fillStyle='rgba(200,200,200,0.5)';c.beginPath();c.arc(5,headY-1,2,0,Math.PI*2);c.fill();
    }
    // Type 10 (Burden) — heavy chain around neck
    if(this.type===10&&!ghost){
      c.strokeStyle='#334455';c.lineWidth=3;
      c.beginPath();c.arc(2,headY+hR+4,6,0,Math.PI*2);c.stroke();
    }

    // Front leg
    c.lineWidth=lW+8;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(wW/2,waistY);c.lineTo(fKneeX,fKneeY);c.stroke();
    c.lineWidth=lW-2;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(fKneeX,fKneeY);c.lineTo(fFootX,fFootY);c.stroke();
    c.beginPath();c.arc(fFootX,fFootY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawAnkleWrap(fKneeX,fKneeY,fFootX,fFootY);

    // Front arm
    c.lineWidth=aW+4;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(rightShoulderX,shoulderY);c.lineTo(fElbowX,fElbowY);c.stroke();
    c.lineWidth=aW;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(fElbowX,fElbowY);c.lineTo(fHandX,fHandY);c.stroke();
    c.beginPath();c.arc(fHandX,fHandY,jR+2,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawWrap(fElbowX,fElbowY,fHandX,fHandY);
    drawGlove(fHandX, fHandY, fElbowX, fElbowY);

    // Weapon
    if(this.isP&&!ghost){
      const ang=Math.atan2(fHandY-fElbowY,fHandX-fElbowX);
      const T2=Date.now();
      const isAttacking=this.state==='atk';
      const atkProg=isAttacking?Math.max(0,Math.min(1,(this.hitF-this.atkT)/(this.hitF||1))):0;
      const preHit=isAttacking&&this.atkT>this.hitF; // winding up
      const onHit=isAttacking&&this.atkT<=this.hitF&&this.atkT>this.hitF-5; // impact frame
      const postHit=isAttacking&&this.atkT<=this.hitF-5; // follow-through

      c.save();c.translate(fHandX,fHandY);c.rotate(ang);

      // ══════════════════════════════════════════
      // 🥊 IRON KNUCKLES — spinning brass ring with impact shockwave
      // ══════════════════════════════════════════
      if(weapon==='knuckle'){
        c.restore();c.save();c.translate(fHandX,fHandY);
        const spinAng=(T2/120)%(Math.PI*2);
        const punchExt=onHit?8:0;
        c.translate(punchExt,0);
        // Outer ring glow
        if(isAttacking){
          const ringGlow=c.createRadialGradient(0,0,10,0,0,26);
          ringGlow.addColorStop(0,onHit?'rgba(255,220,80,0.5)':'rgba(255,160,0,0.15)');
          ringGlow.addColorStop(1,'transparent');
          c.fillStyle=ringGlow;c.beginPath();c.arc(0,0,26,0,Math.PI*2);c.fill();
        }
        // Knuckle duster body
        c.save();c.rotate(isAttacking?spinAng*0.3:0);
        const kbody=c.createLinearGradient(-15,-15,15,15);
        kbody.addColorStop(0,'#f0d060');kbody.addColorStop(0.35,'#c8931a');kbody.addColorStop(0.7,'#a07010');kbody.addColorStop(1,'#604808');
        c.fillStyle=kbody;
        // Hexagonal knuckle shape
        c.beginPath();
        for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/6;c.lineTo(Math.cos(a)*14,Math.sin(a)*14);}
        c.closePath();c.fill();
        c.strokeStyle='rgba(255,230,120,0.6)';c.lineWidth=1.5;c.stroke();
        // 4 raised knuckle studs
        for(let ki=0;ki<4;ki++){
          const ka=ki*Math.PI*0.5+Math.PI*0.125;
          const kx=Math.cos(ka)*8,ky=Math.sin(ka)*8;
          const sg=c.createRadialGradient(kx-1,ky-1,0,kx,ky,4.5);
          sg.addColorStop(0,'#ffffff');sg.addColorStop(0.4,'#dddddd');sg.addColorStop(1,'#888888');
          c.fillStyle=sg;c.beginPath();c.arc(kx,ky,4,0,Math.PI*2);c.fill();
          c.strokeStyle='#555';c.lineWidth=0.5;c.stroke();
        }
        // Center red gem
        const gem=c.createRadialGradient(-1,-1,0,0,0,5);
        gem.addColorStop(0,'#ff8888');gem.addColorStop(0.5,'#cc0022');gem.addColorStop(1,'#660011');
        c.fillStyle=gem;c.beginPath();c.arc(0,0,5,0,Math.PI*2);c.fill();
        c.strokeStyle='rgba(255,150,150,0.8)';c.lineWidth=1;c.stroke();
        c.restore();
        // Impact flash on hit
        if(onHit){
          c.shadowColor='#ff8800';c.shadowBlur=20;
          c.strokeStyle='rgba(255,200,50,0.9)';c.lineWidth=2;
          c.beginPath();
          for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/6;c.lineTo(Math.cos(a)*18,Math.sin(a)*18);}
          c.closePath();c.stroke();
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🗡️ VOID DAGGER DUAL-WIELD — both hands
      // ══════════════════════════════════════════
      } else if(weapon==='dagger'){
        const grip=c.createLinearGradient(-8,-5,8,5); grip.addColorStop(0,'#1a0e06');grip.addColorStop(0.5,'#2e1a0a');grip.addColorStop(1,'#120a04');
        c.fillStyle=grip; c.beginPath(); c.rect(-8,-5,18,10); c.fill();
        for(let _wi=0;_wi<5;_wi++){c.strokeStyle=`rgba(${60+_wi*8},${30+_wi*4},${10+_wi*2},0.9)`;c.lineWidth=1.5;c.beginPath();c.moveTo(-6+_wi*3.5,-5);c.lineTo(-5+_wi*3.5,5);c.stroke();}
        c.fillStyle='#8a6020';c.beginPath();c.arc(-8,0,5,0,Math.PI*2);c.fill();c.strokeStyle='#c8a040';c.lineWidth=1;c.stroke();
        const guard=c.createLinearGradient(8,-9,12,9); guard.addColorStop(0,'#999');guard.addColorStop(0.4,'#eee');guard.addColorStop(1,'#666');
        c.fillStyle=guard;c.beginPath();c.rect(8,-9,5,18);c.fill();c.strokeStyle='#333';c.lineWidth=0.8;c.stroke();
        c.fillStyle='#888';c.fillRect(12,-2.5,6,5);
        c.beginPath();c.moveTo(17,-3);c.lineTo(44,0);c.lineTo(17,3);c.closePath();
        const dbl=c.createLinearGradient(17,-3,17,3); dbl.addColorStop(0,'#c0c0d0');dbl.addColorStop(0.2,'#f0f0ff');dbl.addColorStop(0.5,'#ffffff');dbl.addColorStop(0.8,'#c0c0d0');dbl.addColorStop(1,'#808090');
        c.fillStyle=dbl;c.fill();
        c.strokeStyle='rgba(60,60,80,0.5)';c.lineWidth=1.2;c.beginPath();c.moveTo(19,-0.8);c.lineTo(42,0.2);c.stroke();
        c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=0.8;c.beginPath();c.moveTo(19,-2.2);c.lineTo(42,0);c.stroke();
        for(let _si=0;_si<3;_si++){c.strokeStyle='rgba(80,80,100,0.6)';c.lineWidth=0.8;c.beginPath();c.moveTo(20+_si*4,-2);c.lineTo(21+_si*4,0);c.moveTo(20+_si*4,2);c.lineTo(21+_si*4,0);c.stroke();}
        if(isAttacking){
          const alpha=onHit?0.95:0.5; c.shadowColor='#4488ff';c.shadowBlur=onHit?20:8;
          c.strokeStyle=`rgba(80,160,255,${alpha})`;c.lineWidth=onHit?3:1.5; c.beginPath();c.moveTo(17,0);c.lineTo(45,0);c.stroke();
          if(onHit){for(let lf=0;lf<4;lf++){c.strokeStyle=`rgba(150,200,255,${0.7+Math.random()*0.3})`;c.lineWidth=0.8;c.beginPath();let lx=25+lf*5,ly=0;c.moveTo(lx,ly);for(let ls=0;ls<3;ls++){lx+=4+Math.random()*4;ly+=(Math.random()-0.5)*6;c.lineTo(lx,ly);}c.stroke();}}
          c.shadowBlur=0;
        }
        c.restore(); c.save(); 
        const _bAng2 = Math.atan2(bHandY - bElbowY, bHandX - bElbowX);
        c.save(); c.translate(bHandX, bHandY); c.rotate(_bAng2 + 0.38);
        const grip2=c.createLinearGradient(-8,-5,8,5); grip2.addColorStop(0,'#120a04');grip2.addColorStop(0.5,'#2e1a0a');grip2.addColorStop(1,'#1a0e06');
        c.fillStyle=grip2;c.beginPath();c.rect(-8,-5,18,10);c.fill();
        for(let _bwi=0;_bwi<5;_bwi++){c.strokeStyle=`rgba(${55+_bwi*8},${28+_bwi*4},${8+_bwi*2},0.9)`;c.lineWidth=1.5;c.beginPath();c.moveTo(-6+_bwi*3.5,-5);c.lineTo(-5+_bwi*3.5,5);c.stroke();}
        c.fillStyle='#7a5010';c.beginPath();c.arc(-8,0,5,0,Math.PI*2);c.fill();c.strokeStyle='#b89030';c.lineWidth=1;c.stroke();
        const guard2=c.createLinearGradient(8,-9,12,9); guard2.addColorStop(0,'#888');guard2.addColorStop(0.4,'#ddd');guard2.addColorStop(1,'#555');
        c.fillStyle=guard2;c.beginPath();c.rect(8,-9,5,18);c.fill();c.strokeStyle='#222';c.lineWidth=0.8;c.stroke();
        c.fillStyle='#777';c.fillRect(12,-2.5,6,5);
        c.beginPath();c.moveTo(17,-3);c.lineTo(40,0);c.lineTo(17,3);c.closePath();
        const dbl2=c.createLinearGradient(17,-3,17,3); dbl2.addColorStop(0,'#b0b0c0');dbl2.addColorStop(0.3,'#e0e0f0');dbl2.addColorStop(0.5,'#f8f8ff');dbl2.addColorStop(0.8,'#b0b0c0');dbl2.addColorStop(1,'#707080');
        c.fillStyle=dbl2;c.fill();
        c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=0.8;c.beginPath();c.moveTo(19,-2.2);c.lineTo(38,0);c.stroke();
        c.strokeStyle='rgba(60,60,80,0.5)';c.lineWidth=1.2;c.beginPath();c.moveTo(19,-0.8);c.lineTo(37,0.2);c.stroke();
        if(isAttacking){
          c.shadowColor='#6644ff';c.shadowBlur=onHit?16:6;
          c.strokeStyle=`rgba(100,80,255,${onHit?0.9:0.4})`;c.lineWidth=onHit?2.5:1.2; c.beginPath();c.moveTo(17,0);c.lineTo(41,0);c.stroke();
          c.shadowBlur=0;
        }
        c.restore();

      // ══════════════════════════════════════════
      // 🔱 NEEDLE SAI — Needle's dual weapons
      // ══════════════════════════════════════════
      } else if(weapon==='sai'){
        const _sDraw = (cctx, isAtk) => {
          // Hexagon handle
          cctx.fillStyle='#2a2a30'; cctx.fillRect(-8,-4,16,8);
          cctx.strokeStyle='#111'; cctx.lineWidth=1; cctx.strokeRect(-8,-4,16,8);
          // Pommel ring
          cctx.beginPath(); cctx.arc(-10,0,4,0,Math.PI*2); cctx.fillStyle='#111'; cctx.fill();
          cctx.strokeStyle='#889'; cctx.lineWidth=1.5; cctx.stroke();
          // Middle prong (long)
          const bGrad = cctx.createLinearGradient(8,-2,8,2);
          bGrad.addColorStop(0,'#a0a0b0'); bGrad.addColorStop(0.5,'#ffffff'); bGrad.addColorStop(1,'#707080');
          cctx.fillStyle=bGrad; cctx.beginPath(); cctx.moveTo(8,-2); cctx.lineTo(45,0); cctx.lineTo(8,2); cctx.closePath(); cctx.fill();
          cctx.strokeStyle='#445'; cctx.lineWidth=0.5; cctx.stroke();
          // Top curved prong
          cctx.beginPath(); cctx.moveTo(8,-2); cctx.quadraticCurveTo(12,-12, 22,-8); cctx.lineTo(20,-6); cctx.quadraticCurveTo(12,-8, 8,0); cctx.fillStyle=bGrad; cctx.fill(); cctx.stroke();
          // Bottom curved prong
          cctx.beginPath(); cctx.moveTo(8,2); cctx.quadraticCurveTo(12,12, 22,8); cctx.lineTo(20,6); cctx.quadraticCurveTo(12,8, 8,0); cctx.fillStyle=bGrad; cctx.fill(); cctx.stroke();

          if(isAtk){
            cctx.shadowColor='#b0c4de'; cctx.shadowBlur=onHit?15:5;
            cctx.strokeStyle=`rgba(200,220,255,${onHit?0.9:0.4})`; cctx.lineWidth=onHit?3:1;
            cctx.beginPath(); cctx.moveTo(8,0); cctx.lineTo(48,0); cctx.stroke();
            cctx.shadowBlur=0;
          }
        };

        _sDraw(c, isAttacking);

        c.restore(); c.save(); 
        const _sAng2 = Math.atan2(bHandY - bElbowY, bHandX - bElbowX);
        c.save(); c.translate(bHandX, bHandY); c.rotate(_sAng2 + 0.1); 
        _sDraw(c, isAttacking);
        c.restore();

      // ══════════════════════════════════════════
      // 🪵 TWIN BATONS — fast SF2-style head slashes
      // ══════════════════════════════════════════
      } else if(weapon==='nunchaku'){
        const _nSpin = isAttacking && (this.combo===2||this.combo>=4);
        const _nAng = _nSpin ? (Date.now()/30)%(Math.PI*2) : 0;
        // Front handle
        c.save(); c.rotate(_nSpin?_nAng:0.8);
        c.fillStyle='#3a1a06'; c.fillRect(-3,-14,6,28);
        c.fillStyle='#777'; c.fillRect(-3,-14,6,5); c.fillRect(-3,9,6,5);
        c.strokeStyle='#333'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,-14);
        if(isAttacking){c.lineTo(0,-28);}else{c.quadraticCurveTo(14,-26,18,-4);}
        c.stroke();
        c.translate(isAttacking?0:18,isAttacking?-42:-4);
        c.rotate(isAttacking?(_nSpin?_nAng*1.5:-1.1):-0.4);
        c.fillStyle='#3a1a06'; c.fillRect(-3,-14,6,28);
        c.fillStyle='#777'; c.fillRect(-3,-14,6,5); c.fillRect(-3,9,6,5);
        if(isAttacking){c.shadowColor='#e8a041';c.shadowBlur=8;c.strokeStyle='rgba(255,200,100,0.45)';c.lineWidth=2;c.beginPath();if(_nSpin){c.arc(0,0,32,0,Math.PI);}else{c.moveTo(-8,-14);c.lineTo(8,28);}c.stroke();c.shadowBlur=0;}
        c.restore();
        // Back handle  
        c.restore(); c.save();
        c.save(); c.translate(bHandX,bHandY); c.rotate(_nSpin?-_nAng:1.1);
        c.fillStyle='#2e1404'; c.fillRect(-3,-14,6,28);
        c.fillStyle='#666'; c.fillRect(-3,-14,6,5); c.fillRect(-3,9,6,5);
        c.strokeStyle='#222'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,-14);
        if(isAttacking){c.lineTo(0,-28);}else{c.quadraticCurveTo(-12,-26,-16,-4);}
        c.stroke();
        c.translate(isAttacking?0:-16,isAttacking?-42:-4);
        c.rotate(isAttacking?(_nSpin?-_nAng*1.5:1.1):0.4);
        c.fillStyle='#2e1404'; c.fillRect(-3,-14,6,28);
        c.fillStyle='#666'; c.fillRect(-3,-14,6,5); c.fillRect(-3,9,6,5);
        if(isAttacking){c.shadowColor='#e8a041';c.shadowBlur=6;c.strokeStyle='rgba(255,180,80,0.35)';c.lineWidth=1.5;c.beginPath();c.moveTo(-8,-14);c.lineTo(8,28);c.stroke();c.shadowBlur=0;}
        c.restore();
      } else if(weapon==='woodstick'){
        const _sFront = c.createLinearGradient(-6,-4,50,4);
        _sFront.addColorStop(0,'#2e1506'); _sFront.addColorStop(0.15,'#6b3c14'); _sFront.addColorStop(0.5,'#9a5a22'); _sFront.addColorStop(0.85,'#6b3c14'); _sFront.addColorStop(1,'#2e1506');
        c.fillStyle=_sFront; c.beginPath(); c.rect(-10,-4,55,8); c.fill();
        for(let _wg=0;_wg<6;_wg++){
          c.strokeStyle=`rgba(20,8,2,${0.18+(_wg%2)*0.1})`; c.lineWidth=0.7; c.beginPath(); c.moveTo(-8+_wg*9,-4); c.lineTo(-6+_wg*9,4); c.stroke();
        }
        for(let _lg=0;_lg<3;_lg++){
          const _lx=-6+_lg*5; c.fillStyle='rgba(60,28,8,0.75)'; c.fillRect(_lx,-5,3,10); c.strokeStyle='rgba(110,55,15,0.8)'; c.lineWidth=0.5; c.strokeRect(_lx,-5,3,10);
        }
        // Caps
        const _sFtip = c.createLinearGradient(45,-5,49,5); _sFtip.addColorStop(0,'#777'); _sFtip.addColorStop(0.5,'#ccc'); _sFtip.addColorStop(1,'#555');
        c.fillStyle=_sFtip; c.beginPath(); c.rect(45,-4,4,8); c.fill();
        const _sBtip = c.createLinearGradient(-12,-5,-9,5); _sBtip.addColorStop(0,'#555'); _sBtip.addColorStop(0.5,'#aaa'); _sBtip.addColorStop(1,'#444');
        c.fillStyle=_sBtip; c.beginPath(); c.rect(-12,-4,4,8); c.fill();
        c.strokeStyle='rgba(200,140,60,0.15)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-9,-2); c.lineTo(46,-2); c.stroke();

        if(isAttacking){
          c.shadowColor='#e8a041'; c.shadowBlur=onHit?15:5;
          c.strokeStyle=`rgba(255,200,100,${onHit?0.8:0.3})`; c.lineWidth=onHit?4:2;
          c.beginPath(); c.moveTo(-10,0); c.lineTo(50,0); c.stroke();
          c.shadowBlur=0;
        }

        c.restore(); c.save(); 
        const _bStickAng = Math.atan2(bHandY - bElbowY, bHandX - bElbowX);
        c.save(); c.translate(bHandX, bHandY); c.rotate(_bStickAng + 0.35); // reverse grip feel

        const _sBack = c.createLinearGradient(-6,-4,50,4);
        _sBack.addColorStop(0,'#261204'); _sBack.addColorStop(0.15,'#5a3210'); _sBack.addColorStop(0.5,'#7a4a18'); _sBack.addColorStop(0.85,'#5a3210'); _sBack.addColorStop(1,'#261204');
        c.fillStyle=_sBack; c.beginPath(); c.rect(-10,-4,55,8); c.fill();
        for(let _bg=0;_bg<6;_bg++){
          c.strokeStyle=`rgba(15,5,1,${0.18+(_bg%2)*0.1})`; c.lineWidth=0.7; c.beginPath(); c.moveTo(-8+_bg*9,-4); c.lineTo(-6+_bg*9,4); c.stroke();
        }
        for(let _blg=0;_blg<3;_blg++){
          const _blx=-6+_blg*5; c.fillStyle='rgba(50,22,6,0.75)'; c.fillRect(_blx,-5,3,10); c.strokeStyle='rgba(100,48,12,0.8)'; c.lineWidth=0.5; c.strokeRect(_blx,-5,3,10);
        }
        c.fillStyle=_sFtip; c.beginPath(); c.rect(45,-4,4,8); c.fill();
        c.fillStyle=_sBtip; c.beginPath(); c.rect(-12,-4,4,8); c.fill();
        c.strokeStyle='rgba(180,120,50,0.12)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-9,-2); c.lineTo(46,-2); c.stroke();

        if(isAttacking){
          c.shadowColor='#e8a041'; c.shadowBlur=onHit?15:5;
          c.strokeStyle=`rgba(255,180,80,${onHit?0.7:0.2})`; c.lineWidth=onHit?3:1.5;
          c.beginPath(); c.moveTo(-10,0); c.lineTo(48,0); c.stroke();
          c.shadowBlur=0;
        }
        c.restore();

      // ══════════════════════════════════════════
      // ⚔️ KATANA — grounded steel look + dedicated move poses
      // ══════════════════════════════════════════
      } else if(weapon==='katana'){
        const katanaCombo=Math.max(1,Math.min(4,this.combo||1));
        const katanaAtk=isAttacking?Math.min(1,atkProg*1.18):0;
        let poseRot=-0.88, poseX=-6, poseY=-8, trailMode='idle';

        if(isAttacking){
          if(this.atkType==='k'){
            poseRot=-0.98 + katanaAtk*0.72; poseX=-4 + katanaAtk*9; poseY=-6 - Math.sin(katanaAtk*Math.PI)*2; trailMode='body';
          } else if(katanaCombo===1){
            poseRot=-1.12 + katanaAtk*1.02; poseX=-6 + katanaAtk*11; poseY=-4 - Math.sin(katanaAtk*Math.PI)*2; trailMode='diag';
          } else if(katanaCombo===2){
            poseRot=-0.12 - katanaAtk*0.78; poseX=4 - katanaAtk*10; poseY=-4 - Math.sin(katanaAtk*Math.PI)*2; trailMode='return';
          } else if(katanaCombo===3){
            poseRot=0.92 - katanaAtk*1.44; poseX=6 - katanaAtk*15; poseY=8 - Math.sin(katanaAtk*Math.PI)*16; trailMode='rise';
          } else {
            poseRot=-1.48 + katanaAtk*1.22; poseX=-2 + katanaAtk*7; poseY=-18 + Math.sin(katanaAtk*Math.PI)*4; trailMode='overhead';
          }
        }

        c.translate(poseX,poseY);
        c.rotate(poseRot);

        const tsuka=c.createLinearGradient(-24,-6,14,6);
        tsuka.addColorStop(0,'#5d3920');tsuka.addColorStop(0.45,'#24160d');tsuka.addColorStop(1,'#120b06');
        c.fillStyle=tsuka;c.beginPath();c.roundRect(-24,-5.2,38,10.4,2.8);c.fill();

        c.strokeStyle='rgba(220,220,220,0.12)';c.lineWidth=0.95;
        for(let ki=0;ki<9;ki++){
          const x=-22+ki*4.1;
          c.beginPath();c.moveTo(x,-5);c.lineTo(x+2.8,5);c.stroke();
          c.beginPath();c.moveTo(x,5);c.lineTo(x+2.8,-5);c.stroke();
        }

        c.fillStyle='#8a6a2d';
        c.beginPath();c.ellipse(-12,0,1.7,1.05,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(-3,0,1.7,1.05,0,0,Math.PI*2);c.fill();

        const tsuba=c.createLinearGradient(14,-10,21,10);
        tsuba.addColorStop(0,'#292929');tsuba.addColorStop(0.5,'#8f8f8f');tsuba.addColorStop(1,'#262626');
        c.fillStyle=tsuba;c.beginPath();c.ellipse(17.5,0,5.6,8.3,0,0,Math.PI*2);c.fill();
        c.strokeStyle='rgba(16,16,16,0.84)';c.lineWidth=0.85;c.stroke();

        const habaki=c.createLinearGradient(20,-4,26,4);
        habaki.addColorStop(0,'#8e7a4b');habaki.addColorStop(0.45,'#d8c581');habaki.addColorStop(1,'#6f6138');
        c.fillStyle=habaki;c.fillRect(20,-3.4,5.8,6.8);

        const blade=c.createLinearGradient(26,-7,116,7);
        blade.addColorStop(0,'#676d75');blade.addColorStop(0.14,'#d7dde5');blade.addColorStop(0.45,'#fbfdff');blade.addColorStop(0.72,'#c1c9d2');blade.addColorStop(1,'#6e7680');
        c.fillStyle=blade;
        c.beginPath();
        c.moveTo(25.5,-3.7);
        c.quadraticCurveTo(64,-6.1,99,-5.2);
        c.quadraticCurveTo(110,-4.4,119,0);
        c.quadraticCurveTo(110,4.2,98.5,5.1);
        c.quadraticCurveTo(62,5.9,25.5,3.7);
        c.closePath();
        c.fill();
        c.strokeStyle='rgba(70,76,84,0.72)';c.lineWidth=0.58;c.stroke();

        c.strokeStyle='rgba(255,255,255,0.68)'; c.lineWidth=0.9;
        c.beginPath(); c.moveTo(31,-1.3); c.quadraticCurveTo(76,-2.4,113,-0.55); c.stroke();
        c.strokeStyle='rgba(48,58,76,0.30)'; c.lineWidth=0.95;
        c.beginPath(); c.moveTo(30,2.1); c.quadraticCurveTo(73,2.8,109,1.4); c.stroke();

        if(isAttacking){
          let trailA=onHit?0.32:0.14;
          c.lineCap='round';
          if(trailMode==='diag'){
            c.strokeStyle=`rgba(236,242,248,${trailA})`; c.lineWidth=3.1;
            c.beginPath(); c.moveTo(28,-7); c.quadraticCurveTo(70,-22,122,-8); c.stroke();
          } else if(trailMode==='return'){
            c.strokeStyle=`rgba(236,242,248,${trailA})`; c.lineWidth=3.0;
            c.beginPath(); c.moveTo(24,6); c.quadraticCurveTo(66,16,118,4); c.stroke();
          } else if(trailMode==='rise'){
            c.strokeStyle=`rgba(236,242,248,${trailA})`; c.lineWidth=3.3;
            c.beginPath(); c.moveTo(24,11); c.quadraticCurveTo(57,-16,114,-24); c.stroke();
          } else if(trailMode==='overhead'){
            c.strokeStyle=`rgba(236,242,248,${trailA+0.05})`; c.lineWidth=3.6;
            c.beginPath(); c.moveTo(36,-28); c.quadraticCurveTo(92,-6,109,18); c.stroke();
          } else if(trailMode==='body'){
            c.strokeStyle=`rgba(236,242,248,${trailA})`; c.lineWidth=2.7;
            c.beginPath(); c.moveTo(18,1); c.quadraticCurveTo(66,-6,114,3); c.stroke();
          }
          c.lineCap='butt';
        }

      // ══════════════════════════════════════════
      // ⚔ TWIN KATANA — one blade in each hand, dedicated dual-sword render
      // ══════════════════════════════════════════
      } else if(weapon==='dual'){
        c.restore(); // leave the front-hand local transform first

        const twinCombo = Math.max(1, Math.min(4, this.combo||1));
        const twinAtk = isAttacking ? Math.min(1, atkProg*1.14) : 0;

        const drawTwinKatana = (handX, handY, elbowX, elbowY, mirror=1) => {
          const armAng = Math.atan2(handY - elbowY, handX - elbowX);
          c.save();
          c.translate(handX, handY);
          c.rotate(armAng);

          if(mirror===-1) c.scale(-1,1);

          // keep each sword visibly anchored in each hand in idle
          if(!isAttacking){
            c.translate(mirror===1 ? -8 : -6, mirror===1 ? -2 : 0);
          } else {
            c.translate(-6, 0);
          }

          let rot = mirror===1 ? -0.10 : 0.08;
          if(!isAttacking){
            rot += mirror===1 ? -0.20 : 0.16;
          } else if(twinCombo===1){
            rot += mirror===1 ? (-0.44 + twinAtk*0.90) : (0.10 + twinAtk*0.22);
          } else if(twinCombo===2){
            rot += mirror===1 ? (0.14 - twinAtk*0.86) : (-0.34 + twinAtk*0.46);
          } else if(twinCombo===3){
            rot += mirror===1 ? (0.76 - twinAtk*1.02) : (0.22 - twinAtk*0.58);
          } else {
            rot += mirror===1 ? (-0.92 + twinAtk*1.18) : (-0.28 + twinAtk*0.72);
          }
          c.rotate(rot);

          const tsuka = c.createLinearGradient(-22,-5,14,5);
          tsuka.addColorStop(0,'#5d3920');tsuka.addColorStop(0.45,'#24160d');tsuka.addColorStop(1,'#120b06');
          c.fillStyle=tsuka;
          c.beginPath();c.roundRect(-22,-4.8,34,9.6,2.6);c.fill();

          c.strokeStyle='rgba(220,220,220,0.12)';c.lineWidth=0.85;
          for(let ki=0;ki<8;ki++){
            c.beginPath();
            c.moveTo(-20+ki*4,-3.8);
            c.lineTo(-16+ki*4,3.8);
            c.stroke();
          }

          c.fillStyle='#111';
          c.beginPath();c.moveTo(11,-7);c.lineTo(15,0);c.lineTo(11,7);c.lineTo(7,0);c.closePath();c.fill();
          c.fillStyle='#8f8f8f';c.beginPath();c.roundRect(11,-7.2,4.8,14.4,1.4);c.fill();
          c.fillStyle='#4a4a4a';c.beginPath();c.roundRect(15.4,-3.6,5.2,7.2,1.4);c.fill();

          const bladeGrad = c.createLinearGradient(20,-6,114,6);
          bladeGrad.addColorStop(0,'#f5f7fb');bladeGrad.addColorStop(0.3,'#b9c5d8');bladeGrad.addColorStop(0.62,'#ecf1f7');bladeGrad.addColorStop(1,'#7d8796');
          c.fillStyle=bladeGrad;
          c.beginPath();
          c.moveTo(20,-4.8);
          c.lineTo(98,-2.8);
          c.quadraticCurveTo(114,0,98,2.8);
          c.lineTo(20,4.8);
          c.quadraticCurveTo(28,0,20,-4.8);
          c.closePath();
          c.fill();

          c.strokeStyle='rgba(255,255,255,0.70)';c.lineWidth=1.0;
          c.beginPath();c.moveTo(26,-1.8);c.lineTo(92,-0.4);c.stroke();
          c.strokeStyle='rgba(45,55,72,0.24)';c.lineWidth=0.85;
          c.beginPath();c.moveTo(22,0);c.lineTo(100,0);c.stroke();

          if(isAttacking){
            c.strokeStyle='rgba(245,248,255,0.18)';
            c.lineWidth=6;
            c.beginPath();
            if(twinCombo===1){
              c.moveTo(10,-18);c.quadraticCurveTo(52,-2,96,20);
            } else if(twinCombo===2){
              c.moveTo(16,18);c.quadraticCurveTo(54,-8,102,-14);
            } else if(twinCombo===3){
              c.moveTo(8,22);c.quadraticCurveTo(36,-6,62,-30);
            } else {
              c.moveTo(20,-26);c.quadraticCurveTo(56,-8,96,20);
            }
            c.stroke();
          }

          c.restore();
        };

        drawTwinKatana(fHandX,fHandY,fElbowX,fElbowY,1);
        drawTwinKatana(bHandX,bHandY,bElbowX,bElbowY,-1);


      // ══════════════════════════════════════════
      // 🐾 LYNX CLAWS — SF2-inspired long-range assassin claws
      // ══════════════════════════════════════════
      } else if(weapon==='lynx_claws'){
        c.restore();
        const combo=Math.max(1,Math.min(4,this.combo||1));
        const prog=isAttacking?Math.min(1,atkProg*1.16):0;
        const drawClaw=(handX,handY,elbowX,elbowY,mirror=1)=>{
          const armAng=Math.atan2(handY-elbowY, handX-elbowX);
          c.save();
          c.translate(handX,handY);
          c.rotate(armAng);
          if(mirror===-1) c.scale(-1,1);

          // keep them tight to the wrists in idle
          if(!isAttacking) c.translate(-5,-2);
          else c.translate(-3,0);

          let rot=-0.08;
          if(!isAttacking) rot += -0.24;
          else if(combo===1) rot += -0.38 + prog*0.78;
          else if(combo===2) rot += 0.04 - prog*0.66;
          else if(combo===3) rot += 0.48 - prog*0.86;
          else rot += -0.76 + prog*1.06;
          c.rotate(rot);

          // wrist gauntlet
          const gauntlet = c.createLinearGradient(-11,-8,10,8);
          gauntlet.addColorStop(0,'#20140c');
          gauntlet.addColorStop(0.4,'#4d301d');
          gauntlet.addColorStop(1,'#120b06');
          c.fillStyle=gauntlet;
          c.beginPath(); c.roundRect(-11,-8,22,16,5); c.fill();

          // strap detail
          c.strokeStyle='rgba(230,210,150,0.18)';
          c.lineWidth=1;
          for(let i=0;i<3;i++){
            c.beginPath();
            c.moveTo(-8+i*5,-7);
            c.lineTo(-5+i*5,7);
            c.stroke();
          }

          // claw roots
          c.fillStyle='#2f2f34';
          c.beginPath(); c.roundRect(7,-7,6,14,2); c.fill();

          // slimmer, longer SF2-like claws
          const bladeGrad = c.createLinearGradient(12,-10,46,10);
          bladeGrad.addColorStop(0,'#eef3fb');
          bladeGrad.addColorStop(0.34,'#b8c2d4');
          bladeGrad.addColorStop(0.72,'#f7fbff');
          bladeGrad.addColorStop(1,'#8791a4');
          c.strokeStyle=bladeGrad;
          c.lineWidth=2.2;
          c.lineCap='round';

          const ys = [-5, 0, 5];
          ys.forEach((yoff, idx)=>{
            c.beginPath();
            c.moveTo(12, yoff);
            c.quadraticCurveTo(27, yoff-2.5, 42, yoff-(idx===1?1:3));
            c.stroke();
          });

          // blade edge shine
          c.strokeStyle='rgba(255,255,255,0.52)';
          c.lineWidth=0.75;
          ys.forEach((yoff, idx)=>{
            c.beginPath();
            c.moveTo(16, yoff-1);
            c.quadraticCurveTo(29, yoff-3, 39, yoff-(idx===1?2:4));
            c.stroke();
          });

          // time-bomb finisher trail, cleaner and thinner
          if(isAttacking && combo===4){
            c.strokeStyle='rgba(255,194,92,0.22)';
            c.lineWidth=4.5;
            c.beginPath();
            c.moveTo(10,-12);
            c.quadraticCurveTo(26,-4,46,12);
            c.stroke();
          }

          c.restore();
        };
        drawClaw(fHandX,fHandY,fElbowX,fElbowY,1);
        drawClaw(bHandX,bHandY,bElbowX,bElbowY,-1);

      // ══════════════════════════════════════════
      // 🩸 BLOOD REAPER — SF2-style kusarigama
      // ══════════════════════════════════════════
      } else if(weapon==='blood_reaper'){
        c.restore(); // leave front-hand local transform

        const combo=Math.max(1,Math.min(4,this.combo||1));
        const prog=isAttacking?Math.min(1,atkProg*1.10):0;
        const isThrowing = isAttacking && this.atkType==='throw';
        const throwPhase = isThrowing && this.__brThrowTotal ? (1 - (this.atkT / this.__brThrowTotal)) : 0;
        const throwOut = isThrowing ? (throwPhase < 0.5 ? throwPhase/0.5 : 1 - ((throwPhase-0.5)/0.5)) : 0;

        const drawBloodReaperHead=(x,y,rot=0)=>{
          c.save();
          c.translate(x,y);
          c.rotate(rot);

          // wrapped handle
          const handleGrad=c.createLinearGradient(-20,-5,18,5);
          handleGrad.addColorStop(0,'#1d0a0c');
          handleGrad.addColorStop(0.38,'#51151c');
          handleGrad.addColorStop(0.72,'#8b1e29');
          handleGrad.addColorStop(1,'#270b0d');
          c.fillStyle=handleGrad;
          c.beginPath(); c.roundRect(-20,-4.8,42,9.6,3); c.fill();

          c.strokeStyle='rgba(255,60,60,0.32)';
          c.lineWidth=1.1;
          for(let i=0;i<4;i++){
            c.beginPath();
            c.moveTo(-14+i*9,-4.4);
            c.lineTo(-10+i*9,4.4);
            c.stroke();
          }

          // gold mount
          c.fillStyle='#c8a44a';
          c.beginPath(); c.roundRect(18,-9,10,18,2); c.fill();

          // curved golden blade
          const bladeGrad=c.createLinearGradient(24,-34,68,18);
          bladeGrad.addColorStop(0,'#fff2c6');
          bladeGrad.addColorStop(0.45,'#d8b35a');
          bladeGrad.addColorStop(1,'#9a7730');
          c.fillStyle=bladeGrad;
          c.beginPath();
          c.moveTo(24,-22);
          c.quadraticCurveTo(54,-40,60,-10);
          c.quadraticCurveTo(48,8,24,6);
          c.quadraticCurveTo(34,-2,38,-12);
          c.quadraticCurveTo(40,-20,24,-22);
          c.closePath();
          c.fill();

          c.fillStyle='rgba(80,20,16,0.18)';
          c.beginPath();
          c.moveTo(28,-10);
          c.quadraticCurveTo(40,-18,46,-8);
          c.quadraticCurveTo(38,-2,30,-2);
          c.closePath();
          c.fill();

          c.strokeStyle='rgba(255,250,230,0.68)';
          c.lineWidth=1;
          c.beginPath();
          c.moveTo(30,-16);
          c.quadraticCurveTo(46,-20,52,-8);
          c.stroke();

          c.restore();
        };

        if(isThrowing){
          // FORWARD + PUNCH THROW: throw the MAIN upper sickle head, not the lower ring.
          const chainStartX = fHandX;
          const chainStartY = fHandY - 2;

          const chainReach = 52 + throwOut*170; // big forward throw
          const chainLift  = -14 + Math.sin(throwPhase*Math.PI)*28;
          const chainEndX = chainStartX + this.dir * chainReach;
          const chainEndY = chainStartY + chainLift;

          // small grip left in hand / launch pose
          c.save();
          c.translate(fHandX, fHandY);
          c.rotate(-0.18*this.dir);
          c.fillStyle='#3a1418';
          c.beginPath(); c.roundRect(-8,-4,16,8,2.5); c.fill();
          c.restore();

          // gold chain from upper hand to flying sickle head
          c.save();
          c.strokeStyle='rgba(184,152,78,0.95)';
          c.lineWidth=2.4;
          c.beginPath();
          c.moveTo(chainStartX, chainStartY);
          c.quadraticCurveTo(
            chainStartX + this.dir*(chainReach*0.45),
            chainStartY + 12 + Math.sin(throwPhase*Math.PI)*8,
            chainEndX,
            chainEndY
          );
          c.stroke();

          c.strokeStyle='rgba(255,236,170,0.34)';
          c.lineWidth=0.9;
          c.beginPath();
          c.moveTo(chainStartX+this.dir*4, chainStartY+1);
          c.quadraticCurveTo(
            chainStartX + this.dir*(chainReach*0.45),
            chainStartY + 10 + Math.sin(throwPhase*Math.PI)*6,
            chainEndX-this.dir*4,
            chainEndY-1
          );
          c.stroke();

          // flying sickle head
          const flyRot = (-0.6 + throwPhase*4.8) * this.dir;
          drawBloodReaperHead(chainEndX, chainEndY, flyRot);

          // keep the lower ring close to body during throw
          c.save();
          c.translate(bHandX + this.dir*8, bHandY + 18);
          c.rotate(0.6 + throwPhase*1.8);
          c.strokeStyle='#5f1119';
          c.lineWidth=5;
          c.beginPath(); c.arc(0,0,10,0,Math.PI*2); c.stroke();
          c.strokeStyle='#cfad54';
          c.lineWidth=2;
          c.beginPath(); c.arc(0,0,12,0,Math.PI*2); c.stroke();
          c.fillStyle='#d2b159';
          for(let i=0;i<6;i++){
            const a=i*Math.PI/3;
            c.save();
            c.rotate(a);
            c.beginPath();
            c.moveTo(11,-2);
            c.quadraticCurveTo(17,-6,19,0);
            c.quadraticCurveTo(17,6,11,2);
            c.closePath();
            c.fill();
            c.restore();
          }
          c.restore();

          // faint motion trail for the thrown sickle
          c.save();
          c.strokeStyle='rgba(255,225,170,0.16)';
          c.lineWidth=7;
          c.beginPath();
          c.moveTo(chainStartX + this.dir*10, chainStartY);
          c.quadraticCurveTo(
            chainStartX + this.dir*(chainReach*0.55),
            chainStartY + 10 + Math.sin(throwPhase*Math.PI)*10,
            chainEndX,
            chainEndY
          );
          c.stroke();
          c.restore();

          c.restore();

        } else {
          // normal kusarigama idle/attack: sickle in front hand, ring on chain from lower hand
          const armAng=Math.atan2(fHandY-fElbowY, fHandX-fElbowX);
          drawBloodReaperHead(fHandX, fHandY, armAng-0.36);

          const chainStartX = bHandX;
          const chainStartY = bHandY - 2;

          let chainReach = 34;
          let chainRise = 16;
          let ringSpin = 0.35;

          if(isAttacking){
            if(combo===1){
              chainReach = 44 + prog*18;
              chainRise  = 14 - prog*4;
              ringSpin   = 0.6 + prog*1.0;
            } else if(combo===2){
              chainReach = 52 + prog*30;
              chainRise  = 10 + prog*10;
              ringSpin   = 1.0 + prog*2.0;
            } else if(combo===3){
              chainReach = 46 + prog*16;
              chainRise  = 20 - prog*12;
              ringSpin   = 0.8 + prog*1.4;
            } else {
              chainReach = 60 + prog*42;
              chainRise  = 8 + Math.sin(prog*Math.PI)*20;
              ringSpin   = 1.4 + prog*2.8;
            }
          }

          const chainEndX = chainStartX + this.dir * chainReach;
          const chainEndY = chainStartY + chainRise;

          c.save();
          c.strokeStyle='rgba(184,152,78,0.95)';
          c.lineWidth=2.2;
          c.beginPath();
          c.moveTo(chainStartX, chainStartY);
          c.quadraticCurveTo(
            chainStartX + this.dir * (chainReach * 0.45),
            chainStartY + 18 + Math.sin(prog*Math.PI)*6,
            chainEndX,
            chainEndY
          );
          c.stroke();

          c.strokeStyle='rgba(255,236,170,0.34)';
          c.lineWidth=0.8;
          c.beginPath();
          c.moveTo(chainStartX+this.dir*4, chainStartY+2);
          c.quadraticCurveTo(
            chainStartX + this.dir * (chainReach * 0.45),
            chainStartY + 15 + Math.sin(prog*Math.PI)*4,
            chainEndX-this.dir*4,
            chainEndY-1
          );
          c.stroke();

          c.translate(chainEndX, chainEndY);
          c.rotate(ringSpin * this.dir);

          c.strokeStyle='#5f1119';
          c.lineWidth=5;
          c.beginPath();
          c.arc(0,0,10,0,Math.PI*2);
          c.stroke();

          c.strokeStyle='#cfad54';
          c.lineWidth=2;
          c.beginPath();
          c.arc(0,0,12,0,Math.PI*2);
          c.stroke();

          c.fillStyle='#d2b159';
          for(let i=0;i<6;i++){
            const a=i*Math.PI/3;
            c.save();
            c.rotate(a);
            c.beginPath();
            c.moveTo(11,-2);
            c.quadraticCurveTo(17,-6,19,0);
            c.quadraticCurveTo(17,6,11,2);
            c.closePath();
            c.fill();
            c.restore();
          }
          c.restore();
        }

      // ══════════════════════════════════════════
      // ⚔ COMPOSITE SWORD — SF2 segmented whip sword
      // ══════════════════════════════════════════
      } else if(weapon==='composite_sword'){
        const segCount = 9;
        const swingProg = isAttacking ? Math.min(1, atkProg) : 0;

        // split amount: joined at start/end, opens during the middle of the swing
        const split = isAttacking ? Math.pow(Math.sin(swingProg * Math.PI), 0.9) : 0;
        const rejoin = 1 - split;

        // respectful raised angle in idle; attack arcs stay readable
        if(!isAttacking){
          c.rotate(-0.92);
          c.translate(-4,-8);
        } else if(this.combo===1){
          c.rotate(-0.64 + atkProg*0.88);
        } else if(this.combo===2){
          c.rotate(-0.18 + atkProg*0.52);
        } else if(this.combo===3){
          c.rotate(0.28 - atkProg*0.76);
        } else {
          c.rotate(-1.02 + atkProg*1.14);
        }

        // hilt / guard
        const hiltGrad = c.createLinearGradient(-18,-5,22,5);
        hiltGrad.addColorStop(0,'#030303');
        hiltGrad.addColorStop(0.5,'#131313');
        hiltGrad.addColorStop(1,'#040404');
        c.fillStyle=hiltGrad;
        c.beginPath(); c.roundRect(-18,-4.6,34,9.2,2.4); c.fill();

        c.fillStyle='#090909';
        c.beginPath(); c.roundRect(14,-6,12,12,2.4); c.fill();
        c.fillStyle='#101010';
        c.beginPath(); c.moveTo(24,-6); c.lineTo(30,0); c.lineTo(24,6); c.lineTo(18,0); c.closePath(); c.fill();

        // joined sword stays compact; during attack it extends and loosens like a whip
        const totalLen = 104 + split * 190;
        const bendAmp = !isAttacking ? 8 : (
          this.combo===1 ? -42 :
          this.combo===2 ? 58 :
          this.combo===3 ? -78 :
          86
        ) * split;

        const riseBias = !isAttacking ? -22 : (-10 + split * -6);

        const curvePoint = (t) => {
          const x = 22 + totalLen * t;
          const y =
            riseBias * t +
            bendAmp * Math.sin(t * Math.PI) +
            (split * 18) * (t * t);
          return {x, y};
        };

        // thread becomes more visible only when the weapon splits
        if(split > 0.06){
          c.strokeStyle=`rgba(180,180,190,${0.10 + split*0.22})`;
          c.lineWidth=1.1;
          c.beginPath();
          for(let i=0;i<=28;i++){
            const t=i/28;
            const p=curvePoint(t);
            if(i===0) c.moveTo(p.x,p.y);
            else c.lineTo(p.x,p.y);
          }
          c.stroke();
        }

        // 9 segmented blades: overlap when joined, separate smoothly when swinging
        for(let i=0;i<segCount;i++){
          const t = i/(segCount-1);
          const p = curvePoint(t);
          const p2 = curvePoint(Math.min(1, t+0.06));
          const ang = Math.atan2(p2.y-p.y, p2.x-p.x);

          const segLen = 18 - i*0.85;
          const segH = 12 - i*0.45;

          // when joined, segments overlap into a single sword-like silhouette
          const localOffset = split * (i * 4.2);

          c.save();
          c.translate(p.x - localOffset, p.y);
          c.rotate(ang);

          // black upper blade body from the reference image
          c.fillStyle='#040404';
          c.beginPath();
          c.moveTo(-3,-segH*0.56);
          c.lineTo(segLen*0.74,-segH*0.62);
          c.lineTo(segLen,0);
          c.lineTo(segLen*0.66,segH*0.34);
          c.lineTo(2,segH*0.28);
          c.lineTo(-3,0);
          c.closePath();
          c.fill();

          // white lower cutting edge
          c.strokeStyle='rgba(255,255,255,0.98)';
          c.lineWidth=1.5;
          c.beginPath();
          c.moveTo(1,segH*0.26);
          c.lineTo(segLen*0.68,segH*0.34);
          c.lineTo(segLen,0);
          c.stroke();

          // connector root between segments
          c.fillStyle=`rgba(18,18,18,${0.95 - split*0.25})`;
          c.fillRect(-3,-segH*0.26,4,segH*0.52);

          c.restore();
        }

        // motion trail only while opened
        if(isAttacking && split > 0.08){
          c.strokeStyle=`rgba(255,255,255,${0.06 + split*0.10})`;
          c.lineWidth=7;
          c.beginPath();
          for(let i=0;i<=20;i++){
            const t=i/20;
            const p=curvePoint(t);
            if(i===0) c.moveTo(p.x,p.y);
            else c.lineTo(p.x,p.y);
          }
          c.stroke();
        }

      // ══════════════════════════════════════════
      // 🔫 AK-47 — dedicated ranged rifle render
      // ══════════════════════════════════════════
      } else if(weapon==='ak47'){
        const firePulse = isAttacking ? Math.sin(atkProg*Math.PI*4) : 0;
        if(!isAttacking){
          c.rotate(-0.04);
          c.translate(-2,-2);
        } else {
          c.rotate(-0.04 + 0.05*firePulse);
          c.translate(-2 + firePulse*2, 0);
        }

        // wooden stock
        c.fillStyle='#6f3d1f';
        c.beginPath();
        c.moveTo(-30,-7);
        c.lineTo(-8,-7);
        c.lineTo(-2,-16);
        c.lineTo(-14,-18);
        c.lineTo(-30,-12);
        c.closePath();
        c.fill();

        // receiver
        const recvGrad = c.createLinearGradient(-8,-6,36,6);
        recvGrad.addColorStop(0,'#111');
        recvGrad.addColorStop(0.5,'#1e1e1e');
        recvGrad.addColorStop(1,'#0b0b0b');
        c.fillStyle=recvGrad;
        c.beginPath(); c.roundRect(-8,-6,44,12,2.5); c.fill();

        // dust cover / rear sight
        c.fillStyle='#171717';
        c.fillRect(0,-10,18,4);
        c.fillRect(30,-8,6,3);

        // curved magazine
        c.fillStyle='#181818';
        c.beginPath();
        c.moveTo(10,6);
        c.lineTo(22,6);
        c.quadraticCurveTo(30,20,18,34);
        c.lineTo(8,32);
        c.quadraticCurveTo(14,18,10,6);
        c.closePath();
        c.fill();

        // pistol grip
        c.fillStyle='#111';
        c.beginPath();
        c.moveTo(2,6);
        c.lineTo(10,6);
        c.lineTo(6,22);
        c.lineTo(-2,20);
        c.closePath();
        c.fill();

        // wooden handguard
        c.fillStyle='#7a4727';
        c.beginPath(); c.roundRect(34,-5,22,10,2.2); c.fill();

        // gas tube + barrel
        c.fillStyle='#1b1b1b';
        c.fillRect(34,-8,22,3);
        c.fillRect(56,-2,28,4);

        // front sight + muzzle
        c.fillRect(76,-8,3,12);
        c.fillRect(84,-3,7,6);

        // muzzle flash while firing
        if(isAttacking && (atkProg > 0.22 && atkProg < 0.78)){
          const flashX = 91, flashY = 0;
          const pulse = 0.7 + Math.abs(firePulse)*0.8;
          c.fillStyle='rgba(255,220,120,0.95)';
          c.beginPath();
          c.moveTo(flashX, flashY);
          c.lineTo(flashX+10*pulse, -4*pulse);
          c.lineTo(flashX+18*pulse, 0);
          c.lineTo(flashX+10*pulse, 4*pulse);
          c.closePath();
          c.fill();
          c.fillStyle='rgba(255,120,40,0.72)';
          c.beginPath();
          c.moveTo(flashX+2, flashY);
          c.lineTo(flashX+8*pulse, -2.5*pulse);
          c.lineTo(flashX+12*pulse, 0);
          c.lineTo(flashX+8*pulse, 2.5*pulse);
          c.closePath();
          c.fill();
        }

      // ══════════════════════════════════════════
      // 🐉 DRAGON SPEAR — disciplined two-hand war spear with 4 dedicated forms
      // ══════════════════════════════════════════
      } else if(weapon==='spear'){
        const spearCombo=Math.max(1,Math.min(4,this.combo||1));
        const spearAtk=isAttacking?Math.min(1,atkProg*1.1):0;
        let poseRot=-0.24, poseX=-8, poseY=-10, trailMode='guard';
        if(isAttacking){
          if(spearCombo===1){
            poseRot=-0.18 + spearAtk*0.08; poseX=-18 + spearAtk*30; poseY=-8; trailMode='thrust';
          } else if(spearCombo===2){
            poseRot=-0.52 + spearAtk*0.52; poseX=-10 + spearAtk*24; poseY=-10; trailMode='sweep';
          } else if(spearCombo===3){
            poseRot=-0.10 + spearAtk*0.04; poseX=-14 + spearAtk*34; poseY=-2; trailMode='drive';
          } else {
            poseRot=-0.92 + spearAtk*0.78; poseX=-18 + spearAtk*28; poseY=-22 + Math.sin(spearAtk*Math.PI)*2; trailMode='overhead';
          }
        }
        c.save(); c.translate(poseX,poseY); c.rotate(poseRot);

        const shaft=c.createLinearGradient(-82,-4,98,4);
        shaft.addColorStop(0,'#4a140f');
        shaft.addColorStop(0.18,'#7c1e16');
        shaft.addColorStop(0.52,'#a42b20');
        shaft.addColorStop(0.82,'#7b1f17');
        shaft.addColorStop(1,'#44120d');
        c.fillStyle=shaft;
        c.beginPath(); c.roundRect(-82,-4.2,176,8.4,4.2); c.fill();
        c.strokeStyle='rgba(255,215,130,0.16)'; c.lineWidth=0.9;
        c.beginPath(); c.moveTo(-76,-1.7); c.lineTo(88,-1.7); c.stroke();
        c.strokeStyle='rgba(15,5,0,0.18)'; c.lineWidth=0.8;
        c.beginPath(); c.moveTo(-76,1.8); c.lineTo(88,1.8); c.stroke();

        for(const bx of [-52,-46,18,24]){
          c.fillStyle='#c79b3a';
          c.fillRect(bx,-6,4,12);
          c.strokeStyle='rgba(95,55,10,0.7)';
          c.lineWidth=0.6;
          c.strokeRect(bx,-6,4,12);
        }

        c.fillStyle='#3b120d';
        c.beginPath(); c.roundRect(-28,-5.8,26,11.6,4); c.fill();
        c.strokeStyle='rgba(225,185,115,0.35)'; c.lineWidth=0.8; c.stroke();

        c.save(); c.translate(96,0);
        const tipGrad=c.createLinearGradient(-4,-18,20,6);
        tipGrad.addColorStop(0,'#f7f7f7');
        tipGrad.addColorStop(0.34,'#d8dce2');
        tipGrad.addColorStop(0.7,'#96a0ab');
        tipGrad.addColorStop(1,'#eef2f6');
        c.fillStyle=tipGrad;
        c.beginPath();
        c.moveTo(-3,0);
        c.lineTo(6,-11);
        c.lineTo(20,0);
        c.lineTo(6,11);
        c.closePath();
        c.fill();
        c.strokeStyle='rgba(255,255,255,0.68)';
        c.lineWidth=1;
        c.beginPath(); c.moveTo(0,0); c.lineTo(15,0); c.stroke();
        c.fillStyle='#d3aa44';
        c.beginPath(); c.roundRect(-6,-4,6,8,2); c.fill();
        c.restore();

        c.save(); c.translate(-86,0);
        c.fillStyle='#d2a448';
        c.beginPath(); c.moveTo(-8,0); c.lineTo(0,-4); c.lineTo(0,4); c.closePath(); c.fill();
        c.restore();

        if(isAttacking || onHit){
          const a=onHit?0.34:0.18;
          c.lineCap='round';
          if(trailMode==='thrust'){
            c.strokeStyle=`rgba(245,230,190,${a+0.06})`; c.lineWidth=3.8;
            c.beginPath(); c.moveTo(14,0); c.lineTo(110,0); c.stroke();
          } else if(trailMode==='sweep'){
            c.strokeStyle=`rgba(255,214,135,${a})`; c.lineWidth=4.0;
            c.beginPath(); c.moveTo(-6,-10); c.quadraticCurveTo(34,-12,106,2); c.stroke();
          } else if(trailMode==='drive'){
            c.strokeStyle=`rgba(255,222,150,${a+0.02})`; c.lineWidth=4.2;
            c.beginPath(); c.moveTo(0,-2); c.quadraticCurveTo(42,-4,114,4); c.stroke();
          } else if(trailMode==='overhead'){
            c.strokeStyle=`rgba(255,228,165,${a+0.08})`; c.lineWidth=4.6;
            c.beginPath(); c.moveTo(12,-22); c.quadraticCurveTo(46,-8,112,2); c.stroke();
          }
          c.lineCap='butt';
        }

        if(onHit){
          c.shadowColor='rgba(255,210,120,0.30)';
          c.shadowBlur=12;
        }
        c.restore();
        c.shadowBlur=0;

      // ══════════════════════════════════════════
      // 🪄 WUKONG STAFF — long red-gold jingu staff with 4 dedicated staff arcs
      // ══════════════════════════════════════════
      } else if(weapon==='staff'){
        const staffCombo=Math.max(1,Math.min(4,this.combo||1));
        const staffAtk=isAttacking?Math.min(1,atkProg*1.14):0;
        let poseRot=-0.18, poseX=0, poseY=0, trailMode='guard';
        if(isAttacking){
          if(staffCombo===1){
            poseRot=-0.58 + staffAtk*0.86; poseX=-8 + staffAtk*14; poseY=-8 - Math.sin(staffAtk*Math.PI)*1.5; trailMode='sweep1';
          } else if(staffCombo===2){
            poseRot=0.22 - staffAtk*0.96; poseX=8 - staffAtk*18; poseY=-3 - Math.sin(staffAtk*Math.PI)*1.5; trailMode='sweep2';
          } else if(staffCombo===3){
            poseRot=1.06 - staffAtk*1.54; poseX=10 - staffAtk*16; poseY=10 - Math.sin(staffAtk*Math.PI)*18; trailMode='rise';
          } else {
            poseRot=-1.18 + staffAtk*0.98; poseX=-4 + staffAtk*8; poseY=-22 + Math.sin(staffAtk*Math.PI)*4; trailMode='slam';
          }
        } else {
          poseRot=-0.96; poseX=-6; poseY=-8; trailMode='guard';
        }
        c.save(); c.translate(poseX,poseY); c.rotate(poseRot);

        const pole=c.createLinearGradient(-74,-5,86,5);
        pole.addColorStop(0,'#6b1209');
        pole.addColorStop(0.08,'#c6932e');
        pole.addColorStop(0.18,'#7d160d');
        pole.addColorStop(0.5,'#a52916');
        pole.addColorStop(0.82,'#7d160d');
        pole.addColorStop(0.92,'#c6932e');
        pole.addColorStop(1,'#661108');
        c.fillStyle=pole;
        c.beginPath(); c.roundRect(-74,-4.8,160,9.6,4.8); c.fill();

        c.strokeStyle='rgba(255,220,140,0.22)'; c.lineWidth=1.1;
        c.beginPath(); c.moveTo(-68,-2.2); c.lineTo(80,-2.2); c.stroke();
        c.strokeStyle='rgba(30,8,0,0.18)'; c.lineWidth=0.9;
        c.beginPath(); c.moveTo(-66,2.1); c.lineTo(82,2.1); c.stroke();

        for(const bx of [-56,-48,58,66]){
          c.fillStyle='#d6a53a';
          c.fillRect(bx,-6.6,5,13.2);
          c.strokeStyle='rgba(90,45,5,0.7)';
          c.lineWidth=0.7;
          c.strokeRect(bx,-6.6,5,13.2);
        }

        const capCol=c.createLinearGradient(-10,-10,10,10);
        capCol.addColorStop(0,'#f7d676'); capCol.addColorStop(0.5,'#b47b18'); capCol.addColorStop(1,'#6c4109');
        for(const tx of [-78,90]){
          c.save(); c.translate(tx,0);
          c.fillStyle=capCol;
          c.beginPath(); c.roundRect(-6,-7,12,14,4); c.fill();
          c.strokeStyle='rgba(255,235,180,0.45)'; c.lineWidth=0.8; c.stroke();
          c.restore();
        }

        if(isAttacking || onHit){
          const a=onHit?0.34:0.18;
          c.lineCap='round';
          if(trailMode==='sweep1'){
            c.strokeStyle=`rgba(255,214,120,${a})`; c.lineWidth=4.8;
            c.beginPath(); c.moveTo(-30,-16); c.quadraticCurveTo(20,-42,92,-8); c.stroke();
          } else if(trailMode==='sweep2'){
            c.strokeStyle=`rgba(255,214,120,${a})`; c.lineWidth=4.8;
            c.beginPath(); c.moveTo(-26,12); c.quadraticCurveTo(28,28,98,2); c.stroke();
          } else if(trailMode==='rise'){
            c.strokeStyle=`rgba(255,214,120,${a+0.04})`; c.lineWidth=5.0;
            c.beginPath(); c.moveTo(-22,18); c.quadraticCurveTo(18,-22,82,-36); c.stroke();
          } else if(trailMode==='slam'){
            c.strokeStyle=`rgba(255,214,120,${a+0.06})`; c.lineWidth=5.4;
            c.beginPath(); c.moveTo(8,-48); c.quadraticCurveTo(54,-10,74,28); c.stroke();
          } else {
            c.strokeStyle=`rgba(255,214,120,${a*0.85})`; c.lineWidth=3.2;
            c.beginPath(); c.moveTo(-8,-10); c.quadraticCurveTo(26,-16,82,-2); c.stroke();
          }
          c.lineCap='butt';
        }

        if(onHit){
          c.shadowColor='rgba(255,200,80,0.35)';
          c.shadowBlur=14;
        }
        c.restore();
        c.shadowBlur=0;

      // ══════════════════════════════════════════
      // ☽ SHADOW SCYTHE — cursed void blade with purple death arc
      // ══════════════════════════════════════════
      } else if(weapon==='scythe'){
        // Dedicated scythe orientation — shoulder carry in idle, heavy sweeping crescents in attack.
        if(!isAttacking){
          c.rotate(-0.98);
          c.translate(-18,-10);
        } else if(this.combo===1){
          c.rotate(-0.52 + atkProg*0.88);
        } else if(this.combo===2){
          c.rotate(0.18 + atkProg*0.60);
        } else if(this.combo===3){
          c.rotate(0.92 - atkProg*1.16);
        } else {
          c.rotate(-1.18 + atkProg*1.42);
        }
        // Pole — dark corrupted wood
        const spg=c.createLinearGradient(-55,-4,68,4);
        spg.addColorStop(0,'#0e0a14');spg.addColorStop(0.2,'#1e1628');spg.addColorStop(0.5,'#2e2040');spg.addColorStop(0.8,'#1a1220');spg.addColorStop(1,'#0e0a14');
        c.fillStyle=spg;c.fillRect(-55,-3.5,124,7);
        // Void cracks along pole
        c.strokeStyle='rgba(140,80,220,0.3)';c.lineWidth=0.8;
        for(let sc=0;sc<6;sc++){
          c.beginPath();c.moveTo(-50+sc*19,-3);c.lineTo(-48+sc*19+2,0);c.lineTo(-50+sc*19+3,3);c.stroke();
        }
        // Wrap bands — cursed violet
        for(let wb=0;wb<5;wb++){
          const wx=-48+wb*24;
          c.fillStyle='rgba(80,40,120,0.7)';c.fillRect(wx,-4.5,4,9);
          c.strokeStyle='rgba(150,80,220,0.5)';c.lineWidth=0.5;c.strokeRect(wx,-4.5,4,9);
        }
        // Blade socket
        c.fillStyle='#18102a';c.fillRect(54,-9,14,18);
        c.strokeStyle='rgba(120,60,200,0.6)';c.lineWidth=1;c.strokeRect(54,-9,14,18);
        // Main scythe blade — huge dramatic sweep
        c.save();c.translate(62,0);
        // Shadow fill
        c.fillStyle='rgba(20,10,35,0.95)';
        c.beginPath();c.moveTo(0,5);c.quadraticCurveTo(12,-4,28,-24);c.quadraticCurveTo(38,-36,48,-22);c.quadraticCurveTo(42,-8,24,-2);c.quadraticCurveTo(12,2,0,5);c.closePath();c.fill();
        // Blade gradient
        const sbg=c.createLinearGradient(0,5,48,-22);
        sbg.addColorStop(0,'#2a1a40');sbg.addColorStop(0.25,'#5a3a80');sbg.addColorStop(0.55,'#9060c0');sbg.addColorStop(0.8,'#c090e0');sbg.addColorStop(1,'#e0b0ff');
        c.fillStyle=sbg;
        c.beginPath();c.moveTo(2,4);c.quadraticCurveTo(14,-3,30,-23);c.quadraticCurveTo(38,-34,46,-22);c.quadraticCurveTo(40,-8,22,-3);c.quadraticCurveTo(10,2,2,4);c.closePath();c.fill();
        // Void edge (outer cutting arc)
        c.strokeStyle='rgba(200,160,255,0.9)';c.lineWidth=2;
        c.beginPath();c.moveTo(2,4);c.quadraticCurveTo(16,-3,32,-23);c.stroke();
        // Inner concave shine
        c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=1;
        c.beginPath();c.moveTo(4,2);c.quadraticCurveTo(20,-2,38,-18);c.stroke();
        // Rune markings on blade
        c.strokeStyle='rgba(255,150,255,0.4)';c.lineWidth=0.8;
        for(let rn=0;rn<3;rn++){
          const rx=8+rn*10,ry=-4-rn*6;
          c.beginPath();c.moveTo(rx,ry);c.lineTo(rx+4,ry-5);c.moveTo(rx+2,ry-1);c.lineTo(rx+5,ry-4);c.stroke();
        }
        c.restore();
        // Counterweight spike
        const cw=c.createLinearGradient(-55,-3,-62,3);
        cw.addColorStop(0,'#2a1840');cw.addColorStop(1,'#8040c0');
        c.fillStyle=cw;
        c.beginPath();c.moveTo(-55,-3);c.lineTo(-66,0);c.lineTo(-55,3);c.closePath();c.fill();
        c.strokeStyle='rgba(180,100,255,0.6)';c.lineWidth=1;c.stroke();
        // Attack: massive death arc with void tendrils
        if(isAttacking){
          c.save();c.translate(62,0);
          const sp2=atkProg;
          c.globalAlpha=onHit?0.95:sp2*0.7;
          c.shadowColor='#aa44ff';c.shadowBlur=onHit?35:16;
          // Primary death arc
          c.strokeStyle='rgba(180,80,255,0.9)';c.lineWidth=onHit?7:3;
          c.beginPath();c.arc(0,0,44,-Math.PI*0.9,-Math.PI*0.05);c.stroke();
          // Inner echo arc
          c.strokeStyle='rgba(255,180,255,0.4)';c.lineWidth=onHit?12:6;
          c.beginPath();c.arc(0,0,36,-Math.PI*0.85,-Math.PI*0.1);c.stroke();
          // Void tendrils
          if(onHit){
            for(let vt=0;vt<6;vt++){
              const va=-Math.PI*0.9+vt*Math.PI*0.16;
              c.strokeStyle='rgba(220,140,255,0.6)';c.lineWidth=1;
              c.beginPath();c.moveTo(Math.cos(va)*44,Math.sin(va)*44);
              c.lineTo(Math.cos(va)*44+(Math.random()-0.5)*20,Math.sin(va)*44+(Math.random()-0.5)*20);c.stroke();
            }
          }
          c.restore();c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🔱 VOID CLAWS — tri-claw gauntlet with plasma energy
      // ══════════════════════════════════════════
      } else if(weapon==='knives'){
        c.restore(); // leave the front-hand local transform first

        const kamaCombo=Math.max(1,Math.min(4,this.combo||1));
        const kamaAtk=isAttacking?Math.min(1,atkProg*1.16):0;

        const drawKama=(handX,handY,elbowX,elbowY,mirror=1)=>{
          const armAng = Math.atan2(handY - elbowY, handX - elbowX);

          c.save();
          c.translate(handX,handY);
          c.rotate(armAng);

          if(mirror===-1) c.scale(-1,1);

          // tighter hand anchoring so they sit in the fists instead of floating
          if(!isAttacking){
            c.translate(mirror===1 ? -7 : -5, mirror===1 ? -2 : 2);
          } else {
            c.translate(-5, 0);
          }

          let rot = mirror === 1 ? -0.20 : 0.16;

          if(!isAttacking){
            rot += mirror === 1 ? -0.10 : 0.10;
          } else if(kamaCombo===1){
            rot += mirror === 1 ? (-0.34 + kamaAtk * 0.82) : (0.10 + kamaAtk * 0.18);
          } else if(kamaCombo===2){
            rot += mirror === 1 ? (0.08 - kamaAtk * 0.88) : (0.26 - kamaAtk * 0.30);
          } else if(kamaCombo===3){
            rot += mirror === 1 ? (0.60 - kamaAtk * 0.96) : (0.34 - kamaAtk * 0.42);
          } else {
            rot += mirror === 1 ? (-0.78 + kamaAtk * 1.04) : (0.02 + kamaAtk * 0.36);
          }
          c.rotate(rot);

          const grip=c.createLinearGradient(-16,-4,12,4);
          grip.addColorStop(0,'#26160c'); grip.addColorStop(0.45,'#5a3520'); grip.addColorStop(1,'#120904');
          c.fillStyle=grip; c.beginPath(); c.roundRect(-16,-4.2,28,8.4,3); c.fill();
          c.strokeStyle='rgba(230,215,190,0.14)'; c.lineWidth=0.8;
          for(let gi=0;gi<5;gi++){ const gx=-13+gi*5.4; c.beginPath(); c.moveTo(gx,-4); c.lineTo(gx+3,4); c.stroke(); }

          c.fillStyle='#80612a'; c.fillRect(10,-4.8,4.5,9.6);
          c.fillStyle='#9a7a38'; c.beginPath(); c.ellipse(12.8,0,4.5,5.8,0,0,Math.PI*2); c.fill();
          c.strokeStyle='rgba(40,22,6,0.72)'; c.lineWidth=0.8; c.stroke();

          const blade=c.createLinearGradient(14,-26,62,18);
          blade.addColorStop(0,'#6b7077'); blade.addColorStop(0.16,'#eef4fb'); blade.addColorStop(0.45,'#ffffff'); blade.addColorStop(0.74,'#c1cad4'); blade.addColorStop(1,'#676e76');
          c.fillStyle=blade;
          c.beginPath();
          c.moveTo(14,-2);
          c.quadraticCurveTo(28,-18,46,-22);
          c.quadraticCurveTo(50,-18,49,-13);
          c.quadraticCurveTo(38,-5,31,4);
          c.quadraticCurveTo(25,10,16,8);
          c.quadraticCurveTo(20,4,22,-1);
          c.quadraticCurveTo(20,-2,14,-2);
          c.closePath();
          c.fill();
          c.strokeStyle='rgba(70,76,84,0.8)'; c.lineWidth=0.7; c.stroke();
          c.strokeStyle='rgba(255,255,255,0.62)'; c.lineWidth=0.6;
          c.beginPath(); c.moveTo(18,-1); c.quadraticCurveTo(32,-18,49,-22); c.stroke();
          c.restore();
        };

        drawKama(fHandX,fHandY,fElbowX,fElbowY,1);
        drawKama(bHandX,bHandY,bElbowX,bElbowY,-1);

        if(isAttacking || onHit){
          const alpha=onHit?0.9:Math.max(0.2,kamaAtk*0.8);
          c.lineCap='round';
          c.strokeStyle=`rgba(215,235,255,${alpha})`;
          c.lineWidth=3.6;
          if(kamaCombo===1){
            c.beginPath(); c.moveTo(fHandX+4,fHandY-8); c.quadraticCurveTo(fHandX+32,fHandY-24,fHandX+56,fHandY-2); c.stroke();
            c.beginPath(); c.moveTo(bHandX-2,bHandY+4); c.quadraticCurveTo(bHandX+18,bHandY+22,bHandX+44,bHandY+14); c.stroke();
          } else if(kamaCombo===2){
            c.beginPath(); c.moveTo(fHandX-6,fHandY+6); c.quadraticCurveTo(fHandX+26,fHandY+20,fHandX+58,fHandY+4); c.stroke();
            c.beginPath(); c.moveTo(bHandX+6,bHandY-12); c.quadraticCurveTo(bHandX+28,bHandY-24,bHandX+48,bHandY-8); c.stroke();
          } else if(kamaCombo===3){
            c.beginPath(); c.moveTo(fHandX-4,fHandY+8); c.quadraticCurveTo(fHandX+18,fHandY-18,fHandX+44,fHandY-34); c.stroke();
            c.beginPath(); c.moveTo(bHandX-4,bHandY+10); c.quadraticCurveTo(bHandX+12,bHandY-8,bHandX+34,bHandY-24); c.stroke();
          } else {
            c.beginPath(); c.moveTo(fHandX+2,fHandY-16); c.quadraticCurveTo(fHandX+34,fHandY-28,fHandX+62,fHandY+8); c.stroke();
            c.beginPath(); c.moveTo(bHandX+2,bHandY-12); c.quadraticCurveTo(bHandX+26,bHandY-22,bHandX+52,bHandY+6); c.stroke();
          }
        }
      }
      if(weapon==='claws'){
        c.restore();c.save();c.translate(fHandX,fHandY);
        // Shared claw gradient
        const clawGrad=c.createLinearGradient(0,2,0,-24);
        clawGrad.addColorStop(0,'#6060a0');clawGrad.addColorStop(0.3,'#9090cc');clawGrad.addColorStop(0.7,'#d0d0f0');clawGrad.addColorStop(1,'#ffffff');

        const drawClawHand=(offX,offY,scale)=>{
          c.save();c.translate(offX,offY);c.scale(scale,scale);
          // Gauntlet base plate
          const gbase=c.createLinearGradient(-12,-5,12,5);
          gbase.addColorStop(0,'#14102a');gbase.addColorStop(0.5,'#2e2850');gbase.addColorStop(1,'#14102a');
          c.fillStyle=gbase;c.beginPath();c.rect(-12,-5,24,10);c.fill();
          c.strokeStyle='rgba(160,120,255,0.6)';c.lineWidth=1.2;c.stroke();
          // Knuckle ridge
          c.strokeStyle='rgba(200,180,255,0.4)';c.lineWidth=2;
          c.beginPath();c.moveTo(-10,-5);c.lineTo(10,-5);c.stroke();
          // Wrist straps
          c.fillStyle='rgba(80,50,120,0.65)';c.fillRect(-13,4,26,3);
          c.strokeStyle='rgba(220,180,255,0.28)';c.lineWidth=0.8;c.strokeRect(-13,4,26,3);
          // 3 claws with detailed taper
          for(let ci=-1;ci<=1;ci++){
            const cx=ci*8;
            c.save();c.translate(cx,0);c.rotate(ci*0.08);
            // Claw socket
            c.fillStyle='#1e1838';c.beginPath();c.rect(-3,-5,6,8);c.fill();
            // Claw body — tapered blade
            c.fillStyle=clawGrad;
            c.beginPath();
            c.moveTo(-3,2);c.lineTo(-2.5,-2);c.bezierCurveTo(-3.5,-9,ci*1.8-2,-18,0,-26);
            c.bezierCurveTo(ci*1.8+2,-18,3.3,-9,2.5,-2);c.lineTo(3,2);c.closePath();
            c.fill();
            // Claw edge highlight
            c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=0.7;
            c.beginPath();c.moveTo(ci<0?-2:-2+Math.abs(ci)*0.5,-2);c.bezierCurveTo(ci<0?-2:0,-10,ci<0?-0.5:0.5,-18,0,-22);c.stroke();
            // Claw ridge
            c.strokeStyle='rgba(180,180,220,0.4)';c.lineWidth=0.5;
            c.beginPath();c.moveTo(0,-4);c.lineTo(0,-20);c.stroke();
            c.restore();
          }
          // Void energy orb in center
          const orb=c.createRadialGradient(0,-3,0,0,-3,6);
          orb.addColorStop(0,'rgba(220,180,255,0.9)');orb.addColorStop(0.5,'rgba(160,100,255,0.6)');orb.addColorStop(1,'transparent');
          c.fillStyle=orb;c.shadowColor='#aa88ff';c.shadowBlur=12;
          c.beginPath();c.arc(0,-3,6,0,Math.PI*2);c.fill();
          c.shadowBlur=0;
          c.restore();
        };

        drawClawHand(0,0,1.0);
        drawClawHand(bHandX-fHandX,bHandY-fHandY,0.85);

        // Attack: feral tri-slash ribbons with combo layering
        if(isAttacking){
          c.shadowColor='#cc88ff';c.shadowBlur=onHit?24:12;
          const alpha=onHit?0.98:Math.max(0.22,atkProg*0.8);
          const spread=this.combo>=3?34:28;
          // Three ripping claw trails
          for(let si=0;si<3;si++){
            const yy=-8-(si*8);
            c.strokeStyle=`rgba(${220-si*10},${175-si*8},255,${alpha*(1-si*0.15)})`;
            c.lineWidth=onHit?(4-si*0.5):(2-si*0.25);
            c.beginPath();
            c.moveTo(-spread,yy+4);
            c.quadraticCurveTo(0,yy-8,spread,yy-12);
            c.stroke();
          }
          // Crossing rake line for aggression
          c.strokeStyle=`rgba(245,220,255,${alpha*0.55})`;c.lineWidth=onHit?2.5:1.2;
          c.beginPath();c.moveTo(-24,-6);c.lineTo(24,-34);c.stroke();
          // Impact bloom
          if(onHit){
            for(let sp=0;sp<10;sp++){
              const sa=sp*Math.PI/5;
              c.strokeStyle='rgba(255,235,255,0.85)';c.lineWidth=0.9;
              c.beginPath();c.moveTo(0,-18);c.lineTo(Math.cos(sa)*16,-18+Math.sin(sa)*16);c.stroke();
            }
          }
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🔨 DOOM HAMMER — war maul with volcanic eruption
      // ══════════════════════════════════════════
      } else if(weapon==='hammer'){
        // Dedicated hammer orientation — shoulder carry in idle, heavy combo arcs in attack.
        if(!isAttacking){
          c.rotate(-0.92);
          c.translate(-18,-8);
        } else if(this.combo===1){
          c.rotate(-0.46 + atkProg*0.76);
        } else if(this.combo===2){
          c.rotate(0.22 + atkProg*0.52);
        } else if(this.combo===3){
          c.rotate(0.84 - atkProg*1.10);
        } else {
          c.rotate(-1.08 + atkProg*1.36);
        }
        // Handle — wrapped with iron bands
        const hg=c.createLinearGradient(-28,-5,60,5);
        hg.addColorStop(0,'#0d0908');hg.addColorStop(0.35,'#2c1711');hg.addColorStop(0.7,'#4a2415');hg.addColorStop(1,'#120a08');
        c.fillStyle=hg;c.fillRect(-28,-5,90,10);
        // Handle leather wrap
        for(let hi=0;hi<7;hi++){
          c.strokeStyle=`rgba(${50+hi*5},${25+hi*3},${8+hi},0.8)`;c.lineWidth=2;
          c.beginPath();c.moveTo(-25+hi*14,-5);c.lineTo(-22+hi*14,5);c.stroke();
        }
        // Iron bands
        for(let ib=0;ib<3;ib++){
          const ibx=-18+ib*24;
          c.fillStyle='rgba(60,60,60,0.8)';c.fillRect(ibx,-5,5,10);
          c.strokeStyle='#888';c.lineWidth=0.5;c.strokeRect(ibx,-5,5,10);
        }
        // Handle-to-head neck
        c.fillStyle='#222';c.fillRect(56,-10,12,20);
        c.strokeStyle='#777';c.lineWidth=1;c.strokeRect(56,-10,12,20);
        // Hammer head — massive war maul
        const hmain=c.createLinearGradient(64,-22,102,22);
        hmain.addColorStop(0,'#181818');hmain.addColorStop(0.28,'#3b3b3b');hmain.addColorStop(0.58,'#5a5a5a');hmain.addColorStop(1,'#101010');
        c.fillStyle=hmain;c.fillRect(64,-22,42,44);
        // Head bevel edges
        c.fillStyle='#2e2e2e';
        c.beginPath();c.moveTo(64,-22);c.lineTo(106,-22);c.lineTo(102,-28);c.lineTo(68,-28);c.closePath();c.fill();
        c.beginPath();c.moveTo(64,22);c.lineTo(106,22);c.lineTo(102,28);c.lineTo(68,28);c.closePath();c.fill();
        // Strike face — glowing hot metal
        const hface=c.createLinearGradient(102,-22,110,22);
        hface.addColorStop(0,isAttacking&&onHit?'#ff6600':'#666');
        hface.addColorStop(0.4,isAttacking&&onHit?'#ffaa00':'#999');
        hface.addColorStop(1,isAttacking&&onHit?'#cc4400':'#555');
        c.fillStyle=hface;c.fillRect(102,-22,10,44);
        // Rune grid engravings
        c.strokeStyle='rgba(255,80,0,0.35)';c.lineWidth=1;
        c.beginPath();
        for(let rx=0;rx<4;rx++){c.moveTo(70+rx*10,-18);c.lineTo(70+rx*10,18);}
        for(let ry=0;ry<5;ry++){c.moveTo(68,-16+ry*8);c.lineTo(102,-16+ry*8);}
        c.stroke();
        // Lava cracks — glowing orange
        c.strokeStyle='rgba(255,120,0,0.5)';c.lineWidth=1.2;
        c.beginPath();c.moveTo(70,-12);c.lineTo(78,-5);c.lineTo(86,-10);c.lineTo(94,-2);c.stroke();
        c.beginPath();c.moveTo(74,10);c.lineTo(82,2);c.lineTo(90,12);c.stroke();
        // Head outline
        c.strokeStyle='#0e0e0e';c.lineWidth=2.2;c.strokeRect(64,-22,42,44);
        c.strokeStyle='#050505';c.lineWidth=2.6;c.strokeRect(102,-22,10,44);
        // Attack: volcanic eruption shockwave
        if(isAttacking){
          const hp2=atkProg;
          c.save();c.translate(98,0);
          if(preHit){
            c.shadowColor='#ff4400';c.shadowBlur=16;
            // Wind-up: cross lines instead of circle
            c.strokeStyle=`rgba(255,100,0,${hp2*0.7})`;c.lineWidth=2;
            c.beginPath();c.moveTo(-12,0);c.lineTo(12,0);c.moveTo(0,-12);c.lineTo(0,12);c.stroke();
            c.shadowBlur=0;
          }
          if(onHit){
            c.shadowColor='#ff6600';c.shadowBlur=30;
            // Radial burst lines only — no circles
            for(let bl=0;bl<16;bl++){
              const ba=bl*Math.PI/8;
              c.strokeStyle=`rgba(255,${150+Math.random()*105},0,0.9)`;c.lineWidth=2;
              c.beginPath();c.moveTo(Math.cos(ba)*4,Math.sin(ba)*4);c.lineTo(Math.cos(ba)*(16+Math.random()*14),Math.sin(ba)*(16+Math.random()*14));c.stroke();
            }
            c.shadowBlur=0;
          } else if(postHit){
            const fade=Math.max(0,1-(this.hitF-this.atkT)*0.1);
            c.shadowColor='#ff4400';c.shadowBlur=12*fade;
            // X shape afterglow
            c.strokeStyle=`rgba(255,120,0,${fade*0.6})`;c.lineWidth=3*fade;
            c.beginPath();c.moveTo(-16,-16);c.lineTo(16,16);c.moveTo(16,-16);c.lineTo(-16,16);c.stroke();
            c.shadowBlur=0;
          }
          c.restore();c.shadowBlur=0;
        }
      }
      c.restore();
    }


    // Enemy weapon draw
    if(!this.isP&&!ghost&&this.eWeapon&&this.eWeapon!=='none'){
      const eT2=Date.now();
      const eAtk=this.state==='atk';
      const eHit=eAtk&&this.atkT<=this.hitF&&this.atkT>this.hitF-5;
      const eAng=Math.atan2(fHandY-fElbowY,fHandX-fElbowX);
      c.save();c.translate(fHandX,fHandY);c.rotate(eAng);
      const ew=this.eWeapon;
      if(ew==='knuckle'){
        const kg=c.createLinearGradient(-10,-10,10,10);
        kg.addColorStop(0,'#888');kg.addColorStop(0.5,'#bbb');kg.addColorStop(1,'#666');
        c.fillStyle=kg;c.beginPath();
        for(let ki=0;ki<6;ki++){const a=ki*Math.PI/3-Math.PI/6;c.lineTo(Math.cos(a)*12,Math.sin(a)*12);}
        c.closePath();c.fill();
        if(eHit){c.shadowColor='#ffaa00';c.shadowBlur=14;}
      } else if(ew==='dagger'){
        c.fillStyle='#333';c.fillRect(-8,-4,16,8);
        const dg=c.createLinearGradient(8,-3,38,3);
        dg.addColorStop(0,'#aaa');dg.addColorStop(0.5,'#eee');dg.addColorStop(1,'#666');
        c.fillStyle=dg;c.beginPath();c.moveTo(8,-3);c.lineTo(36,0);c.lineTo(8,3);c.closePath();c.fill();
        if(eHit){c.shadowColor='#00aaff';c.shadowBlur=14;}
      } else if(ew==='katana'){
        c.rotate(-1.02);
        c.fillStyle='rgba(24,20,16,0.98)';c.beginPath();c.roundRect(-22,-5.2,34,10.4,2.8);c.fill();
        c.strokeStyle='rgba(220,220,220,0.1)';c.lineWidth=0.9;
        for(let eki=0;eki<8;eki++){
          const ex=-20+eki*4;
          c.beginPath();c.moveTo(ex,-5);c.lineTo(ex+2.5,5);c.stroke();
          c.beginPath();c.moveTo(ex,5);c.lineTo(ex+2.5,-5);c.stroke();
        }
        const etsuba=c.createLinearGradient(13,-9,20,9);
        etsuba.addColorStop(0,'#2a2a2a');etsuba.addColorStop(0.5,'#8f8f8f');etsuba.addColorStop(1,'#262626');
        c.fillStyle=etsuba;c.beginPath();c.ellipse(17,0,5.2,7.8,0,0,Math.PI*2);c.fill();
        c.fillStyle='#bba05f';c.fillRect(19,-3.2,5,6.4);
        const eblade=c.createLinearGradient(24,-6,112,6);
        eblade.addColorStop(0,'#676c74');eblade.addColorStop(0.18,'#d8dde4');eblade.addColorStop(0.48,'#fafcfd');eblade.addColorStop(0.78,'#bcc4cd');eblade.addColorStop(1,'#707781');
        c.fillStyle=eblade;c.beginPath();c.moveTo(24,-3.6);c.quadraticCurveTo(62,-5.8,95,-5.0);c.quadraticCurveTo(104,-4.2,112,0);c.quadraticCurveTo(104,4.0,95,5.0);c.quadraticCurveTo(62,5.8,24,3.6);c.closePath();c.fill();
        c.strokeStyle='rgba(255,255,255,0.58)';c.lineWidth=0.8;c.beginPath();c.moveTo(30,-1.2);c.quadraticCurveTo(72,-2.2,108,-0.5);c.stroke();
        if(eHit){c.shadowColor='rgba(235,242,248,0.45)';c.shadowBlur=12;}
      } else if(ew==='staff'){
        const spg2=c.createLinearGradient(-64,-5,74,5);
        spg2.addColorStop(0,'#6b1209');spg2.addColorStop(0.08,'#c6932e');spg2.addColorStop(0.18,'#7d160d');spg2.addColorStop(0.5,'#a52916');spg2.addColorStop(0.82,'#7d160d');spg2.addColorStop(0.92,'#c6932e');spg2.addColorStop(1,'#661108');
        c.fillStyle=spg2;c.beginPath();c.roundRect(-64,-4.5,138,9,4.5);c.fill();
        c.fillStyle='#d6a53a';c.fillRect(-56,-6,4,12);c.fillRect(-48,-6,4,12);c.fillRect(54,-6,4,12);c.fillRect(62,-6,4,12);
        if(eHit){c.shadowColor='#ffcc00';c.shadowBlur=16;}
      } else if(ew==='scythe'){
        c.fillStyle='#181418';c.fillRect(-50,-3,100,6);
        c.save();c.translate(48,0);
        const esg=c.createLinearGradient(-10,-10,10,10);
        esg.addColorStop(0,'#666');esg.addColorStop(0.5,'#aaa');esg.addColorStop(1,'#444');
        c.fillStyle=esg;c.beginPath();c.moveTo(0,0);c.arc(0,0,30,-Math.PI*0.8,0);c.lineTo(0,0);c.closePath();c.fill();
        if(eHit){c.shadowColor='rgba(150,0,255,0.9)';c.shadowBlur=20;}
        c.restore();
      } else if(ew==='hammer'){
        c.fillStyle='#1a1008';c.fillRect(-50,-4,80,8);
        c.save();c.translate(30,0);
        const ehg=c.createLinearGradient(-16,-16,16,16);
        ehg.addColorStop(0,'#555');ehg.addColorStop(0.5,'#888');ehg.addColorStop(1,'#333');
        c.fillStyle=ehg;c.fillRect(-12,-16,24,32);
        c.strokeStyle='rgba(255,100,0,0.4)';c.lineWidth=1.5;
        c.beginPath();c.moveTo(-10,-12);c.lineTo(10,-12);c.moveTo(-10,12);c.lineTo(10,12);c.stroke();
        if(eHit){c.shadowColor='#ff6600';c.shadowBlur=22;}
        c.restore();
      }
      c.shadowBlur=0;c.restore();
    }
    c.restore();c.globalAlpha=1;c.shadowBlur=0;c.shadowColor='transparent';
  }
}

window.Fighter = Fighter;

// ── FIGHT LOGIC ──
function roundsToWinForFight(type){return [3,6,8,10,11,13,14,15,18,19,20,21].includes(type)?3:2;}
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
  UI.btnRage.innerText=player.rageActive?(rageMode2?'SHADOW II':'SHADOW'):'RAGE';
  UI.btnRage.style.display=(gameState==='fight'||gameState==='post')?'flex':'none';
  UI.btnRage.style.visibility='visible';
  UI.rlbl.innerText=rageMode2?'▶ RAGE II READY':'▶ RAGE READY';
  UI.rlbl.style.display=ready?'block':'none';
  UI.timer.innerText=timeLeft;UI.timer.style.color=timeLeft<=10?varRed():'#fff';
  UI.roundLbl.innerText=`ROUND ${curRound}`;
}

function initFight(type){fType=type;pWins=0;eWins=0;clearPendingFight();resetDots();startRound(1);}

function startRound(n){
  curRound=n;gameState='pre';GND=window.innerHeight-80;
  particles=[];floatingTexts=[];landDust=[];  comboCount=0;lastComboTime=0;
  const pi=document.getElementById('part-indicator');if(pi)pi.style.display='none';
  const cd=document.getElementById('combo-display');if(cd)cd.style.display='none';
  showScreen('hud-screen');
  UI.ctrls.style.display='flex';UI.kbhint.style.display='block';
  if(typeof applyCtrlSettings==='function')applyCtrlSettings();
  if(UI.btnRage){ UI.btnRage.style.display='flex'; UI.btnRage.style.visibility='visible'; UI.btnRage.style.opacity='1'; }
  player=new Fighter(Math.min(150,W*0.15),true);player.rage=fType>1?50:0;
  // ── Apply squad support bonuses (v29) ──
  if(typeof applySquadBonusesToFight==='function') applySquadBonusesToFight();
  const _sb=window.__squadBonuses||{};
  if(_sb.dmg)     player.dmg      = (player.dmg||10)   + _sb.dmg;
  if(_sb.def)     player.defense  = (player.defense||0) + _sb.def;
  if(_sb.recovery)player._squadRecovery = _sb.recovery; // stored for end-of-round regen
  // rageGain bonus stored on player for rage accumulation scaling
  if(_sb.rageGain)player._rageGainBonus = _sb.rageGain;
  setEnvRage(false);
  enemy=new Fighter(Math.max(W-260,W*0.75),false,fType);
  resetDots();
  const names={1:'VOID SHADOW',2:'RAGE CLONE',3:'FINAL ECHO',4:'SWIFT SHADOW',5:'VOID BRAWLER',
    6:'THE WATCHER',7:'LATENCY FRACTURE',8:'PREDICTION DUO',9:'ELITE MIRROR',10:'BURDEN',
    11:'CONTROLLED',12:'EVOLVED SHADOW',13:'SYNC WAVE',14:'REWRITE PROTOCOL',15:'MEMORY ERASURE',
    16:'INTERFERENCE WAVE',17:'PRESSURE WAVE',18:'THE DELAY',19:'FINAL INTERFERENCE',20:'FINAL HOST',21:'AROWH — NO.12'};
  UI.ename.innerText=names[fType]||'SHADOW';
  const isBossFight=[3,6,8,10,11,13,14,15,18,19,20,21].includes(fType);
  startMusicTheme(isBossFight?'boss':'fight');
  if(isBossFight) switchToBossBg(); else switchToNormalBg();
  timeLeft=50;lastTick=Date.now();updateHUD();
  showBanner(`ROUND ${n}`,()=>showBanner('FIGHT!',()=>{gameState='fight';},800),1100);
}
function resetDots(){
  ['pr1','pr2','pr3','er1','er2','er3'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    el.className='dot';
    el.style.opacity='0.25';
  });
  const total=Math.min(3, totalDotsForFight(fType));
  for(let i=1;i<=total;i++){
    const pr=document.getElementById(`pr${i}`);
    const er=document.getElementById(`er${i}`);
    if(pr) pr.style.opacity='1';
    if(er) er.style.opacity='1';
  }
}
function checkRound(){
  if(gameState!=='fight')return;
  gameState='post';
  const need=roundsToWinForFight(fType);
  const pWon=player.hp>0;
  if(pWon){
    pWins++;
    { const dot=document.getElementById(`pr${pWins}`); if(dot) dot.classList.add('won'); }
    let rew=8;if(fType>3)rew=15;if([3,6,8,10,11,13,14,15,18,19,20,21].includes(fType))rew=40;updateCoins(rew);
    // Endurance regen on win
    if(player.enduranceRegen&&player.hp>0)player.hp=Math.min(player.maxHp,player.hp+20);
    // Squad support recovery bonus (v29)
    if(player._squadRecovery&&player.hp>0)player.hp=Math.min(player.maxHp,player.hp+(player._squadRecovery||0));
    saveGame();
  } else {
    eWins++;{ const dot=document.getElementById(`er${eWins}`); if(dot) dot.classList.add('won'); }
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
  const scriptedLoss = (!win && fType===21 && currentPart===12);
  if(win || scriptedLoss){
    clearPendingFight();
    checkpointStory(currentPart,scIdx+1);
    if(win) updateChapterUnlock(currentPart+1);
    scIdx++;
    applyPartBg(currentPart);
    showScreen('story-screen');
    gameState='story';
    if(scriptedLoss){
      showBanner('OVERWHELMED',()=>advance(true),1400);
    } else {
      advance(true);
    }
  } else {
    setPendingFight(currentPart,scIdx,fType);
    showBanner('DEFEATED',()=>{showScreen('story-screen');gameState='story';advance(true);},2000);
  }
}

// ── RENDER LOOP ──

// --- CHAPTER ANIMATED BACKGROUNDS ---
function drawChapterBackground(ctx, W, H, GND, ch, time) {
    // Shared floor silhouette
    const drawFloor = (color = '#000000', edge = '#111') => {
        ctx.fillStyle = color;
        ctx.fillRect(0, GND, W, H-GND);
        ctx.fillStyle = edge;
        ctx.fillRect(0, GND, W, 3);
    };

    switch(ch) {
        case 1: // THE FALL (Night Sky & Stars)
            const sky1 = ctx.createLinearGradient(0,0,0,GND);
            sky1.addColorStop(0, '#050b14');
            sky1.addColorStop(1, '#1a2b4c');
            ctx.fillStyle = sky1; ctx.fillRect(0,0,W,GND);

            // Moon
            ctx.fillStyle = '#e0f7fa';
            ctx.shadowColor = '#80deea'; ctx.shadowBlur = 30;
            ctx.beginPath(); ctx.arc(W*0.8, GND*0.3, 40, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;

            if(Math.random()>0.95) particles.push({x:Math.random()*W, y:0, vx:-4-Math.random()*4, vy:4+Math.random()*4, life:0.5, col:'#fff', w:2, tp:'f'}); // Shooting stars
            drawFloor('#020408', '#2a446c');
            break;

        case 2: // VANISHED (Foggy Forest)
            const sky2 = ctx.createLinearGradient(0,0,0,GND);
            sky2.addColorStop(0, '#1c2120');
            sky2.addColorStop(1, '#3b4d46');
            ctx.fillStyle = sky2; ctx.fillRect(0,0,W,GND);

            // Trees
            ctx.fillStyle = '#101614';
            for(let i=0; i<6; i++) {
                let tx = (i*W/5 + Math.sin(time+i)*30) % W;
                ctx.fillRect(tx, GND*0.2, 30+i*5, GND*0.8);
                // Branches
                ctx.beginPath(); ctx.moveTo(tx+15, GND*0.4); ctx.lineTo(tx+80, GND*0.2); ctx.lineTo(tx+80, GND*0.25); ctx.fill();
            }
            if(Math.random()>0.5) particles.push({x:W, y:GND-Math.random()*200, vx:-1-Math.random()*1, vy:0, life:2.0, col:'rgba(180,220,200,0.1)', w:40+Math.random()*40, tp:'f'}); // Fog
            drawFloor('#070a09', '#4d695e');
            break;

        case 3: // FRACTURE (Shattered Dimension)
            ctx.fillStyle = '#160824'; ctx.fillRect(0,0,W,GND);
            // Floating geometry
            ctx.fillStyle = 'rgba(150, 60, 220, 0.15)';
            ctx.strokeStyle = '#9d4edd'; ctx.lineWidth = 2;
            for(let i=0; i<8; i++) {
                ctx.save();
                ctx.translate((W*i/8 + time*20)%W, GND*0.3 + Math.sin(time*2+i)*40);
                ctx.rotate(time*0.5 + i);
                ctx.beginPath(); ctx.rect(-20, -20, 40, 40); ctx.fill(); ctx.stroke();
                ctx.restore();
            }
            if(Math.random()>0.7) particles.push({x:Math.random()*W, y:Math.random()*GND, vx:(Math.random()-0.5)*2, vy:-1-Math.random()*2, life:1.5, col:'#e0b0ff', w:3, tp:'f'});
            drawFloor('#08020d', '#7225b3');
            break;

        case 4: // ASH CAMP (Burnt Orange & Ruined Spikes)
            const sky4 = ctx.createLinearGradient(0,0,0,GND);
            sky4.addColorStop(0, '#361208');
            sky4.addColorStop(1, '#8c2f14');
            ctx.fillStyle = sky4; ctx.fillRect(0,0,W,GND);

            // Ruined tents/spikes
            ctx.fillStyle = '#120502';
            for(let i=0; i<4; i++) {
                let sx = W*0.2 + i*W*0.25;
                ctx.beginPath(); ctx.moveTo(sx, GND); ctx.lineTo(sx+20, GND-150+(i%2)*50); ctx.lineTo(sx+40, GND); ctx.fill();
            }
            if(Math.random()>0.3) particles.push({x:Math.random()*W, y:-10, vx:1+Math.random(), vy:2+Math.random()*2, life:1.5, col:'rgba(255,100,50,0.8)', w:2+Math.random()*3, tp:'f'}); // Ash
            drawFloor('#080201', '#a63b17');
            break;

        case 5: // CAMPFIRE (Night with glowing fire)
            ctx.fillStyle = '#0a0a0f'; ctx.fillRect(0,0,W,GND);
            // Fire glow
            let fireSway = Math.sin(time*10)*10;
            let fireX = W*0.5;
            const glow = ctx.createRadialGradient(fireX, GND, 10, fireX, GND, 250+fireSway);
            glow.addColorStop(0, 'rgba(255, 120, 30, 0.4)');
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow; ctx.fillRect(0,0,W,GND);

            // Fire silhouette
            ctx.fillStyle = '#000';
            ctx.beginPath(); ctx.moveTo(fireX-30, GND); ctx.lineTo(fireX, GND-40); ctx.lineTo(fireX+30, GND); ctx.fill();

            if(Math.random()>0.5) particles.push({x:fireX-40+Math.random()*80, y:GND-20, vx:(Math.random()-0.5)*3, vy:-2-Math.random()*3, life:1.0, col:'#ffaa00', w:3+Math.random()*2, tp:'f'}); // Embers
            drawFloor('#050508', '#ff4d00');
            break;

        case 6: // RESCUE ARC (Rain & Thunder)
            ctx.fillStyle = '#0d151c'; ctx.fillRect(0,0,W,GND);
            // Lightning flash
            if(Math.random() > 0.98) {
                ctx.fillStyle = 'rgba(200, 240, 255, 0.3)';
                ctx.fillRect(0,0,W,H);
            }
            // Rain
            ctx.strokeStyle = 'rgba(150, 200, 220, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for(let i=0; i<30; i++) {
                let rx = Math.random()*W;
                let ry = Math.random()*GND;
                ctx.moveTo(rx, ry); ctx.lineTo(rx-10, ry+30);
            }
            ctx.stroke();
            if(Math.random()>0.2) particles.push({x:Math.random()*W, y:-20, vx:-2, vy:15+Math.random()*10, life:0.3, col:'#aaddff', w:2, tp:'f'});
            drawFloor('#04070a', '#224455');
            break;

        case 7: // M.R ARRIVAL (Toxic Green)
            const sky7 = ctx.createLinearGradient(0,0,0,GND);
            sky7.addColorStop(0, '#0a1a0d');
            sky7.addColorStop(1, '#25522d');
            ctx.fillStyle = sky7; ctx.fillRect(0,0,W,GND);

            // Giant moon/planet
            ctx.fillStyle = '#8fdb9e'; ctx.shadowColor = '#50c878'; ctx.shadowBlur = 40;
            ctx.beginPath(); ctx.arc(W*0.2, GND*0.4, 80, 0, Math.PI*2); ctx.fill(); ctx.shadowBlur = 0;

            if(Math.random()>0.6) particles.push({x:Math.random()*W, y:GND, vx:(Math.random()-0.5)*2, vy:-0.5-Math.random()*1, life:2.0, col:'rgba(100,255,150,0.4)', w:10+Math.random()*20, tp:'f'});
            drawFloor('#020503', '#4cd137');
            break;

        case 8: // BETRAYAL (Crimson Red & Jagged Peaks)
            const sky8 = ctx.createLinearGradient(0,0,0,GND);
            sky8.addColorStop(0, '#260404');
            sky8.addColorStop(1, '#660b0b');
            ctx.fillStyle = sky8; ctx.fillRect(0,0,W,GND);

            // Mountains
            ctx.fillStyle = '#140101';
            ctx.beginPath(); ctx.moveTo(0, GND);
            ctx.lineTo(W*0.2, GND*0.4); ctx.lineTo(W*0.4, GND*0.7); ctx.lineTo(W*0.7, GND*0.3); ctx.lineTo(W, GND*0.8);
            ctx.lineTo(W, GND); ctx.fill();

            if(Math.random()>0.8) particles.push({x:Math.random()*W, y:0, vx:0, vy:1+Math.random()*2, life:1.0, col:'#ff3333', w:2, tp:'f'});
            drawFloor('#0a0000', '#cc1111');
            break;

        case 9: // WAR DRUMS (Sunset Army Silhouette)
            const sky9 = ctx.createLinearGradient(0,0,0,GND);
            sky9.addColorStop(0, '#cc4400');
            sky9.addColorStop(1, '#ffb833');
            ctx.fillStyle = sky9; ctx.fillRect(0,0,W,GND);

            // Marching army silhouttes in background
            ctx.fillStyle = '#220b00';
            for(let i=0; i<15; i++) {
                let ax = ((i*60) - (time*15)) % (W+100);
                if(ax < -50) ax += W+100;
                ctx.fillRect(ax, GND-30, 8, 30); // soldier
                ctx.fillRect(ax+10, GND-50, 2, 50); // spear
            }
            if(Math.random()>0.3) particles.push({x:Math.random()*W, y:GND-10, vx:-3-Math.random()*2, vy:-1-Math.random(), life:1.5, col:'rgba(255,200,100,0.3)', w:8+Math.random()*10, tp:'f'}); // Dust
            drawFloor('#0d0400', '#ff8800');
            break;

        case 10: // WAR GATE (Abyssal Blue Energy)
            ctx.fillStyle = '#01030a'; ctx.fillRect(0,0,W,GND);

            // Giant Gate Silhouette
            ctx.fillStyle = '#030b1c';
            ctx.fillRect(W*0.3, 0, W*0.1, GND);
            ctx.fillRect(W*0.6, 0, W*0.1, GND);
            ctx.fillRect(W*0.3, GND*0.2, W*0.4, GND*0.1);

            // Gate Energy Glow
            ctx.fillStyle = 'rgba(40, 100, 255, 0.1)';
            ctx.fillRect(W*0.4, GND*0.3, W*0.2, GND*0.7);

            if(Math.random()>0.2) particles.push({x:W*0.4 + Math.random()*W*0.2, y:GND, vx:(Math.random()-0.5)*2, vy:-5-Math.random()*5, life:1.2, col:'#4db8ff', w:2+Math.random()*4, tp:'f'});
            drawFloor('#000105', '#0066ff');
            break;

        default:
            ctx.fillStyle = '#111'; ctx.fillRect(0,0,W,GND);
            drawFloor();
            break;
    }
}


// ── CHAPTER CONFIG ──
// Chapter 1 = parts 1-5, Chapter 2 = parts 6-7
const CHAPTER_PARTS = {"1": [1, 2, 3, 4, 5], "2": [6, 7, 8, 9, 10], "3": [11, 12, 13, 14, 15], "4": [16, 17, 18, 19, 20], "5": [21, 22, 23, 24, 25], "6": [26, 27, 28, 29, 30], "7": [31, 32, 33, 34, 35], "8": [36, 37, 38, 39, 40], "9": [41, 42, 43, 44, 45], "10": [46, 47, 48, 49, 50]};
const CHAPTER_TITLES = {"1": "THE FALL", "2": "VANISHED", "3": "FRACTURE", "4": "ASH CAMP", "5": "CAMPFIRE", "6": "RESCUE ARC", "7": "M.R ARRIVAL", "8": "BETRAYAL", "9": "WAR DRUMS", "10": "WAR GATE"};
const CHAPTER_ACT = {"1": 1, "2": 1, "3": 2, "4": 2, "5": 3, "6": 3, "7": 4, "8": 4, "9": 5, "10": 5}; // which act each chapter belongs to
const ACT_CHAPTERS = {1:[1,2], 2:[3,4], 3:[5,6], 4:[7,8], 5:[9,10]}; // chapters in each act
let activeChapter = 1;
let activeAct = 1;

function getChapterByPart(part){
  const p = Number(part);
  for(const [ch, parts] of Object.entries(CHAPTER_PARTS)){
    if(Array.isArray(parts) && parts.includes(p)) return Number(ch);
  }
  return Number(activeChapter) || 1;
}

// ── GAME SCREENS ──
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active-screen'));
  
  // Toggle SF2 global topbar visibility
  const topbar = document.getElementById('global-sf2-topbar');
  if (topbar) {
    if (id === 'menu-screen') {
      topbar.style.setProperty('display', 'flex', 'important');
      if (typeof sf2MirrorEconomy === 'function') sf2MirrorEconomy();
    } else {
      topbar.style.setProperty('display', 'none', 'important');
    }
  }


/* ─── js/loop.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   RENDER LOOP
   Main requestAnimationFrame loop. Runs every frame.
   Calls player.update(), enemy.update(), draw().
════════════════════════════════════════════════ */

document.getElementById(id).classList.add('active-screen');
}

function refreshMenuLocks(){
  const unlocked=window.__saveData?.chapterUnlocked||1;

  // ── ACT CARDS (main select screen) ──
  // Act 1 always available
  // Act 2 unlocked when Part 11 reached (unlocked >= 11)
  const act2ok=unlocked>=11;
  const a2card=document.getElementById('act2-card');
  const a2lock=document.getElementById('act2-lock');
  const a2num=document.getElementById('act2-num');
  if(a2card){
    if(act2ok){a2card.classList.remove('locked');if(a2lock)a2lock.innerText='▶';if(a2num)a2num.classList.remove('dim');}
    else{a2card.classList.add('locked');if(a2lock)a2lock.innerText='🔒';if(a2num)a2num.classList.add('dim');}
  }

  // ── ACT 1 OVERVIEW DOTS (cdot1-10 on act select card) ──
  for(let p=1;p<=10;p++){
    const dot=document.getElementById(`cdot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  const dot11=document.getElementById('cdot11');
  if(dot11){dot11.classList.remove('done','active');if(unlocked>11)dot11.classList.add('done');else if(unlocked===11)dot11.classList.add('active');}

  // ── ACT 1 SUB-SCREEN: Chapter I dots (ch1dot1-5) ──
  for(let p=1;p<=5;p++){
    const dot=document.getElementById(`ch1dot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  // Ch1 progress bar
  const c1card=document.getElementById('chap1-card');
  if(c1card){let bar=c1card.querySelector('.chap-progress-bar');if(!bar){bar=document.createElement('div');bar.className='chap-progress-bar';c1card.appendChild(bar);}bar.style.width=Math.min(100,Math.max(0,(unlocked-1)/5*100))+'%';}

  // ── ACT 1 SUB-SCREEN: Chapter II lock + dots (ch2dot6-10) ──
  const ch2ok=unlocked>=6;
  const c2card=document.getElementById('chap2-card');
  const c2lock=document.getElementById('chap2-lock');
  const c2num=document.getElementById('chap2-num');
  if(c2card){
    if(ch2ok){c2card.classList.remove('locked');if(c2lock)c2lock.innerText='▶';if(c2num)c2num.classList.remove('dim');}
    else{c2card.classList.add('locked');if(c2lock)c2lock.innerText='🔒';if(c2num)c2num.classList.add('dim');}
  }
  for(let p=6;p<=10;p++){
    const dot=document.getElementById(`ch2dot${p}`);
    if(!dot)continue;
    dot.classList.remove('done','active');
    if(unlocked>p)dot.classList.add('done');
    else if(unlocked===p)dot.classList.add('active');
  }
  const c2cardEl=document.getElementById('chap2-card');
  if(c2cardEl){let bar2=c2cardEl.querySelector('.chap-progress-bar');if(!bar2){bar2=document.createElement('div');bar2.className='chap-progress-bar';c2cardEl.appendChild(bar2);}bar2.style.width=Math.min(100,Math.max(0,(unlocked-6)/5*100))+'%';}

  // ── ACT 2 SUB-SCREEN: Chapter III lock + dots ──
  const ch3ok=unlocked>=11;
  const c3card=document.getElementById('chap3-card');
  const c3lock=document.getElementById('chap3-lock');
  const c3num=document.getElementById('chap3-num');
  if(c3card){
    if(ch3ok){c3card.classList.remove('locked');if(c3lock)c3lock.innerText='▶';if(c3num)c3num.classList.remove('dim');}
    else{c3card.classList.add('locked');if(c3lock)c3lock.innerText='🔒';if(c3num)c3num.classList.add('dim');}
  }
  const d11=document.getElementById('ch3dot11');
  if(d11){d11.classList.remove('done','active');if(unlocked>11)d11.classList.add('done');else if(unlocked===11)d11.classList.add('active');}

  // ── ACT 1 OVERVIEW PROGRESS BAR ──
  const a1card=document.getElementById('act1-card');
  if(a1card){let bar=a1card.querySelector('.chap-progress-bar');if(!bar){bar=document.createElement('div');bar.className='chap-progress-bar';a1card.appendChild(bar);}bar.style.width=Math.min(100,Math.max(0,(unlocked-1)/10*100))+'%';}
}

function openAct(act){
  initAudio();refreshMenuLocks();
  activeAct=act;
  showScreen(act===1?'act1-screen':'act2-screen');
}
function closeAct(){
  showScreen('chapter-screen');
}

function openChapterSelect(){
  initAudio();refreshMenuLocks();showScreen('chapter-screen');
}
function closeChapterSelect(){
  showScreen('menu-screen');
}

function startChapter(ch){
  initAudio();
  const unlocked=window.__saveData?.chapterUnlocked||1;
  const minPart=(CHAPTER_PARTS[ch]&&CHAPTER_PARTS[ch][0])||1;
  if(unlocked<minPart)return;

  activeChapter=ch;
  activeAct=CHAPTER_ACT[ch]||1;
  const parts=CHAPTER_PARTS[ch];
  const title=CHAPTER_TITLES[ch];
  const chNums=['','I','II','III','IV','V'];

  const overlay=document.getElementById('chap-transition');
  document.getElementById('ct-chapter-lbl').innerText=`CHAPTER ${chNums[ch]||ch}`;
  document.getElementById('ct-title-lbl').innerText=title;
  overlay.classList.add('fade-in');


/* ─── js/screens.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   SCREEN NAVIGATION
   showScreen(), chapter select, act select, menu locks.
════════════════════════════════════════════════ */

setTimeout(()=>{
    overlay.classList.remove('fade-in');
    setTimeout(()=>{
      loadGame();
      UI.gCoins.style.display='flex';
      UI.btnMenu.style.display='block';
      const save=window.__saveData||defaultSave();
      const unlk=save.chapterUnlocked||1;
      let startPart=parts[0];

      if(save.pendingFightType&&parts.includes(save.pendingFightPart)){
        currentPart=save.pendingFightPart;
        syncCurrentPartGlobal();
        applyPartBg(currentPart);
        scIdx=save.pendingFightIndex||getPartStartIndex(currentPart);
        gameState='story';initFight(save.pendingFightType);return;
      }

      for(let i=parts.length-1;i>=0;i--){
        if(unlk>parts[i]){startPart=parts[Math.min(i+1,parts.length-1)];break;}
        if(unlk===parts[i]){startPart=parts[i];break;}
      }
      if(!parts.includes(startPart))startPart=parts[0];

      currentPart=startPart;
      syncCurrentPartGlobal();
      syncCurrentPartGlobal();
      applyPartBg(currentPart);
      const partStart=getPartStartIndex(startPart);
      const savedIdx=save.storyIndexByPart&&save.storyIndexByPart[String(startPart)]!=null
        ?save.storyIndexByPart[String(startPart)]:partStart;
      scIdx=clampStoryIndexToPart(savedIdx,startPart);
      gameState='story';
      showScreen('story-screen');
      saveGame({currentPart:startPart});
      advance(true);
    },500);
  },2200);
}

function continueGame(){
  initAudio();loadGame();
  UI.gCoins.style.display='flex';UI.btnMenu.style.display='block';
  currentPart=window.__saveData?.currentPart||1;
  syncCurrentPartGlobal();
  applyPartBg(currentPart);
  for(const [ch,parts] of Object.entries(CHAPTER_PARTS)){
    if(parts.includes(currentPart)){activeChapter=parseInt(ch);activeAct=CHAPTER_ACT[parseInt(ch)]||1;break;}
  }
  if(window.__saveData?.pendingFightType&&window.__saveData?.pendingFightPart===currentPart){
    scIdx=window.__saveData.pendingFightIndex||getPartStartIndex(currentPart);
    gameState='story';initFight(window.__saveData.pendingFightType);return;
  }
  scIdx=(window.__saveData?.storyIndexByPart&&window.__saveData.storyIndexByPart[String(currentPart)]!=null)
    ?clampStoryIndexToPart(window.__saveData.storyIndexByPart[String(currentPart)],currentPart):getPartStartIndex(currentPart);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');advance(true);
}

function newGame(){
  // Confirm before wiping
  if(!confirm('Start a NEW GAME?\n\nAll progress, coins and unlocks will be reset.'))return;
  initAudio();
  // Wipe save
  try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  window.__saveData=defaultSave();
  coins=0;weapon='none';armor='none';rageMode2=false;strengthUpg=0;speedUpg=0;enduranceUpg=0;currentPart=1;syncCurrentPartGlobal();
  UI.cVal.innerText=0;
  // Flash + banner then start part 1
  doFlash();
  UI.gCoins.style.display='flex';UI.btnMenu.style.display='block';
  scIdx=getPartStartIndex(1);activeChapter=1;
  applyPartBg(1);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');advance(true);
}

function updateCoins(amt){
  if(amt!==0){coins+=amt;if(UI.cVal) UI.cVal.innerText=coins; sf2MirrorEconomy();
    UI.gCoins.style.transform='scale(1.4)';setTimeout(()=>UI.gCoins.style.transform='scale(1)',200);saveGame();}
}

function startPart(num){
  initAudio();loadGame();
  UI.gCoins.style.display='flex';UI.btnMenu.style.display='block';
  const unlocked=window.__saveData?.chapterUnlocked||1;
  if(unlocked<num)return;
  currentPart=num;
  activeChapter = getChapterByPart(num);
  activeAct = CHAPTER_ACT[String(activeChapter)] || CHAPTER_ACT[activeChapter] || activeAct;
  syncCurrentPartGlobal();
  applyPartBg(num);
  const save=window.__saveData||defaultSave();
  const partStart=getPartStartIndex(num);
  const savedIndex=save.storyIndexByPart&&save.storyIndexByPart[String(num)]!=null?save.storyIndexByPart[String(num)]:partStart;
  scIdx=clampStoryIndexToPart(savedIndex,num);
  startMusicTheme('story');
  gameState='story';showScreen('story-screen');saveGame({currentPart:num});advance(true);
}

function quitToMenu(){
  stopVO();
  stopMusic(0.5);
  if(gameState==='story')checkpointStory(currentPart,scIdx);
  if(gameState==='fight'||gameState==='post'||gameState==='pre')setPendingFight(currentPart,scIdx,fType);
  saveGame({currentPart});gameState='menu';showScreen('menu-screen');
  loadGame();refreshMenuLocks();
  UI.ctrls.style.display='none';UI.kbhint.style.display='none';
  UI.gCoins.style.display='none';UI.btnMenu.style.display='none';
  setEnvRage(false);hitStop=0;screenShake=0;player=null;enemy=null;
  isTyping=false;clearInterval(typingTimer);
  switchToNormalBg();
  const pi=document.getElementById('part-indicator');if(pi)pi.style.display='none';
  startMusicTheme('menu');
}
function refreshShopUI(){
  const allWeapons=['boxing_gloves','dagger','sai','woodstick','nunchaku','knives','katana','spear','staff','claws','lynx_claws','blood_reaper','composite_sword','ak47'];
  const allArmors=['lightarmor','heavyarmor','voidarmor'];
  allWeapons.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  allArmors.forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  ['rage2','strength','strength2','speed','speed2','endurance','endurance2'].forEach(n=>{const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');});
  if(weapon!=='none'){const el=document.getElementById(`buy-${weapon}`);if(el)el.classList.add('bought');}
  if(armor!=='none'){const el=document.getElementById(`buy-${armor}`);if(el)el.classList.add('bought');}
  if(rageMode2){const el=document.getElementById('buy-rage2');if(el)el.classList.add('bought');}
  if(strengthUpg>=1){const el=document.getElementById('buy-strength');if(el)el.classList.add('bought');}
  if(strengthUpg>=2){const el=document.getElementById('buy-strength2');if(el)el.classList.add('bought');}
  if(speedUpg>=1){const el=document.getElementById('buy-speed');if(el)el.classList.add('bought');}
  if(speedUpg>=2){const el=document.getElementById('buy-speed2');if(el)el.classList.add('bought');}
  if(enduranceUpg>=1){const el=document.getElementById('buy-endurance');if(el)el.classList.add('bought');}
  if(enduranceUpg>=2){const el=document.getElementById('buy-endurance2');if(el)el.classList.add('bought');}
}

function openShop(){initAudio();loadGame();refreshShopUI();UI.gCoins.style.display='flex';showScreen('shop-screen');}
function closeShop(){
  if(gameState==='story'||gameState==='fight'||gameState==='post'){
    showScreen(gameState==='story'?'story-screen':'hud-screen');
  } else {
    gameState='menu';showScreen('menu-screen');
    refreshMenuLocks();UI.gCoins.style.display='none';
  }
}

function shopToast(msg,col='#f5c842'){
  let t=document.getElementById('shop-toast');
  if(!t){t=document.createElement('div');t.id='shop-toast';
    t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:999;padding:10px 24px;border-radius:4px;font-family:Cinzel,serif;font-size:12px;font-weight:700;letter-spacing:3px;pointer-events:none;transition:opacity 0.4s;';
    document.body.appendChild(t);}
  t.innerText=msg;t.style.color=col;t.style.background='rgba(0,0,0,0.85)';
  t.style.border=`1px solid ${col}`;t.style.opacity='1';
  clearTimeout(t._hide);t._hide=setTimeout(()=>t.style.opacity='0',1800);
}
function buyItem(kind,name,price){
  if(coins<price){shopToast('NOT ENOUGH COINS','#ff003c');return;}
  updateCoins(-price);
  if(kind==='weapon'){
    weapon=name;
    ['boxing_gloves'].forEach(n=>{
      const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');
    });
    document.getElementById(`buy-${name}`).classList.add('bought');
    let katanaBonusMsg='';
    if(name==='katana'){
      let saveData={};
      try{ saveData=JSON.parse(localStorage.getItem('chug_shadow_v3_save')||'{}')||{}; }catch(_){ saveData={}; }
      let rewardParts=[];
      if(!saveData.katanaCoinBonusClaimed){
        if(typeof updateCoins==='function') updateCoins(20000);
        saveData.katanaCoinBonusClaimed=true;
        rewardParts.push('+20000 🪙');
      }
      if(!saveData.katanaDiamondBonusClaimed){
        if(typeof updateGems==='function') updateGems(1000);
        saveData.katanaDiamondBonusClaimed=true;
        rewardParts.push('+1000 💎');
      }
      try{ localStorage.setItem('chug_shadow_v3_save', JSON.stringify(Object.assign({}, saveData, { weapon:name }))); }catch(_){ }
      if(rewardParts.length) katanaBonusMsg=' · '+rewardParts.join(' · ')+' BONUS';
    }
    saveGame();shopToast('✓ EQUIPPED: '+name.toUpperCase()+katanaBonusMsg);
  } else if(kind==='armor'){
    armor=name;
    ['lightarmor','heavyarmor','voidarmor'].forEach(n=>{
      const el=document.getElementById(`buy-${n}`);if(el)el.classList.remove('bought');
    });
    document.getElementById(`buy-${name}`).classList.add('bought');
    saveGame();shopToast('✓ ARMOR: '+name.toUpperCase());
  } else if(kind==='upgrade'){
    if(name==='rage2'){rageMode2=true;document.getElementById('buy-rage2').classList.add('bought');saveGame();shopToast('✓ RAGE MODE II UNLOCKED','#ff4400');}
    else if(name==='strength'){
      if(strengthUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      strengthUpg=1;document.getElementById('buy-strength').classList.add('bought');saveGame();shopToast('+5 STRENGTH UNLOCKED');
    } else if(name==='strength2'){
      if(strengthUpg<1){shopToast('REQUIRES STRENGTH I','#888');updateCoins(price);return;}
      if(strengthUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      strengthUpg=2;document.getElementById('buy-strength2').classList.add('bought');saveGame();shopToast('+10 STRENGTH UNLOCKED');
    } else if(name==='speed'){
      if(speedUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      speedUpg=1;document.getElementById('buy-speed').classList.add('bought');saveGame();shopToast('+2 SPEED UNLOCKED');
    } else if(name==='speed2'){
      if(speedUpg<1){shopToast('REQUIRES SPEED I','#888');updateCoins(price);return;}
      if(speedUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      speedUpg=2;document.getElementById('buy-speed2').classList.add('bought');saveGame();shopToast('+4 SPEED UNLOCKED');
    } else if(name==='endurance'){
      if(enduranceUpg>=1){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      enduranceUpg=1;document.getElementById('buy-endurance').classList.add('bought');saveGame();shopToast('+30 HP + REGEN UNLOCKED','#00e5ff');
    } else if(name==='endurance2'){
      if(enduranceUpg<1){shopToast('REQUIRES ENDURANCE I','#888');updateCoins(price);return;}
      if(enduranceUpg>=2){shopToast('ALREADY PURCHASED','#888');updateCoins(price);return;}
      enduranceUpg=2;document.getElementById('buy-endurance2').classList.add('bought');saveGame();shopToast('+60 HP + REDUCTION UNLOCKED','#00e5ff');
    }
  }
}

// ── PART NAMES ──
const PART_NAMES={"1": "THE FALL", "2": "THE WATCHER", "3": "ECHOES", "4": "LEFT BEHIND", "5": "CONTROLLED", "6": "VANISHED", "7": "REWRITE", "8": "FRAGMENTS", "9": "BREAKPOINT", "10": "ERASURE", "11": "AFTERIMAGE", "12": "AROWH", "13": "FRACTURE", "14": "RECOVERY", "15": "TIMING", "16": "THE HOODED ONE", "17": "THE FOOTPRINT", "18": "SPLIT HORN", "19": "THE NAME AT THE EDGE", "20": "TOO LATE", "21": "ASH CAMP", "22": "ZEPH", "23": "GLASS HOLLOW", "24": "KNIGHT'S TABLE", "25": "BRIDGE OF ASH", "26": "THE RETURN OF TWELVE", "27": "WHAT TWELVE TAUGHT", "28": "VARKUL'S WEATHER", "29": "BREAKING ELEVEN", "30": "THE NAME IN THE MED LEDGER", "31": "THE ROAD THAT CUTS BACK", "32": "NO.4 RIVEN / NO.10 ZEIGRAN", "33": "THE GIRL CALLED O.O", "34": "NINE EATS ROADS", "35": "MED TRANSFER", "36": "EIGHT BREAKS, CAMP HOLDS", "37": "JUNO HUNTS", "38": "SEVEN DOWN", "39": "SIX STARVES", "40": "THE SECOND TABLE", "41": "SILENCE MARKET", "42": "FIVE FALLS QUIETLY", "43": "FORTRESS DISCIPLINE", "44": "FOUR BREAKS OPEN", "45": "THE SEAT TURNS", "46": "THREE WANTS COMMAND", "47": "WE CHOOSE THE LINE", "48": "XOLLONOX", "49": "TWO FORGETS US", "50": "CROWN"};
const PART_COINS={"1": 150, "2": 200, "3": 250, "4": 300, "5": 350, "6": 400, "7": 450, "8": 500, "9": 550, "10": 600, "11": 650, "12": 700, "13": 750, "14": 800, "15": 850, "16": 900, "17": 950, "18": 1000, "19": 1050, "20": 1100, "21": 1150, "22": 1200, "23": 1250, "24": 1300, "25": 1350, "26": 1400, "27": 1450, "28": 1500, "29": 1550, "30": 1600, "31": 1650, "32": 1700, "33": 1750, "34": 1800, "35": 1850, "36": 1900, "37": 1950, "38": 2000, "39": 2050, "40": 2100, "41": 2150, "42": 2200, "43": 2250, "44": 2300, "45": 2350, "46": 2400, "47": 2450, "48": 2500, "49": 2550, "50": 2600};
let _pendingPartEnd=null; // {part, nextPart}

// ── DIALOGUE EFFECTS ──
const SPEAKER_THEME={
  CHUG:'CHUG',GUIDE:'GUIDE',SYSTEM:'SYSTEM',WATCHER:'WATCHER',
  ENEMY:'ENEMY',ENEMIES:'ENEMY',CHAT:'',VOICE:'WATCHER',REFLECTION:'WATCHER',
  MINI:'ELITE',ELITE:'ELITE',CONTROLLED:'CONTROLLED',FIGURE:'FIGURE',
  DONATION:'',WATCHER2:'WATCHER'
};
function getSpeakerTheme(base){return SPEAKER_THEME[base]||'';}

function applyDialogueTheme(base,isGlitch){
  UI.dbox.className='dialogue-box';
  if(isGlitch)UI.dbox.classList.add('dbox-GLITCH');
  const theme=getSpeakerTheme(base);
  if(theme)UI.dbox.classList.add(`dbox-${theme}`);
}

function triggerDialogueEntrance(){
  UI.dtxt.style.animation='none';
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{UI.dtxt.style.animation='';});
  });
}

// ── Speaker portrait icon map ──
const SPEAKER_ICONS={'CHUG':'🥊','GUIDE':'🌿','SYSTEM':'⚔','WATCHER':'👁','ENEMY':'💀','ENEMIES':'💀','CHAT':'💬','DONATION':'💬','VOICE':'👁','REFLECTION':'🌑','CONTROLLED':'🔗','FIGURE':'❓','ELITE':'⚡','MINI':'⚡','KAIZEN':'🔥','RAEVAN':'🏹','SORYA':'🌀','HARJEEV':'📋','SOLO':'🔥','TORA':'🐯','ADDY':'💨','LEGEND':'⚡','OO':'👁','REE':'🎙','KNIGHT':'♞','NEONKD':'🌐','YASSINE':'🌙','FRIEND':'❓','MR':'🪞','KADE':'📐','LYNEX':'🐍','VARKUL':'⚔','ZEIGRAN':'🌋','KAITH':'⛓','RHAZIEL':'🔕','DREAD':'☠','RIVEN':'🎯'};

function _setSpeakerPortrait(baseSpeaker){
  const frame = document.getElementById('dlgPortraitFrame');
  const icon  = document.getElementById('dlgPortraitIcon');
  const dava  = document.getElementById('dava');
  if(!frame||!icon||!dava) return;
  const emoji = baseSpeaker ? (SPEAKER_ICONS[baseSpeaker] || '⚔') : '📜';
  icon.textContent = emoji;
  dava.style.display = 'flex';
  frame.classList.toggle('dlg-portrait-narrator', !baseSpeaker);
}

// ── Dojo scroll panel helpers ──
function showDojoDialogue(speaker, text, icon){
  const panel = document.getElementById('dojo-dialogue');
  const sp    = document.getElementById('dojoSpeaker');
  const tx    = document.getElementById('dojoText');
  const pt    = document.getElementById('dojoPortrait');
  if(!panel) return;
  if(sp) sp.textContent  = speaker || '';
  if(tx) tx.textContent  = text || '';
  if(pt) pt.textContent  = icon || SPEAKER_ICONS[speaker] || '🥋';
  panel.classList.add('dojo-visible');
}
function hideDojoDialogue(){
  const panel = document.getElementById('dojo-dialogue');
  if(panel){ panel.classList.remove('dojo-visible'); }
}

// ── RENDERDILAOGUE ──
function renderDialogue(s){
  // Hide dojo panel when story panel is active
  hideDojoDialogue();

  let raw=s.t,speaker='',text=raw;
  let match=raw.match(/^([A-Z0-9\s]+(?:\([^)]+\))?):\s*(.*)/is);
  if(match){speaker=match[1].trim();text=match[2].trim();}
  else if(raw.startsWith('['))speaker='';
  else if(raw.includes('SYSTEM:'))speaker='SYSTEM';

  let baseSpeaker=speaker.split(/[\s(:]/)[0].replace(/[^A-Z0-9]/g,'');

  // Avatar/portrait
  if(baseSpeaker){
    UI.dname.innerText=speaker;
    UI.dname.style.display='block';
    _setSpeakerPortrait(baseSpeaker);
  } else {
    UI.dname.innerText='Narrator';
    UI.dname.style.display='block';
    _setSpeakerPortrait('');
  }

  // Apply speaker-specific box theming
  applyDialogueTheme(baseSpeaker||'NARRATOR',!!s.gl);

  UI.dtxt.className=s.gl?'dlg-text glitch':'dlg-text';
  UI.dtxt.style.color=''; // parchment handles colour via CSS
  if(s.gl){doFlash();screenShake=4;}

  // Entrance animation reset
  triggerDialogueEntrance();

  // Hide continue btn while typing
  const btn = document.getElementById('dlgContinueBtn');
  if(btn) btn.classList.remove('visible');

  isTyping=true;fullText=text.replace(/\n/g,'<br>');UI.dtxt.innerHTML='';let charIdx=0;
  clearInterval(typingTimer);

  const isControlled=(baseSpeaker==='CONTROLLED');
  typingTimer=setInterval(()=>{
    if(fullText.substr(charIdx,4)==='<br>'){UI.dtxt.innerHTML+='<br>';charIdx+=4;}
    else{
      const ch=fullText.charAt(charIdx);
      UI.dtxt.innerHTML+=ch;
      if(ch.trim()){
        if(isControlled){beep(Math.random()<0.3?440:880,'square',0.008,0.006);}
        else{beep(880,'square',0.009,0.007);}
      }
      charIdx++;
    }
    if(charIdx>=fullText.length){
      clearInterval(typingTimer); isTyping=false;
      // Show continue button once text finishes
      if(btn) btn.classList.add('visible');
    }
  },isControlled?Math.floor(16+Math.random()*30):22);
}

// Public API
window.showDojoDialogue  = showDojoDialogue;
window.hideDojoDialogue  = hideDojoDialogue;


// ── PART END CARD ──
function showPartEndCard(part){
  const resolvedChapter = getChapterByPart(part);
  activeChapter = resolvedChapter;
  activeAct = CHAPTER_ACT[String(resolvedChapter)] || CHAPTER_ACT[resolvedChapter] || activeAct;
  const chapterParts = CHAPTER_PARTS[String(resolvedChapter)] || CHAPTER_PARTS[resolvedChapter] || [part];
  const partIndexInChapter = chapterParts.indexOf(Number(part));
  const nextPartInChapter = partIndexInChapter >= 0 ? (chapterParts[partIndexInChapter + 1] || null) : null;
  const isChapterEnd = !nextPartInChapter;
  const bonus=PART_COINS[part]||150;
  const romans=['','I','II','III','IV','V','VI'];

  document.getElementById('pecPartLabel').innerText=`PART ${romans[part]||part}`;
  document.getElementById('pecTitle').innerText=PART_NAMES[part]||`PART ${part}`;
  document.getElementById('pecCoins').innerText=`+${bonus} 🪙`;

  const pecBtn=document.querySelector('.pec-btn');
  if(isChapterEnd){
    const unlockMsgs={
      1:'CHAPTER II — VANISHED UNLOCKED',
      2:'CHAPTER III — AFTERIMAGE UNLOCKED',
      3:'ACT II — AFTERIMAGE CONTINUES...'
    };
    document.getElementById('pecUnlocked').innerText=unlockMsgs[activeChapter]||'JOURNEY CONTINUES...';
    if(pecBtn)pecBtn.innerText='FINISH CHAPTER ▶';
  } else {
    const nName=PART_NAMES[nextPartInChapter]||`PART ${nextPartInChapter}`;
    document.getElementById('pecUnlocked').innerText=`NEXT: PART ${romans[nextPartInChapter]} — ${nName}`;
    if(pecBtn)pecBtn.innerText='CONTINUE ▶';
  }

  ['pecS1','pecS2','pecS3'].forEach(id=>{
    const el=document.getElementById(id);
    el.className='pec-star';
    if(id==='pecS2')el.classList.add('big');
  });


/* ─── js/shop.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   SHOP + COINS
   buyItem(), part names, part completion coins.
════════════════════════════════════════════════ */

_pendingPartEnd={part,nextPart:nextPartInChapter,bonus,isChapterEnd};
  showScreen('part-end-screen');
  gameState='part-end';
  startMusicTheme('partend');

  setTimeout(()=>lightStar('pecS1'),400);
  setTimeout(()=>lightStar('pecS2'),700);
  setTimeout(()=>lightStar('pecS3'),950);
  setTimeout(()=>coinBurstFX(bonus),1100);

  updateCoins(bonus);
  updateChapterUnlock(part+1);
  saveGame();
  refreshMenuLocks();
}

function lightStar(id){
  const el=document.getElementById(id);
  el.classList.add('lit');
  beep(600+Math.random()*200,'sine',0.3,0.06);
}

function coinBurstFX(amount){
  const card=document.getElementById('partEndCard');
  if(!card)return;
  const rect=card.getBoundingClientRect();
  const cx=rect.left+rect.width/2;
  const cy=rect.top+rect.height*0.55;
  const count=Math.min(12,Math.floor(amount/20));
  for(let i=0;i<count;i++){
    const el=document.createElement('div');
    el.className='coin-burst';el.innerText='🪙';
    const angle=Math.random()*Math.PI*2;
    const dist=60+Math.random()*80;
    el.style.left=cx+'px';el.style.top=cy+'px';
    el.style.setProperty('--tx',(Math.cos(angle)*dist)+'px');
    el.style.setProperty('--ty',(Math.sin(angle)*dist-40)+'px');
    el.style.animationDelay=(i*0.06)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200+i*60);
  }
}

function partEndContinue(){
  if(!_pendingPartEnd)return;
  const{part,nextPart,isChapterEnd}=_pendingPartEnd;
  _pendingPartEnd=null;
  if(isChapterEnd){
    // mark finished part as fully consumed so it does not resume into the same ending again
    try{
      const endIdx = getPartEndIndex(part);
      checkpointStory(part, endIdx + 1);
      saveGame({ currentPart: part });
    }catch(_e){}
    stopVO();
    gameState='menu';
    showScreen('menu-screen');
    UI.gCoins.style.display='none';
    UI.btnMenu.style.display='none';
    UI.ctrls.style.display='none';
    UI.kbhint.style.display='none';
    player=null; enemy=null;
    startMusicTheme('menu');
    loadGame();
    refreshMenuLocks();
  } else {
    startMusicTheme('story');
    startPart(nextPart);
  }
}


// ════════════════════════════════════════════════════════════
//  TOURNAMENT · SURVIVAL · REWARD SYSTEM  (v39)
// ════════════════════════════════════════════════════════════

// ── Fight performance tracking ────────────────────────────────
// Reset each fight, read at endMatch time
window.__fightStats = { firstStrike:false, maxCombo:0, perfect:true, rounds:0, won:false };

// Patch into checkRound to track stats — thin wrapper
(function _patchCheckRoundForStats(){
  const _orig = typeof checkRound === 'function' ? checkRound : null;
  if(!_orig || _orig.__statsPatched) return;
  window.checkRound = function(){
    // track round count and perfect (player took no damage this round)
    if(window.__fightStats) window.__fightStats.rounds++;
    _orig.call(this);
  };
  window.checkRound.__statsPatched = true;
})();

// Call after player first hits enemy in a round
function _trackFirstStrike(){ if(window.__fightStats && !window.__fightStats.firstStrike){ window.__fightStats.firstStrike = true; } }
// Called from showCombo
function _trackCombo(count){ if(window.__fightStats) window.__fightStats.maxCombo = Math.max(window.__fightStats.maxCombo||0, count); }
// Called from takeHit on player
function _trackPlayerHit(){ if(window.__fightStats) window.__fightStats.perfect = false; }

// Hook into existing showCombo and takeHit
(function _hookStatTracking(){
  const origShowCombo = typeof showCombo === 'function' ? showCombo : null;
  if(origShowCombo && !origShowCombo.__statsHooked){
    window.showCombo = function(n){ _trackCombo(n); origShowCombo(n); };
    window.showCombo.__statsHooked = true;
  }
  // Patch Fighter.prototype.takeHit to detect player damage
  if(typeof Fighter !== 'undefined' && !Fighter.prototype.takeHit.__playerHitHooked){
    const _origTH = Fighter.prototype.takeHit;
    Fighter.prototype.takeHit = function(dmg, fd, heavy){
      if(this.isP) _trackPlayerHit();
      if(!this.isP) _trackFirstStrike();
      _origTH.call(this, dmg, fd, heavy);
    };
    Fighter.prototype.takeHit.__playerHitHooked = true;
  }
})();

// ── XP table (overwrite old flat curve with better one) ───────
// Levels 1-50: reasonable ramp — early levels fast, later slow
window.__applyXPTableFix = function __applyXPTableFix(){
  try {
    if (!Array.isArray(XP_TABLE) || !XP_TABLE.length) return;
    let x = 200;
    for (let i = 0; i < XP_TABLE.length; i++) {
      XP_TABLE[i] = x;
      x = Math.floor(x * (i < 10 ? 1.25 : i < 25 ? 1.18 : 1.12));
    }
  } catch (err) {
    console.warn('XP table patch skipped:', err);
  }
};

// Early-safe intro globals so inline onclick handlers never crash
window.introSelect = window.introSelect || function introSelect(action){
  const run = function(){
    if (typeof window.__realIntroSelect === 'function') return window.__realIntroSelect(action);
    if (typeof window._introTransition === 'function') window._introTransition();
    if (action === 'continue' && typeof continueGame === 'function') return setTimeout(() => continueGame(), 680);
    if (typeof newGame === 'function') return setTimeout(() => newGame(), 680);
  };
  return run();
};
window.introHandleClick = window.introHandleClick || function introHandleClick(e){
  if (e && e.target && e.target.classList && e.target.classList.contains('intro-menu-btn')) return;
  let has = false;
  try { has = !!localStorage.getItem('chug_shadow_v3_save'); } catch(_) {}
  return window.introSelect(has ? 'continue' : 'new');
};

// ── Reward calculation ────────────────────────────────────────

function _getExpForLevel(lv){ return typeof XP_TABLE !== 'undefined' ? (XP_TABLE[Math.max(0,lv-1)] || 300) : 300; }

function calculateFightRewards(opts){
  // opts: { mode, chapterNum, matchNum, roundNum, won, level, fightStats }
  const mode     = opts.mode || 'story';
  const depth    = opts.matchNum || opts.roundNum || 1;
  const won      = !!opts.won;
  const lv       = opts.level || (_lvl||1);
  const fs       = opts.fightStats || window.__fightStats || {};

  const modeBase = { story:60, survival:80, tournament:100 }[mode] || 60;
  const depthMul = 1 + (depth - 1) * 0.12;
  const lvBonus  = Math.floor(lv * 1.5);

  const prize      = won ? Math.floor(modeBase * depthMul + lvBonus) : Math.floor(modeBase * 0.15);
  const perfect    = (won && fs.perfect)  ? Math.floor(prize * 0.4) : 0;
  const firstStrike= (won && fs.firstStrike) ? Math.floor(depth * 2) : 0;
  const maxCombo   = won ? Math.floor((fs.maxCombo||0) * depth * 0.5) : 0;
  const brutal     = (won && (fs.maxCombo||0) >= 4) ? Math.floor(depth * 3) : 0;
  const modeBonus  = won ? { survival: Math.floor(depth * 8), tournament: Math.floor(depth * 10), story: 0 }[mode] || 0 : 0;

  const totalCoins = prize + perfect + firstStrike + maxCombo + brutal + modeBonus;
  const totalXP    = won ? Math.floor(totalCoins * (mode === 'tournament' ? 0.8 : mode === 'survival' ? 0.9 : 0.6)) : Math.floor(prize * 0.2);
  const starScore  = Math.floor(totalXP / 10);

  return {
    rows: [
      { label:'PRIZE',       val: prize },
      { label:'PERFECT ×'+(fs.perfect&&won?'1':'0'), val: perfect },
      { label:'FIRST STRIKE ×'+(fs.firstStrike&&won?'1':'0'), val: firstStrike },
      { label:'MAX COMBO ×'+(fs.maxCombo||0),  val: maxCombo },
      { label:'BRUTAL STYLE', val: brutal },
      { label: mode==='survival'?'SURVIVAL BONUS':mode==='tournament'?'TOURN. BONUS':'', val: modeBonus },
    ].filter(r => r.label),
    totalCoins, totalXP, starScore,
  };
}

// ── Reward screen display ─────────────────────────────────────

let _rewardContinueCb = null;

function showRewardScreen(opts){
  // opts: { heading, headingClass, modeBanner, progress, rewards, onContinue }
  const el = document.getElementById('reward-screen'); if(!el) return;
  const rwd = opts.rewards;

  document.getElementById('rwdHeading').textContent  = opts.heading || 'You win!';
  document.getElementById('rwdHeading').className    = 'rwd-heading ' + (opts.headingClass||'win');
  document.getElementById('rwdModeBanner').textContent = opts.modeBanner || '';
  document.getElementById('rwdProgress').textContent  = opts.progress || '';
  document.getElementById('rwdTotal').textContent     = rwd.totalCoins;
  document.getElementById('rwdStarVal').textContent   = rwd.starScore;

  const rows = document.getElementById('rwdRows');
  rows.innerHTML = '';
  rwd.rows.forEach((row, i) => {
    const div = document.createElement('div');
    div.className = 'rwd-row';
    div.style.animationDelay = (0.08 + i * 0.06) + 's';
    div.innerHTML = `<span class="rwd-label">${row.label}</span>
      <span class="rwd-value"><div class="rwd-coin-icon"></div>${row.val}</span>`;
    rows.appendChild(div);
  });

  _rewardContinueCb = opts.onContinue || null;
  gameState = 'reward';
  showScreen('reward-screen');
  startMusicTheme('partend');

  // Grant coins + XP
  if(typeof updateCoins === 'function') updateCoins(rwd.totalCoins);
  if(typeof gainXP === 'function') gainXP(rwd.totalXP);
  v9SaveGame();
}

function rewardContinue(){
  if(_rewardContinueCb){ _rewardContinueCb(); _rewardContinueCb = null; }
  else { gameState='menu'; showScreen('menu-screen'); }
}

// ════════════════════════════════════════════════════════════
//  SURVIVAL MODE
// ════════════════════════════════════════════════════════════

const SURVIVAL_ENEMY_TYPES = [1, 2, 4, 5, 3, 7, 9, 10, 12, 13]; // 10 escalating fType values

let _survivalState = null; // { chapter, round, maxRound, chapterNum }

function startSurvivalMode(ch){
  if(typeof initAudio==='function') initAudio();
  loadGame();
  _survivalState = {
    chapter: ch,
    chapterNum: ch,
    round: 0,
    maxRound: 10,
    startTime: Date.now(),
  };
  _survivalNextRound();
}

function _survivalNextRound(){
  const s = _survivalState;
  s.round++;
  if(s.round > s.maxRound){
    _survivalComplete();
    return;
  }

  // Reset fight stats
  window.__fightStats = { firstStrike:false, maxCombo:0, perfect:true, rounds:0, won:false };

  const fTypeIdx = Math.min(s.round - 1, SURVIVAL_ENEMY_TYPES.length - 1);
  const fType    = SURVIVAL_ENEMY_TYPES[fTypeIdx];

  // Scale enemy difficulty on the Fighter via a global modifier
  const scaleMul = 1 + (s.round - 1) * 0.14;    // +14% per round
  const lvPenalty= Math.max(0, (12 - (_lvl||1)) * 0.03); // under lv12 = extra +3% per missing level
  window.__survivalEnemyMul = scaleMul + lvPenalty;

  // Show round banner then start fight
  showScreen('hud-screen');
  UI.gCoins.style.display = 'block';
  UI.btnMenu.style.display = 'none'; // no quitting mid-survival
  showBanner(`SURVIVAL · ROUND ${s.round}`, ()=>{
    showBanner('FIGHT!', ()=>{ gameState='fight'; }, 700);
  }, 1000);

  fType_survival = fType; // store for endMatch hook
  initFight(fType);
}

function _survivalComplete(){
  const s = _survivalState;
  const rwd = calculateFightRewards({
    mode:'survival', chapterNum:s.chapterNum, roundNum:s.maxRound,
    won:true, level:_lvl||1, fightStats: window.__fightStats,
  });
  // Bonus for full survival clear
  rwd.totalCoins += 200;
  rwd.totalXP    += 150;
  rwd.rows.push({ label:'SURVIVAL CLEAR', val: 200 });

  // Save best round
  const save = window.__saveData || {};
  const key  = `survivalBest_ch${s.chapterNum}`;
  if((save[key]||0) < s.maxRound){ save[key] = s.maxRound; saveGame(); }

  showRewardScreen({
    heading:'Survival Cleared!', headingClass:'clear',
    modeBanner:`SURVIVAL · CHAPTER ${s.chapterNum}`,
    progress:`All ${s.maxRound} rounds complete`,
    rewards: rwd,
    onContinue: ()=>{ _survivalState=null; gameState='menu'; showScreen('menu-screen'); loadGame(); refreshMenuLocks(); }
  });
  _survivalState = null;
}

function _survivalFailed(){
  const s = _survivalState;
  const rwd = calculateFightRewards({
    mode:'survival', chapterNum:s.chapterNum, roundNum:s.round,
    won:false, level:_lvl||1, fightStats: window.__fightStats,
  });
  // Partial coin reward for rounds reached
  rwd.totalCoins += (s.round - 1) * 20;
  rwd.rows.push({ label:`REACHED ROUND ${s.round}`, val:(s.round-1)*20 });

  showRewardScreen({
    heading:'Defeated', headingClass:'defeat',
    modeBanner:`SURVIVAL · CHAPTER ${s.chapterNum}`,
    progress:`Reached round ${s.round} of ${s.maxRound}`,
    rewards: rwd,
    onContinue: ()=>{ _survivalState=null; gameState='menu'; showScreen('menu-screen'); loadGame(); refreshMenuLocks(); }
  });
  _survivalState = null;
}

// ════════════════════════════════════════════════════════════
//  TOURNAMENT MODE
// ════════════════════════════════════════════════════════════

const TOURNAMENT_MATCHES = 24;
const TOURNAMENT_FTYPES = [
  1,1,2,2, 4,4,5,3, 7,7,9,9, 10,10,12,12, 13,13,14,14, 15,18,19,20
]; // 24 escalating enemies

let _tournamentState = null;

function startTournamentMode(ch){
  if(typeof initAudio==='function') initAudio();
  loadGame();

  // Check for saved progress
  const save = window.__saveData || {};
  const savedMatch = save[`tournamentProgress_ch${ch}`] || 0;

  _tournamentState = {
    chapter: ch,
    chapterNum: ch,
    match: savedMatch,
    totalMatches: TOURNAMENT_MATCHES,
    coinsAccum: 0,
    xpAccum: 0,
  };

  _tournamentNextMatch();
}

function _tournamentNextMatch(){
  const t = _tournamentState;
  t.match++;
  if(t.match > t.totalMatches){
    _tournamentVictory();
    return;
  }

  window.__fightStats = { firstStrike:false, maxCombo:0, perfect:true, rounds:0, won:false };

  const fTypeIdx = Math.min(t.match - 1, TOURNAMENT_FTYPES.length - 1);
  const fType    = TOURNAMENT_FTYPES[fTypeIdx];

  // Difficulty scaling: harder every 4 matches
  const tier   = Math.floor((t.match - 1) / 4);  // 0-5
  window.__tournamentEnemyMul = 1 + tier * 0.18;  // +18% per tier

  showScreen('hud-screen');
  UI.gCoins.style.display = 'block';
  UI.btnMenu.style.display = 'none';

  const matchNames = ['QUALIFIER','QUALIFIER','FIRST ROUND','FIRST ROUND',
    'QUARTER-FINAL','QUARTER-FINAL','QUARTER-FINAL','QUARTER-FINAL',
    'SEMI-FINAL','SEMI-FINAL','SEMI-FINAL','SEMI-FINAL',
    'GRAND PRIX','GRAND PRIX','GRAND PRIX','GRAND PRIX',
    'ELITE BRACKET','ELITE BRACKET','ELITE BRACKET','ELITE BRACKET',
    'CHAMPIONSHIP','CHAMPIONSHIP','CHAMPIONSHIP','GRAND CHAMPION'];

  const bracket = matchNames[t.match-1] || 'MATCH';

  showBanner(`${bracket} · ${t.match}/${t.totalMatches}`, ()=>{
    showBanner('FIGHT!', ()=>{ gameState='fight'; }, 700);
  }, 1200);

  initFight(fType);
}

function _tournamentMatchWon(){
  const t = _tournamentState;
  const rwd = calculateFightRewards({
    mode:'tournament', chapterNum:t.chapterNum, matchNum:t.match,
    won:true, level:_lvl||1, fightStats: window.__fightStats,
  });
  t.coinsAccum += rwd.totalCoins;
  t.xpAccum    += rwd.totalXP;

  // Save progress checkpoint
  const save = window.__saveData || {};
  save[`tournamentProgress_ch${t.chapterNum}`] = t.match;
  if(typeof saveGame==='function') saveGame();

  // After match 8, 16, 24 show a mini reward screen; otherwise just continue
  const milestone = (t.match % 8 === 0) || t.match === t.totalMatches;
  if(milestone){
    showRewardScreen({
      heading: t.match === t.totalMatches ? 'Champion!' : 'Checkpoint!',
      headingClass: 'win',
      modeBanner: `TOURNAMENT · CHAPTER ${t.chapterNum}`,
      progress: `Match ${t.match} of ${t.totalMatches}`,
      rewards: rwd,
      onContinue: ()=>{ _tournamentNextMatch(); }
    });
  } else {
    if(typeof updateCoins==='function') updateCoins(rwd.totalCoins);
    if(typeof gainXP==='function') gainXP(rwd.totalXP);
    setTimeout(()=>_tournamentNextMatch(), 400);
  }
}

function _tournamentVictory(){
  const t = _tournamentState;
  const rwd = calculateFightRewards({
    mode:'tournament', chapterNum:t.chapterNum, matchNum:t.totalMatches,
    won:true, level:_lvl||1, fightStats:window.__fightStats,
  });
  rwd.totalCoins += 500;
  rwd.totalXP    += 400;
  rwd.rows.push({ label:'TOURNAMENT CHAMPION', val: 500 });

  // Clear tournament progress
  const save = window.__saveData || {};
  save[`tournamentProgress_ch${t.chapterNum}`] = 0;
  if(typeof saveGame==='function') saveGame();

  showRewardScreen({
    heading:'Champion!', headingClass:'clear',
    modeBanner:`TOURNAMENT · CHAPTER ${t.chapterNum}`,
    progress:`All ${t.totalMatches} matches complete`,
    rewards: rwd,
    onContinue: ()=>{ _tournamentState=null; gameState='menu'; showScreen('menu-screen'); loadGame(); refreshMenuLocks(); }
  });
  _tournamentState = null;
}

function _tournamentFailed(){
  const t = _tournamentState;
  const rwd = calculateFightRewards({
    mode:'tournament', chapterNum:t.chapterNum, matchNum:t.match,
    won:false, level:_lvl||1, fightStats:window.__fightStats,
  });
  rwd.rows.push({ label:`ELIMINATED MATCH ${t.match}`, val:0 });

  // Reset tournament (no checkpoint carry on loss)
  const save = window.__saveData || {};
  save[`tournamentProgress_ch${t.chapterNum}`] = 0;
  if(typeof saveGame==='function') saveGame();

  showRewardScreen({
    heading:'Eliminated', headingClass:'defeat',
    modeBanner:`TOURNAMENT · CHAPTER ${t.chapterNum}`,
    progress:`Reached match ${t.match} of ${t.totalMatches}`,
    rewards: rwd,
    onContinue: ()=>{ _tournamentState=null; gameState='menu'; showScreen('menu-screen'); loadGame(); refreshMenuLocks(); }
  });
  _tournamentState = null;
}

// ── Patch Fighter constructor to apply mode difficulty multipliers ──
(function _patchFighterForModes(){
  if(typeof Fighter === 'undefined') return;
  const _origCon = Fighter;
  // We patch via startRound override instead (safer)
  const _origSR = typeof startRound==='function' ? startRound : null;
  if(!_origSR || _origSR.__modeScalePatched) return;
  window.startRound = function(n){
    _origSR.call(this, n);
    if(typeof enemy === 'undefined' || !enemy) return;
    const mul = window.__survivalEnemyMul || window.__tournamentEnemyMul || 1;
    if(mul > 1){
      enemy.maxHp = Math.floor(enemy.maxHp * mul);
      enemy.hp    = enemy.maxHp;
      enemy.dmg   = Math.floor((enemy.dmg||10) * mul);
    }
  };
  window.startRound.__modeScalePatched = true;
  window.startRound.__rageTierPatched  = true;
})();

// ── Patch endMatch to route survival/tournament outcomes ──────
(function _patchEndMatchForModes(){
  const _origEM = typeof endMatch==='function' ? endMatch : null;
  if(!_origEM || _origEM.__modesPatched) return;
  window.endMatch = function(win){
    window.__fightStats.won = win;
    // Clear mode multipliers
    const wasSurvival   = !!_survivalState;
    const wasTournament = !!_tournamentState;

    if(wasSurvival){
      window.__survivalEnemyMul = 1;
      setEnvRage(false); UI.ctrls.style.display='none'; UI.kbhint.style.display='none';
      startMusicTheme('story'); switchToNormalBg();
      if(win) _survivalNextRound();
      else    _survivalFailed();
      return;
    }
    if(wasTournament){
      window.__tournamentEnemyMul = 1;
      setEnvRage(false); UI.ctrls.style.display='none'; UI.kbhint.style.display='none';
      startMusicTheme('story'); switchToNormalBg();
      if(win) _tournamentMatchWon();
      else    _tournamentFailed();
      return;
    }
    _origEM.call(this, win);
  };
  window.endMatch.__modesPatched  = true;
  window.endMatch.__missionPatched = true;
})();

// Expose globals
window.startSurvivalMode    = startSurvivalMode;
window.startTournamentMode  = startTournamentMode;
window.showRewardScreen     = showRewardScreen;
window.rewardContinue       = rewardContinue;
window.calculateFightRewards= calculateFightRewards;

window.__pendingFightDialogue = window.__pendingFightDialogue || null;

function advance(force=false){
  if(gameState!=='story'&&!force)return;

  if(isTyping&&!force){
    clearInterval(typingTimer);
    UI.dtxt.innerHTML=fullText;
    isTyping=false;
    const btn=document.getElementById('dlgContinueBtn');
    if(btn) btn.classList.add('visible');
    return;
  }

  if(scIdx>=SCRIPT.length)return;
  const s=SCRIPT[scIdx];
  checkpointStory(currentPart,scIdx);

  if(s.end){
    UI.dtxt.innerHTML=s.t;
    UI.dname.style.display='none';
    UI.dava.style.display='none';
    UI.dbox.className='dialogue-box';
    document.querySelector('.dlg-hint').style.display='none';
    checkpointStory(currentPart,scIdx+1);
    clearPendingFight();
    window.__pendingFightDialogue = null;
    const endedPart=currentPart;
    setTimeout(()=>{
      document.querySelector('.dlg-hint').style.display='block';
      showPartEndCard(endedPart);
    },1200);
    return;
  }

  if(s.fight && !force){
    const pending = window.__pendingFightDialogue;
    if(!pending || pending.idx !== scIdx){
      renderDialogue({t: s.t || 'SYSTEM: FIGHT', gl: !!s.gl, col: s.col});
      window.__pendingFightDialogue = { idx: scIdx, fight: s.fight };
      return;
    }
    window.__pendingFightDialogue = null;
    setPendingFight(currentPart,scIdx,s.fight);
    initFight(s.fight);
    return;
  }

  window.__pendingFightDialogue = null;
  renderDialogue(s);
  scIdx++;
  checkpointStory(currentPart,scIdx);
}

// Pause/resume bg audio on tab visibility change
document.addEventListener('visibilitychange',()=>{
  if(document.hidden) pauseBgAudio();
  else resumeBgAudio();
});


/* Repaired main animation loop: restored after code pruning.
   Deleted systems are called only when their functions still exist. */
function loop(){
  requestAnimationFrame(loop);
  if((gameState==='fight'||gameState==='post'||gameState==='pre') && (player || enemy)){
    if (typeof tickRangedCooldown === 'function') tickRangedCooldown();
    if (typeof updateAkBullets === 'function') updateAkBullets(player, enemy);
    if (typeof updateRangeShots === 'function') updateRangeShots(player, enemy);
    if (typeof updateDomainAttacks === 'function') updateDomainAttacks(player, enemy);
  }
  if(gameState==='menu'){
    if(Math.random()>0.7)particles.push({x:Math.random()*W,y:H-110-Math.random()*220,
      vx:(Math.random()-.5)*0.3,vy:-Math.random()*0.5-0.15,life:1,
      col:'rgba(200,147,26,0.1)',w:Math.random()*2.5+0.5,tp:'m'});
  }
  if(hitStop>0){hitStop--;return;}
  ctx.clearRect(0,0,cvs.width,cvs.height);
  ctx.save();
  
  
  // SF2 PREMIUM ANIMATED DOJO
  if(gameState==='menu'){
    const t = Date.now() / 1000;

    // 1. Right Side: Outside Environment (Pink Sky & Mountains)
    const doorX = W * 0.52; // Where the sliding door ends

    // Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GND);
    skyGrad.addColorStop(0, '#fde1e7'); // soft upper pink
    skyGrad.addColorStop(0.5, '#fff0f3'); // pale middle
    skyGrad.addColorStop(1, '#ffffff'); // white horizon
    ctx.fillStyle = skyGrad;
    ctx.fillRect(doorX, 0, W - doorX, GND);

    // Distant Sun
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowColor = '#ffb3c6';
    ctx.shadowBlur = 60;
    ctx.beginPath();
    ctx.arc(doorX + (W-doorX)*0.4, GND*0.4, GND*0.25, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Layered Mountains
    const drawMountain = (offset, amp, freq, color, height) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(doorX, GND);
        for(let x = doorX; x <= W; x += 10) {
            let y = height + Math.sin(x * freq + offset) * amp + Math.cos(x * freq * 0.5) * (amp*0.5);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(W, GND);
        ctx.fill();
    };
    drawMountain(0, 20, 0.005, '#ffdbe4', GND*0.65);
    drawMountain(2, 30, 0.008, '#ffc2d1', GND*0.75);
    drawMountain(4, 15, 0.012, '#ff99ac', GND*0.88);

    // Cherry Blossom Tree Branch (High-quality silhouette)
    ctx.save();
    ctx.fillStyle = '#1a0b0e'; // Almost black with a hint of red
    ctx.beginPath();
    // Main thick branch coming from right
    ctx.moveTo(W, 0);
    ctx.lineTo(W, GND*0.3);
    ctx.bezierCurveTo(W*0.9, GND*0.3, W*0.8, GND*0.45, W*0.7, GND*0.4);
    ctx.bezierCurveTo(W*0.6, GND*0.35, W*0.65, GND*0.25, W*0.75, GND*0.25);
    ctx.bezierCurveTo(W*0.85, GND*0.25, W*0.9, GND*0.1, W, 0);
    // Sub branch
    ctx.moveTo(W*0.8, GND*0.36);
    ctx.bezierCurveTo(W*0.75, GND*0.5, W*0.6, GND*0.55, W*0.55, GND*0.5);
    ctx.bezierCurveTo(W*0.6, GND*0.45, W*0.7, GND*0.45, W*0.8, GND*0.36);
    ctx.fill();

    // Cherry Blossom Leaf Clusters
    const drawLeafCluster = (cx, cy, size) => {
        ctx.fillStyle = 'rgba(255, 128, 166, 0.85)'; // vibrant pink
        ctx.beginPath();
        ctx.arc(cx, cy, size, 0, Math.PI*2);
        ctx.arc(cx-size*0.5, cy-size*0.5, size*0.8, 0, Math.PI*2);
        ctx.arc(cx+size*0.6, cy-size*0.3, size*0.9, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 179, 201, 0.9)'; // lighter highlight
        ctx.beginPath();
        ctx.arc(cx-size*0.2, cy-size*0.2, size*0.6, 0, Math.PI*2);
        ctx.fill();
    };
    drawLeafCluster(W*0.7, GND*0.4, 25);
    drawLeafCluster(W*0.82, GND*0.3, 35);
    drawLeafCluster(W*0.6, GND*0.5, 18);
    drawLeafCluster(W*0.9, GND*0.45, 28);
    drawLeafCluster(W*0.95, GND*0.15, 40);
    ctx.restore();

    // 2. Left Side: Dojo Shoji Screens (Warm Golden Gradient)
    const shojiGrad = ctx.createLinearGradient(0, 0, 0, GND);
    shojiGrad.addColorStop(0, '#f9a826');
    shojiGrad.addColorStop(0.5, '#ffd659');
    shojiGrad.addColorStop(1, '#e67e22');

    ctx.fillStyle = shojiGrad;
    ctx.fillRect(0, 0, doorX, GND);

    // Glowing effect behind the paper
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(doorX*0.5, GND*0.5, 150, 0, Math.PI*2);
    ctx.fill();

    // Shoji Screen Wood Frames (Silhouette)
    ctx.fillStyle = '#140800'; // Dark silhouette
    const frameThick = 14;
    const gridThin = 4;

    // Main outer frames
    ctx.fillRect(0, 0, W, frameThick); // Top header
    ctx.fillRect(doorX - frameThick, 0, frameThick, GND); // Center divider

    // Left side grid pattern
    const cols = 4;
    const rows = 6;
    const cellW = doorX / cols;
    const cellH = GND / rows;

    for(let i = 0; i <= cols; i++) {
        let x = i * cellW;
        let w = (i===0 || i===cols) ? frameThick : gridThin;
        ctx.fillRect(x - w/2, 0, w, GND);
    }
    for(let j = 0; j <= rows; j++) {
        let y = j * cellH;
        let h = (j===0 || j===rows) ? frameThick : gridThin;
        ctx.fillRect(0, y - h/2, doorX, h);
    }

    // A secondary door overlapping slightly for depth
    ctx.fillStyle = 'rgba(249, 168, 38, 0.9)'; // Darker shoji paper
    const door2X = doorX;
    const door2W = 80;
    ctx.fillRect(door2X, 0, door2W, GND);
    ctx.fillStyle = '#140800';
    ctx.fillRect(door2X, 0, frameThick, GND); // Left edge
    ctx.fillRect(door2X + door2W - frameThick, 0, frameThick, GND); // Right edge
    for(let j = 0; j <= rows; j++) {
        let y = j * cellH;
        let h = (j===0 || j===rows) ? frameThick : gridThin;
        ctx.fillRect(door2X, y - h/2, door2W, h);
    }

    // 3. Floor (Dark Wood Gradient/Silhouette)
    const floorGrad = ctx.createLinearGradient(0, GND, 0, H);
    floorGrad.addColorStop(0, '#0a0300'); // very dark at edge
    floorGrad.addColorStop(1, '#000000'); // pitch black at bottom
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, GND, W, H-GND);

    // Floor horizon line glow (Separation from walls)
    ctx.fillStyle = 'rgba(255, 200, 100, 0.1)';
    ctx.fillRect(0, GND, W, 4);

    // 5. Falling Sakura Petals
    if(Math.random() > 0.35){
       particles.push({
           x: doorX + Math.random()*(W-doorX) + 50, // Spawn from right/outside
           y: -20, // Spawn above screen
           vx: -1.2 - Math.random()*2.0, // Float left
           vy: 0.8 + Math.random()*1.5,  // Float down
           life: 1.8,
           col: Math.random() > 0.5 ? '#ff9eb1' : '#ffc0cb',
           w: 4 + Math.random()*4,
           tp: 'f',
           rot: Math.random() * Math.PI * 2,
           rs: (Math.random() - 0.5) * 0.2 // Rotation speed
       });
    }
  }



  
  // Chapter Backgrounds for Story/Fight Modes
  if(gameState==='fight' || gameState==='story' || gameState==='post'){
      const t = Date.now() / 1000;
      // Use activeChapter, or fallback to currentPart math
      const chap = (typeof activeChapter !== 'undefined' && activeChapter) ? activeChapter : Math.ceil(currentPart / 5) || 1;
      drawChapterBackground(ctx, W, H, GND, chap, t);
  }

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
      if(!player){player=new Fighter(W*0.35,true);}
      // In menu/dojo — player is fully controllable, dummy enemy far away
      if(gameState==='menu'){
        // Full update so player can move and attack
        player.update({x:W+1000,w:0,h:0,y:GND,state:'idle',hitT:0,hp:999,maxHp:999,grabber:null});
        // Let player step deeper into dojo so the bag is reachable


/* ─── js/fight.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   FIGHT LOGIC
   Round system, HUD updates, win/lose conditions.
════════════════════════════════════════════════ */

// No extra cap — Fighter.update already clamps to W-w-10
      } else {
        player.update({x:-1000,w:0,h:0,y:GND,state:'idle',hitT:0,hp:999,maxHp:999,grabber:null});
      }
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
        const sz=p.w*(p.life+0.5); 
        if(p.rot !== undefined) {
            ctx.save();
            ctx.translate(p.x, p.y);
            p.rot += (p.rs || 0.05);
            ctx.rotate(p.rot);
            // Draw a slightly elongated petal shape
            ctx.beginPath();
            ctx.ellipse(0, 0, sz, sz*0.5, 0, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        } else {
            ctx.fillRect(p.x-sz/2,p.y-sz/2,sz,sz); 
        }
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
    if (typeof drawAkBullets === 'function') drawAkBullets(ctx);
    if (typeof drawRangeShots === 'function') drawRangeShots(ctx);
    if (typeof drawDomainAttacks === 'function') drawDomainAttacks(ctx);

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
  ctx.restore();
}

loadGame();loadSettings();applyPartBg(1);refreshMenuLocks();if (typeof loop === 'function') loop();

// ── Deferred system patches (v36) ──
// These must run AFTER Fighter, startRound, checkRound, and loadGame are defined above.
_patchTakeHitForRescue();
_patchCheckRoundForRescue();
_patchFighterRageTier();
_patchLoadGameForTrust();

// ════════════════════════════════════════════════════
// v9 SYSTEMS: LEVEL, WORLD MAP, GEMS, EXTRA WEAPONS
// ════════════════════════════════════════════════════

// ── SAVE KEY UPDATE ──
const SAVE_KEY_V9 = 'chug_v9_save';

// ── LEVEL DATA ──
const XP_TABLE = (function(){
  const t=[]; let x=300;
  for(let i=1;i<=50;i++){t.push(x);x=Math.floor(x*1.18);}
  return t;
})();
if (typeof window.__applyXPTableFix === 'function') window.__applyXPTableFix();

const COMBO_UNLOCKS = {
  5:{name:'RISING KICK',desc:'Air kick launcher'},
  10:{name:'SHADOW RUSH',desc:'Dash + 3-punch chain'},
  15:{name:'DOUBLE SLAM',desc:'Grab → two throws'},
  20:{name:'VOID STRIKE',desc:'Rage + Kick burst'},
  25:{name:'DEATH SPIRAL',desc:'Air grab + spin drop'},


/* ─── js/story.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   STORY SYSTEM
   Dialogue rendering, typing effect, advance().
════════════════════════════════════════════════ */

30:{name:'SHADOW CLONE',desc:'Rage teleport'},
  35:{name:'SHATTER COMBO',desc:'5-hit unblockable'},
  40:{name:'VOID ERUPTION',desc:'Screen-wide rage'},
  50:{name:'SHADOW TRANSCENDENCE',desc:'True final form'}
};

// Aura tier by level
function getAuraTier(lv){
  if(lv>=50)return{col:'#c8931a',glow:'rgba(200,147,26,0.85)',intense:true};
  if(lv>=40)return{col:'#ffd700',glow:'rgba(255,215,0,0.65)',intense:true};
  if(lv>=30)return{col:'#ff2244',glow:'rgba(255,34,68,0.5)',intense:false};
  if(lv>=20)return{col:'#9900dd',glow:'rgba(153,0,221,0.4)',intense:false};
  if(lv>=10)return{col:'#00e5ff',glow:'rgba(0,229,255,0.3)',intense:false};
  return{col:null,glow:null,intense:false};
}

// v9 save state
var _lvl=1, _xp=0, _statPoints=0;
var _stats={hp:0,atk:0,def:0,spd:0,crit:0};
var _gems=0;
var _luPending={hp:0,atk:0,def:0,spd:0,crit:0};
var _luLeft=0;

// Save/Load extensions
const _origSaveKey = 'chug_shadow_v3_save';
function v9SaveGame(){
  try{
    const base = window.__saveData || {};
    const ext = {
      ...base,
      coins, weapon, armor, rageMode2, strengthUpg, speedUpg, enduranceUpg, currentPart,
      _lvl, _xp, _statPoints, _stats:{..._stats}, _gems
    };
    window.__saveData = ext;
    localStorage.setItem(_origSaveKey, JSON.stringify(ext));
  }catch(e){}
}
function v9LoadGame(){
  try{
    const s = window.__saveData || (function(){
      const raw = localStorage.getItem(_origSaveKey);
      return raw ? JSON.parse(raw) : null;
    })();
    if(s){
      _lvl = Number.isFinite(s._lvl) && s._lvl > 0 ? s._lvl : 1;
      _xp = Number.isFinite(s._xp) && s._xp >= 0 ? s._xp : 0;
      _statPoints = Number.isFinite(s._statPoints) && s._statPoints >= 0 ? s._statPoints : 0;
      _stats = {...{hp:0,atk:0,def:0,spd:0,crit:0},...(s._stats||{})};
      _gems = Number.isFinite(s._gems) && s._gems >= 0 ? s._gems : 0;
    }
  }catch(e){}
  updateV9Display();
}
function sf2MirrorEconomy(){
  const c=document.getElementById('coin-val');
  const sc=document.getElementById('sf2-coins');
  if(c && sc) sc.innerText = c.innerText || '0';
  
  const g=document.getElementById('gem-val');
  const sg=document.getElementById('sf2-gems');
  if(g && sg) sg.innerText = g.innerText || '0';

  const l=document.getElementById('lv-val');
  const sl=document.getElementById('sf2-lv');
  if(l && sl) sl.innerText = l.innerText || '1';
  
  updateXPBar();
}
function updateV9Display(){
  window.playerLevel = _lvl;
  window.playerXP = _xp;
  window.xpToNext = (_lvl<50?XP_TABLE[_lvl-1]:XP_TABLE[49]);
  const gv=document.getElementById('gem-val'); if(gv)gv.innerText=_gems; sf2MirrorEconomy();
  const lv=document.getElementById('lv-val'); if(lv)lv.innerText=_lvl; sf2MirrorEconomy();
  updateXPBar();
}
function updateXPBar(){
  const xpFill = document.getElementById('sf2-xp');
  if(xpFill && typeof playerXP !== 'undefined' && typeof xpToNext !== 'undefined') {
    const pct = Math.min(100, Math.max(0, (playerXP / xpToNext) * 100));
    xpFill.style.width = pct + '%';
  }
}

// Keep legacy saveGame in sync with the live level state so autosaves never
// roll the player back to an older level/xp snapshot.
(function _patchSaveGameForLevelState(){
  const _baseSaveGame = window.saveGame || saveGame;
  if(_baseSaveGame && !_baseSaveGame.__levelStatePatched){
    const patched = function(extra={}){
      const merged = {
        ...extra,
        _lvl,
        _xp,
        _statPoints,
        _stats:{..._stats},
        _gems,
      };
      return _baseSaveGame.call(this, merged);
    };
    patched.__levelStatePatched = true;
    window.saveGame = saveGame = patched;
  }
})();

// Hook into existing loadGame
const _origLoadGame = loadGame;
loadGame = function(){
  _origLoadGame();
  v9LoadGame();
};

function showGemsLevel(){}
// Coins update hook
const _origUpdateCoins = updateCoins;
updateCoins = function(amt){
  _origUpdateCoins(amt);
};

function updateGems(amt){
  _gems+=amt;
  const gv=document.getElementById('gem-val'); if(gv)gv.innerText=_gems;
  v9SaveGame();
}

// ── XP GAIN ──


/* ─── js/partend.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   PART END CARD
   Completion screen, coin rewards, star animation.
════════════════════════════════════════════════ */

function gainXP(amount){
  if(_lvl>=50)return;
  _xp+=amount;
  // popup
  const el=document.createElement('div');el.className='xp-popup';el.innerText='+'+amount+' XP';
  el.style.left=(window.innerWidth/2-40)+'px';el.style.top=(window.innerHeight*0.42)+'px';
  document.body.appendChild(el);setTimeout(()=>el.remove(),1300);
  let leveled=false;
  while(_lvl<50&&_xp>=XP_TABLE[_lvl-1]){_xp-=XP_TABLE[_lvl-1];_lvl++;_statPoints+=3;leveled=true;}
  v9SaveGame();updateV9Display();
  if(leveled)showLevelUpPopup();
}

function showLevelUpPopup(){
  _luPending={hp:0,atk:0,def:0,spd:0,crit:0};_luLeft=_statPoints;
  document.getElementById('lu-level-num').innerText='LEVEL '+_lvl;
  const unlock=COMBO_UNLOCKS[_lvl];
  const umsg=document.getElementById('lu-unlock-msg');
  if(unlock){umsg.innerText='✦ NEW MOVE: '+unlock.name;umsg.style.display='block';}
  else{umsg.style.display='none';}
  refreshLUPopup();
  document.getElementById('levelup-overlay').classList.add('active');
  if(typeof beep==='function'){beep(440,'sine',0.4,0.07);setTimeout(()=>beep(550,'sine',0.4,0.06),150);setTimeout(()=>beep(660,'sine',0.4,0.05),300);}
}
function refreshLUPopup(){
  ['hp','atk','def','spd','crit'].forEach(k=>{const e=document.getElementById('lu-'+k);if(e)e.innerText=_luPending[k];});
  document.getElementById('lu-pts-remaining').innerText=_luLeft+' STAT POINTS TO ALLOCATE';
  document.getElementById('lu-remaining').innerText=_luLeft>0?_luLeft+' remaining':'All points allocated';
  const btn=document.getElementById('lu-confirm-btn');
  if(btn)btn.disabled=false;
}
function allocStat(stat,delta){
  if(delta>0&&_luLeft<=0)return;
  if(delta<0&&_luPending[stat]<=0)return;
  _luPending[stat]+=delta;_luLeft-=delta;
  refreshLUPopup();
  if(typeof beep==='function')beep(delta>0?500:400,'sine',0.05,0.04);
}
function confirmLevelUp(){
  Object.keys(_luPending).forEach(k=>_stats[k]+=_luPending[k]);
  _statPoints=_luLeft;
  v9SaveGame();
  document.getElementById('levelup-overlay').classList.remove('active');
  refreshLevelScreen();
}

// ── CHARACTER SCREEN ──
function openLevelScreen(){
  if(typeof initAudio==='function')initAudio();
  refreshLevelScreen();showScreen('level-screen');
}
function closeLevelScreen(){showScreen('menu-screen');}
function refreshLevelScreen(){
  const need=_lvl<50?XP_TABLE[_lvl-1]:XP_TABLE[49];
  const cur=document.getElementById('lv-cur'); if(cur)cur.innerText=_lvl;
  const nxt=document.getElementById('lv-next'); if(nxt)nxt.innerText=Math.min(_lvl+1,50);
  const xpt=document.getElementById('lv-xp-text'); if(xpt)xpt.innerText=_xp+' / '+need+' XP';
  const bar=document.getElementById('lv-xpbar-fill'); if(bar)bar.style.width=Math.min(100,_xp/need*100)+'%';
  const pv=document.getElementById('lv-pts-val'); if(pv)pv.innerText=_statPoints;
  // Pts banner pulse when points available
  const banner=document.getElementById('lv-pts-banner');
  if(banner)banner.classList.toggle('has-points',_statPoints>0);
  // Stat values + mini bars (max visual = 30 for scale)
  const BAR_MAX=30;
  ['hp','atk','def','spd','crit'].forEach(k=>{
    const e=document.getElementById('ms-'+k); if(e)e.innerText=_stats[k];
    const b=document.getElementById('bar-'+k); if(b)b.style.width=Math.min(100,(_stats[k]/BAR_MAX)*100)+'%';
  });
  const list=document.getElementById('lv-combo-list'); if(!list)return;
  list.innerHTML='';
  Object.entries(COMBO_UNLOCKS).forEach(([lv,c])=>{
    const locked=_lvl<parseInt(lv);
    const d=document.createElement('div');
    d.className='lv-combo-item'+(locked?' locked':'');
    if(locked){
      d.innerHTML='<span class="combo-name"><span class="combo-dot"></span>'+c.name+'</span>'
        +'<span class="combo-lv-tag"><span class="combo-lock-icon">🔒</span> LV '+lv+'</span>';
    } else {
      d.innerHTML='<span class="combo-name"><span class="combo-dot"></span>'+c.name+'</span>'
        +'<span class="combo-lv-tag"><span class="combo-check">✓</span> LV '+lv+'</span>';
    }
    list.appendChild(d);
  });
}
function allocStatMenu(stat,delta){
  if(delta>0&&_statPoints<=0)return;
  if(delta<0&&_stats[stat]<=0)return;
  _stats[stat]+=delta;_statPoints-=delta;
  v9SaveGame();refreshLevelScreen();
  if(typeof beep==='function')beep(delta>0?500:400,'sine',0.05,0.04);
  // Flash the button that was tapped
  if(delta>0){
    try{
      const rows=document.querySelectorAll('.lv-stat-row[data-stat="'+stat+'"]');
      if(rows.length){
        const btn=rows[0].querySelector('.lv-stat-btn2:last-child');
        if(btn){btn.classList.add('confirm-flash');setTimeout(()=>btn.classList.remove('confirm-flash'),160);}
      }
    }catch(e){}
  }
}

// ── WORLD MAP ──
const WORLDS_V9={
  1:{name:'WORLD I — SHADOW OF FAME',icon:'⚔',acts:{
       1:{name:'ACT I',chapters:{
         1:{name:'THE FALL',parts:[1,2,3,4,5],unlockAt:1},
         2:{name:'VANISHED',parts:[6,7,8,9,10],unlockAt:6}
       }},
       2:{name:'ACT II',chapters:{
         3:{name:'FRACTURE',parts:[11,12,13,14,15],unlockAt:11},
         4:{name:'ASH CAMP',parts:[16,17,18,19,20],unlockAt:16}
       }}
     }},
  2:{name:'WORLD II — RESCUE WAR',icon:'🔥',acts:{
       3:{name:'ACT III',chapters:{
         5:{name:'CAMPFIRE',parts:[21,22,23,24,25],unlockAt:21},
         6:{name:'RESCUE ARC',parts:[26,27,28,29,30],unlockAt:26}
       }},
       4:{name:'ACT IV',chapters:{
         7:{name:'M.R ARRIVAL',parts:[31,32,33,34,35],unlockAt:31},
         8:{name:'BETRAYAL',parts:[36,37,38,39,40],unlockAt:36}
       }}
     }},
  3:{name:'WORLD III — WAR GATE',icon:'🩸',acts:{
       5:{name:'ACT V',chapters:{
         9:{name:'WAR DRUMS',parts:[41,42,43,44,45],unlockAt:41},
         10:{name:'WAR GATE',parts:[46,47,48,49,50],unlockAt:46}
       }}
     }},
  4:{name:'WORLD IV — COMING SOON',icon:'👁',locked:true},
  5:{name:'WORLD V — COMING SOON',icon:'〜',locked:true},
  6:{name:'WORLD VI — COMING SOON',icon:'💀',locked:true},
  7:{name:'WORLD VII — COMING SOON',icon:'✦',locked:true}
};

const CHAPTER_PARTS_V9={1:[1,2,3,4,5],2:[6,7,8,9,10],3:[11,12,13,14,15],4:[16,17,18,19,20],5:[21,22,23,24,25],6:[26,27,28,29,30],7:[31,32,33,34,35],8:[36,37,38,39,40],9:[41,42,43,44,45],10:[46,47,48,49,50]};
const CHAPTER_TITLES_V9={1:'THE FALL',2:'VANISHED',3:'FRACTURE',4:'ASH CAMP',5:'CAMPFIRE',6:'RESCUE ARC',7:'M.R ARRIVAL',8:'BETRAYAL',9:'WAR DRUMS',10:'WAR GATE'};
const CHAPTER_ACT_V9={1:1,2:1,3:2,4:2,5:3,6:3,7:4,8:4,9:5,10:5};
const ROMANS={1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X',11:'XI'};

// ── World state ──
let _wmActiveWorld = 1;

function toggleWmPanel(){
  const scr = document.getElementById('worldmap-screen');
  if(!scr) return;
  scr.classList.toggle('wm-panel-open');
}

function buildWorldMap(){
  const unlocked = window.__saveData?.chapterUnlocked || 1;
  // Determine active world from current progress
  _wmActiveWorld = unlocked >= 41 ? 3 : unlocked >= 21 ? 2 : 1;

  // ── Build side world list ──
  const list = document.getElementById('wm-world-list');
  if(list){
    list.innerHTML = '';
    Object.entries(WORLDS_V9).forEach(([wid, world]) => {
      const id = parseInt(wid);
      const isLocked = world.locked || ((id===2&&unlocked<21)||(id===3&&unlocked<41)||(id>3));
      const isActive = id === _wmActiveWorld;
      const row = document.createElement('div');
      row.className = 'wm-world-row' +
        (isActive ? ' wm-world-active' : '') +
        (isLocked ? ' wm-world-locked' : '');
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      const worldName = world.name.replace(/WORLD \w+ — /,'');
      row.setAttribute('aria-label', `Select ${worldName} (World ${ROMANS[id]||id})${isLocked ? ' - Locked' : ''}`);
      row.innerHTML = `<div class="wm-world-icon">${world.icon}</div>
        <div class="wm-world-info">
          <div class="wm-world-name">${world.name.replace(/WORLD \w+ — /,'')}</div>
          <div class="wm-world-sub">WORLD ${ROMANS[id]||id}${isLocked?' · LOCKED':''}</div>
        </div>
        <div class="wm-world-lock">${isLocked ? '🔒' : (isActive ? '▶' : '✓')}</div>`;
      if(!isLocked){
        row.onclick = () => { _wmActiveWorld = id; selectWmWorld(id); toggleWmPanel(); };
      }
      list.appendChild(row);
    });
  }

  selectWmWorld(_wmActiveWorld);
}

function selectWmWorld(wid){
  const world  = WORLDS_V9[wid]; if(!world) return;
  const unlocked = window.__saveData?.chapterUnlocked || 1;

  // Update active highlight in side list
  document.querySelectorAll('.wm-world-row').forEach((r,i)=>{
    r.classList.toggle('wm-world-active', (i+1) === wid);
  });

  // Update top bar
  const titleEl = document.getElementById('wm-active-title');
  const subEl   = document.getElementById('wm-active-sub');
  if(titleEl) titleEl.textContent = world.name;
  if(subEl)   subEl.textContent   = 'WORLD ' + (ROMANS[wid]||wid) + ' · SELECT CHAPTER';

  // Build chapter panel
  const panel = document.getElementById('wm-chapter-panel');
  if(!panel) return;
  panel.innerHTML = '';

  if(world.locked || ((wid===2&&unlocked<21)||(wid===3&&unlocked<41)||(wid>3))){
    panel.innerHTML = '<div style="padding:40px 20px;text-align:center;font-family:var(--font-body);font-size:10px;letter-spacing:4px;color:rgba(200,155,60,0.28);">LOCKED · COMPLETE PREVIOUS WORLD</div>';
    return;
  }

  Object.entries(world.acts).forEach(([acid, act]) => {
    const actDiv = document.createElement('div');
    actDiv.className = 'wm-act-label';
    actDiv.textContent = act.name;
    panel.appendChild(actDiv);

    Object.entries(act.chapters).forEach(([chid, ch]) => {
      const cid      = parseInt(chid);
      const parts    = ch.parts;
      const isLocked = unlocked < ch.unlockAt;
      const isDone   = unlocked > parts[parts.length - 1];
      const isActive = !isLocked && !isDone;

      // Progress
      const prog = Math.min(100, Math.max(0, (parts.filter(p => unlocked > p).length / parts.length) * 100));

      // Dots
      const dots = parts.map(p => {
        let cls = 'wm-ch-dot';
        if(unlocked > p) cls += ' done';
        else if(unlocked === p) cls += ' active';
        return `<span class="${cls}">●</span>`;
      }).join('');

      const card = document.createElement('div');
      card.className = 'wm-ch-card' +
        (isLocked ? ' wm-ch-locked' : '') +
        (isActive ? ' wm-ch-active' : '');

      card.innerHTML = `
        <div class="wm-ch-head">
          <div class="wm-ch-roman">${ROMANS[cid]||cid}</div>
          <div class="wm-ch-name">${ch.name}</div>
          <div class="wm-ch-lock-icon">${isLocked ? '🔒' : isDone ? '✓' : '▶'}</div>
        </div>
        <div class="wm-ch-dots">${dots}</div>
        <div class="wm-ch-prog-track">
          <div class="wm-ch-prog-fill" style="width:${prog}%"></div>
        </div>
        <div class="wm-ch-modes">
          <button class="wm-mode-btn${!isLocked?' wm-mode-active':''}" ${isLocked?'disabled':''} onclick="launchChapterMode(${cid},'story')">STORY</button>
          <button class="wm-mode-btn" ${isLocked?'disabled':''} onclick="launchChapterMode(${cid},'survival')">SURVIVAL</button>
          <button class="wm-mode-btn" ${isLocked?'disabled':''} onclick="launchChapterMode(${cid},'tournament')">TOURN</button>
        </div>`;

      panel.appendChild(card);
    });
  });
}

function launchChapterMode(ch, mode){
  if(mode === 'story'){
    startChapterV9(ch);
  } else if(mode === 'survival'){
    startSurvivalMode(ch);
  } else if(mode === 'tournament'){
    startTournamentMode(ch);
  }
}

function buildWorldMap_legacy(){
  // Legacy node builder kept for compatibility if anything calls wm-nodes directly
  const c=document.getElementById('wm-nodes'); if(!c)return;
  c.innerHTML='';
}

function openWorldMap(){
  if(typeof initAudio==='function')initAudio();
  loadGame();buildWorldMap();
  // Start panel closed
  const scr = document.getElementById('worldmap-screen');
  if(scr) scr.classList.remove('wm-panel-open');
  showScreen('worldmap-screen');
}
function closeWorldMap(){
  showScreen('menu-screen');
}


function openWorldDetail(wid){
  const world=WORLDS_V9[wid]; if(!world)return;
  const unlocked=window.__saveData?.chapterUnlocked||1;


/* ─── js/v9_systems.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   V9 SYSTEMS — Level, XP, Gems, World Map
   Patch layer that adds RPG systems on top of base game.
════════════════════════════════════════════════ */

const wrap=document.getElementById('wd-wrap'); if(!wrap)return;
  wrap.innerHTML=`<div class="wd-header">WORLD ${ROMANS[wid]||wid}</div><div class="wd-sub">${world.name}</div><div class="wd-divider"></div>`;
  Object.entries(world.acts).forEach(([acid,act])=>{
    const aDiv=document.createElement('div');aDiv.className='wd-act';
    aDiv.innerHTML='<div class="wd-act-title">'+act.name+'</div>';
    Object.entries(act.chapters).forEach(([chid,ch])=>{
      const cid=parseInt(chid);
      const isLocked=unlocked<ch.unlockAt;
      const parts=ch.parts;
      let dots='';
      parts.forEach(p=>{let cls='wd-dot';if(unlocked>p)cls+=' done';else if(unlocked===p)cls+=' active';dots+='<span class="'+cls+'">●</span>';});
      const progPct=Math.min(100,(parts.filter(p=>unlocked>p).length/parts.length)*100);
      const cDiv=document.createElement('div');
      cDiv.className='wd-chapter'+(isLocked?' locked':'');
      cDiv.onclick=()=>{if(!isLocked)startChapterV9(cid);};
      cDiv.innerHTML=`<div class="wd-ch-num${isLocked?' dim':''}">${ROMANS[cid]||cid}</div><div class="wd-ch-info"><div class="wd-ch-title">${ch.name}</div><div class="wd-ch-sub">Parts ${parts[0]}–${parts[parts.length-1]}</div><div class="wd-ch-dots">${dots}</div></div><div class="wd-ch-lock">${isLocked?'🔒':(unlocked>parts[parts.length-1]?'✓':'▶')}</div><div class="wd-ch-prog" style="width:${progPct}%"></div>`;
      aDiv.appendChild(cDiv);
    });
    wrap.appendChild(aDiv);
  });
  const back=document.createElement('button');back.className='wd-back';back.innerText='◀ WORLD MAP';back.onclick=()=>showScreen('worldmap-screen');
  wrap.appendChild(back);
  showScreen('worlddetail-screen');
}

function startChapterV9(ch){
  if(typeof initAudio==='function')initAudio();
  const unlocked=window.__saveData?.chapterUnlocked||1;
  const parts=CHAPTER_PARTS_V9[ch]||[1];
  const minPart=parts[0];
  if(unlocked<minPart)return;
  // Use the existing startChapter logic but mapped
  // We patch activeChapter and call the original startChapter-like flow
  const overlay=document.getElementById('chap-transition');
  document.getElementById('ct-chapter-lbl').innerText='CHAPTER '+ROMANS[ch];
  document.getElementById('ct-title-lbl').innerText=CHAPTER_TITLES_V9[ch]||'';
  if(overlay)overlay.classList.add('fade-in');
  setTimeout(()=>{
    if(overlay)overlay.classList.remove('fade-in');
    setTimeout(()=>{
      loadGame();
      (document.getElementById('btn-ingame-menu')||window.__sf2NullElement).style.display='block';
      const save=window.__saveData||{};
      const unlk=save.chapterUnlocked||1;
      // Handle pending fight
      if(save.pendingFightType&&parts.includes(save.pendingFightPart)){
        currentPart=save.pendingFightPart;syncCurrentPartGlobal();applyPartBg(currentPart);
        scIdx=save.pendingFightIndex||getPartStartIndex(currentPart);
        gameState='story';initFight(save.pendingFightType);return;
      }
      let startPart=parts[0];
      for(let i=parts.length-1;i>=0;i--){if(unlk>parts[i]){startPart=parts[Math.min(i+1,parts.length-1)];break;}if(unlk===parts[i]){startPart=parts[i];break;}}
      if(!parts.includes(startPart))startPart=parts[0];
      currentPart=startPart;applyPartBg(currentPart);
      const partStart=getPartStartIndex(startPart);
      const savedIdx=save.storyIndexByPart&&save.storyIndexByPart[String(startPart)]!=null?save.storyIndexByPart[String(startPart)]:partStart;
      scIdx=clampStoryIndexToPart(savedIdx,startPart);
      gameState='story';showScreen('story-screen');
      if(typeof startMusicTheme==='function')startMusicTheme('story');
      saveGame({currentPart:startPart});advance(true);
    },500);
  },2200);
}

// ── PATCH buyItem FOR GEMS + NEW WEAPONS ──
const _origBuyItem = buyItem;
buyItem = function(kind,name,price,currency){
  currency=currency||'coin';
  if(currency==='gem'){
    if(_gems<price){shopToast('NOT ENOUGH GEMS 💎','#cc88ff');return;}
    updateGems(-price);
    // Now handle the purchase
    if(kind==='weapon'){
      weapon=name;
      ['boxing_gloves'].forEach(n=>{document.getElementById('buy-'+n)?.classList.remove('bought');});
      document.getElementById('buy-'+name)?.classList.add('bought');
      saveGame();shopToast('✓ EQUIPPED: '+name.toUpperCase());
    } else if(kind==='armor'){
      armor=name;
      ['lightarmor','heavyarmor','voidarmor'].forEach(n=>{document.getElementById('buy-'+n)?.classList.remove('bought');});
      document.getElementById('buy-'+name)?.classList.add('bought');
      saveGame();shopToast('✓ ARMOR: '+name.toUpperCase());
    }
    return;
  }
  // New coin-weapons not in original
  if(kind==='weapon'&&['sword','nunchaku','knives','spear'].includes(name)){
    if(coins<price){shopToast('NOT ENOUGH COINS','#ff003c');return;}
    updateCoins(-price);
    weapon=name;
    ['boxing_gloves'].forEach(n=>{document.getElementById('buy-'+n)?.classList.remove('bought');});
    document.getElementById('buy-'+name)?.classList.add('bought');
    saveGame();shopToast('✓ EQUIPPED: '+name.toUpperCase());
    return;
  }
  _origBuyItem(kind,name,price,currency);
};

// ── PATCH endMatch to grant XP ──
const _origEndMatch = endMatch;
endMatch = function(win){
  if(win){
    const xpGain = [3,6,8,10,11,13,14,15,18,19,20].includes(fType)?250:80;
    gainXP(xpGain);
    // gem drop on boss
    if([3,6,8,10,11,13,14,15,18,19,20].includes(fType)){updateGems(1);}
  }
  _origEndMatch(win);
};

// ── PATCH showPartEndCard to give XP + gems ──
const _origShowPartEndCard = showPartEndCard;
showPartEndCard = function(part){
  const xpAmounts={1:200,2:250,3:300,4:350,5:500,6:600,7:700,8:800,9:900,10:1200,11:1500};
  const gemAmounts={5:3,10:5,11:8};
  const xpBonus=xpAmounts[part]||200;
  const gemBonus=gemAmounts[part]||0;
  // Patch pec-coins div to show XP too
  _origShowPartEndCard(part);
  // Add XP display
  const pecCoins=document.getElementById('pecCoins');
  if(pecCoins&&xpBonus>0){
    let extra=pecCoins.parentElement.querySelector('.pec-xp-extra');
    if(!extra){extra=document.createElement('div');extra.className='pec-reward-item pec-xp-extra';extra.style.cssText='color:#88ff88;font-size:16px;font-weight:700;letter-spacing:2px;';pecCoins.parentElement.appendChild(extra);}
    extra.innerText='+'+xpBonus+' XP';
  }
  if(gemBonus>0)updateGems(gemBonus);
  gainXP(xpBonus);
};

// ── PATCH Fighter for new weapons + level stats + aura ──
const _origFighterConstructor = Fighter;
// We can't easily patch the class, so instead we patch the new Fighter call
// and override draw to add aura. We'll do this via prototype patching.

// Patch player stats at fight start
const _origInitFight = initFight;
initFight = function(type){
  // Stats will be applied in Fighter constructor when isP=true
  // We patch via global vars that Fighter reads
  _origInitFight(type);
};

// Patch refreshShopUI to handle new weapons
const _origRefreshShopUI = refreshShopUI;
refreshShopUI = function(){
  _origRefreshShopUI();
  // Add new weapons
  ['sword','nunchaku','knives','spear','whip'].forEach(n=>{
    document.getElementById('buy-'+n)?.classList.remove('bought');
  });
  if(['sword','nunchaku','knives','spear','whip'].includes(weapon)){
    document.getElementById('buy-'+weapon)?.classList.add('bought');
  }
};

// Patch openShop to show gems
const _origOpenShop = openShop;
openShop = function(){
  _origOpenShop();
};

// Patch quitToMenu to hide gems/level
const _origQuitToMenu = quitToMenu;
quitToMenu = function(){
  _origQuitToMenu();
};

// Patch continueGame
const _origContinueGame = continueGame;
continueGame = function(){
  _origContinueGame();
};

// Patch newGame to reset level
const _origNewGame = newGame;
newGame = function(){
  if(!confirm('Start a NEW GAME?\n\nAll progress, coins, gems and level will be reset.'))return;
  _lvl=1;_xp=0;_statPoints=0;_stats={hp:0,atk:0,def:0,spd:0,crit:0};_gems=0;
  updateV9Display();
  _origNewGame();
  v9SaveGame();
};

// ── APPLY LEVEL STATS to player Fighter ──
// We patch the player's stats right after startRound creates the Fighter
const _origStartRound = startRound;
startRound = function(n){
  _origStartRound(n);
  // Apply level stat bonuses to player after construction
  if(player&&player.isP){
    player.maxHp += _stats.hp * 8;
    player.hp = player.maxHp;
    player.dmg += _stats.atk * 2;
    player.spd += _stats.spd * 0.35;
    player.defense += _stats.def;
    player.critChance = _stats.crit * 3;
    // Apply new weapon bonuses
    const wBon={sword:8,nunchaku:7,knives:6,spear:16,whip:9};
    const wSpd={sword:0,nunchaku:3,knives:2,spear:1.1,whip:0};
    if(weapon!=='none'&&wBon[weapon]!==undefined){
      player.dmg+=wBon[weapon];player.spd+=wSpd[weapon];
    }
    updateHUD();
  }
};

// ── PATCH DRAW for aura + level visual ──
// Inject aura after Fighter.draw by wrapping the original draw call
const _OrigFighterDraw = Fighter.prototype.draw;
Fighter.prototype.draw = function(c){
  // Draw aura ring for player if level >= 10
  if(this.isP && _lvl>=10 && !this.rageActive && this.hp>0){
    const aura=getAuraTier(_lvl);
    if(aura.col){
      c.save();
      c.shadowColor=aura.glow;c.shadowBlur=aura.intense?32:18;
      const cx=this.x+this.w/2, cy=this.y-this.h*0.42;
      const grad=c.createRadialGradient(cx,cy,0,cx,cy,this.w*0.6);
      grad.addColorStop(0,'transparent');
      grad.addColorStop(0.7,aura.glow.replace('0.3','0.08').replace('0.4','0.1').replace('0.5','0.12').replace('0.65','0.15').replace('0.85','0.2'));
      grad.addColorStop(1,'transparent');
      c.fillStyle=grad;c.globalAlpha=0.85;
      c.beginPath();c.ellipse(cx,cy,this.w*0.65,this.h*0.52,0,0,Math.PI*2);c.fill();
      c.globalAlpha=1;c.restore();
    }
  }
  
  if(this.transformAnim > 0){
    const t = this.transformAnim / 18;
    c.save();
    c.globalAlpha = 0.22 + t * 0.18;
    c.shadowBlur = 28;
    c.shadowColor = this.rageTier===3 ? '#d44cff' : this.rageTier===2 ? '#ff3a3a' : '#66e8ff';
    c.translate(this.x + this.w/2, this.y - this.h/2);
    c.scale(1 + (1-t)*0.15, 1 + (1-t)*0.15);
    c.translate(-(this.x + this.w/2), -(this.y - this.h/2));
    // Draw an aura box/silhouette
    c.fillStyle = c.shadowColor;
    c.fillRect(this.x-5, this.y-this.h-5, this.w+10, this.h+10);
    c.restore();
    this.transformAnim--;
  }

  _OrigFighterDraw.call(this,c);
};

// ── PATCH takeHit for crit chance ──
const _origTakeHit = Fighter.prototype.takeHit;
Fighter.prototype.takeHit = function(dmg,fd,heavy){
  // Check if attacker has crit (player only has critChance)
  // We handle crit in the attack phase already via the global player ref
  _origTakeHit.call(this,dmg,fd,heavy);
};

// ── HUD UPDATE: show gems/level during fight ──
const _origUpdateHUD = updateHUD;
updateHUD = function(){
  _origUpdateHUD();
  updateXPBar();
};

// ── INIT ──
v9LoadGame();

// openChapterSelect now redirects to world map
if(typeof openChapterSelect === 'function'){
  openChapterSelect = openWorldMap;
}


/* ─── js/sf2_controls.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   SF2 JOYSTICK — Analog D-pad
   Touch joystick that maps to K.l / K.r / K.j keys.
   Handles multi-touch and mouse for desktop.
════════════════════════════════════════════════ */

// ══════════════════════════════════════════
// SF2 JOYSTICK D-PAD INPUT
// ══════════════════════════════════════════
(function setupSF2Dpad(){
  const wrap = document.getElementById('sf2DpadWrap');
  const knob = document.getElementById('sf2DpadKnob');
  const btnL = document.getElementById('btn-l');
  const btnR = document.getElementById('btn-r');
  const btnJ = document.getElementById('btn-j');
  if(!wrap) return;

  let activeTouchId = null;
  let mouseActive = false;
  const DEAD = 18, MAXR = 42;
  wrap.style.touchAction = 'none';

  function getCenter(){
    const r = wrap.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function applyInput(cx,cy,px,py){
    const dx = px - cx, dy = py - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const clampedDist = Math.min(dist, MAXR);
    const angle = Math.atan2(dy, dx);
    const kx = Math.cos(angle) * clampedDist;
    const ky = Math.sin(angle) * clampedDist;
    if(knob){ knob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`; }

    const goL = dx < -DEAD && dist > DEAD;
    const goR = dx > DEAD  && dist > DEAD;
    const goU = dy < -DEAD && dist > DEAD;

    if(btnL) btnL.classList.toggle('pressed', goL); K.l = goL ? 1 : 0;
    if(btnR) btnR.classList.toggle('pressed', goR); K.r = goR ? 1 : 0;
    if(btnJ) btnJ.classList.toggle('pressed', goU); K.j = goU ? 1 : 0;
  }

  function resetKnob(){
    if(knob) knob.style.transform = 'translate(-50%,-50%)';
    if(btnL) btnL.classList.remove('pressed'); K.l = 0;
    if(btnR) btnR.classList.remove('pressed'); K.r = 0;
    if(btnJ) btnJ.classList.remove('pressed'); K.j = 0;
    activeTouchId = null;
    mouseActive = false;
  }

  function getTrackedTouch(list){
    for(const t of Array.from(list || [])){
      if(t.identifier === activeTouchId) return t;
    }
    return null;
  }

  wrap.addEventListener('touchstart', e => {
    e.preventDefault();
    if(activeTouchId !== null) return;
    const t = e.changedTouches && e.changedTouches[0];
    if(!t) return;
    activeTouchId = t.identifier;
    const c = getCenter();
    applyInput(c.x, c.y, t.clientX, t.clientY);
  }, { passive:false });

  wrap.addEventListener('touchmove', e => {
    if(activeTouchId === null) return;
    const t = getTrackedTouch(e.touches);
    if(!t) return;
    e.preventDefault();
    const c = getCenter();
    applyInput(c.x, c.y, t.clientX, t.clientY);
  }, { passive:false });

  function endTrackedTouch(e){
    if(activeTouchId === null) return;
    const ended = getTrackedTouch(e.changedTouches);
    if(!ended) return;
    e.preventDefault();
    resetKnob();
  }

  wrap.addEventListener('touchend', endTrackedTouch, { passive:false });
  wrap.addEventListener('touchcancel', endTrackedTouch, { passive:false });

  wrap.addEventListener('mousedown', e => {
    mouseActive = true;
    const c = getCenter();
    applyInput(c.x, c.y, e.clientX, e.clientY);
  });
  document.addEventListener('mousemove', e => {
    if(!mouseActive) return;
    const c = getCenter();
    applyInput(c.x, c.y, e.clientX, e.clientY);
  });
  document.addEventListener('mouseup', resetKnob);
})();


/* ─── js/dojo.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   PLAYABLE DOJO
   Punching bag physics, hit detection, bag draw.
   Only active during gameState === menu.
════════════════════════════════════════════════ */

// ══════════════════════════════════════════
// DOJO PLAYABLE — PUNCHING BAG PHYSICS
// ══════════════════════════════════════════
(function setupDojo(){
  const canvas = document.getElementById('dojoCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  let bagAngle = 0;
  let bagVel = 0;
  let bagHits = 0;
  let hitFlash = 0;
  let lastHitTime = 0;
  let bagSquash = 0;
  let bagBob = 0;
  const BAG_GRAVITY = 0.020;
  const BAG_DAMPING = 0.992;
  const BAG_BOUNCE = 0.58;
  const BAG_LIMIT = 1.12;

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function getBagMetrics(){
    const sw = window.innerWidth, sh = window.innerHeight;
    const ropeLen = Math.max(160, sh * 0.275 + bagBob);
    const bW = Math.max(62, sw * 0.060 + 10);
    const bH = Math.max(188, sh * 0.315 + 10);
    return {
      anchorX: sw * 0.625,
      anchorY: sh * 0.12,
      ropeLen,
      bW,
      bH,
      centerX: sw * 0.625,
      centerY: sh * 0.565
    };
  }

  function hitBag(kind='p', dir=1, power=1){
    const now = Date.now();
    if(now - lastHitTime < 90) return;
    lastHitTime = now;

    const base = kind === 'throw' ? 0.34 : kind === 'slam' ? 0.30 : kind === 'k' ? 0.26 : 0.20;
    const impulse = base * Math.max(0.85, power || 1);
    bagHits++;
    hitFlash = 9;
    bagVel += impulse * (dir || 1);
    bagSquash = Math.min(18, bagSquash + 12 * impulse * 8);
    bagBob = Math.min(26, bagBob + 12 * impulse * 8);

    if(typeof floatingTexts !== 'undefined'){
      const m = getBagMetrics();
      const msgs = ['HIT!','NICE!','GOOD!','POWER!','CLEAN!'];
      floatingTexts.push({
        x: m.centerX + (Math.random() - .5) * 36,
        y: m.centerY - 18,
        t: bagHits % 6 === 0 ? String(bagHits) : msgs[bagHits % msgs.length],
        life: 0.9,
        vy: -2.4,
        col: '#f0c840',
        size: 22
      });
    }
  }
  window.hitDojoBag = hitBag;

  function checkBagHit(){
    if(typeof gameState === 'undefined' || gameState !== 'menu') return;
    if(typeof player === 'undefined' || !player) return;
    if(player.state !== 'atk' && player.state !== 'grab_exec') return;

    const m = getBagMetrics();
    const stageW = (typeof W !== 'undefined' ? W : window.innerWidth);
    const stageH = (typeof H !== 'undefined' ? H : window.innerHeight);
    const scaleX = window.innerWidth / stageW;
    const scaleY = window.innerHeight / stageH;
    const atk = player.atkType || 'p';
    const ext = atk === 'k' ? 104 : atk === 'throw' ? 96 : atk === 'slam' ? 86 : 82;
    const strikeX = (player.dir === 1 ? player.x + player.w + ext : player.x - ext) * scaleX;
    const strikeY = (player.y - player.h * (atk === 'k' ? 0.26 : atk === 'slam' ? 0.22 : 0.40)) * scaleY;

    if(Math.abs(strikeX - m.centerX) < m.bW * 1.45 && Math.abs(strikeY - m.centerY) < m.bH * 0.88){
      const power = atk === 'throw' ? 1.5 : atk === 'slam' ? 1.35 : atk === 'k' ? 1.18 : 1;
      hitBag(atk, player.dir || 1, power);
    }
  }

  function drawBag(){
    const m = getBagMetrics();
    const flash = hitFlash > 0;
    const swayX = Math.sin(bagAngle) * 8;
    const bagW = m.bW + bagSquash * 0.35;
    const bagH = m.bH - bagSquash * 0.65;

    ctx.save();
    ctx.translate(m.anchorX, m.anchorY);
    ctx.rotate(bagAngle);

    ctx.strokeStyle = 'rgba(50,26,10,0.92)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(swayX * 0.25, m.ropeLen);
    ctx.stroke();

    ctx.translate(swayX, m.ropeLen);

    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.beginPath();
    ctx.ellipse(0, bagH + 22, bagW * 0.72, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createLinearGradient(-bagW/2, 0, bagW/2, bagH);
    if(flash){
      grad.addColorStop(0, '#ffeb9a');
      grad.addColorStop(0.35, '#ca6e14');
      grad.addColorStop(1, '#381507');
    } else {
      grad.addColorStop(0, '#39170a');
      grad.addColorStop(0.28, '#200a04');
      grad.addColorStop(0.62, '#2d1008');
      grad.addColorStop(1, '#180602');
    }
    ctx.fillStyle = grad;

    const r = bagW * 0.34;
    ctx.beginPath();
    ctx.moveTo(-bagW/2 + r, 0);
    ctx.lineTo(bagW/2 - r, 0);
    ctx.quadraticCurveTo(bagW/2, 0, bagW/2, r);
    ctx.lineTo(bagW/2, bagH - r * 0.9);
    ctx.quadraticCurveTo(bagW/2, bagH, bagW/2 - r, bagH);
    ctx.lineTo(-bagW/2 + r, bagH);
    ctx.quadraticCurveTo(-bagW/2, bagH, -bagW/2, bagH - r * 0.9);
    ctx.lineTo(-bagW/2, r);
    ctx.quadraticCurveTo(-bagW/2, 0, -bagW/2 + r, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = flash ? 'rgba(255,245,170,0.28)' : 'rgba(255,180,70,0.08)';
    ctx.fillRect(-bagW * 0.24, bagH * 0.08, bagW * 0.1, bagH * 0.74);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(bagW * 0.12, bagH * 0.06, bagW * 0.09, bagH * 0.78);

    if(flash){
      ctx.save();
      ctx.shadowColor = '#ffd85a';
      ctx.shadowBlur = 26;
      ctx.strokeStyle = 'rgba(255,225,110,0.75)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    if(bagHits > 0){
      ctx.fillStyle = flash ? '#fffaf0' : 'rgba(240,205,90,0.72)';
      ctx.font = `bold ${Math.min(28, 14 + bagHits * 0.7)}px Cinzel, serif`;
      ctx.textAlign = 'center';
      ctx.fillText(String(bagHits), 0, bagH * 0.55);
    }

    ctx.restore();
  }

  let dojoActive = false;
  const _dOrigSS = showScreen;
  showScreen = function(id){
    _dOrigSS(id);
    dojoActive = (id === 'menu-screen');
    if(id === 'menu-screen'){
      bagVel *= 0.35;
      bagBob *= 0.5;
    }
  };

  function dojoLoop(){
    requestAnimationFrame(dojoLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!dojoActive) return;

    bagVel += -BAG_GRAVITY * Math.sin(bagAngle);
    bagVel *= BAG_DAMPING;
    bagAngle += bagVel;
    if(Math.abs(bagAngle) > BAG_LIMIT){
      bagAngle = Math.sign(bagAngle) * BAG_LIMIT;
      bagVel *= -BAG_BOUNCE;
    }
    bagSquash *= 0.84;
    bagBob *= 0.86;
    if(hitFlash > 0) hitFlash--;

    drawBag();
    checkBagHit();
  }
  dojoLoop();
})();


/* ─── js/sf2_menu.js ─── */
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   SF2 MENU SYSTEM
   Intro sequence, dojo animation, scroll entrance,
   guide messages. Edit GUIDE_MENU_LINES for menu text.
════════════════════════════════════════════════ */

// Sync SF2 top bar coins/level
function syncSF2Bar(){
  const cv = document.getElementById('sf2-coins');
  const lv = document.getElementById('sf2-lv');
  const xp = document.getElementById('sf2-xp');
  if(cv) cv.textContent = coins || 0;
  if(lv && typeof playerLevel !== 'undefined') lv.textContent = playerLevel || 1;
  if(xp && typeof playerXP !== 'undefined' && typeof xpToNext !== 'undefined'){
    xp.style.width = Math.min(100, (playerXP / xpToNext)*100) + '%';
  }
}

// Guide messages on menu
const GUIDE_MENU_LINES = [
  '"…You\'re back."',
  '"…The path ahead is long."',
  '"…Train. Get stronger."',
  '"…Don\'t keep me waiting."',
  '"…Show me what you\'ve got."',
  '"…The dojo is yours."',
  '"…Hit the bag. Clear your mind."',
  '"…Strength comes from discipline."',
];
let guideLineIdx = 0;
function cycleGuideText(){
  const el = document.getElementById('menuGuideText');
  if(!el) return;
  el.style.opacity = '0';
  setTimeout(()=>{
    guideLineIdx = (guideLineIdx+1) % GUIDE_MENU_LINES.length;
    el.textContent = GUIDE_MENU_LINES[guideLineIdx];
    el.style.opacity = '1';
  }, 300);
}
setInterval(cycleGuideText, 4000);

// Dojo visibility — show during menu, hide during fight/story
const _origShowScreen = showScreen;
showScreen = function(id){
  _origShowScreen(id);
  const dojoWrap = document.getElementById('dojoWrap');
  const groundEl = document.getElementById('groundEl');
  const isMenuScreen = id === 'menu-screen';
  const isFightScreen = id === 'hud-screen';
  if(dojoWrap){
    dojoWrap.style.opacity = (isMenuScreen) ? '1' : '0';
    dojoWrap.style.transition = 'opacity 1s ease';
  }
  if(groundEl){
    groundEl.style.display = isFightScreen ? 'block' : 'none';
  }
  // Sync coins whenever menu shows
  if(isMenuScreen) syncSF2Bar();
};

// Patch updateCoins to also update SF2 bar
const _sf2OrigCoins = updateCoins;
updateCoins = function(amt){
  _sf2OrigCoins(amt);
  syncSF2Bar();
};

function showMenuScroll(){
  // Already on menu, just highlight sidebar btn
  document.querySelectorAll('.sf2-side-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector('.sf2-side-btn:first-child')?.classList.add('active');
}

// Intro sequence
(function runIntro(){
  const intro   = document.getElementById('intro-screen');
  const menu    = document.getElementById('menu-screen');
  if (!intro || !menu) return;

  // ── Background canvas — slow drifting ember/smoke particles ──
  const cv = document.getElementById('introBgCanvas');
  if (cv) {
    const ctx2 = cv.getContext('2d');
    let raf, dots = [];

    function resize() {
      cv.width  = window.innerWidth;
      cv.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // SF2 Style Sunset and Silhouettes
    let timeStart = Date.now();
    function drawDots() {
      const w = cv.width;
      const h = cv.height;
      const t = Date.now() - timeStart;

      // 1. Sky Gradient (Deep red to gold)
      const sky = ctx2.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#3a0604'); // Dark crimson
      sky.addColorStop(0.3, '#781507'); // Red
      sky.addColorStop(0.6, '#b83b0b'); // Orange
      sky.addColorStop(0.85, '#d66811'); // Light Orange
      sky.addColorStop(1, '#f2b641'); // Sun Gold
      ctx2.fillStyle = sky;
      ctx2.fillRect(0, 0, w, h);

      // 2. Giant Glowing Sun
      const sunX = w * 0.75;
      const sunY = h * 0.55;
      const sunR = Math.min(w, h) * 0.35;

      // Sun glow
      const sunGlow = ctx2.createRadialGradient(sunX, sunY, sunR*0.8, sunX, sunY, sunR*1.8);
      sunGlow.addColorStop(0, 'rgba(255,230,160,0.8)');
      sunGlow.addColorStop(0.4, 'rgba(255,160,40,0.3)');
      sunGlow.addColorStop(1, 'rgba(255,100,0,0)');
      ctx2.fillStyle = sunGlow;
      ctx2.beginPath(); ctx2.arc(sunX, sunY, sunR*2, 0, Math.PI*2); ctx2.fill();

      // Solid sun
      ctx2.beginPath();
      ctx2.arc(sunX, sunY, sunR, 0, Math.PI*2);
      ctx2.fillStyle = '#ffefc2';
      ctx2.fill();

      // 3. Distant Mountains Silhouette
      ctx2.fillStyle = '#080402'; // Almost black
      ctx2.beginPath();
      ctx2.moveTo(0, h);
      ctx2.lineTo(0, h * 0.75);
      // Generate jagged mountain peaks based on screen width
      for(let i=0; i<=w; i+=w/25){
         ctx2.lineTo(i, h * 0.75 + Math.sin(i*0.015)*25 + Math.cos(i*0.008)*35);
      }
      ctx2.lineTo(w, h);
      ctx2.fill();

      // 4. Dojo/Torii Gate Silhouette
      const tx = w * 0.6;
      const ty = h * 0.75;
      const th = h * 0.4;
      ctx2.fillStyle = '#050201';
      // Pillars
      ctx2.fillRect(tx, ty - th, w*0.015, th + 50);
      ctx2.fillRect(tx + w*0.12, ty - th, w*0.015, th + 50);
      // Top curved beam
      ctx2.beginPath();
      ctx2.moveTo(tx - w*0.02, ty - th + h*0.05);
      ctx2.quadraticCurveTo(tx + w*0.06, ty - th, tx + w*0.155, ty - th + h*0.05);
      ctx2.lineWidth = Math.max(8, h*0.02); ctx2.strokeStyle = '#050201'; ctx2.stroke();
      // Lower straight beam
      ctx2.fillRect(tx - w*0.01, ty - th + h*0.08, w*0.155, h*0.012);

      // 5. Hero Shadow Fighter Silhouette
      const hx = w * 0.78;
      const hy = h * 0.85; // Ground level for fighter
      const hs = Math.min(w, h) * 0.0008; // scale

      ctx2.save();
      ctx2.translate(hx, hy);
      ctx2.scale(hs, hs);

      ctx2.fillStyle = '#000000';
      ctx2.strokeStyle = '#000000';
      ctx2.lineJoin = 'round';
      ctx2.lineCap = 'round';

      // Scarf blowing in wind
      ctx2.lineWidth=22; 
      ctx2.beginPath(); ctx2.moveTo(-10, -220); 
      ctx2.quadraticCurveTo(-120 + Math.sin(t/300)*25, -200 + Math.cos(t/400)*15, -180 + Math.sin(t/200)*30, -180); 
      ctx2.stroke();
      ctx2.beginPath(); ctx2.moveTo(-10, -220); 
      ctx2.quadraticCurveTo(-80 + Math.sin(t/250)*20, -180 + Math.cos(t/350)*10, -140 + Math.sin(t/180)*25, -150); 
      ctx2.stroke();

      // Head & Torso
      ctx2.beginPath(); ctx2.arc(10, -250, 35, 0, Math.PI*2); ctx2.fill(); // Head
      ctx2.lineWidth = 60; ctx2.beginPath(); ctx2.moveTo(0, -220); ctx2.lineTo(-15, -80); ctx2.stroke(); // Torso

      // Legs (Wide Stance)
      ctx2.lineWidth = 40;
      ctx2.beginPath(); ctx2.moveTo(-15, -80); ctx2.lineTo(-80, 20); ctx2.lineTo(-110, 140); ctx2.stroke(); // Back leg
      ctx2.beginPath(); ctx2.moveTo(-15, -80); ctx2.lineTo(70, 0); ctx2.lineTo(90, 140); ctx2.stroke(); // Front leg

      // Arms & Katana
      ctx2.lineWidth = 32;
      ctx2.beginPath(); ctx2.moveTo(-15, -190); ctx2.lineTo(-70, -130); ctx2.lineTo(-50, -60); ctx2.stroke(); // Back arm
      ctx2.beginPath(); ctx2.moveTo(15, -190); ctx2.lineTo(100, -150); ctx2.lineTo(160, -180); ctx2.stroke(); // Front arm

      // Swords
      ctx2.lineWidth = 12;
      ctx2.beginPath(); ctx2.moveTo(-50, -60); ctx2.quadraticCurveTo(-30, 20, 20, 80); ctx2.stroke(); // back sword downwards
      ctx2.beginPath(); ctx2.moveTo(160, -180); ctx2.quadraticCurveTo(280, -240, 400, -250); ctx2.stroke(); // front sword forwards

      ctx2.restore();

      // 6. Flying Leaves (Wind from right to left)
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.x += d.vx; d.y += d.vy; 
        d.rot += d.vRot;
        d.life++;
        // Fade in and out
        const lt = d.life / d.maxLife;
        const alpha = lt < 0.1 ? lt*10 : lt > 0.9 ? (1-lt)*10 : 1;

        if (d.life > d.maxLife || d.x < -50 || d.y > h+50) { dots.splice(i, 1); continue; }

        ctx2.save();
        ctx2.translate(d.x, d.y);
        ctx2.rotate(d.rot);
        ctx2.globalAlpha = alpha;
        ctx2.fillStyle = '#0a0502'; // Black silhouette leaves

        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.quadraticCurveTo(d.size, -d.size/1.5, d.size*2.5, 0);
        ctx2.quadraticCurveTo(d.size, d.size/1.5, 0, 0);
        ctx2.fill();
        ctx2.restore();
      }

      // Spawn new leaves continuously
      while (dots.length < 60) {
        dots.push({
          x: w + Math.random() * 200, // start right
          y: Math.random() * h * 0.8, // upper 80% of screen
          vx: -(3 + Math.random() * 5), // move fast left
          vy: Math.random() * 2 - 0.5, // float down slightly
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2, // spinning
          size: 5 + Math.random() * 10,
          life: 0,
          maxLife: 300 + Math.random() * 200
        });
      }

      if (intro.classList.contains('active-screen')) raf = requestAnimationFrame(drawDots);
    }

    // Initial leaves
    for (let i = 0; i < 60; i++) {
      dots.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        vx: -(3 + Math.random() * 5),
        vy: Math.random() * 2 - 0.5,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        size: 5 + Math.random() * 10,
        life: Math.random() * 300,
        maxLife: 300 + Math.random() * 200
      });
    }
    drawDots();
    // Stop when intro leaves
    intro._stopCanvas = () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }

  // ── Focus / nav state ──
  let focusIdx = 0;
  const btnIds = ['introBtn-continue', 'introBtn-new'];

  function setFocus(idx) {
    focusIdx = idx;
    btnIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('focused', i === idx);
    });
  }

  function hasSave() {
    try { return !!localStorage.getItem('chug_shadow_v3_save'); } catch(e) { return false; }
  }

  // Dim CONTINUE if no save — wait for menu animation to appear
  setTimeout(() => {
    if (!hasSave()) {
      const cont = document.getElementById('introBtn-continue');
      if (cont) { cont.classList.add('dim'); setFocus(1); }
    }
  }, 2100);

  // Keyboard nav
  function onKey(e) {
    if (!intro.classList.contains('active-screen')) return;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      setFocus(Math.min(focusIdx + 1, btnIds.length - 1)); e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      setFocus(Math.max(focusIdx - 1, 0)); e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      window.introSelect(focusIdx === 0 ? 'continue' : 'new'); e.preventDefault();
    }
  }
  document.addEventListener('keydown', onKey);

  // ── Transition out ──
  window._introTransition = function() {
    if (intro._stopCanvas) intro._stopCanvas();
    intro.style.transition = 'opacity 0.6s ease';
    intro.style.opacity = '0';
    intro.style.pointerEvents = 'none';
    document.removeEventListener('keydown', onKey);
    setTimeout(() => {
      intro.style.display = 'none';
      intro.classList.remove('active-screen');
      menu.classList.add('active-screen');
      menu.classList.add('menu-ribbon-collapsed');
      const dojoWrap = document.getElementById('dojoWrap');
      if (dojoWrap) dojoWrap.style.opacity = '1';
      syncSF2Bar();
      initAudio();
    }, 620);
  };

  window.__realIntroSelect = function(action) {
    window._introTransition();
    if (action === 'continue') {
      setTimeout(() => { if (typeof continueGame === 'function') continueGame(); }, 680);
    } else {
      setTimeout(() => { if (typeof newGame === 'function') newGame(); }, 680);
    }
  };

  window.introSelect = function(action) {
    return window.__realIntroSelect(action);
  };

  window.introHandleClick = function(e) {
    if (e.target && e.target.classList.contains('intro-menu-btn')) return;
    window.introSelect(hasSave() ? 'continue' : 'new');
  };
})();


/* ─── Extra scripts from html_parts (v11/v12 patches) ─── */
/* ══════════════════════════════════════
   PHASE 1 PATCH — SF2 DOJO / PUNCH / MENU
══════════════════════════════════════ */
(function v11Patch(){
  const menuScreen = document.getElementById('menu-screen');
  const menuWrap = document.getElementById('menuScrollWrap');
  const menuBody = document.querySelector('#menu-screen .sf2-scroll-body');
  const menuInner = document.querySelector('#menu-screen .menu-inner');
  const ribbon = document.getElementById('dojoMenuRibbon');
  const menuButtons = () => Array.from(document.querySelectorAll('#menu-screen .menu-btn'));
  let menuOpen = false;

  function setMenuActiveButton(){
    if(!menuBody) return;
    const bodyRect = menuBody.getBoundingClientRect();
    const centerY = bodyRect.top + bodyRect.height * 0.5;
    let bestBtn = null, bestDist = Infinity;
    menuButtons().forEach(btn => {
      const r = btn.getBoundingClientRect();
      const d = Math.abs((r.top + r.height * 0.5) - centerY);
      if(d < bestDist){ bestDist = d; bestBtn = btn; }
    });
    menuButtons().forEach(btn => btn.classList.toggle('phase1-active', btn === bestBtn));
  }

  function updateMenuParallax(){
    if(!menuBody || !menuInner) return;
    const maxScroll = Math.max(1, menuBody.scrollHeight - menuBody.clientHeight);
    const progress = Math.min(1, Math.max(0, menuBody.scrollTop / maxScroll));
    const shift = Math.max(-14, Math.min(14, -menuBody.scrollTop * 0.08));
    menuInner.style.transform = `translateY(${shift}px)`;
    menuBody.style.boxShadow = `inset 0 16px 20px rgba(60,30,8,${0.08 + (1-progress)*0.06}), inset 0 -16px 20px rgba(60,30,8,${0.08 + progress*0.06})`;
    setMenuActiveButton();
  }

  function setMenuRibbonState(open){
    menuOpen = !!open;
    if(menuScreen) menuScreen.classList.toggle('menu-ribbon-collapsed', !menuOpen);
    if(ribbon){
      ribbon.classList.toggle('compact', !menuOpen);
      ribbon.textContent = menuOpen ? 'MENU' : 'OPEN';
    }
    if(menuOpen){
      requestAnimationFrame(() => {
        updateMenuParallax();
        setMenuActiveButton();
      });
    }
  }

  window.showMenuScroll = function(forceOpen=true){
    if(forceOpen === 'toggle'){ setMenuRibbonState(!menuOpen); }
    else { setMenuRibbonState(forceOpen === false ? false : true); }
    document.querySelectorAll('.sf2-side-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.sf2-side-btn:first-child')?.classList.add('active');
  };


  if(menuBody){
    let snapTimer = 0;
    let snapping = false;
    const snapNearest = () => {
      if(snapping || !menuOpen) return;
      const btns = menuButtons();
      if(!btns.length) return;
      const bodyCenter = menuBody.clientHeight * 0.5;
      let nearest = btns[0], best = Infinity;
      btns.forEach(btn => {
        const center = btn.offsetTop - menuBody.scrollTop + btn.offsetHeight * 0.5;
        const dist = Math.abs(center - bodyCenter);
        if(dist < best){ best = dist; nearest = btn; }
      });
      const target = Math.max(0, nearest.offsetTop - (menuBody.clientHeight - nearest.offsetHeight) * 0.5);
      snapping = true;
      menuBody.scrollTo({ top: target, behavior: 'smooth' });
      setTimeout(() => { snapping = false; setMenuActiveButton(); }, 240);
    };

    menuBody.addEventListener('scroll', () => {
      if(!menuOpen) return;
      updateMenuParallax();
      clearTimeout(snapTimer);
      snapTimer = setTimeout(snapNearest, 140);
    }, { passive:true });

    menuButtons().forEach(btn => {
      btn.addEventListener('pointerenter', () => btn.classList.add('phase1-active'));
      btn.addEventListener('pointerleave', setMenuActiveButton);
      btn.addEventListener('focus', () => {
        if(!menuOpen) setMenuRibbonState(true);
        btn.scrollIntoView({ block:'center', behavior:'smooth' });
        setTimeout(setMenuActiveButton, 120);
      });
    });

    requestAnimationFrame(updateMenuParallax);
    setTimeout(updateMenuParallax, 400);
  }

  function syncDojoControls(mode){
    const ctrls = document.getElementById('controls');
    const hint = document.getElementById('kbhint');
    if(!ctrls) return;
    ctrls.dataset.dojoMode = mode === 'menu' ? '1' : '0';
    if(mode === 'menu'){
      ctrls.style.display = 'flex';
      ctrls.style.pointerEvents = 'none';
      const rageBtn = document.getElementById('btn-rage');
      if(rageBtn) rageBtn.style.display = 'none';
      if(hint) hint.style.display = 'none';
      if(ribbon) ribbon.style.display = 'inline-flex';
    } else if(mode === 'fight'){
      ctrls.style.display = 'flex';
      ctrls.style.pointerEvents = 'none';
      const rageBtn = document.getElementById('btn-rage');
      if(rageBtn) rageBtn.style.display = 'flex';
      if(hint) hint.style.display = 'block';
      if(ribbon) ribbon.style.display = 'none';
    } else {
      ctrls.style.display = 'none';
      ctrls.style.pointerEvents = 'none';
      if(hint) hint.style.display = 'none';
      if(ribbon) ribbon.style.display = 'none';
    }
  }

  ['#sf2DpadWrap', '#btn-p', '#btn-k', '#btn-g', '#btn-t', '#btn-rage'].forEach(sel => {
    const el = document.querySelector(sel);
    if(el) el.style.pointerEvents = 'auto';
  });

  if(typeof showScreen === 'function'){
    const _showScreen = showScreen;
    showScreen = function(id){
      _showScreen(id);
      requestAnimationFrame(() => {
        if(id === 'menu-screen'){
          syncDojoControls('menu');
          setMenuRibbonState(true);
        } else if(id === 'hud-screen') {
          syncDojoControls('fight');
        } else {
          syncDojoControls('off');
        }
      });
    };
  }

  setTimeout(() => {
    const menuActive = document.getElementById('menu-screen')?.classList.contains('active-screen');
    const hudActive = document.getElementById('hud-screen')?.classList.contains('active-screen');
    if(menuActive) syncDojoControls('menu');
    else if(hudActive) syncDojoControls('fight');
    else syncDojoControls('off');
    setMenuRibbonState(true);
    setMenuActiveButton();
  }, 3600);

  if(typeof Fighter === 'function' && Fighter.prototype){
    const _origAttack = Fighter.prototype.attack;
    const _origUpdate = Fighter.prototype.update;

    function restoreScaledDamage(f){
      if(f.__v11ScaledDamage){
        f.dmg = f.__v11BaseDmg;
        f.__v11ScaledDamage = false;
        f.__v11BaseDmg = null;
        f.__v11DmgScale = null;
      }
    }

    function handleQuickThrow(f, en){
      f.vx = 0; f.vy = 0;
      f.atkT--;
      const total = f.__v11ThrowTotal || 24;
      const prog = 1 - (f.atkT / total);
      en.state = 'grabbed';
      en.hitT = Math.max(en.hitT || 0, 12);
      en.grabber = f;
      const lockX = f.x + f.w / 2 + f.dir * (f.w * 0.34) - en.w / 2;
      const liftY = f.y - en.h * 0.14 - Math.sin(Math.min(1, prog) * Math.PI) * 10;
      en.x = Math.max(10, Math.min(lockX, W - en.w - 10));
      en.y = Math.min(liftY, GND - 4);
      en.rotation = 0.16 * f.dir * Math.sin(prog * Math.PI);

      if(f.atkT === 10 && !f.__v11ThrowFired){
        f.__v11ThrowFired = true;
        en.state = 'hit';
        en.hitT = 24;
        en.vx = f.dir * 18;
        en.vy = -5;
        en.rotation = 0;
        let d = f.dmg * 2.25;
        if(f.raging) d *= (f.rageTier === 2 ? 1.9 : 1.55);
        let fd = Math.max(1, d - (en.defense || 0));
        if(en.absorption) fd *= (1 - en.absorption);
        en.hp = Math.max(0, en.hp - fd);
        floatingTexts.push({ x: en.x + en.w/2, y: en.y - en.h, t: Math.floor(fd), life: 1, vy: -2.8, col: '#ff7a00', size: 30 });
        shadowSlash(en.x + en.w/2, en.y - en.h * 0.45, f.dir, 'rgba(255,140,0,0.95)');
        bloodSplatter(en.x + en.w/2, en.y, f.dir, true);
        for(let i=0;i<16;i++) landDust.push({ x: en.x + en.w/2, y: GND - 3, vx: (Math.random() - .5) * 16, vy: -Math.random() * 5.5, life: 1, w: Math.random() * 14 + 6, col: 'rgba(255,150,50,0.3)' });
        screenShake = 16;
        doFlash();
        beep(82, 'sawtooth', 0.35, 0.14);
        if(f.isP && !f.rageActive) f.rage = Math.min(100, f.rage + 40);
        f.state = 'idle';
        f.atkT = 0;
        f.grabHits = 0;
        f.__v11ThrowTotal = null;
        K.t = 0;
        if(en.hp <= 0){ checkRound(); return true; }
        return true;
      }

      if(f.atkT <= 0){
        f.state = 'idle';
        f.grabHits = 0;
        f.__v11ThrowTotal = null;
        en.state = 'hit';
        en.hitT = 20;
        en.vx = -f.dir * 8;
        en.vy = -2;
        return true;
      }
      return true;
    }

    Fighter.prototype.attack = function(type){
      _origAttack.call(this, type);
      if(type === 'p'){
        this.atkT = Math.max(this.atkT, this.isP ? 16 : 16);
        this.hitF = Math.min(this.atkT - 4, Math.max(7, this.hitF + 1));
        this.cWin = Math.min(this.cWin, this.isP ? 18 : 19);
        this.__v11DmgScale = this.isP ? 0.74 : 0.82;
      } else if(type === 'k'){
        this.atkT = Math.max(this.atkT, this.isP ? 20 : 20);
        this.hitF = Math.min(this.atkT - 3, Math.max(9, this.hitF + 1));
        this.cWin = Math.min(this.cWin, this.isP ? 20 : 21);
        this.__v11DmgScale = this.isP ? 0.94 : 0.98;
      } else {
        this.__v11DmgScale = null;
      }
    };

    Fighter.prototype.update = function(en){
      if(this.__v11DmgScale && this.state === 'atk' && (this.atkType === 'p' || this.atkType === 'k')){
        if(!this.__v11ScaledDamage){
          this.__v11BaseDmg = this.dmg;
          this.dmg = this.dmg * this.__v11DmgScale;
          this.__v11ScaledDamage = true;
        }
      } else {
        restoreScaledDamage(this);
      }

      if(this.state === 'grab_exec' && this.grabHits === 199){
        if(!this.__v11ThrowTotal) this.__v11ThrowTotal = 24;
        const done = handleQuickThrow(this, en);
        restoreScaledDamage(this);
        if(this.isP && typeof gameState !== 'undefined' && gameState === 'menu' && typeof W !== 'undefined'){
          this.x = Math.max(W * 0.06, Math.min(this.x, W * 0.90));
        }
        if(done) return;
      }

      _origUpdate.call(this, en);
      if(this.isP && typeof gameState !== 'undefined' && gameState === 'menu' && typeof W !== 'undefined'){
        this.x = Math.max(W * 0.06, Math.min(this.x, W * 0.90));
      }
      if(this.__v11ScaledDamage && (this.state !== 'atk' || (this.atkType !== 'p' && this.atkType !== 'k') || this.hp <= 0)){
        restoreScaledDamage(this);
      }
      if(this.state !== 'grab_exec'){
        this.__v11ThrowFired = false;
      }
    };
  }
})();

(function(){
  const menuScreen = document.getElementById('menu-screen');
  const ribbon = document.getElementById('dojoMenuRibbon');
  const menuWrap = document.getElementById('menuScrollWrap');
  if(!menuScreen || !ribbon || !menuWrap) return;

  let menuOpen = !menuScreen.classList.contains('menu-ribbon-collapsed');

  function setMenuOpen(open){
    menuOpen = !!open;
    menuScreen.classList.toggle('menu-ribbon-collapsed', !menuOpen);
    ribbon.classList.toggle('compact', !menuOpen);
    ribbon.textContent = menuOpen ? 'MENU' : 'OPEN';
    ribbon.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
  }

  window.showMenuScroll = function(mode){
    if(mode === 'toggle') setMenuOpen(!menuOpen);
    else if(mode === false || mode === 'close') setMenuOpen(false);
    else setMenuOpen(true);
    document.querySelectorAll('.sf2-side-btn').forEach((b,i)=>b.classList.toggle('active', i===0));
  };

  if(ribbon){
    ribbon.onclick = function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      window.showMenuScroll('toggle');
    };
  }

  document.addEventListener('pointerdown', function(ev){
    if(!menuScreen || !menuScreen.classList.contains('active-screen')) return;
    if(!menuOpen) return;
    const t = ev.target;
    if((ribbon && ribbon.contains(t)) || (menuWrap && menuWrap.contains && menuWrap.contains(t))) return;
    window.showMenuScroll(false);
  }, true);

  setMenuOpen(menuOpen);

  const oldShowScreen = window.showScreen;
  if(typeof oldShowScreen === 'function' && !window.__v12ShowScreenPatched){
    window.__v12ShowScreenPatched = true;
    window.showScreen = function(id){
      oldShowScreen(id);
      if(id === 'menu-screen'){
        setTimeout(()=>setMenuOpen(true), 20);
      }
    };
  }

  let canvas = document.getElementById('dojoCanvasV12');
  if(!canvas){
    canvas = document.createElement('canvas');
    canvas.id = 'dojoCanvasV12';
    const anchor = document.getElementById('menu-screen') || document.body;
    anchor.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');

  const bag = {
    angle: 0.06,
    vel: 0,
    swingVel: 0,
    stretch: 0,
    squash: 0,
    bob: 0,
    flash: 0,
    hits: 0,
    lastAttackStamp: '',
    lastImpactAt: 0,
    windT: 0
  };

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  function metrics(){
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const bagW = Math.max(96, sw * 0.076);
    const bagH = Math.max(260, sh * 0.39);
    const ropeLen = Math.max(138, sh * 0.24 + bag.bob);
    return {
      anchorX: sw * 0.605,
      anchorY: sh * 0.145,
      ropeLen,
      bagW,
      bagH
    };
  }

  function impact(kind, dir, power){
    const now = performance.now();
    if(now - bag.lastImpactAt < 85) return;
    bag.lastImpactAt = now;
    const boost = kind === 'throw' ? 0.080 : kind === 'slam' ? 0.070 : kind === 'k' ? 0.060 : 0.050;
    const p = Math.max(0.9, power || 1);
    bag.vel += boost * p * (dir || 1);
    bag.swingVel += 0.006 * p * (dir || 1);
    bag.stretch = Math.min(26, bag.stretch + 12 * p);
    bag.squash = Math.min(18, bag.squash + 10 * p);
    bag.bob = Math.min(18, bag.bob + 10 * p);
    bag.flash = 1;
    bag.hits += 1;
  }

  function maybeHitBag(){
    if(typeof gameState === 'undefined' || gameState !== 'menu') return;
    if(typeof player === 'undefined' || !player) return;

    if(player.state === 'idle' || player.state === 'walk' || player.state === 'jump' || player.state === 'fall'){
      player.__v12DojoConsumed = false;
      return;
    }
    if(player.state !== 'atk' && player.state !== 'grab_exec') return;
    if(player.__v12DojoConsumed) return;

    const m = metrics();
    const stageW = (typeof W !== 'undefined' && W) ? W : window.innerWidth;
    const stageH = (typeof H !== 'undefined' && H) ? H : window.innerHeight;
    const scaleX = window.innerWidth / stageW;
    const scaleY = window.innerHeight / stageH;

    const atk = player.atkType || (player.state === 'grab_exec' ? 'throw' : 'p');
    const frontXBase = player.dir === 1 ? (player.x + player.w) : player.x;
    const attackReach = atk === 'k' ? 154 : atk === 'throw' ? 148 : atk === 'slam' ? 126 : 124;
    const attackHeight = atk === 'k' ? 0.26 : atk === 'slam' ? 0.20 : 0.40;
    const strikeX = (frontXBase + player.dir * attackReach) * scaleX;
    const strikeY = (player.y - player.h * attackHeight) * scaleY;

    const bagCenterX = m.anchorX + Math.sin(bag.angle) * (m.ropeLen + m.bagH * 0.48);
    const bagCenterY = m.anchorY + Math.cos(bag.angle) * (m.ropeLen + m.bagH * 0.52);

    const inRangeX = Math.abs(strikeX - bagCenterX) < (m.bagW * 1.95 + (atk === 'throw' ? 70 : 54));
    const inRangeY = Math.abs(strikeY - bagCenterY) < (m.bagH * 1.02);

    if(inRangeX && inRangeY){
      const power = atk === 'throw' ? 1.65 : atk === 'slam' ? 1.45 : atk === 'k' ? 1.25 : 1.0;
      impact(atk, player.dir || 1, power);
      player.__v12DojoConsumed = true;
    }
  }

  function drawBag(){
    const m = metrics();
    const swayX = Math.sin(bag.angle) * 12;
    const bodyW = m.bagW + bag.squash * 0.22;
    const bodyH = m.bagH + bag.stretch * 0.16 - bag.squash * 0.28;
    const glow = Math.max(0, bag.flash);

    ctx.save();
    ctx.translate(m.anchorX, m.anchorY);
    ctx.rotate(bag.angle);

    ctx.strokeStyle = 'rgba(36,18,8,0.96)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(swayX * 0.18, m.ropeLen);
    ctx.stroke();

    ctx.translate(swayX, m.ropeLen);

    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(0, bodyH + 24, bodyW * 0.78, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createLinearGradient(-bodyW/2, 0, bodyW/2, bodyH);
    grad.addColorStop(0, glow > 0.04 ? '#5c2410' : '#351308');
    grad.addColorStop(0.22, glow > 0.04 ? '#4b1909' : '#220904');
    grad.addColorStop(0.50, glow > 0.04 ? '#6a2b0f' : '#2d0c05');
    grad.addColorStop(1, glow > 0.04 ? '#2c0d06' : '#170401');
    ctx.fillStyle = grad;

    const r = bodyW * 0.34;
    ctx.beginPath();
    ctx.moveTo(-bodyW/2 + r, 0);
    ctx.lineTo(bodyW/2 - r, 0);
    ctx.quadraticCurveTo(bodyW/2, 0, bodyW/2, r);
    ctx.lineTo(bodyW/2, bodyH - r * 0.92);
    ctx.quadraticCurveTo(bodyW/2, bodyH, bodyW/2 - r, bodyH);
    ctx.lineTo(-bodyW/2 + r, bodyH);
    ctx.quadraticCurveTo(-bodyW/2, bodyH, -bodyW/2, bodyH - r * 0.92);
    ctx.lineTo(-bodyW/2, r);
    ctx.quadraticCurveTo(-bodyW/2, 0, -bodyW/2 + r, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = glow > 0.04 ? 'rgba(255,196,98,0.18)' : 'rgba(255,182,68,0.08)';
    ctx.fillRect(-bodyW * 0.24, bodyH * 0.08, bodyW * 0.10, bodyH * 0.72);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(bodyW * 0.10, bodyH * 0.06, bodyW * 0.10, bodyH * 0.80);

    if(glow > 0.04){
      ctx.save();
      ctx.shadowColor = 'rgba(255,210,120,0.8)';
      ctx.shadowBlur = 22;
      ctx.strokeStyle = 'rgba(255,226,160,0.50)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  let last = performance.now();
  function frame(now){
    requestAnimationFrame(frame);
    const dt = Math.min(32, now - last) / 16.6667;
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const active = menuScreen.classList.contains('active-screen');
    if(!active) return;

    bag.windT += dt * 0.018;
    const wind = Math.sin(bag.windT) * 0.0009 + Math.sin(bag.windT * 0.47) * 0.0005;
    const spring = 0.020;
    const damping = 0.991;
    const limit = 1.16;

    bag.vel += (-spring * Math.sin(bag.angle) + wind + bag.swingVel) * dt;
    bag.swingVel *= Math.pow(0.88, dt);
    bag.vel *= Math.pow(damping, dt);
    bag.angle += bag.vel * dt;

    if(Math.abs(bag.angle) > limit){
      bag.angle = Math.sign(bag.angle) * limit;
      bag.vel *= -0.48;
    }

    bag.stretch *= Math.pow(0.88, dt);
    bag.squash *= Math.pow(0.84, dt);
    bag.bob *= Math.pow(0.90, dt);
    bag.flash *= Math.pow(0.82, dt);

    drawBag();
    maybeHitBag();
  }
  requestAnimationFrame(frame);

  window.hitDojoBag = function(kind='p', dir=1, power=1){
    impact(kind, dir, power);
  };
})();

// =========================================================

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

// =========================================================

(function(){
  const HIDE_ALWAYS = ['btn-ingame-menu','music-toggle','kbhint'];
  const HIDE_IN_FIGHT = [];
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

// =========================================================

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

// =========================================================

(function(){
  function ensurePauseBindings(){
    var d = document;
    var pause = d.getElementById('fight-pause-btn');
    var overlay = d.getElementById('fight-pause-overlay');
    var resume = d.getElementById('v52-resume');
    var audio = d.getElementById('v52-audio');
    var settings = d.getElementById('v52-settings');
    var quit = d.getElementById('v52-quit');

    function openPause(ev){
      if(ev){ ev.preventDefault(); ev.stopPropagation(); }
      if(typeof window.toggleFightPause === 'function'){
        window.toggleFightPause(true);
        return false;
      }
      if(!overlay) return false;
      window.__fightPausePreviousState = window.gameState || 'fight';
      try{ gameState = 'post'; }catch(_e){ window.gameState = 'post'; }
      overlay.classList.add('active');
      document.body.classList.add('fight-paused');
      return false;
    }

    function closePause(ev){
      if(ev){ ev.preventDefault(); ev.stopPropagation(); }
      if(typeof window.toggleFightPause === 'function'){
        window.toggleFightPause(false);
        return false;
      }
      if(!overlay) return false;
      overlay.classList.remove('active');
      document.body.classList.remove('fight-paused');
      window.gameState = window.__fightPausePreviousState || 'fight';
      return false;
    }

    if(pause && !pause.__v56Bound){
      pause.__v56Bound = true;
      ['click','touchstart'].forEach(function(evt){
        pause.addEventListener(evt, openPause, {passive:false});
      });
    }
    if(resume && !resume.__v56Bound){
      resume.__v56Bound = true;
      ['click','touchstart'].forEach(function(evt){
        resume.addEventListener(evt, closePause, {passive:false});
      });
    }
    if(audio && !audio.__v56Bound){
      audio.__v56Bound = true;
      ['click','touchstart'].forEach(function(evt){
        audio.addEventListener(evt, function(ev){
          ev.preventDefault(); ev.stopPropagation();
          if(typeof window.toggleMusic === 'function') window.toggleMusic();
        }, {passive:false});
      });
    }
    if(settings && !settings.__v56Bound){
      settings.__v56Bound = true;
      ['click','touchstart'].forEach(function(evt){
        settings.addEventListener(evt, function(ev){
          ev.preventDefault(); ev.stopPropagation();
          if(overlay) overlay.classList.remove('active');
          document.body.classList.remove('fight-paused');
          if(window.__fightPausePreviousState) window.gameState = window.__fightPausePreviousState;
          if(typeof window.openSettings === 'function') window.openSettings();
        }, {passive:false});
      });
    }
    if(quit && !quit.__v56Bound){
      quit.__v56Bound = true;
      ['click','touchstart'].forEach(function(evt){
        quit.addEventListener(evt, function(ev){
          ev.preventDefault(); ev.stopPropagation();
          if(overlay) overlay.classList.remove('active');
          document.body.classList.remove('fight-paused');
          try{ if(typeof window.clearPendingFight === 'function') window.clearPendingFight(); }catch(_e){}
          try{ gameState = 'menu'; }catch(_e){ window.gameState = 'menu'; }
          if(typeof window.showScreen === 'function') window.showScreen('menu-screen');
          document.body.classList.remove('fight-clean-ui');
          document.body.classList.remove('fight-hud-v54');
        }, {passive:false});
      });
    }
    if(overlay && !overlay.__v56BackdropBound){
      overlay.__v56BackdropBound = true;
      ['click','touchstart'].forEach(function(evt){
        overlay.addEventListener(evt, function(ev){
          if(ev.target === overlay) closePause(ev);
        }, {passive:false});
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensurePauseBindings, {once:true});
  } else {
    ensurePauseBindings();
  }
  setInterval(ensurePauseBindings, 300);
})();

// =========================================================

(function(){
  function inFight(){
    var gs = String(window.gameState || '');
    var hud = document.getElementById('hud-screen');
    return !!(hud && hud.classList.contains('active-screen')) || gs === 'fight' || gs === 'pre' || gs === 'post';
  }
  function ensureUi(){
    var d = document;
    if(!d.getElementById('v57-pause-btn')){
      var btn = d.createElement('button');
      btn.id = 'v57-pause-btn';
      btn.setAttribute('aria-label','Pause');
      btn.innerHTML = '<span class="bars"><span></span><span></span></span>';
      d.body.appendChild(btn);
    }
    if(!d.getElementById('v57-pause-overlay')){
      var ov = d.createElement('div');
      ov.id = 'v57-pause-overlay';
      ov.innerHTML = '<div id="v57-pause-panel">'
        + '<button class="v57-pause-action" id="v57-exit"><span class="emoji">🚪</span><span>EXIT</span></button>'
        + '<button class="v57-pause-action" id="v57-music"><span class="emoji">🎵</span><span>MUSIC</span></button>'
        + '<button class="v57-pause-action" id="v57-sfx"><span class="emoji">🥊</span><span>SFX</span></button>'
        + '<button class="v57-pause-action" id="v57-resume"><span class="emoji">▶</span><span>RESUME</span></button>'
        + '</div>';
      d.body.appendChild(ov);
    }
  }
  function positionBtn(){
    var d = document;
    var btn = d.getElementById('v57-pause-btn');
    var timer = d.getElementById('timer');
    if(!btn) return;
    if(!inFight()){
      btn.style.display = 'none';
      return;
    }
    btn.style.display = 'flex';
    if(timer){
      var r = timer.getBoundingClientRect();
      var top = Math.round(r.bottom + 10);
      var left = Math.round(r.left + r.width/2);
      btn.style.top = top + 'px';
      btn.style.left = left + 'px';
      btn.style.transform = 'translateX(-50%)';
    }
  }
  function openPause(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    var d = document;
    var ov = d.getElementById('v57-pause-overlay');
    if(!ov) return false;
    try{ window.__v57PausePrevState = (typeof gameState !== 'undefined' ? gameState : (window.gameState || 'fight')); }catch(_e){ window.__v57PausePrevState = window.gameState || 'fight'; }
    try{ gameState = 'post'; }catch(_e){ window.gameState = 'post'; }
    document.body.classList.add('fight-paused');
    ov.classList.add('active');
    return false;
  }
  function closePause(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    var d = document;
    var ov = d.getElementById('v57-pause-overlay');
    if(ov) ov.classList.remove('active');
    document.body.classList.remove('fight-paused');
    try{ gameState = window.__v57PausePrevState || 'fight'; }catch(_e){ window.gameState = window.__v57PausePrevState || 'fight'; }
    try{ if(typeof gameState !== 'undefined' && gameState === 'fight') lastTick = Date.now(); else if(window.gameState === 'fight') window.lastTick = Date.now(); }catch(_e){}
    return false;
  }
  function toggleSfx(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    try{
      try{ if(typeof settingsSfxVol !== 'number') settingsSfxVol = 1; }catch(_e){ if(typeof window.settingsSfxVol !== 'number') window.settingsSfxVol = 1; }
      if((typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : window.settingsSfxVol) > 0){
        window.__v57PrevSfxVol = (typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : window.settingsSfxVol);
        try{ settingsSfxVol = 0; }catch(_e){ window.settingsSfxVol = 0; }
      } else {
        try{ settingsSfxVol = typeof window.__v57PrevSfxVol === 'number' ? window.__v57PrevSfxVol : 1; }catch(_e){ window.settingsSfxVol = typeof window.__v57PrevSfxVol === 'number' ? window.__v57PrevSfxVol : 1; }
      }
      var fill = document.getElementById('sfx-vol-fill');
      var __v57sfx = 0; try{ __v57sfx = (typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : (window.settingsSfxVol || 0)); }catch(_e){ __v57sfx = window.settingsSfxVol || 0; } if(fill) fill.style.width = (__v57sfx * 100) + '%';
      try{ localStorage.setItem('chug_settings', JSON.stringify({mv:(typeof settingsMusicVol !== 'undefined' ? settingsMusicVol : window.settingsMusicVol), sv:(typeof settingsSfxVol !== 'undefined' ? settingsSfxVol : window.settingsSfxVol), sh:(typeof settingsShake !== 'undefined' ? settingsShake : window.settingsShake), cd:(typeof settingsComboDsp !== 'undefined' ? settingsComboDsp : window.settingsComboDsp)})); }catch(_e){}
    }catch(_e){}
    return false;
  }
  function exitFight(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    var d = document;
    var ov = d.getElementById('v57-pause-overlay');
    if(ov) ov.classList.remove('active');
    document.body.classList.remove('fight-paused');
    try{ if(typeof window.clearPendingFight === 'function') window.clearPendingFight(); }catch(_e){}
    try{ gameState = 'menu'; }catch(_e){ window.gameState = 'menu'; }
    if(typeof window.showScreen === 'function') window.showScreen('menu-screen');
    document.body.classList.remove('fight-clean-ui');
    document.body.classList.remove('fight-hud-v54');

    // Clear the main game canvas to prevent lingering fight sprites (e.g. giant serpent) when exiting combat.
    try {
      const canvas = document.getElementById('game');
      if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // Resetting width/height clears the canvas completely.
        const w = canvas.width;
        const h = canvas.height;
        canvas.width = w;
        canvas.height = h;
        // Fallback: explicitly clear the rect in case width/height resets are overridden elsewhere.
        ctx.clearRect(0, 0, w, h);
      }
    } catch(_err) {
      // Ignore any errors during canvas clearing; failure should not block exiting the fight.
    }
    return false;
  }
  function bind(){
    ensureUi();
    positionBtn();
    var d = document;
    var btn = d.getElementById('v57-pause-btn');
    var ov = d.getElementById('v57-pause-overlay');
    var exit = d.getElementById('v57-exit');
    var music = d.getElementById('v57-music');
    var sfx = d.getElementById('v57-sfx');
    var resume = d.getElementById('v57-resume');
    [[btn,openPause],[resume,closePause],[exit,exitFight],[sfx,toggleSfx]].forEach(function(pair){
      var el = pair[0], fn = pair[1];
      if(!el || el.__v57Bound) return;
      el.__v57Bound = true;
      ['pointerdown','click','touchstart'].forEach(function(evt){
        el.addEventListener(evt, fn, {passive:false});
      });
    });
    if(music && !music.__v57Bound){
      music.__v57Bound = true;
      ['pointerdown','click','touchstart'].forEach(function(evt){
        music.addEventListener(evt, function(ev){
          ev.preventDefault(); ev.stopPropagation();
          if(typeof window.toggleMusic === 'function') window.toggleMusic();
        }, {passive:false});
      });
    }
    if(ov && !ov.__v57Bound){
      ov.__v57Bound = true;
      ['pointerdown','click','touchstart'].forEach(function(evt){
        ov.addEventListener(evt, function(ev){ if(ev.target === ov) closePause(ev); }, {passive:false});
      });
    }
  }
  function tick(){
    ensureUi();
    bind();
    positionBtn();
    var ov = document.getElementById('v57-pause-overlay');
    var __v57gs=''; try{ __v57gs = String(typeof gameState !== 'undefined' ? gameState : (window.gameState || '')); }catch(_e){ __v57gs = String(window.gameState || ''); } if(ov && !ov.classList.contains('active') && __v57gs === 'menu'){
      document.body.classList.remove('fight-paused');
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', tick, {once:true});
  } else {
    tick();
  }
  setInterval(tick, 180);
  window.addEventListener('resize', positionBtn);
  window.addEventListener('orientationchange', positionBtn);
})();

// =========================================================

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

// =========================================================

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

  const ORDER = ['weapon','armor','helmet','range','upgrade'];
  const CAT_META = {
    weapon:{ label:'Weapon', icon:'⚔', unlockAct:1 },
    armor:{ label:'Armor', icon:'🛡', unlockAct:1 },
    helmet:{ label:'Helmet', icon:'⛑', unlockAct:1 },
    range:{ label:'Range', icon:'🔫', unlockAct:3 },
    magic:{ label:'Disabled', icon:'—', unlockAct:999 },
    upgrade:{ label:'Upgrade', icon:'⬆', unlockAct:1 },
  };

  const ARMORY_ITEMS = {
    weapon: [
      { id:'boxing_gloves', name:'Boxing Gloves', icon:'🥊', currency:'coin', price:100, requiredAct:1, desc:'Heavy impact strikes. Fast jab and devastating uppercut.', line:'+10 ATK · Brawler', stats:{ atk:10, spd:1.5 } },
      { id:'dagger', name:'Void Dagger', icon:'🗡️', currency:'coin', price:250, requiredAct:1, desc:'Dual-blade shadow assault. Lightning stabs with both hands, vicious cross-slashes and a deadly dual plunge.', line:'+8 ATK · +2 SPD · Dual Wield', stats:{ atk:8, spd:2 } },
      { id:'sai', name:'Needle Sai', icon:'🔱', currency:'coin', price:500, requiredAct:1, desc:'Needle\'s signature dual Sai. Rapid piercing strikes with medium range and unmatched speed.', line:'+9 ATK · +2.5 SPD · Dual Wield', stats:{ atk:9, spd:2.5 } },
      { id:'woodstick', name:'Twin Batons', icon:'🪵', currency:'coin', price:700, requiredAct:1, desc:'Fast wooden sticks modeled after act 1 batons. Very fast head-level strikes and sweeping arcs.', line:'+12 ATK · +1.8 SPD · Dual Batons', stats:{ atk:12, spd:1.8 } },
      { id:'nunchaku', name:'Nunchaku', icon:'⛓️', currency:'coin', price:1000, requiredAct:1, desc:'SF2 chained wooden sticks. Fast pressure and spins.', line:'+14 ATK · +2.3 SPD', stats:{ atk:14, spd:2.3 } },
      { id:'knives', name:'Twin Kamas', icon:'🪝', currency:'coin', price:1450, requiredAct:2, desc:'Dual crescent kamas with dedicated reaping forms. Four weapon-led attacks with no base boxing carryover.', line:'+15 ATK · +2.2 SPD · Dual Kamas', stats:{ atk:15, spd:2.2 } },
      { id:'katana', name:'Shadow Katana', icon:'🗡️', currency:'coin', price:1500, requiredAct:2, desc:'Two-handed forged katana with dedicated draw-slash forms and a cleaner steel finish.', line:'+20 ATK · +1.0 SPD', stats:{ atk:20, spd:1.0 } },
      { id:'spear', name:'Dragon Spear', icon:'🔱', currency:'coin', price:1600, requiredAct:2, desc:'Long crimson war-spear built for disciplined range pressure. Four dedicated forms: thrust, sweep, lift and impale.', line:'+16 ATK · +1.1 SPD · Long Range', stats:{ atk:16, spd:1.1 } },
      { id:'staff', name:'Wukong Staff', icon:'🪄', currency:'coin', price:1800, requiredAct:2, desc:'Legendary red-gold battle staff with four dedicated sweeping forms, long reach and heavy range control.', line:'+18 ATK · +1.2 SPD · Long Range', stats:{ atk:18, spd:1.2 } },
      { id:'claws', name:'Void Claws', icon:'🐅', currency:'coin', price:2000, requiredAct:3, desc:'Wolverine-style dual claws. Beast-like, aggressive slashing.', line:'+7 ATK · +2.5 SPD · Bleed', stats:{ atk:7, spd:2.5 } },
      { id:'hammer', name:'Doom Hammer', icon:'🔨', currency:'coin', price:2400, requiredAct:3, desc:'A brutal volcanic war maul. Both-hand shoulder carry, dedicated heavy swings, and crushing impact.', line:'+13 ATK · Ground-Shatter Impact', stats:{ atk:13, spd:-0.5 } },
      { id:'scythe', name:'Shadow Scythe', icon:'☽', currency:'coin', price:2650, requiredAct:3, desc:'A cursed void scythe with both-hand shoulder carry and four dedicated sweeping death forms.', line:'+18 ATK · +Long Range · Void Arc', stats:{ atk:18, spd:-0.8 } },
      { id:'dual', name:'Twin Katana', icon:'⚔', currency:'coin', price:2850, requiredAct:3, desc:'Dual katanas, one in each hand. Dedicated four-form sword style with no base pasted-on motion.', line:'+17 ATK · +1.2 SPD · Dual Blade', stats:{ atk:17, spd:1.2 } },
      { id:'lynx_claws', name:'Lynx Claws', icon:'🐾', currency:'coin', price:3200, requiredAct:4, desc:'Long-range assassin claws inspired by Lynx. Slimmer blades, extended reach, and a delayed time-bomb finisher.', line:'+14 ATK · +2.8 SPD · Time Bomb', stats:{ atk:14, spd:2.8 } },
      { id:'blood_reaper', name:'Blood Reaper', icon:'🩸', currency:'coin', price:3450, requiredAct:4, desc:'SF2 Blood Reaper: decorated kusarigama with curved sickle, long thrown chain ring, and bleeding drain.', line:'+19 ATK · -0.4 SPD · Chain Reap + Bleed', stats:{ atk:19, spd:-0.4 } },
      { id:'composite_sword', name:'Composite Sword', icon:'⚔', currency:'coin', price:3900, requiredAct:5, desc:'SF2 Composite Sword: nine segmented blades on a stretchable thread, very long range, and Bleeding.', line:'+22 ATK · +0.2 SPD · Whip Blade + Bleed', stats:{ atk:22, spd:0.4 } },
      { id:'ak47', name:'AK-47', icon:'🔫', currency:'coin', price:4500, requiredAct:5, desc:'Automatic rifle with dedicated ranged handling. No base punch overlay.', line:'+24 ATK · Burst Fire · Ranged', stats:{ atk:24, spd:-0.2 } }
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
      { id:'throwknife', name:'Throw Knife', icon:'◢', currency:'coin', price:260, requiredAct:3, desc:'Shadow knife throw. Fast single projectile.', line:'Range loadout · Fast', stats:{ atk:1 } },
      { id:'shuriken', name:'Shuriken', icon:'✶', currency:'coin', price:340, requiredAct:3, desc:'Three-star spread burst. Quick shadow utility.', line:'Range loadout · Triple Star', stats:{ atk:1 } },
      { id:'throwblade', name:'Throw Blade', icon:'◇', currency:'coin', price:420, requiredAct:3, desc:'Larger spinning blade with stronger impact.', line:'Range loadout · Heavy Slice', stats:{ atk:2 } },
      { id:'needle', name:'Needle', icon:'✦', currency:'coin', price:460, requiredAct:3, desc:'Needle volley. Thin fast piercing darts.', line:'Range loadout · Piercing', stats:{ atk:2 } },
      { id:'minihammer', name:'Small Hammer', icon:'⬢', currency:'coin', price:520, requiredAct:3, desc:'Compact thrown hammer with arcing heavy knock.', line:'Range loadout · Heavy Arc', stats:{ atk:2 } },
      { id:'gun', name:'Sidearm Gun', icon:'⌁', currency:'coin', price:780, requiredAct:4, desc:'Fast pistol shot. Clean straight bullet.', line:'Range loadout · Bullet', stats:{ atk:3 } },
      { id:'bow', name:'Shadow Bow', icon:'⌒', currency:'coin', price:460, requiredAct:3, desc:'Long draw, strong precision.', line:'Range loadout · Long', stats:{ atk:2 } },
      { id:'counterbow', name:'Counter Bow', icon:'⌒', currency:'gem', price:6, requiredAct:4, desc:'Sharper counter-fire bow.', line:'Range loadout · Counter', stats:{ atk:3 } },
      { id:'crossbow', name:'Void Crossbow', icon:'⌖', currency:'gem', price:9, requiredAct:5, desc:'Compact brutal ranged finisher.', line:'Range loadout · Burst', stats:{ atk:4 } },
      { id:'energyblast', name:'Small Energy Blast', icon:'◎', currency:'gem', price:8, requiredAct:4, desc:'Small void orb fired straight ahead.', line:'Range loadout · Arc Energy', stats:{ atk:3 } },
      { id:'landmine', name:'Landmine', icon:'▣', currency:'gem', price:10, requiredAct:5, desc:'Drops a dark trap mine that explodes on contact.', line:'Range loadout · Trap', stats:{ atk:4 } }
    ],

magic: [],
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
  let armorySelectedItemId = 'boxing_gloves';
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

    if(arm.equipped.weapon && arm.equipped.weapon !== 'boxing_gloves') uniquePush(arm.owned.weapon, arm.equipped.weapon);
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
    if(item && item.category !== 'upgrade'){
      const catOwned = (arm.owned[item.category] || []).includes(item.id) || arm.equipped[item.category] === item.id;
      if(item.category === 'weapon' && !catOwned){} else { eq[item.category] = item.id; }
    }
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

    // DELIBERATELY OMITTED AUTO-EQUIP FOR "BUY THEN EQUIP" FLOW

    commitArmory(arm);
    maybeFlashPreview();
    if(typeof shopToast === 'function'){
      shopToast('✓ OWNED: ' + item.name.toUpperCase(), item.currency === 'gem' ? '#cc88ff' : '#8fd672');
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
    const magicPreview = null;

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
                  
                '</div>' +
              '</div>' +
              '<div class="armory-preview-floor"></div>' +
              '<div class="armory-fighter ' + (previewFlash ? 'flash' : '') + '" data-weapon="' + escapeHtml(previewLoadout.weapon || 'none') + '" data-armor="' + escapeHtml(previewLoadout.armor || 'none') + '" data-helmet="' + escapeHtml(previewLoadout.helmet || 'none') + '" data-range="' + escapeHtml(previewLoadout.range || 'none') + '" data-magic="none">' +
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
    const gc = null;
    const gg = null;
    const gl = null;
    if(gc) gc.style.setProperty('display','none','important');
    if(gg) gg.style.setProperty('display','none','important');
    if(gl) gl.style.setProperty('display','none','important');
    if(typeof showScreen === 'function') showScreen('shop-screen');
  };

  const _v59CloseShopBase = window.closeShop;
  closeShop = window.closeShop = function(){
    const gc = null;
    const gg = null;
    const gl = null;
    if(gc) gc.style.removeProperty('display');
    if(gg) gg.style.removeProperty('display');
    if(gl) gl.style.removeProperty('display');
    return _v59CloseShopBase ? _v59CloseShopBase.call(this) : undefined;
  };

  refreshShopUI = window.refreshShopUI = renderArmoryUI;

  function applyDevUnlockAll(){
    const save = window.__saveData || (window.__saveData = {});
    ensureGameStateShape && ensureGameStateShape(save);

    // push story / progression to fully unlocked for testing
    save.chapterUnlocked = 50;
    save.currentPart = 50;
    save.currentChapter = 10;
    save.currentAct = 5;
    save.currentWorld = 3;

    // test wallet
    if(typeof coins !== 'undefined') coins = Math.max(Number(coins)||0, 999999);
    save.coins = Math.max(Number(save.coins)||0, 999999);
    if(typeof _gems !== 'undefined') _gems = Math.max(Number(_gems)||0, 9999);
    save._gems = Math.max(Number(save._gems)||0, 9999);

    // max legacy upgrades
    if(typeof rageMode2 !== 'undefined') rageMode2 = true;
    if(typeof strengthUpg !== 'undefined') strengthUpg = 2;
    if(typeof speedUpg !== 'undefined') speedUpg = 2;
    if(typeof enduranceUpg !== 'undefined') enduranceUpg = 2;
    save.rageMode2 = true;
    save.strengthUpg = 2;
    save.speedUpg = 2;
    save.enduranceUpg = 2;

    // unlock campaign-side arrays too
    save.unlockedTrainingPaths = ['iron_body','shadow_step','void_timing','rage_sync','battle_focus'];
    save.unlockedRageTiers = [1,2,3,4,5];
    save.unlockedWeapons = (ARMORY_ITEMS.weapon || []).map(function(it){ return it.id; });

    // armory unlock all
    const arm = ensureArmoryState();
    ['weapon','armor','helmet','range','magic','upgrade'].forEach(function(cat){
      arm.owned[cat] = arm.owned[cat] || [];
      (ARMORY_ITEMS[cat] || []).forEach(function(item){
        uniquePush(arm.owned[cat], item.id);
        if(cat !== 'upgrade' && arm.levels[item.id] == null) arm.levels[item.id] = 5;
      });
    });

    // keep currently equipped valid; if empty, equip strong defaults
    if(!arm.equipped.weapon || arm.equipped.weapon === 'none') arm.equipped.weapon = 'ak47';
    if(!arm.equipped.armor || arm.equipped.armor === 'none') arm.equipped.armor = 'voidarmor';
    if(!arm.equipped.helmet || arm.equipped.helmet === 'none') arm.equipped.helmet = 'onihelm';
    if(!arm.equipped.range || arm.equipped.range === 'none') arm.equipped.range = 'crossbow';
    if(!arm.equipped.magic || arm.equipped.magic === 'none') arm.equipped.magic = 'bloodoath';

    // sync legacy equipped fields
    weapon = arm.equipped.weapon;
    armor = arm.equipped.armor;
    save.weapon = arm.equipped.weapon;
    save.armor = arm.equipped.armor;
    save.helmet = arm.equipped.helmet;
    save.rangedWeapon = arm.equipped.range;
    save.magicLoadout = arm.equipped.magic;
    save.armory = arm;

    try{ localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }catch(_e){}
    window.__saveData = save;
  }

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

// =========================================================

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

    const gg = null;
    const gl = null;
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
      coins = 5000;
      weapon = 'none';
      armor = 'none';
      rageMode2 = false;
      strengthUpg = 0;
      speedUpg = 0;
      enduranceUpg = 0;
      currentPart = 1;
      window.currentPart = 1;
      if(typeof syncCurrentPartGlobal === 'function') syncCurrentPartGlobal();
      if(typeof UI !== 'undefined' && UI.cVal) UI.cVal.innerText = 5000;
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
          chapterUnlocked: 1,
          currentPart: 1,
          pendingFightType: null,
          pendingFightPart: null,
          pendingFightIndex: null
        });
      }
    }catch(_){}
    try{ if(typeof v9SaveGame === 'function') v9SaveGame(); }catch(_){}

    goToDojoLobby();

    const gg = null;
    const gl = null;
    if(gg) gg.style.display = 'flex';
    if(gl) gl.style.display = 'flex';
  };

  document.addEventListener('pointerdown', function(ev){
    const t = ev && ev.target;
    const introBtn = t && t.closest ? t.closest('.intro-menu-btn') : null;
    if(introBtn){
      const el = document.documentElement;
      const fsOk = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
      const enterFs = fsOk && (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen);
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

// =========================================================

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

/* ===== SETTINGS POLISH PATCH (v62) ===== */
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

// =========================================================

(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function formatSupportBonusFromValues(b){
    if(!b) return 'No passive bonuses available.';
    const parts = [];
    if (b.dmg > 0) parts.push('+' + b.dmg + ' DMG');
    if (b.def > 0) parts.push('+' + b.def + ' DEF');
    if (b.rageGain > 0) parts.push('+' + Math.round(b.rageGain * 100) + '% RAGE');
    if (b.recovery > 0) parts.push('+' + b.recovery + ' REC');
    return parts.length ? parts.join(' · ') : 'No passive bonuses available.';
  }

  function formatSupportFlavor(rec){
    if (!rec) return 'Reserve this position for passive battle support.';
    const bonus = (window.SQUAD_SUPPORT_BONUSES || {})[rec.id];
    if (bonus) return 'Passive effect: ' + formatSupportBonusFromValues(bonus);
    return 'Passive support available once deployed.';
  }

  function updateSquadMeta(mainRec, supports, bonuses){
    const supportCount = supports.filter(Boolean).length;
    const mainPill = document.getElementById('squadMainStatusPill');
    const supportPill = document.getElementById('squadSupportStatusPill');
    const commandCopy = document.getElementById('squadCommandCopy');
    const formationStatus = document.getElementById('squadFormationStatus');
    const mainNote = document.getElementById('squadMainNote');
    const supportSummary = document.getElementById('squadSupportSummary');

    if (mainPill) mainPill.textContent = mainRec ? 'ACTIVE LEAD' : 'UNSET';
    if (supportPill) supportPill.textContent = supportCount + ' / 2 READY';

    const supportText = formatSupportBonusFromValues(bonuses);
    if (commandCopy) {
      commandCopy.textContent = supportCount
        ? 'Lead fighter selected. Passive support bonuses online: ' + supportText + '.'
        : 'Select a lead fighter and reinforce them with tactical support positions.';
    }

    if (mainNote) {
      if (mainRec) {
        const leadRole = mainRec.role || 'Lead fighter';
        mainNote.textContent = (mainRec.name || 'This fighter') + ' is your active point fighter. ' + leadRole + ' anchors this formation.';
      } else {
        mainNote.textContent = 'Choose the main fighter who represents this formation in battle.';
      }
    }

    if (supportSummary) {
      supportSummary.textContent = supportCount
        ? 'Assigned support effects: ' + supportText + '.'
        : 'Supports grant passive bonuses to your active formation.';
    }

    if (formationStatus) {
      formationStatus.textContent = supportCount === 0
        ? 'No support fighters assigned yet. Fill both positions to unlock a denser squad profile.'
        : supportCount === 1
          ? 'One tactical support slot is active. Add one more to complete the formation.'
          : 'Both support positions are active. Your formation is fully reinforced.';
    }
  }

  _renderSquadScreen = function(){
    const mainId   = getMainFighter();
    const supports = getSupportMembers();
    const bonuses  = getSquadBonuses();

    const mainRec = typeof getRosterRecord === 'function' ? getRosterRecord(mainId) : null;
    _applySlotUI('Main', mainRec, bonuses, true);

    [0, 1].forEach(function(i){
      const id  = supports[i] || null;
      const rec = id && typeof getRosterRecord === 'function' ? getRosterRecord(id) : null;
      _applySlotUI('Support' + i, rec, null, false);
    });

    _refreshBonusChips(bonuses);
    updateSquadMeta(mainRec, supports, bonuses);
  };

  _applySlotUI = function(slotKey, rec, bonuses, isMain){
    const iconEl   = document.getElementById('squad' + slotKey + 'Icon');
    const nameEl   = document.getElementById('squad' + slotKey + 'Name');
    const roleEl   = document.getElementById('squad' + slotKey + 'Role');
    const bonusEl  = document.getElementById('squad' + slotKey + 'Bonus');
    const sigEl    = document.getElementById('squad' + slotKey + 'Signature');
    const tagEl    = document.getElementById('squad' + slotKey + 'Tag');
    const slotEl   = document.getElementById(isMain ? 'squadMainSlot' : 'squadSupport' + slotKey.replace('Support',''));
    const actionEl = document.getElementById(isMain ? 'squadMainAction' : 'squadSupportAction' + slotKey.replace('Support',''));

    if (!iconEl || !nameEl || !roleEl || !slotEl) return;

    if (rec) {
      iconEl.textContent = rec.icon || '?';
      nameEl.textContent = rec.name || rec.id;
      roleEl.textContent = isMain
        ? ((rec.role || 'Lead fighter') + ' · Active Lead')
        : (rec.role || 'Support Operative');

      if (bonusEl && isMain && bonuses) {
        const text = formatSupportBonusFromValues(bonuses);
        bonusEl.textContent = text === 'No passive bonuses available.' ? 'No support bonuses active.' : 'Squad Aura · ' + text;
      } else if (bonusEl && !isMain) {
        const b = (window.SQUAD_SUPPORT_BONUSES || {})[rec.id];
        bonusEl.textContent = formatSupportBonusFromValues(b);
      }

      if (sigEl) sigEl.textContent = isMain
        ? 'Lead this formation into battle. Tap to switch your active point fighter.'
        : formatSupportFlavor(rec);

      if (tagEl) tagEl.textContent = isMain ? 'LEAD' : 'READY';
      if (actionEl) actionEl.textContent = 'CHANGE';

      slotEl.classList.remove('empty-slot');
      slotEl.dataset.state = 'occupied';
    } else {
      iconEl.textContent = '＋';
      nameEl.textContent = isMain ? 'CHUG' : 'EMPTY SLOT';
      roleEl.textContent = isMain ? 'Protagonist · Striker' : 'Tap to assign support';
      if (bonusEl) bonusEl.textContent = isMain ? 'No support bonuses active.' : '';
      if (sigEl) sigEl.textContent = isMain
        ? 'Lead this formation into battle. Tap to switch your active point fighter.'
        : 'Reserve this position for passive battle support.';
      if (tagEl) tagEl.textContent = isMain ? 'LEAD' : 'OPEN';
      if (actionEl) actionEl.textContent = isMain ? 'CHANGE' : 'ASSIGN';

      if (!isMain) slotEl.classList.add('empty-slot');
      slotEl.dataset.state = isMain ? 'occupied' : 'empty';
    }
  };

  _refreshBonusChips = function(bonuses){
    function set(id, valId, val, suffix){
      const chip = document.getElementById(id);
      const valEl = document.getElementById(valId);
      if (!chip || !valEl) return;
      valEl.textContent = (val > 0 ? '+' : '') + (suffix === '%' ? Math.round(val*100) : val) + suffix;
      chip.classList.toggle('active', val > 0);
    }
    set('sbc-dmg',  'sbc-dmg-val', bonuses.dmg, '');
    set('sbc-def',  'sbc-def-val', bonuses.def, '');
    set('sbc-rage', 'sbc-rage-val', bonuses.rageGain, '%');
    set('sbc-rec',  'sbc-rec-val', bonuses.recovery, '');
  };

  openSquadPicker = function(mode, slotIndex){
    _pickerMode = mode;
    _pickerSlot = slotIndex || 0;

    const titleEl = document.getElementById('pickerTitle');
    const subtitleEl = document.getElementById('pickerSubtitle');
    if (titleEl) titleEl.textContent = mode === 'main' ? 'SELECT MAIN FIGHTER' : 'ASSIGN SUPPORT';
    if (subtitleEl) subtitleEl.textContent = mode === 'main'
      ? 'Choose the elite fighter who will represent this formation in battle.'
      : 'Fill this tactical slot with a fighter who grants passive squad bonuses.';

    const list = document.getElementById('pickerList');
    if (!list) return;

    const currentMain = getMainFighter();
    const currentSupports = getSupportMembers();

    const eligible = (typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA : [])
      .map(function(r){ return typeof getRosterRecord === 'function' ? getRosterRecord(r.id) : r; })
      .filter(function(r){ return _squadEligible(r, mode); });

    if (!eligible.length) {
      list.innerHTML = '<div class="picker-empty">NO ELIGIBLE CHARACTERS<div class="picker-empty-sub">Progress further to unlock more squad candidates.</div></div>';
    } else {
      list.innerHTML = eligible.map(function(r){
        const isCurrent = mode === 'main' ? r.id === currentMain : currentSupports[_pickerSlot] === r.id;
        const alreadyUsed = mode === 'support' && (
          r.id === currentMain ||
          currentSupports.some(function(s, i){ return s === r.id && i !== _pickerSlot; })
        );
        const bonusText = mode === 'support'
          ? formatSupportBonusFromValues((window.SQUAD_SUPPORT_BONUSES || {})[r.id])
          : ((r.role || 'Lead fighter') + ' · Main roster selection');
        return '<div class="picker-row' + (isCurrent ? ' selected' : '') + (alreadyUsed ? ' unavailable' : '') + '" onclick="pickSquadMember(\'' + esc(r.id) + '\')">' +
            '<div class="picker-icon-wrap"><div class="picker-icon">' + esc(r.icon || '?') + '</div></div>' +
            '<div class="picker-info">' +
              '<div class="picker-name">' + esc(r.name || r.id) + '</div>' +
              '<div class="picker-role">' + esc(r.role || '') + '</div>' +
              '<div class="picker-bonus">' + esc(bonusText) + '</div>' +
            '</div>' +
            '<div class="picker-check">✓</div>' +
          '</div>';
      }).join('');
    }

    if (mode === 'support' && currentSupports[_pickerSlot]) {
      list.innerHTML += '<div class="picker-row remove-row" onclick="pickSquadMember(null)">' +
        '<div class="picker-icon-wrap"><div class="picker-icon" style="font-size:18px;">✕</div></div>' +
        '<div class="picker-info">' +
          '<div class="picker-name">REMOVE SUPPORT</div>' +
          '<div class="picker-role">Clear this tactical slot and remove its passive effect.</div>' +
        '</div>' +
      '</div>';
    }

    const picker = document.getElementById('squadPicker');
    if (picker) picker.classList.add('visible');
  };

  closeSquadPicker = function(){
    const picker = document.getElementById('squadPicker');
    if (picker) picker.classList.remove('visible');
  };

  function initSquadPremiumShell(){
    if (document.getElementById('squad-screen')) {
      try { _renderSquadScreen(); } catch (err) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSquadPremiumShell, { once:true });
  } else {
    initSquadPremiumShell();
  }

  window.openSquadPicker = openSquadPicker;
  window.closeSquadPicker = closeSquadPicker;
})();

// =========================================================

(function(){
  const container = document.getElementById('petals-container');
  if(!container) return;
  function spawnPetal(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
  }
  setInterval(spawnPetal, 600);
})();

// =========================================================

(function(){
  function ensure(id){
    var el = document.getElementById(id);
    if(!el){
      el = document.createElement('div');
      el.id = id;
      el.style.display = 'none';
      el.setAttribute('aria-hidden','true');
      document.body.appendChild(el);
    }
    return el;
  }
  ['global-coins','global-gems','global-level','p-stam','stam-text','coin-val','gem-val','lv-val'].forEach(ensure);
  if(window.UI){
    UI.gCoins = UI.gCoins || document.getElementById('global-coins') || window.__sf2NullElement;
    UI.pstam = UI.pstam || document.getElementById('p-stam') || window.__sf2NullElement;
    UI.slbl = UI.slbl || document.getElementById('stam-text') || window.__sf2NullElement;
  }
  if(typeof window.requestFullscreenSafe !== 'function'){
    window.requestFullscreenSafe = function(el){
      el = el || document.documentElement;
      var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if(fn) { try { return fn.call(el); } catch(e){} }
      return false;
    };
  }
    const msg = String(ev && ev.message || '');
    if(msg.includes("Cannot set properties of null") && msg.includes("innerText")){
      const c = document.getElementById('coin-val') || document.getElementById('sf2-coins');
      if(window.UI && !window.UI.cVal) window.UI.cVal = c;
    }
  });

// =========================================================
/* ════════════════════════════════════════════════
   CHUG: SHADOW OF FAME
   PREMIUM MOVES & ANIMATIONS — by Xollonox
   New attacks, enhanced VFX, screen effects
════════════════════════════════════════════════ */

(function(){
  'use strict';

  // ── UPPERCUT LAUNCHER ──
  window.__chugUppercut = function(fighter, en, dir){
    if(fighter.atkT > 6 || fighter.stamina < 18) return false;
    fighter.stamina = Math.max(0, fighter.stamina - 18);
    fighter.atkT = Math.floor(18 * (fighter.raging ? 0.75 : 1));
    fighter.hitF = Math.floor(fighter.atkT * 0.45);
    fighter.state = 'atk';
    fighter.atkType = 'u';
    fighter.cWin = 30;
    fighter.vy = -4;
    beep(220, 'sawtooth', 0.22, 0.08);
    return true;
  };

  // ── SWEEP KICK ──
  window.__chugSweep = function(fighter, en, dir){
    if(fighter.atkT > 6 || fighter.stamina < 14) return false;
    fighter.stamina = Math.max(0, fighter.stamina - 14);
    fighter.atkT = Math.floor(16 * (fighter.raging ? 0.7 : 1));
    fighter.hitF = Math.floor(fighter.atkT * 0.5);
    fighter.state = 'atk';
    fighter.atkType = 'sw';
    fighter.cWin = 28;
    beep(160, 'triangle', 0.18, 0.06);
    return true;
  };

  // ── ENHANCED HIT SPARKS ──
  window.__chugHitSparks = function(x, y, dir, weapon, heavy, isCrit){
    const count = heavy ? 20 : (isCrit ? 30 : 8);
    const colors = {
      default: ['#ffd700','#ff8c00','#fff4cc'],
      katana:  ['#e8e0d0','#c0c0c0','#ffffff'],
      dagger:  ['#00e5ff','#00bcd4','#80deea'],
      staff:   ['#c8a84c','#a08030','#e8d080'],
      hammer:  ['#ff6d00','#ff3d00','#ffab00'],
      scythe:  ['#b388ff','#7c4dff','#ea80fc'],
      claws:   ['#ff4081','#f50057','#ff80ab'],
      knuckle: ['#ffd700','#ff8c00','#ffe082'],
      spear:   ['#82b1ff','#448aff','#b388ff'],
      none:    ['#ffffff','#e0e0e0','#f5f5f5']
    };
    const pal = colors[weapon] || colors.default;
    for(let i = 0; i < count; i++){
      const angle = -Math.PI/2 + (Math.random()-0.5)*Math.PI * (dir > 0 ? 1 : -1);
      const speed = 2 + Math.random() * (heavy ? 8 : 4);
      particles.push({
        x: x + (Math.random()-0.5)*8,
        y: y + (Math.random()-0.5)*6,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        life: 0.3 + Math.random() * 0.4,
        col: pal[Math.floor(Math.random() * pal.length)],
        w: Math.random() * (heavy ? 12 : 6) + 3,
        tp: 's'
      });
    }
    if(heavy){
      for(let i = 0; i < 12; i++){
        const a = (i/12) * Math.PI * 2;
        particles.push({
          x: x, y: y,
          vx: Math.cos(a) * (3 + Math.random() * 3),
          vy: Math.sin(a) * (3 + Math.random() * 3),
          life: 0.2 + Math.random() * 0.2,
          col: 'rgba(255,255,255,0.6)',
          w: Math.random() * 4 + 2,
          tp: 's'
        });
      }
    }
  };

  // ── AIR DISTORTION WAVE ──
  window.__chugAirDistortion = function(x, y, dir, size){
    const sz = size || 30;
    for(let i = 0; i < 6; i++){
      particles.push({
        x: x + (Math.random()-0.5)*10,
        y: y + (Math.random()-0.5)*10,
        vx: Math.random() * 2 * dir,
        vy: (Math.random()-0.5) * 2,
        life: 0.15 + Math.random() * 0.1,
        col: 'rgba(255,255,255,0.15)',
        w: sz * (0.5 + Math.random() * 0.5),
        tp: 'f'
      });
    }
  };

  // ── GROUND CRACK EFFECT ──
  window.__chugGroundCrack = function(x, y){
    for(let i = 0; i < 25; i++){
      const angle = Math.random() * Math.PI * 2;
      const dist = 10 + Math.random() * 40;
      particles.push({
        x: x + Math.cos(angle) * dist * 0.3,
        y: y - 2,
        vx: Math.cos(angle) * (2 + Math.random() * 4),
        vy: -(1 + Math.random() * 3),
        life: 0.4 + Math.random() * 0.3,
        col: 'rgba(160,140,110,' + (0.2 + Math.random() * 0.2) + ')',
        w: Math.random() * 8 + 4,
        tp: 's'
      });
    }
  };

  // ── SCREEN PULSE ON RAGE ──
  window.__chugRagePulse = function(){
    const el = document.getElementById('game') || document.body;
    el.style.transition = 'filter 0.05s';
    el.style.filter = 'brightness(1.4) saturate(1.6)';
    setTimeout(() => { el.style.filter = 'brightness(0.6) saturate(0.8)'; }, 60);
    setTimeout(() => { el.style.filter = 'brightness(1.2) saturate(1.3)'; }, 120);
    setTimeout(() => { el.style.filter = 'brightness(1) saturate(1)'; }, 180);
  };

  // ── PATCH FIGHTER FOR NEW MOVES ──
  const _origAttack = Fighter.prototype.attack;
  const _origUpdate = Fighter.prototype.update;
  const _origDraw = Fighter.prototype.draw;

  Fighter.prototype.attack = function(type){
    if(type === 'u' || type === 'sw'){
      this.atkType = type;
      this.state = 'atk';
      this.combo++;
      if(this.combo > 4) this.combo = 1;
      return;
    }
    return _origAttack.call(this, type);
  };

  Fighter.prototype.update = function(en){
    const ret = _origUpdate.call(this, en);
    if(this.isP && this.rageActive && this.__shadowTick && this.__shadowTick % 30 === 0 && this.hp > 0){
      for(let i = 0; i < 3; i++){
        particles.push({
          x: this.x + this.w/2 + (Math.random()-0.5)*this.w,
          y: this.y - this.h * (0.2 + Math.random() * 0.6),
          vx: (Math.random()-0.5) * 1.2,
          vy: -(0.5 + Math.random() * 0.8),
          life: 0.3 + Math.random() * 0.2,
          col: this.rageTier === 2 ? 'rgba(255,60,60,0.25)' : 'rgba(100,220,255,0.25)',
          w: Math.random() * 6 + 3,
          tp: 'f'
        });
      }
    }
    if(this.isP && K.rage && this.rage >= 100 && !this.rageActive){
      setTimeout(window.__chugRagePulse, 10);
    }
    return ret;
  };

  Fighter.prototype.draw = function(c, ghost){
    if(this.state === 'atk' && this.atkType === 'u' && !ghost){
      c.save();
      const prog = this.hitF > 0 ? Math.max(0, Math.min(1, (this.hitF - this.atkT) / this.hitF)) : 0;
      const windup = this.atkT > this.hitF + 2;
      const sqX = windup ? 0.9 + prog * 0.1 : 1.2 - prog * 0.2;
      const sqY = windup ? 1.1 - prog * 0.1 : 0.8 + prog * 0.2;
      c.translate(this.x + this.w/2, this.y);
      if(this.rotation) c.rotate(this.rotation);
      c.scale(this.dir * sqX * this.scale, sqY * this.scale);
      const bob = Math.sin(Date.now()/100)*2;
      const bodyCol = this.hitT > 0 ? '#ffffff' : (this.raging ? (this.rageTier===2 ? '#140404' : '#060913') : '#000');
      const clothCol = this.hitT > 0 ? '#ffffff' : (this.raging ? (this.rageTier===2 ? '#320808' : '#0d1730') : '#000');
      const hR = 13, headY = -this.baseH - 5 + bob;
      const shoulderY = -this.baseH + 15 + bob;
      const waistY = -this.baseH * 0.45 + bob;
      const rise = windup ? 0 : prog * 15;
      c.fillStyle = bodyCol;
      c.beginPath(); c.arc(2, headY - rise, hR, 0, Math.PI*2); c.fill();
      c.fillStyle = clothCol;
      c.fillRect(-20 + rise*0.3, shoulderY - rise, 40 - rise*0.6, -shoulderY + waistY + rise*0.5);
      const fistX = windup ? -10 : 15 + prog * 25;
      const fistY = windup ? waistY + 10 : (headY - 20) - prog * 35 - rise;
      c.fillStyle = bodyCol;
      c.beginPath(); c.arc(this.dir * fistX, fistY, 8, 0, Math.PI*2); c.fill();
      if(!windup && prog < 0.8){
        c.globalAlpha = 0.3 * (1 - prog);
        c.fillStyle = '#ffd700';
        c.beginPath(); c.arc(this.dir * (fistX - 8), fistY - 12, 6, 0, Math.PI*2); c.fill();
        c.globalAlpha = 1;
      }
      c.restore();
      return;
    }
    if(this.state === 'atk' && this.atkType === 'sw' && !ghost){
      c.save();
      const prog = this.hitF > 0 ? Math.max(0, Math.min(1, (this.hitF - this.atkT) / this.hitF)) : 0;
      const windup = this.atkT > this.hitF + 2;
      c.translate(this.x + this.w/2, this.y);
      if(this.rotation) c.rotate(this.rotation);
      c.scale(this.dir * this.scale, this.scale);
      const bob = Math.sin(Date.now()/100)*2;
      const bodyCol = this.hitT > 0 ? '#ffffff' : '#000';
      const headY = -this.baseH - 5 + bob;
      const shoulderY = -this.baseH + 15 + bob;
      const waistY = -this.baseH * 0.45 + bob;
      c.fillStyle = bodyCol;
      c.beginPath(); c.arc(2, headY, 13, 0, Math.PI*2); c.fill();
      const lean = windup ? -12 : prog * 20;
      c.fillStyle = '#222';
      c.fillRect(-15 + lean, shoulderY, 30, -shoulderY + waistY);
      const legExt = windup ? 10 : 20 + prog * 35;
      const legY = windup ? -5 : 5 + prog * 15;
      c.fillStyle = bodyCol;
      c.save(); c.translate(this.dir * (10 + legExt * 0.5), legY);
      c.fillRect(-4, -4, 8, 12); c.restore();
      if(!windup && prog < 0.9){
        c.globalAlpha = 0.25 * (1 - prog * 0.6);
        c.strokeStyle = '#c0e0ff'; c.lineWidth = 3;
        c.beginPath(); c.arc(this.dir * 12, 5, 20 + prog * 25, -0.3, 0.8); c.stroke();
        c.globalAlpha = 1;
      }
      c.restore();
      return;
    }
    return _origDraw.call(this, c, ghost);
  };

  // ── PATCH HIT WITH ENHANCED SPARKS ──
  const _origTakeHit = Fighter.prototype.takeHit;
  Fighter.prototype.takeHit = function(dmg, fd, heavy){
    const ret = _origTakeHit.call(this, dmg, fd, heavy);
    if(dmg > 0 && this.hp > 0){
      window.__chugHitSparks(this.x + this.w/2, this.y - this.h * 0.4,
        fd > 0 ? 1 : -1,
        this.isP ? (window.weapon || 'none') : (this.eWeapon || 'none'),
        heavy, dmg > (this.maxHp * 0.15));
      if(heavy) window.__chugAirDistortion(this.x + this.w/2, this.y - this.h*0.3, fd, 25);
    }
    return ret;
  };

  // ── SUPER COMBO FINISHER ──
  window.__chugFinisher = function(fighter, en, comboN){
    if(comboN < 5 || fighter.stamina < 25) return false;
    fighter.stamina = Math.max(0, fighter.stamina - 25);
    const bonusDmg = Math.floor(fighter.dmg * 2.5);
    en.takeHit(bonusDmg, fighter.dir, true);
    screenShake = 20; hitStop = 12; doFlash();
    for(let i = 0; i < 40; i++){
      const a = (i/40) * Math.PI * 2;
      particles.push({
        x: en.x + en.w/2 + Math.cos(a) * 6, y: en.y - en.h/2 + Math.sin(a) * 6,
        vx: Math.cos(a) * (5 + Math.random() * 5), vy: Math.sin(a) * (5 + Math.random() * 5),
        life: 0.4 + Math.random() * 0.3,
        col: ['#ffd700','#ff6d00','#ff1744','#ffea00'][Math.floor(Math.random() * 4)],
        w: Math.random() * 10 + 5, tp: 's'
      });
    }
    floatingTexts.push({x: en.x + en.w/2, y: en.y - en.h - 20, t: 'FINISHER!',
      life: 1.2, vy: -2.5, col: '#ffd700', size: 22});
    window.__chugGroundCrack(en.x + en.w/2, GND);
    window.__chugAirDistortion(en.x + en.w/2, en.y - en.h*0.3, fighter.dir, 45);
    beep(50, 'sawtooth', 0.3, 0.2);
    setTimeout(() => beep(100, 'square', 0.2, 0.15), 80);
    setTimeout(() => beep(180, 'triangle', 0.15, 0.1), 160);
    return true;
  };

})();

(function(){
  window.addEventListener('error', function(ev){
    const msg = String(ev && ev.message || '');
    if(msg.includes("Cannot set properties of null") && msg.includes("innerText")){
      const c = document.getElementById('coin-val') || document.getElementById('sf2-coins');
      if(window.UI && !window.UI.cVal) window.UI.cVal = c;
    }
  });
})();
