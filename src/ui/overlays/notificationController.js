(function(){
  const layer = ()=>document.getElementById('notification-layer');
  function push({ title='Notice', copy='', color='rgba(245,200,66,0.45)', timeout=1800 }){
    const root = layer();
    if(!root) return;
    const node = document.createElement('div');
    node.className = 'toast';
    node.style.borderColor = color;
    node.innerHTML = `<div class="toast-title">${title}</div><div class="toast-copy">${copy}</div>`;
    root.appendChild(node);
    setTimeout(()=>{ node.style.opacity='0'; node.style.transform='translateY(8px)'; }, timeout);
    setTimeout(()=>node.remove(), timeout + 260);
  }
  window.notificationController = { push };
})();
