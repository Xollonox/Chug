function createDefaultProfile(){
  return {
    level: 1,
    xp: 0,
    currencies: {
      coins: ECONOMY_TUNING.currencies.startingCoins,
      premium: ECONOMY_TUNING.currencies.startingPremium,
    },
    ownedItems: {
      weapons: ['none'],
      armor: [],
      upgrades: [],
    },
    equipped: {
      weapon: 'none',
      armor: 'none',
    },
    itemUpgrades: {},
    chapterProgress: {
      unlocked: [1],
      completed: [],
      firstClearClaimed: [],
    },
    clearedFights: {},
    clearedParts: [],
    progressionFlags: {},
    rewardHistory: [],
  };
}

function migrateLegacyProfile(save = {}){
  const profile = createDefaultProfile();
  profile.currencies.coins = save.coins ?? profile.currencies.coins;
  profile.equipped.weapon = save.weapon || 'none';
  profile.equipped.armor = save.armor || 'none';
  if(profile.equipped.weapon !== 'none') profile.ownedItems.weapons.push(profile.equipped.weapon);
  if(profile.equipped.armor !== 'none') profile.ownedItems.armor.push(profile.equipped.armor);
  if(save.rageMode2) profile.ownedItems.upgrades.push('rage2');
  if((save.strengthUpg || 0) >= 1) profile.ownedItems.upgrades.push('strength');
  if((save.strengthUpg || 0) >= 2) profile.ownedItems.upgrades.push('strength2');
  if((save.speedUpg || 0) >= 1) profile.ownedItems.upgrades.push('speed');
  if((save.speedUpg || 0) >= 2) profile.ownedItems.upgrades.push('speed2');
  if((save.enduranceUpg || 0) >= 1) profile.ownedItems.upgrades.push('endurance');
  if((save.enduranceUpg || 0) >= 2) profile.ownedItems.upgrades.push('endurance2');
  const legacyChapterUnlocked = save.chapterUnlocked || 1;
  profile.chapterProgress.unlocked = Object.values(CHAPTER_CONFIG)
    .filter((chapter)=>legacyChapterUnlocked >= chapter.unlockParts[0])
    .map((chapter)=>chapter.id);
  return profile;
}

function normalizeProfile(profile, save = {}){
  const base = createDefaultProfile();
  const next = { ...base, ...(profile || {}) };
  next.currencies = { ...base.currencies, ...(profile?.currencies || {}) };
  next.ownedItems = {
    weapons: Array.from(new Set([...(profile?.ownedItems?.weapons || ['none']), 'none'])),
    armor: Array.from(new Set(profile?.ownedItems?.armor || [])),
    upgrades: Array.from(new Set(profile?.ownedItems?.upgrades || [])),
  };
  next.equipped = { ...base.equipped, ...(profile?.equipped || {}) };
  if(next.equipped.weapon && !next.ownedItems.weapons.includes(next.equipped.weapon)) next.ownedItems.weapons.push(next.equipped.weapon);
  if(next.equipped.armor && next.equipped.armor !== 'none' && !next.ownedItems.armor.includes(next.equipped.armor)) next.ownedItems.armor.push(next.equipped.armor);
  next.itemUpgrades = { ...(profile?.itemUpgrades || {}) };
  next.chapterProgress = {
    unlocked: Array.from(new Set(profile?.chapterProgress?.unlocked || [1])).sort((a,b)=>a-b),
    completed: Array.from(new Set(profile?.chapterProgress?.completed || [])),
    firstClearClaimed: Array.from(new Set(profile?.chapterProgress?.firstClearClaimed || [])),
  };
  next.clearedFights = { ...(profile?.clearedFights || {}) };
  next.clearedParts = Array.from(new Set(profile?.clearedParts || []));
  next.progressionFlags = { ...(profile?.progressionFlags || {}) };
  next.rewardHistory = Array.isArray(profile?.rewardHistory) ? profile.rewardHistory.slice(-30) : [];
  if(!profile) return migrateLegacyProfile(save);
  return next;
}

