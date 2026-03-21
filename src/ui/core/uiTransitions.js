(function(){
  function playChapterTransition(chapterLabel, title, onComplete){
    const overlay = document.getElementById('chap-transition');
    document.getElementById('ct-chapter-lbl').innerText = chapterLabel;
    document.getElementById('ct-title-lbl').innerText = title;
    overlay.classList.add('fade-in');
    if(window.uiStateStore) uiStateStore.set({ transitionBusy: true });
    setTimeout(()=>{
      overlay.classList.remove('fade-in');
      if(window.uiStateStore) uiStateStore.set({ transitionBusy: false });
      if(onComplete) onComplete();
    }, 2400);
  }
  window.uiTransitions = { playChapterTransition };
})();
