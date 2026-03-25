(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function formatSupportBonusFromValues(b){
    if(!b) return 'No passive bonuses available.';
    const parts = [];
    if (b.dmg > 0) parts.push('+' + b.dmg + ' DMG');
    if (b.def > 0) parts.push('+' + b.def + ' DEF');
    if (b.rageGain > 0) parts.push('+' + Math.round(b.rageGain * 100) + '% RAGE');
    if (b.recovery > 0) parts.push('+' + b.recovery + ' REC');
    return parts.length ? parts.join(' · ') : 'No passive bonuses available.';
  }

  function formatSupportFlavor(rec){
    if (!rec) return 'Reserve this position for passive battle support.';
    const bonus = (window.SQUAD_SUPPORT_BONUSES || {})[rec.id];
    if (bonus) return 'Passive effect: ' + formatSupportBonusFromValues(bonus);
    return 'Passive support available once deployed.';
  }

  function updateSquadMeta(mainRec, supports, bonuses){
    const supportCount = supports.filter(Boolean).length;
    const mainPill = document.getElementById('squadMainStatusPill');
    const supportPill = document.getElementById('squadSupportStatusPill');
    const commandCopy = document.getElementById('squadCommandCopy');
    const formationStatus = document.getElementById('squadFormationStatus');
    const mainNote = document.getElementById('squadMainNote');
    const supportSummary = document.getElementById('squadSupportSummary');

    if (mainPill) mainPill.textContent = mainRec ? 'ACTIVE LEAD' : 'UNSET';
    if (supportPill) supportPill.textContent = supportCount + ' / 2 READY';

    const supportText = formatSupportBonusFromValues(bonuses);
    if (commandCopy) {
      commandCopy.textContent = supportCount
        ? 'Lead fighter selected. Passive support bonuses online: ' + supportText + '.'
        : 'Select a lead fighter and reinforce them with tactical support positions.';
    }

    if (mainNote) {
      if (mainRec) {
        const leadRole = mainRec.role || 'Lead fighter';
        mainNote.textContent = (mainRec.name || 'This fighter') + ' is your active point fighter. ' + leadRole + ' anchors this formation.';
      } else {
        mainNote.textContent = 'Choose the main fighter who represents this formation in battle.';
      }
    }

    if (supportSummary) {
      supportSummary.textContent = supportCount
        ? 'Assigned support effects: ' + supportText + '.'
        : 'Supports grant passive bonuses to your active formation.';
    }

    if (formationStatus) {
      formationStatus.textContent = supportCount === 0
        ? 'No support fighters assigned yet. Fill both positions to unlock a denser squad profile.'
        : supportCount === 1
          ? 'One tactical support slot is active. Add one more to complete the formation.'
          : 'Both support positions are active. Your formation is fully reinforced.';
    }
  }

  _renderSquadScreen = function(){
    const mainId   = getMainFighter();
    const supports = getSupportMembers();
    const bonuses  = getSquadBonuses();

    const mainRec = typeof getRosterRecord === 'function' ? getRosterRecord(mainId) : null;
    _applySlotUI('Main', mainRec, bonuses, true);

    [0, 1].forEach(function(i){
      const id  = supports[i] || null;
      const rec = id && typeof getRosterRecord === 'function' ? getRosterRecord(id) : null;
      _applySlotUI('Support' + i, rec, null, false);
    });

    _refreshBonusChips(bonuses);
    updateSquadMeta(mainRec, supports, bonuses);
  };

  _applySlotUI = function(slotKey, rec, bonuses, isMain){
    const iconEl   = document.getElementById('squad' + slotKey + 'Icon');
    const nameEl   = document.getElementById('squad' + slotKey + 'Name');
    const roleEl   = document.getElementById('squad' + slotKey + 'Role');
    const bonusEl  = document.getElementById('squad' + slotKey + 'Bonus');
    const sigEl    = document.getElementById('squad' + slotKey + 'Signature');
    const tagEl    = document.getElementById('squad' + slotKey + 'Tag');
    const slotEl   = document.getElementById(isMain ? 'squadMainSlot' : 'squadSupport' + slotKey.replace('Support',''));
    const actionEl = document.getElementById(isMain ? 'squadMainAction' : 'squadSupportAction' + slotKey.replace('Support',''));

    if (!iconEl || !nameEl || !roleEl || !slotEl) return;

    if (rec) {
      iconEl.textContent = rec.icon || '?';
      nameEl.textContent = rec.name || rec.id;
      roleEl.textContent = isMain
        ? ((rec.role || 'Lead fighter') + ' · Active Lead')
        : (rec.role || 'Support Operative');

      if (bonusEl && isMain && bonuses) {
        const text = formatSupportBonusFromValues(bonuses);
        bonusEl.textContent = text === 'No passive bonuses available.' ? 'No support bonuses active.' : 'Squad Aura · ' + text;
      } else if (bonusEl && !isMain) {
        const b = (window.SQUAD_SUPPORT_BONUSES || {})[rec.id];
        bonusEl.textContent = formatSupportBonusFromValues(b);
      }

      if (sigEl) sigEl.textContent = isMain
        ? 'Lead this formation into battle. Tap to switch your active point fighter.'
        : formatSupportFlavor(rec);

      if (tagEl) tagEl.textContent = isMain ? 'LEAD' : 'READY';
      if (actionEl) actionEl.textContent = 'CHANGE';

      slotEl.classList.remove('empty-slot');
      slotEl.dataset.state = 'occupied';
    } else {
      iconEl.textContent = '＋';
      nameEl.textContent = isMain ? 'CHUG' : 'EMPTY SLOT';
      roleEl.textContent = isMain ? 'Protagonist · Striker' : 'Tap to assign support';
      if (bonusEl) bonusEl.textContent = isMain ? 'No support bonuses active.' : '';
      if (sigEl) sigEl.textContent = isMain
        ? 'Lead this formation into battle. Tap to switch your active point fighter.'
        : 'Reserve this position for passive battle support.';
      if (tagEl) tagEl.textContent = isMain ? 'LEAD' : 'OPEN';
      if (actionEl) actionEl.textContent = isMain ? 'CHANGE' : 'ASSIGN';

      if (!isMain) slotEl.classList.add('empty-slot');
      slotEl.dataset.state = isMain ? 'occupied' : 'empty';
    }
  };

  _refreshBonusChips = function(bonuses){
    function set(id, valId, val, suffix){
      const chip = document.getElementById(id);
      const valEl = document.getElementById(valId);
      if (!chip || !valEl) return;
      valEl.textContent = (val > 0 ? '+' : '') + (suffix === '%' ? Math.round(val*100) : val) + suffix;
      chip.classList.toggle('active', val > 0);
    }
    set('sbc-dmg',  'sbc-dmg-val', bonuses.dmg, '');
    set('sbc-def',  'sbc-def-val', bonuses.def, '');
    set('sbc-rage', 'sbc-rage-val', bonuses.rageGain, '%');
    set('sbc-rec',  'sbc-rec-val', bonuses.recovery, '');
  };

  openSquadPicker = function(mode, slotIndex){
    _pickerMode = mode;
    _pickerSlot = slotIndex || 0;

    const titleEl = document.getElementById('pickerTitle');
    const subtitleEl = document.getElementById('pickerSubtitle');
    if (titleEl) titleEl.textContent = mode === 'main' ? 'SELECT MAIN FIGHTER' : 'ASSIGN SUPPORT';
    if (subtitleEl) subtitleEl.textContent = mode === 'main'
      ? 'Choose the elite fighter who will represent this formation in battle.'
      : 'Fill this tactical slot with a fighter who grants passive squad bonuses.';

    const list = document.getElementById('pickerList');
    if (!list) return;

    const currentMain = getMainFighter();
    const currentSupports = getSupportMembers();

    const eligible = (typeof ROSTER_DATA !== 'undefined' ? ROSTER_DATA : [])
      .map(function(r){ return typeof getRosterRecord === 'function' ? getRosterRecord(r.id) : r; })
      .filter(function(r){ return _squadEligible(r, mode); });

    if (!eligible.length) {
      list.innerHTML = '<div class="picker-empty">NO ELIGIBLE CHARACTERS<div class="picker-empty-sub">Progress further to unlock more squad candidates.</div></div>';
    } else {
      list.innerHTML = eligible.map(function(r){
        const isCurrent = mode === 'main' ? r.id === currentMain : currentSupports[_pickerSlot] === r.id;
        const alreadyUsed = mode === 'support' && (
          r.id === currentMain ||
          currentSupports.some(function(s, i){ return s === r.id && i !== _pickerSlot; })
        );
        const bonusText = mode === 'support'
          ? formatSupportBonusFromValues((window.SQUAD_SUPPORT_BONUSES || {})[r.id])
          : ((r.role || 'Lead fighter') + ' · Main roster selection');
        return '<div class="picker-row' + (isCurrent ? ' selected' : '') + (alreadyUsed ? ' unavailable' : '') + '" onclick="pickSquadMember(\'' + esc(r.id) + '\')">' +
            '<div class="picker-icon-wrap"><div class="picker-icon">' + esc(r.icon || '?') + '</div></div>' +
            '<div class="picker-info">' +
              '<div class="picker-name">' + esc(r.name || r.id) + '</div>' +
              '<div class="picker-role">' + esc(r.role || '') + '</div>' +
              '<div class="picker-bonus">' + esc(bonusText) + '</div>' +
            '</div>' +
            '<div class="picker-check">✓</div>' +
          '</div>';
      }).join('');
    }

    if (mode === 'support' && currentSupports[_pickerSlot]) {
      list.innerHTML += '<div class="picker-row remove-row" onclick="pickSquadMember(null)">' +
        '<div class="picker-icon-wrap"><div class="picker-icon" style="font-size:18px;">✕</div></div>' +
        '<div class="picker-info">' +
          '<div class="picker-name">REMOVE SUPPORT</div>' +
          '<div class="picker-role">Clear this tactical slot and remove its passive effect.</div>' +
        '</div>' +
      '</div>';
    }

    const picker = document.getElementById('squadPicker');
    if (picker) picker.classList.add('visible');
  };

  closeSquadPicker = function(){
    const picker = document.getElementById('squadPicker');
    if (picker) picker.classList.remove('visible');
  };

  function initSquadPremiumShell(){
    if (document.getElementById('squad-screen')) {
      try { _renderSquadScreen(); } catch (err) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSquadPremiumShell, { once:true });
  } else {
    initSquadPremiumShell();
  }

  window.openSquadPicker = openSquadPicker;
  window.closeSquadPicker = closeSquadPicker;
})();
