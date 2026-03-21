// ── AUDIO + MUSIC ENGINE ──
let AC = null;
function initAudio(){
  if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();}
  if(AC.state==='suspended')AC.resume();
  startBgAudio();
  startMusicTheme('menu');
}
function beep(f,t='square',dur=0.1,vol=0.05){
  if(!AC)return;
  const o=AC.createOscillator(),g=AC.createGain();
  o.type=t;o.frequency.value=f;
  o.connect(g);g.connect(AC.destination);
  const v=vol*settingsSfxVol;
  g.gain.setValueAtTime(v,AC.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+dur);
  o.start();o.stop(AC.currentTime+dur);
}

// ── PROCEDURAL MUSIC ENGINE ──
// 100% Web Audio API — zero external assets — original composition
let musicEnabled = true;
let musicNodes = [];
let musicScheduler = null;
let currentTheme = null;
let masterGain = null;
let reverbNode = null;

const SCALES = {
  minor:   [0,2,3,5,7,8,10],   // natural minor — dark, foreboding
  phrygian:[0,1,3,5,7,8,10],   // phrygian — very dark, oriental
  dim:     [0,3,6,9],           // diminished — tense
  battle:  [0,2,3,5,7,9,10]    // dorian — intense but melodic
};

const THEMES = {
  menu:   {tempo:72, root:36, scale:'phrygian', bass:true,  arp:true,  pad:true,  perc:false, vol:0.55},
  story:  {tempo:52, root:33, scale:'minor',    bass:true,  arp:false, pad:true,  perc:false, vol:0.45},
  fight:  {tempo:140,root:36, scale:'battle',   bass:true,  arp:true,  pad:false, perc:true,  vol:0.7 },
  boss:   {tempo:160,root:33, scale:'dim',      bass:true,  arp:true,  pad:true,  perc:true,  vol:0.75},
  partend:{tempo:60, root:40, scale:'minor',    bass:false, arp:false, pad:true,  perc:false, vol:0.4 },
};

function midiToHz(note){return 440*Math.pow(2,(note-69)/12);}

function createReverb(ctx){
  const convolver=ctx.createConvolver();
  const len=ctx.sampleRate*2.5;
  const buf=ctx.createBuffer(2,len,ctx.sampleRate);
  for(let c=0;c<2;c++){
    const d=buf.getChannelData(c);
    for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);
  }
  convolver.buffer=buf;
  return convolver;
}

function stopMusic(fadeTime=1.0){
  if(!AC||!masterGain)return;
  masterGain.gain.linearRampToValueAtTime(0,AC.currentTime+fadeTime);
  if(musicScheduler){clearInterval(musicScheduler);musicScheduler=null;}
  setTimeout(()=>{
    musicNodes.forEach(n=>{try{n.stop();}catch(e){}});
    musicNodes=[];
    currentTheme=null;
  },(fadeTime+0.1)*1000);
}

function playNote(freq, type, dur, vol, delay=0, detune=0){
  if(!AC||!masterGain||!musicEnabled)return;
  const t=AC.currentTime+delay;
  const o=AC.createOscillator();
  const g=AC.createGain();
  o.type=type;
  o.frequency.value=freq;
  o.detune.value=detune;
  o.connect(g);
  g.connect(reverbNode||masterGain);
  if(reverbNode)reverbNode.connect(masterGain);
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+0.01);
  g.gain.exponentialRampToValueAtTime(0.001,t+dur);
  o.start(t);
  o.stop(t+dur+0.05);
  musicNodes.push(o);
  // cleanup
  setTimeout(()=>{musicNodes=musicNodes.filter(x=>x!==o);},((delay+dur+0.1)*1000));
}

function playBass(root, scaleArr, beat, tempo){
  if(!AC||!musicEnabled)return;
  const step=60/tempo;
  const pattern=[0,0,4,0, 0,0,3,5]; // bass pattern index into scale
  for(let i=0;i<8;i++){
    const note=root+scaleArr[pattern[i]%scaleArr.length]-12;
    const freq=midiToHz(note);
    playNote(freq,'sawtooth',step*0.7,0.18,i*step*0.5);
    // sub octave
    playNote(freq/2,'sine',step*0.9,0.12,i*step*0.5);
  }
}

function playArp(root, scaleArr, beat, tempo, bright=false){
  if(!AC||!musicEnabled)return;
  const step=60/tempo/4; // sixteenth notes
  const notes=[0,2,4,7, 4,2,7,4, 0,4,7,12, 7,4,2,0];
  for(let i=0;i<16;i++){
    const idx=notes[i]%scaleArr.length;
    const oct=Math.floor(notes[i]/scaleArr.length)*12;
    const freq=midiToHz(root+scaleArr[idx]+oct+(bright?12:0));
    playNote(freq, bright?'triangle':'square', step*0.4, bright?0.06:0.04, i*step, (Math.random()-0.5)*8);
  }
}

