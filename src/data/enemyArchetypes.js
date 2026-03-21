const AI_ARCHETYPES = {
  balanced: { id:'balanced', aggression:0.52, blockChance:0.42, punishChance:0.46, comboChance:0.42, heavyPreference:0.28, jumpPreference:0.08, retreatChance:0.16, baitChance:0.18, braveryAtLowHealth:0.52, unpredictability:0.18, errorRate:0.16, weaponComfortBias:'balanced' },
  rushdown: { id:'rushdown', aggression:0.72, blockChance:0.28, punishChance:0.44, comboChance:0.66, heavyPreference:0.18, jumpPreference:0.1, retreatChance:0.08, baitChance:0.1, braveryAtLowHealth:0.7, unpredictability:0.24, errorRate:0.14, weaponComfortBias:'rush' },
  counter: { id:'counter', aggression:0.38, blockChance:0.62, punishChance:0.7, comboChance:0.35, heavyPreference:0.32, jumpPreference:0.04, retreatChance:0.22, baitChance:0.28, braveryAtLowHealth:0.4, unpredictability:0.12, errorRate:0.12, weaponComfortBias:'footsies' },
  bruiser: { id:'bruiser', aggression:0.48, blockChance:0.34, punishChance:0.52, comboChance:0.24, heavyPreference:0.6, jumpPreference:0.02, retreatChance:0.1, baitChance:0.12, braveryAtLowHealth:0.76, unpredictability:0.08, errorRate:0.18, weaponComfortBias:'threat' },
  keepout: { id:'keepout', aggression:0.44, blockChance:0.46, punishChance:0.58, comboChance:0.28, heavyPreference:0.34, jumpPreference:0.03, retreatChance:0.26, baitChance:0.22, braveryAtLowHealth:0.36, unpredictability:0.14, errorRate:0.15, weaponComfortBias:'keepout' },
  boss: { id:'boss', aggression:0.66, blockChance:0.56, punishChance:0.72, comboChance:0.64, heavyPreference:0.42, jumpPreference:0.05, retreatChance:0.12, baitChance:0.22, braveryAtLowHealth:0.9, unpredictability:0.18, errorRate:0.06, weaponComfortBias:'adaptive' },
};

const AI_DIFFICULTY = {
  easy: { id:'easy', reactionDelay:24, decisionRate:22, confidence:0.42, errorRateBonus:0.18, spacingQuality:0.58, punishAccuracy:0.4, defenseQuality:0.45 },
  normal: { id:'normal', reactionDelay:16, decisionRate:16, confidence:0.6, errorRateBonus:0.1, spacingQuality:0.72, punishAccuracy:0.58, defenseQuality:0.58 },
  hard: { id:'hard', reactionDelay:11, decisionRate:12, confidence:0.78, errorRateBonus:0.05, spacingQuality:0.84, punishAccuracy:0.74, defenseQuality:0.74 },
  boss: { id:'boss', reactionDelay:8, decisionRate:10, confidence:0.9, errorRateBonus:0.02, spacingQuality:0.9, punishAccuracy:0.82, defenseQuality:0.8 },
};

const ENEMY_LOADOUTS = {
  1:{ enemyId:1, archetypeId:'balanced', weaponId:'none', difficulty:'easy', movesetId:'universal', animationSetId:'default' },
  2:{ enemyId:2, archetypeId:'rushdown', weaponId:'claws', difficulty:'normal', movesetId:'universal', animationSetId:'claws' },
  3:{ enemyId:3, archetypeId:'boss', weaponId:'katana', difficulty:'boss', movesetId:'universal', animationSetId:'katana' },
  4:{ enemyId:4, archetypeId:'rushdown', weaponId:'dagger', difficulty:'normal', movesetId:'universal', animationSetId:'dagger' },
  5:{ enemyId:5, archetypeId:'balanced', weaponId:'knuckle', difficulty:'normal', movesetId:'universal', animationSetId:'knuckle' },
  6:{ enemyId:6, archetypeId:'keepout', weaponId:'staff', difficulty:'hard', movesetId:'universal', animationSetId:'staff' },
  7:{ enemyId:7, archetypeId:'rushdown', weaponId:'dagger', difficulty:'normal', movesetId:'universal', animationSetId:'dagger' },
  8:{ enemyId:8, archetypeId:'boss', weaponId:'claws', difficulty:'boss', movesetId:'universal', animationSetId:'claws' },
  9:{ enemyId:9, archetypeId:'counter', weaponId:'katana', difficulty:'hard', movesetId:'universal', animationSetId:'katana' },
  10:{ enemyId:10, archetypeId:'bruiser', weaponId:'hammer', difficulty:'hard', movesetId:'universal', animationSetId:'hammer' },
  11:{ enemyId:11, archetypeId:'rushdown', weaponId:'claws', difficulty:'hard', movesetId:'universal', animationSetId:'claws' },
  12:{ enemyId:12, archetypeId:'counter', weaponId:'katana', difficulty:'hard', movesetId:'universal', animationSetId:'katana' },
  13:{ enemyId:13, archetypeId:'boss', weaponId:'staff', difficulty:'boss', movesetId:'universal', animationSetId:'staff' },
  14:{ enemyId:14, archetypeId:'boss', weaponId:'katana', difficulty:'boss', movesetId:'universal', animationSetId:'katana' },
  15:{ enemyId:15, archetypeId:'boss', weaponId:'scythe', difficulty:'boss', movesetId:'universal', animationSetId:'scythe' },
  16:{ enemyId:16, archetypeId:'rushdown', weaponId:'dagger', difficulty:'hard', movesetId:'universal', animationSetId:'dagger' },
  17:{ enemyId:17, archetypeId:'balanced', weaponId:'staff', difficulty:'hard', movesetId:'universal', animationSetId:'staff' },
  18:{ enemyId:18, archetypeId:'boss', weaponId:'katana', difficulty:'boss', movesetId:'universal', animationSetId:'katana' },
  19:{ enemyId:19, archetypeId:'boss', weaponId:'scythe', difficulty:'boss', movesetId:'universal', animationSetId:'scythe' },
  20:{ enemyId:20, archetypeId:'boss', weaponId:'hammer', difficulty:'boss', movesetId:'universal', animationSetId:'hammer' },
};

function getEnemyLoadout(type){
  return ENEMY_LOADOUTS[type] || ENEMY_LOADOUTS[1];
}

function getAIArchetype(archetypeId){
  return AI_ARCHETYPES[archetypeId] || AI_ARCHETYPES.balanced;
}

function getAIDifficulty(id){
  return AI_DIFFICULTY[id] || AI_DIFFICULTY.normal;
}
