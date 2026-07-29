// keyboard-script-mac.js 의 매핑 로직을 옮긴 것.
// 축(스위치)마다 폴더를 하나씩 두는 구조로 확장할 수 있게 baseDir을 분리해 둠.

const SOUNDS = {
  function: 'row-function.mp3',
  number: 'row-number.mp3',
  r3: 'row-r3.mp3',
  r2: 'row-r2.mp3',
  r1: 'row-r1.mp3',
  control: 'row-control.mp3',
  space: 'space.mp3',
  enter: 'enter.mp3',
  backspace: 'backspace.mp3',
  tab: 'tab.mp3',
  capslock: 'capslock.mp3',
  shiftLeft: 'shift-left.mp3',
  shiftRight: 'shift-right.mp3',
};

const FUNCTION_KEYS = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const NUMBER_KEYS = ['`','1','2','3','4','5','6','7','8','9','0','₩','-','='];

const R3_KEYS = [
  'ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ',
  'q','w','e','r','t','y','u','i','o','p','[',']','|','\\',
];
const R2_KEYS = [
  'ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',
  'a','s','d','f','g','h','j','k','l',';',"'",
];
const R1_KEYS = [
  'ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',
  'z','x','c','v','b','n','m',',','.','/',
];
const CONTROL_KEYS = ['Control','Ctrl','Alt','Meta','Command','Option','Fn'];

// 배열 → Set (매 입력마다 includes 선형탐색 하던 것 제거)
const toSet = (arr) => new Set(arr.map((k) => k.toLowerCase()));
const fnSet = toSet(FUNCTION_KEYS);
const numSet = toSet(NUMBER_KEYS);
const r3Set = toSet(R3_KEYS);
const r2Set = toSet(R2_KEYS);
const r1Set = toSet(R1_KEYS);
const ctrlSet = toSet(CONTROL_KEYS);

/**
 * 키 이름(KeyboardEvent.key 또는 키캡 legend)을 사운드 파일명으로 변환.
 * 매칭되는 소리가 없으면 null.
 */
export function getSoundFile(key) {
  if (!key) return null;

  // 특수키 먼저 (대소문자 무시)
  switch (key.toLowerCase()) {
    case ' ':
    case 'space':
    case 'spacebar':
      return SOUNDS.space;
    case 'enter':
    case 'return':
      return SOUNDS.enter;
    case 'backspace':
      return SOUNDS.backspace;
    case 'tab':
      return SOUNDS.tab;
    case 'capslock':
      return SOUNDS.capslock;
    case 'shift':
      return SOUNDS.shiftLeft;
    default:
      break;
  }

  const k = key.toLowerCase();
  if (fnSet.has(k)) return SOUNDS.function;
  if (numSet.has(k)) return SOUNDS.number;
  if (r3Set.has(k)) return SOUNDS.r3;
  if (r2Set.has(k)) return SOUNDS.r2;
  if (r1Set.has(k)) return SOUNDS.r1;
  if (ctrlSet.has(k)) return SOUNDS.control;

  return null;
}

/** 좌/우 쉬프트를 구분해야 할 때 (KeyboardEvent.code 기반) */
export function getSoundFileByCode(code) {
  if (code === 'ShiftLeft') return SOUNDS.shiftLeft;
  if (code === 'ShiftRight') return SOUNDS.shiftRight;
  return null;
}

export const ALL_SOUND_FILES = Object.values(SOUNDS);
export { SOUNDS };
