(function(){
  const CATEGORIES = [
    { id:'weapons', label:'Weapons' },
    { id:'armor', label:'Armor' },
    { id:'upgrades', label:'Upgrades' },
    { id:'helms', label:'Helms' },
    { id:'ranged', label:'Ranged' },
    { id:'magic', label:'Magic' }
  ];

  function getOwned(item){
    if(item.category === 'weapons') return item.id === 'none' || weapon === item.id;
    if(item.category === 'armor') return armor === item.id;
    if(item.category === 'upgrades') return (
      (item.id === 'rage2' && rageMode2) ||
      (item.id === 'strength' && strengthUpg >= 1) ||
      (item.id === 'strength2' && strengthUpg >= 2) ||
      (item.id === 'speed' && speedUpg >= 1) ||
      (item.id === 'speed2' && speedUpg >= 2) ||
      (item.id === 'endurance' && enduranceUpg >= 1) ||
      (item.id === 'endurance2' && enduranceUpg >= 2)
    );
    return false;
  }

  function equip(item){
    const price = item.price || 0;
    if(item.category === 'weapons') return buyItem('weapon', item.id, price);
    if(item.category === 'armor') return buyItem('armor', item.id, price);
    if(item.category === 'upgrades') return buyItem('upgrade', item.id, price);
  }

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

    const entries = getEquipmentEntries(state.selectedCategory);
    title.innerText = CATEGORIES.find((cat)=>cat.id===state.selectedCategory)?.label || 'Inventory';
    overview.innerHTML = `<div class="detail-stat"><span>Equipped Weapon</span><strong>${getWeaponProfile(weapon).name}</strong></div><div class="detail-stat"><span>Armor</span><strong>${armor === 'none' ? 'None' : armor}</strong></div><div class="detail-stat"><span>Coins</span><strong>${coins}</strong></div>`;

    if(!entries.length){
      list.innerHTML = `<div class="armory-empty">${title.innerText} hooks are prepared for a future update.</div>`;
      detail.innerHTML = `<h4>Future-ready slot</h4><p>This category has been scaffolded so armor, helms, ranged weapons, and magic can land without UI rewrites.</p>`;
      return;
    }

    const selectedId = entries.some((entry)=>entry.id===state.selectedItemId) ? state.selectedItemId : entries[0].id;
    if(selectedId !== state.selectedItemId) uiStateStore.set({ selectedItemId: selectedId });
    const selectedItem = entries.find((entry)=>entry.id===selectedId) || entries[0];

    list.innerHTML = entries.map((item)=>{
      const owned = getOwned(item);
      const equipped = (item.category === 'weapons' && weapon === item.id) || (item.category === 'armor' && armor === item.id) || (item.category === 'upgrades' && owned);
      const locked = item.price > 0 && !owned;
      const stats = item.stats || {};
      return `<article class="armory-card ${selectedId===item.id?'is-selected':''} ${equipped?'is-equipped':''} ${locked?'is-locked':''}" data-armory-item="${item.id}">
        <div class="armory-card-header"><div class="armory-icon">${item.icon || '✦'}</div><div><div class="armory-name">${item.name}</div><div class="armory-type">${item.typeLabel || 'Utility'} · ${item.rarity || 'Hook'}</div></div></div>
        <div class="armory-stat-grid">
          ${Object.entries(stats).slice(0,4).map(([key,val])=>`<div class="armory-stat"><span>${key}</span><strong>${val}</strong></div>`).join('') || '<div class="armory-stat"><span>Status</span><strong>Future Hook</strong></div>'}
        </div>
        <div class="chap-meta"><span>${item.tier || 'Tier Hook'}</span><span>${equipped ? 'Equipped' : owned ? 'Owned' : `🪙 ${item.price || 0}`}</span></div>
      </article>`;
    }).join('');
    list.querySelectorAll('[data-armory-item]').forEach((card)=>card.addEventListener('click', ()=>{
      uiStateStore.set({ selectedItemId: card.dataset.armoryItem });
      render();
    }));

    const compare = selectedItem.category === 'weapons' ? getWeaponProfile(weapon) : selectedItem.category === 'armor' ? getEquipmentEntries('armor').find((entry)=>entry.id===armor) : null;
    detail.innerHTML = `<div class="panel-kicker">${selectedItem.category}</div><h4>${selectedItem.name}</h4><p>${selectedItem.description || 'Reserved for future progression data.'}</p>
      <div class="armory-stat-grid">${Object.entries(selectedItem.stats || { tier:selectedItem.tier || 'Future' }).map(([key,val])=>`<div class="armory-stat"><span>${key}</span><strong>${val}</strong></div>`).join('')}</div>
      <div class="detail-stats"><div class="detail-stat"><span>Moveset</span><strong>${selectedItem.movesetStyle || selectedItem.typeLabel || 'Future-ready'}</strong></div><div class="detail-stat"><span>Use</span><strong>${selectedItem.usableBy || 'Player'}</strong></div><div class="detail-stat"><span>Rarity</span><strong>${selectedItem.rarity || 'Common'}</strong></div><div class="detail-stat"><span>Compare</span><strong>${compare?.name || 'No comparison'}</strong></div></div>
      <div class="armory-actions"><button type="button" class="equip-btn" ${selectedItem.price > coins && !getOwned(selectedItem) ? 'disabled' : ''}>${getOwned(selectedItem) ? 'Equip / Confirm' : `Purchase · ${selectedItem.price || 0}`}</button><button type="button">Upgrade Hook</button></div>`;
    detail.querySelector('.equip-btn')?.addEventListener('click', ()=>equip(selectedItem));
  }
  window.armoryController = { render };
})();
