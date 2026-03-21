// ── FIGHTER ──
class Fighter{
  constructor(x,isP,type=1){
    this.scale=isP?1.6:1.6;
    if(type===2)this.scale=1.65;
    if(type===3)this.scale=1.9;
    if(type===4)this.scale=1.55;
    if(type===5)this.scale=1.7;
    if(type===6)this.scale=1.75;
    if(type===7)this.scale=1.5;
    if(type===8)this.scale=1.8;
    if(type===9)this.scale=1.6;
    if(type===10)this.scale=1.85; // BURDEN - heavy
    if(type===11)this.scale=1.6; // CONTROLLED - erratic
    if(type===12)this.scale=1.65; // EVOLVED SHADOW
    if(type===13)this.scale=2.0; // SYNC WAVE boss — imposing
    if(type===14)this.scale=1.75; // REWRITE PROTOCOL — refined, overdrive
    if(type===15)this.scale=1.7;  // MEMORY ERASURE — flicker-fast, unstable
    if(type===16)this.scale=1.55; // INTERFERENCE WAVE — swarm, fast small
    if(type===17)this.scale=1.65; // PRESSURE WAVE — relentless elite
    if(type===18)this.scale=1.8;  // THE DELAY — sub boss, mirror of Chug
    if(type===19)this.scale=1.7;  // FINAL INTERFERENCE — max chaos boss
    if(type===20)this.scale=1.85; // FINAL HOST — ultimate boss
    this.baseW=40;this.baseH=100;
    this.x=x;this.y=GND;this.w=this.baseW*this.scale;this.h=this.baseH*this.scale;
    this.isP=isP;this.type=type;

    let mhp=100,sp=5.5,dm=8;
    if(type===2){mhp=120;sp=7.5;dm=12;}
    if(type===3){mhp=180;sp=5.5;dm=16;}
    if(type===4){mhp=110;sp=8.5;dm=10;}
    if(type===5){mhp=140;sp=6.5;dm=14;}
    if(type===6){mhp=200;sp=7.5;dm=15;}
    if(type===7){mhp=140;sp=9.5;dm=11;}
    if(type===8){mhp=200;sp=7.5;dm=17;}
    if(type===9){mhp=230;sp=8.5;dm=15;}
    if(type===10){mhp=260;sp=4.5;dm=22;} // Burden — slow+heavy
    if(type===11){mhp=200;sp=11;dm=14;} // Controlled — erratic fast+glitchy
    if(type===12){mhp=175;sp=10;dm=13;} // Evolved Shadow — precise, coordinated
    if(type===13){mhp=290;sp=9;dm=20;} // Sync Wave — elite final wave, Part 6 boss
    if(type===14){mhp=320;sp=12;dm=18;} // Rewrite Protocol — fastest+hardest, Part 7 boss
    if(type===15){mhp=280;sp=13;dm=16;} // Memory Erasure — erratic, glitch-teleport, Part 8
    if(type===16){mhp=160;sp=12;dm=13;} // Interference Wave — fast swarm fighter
    if(type===17){mhp=220;sp=11;dm=17;} // Pressure Wave — relentless elite
    if(type===18){mhp=340;sp=13;dm=19;} // The Delay — sub boss, mirrors Chug
    if(type===19){mhp=300;sp=14;dm=17;} // Final Interference — max chaos, Part 9 final
    if(type===20){mhp=420;sp=15;dm=22;} // Final Host — ultimate boss, Part 10

    if(isP){
      mhp=150;sp=7.5;dm=10;
      // Weapons
      if(weapon==='knuckle'){dm+=6;}
      if(weapon==='dagger'){dm+=8;sp+=2;}
      if(weapon==='katana'){dm+=11;sp+=1;}
      if(weapon==='staff'){dm+=7;sp+=0.5;}
      
      if(weapon==='scythe'){dm+=14;sp-=1;}
      if(weapon==='claws'){dm+=7;sp+=2.5;}
      if(weapon==='hammer'){dm+=13;sp-=0.5;}
      // Armor
      if(armor==='lightarmor'){mhp+=25;}
      if(armor==='heavyarmor'){mhp+=50;sp-=0.8;}
      if(armor==='voidarmor'){mhp+=70;sp-=0.5;}
      // Upgrades
      dm+=strengthUpg===1?5:(strengthUpg>=2?15:0);
      sp+=speedUpg===1?2:(speedUpg>=2?4:0);
      mhp+=enduranceUpg===1?30:(enduranceUpg>=2?70:0);
    }
    this.maxHp=mhp;this.hp=mhp;this.spd=sp;this.dmg=dm;
    this.defense=isP?(armor==='lightarmor'?3:armor==='heavyarmor'?6:armor==='voidarmor'?9:0):0;
    this.absorption=isP&&armor==='voidarmor'?0.1:0;
    this.rageTier=isP&&rageMode2?2:1;
    this.enduranceRegen=isP&&enduranceUpg>=1;
    this.vx=0;this.vy=0;this.dir=isP?1:-1;
    this.state='idle';this.atkT=0;this.hitT=0;
    this.rage=0;this.rageActive=false;
    this.stamina=100;this.maxStam=100;
    this.combo=0;this.cWin=0;this.atkType='p';this.hitF=0;
    this.rotation=0;this.landAnim=0;
    this.grabber=null;
    this.grabHits=0; // tracks how many times grabbed in current grab_exec
    // shadow effect vars
    this.trailX=[];this.trailY=[];
  }
  get raging(){return this.isP&&this.rageActive;}

