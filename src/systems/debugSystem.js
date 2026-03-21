let debugMode = false;

function setDebugMode(nextValue){
  debugMode = !!nextValue;
  try { localStorage.setItem(DEBUG_STORAGE_KEY, JSON.stringify(debugMode)); } catch (e) {}
}

function loadDebugMode(){
  try {
    const raw = localStorage.getItem(DEBUG_STORAGE_KEY);
    debugMode = raw ? JSON.parse(raw) : false;
  } catch (e) {
    debugMode = false;
  }
}

function toggleDebugMode(){
  setDebugMode(!debugMode);
  const label = debugMode ? 'DEBUG ON' : 'DEBUG OFF';
  if (typeof shopToast === 'function') shopToast(label, debugMode ? '#00e5ff' : '#888');
}

window.addEventListener('keydown', e => {
  if (e.key === '`') toggleDebugMode();
});
