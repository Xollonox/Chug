// Uncaught Error HUD Console Logger for CHUG
(function() {
  'use strict';

  var errors = [];
  var container = null;

  function initContainer() {
    if (container) return;
    container = document.createElement('div');
    container.id = 'debug-log-console';
    container.style.cssText = 'position:fixed; bottom:10px; left:10px; right:10px; max-height:200px; overflow-y:auto; background:rgba(20,5,5,0.98); color:#ff5555; font-family:monospace; font-size:12px; padding:10px; border:2px solid #ff1744; z-index:999999; border-radius:4px; box-shadow:0 0 20px rgba(255,23,68,0.5); line-height:1.4; display:none;';
    
    var header = document.createElement('div');
    header.style.cssText = 'font-weight:bold; border-bottom:1px solid #ff1744; margin-bottom:5px; padding-bottom:3px;';
    header.textContent = '⚠️ GAME RUNTIME ERRORS';
    container.appendChild(header);

    (document.body || document.documentElement).appendChild(container);
    
    errors.forEach(printError);
    errors = [];
  }

  function printError(err) {
    if (!container) {
      errors.push(err);
      return;
    }
    container.style.display = 'block';
    var errDiv = document.createElement('div');
    errDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    errDiv.style.padding = '4px 0';
    errDiv.textContent = '❌ [' + err.time + '] ' + err.msg + ' (' + err.file + ':' + err.line + ')';
    container.appendChild(errDiv);
    container.scrollTop = container.scrollHeight;
  }

  window.addEventListener('error', function(e) {
    initContainer();
    printError({
      time: new Date().toLocaleTimeString(),
      msg: e.message,
      file: e.filename ? e.filename.split('/').pop() : 'unknown',
      line: e.lineno
    });
  });

  window.addEventListener('DOMContentLoaded', initContainer);
})();