function playPad(root, scaleArr, tempo){
  if(!AC||!musicEnabled)return;
  const dur=60/tempo*8;
  const chord=[0,2,4,7]; // minor 7th-ish voicing
  chord.forEach((interval,i)=>{
    const freq=midiToHz(root+scaleArr[interval%scaleArr.length]+12);
    playNote(freq,'sine',dur,0.07,i*0.04,(i%2===0?-6:6));
    // shimmer
    playNote(freq*1.003,'sine',dur,0.04,i*0.04+0.02);
  });
}

function playPerc(tempo){
  if(!AC||!musicEnabled)return;
  const step=60/tempo;
  // kick pattern
  const kicks=[1,0,0,1, 0,0,1,0];
  // snare on 2+4
  const snares=[0,0,1,0, 0,0,1,0];
  // hihat every 8th
  for(let i=0;i<8;i++){
    const t=i*step*0.5;
    if(kicks[i]){
      // kick — sine burst down
      const o=AC.createOscillator(),g=AC.createGain();
      o.type='sine';o.frequency.setValueAtTime(120,AC.currentTime+t);
      o.frequency.exponentialRampToValueAtTime(40,AC.currentTime+t+0.12);
      o.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.6,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.18);
      o.start(AC.currentTime+t);o.stop(AC.currentTime+t+0.2);
      musicNodes.push(o);
    }
    if(snares[i]){
      // snare — noise burst
      const bufSz=AC.sampleRate*0.12;
      const buf=AC.createBuffer(1,bufSz,AC.sampleRate);
      const d=buf.getChannelData(0);
      for(let j=0;j<bufSz;j++) d[j]=(Math.random()*2-1)*Math.pow(1-j/bufSz,1.5);
      const src=AC.createBufferSource(),g=AC.createGain();
      src.buffer=buf;
      const filt=AC.createBiquadFilter();
      filt.type='bandpass';filt.frequency.value=2000;filt.Q.value=0.8;
      src.connect(filt);filt.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.35,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.12);
      src.start(AC.currentTime+t);src.stop(AC.currentTime+t+0.14);
      musicNodes.push(src);
    }
    // hihat
    {
      const bufSz=AC.sampleRate*0.04;
      const buf=AC.createBuffer(1,bufSz,AC.sampleRate);
      const d=buf.getChannelData(0);
      for(let j=0;j<bufSz;j++) d[j]=(Math.random()*2-1)*Math.pow(1-j/bufSz,3);
      const src=AC.createBufferSource(),g=AC.createGain();
      src.buffer=buf;
      const filt=AC.createBiquadFilter();
      filt.type='highpass';filt.frequency.value=8000;
      src.connect(filt);filt.connect(g);g.connect(masterGain);
      g.gain.setValueAtTime(0.15,AC.currentTime+t);
      g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t+0.04);
      src.start(AC.currentTime+t);src.stop(AC.currentTime+t+0.05);
    }
  }
}

function startMusicTheme(themeName){
  if(!AC)return;
  if(currentTheme===themeName)return;
  stopMusic(0.6);
  if(!musicEnabled)return;
  setTimeout(()=>{
    if(!AC)return;
    currentTheme=themeName;
    const th=THEMES[themeName]||THEMES.menu;
    masterGain=AC.createGain();
    masterGain.gain.setValueAtTime(0,AC.currentTime);
    masterGain.gain.linearRampToValueAtTime(th.vol*settingsMusicVol,AC.currentTime+1.2);
    masterGain.connect(AC.destination);
    // reverb
    reverbNode=createReverb(AC);
    const reverbGain=AC.createGain();
    reverbGain.gain.value=themeName==='fight'||themeName==='boss'?0.15:0.35;
    reverbNode.connect(reverbGain);
    reverbGain.connect(masterGain);

    const barDur=(60/th.tempo)*8; // 2 bars of 4/4
    let beat=0;
    function scheduleBeat(){
      if(!masterGain||!musicEnabled)return;
      const sc=SCALES[th.scale];
      if(th.bass) playBass(th.root,sc,beat,th.tempo);
      if(th.arp)  playArp(th.root,sc,beat,th.tempo,themeName==='boss');
      if(th.pad)  playPad(th.root,sc,th.tempo);
      if(th.perc) playPerc(th.tempo);
      beat++;
    }
    scheduleBeat();
    musicScheduler=setInterval(scheduleBeat, barDur*1000);
  },650);
}

