const LEVEL_CAP = 20;
const LEVEL_CURVE = Array.from({ length: LEVEL_CAP + 1 }, (_, level) => {
  if(level === 0) return 0;
  if(level === 1) return 0;
  return Math.round(90 + ((level - 2) * 42) + Math.pow(level - 1, 1.7) * 18);
});

function getXpRequiredForLevel(level){
  if(level <= 1) return 0;
  if(level >= LEVEL_CURVE.length){
    const overflow = level - LEVEL_CURVE.length + 1;
    return LEVEL_CURVE[LEVEL_CURVE.length - 1] + overflow * 240;
  }
  return LEVEL_CURVE[level];
}

function getXpThresholdForNextLevel(level){
  return getXpRequiredForLevel(level + 1);
}
