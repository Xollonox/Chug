(function(){
  const menuScreen = document.getElementById('menu-screen');
  if(!menuScreen) return;

  function syncMenuPanelLight(){
    const isMenuActive = menuScreen.classList.contains('active-screen');
    const isOpen = isMenuActive && !menuScreen.classList.contains('menu-ribbon-collapsed');
    document.body.classList.toggle('menu-panel-open', isOpen);
  }

  if(typeof window.showScreen === 'function' && !window.__v17MenuLightShowPatch){
    const oldShowScreen = window.showScreen;
    window.__v17MenuLightShowPatch = true;
    window.showScreen = function(){
      const out = oldShowScreen.apply(this, arguments);
      requestAnimationFrame(syncMenuPanelLight);
      setTimeout(syncMenuPanelLight, 24);
      return out;
    };
  }

  if(typeof window.showMenuScroll === 'function' && !window.__v17MenuLightScrollPatch){
    const oldShowMenuScroll = window.showMenuScroll;
    window.__v17MenuLightScrollPatch = true;
    window.showMenuScroll = function(){
      const out = oldShowMenuScroll.apply(this, arguments);
      requestAnimationFrame(syncMenuPanelLight);
      setTimeout(syncMenuPanelLight, 24);
      return out;
    };
  }

  const observer = new MutationObserver(syncMenuPanelLight);
  observer.observe(menuScreen, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('load', () => setTimeout(syncMenuPanelLight, 60), { once:true });
  setTimeout(syncMenuPanelLight, 3600);
  syncMenuPanelLight();
})();
