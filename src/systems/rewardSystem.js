let pendingRewardContinue = null;

function calculateFightRewards({ part, fightType, won }){
  const base = ECONOMY_TUNING.baseFightRewards[fightType] || { xp: 50, coins: 30 };
  const firstClear = isFightFirstClear(part, fightType);
  let xp = base.xp;
  let coinsGain = base.coins;
  if(!won){
    xp = Math.round(xp * ECONOMY_TUNING.rewardMultipliers.lossXp);
    coinsGain = Math.round(coinsGain * ECONOMY_TUNING.rewardMultipliers.lossCoins);
  } else if(!firstClear){
    xp = Math.round(xp * ECONOMY_TUNING.rewardMultipliers.replay);
    coinsGain = Math.round(coinsGain * ECONOMY_TUNING.rewardMultipliers.replay);
  }
  if(won && firstClear){
    xp += ECONOMY_TUNING.firstClearBonus.xp;
    coinsGain += ECONOMY_TUNING.firstClearBonus.coins;
  }
  return { xp, coins: coinsGain, firstClear };
}

function calculateChapterClearRewards(chapterId){
  return CHAPTER_CONFIG[chapterId]?.firstClearReward || { xp: 0, coins: 0 };
}

function showRewardScreen(summary, onContinue){
  const profile = getPlayerProfile();
  const xpState = getXpState(profile);
  const card = document.getElementById('reward-screen');
  if(!card) return onContinue && onContinue();
  document.getElementById('reward-title').innerText = summary.title || 'Battle Rewards';
  document.getElementById('reward-subtitle').innerText = summary.subtitle || 'Progress recorded.';
  document.getElementById('reward-xp-value').innerText = `+${summary.xp} XP`;
  document.getElementById('reward-coin-value').innerText = `+${summary.coins} Coins`;
  document.getElementById('reward-level-value').innerText = `Level ${profile.level}`;
  document.getElementById('reward-xp-fill').style.width = `${Math.max(3, (xpState.currentLevelXp / xpState.neededForNext) * 100)}%`;
  document.getElementById('reward-xp-progress').innerText = `${xpState.currentLevelXp} / ${xpState.neededForNext}`;
  const unlocks = [];
  if(summary.levelsGained > 0) unlocks.push(`Level Up ×${summary.levelsGained}`);
  if(summary.unlockedItems?.length) unlocks.push(...summary.unlockedItems.map((item)=>`Unlocked: ${item}`));
  if(summary.firstClear) unlocks.push('First-clear bonus');
  if(summary.chapterUnlockText) unlocks.push(summary.chapterUnlockText);
  document.getElementById('reward-unlocks').innerHTML = unlocks.length
    ? unlocks.map((item)=>`<span class="status-chip">${item}</span>`).join('')
    : '<span class="hint-text">No new unlocks this time.</span>';
  showScreen('reward-screen');
  pendingRewardContinue = onContinue;
}

function continueRewardFlow(){
  const next = pendingRewardContinue;
  pendingRewardContinue = null;
  if(next) next();
}

function grantFightRewards({ part, fightType, won }){
  const rewards = calculateFightRewards({ part, fightType, won });
  const xpResult = grantXp(rewards.xp, won ? 'fight-win' : 'fight-loss');
  addCoins(rewards.coins, won ? 'fight-win' : 'fight-loss');
  if(won) markFightCleared(part, fightType);
  return { ...rewards, ...xpResult };
}
