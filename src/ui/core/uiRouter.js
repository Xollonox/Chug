(function(){
  function show(screenId){
    document.querySelectorAll('.screen').forEach((screen)=>screen.classList.remove('active-screen'));
    const next = document.getElementById(screenId);
    if(next) next.classList.add('active-screen');
    if(window.uiStateStore) uiStateStore.set({ activeScreen: screenId, hudVisible: screenId === 'hud-screen' });
    const chromeVisible = ['story-screen','hud-screen'].includes(screenId);
    const coinsVisible = ['story-screen','hud-screen','shop-screen'].includes(screenId);
    const partIndicator = document.getElementById('part-indicator');
    if(partIndicator && !chromeVisible) partIndicator.style.display = 'none';
    const topCoins = document.getElementById('global-coins');
    if(topCoins) topCoins.style.display = coinsVisible ? 'block' : 'none';
  }
  window.showScreen = show;
  window.uiRouter = { show };
})();
