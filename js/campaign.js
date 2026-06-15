// ── Structural constants ──
export const CAMPAIGN_PARTS_PER_CHAPTER = 5;
export const CAMPAIGN_CHAPTERS_PER_ACT  = 2;
export const CAMPAIGN_ACTS_PER_WORLD    = 2;

// ── Per-part metadata table ──
export const CAMPAIGN_PART_META = {
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
  // ── WORLD 1 · ACT 2 · CHAPTER 4 ────────────────────────────
  16: { title:'The Hooded One',         chapter:4, act:2, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['hooded_fighter'],
        rewards:{ coins:100, xp:30 } },
  17: { title:'The Footprint',          chapter:4, act:2, world:1,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['footprint_clue'],
        rewards:{ coins:100, xp:30 } },
  18: { title:'Split Horn',             chapter:4, act:2, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['split_horn_concept'],
        rewards:{ coins:150, xp:50 } },
  19: { title:'The Name at the Edge',   chapter:4, act:2, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['tora_oni_reveal'],
        rewards:{ coins:150, xp:50 } },
  20: { title:'Too Late',               chapter:4, act:2, world:1,
        missionType:'boss',       characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['too_late_event'],
        rewards:{ coins:150, xp:50 } },
  // ── WORLD 2 · ACT 3 · CHAPTER 5 ──────────────────────────────
  21: { title:'Ash Camp upgraded',      chapter:5, act:3, world:2,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'ash_camp_upgrade', teacherUnlock:null,
        codexUnlocks:['ash_camp_v2'],
        rewards:{ coins:150, xp:50 } },
  22: { title:'Zeph',                   chapter:5, act:3, world:2,
        missionType:'survival',   characterUnlocks:[], rescueFlags:[],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['zeph'],
        rewards:{ coins:150, xp:50 } },
  23: { title:'Glass Hollow',           chapter:5, act:3, world:2,
        missionType:'rescue',     characterUnlocks:[], rescueFlags:['addy_pending'],
        campEvent:null, teacherUnlock:null,
        codexUnlocks:['addy','glass_hollow'],
        rewards:{ coins:175, xp:60 } },
  24: { title:"Knight's Table",         chapter:5, act:3, world:2,
        missionType:'camp',       characterUnlocks:[], rescueFlags:[],
        campEvent:'table_built', teacherUnlock:null,
        codexUnlocks:['knight_faction'],
        rewards:{ coins:150, xp:50 } },
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

/** Returns the world number (1-based) that contains the given part. */
export function getWorldFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.world;
  const chapter = getChapterFromPart(part);
  const act = Math.ceil(chapter / CAMPAIGN_CHAPTERS_PER_ACT);
  return Math.ceil(act / CAMPAIGN_ACTS_PER_WORLD);
}

/** Returns the act number (1-based) that contains the given part. */
export function getActFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.act;
  const chapter = getChapterFromPart(part);
  return Math.ceil(chapter / CAMPAIGN_CHAPTERS_PER_ACT);
}

/** Returns the chapter number (1-based) that contains the given part. */
export function getChapterFromPart(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (meta) return meta.chapter;
  return Math.ceil(part / CAMPAIGN_PARTS_PER_CHAPTER);
}

/** Returns the full metadata object for a given part number, or null. */
export function getPartMeta(part) {
  const meta = CAMPAIGN_PART_META[part];
  if (!meta) return null;
  return { partNumber: part, ...meta };
}

/** Returns an array of part numbers belonging to the given chapter. */
export function getPartsForChapter(chapter) {
  return Object.keys(CAMPAIGN_PART_META)
    .map(Number)
    .filter(p => CAMPAIGN_PART_META[p].chapter === chapter)
    .sort((a, b) => a - b);
}

/** Returns an array of chapter numbers belonging to the given act. */
export function getChaptersForAct(act) {
  const chapters = new Set();
  Object.values(CAMPAIGN_PART_META).forEach(m => {
    if (m.act === act) chapters.add(m.chapter);
  });
  return Array.from(chapters).sort((a, b) => a - b);
}

/** Returns an array of act numbers belonging to the given world. */
export function getActsForWorld(world) {
  const acts = new Set();
  Object.values(CAMPAIGN_PART_META).forEach(m => {
    if (m.world === world) acts.add(m.act);
  });
  return Array.from(acts).sort((a, b) => a - b);
}

// ── Keep save state in sync with campaign structure on every save ──
export function patchSaveGameForStructure() {
  const _base = window.saveGame;
  if (_base && !_base.__structurePatched) {
    const patched = function(extra = {}) {
      const part = (typeof window.currentPart !== 'undefined') ? window.currentPart : 1;
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
}

export function initCampaign() {
  window.CAMPAIGN_PARTS_PER_CHAPTER = CAMPAIGN_PARTS_PER_CHAPTER;
  window.CAMPAIGN_CHAPTERS_PER_ACT  = CAMPAIGN_CHAPTERS_PER_ACT;
  window.CAMPAIGN_ACTS_PER_WORLD    = CAMPAIGN_ACTS_PER_WORLD;
  window.CAMPAIGN_PART_META         = CAMPAIGN_PART_META;
  window.getPartMeta                = getPartMeta;
  window.getWorldFromPart           = getWorldFromPart;
  window.getActFromPart             = getActFromPart;
  window.getChapterFromPart         = getChapterFromPart;
  window.getPartsForChapter         = getPartsForChapter;
  window.getChaptersForAct          = getChaptersForAct;
  window.getActsForWorld            = getActsForWorld;

  patchSaveGameForStructure();
}
