const inputField = document.getElementById("keyboard-input");

const milkySounds = {
  function: 'sounds/01_R4-F1열.mp3',
  number: 'sounds/02_R4-숫자열.mp3',
  r3: 'sounds/03_R3-ㅂㅈㄷ열.mp3',
  r2: 'sounds/04_R2-ㅁㄴㅇ열.mp3',
  r1: 'sounds/05_R1-ㅋㅌㅊ열.mp3',
  control: 'sounds/06_R1-Ctrl열06.mp3',
  space: 'sounds/스페이스바.mp3',
  enter: 'sounds/엔터키-숫자패드+키.mp3',
  backspace: 'sounds/백스페이스.mp3',
  tab: 'sounds/탭.mp3',
  capslock: 'sounds/캡스락.mp3',
  shiftLeft: 'sounds/좌쉬프트-숫자패드엔터키.mp3',
  shiftRight: 'sounds/우쉬프트-숫자패드0키.mp3'
};

// 키 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'"];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl','Alt'];

// 모든 mp3 파일
const allSoundFiles = Object.values(milkySounds);
const audioCache = {};

// 1) 미리 로드
function preloadAllAudio() {
  for (const file of allSoundFiles) {
    const audio = new Audio(file);
    audio.preload = 'auto';
    audio.volume = 1;
    audioCache[file] = audio;
  }
}

// 2) 첫 클릭 시 강제 로딩
function forceLoadAudio() {
  for (const file in audioCache) {
    const audio = audioCache[file].cloneNode();
    audio.volume = 0;
    audio.play().catch(e => {});
    setTimeout(() => {
      audio.pause();
      audio.volume = 1;
      audio.currentTime = 0;
    }, 200);
  }
}

function getMilkySound(key, code) {
  // code로 좌쉬프트, 우쉬프트 구분 가능 (ShiftLeft, ShiftRight)
  // console.log(key, code);

  // 열별 매핑
  if (functionKeys.includes(key)) return milkySounds.function;
  if (numberKeys.includes(key))   return milkySounds.number;
  if (r3Keys.includes(key))       return milkySounds.r3;
  if (r2Keys.includes(key))       return milkySounds.r2;
  if (r1Keys.includes(key))       return milkySounds.r1;

  // ctrl, alt
  if (controlKeys.includes(key))  return milkySounds.control;

  // 스페이스, 엔터, 백스페이스
  if (key === ' ') return milkySounds.space;
  if (key === 'Enter') return milkySounds.enter;
  if (key === 'Backspace') return milkySounds.backspace;

  // 탭, 캡스락, 쉬프트
  if (key === 'Tab') return milkySounds.tab;
  if (key === 'CapsLock') return milkySounds.capslock;

  // 쉬프트 구분 (좌 / 우)
  if (key === 'Shift') {
    if (code === 'ShiftLeft') return milkySounds.shiftLeft;
    if (code === 'ShiftRight') return milkySounds.shiftRight;
    return milkySounds.shiftLeft; // 기본
  }
  return null;
}

// cloneNode()로 재생
function playCachedSound(url) {
  const baseAudio = audioCache[url];
  if (baseAudio) {
    const clone = baseAudio.cloneNode();
    clone.volume = 1;
    clone.currentTime = 0;
    clone.play().catch(e => {});
  }
}

document.addEventListener('keydown', (event) => {
  // 한글 IME 조합 중이면 무시
  if (event.isComposing) return;

  // key: 'Shift', 'Tab', ...
  // code: 'ShiftLeft', 'ShiftRight', ...
  const soundFile = getMilkySound(event.key, event.code);
  if (soundFile) {
    playCachedSound(soundFile);
  }
});

// 페이지 로드시 미리 로드
preloadAllAudio();

// 첫 클릭 시 강제 로딩
document.addEventListener('click', function firstClick() {
  forceLoadAudio();
  document.removeEventListener('click', firstClick);
});
