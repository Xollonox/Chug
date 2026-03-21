(function(){
  function setBanner(text, tone='neutral'){
    const banner = document.getElementById('banner');
    if(!banner) return;
    banner.dataset.tone = tone;
    banner.innerText = text;
  }
  window.overlayController = { setBanner };
})();
