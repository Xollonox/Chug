import { SCRIPT_PART1 } from './script_part1.js';
import { SCRIPT_PART2 } from './script_part2.js';

export const SCRIPT = SCRIPT_PART1.concat(SCRIPT_PART2);

window.SCRIPT = SCRIPT;
console.log('[CHUG] Narrative script loaded and consolidated locally.');
