/**
 * 키 -> 사운드 파일 매핑.
 *
 * 녹음이 키 하나하나가 아니라 "행 단위 + 특수키"로 되어 있어서,
 * 어떤 키를 눌렀는지에 따라 해당 행의 샘플을 재생한다.
 * 원본 로직은 legacy/keyboard-script-mac.js 에 있던 것.
 *
 * 모든 축 폴더가 아래 파일명을 동일하게 갖고 있어야 한다.
 */
export const SOUND_FILES = {
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

export const ALL_SOUND_FILES = Object.values(SOUND_FILES);

// 행 정의. 한글/영문 각인을 모두 포함해야 두벌식 입력에서도 매칭된다.
const ROWS = {
  function: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  number: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '₩', '-', '='],
  r3: [
    'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', '\\',
  ],
  r2: [
    'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
  ],
  r1: [
    'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
  ],
  control: ['Control', 'Ctrl', 'Alt', 'Meta', 'Command', 'Option', 'Fn'],
};

// 매 입력마다 배열을 선형탐색하지 않도록 Set 으로 변환
const ROW_SETS = Object.fromEntries(
  Object.entries(ROWS).map(([name, keys]) => [name, new Set(keys.map((k) => k.toLowerCase()))])
);

// 특수키는 행보다 우선한다
const SPECIAL = {
  ' ': SOUND_FILES.space,
  space: SOUND_FILES.space,
  spacebar: SOUND_FILES.space,
  enter: SOUND_FILES.enter,
  return: SOUND_FILES.enter,
  backspace: SOUND_FILES.backspace,
  tab: SOUND_FILES.tab,
  capslock: SOUND_FILES.capslock,
  shift: SOUND_FILES.shiftLeft,
};

/**
 * 키 이름(KeyboardEvent.key 또는 키캡 legend)을 사운드 파일명으로 변환.
 * @returns {string|null} 매칭되는 소리가 없으면 null
 */
export function getSoundFile(key) {
  if (!key) return null;

  const k = key.toLowerCase();
  if (SPECIAL[k]) return SPECIAL[k];

  for (const [name, set] of Object.entries(ROW_SETS)) {
    if (set.has(k)) return SOUND_FILES[name];
  }
  return null;
}

/**
 * 물리 키(KeyboardEvent.code)를 사운드 파일명으로 변환.
 *
 * 사운드가 행(row) 단위라, 어떤 문자가 입력됐는지가 아니라 "어느 물리 키를
 * 눌렀는지"만 알면 된다. code 는 한글 IME 조합 중에도('Process' keydown 이어도)
 * 항상 실제 물리 키를 담고 있어, 한글·영문·겹자모를 구분 없이 한 경로로 처리한다.
 * 이 방식이 keydown/compositionupdate 이중 경로(이중재생·무음 누락)를 원천 차단한다.
 *
 * @returns {string|null} 매칭되는 소리가 없으면 null
 */
export function getSoundFileByCode(code) {
  if (!code) return null;
  return CODE_TO_FILE[code] || null;
}

// 물리 키 code -> 사운드 파일. ANSI 배열 기준, 행/특수키를 그대로 반영한다.
const CODE_ROWS = {
  function: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  number: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'IntlYen'],
  r3: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'IntlBackslash'],
  r2: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
  r1: ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash'],
  control: ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'],
};

const CODE_SPECIAL = {
  Space: SOUND_FILES.space,
  Enter: SOUND_FILES.enter,
  NumpadEnter: SOUND_FILES.enter,
  Backspace: SOUND_FILES.backspace,
  Tab: SOUND_FILES.tab,
  CapsLock: SOUND_FILES.capslock,
  ShiftLeft: SOUND_FILES.shiftLeft,
  ShiftRight: SOUND_FILES.shiftRight,
};

const CODE_TO_FILE = { ...CODE_SPECIAL };
for (const [name, codes] of Object.entries(CODE_ROWS)) {
  for (const code of codes) CODE_TO_FILE[code] = SOUND_FILES[name];
}
