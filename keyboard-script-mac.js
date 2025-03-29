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
  backspace: 'sounds/백스페이스.mp3'
};

const numberKeys = ['1','2','3','4','5','6','7','8','9','0','₩','-','='];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','q','w','e','r','t','y','u','i','o','p','[',']','|',"\\"];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ','a','s','d','f','g','h','j','k','l',';',"'"];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','z','x','c','v','b','n','m',",",'.','/'];
const controlKeys = ['Ctrl','Shift','Alt'];

const allSoundFiles = Object.values(milkySounds);
const audioCache = {};

function preloadAllAudio() {
  for (const file of allSoundFiles) {
    const audio = new Audio(file);
    audio.preload = "auto";
    audio.volume = 1;
    audioCache[file] = audio;
  }
}

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
  if (key === " ")        return milkySounds.space;
  if (key === "Enter")    return milkySounds.enter;
  if (key === "Backspace")return milkySounds.backspace;
  return null;
}

function playCachedSound(url) {
  if (!url) return; // ensure url is not null
  const baseAudio = audioCache[url];
  if (baseAudio) {
    const clone = baseAudio.cloneNode();
    clone.volume = 1;
    clone.currentTime = 0;
    clone.play().catch(e => {});
  }
}

function isKoreanJamo(char) {
  const code = char.charCodeAt(0);
  return (code >= 0x3131 && code <= 0x3163);
}

document.addEventListener("keydown", function(event) {
  if (event.isComposing && !isKoreanJamo(event.key)) return;
  const pressedKey = event.key;
  const soundFile = getMilkySound(pressedKey);
  if (soundFile) {
    playCachedSound(soundFile);
  }
});

let lastComposition = "";
inputField.addEventListener("compositionupdate", function(event) {
  const current = event.data;
  if (current.length > lastComposition.length) {
    const newChars = current.slice(lastComposition.length);
    for (const char of newChars) {
      const soundFile = getMilkySound(char);
      if (soundFile) {
        playCachedSound(soundFile);
      }
    }
  }
  lastComposition = current;
});

inputField.addEventListener("compositionend", function(event) {
  lastComposition = "";
});

preloadAllAudio();
document.addEventListener("click", function firstClick() {
  forceLoadAudio();
  document.removeEventListener("click", firstClick);
});
