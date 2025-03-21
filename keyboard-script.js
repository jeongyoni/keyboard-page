const inputField = document.getElementById("keyboard-input");

// 열별 mp3 (밀키축 예시)
const milkySounds = {
  function:  'sounds/01_R4-F1열.mp3',
  number:    'sounds/02_R4-숫자열.mp3',
  r3:        'sounds/03_R3-ㅂㅈㄷ열.mp3',
  r2:        'sounds/04_R2-ㅁㄴㅇ열.mp3',
  r1:        'sounds/05_R1-ㅋㅌㅊ열.mp3',
  control:   'sounds/06_R1-Ctrl열06.mp3',
  space:     'sounds/스페이스바.mp3',
  enter:     'sounds/엔터키-숫자패드+키.mp3',
  backspace: 'sounds/백스페이스.mp3'
};

const numberKeys   = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys       = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys       = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'"];
const r1Keys       = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys  = ['Ctrl','Shift','Alt'];

const allSoundFiles = Object.values(milkySounds);
const audioCache = {};

// 미리 로드 (preload="auto")
function preloadAllAudio() {
  for (const file of allSoundFiles) {
    const audio = new Audio(file);
    audio.preload = 'auto';
    audio.volume = 1;
    audioCache[file] = audio;
  }
}

// 첫 클릭 시 볼륨 0 재생
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

function getMilkySound(key) {
  if (functionKeys.includes(key)) return milkySounds.function;
  if (numberKeys.includes(key))   return milkySounds.number;
  if (r3Keys.includes(key))       return milkySounds.r3;
  if (r2Keys.includes(key))       return milkySounds.r2;
  if (r1Keys.includes(key))       return milkySounds.r1;
  if (controlKeys.includes(key))  return milkySounds.control;
  if (key === ' ')        return milkySounds.space;
  if (key === 'Enter')    return milkySounds.enter;
  if (key === 'Backspace')return milkySounds.backspace;
  return null;
}

function playCachedSound(url) {
  const baseAudio = audioCache[url];
  if (baseAudio) {
    const clone = baseAudio.cloneNode();
    clone.volume = 1;
    clone.currentTime = 0;
    clone.play().catch(e => {});
  }
}

// IME 중복 방지 + mp3 재생
document.addEventListener('keydown', (event) => {
  if (event.isComposing) return;
  const soundFile = getMilkySound(event.key);
  if (soundFile) {
    playCachedSound(soundFile);
  }
});

// 미리 로드
preloadAllAudio();

// 첫 클릭 시 강제 로딩
document.addEventListener('click', function firstClick() {
  forceLoadAudio();
  document.removeEventListener('click', firstClick);
});
