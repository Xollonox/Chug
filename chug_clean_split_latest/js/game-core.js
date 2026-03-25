if (typeof window.currentPart === 'undefined') window.currentPart = 1;
var currentPart = (typeof window.currentPart === 'number' ? window.currentPart : 1);
window.currentPart = currentPart;
window.__safeListen = function(el, type, handler, opts){
  if (el && typeof el.addEventListener === 'function') el.addEventListener(type, handler, opts);
  return el;
};
window.introSelect = window.introSelect || function(action){
  window.__pendingIntroAction = action || window.__pendingIntroAction || 'new';
  if (typeof window.__realIntroSelect === 'function') return window.__realIntroSelect(window.__pendingIntroAction);
  return false;
};
window.introHandleClick = window.introHandleClick || function(e){
  if (e && e.target && e.target.classList && e.target.classList.contains('intro-menu-btn')) return;
  var has = false;
  try { has = !!localStorage.getItem('chug_shadow_v3_save'); } catch(_) {}
  return window.introSelect(has ? 'continue' : 'new');
};