  update(en){
    const wasAir=this.y<GND-0.5;

    // Trail
    if(this.isP&&(this.raging||this.state==='run')){
      this.trailX.unshift(this.x+this.w/2);
      this.trailY.unshift(this.y-this.h/2);
      if(this.trailX.length>6){this.trailX.pop();this.trailY.pop();}
    } else {this.trailX=[];this.trailY=[];}

    // Weapon swing trail during attack
    if(this.isP&&this.state==='atk'&&weapon!=='none'){
      const wx=this.x+this.w/2+(this.dir===1?this.w*0.5:-this.w*0.3);
      const wy=this.y-this.h*0.55;
      const swingCol={knuckle:'rgba(255,180,50,0.5)',dagger:'rgba(100,200,255,0.4)',
        katana:'rgba(255,255,200,0.6)',staff:'rgba(200,147,26,0.4)',
        scythe:'rgba(150,100,255,0.5)',
        claws:'rgba(180,180,255,0.45)',hammer:'rgba(255,120,0,0.4)'}[weapon]||'rgba(255,255,255,0.3)';
      if(Math.random()>0.4){
        particles.push({x:wx+(Math.random()-.5)*20,y:wy+(Math.random()-.5)*30,
          vx:this.dir*(Math.random()*4+1),vy:-Math.random()*3,
          life:0.5+Math.random()*0.3,col:swingCol,w:Math.random()*16+8,tp:'s'});
      }
    }

    if(this.isP){
      if(K.rage&&this.rage>=100&&!this.rageActive){
        this.rageActive=true;setEnvRage(true);beep(60,'sawtooth',0.6,0.12);
        screenShake=18;doFlash();
        shadowSlash(this.x+this.w/2,this.y,this.dir,'#ff4400');
      }
      if(this.rageActive){
        this.rage-=0.15;
        if(this.rage<=0){this.rage=0;this.rageActive=false;setEnvRage(false);}
      }
      // Stamina regen
      if(this.state!=='atk'&&this.stamina<this.maxStam)this.stamina=Math.min(this.maxStam,this.stamina+0.4);
      updateHUD();
    }

    if(this.hp<=0){
      if(this.state==='grabbed')return;
      // Fall to ground with friction, no flying
      this.vx*=0.85;
      if(this.y<GND){
        this.vy+=1.2;
        this.rotation+=0.06*this.dir;
        // Clamp Y — never disappear off top
        if(this.y<H*0.1){this.y=H*0.1;this.vy=Math.max(0,this.vy);}
      }
      this.x=Math.max(10,Math.min(this.x+this.vx,W-this.w-10));
      this.y=Math.min(this.y+this.vy,GND);
      if(this.y>=GND){this.y=GND;this.vy=0;this.vx=0;this.rotation=Math.PI/2*-this.dir;}
      return;
    }

    // grab_exec
    if(this.state==='grab_exec'){
      this.vx=0;this.vy=0;
      this.atkT--;
      let t=60-this.atkT;

      // ── DOUBLE GRAB: Press GRAB again during swing to do second slam ──
      if(this.isP&&K.g&&t>=20&&t<38&&this.grabHits===0&&this.atkT>10){
        // Reset swing for second slam
        this.grabHits=1;
        this.atkT=50; // restart swing timer
        K.g=0;
        beep(120,'sawtooth',0.2,0.08);
      }

      // ── THROW: Press THROW during hold phase to launch enemy forward ──
      if(this.isP&&K.t&&t>38&&this.atkT>0){
        // Launch enemy as a throw projectile forward
        en.state='hit';en.hitT=30;
        en.vx=this.dir*18;en.vy=-5;en.rotation=0;
        let throwDmg=this.dmg*1.8;
        if(this.raging)throwDmg*=(this.rageTier===2?1.9:1.5);
        let finalThrowDmg=Math.max(1,throwDmg-(en.defense||0));
        if(en.absorption)finalThrowDmg*=(1-en.absorption);
        en.hp=Math.max(0,en.hp-finalThrowDmg);
        floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h,t:Math.floor(finalThrowDmg),life:1,vy:-2.5,col:'#ff5500',size:30});
        shadowSlash(en.x+en.w/2,en.y-en.h*0.5,this.dir,'rgba(255,120,0,0.9)');
        bloodSplatter(en.x+en.w/2,en.y,this.dir,true);
        for(let i=0;i<18;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*16,vy:-Math.random()*5,life:1,w:Math.random()*14+6,col:'rgba(255,160,60,0.3)'});
        screenShake=18;doFlash();beep(80,'sawtooth',0.4,0.15);
        if(this.isP&&!this.rageActive)this.rage=Math.min(100,this.rage+40);
        this.state='idle';this.atkT=0;this.grabHits=0;
        K.t=0;
        if(en.hp<=0){checkRound();return;}
        return;
      }

      // Normal grab_exec spin animation
      if(t<40){
        let progress=t/40;
        let curAngle=(this.dir===1?0:Math.PI)+(this.dir===1?Math.PI:-Math.PI)*progress;
        let radius=100*this.scale;
        en.x=this.x+this.w/2+Math.cos(curAngle)*radius-en.w/2;
        en.y=this.y-30*this.scale-Math.sin(curAngle)*radius;
        en.rotation=progress*Math.PI*1.5*-this.dir;
      } else {
        en.x=this.x+this.w/2-this.dir*100*this.scale-en.w/2;
        en.y=GND-5;
        en.rotation=Math.PI/2*-this.dir;
      }
      en.x=Math.max(10,Math.min(en.x,W-en.w-10));
      if(t===40){
        screenShake=22;
        let d=this.dmg*2.5;
        if(this.raging)d*=(this.rageTier===2?1.9:1.5);
        let finalDmg=Math.max(1,d-(en.defense||0));
        if(en.absorption)finalDmg*=(1-en.absorption);
        en.hp=Math.max(0,en.hp-finalDmg);
        floatingTexts.push({x:en.x+en.w/2,y:en.y-en.h,t:Math.floor(finalDmg),life:1,vy:-2.5,col:this.isP?'#ff003c':'#fff',size:28});
        bloodSplatter(en.x+en.w/2,GND,-this.dir,true);
        shadowSlash(en.x+en.w/2,GND,this.dir,'#660000');
        for(let i=0;i<22;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*14,vy:-Math.random()*6,life:1,w:Math.random()*16+8,col:'rgba(180,180,180,0.25)'});
        beep(90,'sawtooth',0.35,0.18);
        if(en.hp<=0){this.grabHits=0;checkRound();return;}
        if(this.isP&&!this.rageActive){this.rage=Math.min(100,this.rage+35);}
      }
      if(this.atkT<=0){
        this.grabHits=0;
        this.state='idle';
        if(en.hp>0){en.state='hit';en.hitT=20;en.vx=-this.dir*10;en.vy=-2;}
        else{en.state='idle';}
      }
      return;
    }

    if(this.state==='grabbed'){this.vx=0;this.vy=0;return;}

    if(this.y>=GND)this.vy=0;
    const landed=wasAir&&this.y>=GND;
    if(landed){
      this.landAnim=12;
      for(let i=0;i<12;i++)landDust.push({x:this.x+this.w/2,y:this.y-3,vx:(Math.random()-.5)*7,vy:-Math.random()*2.5,life:0.9,w:Math.random()*14+6,col:'rgba(140,140,140,0.3)'});
      beep(120,'sine',0.06,0.04);
    }
    if(this.landAnim>0)this.landAnim--;

    if(this.state!=='grabbed'&&this.hp>0&&this.hitT<=0){this.rotation=0;}
    if(this.hitT>0){this.hitT--;this.vx*=0.83;if(this.y<GND)this.rotation+=0.15*this.dir;}
    else if(this.atkT>0){
      this.atkT--;this.vx*=0.78;
      if(this.atkT===this.hitF){
        let reach=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19)?115*this.scale:78*this.scale;
        if(this.atkType==='k')reach+=32*this.scale;
        if(this.atkType==='slam')reach+=58*this.scale;
        if(this.atkType==='throw')reach+=20*this.scale;
        if(this.combo>=3)reach+=38*this.scale;
        if(this.raging)reach+=28*this.scale;
        if(this.isP&&weapon==='dagger')reach+=22*this.scale;
        if(this.isP&&weapon==='katana')reach+=40*this.scale;
        if(this.isP&&weapon==='staff'){reach+=55*this.scale;}
        
        if(this.isP&&weapon==='scythe')reach+=90*this.scale;
        if(this.isP&&weapon==='claws')reach+=18*this.scale;
        if(this.isP&&weapon==='hammer')reach+=45*this.scale;

        // Staff always hits at head height
        const staffHeadY=this.isP&&weapon==='staff'?this.y-this.h*0.85:null;
        const airAttack=this.isP&&this.y<GND-20;
        const hx=this.dir===1?this.x+this.w:this.x-reach;
        const hy=staffHeadY!==null?staffHeadY:
          airAttack?(this.y-this.h*0.3): // aerial - hit center mass
          (this.y-(this.atkType==='k'?(this.combo>=3?80:30):(this.atkType==='slam'?35:(this.atkType==='throw'?40:60)))*this.scale);
        // Aerial attack: wider vertical hit window
        const enTop=airAttack?(en.y-en.h*1.2):en.y-en.h;
        if(hx<en.x+en.w&&hx+reach>en.x&&hy<en.y&&this.y>enTop){
          let d=this.dmg,heavy=false;
          // Jump attack bonus
          if(this.isP&&this.y<GND-20){d*=1.4;heavy=true;screenShake=8;}
          if(this.atkType==='k'){d*=1.3;heavy=true;}
          if(this.atkType==='slam'){d*=2.1;heavy=true;screenShake=15;}
          if(this.atkType==='throw'){d*=1.7;heavy=true;en.vy=-6;en.vx=this.dir*14;}
          if(this.combo>=3&&this.atkType!=='slam'&&this.atkType!=='throw'){d*=1.85;heavy=true;}
          if(this.raging)d*=(this.rageTier===2?1.9:1.5);
          // Claws do double hit
          if(this.isP&&weapon==='claws'){
            en.takeHit(d*0.55,this.dir,false);
            setTimeout(()=>{if(en&&en.hp>0)en.takeHit(d*0.55,this.dir,false);},60);
          } else {
            en.takeHit(d,this.dir,heavy);
          }
          // Shadow slash FX on hit
          shadowSlash(en.x+en.w/2,en.y-en.h*0.5,this.dir,this.isP?'rgba(255,80,80,0.5)':'rgba(200,200,200,0.3)',heavy);
          if(this.isP)weaponImpactFX(en.x+en.w/2,en.y,this.dir,weapon,heavy);
          if(this.isP){
            // Combo tracking
            const now=Date.now();
            if(now-lastComboTime<2200){comboCount++;}else{comboCount=1;}
            lastComboTime=now;
            showCombo(comboCount);
          }
          if(this.atkType==='slam'){for(let i=0;i<16;i++)landDust.push({x:en.x+en.w/2,y:GND-3,vx:(Math.random()-.5)*10,vy:-Math.random()*3.5,life:1,w:Math.random()*15+8,col:'rgba(160,160,160,0.22)'});}
          if(this.isP&&!this.rageActive){this.rage=Math.min(100,this.rage+(this.atkType==='k'?28:this.atkType==='slam'?36:this.atkType==='throw'?30:18));}
        }
      }
    } else {
      this.cWin>0?this.cWin--:this.combo=0;
      if(this.isP){
        if(K.l){this.vx=-this.spd;this.dir=-1;this.state='run';}
        else if(K.r){this.vx=this.spd;this.dir=1;this.state='run';}
        else{this.vx=0;this.state='idle';}
        if(K.j&&this.y>=GND-0.5){this.vy=-18;this.state='jump';beep(280,'sine',0.1);}

        // ── JUMP ATTACK: Punch or Kick while airborne ──
        const isAirborne=this.y<GND-20;
        if(isAirborne&&this.atkT<=0){
          if(K.k&&this.stamina>=12){
            this.stamina=Math.max(0,this.stamina-12);
            this.vy=Math.max(this.vy,6); // push downward
            this.attack('k');
            shadowSlash(this.x+this.w/2,this.y,this.dir,'rgba(0,200,220,0.7)');
          } else if(K.a&&this.stamina>=8){
            this.stamina=Math.max(0,this.stamina-8);
            this.attack('p');
          }
        }

        let fwdPunch=(K.a&&((this.dir===1&&K.r)||(this.dir===-1&&K.l)));
        let tryGrab=K.g||fwdPunch;
        let inGrabRange=Math.abs((this.x+this.w/2)-(en.x+en.w/2))<115*Math.max(this.scale,en.scale)
          &&en.y>=GND-1&&en.hitT<=0&&en.state!=='grabbed'&&en.state!=='grab_exec'&&en.state!=='hit';

        // THROW button — quick grab-and-launch without full swing
        if(K.t&&inGrabRange){
          this.state='grab_exec';this.atkT=45;this.grabHits=99; // 99 = skip second-slam prompt, go straight to throw window
          en.state='grabbed';en.hitT=45;en.grabber=this;en.vx=0;en.vy=0;
          K.t=0;
          beep(200,'sawtooth',0.15,0.07);
        } else if(tryGrab&&inGrabRange){
          this.state='grab_exec';this.atkT=60;this.grabHits=0;en.state='grabbed';en.hitT=60;en.grabber=this;en.vx=0;en.vy=0;
          if(K.g)K.g=0;
        } else if(K.g||(K.a&&K.k)){
          this.attack('slam');if(K.g)K.g=0;K.a=0;K.k=0;
        } else if(K.a){
          if(this.stamina>=8){this.stamina=Math.max(0,this.stamina-8);this.attack('p');}
        } else if(K.k){
          if(this.stamina>=12){this.stamina=Math.max(0,this.stamina-12);this.attack('k');}
        }
      } else {
        const dist=this.x-en.x;this.dir=dist>0?-1:1;
        const abs=Math.abs(dist),rng=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19)?130*this.scale:88*this.scale;
        if(abs>rng){this.vx=this.dir*this.spd;this.state='run';}
        else{
          this.vx=0;this.state='idle';
          let ag=0.04;
          if(this.type===2)ag=0.08;if(this.type===3)ag=0.06;if(this.type===4)ag=0.13;
          if(this.type===5)ag=0.07;if(this.type===6)ag=0.09;if(this.type===7)ag=0.15;
          if(this.type===8)ag=0.10;if(this.type===9)ag=0.14;if(this.type===10)ag=0.055;
          if(this.type===11)ag=0.18; // erratic — very aggressive but sometimes freezes
          if(this.type===12)ag=0.13; // evolved — methodical, punishes mistakes
          if(this.type===13)ag=0.16; // sync wave — relentless boss
          if(this.type===14)ag=0.20; // rewrite — max aggression, perfect timing
          if(this.type===15)ag=0.22; // memory erasure — chaotic bursts
          if(this.type===16)ag=0.18; // interference wave — fast unpredictable
          if(this.type===17)ag=0.20; // pressure wave — relentless
          if(this.type===18)ag=0.24; // the delay — mirrors and counters
          if(this.type===19)ag=0.26; // final interference — max aggression
          if(this.type===20)ag=0.30; // final host — perfect timing, reads everything
          if(this.type===8||this.type===9||this.type===11||this.type===12||this.type===16||this.type===19){
            if(en.state==='atk'&&Math.random()<0.22){this.vy=-14;this.state='jump';}
          }
          let inGrabRange=abs<115*Math.max(this.scale,en.scale)&&en.y>=GND-1
            &&en.state!=='grabbed'&&en.state!=='grab_exec'&&en.state!=='hit';
          if(Math.random()<0.022&&inGrabRange){
            this.state='grab_exec';this.atkT=60;en.state='grabbed';en.hitT=60;en.grabber=this;en.vx=0;en.vy=0;
          } else if(Math.random()<0.02&&abs<135){
            this.attack('slam');
          } else if(Math.random()<ag){
            this.attack(Math.random()>.38?'p':'k');
          }
        }
      }
    }
    if(this.y<GND){
      // Stronger gravity when high up — pulls fighters back down faster
      const heightFactor=Math.max(1,(GND-this.y)/200);
      this.vy+=0.9*heightFactor;
      this.state='jump';
      // Hard ceiling — never go above top 10% of screen
      if(this.y<H*0.1){this.y=H*0.1;this.vy=Math.max(0,this.vy);}
    }
    const cs=this.raging?this.vx*1.5:this.vx;
    this.x=Math.max(10,Math.min(this.x+cs,W-this.w-10));
    this.y=Math.min(this.y+this.vy,GND);
    // Hard floor clamp
    if(this.y>=GND){this.y=GND;this.vy=0;}
    if(this.raging&&this.hp>0){for(let i=0;i<3;i++)fireAt(this.x,this.y,cs);}
  }

  attack(type){
    if(this.atkT>6)return;
    this.atkType=type;this.state='atk';
    this.combo++;if(this.combo>4)this.combo=1;
    let spdMod=1;
    if(this.isP&&weapon==='dagger')spdMod=0.72;
    if(this.isP&&weapon==='claws')spdMod=0.68;
    if(this.isP&&weapon==='scythe')spdMod=1.3;
    if(this.isP&&weapon==='hammer')spdMod=1.2;
    if(this.isP&&speedUpg>=2)spdMod*=0.82;
    else if(this.isP&&speedUpg>=1)spdMod*=0.9;
    if(!this.isP&&(this.type===4||this.type===7))spdMod=0.68;
    if(!this.isP&&this.type===9)spdMod=0.72;
    if(!this.isP&&this.type===10)spdMod=1.4; // Burden very slow
    if(!this.isP&&this.type===11)spdMod=Math.random()<0.15?2.0:0.65; // Controlled — erratic burst or freeze
    if(!this.isP&&this.type===12)spdMod=0.78; // Evolved — measured, clean
    if(!this.isP&&this.type===13)spdMod=0.85; // Sync Wave — steady powerful
    if(!this.isP&&this.type===14)spdMod=0.72; // Rewrite — fast clean attacks
    if(!this.isP&&this.type===15)spdMod=Math.random()<0.2?2.2:0.7; // Memory Erasure — random burst
    if(!this.isP&&this.type===16)spdMod=0.65; // Interference Wave — very fast
    if(!this.isP&&this.type===17)spdMod=0.78; // Pressure Wave — steady relentless
    if(!this.isP&&this.type===18)spdMod=0.70; // The Delay — precise counters
    if(!this.isP&&this.type===19)spdMod=Math.random()<0.25?2.0:0.68; // Final Interference — chaos
    if(!this.isP&&this.type===20)spdMod=0.62; // Final Host — precise, relentless
    if(type==='slam'){
      this.atkT=Math.floor(26*spdMod);this.hitF=12;this.cWin=36;
      beep(this.isP?170:110,'sawtooth',0.24,0.09);return;
    }
    if(type==='throw'){
      this.atkT=Math.floor(22*spdMod);this.hitF=10;this.cWin=34;
      beep(this.isP?130:95,'triangle',0.22,0.08);return;
    }
    if(type==='p'){
      this.atkT=Math.floor((this.raging?9:15)*spdMod);if(this.combo===4)this.atkT+=6;
      this.hitF=Math.floor(this.atkT/2);this.cWin=25;
      beep(this.isP?380+this.combo*110:190,'triangle',0.1,0.05);
    } else {
      this.atkT=Math.floor((this.raging?13:19)*spdMod);if(this.combo===4)this.atkT+=8;
      this.hitF=Math.floor(this.atkT/2)+2;this.cWin=25;
      beep(this.isP?280+this.combo*55:140,'sawtooth',0.15,0.06);
    }
  }

  takeHit(dmg,fd,heavy=false){
    if(this.hp<=0)return;
    let finalDmg=Math.max(1,dmg-(this.defense||0));
    if(this.absorption)finalDmg*=(1-this.absorption);
    if(this.raging&&this.rageTier===2)finalDmg*=0.72;
    if(this.isP&&enduranceUpg>=2)finalDmg*=0.85;
    this.hp=Math.max(0,this.hp-finalDmg);
    this.hitT=heavy?18:11;this.state='hit';
    // Boss types have heavy weight — reduced knockback
    const isBossType=[3,6,8,10,13,14,15,18,19,20].includes(this.type);
    const hKnock=isBossType?4:11;
    this.vx=fd*(isBossType?3:hKnock);
    // Bosses NEVER fly up — stay grounded
    this.vy=isBossType?-2:(heavy?-6:-3);
    if(heavy&&!isBossType){this.vx*=1.3;}
    this.combo=0;this.cWin=0;
    const airborne=(this.y<GND-4);
    hitStop=airborne?0:(heavy?10:4);
    if(settingsShake)screenShake=heavy?14:5;
    if(heavy&&!airborne)doFlash();
    beep(heavy?65:90,'sawtooth',heavy?0.25:0.18,0.1*settingsSfxVol);
    if(heavy)beep(180,'sine',0.08,0.06*settingsSfxVol);
    bloodSplatter(this.x+this.w/2,this.y,fd,heavy);
    const dmgSize=finalDmg>=30?34:finalDmg>=20?28:finalDmg>=10?24:20;
    floatingTexts.push({x:this.x+this.w/2+(Math.random()-.5)*20,y:this.y-this.h-10,
      t:Math.floor(finalDmg),life:1,vy:-3,col:this.isP?varRed():'#fff',size:dmgSize});
    updateHUD();if(this.hp<=0)checkRound();
  }

  draw(c,ghost=false){
    c.globalAlpha=1;c.shadowBlur=0;c.shadowColor='transparent';
    if(isNaN(this.x)||isNaN(this.y))return;
    const T=Date.now();

    // Draw trail
    if(this.trailX.length>1&&!ghost){
      for(let i=1;i<this.trailX.length;i++){
        const a=(1-i/this.trailX.length)*0.18;
        c.globalAlpha=a;
        c.fillStyle=this.raging?'#ff3300':'#000033';
        c.fillRect(this.trailX[i]-this.w/2,this.trailY[i]-this.h/2,this.w,this.h);
      }
      c.globalAlpha=1;
    }
    // Attack motion blur — ghost image slightly behind
    if(this.isP&&this.state==='atk'&&this.atkT<this.hitF+2&&!ghost){
      c.globalAlpha=0.15;
      c.save();c.translate(this.x+this.w/2-this.dir*8,this.y);
      c.scale(this.dir*this.scale,this.scale);
      c.fillStyle=this.raging?'rgba(255,100,0,0.4)':'rgba(255,255,255,0.15)';
      c.fillRect(-this.baseW/2,-this.baseH,this.baseW,this.baseH);
      c.restore();c.globalAlpha=1;
    }

    let bob=(this.state==='run'||this.state==='idle')?Math.sin(T/100)*2:0;
    if(this.state==='jump')bob=-4;
    if(this.landAnim>0)bob=Math.sin(this.landAnim/12*Math.PI)*-6;

    let bodyCol='#0a0a0a';
    let clothCol=this.isP?'#141014':'#1a1a1a';
    let wrapCol=this.isP?'#e8e0d0':'#cccccc';
    let accentCol=this.isP?'#cc0020':(this.type===9?'#9900dd':this.type===15?'#cc0088':'#333333');

    if(this.hitT>0){bodyCol='#ffffff';clothCol='#ffffff';wrapCol='#ffffff';accentCol='#ffffff';}
    else if(this.raging&&!ghost){bodyCol='#1a0000';clothCol='#380008';wrapCol='#ff8866';accentCol='#ff4400';}
    // Player-specific outfit color upgrades
    else if(this.isP&&!ghost){
      if(armor==='heavyarmor'){clothCol='#282020';bodyCol='#0a0808';}
      if(armor==='lightarmor'){clothCol='#101820';bodyCol='#080808';}
      if(armor==='voidarmor'){clothCol='#100c18';bodyCol='#080808';}
    }

    const breathe=Math.sin(T/200)*1.5;
    c.save();
    c.translate(this.x+this.w/2,this.y);
    if(this.rotation)c.rotate(this.rotation);

    let sqX=1,sqY=1;
    if(this.state==='jump'){sqX=0.86;sqY=1.16;}
    if(this.state==='hit'){sqX=1.22;sqY=0.78;}
    if(this.landAnim>0){const p=this.landAnim/12;sqX=1+p*0.28;sqY=1-p*0.22;}

    c.scale(this.dir*sqX*this.scale,sqY*this.scale);

    if(this.raging&&!ghost){c.shadowColor='#ff4400';c.shadowBlur=14;}
    // Boss glow
    if((this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14)&&!ghost){
      c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=25;
    }
    c.lineCap='round';c.lineJoin='round';

    let isBoss=(this.type===3||this.type===6||this.type===8||this.type===10||this.type===13||this.type===14||this.type===15||this.type===18||this.type===19||this.type===20);
    let tW=isBoss?36:30;
    let wW=isBoss?18:14;
    let aW=isBoss?13:11;
    let lW=isBoss?15:12;
    let jR=isBoss?8:6;
    let hR=isBoss?14:11;

    let headY=-this.baseH+15+bob+breathe*0.3;
    let shoulderY=-this.baseH+32+bob;
    let waistY=-this.baseH*0.55+bob;

    let leanX=(this.state==='atk'&&this.atkType==='k')?-8:
      (this.state==='atk'&&this.atkType==='slam')?-14:
      (this.state==='atk'&&this.atkType==='throw')?10:2;
    let leftShoulderX=-tW/2+leanX;
    let rightShoulderX=tW/2+leanX+breathe;
    let wind=-this.vx*3;
    let tailBob=(this.state==='run'||this.state==='jump')?Math.sin(T/50)*14:Math.sin(T/160)*4;

    // Boss aura — subtle color tint only, no circles
    if(isBoss&&!ghost){
      c.shadowBlur=0;
    }

    // Declare all limb vars
    let bHandX,bHandY,bElbowX,bElbowY;
    let fHandX,fHandY,fElbowX,fElbowY;
    let bFootX,bFootY,bKneeX,bKneeY;
    let fFootX,fFootY,fKneeX,fKneeY;

    // Feet
    if(this.state==='grab_exec'){
      let t=60-this.atkT;
      let progress=Math.min(1,t/40);
      bFootX=-10+Math.sin(progress*Math.PI)*5;bFootY=0;bKneeX=-18;bKneeY=-26;
      fFootX=20+Math.sin(progress*Math.PI)*15;fFootY=0;fKneeX=14;fKneeY=-20;
    } else if(this.state==='atk'&&this.atkType==='slam'){
      bFootX=-10;bFootY=0;bKneeX=-18;bKneeY=-26;
      fFootX=32;fFootY=0;fKneeX=18;fKneeY=-18;
    } else if(this.state==='atk'&&this.atkType==='k'){
      const ke=this.atkT<this.hitF+4?(this.combo===3?85:60):30;
      bFootX=-12;bFootY=0;bKneeX=-15;bKneeY=-25;
      let kEndX=ke,kEndY=waistY+25;
      if(this.combo===1)kEndY=waistY+35;
      if(this.combo===2)kEndY=-15;
      if(this.combo===3)kEndY=-this.baseH+20;
      fFootX=kEndX;fFootY=kEndY;fKneeX=kEndX/2;fKneeY=kEndY+15;
    } else {
      let runBob=this.state==='run'?Math.sin(T/80)*24:0;
      bFootX=-12-runBob;bFootY=0;bKneeX=-15-runBob*0.5;bKneeY=-25;
      fFootX=18+runBob;fFootY=0;fKneeX=12+runBob*0.5;fKneeY=-25;
    }

    let tk=(this.state==='atk'&&this.atkType==='k')?-8:0;

    // Hands
    if(this.state==='grab_exec'){
      let t=60-this.atkT;
      let progress=Math.min(1,t/40);
      bHandX=-5-Math.sin(progress*Math.PI)*20;
      fHandX=25-Math.sin(progress*Math.PI)*40;
      bHandY=waistY-50-Math.sin(progress*Math.PI)*60;
      fHandY=waistY-30-Math.sin(progress*Math.PI)*60;
      if(progress>0.8){bHandX=-30;fHandX=-40;bHandY=waistY+30;fHandY=waistY+40;leanX=-20;}
      else leanX=15;
      bElbowX=leftShoulderX-10;bElbowY=shoulderY-30;
      fElbowX=rightShoulderX+10;fElbowY=shoulderY-30;
    } else if(this.state==='atk'&&this.atkType==='slam'){
      bHandX=-6;bHandY=waistY-25;
      fHandX=44;fHandY=waistY+32;
      bElbowX=leftShoulderX-6;bElbowY=shoulderY-6;
      fElbowX=rightShoulderX+12;fElbowY=shoulderY+30;
    } else if(this.state==='atk'&&this.atkType==='throw'){
      bHandX=-8;bHandY=waistY-6;fHandX=40;fHandY=waistY-18;
      bElbowX=leftShoulderX-2;bElbowY=shoulderY+10;
      fElbowX=rightShoulderX+16;fElbowY=shoulderY-12;
    } else if(this.state==='atk'&&this.atkType==='p'){
      let ext=(this.atkT<this.hitF+6?56:26)+(this.combo===3?26:0);if(isBoss)ext=Math.floor(ext*1.4);
      bHandX=-20+tk;bHandY=waistY;
      fHandX=ext;fHandY=waistY+15;
      if(this.combo===2)fHandY=shoulderY-10;
      if(this.combo===3)fHandY=-this.baseH/4;
      bElbowX=leftShoulderX-15;bElbowY=shoulderY+10;
      fElbowX=rightShoulderX+(fHandX-rightShoulderX)/2;fElbowY=shoulderY+(fHandY-shoulderY)/2-10;
    } else {
      fHandX=20+tk;fHandY=waistY-10;bHandX=-12+tk;bHandY=waistY+5;
      fElbowX=rightShoulderX+8;fElbowY=shoulderY+15;
      bElbowX=leftShoulderX-8;bElbowY=shoulderY+15;
    }

    let drawWrap=(ex,ey,hx,hy)=>{
      c.lineWidth=aW+1;c.strokeStyle=wrapCol;
      let dx=hx-ex,dy=hy-ey,len=Math.sqrt(dx*dx+dy*dy);
      if(len<5)return;
      let uX=dx/len,uY=dy/len;
      c.beginPath();c.moveTo(hx-uX*3,hy-uY*3);c.lineTo(hx-uX*12,hy-uY*12);c.stroke();
    };
    let drawAnkleWrap=(kx,ky,fx,fy)=>{
      c.lineWidth=lW+1;c.strokeStyle=wrapCol;
      let dx=fx-kx,dy=fy-ky,len=Math.sqrt(dx*dx+dy*dy);
      if(len<5)return;
      let uX=dx/len,uY=dy/len;
      c.beginPath();c.moveTo(fx-uX*2,fy-uY*2);c.lineTo(fx-uX*12,fy-uY*12);c.stroke();
    };

    // Scarf tails (player)
    if(this.isP&&!ghost){
      const scarfCol=this.raging?'#ffcc00':accentCol;
      c.strokeStyle=scarfCol;c.lineWidth=5;c.shadowBlur=this.raging?10:3;c.shadowColor=scarfCol;
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-15+wind,headY+bob,-30+wind+tailBob,headY+10+bob);c.stroke();
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-10+wind,headY+5+bob,-20+wind-tailBob,headY+15+bob);c.stroke();
      c.shadowBlur=0;
    }
    if(this.type===9&&!ghost){
      c.strokeStyle='#9900dd';c.lineWidth=5;c.shadowBlur=8;c.shadowColor='#9900dd';
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-15+wind,headY+bob,-30+wind+tailBob,headY+10+bob);c.stroke();
      c.beginPath();c.moveTo(-3,headY+5);c.quadraticCurveTo(-10+wind,headY+5+bob,-20+wind-tailBob,headY+15+bob);c.stroke();
      c.shadowBlur=0;
    }

    // Back arm
    c.lineWidth=aW+4;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(bElbowX,bElbowY);c.stroke();
    c.lineWidth=aW;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(bElbowX,bElbowY);c.lineTo(bHandX,bHandY);c.stroke();
    c.beginPath();c.arc(bHandX,bHandY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawWrap(bElbowX,bElbowY,bHandX,bHandY);

    // Back leg
    c.lineWidth=lW+8;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(-wW/2,waistY);c.lineTo(bKneeX,bKneeY);c.stroke();
    c.lineWidth=lW-2;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(bKneeX,bKneeY);c.lineTo(bFootX,bFootY);c.stroke();
    c.beginPath();c.arc(bFootX,bFootY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawAnkleWrap(bKneeX,bKneeY,bFootX,bFootY);

    // Torso
    c.fillStyle=clothCol;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(rightShoulderX,shoulderY);
    c.lineTo(wW/2,waistY);c.lineTo(-wW/2,waistY);c.fill();
    c.lineWidth=aW;
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(rightShoulderX,shoulderY);c.stroke();
    c.beginPath();c.moveTo(-wW/2,waistY);c.lineTo(wW/2,waistY);c.stroke();
    c.beginPath();c.moveTo(leftShoulderX,shoulderY);c.lineTo(-wW/2,waistY);c.stroke();
    c.beginPath();c.moveTo(rightShoulderX,shoulderY);c.lineTo(wW/2,waistY);c.stroke();
    c.fillStyle=bodyCol;
    c.beginPath();c.moveTo(-6,shoulderY-2);c.lineTo(6,shoulderY-2);c.lineTo(0,waistY-12);c.fill();

    // Armor plating
    if(this.isP&&armor==='heavyarmor'){
      c.strokeStyle='#555';c.lineWidth=7;
      c.beginPath();c.moveTo(leftShoulderX+4,shoulderY+2);c.lineTo(0,waistY-10);c.lineTo(rightShoulderX-4,shoulderY+2);c.stroke();
      c.lineWidth=5;c.beginPath();c.moveTo(-8,waistY-3);c.lineTo(8,waistY-3);c.stroke();
    }
    if(this.isP&&armor==='lightarmor'){
      c.strokeStyle='rgba(170,170,170,0.7)';c.lineWidth=3;
      c.beginPath();c.moveTo(-8,shoulderY+6);c.lineTo(8,shoulderY+6);c.stroke();
    }
    if(this.isP&&armor==='voidarmor'){
      // Void shroud — dark plates with glow
      c.strokeStyle='rgba(80,80,140,0.8)';c.lineWidth=6;
      c.shadowBlur=8;c.shadowColor='rgba(100,80,255,0.3)';
      c.beginPath();c.moveTo(leftShoulderX+2,shoulderY+2);c.lineTo(-2,waistY-8);c.stroke();
      c.beginPath();c.moveTo(rightShoulderX-2,shoulderY+2);c.lineTo(2,waistY-8);c.stroke();
      c.lineWidth=4;c.beginPath();c.moveTo(-8,shoulderY-2);c.lineTo(8,shoulderY-2);c.stroke();
      c.shadowBlur=0;
    }

    // Belt
    let beltCol=this.raging?'#ff9900':(this.isP?accentCol:'#444444');
    if(isBoss&&!this.raging)beltCol='#440000';
    if(this.type===9)beltCol='#9900dd';
    if(this.type===10)beltCol='#334455';
    c.fillStyle=beltCol;c.fillRect(-wW/2-4,waistY-4,wW+8,8);
    c.lineWidth=4;c.strokeStyle=beltCol;c.lineCap='round';
    c.beginPath();c.moveTo(-wW/2,waistY);c.quadraticCurveTo(-wW/2-10+wind,waistY+15,-wW/2-5+wind+tailBob,waistY+30);c.stroke();
    c.beginPath();c.moveTo(-wW/2+5,waistY);c.quadraticCurveTo(-wW/2-5+wind,waistY+12,-wW/2+wind-tailBob,waistY+25);c.stroke();

    // Head
    c.fillStyle=bodyCol;c.beginPath();c.arc(2,headY,hR,0,6.28);c.fill();
    if(this.isP&&!ghost){
      // Player headband
      c.strokeStyle=this.raging?'#ffcc00':accentCol;c.lineWidth=4;
      c.shadowBlur=this.raging?10:4;c.shadowColor=c.strokeStyle;
      c.beginPath();c.moveTo(-hR+3,headY);c.lineTo(hR+2,headY-1);c.stroke();c.shadowBlur=0;
      // Player face - eyes (red eyes when raging)
      const eyeCol=this.raging?'#ff4400':'#cc2020';
      c.fillStyle=eyeCol;c.shadowBlur=this.raging?8:3;c.shadowColor=eyeCol;
      c.beginPath();c.arc(5,headY-2,this.raging?3.5:2.5,0,Math.PI*2);c.fill();
      c.shadowBlur=0;
      // Eye glint
      c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.arc(6,headY-3,1,0,Math.PI*2);c.fill();
      // Nose hint
      c.strokeStyle='rgba(80,0,0,0.4)';c.lineWidth=1.2;c.beginPath();c.moveTo(3,headY+1);c.lineTo(2,headY+4);c.stroke();
      // Jaw line
      c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=1;c.beginPath();c.arc(2,headY,hR-2,Math.PI*0.1,Math.PI*0.9);c.stroke();
      // Hair spikes on top (player's signature look)
      c.fillStyle=this.raging?'#ff8800':'#0a0a0a';
      c.shadowBlur=this.raging?6:0;c.shadowColor='#ff4400';
      for(let hs=0;hs<3;hs++){
        c.beginPath();
        const hsx=-hR+2+hs*5;
        c.moveTo(hsx,headY-hR+4);c.lineTo(hsx-3,headY-hR-6-hs*2);c.lineTo(hsx+4,headY-hR+2);c.fill();
      }
      c.shadowBlur=0;
    } else if(this.type===9&&!ghost){
      c.strokeStyle='#9900dd';c.lineWidth=4;c.shadowBlur=10;c.shadowColor='#9900dd';
      c.beginPath();c.moveTo(-hR+3,headY);c.lineTo(hR+2,headY-1);c.stroke();c.shadowBlur=0;
      // Elite purple eye
      c.fillStyle='#cc44ff';c.beginPath();c.arc(5,headY-2,3,0,Math.PI*2);c.fill();
    } else if(isBoss&&!ghost){
      c.shadowBlur=14;c.shadowColor='#ff0000';c.fillStyle='#dd0000';
      c.beginPath();c.arc(8,headY-2,3,0,6.28);c.fill();c.shadowBlur=0;
      // Boss second eye
      c.fillStyle='rgba(180,0,0,0.6)';c.beginPath();c.arc(-2,headY+1,2,0,Math.PI*2);c.fill();
    } else {
      // Generic enemy eye
      c.fillStyle='rgba(200,200,200,0.5)';c.beginPath();c.arc(5,headY-1,2,0,Math.PI*2);c.fill();
    }
    // Type 10 (Burden) — heavy chain around neck
    if(this.type===10&&!ghost){
      c.strokeStyle='#334455';c.lineWidth=3;
      c.beginPath();c.arc(2,headY+hR+4,6,0,Math.PI*2);c.stroke();
    }

    // Front leg
    c.lineWidth=lW+8;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(wW/2,waistY);c.lineTo(fKneeX,fKneeY);c.stroke();
    c.lineWidth=lW-2;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(fKneeX,fKneeY);c.lineTo(fFootX,fFootY);c.stroke();
    c.beginPath();c.arc(fFootX,fFootY,jR,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawAnkleWrap(fKneeX,fKneeY,fFootX,fFootY);

    // Front arm
    c.lineWidth=aW+4;c.strokeStyle=clothCol;
    c.beginPath();c.moveTo(rightShoulderX,shoulderY);c.lineTo(fElbowX,fElbowY);c.stroke();
    c.lineWidth=aW;c.strokeStyle=bodyCol;
    c.beginPath();c.moveTo(fElbowX,fElbowY);c.lineTo(fHandX,fHandY);c.stroke();
    c.beginPath();c.arc(fHandX,fHandY,jR+2,0,6.28);c.fillStyle=bodyCol;c.fill();
    drawWrap(fElbowX,fElbowY,fHandX,fHandY);

    // Weapon
    if(this.isP&&!ghost){
      const ang=Math.atan2(fHandY-fElbowY,fHandX-fElbowX);
      const T2=Date.now();
      const isAttacking=this.state==='atk';
      const atkProg=isAttacking?Math.max(0,Math.min(1,(this.hitF-this.atkT)/(this.hitF||1))):0;
      const preHit=isAttacking&&this.atkT>this.hitF; // winding up
      const onHit=isAttacking&&this.atkT<=this.hitF&&this.atkT>this.hitF-5; // impact frame
      const postHit=isAttacking&&this.atkT<=this.hitF-5; // follow-through

      c.save();c.translate(fHandX,fHandY);c.rotate(ang);

      // ══════════════════════════════════════════
      // 🥊 IRON KNUCKLES — spinning brass ring with impact shockwave
      // ══════════════════════════════════════════
      if(weapon==='knuckle'){
        c.restore();c.save();c.translate(fHandX,fHandY);
        const spinAng=(T2/120)%(Math.PI*2);
        const punchExt=onHit?8:0;
        c.translate(punchExt,0);
        // Outer ring glow
        if(isAttacking){
          const ringGlow=c.createRadialGradient(0,0,10,0,0,26);
          ringGlow.addColorStop(0,onHit?'rgba(255,220,80,0.5)':'rgba(255,160,0,0.15)');
          ringGlow.addColorStop(1,'transparent');
          c.fillStyle=ringGlow;c.beginPath();c.arc(0,0,26,0,Math.PI*2);c.fill();
        }
        // Knuckle duster body
        c.save();c.rotate(isAttacking?spinAng*0.3:0);
        const kbody=c.createLinearGradient(-15,-15,15,15);
        kbody.addColorStop(0,'#f0d060');kbody.addColorStop(0.35,'#c8931a');kbody.addColorStop(0.7,'#a07010');kbody.addColorStop(1,'#604808');
        c.fillStyle=kbody;
        // Hexagonal knuckle shape
        c.beginPath();
        for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/6;c.lineTo(Math.cos(a)*14,Math.sin(a)*14);}
        c.closePath();c.fill();
        c.strokeStyle='rgba(255,230,120,0.6)';c.lineWidth=1.5;c.stroke();
        // 4 raised knuckle studs
        for(let ki=0;ki<4;ki++){
          const ka=ki*Math.PI*0.5+Math.PI*0.125;
          const kx=Math.cos(ka)*8,ky=Math.sin(ka)*8;
          const sg=c.createRadialGradient(kx-1,ky-1,0,kx,ky,4.5);
          sg.addColorStop(0,'#ffffff');sg.addColorStop(0.4,'#dddddd');sg.addColorStop(1,'#888888');
          c.fillStyle=sg;c.beginPath();c.arc(kx,ky,4,0,Math.PI*2);c.fill();
          c.strokeStyle='#555';c.lineWidth=0.5;c.stroke();
        }
        // Center red gem
        const gem=c.createRadialGradient(-1,-1,0,0,0,5);
        gem.addColorStop(0,'#ff8888');gem.addColorStop(0.5,'#cc0022');gem.addColorStop(1,'#660011');
        c.fillStyle=gem;c.beginPath();c.arc(0,0,5,0,Math.PI*2);c.fill();
        c.strokeStyle='rgba(255,150,150,0.8)';c.lineWidth=1;c.stroke();
        c.restore();
        // Impact flash on hit
        if(onHit){
          c.shadowColor='#ff8800';c.shadowBlur=20;
          c.strokeStyle='rgba(255,200,50,0.9)';c.lineWidth=2;
          c.beginPath();
          for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/6;c.lineTo(Math.cos(a)*18,Math.sin(a)*18);}
          c.closePath();c.stroke();
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🗡️ VOID DAGGER — dark blade with electric void trail
      // ══════════════════════════════════════════
      } else if(weapon==='dagger'){
        // Grip — wrapped leather
        const grip=c.createLinearGradient(-8,-5,8,5);
        grip.addColorStop(0,'#1a0e06');grip.addColorStop(0.5,'#2e1a0a');grip.addColorStop(1,'#120a04');
        c.fillStyle=grip;
        c.beginPath();c.rect(-8,-5,18,10);c.fill();
        // Leather wrap strips
        for(let i=0;i<5;i++){
          c.strokeStyle=`rgba(${60+i*8},${30+i*4},${10+i*2},0.9)`;c.lineWidth=1.5;
          c.beginPath();c.moveTo(-6+i*3.5,-5);c.lineTo(-5+i*3.5,5);c.stroke();
        }
        // Pommel
        c.fillStyle='#8a6020';c.beginPath();c.arc(-8,0,5,0,Math.PI*2);c.fill();
        c.strokeStyle='#c8a040';c.lineWidth=1;c.stroke();
        // Cross-guard
        const guard=c.createLinearGradient(8,-9,12,9);
        guard.addColorStop(0,'#999');guard.addColorStop(0.4,'#eee');guard.addColorStop(1,'#666');
        c.fillStyle=guard;c.beginPath();c.rect(8,-9,5,18);c.fill();
        c.strokeStyle='#333';c.lineWidth=0.8;c.stroke();
        // Ricasso (flat)
        c.fillStyle='#888';c.fillRect(12,-2.5,6,5);
        // Main blade
        c.beginPath();c.moveTo(17,-3);c.lineTo(44,0);c.lineTo(17,3);c.closePath();
        const dbl=c.createLinearGradient(17,-3,17,3);
        dbl.addColorStop(0,'#c0c0d0');dbl.addColorStop(0.2,'#f0f0ff');dbl.addColorStop(0.5,'#ffffff');dbl.addColorStop(0.8,'#c0c0d0');dbl.addColorStop(1,'#808090');
        c.fillStyle=dbl;c.fill();
        // Blood fuller groove
        c.strokeStyle='rgba(60,60,80,0.5)';c.lineWidth=1.2;c.beginPath();c.moveTo(19,-0.8);c.lineTo(42,0.2);c.stroke();
        // Top edge glint
        c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=0.8;c.beginPath();c.moveTo(19,-2.2);c.lineTo(42,0);c.stroke();
        // Serrations near base
        for(let si=0;si<3;si++){
          c.strokeStyle='rgba(80,80,100,0.6)';c.lineWidth=0.8;
          c.beginPath();c.moveTo(20+si*4,-2);c.lineTo(21+si*4,0);c.moveTo(20+si*4,2);c.lineTo(21+si*4,0);c.stroke();
        }
        // Attack: electric void discharge
        if(isAttacking){
          const alpha=onHit?0.95:0.5;
          c.shadowColor='#4488ff';c.shadowBlur=onHit?20:8;
          // Void aura on blade
          c.strokeStyle=`rgba(80,160,255,${alpha})`;c.lineWidth=onHit?3:1.5;
          c.beginPath();c.moveTo(17,0);c.lineTo(45,0);c.stroke();
          // Lightning forks from blade
          if(onHit){
            for(let lf=0;lf<4;lf++){
              c.strokeStyle=`rgba(150,200,255,${0.7+Math.random()*0.3})`;c.lineWidth=0.8;
              c.beginPath();
              let lx=25+lf*5,ly=0;c.moveTo(lx,ly);
              for(let ls=0;ls<3;ls++){lx+=4+Math.random()*4;ly+=(Math.random()-0.5)*6;c.lineTo(lx,ly);}
              c.stroke();
            }
          }
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // ⚔️ SHADOW KATANA — full Japanese detail with blood arc sweep
      // ══════════════════════════════════════════
      } else if(weapon==='katana'){
        // Tsuka with silk ito wrap
        const tsuka=c.createLinearGradient(-10,-5,10,5);
        tsuka.addColorStop(0,'#4a2a10');tsuka.addColorStop(0.4,'#2a1808');tsuka.addColorStop(1,'#1a1006');
        c.fillStyle=tsuka;c.beginPath();c.rect(-10,-5,22,10);c.fill();
        // Silk ito wrap (diamond pattern)
        for(let ki=0;ki<6;ki++){
          c.strokeStyle=`rgba(${180-ki*8},${80-ki*4},${80-ki*4},0.9)`;c.lineWidth=1.8;
          c.beginPath();c.moveTo(-9+ki*3.5,-5);c.lineTo(-7+ki*3.5,5);c.stroke();
        }
        // Menuki ornament
        const men=c.createRadialGradient(-2,0,0,-2,0,4);
        men.addColorStop(0,'#f5c842');men.addColorStop(1,'#8a5a00');
        c.fillStyle=men;c.beginPath();c.arc(-2,0,4,0,Math.PI*2);c.fill();
        // Tsuba (guard) — classic round with cutouts
        const tsuba=c.createLinearGradient(10,-10,16,10);
        tsuba.addColorStop(0,'#555');tsuba.addColorStop(0.4,'#999');tsuba.addColorStop(1,'#444');
        c.fillStyle=tsuba;c.beginPath();c.ellipse(12,0,6,10,0,0,Math.PI*2);c.fill();
        c.strokeStyle='#222';c.lineWidth=1;c.stroke();
        // Tsuba detail ring
        c.strokeStyle='rgba(200,160,60,0.5)';c.lineWidth=0.8;c.beginPath();c.ellipse(12,0,4,8,0,0,Math.PI*2);c.stroke();
        // Habaki collar
        const hab=c.createLinearGradient(17,-4,21,4);
        hab.addColorStop(0,'#aaa');hab.addColorStop(0.5,'#eee');hab.addColorStop(1,'#777');
        c.fillStyle=hab;c.beginPath();c.rect(17,-3.5,6,7);c.fill();
        // Blade — curved with taper
        c.beginPath();
        c.moveTo(22,-2.5);
        c.quadraticCurveTo(50,-2,82,-0.8);
        c.lineTo(82,0.3);
        c.quadraticCurveTo(50,0.8,22,2.5);
        c.closePath();
        const kbl=c.createLinearGradient(22,-2.5,22,2.5);
        kbl.addColorStop(0,'#d8d8e8');kbl.addColorStop(0.15,'#f8f8ff');kbl.addColorStop(0.5,'#ffffff');kbl.addColorStop(0.85,'#c0c0d0');kbl.addColorStop(1,'#808090');
        c.fillStyle=kbl;c.fill();
        // Hamon temper line (wavy)
        c.strokeStyle='rgba(240,240,255,0.6)';c.lineWidth=0.8;
        c.beginPath();c.moveTo(24,-0.5);
        for(let hx=24;hx<80;hx+=8){c.quadraticCurveTo(hx+4,(hx/80)*0.8*(hx%16<8?-0.8:0.8),hx+8,0);}
        c.stroke();
        // Shinogi ridge line
        c.strokeStyle='rgba(180,180,200,0.4)';c.lineWidth=0.5;c.beginPath();c.moveTo(24,1.2);c.lineTo(80,0.5);c.stroke();
        // Blood groove bo-hi
        c.strokeStyle='rgba(120,100,160,0.3)';c.lineWidth=1;c.beginPath();c.moveTo(26,-0.3);c.lineTo(78,-0.1);c.stroke();
        // Attack: wide blood arc + motion blur trails
        if(isAttacking){
          c.save();
          const kprog=atkProg;
          if(preHit){
            // Wind-up glow
            c.globalAlpha=0.4;
            c.shadowColor='#aa0020';c.shadowBlur=12;
            c.strokeStyle='rgba(200,0,40,0.5)';c.lineWidth=2;
            c.beginPath();c.moveTo(22,0);c.lineTo(83,0);c.stroke();
          }
          if(onHit||postHit){
            const fade=onHit?1.0:Math.max(0,1-(this.hitF-this.atkT)*0.15);
            c.globalAlpha=fade;
            // Crimson blood arc
            c.shadowColor='#cc0020';c.shadowBlur=25;
            c.strokeStyle='rgba(220,0,30,0.9)';c.lineWidth=4;
            c.beginPath();c.arc(22,0,62,Math.PI*1.85,Math.PI*0.15);c.stroke();
            // White flash edge
            c.shadowColor='#ffffff';c.shadowBlur=10;
            c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=1.5;
            c.beginPath();c.moveTo(22,-2);c.quadraticCurveTo(52,-1.5,83,0);c.stroke();
            // Motion blur ghost blades
            for(let mb=1;mb<=3;mb++){
              c.globalAlpha=fade*(0.25-mb*0.06);
              c.save();c.rotate(-mb*0.08);
              c.strokeStyle='rgba(180,0,20,0.6)';c.lineWidth=2;
              c.beginPath();c.moveTo(22,0);c.lineTo(83,0);c.stroke();
              c.restore();
            }
          }
          c.shadowBlur=0;c.restore();
        }

      // ══════════════════════════════════════════
      // 🪄 MONK STAFF — spinning golden tip with thunder wave
      // ══════════════════════════════════════════
      } else if(weapon==='staff'){
        const spinRate=isAttacking?(T2/60):(T2/200);
        // Main pole — dark wood with lacquer
        const spole=c.createLinearGradient(-46,-4,62,4);
        spole.addColorStop(0,'#3a1e08');spole.addColorStop(0.15,'#6a3c14');spole.addColorStop(0.4,'#8a5020');spole.addColorStop(0.6,'#7a4418');spole.addColorStop(0.85,'#5a2e10');spole.addColorStop(1,'#3a1e08');
        c.fillStyle=spole;c.fillRect(-46,-4,112,8);
        // Lacquer sheen
        c.strokeStyle='rgba(255,200,100,0.12)';c.lineWidth=1.5;c.beginPath();c.moveTo(-44,-3);c.lineTo(64,-3);c.stroke();
        // Wood grain
        for(let si=0;si<8;si++){
          c.strokeStyle=`rgba(30,12,2,${0.2+si%3*0.1})`;c.lineWidth=0.6;
          c.beginPath();c.moveTo(-44+si*14,-4);c.lineTo(-42+si*14,4);c.stroke();
        }
        // Wrap bands (5 leather bands)
        for(let bi=0;bi<5;bi++){
          const bx=-38+bi*22;
          c.fillStyle='rgba(80,40,10,0.6)';c.fillRect(bx,-5,3,10);
          c.strokeStyle='rgba(120,70,20,0.8)';c.lineWidth=0.5;c.strokeRect(bx,-5,3,10);
        }
        // Golden tip ornament (TOP - left end) — spinning rings
        c.save();c.translate(-46,0);c.rotate(spinRate);
        const tip1=c.createRadialGradient(0,0,2,0,0,9);
        tip1.addColorStop(0,'#fff8c0');tip1.addColorStop(0.4,'#f5c842');tip1.addColorStop(1,'#8a5a00');
        c.fillStyle=tip1;c.beginPath();c.arc(0,0,9,0,Math.PI*2);c.fill();
        c.strokeStyle='rgba(255,230,100,0.9)';c.lineWidth=1.5;c.stroke();
        // Inner rune ring
        c.strokeStyle='rgba(255,200,50,0.5)';c.lineWidth=0.8;c.beginPath();c.arc(0,0,6,0,Math.PI*2);c.stroke();
        // 6 radiating energy spokes
        for(let sp=0;sp<6;sp++){
          const sa=sp*Math.PI/3;
          c.strokeStyle='rgba(255,220,80,0.6)';c.lineWidth=1;
          c.beginPath();c.moveTo(Math.cos(sa)*4,Math.sin(sa)*4);c.lineTo(Math.cos(sa)*8,Math.sin(sa)*8);c.stroke();
        }
        c.restore();
        // Bottom tip ornament — counter-spinning
        c.save();c.translate(64,0);c.rotate(-spinRate*1.4);
        const tip2=c.createRadialGradient(0,0,2,0,0,8);
        tip2.addColorStop(0,'#fff8c0');tip2.addColorStop(0.4,'#f5c842');tip2.addColorStop(1,'#8a5a00');
        c.fillStyle=tip2;c.beginPath();c.arc(0,0,8,0,Math.PI*2);c.fill();
        c.strokeStyle='rgba(255,220,80,0.8)';c.lineWidth=1.2;c.stroke();
        c.restore();
        // Attack: full-staff lightning discharge
        if(isAttacking){
          const swave=onHit?1.0:(atkProg*0.7);
          c.shadowColor='#ffcc00';c.shadowBlur=onHit?28:14;
          // Golden energy wave along pole
          c.strokeStyle=`rgba(255,200,50,${swave*0.9})`;c.lineWidth=onHit?5:2.5;
          c.beginPath();c.moveTo(-46,0);c.lineTo(64,0);c.stroke();
          // Thunder arcs from both tips
          if(onHit||atkProg>0.5){
            for(let arc=0;arc<5;arc++){
              c.strokeStyle=`rgba(255,240,150,${0.6+Math.random()*0.4})`;c.lineWidth=0.8;
              c.beginPath();
              let ax=(arc%2===0?-46:64),ay=0;c.moveTo(ax,ay);
              for(let as=0;as<4;as++){ax+=(arc%2===0?-1:1)*(6+Math.random()*8);ay+=(Math.random()-0.5)*10;c.lineTo(ax,ay);}
              c.stroke();
            }
          }
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // ☽ SHADOW SCYTHE — cursed void blade with purple death arc
      // ══════════════════════════════════════════
      } else if(weapon==='scythe'){
        // Pole — dark corrupted wood
        const spg=c.createLinearGradient(-55,-4,68,4);
        spg.addColorStop(0,'#0e0a14');spg.addColorStop(0.2,'#1e1628');spg.addColorStop(0.5,'#2e2040');spg.addColorStop(0.8,'#1a1220');spg.addColorStop(1,'#0e0a14');
        c.fillStyle=spg;c.fillRect(-55,-3.5,124,7);
        // Void cracks along pole
        c.strokeStyle='rgba(140,80,220,0.3)';c.lineWidth=0.8;
        for(let sc=0;sc<6;sc++){
          c.beginPath();c.moveTo(-50+sc*19,-3);c.lineTo(-48+sc*19+2,0);c.lineTo(-50+sc*19+3,3);c.stroke();
        }
        // Wrap bands — cursed violet
        for(let wb=0;wb<5;wb++){
          const wx=-48+wb*24;
          c.fillStyle='rgba(80,40,120,0.7)';c.fillRect(wx,-4.5,4,9);
          c.strokeStyle='rgba(150,80,220,0.5)';c.lineWidth=0.5;c.strokeRect(wx,-4.5,4,9);
        }
        // Blade socket
        c.fillStyle='#18102a';c.fillRect(54,-9,14,18);
        c.strokeStyle='rgba(120,60,200,0.6)';c.lineWidth=1;c.strokeRect(54,-9,14,18);
        // Main scythe blade — huge dramatic sweep
        c.save();c.translate(62,0);
        // Shadow fill
        c.fillStyle='rgba(20,10,35,0.95)';
        c.beginPath();c.moveTo(0,5);c.quadraticCurveTo(12,-4,28,-24);c.quadraticCurveTo(38,-36,48,-22);c.quadraticCurveTo(42,-8,24,-2);c.quadraticCurveTo(12,2,0,5);c.closePath();c.fill();
        // Blade gradient
        const sbg=c.createLinearGradient(0,5,48,-22);
        sbg.addColorStop(0,'#2a1a40');sbg.addColorStop(0.25,'#5a3a80');sbg.addColorStop(0.55,'#9060c0');sbg.addColorStop(0.8,'#c090e0');sbg.addColorStop(1,'#e0b0ff');
        c.fillStyle=sbg;
        c.beginPath();c.moveTo(2,4);c.quadraticCurveTo(14,-3,30,-23);c.quadraticCurveTo(38,-34,46,-22);c.quadraticCurveTo(40,-8,22,-3);c.quadraticCurveTo(10,2,2,4);c.closePath();c.fill();
        // Void edge (outer cutting arc)
        c.strokeStyle='rgba(200,160,255,0.9)';c.lineWidth=2;
        c.beginPath();c.moveTo(2,4);c.quadraticCurveTo(16,-3,32,-23);c.stroke();
        // Inner concave shine
        c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=1;
        c.beginPath();c.moveTo(4,2);c.quadraticCurveTo(20,-2,38,-18);c.stroke();
        // Rune markings on blade
        c.strokeStyle='rgba(255,150,255,0.4)';c.lineWidth=0.8;
        for(let rn=0;rn<3;rn++){
          const rx=8+rn*10,ry=-4-rn*6;
          c.beginPath();c.moveTo(rx,ry);c.lineTo(rx+4,ry-5);c.moveTo(rx+2,ry-1);c.lineTo(rx+5,ry-4);c.stroke();
        }
        c.restore();
        // Counterweight spike
        const cw=c.createLinearGradient(-55,-3,-62,3);
        cw.addColorStop(0,'#2a1840');cw.addColorStop(1,'#8040c0');
        c.fillStyle=cw;
        c.beginPath();c.moveTo(-55,-3);c.lineTo(-66,0);c.lineTo(-55,3);c.closePath();c.fill();
        c.strokeStyle='rgba(180,100,255,0.6)';c.lineWidth=1;c.stroke();
        // Attack: massive death arc with void tendrils
        if(isAttacking){
          c.save();c.translate(62,0);
          const sp2=atkProg;
          c.globalAlpha=onHit?0.95:sp2*0.7;
          c.shadowColor='#aa44ff';c.shadowBlur=onHit?35:16;
          // Primary death arc
          c.strokeStyle='rgba(180,80,255,0.9)';c.lineWidth=onHit?7:3;
          c.beginPath();c.arc(0,0,44,-Math.PI*0.9,-Math.PI*0.05);c.stroke();
          // Inner echo arc
          c.strokeStyle='rgba(255,180,255,0.4)';c.lineWidth=onHit?12:6;
          c.beginPath();c.arc(0,0,36,-Math.PI*0.85,-Math.PI*0.1);c.stroke();
          // Void tendrils
          if(onHit){
            for(let vt=0;vt<6;vt++){
              const va=-Math.PI*0.9+vt*Math.PI*0.16;
              c.strokeStyle='rgba(220,140,255,0.6)';c.lineWidth=1;
              c.beginPath();c.moveTo(Math.cos(va)*44,Math.sin(va)*44);
              c.lineTo(Math.cos(va)*44+(Math.random()-0.5)*20,Math.sin(va)*44+(Math.random()-0.5)*20);c.stroke();
            }
          }
          c.restore();c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🔱 VOID CLAWS — tri-claw gauntlet with plasma energy
      // ══════════════════════════════════════════
      } else if(weapon==='claws'){
        c.restore();c.save();c.translate(fHandX,fHandY);
        // Shared claw gradient
        const clawGrad=c.createLinearGradient(0,2,0,-24);
        clawGrad.addColorStop(0,'#6060a0');clawGrad.addColorStop(0.3,'#9090cc');clawGrad.addColorStop(0.7,'#d0d0f0');clawGrad.addColorStop(1,'#ffffff');

        const drawClawHand=(offX,offY,scale)=>{
          c.save();c.translate(offX,offY);c.scale(scale,scale);
          // Gauntlet base plate
          const gbase=c.createLinearGradient(-12,-5,12,5);
          gbase.addColorStop(0,'#14102a');gbase.addColorStop(0.5,'#2e2850');gbase.addColorStop(1,'#14102a');
          c.fillStyle=gbase;c.beginPath();c.rect(-12,-5,24,10);c.fill();
          c.strokeStyle='rgba(160,120,255,0.6)';c.lineWidth=1.2;c.stroke();
          // Knuckle ridge
          c.strokeStyle='rgba(200,180,255,0.4)';c.lineWidth=2;
          c.beginPath();c.moveTo(-10,-5);c.lineTo(10,-5);c.stroke();
          // 3 claws with detailed taper
          for(let ci=-1;ci<=1;ci++){
            const cx=ci*8;
            c.save();c.translate(cx,0);c.rotate(ci*0.08);
            // Claw socket
            c.fillStyle='#1e1838';c.beginPath();c.rect(-3,-5,6,8);c.fill();
            // Claw body — tapered blade
            c.fillStyle=clawGrad;
            c.beginPath();
            c.moveTo(-3,2);c.lineTo(-2.5,-2);c.bezierCurveTo(-2.5,-8,ci*1.5-1,-16,0,-22);
            c.bezierCurveTo(ci*1.5+1,-16,2.5,-8,2.5,-2);c.lineTo(3,2);c.closePath();
            c.fill();
            // Claw edge highlight
            c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=0.7;
            c.beginPath();c.moveTo(ci<0?-2:-2+Math.abs(ci)*0.5,-2);c.bezierCurveTo(ci<0?-2:0,-10,ci<0?-0.5:0.5,-18,0,-22);c.stroke();
            // Claw ridge
            c.strokeStyle='rgba(180,180,220,0.4)';c.lineWidth=0.5;
            c.beginPath();c.moveTo(0,-4);c.lineTo(0,-20);c.stroke();
            c.restore();
          }
          // Void energy orb in center
          const orb=c.createRadialGradient(0,-3,0,0,-3,6);
          orb.addColorStop(0,'rgba(220,180,255,0.9)');orb.addColorStop(0.5,'rgba(160,100,255,0.6)');orb.addColorStop(1,'transparent');
          c.fillStyle=orb;c.shadowColor='#aa88ff';c.shadowBlur=12;
          c.beginPath();c.arc(0,-3,6,0,Math.PI*2);c.fill();
          c.shadowBlur=0;
          c.restore();
        };

        drawClawHand(0,0,1.0);
        drawClawHand(bHandX-fHandX,bHandY-fHandY,0.85);

        // Attack: plasma claw slashes — X-cross pattern
        if(isAttacking){
          c.shadowColor='#cc88ff';c.shadowBlur=onHit?22:10;
          const alpha=onHit?0.95:atkProg*0.7;
          // Horizontal slash
          c.strokeStyle=`rgba(200,150,255,${alpha})`;c.lineWidth=onHit?4:2;
          c.beginPath();c.moveTo(-28,-14);c.lineTo(28,-14);c.stroke();
          // Diagonal slashes (X)
          c.strokeStyle=`rgba(220,180,255,${alpha*0.8})`;c.lineWidth=onHit?3:1.5;
          c.beginPath();c.moveTo(-22,-8);c.lineTo(22,-28);c.stroke();
          c.beginPath();c.moveTo(22,-8);c.lineTo(-22,-28);c.stroke();
          // Impact sparks at cross
          if(onHit){
            for(let sp=0;sp<8;sp++){
              const sa=sp*Math.PI/4;
              c.strokeStyle='rgba(255,230,255,0.8)';c.lineWidth=0.8;
              c.beginPath();c.moveTo(0,-18);c.lineTo(Math.cos(sa)*14,-18+Math.sin(sa)*14);c.stroke();
            }
          }
          c.shadowBlur=0;
        }

      // ══════════════════════════════════════════
      // 🔨 DOOM HAMMER — war maul with volcanic eruption
      // ══════════════════════════════════════════
      } else if(weapon==='hammer'){
        // Handle — wrapped with iron bands
        const hg=c.createLinearGradient(-24,-4,56,4);
        hg.addColorStop(0,'#180e04');hg.addColorStop(0.3,'#3c2010');hg.addColorStop(0.6,'#4e2a14');hg.addColorStop(1,'#180e04');
        c.fillStyle=hg;c.fillRect(-24,-4,82,8);
        // Handle leather wrap
        for(let hi=0;hi<6;hi++){
          c.strokeStyle=`rgba(${50+hi*5},${25+hi*3},${8+hi},0.8)`;c.lineWidth=2;
          c.beginPath();c.moveTo(-22+hi*14,-4);c.lineTo(-20+hi*14,4);c.stroke();
        }
        // Iron bands
        for(let ib=0;ib<3;ib++){
          const ibx=-18+ib*24;
          c.fillStyle='rgba(60,60,60,0.8)';c.fillRect(ibx,-5,5,10);
          c.strokeStyle='#888';c.lineWidth=0.5;c.strokeRect(ibx,-5,5,10);
        }
        // Handle-to-head neck
        c.fillStyle='#2a2a2a';c.fillRect(54,-9,10,18);
        c.strokeStyle='#555';c.lineWidth=1;c.strokeRect(54,-9,10,18);
        // Hammer head — massive war maul
        const hmain=c.createLinearGradient(62,-18,88,18);
        hmain.addColorStop(0,'#2a2a2a');hmain.addColorStop(0.3,'#4a4a4a');hmain.addColorStop(0.6,'#606060');hmain.addColorStop(1,'#1a1a1a');
        c.fillStyle=hmain;c.fillRect(62,-18,34,36);
        // Head bevel edges
        c.fillStyle='#3a3a3a';
        c.beginPath();c.moveTo(62,-18);c.lineTo(96,-18);c.lineTo(96,-22);c.lineTo(66,-22);c.closePath();c.fill();
        c.beginPath();c.moveTo(62,18);c.lineTo(96,18);c.lineTo(96,22);c.lineTo(66,22);c.closePath();c.fill();
        // Strike face — glowing hot metal
        const hface=c.createLinearGradient(94,-18,100,18);
        hface.addColorStop(0,isAttacking&&onHit?'#ff6600':'#666');
        hface.addColorStop(0.4,isAttacking&&onHit?'#ffaa00':'#999');
        hface.addColorStop(1,isAttacking&&onHit?'#cc4400':'#555');
        c.fillStyle=hface;c.fillRect(94,-18,8,36);
        // Rune grid engravings
        c.strokeStyle='rgba(255,80,0,0.35)';c.lineWidth=1;
        c.beginPath();
        for(let rx=0;rx<3;rx++){c.moveTo(66+rx*9,-16);c.lineTo(66+rx*9,16);}
        for(let ry=0;ry<4;ry++){c.moveTo(64,-12+ry*8);c.lineTo(92,-12+ry*8);}
        c.stroke();
        // Lava cracks — glowing orange
        c.strokeStyle='rgba(255,120,0,0.5)';c.lineWidth=1.2;
        c.beginPath();c.moveTo(68,-10);c.lineTo(74,-4);c.lineTo(80,-8);c.lineTo(86,-2);c.stroke();
        c.beginPath();c.moveTo(70,8);c.lineTo(76,2);c.lineTo(82,10);c.stroke();
        // Head outline
        c.strokeStyle='#111';c.lineWidth=2;c.strokeRect(62,-18,34,36);
        c.strokeStyle='#0a0a0a';c.lineWidth=2.5;c.strokeRect(94,-18,8,36);
        // Attack: volcanic eruption shockwave
        if(isAttacking){
          const hp2=atkProg;
          c.save();c.translate(98,0);
          if(preHit){
            c.shadowColor='#ff4400';c.shadowBlur=16;
            // Wind-up: cross lines instead of circle
            c.strokeStyle=`rgba(255,100,0,${hp2*0.7})`;c.lineWidth=2;
            c.beginPath();c.moveTo(-12,0);c.lineTo(12,0);c.moveTo(0,-12);c.lineTo(0,12);c.stroke();
            c.shadowBlur=0;
          }
          if(onHit){
            c.shadowColor='#ff6600';c.shadowBlur=30;
            // Radial burst lines only — no circles
            for(let bl=0;bl<16;bl++){
              const ba=bl*Math.PI/8;
              c.strokeStyle=`rgba(255,${150+Math.random()*105},0,0.9)`;c.lineWidth=2;
              c.beginPath();c.moveTo(Math.cos(ba)*4,Math.sin(ba)*4);c.lineTo(Math.cos(ba)*(16+Math.random()*14),Math.sin(ba)*(16+Math.random()*14));c.stroke();
            }
            c.shadowBlur=0;
          } else if(postHit){
            const fade=Math.max(0,1-(this.hitF-this.atkT)*0.1);
            c.shadowColor='#ff4400';c.shadowBlur=12*fade;
            // X shape afterglow
            c.strokeStyle=`rgba(255,120,0,${fade*0.6})`;c.lineWidth=3*fade;
            c.beginPath();c.moveTo(-16,-16);c.lineTo(16,16);c.moveTo(16,-16);c.lineTo(-16,16);c.stroke();
            c.shadowBlur=0;
          }
          c.restore();c.shadowBlur=0;
        }
      }
      c.restore();
    }

    c.restore();c.globalAlpha=1;c.shadowBlur=0;c.shadowColor='transparent';
  }
}

