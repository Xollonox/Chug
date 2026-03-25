(function(){
  function ensureState(){
    try {
      if (typeof _stats === 'undefined' || !_stats || typeof _stats !== 'object') {
        window._stats = {hp:0,atk:0,def:0,spd:0,crit:0};
      } else {
        _stats.hp = Number.isFinite(_stats.hp) ? _stats.hp : 0;
        _stats.atk = Number.isFinite(_stats.atk) ? _stats.atk : 0;
        _stats.def = Number.isFinite(_stats.def) ? _stats.def : 0;
        _stats.spd = Number.isFinite(_stats.spd) ? _stats.spd : 0;
        _stats.crit = Number.isFinite(_stats.crit) ? _stats.crit : 0;
        window._stats = _stats;
      }
      if (typeof _lvl === 'undefined' || !Number.isFinite(_lvl) || _lvl < 1) window._lvl = 1;
      if (typeof _xp === 'undefined' || !Number.isFinite(_xp) || _xp < 0) window._xp = 0;
      if (typeof _statPoints === 'undefined' || !Number.isFinite(_statPoints) || _statPoints < 0) window._statPoints = 0;
      if (typeof XP_TABLE !== 'undefined' && Array.isArray(XP_TABLE)) window.XP_TABLE = XP_TABLE;
      window.characterStats = window._stats || _stats;
      window.playerStats = window.characterStats;
      window.playerProgress = {
        get level(){ return (typeof _lvl !== 'undefined' && Number.isFinite(_lvl)) ? _lvl : 1; },
        get xp(){ return (typeof _xp !== 'undefined' && Number.isFinite(_xp)) ? _xp : 0; },
        get statPoints(){ return (typeof _statPoints !== 'undefined' && Number.isFinite(_statPoints)) ? _statPoints : 0; },
        get stats(){ return window.characterStats || {hp:0,atk:0,def:0,spd:0,crit:0}; }
      };
    } catch(e){}
  }
  function safeNeed(level){
    try {
      ensureState();
      var table = (typeof XP_TABLE !== 'undefined' && Array.isArray(XP_TABLE) && XP_TABLE.length) ? XP_TABLE : (window.XP_TABLE || []);
      if (!table.length) return 300;
      var idx = Math.max(0, Math.min(49, (Number(level)||1) - 1));
      return Number.isFinite(table[idx]) ? table[idx] : (table[0] || 300);
    } catch(e){ return 300; }
  }
  window.__ensureCharacterState = ensureState;
  window.__safeXPNeed = safeNeed;
  ensureState();

  if (typeof updateV9Display === 'function') {
    const _orig = updateV9Display;
    updateV9Display = function(){
      ensureState();
      try {
        window.playerLevel = (typeof _lvl !== 'undefined' && Number.isFinite(_lvl)) ? _lvl : 1;
        window.playerXP = (typeof _xp !== 'undefined' && Number.isFinite(_xp)) ? _xp : 0;
        window.xpToNext = safeNeed(window.playerLevel);
      } catch(e){}
      try { return _orig.apply(this, arguments); } catch(err) {
        try {
          const gv=document.getElementById('gem-val'); if(gv)gv.innerText=(typeof _gems!=='undefined'&&Number.isFinite(_gems))?_gems:0;
          const lv=document.getElementById('lv-val'); if(lv)lv.innerText=(typeof _lvl!=='undefined'&&Number.isFinite(_lvl))?_lvl:1;
          const b=document.getElementById('p-xp'); if(b)b.style.width=Math.min(100,((Number(_xp)||0)/safeNeed(_lvl))*100)+'%';
        } catch(e2){}
      }
    };
  }

  if (typeof refreshLevelScreen === 'function') {
    refreshLevelScreen = function(){
      ensureState();
      const need = safeNeed((typeof _lvl !== 'undefined' ? _lvl : 1));
      const lvlNow = (typeof _lvl !== 'undefined' ? _lvl : 1);
      const xpNow = (typeof _xp !== 'undefined' ? _xp : 0);
      const ptsNow = (typeof _statPoints !== 'undefined' ? _statPoints : 0);
      const stats = window.characterStats || {hp:0,atk:0,def:0,spd:0,crit:0};
      const cur=document.getElementById('lv-cur'); if(cur)cur.innerText=lvlNow;
      const nxt=document.getElementById('lv-next'); if(nxt)nxt.innerText=Math.min(lvlNow+1,50);
      const xpt=document.getElementById('lv-xp-text'); if(xpt)xpt.innerText=xpNow+' / '+need+' XP';
      const bar=document.getElementById('lv-xpbar-fill'); if(bar)bar.style.width=Math.min(100,(xpNow/need*100))+'%';
      const pv=document.getElementById('lv-pts-val'); if(pv)pv.innerText=ptsNow;
      const banner=document.getElementById('lv-pts-banner'); if(banner)banner.classList.toggle('has-points',ptsNow>0);
      const BAR_MAX=30;
      ['hp','atk','def','spd','crit'].forEach(function(k){
        const e=document.getElementById('ms-'+k); if(e)e.innerText=Number.isFinite(stats[k])?stats[k]:0;
        const b=document.getElementById('bar-'+k); if(b)b.style.width=Math.min(100,((Number.isFinite(stats[k])?stats[k]:0)/BAR_MAX)*100)+'%';
      });
      const list=document.getElementById('lv-combo-list'); if(!list || typeof COMBO_UNLOCKS === 'undefined') return;
      list.innerHTML='';
      Object.entries(COMBO_UNLOCKS).forEach(function(entry){
        const lv=entry[0], c=entry[1];
        const locked = (lvlNow < parseInt(lv,10));
        const d=document.createElement('div');
        d.className='lv-combo-item'+(locked?' locked':'');
        if(locked){
          d.innerHTML='<span class="combo-name"><span class="combo-dot"></span>'+c.name+'</span>'
            +'<span class="combo-lv-tag"><span class="combo-lock-icon">🔒</span> LV '+lv+'</span>';
        } else {
          d.innerHTML='<span class="combo-name"><span class="combo-dot"></span>'+c.name+'</span>'
            +'<span class="combo-lv-tag"><span class="combo-check">✓</span> LV '+lv+'</span>';
        }
        list.appendChild(d);
      });
    };
  }

  if (typeof allocStatMenu === 'function') {
    allocStatMenu = function(stat,delta){
      ensureState();
      const stats = window.characterStats || (window._stats = {hp:0,atk:0,def:0,spd:0,crit:0});
      if (!(stat in stats)) stats[stat] = 0;
      if (delta>0 && ((typeof _statPoints==='undefined'?0:_statPoints)<=0)) return;
      if (delta<0 && (!Number.isFinite(stats[stat]) || stats[stat]<=0)) return;
      stats[stat] = (Number(stats[stat])||0) + delta;
      window._stats = stats;
      _statPoints = (Number(_statPoints)||0) - delta;
      if (typeof v9SaveGame === 'function') v9SaveGame();
      if (typeof refreshLevelScreen === 'function') refreshLevelScreen();
      try { if(typeof beep==='function')beep(delta>0?500:400,'sine',0.05,0.04); } catch(e){}
    };
  }

  if (typeof openLevelScreen === 'function') {
    const _origOpenLevelScreen = openLevelScreen;
    openLevelScreen = function(){ ensureState(); return _origOpenLevelScreen.apply(this, arguments); };
  }

  function pathUnlockPart(path){
    if (path === 'range') return 21;   // Act 3 start, per your custom rule
    if (path === 'rage') return 21;
    if (path === 'domain') return 31;  // later system preserved under custom progression
    return 99;
  }
  if (typeof TRAINING_PATHS !== 'undefined' && TRAINING_PATHS.range && TRAINING_PATHS.rage && TRAINING_PATHS.domain) {
    TRAINING_PATHS.range.unlockPart = pathUnlockPart('range');
    TRAINING_PATHS.rage.unlockPart = pathUnlockPart('rage');
    TRAINING_PATHS.domain.unlockPart = pathUnlockPart('domain');
  }
  if (typeof isTrainingPathUnlocked === 'function') {
    window.isTrainingPathUnlocked = isTrainingPathUnlocked = function(path){
      const reached = window.__saveData && window.__saveData.currentPart ? window.__saveData.currentPart : (typeof currentPart !== 'undefined' ? currentPart : 1);
      return reached >= pathUnlockPart(path);
    };
  }
  function currentPartSafe(){ return window.__saveData && window.__saveData.currentPart ? window.__saveData.currentPart : (typeof currentPart !== 'undefined' ? currentPart : 1); }
  function renderTrainingBody(path){
    const body = document.getElementById('trainingPathBody');
    if (!body || typeof TRAINING_PATHS === 'undefined') return;
    const def = TRAINING_PATHS[path];
    if (!def) return;
    const reached = currentPartSafe();
    const unlocked = window.isTrainingPathUnlocked ? window.isTrainingPathUnlocked(path) : false;
    const prog = typeof getTrainingProgress === 'function' ? getTrainingProgress(path) : {total:def.nodes.length,done:0,nodes:{}};
    const pct = def.nodes.length ? Math.round((prog.done / def.nodes.length) * 100) : 0;
    const chips = '<div class="tc-meta">'
      + '<div class="tc-chip"><span class="tc-chip-k">GUIDE</span><span class="tc-chip-v">'+def.teacher.toUpperCase()+'</span></div>'
      + '<div class="tc-chip"><span class="tc-chip-k">CURRENT PART</span><span class="tc-chip-v">'+reached+'</span></div>'
      + '<div class="tc-chip"><span class="tc-chip-k">UNLOCK</span><span class="tc-chip-v">ACT '+(path==='range'||path==='rage'?'III':'IV')+'</span></div>'
      + '</div>';
    const head = '<div class="tc-path-head">'
      + '<div class="tc-path-top">'
      + '<div class="tc-icon-crest">'+def.icon+'</div>'
      + '<div class="tc-copy"><div class="tc-name">'+def.name+'</div><div class="tc-sub">SEALED TRAINING DISCIPLINE</div><div class="tc-desc">'+def.desc+'</div>'+chips+'</div>'
      + '</div>'
      + '<div class="tc-progress"><div class="tc-progress-l">PROGRESS</div><div class="tc-progress-track"><div class="tc-progress-fill" style="width:'+pct+'%"></div></div><div class="tc-progress-v">'+prog.done+' / '+def.nodes.length+'</div></div>'
      + '</div>';
    if (!unlocked) {
      const req = pathUnlockPart(path);
      const lockPct = Math.max(0, Math.min(100, (reached / req) * 100));
      body.innerHTML = '<div class="tc-shell">'+head
        + '<div class="tc-seal">'
        + '<div class="tc-seal-mark">⛨</div>'
        + '<div class="tc-seal-title">SEALED PATH</div>'
        + '<div class="tc-seal-copy">This discipline remains bound behind story progression. Advance the campaign to weaken the seal and open the next chamber of training.</div>'
        + '<div class="tc-seal-req"><span>UNLOCK REQUIREMENT</span><strong>PART '+req+'</strong></div>'
        + '<div class="tc-seal-bar"><div style="width:'+lockPct+'%"></div></div>'
        + '<div class="tc-lockhint">CURRENTLY PART '+reached+' · THE PATH WILL ANSWER WHEN THE CAMP REACHES THE NEXT STAGE</div>'
        + '</div></div>';
      return;
    }
    let nodes = '<div class="tc-nodes">';
    def.nodes.forEach(function(node, i){
      const nodeDone = !!(prog.nodes && prog.nodes[node.id]);
      const prevOk = i === 0 || !!(prog.nodes && prog.nodes[def.nodes[i-1].id]);
      const partOk = reached >= node.reqPart;
      const available = !nodeDone && prevOk && partOk;
      const locked = !nodeDone && !available;
      const cls = nodeDone ? 'done' : available ? 'available tc-node-action' : 'locked';
      const title = locked ? 'SEALED TECHNIQUE' : node.title;
      const effect = locked ? ('Advance to Part '+node.reqPart+' to reveal this discipline.') : node.effect;
      const badge = nodeDone ? 'MASTERED' : available ? 'UNLOCK' : (partOk ? 'LOCKED' : ('PART '+node.reqPart));
      const req = available ? 'TAP TO AWAKEN THIS NODE' : (node.reqNode && !prevOk ? 'REQUIRES PRIOR NODE' : 'TRAINING SEALED');
      const click = available ? ' onclick="unlockTrainingNode(\''+path+'\',\''+node.id+'\');window.__renderTrainingV70 && window.__renderTrainingV70(\''+path+'\');"' : '';
      if (i > 0) nodes += '<div class="tc-connector"></div>';
      nodes += '<div class="tc-node '+cls+'"'+click+'>'
        + '<div class="tc-tier">'+node.tier+'</div>'
        + '<div><div class="tc-node-title">'+title+'</div><div class="tc-node-effect">'+effect+'</div><div class="tc-node-req">'+req+'</div></div>'
        + '<div class="tc-badge">'+badge+'</div></div>';
    });
    nodes += '</div>';
    body.innerHTML = '<div class="tc-shell">'+head+nodes+'</div>';
  }
  window.__renderTrainingV70 = renderTrainingBody;
  if (typeof _renderTrainingPathBody === 'function') _renderTrainingPathBody = renderTrainingBody;
  if (typeof setTrainingPath === 'function') {
    setTrainingPath = function(path){
      _trainingActivePath = path;
      ['range','rage','domain'].forEach(function(p){ const tab = document.getElementById('tTab-'+p); if(tab){ tab.classList.toggle('active', p === path); tab.classList.toggle('locked-tab', !(window.isTrainingPathUnlocked && window.isTrainingPathUnlocked(p))); } });
      renderTrainingBody(path);
    };
  }
  if (typeof _renderTrainingScreen === 'function') {
    _renderTrainingScreen = function(){
      ['range','rage','domain'].forEach(function(p){ const tab = document.getElementById('tTab-'+p); if(tab){ tab.classList.toggle('locked-tab', !(window.isTrainingPathUnlocked && window.isTrainingPathUnlocked(p))); tab.classList.toggle('active', p === _trainingActivePath); } });
      renderTrainingBody(_trainingActivePath || 'range');
    };
  }
})();
