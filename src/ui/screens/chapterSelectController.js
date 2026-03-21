(function(){
  function getChapterProgress(ch){
    const parts = CHAPTER_PARTS[ch] || [];
    const profile = getPlayerProfile();
    const completed = parts.filter((part)=>profile.clearedParts.includes(part)).length;
    return { completed, total: Math.max(parts.length, 1), unlocked: profile.chapterProgress.unlocked.includes(ch) && profile.level >= (CHAPTER_CONFIG[ch]?.requiredLevel || 1) };
  }

  function render(){
    const list = document.getElementById('chapter-card-list');
    const detail = document.getElementById('chapter-detail-panel');
    const summary = document.getElementById('chapter-progress-summary');
    if(!list || !detail || !summary) return;
    const profile = getPlayerProfile();
    const selected = uiStateStore.getState().selectedChapter;
    summary.innerHTML = `<div class="detail-stat"><span>Current Level</span><strong>${profile.level}</strong></div><div class="detail-stat"><span>Unlocked Chapters</span><strong>${profile.chapterProgress.unlocked.length}</strong></div><div class="detail-stat"><span>Future Hook</span><strong>Boss Challenges</strong></div>`;
    list.innerHTML = Object.values(CHAPTER_CONFIG).map((meta)=>{
      const progress = getChapterProgress(meta.id);
      const pct = Math.round((progress.completed / progress.total) * 100);
      return `<article class="chapter-card ${selected===meta.id?'is-selected':''} ${!progress.unlocked?'is-locked':''}" data-chapter-id="${meta.id}">
        <div class="chap-num">${meta.label}</div>
        <div>
          <div class="chap-title">${meta.title}</div>
          <div class="chap-sub">${meta.subtitle}</div>
          <div class="chap-meta"><span>${meta.act}</span><span>Req Lvl ${meta.requiredLevel}</span><span>Rec ${meta.recommendedLevel}</span></div>
          <div class="chapter-progress"><div style="width:${pct}%"></div></div>
        </div>
        <div class="status-chip">${!progress.unlocked ? 'Locked' : pct >= 100 ? 'Complete' : 'Available'}</div>
      </article>`;
    }).join('');
    const current = CHAPTER_CONFIG[selected] || CHAPTER_CONFIG[1];
    const selectedProgress = getChapterProgress(selected);
    detail.innerHTML = `<div class="panel-kicker">${current.act}</div><h4>${current.title}</h4><p>${current.lore}</p><div class="detail-stats"><div class="detail-stat"><span>Enemy Read</span><strong>${current.enemy}</strong></div><div class="detail-stat"><span>Reward</span><strong>${current.firstClearReward.coins}c / ${current.firstClearReward.xp}xp</strong></div><div class="detail-stat"><span>Recommended</span><strong>Lvl ${current.recommendedLevel}</strong></div><div class="detail-stat"><span>Progress</span><strong>${selectedProgress.completed}/${selectedProgress.total}</strong></div></div>`;
    const launch = document.getElementById('chapter-launch-btn');
    if(launch){
      launch.disabled = !selectedProgress.unlocked;
      launch.innerText = selectedProgress.unlocked ? `Enter ${current.label}` : `Requires Lvl ${current.requiredLevel}`;
      launch.onclick = ()=>startChapter(selected);
    }
    list.querySelectorAll('[data-chapter-id]').forEach((card)=>card.addEventListener('click', ()=>{
      uiStateStore.set({ selectedChapter: Number(card.dataset.chapterId) });
      render();
    }));
  }
  window.chapterSelectController = { render };
})();