function getPlayerProfile(){
  window.__saveData = window.__saveData || {};
  if(!window.__saveData.profile) window.__saveData.profile = migrateLegacyProfile(window.__saveData);
  window.__saveData.profile = normalizeProfile(window.__saveData.profile, window.__saveData);
  return window.__saveData.profile;
}

function syncLegacyProgressionGlobals(profile = getPlayerProfile()){
  coins = profile.currencies.coins;
  weapon = profile.equipped.weapon || 'none';
  armor = profile.equipped.armor || 'none';
  rageMode2 = profile.ownedItems.upgrades.includes('rage2');
  strengthUpg = profile.ownedItems.upgrades.includes('strength2') ? 2 : profile.ownedItems.upgrades.includes('strength') ? 1 : 0;
  speedUpg = profile.ownedItems.upgrades.includes('speed2') ? 2 : profile.ownedItems.upgrades.includes('speed') ? 1 : 0;
  enduranceUpg = profile.ownedItems.upgrades.includes('endurance2') ? 2 : profile.ownedItems.upgrades.includes('endurance') ? 1 : 0;
}

function getXpState(profile = getPlayerProfile()){
  const level = profile.level;
  const levelFloor = getXpRequiredForLevel(level);
  const levelCeil = getXpThresholdForNextLevel(level);
  return {
    level,
    totalXp: profile.xp,
    currentLevelXp: Math.max(0, profile.xp - levelFloor),
    neededForNext: Math.max(1, levelCeil - levelFloor),
    nextLevelTotalXp: levelCeil,
  };
}

function getStoreLevelUnlocks(previousLevel, nextLevel){
  const unlocked = [];
  for(const item of getEquipmentEntries('weapons').concat(getEquipmentEntries('armor')).concat(getEquipmentEntries('upgrades'))){
    if(!item || item.id === 'none') continue;
    const requirement = item.levelRequirement || 1;
    if(previousLevel < requirement && nextLevel >= requirement) unlocked.push(item.name);
  }
  return unlocked;
}

function addRewardHistory(entry){
  const profile = getPlayerProfile();
  profile.rewardHistory.push({ at: Date.now(), ...entry });
  profile.rewardHistory = profile.rewardHistory.slice(-25);
}

function grantXp(amount, reason = 'reward'){
  const profile = getPlayerProfile();
  const previousLevel = profile.level;
  profile.xp += Math.max(0, Math.round(amount));
  while(profile.level < LEVEL_CAP && profile.xp >= getXpThresholdForNextLevel(profile.level)){
    profile.level += 1;
  }
  const levelsGained = profile.level - previousLevel;
  const unlockedItems = levelsGained > 0 ? getStoreLevelUnlocks(previousLevel, profile.level) : [];
  addRewardHistory({ type: 'xp', amount, reason, level: profile.level });
  syncLegacyProgressionGlobals(profile);
  return { levelsGained, newLevel: profile.level, unlockedItems };
}

function addCoins(amount, reason = 'reward'){
  const profile = getPlayerProfile();
  profile.currencies.coins = Math.max(0, profile.currencies.coins + Math.round(amount));
  addRewardHistory({ type: 'coins', amount, reason, coins: profile.currencies.coins });
  syncLegacyProgressionGlobals(profile);
  return profile.currencies.coins;
}

function addPremium(amount, reason = 'reward'){
  const profile = getPlayerProfile();
  profile.currencies.premium = Math.max(0, profile.currencies.premium + Math.round(amount));
  addRewardHistory({ type: 'premium', amount, reason, premium: profile.currencies.premium });
  syncLegacyProgressionGlobals(profile);
  return profile.currencies.premium;
}

function isItemOwned(itemId, category){
  const profile = getPlayerProfile();
  if(category === 'weapons') return itemId === 'none' || profile.ownedItems.weapons.includes(itemId);
  if(category === 'armor') return profile.ownedItems.armor.includes(itemId);
  if(category === 'upgrades') return profile.ownedItems.upgrades.includes(itemId);
  return false;
}

function getItemUpgradeLevel(itemId){
  const profile = getPlayerProfile();
  return profile.itemUpgrades[itemId] || 0;
}

