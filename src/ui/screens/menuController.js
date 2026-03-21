(function(){
  function bind(){
    document.querySelectorAll('[data-action]').forEach((button)=>{
      button.addEventListener('click', ()=>{
        const action = button.dataset.action;
        if(action === 'continue') return continueGame();
        if(action === 'new-game') return newGame();
        if(action === 'chapters') return openChapterSelect();
        if(action === 'armory') return openShop();
        if(action === 'training') return startChapter(uiStateStore?.getState().selectedChapter || 1);
        if(action === 'settings') return openSettings();
        if(action === 'menu') return closeSettings ? closeSettings() : showScreen('menu-screen');
        if(action === 'credits') return notificationController.push({ title:'Credits Hook', copy:'Reserved for a future cinematic credits roll.' });
        if(action === 'reset-progress') return newGame();
        if(action === 'back-from-armory') return closeShop();
      });
    });
    const pauseBtn = document.getElementById('btn-ingame-menu');
    if(pauseBtn) pauseBtn.addEventListener('click', ()=>quitToMenu());
    const continueBtn = document.getElementById('part-end-continue');
    if(continueBtn) continueBtn.addEventListener('click', ()=>partEndContinue());
  }
  window.menuController = { bind };
})();