function toggleMusic(){
  musicEnabled=!musicEnabled;
  const btn=document.getElementById('music-toggle');
  if(!musicEnabled){
    stopMusic(0.4);
    if(btn){btn.innerText='🎵 OFF';btn.style.opacity='0.4';}
  } else {
    if(btn){btn.innerText='🎵 ON';btn.style.opacity='1';}
    // restart appropriate theme
    if(gameState==='fight'||gameState==='post'){
      const isBoss=[3,6,8,10,11,13,14].includes(fType);
      startMusicTheme(isBoss?'boss':'fight');
    } else if(gameState==='story'){
      startMusicTheme('story');
    } else {
      startMusicTheme('menu');
    }
  }
}

// Music toggle button
(function createMusicToggle(){
  const btn=document.createElement('button');
  btn.id='music-toggle';
  btn.innerText='🎵 ON';
  btn.style.cssText=`position:fixed;bottom:16px;right:16px;z-index:200;
    background:rgba(0,0,0,0.75);border:1px solid rgba(200,147,26,0.4);
    color:rgba(200,160,70,0.85);font-family:'Cinzel',serif;font-size:10px;
    letter-spacing:2px;padding:7px 14px;border-radius:3px;cursor:pointer;
    pointer-events:auto;transition:all 0.2s;backdrop-filter:blur(4px);`;
  btn.onclick=toggleMusic;
  document.body.appendChild(btn);
})();


// ── EXTERNAL BG AUDIO ──
// ── EXTERNAL AUDIO ──
// Place bg.mp3 and bossbg.mp3 in the same folder as this HTML.
const bgAudio = new Audio('bg.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.6;

const bossBgAudio = new Audio('bossbg.mp3');
bossBgAudio.loop = true;
bossBgAudio.volume = 0.75;

let bgAudioStarted = false;
let activeBgTrack = 'bg'; // 'bg' or 'boss'

function _fadeAudio(fromAudio, toAudio, duration=800){
  const steps=20, interval=duration/steps;
  const startVol=fromAudio.volume;
  let step=0;
  const t=setInterval(()=>{
    step++;
    fromAudio.volume=Math.max(0,startVol*(1-step/steps));
    if(step>=steps){
      clearInterval(t);
      fromAudio.pause();
      fromAudio.volume=startVol;
    }
  },interval);
  toAudio.currentTime=0;
  toAudio.volume=0;
  toAudio.play().catch(()=>{});
  let step2=0;
  const targetVol=toAudio===bossBgAudio?0.75*settingsMusicVol:0.6*settingsMusicVol;
  const t2=setInterval(()=>{
    step2++;
    toAudio.volume=Math.min(targetVol,targetVol*(step2/steps));
    if(step2>=steps)clearInterval(t2);
  },interval);
}

function startBgAudio(){
  if(bgAudioStarted) return;
  bgAudioStarted=true;
  bgAudio.volume=0.6*settingsMusicVol;
  bgAudio.play().catch(()=>{});
  activeBgTrack='bg';
}

function switchToBossBg(){
  if(activeBgTrack==='boss')return;
  activeBgTrack='boss';
  _fadeAudio(bgAudio, bossBgAudio);
}

function switchToNormalBg(){
  if(activeBgTrack==='bg')return;
  activeBgTrack='bg';
  _fadeAudio(bossBgAudio, bgAudio);
}

function setBgVolume(v){
  bgAudio.volume=Math.max(0,Math.min(1,v*settingsMusicVol));
  bossBgAudio.volume=Math.max(0,Math.min(1,(v*1.25)*settingsMusicVol));
}
function pauseBgAudio(){ bgAudio.pause(); bossBgAudio.pause(); }
function resumeBgAudio(){
  if(!bgAudioStarted)return;
  if(activeBgTrack==='boss') bossBgAudio.play().catch(()=>{});
  else bgAudio.play().catch(()=>{});
}

// Music toggle controls the external bg audio
function toggleMusic(){
  musicEnabled = !musicEnabled;
  const btn = document.getElementById('music-toggle');
  if(!musicEnabled){
    stopMusic(0.4);
    pauseBgAudio();
    if(btn){ btn.innerText='🎵 OFF'; btn.style.opacity='0.4'; }
  } else {
    const isBoss=[3,6,8,10,11,13,14].includes(fType);
    if(gameState==='fight'||gameState==='post') startMusicTheme(isBoss?'boss':'fight');
    else if(gameState==='story') startMusicTheme('story');
    else startMusicTheme('menu');
    resumeBgAudio();
    if(btn){ btn.innerText='🎵 ON'; btn.style.opacity='1'; }
  }
}

// VO stubs (removed)
function stopVO(){}
function speakVO(){}

// ── CANVAS ──
