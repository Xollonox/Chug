(function(){
  const CATEGORIES = [
    { id:'weapons', label:'Weapons' },
    { id:'armor', label:'Armor' },
    { id:'upgrades', label:'Upgrades' },
    { id:'helms', label:'Helms' },
    { id:'ranged', label:'Ranged' },
    { id:'magic', label:'Magic' }
  ];

  function render(){
    const state = uiStateStore.getState();
    const tabs = document.getElementById('armory-category-tabs');
    const overview = document.getElementById('armory-overview');
    const list = document.getElementById('armory-card-list');
    const detail = document.getElementById('armory-detail-panel');
    const title = document.getElementById('armory-section-title');
    if(!tabs || !overview || !list || !detail || !title) return;

    tabs.innerHTML = CATEGORIES.map((cat)=>`<button type="button" class="${state.selectedCategory===cat.id?'is-active':''}" data-armory-category="${cat.id}">${cat.label}</button>`).join('');
    tabs.querySelectorAll('[data-armory-category]').forEach((button)=>button.addEventListener('click', ()=>{
      const category = button.dataset.armoryCategory;
      const entries = getEquipmentEntries(category);
      uiStateStore.set({ selectedCategory: category, selectedItemId: entries[0]?.id || '' });
      render();
    }));

    const profile = getPlayerProfile();
    const entries = getEquipmentEntries(state.selectedCategory);
    title.innerText = CATEGORIES.find((cat)=>cat.id===state.selectedCategory)?.label || 'Inventory';
    overview.innerHTML = `<div class="detail-stat"><span>Level</span><strong>${profile.level}</strong></div><div class="detail-stat"><span>Coins</span><strong>${profile.currencies.coins}</strong></div><div class="detail-stat"><span>Weapon</span><strong>${getWeaponProfile(profile.equipped.weapon).name}</strong></div>`;

    if(!entries.length){
      list.innerHTML = `<div class="armory-empty">${title.innerText} hooks are prepared for a future update.</div>`;
      detail.innerHTML = `<h4>Future-ready slot</h4><p>This category has been scaffolded so armor, helms, ranged weapons, and magic can land without UI rewrites.</p>`;
      return;
    }

    const selectedId = entries.some((entry)=>entry.id===state.selectedItemId) ? state.selectedItemId : entries[0].id;
    if(selectedId !== state.selectedItemId) uiStateStore.set({ selectedItemId: selectedId });
    const selectedItem = entries.find((entry)=>entry.id===selectedId) || entries[0];

    list.innerHTML = entries.map((item)=>{
      const availability = getItemAvailability(item);
      return `<article class="armory-card ${selectedId===item.id?'is-selected':''} ${availability.equipped?'is-equipped':''} ${!availability.levelMet || !availability.chapterMet ? 'is-locked' : ''}" data-armory-item="${item.id}">
        <div class="armory-card-header"><div class="armory-icon">${item.icon || '✦'}</div><div><div class="armory-name">${item.name}</div><div class="armory-type">${item.typeLabel || 'Utility'} · ${item.rarity || 'Hook'}</div></div></div>
        <div class="armory-stat-grid">
          ${Object.entries(item.stats || {}).slice(0,4).map(([key,val])=>`<div class="armory-stat"><span>${key}</span><strong>${val}</strong></div>`).join('') || '<div class="armory-stat"><span>Status</span><strong>Future Hook</strong></div>'}
        </div>
        <div class="chap-meta"><span>${item.tier || 'Tier Hook'}</span><span>${availability.equipped ? 'Equipped' : availability.owned ? 'Owned' : availability.canPurchase ? `🪙 ${item.price || 0}` : availability.lockedReason || 'Locked'}</span></div>
      </article>`;
    }).join('');
    list.querySelectorAll('[data-armory-item]').forEach((card)=>card.addEventListener('click', ()=>{
      uiStateStore.set({ selectedItemId: card.dataset.armoryItem });
      render();
    }));

    const availability = getItemAvailability(selectedItem);
    const compare = selectedItem.category === 'weapons'
      ? getCombatWeaponProfile({ isP:true }, profile.equipped.weapon)
      : selectedItem.category === 'armor'
        ? getEquipmentEntries('armor').find((entry)=>entry.id===profile.equipped.armor)
        : null;
    const upgradeCost = availability.upgradeCost;
    const upgradeable = selectedItem.category !== 'upgrades' && availability.owned && upgradeCost != null;
    detail.innerHTML = `<div class="panel-kicker">${selectedItem.category}</div><h4>${selectedItem.name}</h4><p>${selectedItem.description || 'Reserved for future progression data.'}</p>
      <div class="detail-stats"><div class="detail-stat"><span>Requirement</span><strong>Lvl ${selectedItem.levelRequirement || 1}</strong></div><div class="detail-stat"><span>Unlock Source</span><strong>${CHAPTER_CONFIG[selectedItem.unlockChapter]?.label || 'Base'}</strong></div><div class="detail-stat"><span>Upgrade</span><strong>${availability.upgradeLevel}/${selectedItem.maxUpgrade || (selectedItem.category==='armor'?ECONOMY_TUNING.upgradeCosts.armor.maxLevel:ECONOMY_TUNING.upgradeCosts.weapons.maxLevel)}</strong></div><div class="detail-stat"><span>Compare</span><strong>${compare?.name || compare?.typeLabel || 'Current loadout'}</strong></div></div>
      <div class="armory-stat-grid">${Object.entries(selectedItem.stats || { power:selectedItem.tier || 'Future' }).map(([key,val])=>`<div class="armory-stat"><span>${key}</span><strong>${val}</strong></div>`).join('')}</div>
      <div class="armory-actions"><button type="button" class="equip-btn" ${(!availability.owned && !availability.canPurchase) ? 'disabled' : ''}>${availability.owned ? (availability.equipped ? 'Equipped' : 'Equip') : `Buy · ${selectedItem.price || 0}`}</button>${selectedItem.category !== 'upgrades' ? `<button type="button" class="upgrade-btn" ${!upgradeable ? 'disabled' : ''}>${upgradeCost == null ? 'Maxed' : `Upgrade · ${upgradeCost}`}</button>` : '<button type="button" disabled>Passive Unlock</button>'}</div>
      <div class="hint-text">${availability.lockedReason || (availability.owned ? 'Owned gear persists across saves.' : 'Buy to add it to your permanent inventory.')}</div>`;

    detail.querySelector('.equip-btn')?.addEventListener('click', ()=>{
      let result;
      if(availability.owned){ result = equipItem(selectedItem.category, selectedItem.id); if(result.ok) shopToast(`${selectedItem.name} equipped.`); }
      else { result = purchaseItem(selectedItem); if(result.ok) shopToast(`${selectedItem.name} purchased.`); }
      if(result?.message && !result.ok) shopToast(result.message, '#ff003c');
      saveGame();
      render();
    });
    detail.querySelector('.upgrade-btn')?.addEventListener('click', ()=>{
      const result = upgradeOwnedItem(selectedItem);
      if(result.ok) shopToast(`${selectedItem.name} upgraded to +${result.newLevel}.`, '#00d7ff');
      else shopToast(result.message, '#ff003c');
      saveGame();
      render();
    });
  }
  window.armoryController = { render };
})();
