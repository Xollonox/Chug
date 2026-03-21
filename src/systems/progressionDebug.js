window.progressionDebug = {
  addXp(amount = 100){ const result = grantXp(amount, 'debug'); saveGame(); return result; },
  addCoins(amount = 250){ addCoins(amount, 'debug'); saveGame(); return getPlayerProfile().currencies.coins; },
  setLevel(level = 1){ const profile = getPlayerProfile(); profile.level = Math.max(1, Math.min(LEVEL_CAP, level)); profile.xp = getXpRequiredForLevel(profile.level); syncLegacyProgressionGlobals(profile); saveGame(); return profile.level; },
  unlockItem(category, itemId){ const profile = getPlayerProfile(); if(!profile.ownedItems[category].includes(itemId)) profile.ownedItems[category].push(itemId); syncLegacyProgressionGlobals(profile); saveGame(); return profile.ownedItems[category]; },
  unlockChapter(chapterId){ unlockChapterById(chapterId); saveGame(); return getPlayerProfile().chapterProgress.unlocked; },
  resetProfile(){ window.__saveData.profile = createDefaultProfile(); syncLegacyProgressionGlobals(window.__saveData.profile); saveGame(); return getPlayerProfile(); },
  inspect(){ return JSON.parse(JSON.stringify(getPlayerProfile())); }
};
