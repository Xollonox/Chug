(function(){
  const state = {
    activeScreen: 'menu-screen',
    activeModal: null,
    selectedChapter: 1,
    selectedCategory: 'weapons',
    selectedItemId: 'none',
    hudVisible: false,
    transitionBusy: false,
    overlayStack: []
  };
  const listeners = new Set();
  function emit(){ listeners.forEach((listener)=>listener({...state})); }
  window.uiStateStore = {
    getState(){ return {...state}; },
    set(partial){ Object.assign(state, partial); emit(); },
    subscribe(listener){ listeners.add(listener); listener({...state}); return ()=>listeners.delete(listener); }
  };
})();
