const inputField = document.getElementById("keyboard-input");
const audioCache = {};

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
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','q','w','e','r','t','y','u','i','o','p','[',']','|','\\'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ','a','s','d','f','g','h','j','k','l',';',"'"];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','z','x','c','v','b','n','m',",",'.','/'];
const controlKeys = ['Ctrl','Shift','Alt'];

const allSoundFiles = Object.values(milkySounds);

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
  if (key === " ")                return milkySounds.space;
  if (key === "Enter")            return milkySounds.enter;
  if (key === "Backspace")        return milkySounds.backspace;
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

function isHangulSyllable(char) {
  const code = char.charCodeAt(0);
  return code >= 0xAC00 && code <= 0xD7A3;
}

function decomposeHangul(syllable) {
  const SBase = 0xAC00, LBase = 0x1100, VBase = 0x1161, TBase = 0x11A7;
  const LCount = 19, VCount = 21, TCount = 28;
  const SIndex = syllable.charCodeAt(0) - SBase;
  const LIndex = Math.floor(SIndex / (VCount * TCount));
  const VIndex = Math.floor((SIndex % (VCount * TCount)) / TCount);
  const TIndex = SIndex % TCount;
  const initials = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const medials = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const finals = ["", "ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const initial = initials[LIndex];
  const medial = medials[VIndex];
  const final = finals[TIndex];
  return { initial, medial, final };
}

let lastValue = "";
inputField.addEventListener("input", function(event) {
  let currentValue = inputField.value;
  if (currentValue.length > lastValue.length) {
    let newChars = currentValue.slice(lastValue.length);
    for (let char of newChars) {
      if (isHangulSyllable(char)) {
        const decomposed = decomposeHangul(char);
        if (decomposed.initial) {
          const soundFile = getMilkySound(decomposed.initial);
          if (soundFile) playCachedSound(soundFile);
        }
        if (decomposed.medial) {
          const soundFile = getMilkySound(decomposed.medial);
          if (soundFile) playCachedSound(soundFile);
        }
        if (decomposed.final && decomposed.final !== "") {
          const soundFile = getMilkySound(decomposed.final);
          if (soundFile) playCachedSound(soundFile);
        }
      } else {
        const soundFile = getMilkySound(char);
        if (soundFile) playCachedSound(soundFile);
      }
    }
  }
  lastValue = currentValue;
});

preloadAllAudio();
document.addEventListener("click", function firstClick() {
  forceLoadAudio();
  document.removeEventListener("click", firstClick);
});
