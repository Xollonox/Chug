const cache = new Map();
const OK = 'ok';
const MISS = 'miss';

function dedupe(arr) {
  const out = [];
  for (const v of (arr || [])) {
    if (v && !out.includes(v)) out.push(v);
  }
  return out;
}

export const CHUG_ASSETS = {
  root: 'assets',
  audio: {
    bg: [
      'assets/audio/bg.mp3', 'assets/audio/bg.ogg', 'assets/audio/bg.wav',
      'bg.mp3', 'bg.ogg', 'bg.wav'
    ],
    boss: [
      'assets/audio/bgboss.mp3', 'assets/audio/bgboss.ogg', 'assets/audio/bgboss.wav',
      'assets/audio/bossbg.mp3', 'assets/audio/bossbg.ogg', 'assets/audio/bossbg.wav',
      'bgboss.mp3', 'bgboss.ogg', 'bgboss.wav',
      'bossbg.mp3', 'bossbg.ogg', 'bossbg.wav'
    ]
  },
  wallpaperCandidates(chapter) {
    const n = String(parseInt(chapter || 1, 10) || 1);
    const p = n.padStart(2, '0');
    return dedupe([
      `assets/wallpapers/chapter-${p}.webp`, `assets/wallpapers/chapter-${p}.png`, `assets/wallpapers/chapter-${p}.jpg`, `assets/wallpapers/chapter-${p}.jpeg`,
      `assets/wallpapers/ch${p}.webp`, `assets/wallpapers/ch${p}.png`, `assets/wallpapers/ch${p}.jpg`, `assets/wallpapers/ch${p}.jpeg`,
      `assets/wallpapers/chapter-${n}.webp`, `assets/wallpapers/chapter-${n}.png`, `assets/wallpapers/chapter-${n}.jpg`, `assets/wallpapers/chapter-${n}.jpeg`,
      `assets/wallpapers/ch${n}.webp`, `assets/wallpapers/ch${n}.png`, `assets/wallpapers/ch${n}.jpg`, `assets/wallpapers/ch${n}.jpeg`
    ]);
  },
  ui: {
    logo: ['assets/ui/logo.png', 'assets/ui/logo.webp', 'assets/ui/logo.jpg'],
    frame: ['assets/ui/frame.png', 'assets/ui/frame.webp']
  },
  sprite(name) {
    name = String(name || '').trim();
    return name ? dedupe([`assets/sprites/${name}.png`, `assets/sprites/${name}.webp`, `assets/sprites/${name}.jpg`]) : [];
  },
  sfx(name) {
    name = String(name || '').trim();
    return name ? dedupe([`assets/sfx/${name}.mp3`, `assets/sfx/${name}.ogg`, `assets/sfx/${name}.wav`]) : [];
  }
};

export function probeImage(url, timeout = 1800) {
  return new Promise(resolve => {
    if (cache.get('img:' + url) === OK) return resolve(url);
    if (cache.get('img:' + url) === MISS) return resolve(null);
    const img = new Image();
    let done = false;
    const finish = ok => {
      if (done) return;
      done = true;
      cache.set('img:' + url, ok ? OK : MISS);
      resolve(ok ? url : null);
    };
    const t = setTimeout(() => finish(false), timeout);
    img.onload = () => { clearTimeout(t); finish(true); };
    img.onerror = () => { clearTimeout(t); finish(false); };
    img.src = url;
  });
}

export function probeAudio(url, timeout = 2200) {
  return new Promise(resolve => {
    if (cache.get('aud:' + url) === OK) return resolve(url);
    if (cache.get('aud:' + url) === MISS) return resolve(null);
    const audio = new Audio();
    let done = false;
    const finish = ok => {
      if (done) return;
      done = true;
      cache.set('aud:' + url, ok ? OK : MISS);
      try {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      } catch (_e) {}
      resolve(ok ? url : null);
    };
    const t = setTimeout(() => finish(false), timeout);
    audio.preload = 'metadata';
    audio.addEventListener('canplaythrough', () => { clearTimeout(t); finish(true); }, { once: true });
    audio.addEventListener('loadeddata', () => { clearTimeout(t); finish(true); }, { once: true });
    audio.addEventListener('error', () => { clearTimeout(t); finish(false); }, { once: true });
    audio.src = url;
    try {
      audio.load();
    } catch (_e) {
      clearTimeout(t);
      finish(false);
    }
  });
}

export async function firstAvailable(candidates, type) {
  const list = dedupe(candidates);
  for (const url of list) {
    const hit = type === 'audio' ? await probeAudio(url) : await probeImage(url);
    if (hit) return hit;
  }
  return null;
}

export function initAssets() {
  window.CHUG_ASSETS = CHUG_ASSETS;
  window.chugFirstAvailableAsset = firstAvailable;
}
