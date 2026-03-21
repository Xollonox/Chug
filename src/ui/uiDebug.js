(function(){
  function render(snapshot){
    const box = document.getElementById('ui-debug');
    if(!box) return;
    if(!window.debugMode){ box.style.display = 'none'; return; }
    box.style.display = 'block';
    box.innerText = [
      `screen: ${snapshot.activeScreen}`,
      `modal: ${snapshot.activeModal || '-'}`,
      `chapter: ${snapshot.selectedChapter}`,
      `category: ${snapshot.selectedCategory}`,
      `item: ${snapshot.selectedItemId || '-'}`,
      `hud: ${snapshot.hudVisible}`,
      `transition: ${snapshot.transitionBusy}`,
      `gameState: ${window.gameState}`
    ].join('\n');
  }
  window.uiDebug = { render };
})();