function getItemMaxUpgrade(item){
  if(item.id === 'none' || item.category === 'upgrades') return null;
  const group = item.category === 'armor' ? ECONOMY_TUNING.upgradeCosts.armor : ECONOMY_TUNING.upgradeCosts.weapons;
  return item.maxUpgrade ?? group.maxLevel;
}

function getItemUpgradeCost(item){
  const group = item.category === 'armor' ? ECONOMY_TUNING.upgradeCosts.armor : ECONOMY_TUNING.upgradeCosts.weapons;
  const level = getItemUpgradeLevel(item.id);
  if(level >= getItemMaxUpgrade(item)) return null;
  return Math.round(group.base * Math.pow(group.growth, level) * (item.price ? Math.max(1, item.price / 100) : 1));
}

function getItemAvailability(item){
  const profile = getPlayerProfile();
  const owned = isItemOwned(item.id, item.category);
  const equipped = (item.category === 'weapons' && profile.equipped.weapon === item.id) || (item.category === 'armor' && profile.equipped.armor === item.id) || (item.category === 'upgrades' && owned);
  const levelMet = profile.level >= (item.levelRequirement || 1);
  const chapterMet = !item.unlockChapter || profile.chapterProgress.unlocked.includes(item.unlockChapter) || profile.chapterProgress.completed.includes(item.unlockChapter);
  const canPurchase = !owned && levelMet && chapterMet;
  let lockedReason = '';
  if(!levelMet) lockedReason = `Reach level ${item.levelRequirement}`;
  else if(!chapterMet) lockedReason = `Clear ${CHAPTER_CONFIG[item.unlockChapter]?.label || 'the required chapter'}`;
  return { owned, equipped, levelMet, chapterMet, canPurchase, lockedReason, price: item.price || 0, upgradeLevel: getItemUpgradeLevel(item.id), upgradeCost: getItemUpgradeCost(item) };
}

function purchaseItem(item){
  const profile = getPlayerProfile();
  const availability = getItemAvailability(item);
  if(availability.owned) return { ok: true, code: 'owned' };
  if(!availability.canPurchase) return { ok: false, code: 'locked', message: availability.lockedReason };
  if(profile.currencies.coins < (item.price || 0)) return { ok: false, code: 'coins', message: 'Not enough coins.' };
  addCoins(-(item.price || 0), 'purchase');
  profile.ownedItems[item.category].push(item.id);
  profile.ownedItems[item.category] = Array.from(new Set(profile.ownedItems[item.category]));
  if(item.category === 'weapons') profile.equipped.weapon = item.id;
  if(item.category === 'armor') profile.equipped.armor = item.id;
  syncLegacyProgressionGlobals(profile);
  return { ok: true, code: 'purchased' };
}

function equipItem(category, itemId){
  const profile = getPlayerProfile();
  if(!isItemOwned(itemId, category)) return { ok:false, message:'Item not owned.' };
  if(category === 'weapons') profile.equipped.weapon = itemId;
  if(category === 'armor') profile.equipped.armor = itemId;
  syncLegacyProgressionGlobals(profile);
  return { ok:true };
}

function upgradeOwnedItem(item){
  const profile = getPlayerProfile();
  if(!isItemOwned(item.id, item.category)) return { ok:false, message:'Own this item first.' };
  const cost = getItemUpgradeCost(item);
  if(cost == null) return { ok:false, message:'Item is fully upgraded.' };
  if(profile.currencies.coins < cost) return { ok:false, message:'Not enough coins.' };
  addCoins(-cost, 'upgrade');
  profile.itemUpgrades[item.id] = getItemUpgradeLevel(item.id) + 1;
  syncLegacyProgressionGlobals(profile);
  return { ok:true, newLevel: profile.itemUpgrades[item.id], cost };
}

function unlockChapterById(chapterId){
  const profile = getPlayerProfile();
  if(!profile.chapterProgress.unlocked.includes(chapterId)) profile.chapterProgress.unlocked.push(chapterId);
  profile.chapterProgress.unlocked.sort((a,b)=>a-b);
}

function markChapterCompleted(chapterId){
  const profile = getPlayerProfile();
  if(!profile.chapterProgress.completed.includes(chapterId)) profile.chapterProgress.completed.push(chapterId);
  unlockChapterById(chapterId + 1);
}

