const INPUT_BUFFER_FRAMES = 10;
const inputs = {
  left: { held: false, pressed: false, released: false, buffer: 0 },
  right: { held: false, pressed: false, released: false, buffer: 0 },
  jump: { held: false, pressed: false, released: false, buffer: 0 },
  punch: { held: false, pressed: false, released: false, buffer: 0 },
  kick: { held: false, pressed: false, released: false, buffer: 0 },
  grab: { held: false, pressed: false, released: false, buffer: 0 },
  throw: { held: false, pressed: false, released: false, buffer: 0 },
  rage: { held: false, pressed: false, released: false, buffer: 0 },
};

const KEY_TO_INPUT = { l: 'left', r: 'right', j: 'jump', a: 'punch', k: 'kick', g: 'grab', t: 'throw', rage: 'rage' };

function setBufferedInput(key, isHeld){
  const inputKey = KEY_TO_INPUT[key];
  if(!inputKey || !inputs[inputKey])return;
  const input = inputs[inputKey];
  if(isHeld){
    if(!input.held){
      input.pressed = true;
      input.buffer = INPUT_BUFFER_FRAMES;
    }
    input.held = true;
  } else {
    input.released = input.held;
    input.held = false;
  }
}

function consumeBufferedInput(inputKey){
  const input = inputs[inputKey];
  if(!input || input.buffer <= 0)return false;
  input.buffer = 0;
  input.pressed = false;
  return true;
}

function isInputHeld(inputKey){
  return !!inputs[inputKey]?.held;
}

function updateInputBuffers(){
  Object.values(inputs).forEach(input => {
    if(input.buffer > 0)input.buffer -= 1;
    input.pressed = false;
    input.released = false;
  });
}
