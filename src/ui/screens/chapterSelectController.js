(function(){
  const CHAPTER_UI_DATA = {
    1: { title:'The Fall', subtitle:'Parts 1–5 · Collapse into the Shadow System', reward:'150–400 coins', difficulty:'Initiate', act:'Act I', chapterLabel:'CH. I', enemy:'Fragmented Echoes', lore:'The first descent establishes the tone, your losses, and the core enemy language.' },
    2: { title:'Vanished', subtitle:'Parts 6–10 · Memory erosion and control', reward:'500–1000 coins', difficulty:'Veteran', act:'Act I', chapterLabel:'CH. II', enemy:'Controlled hosts', lore:'Threats become personal, pressure rises, and the system starts rewriting what you know.' },
    3: { title:'Afterimage', subtitle:'Part 11 · The trail continues', reward:'1200+ coins', difficulty:'Boss Path', act:'Act II', chapterLabel:'CH. III', enemy:'The Figure', lore:'A forward-looking chapter card built to support future boss and act expansion cleanly.' }
  };

  function getChapterProgress(ch){
    const parts = CHAPTER_PARTS[ch] || [];
    const unlocked = window.__saveData?.chapterUnlocked || 1;
    const completed = parts.filter((part)=>unlocked > part).length;
    return { completed, total: Math.max(parts.length, 1), unlocked: unlocked >= parts[0] };
  }

  function render(){
    const list = document.getElementById('chapter-card-list');
    const detail = document.getElementById('chapter-detail-panel');
    const summary = document.getElementById('chapter-progress-summary');
    if(!list || !detail || !summary) return;
    const unlocked = window.__saveData?.chapterUnlocked || 1;
    const selected = uiStateStore.getState().selectedChapter;
    summary.innerHTML = `<div class="detail-stat"><span>Active Unlock</span><strong>Part ${unlocked}</strong></div><div class="detail-stat"><span>Acts Online</span><strong>2</strong></div><div class="detail-stat"><span>Future Hook</span><strong>Boss Chapters</strong></div>`;
    list.innerHTML = Object.keys(CHAPTER_UI_DATA).map((key)=>{
      const chapter = Number(key);
      const meta = CHAPTER_UI_DATA[chapter];
      const progress = getChapterProgress(chapter);
      const locked = !progress.unlocked;
      const pct = Math.round((progress.completed / progress.total) * 100);
      return `<article class="chapter-card ${selected===chapter?'is-selected':''} ${locked?'is-locked':''}" data-chapter-id="${chapter}">
        <div class="chap-num">${meta.chapterLabel}</div>
        <div>
          <div class="chap-title">${meta.title}</div>
          <div class="chap-sub">${meta.subtitle}</div>
          <div class="chap-meta"><span>${meta.act}</span><span>${meta.difficulty}</span><span>${meta.reward}</span></div>
          <div class="chapter-progress"><div style="width:${pct}%"></div></div>
        </div>
        <div class="status-chip">${locked ? 'Locked' : pct >= 100 ? 'Complete' : 'Available'}</div>
      </article>`;
    }).join('');
    const current = CHAPTER_UI_DATA[selected] || CHAPTER_UI_DATA[1];
    const selectedProgress = getChapterProgress(selected);
    detail.innerHTML = `<div class="panel-kicker">${current.act}</div><h4>${current.title}</h4><p>${current.lore}</p><div class="detail-stats"><div class="detail-stat"><span>Enemy Read</span><strong>${current.enemy}</strong></div><div class="detail-stat"><span>Reward</span><strong>${current.reward}</strong></div><div class="detail-stat"><span>Difficulty</span><strong>${current.difficulty}</strong></div><div class="detail-stat"><span>Progress</span><strong>${selectedProgress.completed}/${selectedProgress.total}</strong></div></div>`;
    const launch = document.getElementById('chapter-launch-btn');
    if(launch){
      launch.disabled = !selectedProgress.unlocked;
      launch.innerText = selectedProgress.unlocked ? `Enter ${current.chapterLabel}` : 'Locked';
      launch.onclick = ()=>startChapter(selected);
    }
    list.querySelectorAll('[data-chapter-id]').forEach((card)=>card.addEventListener('click', ()=>{
      uiStateStore.set({ selectedChapter: Number(card.dataset.chapterId) });
      render();
    }));
  }
  window.chapterSelectController = { render };
})();
