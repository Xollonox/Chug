const WEAPON_DATA = {
  none: {
    id: 'none', name: 'Bare Hands', icon: '✦', category: 'weapons', typeLabel: 'Unarmed',
    rarity: 'Common', price: 0, description: 'The baseline stance. Fast, direct, and dependable for learning the flow of combat.',
    rangeBonus: 0, speedModifier: 1, damageBonus: 0, preferredRange: 82, pressureBias: 'balanced', punishMove: 'jab', comboMoves: ['jab', 'kick'],
    stats: { damage: 4, speed: 5, range: 3 }, movesetStyle: 'Street pressure', tier: 'Starter', usableBy: 'Player / Enemy', animationHook: 'unarmed'
  },
  knuckle: {
    id: 'knuckle', name: 'Iron Knuckles', icon: '🥊', category: 'weapons', typeLabel: 'Impact',
    rarity: 'Common', price: 100, description: 'Fast pressure weapon with brutal close-range rhythm and premium hit-stop feel.',
    rangeBonus: 6, speedModifier: 0.96, damageBonus: 4, preferredRange: 86, pressureBias: 'rush', punishMove: 'jab', comboMoves: ['jab', 'kick'],
    stats: { damage: 6, speed: 7, range: 3 }, movesetStyle: 'Rushdown', tier: 'Tier I', usableBy: 'Player', animationHook: 'knuckle'
  },
  dagger: {
    id: 'dagger', name: 'Void Dagger', icon: '🗡️', category: 'weapons', typeLabel: 'Light Blade',
    rarity: 'Rare', price: 250, description: 'Short blade tuned for oppressive speed, rapid confirms, and surgical punishes.',
    rangeBonus: 12, speedModifier: 0.84, damageBonus: 6, preferredRange: 94, pressureBias: 'rush', punishMove: 'jab', comboMoves: ['jab', 'jab', 'kick'],
    stats: { damage: 7, speed: 8, range: 4 }, movesetStyle: 'Assassin flow', tier: 'Tier II', usableBy: 'Player / Enemy', animationHook: 'dagger'
  },
  katana: {
    id: 'katana', name: 'Shadow Katana', icon: '⚔️', category: 'weapons', typeLabel: 'Blade',
    rarity: 'Epic', price: 420, description: 'Elegant reach, confident footsies, and controlled slashes with cinematic silhouette.',
    rangeBonus: 20, speedModifier: 0.92, damageBonus: 8, preferredRange: 118, pressureBias: 'footsies', punishMove: 'kick', comboMoves: ['jab', 'kick', 'launcher'],
    stats: { damage: 8, speed: 6, range: 7 }, movesetStyle: 'Fencing control', tier: 'Tier III', usableBy: 'Player / Enemy', animationHook: 'katana'
  },
  staff: {
    id: 'staff', name: 'Monk Staff', icon: '🪄', category: 'weapons', typeLabel: 'Staff',
    rarity: 'Rare', price: 360, description: 'Wide sweeps and keep-out spacing for tacticians who want battlefield control.',
    rangeBonus: 26, speedModifier: 0.98, damageBonus: 5, preferredRange: 132, pressureBias: 'keepout', punishMove: 'kick', comboMoves: ['jab', 'kick'],
    stats: { damage: 6, speed: 5, range: 8 }, movesetStyle: 'Keep-out temple form', tier: 'Tier II', usableBy: 'Player / Enemy', animationHook: 'staff'
  },
  scythe: {
    id: 'scythe', name: 'Shadow Scythe', icon: '☽', category: 'weapons', typeLabel: 'Reaper',
    rarity: 'Legendary', price: 650, description: 'Long arcs, sinister spacing, and premium high-threat presentation for boss-like presence.',
    rangeBonus: 28, speedModifier: 1.1, damageBonus: 9, preferredRange: 136, pressureBias: 'whiffPunish', punishMove: 'launcher', comboMoves: ['kick', 'launcher'],
    stats: { damage: 9, speed: 4, range: 9 }, movesetStyle: 'Void execution', tier: 'Tier IV', usableBy: 'Player / Enemy', animationHook: 'scythe'
  },
  claws: {
    id: 'claws', name: 'Void Claws', icon: '🔱', category: 'weapons', typeLabel: 'Claws',
    rarity: 'Epic', price: 380, description: 'Relentless flurries built for chain pressure and stylish slash trails.',
    rangeBonus: 10, speedModifier: 0.8, damageBonus: 5, preferredRange: 88, pressureBias: 'rush', punishMove: 'jab', comboMoves: ['jab', 'jab', 'kick'],
    stats: { damage: 6, speed: 9, range: 4 }, movesetStyle: 'Predator rush', tier: 'Tier III', usableBy: 'Player / Enemy', animationHook: 'claws'
  },
  hammer: {
    id: 'hammer', name: 'Doom Hammer', icon: '🔨', category: 'weapons', typeLabel: 'Heavy',
    rarity: 'Epic', price: 480, description: 'Crushing threat designed for big whiff punishes, knockdowns, and impact drama.',
    rangeBonus: 18, speedModifier: 1.18, damageBonus: 11, preferredRange: 112, pressureBias: 'threat', punishMove: 'launcher', comboMoves: ['kick', 'launcher'],
    stats: { damage: 10, speed: 3, range: 6 }, movesetStyle: 'Breaker style', tier: 'Tier III', usableBy: 'Player / Enemy', animationHook: 'hammer'
  },
};