function markPartCleared(part){
  const profile = getPlayerProfile();
  if(!profile.clearedParts.includes(part)) profile.clearedParts.push(part);
}

function isFightFirstClear(part, fightType){
  return !getPlayerProfile().clearedFights[`${part}:${fightType}`];
}

function markFightCleared(part, fightType){
  getPlayerProfile().clearedFights[`${part}:${fightType}`] = true;
}

function getCombatWeaponProfile(fighter, weaponId = getFighterWeaponId(fighter)){
  const base = getWeaponProfile(weaponId);
  if(!fighter?.isP) return base;
  const level = getItemUpgradeLevel(weaponId);
  return {
    ...base,
    damageBonus: base.damageBonus + (level * ECONOMY_TUNING.statGrowth.weaponDamagePerUpgrade),
    rangeBonus: base.rangeBonus + (level * ECONOMY_TUNING.statGrowth.weaponRangePerUpgrade),
    speedModifier: Math.max(0.72, base.speedModifier - (level * 0.01)),
  };
}

function getPlayerCombatStats(){
  const profile = getPlayerProfile();
  const weaponProfile = getCombatWeaponProfile({ isP:true }, profile.equipped.weapon || 'none');
  const armorItem = getEquipmentEntries('armor').find((entry)=>entry.id === profile.equipped.armor);
  const armorUpgrade = armorItem ? getItemUpgradeLevel(armorItem.id) : 0;
  const weaponMeta = getEquipmentEntries('weapons').find((entry)=>entry.id === profile.equipped.weapon) || getWeaponProfile('none');
  const stats = {
    maxHp: 150 + ((profile.level - 1) * ECONOMY_TUNING.statGrowth.levelHp),
    speed: 7.5 + ((profile.level - 1) * ECONOMY_TUNING.statGrowth.levelSpeed),
    damage: 10 + Math.round((profile.level - 1) * ECONOMY_TUNING.statGrowth.levelDamage),
    defense: 0,
    absorption: 0,
    rageTier: profile.ownedItems.upgrades.includes('rage2') ? 2 : 1,
    enduranceRegen: profile.ownedItems.upgrades.includes('endurance'),
  };
  if(weaponMeta.playerStatModifiers){
    stats.maxHp += weaponMeta.playerStatModifiers.maxHp || 0;
    stats.speed += weaponMeta.playerStatModifiers.speed || 0;
    stats.damage += weaponMeta.playerStatModifiers.damage || 0;
  }
  stats.damage += getItemUpgradeLevel(weaponMeta.id) * ECONOMY_TUNING.statGrowth.weaponDamagePerUpgrade;
  if(armorItem){
    stats.maxHp += (armorItem.playerStatModifiers?.maxHp || 0) + (armorUpgrade * ECONOMY_TUNING.statGrowth.armorHpPerUpgrade);
    stats.speed += armorItem.playerStatModifiers?.speed || 0;
    stats.defense += (armorItem.playerStatModifiers?.defense || 0) + (armorUpgrade * ECONOMY_TUNING.statGrowth.armorDefensePerUpgrade);
    stats.absorption += armorItem.playerStatModifiers?.absorption || 0;
  }
  if(profile.ownedItems.upgrades.includes('strength')) stats.damage += 5;
  if(profile.ownedItems.upgrades.includes('strength2')) stats.damage += 10;
  if(profile.ownedItems.upgrades.includes('speed')) stats.speed += 2;
  if(profile.ownedItems.upgrades.includes('speed2')) stats.speed += 2;
  if(profile.ownedItems.upgrades.includes('endurance')) stats.maxHp += 30;
  if(profile.ownedItems.upgrades.includes('endurance2')) stats.maxHp += 40;
  return { ...stats, weaponProfile };
}

function getProfileSummary(){
  const profile = getPlayerProfile();
  const xp = getXpState(profile);
  return {
    level: profile.level,
    coins: profile.currencies.coins,
    premium: profile.currencies.premium,
    xpCurrent: xp.currentLevelXp,
    xpNeeded: xp.neededForNext,
    equippedWeapon: profile.equipped.weapon,
    equippedArmor: profile.equipped.armor,
  };
}
