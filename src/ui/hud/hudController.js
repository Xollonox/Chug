(function(){
  function animateGhost(id, ratio){
    const el = document.getElementById(id);
    if(!el) return;
    const next = `${Math.max(0, ratio * 100)}%`;
    requestAnimationFrame(()=>{ el.style.width = next; });
  }
  function setPlateLabels(playerWeaponName, enemyWeaponName){
    const p = document.getElementById('player-weapon-label');
    const e = document.getElementById('enemy-weapon-label');
    if(p) p.innerText = playerWeaponName;
    if(e) e.innerText = enemyWeaponName;
  }
  window.hudController = { animateGhost, setPlateLabels };
})();