const EQUIPMENT_CATALOG = {
  weapons: ['none', 'knuckle', 'dagger', 'katana', 'staff', 'scythe', 'claws', 'hammer'],
  armor: [
    { id: 'lightarmor', name: 'Shadow Gi', icon: '🥋', category: 'armor', typeLabel: 'Light Armor', rarity: 'Common', price: 180, description: 'Light layered cloth that boosts survivability without breaking combat flow.', stats: { defense: 3, vitality: 25, mobility: 8 }, tier: 'Tier I', usableBy: 'Player', equippedFlag: () => armor === 'lightarmor' },
    { id: 'heavyarmor', name: 'Titan Armor', icon: '🛡️', category: 'armor', typeLabel: 'Heavy Armor', rarity: 'Rare', price: 420, description: 'A plated silhouette for players who want durability and intimidation.', stats: { defense: 6, vitality: 50, mobility: 4 }, tier: 'Tier III', usableBy: 'Player', equippedFlag: () => armor === 'heavyarmor' },
    { id: 'voidarmor', name: 'Void Shroud', icon: '🌑', category: 'armor', typeLabel: 'Void Armor', rarity: 'Legendary', price: 600, description: 'Late-tier survival layer with powerful future hooks for status mitigation.', stats: { defense: 9, vitality: 70, mobility: 5 }, tier: 'Tier IV', usableBy: 'Player', equippedFlag: () => armor === 'voidarmor' },
  ],
  upgrades: [
    { id: 'rage2', name: 'Rage Mode II', icon: '🔥', category: 'upgrades', typeLabel: 'Ultimate', rarity: 'Epic', price: 700, description: 'Expands rage potential and creates a clearer escalation curve for late-round turnarounds.', tier: 'Tier IV' },
    { id: 'strength', name: 'Strength I', icon: '💪', category: 'upgrades', typeLabel: 'Power', rarity: 'Common', price: 400, description: 'Raises baseline damage output for every exchange.', tier: 'Tier II' },
    { id: 'strength2', name: 'Strength II', icon: '⚡', category: 'upgrades', typeLabel: 'Power', rarity: 'Rare', price: 800, description: 'Second-stage strength upgrade for heavier confirms.', tier: 'Tier III' },
    { id: 'speed', name: 'Speed I', icon: '💨', category: 'upgrades', typeLabel: 'Tempo', rarity: 'Common', price: 350, description: 'Improves movement and attack rhythm for cleaner pressure.', tier: 'Tier II' },
    { id: 'speed2', name: 'Speed II', icon: '🌪️', category: 'upgrades', typeLabel: 'Tempo', rarity: 'Rare', price: 700, description: 'Late-stage speed bonus to sharpen combo routes.', tier: 'Tier III' },
    { id: 'endurance', name: 'Endurance I', icon: '❤️', category: 'upgrades', typeLabel: 'Survival', rarity: 'Common', price: 450, description: 'Expands max HP and adds a regen hook on victory.', tier: 'Tier II' },
    { id: 'endurance2', name: 'Endurance II', icon: '💎', category: 'upgrades', typeLabel: 'Survival', rarity: 'Rare', price: 900, description: 'Higher survivability with future-ready damage-reduction support.', tier: 'Tier IV' },
  ],
  helms: [],
  ranged: [],
  magic: []
};

function getWeaponProfile(weaponId){
  return WEAPON_DATA[weaponId] || WEAPON_DATA.none;
}

function getWeaponCatalogEntries(){
  return EQUIPMENT_CATALOG.weapons.map((id)=>WEAPON_DATA[id]);
}

function getEquipmentEntries(category){
  if(category === 'weapons') return getWeaponCatalogEntries();
  return EQUIPMENT_CATALOG[category] || [];
}

function getEnemyWeaponId(type){
  return (ENEMY_LOADOUTS[type] && ENEMY_LOADOUTS[type].weaponId) || 'none';
}

function getFighterWeaponId(fighter){
  if(!fighter)return 'none';
  return fighter.isP ? (weapon || 'none') : (fighter.weaponId || getEnemyWeaponId(fighter.type));
}
