const WEAPON_DATA = {
  none: { id:'none', weaponClass:'unarmed', rangeBonus:0, speedModifier:1, damageBonus:0, preferredRange:82, pressureBias:'balanced', punishMove:'jab', comboMoves:['jab','kick'] },
  knuckle: { id:'knuckle', weaponClass:'unarmed', rangeBonus:6, speedModifier:0.96, damageBonus:4, preferredRange:86, pressureBias:'rush', punishMove:'jab', comboMoves:['jab','kick'] },
  dagger: { id:'dagger', weaponClass:'lightBlade', rangeBonus:12, speedModifier:0.84, damageBonus:6, preferredRange:94, pressureBias:'rush', punishMove:'jab', comboMoves:['jab','jab','kick'] },
  katana: { id:'katana', weaponClass:'blade', rangeBonus:20, speedModifier:0.92, damageBonus:8, preferredRange:118, pressureBias:'footsies', punishMove:'kick', comboMoves:['jab','kick','launcher'] },
  staff: { id:'staff', weaponClass:'staff', rangeBonus:26, speedModifier:0.98, damageBonus:5, preferredRange:132, pressureBias:'keepout', punishMove:'kick', comboMoves:['jab','kick'] },
  scythe: { id:'scythe', weaponClass:'reaper', rangeBonus:28, speedModifier:1.1, damageBonus:9, preferredRange:136, pressureBias:'whiffPunish', punishMove:'launcher', comboMoves:['kick','launcher'] },
  claws: { id:'claws', weaponClass:'claws', rangeBonus:10, speedModifier:0.8, damageBonus:5, preferredRange:88, pressureBias:'rush', punishMove:'jab', comboMoves:['jab','jab','kick'] },
  hammer: { id:'hammer', weaponClass:'heavy', rangeBonus:18, speedModifier:1.18, damageBonus:11, preferredRange:112, pressureBias:'threat', punishMove:'launcher', comboMoves:['kick','launcher'] },
};

function getWeaponProfile(weaponId){
  return WEAPON_DATA[weaponId] || WEAPON_DATA.none;
}

function getEnemyWeaponId(type){
  return (ENEMY_LOADOUTS[type] && ENEMY_LOADOUTS[type].weaponId) || 'none';
}

function getFighterWeaponId(fighter){
  if(!fighter)return 'none';
  return fighter.isP ? (weapon || 'none') : (fighter.weaponId || getEnemyWeaponId(fighter.type));
}
