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
 * 좌/우 쉬프트를 구분할 때 사용. KeyboardEvent.code 기반.
 * @returns {string|null}
 */
export function getSoundFileByCode(code) {
  if (code === 'ShiftLeft') return SOUND_FILES.shiftLeft;
  if (code === 'ShiftRight') return SOUND_FILES.shiftRight;
  return null;
}
